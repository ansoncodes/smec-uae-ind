/**
 * WordPress → new architecture URL map.
 *
 * Every URL the live smecoilandgas.com sitemap carries (37 pages, 18 posts) is
 * accounted for here as a 301, a keep, a retirement or an open decision. The
 * Technical SEO Master requires one-to-one redirects, one hop, no chains, and
 * forbids bulk-redirecting an old site to its homepage; anything without a
 * genuine equivalent must return a real 404/410 rather than a soft landing.
 *
 * Destinations are the Content Master's locked URLs, trailing slash included.
 *
 * NOT WIRED YET. This build still serves the old paths, so switching the
 * redirects on before the routes are re-cut would 301 the live pages into
 * 404s. `next.config.mjs` picks this up in the same change that moves the
 * routes (checklist 1.1/1.3).
 */

export type Redirect = { from: string; to: string };

/** Pages. */
const PAGE_REDIRECTS: Redirect[] = [
  { from: '/home', to: '/' },
  { from: '/about-us', to: '/company/about/' },
  { from: '/smec-oil-gas-solutions-llc-abu-dhabi', to: '/company/abu-dhabi-office/' },
  { from: '/careers', to: '/company/careers/' },
  { from: '/solutions-and-services', to: '/solutions/' },
  { from: '/e-house-solutions-india', to: '/solutions/e-houses-modular-electrical-rooms/' },
  { from: '/products', to: '/products/' },
  { from: '/shop', to: '/products/' },
  { from: '/contact-us', to: '/contact/' },
  { from: '/blogs', to: '/resources/' },
];

/** Product pages — the old flat paths move under /products/. */
const PRODUCT_REDIRECTS: Redirect[] = [
  { from: '/power-house', to: '/products/power-houses/' },
  { from: '/vfd-houses', to: '/products/vfd-houses/' },
  { from: '/scr-houses', to: '/products/scr-houses/' },
  { from: '/battery-charger', to: '/products/battery-charger/' },
  { from: '/drill-monitor', to: '/products/dms3000-drill-monitoring-system/' },
  { from: '/integrated-drilling-control-system', to: '/products/integrated-drilling-control-system/' },
  { from: '/jacking-control-system', to: '/products/jacking-control-system/' },
  { from: '/rpd-system', to: '/products/rpd-system/' },
  { from: '/load-monitoring-system', to: '/products/load-monitoring-system/' },
  { from: '/bop-control-system', to: '/products/bop-control-system/' },
  { from: '/gas-detection-system', to: '/products/gas-watch-panel/' },
  { from: '/paga-system', to: '/products/paga-system/' },
  { from: '/advanced-perimeter-security-systems', to: '/products/explosion-proof-cctv/' },
  { from: '/flare-boom-ignition-system', to: '/products/flare-ignition-system/' },
  { from: '/industrial-control-panel', to: '/products/plc-hmi-drive-panels/' },
];

/**
 * Posts. The history pieces are exactly the "Asset Archaeology" format the
 * Content Master describes; the rest are technical guides.
 */
const POST_REDIRECTS: Redirect[] = [
  ...[
    'digboi-the-forgotten-flame-that-lit-indias-oil-gas-story',
    'from-seepages-to-sensors-the-complete-timeline-of-oil-gas-firsts-global-india',
    'from-shores-to-sea-legs-how-ongc-built-india',
    'the-birth-of-indias-offshore-energy-journey',
    'the-pipeline-that-changed-india-naharkatiya-noonmati-barauni-1962',
  ].map((slug) => ({ from: `/${slug}`, to: `/resources/asset-archaeology/${slug}/` })),
  ...[
    'a-technical-deep-dive-into-the-critical-systems-that-define-reliability-in-oil-gas-operations',
    'navigating-automation-architecture',
    'optimizing-wellhead-data-collection',
    'flare-ignition-systems',
    'retrofit-solutions',
    'powering-the-future-of-oil-gas-with-automation',
    'unlocking-the-future-digital-twin-technology-the-future-is-now',
    'fueling-the-future',
    'smec-the-solution-hub-3-engineering-resilience-starts-inside-the-panel',
    'how-the-middle-east-is-engineering-energy',
  ].map((slug) => ({ from: `/${slug}`, to: `/resources/whitepapers/${slug}/` })),
];

export const REDIRECTS: Redirect[] = [
  ...PAGE_REDIRECTS,
  ...PRODUCT_REDIRECTS,
  ...POST_REDIRECTS,
];

/** Unchanged: legal page the new architecture does not rename. */
export const KEEP: string[] = ['/privacy-policy'];

/**
 * No equivalent and no value: WooCommerce scaffolding and WordPress defaults,
 * all of them currently live and indexable on smecoilandgas.com. These get a
 * real 404, not a redirect.
 */
export const RETIRED: string[] = [
  '/cart',
  '/checkout',
  '/my-account',
  '/thank-you',
  '/hi',
  '/sample-page',
  '/test',
];

/**
 * Real content with no home in the locked architecture. Needs an SMEC
 * decision (checklist 0.11) before it can be redirected or retired — do not
 * quietly point these at the homepage.
 */
export const UNRESOLVED: string[] = [
  '/research-and-developement',
  '/sustainability',
  '/employee-training',
  '/adipec-2023',
  '/smec-adipec-2023',
  '/smec-at-adipec-2024',
];

/** Shape `next.config.mjs` expects. */
export const nextRedirects = () =>
  REDIRECTS.map(({ from, to }) => ({ source: from, destination: to, permanent: true }));
