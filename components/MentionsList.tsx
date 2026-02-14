'use client';

import { useState, useMemo } from 'react';
import { BadgeScore } from './BadgeScore';
import type { Mention } from '@/lib/types';

interface Props {
  mentions: Mention[];
  languages: string[];
  sources: string[];
  defaultThreshold: number;
}

export function MentionsList({ mentions, languages, sources, defaultThreshold }: Props) {
  const [minScore, setMinScore] = useState(defaultThreshold);
  const [langFilter, setLangFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    return mentions.filter((m) => {
      if (m.score < minScore) return false;
      if (langFilter !== 'all' && m.language !== langFilter) return false;
      if (sourceFilter !== 'all' && m.domain !== sourceFilter) return false;
      return true;
    });
  }, [mentions, minScore, langFilter, sourceFilter]);

  return (
    <div>
      {/* ── Filters ──────────────────────────── */}
      <div className="no-print flex flex-wrap gap-3 mb-8 p-4 bg-white border border-border rounded-lg" role="search" aria-label="Filter mentions">
        <div className="flex flex-col gap-1">
          <label htmlFor="score-filter" className="text-xs font-medium text-muted">
            Min score: {minScore}
          </label>
          <input
            id="score-filter"
            type="range"
            min={0}
            max={20}
            value={minScore}
            onChange={(e) => setMinScore(parseInt(e.target.value))}
            className="w-32"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="lang-filter" className="text-xs font-medium text-muted">Language</label>
          <select
            id="lang-filter"
            value={langFilter}
            onChange={(e) => setLangFilter(e.target.value)}
            className="text-sm border border-border rounded px-2 py-1.5 bg-white"
          >
            <option value="all">All languages</option>
            {languages.map((l) => (
              <option key={l} value={l}>{l.toUpperCase()}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="source-filter" className="text-xs font-medium text-muted">Source</label>
          <select
            id="source-filter"
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="text-sm border border-border rounded px-2 py-1.5 bg-white"
          >
            <option value="all">All sources</option>
            {sources.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-sm text-muted mb-4">
        Showing {filtered.length} of {mentions.length} mentions
      </p>

      {/* ── List ──────────────────────────────── */}
      <div className="space-y-4">
        {filtered.map((m) => (
          <article
            key={m.id}
            className="mention-card border border-border rounded-lg p-4 hover:border-accent/30 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-sans font-semibold text-base leading-snug mb-1">
                  <a href={m.url} target="_blank" rel="noopener noreferrer" className="no-underline text-ink hover:text-accent">
                    {m.title}
                  </a>
                </h3>
                <p className="text-sm text-muted">
                  <span>{m.source}</span>
                  {m.date && <span> · {m.date}</span>}
                  {m.language && <span> · {m.language.toUpperCase()}</span>}
                </p>
                {m.signalsActivated.length > 0 && (
                  <p className="text-xs text-muted/60 mt-1">
                    Signals: {m.signalsActivated.join(', ')}
                  </p>
                )}
              </div>
              <BadgeScore score={m.score} />
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted py-12">
          No mentions match your filters.
        </p>
      )}
    </div>
  );
}
