#!/usr/bin/env node
/**
 * fetch_mentions.js
 * Searches GDELT Doc API for mentions, scores for identity confidence,
 * merges with existing manual mentions, and writes /data/mentions.json
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const CONFIG_PATH = path.join(__dirname, '..', 'config', 'identity.json');
const OUTPUT_PATH = path.join(__dirname, '..', 'data', 'mentions.json');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ─── IDENTITY SIGNALS ───────────────────────────────────
const SIGNALS = [
  { pattern: /Hospital Mateu Orfila/i, weight: 4, label: '+4 Hospital Mateu Orfila' },
  { pattern: /Universitat de les Illes Balears|UIB/i, weight: 4, label: '+4 UIB' },
  { pattern: /Mercadal.Orfila.*G|G.*Mercadal.Orfila|Gabriel.*Mercadal/i, weight: 4, label: '+4 Mercadal-Orfila + G' },
  { pattern: /(Mah[oó]n|Menorca).*(farmac|salud|hospital|clinic|sanitar)/i, weight: 3, label: '+3 Mahon + health' },
  { pattern: /(farmac|salud|hospital|clinic|sanitar).*(Mah[oó]n|Menorca)/i, weight: 3, label: '+3 health + Mahon' },
  { pattern: /NAVETA|telefarmacia|telepharmacy/i, weight: 3, label: '+3 NAVETA/telefarmacia' },
  { pattern: /PROMs?|PREMs?|ePROMs?|patient.reported/i, weight: 2, label: '+2 PROMs/PREMs' },
  { pattern: /SEFH|FARUPEIB/i, weight: 2, label: '+2 SEFH/FARUPEIB' },
  { pattern: /farmacia hospitalaria|hospital pharmacy/i, weight: 1, label: '+1 farmacia hospitalaria' },
  { pattern: /value.based|basad[ao] en valor/i, weight: 1, label: '+1 value-based' },
  { pattern: /machine learning|inteligencia artificial|artificial intelligence/i, weight: 1, label: '+1 AI/ML' },
];

const NEGATIVE_SIGNALS = [
  { pattern: /^(?!.*(?:farmac|hospital|salud|clinic|sanitar|PROMs?|SEFH|NAVETA)).*Mercadal/i, weight: -5, label: '-5 surname without health context' },
];

function scoreText(text) {
  let score = 0;
  const signals = [];

  for (const sig of SIGNALS) {
    if (sig.pattern.test(text)) {
      score += sig.weight;
      signals.push(sig.label);
    }
  }

  // Only apply negative if no positive signals found
  if (signals.length === 0) {
    for (const sig of NEGATIVE_SIGNALS) {
      if (sig.pattern.test(text)) {
        score += sig.weight;
        signals.push(sig.label);
      }
    }
  }

  return { score, signals };
}

// ─── GDELT DOC API ──────────────────────────────────────
async function searchGdelt(query, maxRecords = 50) {
  const baseUrl = 'https://api.gdeltproject.org/api/v2/doc/doc';
  const params = new URLSearchParams({
    query: query,
    mode: 'ArtList',
    maxrecords: String(maxRecords),
    format: 'json',
    sort: 'DateDesc',
  });

  try {
    const res = await fetch(`${baseUrl}?${params}`);
    if (!res.ok) {
      console.error(`[GDELT] Error ${res.status} for query: ${query}`);
      return [];
    }
    const data = await res.json();
    return data.articles || [];
  } catch (e) {
    console.error(`[GDELT] Failed for query "${query}": ${e.message}`);
    return [];
  }
}

async function fetchGdeltMentions() {
  console.log('[GDELT] Running queries...');

  const queries = [
    '"Mercadal-Orfila"',
    '"Gabriel Mercadal" farmacia',
    '"Gabriel Mercadal" hospital Menorca',
    '"Hospital Mateu Orfila" farmacia',
    '"NAVETA" telefarmacia PROMs',
    '"Proyecto Zafiro" Menorca',
    'FARUPEIB farmacia',
  ];

  const allArticles = [];
  for (const q of queries) {
    const articles = await searchGdelt(q, 30);
    console.log(`[GDELT] "${q}" -> ${articles.length} results`);
    allArticles.push(...articles);
    await sleep(1000); // rate limit between queries
  }

  // Deduplicate by URL
  const seen = new Set();
  const unique = [];
  for (const art of allArticles) {
    const url = (art.url || '').toLowerCase().replace(/\/$/, '');
    if (seen.has(url)) continue;
    seen.add(url);
    unique.push(art);
  }

  console.log(`[GDELT] ${allArticles.length} total -> ${unique.length} unique articles`);
  return unique;
}

// ─── MAIN ───────────────────────────────────────────────
async function main() {
  console.log('=== Fetching Mentions ===');

  // Load existing mentions (manual ones we want to keep)
  let existing = { mentions: [] };
  if (fs.existsSync(OUTPUT_PATH)) {
    try {
      existing = JSON.parse(fs.readFileSync(OUTPUT_PATH, 'utf-8'));
    } catch (e) {
      console.warn('[WARN] Could not parse existing mentions.json');
    }
  }

  // Keep manually added mentions (those without gdelt source)
  const manualMentions = (existing.mentions || []).filter(
    (m) => !m.autoFetched
  );
  console.log(`[Manual] Keeping ${manualMentions.length} manual mentions`);

  // Fetch from GDELT
  let gdeltArticles = [];
  try {
    gdeltArticles = await fetchGdeltMentions();
  } catch (e) {
    console.error('[GDELT] Failed entirely:', e.message);
    // Keep existing data on failure
    console.log('[GDELT] Keeping existing data unchanged');
    return;
  }

  // Score and filter
  const SCORE_THRESHOLD = 6;
  const gdeltMentions = [];

  for (const art of gdeltArticles) {
    const textToScore = `${art.title || ''} ${art.seendate || ''} ${art.domain || ''} ${art.url || ''}`;
    const { score, signals } = scoreText(textToScore);

    if (score >= SCORE_THRESHOLD) {
      const domain = art.domain || new URL(art.url).hostname;
      gdeltMentions.push({
        id: `gdelt-${crypto.createHash('md5').update(art.url).digest('hex').substring(0, 10)}`,
        title: art.title || 'Untitled',
        url: art.url,
        source: domain,
        domain: domain,
        date: art.seendate ? art.seendate.substring(0, 10).replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') : null,
        language: art.language || 'es',
        type: 'news',
        score,
        signals,
        autoFetched: true,
      });
    }
  }

  console.log(`[Score] ${gdeltMentions.length} mentions passed threshold (>= ${SCORE_THRESHOLD})`);

  // Merge: manual first, then GDELT (deduplicate by URL)
  const seenUrls = new Set(manualMentions.map((m) => m.url.toLowerCase().replace(/\/$/, '')));
  const newGdelt = gdeltMentions.filter(
    (m) => !seenUrls.has(m.url.toLowerCase().replace(/\/$/, ''))
  );

  const allMentions = [...manualMentions, ...newGdelt];

  // Sort by date desc
  allMentions.sort((a, b) => {
    const da = a.date || '0000';
    const db = b.date || '0000';
    return db.localeCompare(da);
  });

  // Write
  const output = {
    lastUpdated: new Date().toISOString(),
    scoreThreshold: SCORE_THRESHOLD,
    count: allMentions.length,
    mentions: allMentions,
  };

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));

  console.log(`\n✅ Done! ${allMentions.length} mentions (${manualMentions.length} manual + ${newGdelt.length} new from GDELT)`);
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});
