import { ARTICLES, type Article } from '@/lib/siteData';
import { articleSlug, canonicalPath } from '@/lib/routes';
import { REDIRECTS } from '@/lib/redirects.mjs';
import { systemDetail } from '@/lib/systems';
import type { SystemDetail } from '@/lib/systems';

/**
 * Ties the pages this build already had to their new homes.
 *
 * The 14 product pages and 17 articles carry body copy, imagery and spec
 * tables lifted from the live site — far more than the Content Master writes
 * for those URLs. Rather than choose between them, the new page takes its H1,
 * answer block, FAQs and metadata from the document and its depth from what
 * is already here.
 *
 * The old-to-new mapping is not repeated: it is read from lib/redirects.ts,
 * so the redirect a visitor follows and the content they land on can never
 * disagree.
 */

const oldPathFor = new Map(REDIRECTS.map(({ from, to }) => [to, from]));

/** The system behind a product URL, where this build has one. */
export function legacySystem(specUrl: string): SystemDetail | undefined {
  const oldPath = oldPathFor.get(canonicalPath(specUrl));
  if (!oldPath) return undefined;
  return systemDetail(oldPath.replace(/^\//, ''));
}

export type ArticleRoute = {
  /** e.g. ['asset-archaeology', 'digboi-…'] */
  segments: string[];
  url: string;
  slug: string;
  article: Article;
  /** The collection hub this article belongs to. */
  collection: string;
};

/** Articles at their new homes, taken from the redirect map. */
export const ARTICLE_ROUTES: ArticleRoute[] = ARTICLES.flatMap((article) => {
  const slug = articleSlug(article);
  const to = REDIRECTS.find((redirect) => redirect.from === `/${slug}`)?.to;
  if (!to) return [];

  const segments = to.split('/').filter(Boolean).slice(1);
  return [
    {
      segments,
      url: to,
      slug,
      article,
      collection: canonicalPath(`resources/${segments[0]}`),
    },
  ];
});

export const articleRoute = (segments: string[]) =>
  ARTICLE_ROUTES.find((route) => route.segments.join('/') === segments.join('/'));

/** The articles filed under a resource collection, for its hub page. */
export const articlesIn = (collectionUrl: string) =>
  ARTICLE_ROUTES.filter((route) => route.collection === canonicalPath(collectionUrl));
