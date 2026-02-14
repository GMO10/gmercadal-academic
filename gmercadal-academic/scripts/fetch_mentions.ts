#!/usr/bin/env npx tsx
/**
 * fetch_mentions.ts
 *
 * 1. Query GDELT Doc API with multiple disambiguating queries
 * 2. Score each article against identity signals
 * 3. Keep only score >= threshold → /data/mentions.json
 */

import fs from 'fs';
import path from 'path';
import type { Mention, MentionsData, IdentityConfig } from '../lib/types';

const CONFIG: IdentityConfig = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'config', 'identity.json'), 'utf-8')
);

const DATA_PATH = path.join(__dirname, '..', 'data', 'mentions.json');
const THRESHOLD = CONFIG.mentions.scoreThreshold;

// ── Helpers ──────────────────────────────────────────────────

async function fetchJSON(url: string): Promise<any> {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'gmercadal-academic/1.0' },
    });
    if (!res.ok) {
      console.warn(`⚠  HTTP ${res.status} for GDELT query`);
      return null;
    }
    return res.json();
  } catch (err) {
    console.warn('⚠  GDELT fetch error:', (err as Error).message);
    return null;
  }
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// ── GDELT Doc API queries ────────────────────────────────────

function buildGdeltUrl(query: string, maxRecords = 50): string {
  const base = 'https://api.gdeltproject.org/api/v2/doc/doc';
  const params = new URLSearchParams({
    query: query,
    mode: 'ArtList',
    maxrecords: maxRecords.toString(),
    format: 'json',
    sort: 'DateDesc',
  });
  return `${base}?${params.toString()}`;
}

function getQueries(): string[] {
  // Multiple queries to cast a wide net, then score to filter
  return [
    // Core: full compound surname
    '"Mercadal-Orfila"',
    // Hospital affiliation
    '"Hospital Mateu Orfila"',
    // University affiliation + pharmacy context
    '"Universitat de les Illes Balears" pharmacy',
    // Name + location
    '"Mercadal-Orfila" Menorca',
    '"Mercadal-Orfila" Mahon',
  ];
}

interface GdeltArticle {
  url: string;
  title: string;
  seendate: string;
  domain: string;
  language: string;
  socialimage?: string;
  sourcecountry?: string;
}

async function fetchAllGdelt(): Promise<GdeltArticle[]> {
  console.log('📰 Querying GDELT Doc API…');
  const queries = getQueries();
  const allArticles: GdeltArticle[] = [];
  const seenUrls = new Set<string>();

  for (const q of queries) {
    const url = buildGdeltUrl(q);
    console.log(`   Query: ${q}`);
    const data = await fetchJSON(url);
    const articles: GdeltArticle[] = data?.articles ?? [];
    console.log(`   → ${articles.length} results`);

    for (const art of articles) {
      if (!seenUrls.has(art.url)) {
        seenUrls.add(art.url);
        allArticles.push(art);
      }
    }
    await sleep(1000); // GDELT rate limiting
  }

  console.log(`   Total unique articles: ${allArticles.length}`);
  return allArticles;
}

// ── Scoring engine ───────────────────────────────────────────

