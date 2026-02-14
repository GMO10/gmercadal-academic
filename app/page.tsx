'use client';

import Link from 'next/link';
import { BadgeScore } from '@/components/BadgeScore';
import pubsData from '@/data/publications.json';
import mentionsData from '@/data/mentions.json';
import identityData from '@/config/identity.json';

export default function HomePage() {
  const identity = identityData;
  const pubs = pubsData;
  const mentions = mentionsData;

  const latestPubs = pubs.publications.slice(0, 5);
  const latestMentions = mentions.mentions.slice(0, 3);

  return (
    <>
      <section aria-labelledby="profile-heading" className="mb-16">
        <h1 id="profile-heading" className="font-serif text-3xl sm:text-4xl font-bold mb-4 text-ink">
          {identity.person.fullName}
        </h1>
        <p className="text-lg text-muted leading-relaxed max-w-2xl mb-6">
          {identity.person.bio}
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          {identity.person.links.orcid && (
            <a href={identity.person.links.orcid} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border hover:border-accent/40 no-underline text-muted hover:text-accent transition-all">
              ORCID
            </a>
          )}
          {identity.person.links.scholar && (
            <a href={identity.person.links.scholar} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border hover:border-accent/40 no-underline text-muted hover:text-accent transition-all">
              Scholar
            </a>
          )}
          {identity.person.links.linkedin && (
            <a href={identity.person.links.linkedin} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border hover:border-accent/40 no-underline text-muted hover:text-accent transition-all">
              LinkedIn
            </a>
          )}
          <a href="/cv.docx" download
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/5 no-underline text-accent hover:bg-accent/10 transition-all">
            Download CV
          </a>
        </div>
      </section>

      <section aria-labelledby="latest-pubs" className="mb-16">
        <div className="flex items-baseline justify-between mb-6">
          <h2 id="latest-pubs" className="font-serif text-2xl font-bold">Latest Publications</h2>
          <Link href="/publications" className="text-sm text-muted hover:text-accent no-underline">
            View all {pubs.count} →
          </Link>
        </div>
        <div className="space-y-4">
          {latestPubs.map((pub) => (
            <article key={pub.id} className="publication-card border border-border rounded-lg p-4 hover:border-accent/30 transition-colors">
              <h3 className="font-sans font-semibold text-base leading-snug mb-1">
                {pub.url ? (
                  <a href={pub.url} target="_blank" rel="noopener noreferrer" className="no-underline text-ink hover:text-accent">{pub.title}</a>
                ) : pub.title}
              </h3>
              <p className="text-sm text-muted">
                {pub.journal && <span className="italic">{pub.journal}</span>}
                {pub.journal && pub.year && ' - '}
                {pub.year && <span>{pub.year}</span>}
              </p>
              {pub.authors.length > 0 && (
                <p className="text-xs text-muted mt-1 line-clamp-1">{pub.authors.join(', ')}</p>
              )}
            </article>
          ))}
        </div>
      </section>

      {latestMentions.length > 0 && (
        <section aria-labelledby="latest-mentions" className="mb-16">
          <div className="flex items-baseline justify-between mb-6">
            <h2 id="latest-mentions" className="font-serif text-2xl font-bold">Recent Mentions</h2>
            <Link href="/mentions" className="text-sm text-muted hover:text-accent no-underline">
              View all {mentions.count} →
            </Link>
          </div>
          <div className="space-y-4">
            {latestMentions.map((m) => (
              <article key={m.id} className="mention-card border border-border rounded-lg p-4 hover:border-accent/30 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-sans font-semibold text-base leading-snug mb-1">
                      <a href={m.url} target="_blank" rel="noopener noreferrer" className="no-underline text-ink hover:text-accent">{m.title}</a>
                    </h3>
                    <p className="text-sm text-muted">
                      {m.source}{m.date && (' - ' + m.date)}{m.language && (' - ' + m.language.toUpperCase())}
                    </p>
                  </div>
                  <BadgeScore score={m.score} />
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <div className="no-print text-center mt-8">
        <button
          onClick={() => window.print()}
          className="text-sm text-muted border border-border rounded-lg px-4 py-2 hover:border-accent/40 hover:text-accent transition-all cursor-pointer"
        >
          Print / Save PDF
        </button>
      </div>
    </>
  );
}