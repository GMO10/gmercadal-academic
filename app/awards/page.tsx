'use client';

import { useLang } from '@/lib/LangProvider';
import awardsData from '@/data/awards.json';

const data: any = awardsData;

export default function AwardsPage() {
  const { lang } = useLang();

  const awards = data.awards || [];

  const labels = {
    title: { en: 'Awards & Grants', es: 'Premios y Becas', ca: 'Premis i Beques' },
    subtitle: { en: 'Recognitions for innovation in hospital pharmacy, telepharmacy and artificial intelligence', es: 'Reconocimientos por innovación en farmacia hospitalaria, telefarmacia e inteligencia artificial', ca: 'Reconeixements per innovació en farmàcia hospitalària, telefarmàcia i intel·ligència artificial' },
    project: { en: 'Project', es: 'Proyecto', ca: 'Projecte' },
    category: { en: 'Category', es: 'Categoría', ca: 'Categoria' },
  };

  // Group by year
  const grouped = awards.reduce((acc: Record<number, any[]>, award: any) => {
    if (!acc[award.year]) acc[award.year] = [];
    acc[award.year].push(award);
    return acc;
  }, {} as Record<number, any[]>);

  const sortedYears = Object.keys(grouped).map(Number).sort((a, b) => b - a);

  return (
    <>
      <div className="mb-10">
        <h1 className="font-serif text-3xl font-bold mb-2 text-navy">
          🏆 {labels.title[lang]}
        </h1>
        <p className="text-slate">
          {data.count} {labels.subtitle[lang]}
        </p>
      </div>

      <div className="space-y-10">
        {sortedYears.map((year) => (
          <div key={year}>
            <h2 className="font-serif text-xl font-bold text-navy mb-4 border-b border-gold/30 pb-2">
              {year}
            </h2>
            <div className="space-y-4">
              {grouped[year].map((award: any) => (
                <article
                  key={award.id}
                  className="border border-border rounded-xl p-5 hover:border-gold/40 transition-all bg-white hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center text-2xl">
                      🏅
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-sans font-bold text-lg leading-snug text-navy mb-1">
                        {award.title}
                      </h3>
                      {award.project && (
                        <p className="text-sm font-semibold text-gold mb-1">
                          {labels.project[lang]}: {award.project}
                        </p>
                      )}
                      <p className="text-sm text-slate/80 mb-2 leading-relaxed">
                        {award.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="bg-navy/5 text-navy/70 px-2.5 py-1 rounded-full font-medium">
                          {award.organization}
                        </span>
                        {award.category && (
                          <span className="bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full font-medium">
                            {labels.category[lang]}: {award.category}
                          </span>
                        )}
                        {award.location && (
                          <span className="text-slate/50">
                            📍 {award.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
