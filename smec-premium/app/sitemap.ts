import type { MetadataRoute } from 'next';
import { ARTICLES, SITE } from '@/lib/siteData';
import { ALL_SYSTEMS } from '@/lib/systems';
import { articleSlug, canonicalPath, COMPANY_SLUGS } from '@/lib/routes';

/**
 * Canonical, indexable, 200-status URLs only — no redirects, no 404s, no
 * noindex pages, no parameter duplicates. Built from the same data the routes
 * are generated from, so the two cannot drift.
 *
 * Two things still to come (docs/spec-alignment.md): the URLs follow the old
 * WordPress architecture until the routes are re-cut (1.1), and entries will
 * need filtering by publication status once unapproved pages exist (1.10).
 * `lastModified` is deliberately omitted rather than stamped with the build
 * date — the spec asks for accurate lastmod only when a page really changes.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${SITE.url}${canonicalPath(path)}`;

  const entries: MetadataRoute.Sitemap = [
    { url: url('/'), priority: 1 },
    { url: url('/insights'), priority: 0.8 },
    ...COMPANY_SLUGS.map((slug) => ({ url: url(slug), priority: 0.7 })),
    ...ALL_SYSTEMS.map((system) => ({ url: url(system.slug), priority: 0.8 })),
    ...ARTICLES.map((article) => ({ url: url(articleSlug(article)), priority: 0.5 })),
  ];

  return entries;
}
