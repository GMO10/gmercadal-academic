import type { Metadata } from 'next';
import { getMentions } from '@/lib/data';
import { MentionsList } from '@/components/MentionsList';

export const metadata: Metadata = {
  title: 'Mentions & News',
  description: 'News articles and media mentions related to G. Mercadal-Orfila, auto-collected and scored for relevance.',
};

export default function MentionsPage() {
  const data = getMentions();

  // Extract filter options
  const langSet = new Set(data.mentions.map((m) => m.language).filter(Boolean) as string[]);
  const sourceSet = new Set(data.mentions.map((m) => m.domain).filter(Boolean));

  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold mb-2">Mentions &amp; News</h1>
        <p className="text-muted">
          {data.count} mentions (score ≥ {data.scoreThreshold}) · Last updated{' '}
          <time dateTime={data.lastUpdated}>
            {new Date(data.lastUpdated).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </time>
        </p>
        <p className="text-sm text-muted mt-2">
          Each mention is scored for relevance using affiliation signals, name matching, and
          thematic keywords. Adjust the minimum score slider to see more or fewer results.
        </p>
      </div>

      <MentionsList
        mentions={data.mentions}
        languages={[...langSet].sort()}
        sources={[...sourceSet].sort()}
        defaultThreshold={data.scoreThreshold}
      />
    </>
  );
}
