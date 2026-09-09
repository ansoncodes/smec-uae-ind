/**
 * Content extracted verbatim from https://smecoilandgas.com/
 * Copy is SEO-critical - do not paraphrase when editing.
 */

export const SITE = {
  url: 'https://smecoilandgas.com',
  name: 'SMEC Oil & Gas',
  title: 'Best SMEC OIL AND GAS Company in India, GCC Countries',
  description: 'Best SMEC OIL AND GAS Company in India, GCC Countries with Automation',
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

/** Extra entries that only appear in the mobile off-canvas menu. */
export const MOBILE_EXTRA_NAV: NavItem[] = [
  { label: 'Sustainability', href: 'https://smecoilandgas.com/sustainability' },
  { label: 'Email : sales@smecong.com', href: 'mailto:sales@smecong.com' },
  { label: 'Call US : +91 85888 70618', href: 'tel:+918588870618' },
];

export const CONTACT = {
  email: 'info@smecong.com',
  emailHref: 'mailto:info@smecong.com',
  phone: '+971 54 549 6420',
  phoneHref: 'tel:+971545496420',
  whatsapp: 'https://wa.me/971545496420',
} as const;

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
    src: '/images/749986-middle-1.png',
    width: 465,
    height: 270,
    alt: 'ADNOC In-Country Value Certified',
  },
} as const;

/* -------------------------------------------------------------- partners */

export const PARTNERS = [
  {
    src: '/images/taqa_small_logo-rru8ulgnlu8td7wvqij424kredlu1nqzy7gjyuthnk.webp',
    alt: 'TAQA',
    width: 150,
    height: 80,
  },
  {
    src: '/images/SNOC_Logo_Horizontal-rru8zeexxffn4rixn6740ffedj1np17caty87jpx7c.png',
    alt: 'Sharjah National Oil Corporation',
    width: 100,
    height: 60,
  },
  {
    src: '/images/Logo_of_DEWA-rru8yaxrs63eb9cg5yeuh5wkel3dsjpf2v6u8l9txq.png',
    alt: 'Dubai Electricity & Water Authority',
    width: 250,
    height: 59,
  },
  {
    src: '/images/ADNOC_1200X630-1664370288755-rru90xvfqkxhqgp3or9ge0xrr0c103xrtlzjl3etn0.webp',
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
  body: 'SMEC is a complete EPC company delivering turnkey solutions. Design, Estimation, Build, Installation and Commissioning all done under one roof. A team of professionals with superior skill is the key asset of SMEC, teams with system integration of the leading OEMs in the  bulbs our strength.',
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

/** Accreditation / certification body logos scrolling under the certificates. */
export const CERT_LOGOS = [
  '/images/1.png',
  '/images/2-1.png',
  '/images/3-1.png',
  '/images/4-1.png',
  '/images/5-1.png',
  '/images/6-1.png',
  '/images/7-1.png',
  '/images/8-1.png',
  '/images/9-1.png',
  '/images/10.png',
  '/images/12.png',
  '/images/ISO-2001-2015.png',
  '/images/ISO-14001.png',
  '/images/ISO-40001.png',
];

/* --------------------------------------------------------------- clients */

export const CLIENT_LOGOS = [
  '/images/6.png',
  '/images/7.png',
  '/images/8.png',
  '/images/9.png',
  '/images/1-1.png',
  '/images/2-2.png',
  '/images/3-2.png',
  '/images/4-2.png',
  '/images/5-2.png',
  '/images/ades-energy4099-1.png',
  '/images/2.png',
  '/images/3.png',
  '/images/4.png',
  '/images/5.png',
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
  'Baharin',
  'Singapore',
  'China',
  'Srilanka',
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
    image: '/images/fourth-blog.png',
    alt: 'Retrofit Solutions',
  },
  {
    title: 'The Birth of India’s Offshore Energy Journey!',
    subtitle: 'SMEC Automation Pvt Ltd',
    href: 'https://smecoilandgas.com/the-birth-of-indias-offshore-energy-journey',
    image: '/images/11112.png',
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
    image: '/images/1111.png',
    alt: 'Navigating Automation Architecture',
  },
  {
    title: 'Flare Ignition Systems',
    subtitle: 'The Guardians of Industrial Safety and Environmental Compliance',
    href: 'https://smecoilandgas.com/flare-ignition-systems',
    image: '/images/fifth-blog.png',
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
    image: '/images/1-2.png',
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
    image: '/images/11113.png',
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
    image: '/images/second-blog.png',
    alt: 'Optimizing Wellhead Data Collection',
  },
  {
    title: 'Powering the Future of Oil & Gas with Automation',
    subtitle: '',
    href: 'https://smecoilandgas.com/powering-the-future-of-oil-gas-with-automation',
    image: '/images/thrid-blog.png',
    alt: 'Powering the Future of Oil & Gas with Automation',
  },
];

/* ---------------------------------------------------------------- footer */

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

export const FOOTER_COMPANY: NavItem[] = [
  { label: 'Marine', href: 'https://smecmarine.com/' },
  { label: 'R & D', href: 'https://smecrtd.com/' },
  { label: 'Automation', href: 'https://smecautomation.com/' },
  { label: 'Industry', href: 'https://smec4industry.com/' },
  { label: 'Software Solutions', href: 'https://smectechnologies.com/' },
  { label: 'Offshore', href: 'https://smecoffshore.com/' },
  { label: 'Training & Development', href: 'https://smeclabs.com/' },
];

export const FOOTER_SOLUTIONS_A: NavItem[] = [
  { label: 'Power Houses', href: 'https://smecoilandgas.com/power-house' },
  { label: 'Drill Monitor System', href: 'https://smecoilandgas.com/drill-monitor' },
  { label: 'BOP Control System', href: 'https://smecoilandgas.com/bop-control-system' },
  { label: 'Gas Detection System', href: 'https://smecoilandgas.com/gas-detection-system' },
  { label: 'Jacking Control System', href: 'https://smecoilandgas.com/jacking-control-system' },
  { label: 'RPD System', href: 'https://smecoilandgas.com/rpd-system' },
];

export const FOOTER_SOLUTIONS_B: NavItem[] = [
  { label: 'Load Monitoring System', href: 'https://smecoilandgas.com/load-monitoring-system' },
  { label: 'PAGA System', href: 'https://smecoilandgas.com/paga-system' },
  { label: 'Battery Charger', href: 'https://smecoilandgas.com/battery-charger' },
  {
    label: 'Advanced Perimeter Security System',
    href: 'https://smecoilandgas.com/advanced-perimeter-security-systems',
  },
  {
    label: 'Flare Boom Ignition System',
    href: 'https://smecoilandgas.com/flare-boom-ignition-system',
  },
];

export const SOCIALS = [
  { label: 'Linkedin', href: 'https://www.linkedin.com/company/smecin/' },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100094543997911' },
  { label: 'Instagram', href: 'https://www.instagram.com/smec_automation/' },
  { label: 'Youtube', href: 'https://www.youtube.com/@SMECDeepFix/videos' },
] as const;

export const COPYRIGHT =
  '“SMEC” is a registered trademark of SMEC Automation Pvt. Ltd. © 2026 SMEC All rights reserved';

export const LEGAL_LINKS = [
  { label: 'Terms & Conditions', href: 'https://smecoilandgas.com/privacy-policy' },
  { label: 'Privacy Notice', href: 'https://smecoilandgas.com/privacy-policy' },
];