function scoreArticle(art: GdeltArticle): { score: number; signals: string[] } {
  const text = `${art.title} ${art.url} ${art.domain}`.toLowerCase();
  let score = 0;
  const signals: string[] = [];
  const sigs = CONFIG.mentions.signals;

  // +4 Hospital Mateu Orfila
  if (text.includes('hospital mateu orfila') || text.includes('mateu orfila')) {
    score += sigs.affiliationHospital.weight;
    signals.push('affiliationHospital');
  }

  // +4 Universitat de les Illes Balears
  if (text.includes('universitat de les illes balears') || text.includes('illes balears')) {
    score += sigs.affiliationUniversity.weight;
    signals.push('affiliationUniversity');
  }

  // +4 Full name with initial G
  const fullNameRe = /mercadal[- ]orfila/i;
  const initialRe = /\bg\.?\s/i;
  if (fullNameRe.test(text)) {
    if (initialRe.test(text) || text.includes('gabriel')) {
      score += sigs.fullNameWithInitial.weight;
      signals.push('fullNameWithInitial');
    }
  }

  // +3 Location + scientific context
  const locationTerms = (sigs.locationScientific.patterns as string[]).map((p) => p.toLowerCase());
  const sciTerms = (sigs.locationScientific.contextPatterns as string[]);
  const hasLocation = locationTerms.some((loc) => text.includes(loc));
  const hasSciContext = sciTerms.some((term) => text.includes(term));
  if (hasLocation && hasSciContext) {
    score += sigs.locationScientific.weight;
    signals.push('locationScientific');
  }

  // +2 Coauthors
  const coauthors: string[] = sigs.coauthors.names ?? [];
  for (const ca of coauthors) {
    if (text.includes(ca.toLowerCase())) {
      score += sigs.coauthors.weight;
      signals.push(`coauthor:${ca}`);
      break; // Count once
    }
  }

  // +1 Thematic keywords
  const keywordsMatched = CONFIG.keywords.filter((kw) => text.includes(kw.toLowerCase()));
  if (keywordsMatched.length > 0) {
    score += sigs.thematicKeywords.weight;
    signals.push(`keywords:${keywordsMatched.join(',')}`);
  }

  // -5 Surname only without academic/health context
  if (
    fullNameRe.test(text) &&
    !hasSciContext &&
    signals.length === 0
  ) {
    score += sigs.surnameOnlyPenalty.weight;
    signals.push('surnameOnlyPenalty');
  }

  return { score, signals };
}

// ── Build mentions ───────────────────────────────────────────

function parseGdeltDate(seendate: string): string | null {
  // GDELT format: "20240115T120000Z" or similar
  if (!seendate) return null;
  try {
    const y = seendate.slice(0, 4);
    const m = seendate.slice(4, 6);
    const d = seendate.slice(6, 8);
    return `${y}-${m}-${d}`;
  } catch {
    return null;
  }
}

async function main() {
  console.log('🚀 Starting mentions fetch…\n');

  // Load existing mentions to preserve them if GDELT fails
  let existingMentions: Mention[] = [];
  try {
    const existing: MentionsData = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
    existingMentions = existing.mentions;
  } catch {
    // First run
  }

  let gdeltArticles: GdeltArticle[];
  try {
    gdeltArticles = await fetchAllGdelt();
  } catch (err) {
    console.error('❌ GDELT fetch failed completely, preserving existing data:', (err as Error).message);
    // Don't overwrite existing data
    return;
  }

  if (gdeltArticles.length === 0) {
    console.log('ℹ  No GDELT articles found. Keeping existing mentions.');
    return;
  }

  // Score and filter
  const scored: Mention[] = [];
  const seenUrls = new Set(existingMentions.map((m) => m.url));

  for (const art of gdeltArticles) {
    const { score, signals } = scoreArticle(art);

    if (score >= THRESHOLD) {
      scored.push({
        id: Buffer.from(art.url).toString('base64').slice(0, 24),
        title: art.title,
        url: art.url,
        source: art.domain,
        domain: art.domain,
        date: parseGdeltDate(art.seendate),
        language: art.language ?? null,
        snippet: null,
        score,
        signalsActivated: signals,
        imageUrl: art.socialimage ?? null,
      });
    }
  }

  // Merge with existing (deduplicate by URL)
  const mergedMap = new Map<string, Mention>();
  for (const m of existingMentions) mergedMap.set(m.url, m);
  for (const m of scored) mergedMap.set(m.url, m); // New overwrites old

  const allMentions = [...mergedMap.values()];
  allMentions.sort((a, b) => {
    if (a.date && b.date) return b.date.localeCompare(a.date);
    return b.score - a.score;
  });

  const output: MentionsData = {
    lastUpdated: new Date().toISOString(),
    count: allMentions.length,
    scoreThreshold: THRESHOLD,
    mentions: allMentions,
  };

  fs.writeFileSync(DATA_PATH, JSON.stringify(output, null, 2), 'utf-8');
  console.log(`\n✅ Wrote ${allMentions.length} mentions (threshold ≥ ${THRESHOLD}) to ${DATA_PATH}`);
}

main();
