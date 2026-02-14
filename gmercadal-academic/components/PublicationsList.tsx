'use client';

import { useState, useMemo } from 'react';
import type { Publication } from '@/lib/types';

interface Props {
  publications: Publication[];
  years: string[];
  types: string[];
}

export function PublicationsList({ publications, years, types }: Props) {
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [doiOnly, setDoiOnly] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return publications.filter((p) => {
      if (yearFilter !== 'all' && p.year?.toString() !== yearFilter) return false;
      if (typeFilter !== 'all' && p.type !== typeFilter) return false;
      if (doiOnly && !p.doi) return false;
      if (search) {
        const q = search.toLowerCase();
        const haystack = `${p.title} ${p.authors.join(' ')} ${p.journal ?? ''} ${p.abstract ?? ''}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [publications, yearFilter, typeFilter, doiOnly, search]);

  return (
    <div>
      {/* ── Filters ──────────────────────────── */}
      <div className="no-print flex flex-wrap gap-3 mb-8 p-4 bg-white border border-border rounded-lg" role="search" aria-label="Filter publications">
        <div className="flex flex-col gap-1">
          <label htmlFor="year-filter" className="text-xs font-medium text-muted">Year</label>
          <select
            id="year-filter"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="text-sm border border-border rounded px-2 py-1.5 bg-white"
          >
            <option value="all">All years</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="type-filter" className="text-xs font-medium text-muted">Type</label>
          <select
            id="type-filter"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-sm border border-border rounded px-2 py-1.5 bg-white"
          >
            <option value="all">All types</option>
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="search-pubs" className="text-xs font-medium text-muted">Search</label>
          <input
            id="search-pubs"
            type="search"
            placeholder="Title, author, journal…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-sm border border-border rounded px-2 py-1.5 w-48 sm:w-64"
          />
        </div>

        <div className="flex items-end">
          <label className="flex items-center gap-2 text-sm text-muted cursor-pointer py-1.5">
            <input
              type="checkbox"
              checked={doiOnly}
              onChange={(e) => setDoiOnly(e.target.checked)}
              className="rounded"
            />
            DOI only
          </label>
        </div>
      </div>

      {/* ── Count ─────────────────────────────── */}
      <p className="text-sm text-muted mb-4">
        Showing {filtered.length} of {publications.length} publications
      </p>

      {/* ── List ──────────────────────────────── */}
      <div className="space-y-4">
        {filtered.map((pub) => (
          <article
            key={pub.id}
            className="publication-card border border-border rounded-lg p-4 hover:border-accent/30 transition-colors"
          >
            <h3 className="font-sans font-semibold text-base leading-snug mb-1.5">
              {pub.url ? (
                <a href={pub.url} target="_blank" rel="noopener noreferrer" className="no-underline text-ink hover:text-accent">
                  {pub.title}
                </a>
              ) : (
                pub.title
              )}
            </h3>

            <p className="text-sm text-muted mb-1">
              {pub.journal && <span className="italic">{pub.journal}</span>}
              {pub.journal && pub.year && ' · '}
              {pub.year}
              {pub.type && <span className="ml-2 text-xs bg-accent/5 text-accent px-1.5 py-0.5 rounded">{pub.type}</span>}
            </p>

            {pub.authors.length > 0 && (
              <p className="text-xs text-muted line-clamp-1">
                {pub.authors.join(', ')}
              </p>
            )}

            {pub.abstract && (
              <details className="mt-2 no-print">
                <summary className="text-xs text-accent cursor-pointer hover:text-accent-light">
                  Abstract
                </summary>
                <p className="text-sm text-muted mt-1 leading-relaxed">
                  {pub.abstract}
                </p>
              </details>
            )}

            <div className="flex flex-wrap gap-2 mt-2 text-xs">
              {pub.doi && (
                <a
                  href={`https://doi.org/${pub.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent/70 hover:text-accent no-underline font-mono"
                >
                  DOI
                </a>
              )}
              {pub.pmid && (
                <a
                  href={`https://pubmed.ncbi.nlm.nih.gov/${pub.pmid}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent/70 hover:text-accent no-underline font-mono"
                >
                  PubMed
                </a>
              )}
              {pub.sources.length > 0 && (
                <span className="text-muted/50 ml-auto">
                  via {pub.sources.join(', ')}
                </span>
              )}
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted py-12">
          No publications match your filters.
        </p>
      )}
    </div>
  );
}
