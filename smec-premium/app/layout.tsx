import type { Metadata } from 'next';
import { IBM_Plex_Mono, Inter, Inter_Tight } from 'next/font/google';
import { CONTACT, FOOTER_ADDRESS, FOOTER_CONTACT, SITE, SOCIALS } from '@/lib/siteData';
import { ogImageFor } from '@/lib/og';
import MotionRoot from '@/components/motion/MotionRoot';
import ConversionEvents from '@/components/analytics/ConversionEvents';
import './globals.css';

/* Three families, each doing one job: Inter Tight for display headlines,
   Inter for running text and UI, IBM Plex Mono for the technical micro-labels.

   Inter and Inter Tight are declared without a weight, which loads the
   variable font: one file per family covering every weight, in place of the
   three static cuts each was shipping. The mono is not variable and nothing
   asks it for more than one weight, so it ships one. Three files, down from
   eight, and the spec's "limit weights" (§16) is met by loading fewer files
   rather than by taking weights away from the design. */
const display = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-display-var',
  display: 'swap',
});

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans-var',
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono-var',
  display: 'swap',
  weight: ['400'],
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
    images: ogImageFor('/', SITE.title),
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
    images: ogImageFor('/', SITE.title),
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover' as const,
  themeColor: '#0a0c0f',
};

/**
 * Site-wide structured data: one Organization node and the WebSite that
 * belongs to it, both with stable @ids the page-level graphs point at.
 *
 * This replaces the Rank Math graph the live site emits, which marked the
 * company up as `['Person', 'Organization']`, pointed its logo at a
 * /wp-content/ upload path, advertised a `?s=` site search that does not
 * exist here, and carried one hardcoded set of page dates on every URL.
 *
 * Every value below is one this repo already holds: the legal entity and
 * address from the footer, the numbers and email from the contact block, the
 * logo from /public. Nothing about certifications, headcount, revenue or
 * founding date is asserted, because none of that is verified yet
 * (docs/spec-alignment.md 0.7).
 */
const LOGO = {
  '@type': 'ImageObject',
  '@id': `${SITE.url}/#logo`,
  url: `${SITE.url}${SITE.logo}`,
  contentUrl: `${SITE.url}${SITE.logo}`,
  caption: SITE.name,
  width: 741,
  height: 268,
  inLanguage: 'en',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE.url}/#organization`,
      name: FOOTER_ADDRESS[1],
      alternateName: SITE.name,
      url: SITE.url,
      logo: LOGO,
      image: { '@id': `${SITE.url}/#logo` },
      email: CONTACT.email,
      telephone: FOOTER_CONTACT[0].value,
      address: {
        '@type': 'PostalAddress',
        streetAddress: FOOTER_ADDRESS[2],
        addressLocality: 'Abu Dhabi',
        addressCountry: 'AE',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: FOOTER_CONTACT[0].value,
          email: CONTACT.email,
          availableLanguage: 'en',
        },
      ],
      sameAs: SOCIALS.map((social) => social.href),
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      publisher: { '@id': `${SITE.url}/#organization` },
      inLanguage: 'en',
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
        <ConversionEvents />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
