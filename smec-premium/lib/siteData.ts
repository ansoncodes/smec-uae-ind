/**
 * Content extracted verbatim from https://smecoilandgas.com/
 * Copy is SEO-critical - do not paraphrase when editing.
 */

export const SITE = {
  /**
   * The production domain is still an open decision (Developer Handover Brief
   * §35, docs/spec-alignment.md 0.1), so it comes from the environment and
   * every canonical, sitemap entry and schema @id follows it. The old domain
   * is only the local fallback — set NEXT_PUBLIC_SITE_URL per environment.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://smecoilandgas.com',
  name: 'SMEC Oil & Gas',
  /**
   * The live title and description are keyword-stuffed ("Best SMEC OIL AND GAS
   * Company in India, GCC Countries"), which the Technical SEO Master rules
   * out. These are the approved homepage title and meta description from the
   * Content Master (docs/spec-alignment.md 2.2).
   */
  title: 'Oil & Gas Engineering, E&I & Automation | SMEC',
  description:
    'E&I, automation, engineered products, rig modernization and digital engineering for critical energy assets.',
  logo: '/images/SMEC-Oil-and-Gas-Logo.png',
  logoFooter: '/images/SMEC-Oil-and-Gas-Logo-300x109.png',
} as const;

/* ---------------------------------------------------------------- header */

export type NavItem = { label: string; href: string; children?: NavItem[] };

export const PRODUCT_LINKS: NavItem[] = [
  { label: 'VFD Houses', href: 'https://smecoilandgas.com/vfd-houses' },
  { label: 'SCR Houses', href: 'https://smecoilandgas.com/scr-houses' },
  { label: 'Drill Monitoring System – DMS 3000', href: 'https://smecoilandgas.com/drill-monitor' },
  { label: 'BOP Control System', href: 'https://smecoilandgas.com/bop-control-system' },
  { label: 'Gas Watch Panel', href: 'https://smecoilandgas.com/gas-detection-system' },
  { label: 'Jacking Control System', href: 'https://smecoilandgas.com/jacking-control-system' },
  { label: 'RPD System', href: 'https://smecoilandgas.com/rpd-system' },
  { label: 'Load Monitoring System', href: 'https://smecoilandgas.com/load-monitoring-system' },
  {
    label: 'PAGA System – Public Adress General Alarm',
    href: 'https://smecoilandgas.com/paga-system',
  },
  { label: 'Battery Charger', href: 'https://smecoilandgas.com/battery-charger' },
  {
    label: 'CCTV Advanced Perimeter Security Systems',
    href: 'https://smecoilandgas.com/advanced-perimeter-security-systems',
  },
  {
    label: 'Flare Boom Ignition | Pilot Ignition System',
    href: 'https://smecoilandgas.com/flare-boom-ignition-system',
  },
  {
    label: 'Integrated Drilling Control System',
    href: 'https://smecoilandgas.com/integrated-drilling-control-system',
  },
];

export const NAV: NavItem[] = [
  { label: 'About Us', href: 'https://smecoilandgas.com/about-us' },
  { label: 'Products', href: '#', children: PRODUCT_LINKS },
  { label: 'Solutions and Services', href: 'https://smecoilandgas.com/solutions-and-services' },
  { label: 'Research & Development', href: 'https://smecoilandgas.com/research-and-developement' },
  { label: 'Careers', href: 'https://smecoilandgas.com/careers' },
  { label: 'Contact Us', href: 'https://smecoilandgas.com/contact-us' },
];

/**
 * The two entities, as the homepage document's top bar lists them: the
 * Middle East company first, then the India engineering company.
 */
export const CONTACT = {
  region: 'Middle East',
  entity: 'SMEC Oil & Gas Solutions LLC',
  email: 'info@smecong.com',
  emailHref: 'mailto:info@smecong.com',
  phone: '+971 54 549 6420',
  phoneHref: 'tel:+971545496420',
  whatsapp: 'https://wa.me/971545496420',
} as const;

/**
 * Every client source gives this India number — the 15 Sep message, the
 * homepage document, the RFQ and WhatsApp designs. The number the old live
 * site published is not hers and appears nowhere in this build.
 */
