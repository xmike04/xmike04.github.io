'use client';

import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { resumeData } from '@/lib/resume-data';

/** Phase-1 placeholder — replaced by spotlight cards with mini diagrams in Phase 2E. */
export default function FlagshipProjects() {
  const flagship = resumeData.projects.filter((p) => p.flagship);

  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 flex items-center justify-center gap-4 text-center font-headline text-3xl font-bold md:text-5xl">
          <Star className="h-8 w-8 text-primary md:h-10 md:w-10" />
          Flagship Projects
        </h2>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {flagship.map((project) => (
            <Card key={project.id} className="flex flex-col border border-border shadow-md transition-shadow duration-300 hover:shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="mb-1 font-headline text-lg leading-snug">{project.title}</CardTitle>
                <p className="text-sm leading-snug text-muted-foreground">{project.caseStudy?.problem.slice(0, 140)}…</p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-4">
                <p className="text-sm font-medium leading-snug">{project.description[0]}</p>
                <div className="flex flex-wrap gap-1.5" role="list" aria-label="Tech stack">
                  {project.caseStudy?.techStack.slice(0, 6).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs" role="listitem">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="mt-auto pt-2">
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href={`/item/${project.id}`}>
                      Case Study
                      <ArrowRight className="ml-2 h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
