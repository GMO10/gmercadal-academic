#!/usr/bin/env npx tsx
/**
 * fetch_publications.ts
 *
 * 1. Read works from ORCID Public API v3.0
 * 2. Enrich each DOI via Crossref REST API
 * 3. Search PubMed via NCBI E-utilities
 * 4. Merge & deduplicate → /data/publications.json
 */

import fs from 'fs';
import path from 'path';
import type { Publication, PublicationsData, IdentityConfig } from '../lib/types';

const CONFIG: IdentityConfig = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'config', 'identity.json'), 'utf-8')
);

const ORCID = CONFIG.person.orcid;
const DATA_PATH = path.join(__dirname, '..', 'data', 'publications.json');

// ── Helpers ──────────────────────────────────────────────────

async function fetchJSON(url: string, headers?: Record<string, string>): Promise<any> {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'gmercadal-academic/1.0 (academic personal site)',
      Accept: 'application/json',
      ...headers,
    },
  });
  if (!res.ok) {
    console.warn(`⚠  HTTP ${res.status} for ${url}`);
    return null;
  }
  return res.json();
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function normTitle(t: string): string {
  return t.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 80);
}

function stableHash(title: string, year: number | null, firstAuthor: string): string {
  const norm = normTitle(title) + '|' + (year ?? '?') + '|' + normTitle(firstAuthor);
  // Simple string hash
  let h = 0;
  for (let i = 0; i < norm.length; i++) {
    h = (Math.imul(31, h) + norm.charCodeAt(i)) | 0;
  }
  return 'hash:' + Math.abs(h).toString(36);
}

// ── ORCID ────────────────────────────────────────────────────

interface OrcidWork {
  title: string;
  type: string | null;
  year: number | null;
  doi: string | null;
  url: string | null;
  putCode: string | null;
}

async function fetchOrcidWorks(): Promise<OrcidWork[]> {
  console.log('📗 Fetching ORCID works…');
  const data = await fetchJSON(
    `https://pub.orcid.org/v3.0/${ORCID}/works`,
    { Accept: 'application/json' }
  );
  if (!data || !data.group) return [];

  const works: OrcidWork[] = [];
  for (const group of data.group) {
    const summary = group['work-summary']?.[0];
    if (!summary) continue;

    const title =
      summary.title?.title?.value ?? summary.title?.['translated-title']?.value ?? '';
    const type = summary.type ?? null;
    const year = summary['publication-date']?.year?.value
      ? parseInt(summary['publication-date'].year.value)
      : null;

    let doi: string | null = null;
    let url: string | null = null;
    const putCode = summary['put-code']?.toString() ?? null;

    const extIds = summary['external-ids']?.['external-id'] ?? [];
    for (const eid of extIds) {
      if (eid['external-id-type'] === 'doi') {
        doi = eid['external-id-value']?.toLowerCase() ?? null;
      }
      if (!url && eid['external-id-url']?.value) {
        url = eid['external-id-url'].value;
      }
    }
    if (doi && !url) url = `https://doi.org/${doi}`;

    works.push({ title, type, year, doi, url, putCode });
  }

  console.log(`   Found ${works.length} works in ORCID`);
  return works;
}

// ── Crossref enrichment ──────────────────────────────────────

interface CrossrefMeta {
  title: string;
  authors: string[];
  journal: string | null;
  date: string | null;
  year: number | null;
  abstract: string | null;
  type: string | null;
  url: string | null;
}

