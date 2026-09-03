/**
 * Content extracted from the saved reference page
 * (reference/Best SMEC OIL AND GAS Company in India, GCC Countries.html).
 * Keeping it in one place lets the section components stay purely presentational.
 */

const SITE = "https://smecoilandgas.com";

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const navItems: NavItem[] = [
  { label: "About Us", href: `${SITE}/about-us` },
  {
    label: "Products",
    href: `${SITE}/#`,
    children: [
      {
        label: "Power House",
        href: `${SITE}/power-house`,
        children: [
          { label: "VFD Houses", href: `${SITE}/vfd-houses` },
          { label: "SCR Houses", href: `${SITE}/scr-houses` },
        ],
      },
      { label: "Drill Monitoring System – DMS 3000", href: `${SITE}/drill-monitor` },
      { label: "BOP Control System", href: `${SITE}/bop-control-system` },
      { label: "Gas Watch Panel", href: `${SITE}/gas-detection-system` },
      { label: "Jacking Control System", href: `${SITE}/jacking-control-system` },
      { label: "RPD System", href: `${SITE}/rpd-system` },
      { label: "Load Monitoring System", href: `${SITE}/load-monitoring-system` },
      { label: "PAGA System – Public Adress General Alarm", href: `${SITE}/paga-system` },
      { label: "Battery Charger", href: `${SITE}/battery-charger` },
      {
        label: "CCTV Advanced Perimeter Security Systems",
        href: `${SITE}/advanced-perimeter-security-systems`,
      },
      {
        label: "Flare Boom Ignition | Pilot Ignition System",
        href: `${SITE}/flare-boom-ignition-system`,
      },
      {
        label: "Integrated Drilling Control System",
        href: `${SITE}/integrated-drilling-control-system`,
      },
    ],
  },
  { label: "Solutions and Services", href: `${SITE}/solutions-and-services` },
  { label: "Research & Development", href: `${SITE}/research-and-developement` },
  { label: "Careers", href: `${SITE}/careers` },
  { label: "Contact Us", href: `${SITE}/contact-us` },
];

export const contact = {
  email: "info@smecong.com",
  phone: "+971 54 549 6420",
  phoneHref: "tel:+971545496420",
  whatsapp: "https://wa.me/971545496420",
};

export const hero = {
  title: "SMEC OIL AND GAS",
  /* Sentence case; the live site sets this in caps, which at 23px in the hero
     read as shouting. Caps are kept for eyebrows, buttons and metadata only. */
  subtitle: "Turnkey solutions for the oil and gas industry",
  lines: [
    "Delivering solutions for onshore and offshore Rigs",
    "We understand that your needs are unique and we assure you customized solutions",
  ],
  ctaLabel: "Contact Us",
  ctaHref: `${SITE}/contact-us`,
};

/* The source marks are low-resolution Elementor thumbnails, so each one is
   given an intrinsic size and an optical cap height rather than being scaled
   up: wide wordmarks sit shorter than square marks so the row reads as one
   set instead of four different sizes. `cap` never exceeds the asset's own
   height, which keeps every mark crisp. */
export const partners = [
  {
    src: "/images/partners/taqa_small_logo-rru8ulgnlu8td7wvqij424kredlu1nqzy7gjyuthnk.webp",
    alt: "TAQA",
    width: 150,
    height: 80,
    cap: 38,
  },
  {
    src: "/images/partners/SNOC_Logo_Horizontal-rru8zeexxffn4rixn6740ffedj1np17caty87jpx7c.png",
    alt: "SNOC",
    width: 100,
    height: 60,
    cap: 40,
  },
  {
    src: "/images/partners/Logo_of_DEWA-rru8yaxrs63eb9cg5yeuh5wkel3dsjpf2v6u8l9txq.png",
    alt: "DEWA",
    width: 250,
    height: 59,
    cap: 30,
  },
];

export type Product = {
  /** Route segment under /products. */
  slug: string;
  image: string;
  title: string;
  tagline: string;
  text: string;
  /** The matching page on the live site, linked from the detail page. */
  sourceHref: string;
};

/** Internal detail route for a product. */
export const productHref = (slug: string) => `/products/${slug}`;

