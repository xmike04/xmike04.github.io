'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { ScrollProgress } from '@/components/motion/scroll-progress';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#projects', label: 'Projects' },
  { href: '#lab', label: 'ML Lab' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export default function SiteNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="glass fixed left-0 right-0 top-0 z-30 p-4">
      <ScrollProgress />
      <div className="container mx-auto flex items-center justify-between">
        <Link href="#hero" className="font-headline text-2xl font-bold text-primary">
          Michael Marin
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ href, label }) => (
            <Button key={href} variant="ghost" asChild>
              <Link href={href}>{label}</Link>
            </Button>
          ))}
          <Button asChild>
            <Link href="#contact">Contact</Link>
          </Button>
          <ThemeToggle />
        </nav>
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>
      </div>
      <div
        className={cn(
          'glass absolute left-0 top-full w-full overflow-hidden transition-all duration-300 ease-in-out md:hidden',
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="flex flex-col items-center gap-2 p-4">
          {navLinks.map(({ href, label }) => (
            <Button key={href} variant="ghost" className="w-full" asChild onClick={() => setIsMenuOpen(false)}>
              <Link href={href}>{label}</Link>
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