export const CONTACT_INDIA = {
  region: 'India',
  entity: 'SMEC Automation Pvt Ltd',
  email: 'sales@smecong.com',
  emailHref: 'mailto:sales@smecong.com',
  phone: '+91 86060 47714',
  phoneHref: 'tel:+918606047714',
  whatsapp: 'https://wa.me/918606047714',
} as const;

/**
 * The message both WhatsApp conversations open with, from the homepage
 * document. Its last three labels share one line there; each has its own here,
 * so a visitor fills in a field rather than editing a sentence.
 */
export const WHATSAPP_MESSAGE = [
  'Hello SMEC Engineering Team,',
  'I would like to discuss a technical requirement.',
  'Project location:',
  'Engineering requirement:',
  'Company:',
].join('\n');

/* ------------------------------------------------------------------ hero */

export const HERO = {
  image: '/images/Oil-and-gas-Banner.webp',
  title: 'SMEC OIL AND GAS',
  subtitle: 'TURNKEY SOLUTIONS FOR OIL AND GAS INDUSTRY',
  body: [
    'Delivering solutions for onshore and offshore Rigs',
    'We understand that your needs are unique and we assure you customized solutions',
  ],
  cta: { label: 'Contact Us', href: 'https://smecoilandgas.com/contact-us' },
  badge: {
    src: '/images/adnoc-in-country-value-certified.png',
    width: 465,
    height: 270,
    alt: 'ADNOC In-Country Value Certified',
  },
} as const;

/* -------------------------------------------------------------- partners */

export const PARTNERS = [
  {
    src: '/images/partner-taqa.webp',
    alt: 'TAQA',
    width: 150,
    height: 80,
  },
  {
    src: '/images/partner-snoc.png',
    alt: 'Sharjah National Oil Corporation',
    width: 100,
    height: 60,
  },
  {
    src: '/images/partner-dewa.png',
    alt: 'Dubai Electricity & Water Authority',
    width: 250,
    height: 59,
  },
  {
    src: '/images/partner-adnoc.webp',
    alt: 'ADNOC',
    width: 150,
    height: 78,
  },
];

/* -------------------------------------------------------------- products */

export type Product = {
  title: string;
  tagline: string;
  body: string;
  href: string;
  image: string;
  width: number;
  height: number;
  /** The first card sets its tagline/body a step larger than the rest. */
  scale: 'lead' | 'compact';
  /** Height of the spacer widget that bottom-aligns each card's button. */
  spacer: number;
};

export const PRODUCTS_INTRO =
  'SMEC Oil & Gas provides comprehensive engineering, procurement, construction, and maintenance solutions for the oil and gas industry. We focus on delivering reliable, cost-effective, and innovative services while maintaining the highest standards of safety, quality, efficiency, sustainability, and customer satisfaction across every project.';

