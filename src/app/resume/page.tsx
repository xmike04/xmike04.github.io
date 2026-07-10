'use client';

import type { ReactNode } from 'react';
import { Printer } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { resumeData } from '@/lib/resume-data';

/* Everything on this page renders from resumeData — no hardcoded content. */

function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return phone;
}

function stripProtocol(url: string) {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

// Flagship projects first, preserving the source order within each group.
const orderedProjects = [...resumeData.projects].sort(
  (a, b) => Number(Boolean(b.flagship)) - Number(Boolean(a.flagship))
);

function ResumeSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={`${id}-heading`} className="mb-5">
      <h2
        id={`${id}-heading`}
        className="text-sm font-bold uppercase tracking-widest mb-3 text-black"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5 text-sm text-gray-800">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span aria-hidden="true">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ResumePage() {
  const { name, role, contact, social } = resumeData;

  return (
    <div className="bg-white min-h-screen">
      {/* Print controls — hidden when printing */}
      <div className="print:hidden sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center">
        <span className="text-sm text-gray-500">{name} — Resume</span>
        <Button
          size="sm"
          variant="outline"
          onClick={() => window.print()}
          aria-label="Print or save as PDF"
        >
          <Printer className="w-4 h-4 mr-2" aria-hidden="true" />
          Print / Save as PDF
        </Button>
      </div>

      {/* Resume content */}
      <main
        className="max-w-[780px] mx-auto px-8 py-10 print:px-0 print:py-0 print:max-w-none text-black"
        aria-label="Resume"
      >
        {/* ── Header ── */}
        <header className="mb-5 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-black">{name}</h1>
          <p className="text-sm font-medium text-gray-800 mt-0.5">{role}</p>
          <p className="text-sm text-gray-700 mt-1">
            {contact.location}
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <a href={`tel:${contact.phone}`} className="text-black underline">
              {formatPhone(contact.phone)}
            </a>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <a href={`mailto:${contact.email}`} className="text-black underline">
              {contact.email}
            </a>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <a href={social.linkedin} className="text-black underline">
              {stripProtocol(social.linkedin)}
            </a>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <a href={social.github} className="text-black underline">
              {stripProtocol(social.github)}
            </a>
          </p>
        </header>

        <hr className="border-black mb-4" />

        {/* ── Summary ── */}
        <ResumeSection id="summary" title="Summary">
          <p className="text-sm leading-relaxed text-gray-800">{resumeData.summary}</p>
        </ResumeSection>

        <hr className="border-gray-300 mb-4" />

        {/* ── Experience ── */}
        <ResumeSection id="experience" title="Experience">
          {resumeData.workExperience.map((job) => (
            <div key={job.id} className="mb-4 last:mb-0">
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-bold text-black">{job.title}</h3>
                <span className="text-sm text-gray-600 shrink-0 ml-4">{job.date}</span>
              </div>
              <p className="text-sm text-gray-700 mb-2">
                {job.company}
                {job.location ? ` — ${job.location}` : ''}
              </p>
              <BulletList items={job.description} />
            </div>
          ))}
        </ResumeSection>

        <hr className="border-gray-300 mb-4" />

        {/* ── Projects ── */}
        <ResumeSection id="projects" title="Projects">
          {orderedProjects.map((project) => (
            <div key={project.id} className="mb-5 last:mb-2">
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-bold text-black">{project.title}</h3>
                <span className="text-sm text-gray-600 shrink-0 ml-4">{project.date}</span>
              </div>
              {project.company && (
                <p className="text-sm text-gray-700 mb-1.5">{project.company}</p>
              )}
              <BulletList items={project.description} />
              {project.links && project.links.length > 0 && (
                <p className="mt-1.5 text-sm text-gray-700">
                  {project.links.map((link, index) => (
                    <span key={link.url}>
                      {index > 0 && <span aria-hidden="true">&nbsp;·&nbsp;</span>}
                      {link.label}:{' '}
                      <a href={link.url} className="text-black underline">
                        {stripProtocol(link.url)}
                      </a>
                    </span>
                  ))}
                </p>
              )}
            </div>
          ))}
        </ResumeSection>

        <hr className="border-gray-300 mb-4" />

        {/* ── Education ── */}
        <ResumeSection id="education" title="Education">
          {resumeData.education.map((entry) => (
            <div key={entry.degree} className="mb-3 last:mb-0">
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-bold text-black">{entry.school}</h3>
                <span className="text-sm text-gray-600 shrink-0 ml-4">{entry.date}</span>
              </div>
              <p className="text-sm text-gray-800">
                {entry.degree}
                {entry.gpa ? ` — GPA: ${entry.gpa}` : ''}
              </p>
              {entry.coursework && entry.coursework.length > 0 && (
                <ul className="mt-1.5 flex flex-wrap gap-1.5" aria-label="Coursework">
                  {entry.coursework.map((course) => (
                    <li
                      key={course}
                      className="rounded border border-gray-300 px-2 py-0.5 text-xs text-gray-700"
                    >
                      {course}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </ResumeSection>

        <hr className="border-gray-300 mb-4" />

        {/* ── Skills ── */}
        <ResumeSection id="skills" title="Skills">
          <dl className="space-y-1.5 text-sm text-gray-800">
            {resumeData.skills.map((group) => (
              <div key={group.category} className="flex gap-2">
                <dt className="font-semibold text-black shrink-0 w-44">{group.category}</dt>
                <dd>{group.technologies.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </ResumeSection>

        <hr className="border-gray-300 mb-4" />

        {/* ── Certifications ── */}
        <ResumeSection id="certifications" title="Certifications">
          <BulletList items={resumeData.certifications} />
        </ResumeSection>

        <hr className="border-gray-300 mb-4" />

        {/* ── Leadership & Interests ── */}
        <ResumeSection id="interests" title="Leadership & Interests">
          <BulletList items={resumeData.interests} />
        </ResumeSection>
      </main>
    </div>
  );
}
