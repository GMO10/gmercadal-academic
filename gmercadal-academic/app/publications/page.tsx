import type { Metadata } from 'next';
import { getPublications } from '@/lib/data';
import { PublicationsList } from '@/components/PublicationsList';

export const metadata: Metadata = {
  title: 'Publications',
  description: 'Full list of academic publications by G. Mercadal-Orfila, sourced from ORCID, PubMed, and Crossref.',
};

export default function PublicationsPage() {
  const data = getPublications();

  // Extract filter options
  const years = Object.keys(data.yearIndex).sort((a, b) => b.localeCompare(a));
  const typeSet = new Set(data.publications.map((p) => p.type).filter(Boolean) as string[]);
  const types = [...typeSet].sort();

  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold mb-2">Publications</h1>
        <p className="text-muted">
          {data.count} publications · Last updated{' '}
          <time dateTime={data.lastUpdated}>
            {new Date(data.lastUpdated).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
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
