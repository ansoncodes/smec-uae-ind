import { SPEC_PAGES, specPage } from '@/lib/spec';
import { ASSET_DIGITAL_INTELLIGENCE, type LandingPage } from '@/lib/landingPages';
import { GALLERY_URL } from '@/lib/gallery';

/**
 * The global navigation: the header's tabs and mega menus, and the footer's
 * link columns, kept in one place so the two cannot drift apart again.
 *
 * The menus are the client's own design — the six mega-menu images at the top
 * of her 18 October homepage document (images 1–6) — column for column and in
 * her words. Each item links to the page this build already has for it. Where
 * she names something no page covers yet (SMEC Group, SMEC EDGE, three of the
 * Digitalisation applications), the item waits for its page rather than
 * pointing somewhere it does not belong.
 *
 * Every destination is checked against the page set at module load, so an
 * entry pointing at a page the build does not have is dropped rather than
 * shipped.
 */

export type MegaEntry = { label: string; href: string; blurb?: string };
export type MegaColumn = { heading: string; entries: MegaEntry[] };

export type TopNavItem = {
  label: string;
  href: string;
  /** Section id on the homepage, for the scroll-spy indicator. */
  watch?: string;
  /** One line for the mega panel's aside. */
  blurb?: string;
  /** Label for the "everything in this section" link. */
  allLabel?: string;
  mega?: MegaColumn[];
  /** A smec.in landing page the section links out to (lib/landingPages.ts). */
  outbound?: LandingPage;
  /** Drawn as the bar's call to action, after the tabs, rather than as a tab. */
  cta?: boolean;
};

const KNOWN = new Set([...SPEC_PAGES.map((page) => page.url), GALLERY_URL]);

/**
 * `[url, label]` pairs, minus any URL the build has no page for. A link to a
 * section of a page (`/#training`) is checked by its page.
 */
