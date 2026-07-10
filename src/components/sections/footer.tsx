import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
import { resumeData } from '@/lib/resume-data';

export default function Footer() {
  return (
    <footer className="bg-foreground p-6 text-center text-muted-foreground">
      <div className="mb-4 flex justify-center gap-6">
        <Link href={`mailto:${resumeData.contact.email}`} className="transition-colors hover:text-primary" aria-label="Email">
          <Mail className="h-6 w-6" />
        </Link>
        <Link href={resumeData.social.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary" aria-label="GitHub">
          <Github className="h-6 w-6" />
        </Link>
        <Link href={resumeData.social.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary" aria-label="LinkedIn">
          <Linkedin className="h-6 w-6" />
        </Link>
      </div>
      <p>&copy; {new Date().getFullYear()} {resumeData.name}. All Rights Reserved.</p>
    </footer>
  );
}