export const PRODUCTS: Product[] = [
  {
    title: 'POWER HOUSES',
    tagline: 'PCR House | SCR House | VFD House',
    body: 'Tailored Solutions for Optimal Performance with PCR, SCR, and VFD Technologies.',
    href: 'https://smecoilandgas.com/power-house',
    image: '/images/Power-House-SMEC.png',
    width: 879,
    height: 527,
    scale: 'lead',
    spacer: 30,
  },
  {
    title: 'Advanced Perimeter Security System',
    tagline: "Secure Your Boundaries with SMEC's Advanced Perimeter Security System!",
    body: 'Custom-Built Surveillance Systems for Extreme Environments – Tailored, Tested, and Trained by SMEC Experts',
    href: 'https://smecoilandgas.com/advanced-perimeter-security-systems',
    image: '/images/Advanced-Perimeter-Security-System.png',
    width: 879,
    height: 527,
    scale: 'compact',
    spacer: 30,
  },
  {
    title: 'Drill Monitor System',
    tagline: 'Stay Alert, Stay Safe: Gas Watch Panel by SMEC',
    body: 'Revolutionize Your Drilling Operations with SMEC’s Cutting-Edge Gas Detection Solutions: Prioritizing Safety and Efficiency in the Oil and Gas Industry!',
    href: 'https://smecoilandgas.com/drill-monitor',
    image: '/images/Drill-Monitor-System-1.png',
    width: 879,
    height: 527,
    scale: 'compact',
    spacer: 50,
  },
  {
    title: 'Integrated Drilling Control System',
    tagline: 'Elevate Your Drilling: Precision Meets Innovation with SMEC’s Integrated Control System!',
    body: 'Maximize Drilling Efficiency with the SMEC Integrated Drilling Control System: Your Command Center for High-Availability Rig Operations!',
    href: 'https://smecoilandgas.com/integrated-drilling-control-system',
    image: '/images/Integrated-Drilling-Control-System-768x460.png',
    width: 768,
    height: 460,
    scale: 'compact',
    spacer: 0,
  },
  {
    title: 'RPD System Jacking Control System',
    tagline: 'Precision Control for Unmatched Performance!',
    body: 'Optimize Jack-Up Rig Performance with RPD System: Ensure Precision in Rack Phase Differential Monitoring to Prevent Over-Stresses!',
    href: 'https://smecoilandgas.com/jacking-control-system',
    image: '/images/RPD-System-Jacking-Control-System-768x460.png',
    width: 768,
    height: 460,
    scale: 'compact',
    spacer: 10,
  },
  {
    title: 'Flare Boom Pilot Ignition System',
    tagline: "Ignite Efficiency with SMEC's Flare Boom Pilot Ignition System!",
    body: 'Upgrade Your Performance with SMEC’s Reliable Ignition Systems – Tested, Fired, and Ready for Long-Lasting Results! New, Retrofit, or Replacement Flare Boom Pilot Ignitions Available',
    href: 'https://smecoilandgas.com/flare-boom-ignition-system',
    image: '/images/Flare-Boom-Pilot-Ignition-System-768x460.png',
    width: 768,
    height: 460,
    scale: 'compact',
    spacer: 10,
  },
  {
    title: 'BOP Control System',
    tagline: 'Protect Your Rig, Prevent Well Kicks & Explosions!',
    body: 'Protect Your Oil Rig with SMEC’s Advanced BOP Control System – Prevent Well Kicks & Explosions on Land, Platforms, & Subsea!',
    href: 'https://smecoilandgas.com/bop-control-system',
    image: '/images/BOP-Control-System-768x460.png',
    width: 768,
    height: 460,
    scale: 'compact',
    spacer: 50,
  },
  {
    title: 'Gas Watch Panel',
    tagline: 'Stay Alert, Stay Safe: Gas Watch Panel by SMEC',
    body: 'Revolutionize Your Drilling Operations with SMEC’s Cutting-Edge Gas Detection Solutions:\nPrioritizing Safety and Efficiency in the Oil and Gas Industry!',
    href: 'https://smecoilandgas.com/gas-detection-system',
    image: '/images/Gas-Watch-Panel-768x460.webp',
    width: 768,
    height: 460,
    scale: 'compact',
    spacer: 40,
  },
];

/* ----------------------------------------------------------------- stats */

export const STATS = [
  { label: 'Years', value: 25 },
  { label: 'Countries', value: 10 },
  { label: 'Employees', value: 500 },
  { label: 'Projects', value: 10000 },
];

/* ------------------------------------------------------------ who we are */

export const WHO_WE_ARE = {
  title: 'Who We Are',
  /* Content Master, /company/about/ answer block. The previous text claimed
     SMEC was "a complete EPC company" - which the Technical Master forbids
     unless that contractual responsibility is verified - and ended in a
     garbled clause inherited from WordPress. */
  body:
    'SMEC Oil & Gas Solutions LLC is positioned as a complete engineering and turnkey system-solution provider for defined project packages. The delivery model combines regional client engagement, project coordination, site execution and commissioning from the UAE with detailed engineering, automation, system integration, manufacturing, FAT, R&D and remote support from India.',
} as const;

/* -------------------------------------------------------- certifications */

