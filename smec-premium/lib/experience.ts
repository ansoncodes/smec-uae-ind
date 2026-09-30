/**
 * The presentation model for this build.
 *
 * Every fact here is taken from the live site's own content in
 * `lib/siteData.ts`, `lib/productDetails.ts` and `lib/articles/` — this module
 * only regroups it for the redesigned information architecture (a full
 * twelve-system catalogue, industry panels, the EPC process, the mega menu).
 * Where a system has no page of its own on the live site, its entry carries
 * only what the site states: the product name and its link.
 */

import {
  ARTICLES,
  CERTIFICATES,
  MAP_PINS,
  PRODUCTS,
  PRODUCT_LINKS,
  SITE,
  type Article,
  type NavItem,
} from '@/lib/siteData';
import { productDetails } from '@/lib/productDetails';
import { articleSlug, slugOf } from '@/lib/routes';

/**
 * One-line reductions of each system's own strapline on the live site, used
 * by the homepage system cards.
 */
const SYSTEM_BLURBS: Record<string, string> = {
  'power-house': 'PCR, SCR and VFD houses built to the rig',
  'vfd-houses': 'Variable frequency drive houses',
  'scr-houses': 'Silicon controlled rectifier houses',
  'drill-monitor': 'DMS 3000 real-time drilling parameters',
  'bop-control-system': 'Blowout preventer control, land to subsea',
  'gas-detection-system': 'Gas watch panels for early detection',
  'jacking-control-system': 'Precision control for jack-up rigs',
  'rpd-system': 'Rack phase differential monitoring',
  'load-monitoring-system': 'Load monitoring for lifting operations',
  'paga-system': 'Public address and general alarm',
  'battery-charger': 'Industrial battery charging systems',
  'advanced-perimeter-security-systems': 'Ex-proof CCTV perimeter surveillance',
  'flare-boom-ignition-system': 'Flare boom and pilot ignition',
  'integrated-drilling-control-system': 'One command centre for rig operations',
};

/* --------------------------------------------------------------- systems */

export type SystemCard = {
  slug: string;
  /** Display name for the redesign; `sourceTitle` is the site's own wording. */
  title: string;
  sourceTitle: string;
  href: string;
  /** One-line positioning, from the product's strapline on the live site. */
  lead: string;
  /** Longer body, from the product's own page where it has one. */
  body: string;
  image?: string;
  width?: number;
  height?: number;
  /** Highlights pulled from the product page's first section. */
  highlights: string[];
};

const detailFor = (slug: string) => productDetails[slug];

/**
 * The live site sets some product names in caps and others in title case.
 * This build sets them all in title case; `sourceTitle` keeps the original.
 */
export const titleCase = (value: string) =>
  /[a-z]/.test(value)
    ? value
    : value
        .toLowerCase()
        .replace(/\b[a-z]/g, (letter) => letter.toUpperCase());

/** The eight systems the live site gives a full page and photograph. */
const photographed: SystemCard[] = PRODUCTS.map((product, i) => {
  const slug = slugOf(product.href);
  const detail = detailFor(slug);
  return {
    slug,
    title: titleCase(product.title),
    sourceTitle: product.title,
    href: product.href,
    lead: product.tagline,
    body: detail?.body[0] ?? product.body,
    image: product.image,
    width: product.width,
    height: product.height,
    highlights: detail?.sections[0]?.items.slice(0, 4) ?? [],
  } satisfies SystemCard;
});

/**
 * The four remaining systems in the site's product menu. They have no page in
 * this build, so each carries the site's own product name and link and nothing
 * more — no invented specification.
 */
const listed: SystemCard[] = [
  { slug: 'rpd-system', title: 'RPD System', menuIndex: 6 },
  { slug: 'load-monitoring-system', title: 'Load Monitoring System', menuIndex: 7 },
  { slug: 'paga-system', title: 'PAGA System', menuIndex: 8 },
  { slug: 'battery-charger', title: 'Battery Charger', menuIndex: 9 },
].map(({ slug, title, menuIndex }) => {
  const link = PRODUCT_LINKS[menuIndex];
  return {
    slug,
    title,
    sourceTitle: link.label,
    href: link.href,
    lead: SYSTEM_BLURBS[slug] ?? '',
    body: '',
    highlights: [],
  } satisfies SystemCard;
});

export const SYSTEMS: SystemCard[] = [...photographed, ...listed];

/** Systems with photography, used by the scroll-driven feature section. */
export const FEATURED_SYSTEMS = photographed.slice(0, 5);

/** Systems without a page of their own — rendered as a compact index. */
export const SYSTEM_INDEX = listed;

/* --------------------------------------------------------------- process */

/** The delivery chain for a defined package, design through commissioning. */
export const PROCESS = [
  { step: 'Design', note: 'Requirement capture, engineering and drawings' },
  { step: 'Engineering', note: 'Estimation and system architecture' },
  { step: 'Procurement', note: 'OEM integration and supply' },
  { step: 'Installation', note: 'Build, skid and site installation' },
  { step: 'Commissioning', note: 'Testing, handover and training' },
] as const;

/* ------------------------------------------------------------ industries */

export type Industry = {
  key: string;
  name: string;
  blurb: string;
  systems: string[];
  image: string;
  href: string;
};

