import type { MetadataRoute } from 'next';
import { resumeData } from '@/lib/resume-data';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://xmike04.github.io');

export default function sitemap(): MetadataRoute.Sitemap {
  const items = [...resumeData.workExperience, ...resumeData.projects].map((item) => ({
    url: `${siteUrl}/item/${item.id}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    { url: siteUrl, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/resume`, changeFrequency: 'monthly', priority: 0.9 },
    ...items,
  ];
}