async function enrichWithCrossref(doi: string): Promise<CrossrefMeta | null> {
  const data = await fetchJSON(
    `https://api.crossref.org/works/${encodeURIComponent(doi)}`,
    { Accept: 'application/json' }
  );
  if (!data?.message) return null;
  const m = data.message;

  const authors = (m.author ?? []).map((a: any) => {
    const family = a.family ?? '';
    const given = a.given ?? '';
    return given ? `${family} ${given.charAt(0)}` : family;
  });

  const dateParts = m.published?.['date-parts']?.[0] ?? m['published-print']?.['date-parts']?.[0];
  let dateStr: string | null = null;
  let year: number | null = null;
  if (dateParts) {
    year = dateParts[0] ?? null;
    dateStr = dateParts.join('-');
  }

  let abstract = m.abstract ?? null;
  if (abstract) {
    // Strip JATS XML tags
    abstract = abstract.replace(/<[^>]+>/g, '').trim();
    if (abstract.length > 1000) abstract = abstract.slice(0, 1000) + '…';
  }

  return {
    title: Array.isArray(m.title) ? m.title[0] : (m.title ?? ''),
    authors,
    journal: Array.isArray(m['container-title']) ? m['container-title'][0] : (m['container-title'] ?? null),
    date: dateStr,
    year,
    abstract,
    type: m.type ?? null,
    url: m.URL ?? null,
  };
}

// ── PubMed ───────────────────────────────────────────────────

interface PubMedArticle {
  pmid: string;
  title: string;
  authors: string[];
  journal: string | null;
  year: number | null;
  date: string | null;
  doi: string | null;
}

async function fetchPubMed(): Promise<PubMedArticle[]> {
  console.log('📕 Searching PubMed…');
  const query = `${CONFIG.pubmed.authorQuery} AND ${CONFIG.pubmed.affiliationQuery}`;
  const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(query)}&retmax=200&retmode=json`;

  const searchData = await fetchJSON(searchUrl);
  const idList: string[] = searchData?.esearchresult?.idlist ?? [];
  if (idList.length === 0) {
    console.log('   No PubMed results');
    return [];
  }
  console.log(`   Found ${idList.length} PMIDs`);

  await sleep(400); // NCBI rate limit (3 req/sec without API key)

  const summaryUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${idList.join(',')}&retmode=json`;
  const summaryData = await fetchJSON(summaryUrl);
  if (!summaryData?.result) return [];

  const articles: PubMedArticle[] = [];
  for (const pmid of idList) {
    const rec = summaryData.result[pmid];
    if (!rec || rec.error) continue;

    const authors = (rec.authors ?? []).map((a: any) => a.name ?? '');
    let doi: string | null = null;
    for (const artid of rec.articleids ?? []) {
      if (artid.idtype === 'doi') {
        doi = artid.value?.toLowerCase() ?? null;
        break;
      }
    }

    let year: number | null = null;
    let date: string | null = rec.pubdate ?? null;
    if (date) {
      const m = date.match(/^(\d{4})/);
      if (m) year = parseInt(m[1]);
    }

    articles.push({
      pmid,
      title: rec.title ?? '',
      authors,
      journal: rec.fulljournalname ?? rec.source ?? null,
      year,
      date,
      doi,
    });
  }

  return articles;
}

// ── Merge & Dedup ────────────────────────────────────────────

