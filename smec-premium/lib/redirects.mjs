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
 * Kept as .mjs, not .ts, because `next.config.mjs` serves these redirects and
 * `lib/spec/legacy.ts` reads the same map to decide which existing page each
 * new URL renders. One copy, so a visitor's 301 and the content they land on
 * cannot disagree.
 *
 * @typedef {{ from: string, to: string }} Redirect
 */

/** @type {Redirect[]} Pages. */
const PAGE_REDIRECTS = [
  { from: '/home', to: '/' },
  { from: '/about-us', to: '/company/about/' },
  { from: '/smec-oil-gas-solutions-llc-abu-dhabi', to: '/company/abu-dhabi-office/' },
  { from: '/careers', to: '/company/careers/' },
  { from: '/solutions-and-services', to: '/solutions/' },
  { from: '/e-house-solutions-india', to: '/solutions/e-houses-modular-electrical-rooms/' },
  // `/products` is not a move: `trailingSlash` already sends it to
  // `/products/`, and a rule for it would point the path at itself.
  { from: '/shop', to: '/products/' },
  { from: '/contact-us', to: '/contact/' },
  { from: '/blogs', to: '/resources/' },
  // Not a WordPress URL: the insights index this build added before the
  // architecture was locked.
  { from: '/insights', to: '/resources/' },
];

/** Product pages — the old flat paths move under /products/. */
/** @type {Redirect[]} */
const PRODUCT_REDIRECTS = [
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
 *
 * @type {Redirect[]}
 */
const POST_REDIRECTS = [
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

/** @type {Redirect[]} */
export const REDIRECTS = [
  ...PAGE_REDIRECTS,
  ...PRODUCT_REDIRECTS,
  ...POST_REDIRECTS,
];

/**
 * Unchanged: the legal page the new architecture does not rename, and the
 * product index, which keeps its path.
 *
 * @type {string[]}
 */
export const KEEP = ['/privacy-policy', '/products'];

/**
 * No equivalent and no value: WooCommerce scaffolding and WordPress defaults,
 * all of them currently live and indexable on smecoilandgas.com. These get a
 * real 404, not a redirect.
 */
/** @type {string[]} */
export const RETIRED = [
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
/** @type {string[]} */
export const UNRESOLVED = [
  '/research-and-developement',
  '/sustainability',
  '/employee-training',
  '/adipec-2023',
  '/smec-adipec-2023',
  '/smec-at-adipec-2024',
];

/**
 * Shape `next.config.mjs` expects.
 *
 * 301, spelled out, rather than `permanent: true` — that flag emits a 308,
 * and the Technical SEO Master asks for 301s by number.
 */
export const nextRedirects = () =>
  REDIRECTS
    // A rule whose source differs from its destination only by the trailing
    // slash would redirect the path to itself, and a browser following that
    // gives up after twenty hops.
    .filter(({ from, to }) => `${from}/` !== to)
    .map(({ from, to }) => ({ source: from, destination: to, statusCode: 301 }));