export const productsIntro =
  "SMEC Oil & Gas provides comprehensive engineering, procurement, construction, and maintenance solutions for the oil and gas industry. We focus on delivering reliable, cost-effective, and innovative services while maintaining the highest standards of safety, quality, efficiency, sustainability, and customer satisfaction across every project.";

export const products: Product[] = [
  {
    slug: "power-house",
    image: "/images/products/Power-House-SMEC.png",
    title: "Power Houses",
    tagline: "PCR House | SCR House | VFD House",
    text: "Tailored Solutions for Optimal Performance with PCR, SCR, and VFD Technologies.",
    sourceHref: `${SITE}/power-house`,
  },
  {
    slug: "advanced-perimeter-security-systems",
    image: "/images/products/Advanced-Perimeter-Security-System.png",
    title: "Advanced Perimeter Security System",
    tagline: "Secure Your Boundaries with SMEC's Advanced Perimeter Security System!",
    text: "Custom-Built Surveillance Systems for Extreme Environments – Tailored, Tested, and Trained by SMEC Experts",
    sourceHref: `${SITE}/advanced-perimeter-security-systems`,
  },
  {
    slug: "drill-monitor",
    image: "/images/products/Drill-Monitor-System-1.png",
    title: "Drill Monitor System",
    tagline: "Stay Alert, Stay Safe: Gas Watch Panel by SMEC",
    text: "Revolutionize Your Drilling Operations with SMEC’s Cutting-Edge Gas Detection Solutions: Prioritizing Safety and Efficiency in the Oil and Gas Industry!",
    sourceHref: `${SITE}/drill-monitor`,
  },
  {
    slug: "integrated-drilling-control-system",
    image: "/images/products/Integrated-Drilling-Control-System-768x460.png",
    title: "Integrated Drilling Control System",
    tagline: "Elevate Your Drilling: Precision Meets Innovation with SMEC’s Integrated Control System!",
    text: "Maximize Drilling Efficiency with the SMEC Integrated Drilling Control System: Your Command Center for High-Availability Rig Operations!",
    sourceHref: `${SITE}/integrated-drilling-control-system`,
  },
  {
    slug: "jacking-control-system",
    image: "/images/products/RPD-System-Jacking-Control-System-768x460.png",
    title: "RPD System Jacking Control System",
    tagline: "Precision Control for Unmatched Performance!",
    text: "Optimize Jack-Up Rig Performance with RPD System: Ensure Precision in Rack Phase Differential Monitoring to Prevent Over-Stresses!",
    sourceHref: `${SITE}/jacking-control-system`,
  },
  {
    slug: "flare-boom-ignition-system",
    image: "/images/products/Flare-Boom-Pilot-Ignition-System-768x460.png",
    title: "Flare Boom Pilot Ignition System",
    tagline: "Ignite Efficiency with SMEC's Flare Boom Pilot Ignition System!",
    text: "Upgrade Your Performance with SMEC’s Reliable Ignition Systems – Tested, Fired, and Ready for Long-Lasting Results! New, Retrofit, or Replacement Flare Boom Pilot Ignitions Available",
    sourceHref: `${SITE}/flare-boom-ignition-system`,
  },
  {
    slug: "bop-control-system",
    image: "/images/products/BOP-Control-System-768x460.png",
    title: "BOP Control System",
    tagline: "Protect Your Rig, Prevent Well Kicks & Explosions!",
    text: "Protect Your Oil Rig with SMEC’s Advanced BOP Control System – Prevent Well Kicks & Explosions on Land, Platforms, & Subsea!",
    sourceHref: `${SITE}/bop-control-system`,
  },
  {
    slug: "gas-detection-system",
    image: "/images/products/Gas-Watch-Panel-768x460.webp",
    title: "Gas Watch Panel",
    tagline: "Stay Alert, Stay Safe: Gas Watch Panel by SMEC",
    text: "Revolutionize Your Drilling Operations with SMEC’s Cutting-Edge Gas Detection Solutions: Prioritizing Safety and Efficiency in the Oil and Gas Industry!",
    sourceHref: `${SITE}/gas-detection-system`,
  },
];