export const CERTIFICATES = [
  {
    src: '/images/ISO-SMEC-Oil-and-Gas-Solutions-L.L.C-S-724x1024.png',
    alt: 'ISO 9001:2015 – SMEC Oil and Gas Solutions L.L.C S.P',
    width: 724,
    height: 1024,
  },
  {
    src: '/images/ISO-SMEC-Oil-and-Gas-Solutions-L.L.C-S.P-14001.png',
    alt: 'ISO 14001:2015 – SMEC Oil and Gas Solutions L.L.C S.P',
    width: 800,
    height: 1132,
  },
  {
    src: '/images/ISO-SMEC-Oil-and-Gas-Solutions-L.L.C-S.P-45001-724x1024.png',
    alt: 'ISO 45001:2018 – SMEC Oil and Gas Solutions L.L.C S.P',
    width: 724,
    height: 1024,
  },
  {
    src: '/images/ISO-SMEC-Oil-and-Gas-Solutions-L.L.C-S.P-50001-724x1024.png',
    alt: 'ISO 50001:2018 – SMEC Oil and Gas Solutions L.L.C S.P',
    width: 724,
    height: 1024,
  },
];

/**
 * Standard marks under the certificates — only the ISO standards the
 * certificates above evidence. The eleven accreditation marks that scrolled
 * here (NIELIT, ESSCI, CGSC, Make in India, NSDC, IECEx, IISC, FM Approved,
 * ESDM, MSME, QRO) are in none of the client's documents, and IECEx and FM
 * Approved read as hazardous-area approvals SMEC has never claimed. Each mark
 * is named: a logo with alt="" is one a screen reader cannot name.
 */
export const CERT_LOGOS = [
  { src: '/images/iso-9001-2015.png', alt: 'ISO 9001:2015' },
  { src: '/images/iso-14001-2015.png', alt: 'ISO 14001:2015' },
  { src: '/images/iso-45001.png', alt: 'ISO 45001' },
];

/* --------------------------------------------------------------- clients */

export type Logo = { src: string; alt: string; width: number; height: number };

export type EcosystemTab = {
  id: string;
  tab: string;
  title: string;
  body: string;
  groups: { label: string; logos: Logo[]; pending?: string }[];
};

/**
 * Clients, Registrations & Technology Ecosystem: the client's three tabs
 * (homepage document, images 8–10), in her words, carrying the marks she
 * supplied in Creatives/LOGOS on 25 October. That folder is the approved
 * set — the Developer Handover Brief rules out any client logo or OEM mark
 * she has not evidenced — so nothing outside it belongs here. Each mark is
 * named for what the artwork itself says.
 */
export const ECOSYSTEM: EcosystemTab[] = [
  {
    id: 'middle-east',
    tab: 'Middle East',
    title: 'Middle East — Clients & Approved Vendors',
    body: 'Supporting drilling contractors, energy operators and industrial projects across the Middle East through electrical, instrumentation, automation and system integration expertise.',
    groups: [
      {
        label: 'Selected Drilling Clients',
        logos: [
          { src: '/images/client-shelf-drilling.webp', alt: 'Shelf Drilling', width: 480, height: 235 },
          { src: '/images/client-ades.webp', alt: 'ADES Holding', width: 480, height: 217 },
        ],
      },
      {
        label: 'Approved Vendor Registrations',
        logos: [
          { src: '/images/registration-adnoc.webp', alt: 'ADNOC', width: 259, height: 402 },
          {
            src: '/images/registration-snoc.webp',
            alt: 'Sharjah National Oil Corporation (SNOC)',
            width: 480,
            height: 323,
          },
          { src: '/images/registration-taqa.webp', alt: 'TAQA', width: 480, height: 145 },
          {
            src: '/images/registration-dewa.webp',
            alt: 'Dubai Electricity & Water Authority (DEWA)',
            width: 372,
            height: 336,
          },
        ],
      },
    ],
  },
  {
    id: 'india',
    tab: 'India',
    title: 'India — Clients & Project Experience',
    body: 'Engineering and system integration experience across oil and gas, marine, industrial automation, infrastructure and heavy industries in India.',
    groups: [
      {
        label: 'Selected Clients',
        logos: [],
        // Her design's own empty state. No Indian client mark is approved yet.
        pending: 'Approved Indian client logos to be added from SMEC’s project reference portfolio.',
      },
    ],
  },
  {
    id: 'oem-technology',
    tab: 'OEM & Technology',
    title: 'OEM & Technology Ecosystem',
    body: 'Working with established electrical, automation and industrial technology platforms to support engineering, system integration and modernisation requirements.',
    groups: [
      {
        label: 'OEM & Technology Brands',
        logos: [
          { src: '/images/oem-schneider-electric.webp', alt: 'Schneider Electric', width: 480, height: 169 },
          { src: '/images/oem-siemens.webp', alt: 'Siemens', width: 480, height: 107 },
          { src: '/images/oem-abb.webp', alt: 'ABB', width: 480, height: 208 },
          { src: '/images/oem-emerson.webp', alt: 'Emerson', width: 480, height: 223 },
          { src: '/images/oem-phoenix-contact.webp', alt: 'Phoenix Contact', width: 480, height: 146 },
          { src: '/images/oem-deif.webp', alt: 'DEIF', width: 428, height: 251 },
        ],
      },
    ],
  },
];

