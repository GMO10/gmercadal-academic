'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLang } from '@/lib/LangProvider';
import { BadgeScore } from '@/components/BadgeScore';
import pubsData from '@/data/publications.json';
import mentionsData from '@/data/mentions.json';
import confsData from '@/data/conferences.json';
import awardsData from '@/data/awards.json';
import identityData from '@/config/identity.json';

const identity: any = identityData;
const pubs: any = pubsData;
const mentions: any = mentionsData;
const confs: any = confsData;
const awards: any = awardsData;

export default function HomePage() {
  const { t, lang } = useLang();
  const latestPubs = pubs.publications.slice(0, 5);
  const latestMentions = mentions.mentions.slice(0, 4);

  // Stats
  const pubCount = pubs.count || pubs.publications.length;
  const awardsCount = awards.awards?.length || 0;
  const confsCount = confs.count || confs.conferences?.length || 0;
  const years = pubs.publications.map((p: any) => p.year).filter(Boolean);
  const firstYear = years.length ? Math.min(...years) : 2003;

  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="hero-section py-16 md:py-24 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* Photo + Social icons */}
            <div className="flex-shrink-0 animate-in">
              <div className="w-40 h-40 md:w-52 md:h-52 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl rotate-1 hover:rotate-0 transition-transform">
                <Image
                  src="/profile.jpg"
                  alt={identity.person.fullName}
                  width={208}
                  height={208}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              {/* Social links under photo */}
              <div className="flex gap-4 justify-center mt-4">
                <a
                  href="https://x.com/bielmercadal1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-gold transition-colors"
                  aria-label="X / Twitter"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.848L2.25 2.25h6.844l4.25 5.621 4.9-5.621zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/gabriel-mercadal-orfila-0b233541/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-gold transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Bio */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3 animate-in animate-delay-1">
                {t('hero.subtitle')}
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 leading-tight animate-in animate-delay-2">
                {identity.person.fullName}
              </h1>
              <p className="text-lg text-white/70 leading-relaxed max-w-2xl mb-8 animate-in animate-delay-3">
                {t('hero.bio')}
              </p>

              {/* Links */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start animate-in animate-delay-4">
                {identity.person.links.orcid && (
                  <a href={identity.person.links.orcid} target="_blank" rel="noopener noreferrer" className="profile-link">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-1.847-1.178-3.722-3.953-3.722h-2.366z"/></svg>
                    ORCID
                  </a>
                )}
                {identity.person.links.scholar && (
                  <a href={identity.person.links.scholar} target="_blank" rel="noopener noreferrer" className="profile-link">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M5.242 13.769 0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/></svg>
                    Scholar
                  </a>
                )}
                {identity.person.links.linkedin && (
                  <a href={identity.person.links.linkedin} target="_blank" rel="noopener noreferrer" className="profile-link">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn
                  </a>
                )}
                <a href="/cv.pdf" download className="profile-link-accent">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                  {t('hero.downloadCV')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STAT CARDS ────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 relative z-20 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="stat-card text-center">
            <div className="text-3xl font-bold text-navy font-serif">{pubCount}</div>
            <div className="text-sm text-slate mt-1">{t('pubs.count')}</div>
          </div>
          <div className="stat-card text-center">
            <div className="text-3xl font-bold text-navy font-serif">{awardsCount}</div>
            <div className="text-sm text-slate mt-1">{lang === 'ca' ? 'Premis i beques' : lang === 'es' ? 'Premios y becas' : 'Awards & Grants'}</div>
          </div>
          <div className="stat-card text-center">
            <div className="text-3xl font-bold text-navy font-serif">{confsCount}</div>
            <div className="text-sm text-slate mt-1">{lang === 'ca' ? 'Comunicacions' : lang === 'es' ? 'Comunicaciones' : 'Conference Papers'}</div>
          </div>
          <div className="stat-card text-center">
            <div className="text-3xl font-bold text-navy font-serif">{new Date().getFullYear() - firstYear}+</div>
            <div className="text-sm text-slate mt-1">{lang === 'ca' ? "Anys d\u2019experi\u00e8ncia" : lang === 'es' ? 'Años de experiencia' : 'Years of Experience'}</div>
          </div>
        </div>
      </section>

      {/* ── ACADEMIC BACKGROUND ───────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
        <div className="section-header">
          <h2 className="section-title">{t('bg.title')}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="stat-card">
            <div className="text-gold mb-3">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.1 2.686 2 6 2s6-.9 6-2v-5"/></svg>
            </div>
            <p className="text-sm text-slate leading-relaxed">{t('bg.p1')}</p>
          </div>
          <div className="stat-card">
            <div className="text-gold mb-3">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            </div>
            <p className="text-sm text-slate leading-relaxed">{t('bg.p2')}</p>
          </div>
          <div className="stat-card">
            <div className="text-gold mb-3">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <p className="text-sm text-slate leading-relaxed">{t('bg.p3')}</p>
          </div>
          <div className="stat-card">
            <div className="text-gold mb-3">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            </div>
            <p className="text-sm text-slate leading-relaxed">{t('bg.p4')}</p>
          </div>
        </div>
      </section>

      {/* ── LATEST PUBLICATIONS ────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
        <div className="section-header">
          <h2 className="section-title">{t('home.latestPubs')}</h2>
          <Link href="/publications" className="section-link">
            {t('home.viewAll')} ({pubs.count}) &rarr;
          </Link>
        </div>
        <div className="space-y-3">
          {latestPubs.map((pub: any) => (
            <article key={pub.id} className="pub-card group">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-navy/5 flex items-center justify-center text-navy/30 font-serif text-sm font-bold">
                  {pub.year || '\u2014'}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-sans font-semibold text-[15px] leading-snug mb-1">
                    {pub.url ? (
                      <a href={pub.url} target="_blank" rel="noopener noreferrer"
                        className="no-underline text-navy group-hover:text-gold transition-colors">
                        {pub.title}
                      </a>
                    ) : (
                      <span className="text-navy">{pub.title}</span>
                    )}
                  </h3>
                  <p className="text-sm text-slate">
                    {pub.journal && <span className="italic">{pub.journal}</span>}
                    {pub.journal && pub.year && <span className="mx-1.5 text-slate/30">&middot;</span>}
                    {pub.year && <span>{pub.year}</span>}
                  </p>
                  {pub.authors && pub.authors.length > 0 && (
                    <p className="text-xs text-slate/60 mt-1 line-clamp-1">{pub.authors.join(', ')}</p>
                  )}
                </div>
                {pub.doi && (
                  <span className="hidden sm:inline-flex flex-shrink-0 text-[10px] font-mono bg-navy/5 text-navy/40 px-2 py-1 rounded">DOI</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── RECENT MEDIA ──────────────────────────────── */}
      {latestMentions.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
          <div className="section-header">
            <h2 className="section-title">{t('home.recentMentions')}</h2>
            <Link href="/mentions" className="section-link">
              {t('home.viewAll')} ({mentions.count}) &rarr;
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {latestMentions.map((m: any) => (
              <article key={m.id} className="mention-card group">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-navy/5 flex items-center justify-center text-lg">
                    {m.type === 'video' ? '🎬' : m.type === 'social' ? '💬' : '📰'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-sans font-semibold text-sm leading-snug mb-1">
                      <a href={m.url} target="_blank" rel="noopener noreferrer"
                        className="no-underline text-navy group-hover:text-gold transition-colors">
                        {m.title}
                      </a>
                    </h3>
                    <p className="text-xs text-slate">
                      {m.source}
                      {m.date && <span> &middot; {m.date}</span>}
                    </p>
                  </div>
                  <BadgeScore score={m.score} />
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ── PRINT BUTTON ──────────────────────────────── */}
      <div className="no-print text-center mb-16">
        <button
          onClick={() => window.print()}
          className="text-sm text-slate border border-border-light rounded-full px-6 py-2.5 hover:border-gold hover:text-gold transition-all cursor-pointer bg-transparent"
        >
          {t('home.print')}
        </button>
      </div>
    </>
  );
}