export const productBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const stats = [
  { title: "Years", value: 25, suffix: "+" },
  { title: "Countries", value: 10, suffix: "+" },
  { title: "Employees", value: 500, suffix: "+" },
  { title: "Projects", value: 10000, suffix: "+" },
];

export const whoWeAre = {
  heading: "Who We Are",
  body: "SMEC is a complete EPC company delivering turnkey solutions. Design, Estimation, Build, Installation and Commissioning all done under one roof. A team of professionals with superior skill is the key asset of SMEC, teams with system integration of the leading OEMs in the  bulbs our strength.",
};

export const certifications = [
  {
    src: "/images/certifications/ISO-SMEC-Oil-and-Gas-Solutions-L.L.C-S-724x1024.png",
    alt: "ISO certificate – SMEC Oil and Gas Solutions L.L.C S.P 9001",
    width: 724,
    height: 1024,
  },
  {
    src: "/images/certifications/ISO-SMEC-Oil-and-Gas-Solutions-L.L.C-S.P-14001.png",
    alt: "ISO 14001 certificate – SMEC Oil and Gas Solutions L.L.C S.P",
    width: 800,
    height: 1132,
  },
  {
    src: "/images/certifications/ISO-SMEC-Oil-and-Gas-Solutions-L.L.C-S.P-45001-724x1024.png",
    alt: "ISO 45001 certificate – SMEC Oil and Gas Solutions L.L.C S.P",
    width: 724,
    height: 1024,
  },
  {
    src: "/images/certifications/ISO-SMEC-Oil-and-Gas-Solutions-L.L.C-S.P-50001-724x1024.png",
    alt: "ISO 50001 certificate – SMEC Oil and Gas Solutions L.L.C S.P",
    width: 724,
    height: 1024,
  },
];

export const clients = [
  "ades-energy4099-1.png",
  "2.png",
  "3.png",
  "4.png",
  "5.png",
  "6.png",
  "7.png",
  "8.png",
  "9.png",
  "1-1.png",
  "2-2.png",
  "3-2.png",
  "4-2.png",
  "5-2.png",
].map((f, i) => ({ src: `/images/clients/${f}`, alt: `Client logo ${i + 1}` }));

export type Entity = {
  location: string;
  name: string;
  role: string;
  points: string[];
  /** Crop centre for the dotted world map inset, from the pin coordinates. */
  map: { x: string; y: string };
  address?: string[];
  link: { label: string; href: string; external?: boolean };
  /** The contracting entity — carries the primary card treatment. */
  primary?: boolean;
};

/**
 * The two operating entities. Abu Dhabi is the entity clients contract with
 * and leads the section; the India hub is the engineering and manufacturing
 * capability behind every delivery. Copy follows the reference prototype's
 * "Two locations. One engineering standard." block.
 */
export const entities = {
  eyebrow: "UAE & India",
  heading: "Two locations. One engineering standard.",
  body: "SMEC Oil & Gas Solutions LLC SPC in Abu Dhabi holds the client relationship and delivers across the Middle East, backed by the group's engineering and manufacturing hub in India.",
  items: [
    {
      location: "Abu Dhabi, UAE",
      name: "SMEC Oil & Gas Solutions LLC SPC",
      role: "Headquarters — regional delivery & client engagement",
      map: { x: "64.5%", y: "43%" },
      points: [
        "Client relationships & project delivery",
        "On-site engineering & commissioning support",
        "Middle East project management",
        "Site visits & technical consultations",
      ],
      address: ["Store-104, M34, Mussafah", "Abu Dhabi, United Arab Emirates"],
      link: { label: "Contact the Abu Dhabi team", href: `${SITE}/contact-us` },
      primary: true,
    },
    {
      location: "Kochi, India",
      name: "SMEC Automation Pvt. Ltd.",
      role: "Engineering & manufacturing hub",
      map: { x: "73%", y: "45%" },
      points: [
        "Automation, electrical & instrumentation engineering",
        "Panel manufacturing & factory acceptance testing",
        "Project execution & documentation",
        "Engineering bench depth behind every delivery",
      ],
      link: {
        label: "Explore the engineering hub",
        href: "https://smecautomation.com/",
        external: true,
      },
    },
  ] as Entity[],
  ctas: [
    { label: "Talk to Our Global Team", href: `${SITE}/contact-us`, primary: true },
    {
      label: "Explore the Engineering Hub",
      href: "https://smecautomation.com/",
      primary: false,
      external: true,
    },
  ],
};

