'use client';

import { useLang } from '@/lib/LangProvider';
import { PublicationsList } from '@/components/PublicationsList';
import pubsData from '@/data/publications.json';

const data: any = pubsData;

export default function PublicationsPage() {
  const { t } = useLang();

  const years = Array.from(new Set(data.publications.map((p: any) => p.year).filter(Boolean))).sort((a: any, b: any) => b - a);
  const types = Array.from(new Set(data.publications.map((p: any) => p.type).filter(Boolean))).sort();

  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold mb-2 text-navy">{t('pubs.title')}</h1>
        <p className="text-slate">
          {data.count} {t('pubs.count')} - {t('pubs.lastUpdated')}{' '}
          <time dateTime={data.lastUpdated}>
            {new Date(data.lastUpdated).toLocaleDateString('en-GB', {
              day: 'numeric', month: 'long', year: 'numeric',
            })}
          </time>
        </p>
      </div>
      <PublicationsList
        publications={data.publications}
        years={years}
        types={types}
      />
    </>
  );
}
