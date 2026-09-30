import { SPEC_PAGES, specPage } from '@/lib/spec';

/**
 * The global navigation, built from the locked architecture.
 *
 * Every destination is one of the Content Master's URLs, and the URLs are
 * checked against the generated page set at module load: a menu entry that
 * points at a page the document does not define is dropped rather than
 * shipped as a dead link. Labels are written short for a menu — the pages
 * keep the document's own H1.
 *
 * The old menu was the WordPress one (About · Products · Solutions and
 * Services · R&D · Careers · Contact), with the products listed flat and
 * three of the eight sections missing entirely.
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

/* The 30 products do not fit in a menu, so each column carries the systems
   asked for most often and "All products" carries the rest. */
const megaProducts: MegaColumn[] = [
  column('Drilling & rig systems', [
    ['/products/power-houses/', 'Power Houses'],
    ['/products/vfd-houses/', 'VFD Houses'],
    ['/products/scr-houses/', 'SCR Houses'],
    ['/products/dms3000-drill-monitoring-system/', 'DMS3000 Drill Monitoring'],
    ['/products/integrated-drilling-control-system/', 'Integrated Drilling Control'],
    ['/products/top-drive-control-system/', 'Top Drive Control'],
  ]),
  column('Power & control', [
    ['/products/mcc-pcc-power-distribution/', 'MCC, PCC & Distribution'],
    ['/products/plc-hmi-drive-panels/', 'PLC, HMI & Drive Panels'],
    ['/products/generator-control-pms/', 'Generator Control & PMS'],
    ['/products/plant-automation-scada/', 'Plant Automation & SCADA'],
    ['/products/battery-charger/', 'Battery Chargers'],
    ['/products/illumination-hut/', 'Illumination Huts'],
  ]),
  column('Safety & monitoring', [
    ['/products/fire-gas-detection/', 'Fire & Gas Detection'],
    ['/products/gas-watch-panel/', 'Gas Watch Panel'],
    ['/products/flare-ignition-system/', 'Flare Ignition'],
    ['/products/explosion-proof-cctv/', 'Explosion-Proof CCTV'],
    ['/products/paga-system/', 'PAGA System'],
    ['/products/load-monitoring-system/', 'Load Monitoring'],
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

/* Industries, customers and markets are three ways into the same question —
   which asset, whose asset, where — so they share one panel. */
const megaIndustries: MegaColumn[] = [
  column('By asset', [
    ['/industries/upstream/', 'Upstream'],
    ['/industries/midstream/', 'Midstream'],
    ['/industries/downstream/', 'Downstream'],
    ['/industries/onshore/', 'Onshore'],
  ]),
  column('By customer', [
    ['/customers/iocs/', 'IOCs'],
    ['/customers/nocs/', 'NOCs'],
    ['/customers/drilling-contractors/', 'Drilling Contractors'],
    ['/customers/epc-contractors/', 'EPC Contractors'],
    ['/customers/fleet-operators/', 'Fleet Operators'],
    ['/customers/oem-package-vendors/', 'OEM & Package Vendors'],
  ]),
  column('By region', [
    ['/markets/middle-east/', 'Middle East'],
    ['/markets/global-project-support/', 'Global Project Support'],
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

export const TOP_NAV: TopNavItem[] = [
  {
    label: 'Products',
    href: '/products/',
    watch: 'systems',
    allLabel: 'All products',
    blurb: hubBlurb('/products/', 'Engineered systems for power, drilling control and rig safety.'),
    mega: megaProducts,
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
  { label: 'Resources', href: '/resources/', watch: 'insights' },
  {
    label: 'Company',
    href: '/company/',
    watch: 'about',
    allLabel: 'All company pages',
    blurb: hubBlurb('/company/', 'Profile, offices, certifications, experience and careers.'),
    mega: megaCompany,
  },
  { label: 'Contact', href: '/contact/', watch: 'contact' },
];
