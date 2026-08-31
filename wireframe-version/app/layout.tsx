import type { Metadata } from 'next';
import { Roboto, Poppins, Rosario, Enriqueta } from 'next/font/google';
import { SITE } from '@/lib/siteData';
import './globals.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '900'],
  variable: '--font-roboto-var',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins-var',
  display: 'swap',
});

const rosario = Rosario({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-rosario-var',
  display: 'swap',
});

const enriqueta = Enriqueta({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-enriqueta-var',
  display: 'swap',
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
  other: {
    'twitter:label1': 'Written by',
    'twitter:data1': 'Shiyas',
    'twitter:label2': 'Time to read',
    'twitter:data2': '5 minutes',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover' as const,
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
      className={`${roboto.variable} ${poppins.variable} ${rosario.variable} ${enriqueta.variable}`}
    >
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
