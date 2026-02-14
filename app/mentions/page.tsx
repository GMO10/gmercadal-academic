'use client';

import { useState } from 'react';
import { useLang } from '@/lib/LangProvider';
import { BadgeScore } from '@/components/BadgeScore';
import mentionsData from '@/data/mentions.json';

const data: any = mentionsData;

const TYPE_ICONS: Record<string, string> = {
  news: '📰',
  video: '🎬',
  social: '💬',
};

const TYPE_LABELS: Record<string, Record<string, string>> = {
  news: { en: 'News', es: 'Noticias', ca: 'Notícies' },
  video: { en: 'Videos', es: 'Vídeos', ca: 'Vídeos' },
  social: { en: 'Social', es: 'Social', ca: 'Social' },
};

export default function MentionsPage() {
  const { t, lang } = useLang();
  const [activeType, setActiveType] = useState<string>('all');
  const [minScore, setMinScore] = useState(6);

  const mentions = data.mentions || [];

  // Get unique types
  const types = Array.from(new Set(mentions.map((m: any) => m.type || 'news'))) as string[];

  // Filter
  const filtered = mentions.filter((m: any) => {
    if (m.score < minScore) return false;
    if (activeType !== 'all' && (m.type || 'news') !== activeType) return false;
    return true;
  });

  // Count per type
  const countByType = (type: string) =>
    mentions.filter((m: any) => (m.type || 'news') === type && m.score >= minScore).length;

  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold mb-2 text-navy">
          {t('mentions.title')}
        </h1>
        <p className="text-slate">
          {data.count} {t('mentions.count')}
        </p>
      </div>

      {/* Type tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveType('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeType === 'all'
              ? 'bg-navy text-cream'
              : 'bg-navy/5 text-slate hover:bg-navy/10'
          }`}
        >
          {{ en: 'All', es: 'Todo', ca: 'Tot' }[lang]} ({mentions.filter((m: any) => m.score >= minScore).length})
        </button>
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeType === type
                ? 'bg-navy text-cream'
                : 'bg-navy/5 text-slate hover:bg-navy/10'
            }`}
          >
            {TYPE_ICONS[type] || '📄'} {TYPE_LABELS[type]?.[lang] || type} ({countByType(type)})
          </button>
        ))}
      </div>

      {/* Score filter */}
      <div className="mb-8 p-4 bg-navy/5 rounded-lg">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-navy whitespace-nowrap">
            Min {t('mentions.score')}: {minScore}
          </label>
          <input
            type="range"
            min={0}
            max={15}
            value={minScore}
            onChange={(e) => setMinScore(Number(e.target.value))}
            className="flex-1 accent-gold"
          />
        </div>
        <p className="text-xs text-slate mt-2">{t('mentions.scoreInfo')}</p>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {filtered.length === 0 && (
          <p className="text-slate text-center py-8">
            {{ en: 'No results with these filters.', es: 'Sin resultados con estos filtros.', ca: 'Sense resultats amb aquests filtres.' }[lang]}
          </p>
        )}
        {filtered.map((m: any) => (
          <article
            key={m.id}
            className="group border border-border rounded-lg p-4 hover:border-gold/30 transition-colors"
          >
            <div className="flex items-start gap-3">
              {/* Type icon */}
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-navy/5 flex items-center justify-center text-lg">
                {TYPE_ICONS[m.type] || '📄'}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-sans font-semibold text-base leading-snug mb-1">
                  <a
                    href={m.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline text-navy group-hover:text-gold transition-colors"
                  >
                    {m.title}
                  </a>
                </h3>
                <p className="text-sm text-slate">
                  {m.source}
                  {m.date && <span> · {m.date}</span>}
                  {m.language && <span> · {m.language.toUpperCase()}</span>}
                </p>
                {/* Signals */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {(m.signals || []).map((s: string, i: number) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-0.5 rounded-full bg-navy/5 text-slate/80"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <BadgeScore score={m.score} />
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