/* ------------------------------------------------------- global presence */

/** Pin positions come straight from the site's inline map stylesheet. */
export const MAP_PINS = [
  { code: 'sg', name: 'SINGAPORE', bottom: '43%', left: '82%' },
  { code: 'jp', name: 'UAE', bottom: '58%', left: '64%' },
  { code: 'ad', name: 'ABU DHABI', bottom: '57%', left: '64.5%' },
  { code: 'ut', name: 'INDIA', bottom: '55%', left: '73%' },
  { code: 'sr', name: 'SRI LANKA', bottom: '44%', left: '75%' },
  { code: 'qa', name: 'QATAR', bottom: '62%', left: '63%' },
  { code: 'ba', name: 'BAHRAIN', bottom: '64%', left: '62%' },
  { code: 'om', name: 'OMAN', bottom: '55%', left: '65%' },
  { code: 'ku', name: 'KUWAIT', bottom: '65%', left: '62%' },
  { code: 'eg', name: 'EGYPT', bottom: '58%', left: '58%' },
  { code: 'ng', name: 'NIGERIA', bottom: '45%', left: '50%' },
  { code: 'ch', name: 'CHINA', bottom: '65%', left: '85%' },
];

export const MARQUEE_COUNTRIES = [
  'India',
  'UAE',
  'Qatar',
  'Egypt',
  'Kuwait',
  'Bahrain',
  'Singapore',
  'China',
  'Sri Lanka',
];

/* ------------------------------------------------------------- R&D focus */

export const RD_FOCUS = {
  image: '/images/SMECoilandhasbanner-3.webp',
  title: 'R&D FOCUS',
  body: 'Developing cutting-edge automation technologies to optimise oil and gas operations.',
} as const;

/* -------------------------------------------------- solutions & services */

export const SOLUTIONS = {
  title: 'SOLUTIONS & SERVICES',
  body: 'Over the years, SMEC has built robust expertise in\nproviding services tailored for upstream, midstream, and\ndownstream oil field operators.',
  videoId: 'kpJS9AnysBA',
  videoUrl: 'https://youtu.be/kpJS9AnysBA',
  poster: '/images/Corporate-Video.png',
} as const;

/* -------------------------------------------------------- sustainability */

export const SUSTAINABILITY = {
  title: 'PROMOTING SUSTAINABLE ENERGY AWARENESS',
  body: 'SMEC Automation’s Commitment to Innovative Energy Solutions.',
  image: '/images/SMEoilandgas-green-3.webp',
  width: 1200,
  height: 660,
} as const;

/* -------------------------------------------------------------- articles */

export type Article = {
  title: string;
  subtitle: string;
  href: string;
  image: string;
  alt: string;
};

