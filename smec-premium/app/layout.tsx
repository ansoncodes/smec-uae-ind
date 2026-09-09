import type { Metadata } from 'next';
import { IBM_Plex_Mono, Inter, Inter_Tight } from 'next/font/google';
import { SITE } from '@/lib/siteData';
import MotionRoot from '@/components/motion/MotionRoot';
import './globals.css';

/* Three families, each doing one job: Inter Tight for display headlines,
   Inter for running text and UI, IBM Plex Mono for the technical micro-labels.
   Inter and Inter Tight are variable, so this is three files in total. */
const display = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-display-var',
  display: 'swap',
  weight: ['400', '500', '600'],
});

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans-var',
  display: 'swap',
  weight: ['400', '500', '600'],
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono-var',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-video-preview': -1,
    'max-image-preview': 'large',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover' as const,
  themeColor: '#0a0c0f',
};

/** Mirrors the Rank Math @graph emitted by the live site. */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Person', 'Organization'],
      '@id': `${SITE.url}/#person`,
      name: 'SMEC Oil and Gas',
      logo: {
        '@type': 'ImageObject',
        '@id': `${SITE.url}/#logo`,
        url: `${SITE.url}/wp-content/uploads/2022/05/smec-logo.png`,
        contentUrl: `${SITE.url}/wp-content/uploads/2022/05/smec-logo.png`,
        caption: 'SMEC Oil & Gas',
        inLanguage: 'en-US',
        width: '197',
        height: '48',
      },
      image: {
        '@type': 'ImageObject',
        '@id': `${SITE.url}/#logo`,
        url: `${SITE.url}/wp-content/uploads/2022/05/smec-logo.png`,
        contentUrl: `${SITE.url}/wp-content/uploads/2022/05/smec-logo.png`,
        caption: 'SMEC Oil & Gas',
        inLanguage: 'en-US',
        width: '197',
        height: '48',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      url: SITE.url,
      name: 'SMEC Oil & Gas',
      publisher: { '@id': `${SITE.url}/#person` },
      inLanguage: 'en-US',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE.url}/?s={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE.url}#webpage`,
      url: SITE.url,
      name: SITE.title,
      datePublished: '2024-10-18T08:41:50+00:00',
      dateModified: '2026-08-13T11:29:33+00:00',
      about: { '@id': `${SITE.url}/#person` },
      isPartOf: { '@id': `${SITE.url}/#website` },
      inLanguage: 'en-US',
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-US"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        <a className={'skipLink'} href="#main">
          Skip to content
        </a>
        {children}
        <MotionRoot />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