export type MapPin = {
  code: string;
  label: string;
  bottom: string;
  left: string;
  /** Set only on the two home locations; every other pin is a served market. */
  role?: string;
};

/** Pin coordinates copied verbatim from the reference's inline `.map-list` CSS. */
export const mapPins: MapPin[] = [
  { code: "sg", label: "SINGAPORE", bottom: "43%", left: "82%" },
  { code: "jp", label: "UAE", bottom: "58%", left: "64%", role: "Headquarters" },
  { code: "ad", label: "ABU DHABI", bottom: "57%", left: "64.5%", role: "Registered office" },
  { code: "ut", label: "INDIA", bottom: "55%", left: "73%", role: "Engineering hub" },
  { code: "sr", label: "SRI LANKA", bottom: "44%", left: "75%" },
  { code: "qa", label: "QATAR", bottom: "62%", left: "63%" },
  { code: "ba", label: "BAHRAIN", bottom: "64%", left: "62%" },
  { code: "om", label: "OMAN", bottom: "55%", left: "65%" },
  { code: "ku", label: "KUWAIT", bottom: "65%", left: "62%" },
  { code: "eg", label: "EGYPT", bottom: "58%", left: "58%" },
  { code: "ng", label: "NIGERIA", bottom: "45%", left: "50%" },
  { code: "ch", label: "CHINA", bottom: "65%", left: "85%" },
];

export const marqueeCountries = [
  "India",
  "UAE",
  "Qatar",
  "Egypt",
  "Kuwait",
  "Baharin",
  "Singapore",
  "China",
  "Srilanka",
];

export const rdFocus = {
  heading: "R&D Focus",
  body: "Developing cutting-edge automation technologies to optimise oil and gas operations.",
  /* NOT FROM THE LIVE SITE. These three focus areas were supplied during design
     review to give the section substance; they are claims about what SMEC
     researches and need sign-off before this goes public. Delete the array to
     drop the list entirely — the section renders without it. */
  areas: ["Process Optimization", "Energy Efficiency", "Digital Engineering"],
};

export const solutions = {
  heading: "Solutions & Services",
  lines: [
    "Over the years, SMEC has built robust expertise in",
    "providing services tailored for upstream, midstream, and",
    "downstream oil field operators.",
  ],
  youtubeId: "kpJS9AnysBA",
  poster: {
    src: "/images/misc/Corporate-Video.png",
    alt: "SMEC Automation corporate video",
    width: 1160,
    height: 650,
  },
};

export const sustainability = {
  heading: "Promoting Sustainable Energy Awareness",
  body: "SMEC Automation’s Commitment to Innovative Energy Solutions.",
  image: "/images/misc/SMEoilandgas-green-3.webp",
};

export type Article = {
  /** Route segment under /articles. */
  slug: string;
  image: string;
  title: string;
  text: string;
  /** The original post, linked from the foot of the detail page. */
  sourceHref: string;
};

/** Internal detail route for an article. */
export const articleHref = (slug: string) => `/articles/${slug}`;

