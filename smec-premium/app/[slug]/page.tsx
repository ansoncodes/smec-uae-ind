import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import FloatingWidgets from '@/components/FloatingWidgets';
import ContactCTA from '@/components/ContactCTA';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ProductDetail from '@/components/ProductDetail';
import ArticleDetail from '@/components/ArticleDetail';
import { ARTICLES, SITE } from '@/lib/siteData';
import { articleBySlug, articleSlug } from '@/lib/routes';
import { ALL_SYSTEMS, systemDetail } from '@/lib/systems';
import { articleBody } from '@/lib/articles';

type Params = { params: Promise<{ slug: string }> };

/**
 * Product and article pages at the live site's own paths. Every slug is
 * known at build time, so each page is prerendered and anything else 404s.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...ALL_SYSTEMS.map((system) => ({ slug: system.slug })),
    ...ARTICLES.map((article) => ({ slug: articleSlug(article) })),
  ];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;

  const system = systemDetail(slug);
  if (system) {
    const description = system.body[0] ?? system.tagline;
    return {
      title: `${system.title} — SMEC Oil & Gas`,
      description,
      alternates: { canonical: `/${slug}` },
      openGraph: {
        type: 'website',
        url: `${SITE.url}/${slug}`,
        title: system.title,
        description,
        ...(system.image
          ? { images: [{ url: system.image, width: system.width, height: system.height }] }
          : {}),
      },
    };
  }

  const article = articleBySlug(slug);
  if (article) {
    const content = articleBody(slug);
    const description = content?.standfirst ?? article.subtitle ?? article.title;
    return {
      title: `${article.title} — SMEC Oil & Gas`,
      description,
      alternates: { canonical: `/${slug}` },
      openGraph: {
        type: 'article',
        url: `${SITE.url}/${slug}`,
        title: article.title,
        description,
        images: [{ url: article.image }],
      },
    };
  }

  return {};
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const system = systemDetail(slug);
  const article = system ? undefined : articleBySlug(slug);
  if (!system && !article) notFound();

  const jsonLd = system
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: system.title,
        description: system.body[0] ?? system.tagline,
        ...(system.image ? { image: `${SITE.url}${system.image}` } : {}),
        url: `${SITE.url}/${slug}`,
        brand: { '@type': 'Brand', name: 'SMEC' },
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article!.title,
        description: articleBody(slug)?.standfirst ?? article!.subtitle,
        image: `${SITE.url}${article!.image}`,
        mainEntityOfPage: `${SITE.url}/${slug}`,
        author: articleBody(slug)?.author
          ? { '@type': 'Person', name: articleBody(slug)!.author }
          : { '@type': 'Organization', name: SITE.name },
        publisher: { '@type': 'Organization', name: SITE.name },
      };

  return (
    <>
      <SiteHeader />
      <Breadcrumb
        trail={
          system
            ? [
                { label: 'Home', href: '/' },
                { label: 'Systems', href: '/#systems' },
                { label: system.title },
              ]
            : [
                { label: 'Home', href: '/' },
                { label: 'Insights', href: '/insights' },
                { label: article!.title },
              ]
        }
      />
      <main id="main">
        {system ? (
          <ProductDetail system={system} />
        ) : (
          <ArticleDetail article={article!} slug={slug} />
        )}
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
