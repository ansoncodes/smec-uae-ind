import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/siteData';
import { SPEC_PAGES, isPublished } from '@/lib/spec';

/**
 * Canonical, indexable, 200-status URLs only — no redirects, no 404s, no
 * noindex pages, no parameter duplicates. Built from the same records the
 * routes are generated from, so the two cannot drift, and filtered by
 * publication status: a page still waiting on approved facts is not listed.
 *
 * `lastModified` is deliberately omitted rather than stamped with the build
 * date; the spec asks for accurate lastmod only when a page really changes.
 *
 * Articles still live at their old WordPress paths and join the sitemap when
 * they move under /resources/ (docs/spec-alignment.md 1.1).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return SPEC_PAGES.filter(isPublished).map((page) => ({
    url: `${SITE.url}${page.url}`,
    priority: page.url === '/' ? 1 : Math.max(0.4, 1 - (page.url.split('/').filter(Boolean).length * 0.2)),
  }));
}