async function buildPublications(): Promise<Publication[]> {
  const orcidWorks = await fetchOrcidWorks();
  const pubmedArticles = await fetchPubMed();

  // Map by DOI (lowercase) and PMID
  const byDoi = new Map<string, Publication>();
  const byPmid = new Map<string, Publication>();
  const byHash = new Map<string, Publication>();

  // 1️⃣ Process ORCID works
  for (const w of orcidWorks) {
    const pub: Publication = {
      id: w.doi ? `doi:${w.doi}` : '',
      title: w.title,
      authors: [],
      year: w.year,
      date: null,
      journal: null,
      type: w.type,
      doi: w.doi,
      pmid: null,
      orcidPutCode: w.putCode,
      abstract: null,
      url: w.url,
      sources: ['orcid'],
    };

    // Enrich with Crossref if DOI exists
    if (w.doi) {
      await sleep(200); // Polite delay for Crossref
      const cr = await enrichWithCrossref(w.doi);
      if (cr) {
        pub.title = cr.title || pub.title;
        pub.authors = cr.authors;
        pub.journal = cr.journal;
        pub.date = cr.date;
        pub.year = cr.year ?? pub.year;
        pub.abstract = cr.abstract;
        pub.type = cr.type ?? pub.type;
        pub.url = cr.url ?? pub.url;
        if (!pub.sources.includes('crossref')) pub.sources.push('crossref');
      }
      byDoi.set(w.doi, pub);
    } else {
      // Hash-based dedup
      const h = stableHash(w.title, w.year, '');
      pub.id = h;
      byHash.set(h, pub);
    }
  }

  // 2️⃣ Process PubMed articles — merge or add
  for (const pm of pubmedArticles) {
    // Check DOI match first
    if (pm.doi && byDoi.has(pm.doi)) {
      const existing = byDoi.get(pm.doi)!;
      existing.pmid = pm.pmid;
      if (!existing.sources.includes('pubmed')) existing.sources.push('pubmed');
      // Fill missing fields
      if (!existing.authors.length && pm.authors.length) existing.authors = pm.authors;
      if (!existing.journal && pm.journal) existing.journal = pm.journal;
      continue;
    }

    // Check PMID duplicate
    if (byPmid.has(pm.pmid)) continue;

    // Check hash match
    const h = stableHash(pm.title, pm.year, pm.authors[0] ?? '');
    if (byHash.has(h)) {
      const existing = byHash.get(h)!;
      existing.pmid = pm.pmid;
      if (pm.doi) existing.doi = pm.doi;
      if (!existing.sources.includes('pubmed')) existing.sources.push('pubmed');
      continue;
    }

    // New from PubMed only
    const pub: Publication = {
      id: pm.doi ? `doi:${pm.doi}` : `pmid:${pm.pmid}`,
      title: pm.title,
      authors: pm.authors,
      year: pm.year,
      date: pm.date,
      journal: pm.journal,
      type: 'journal-article',
      doi: pm.doi,
      pmid: pm.pmid,
      orcidPutCode: null,
      abstract: null,
      url: pm.doi ? `https://doi.org/${pm.doi}` : `https://pubmed.ncbi.nlm.nih.gov/${pm.pmid}/`,
      sources: ['pubmed'],
    };

    // Try Crossref enrichment
    if (pm.doi) {
      await sleep(200);
      const cr = await enrichWithCrossref(pm.doi);
      if (cr) {
        pub.title = cr.title || pub.title;
        if (cr.authors.length) pub.authors = cr.authors;
        pub.journal = cr.journal ?? pub.journal;
        pub.abstract = cr.abstract;
        pub.type = cr.type ?? pub.type;
        if (!pub.sources.includes('crossref')) pub.sources.push('crossref');
      }
      byDoi.set(pm.doi, pub);
    } else {
      byPmid.set(pm.pmid, pub);
    }
  }

  // 3️⃣ Collect all unique publications
  const all = [
    ...byDoi.values(),
    ...byPmid.values(),
    ...byHash.values(),
  ];

  // Sort by year desc, then title
  all.sort((a, b) => {
    if ((b.year ?? 0) !== (a.year ?? 0)) return (b.year ?? 0) - (a.year ?? 0);
    return a.title.localeCompare(b.title);
  });

  return all;
}

// ── Build year index ─────────────────────────────────────────

function buildYearIndex(pubs: Publication[]): Record<string, number[]> {
  const idx: Record<string, number[]> = {};
  pubs.forEach((p, i) => {
    const y = p.year?.toString() ?? 'unknown';
    if (!idx[y]) idx[y] = [];
    idx[y].push(i);
  });
  return idx;
}

// ── Main ─────────────────────────────────────────────────────

async function main() {
  console.log('🚀 Starting publications fetch…\n');
  try {
    const pubs = await buildPublications();
    const yearIndex = buildYearIndex(pubs);

    const output: PublicationsData = {
      lastUpdated: new Date().toISOString(),
      count: pubs.length,
      publications: pubs,
      yearIndex,
    };

    fs.writeFileSync(DATA_PATH, JSON.stringify(output, null, 2), 'utf-8');
    console.log(`\n✅ Wrote ${pubs.length} publications to ${DATA_PATH}`);
  } catch (err) {
    console.error('❌ Fatal error fetching publications:', err);
    process.exit(1);
  }
}

main();