export const INDUSTRIES: Industry[] = [
  {
    key: 'onshore',
    name: 'Onshore',
    blurb: 'Land rigs and production facilities, powered and monitored end to end.',
    systems: ['Power Houses', 'Drill Monitor', 'Gas Watch Panel'],
    image: '/images/scaffold/SCAFFOLD-stats-refinery-panorama.jpg',
    href: `${SITE.url}/solutions-and-services`,
  },
  {
    key: 'offshore',
    name: 'Offshore',
    blurb: 'Platform and subsea operations in the most exposed environments.',
    systems: ['BOP Control', 'Flare Boom Ignition', 'Perimeter Security'],
    image: '/images/scaffold/SCAFFOLD-hero-offshore-platform.jpg',
    href: `${SITE.url}/solutions-and-services`,
  },
  {
    key: 'marine',
    name: 'Marine',
    blurb: 'Vessel electrical integration and next-generation propulsion.',
    systems: ['PAGA System', 'Load Monitoring', 'Battery Charger'],
    image: '/images/scaffold/SCAFFOLD-hero-supply-vessel.jpg',
    href: 'https://smecmarine.com/',
  },
  {
    key: 'drilling',
    name: 'Drilling',
    blurb: 'Jack-up and drilling control, from rack phase to full rig command.',
    systems: ['Jacking Control', 'RPD System', 'Integrated Drilling Control'],
    image: '/images/scaffold/SCAFFOLD-hero-jackup-rig.jpg',
    href: `${SITE.url}/integrated-drilling-control-system`,
  },
  {
    key: 'energy',
    name: 'Energy Infrastructure',
    blurb: 'Upstream, midstream and downstream assets kept running and safe.',
    systems: ['SCR Houses', 'VFD Houses', 'Retrofit'],
    image: '/images/scaffold/SCAFFOLD-hero-platform-flare.jpg',
    href: `${SITE.url}/retrofit-solutions`,
  },
  {
    key: 'automation',
    name: 'Industrial Automation',
    blurb: 'Control systems and IoT integration across the leading OEM platforms.',
    systems: ['Integrated Control', 'Instrumentation', 'IoT'],
    image: '/images/Engineering-Resilience-Starts-Inside-the-Panel.webp',
    href: 'https://smecautomation.com/',
  },
];

/* -------------------------------------------------------- global presence */

/** Country list, in the order the live site's map declares its pins. */
export const COUNTRIES = MAP_PINS.map((pin) => ({
  code: pin.code,
  name: pin.name,
  /** Percentages from the live site's own map stylesheet. */
  x: parseFloat(pin.left),
  y: 100 - parseFloat(pin.bottom),
}));

/** Abu Dhabi is the head office; the map draws its links from there. */
export const HOME_COUNTRY = 'ABU DHABI';

/* --------------------------------------------------------- certifications */

/** ISO standard read off each certificate's own alt text. */
export const CERT_CARDS = CERTIFICATES.map((cert) => {
  const standard = cert.alt.split('–')[0].trim();
  return {
    standard,
    title:
      standard.includes('9001')
        ? 'Quality Management'
        : standard.includes('14001')
          ? 'Environmental Management'
          : standard.includes('45001')
            ? 'Occupational Health & Safety'
            : 'Energy Management',
    ...cert,
  };
});

/* -------------------------------------------------------------- insights */

/** Category derived from the article's own subject, for the insight cards. */
const CATEGORY: Record<string, string> = {
  'retrofit-solutions': 'Lifecycle',
  'the-birth-of-indias-offshore-energy-journey': 'History',
  'unlocking-the-future-digital-twin-technology-the-future-is-now': 'Technology',
  'navigating-automation-architecture': 'Automation',
  'flare-ignition-systems': 'Safety',
  'the-pipeline-that-changed-india-naharkatiya-noonmati-barauni-1962': 'History',
  'smec-the-solution-hub-3-engineering-resilience-starts-inside-the-panel': 'Engineering',
  'fueling-the-future': 'Digital Oilfields',
  'from-shores-to-sea-legs-how-ongc-built-india': 'History',
  'a-technical-deep-dive-into-the-critical-systems-that-define-reliability-in-oil-gas-operations':
    'Reliability',
  'digboi-the-forgotten-flame-that-lit-indias-oil-gas-story': 'History',
  'from-seepages-to-sensors-the-complete-timeline-of-oil-gas-firsts-global-india': 'Timeline',
  'how-the-middle-east-is-engineering-energy': 'Energy Transition',
  'smec-vard': 'Marine',
  'smec-at-adipec-2024': 'Company',
  'optimizing-wellhead-data-collection': 'Data',
  'powering-the-future-of-oil-gas-with-automation': 'Automation',
};

export type Insight = Article & { slug: string; category: string };

export const INSIGHTS: Insight[] = ARTICLES.map((article) => {
  const slug = articleSlug(article);
  return { ...article, slug, category: CATEGORY[slug] ?? 'Insight' };
});

/* --------------------------------------------------------------- footer */

/**
 * The eight sections of the locked architecture, so the footer is a route
 * into every part of the site rather than a copy of the old WordPress menu.
 */
export const FOOTER_NAV: NavItem[] = [
  { label: 'Products', href: '/products/' },
  { label: 'Solutions', href: '/solutions/' },
  { label: 'Industries', href: '/industries/' },
  { label: 'By customer', href: '/customers/' },
  { label: 'Digital', href: '/digital/' },
  { label: 'Resources', href: '/resources/' },
  { label: 'Company', href: '/company/' },
  { label: 'Careers', href: '/company/careers/' },
  { label: 'Contact', href: '/contact/' },
];
