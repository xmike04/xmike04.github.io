
import { resumeData } from '@/lib/resume-data';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  const allItems = [...resumeData.workExperience, ...resumeData.projects];
  return allItems.map((item) => ({ id: item.id }));
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CaseStudyView from '@/components/sections/case-study-view';
import Link from 'next/link';
import { ArrowLeft, Briefcase, Rocket, Link as LinkIcon, CheckCircle2 } from 'lucide-react';

export default function ItemPage({ params }: { params: { id: string } }) {
  const allItems = [...resumeData.workExperience, ...resumeData.projects];
  const item = allItems.find(i => i.id === params.id) as (typeof allItems[number] & {
    logo?: string;
    logoAiHint?: string;
    caseStudy?: import('@/components/sections/case-study-view').CaseStudy;
    links?: { label: string; url: string; }[];
  });

  if (!item) {
    notFound();
  }

  const Icon = item.type === 'work' ? Briefcase : Rocket;

  // Legacy detailedContent renderer (work experience + non-case-study projects)
  const contentKey = item.type === 'work' ? 'Key Responsibilities & Learnings:' : 'Key Contributions & Technical Details:';
  const contentParts = item.detailedContent?.trim().split(contentKey);
  const intro = contentParts?.[0] || '';
  const responsibilities = contentParts?.[1]
    ?.split('- ')
    .filter(r => r.trim())
    .map(r => {
      const [title, ...description] = r.split(':');
      return { title: title.trim(), description: description.join(':').trim() };
    }) ?? [];

  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="sticky top-0 left-0 right-0 p-4 z-20 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto flex justify-between items-center">
          <Button variant="ghost" asChild>
            <Link href="/#experience">
              <ArrowLeft className="mr-2" />
              Back to Portfolio
            </Link>
          </Button>
          <Link href="/" className="font-headline text-2xl font-bold text-primary">Marin Insights</Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 md:py-24">
        <article className="max-w-4xl mx-auto">
          <header className="mb-12 text-center">
            <div className="flex justify-center items-center gap-4 mb-8">
              <Icon className="w-12 h-12 text-primary" />
            </div>
            <h1 className="font-headline text-4xl md:text-5xl font-bold">{item.title}</h1>
            <p className="text-xl text-muted-foreground mt-2 mb-4">{item.company}</p>
            <Badge variant="secondary">{item.date}</Badge>
          </header>

          {item.caseStudy ? (
            /* ── Case study template ── */
            <CaseStudyView data={item.caseStudy} />
          ) : (
            /* ── Legacy detailedContent layout ── */
            <>
              <Card className="shadow-lg border-2 border-primary/10 mb-12">
                <CardContent className="p-6 md:p-8">
                  <p className="prose prose-lg dark:prose-invert max-w-none mx-auto text-muted-foreground leading-relaxed">
                    {intro}
                  </p>
                </CardContent>
              </Card>

              {responsibilities.length > 0 && (
                <div>
                  <h3 className="font-headline text-2xl md:text-3xl font-bold mb-8 text-center">
                    {contentKey.replace(':', '')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {responsibilities.map((resp, index) => (
                      <Card key={index} className="shadow-md hover:shadow-xl transition-shadow duration-300">
                        <CardHeader className="flex flex-row items-center gap-4">
                          <CheckCircle2 className="w-8 h-8 text-primary shrink-0" />
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
                  <h3 className="font-headline text-2xl font-bold mb-4">Project Links</h3>
                  <div className="flex flex-wrap justify-center gap-4">
                    {item.links.map((link, index) => (
                      <Button asChild key={index} variant="outline">
                        <Link href={link.url} target="_blank" rel="noopener noreferrer">
                          <LinkIcon className="mr-2" />
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
      </main>

      <footer className="bg-foreground text-muted-foreground text-center p-6 mt-16">
        <p>&copy; 2024 Michael E. Marin. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
