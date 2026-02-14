'use client';

import { useLang } from '@/lib/LangProvider';
import { MentionsList } from '@/components/MentionsList';
import mentionsData from '@/data/mentions.json';

const data: any = mentionsData;

export default function MentionsPage() {
  const { t } = useLang();

  const langSet = Array.from(new Set(data.mentions.map((m: any) => m.language).filter(Boolean)));
  const sourceSet = Array.from(new Set(data.mentions.map((m: any) => m.domain).filter(Boolean)));

  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold mb-2 text-navy">{t('mentions.title')}</h1>
        <p className="text-slate">
          {data.count} {t('mentions.count')} ({t('mentions.score')} {'\u2265'} {data.scoreThreshold}) - {t('pubs.lastUpdated')}{' '}
          <time dateTime={data.lastUpdated}>
            {new Date(data.lastUpdated).toLocaleDateString('en-GB', {
              day: 'numeric', month: 'long', year: 'numeric',
            })}
          </time>
        </p>
        <p className="text-sm text-slate mt-2">{t('mentions.scoreInfo')}</p>
      </div>
      <MentionsList
        mentions={data.mentions}
        languages={langSet.sort()}
        sources={sourceSet.sort()}
        defaultThreshold={data.scoreThreshold}
      />
    </>
  );
}
