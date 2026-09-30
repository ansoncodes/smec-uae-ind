import { ARTICLES, PRODUCTS, SITE, type Article, type Product } from '@/lib/siteData';
import { KEEP, REDIRECTS } from '@/lib/redirects.mjs';

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

/**
 * Pages this build has beyond the homepage data set: the six systems the
 * live product menu lists without homepage records, and the company pages.
 * Kept as plain slugs so this module stays free of content imports.
 */
export const EXTRA_SYSTEM_SLUGS = [
  'vfd-houses',
  'scr-houses',
  'rpd-system',
  'load-monitoring-system',
  'paga-system',
  'battery-charger',
] as const;

export const COMPANY_SLUGS = [
  'about-us',
  'solutions-and-services',
  'research-and-developement',
  'careers',
  'sustainability',
  'contact-us',
  'privacy-policy',
] as const;

const LOCAL_SLUGS = new Set<string>([...EXTRA_SYSTEM_SLUGS, ...COMPANY_SLUGS, 'insights']);

/** Old path → its home in the locked architecture. */
const MOVED = new Map(REDIRECTS.map(({ from, to }) => [from, to]));

/**
 * Origins that are this site, whatever domain it is served from.
 *
 * The seed content is the live site's, so its links are absolute
 * smecoilandgas.com URLs, and `SITE.url` is environment-driven because the
 * production domain is still undecided (docs/spec-alignment.md 0.1). Matching
 * only `SITE.url` meant that on any domain other than the old one — including
 * localhost — every one of those links stayed pointed at smecoilandgas.com:
 * 1,757 of them across the build, the whole footer on every page. The old
 * origins are listed explicitly so a link resolves to this site by what it
 * refers to, not by what the site happens to be called today.
 */
const OWN_ORIGINS = [
  SITE.url,
  'https://smecoilandgas.com',
  'https://www.smecoilandgas.com',
  'http://smecoilandgas.com',
  'http://www.smecoilandgas.com',
];

/** The path part of a URL that belongs to this site, or null if it does not. */
function ownPath(href: string): string | null {
  if (href.startsWith('/')) return href;
  for (const origin of OWN_ORIGINS) {
    if (href === origin) return '/';
    if (href.startsWith(`${origin}/`)) return href.slice(origin.length);
  }
  return null;
}

/**
 * The canonical URL for a link.
 *
 * Every link the seed data carries is resolved to where that page now lives,
 * because the spec requires internal links to point at the canonical URL
 * rather than lean on a 301. A link to another site — the group companies —
 * is left exactly as it is.
 */
export function localHref(href: string): string {
  const override = ARTICLE_SLUG_OVERRIDES[href];
  if (override) return MOVED.get(`/${override}`) ?? `/${override}`;

  const path = ownPath(href);
  if (!path) return href;

  const trimmed = path === '/' ? '/' : path.replace(/\/+$/, '').replace(/[?#].*$/, '');
  const moved = MOVED.get(trimmed);
  if (moved) return moved;
  if (KEEP.includes(trimmed) || trimmed === '/') return canonicalPath(trimmed);

  // A page of the old site with no home in the new architecture. It is still
  // this site's URL, so it stays relative and answers 404 here rather than
  // sending a visitor to a domain that is being replaced.
  return canonicalPath(trimmed);
}

export const isExternal = (href: string) => !href.startsWith('/');

/**
 * Canonical form of an internal path: leading slash, trailing slash, no
 * duplicates. The spec requires the canonical, the sitemap entry and the
 * served URL to be the same string, and `trailingSlash: true` decides that
 * format — so page metadata and the sitemap both go through here instead of
 * building paths by hand.
 */
export function canonicalPath(path: string): string {
  const trimmed = path.replace(/^\/+|\/+$/g, '');
  return trimmed ? `/${trimmed}/` : '/';
}
