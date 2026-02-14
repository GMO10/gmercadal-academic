'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BadgeScore } from '@/components/BadgeScore';
import { useLang } from '@/lib/LangProvider';
import pubsData from '@/data/publications.json';
import mentionsData from '@/data/mentions.json';
import identityData from '@/config/identity.json';

const identity: any = identityData;
const pubs: any = pubsData;
const mentions: any = mentionsData;

export default function HomePage() {
  const { t } = useLang();
  const latestPubs = pubs.publications.slice(0, 5);
  const latestMentions = mentions.mentions.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="hero-section relative mb-20">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-shrink-0">
            <div className="w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-navy/10 shadow-lg">
              <Image src="/profile.jpg" alt={identity.person.fullName} width={224} height={224} className="object-cover w-full h-full" priority />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <p className="text-sm font-medium tracking-widest uppercase text-gold mb-2">{t('hero.subtitle')}</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-navy mb-4 leading-tight">{identity.person.fullName}</h1>
            <p className="text-lg text-slate leading-relaxed max-w-2xl mb-6">{identity.person.bio}</p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {identity.person.links.orcid && (
                <a href={identity.person.links.orcid} target="_blank" rel="noopener noreferrer" className="profile-link">ORCID</a>
              )}
              {identity.person.links.scholar && (
                <a href={identity.person.links.scholar} target="_blank" rel="noopener noreferrer" className="profile-link">Scholar</a>
              )}
              {identity.person.links.linkedin && (
                <a href={identity.person.links.linkedin} target="_blank" rel="noopener noreferrer" className="profile-link">LinkedIn</a>
              )}
              <a href="/cv.docx" download className="profile-link-accent">{t('hero.downloadCV')}</a>
            </div>
          </div>
        </div>
        <div className="mt-12 flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-navy/20 to-transparent"></div>
          <div className="w-2 h-2 rounded-full bg-gold/60"></div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-navy/20 to-transparent"></div>
        </div>
      </section>

      {/* Academic Background */}
      <section aria-labelledby="background" className="mb-16">
        <h2 id="background" className="font-serif text-2xl font-bold text-navy mb-4">{t('bg.title')}</h2>
        <div className="border-l-4 border-gold/40 pl-6 space-y-3 text-slate leading-relaxed">
          <p>{t('bg.p1')}</p>
          <p>{t('bg.p2')}</p>
          <p>{t('bg.p3')}</p>
          <p>{t('bg.p4')}</p>
        </div>
      </section>

      {/* Latest Publications */}
      <section aria-labelledby="latest-pubs" className="mb-16">
        <div className="flex items-baseline justify-between mb-8">
          <h2 id="latest-pubs" className="font-serif text-2xl font-bold text-navy">{t('home.latestPubs')}</h2>
          <Link href="/publications" className="text-sm text-gold hover:text-gold-dark no-underline font-medium transition-colors">
            {t('home.viewAll')} {pubs.count} {'\u2192'}
          </Link>
        </div>
        <div className="space-y-4">
          {latestPubs.map((pub: any) => (
            <article key={pub.id} className="pub-card group">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-navy/5 flex items-center justify-center text-navy/40 font-serif text-sm font-bold">{pub.year || '\u2014'}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-sans font-semibold text-base leading-snug mb-1">
                    {pub.url ? (
                      <a href={pub.url} target="_blank" rel="noopener noreferrer" className="no-underline text-navy group-hover:text-gold transition-colors">{pub.title}</a>
                    ) : (<span className="text-navy">{pub.title}</span>)}
                  </h3>
                  <p className="text-sm text-slate">
                    {pub.journal && <span className="italic">{pub.journal}</span>}
                    {pub.journal && pub.year && <span className="mx-1 text-slate/40">{'\u00b7'}</span>}
                    {pub.year && <span>{pub.year}</span>}
                  </p>
                  {pub.authors && pub.authors.length > 0 && (
                    <p className="text-xs text-slate/70 mt-1 line-clamp-1">{pub.authors.join(', ')}</p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Recent Mentions */}
      {latestMentions.length > 0 && (
        <section aria-labelledby="latest-mentions" className="mb-16">
          <div className="flex items-baseline justify-between mb-8">
            <h2 id="latest-mentions" className="font-serif text-2xl font-bold text-navy">{t('home.recentMentions')}</h2>
            <Link href="/mentions" className="text-sm text-gold hover:text-gold-dark no-underline font-medium transition-colors">
              {t('home.viewAll')} {mentions.count} {'\u2192'}
            </Link>
          </div>
          <div className="space-y-4">
            {latestMentions.map((m: any) => (
              <article key={m.id} className="mention-card group border border-border rounded-lg p-4 hover:border-gold/30 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-sans font-semibold text-base leading-snug mb-1">
                      <a href={m.url} target="_blank" rel="noopener noreferrer" className="no-underline text-navy group-hover:text-gold transition-colors">{m.title}</a>
                    </h3>
                    <p className="text-sm text-slate">{m.source}{m.date && (' \u00b7 ' + m.date)}{m.language && (' \u00b7 ' + m.language.toUpperCase())}</p>
                  </div>
                  <BadgeScore score={m.score} />
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <div className="no-print text-center mt-8">
        <button onClick={() => window.print()} className="text-sm text-slate border border-border rounded-lg px-5 py-2.5 hover:border-gold/40 hover:text-gold transition-all cursor-pointer bg-transparent">
          {t('home.print')}
        </button>
      </div>
    </>
  );
}
