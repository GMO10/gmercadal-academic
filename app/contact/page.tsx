import type { Metadata } from 'next';
import identityData from '@/config/identity.json';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact information and links for G. Mercadal-Orfila.',
};

export default function ContactPage() {
  const identity: any = identityData;
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
<p>
            <span className="text-muted text-sm block">Phone</span>
            <a href="tel:+34971487351">+34 971 48 73 51</a>
          </p>
          )}

          {links.email && (
            <p>
              <span className="text-muted text-sm block">Email</span>
              <a href={'mailto:' + links.email}>{links.email}</a>
            </p>
          )}
        </div>

        <div className="border border-border rounded-lg p-6">
          <h2 className="font-serif text-xl font-bold mb-3">Affiliations</h2>
          <ul className="space-y-2 text-sm text-muted list-none p-0">
            {identity.affiliations.map((aff: string, i: number) => (
              <li key={i} className="pl-0">{aff}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}