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

/** Metadata for a company page, from its own record. */
export function companyMetadata(slug: string): Metadata {
  const page = companyPage(slug);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      type: 'website',
      url: `${SITE.url}/${slug}`,
      title: page.metaTitle,
      description: page.metaDescription,
      ...(page.image ? { images: [{ url: page.image }] } : {}),
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
  const jsonLd = faq
    ? {
        '@context': 'https://schema.org',
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
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: page.metaTitle,
        description: page.metaDescription,
        url: `${SITE.url}/${slug}`,
        isPartOf: { '@type': 'WebSite', name: SITE.name, url: SITE.url },
      };

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
