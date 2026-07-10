'use client';

import { Code } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { resumeData } from '@/lib/resume-data';

/** Phase-1 placeholder — gains the radar chart in Phase 2E. */
export default function SkillsSection() {
  return (
    <section id="skills" className="bg-muted/10 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 flex items-center justify-center gap-4 text-center font-headline text-3xl font-bold md:text-5xl">
          <Code className="h-8 w-8 text-primary md:h-10 md:w-10" />
          Technical Skills
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {resumeData.skills.map((skillCategory) => (
            <Card key={skillCategory.category} className="shadow-md transition-shadow duration-300 hover:shadow-xl">
              <CardHeader>
                <CardTitle className="font-headline text-xl">{skillCategory.category}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {skillCategory.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-sm">
                    {tech}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
