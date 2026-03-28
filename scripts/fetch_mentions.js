#!/usr/bin/env node
/**
 * fetch_mentions.js
 * Multi-source mention fetcher for Gabriel Mercadal-Orfila.
 * Sources: GDELT Doc API + Google News RSS
 * Scores each mention for identity confidence, merges with manual entries,
 * and writes /data/mentions.json
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const CONFIG_PATH = path.join(__dirname, '..', 'config', 'identity.json');
const OUTPUT_PATH = path.join(__dirname, '..', 'data', 'mentions.json');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ─── SEARCH QUERIES ─────────────────────────────────────
// Each query targets a different facet of the person's identity
const GDELT_QUERIES = [
  // Direct name matches
  '"Mercadal-Orfila"',
  '"Mercadal Orfila"',
  '"Gabriel Mercadal"',
  '"Biel Mercadal" farmacia',
  '"Biel Mercadal" hospital',
  // Institutional
  '"Gabriel Mercadal" hospital',
  '"Gabriel Mercadal" farmacia',
  '"Gabriel Mercadal" Menorca',
  '"Hospital Mateu Orfila" farmacia',
  '"Hospital Mateu Orfila" Mercadal',
  // Organizations
  'FARUPEIB',
  'FARUPEIB farmacia Baleares',
  // Projects
  '"Proyecto NAVETA" telefarmacia',
  '"NAVETA" PROMs Menorca',
  '"Proyecto Zafiro" farmacia',
  '"Proyecto Zafiro" Menorca',
  // Awards & events
  '"Gabriel Mercadal" SEFH',
  '"Gabriel Mercadal" premio',
  '"Gabriel Mercadal" award',
  // Research topics tied to name
  '"Mercadal" PROMs PREMs farmacia',
  '"Mercadal" telepharmacy',
  '"Mercadal" telefarmacia',
];

const GOOGLE_NEWS_QUERIES = [
  'Gabriel Mercadal Orfila',
  'Gabriel Mercadal farmacia hospital',
  'FARUPEIB farmacia',
  'Proyecto NAVETA telefarmacia',
  'Proyecto Zafiro Menorca farmacia',
  'Hospital Mateu Orfila farmacia',
  'Biel Mercadal Menorca',
];

// ─── IDENTITY SIGNALS ───────────────────────────────────
const SIGNALS = [
  // Strong identity signals (direct match)
  { pattern: /Mercadal.Orfila/i, weight: 5, label: '+5 Mercadal-Orfila' },
  { pattern: /Gabriel\s+Mercadal/i, weight: 5, label: '+5 Gabriel Mercadal' },
  { pattern: /Biel\s+Mercadal/i, weight: 4, label: '+4 Biel Mercadal' },

  // Institutional signals
  { pattern: /Hospital\s+Mateu\s+Orfila/i, weight: 4, label: '+4 Hospital Mateu Orfila' },
  { pattern: /Universitat de les Illes Balears|UIB/i, weight: 3, label: '+3 UIB' },
  { pattern: /FARUPEIB/i, weight: 4, label: '+4 FARUPEIB' },
  { pattern: /SEFH/i, weight: 2, label: '+2 SEFH' },
  { pattern: /Acad[eè]mia\s+M[eè]dica\s+Balear/i, weight: 3, label: '+3 Acadèmia Mèdica Balear' },

  // Project signals
  { pattern: /NAVETA/i, weight: 3, label: '+3 NAVETA' },
  { pattern: /Proyecto\s+Zafiro|Project\s+Zafiro/i, weight: 3, label: '+3 Proyecto Zafiro' },
  { pattern: /telefarmacia|telepharmacy/i, weight: 2, label: '+2 telefarmacia' },

  // Geographic + health context
  { pattern: /(Mah[oó]n|Menorca).{0,40}(farmac|salud|hospital|cl[ií]nic|sanitar)/i, weight: 3, label: '+3 Menorca + health' },
  { pattern: /(farmac|salud|hospital|cl[ií]nic|sanitar).{0,40}(Mah[oó]n|Menorca)/i, weight: 3, label: '+3 health + Menorca' },

  // Research topic signals
  { pattern: /PROMs?|PREMs?|ePROMs?|patient.reported/i, weight: 2, label: '+2 PROMs/PREMs' },
  { pattern: /farmacia\s+hospitalaria|hospital\s+pharmacy/i, weight: 1, label: '+1 farmacia hospitalaria' },
  { pattern: /value.based|basad[ao]\s+en\s+valor/i, weight: 1, label: '+1 value-based' },
  { pattern: /machine\s+learning|inteligencia\s+artificial|artificial\s+intelligence/i, weight: 1, label: '+1 AI/ML' },
  { pattern: /VIH|HIV/i, weight: 1, label: '+1 VIH/HIV' },
  { pattern: /psoriasis|dermatitis/i, weight: 1, label: '+1 dermatology' },
];

const NEGATIVE_SIGNALS = [
  { pattern: /(?:restaurante|restaurant|hotel|booking|tripadvisor|cocina|chef|futbol|football|soccer|ciclismo|cycling)/i, weight: -8, label: '-8 non-health context' },
  { pattern: /(?:Mercadal).{0,20}(?:pueblo|village|town|turismo|tourism|playa|beach)/i, weight: -6, label: '-6 Mercadal as place name' },
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

  for (const sig of NEGATIVE_SIGNALS) {
    if (sig.pattern.test(text)) {
      score += sig.weight;
      signals.push(sig.label);
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
    const res = await fetch(`${baseUrl}?${params}`, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) {
      console.error(`  [GDELT] Error ${res.status} for: ${query}`);
      return [];
    }
    const text = await res.text();
    if (!text || text.trim() === '') return [];
    const data = JSON.parse(text);
    return data.articles || [];
  } catch (e) {
    console.error(`  [GDELT] Failed for "${query}": ${e.message}`);
    return [];
  }
}

async function fetchGdeltMentions() {
  console.log('[GDELT] Running queries...');
  const allArticles = [];

  for (const q of GDELT_QUERIES) {
    const articles = await searchGdelt(q, 30);
    if (articles.length > 0) {
      console.log(`  ✓ "${q}" -> ${articles.length} results`);
    }
    allArticles.push(...articles);
    await sleep(800);
  }

  return deduplicateArticles(allArticles);
}

// ─── GOOGLE NEWS RSS ────────────────────────────────────
async function searchGoogleNews(query) {
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=es&gl=ES&ceid=ES:es`;

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) return [];
    const xml = await res.text();

    // Simple XML parsing for RSS items
    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    while ((match = itemRegex.exec(xml)) !== null) {
      const itemXml = match[1];
      const title = (itemXml.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
      const link = (itemXml.match(/<link>([\s\S]*?)<\/link>/) || [])[1] || '';
      const pubDate = (itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/) || [])[1] || '';
      const source = (itemXml.match(/<source[^>]*>([\s\S]*?)<\/source>/) || [])[1] || '';

      if (title && link) {
        items.push({
          title: title.replace(/<!\[CDATA\[|\]\]>/g, '').trim(),
          url: link.trim(),
          source: source.replace(/<!\[CDATA\[|\]\]>/g, '').trim(),
          date: pubDate ? new Date(pubDate).toISOString().substring(0, 10) : null,
        });
      }
    }

    return items;
  } catch (e) {
    console.error(`  [GoogleNews] Failed for "${query}": ${e.message}`);
    return [];
  }
}

async function fetchGoogleNewsMentions() {
  console.log('[GoogleNews] Running queries...');
  const allItems = [];

  for (const q of GOOGLE_NEWS_QUERIES) {
    const items = await searchGoogleNews(q);
    if (items.length > 0) {
      console.log(`  ✓ "${q}" -> ${items.length} results`);
    }
    allItems.push(...items);
    await sleep(500);
  }

  return allItems;
}

// ─── HELPERS ────────────────────────────────────────────
function deduplicateArticles(articles) {
  const seen = new Set();
  const unique = [];
  for (const art of articles) {
    const url = normalizeUrl(art.url || '');
    if (!url || seen.has(url)) continue;
    seen.add(url);
    unique.push(art);
  }
  return unique;
}

function normalizeUrl(url) {
  return url.toLowerCase().replace(/\/+$/, '').replace(/^https?:\/\//, '').replace(/^www\./, '');
}

function makeId(url) {
  return `auto-${crypto.createHash('md5').update(url).digest('hex').substring(0, 12)}`;
}

function detectType(url, title) {
  const u = url.toLowerCase();
  if (u.includes('youtube.com') || u.includes('youtu.be') || u.includes('vimeo')) return 'video';
  if (u.includes('twitter.com') || u.includes('x.com') || u.includes('linkedin.com') || u.includes('facebook.com')) return 'social';
  if (u.includes('podcast') || (title && /podcast/i.test(title))) return 'podcast';
  return 'news';
}

function extractDomain(url) {
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, '');
    return hostname;
  } catch {
    return url;
  }
}

// ─── MAIN ───────────────────────────────────────────────
async function main() {
  console.log('=== Fetching Mentions for Gabriel Mercadal-Orfila ===\n');

  // Load existing mentions (manual ones we want to keep)
  let existing = { mentions: [] };
  if (fs.existsSync(OUTPUT_PATH)) {
    try {
      existing = JSON.parse(fs.readFileSync(OUTPUT_PATH, 'utf-8'));
    } catch (e) {
      console.warn('[WARN] Could not parse existing mentions.json');
    }
  }

  // Keep manually added mentions
  const manualMentions = (existing.mentions || []).filter((m) => !m.autoFetched);
  console.log(`[Manual] Keeping ${manualMentions.length} manual mentions\n`);

  // Fetch from all sources
  let gdeltArticles = [];
  let googleNewsItems = [];

  try {
    gdeltArticles = await fetchGdeltMentions();
    console.log(`[GDELT] ${gdeltArticles.length} unique articles\n`);
  } catch (e) {
    console.error('[GDELT] Failed entirely:', e.message);
  }

  try {
    googleNewsItems = await fetchGoogleNewsMentions();
    console.log(`[GoogleNews] ${googleNewsItems.length} items\n`);
  } catch (e) {
    console.error('[GoogleNews] Failed entirely:', e.message);
  }

  // If both sources failed, keep existing data
  if (gdeltArticles.length === 0 && googleNewsItems.length === 0) {
    console.log('[WARN] No results from any source. Keeping existing data.');
    return;
  }

  // Process GDELT articles
  const SCORE_THRESHOLD = 4;
  const autoMentions = new Map(); // url -> mention

  for (const art of gdeltArticles) {
    const textToScore = `${art.title || ''} ${art.seendate || ''} ${art.domain || ''} ${art.url || ''}`;
    const { score, signals } = scoreText(textToScore);

    if (score >= SCORE_THRESHOLD) {
      const url = art.url;
      const key = normalizeUrl(url);
      if (!autoMentions.has(key)) {
        autoMentions.set(key, {
          id: makeId(url),
          title: art.title || 'Untitled',
          url,
          source: art.domain || extractDomain(url),
          domain: art.domain || extractDomain(url),
          date: art.seendate
            ? art.seendate.substring(0, 10).replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')
            : null,
          language: art.language || 'es',
          type: detectType(url, art.title),
          score,
          signals,
          autoFetched: true,
        });
      }
    }
  }

  // Process Google News items
  for (const item of googleNewsItems) {
    const textToScore = `${item.title || ''} ${item.source || ''} ${item.url || ''}`;
    const { score, signals } = scoreText(textToScore);

    if (score >= SCORE_THRESHOLD) {
      const url = item.url;
      const key = normalizeUrl(url);
      if (!autoMentions.has(key)) {
        autoMentions.set(key, {
          id: makeId(url),
          title: item.title || 'Untitled',
          url,
          source: item.source || extractDomain(url),
          domain: extractDomain(url),
          date: item.date,
          language: 'es',
          type: detectType(url, item.title),
          score,
          signals,
          autoFetched: true,
        });
      } else {
        // If already exists, keep higher score
        const existing = autoMentions.get(key);
        if (score > existing.score) {
          existing.score = score;
          existing.signals = signals;
        }
      }
    }
  }

  console.log(`[Score] ${autoMentions.size} auto-mentions passed threshold (>= ${SCORE_THRESHOLD})\n`);

  // Merge: manual first, then auto (deduplicate by URL)
  const manualUrls = new Set(manualMentions.map((m) => normalizeUrl(m.url)));
  const newAuto = [...autoMentions.values()].filter(
    (m) => !manualUrls.has(normalizeUrl(m.url))
  );

  const allMentions = [...manualMentions, ...newAuto];

  // Sort by date desc
  allMentions.sort((a, b) => {
    const da = a.date || '0000';
    const db = b.date || '0000';
    return db.localeCompare(da);
  });

  // Write output
  const output = {
    lastUpdated: new Date().toISOString(),
    scoreThreshold: SCORE_THRESHOLD,
    count: allMentions.length,
    sources: {
      gdelt: gdeltArticles.length,
      googleNews: googleNewsItems.length,
    },
    mentions: allMentions,
  };

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));

  console.log(`✅ Done! ${allMentions.length} mentions total`);
  console.log(`   - ${manualMentions.length} manual`);
  console.log(`   - ${newAuto.length} new auto-fetched`);
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});
