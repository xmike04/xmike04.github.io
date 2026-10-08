import type { MetadataRoute } from 'next';
import { resumeData } from '@/lib/resume-data';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const items = [...resumeData.workExperience, ...resumeData.projects].map((item) => ({
    url: `${SITE_URL}/item/${item.id}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    { url: SITE_URL, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/resume`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    ...items,
  ];
}