const entries = (pairs: [string, string][]): MegaEntry[] =>
  pairs
    .filter(([href]) => KNOWN.has(href.replace(/#.*$/, '')))
    .map(([href, label]) => ({ href, label }));

const column = (heading: string, pairs: [string, string][]): MegaColumn => ({
  heading,
  entries: entries(pairs),
});

/* Image 1. Her thirteen items are the thirteen pages of her Tab 1 document.
   Two of those were merged onto two URLs each — E&I onto Electrical
   Engineering and Instrumentation, Greenfield & Brownfield onto both project
   pages — and each links the one the homepage capability cards use; the other
   is one click away on /solutions/. */
const megaSolutions: MegaColumn[] = [
  column('Electrical & Automation', [
    ['/solutions/electrical-engineering/', 'Electrical & Instrumentation Engineering'],
    ['/solutions/automation-control-systems/', 'Industrial Automation & Control'],
    ['/solutions/control-system-migration/', 'PLC, SCADA & DCS Migration'],
    ['/solutions/panel-engineering-manufacturing/', 'Panel Engineering & Manufacturing'],
    ['/solutions/system-integration/', 'System Integration'],
  ]),
  column('Project Engineering', [
    ['/solutions/turnkey-engineering-system-solutions/', 'Turnkey Engineering Packages'],
    ['/solutions/brownfield-engineering/', 'Greenfield & Brownfield Engineering'],
    ['/solutions/rig-modernization/', 'Rig Modernisation & Reactivation'],
    ['/solutions/e-houses-modular-electrical-rooms/', 'E-Houses & Modular Electrical Rooms'],
  ]),
  column('Lifecycle & Execution', [
    ['/solutions/lifecycle-obsolescence/', 'Obsolescence & Retrofit'],
    ['/solutions/shutdown-turnaround/', 'Shutdown & Turnaround Support'],
    ['/solutions/testing-commissioning/', 'FAT, SAT & Commissioning'],
    ['/solutions/hydraulics-pneumatics/', 'Hydraulics & Pneumatics'],
  ]),
];

/* Image 2: her seventeen systems in her three groups. Where one of her items
   spans two pages — Jacking Control & RPD, SCR & VFD Power Houses — it links
   the page that covers both. The products she leaves out of the menu are all
   still listed on /products/. */
const megaProducts: MegaColumn[] = [
  column('Drilling & Offshore', [
    ['/products/dms3000-drill-monitoring-system/', 'Drilling Monitoring — DMS3000'],
    ['/products/integrated-drilling-control-system/', 'Integrated Drilling Control'],
    ['/products/jacking-control-system/', 'Jacking Control & RPD'],
    ['/products/bop-control-system/', 'BOP Control Systems'],
    ['/products/top-drive-control-system/', 'Top Drive Control'],
    ['/products/generator-control-pms/', 'Generator Control & PMS'],
  ]),
  column('Electrical & Power', [
    ['/products/power-houses/', 'SCR & VFD Power Houses'],
    ['/solutions/e-houses-modular-electrical-rooms/', 'E-Houses'],
    ['/products/mcc-pcc-power-distribution/', 'MCC, PCC & Distribution Panels'],
    ['/products/plc-hmi-drive-panels/', 'PLC, HMI & Drive Panels'],
    ['/products/battery-charger/', 'Battery Chargers'],
  ]),
  column('Safety & Industrial', [
    ['/products/gas-watch-panel/', 'Gas Watch & Gas Detection'],
    ['/products/fire-gas-detection/', 'Fire & Gas Systems'],
    ['/products/flare-ignition-system/', 'Flare Ignition Systems'],
    ['/products/paga-system/', 'PAGA & Communication'],
    ['/products/integrated-control-safety-system/', 'Integrated Control & Safety Systems'],
    ['/products/ballast-control-system/', 'Marine & Ballast Control'],
  ]),
];

/* Image 3. Her Applications column also lists Industrial IoT & Connected
   Assets, Condition Monitoring and Remote Operations, which have no page yet.
   Fuel Monitoring stays here, as she confirmed on 20 October, under the name
   her design gives it. */
const megaDigital: MegaColumn[] = [
  column('Digital Platforms', [
    ['/digital/remote-monitoring-nexwave/', 'NexWave — Remote Monitoring'],
    ['/digital/cmms-proset360/', 'ProSet360 — Predictive Maintenance & CMMS'],
    ['/digital/digital-twin-nexverse/', 'NexVerse — Digital Twin'],
    ['/digital/industrial-ai-video-nexview/', 'NexView — AI Video Analytics'],
  ]),
  column('Applications', [
    ['/digital/fuel-monitoring/', 'Fuel & Energy Monitoring'],
    ['/digital/digital-engineering/', 'Digital Engineering'],
  ]),
];

/* Image 4. The pages her menu does not list — the segment hubs, the other
   customer types, the two market pages — keep their URLs and are linked from
   their hubs and related pages. */
const megaIndustries: MegaColumn[] = [
  column('Drilling & Offshore', [
    ['/industries/upstream/offshore-drilling/', 'Offshore Drilling & Jack-Up Rigs'],
    ['/industries/upstream/onshore-drilling/', 'Onshore Drilling'],
    // No industry page of its own: her Tab 4 entry was folded into the rig
    // solution page, which carries her "Rig Modernisation & Reactivation" copy.
    ['/solutions/rig-modernization/', 'Rig Reactivation'],
    ['/industries/marine-offshore-vessels/', 'Marine & Offshore Vessels'],
  ]),
  column('Oil & Gas Facilities', [
    ['/industries/upstream/production-facilities/', 'Oil & Gas Production'],
    ['/industries/downstream/refineries/', 'Refineries & Petrochemicals'],
    ['/industries/downstream/gas-processing/', 'Gas Processing & LNG'],
    ['/industries/midstream/pipelines/', 'Pipelines & Terminals'],
  ]),
  column('Who We Support', [
    // The customer-type hub, as on the homepage: IOCs and NOCs are both here.
    ['/customers/', 'Oil & Gas Operators'],
    ['/customers/drilling-contractors/', 'Drilling Contractors'],
    ['/customers/epc-contractors/', 'EPC Contractors'],
    ['/customers/oem-package-vendors/', 'OEMs & Package Vendors'],
  ]),
];

/* Image 5. Her list ends with SMEC EDGE — Newsletter, which has no page yet:
   the sign-up waits on a Mailchimp audience (HP-17). */
const megaResources: MegaColumn[] = [
  column('Technical Knowledge', [
    ['/resources/whitepapers/', 'Technical Guides & Whitepapers'],
    ['/resources/asset-archaeology/', 'Asset Archaeology'],
    ['/resources/case-studies/', 'Case Studies'],
  ]),
  column('Engineering Reference', [
    ['/resources/faqs/', 'Engineering FAQs'],
    ['/resources/glossary/', 'Glossary'],
    ['/resources/checklists/', 'Checklists'],
  ]),
];

/* Image 6. SMEC Group, third in her Company list, has no page yet (CNT-07).
   The India hub page is both the India company and the India facility — its
   H1 names both — so her two India items lead to it. */
const megaCompany: MegaColumn[] = [
  column('Company', [
    ['/company/about/', 'SMEC Oil & Gas Solutions LLC — UAE'],
    ['/company/india-engineering-hub/', 'SMEC Automation Pvt Ltd — India'],
    ['/company/leadership/', 'Leadership'],
    ['/company/careers/', 'Careers'],
  ]),
  column('Credentials & Locations', [
    ['/company/certifications/', 'Certifications & Quality'],
    ['/company/oem-partners/', 'OEM Relationships'],
    ['/company/project-experience/', 'Clients & Project Experience'],
    ['/company/abu-dhabi-office/', 'Abu Dhabi Office'],
    ['/company/india-engineering-hub/', 'India Engineering & Manufacturing'],
  ]),
];

/** The hub's own answer, cut to its first sentence, for the panel's aside. */
const hubBlurb = (url: string, fallback: string) => {
  const first = (specPage(url)?.answer ?? '').split(/(?<=\.)\s/)[0];
  return first && first.length <= 130 ? first : fallback;
};

/**
 * The client's six tabs, in her order, then Gallery and the RFQ route.
 *
 * This replaces the eight the handover documents specify — the Content Master
 * ("Top-level navigation: Industries & Markets | By Customer | Solutions |
 * Products | Digital | Resources | Company | Contact/RFQ"), the Technical SEO
 * Master and the Developer Brief all carry that list. It is a deliberate
 * override, not drift: on 22 October SMEC confirmed those documents were
 * generated rather than written, that only the content in them is hers, and
 * handed navigation, URL and structure decisions to us; the six tabs are what
 * she then set and approved on 23 October. She added Gallery as a main tab the
 * same day, and her homepage document's navigation line puts it after About
 * SMEC.
 *
 * Only the labels and the grouping move. Every URL underneath is unchanged,
 * which is what keeps the crawl-verified redirect map valid — so the tabs are
 * navigation, not a URL scheme.
 *
 * The Content Master's one substantive navigation rule still holds: a single
 * top-level Products tab, with E-Houses, rig and offshore systems beneath it
 * rather than split across tabs.
 *
 * Her navigation line ends with Submit RFQ, so that is the bar's one call to
 * action; the "Let's Talk" button that sat beside it, to the same page, is
 * gone.
 */
export const TOP_NAV: TopNavItem[] = [
  {
    label: 'Engineering Solutions',
    href: '/solutions/',
    watch: 'capability',
    allLabel: 'All solutions',
    blurb: hubBlurb('/solutions/', 'Engineering, project and lifecycle scopes across the asset.'),
    mega: megaSolutions,
  },
  {
    label: 'Systems & Products',
    href: '/products/',
    watch: 'systems',
    allLabel: 'All products',
    blurb: hubBlurb('/products/', 'Engineered systems for power, drilling control and rig safety.'),
    mega: megaProducts,
  },
  {
    label: 'Digitalisation',
    href: '/digital/',
    watch: 'innovation',
    allLabel: 'All digitalisation',
    blurb: hubBlurb(
      '/digital/',
      'Monitoring, maintenance and engineering data, where the decision case is clear.'
    ),
    mega: megaDigital,
    // Beside the columns rather than in one: her menu design (homepage
    // document, image 3) has no entry for it.
    outbound: ASSET_DIGITAL_INTELLIGENCE,
  },
  {
    label: 'Industries',
    href: '/industries/',
    watch: 'industries',
    allLabel: 'All industries',
    blurb: hubBlurb(
      '/industries/',
      'Upstream, midstream and downstream assets, onshore and offshore.'
    ),
    mega: megaIndustries,
  },
  {
    label: 'Projects & Resources',
    href: '/resources/',
    watch: 'insights',
    allLabel: 'All resources',
    blurb: hubBlurb('/resources/', 'Guides, histories, case studies and engineering reference.'),
    mega: megaResources,
  },
  {
    label: 'About SMEC',
    href: '/company/',
    watch: 'about',
    allLabel: 'All company pages',
    blurb: hubBlurb('/company/', 'Profile, offices, certifications, experience and careers.'),
    mega: megaCompany,
  },
  { label: 'Gallery', href: GALLERY_URL },
  { label: 'Submit RFQ', href: '/contact/', watch: 'contact', cta: true },
];

/**
 * The footer's four link columns, from her footer design (homepage document,
 * image 32), in her order and her words, with three changes of ours:
 *
 * - Her Systems column opens with three groups — Drilling & Offshore, Power &
 *   Control, Industrial Safety — that have no page each; a single link to the
 *   Systems & Products hub, which lists all of them, stands in for the three.
 * - SMEC EDGE Newsletter waits for its page, as in the Resources menu.
 * - Gallery joins Explore SMEC, because it is now a main tab.
 *
 * SMEC Group, her fourth column, links out to other sites and lives with the
 * group's details in lib/siteData.ts.
 */
export const FOOTER_COLUMNS: MegaColumn[] = [
  column('Engineering Solutions', [
    ['/solutions/electrical-engineering/', 'Electrical & Instrumentation Engineering'],
    ['/solutions/automation-control-systems/', 'Industrial Automation & Control'],
    ['/solutions/rig-modernization/', 'Drilling Rig Modernisation'],
    ['/solutions/control-system-migration/', 'PLC, SCADA & DCS Migration'],
    ['/solutions/brownfield-engineering/', 'Brownfield Upgrades & Retrofit'],
    ['/solutions/testing-commissioning/', 'FAT, SAT & Commissioning'],
    // No training page exists; the homepage section is where it is described.
    ['/#training', 'Technical Training & Upskilling'],
  ]),
  column('Systems & Digitalisation', [
    ['/products/', 'Systems & Products'],
    ['/digital/remote-monitoring-nexwave/', 'NexWave — Remote Monitoring'],
    ['/digital/cmms-proset360/', 'ProSet360 — Predictive Maintenance'],
    ['/digital/digital-twin-nexverse/', 'NexVerse — Digital Twin'],
    ['/digital/industrial-ai-video-nexview/', 'NexView — AI Video Analytics'],
  ]),
  column('Explore SMEC', [
    ['/company/about/', 'About SMEC'],
    ['/industries/', 'Industries & Applications'],
    ['/resources/case-studies/', 'Projects & Case Studies'],
    [GALLERY_URL, 'Gallery'],
    ['/company/certifications/', 'Certifications & Quality'],
    ['/resources/', 'Engineering Resources'],
    ['/company/careers/', 'Careers'],
    ['/contact/', 'Contact Us'],
  ]),
];
