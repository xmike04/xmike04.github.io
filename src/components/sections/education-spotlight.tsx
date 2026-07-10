'use client';

import { GraduationCap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { resumeData } from '@/lib/resume-data';

/** Phase-1 placeholder — becomes the MS-progress-ring spotlight in Phase 2E. */
export default function EducationSpotlight() {
  return (
    <section id="education" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 flex items-center justify-center gap-4 text-center font-headline text-3xl font-bold md:text-5xl">
          <GraduationCap className="h-8 w-8 text-primary md:h-10 md:w-10" />
          Education
        </h2>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
          {resumeData.education.map((edu, index) => (
            <Card key={index} className="shadow-md">
              <CardHeader>
                <div className="flex flex-col items-start justify-between gap-2 sm:flex-row">
                  <div>
                    <CardTitle className="font-headline text-xl">{edu.degree}</CardTitle>
                    <CardDescription>{edu.school}</CardDescription>
                  </div>
                  <Badge variant="outline" className="mt-2 sm:mt-0">
                    {edu.date}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                  {'gpa' in edu && edu.gpa ? <li>GPA: {edu.gpa}</li> : null}
                  {edu.grade ? <li>{edu.grade}</li> : null}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
