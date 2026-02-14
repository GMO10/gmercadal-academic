import Link from 'next/link';
import { getPublications, getMentions, getIdentity } from '@/lib/data';
import { BadgeScore } from '@/components/BadgeScore';

export default function HomePage() {
  const identity = getIdentity();
  const pubs = getPublications();
  const mentions = getMentions();

  const latestPubs = pubs.publications.slice(0, 5);
  const latestMentions = mentions.mentions.slice(0, 3);

  return (
    <>
      {/* ── Profile Section ───────────────────── */}
      <section aria-labelledby="profile-heading" className="mb-16">
        <h1
          id="profile-heading"
          className="font-serif text-3xl sm:text-4xl font-bold mb-4 text-ink"
        >
          {identity.person.fullName}
        </h1>
        <p className="text-lg text-muted leading-relaxed max-w-2xl mb-6">
          {identity.person.bio}
        </p>

        {/* Links */}
        <div className="flex flex-wrap gap-4 text-sm no-print-url">
          {identity.person.links.orcid && (
            <a href={identity.person.links.orcid} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border hover:border-accent/40 no-underline text-muted hover:text-accent transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 256 256" className="shrink-0" aria-hidden="true">
                <path fill="#A6CE39" d="M256 128c0 70.7-57.3 128-128 128S0 198.7 0 128 57.3 0 128 0s128 57.3 128 128z"/>
                <path fill="#fff" d="M86.3 186.2H70.9V79.1h15.4v107.1zm35.4 0h-15.2V79.1h15.2v107.1zM108.9 57c-5.7 0-10.2 4.6-10.2 10.2s4.6 10.2 10.2 10.2c5.7 0 10.2-4.6 10.2-10.2S114.6 57 108.9 57zM169.9 79.5c-21.4 0-33.3 11.7-33.3 11.7V79.1h-15.2v107.1h15.2v-59.2c0-15.7 10.6-22.8 21.5-22.8 12.4 0 18.6 8.5 18.6 22.4v59.6h15.4V120c0-23.9-12.5-40.5-22.2-40.5z"/>
              </svg>
              ORCID
            </a>
          )}
          {identity.person.links.scholar && (
            <a href={identity.person.links.scholar} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border hover:border-accent/40 no-underline text-muted hover:text-accent transition-all"
            >
              Scholar
            </a>
          )}
          {identity.person.links.linkedin && (
            <a href={identity.person.links.linkedin} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border hover:border-accent/40 no-underline text-muted hover:text-accent transition-all"
            >
              LinkedIn
            </a>
          )}
          <a
            href="/cv.docx"
            download
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/5 no-underline text-accent hover:bg-accent/10 transition-all"
          >
            ↓ Download CV
          </a>
        </div>
      </section>

      {/* ── Latest Publications ───────────────── */}
      <section aria-labelledby="latest-pubs" className="mb-16">
        <div className="flex items-baseline justify-between mb-6">
          <h2 id="latest-pubs" className="font-serif text-2xl font-bold">
            Latest Publications
          </h2>
          <Link
            href="/publications"
            className="text-sm text-muted hover:text-accent no-underline"
          >
            View all {pubs.count} →
          </Link>
        </div>

        <div className="space-y-4">
          {latestPubs.map((pub) => (
            <article
              key={pub.id}
              className="publication-card border border-border rounded-lg p-4 hover:border-accent/30 transition-colors"
            >
              <h3 className="font-sans font-semibold text-base leading-snug mb-1">
                {pub.url ? (
                  <a href={pub.url} target="_blank" rel="noopener noreferrer" className="no-underline text-ink hover:text-accent">
                    {pub.title}
                  </a>
                ) : (
                  pub.title
                )}
              </h3>
              <p className="text-sm text-muted">
                {pub.journal && <span className="italic">{pub.journal}</span>}
                {pub.journal && pub.year && ' · '}
                {pub.year && <span>{pub.year}</span>}
              </p>
              {pub.authors.length > 0 && (
                <p className="text-xs text-muted mt-1 line-clamp-1">
                  {pub.authors.join(', ')}
                </p>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* ── Latest Mentions ───────────────────── */}
      {latestMentions.length > 0 && (
        <section aria-labelledby="latest-mentions" className="mb-16">
          <div className="flex items-baseline justify-between mb-6">
            <h2 id="latest-mentions" className="font-serif text-2xl font-bold">
              Recent Mentions
            </h2>
            <Link
              href="/mentions"
              className="text-sm text-muted hover:text-accent no-underline"
            >
              View all {mentions.count} →
            </Link>
          </div>

          <div className="space-y-4">
            {latestMentions.map((m) => (
              <article
                key={m.id}
                className="mention-card border border-border rounded-lg p-4 hover:border-accent/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-sans font-semibold text-base leading-snug mb-1">
                      <a href={m.url} target="_blank" rel="noopener noreferrer" className="no-underline text-ink hover:text-accent">
                        {m.title}
                      </a>
                    </h3>
                    <p className="text-sm text-muted">
                      {m.source}
                      {m.date && ` · ${m.date}`}
                      {m.language && ` · ${m.language.toUpperCase()}`}
                    </p>
                  </div>
                  <BadgeScore score={m.score} />
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ── Print Button ─────────────────────── */}
      <div className="no-print text-center mt-8">
        <button
          onClick={() => {}}
          className="hidden"
          aria-hidden="true"
        />
        <PrintButton />
      </div>
    </>
  );
}

// Client component for print
function PrintButton() {
  return (
    <button
      className="text-sm text-muted border border-border rounded-lg px-4 py-2 hover:border-accent/40 hover:text-accent transition-all cursor-pointer no-print"
      // Using inline script workaround for server component
      // @ts-ignore
      onClick="window.print()"
    >
      🖨 Print / Save PDF
    </button>
  );
}
