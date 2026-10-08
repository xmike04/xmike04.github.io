import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume',
  description:
    'Evidence-backed resume for Michael Marin, an applied AI and machine learning engineer and M.S. Artificial Intelligence student at the University of North Texas.',
  alternates: { canonical: '/resume' },
};

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
