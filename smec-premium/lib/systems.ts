/**
 * One shape for every system page, whether its content comes from the
 * homepage data set (`lib/siteData.ts` + `lib/productDetails.ts`) or from the
 * pages the homepage never carried (`lib/systemPages.ts`).
 */

import { PRODUCTS, PRODUCT_LINKS, type NavItem } from '@/lib/siteData';
import { productDetails, type ProductSection, type ProductSpec } from '@/lib/productDetails';
import { systemPages } from '@/lib/systemPages';
import { slugOf } from '@/lib/routes';
import { titleCase } from '@/lib/experience';

export type SystemDetail = {
  slug: string;
  title: string;
  href: string;
  tagline: string;
  subtitle?: string;
  body: string[];
  sections: ProductSection[];
  specs?: { heading: string; rows: ProductSpec[] };
  image?: string;
  width?: number;
  height?: number;
  /** Sibling links surfaced on the page, e.g. the Power House variants. */
  variants: NavItem[];
};

/** Power House is the parent of the two house variants the menu lists. */
const VARIANTS: Record<string, RegExp> = {
  'power-house': /\/(vfd|scr)-houses$/,
};

const PARENT_HOUSE =
  PRODUCTS.find((product) => slugOf(product.href) === 'power-house')?.href ?? '/power-house';

const fromHomepage: SystemDetail[] = PRODUCTS.map((product) => {
  const slug = slugOf(product.href);
  const detail = productDetails[slug];
  const pattern = VARIANTS[slug];
  return {
    slug,
    title: titleCase(product.title),
    href: product.href,
    tagline: product.tagline,
    subtitle: detail?.subtitle,
    body: detail?.body ?? [product.body],
    sections: detail?.sections ?? [],
    specs: detail?.specs,
    image: product.image,
    width: product.width,
    height: product.height,
    variants: pattern ? PRODUCT_LINKS.filter((link) => pattern.test(link.href)) : [],
  };
});

const fromOwnPages: SystemDetail[] = systemPages.map((page) => ({
  slug: page.slug,
  title: page.title,
  href: page.href,
  tagline: page.tagline,
  subtitle: page.subtitle,
  body: page.body,
  sections: page.sections,
  specs: page.specs,
  image: page.image,
  width: page.width,
  height: page.height,
  // The two house variants point back at the Power House parent.
  variants:
    page.slug === 'vfd-houses' || page.slug === 'scr-houses'
      ? [{ label: 'Power Houses', href: PARENT_HOUSE }]
      : [],
}));

export const ALL_SYSTEMS: SystemDetail[] = [...fromHomepage, ...fromOwnPages];

export const systemDetail = (slug: string) =>
  ALL_SYSTEMS.find((system) => system.slug === slug);

/** Four other systems to show at the foot of a system page, photos first. */
export function relatedSystems(slug: string): SystemDetail[] {
  const others = ALL_SYSTEMS.filter((system) => system.slug !== slug);
  const withPhoto = others.filter((system) => system.image);
  const withoutPhoto = others.filter((system) => !system.image);
  return [...withPhoto, ...withoutPhoto].slice(0, 4);
}
