import { SPEC_PAGES, specPage } from '@/lib/spec';

/**
 * The global navigation, and it is not a design decision.
 *
 * §31 of the Technical Master is a lock that supersedes every other
 * navigation table in the handover: eight top-level items, in this order,
 * with Industries & Markets and By Customer as separate entries. The product
 * groupings below are the document's four categories and its own assignment
 * of entities to them, not a grouping invented here.
 *
 * Every destination is checked against the generated page set at module load,
 * so an entry pointing at a page the document does not define is dropped
 * rather than shipped. Labels are written short for a menu; the pages keep
 * the document's own H1.
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
};

const KNOWN = new Set(SPEC_PAGES.map((page) => page.url));

/** `[url, label]` pairs, minus any URL the document does not define. */
const entries = (pairs: [string, string][]): MegaEntry[] =>
  pairs.filter(([href]) => KNOWN.has(href)).map(([href, label]) => ({ href, label }));

const column = (heading: string, pairs: [string, string][]): MegaColumn => ({
  heading,
  entries: entries(pairs),
});

/* §31, "Products consolidation": one Products tab, four categories beneath
   it, and these are the entities the document files under each. All thirty
   are listed, so every product page is reachable from the navigation. */
const megaProducts: MegaColumn[] = [
  column('Electrical & modular packages', [
    ['/solutions/e-houses-modular-electrical-rooms/', 'E-Houses & Modular Electrical Rooms'],
    ['/products/mcc-pcc-power-distribution/', 'MCC, PCC & Distribution'],
    ['/products/plc-hmi-drive-panels/', 'PLC, HMI & Drive Panels'],
    ['/products/battery-charger/', 'Battery Chargers'],
  ]),
  column('Rig & offshore systems', [
    ['/products/power-houses/', 'Power Houses'],
    ['/products/vfd-houses/', 'VFD Houses'],
    ['/products/scr-houses/', 'SCR Houses'],
    ['/products/dms3000-drill-monitoring-system/', 'DMS3000'],
    ['/products/integrated-drilling-control-system/', 'Integrated Drilling Control'],
    ['/products/top-drive-control-system/', 'Top Drive Control'],
    ['/products/jacking-control-system/', 'Jacking Control'],
    ['/products/rpd-system/', 'RPD'],
    ['/products/load-monitoring-system/', 'Load Monitoring'],
    ['/products/bop-control-system/', 'BOP Control'],
    ['/products/generator-control-pms/', 'Generator Control & PMS'],
    ['/products/skidding-current-monitoring/', 'Skidding Current Monitoring'],
  ]),
  column('Safety, communication & marine', [
    ['/products/gas-watch-panel/', 'Gas Watch'],
    ['/products/fire-gas-detection/', 'Fire & Gas'],
    ['/products/paga-system/', 'PAGA'],
    ['/products/explosion-proof-cctv/', 'Explosion-Proof CCTV'],
    ['/products/flare-ignition-system/', 'Flare Ignition'],
    ['/products/ballast-control-system/', 'Ballast Control'],
    ['/products/marine-growth-prevention/', 'Marine Growth Prevention'],
    ['/products/bilge-alarm-system/', 'Bilge Alarm'],
    ['/products/driller-talkback-av-alarm/', 'Driller Talkback & AV Alarm'],
    ['/products/automatic-fire-fighting-control/', 'Automatic Fire Fighting'],
    ['/products/illumination-hut/', 'Illumination Hut'],
  ]),
  column('Plant & control systems', [
    ['/products/integrated-control-safety-system/', 'ICSS'],
    ['/products/boiler-burner-management/', 'Boiler & Burner Management'],
    ['/products/plant-automation-scada/', 'Plant Automation & SCADA'],
    ['/products/dam-level-monitoring/', 'Dam Level Monitoring'],
  ]),
];

const megaSolutions: MegaColumn[] = [
  column('Engineering', [
    ['/solutions/electrical-engineering/', 'Electrical Engineering'],
    ['/solutions/instrumentation/', 'Instrumentation'],
    ['/solutions/automation-control-systems/', 'Automation & Control'],
    ['/solutions/panel-engineering-manufacturing/', 'Panel Engineering'],
    ['/solutions/hydraulics-pneumatics/', 'Hydraulics & Pneumatics'],
  ]),
  column('Projects', [
    ['/solutions/turnkey-engineering-system-solutions/', 'Turnkey Engineering'],
    ['/solutions/greenfield-projects/', 'Greenfield Projects'],
    ['/solutions/brownfield-engineering/', 'Brownfield Engineering'],
    ['/solutions/e-houses-modular-electrical-rooms/', 'E-Houses'],
    ['/solutions/system-integration/', 'System Integration'],
  ]),
  column('Lifecycle', [
    ['/solutions/rig-modernization/', 'Rig Modernization'],
    ['/solutions/control-system-migration/', 'PLC, SCADA & DCS Migration'],
    ['/solutions/lifecycle-obsolescence/', 'Lifecycle & Obsolescence'],
    ['/solutions/shutdown-turnaround/', 'Shutdown & Turnaround'],
    ['/solutions/testing-commissioning/', 'Testing & Commissioning'],
  ]),
];

