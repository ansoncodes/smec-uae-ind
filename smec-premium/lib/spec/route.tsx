import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import FloatingWidgets from '@/components/FloatingWidgets';
import SpecPageView from '@/components/spec/SpecPageView';
import { SpecClose, SpecFaqs } from '@/components/spec/SpecBlocks';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ProductDetail from '@/components/ProductDetail';
import ArticleDetail from '@/components/ArticleDetail';
import RfqForm from '@/components/rfq/RfqForm';
import { articleBody } from '@/lib/articles';
import { GLOSSARY, glossarySchema } from '@/lib/glossary';
import {
  jobPostingSchema,
  LEADERSHIP,
  MANAGING_DIRECTOR,
  personSchema,
  VACANCIES,
} from '@/lib/people';
import { articleRoute, ARTICLE_ROUTES, articlesIn, legacySystem } from './legacy';
import { SITE } from '@/lib/siteData';
import { ogImageFor } from '@/lib/og';
import { canonicalPath } from '@/lib/routes';
import {
  breadcrumbTrail,
  childrenOf,
  isPublished,
  segmentsOf,
  siblingsOf,
  specPage,
  SPEC_ROUTES,
} from './index';
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
export const makeStaticParams = (prefix: string) => async () => [
  ...pagesUnder(prefix).map((page) => ({ path: segmentsOf(page.url).slice(1) })),
  // The 17 articles keep their slugs and move under their collection.
  ...(prefix === 'resources' ? ARTICLE_ROUTES.map((route) => ({ path: route.segments })) : []),
];

const lookup = (prefix: string, path: string[] | undefined) =>
  specPage(canonicalPath([prefix, ...(path ?? [])].join('/')));

const absolute = (url: string) => `${SITE.url}${url}`;

/** Articles carry their date as prose ("14 January 2025"); schema wants ISO. */
function isoDate(value: string | undefined) {
  if (!value) return undefined;
  const parsed = new Date(value);
  return Number.isNaN(parsed.valueOf()) ? undefined : parsed.toISOString().slice(0, 10);
}

/**
 * BreadcrumbList from a rendered trail: the same crumbs the visitor sees, in
 * the same order, with the last one left without a URL because it is the page
 * they are already on.
 */
const breadcrumbList = (trail: { label: string; href?: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.label,
    ...(index === trail.length - 1 || !crumb.href ? {} : { item: absolute(crumb.href) }),
  })),
});

/**
 * Structured data, generated from the visible content of the page and the
 * types the Content Master assigns it. Nothing is invented: no ratings, no
 * prices, no properties the page does not show.
 */
function jsonLd(page: SpecPage) {
  const graph: Record<string, unknown>[] = [
    breadcrumbList(
      page.breadcrumb.map((label, index) => ({
        label,
        href:
          index === 0
            ? '/'
            : canonicalPath(segmentsOf(page.url).slice(0, index).join('/')),
      }))
    ),
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

  // The remaining types the schema table assigns by page, each emitted only
  // where the page shows the thing being marked up.
  if (page.url === '/company/leadership/') {
    graph.push(...personSchema(LEADERSHIP, SITE.url));
  }
  if (page.url === '/company/md-message/' && MANAGING_DIRECTOR) {
    graph.push(...personSchema([MANAGING_DIRECTOR], SITE.url));
  }
  if (page.url === '/company/careers/') {
    // Role families are not vacancies; JobPosting goes on live roles only.
    graph.push(...jobPostingSchema(VACANCIES, SITE.url));
  }
  if (page.url === '/resources/glossary/' && GLOSSARY.length) {
    graph.push(glossarySchema(SITE.url, page.url));
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
    const path = (await params).path;

    if (prefix === 'resources') {
      const route = articleRoute(path ?? []);
      if (route) {
        const description = route.article.subtitle || route.article.title;
        return {
          title: `${route.article.title} — SMEC Oil & Gas`,
          description,
          alternates: { canonical: route.url },
          openGraph: {
            type: 'article',
            url: absolute(route.url),
            title: route.article.title,
            description,
            images: ogImageFor(route.url, route.article.title),
          },
        };
      }
    }

    const page = lookup(prefix, path);
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
        images: ogImageFor(page.url, page.h1),
      },
    };
  };

const Chrome = ({ children, ld }: { children: React.ReactNode; ld?: unknown }) => (
  <>
    <SiteHeader />
    {children}
    <SiteFooter />
    <FloatingWidgets />
    {ld ? (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    ) : null}
  </>
);

export const makePage =
  (prefix: string) =>
  async ({ params }: Params) => {
    const path = (await params).path;

    // An article: the existing page, at its new home under a collection.
    if (prefix === 'resources') {
      const route = articleRoute(path ?? []);
      if (route) {
        const trail = [
          { label: 'Home', href: '/' },
          { label: 'Resources', href: '/resources/' },
          { label: specPage(route.collection)?.h1 ?? 'Articles', href: route.collection },
          { label: route.article.title },
        ];
        const published = isoDate(articleBody(route.slug)?.date);

        return (
          <Chrome
            ld={{
              '@context': 'https://schema.org',
              '@graph': [
                breadcrumbList(trail),
                {
                  '@type': 'Article',
                  headline: route.article.title,
                  description: route.article.subtitle,
                  url: absolute(route.url),
                  publisher: { '@id': `${SITE.url}/#organization` },
                  ...(published ? { datePublished: published } : {}),
                },
              ],
            }}
          >
            <Breadcrumb trail={trail} />
            <main id="main">
              <ArticleDetail article={route.article} slug={route.slug} />
              <SpecClose />
            </main>
          </Chrome>
        );
      }
    }

    const page = lookup(prefix, path);
    if (!page) notFound();

    // A product this build already has: keep its design and depth, take the
    // H1, answer block and FAQs from the document.
    const system = prefix === 'products' ? legacySystem(page.url) : undefined;

    if (system) {
      return (
        <Chrome ld={jsonLd(page)}>
          <Breadcrumb trail={breadcrumbTrail(page)} />
          <main id="main">
            <ProductDetail system={system} title={page.h1} lead={page.answer} />
            <div className="container">
              <SpecFaqs page={page} index={1} />
            </div>
            <SpecClose />
          </main>
        </Chrome>
      );
    }

    return (
      <Chrome ld={jsonLd(page)}>
        <SpecPageView
          page={page}
          children={[...childrenOf(page.url)]}
          related={siblingsOf(page)}
          articles={prefix === 'resources' ? articlesIn(page.url) : []}
          glossary={page.url === '/resources/glossary/' ? GLOSSARY : []}
          // The contact page is the RFQ page: the document's "RFQ fields"
          // block is the form's specification, and this is the form.
          form={page.url === '/contact/' ? <RfqForm /> : undefined}
        />
      </Chrome>
    );
  };
