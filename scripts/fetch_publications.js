#!/usr/bin/env node
/**
 * fetch_publications.ts
 * Fetches publications from ORCID, enriches via Crossref, supplements from PubMed.
 * Deduplicates by DOI > PMID > title+year hash.
 * Writes to /data/publications.json
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Config
const ORCID_ID = '0000-0001-7304-458X';
const PUBMED_AUTHOR = '"Mercadal-Orfila G"[Author]';
const PUBMED_AFFILIATION = '("Hospital Mateu Orfila"[Affiliation] OR "Universitat de les Illes Balears"[Affiliation] OR Mahon[Affiliation] OR Mallorca[Affiliation])';
const OUTPUT_PATH = path.join(__dirname, '..', 'data', 'publications.json');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ─── ORCID ──────────────────────────────────────────────
async function fetchOrcidWorks() {
  console.log('[ORCID] Fetching works...');
  const url = `https://pub.orcid.org/v3.0/${ORCID_ID}/works`;
  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    console.error(`[ORCID] Error ${res.status}`);
    return [];
  }
  const data = await res.json();
  const groups = data.group || [];
  console.log(`[ORCID] Found ${groups.length} work groups`);

  return groups.map((g) => {
    const summary = g['work-summary']?.[0];
    if (!summary) return null;

    const title = summary.title?.title?.value || '';
    const year = summary['publication-date']?.year?.value || null;
    const type = summary.type || 'other';
    const extIds = summary['external-ids']?.['external-id'] || [];

    let doi = null;
    let url = null;
    for (const eid of extIds) {
      if (eid['external-id-type'] === 'doi') {
        doi = eid['external-id-value'];
        url = `https://doi.org/${doi}`;
      }
    }
    if (!url && summary.url?.value) url = summary.url.value;

    return { title, year: year ? parseInt(year) : null, type, doi, url, source: 'orcid' };
  }).filter(Boolean);
}

// ─── CROSSREF ───────────────────────────────────────────
async function enrichWithCrossref(pub) {
  if (!pub.doi) return pub;
  try {
    await sleep(100); // rate limit
    const url = `https://api.crossref.org/works/${encodeURIComponent(pub.doi)}`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'GabrielMercadal-AcademicSite/1.0 (mailto:gmercadal@hmateuorfila.es)' },
    });
    if (!res.ok) return pub;
    const data = await res.json();
    const item = data.message;

    pub.journal = item['container-title']?.[0] || pub.journal || null;
    pub.authors = (item.author || []).map((a) =>
      `${a.family || ''}${a.given ? ', ' + a.given : ''}`
    );
    if (item.abstract) pub.abstract = item.abstract.replace(/<[^>]+>/g, '');
    if (!pub.year && item.published?.['date-parts']?.[0]?.[0]) {
      pub.year = item.published['date-parts'][0][0];
    }
    pub.crossrefEnriched = true;
  } catch (e) {
    console.error(`[Crossref] Error for ${pub.doi}: ${e.message}`);
  }
  return pub;
}

// ─── PUBMED ─────────────────────────────────────────────
async function fetchPubMed() {
  console.log('[PubMed] Searching...');
  const query = `${PUBMED_AUTHOR} AND ${PUBMED_AFFILIATION}`;
  const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(query)}&retmax=200&retmode=json`;

  const searchRes = await fetch(searchUrl);
  if (!searchRes.ok) {
    console.error(`[PubMed] Search error ${searchRes.status}`);
    return [];
  }
  const searchData = await searchRes.json();
  const ids = searchData.esearchresult?.idlist || [];
  console.log(`[PubMed] Found ${ids.length} PMIDs`);

  if (ids.length === 0) return [];

  await sleep(400);
  const summaryUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${ids.join(',')}&retmode=json`;
  const summaryRes = await fetch(summaryUrl);
  if (!summaryRes.ok) return [];
  const summaryData = await summaryRes.json();

  const results = [];
  for (const id of ids) {
    const item = summaryData.result?.[id];
    if (!item) continue;

    const title = item.title || '';
    const year = item.pubdate ? parseInt(item.pubdate.substring(0, 4)) : null;
    const journal = item.fulljournalname || item.source || null;
    const authors = (item.authors || []).map((a) => a.name);
    const doi = (item.elocationid || '').replace('doi: ', '').trim() || null;
    const pmid = id;

    results.push({
      title,
      year,
      type: 'journal-article',
      doi: doi || null,
      pmid,
      journal,
      authors,
      url: doi ? `https://doi.org/${doi}` : `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`,
      source: 'pubmed',
    });
  }
  return results;
}

// ─── DEDUPLICATION ──────────────────────────────────────
function makeHash(title, year, firstAuthor) {
  const normalized = `${(title || '').toLowerCase().replace(/[^a-z0-9]/g, '')}|${year || ''}|${(firstAuthor || '').toLowerCase()}`;
  return crypto.createHash('md5').update(normalized).digest('hex').substring(0, 12);
}

function deduplicate(allPubs) {
  const byDoi = new Map();
  const byPmid = new Map();
  const byHash = new Map();
  const final = [];

  for (const pub of allPubs) {
    const hash = makeHash(pub.title, pub.year, pub.authors?.[0]);
    pub._hash = hash;

    if (pub.doi) {
      const key = pub.doi.toLowerCase();
      if (byDoi.has(key)) {
        // Merge: prefer crossref-enriched data
        const existing = byDoi.get(key);
        if (!existing.journal && pub.journal) existing.journal = pub.journal;
        if (!existing.authors?.length && pub.authors?.length) existing.authors = pub.authors;
        if (!existing.pmid && pub.pmid) existing.pmid = pub.pmid;
        if (!existing.abstract && pub.abstract) existing.abstract = pub.abstract;
        continue;
      }
      byDoi.set(key, pub);
    } else if (pub.pmid) {
      if (byPmid.has(pub.pmid)) continue;
      byPmid.set(pub.pmid, pub);
    } else {
      if (byHash.has(hash)) continue;
      byHash.set(hash, pub);
    }
  }

  // Combine all
  for (const pub of byDoi.values()) final.push(pub);
  for (const pub of byPmid.values()) {
    if (!pub.doi || !byDoi.has(pub.doi.toLowerCase())) final.push(pub);
  }
  for (const pub of byHash.values()) final.push(pub);

  return final;
}

// ─── MAIN ───────────────────────────────────────────────
async function main() {
  console.log('=== Fetching Publications ===');
  const startTime = Date.now();

  // 1. ORCID
  let orcidPubs = [];
  try {
    orcidPubs = await fetchOrcidWorks();
  } catch (e) {
    console.error('[ORCID] Failed:', e.message);
  }

  // 2. Enrich with Crossref
  console.log('[Crossref] Enriching...');
  for (let i = 0; i < orcidPubs.length; i++) {
    orcidPubs[i] = await enrichWithCrossref(orcidPubs[i]);
    if ((i + 1) % 10 === 0) console.log(`[Crossref] ${i + 1}/${orcidPubs.length}`);
  }

  // 3. PubMed
  let pubmedPubs = [];
  try {
    pubmedPubs = await fetchPubMed();
  } catch (e) {
    console.error('[PubMed] Failed:', e.message);
  }

  // 4. Deduplicate
  const allPubs = [...orcidPubs, ...pubmedPubs];
  const deduped = deduplicate(allPubs);

  // 5. Sort by year desc
  deduped.sort((a, b) => (b.year || 0) - (a.year || 0));

  // 6. Add IDs and clean up
  const publications = deduped.map((p, i) => ({
    id: p.doi ? `doi-${p.doi.replace(/[^a-zA-Z0-9]/g, '-')}` : p.pmid ? `pmid-${p.pmid}` : `pub-${p._hash}`,
    title: p.title,
    year: p.year,
    type: p.type || 'other',
    doi: p.doi || null,
    pmid: p.pmid || null,
    journal: p.journal || null,
    authors: p.authors || [],
    abstract: p.abstract || null,
    url: p.url || null,
  }));

  // 7. Build year index
  const yearIndex = {};
  for (const pub of publications) {
    const y = pub.year || 'unknown';
    if (!yearIndex[y]) yearIndex[y] = [];
    yearIndex[y].push(pub.id);
  }

  // 8. Write
  const output = {
    lastUpdated: new Date().toISOString(),
    count: publications.length,
    yearIndex,
    publications,
  };

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n✅ Done! ${publications.length} publications written in ${elapsed}s`);
  console.log(`   ORCID: ${orcidPubs.length}, PubMed: ${pubmedPubs.length}, After dedup: ${publications.length}`);
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});