/* §31 item 1 keeps industries and markets together under one tab. */
const megaIndustries: MegaColumn[] = [
  column('Segments', [
    ['/industries/upstream/', 'Upstream'],
    ['/industries/midstream/', 'Midstream'],
    ['/industries/downstream/', 'Downstream'],
    ['/industries/onshore/', 'Onshore'],
  ]),
  column('Assets & facilities', [
    ['/industries/upstream/offshore-drilling/', 'Offshore Drilling'],
    ['/industries/upstream/onshore-drilling/', 'Onshore Drilling'],
    ['/industries/upstream/production-facilities/', 'Production Facilities'],
    ['/industries/midstream/pipelines/', 'Pipelines'],
    ['/industries/midstream/lng-terminals/', 'LNG Terminals'],
    ['/industries/downstream/refineries/', 'Refineries'],
    ['/industries/downstream/gas-processing/', 'Gas Processing'],
  ]),
  column('Markets', [
    ['/markets/middle-east/', 'Middle East'],
    ['/markets/global-project-support/', 'Global Project Support'],
  ]),
];

const megaCustomers: MegaColumn[] = [
  column('Operators', [
    ['/customers/iocs/', 'IOCs'],
    ['/customers/nocs/', 'NOCs'],
    ['/customers/fleet-operators/', 'Fleet Operators'],
  ]),
  column('Contractors', [
    ['/customers/drilling-contractors/', 'Drilling Contractors'],
    ['/customers/epc-contractors/', 'EPC Contractors'],
  ]),
  column('Vendors & industry', [
    ['/customers/oem-package-vendors/', 'OEM & Package Vendors'],
    ['/customers/industrial-manufacturers/', 'Industrial Manufacturers'],
  ]),
];

const megaDigital: MegaColumn[] = [
  column('Platforms', [
    ['/digital/remote-monitoring-nexwave/', 'NexWave — Remote Monitoring'],
    ['/digital/cmms-proset360/', 'ProSet360 — CMMS'],
    ['/digital/digital-twin-nexverse/', 'NexVerse — Digital Twin'],
  ]),
  column('Applications', [
    ['/digital/industrial-ai-video-nexview/', 'NexView — AI Video'],
    ['/digital/fuel-monitoring/', 'Fuel Monitoring'],
    ['/digital/digital-engineering/', 'Digital Engineering'],
  ]),
];

const megaResources: MegaColumn[] = [
  column('Reading', [
    ['/resources/whitepapers/', 'Technical Guides & Whitepapers'],
    ['/resources/asset-archaeology/', 'Asset Archaeology'],
    ['/resources/case-studies/', 'Case Studies'],
  ]),
  column('Reference', [
    ['/resources/faqs/', 'Engineering FAQs'],
    ['/resources/glossary/', 'Glossary'],
    ['/resources/checklists/', 'Checklists'],
    ['/resources/calculators/', 'Calculators'],
  ]),
];

const megaCompany: MegaColumn[] = [
  column('The company', [
    ['/company/about/', 'About SMEC'],
    ['/company/vision-mission/', 'Vision, Mission & Values'],
    ['/company/md-message/', 'Managing Director’s Message'],
    ['/company/leadership/', 'Leadership'],
    ['/company/careers/', 'Careers'],
  ]),
  column('Where we work', [
    ['/company/abu-dhabi-office/', 'Abu Dhabi Office'],
    ['/company/india-engineering-hub/', 'India Engineering Hub'],
  ]),
  column('Evidence', [
    ['/company/certifications/', 'Certifications'],
    ['/company/oem-partners/', 'OEM Partners'],
    ['/company/project-experience/', 'Clients & Project Experience'],
  ]),
];

/** The hub's own answer, cut to its first sentence, for the panel's aside. */
const hubBlurb = (url: string, fallback: string) => {
  const first = (specPage(url)?.answer ?? '').split(/(?<=\.)\s/)[0];
  return first && first.length <= 130 ? first : fallback;
};

/** The eight, in the order §31 locks them. */
export const TOP_NAV: TopNavItem[] = [
  {
    label: 'Industries & Markets',
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
    label: 'By Customer',
    href: '/customers/',
    allLabel: 'All customer types',
    blurb: hubBlurb('/customers/', 'Operators, contractors and vendors, each with its own scope.'),
    mega: megaCustomers,
  },
  {
    label: 'Solutions',
    href: '/solutions/',
    watch: 'capability',
    allLabel: 'All solutions',
    blurb: hubBlurb('/solutions/', 'Engineering, project and lifecycle scopes across the asset.'),
    mega: megaSolutions,
  },
  {
    label: 'Products',
    href: '/products/',
    watch: 'systems',
    allLabel: 'All products',
    blurb: hubBlurb('/products/', 'Engineered systems for power, drilling control and rig safety.'),
    mega: megaProducts,
  },
  {
    label: 'Digital',
    href: '/digital/',
    watch: 'innovation',
    allLabel: 'All digital',
    blurb: hubBlurb(
      '/digital/',
      'Monitoring, maintenance and engineering data, where the decision case is clear.'
    ),
    mega: megaDigital,
  },
  {
    label: 'Resources',
    href: '/resources/',
    watch: 'insights',
    allLabel: 'All resources',
    blurb: hubBlurb('/resources/', 'Guides, histories, case studies and engineering reference.'),
    mega: megaResources,
  },
  {
    label: 'Company',
    href: '/company/',
    watch: 'about',
    allLabel: 'All company pages',
    blurb: hubBlurb('/company/', 'Profile, offices, certifications, experience and careers.'),
    mega: megaCompany,
  },
  { label: 'Contact / RFQ', href: '/contact/', watch: 'contact' },
];
