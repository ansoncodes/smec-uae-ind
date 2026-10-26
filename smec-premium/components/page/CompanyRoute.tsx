import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import FloatingWidgets from '@/components/FloatingWidgets';
import ContactCTA from '@/components/ContactCTA';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PageShell from '@/components/page/PageShell';
import { companyPage } from '@/lib/companyPages';
import { SITE } from '@/lib/siteData';
import { canonicalPath } from '@/lib/routes';
import { ogImageFor } from '@/lib/og';

/** Metadata for a company page, from its own record. */
/**
 * Pages the locked architecture has no home for. They are real content, so
 * they are not deleted, and they have no approved destination, so they are
 * not redirected — they stay reachable and out of the index until SMEC
 * decides (docs/spec-alignment.md 0.11).
 */
const UNPLACED = ['sustainability', 'research-and-developement'];

export function companyMetadata(slug: string): Metadata {
  const page = companyPage(slug);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: canonicalPath(slug) },
    ...(UNPLACED.includes(slug) ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: 'website',
      url: `${SITE.url}${canonicalPath(slug)}`,
      title: page.metaTitle,
      description: page.metaDescription,
      // The page's own card when it has no picture of its own (§21).
      images: page.image ? [{ url: page.image }] : ogImageFor(canonicalPath(slug), page.metaTitle),
    },
  };
}

/**
 * The chrome every company page shares. Pages that carry a disclosure list
 * also emit FAQPage structured data built from that same list.
 */
export default function CompanyRoute({ slug }: { slug: string }) {
  const page = companyPage(slug);
  if (!page) notFound();

  const faq = page.sections.find((section) => section.t === 'faq');
  // The visible trail, as every other non-home page carries it (§5).
  const breadcrumbs = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.url}/` },
      { '@type': 'ListItem', position: 2, name: page.kicker },
    ],
  };
  const pageLd = faq
    ? {
        '@type': 'FAQPage',
        mainEntity: faq.items.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: [...item.a, ...(item.list ?? [])].join(' '),
          },
        })),
      }
    : {
        '@type': 'WebPage',
        name: page.metaTitle,
        description: page.metaDescription,
        url: `${SITE.url}${canonicalPath(slug)}`,
        isPartOf: { '@type': 'WebSite', name: SITE.name, url: SITE.url },
      };
  const jsonLd = { '@context': 'https://schema.org', '@graph': [breadcrumbs, pageLd] };

  return (
    <>
      <SiteHeader />
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: page.kicker }]} />
      <main id="main">
        <PageShell page={page} />
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
