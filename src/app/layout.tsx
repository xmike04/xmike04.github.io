
import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";

const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const fontHeadline = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-headline",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://xmike04.github.io');

export const metadata: Metadata = {
  title: 'ML Engineer | AI Systems | Michael Marin',
  description:
    'Michael Marin is an ML Engineer specializing in production AI systems, LLM pipelines, and agentic AI. Collaborated with NASA on real-time satellite data. Pursuing M.S. in AI at UNT.',
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'ML Engineer | AI Systems | Michael Marin',
    description:
      'ML Engineer building production AI systems. NASA PACE collaboration, shipped LLM products, agentic AI. Based in Dallas, TX.',
    siteName: 'Michael Marin — Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ML Engineer | AI Systems | Michael Marin',
    description:
      'ML Engineer building production AI systems. NASA PACE collaboration, shipped LLM products, agentic AI. Based in Dallas, TX.',
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Michael E. Marin',
    jobTitle: 'ML Engineer',
    url: siteUrl,
    email: 'miked24977@gmail.com',
    address: { '@type': 'PostalAddress', addressLocality: 'Dallas', addressRegion: 'TX' },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'University of North Texas',
    },
    worksFor: { '@type': 'Organization', name: 'Mr. Cooper Group' },
    knowsAbout: [
      'Machine Learning',
      'Retrieval-Augmented Generation',
      'LLM Evaluation',
      'Computer Vision',
      'Data Visualization',
      'MLOps',
    ],
    sameAs: [
      'https://github.com/xmike04',
      'https://linkedin.com/in/xmike04',
    ],
  };

  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      </head>
      <body
        className={cn(
          "font-body antialiased",
          fontBody.variable,
          fontHeadline.variable,
          fontMono.variable
        )}
      >
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
