
import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/site";

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

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: '%s | Michael Marin',
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  applicationName: 'Michael Marin Portfolio',
  authors: [{ name: 'Michael Eric Marin', url: SITE_URL }],
  creator: 'Michael Eric Marin',
  publisher: 'Michael Eric Marin',
  category: 'technology',
  keywords: [
    'Michael Marin',
    'applied AI engineer',
    'machine learning engineer',
    'AI/ML intern',
    'computer vision',
    'LLM evaluation',
    'AI product',
    'Dallas Fort Worth',
    'University of North Texas',
  ],
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: 'Michael Marin Portfolio',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Michael Marin Portfolio',
        description: SITE_DESCRIPTION,
        inLanguage: 'en-US',
        publisher: { '@id': `${SITE_URL}/#person` },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/#profile`,
        url: SITE_URL,
        name: SITE_TITLE,
        description: SITE_DESCRIPTION,
        inLanguage: 'en-US',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        mainEntity: { '@id': `${SITE_URL}/#person` },
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Michael Eric Marin',
        alternateName: 'Michael Marin',
        jobTitle: 'Applied AI and Machine Learning Engineer',
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        image: `${SITE_URL}/headshot.png`,
        email: 'mailto:miked24977@gmail.com',
        address: {
          '@type': 'PostalAddress',
          addressRegion: 'Texas',
          addressCountry: 'US',
        },
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'University of North Texas',
          url: 'https://www.unt.edu/',
        },
        affiliation: {
          '@type': 'CollegeOrUniversity',
          name: 'University of North Texas',
          url: 'https://www.unt.edu/',
        },
        hasCredential: [
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'AWS Certified Machine Learning — Specialty',
            recognizedBy: { '@type': 'Organization', name: 'Amazon Web Services' },
          },
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'Google Cloud Certified Professional Cloud Architect',
            recognizedBy: { '@type': 'Organization', name: 'Google Cloud' },
          },
        ],
        knowsAbout: [
          'Applied artificial intelligence',
          'Machine learning',
          'LLM evaluation',
          'Computer vision',
          'Retrieval-augmented generation',
          'AI product evaluation',
          'Cloud engineering',
        ],
        sameAs: [
          'https://github.com/xmike04',
          'https://www.linkedin.com/in/xmike04',
        ],
      },
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
