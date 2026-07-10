'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { ScrollProgress } from '@/components/motion/scroll-progress';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#projects', label: 'Projects', id: 'projects' },
  { href: '#lab', label: 'ML Lab', id: 'lab' },
  { href: '#experience', label: 'Experience', id: 'experience' },
  { href: '#skills', label: 'Skills', id: 'skills' },
];

const observedSections = ['hero', 'projects', 'lab', 'experience', 'skills', 'contact'];

export default function SiteNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the section currently crossing a thin band mid-viewport.
  useEffect(() => {
    const sections = observedSections
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-30 border px-4 py-3 transition-colors duration-300',
        scrolled ? 'glass shadow-sm' : 'border-transparent bg-transparent'
      )}
    >
      <ScrollProgress />
      <div className="container mx-auto flex items-center justify-between">
        <Link
          href="#hero"
          className="flex items-baseline gap-2 font-headline font-bold"
          aria-label="Michael Marin — back to top"
        >
          <span className="gradient-text text-2xl" aria-hidden="true">
            M.
          </span>
          <span className="text-lg">Michael Marin</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navLinks.map(({ href, label, id }) => (
            <Button
              key={href}
              variant="ghost"
              asChild
              className={cn('relative', activeId === id && 'text-primary hover:text-primary')}
            >
              <Link href={href} aria-current={activeId === id ? 'location' : undefined}>
                {label}
                {activeId === id ? (
                  <span
                    className="absolute inset-x-3 bottom-0.5 h-px bg-gradient-to-r from-primary to-accent"
                    aria-hidden="true"
                  />
                ) : null}
              </Link>
            </Button>
          ))}
          <Button asChild className={cn('ml-1', activeId === 'contact' && 'glow-primary')}>
            <Link href="#contact">Contact</Link>
          </Button>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            {isMenuOpen ? <X /> : <Menu />}
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          'glass absolute left-0 top-full w-full overflow-hidden transition-all duration-300 ease-in-out md:hidden',
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="flex flex-col items-center gap-2 p-4" aria-label="Mobile">
          {navLinks.map(({ href, label, id }) => (
            <Button
              key={href}
              variant="ghost"
              className={cn('w-full', activeId === id && 'text-primary hover:text-primary')}
              asChild
              onClick={() => setIsMenuOpen(false)}
            >
              <Link href={href} aria-current={activeId === id ? 'location' : undefined}>
                {label}
              </Link>
            </Button>
          ))}
          <Button className="w-full" asChild onClick={() => setIsMenuOpen(false)}>
            <Link href="#contact">Contact</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