export const ARTICLES: Article[] = [
  {
    title: 'Retrofit Solutions',
    subtitle: 'Extending the Life Cycle of Oil & Gas Infrastructure',
    href: 'https://smecoilandgas.com/retrofit-solutions',
    image: '/images/article-powering-the-future.png',
    alt: 'Retrofit Solutions',
  },
  {
    title: 'The Birth of India’s Offshore Energy Journey!',
    subtitle: 'SMEC Automation Pvt Ltd',
    href: 'https://smecoilandgas.com/the-birth-of-indias-offshore-energy-journey',
    image: '/images/article-wellhead-data-collection.png',
    alt: 'The Birth of India’s Offshore Energy Journey',
  },
  {
    title: 'Unlocking the Future:',
    subtitle: 'Digital Twin Technology',
    href: 'https://smecoilandgas.com/unlocking-the-future-digital-twin-technology-the-future-is-now',
    image: '/images/Dwin-technology.webp',
    alt: 'Digital Twin Technology',
  },
  {
    title: 'Navigating Automation Architecture :',
    subtitle: 'SMEC Automation Pvt Ltd',
    href: 'https://smecoilandgas.com/navigating-automation-architecture',
    image: '/images/article-automation-architecture.png',
    alt: 'Navigating Automation Architecture',
  },
  {
    title: 'Flare Ignition Systems',
    subtitle: 'The Guardians of Industrial Safety and Environmental Compliance',
    href: 'https://smecoilandgas.com/flare-ignition-systems',
    image: '/images/article-fueling-the-future.png',
    alt: 'Flare Ignition Systems',
  },
  {
    title: 'The Pipeline That Changed India!',
    subtitle: 'Naharkatiya–Noonmati–Barauni (1962)',
    href: 'https://smecoilandgas.com/the-pipeline-that-changed-india-naharkatiya-noonmati-barauni-1962',
    image: '/images/Naharkatiya-Noonmati-Barauni-1962.webp',
    alt: 'Naharkatiya–Noonmati–Barauni (1962)',
  },
  {
    title: '[SMEC – The Solution Hub #3]',
    subtitle: 'Engineering Resilience Starts Inside the Panel.',
    href: 'https://smecoilandgas.com/smec-the-solution-hub-3-engineering-resilience-starts-inside-the-panel',
    image: '/images/Engineering-Resilience-Starts-Inside-the-Panel.webp',
    alt: 'Engineering Resilience Starts Inside the Panel',
  },
  {
    title: 'Digital Oilfields',
    subtitle: 'How Digital Oilfields are Transforming Exploration and Production in Oil & Gas',
    href: 'https://smecoilandgas.com/fueling-the-future',
    image: '/images/article-digital-oilfields.png',
    alt: 'Digital Oilfields',
  },
  {
    title: 'From Shores to Sea Legs – How ONGC Built India’s Rig Frontier',
    subtitle: 'Shores to Sea Legs ONGC',
    href: 'https://smecoilandgas.com/from-shores-to-sea-legs-how-ongc-built-india',
    image: '/images/From-Shores-to-Sea-Legs-How-ONGC-Built-Indias-Rig-Frontier.webp',
    alt: 'From Shores to Sea Legs – How ONGC Built India’s Rig Frontier',
  },
  {
    title:
      'A technical deep-dive into the critical systems that define reliability in Oil & Gas operations.',
    subtitle: '',
    href: 'https://smecoilandgas.com/a-technical-deep-dive-into-the-critical-systems-that-define-reliability-in-oil-gas-operations',
    image: '/images/From-Shores-to-Sea-Legs-How-ONGC-Built-Indias-Rig-Frontier.webp',
    alt: 'A technical deep-dive into the critical systems that define reliability in Oil & Gas operations',
  },
  {
    title: 'Digboi: The Forgotten Flame That Lit India’s Oil & Gas Story!',
    subtitle: 'SMEC Automation Pvt Ltd',
    href: 'https://smecoilandgas.com/digboi-the-forgotten-flame-that-lit-indias-oil-gas-story',
    image: '/images/article-digital-twin.png',
    alt: 'Digboi: The Forgotten Flame That Lit India’s Oil & Gas Story',
  },
  {
    title: 'From Seepages to Sensors',
    subtitle: 'The Complete Timeline of Oil & Gas ‘Firsts’ (Global + India).',
    href: 'https://smecoilandgas.com/from-seepages-to-sensors-the-complete-timeline-of-oil-gas-firsts-global-india',
    image: '/images/Seepages-to-Sensors.webp',
    alt: 'From Seepages to Sensors',
  },
  {
    title: 'How the Middle East Is Engineering Energy 2030–2050.',
    subtitle: 'SMEC Automation | #EnergyTransition #OilAndGas #ReliabilityEngineering',
    href: 'https://smecoilandgas.com/how-the-middle-east-is-engineering-energy',
    image: '/images/Middle-East-Is-Engineering-Energy.webp',
    alt: 'How the Middle East Is Engineering Energy',
  },
  {
    title: 'SMEC – VARD',
    subtitle: "India's Turnkey Partner for Next-Generation Marine Electrical Integration",
    href: 'https://www.smec.in/electric-propulsion-sov-cochin-shipyard-smec-vard',
    image: '/images/SMEC-VARD.webp',
    alt: 'SMEC – VARD',
  },
  {
    title: 'SMEC at ADIPEC 2024',
    subtitle: 'A Week of Innovation, Insight & Industry Collaboration!',
    href: 'https://smecoilandgas.com/smec-at-adipec-2024',
    image: '/images/adipec.png',
    alt: 'SMEC at ADIPEC 2024',
  },
  {
    title: 'Optimizing Wellhead Data Collection',
    subtitle: 'Leveraging Advanced Software Solutions for Enhanced Oil & Gas Operations',
    href: 'https://smecoilandgas.com/optimizing-wellhead-data-collection',
    image: '/images/article-critical-systems-reliability.png',
    alt: 'Optimizing Wellhead Data Collection',
  },
  {
    title: 'Powering the Future of Oil & Gas with Automation',
    subtitle: '',
    href: 'https://smecoilandgas.com/powering-the-future-of-oil-gas-with-automation',
    image: '/images/article-flare-ignition-systems.png',
    alt: 'Powering the Future of Oil & Gas with Automation',
  },
];

