
import { resumeData } from '@/lib/resume-data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Briefcase, Rocket, Link as LinkIcon } from 'lucide-react';

export default function ItemPage({ params }: { params: { id: string } }) {
  const allItems = [...resumeData.workExperience, ...resumeData.projects];
  const item = allItems.find(i => i.id === params.id) as (typeof allItems[number] & { logo?: string, logoAiHint?: string});

  if (!item) {
    notFound();
  }

  const Icon = item.type === 'work' ? Briefcase : Rocket;

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
            <div className="flex justify-center items-center gap-4 mb-4">
              <Icon className="w-12 h-12 text-primary" />
            </div>
            <div className="flex justify-center items-center gap-4">
              <h1 className="font-headline text-4xl md:text-5xl font-bold">{item.title}</h1>
              {item.logo && (
                <Image 
                  src={item.logo}
                  alt={`${item.company} logo`}
                  width={160}
                  height={40}
                  className="object-contain"
                  data-ai-hint={item.logoAiHint}
                />
              )}
            </div>
            <p className="text-xl text-muted-foreground mt-2 mb-4">{item.company}</p>
            <Badge variant="secondary">{item.date}</Badge>
          </header>

          <Card className="shadow-lg border-2 border-primary/10">
            <CardContent className="p-8">
              <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-muted-foreground leading-relaxed">
                {item.detailedContent?.trim().split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </CardContent>
          </Card>

          {item.links && item.links.length > 0 && (
            <div className="mt-12 text-center">
              <h3 className="font-headline text-2xl font-bold mb-4">Project Links</h3>
              <div className="flex justify-center gap-4">
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
        </article>
      </main>

      <footer className="bg-foreground text-muted-foreground text-center p-6 mt-16">
        <p>&copy; 2024 Michael E. Marin. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
