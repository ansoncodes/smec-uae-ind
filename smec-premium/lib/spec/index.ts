import { canonicalPath } from '@/lib/routes';
import { SPEC_PAGES } from './pages.generated';
import type { SpecPage } from './types';

export type { SpecFaq, SpecPage, SpecSection, SpecStatus } from './types';
export { SPEC_PAGES };

/** Every page except the homepage, which has its own composition. */
export const SPEC_ROUTES = SPEC_PAGES.filter((page) => page.url !== '/');

export const specPage = (url: string): SpecPage | undefined =>
  SPEC_PAGES.find((page) => page.url === canonicalPath(url));

/** `/products/vfd-houses/` → ['products', 'vfd-houses'] for a catch-all route. */
export const segmentsOf = (url: string) => url.split('/').filter(Boolean);

/** A draft page renders, but never reaches the index or the sitemap. */
export const isPublished = (page: SpecPage) => page.status === 'approved';

/** Sections that carry copy: the rest are notes to the developer. */
export const publishableSections = (page: SpecPage) =>
  page.sections.filter((section) => !section.internal);

/**
 * Pages one level below this one — the hubs list their children, and any page
 * uses them as its related links.
 */
export function childrenOf(url: string): SpecPage[] {
  const parent = canonicalPath(url);
  const depth = segmentsOf(parent).length;

  return SPEC_PAGES.filter(
    (page) => page.url !== parent && page.url.startsWith(parent) && segmentsOf(page.url).length === depth + 1
  );
}

/** Siblings, for the related-pages block on a leaf page. */
export function breadcrumbTrail(page: SpecPage): { label: string; href?: string }[] {
  const segments = segmentsOf(page.url);

  return page.breadcrumb.map((label, index) => {
    if (index === 0) return { label, href: '/' };
    if (index === page.breadcrumb.length - 1) return { label };

    const path = canonicalPath(segments.slice(0, index).join('/'));
    return { label, href: specPage(path) ? path : undefined };
  });
}
