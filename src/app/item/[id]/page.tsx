import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Link as LinkIcon,
  Rocket,
} from 'lucide-react';
import { resumeData, type ProjectItem, type WorkItem } from '@/lib/resume-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CaseStudyView from '@/components/sections/case-study-view';
import { ThemeToggle } from '@/components/theme/theme-toggle';

const ALL_ITEMS: (WorkItem | ProjectItem)[] = [
  ...resumeData.workExperience,
  ...resumeData.projects,
];

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://xmike04.github.io');

export function generateStaticParams() {
  return ALL_ITEMS.map((item) => ({ id: item.id }));
}

function truncate(text: string, max = 158): string {
  const clean = text.trim().replace(/\s+/g, ' ');
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max).replace(/\s+\S*$/, '')}…`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = ALL_ITEMS.find((i) => i.id === id);
  if (!item) return { title: 'Not Found' };

  const title = `${item.title} | Michael E. Marin`;
  const description = truncate(item.caseStudy?.problem ?? item.description[0] ?? '');

  return {
    title,
    description,
    alternates: { canonical: `/item/${item.id}` },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `/item/${item.id}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

function buildJsonLd(item: WorkItem | ProjectItem) {
  const url = `${siteUrl}/item/${item.id}`;
  const description = truncate(item.caseStudy?.problem ?? item.description[0] ?? '', 300);
  const author = {
    '@type': 'Person',
    name: 'Michael E. Marin',
    url: siteUrl,
  };

  if (item.id === 'simlyfe') {
    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareSourceCode',
      name: item.title,
      description,
      url,
      author,
      codeRepository: 'https://github.com/xmike04/SIMLYFE',
      programmingLanguage: 'TypeScript',
      runtimePlatform: 'Web browser',
    };
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: item.title,
    description,
    url,
    author,
    ...(item.caseStudy?.techStack?.length
      ? { keywords: item.caseStudy.techStack.join(', ') }
      : {}),
  };
}

export default async function ItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const index = ALL_ITEMS.findIndex((i) => i.id === id);

  if (index === -1) {
    notFound();
  }

  const item = ALL_ITEMS[index];
  const prev = index > 0 ? ALL_ITEMS[index - 1] : null;
  const next = index < ALL_ITEMS.length - 1 ? ALL_ITEMS[index + 1] : null;

  const Icon = item.type === 'work' ? Briefcase : Rocket;
  const jsonLd = buildJsonLd(item);

  // Legacy detailedContent renderer (work experience + non-case-study projects)
  const contentKey =
    item.type === 'work'
      ? 'Key Responsibilities & Learnings:'
      : 'Key Contributions & Technical Details:';
  const contentParts = item.detailedContent?.trim().split(contentKey);
  const intro = contentParts?.[0] || '';
  const responsibilities =
    contentParts?.[1]
      ?.split('- ')
      .filter((r) => r.trim())
      .map((r) => {
        const [title, ...description] = r.split(':');
        return { title: title.trim(), description: description.join(':').trim() };
      }) ?? [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/#experience">
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              Back to Portfolio
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="font-headline text-lg font-bold tracking-tight transition-colors hover:text-primary"
            >
              Michael Marin
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 md:py-24">
        <article className="mx-auto max-w-4xl">
          <header className="mb-14 text-center">
            <div className="mb-8 flex items-center justify-center">
              <span className="glass inline-flex h-16 w-16 items-center justify-center rounded-2xl">
                <Icon className="h-8 w-8 text-primary" aria-hidden="true" />
              </span>
            </div>
            <h1 className="font-headline text-4xl font-bold tracking-tight text-balance md:text-5xl">
              {item.title}
            </h1>
            <p className="mt-3 text-xl text-muted-foreground">{item.company}</p>
            <Badge variant="secondary" className="mt-4 font-mono text-xs font-normal">
              {item.date}
            </Badge>
          </header>

          {item.caseStudy ? (
            /* ── Case study template ── */
            <CaseStudyView data={item.caseStudy} />
          ) : (
            /* ── Legacy detailedContent layout ── */
            <>
              <Card className="glass mb-12 border-primary/10 shadow-lg">
                <CardContent className="p-6 md:p-8">
                  <p className="mx-auto max-w-none leading-relaxed text-muted-foreground">
                    {intro}
                  </p>
                </CardContent>
              </Card>

              {responsibilities.length > 0 && (
                <div>
                  <h2 className="mb-8 text-center font-headline text-2xl font-bold md:text-3xl">
                    {contentKey.replace(':', '')}
                  </h2>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {responsibilities.map((resp, i) => (
                      <Card
                        key={i}
                        className="glass shadow-md transition-shadow duration-300 hover:shadow-xl"
                      >
                        <CardHeader className="flex flex-row items-center gap-4">
                          <CheckCircle2
                            className="h-8 w-8 shrink-0 text-primary"
                            aria-hidden="true"
                          />
                          <CardTitle className="font-headline text-xl">{resp.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{resp.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {item.links && item.links.length > 0 && (
                <div className="mt-16 text-center">
                  <h2 className="mb-4 font-headline text-2xl font-bold">Project Links</h2>
                  <div className="flex flex-wrap justify-center gap-4">
                    {item.links.map((link, i) => (
                      <Button asChild key={i} variant="outline">
                        <Link href={link.url} target="_blank" rel="noopener noreferrer">
                          <LinkIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                          {link.label}
                        </Link>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </article>

        {/* ── Prev / next navigation ── */}
        {(prev || next) && (
          <nav
            aria-label="More work and projects"
            className="mx-auto mt-20 grid max-w-4xl gap-4 sm:grid-cols-2"
          >
            {prev ? (
              <Link
                href={`/item/${prev.id}`}
                className="glass group rounded-xl p-5 transition-colors hover:border-primary/40"
              >
                <span className="mb-2 flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                  <ArrowLeft
                    className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5"
                    aria-hidden="true"
                  />
                  Previous
                </span>
                <span className="font-headline font-semibold transition-colors group-hover:text-primary">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span aria-hidden="true" className="hidden sm:block" />
            )}
            {next && (
              <Link
                href={`/item/${next.id}`}
                className="glass group rounded-xl p-5 text-right transition-colors hover:border-primary/40 sm:col-start-2"
              >
                <span className="mb-2 flex items-center justify-end gap-1.5 font-mono text-xs text-muted-foreground">
                  Next
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
                <span className="font-headline font-semibold transition-colors group-hover:text-primary">
                  {next.title}
                </span>
              </Link>
            )}
          </nav>
        )}
      </main>

      <footer className="border-t border-border/60 p-6 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Michael E. Marin. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