export const articles: Article[] = [
  {
    slug: "smec-vard",
    image: "/images/articles/SMEC-VARD.webp",
    title: "SMEC – VARD",
    text: "India's Turnkey Partner for Next-Generation Marine Electrical Integration",
    sourceHref: "https://www.smec.in/electric-propulsion-sov-cochin-shipyard-smec-vard",
  },
  {
    slug: "how-the-middle-east-is-engineering-energy",
    image: "/images/articles/Middle-East-Is-Engineering-Energy.webp",
    title: "How the Middle East Is Engineering Energy 2030–2050.",
    text: "SMEC Automation | #EnergyTransition #OilAndGas #ReliabilityEngineering",
    sourceHref: `${SITE}/how-the-middle-east-is-engineering-energy`,
  },
  {
    slug: "from-shores-to-sea-legs-how-ongc-built-india",
    image: "/images/articles/From-Shores-to-Sea-Legs-ONGC-Rig-Frontier.webp",
    title: "From Shores to Sea Legs – How ONGC Built India’s Rig Frontier",
    text: "Shores to Sea Legs ONGC",
    sourceHref: `${SITE}/from-shores-to-sea-legs-how-ongc-built-india`,
  },
  {
    slug: "a-technical-deep-dive-into-the-critical-systems-that-define-reliability-in-oil-gas-operations",
    image: "/images/articles/From-Shores-to-Sea-Legs-How-ONGC-Built-Indias-Rig-Frontier.webp",
    title:
      "A technical deep-dive into the critical systems that define reliability in Oil & Gas operations.",
    text: "",
    sourceHref: `${SITE}/a-technical-deep-dive-into-the-critical-systems-that-define-reliability-in-oil-gas-operations`,
  },
  {
    slug: "from-seepages-to-sensors-the-complete-timeline-of-oil-gas-firsts-global-india",
    image: "/images/articles/Seepages-to-Sensors.webp",
    title: "From Seepages to Sensors",
    text: "The Complete Timeline of Oil & Gas ‘Firsts’ (Global + India).",
    sourceHref: `${SITE}/from-seepages-to-sensors-the-complete-timeline-of-oil-gas-firsts-global-india`,
  },
  {
    slug: "fueling-the-future",
    image: "/images/articles/1-2.png",
    title: "Digital Oilfields",
    text: "How Digital Oilfields are Transforming Exploration and Production in Oil & Gas",
    sourceHref: `${SITE}/fueling-the-future`,
  },
  {
    slug: "the-pipeline-that-changed-india-naharkatiya-noonmati-barauni-1962",
    image: "/images/articles/Naharkatiya-Noonmati-Barauni-1962.webp",
    title: "The Pipeline That Changed India!",
    text: "Naharkatiya–Noonmati–Barauni (1962)",
    sourceHref: `${SITE}/the-pipeline-that-changed-india-naharkatiya-noonmati-barauni-1962`,
  },
  {
    slug: "digboi-the-forgotten-flame-that-lit-indias-oil-gas-story",
    image: "/images/articles/11113.png",
    title: "Digboi: The Forgotten Flame That Lit India’s Oil & Gas Story!",
    text: "SMEC Automation Pvt Ltd",
    sourceHref: `${SITE}/digboi-the-forgotten-flame-that-lit-indias-oil-gas-story`,
  },
  {
    slug: "the-birth-of-indias-offshore-energy-journey",
    image: "/images/articles/11112.png",
    title: "The Birth of India’s Offshore Energy Journey!",
    text: "SMEC Automation Pvt Ltd",
    sourceHref: `${SITE}/the-birth-of-indias-offshore-energy-journey`,
  },
  {
    slug: "navigating-automation-architecture",
    image: "/images/articles/1111.png",
    title: "Navigating Automation Architecture :",
    text: "SMEC Automation Pvt Ltd",
    sourceHref: `${SITE}/navigating-automation-architecture`,
  },
  {
    slug: "unlocking-the-future-digital-twin-technology-the-future-is-now",
    image: "/images/articles/Dwin-technology.webp",
    title: "Unlocking the Future:",
    text: "Digital Twin Technology",
    sourceHref: `${SITE}/unlocking-the-future-digital-twin-technology-the-future-is-now`,
  },
  {
    slug: "smec-at-adipec-2024",
    image: "/images/articles/adipec.png",
    title: "SMEC at ADIPEC 2024",
    text: "A Week of Innovation, Insight & Industry Collaboration!",
    sourceHref: `${SITE}/smec-at-adipec-2024`,
  },
  {
    slug: "powering-the-future-of-oil-gas-with-automation",
    image: "/images/articles/thrid-blog.png",
    title: "Powering the Future of Oil & Gas with Automation",
    text: "",
    sourceHref: `${SITE}/powering-the-future-of-oil-gas-with-automation`,
  },
  {
    slug: "flare-ignition-systems",
    image: "/images/articles/fifth-blog.png",
    title: "Flare Ignition Systems",
    text: "The Guardians of Industrial Safety and Environmental Compliance",
    sourceHref: `${SITE}/flare-ignition-systems`,
  },
  {
    slug: "retrofit-solutions",
    image: "/images/articles/fourth-blog.png",
    title: "Retrofit Solutions",
    text: "Extending the Life Cycle of Oil & Gas Infrastructure",
    sourceHref: `${SITE}/retrofit-solutions`,
  },
  {
    slug: "optimizing-wellhead-data-collection",
    image: "/images/articles/second-blog.png",
    title: "Optimizing Wellhead Data Collection",
    text: "Leveraging Advanced Software Solutions for Enhanced Oil & Gas Operations",
    sourceHref: `${SITE}/optimizing-wellhead-data-collection`,
  },
  {
    slug: "smec-the-solution-hub-3-engineering-resilience-starts-inside-the-panel",
    image: "/images/articles/Engineering-Resilience-Starts-Inside-the-Panel.webp",
    title: "[SMEC – The Solution Hub #3]",
    text: "Engineering Resilience Starts Inside the Panel.",
    sourceHref: `${SITE}/smec-the-solution-hub-3-engineering-resilience-starts-inside-the-panel`,
  },
];

