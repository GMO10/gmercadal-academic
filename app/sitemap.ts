import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://gmercadal-academic.vercel.app';

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/publications`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/mentions`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];
}