/* ---------------------------------------------------------------- footer */

/*
 * The footer follows her design in the homepage document (image 32), with
 * the social links grouped as her image 36 recommends. Its link columns are
 * in lib/navigation.ts, beside the header they mirror.
 */

/** Her footer's description, word for word. */
export const FOOTER_DESCRIPTION =
  'Electrical, instrumentation, industrial automation, drilling control and digital engineering solutions for onshore and offshore energy assets. UAE-based project coordination supported by engineering, system integration and manufacturing capabilities in India.';

export const FOOTER_ADDRESS = [
  'MIDDLE EAST & GLOBAL SUPPORT',
  'SMEC Oil & Gas Solutions LLC SPC',
  'Store-104, M34, Mussafah',
  'Abu Dhabi, United Arab Emirates',
];

export const FOOTER_CONTACT = [
  { label: 'Landline:', value: '+971 2 546 0027', href: 'tel:+97125460027' },
  { label: 'Mobile:', value: '+971 50 249 1903', href: 'tel:+971502491903' },
  { label: 'Email:', value: 'info@smecong.com', href: 'mailto:info@smecong.com' },
];

export type FooterLocation = {
  region: string;
  entity: string;
  /** What the office does, where her design says. */
  note?: string;
  address: string[];
  rows: { label: string; value: string; href: string; external?: boolean }[];
};

/**
 * "Our Engineering Locations", the two blocks at the foot of her design.
 *
 * The UAE block keeps the legal name and the Mussafah address her design
 * gives. The live site's "LLC, Hamdan Street" is the open CON-01 question;
 * the audit records her design as the reading to use until SMEC answers.
 *
 * Her India block reads "Official address, phone and email to be added". The
 * phone and email are the ones her top bar and RFQ table give for SMEC
 * Automation; the street address is still to come, so the block stops at the
 * city, and the placeholder line is not published.
 */