export const articleBySlug = (slug: string) =>
  articles.find((a) => a.slug === slug);

export const footer = {
  logo: "/logos/SMEC-Oil-and-Gas-Logo-300x109.png",
  addressTitle: "MIDDLE EAST & GLOBAL SUPPORT",
  addressLines: [
    "SMEC Oil & Gas Solutions LLC SPC",
    "Store-104, M34, Mussafah",
    "Abu Dhabi, United Arab Emirates",
  ],
  landline: { label: "+971 2 546 0027", href: "tel:+97125460027" },
  mobile: { label: "+971 50 249 1903", href: "tel:+971502491903" },
  email: { label: "info@smecong.com", href: "mailto:info@smecong.com" },
  /* Second address block: the UAE entity stays first, the India hub follows. */
  hub: {
    title: "ENGINEERING & MANUFACTURING HUB",
    lines: ["SMEC Automation Pvt. Ltd.", "Kochi, India"],
    href: "https://smecautomation.com/",
  },
  company: [
    { label: "Marine", href: "https://smecmarine.com/" },
    { label: "R & D", href: "https://smecrtd.com/" },
    { label: "Automation", href: "https://smecautomation.com/" },
    { label: "Industry", href: "https://smec4industry.com/" },
    { label: "Software Solutions", href: "https://smectechnologies.com/" },
    { label: "Offshore", href: "https://smecoffshore.com/" },
    { label: "Training & Development", href: "https://smeclabs.com/" },
  ],
  services: [
    { label: "Power Houses", href: `${SITE}/power-house` },
    { label: "Drill Monitor System", href: `${SITE}/drill-monitor` },
    { label: "BOP Control System", href: `${SITE}/bop-control-system` },
    { label: "Gas Detection System", href: `${SITE}/gas-detection-system` },
    { label: "Jacking Control System", href: `${SITE}/jacking-control-system` },
    { label: "RPD System", href: `${SITE}/rpd-system` },
  ],
  servicesSecondary: [
    { label: "Load Monitoring System", href: `${SITE}/load-monitoring-system` },
    { label: "PAGA System", href: `${SITE}/paga-system` },
    { label: "Battery Charger", href: `${SITE}/battery-charger` },
    {
      label: "Advanced Perimeter Security System",
      href: `${SITE}/advanced-perimeter-security-systems`,
    },
    { label: "Flare Boom Ignition System", href: `${SITE}/flare-boom-ignition-system` },
  ],
  social: [
    { label: "Linkedin", href: "https://www.linkedin.com/company/smecin/" },
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=100094543997911" },
    { label: "Instagram", href: "https://www.instagram.com/smec_automation/" },
    { label: "Youtube", href: "https://www.youtube.com/@SMECDeepFix/videos" },
  ],
  copyright:
    "“SMEC” is a registered trademark of SMEC Automation Pvt. Ltd. © 2026 SMEC All rights reserved",
  termsHref: `${SITE}/privacy-policy`,
};
