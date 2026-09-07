import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWidgets from '@/components/FloatingWidgets';
import ContactBand from '@/components/ContactBand';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ProductDetail from '@/components/ProductDetail';
import ArticleDetail from '@/components/ArticleDetail';
import { ARTICLES, PRODUCTS, SITE } from '@/lib/siteData';
import { articleBySlug, articleSlug, productBySlug, productSlug } from '@/lib/routes';
import { productDetail } from '@/lib/productDetails';
import { articleBody } from '@/lib/articles';

type Params = { params: Promise<{ slug: string }> };

/**
 * Product and article pages at the live site's own paths. Every slug is
 * known at build time, so each page is prerendered and anything else 404s.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...PRODUCTS.map((product) => ({ slug: productSlug(product) })),
    ...ARTICLES.map((article) => ({ slug: articleSlug(article) })),
  ];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;

  const product = productBySlug(slug);
  if (product) {
    const detail = productDetail(slug);
    return {
      title: `${product.title} — SMEC Oil & Gas`,
      description: detail?.body[0] ?? product.body,
      alternates: { canonical: `/${slug}` },
      openGraph: {
        type: 'website',
        url: `${SITE.url}/${slug}`,
        title: product.title,
        description: detail?.body[0] ?? product.body,
        images: [{ url: product.image, width: product.width, height: product.height }],
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
  const product = productBySlug(slug);
  const article = product ? undefined : articleBySlug(slug);
  if (!product && !article) notFound();

  const jsonLd = product
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.title,
        description: productDetail(slug)?.body[0] ?? product.body,
        image: `${SITE.url}${product.image}`,
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
      <Header />
      <Breadcrumb
        trail={
          product
            ? [
                { label: 'Home', href: '/' },
                { label: 'Products', href: '/#major-products' },
                { label: product.title },
              ]
            : [
                { label: 'Home', href: '/' },
                { label: 'Articles', href: '/#articles' },
                { label: article!.title },
              ]
        }
      />
      <main>
        {product ? (
          <ProductDetail product={product} slug={slug} />
        ) : (
          <ArticleDetail article={article!} slug={slug} />
        )}
        <ContactBand />
      </main>
      <Footer />
      <FloatingWidgets />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