export const FOOTER_LOCATIONS: FooterLocation[] = [
  {
    region: 'UAE — Abu Dhabi',
    entity: FOOTER_ADDRESS[1],
    address: [`${FOOTER_ADDRESS[2]}, ${FOOTER_ADDRESS[3]}`],
    rows: [
      ...FOOTER_CONTACT,
      { label: 'WhatsApp:', value: CONTACT.phone, href: CONTACT.whatsapp, external: true },
    ],
  },
  {
    region: 'India — Kochi',
    entity: CONTACT_INDIA.entity,
    note: 'Engineering, industrial automation, system integration, panel manufacturing and technical support',
    address: ['Kochi, Kerala, India'],
    rows: [
      { label: 'Phone:', value: CONTACT_INDIA.phone, href: CONTACT_INDIA.phoneHref },
      { label: 'Email:', value: CONTACT_INDIA.email, href: CONTACT_INDIA.emailHref },
    ],
  },
];

/**
 * SMEC Group as her footer lists it: six businesses, each with her note.
 *
 * The links are the group sites the old footer already carried. SMEC
 * Institute of Management had none there, so it is named without a link
 * until SMEC supplies one. "R & D" (smecrtd.com) and "Industry"
 * (smec4industry.com), which the old footer added, are not in her list. Group
 * links stay at all because that is the recorded default for CON-08 — keep
 * them, drop anything pointing at the old website — until SMEC says whether
 * "nothing linked to the old websites" reaches this far.
 */
export const SMEC_GROUP: { name: string; note: string; href?: string }[] = [
  {
    name: 'SMEC Automation',
    note: 'Engineering & Automation — India',
    href: 'https://smecautomation.com/',
  },
  { name: 'SMEC Marine Solutions', note: 'Marine Engineering — UAE', href: 'https://smecmarine.com/' },
  { name: 'SMEC Offshore', note: 'Offshore Engineering', href: 'https://smecoffshore.com/' },
  {
    name: 'SMEC Technologies',
    note: 'Emerging Technologies & Training',
    href: 'https://smectechnologies.com/',
  },
  { name: 'SMEC Institute of Management', note: 'Management & Professional Education' },
  {
    name: 'SMECLabs',
    note: 'Technical Education & Skill Development',
    href: 'https://smeclabs.com/',
  },
];

/** `label` keys the icon (components/Icons.tsx); `name` is what a visitor reads. */
export const SOCIALS = [
  { label: 'Linkedin', name: 'LinkedIn', href: 'https://www.linkedin.com/company/smecin/' },
  {
    label: 'Facebook',
    name: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=100094543997911',
  },
  { label: 'Instagram', name: 'Instagram', href: 'https://www.instagram.com/smec_automation/' },
  { label: 'Youtube', name: 'YouTube', href: 'https://www.youtube.com/@SMECDeepFix/videos' },
] as const;

export type SocialGroup = {
  /** The two-letter mark her design sets before each group's name. */
  code: string;
  region: string;
  entity: string;
  links: readonly { label: string; name: string; href: string }[];
};

/**
 * "Connect With SMEC": two labelled groups rather than one unlabelled row,
 * as her image 36 recommends. The four accounts above are SMEC Automation's,
 * so they are the India & SMEC Group set. The Middle East group is SMEC Oil &
 * Gas's own LinkedIn, whose address has not been supplied (CON-06); the group
 * appears once it is added here.
 */
export const SOCIAL_GROUPS: SocialGroup[] = [
  { code: 'AE', region: 'Middle East', entity: CONTACT.entity, links: [] },
  { code: 'IN', region: 'India & SMEC Group', entity: CONTACT_INDIA.entity, links: SOCIALS },
];

export const COPYRIGHT =
  '“SMEC” is a registered trademark of SMEC Automation Pvt. Ltd. © 2026 SMEC All rights reserved';

export const LEGAL_LINKS = [
  { label: 'Terms & Conditions', href: 'https://smecoilandgas.com/privacy-policy' },
  { label: 'Privacy Notice', href: 'https://smecoilandgas.com/privacy-policy' },
];
