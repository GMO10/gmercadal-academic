'use client';

export function BadgeScore({ score }: { score: number }) {
  let color = 'bg-score-low/10 text-score-low border-score-low/20';
  if (score >= 10) color = 'bg-score-high/10 text-score-high border-score-high/20';
  else if (score >= 6) color = 'bg-score-mid/10 text-score-mid border-score-mid/20';

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-mono font-medium border shrink-0 ${color}`}
      title={`Relevance score: ${score}`}
      aria-label={`Relevance score: ${score}`}
    >
      {score}
    </span>
  );
}
