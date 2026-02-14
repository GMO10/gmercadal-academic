import type { Metadata } from 'next';
import { getIdentity } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact information and links for G. Mercadal-Orfila.',
};

export default function ContactPage() {
  const identity = getIdentity();
  const links = identity.person.links;

  return (
    <>
      <h1 className="font-serif text-3xl font-bold mb-6">Contact</h1>

      <div className="max-w-lg space-y-6">
        <div className="border border-border rounded-lg p-6 space-y-4">
          <h2 className="font-serif text-xl font-bold mb-3">Academic Profiles</h2>

          {links.orcid && (
            <p>
              <span className="text-muted text-sm block">ORCID</span>
              <a href={links.orcid} target="_blank" rel="noopener noreferrer">
                {identity.person.orcid}
              </a>
            </p>
          )}

          {links.scholar && (
            <p>
              <span className="text-muted text-sm block">Google Scholar</span>
              <a href={links.scholar} target="_blank" rel="noopener noreferrer">
                View profile
              </a>
            </p>
          )}

          {links.linkedin && (
            <p>
              <span className="text-muted text-sm block">LinkedIn</span>
              <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
                View profile
              </a>
            </p>
          )}

          {links.email && (
            <p>
              <span className="text-muted text-sm block">Email</span>
              <a href={`mailto:${links.email}`}>{links.email}</a>
            </p>
          )}
        </div>

        <div className="border border-border rounded-lg p-6">
          <h2 className="font-serif text-xl font-bold mb-3">Affiliations</h2>
          <ul className="space-y-2 text-sm text-muted list-none p-0">
            {identity.affiliations.map((aff, i) => (
              <li key={i} className="pl-0">{aff}</li>
            ))}
          </ul>
        </div>

        <div className="border border-border rounded-lg p-6">
          <h2 className="font-serif text-xl font-bold mb-3">CV</h2>
          <p className="text-sm text-muted mb-3">
            Download the full curriculum vitae in Word format.
          </p>
          <a
            href="/cv.docx"
            download
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-accent/30 bg-accent/5 no-underline text-accent hover:bg-accent/10 transition-all text-sm"
          >
            ↓ Download CV (.docx)
          </a>
        </div>
      </div>
    </>
  );
}
