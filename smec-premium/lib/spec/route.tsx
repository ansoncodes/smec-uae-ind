import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import FloatingWidgets from '@/components/FloatingWidgets';
import SpecPageView from '@/components/spec/SpecPageView';
import { SITE } from '@/lib/siteData';
import { canonicalPath } from '@/lib/routes';
import { childrenOf, isPublished, segmentsOf, siblingsOf, specPage, SPEC_ROUTES } from './index';
import type { SpecPage } from './types';

/**
 * Every section of the locked architecture is served from the same three
 * factories, so a page's URL, metadata, structured data and body all come
 * from one record in the Content Master. A section route is then eight lines.
 */

type Params = { params: Promise<{ path?: string[] }> };

const pagesUnder = (prefix: string) =>
  SPEC_ROUTES.filter((page) => page.url === `/${prefix}/` || page.url.startsWith(`/${prefix}/`));

/** The paths a section prerenders, including its own hub (an empty path). */
export const makeStaticParams = (prefix: string) => async () =>
  pagesUnder(prefix).map((page) => ({ path: segmentsOf(page.url).slice(1) }));

const lookup = (prefix: string, path: string[] | undefined) =>
  specPage(canonicalPath([prefix, ...(path ?? [])].join('/')));

const absolute = (url: string) => `${SITE.url}${url}`;

/**
 * Structured data, generated from the visible content of the page and the
 * types the Content Master assigns it. Nothing is invented: no ratings, no
 * prices, no properties the page does not show.
 */
function jsonLd(page: SpecPage) {
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'BreadcrumbList',
      itemListElement: page.breadcrumb.map((label, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: label,
        ...(index === page.breadcrumb.length - 1
          ? {}
          : {
              item: absolute(
                index === 0 ? '/' : canonicalPath(segmentsOf(page.url).slice(0, index).join('/'))
              ),
            }),
      })),
    },
  ];

  const base = {
    name: page.h1,
    description: page.answer || page.metaDescription,
    url: absolute(page.url),
  };

  if (page.schema.includes('Product')) {
    graph.push({ '@type': 'Product', brand: { '@type': 'Brand', name: 'SMEC' }, ...base });
  }
  if (page.schema.includes('Service')) {
    graph.push({
      '@type': 'Service',
      provider: { '@id': `${SITE.url}/#organization` },
      ...base,
    });
  }
  if (page.schema.includes('SoftwareApplication')) {
    graph.push({ '@type': 'SoftwareApplication', applicationCategory: 'BusinessApplication', ...base });
  }
  if (page.schema.some((type) => type === 'CollectionPage' || type === 'ItemList')) {
    graph.push({ '@type': 'CollectionPage', ...base });
  }

  // Only for questions and answers that are visible on the same page.
  if (page.faqs.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: page.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

export const makeMetadata =
  (prefix: string) =>
  async ({ params }: Params): Promise<Metadata> => {
    const page = lookup(prefix, (await params).path);
    if (!page) return {};

    const title = page.seoTitle || `${page.h1} — SMEC Oil & Gas`;
    const description = page.metaDescription || page.answer;

    return {
      title,
      description,
      alternates: { canonical: page.url },
      // A page still waiting on approved facts renders, but stays out of
      // search and out of the sitemap until its gate clears.
      robots: isPublished(page) ? undefined : { index: false, follow: true },
      openGraph: {
        type: 'website',
        url: absolute(page.url),
        title,
        description,
      },
    };
  };

export const makePage =
  (prefix: string) =>
  async ({ params }: Params) => {
    const page = lookup(prefix, (await params).path);
    if (!page) notFound();

    return (
      <>
        <SiteHeader />
        <SpecPageView page={page} children={childrenOf(page.url)} related={siblingsOf(page)} />
        <SiteFooter />
        <FloatingWidgets />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(page)) }}
        />
      </>
    );
  };
