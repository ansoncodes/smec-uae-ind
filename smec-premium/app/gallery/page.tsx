import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import FloatingWidgets from '@/components/FloatingWidgets';
import ContactCTA from '@/components/ContactCTA';
import Gallery from '@/components/Gallery';
import Breadcrumb from '@/components/ui/Breadcrumb';
import {
  GALLERY_CATEGORIES_IN_USE,
  GALLERY_INTRO,
  GALLERY_PHOTOS,
  GALLERY_URL,
} from '@/lib/gallery';
import { ogImageFor } from '@/lib/og';
import { SITE } from '@/lib/siteData';
import styles from './page.module.css';

/** /gallery/ — the main tab the client added on 23 October (lib/gallery.ts). */

const TITLE = 'Gallery — SMEC Oil & Gas';

export const metadata: Metadata = {
  title: TITLE,
  description: GALLERY_INTRO,
  alternates: { canonical: GALLERY_URL },
  openGraph: {
    type: 'website',
    url: `${SITE.url}${GALLERY_URL}`,
    title: TITLE,
    description: GALLERY_INTRO,
    images: ogImageFor(GALLERY_URL, 'Gallery'),
  },
};

/** Structured data from what the page shows: its trail and its photographs. */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.url}/` },
        { '@type': 'ListItem', position: 2, name: 'Gallery' },
      ],
    },
    {
      '@type': 'ImageGallery',
      name: 'Gallery',
      description: GALLERY_INTRO,
      url: `${SITE.url}${GALLERY_URL}`,
      isPartOf: { '@id': `${SITE.url}/#website` },
      associatedMedia: GALLERY_PHOTOS.map((photo) => ({
        '@type': 'ImageObject',
        contentUrl: `${SITE.url}${photo.src}`,
        name: photo.title,
        description: photo.alt,
        width: photo.width,
        height: photo.height,
      })),
    },
  ],
};

export default function Page() {
  return (
    <>
      <SiteHeader />
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]} />
      <main id="main">
        <header className={styles.masthead}>
          <div className="container">
            <p className={styles.kicker}>
              <span className={styles.kickerRule} aria-hidden="true" />
              SMEC Oil &amp; Gas
            </p>
            <h1 className={styles.title}>Gallery</h1>
            <p className={styles.lead}>{GALLERY_INTRO}</p>
          </div>
        </header>

        <section className={styles.band} data-tone="light" aria-label="Photographs">
          <div className="container">
            <Gallery photos={GALLERY_PHOTOS} categories={GALLERY_CATEGORIES_IN_USE} />
          </div>
        </section>

        <ContactCTA />
      </main>
      <SiteFooter />
      <FloatingWidgets />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
