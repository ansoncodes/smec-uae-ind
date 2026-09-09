import { ARTICLES, PRODUCTS, SITE, type Article, type Product } from '@/lib/siteData';

/**
 * Local routing for the pages this build has beyond the homepage.
 *
 * The homepage data (`lib/siteData.ts`) is the live site's and is left
 * untouched, so its links are absolute smecoilandgas.com URLs. Each product
 * and article page here lives at the same path the live site uses
 * (`/power-house`, `/retrofit-solutions`, …), and `localHref` swaps a link to
 * the local page when one exists. Links to pages this build does not have
 * (About Us, Careers, the extra nav products…) keep pointing at the live site.
 */

/** Last path segment of an absolute or relative URL, without slashes. */
export function slugOf(href: string): string {
  try {
    return new URL(href).pathname.replace(/^\/+|\/+$/g, '');
  } catch {
    return href.replace(/^\/+|\/+$/g, '');
  }
}

/** One article lives on smec.in; it gets a short local slug of its own. */
const ARTICLE_SLUG_OVERRIDES: Record<string, string> = {
  'https://www.smec.in/electric-propulsion-sov-cochin-shipyard-smec-vard': 'smec-vard',
};

export const productSlug = (product: Product) => slugOf(product.href);

export const articleSlug = (article: Article) =>
  ARTICLE_SLUG_OVERRIDES[article.href] ?? slugOf(article.href);

export const productBySlug = (slug: string) =>
  PRODUCTS.find((product) => productSlug(product) === slug);

export const articleBySlug = (slug: string) =>
  ARTICLES.find((article) => articleSlug(article) === slug);

/** `/slug` when this build has a page for the link, the original href otherwise. */
export function localHref(href: string): string {
  const override = ARTICLE_SLUG_OVERRIDES[href];
  if (override) return `/${override}`;
  if (!href.startsWith(`${SITE.url}/`)) return href;
  const slug = slugOf(href);
  if (productBySlug(slug) || articleBySlug(slug)) return `/${slug}`;
  return href;
}

export const isExternal = (href: string) => !href.startsWith('/');
