'use client';

import { useState, useMemo } from 'react';
import { useLang } from '@/lib/LangProvider';
import confData from '@/data/conferences.json';

const data: any = confData;

const TYPE_LABELS: Record<string, Record<string, string>> = {
  poster: { en: 'Poster', es: 'Póster', ca: 'Pòster' },
  oral: { en: 'Oral', es: 'Oral', ca: 'Oral' },
};

const AREA_COLORS: Record<string, string> = {
  'Dermatología': 'bg-rose-100 text-rose-700',
  'VIH/Infecciosas': 'bg-red-100 text-red-700',
  'Telefarmacia/PROMs': 'bg-amber-100 text-amber-700',
  'IA/Machine Learning': 'bg-violet-100 text-violet-700',
  'Reumatología': 'bg-blue-100 text-blue-700',
  'Nutrición': 'bg-green-100 text-green-700',
  'EII': 'bg-orange-100 text-orange-700',
  'Migraña': 'bg-indigo-100 text-indigo-700',
  'Oftalmología': 'bg-cyan-100 text-cyan-700',
  'Oncología': 'bg-pink-100 text-pink-700',
  'Obesidad': 'bg-lime-100 text-lime-700',
  'Esclerosis Múltiple': 'bg-teal-100 text-teal-700',
};

export default function ConferencesPage() {
  const { lang } = useLang();
  const [filterYear, setFilterYear] = useState<string>('all');
  const [filterCongress, setFilterCongress] = useState<string>('all');
  const [filterArea, setFilterArea] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const conferences = data.conferences || [];

  // Extract unique values for filters
  const years = useMemo(() => {
    const y = [...new Set(conferences.map((c: any) => c.year))] as number[];
    return y.sort((a: number, b: number) => b - a);
  }, [conferences]);

  const congresses = useMemo(() => {
    const c = [...new Set(conferences.map((c: any) => c.congress))] as string[];
    return c.sort();
  }, [conferences]);

  const areas = useMemo(() => {
    const a = [...new Set(conferences.map((c: any) => c.area))] as string[];
    return a.sort();
  }, [conferences]);

  // Filter
  const filtered = useMemo(() => {
    return conferences.filter((c: any) => {
      if (filterYear !== 'all' && c.year !== Number(filterYear)) return false;
      if (filterCongress !== 'all' && c.congress !== filterCongress) return false;
      if (filterArea !== 'all' && c.area !== filterArea) return false;
      if (filterType !== 'all' && c.type !== filterType) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const text = `${c.title} ${c.authors} ${c.congress} ${c.location} ${c.area}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });
  }, [conferences, filterYear, filterCongress, filterArea, filterType, searchQuery]);

  // Group by year
  const groupedByYear = useMemo(() => {
    const groups: Record<number, any[]> = {};
    for (const c of filtered) {
      if (!groups[c.year]) groups[c.year] = [];
      groups[c.year].push(c);
    }
    return Object.entries(groups)
      .sort(([a], [b]) => Number(b) - Number(a));
  }, [filtered]);

  const labels = {
    title: { en: 'Conference Communications', es: 'Comunicaciones a Congresos', ca: 'Comunicacions a Congressos' },
    subtitle: { en: 'Posters and oral presentations at national and international conferences', es: 'Pósters y comunicaciones orales a congresos nacionales e internacionales', ca: 'Pòsters i comunicacions orals a congressos nacionals i internacionals' },
    allYears: { en: 'All years', es: 'Todos los años', ca: 'Tots els anys' },
    allCongresses: { en: 'All congresses', es: 'Todos los congresos', ca: 'Tots els congressos' },
    allAreas: { en: 'All areas', es: 'Todas las áreas', ca: 'Totes les àrees' },
    allTypes: { en: 'All types', es: 'Todos los tipos', ca: 'Tots els tipus' },
    search: { en: 'Search by title, author, congress...', es: 'Buscar por título, autor, congreso...', ca: 'Cercar per títol, autor, congrés...' },
    results: { en: 'communications', es: 'comunicaciones', ca: 'comunicacions' },
    noResults: { en: 'No results with these filters.', es: 'Sin resultados con estos filtros.', ca: 'Sense resultats amb aquests filtres.' },
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold mb-2 text-navy">
          {labels.title[lang]}
        </h1>
        <p className="text-slate">
          {data.count} {labels.subtitle[lang]}
        </p>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder={labels.search[lang]}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-gold bg-white"
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <select
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          className="px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:border-gold"
        >
          <option value="all">{labels.allYears[lang]}</option>
          {years.map((y: number) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        <select
          value={filterCongress}
          onChange={(e) => setFilterCongress(e.target.value)}
          className="px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:border-gold"
        >
          <option value="all">{labels.allCongresses[lang]}</option>
          {congresses.map((c: string) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={filterArea}
          onChange={(e) => setFilterArea(e.target.value)}
          className="px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:border-gold"
        >
          <option value="all">{labels.allAreas[lang]}</option>
          {areas.map((a: string) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:border-gold"
        >
          <option value="all">{labels.allTypes[lang]}</option>
          <option value="poster">{TYPE_LABELS.poster[lang]}</option>
          <option value="oral">{TYPE_LABELS.oral[lang]}</option>
        </select>
      </div>

      {/* Count */}
      <p className="text-sm text-slate mb-6">
        {filtered.length} {labels.results[lang]}
      </p>

      {/* Results grouped by year */}
      {groupedByYear.length === 0 && (
        <p className="text-slate text-center py-8">{labels.noResults[lang]}</p>
      )}

      {groupedByYear.map(([year, items]) => (
        <div key={year} className="mb-8">
          <h2 className="font-serif text-xl font-bold text-navy mb-4 border-b border-gold/30 pb-2">{year}</h2>
          <div className="space-y-4">
            {(items as any[]).map((c: any) => (
              <article key={c.id} className="border border-border rounded-lg p-4 hover:border-gold/30 transition-colors">
                <div className="flex items-start gap-3">
                  {/* Type badge */}
                  <div className={`flex-shrink-0 px-2 py-1 rounded text-xs font-medium ${c.type === 'oral' ? 'bg-gold/20 text-gold-dark' : 'bg-navy/5 text-navy/60'}`}>
                    {TYPE_LABELS[c.type]?.[lang] || c.type}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-sans font-semibold text-[15px] leading-snug text-navy mb-1">
                      {c.posterFile ? (
                        <a href={c.posterFile} target="_blank" rel="noopener noreferrer" className="no-underline text-navy hover:text-gold transition-colors">
                          {c.title}
                          <svg className="inline-block ml-1 w-3.5 h-3.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        </a>
                      ) : (
                        c.title
                      )}
                    </h3>
                    <p className="text-xs text-slate/70 mb-2 line-clamp-2">{c.authors}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm text-slate font-medium">{c.congress}</span>
                      <span className="text-slate/30">&middot;</span>
                      <span className="text-sm text-slate">{c.location}</span>
                      {c.area && (
                        <>
                          <span className="text-slate/30">&middot;</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${AREA_COLORS[c.area] || 'bg-gray-100 text-gray-600'}`}>{c.area}</span>
                        </>
                      )}
                      {c.posterFile && (
                        <>
                          <span className="text-slate/30">&middot;</span>
                          <a href={c.posterFile} target="_blank" rel="noopener noreferrer" className="text-xs text-gold font-medium no-underline hover:text-gold-dark flex items-center gap-1">
                            PDF
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
