'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BadgeScore } from '@/components/BadgeScore';
import pubsData from '@/data/publications.json';
import mentionsData from '@/data/mentions.json';
import identityData from '@/config/identity.json';

const identity: any = identityData;
const pubs: any = pubsData;
const mentions: any = mentionsData;

export default function HomePage() {
  const latestPubs = pubs.publications.slice(0, 5);
  const latestMentions = mentions.mentions.slice(0, 3);

  return (
    <>
      {/* ── Hero Section ────────────────────────── */}
      <section className="hero-section relative mb-20">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Photo */}
          <div className="flex-shrink-0">
            <div className="w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-navy/10 shadow-lg">
              <Image
                src="/profile.jpg"
                alt={identity.person.fullName}
                width={224}
                height={224}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>

          {/* Bio */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-sm font-medium tracking-widest uppercase text-gold mb-2">
              Clinical Pharmacist &middot; Researcher &middot; Educator
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-navy mb-4 leading-tight">
              {identity.person.fullName}
            </h1>
            <p className="text-lg text-slate leading-relaxed max-w-2xl mb-6">
              {identity.person.bio}
            </p>

            {/* Links */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {identity.person.links.orcid && (
                <a href={identity.person.links.orcid} target="_blank" rel="noopener noreferrer"
                  className="profile-link">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-1.847-1.178-3.722-3.953-3.722h-2.366z"/></svg>
                  ORCID
                </a>
              )}
              {identity.person.links.scholar && (
                <a href={identity.person.links.scholar} target="_blank" rel="noopener noreferrer"
                  className="profile-link">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M5.242 13.769 0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/></svg>
                  Scholar
                </a>
              )}
              {identity.person.links.linkedin && (
                <a href={identity.person.links.linkedin} target="_blank" rel="noopener noreferrer"
                  className="profile-link">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
              )}
              <a href="/cv.docx" download className="profile-link-accent">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                Download CV
              </a>
            </div>
          </div>
        </div>

        {/* Decorative divider */}
        <div className="mt-12 flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-navy/20 to-transparent"></div>
          <div className="w-2 h-2 rounded-full bg-gold/60"></div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-navy/20 to-transparent"></div>
        </div>
      </section>
{/* ── Academic Background ─────────────────── */}
      <section aria-labelledby="background" className="mb-16">
        <h2 id="background" className="font-serif text-2xl font-bold text-navy mb-4">
          Academic Background
        </h2>
        <div className="border-l-4 border-gold/40 pl-6 space-y-3 text-slate leading-relaxed">
          <p>
            <span className="font-semibold text-navy">PhD in Pharmacy</span> (Cum Laude) from the Universitat de Barcelona, with a thesis on the effectiveness of glutamine in perioperative parenteral nutrition.
            <span className="font-semibold text-navy"> Specialist in Hospital Pharmacy</span> trained at Hospital Universitari de Bellvitge.
          </p>
          <p>
            Postgraduate diplomas in <span className="font-semibold text-navy">Health Sciences Statistics</span> (Universitat Autonoma de Barcelona) and <span className="font-semibold text-navy">Pharmacoeconomics</span> (Universitat Pompeu Fabra). Currently completing a <span className="font-semibold text-navy">Master in Medical Direction and Clinical Management</span> (UNED, 2023-2025).
          </p>
          <p>
            Associate Professor of Biochemistry and Nutrition at the Universitat de les Illes Balears. Scientific Coordinator of the postgraduate diploma in Value-Based Healthcare for Dermatological and Rheumatic Diseases (Universidad de Alcala, accredited by SEFH).
          </p>
          <p>
            His current research focuses on <span className="font-semibold text-navy">value-based healthcare</span>, specifically the implementation, analysis, and psychometric validation of PROMs and PREMs, as well as the application of <span className="font-semibold text-navy">artificial intelligence and machine learning</span> to build predictive models for patient-reported outcomes.
          </p>
        </div>
      </section>

      {/* ── Latest Publications ─────────────────── */}
      <section aria-labelledby="latest-pubs" className="mb-16">
        <div className="flex items-baseline justify-between mb-8">
          <h2 id="latest-pubs" className="font-serif text-2xl font-bold text-navy">
            Latest Publications
          </h2>
          <Link href="/publications" className="text-sm text-gold hover:text-gold-dark no-underline font-medium transition-colors">
            View all {pubs.count} &rarr;
          </Link>
        </div>
        <div className="space-y-4">
          {latestPubs.map((pub: any) => (
            <article key={pub.id} className="pub-card group">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-navy/5 flex items-center justify-center text-navy/40 font-serif text-sm font-bold">
                  {pub.year || '—'}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-sans font-semibold text-base leading-snug mb-1">
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
                    {pub.journal && pub.year && <span className="mx-1 text-slate/40">&middot;</span>}
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

      {/* ── Recent Mentions ─────────────────────── */}
      {latestMentions.length > 0 && (
        <section aria-labelledby="latest-mentions" className="mb-16">
          <div className="flex items-baseline justify-between mb-8">
            <h2 id="latest-mentions" className="font-serif text-2xl font-bold text-navy">
              Recent Mentions
            </h2>
            <Link href="/mentions" className="text-sm text-gold hover:text-gold-dark no-underline font-medium transition-colors">
              View all {mentions.count} &rarr;
            </Link>
          </div>
          <div className="space-y-4">
            {latestMentions.map((m: any) => (
              <article key={m.id} className="mention-card group border border-border rounded-lg p-4 hover:border-gold/30 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-sans font-semibold text-base leading-snug mb-1">
                      <a href={m.url} target="_blank" rel="noopener noreferrer"
                        className="no-underline text-navy group-hover:text-gold transition-colors">
                        {m.title}
                      </a>
                    </h3>
                    <p className="text-sm text-slate">
                      {m.source}{m.date && (' · ' + m.date)}{m.language && (' · ' + m.language.toUpperCase())}
                    </p>
                  </div>
                  <BadgeScore score={m.score} />
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ── Print Button ────────────────────────── */}
      <div className="no-print text-center mt-8">
        <button
          onClick={() => window.print()}
          className="text-sm text-slate border border-border rounded-lg px-5 py-2.5 hover:border-gold/40 hover:text-gold transition-all cursor-pointer bg-transparent"
        >
          Print / Save PDF
        </button>
      </div>
    </>
  );
}
