import { Github, Linkedin, Mail } from 'lucide-react';
import { resumeData } from '@/lib/resume-data';

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background px-6 py-10 text-center text-muted-foreground">
      <div className="mb-5 flex justify-center gap-6">
        <a
          href={`mailto:${resumeData.contact.email}`}
          className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Email"
        >
          <Mail className="h-5 w-5" />
        </a>
        <a
          href={resumeData.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="GitHub (opens in new tab)"
        >
          <Github className="h-5 w-5" />
        </a>
        <a
          href={resumeData.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="LinkedIn (opens in new tab)"
        >
          <Linkedin className="h-5 w-5" />
        </a>
      </div>
      <p className="text-sm">
        &copy; {new Date().getFullYear()} {resumeData.name}. All Rights Reserved.
      </p>
      <p className="mt-2 font-mono text-xs text-muted-foreground/70">Built with Next.js 15 · Three.js · Vercel</p>
    </footer>
  );
}
