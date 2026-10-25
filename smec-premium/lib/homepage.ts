/**
 * The homepage, in the client's words.
 *
 * Every visible string here comes from her 18 October homepage document
 * (reference/SMEC OIL AND GAS WEBSITE - HOMEPAGE.docx): its text first, and
 * where the text stops, the words on its embedded designs ("image n" is the
 * nth image in the document). Copy is hers and is not paraphrased — edit it
 * only from a newer document of hers. Two things are ours and said so where
 * they appear: the links, which point at the pages this build already has
 * (URLs are kept, PROJECT_REFERENCE.md §6), and the alt text, which
 * describes what each photograph actually shows.
 *
 * Photographs are from her Creatives library (25 October), converted to WebP.
 * The source file is named beside each one. Several look generated rather
 * than photographed — marked "generated?" — and whether those may stay is
 * her open question AST-06.
 */

export type Img = { src: string; alt: string; width: number; height: number };
export type Cta = { label: string; href: string };

/** A link out of this site, opened in a new tab. */
export type ExternalCta = Cta & { external: true };

/* ------------------------------------------------------------------ hero */

export const HERO_COPY = {
  eyebrow: 'SMEC Oil & Gas Solutions LLC | Abu Dhabi, UAE',
  subhead: 'Oil & Gas E&I Engineering, Automation & Digitalisation',
  capabilities: [
    'Electrical & Instrumentation',
    'Rig Modernisation',
    'PLC/SCADA & Control Systems',
    'Digital Asset Intelligence',
  ],
  primary: { label: 'Submit a Technical RFQ', href: '/contact/' },
  secondary: { label: 'Explore Our Solutions', href: '/solutions/' },
  regions: ['Middle East & Global Engineering Support', 'India Engineering & Manufacturing'],
};

/* ------------------------------------------------------------ who we are */

export const WHO_WE_ARE_COPY = {
  /** Her heading table's name for this block. */
  label: 'About SMEC Oil & Gas Solutions',
  /** "Who we are ?" in the document; the space before the mark is dropped. */
  title: 'Who we are?',
  paragraphs: [
    'SMEC Oil & Gas Solutions LLC is an Abu Dhabi-based oil and gas engineering and system integration company providing electrical and instrumentation (E&I), industrial automation, drilling rig modernisation and digitalisation solutions across the UAE, Middle East and international markets.',
    'Our engineering capabilities cover PLC, SCADA and control-system integration, brownfield automation upgrades, SCR/VFD systems, drilling monitoring, safety systems, industrial IoT, remote asset monitoring, predictive maintenance and digital twin technologies.',
    'Working with oil and gas operators, drilling contractors, EPC companies and OEMs, SMEC supports engineering design, equipment integration, panel manufacturing, factory acceptance testing (FAT), site installation and commissioning, with regional project coordination in the UAE and engineering and manufacturing support from India.',
  ],
};

/* ------------------------------------------------ engineering solutions */

export type CapabilityCard = {
  num: string;
  title: string;
  tagline: string;
  body: string;
  tags: string[];
  cta: Cta;
  image: Img;
};

/**
 * Six capability cards, photo-left as images 11–12 lay them out. Each links
 * to the page her "homepage card → mega-menu pages" table puts first.
 */
export const CAPABILITIES_COPY = {
  label: 'Oil & Gas Engineering Solutions',
  title: 'From Engineering Scope to Operational Systems.',
  intro:
    'From individual equipment upgrades to integrated E&I, automation and digitalisation projects, SMEC brings together engineering design, system integration, testing and commissioning for new and existing energy assets.',
  cards: [
    {
      num: '01',
      title: 'Electrical & Instrumentation Engineering',
      tagline: 'From power distribution to field instrumentation.',
      body: 'Electrical engineering, field instrumentation, MCC/PCC panels, equipment interfaces, installation and commissioning for drilling rigs, oil and gas production facilities and industrial plants.',
      tags: ['E&I Engineering', 'Electrical Distribution', 'Instrumentation', 'Control Panels'],
      cta: { label: 'Explore E&I Engineering', href: '/solutions/electrical-engineering/' },
      // Gallery/Emergency switchboard.jpeg
      image: {
        src: '/images/gallery-emergency-switchboard.webp',
        alt: 'Two emergency switchboard panels with analogue meters, selector switches and indicator lamps, standing on a workshop floor',
        width: 900,
        height: 1188,
      },
    },
    {
      num: '02',
      title: 'Industrial Automation & System Integration',
      tagline: 'Connecting equipment, controls and operations.',
      body: 'PLC, HMI, SCADA and DCS interfaces, industrial communication networks, OEM package integration and control-system architecture for new installations, process automation and modernisation projects.',
      tags: ['PLC/SCADA Integration', 'Industrial Automation', 'DCS Interfaces', 'System Integration'],
      cta: { label: 'Explore Automation Solutions', href: '/solutions/automation-control-systems/' },
      // Gallery/Open Industrial Control Panel Workshop.png
      image: {
        src: '/images/gallery-open-control-panel.webp',
        alt: 'A control panel on a workshop stand with its door open, showing contactors, relays, terminals and wiring inside',
        width: 900,
        height: 1198,
      },
    },
    {
      num: '03',
      title: 'Rig Modernisation & Reactivation',
      tagline: 'Upgrading drilling systems for the next operating campaign.',
      body: 'Engineering support for onshore and offshore rig modernisation, SCR/VFD upgrades, drilling monitoring, power management, jacking interfaces, control-system retrofits and rig reactivation.',
      tags: ['Rig Automation Retrofit', 'SCR/VFD Upgrades', 'Jacking Controls', 'Reactivation'],
      cta: { label: 'Explore Rig Modernisation', href: '/solutions/rig-modernization/' },
      // Engineering Solutions/ENGINEERING SOLUTIONS (4).jpg — generated?
      image: {
        src: '/images/engineering-land-rig-walkway.webp',
        alt: 'An engineer in SMEC coveralls and a hard hat walking along a land rig walkway, past electrical enclosures towards the derrick',
        width: 1366,
        height: 768,
      },
    },
    {
      num: '04',
      title: 'Turnkey Engineering & Modular Electrical Systems',
      tagline: 'Integrated engineering packages from design to commissioning.',
      body: 'Engineering, procurement, panel manufacturing, system integration and testing for defined oil and gas project packages, including E-Houses, modular electrical rooms, power distribution systems and control panels.',
      tags: ['Turnkey Engineering', 'E-Houses', 'Modular Electrical Rooms', 'Panel Manufacturing'],
      cta: { label: 'Explore Project Engineering', href: '/solutions/turnkey-engineering-system-solutions/' },
      // Gallery/workshop (1).jpg
      image: {
        src: '/images/gallery-panel-lineup.webp',
        alt: 'A line-up of switchboard panels with doors open on their circuit breakers, busbars and control wiring',
        width: 800,
        height: 800,
      },
    },
    {
      num: '05',
      title: 'Brownfield Engineering & Control System Migration',
      tagline: 'Modernising existing assets without overlooking legacy interfaces.',
      body: 'Obsolete PLC replacement, SCADA and DCS migration, control-panel retrofits, industrial network upgrades and equipment interface modifications for existing oil and gas facilities.',
      tags: ['Brownfield Engineering', 'PLC Migration', 'Obsolescence Management', 'System Retrofit'],
      cta: { label: 'Explore Brownfield Solutions', href: '/solutions/brownfield-engineering/' },
      // Gallery/panel control supply.jpg
      image: {
        src: '/images/gallery-control-desk.webp',
        alt: 'A grey control desk with two analogue meters, a digital meter, selector switches and coloured push buttons, in a workshop',
        width: 800,
        height: 800,
      },
    },
    {
      num: '06',
      title: 'Testing, Commissioning & Lifecycle Support',
      tagline: 'Engineering support beyond equipment delivery.',
      body: 'Factory acceptance testing (FAT), site acceptance testing (SAT), troubleshooting, commissioning, shutdown and turnaround support, hydraulic and pneumatic system services, and recommissioning for critical industrial assets.',
      tags: ['FAT/SAT', 'Commissioning', 'Shutdown Support', 'Lifecycle Engineering'],
      cta: { label: 'Explore Testing & Commissioning', href: '/solutions/testing-commissioning/' },
      // Gallery/workshop (2).jpg
      image: {
        src: '/images/gallery-panel-packing.webp',
        alt: 'A technician in SMEC coveralls and a hard hat writing on a document beside wrapped control panels, with a colleague working behind him',
        width: 800,
        height: 800,
      },
    },
  ] satisfies CapabilityCard[],
  viewAll: { label: 'View All Engineering Solutions', href: '/solutions/' },
  prompt: {
    title: 'Planning a new project, rig upgrade or control-system retrofit?',
    body: 'Share the engineering scope, technical specifications or RFQ with SMEC.',
    cta: { label: 'Submit a Technical RFQ', href: '/contact/' },
  },
};

/* ------------------------------------------------- systems & products */

export type SystemSlide = {
  title: string;
  tagline: string;
  body: string;
  tags: string[];
  cta: Cta;
  image: Img;
};

/**
 * Her eight featured systems, in her order, for the slider (images 13–14).
 * Each links to the product page that covers it; four of those pages are
 * still draft behind their safety sign-off, and link here all the same.
 */
export const SYSTEMS_COPY = {
  label: 'Engineered Systems & Products',
  title: 'Engineered Systems for Critical Oil & Gas Operations.',
  groups: ['Drilling & Offshore & Onshore Systems', 'Electrical Power & Control', 'Safety & Industrial Systems'],
  intro: [
    'From drilling automation and electrical power distribution to process control, gas detection and safety systems, SMEC engineers, integrates and supplies specialised systems for onshore and offshore oil and gas operations.',
    'Supporting upstream exploration and production, midstream processing and transportation, and downstream refining and petrochemical facilities, our engineered systems address new installations, equipment modernisation, brownfield retrofits and system integration requirements.',
  ],
  slides: [
    {
      title: 'SCR/VFD Power Houses & E-Houses',
      tagline: 'Integrated power conversion and electrical control packages.',
      body: 'Engineered SCR and VFD power houses, modular electrical rooms and E-Houses integrating motor drives, switchgear, power distribution, protection and automation interfaces for drilling rigs and industrial energy facilities.',
      tags: ['SCR Houses', 'VFD Houses', 'E-Houses', 'Power Distribution'],
      cta: { label: 'Explore Power Systems', href: '/products/power-houses/' },
      // The live site's own product image: the supplied E-Houses.jpg is the
      // same container, washed out to near-white on white.
      image: {
        src: '/images/Power-House-SMEC.png',
        alt: 'A white SMEC power house container with its door open on the drive panels inside and the SMEC nameplate on its side',
        width: 879,
        height: 527,
      },
    },
    {
      title: 'Drilling Monitoring & Integrated Rig Control',
      tagline: 'Drilling parameters, equipment controls and operational visibility.',
      body: 'DMS3000 drilling monitoring, integrated drilling control and equipment interface systems supporting parameter acquisition, HMI visualisation, alarms and control-system integration for onshore and offshore drilling rigs.',
      tags: ['DMS3000', 'Drilling Monitoring', 'Rig Automation', 'Integrated Control'],
      cta: { label: 'Explore Drilling Control Systems', href: '/products/integrated-drilling-control-system/' },
      // SYSTEMS & PRODUCTS/Drilling Monitoring — DMS3000.jpg
      image: {
        src: '/images/system-dms3000-screens.webp',
        alt: 'Four monitors showing DMS3000 drilling-monitoring screens: dial gauges, parameter lists, alarm panels and rig camera views',
        width: 1366,
        height: 768,
      },
    },
    {
      title: 'PLC, MCC & Industrial Control Panels',
      tagline: 'Engineered electrical and automation panels for critical applications.',
      body: 'PLC control panels, MCC/PCC distribution panels, HMI panels and VFD drive panels designed and integrated for oil and gas production, process facilities, drilling applications and industrial automation projects.',
      tags: ['PLC Panels', 'MCC/PCC Panels', 'VFD Panels', 'HMI Control Panels'],
      cta: { label: 'Explore Control Panels', href: '/products/plc-hmi-drive-panels/' },
      // SYSTEMS & PRODUCTS/MCC, PCC & Distribution Panels.jpg
      image: {
        src: '/images/system-mcc-pcc-panels.webp',
        alt: 'A motor control centre with open compartment doors beside two smaller distribution panels',
        width: 1366,
        height: 768,
      },
    },
    {
      title: 'Fire & Gas Detection Systems',
      tagline: 'Gas detection, alarms and safety-system interfaces.',
      body: 'Industrial gas monitoring and fire and gas systems integrating detection instrumentation, alarm panels, control interfaces and monitoring functions for drilling rigs, production facilities and hazardous industrial environments.',
      tags: ['Gas Detection', 'Gas Watch', 'Fire & Gas', 'Alarm Monitoring'],
      cta: { label: 'Explore Fire & Gas Systems', href: '/products/fire-gas-detection/' },
      // SYSTEMS & PRODUCTS/Gas Watch & Gas Detection.jpg
      image: {
        src: '/images/system-gas-watch-panel.webp',
        alt: 'An SMEC Gas Watch panel: a stainless frame carrying a display unit, indicator lamps and gas sampling equipment',
        width: 1366,
        height: 768,
      },
    },
    {
      title: 'Emergency Shutdown & Integrated Safety Systems',
      tagline: 'Safety-related control and shutdown system integration.',
      body: 'Integrated control and safety system packages supporting emergency shutdown logic, process monitoring, field instrumentation interfaces, alarm handling and integration with plant automation systems.',
      tags: ['ESD Systems', 'ICSS', 'Safety PLC', 'Process Control Interfaces'],
      cta: { label: 'Explore Safety & Control Systems', href: '/products/integrated-control-safety-system/' },
      // SYSTEMS & PRODUCTS/Integrated Control & Safety Systems.jpg — composite
      image: {
        src: '/images/system-control-safety-package.webp',
        alt: 'Control and safety equipment set out together: control panels, monitors with process graphics, PLC racks, field transmitters, gas detectors and alarm beacons',
        width: 1366,
        height: 768,
      },
    },
    {
      title: 'Flare Ignition Systems',
      tagline: 'Engineered ignition packages for flare and pilot applications.',
      body: 'Flare pilot ignition systems incorporating ignition control panels, high-energy ignition components, hazardous-area field equipment, monitoring interfaces and electrical integration for onshore and offshore oil and gas installations.',
      tags: ['Flare Pilot Ignition', 'Ignition Control Panels', 'Hazardous-Area Systems'],
      cta: { label: 'Explore Flare Ignition Systems', href: '/products/flare-ignition-system/' },
      // SYSTEMS & PRODUCTS/Flare Ignition Systems.jpg
      image: {
        src: '/images/system-flare-ignition.webp',
        alt: 'Flare ignition package parts laid out: an open ignition control panel, junction boxes, ignition probes and their cables',
        width: 1366,
        height: 768,
      },
    },
    {
      title: 'Jacking Control & BOP Control Systems',
      tagline: 'Specialised control packages for offshore drilling equipment.',
      body: 'Jacking control, rack phase difference monitoring and BOP control-system interfaces for jack-up drilling rigs and offshore equipment modernisation projects.',
      tags: ['Jacking Control', 'RPD Monitoring', 'BOP Control', 'Offshore Rig Automation'],
      cta: { label: 'Explore Offshore Control Systems', href: '/products/jacking-control-system/' },
      // SYSTEMS & PRODUCTS/BOP Control Systems.jpg
      image: {
        src: '/images/system-bop-control-unit.webp',
        alt: 'A red BOP control unit inside a yellow lifting frame, with an SMEC control panel and gauges on its front',
        width: 1366,
        height: 768,
      },
    },
    {
      title: 'Generator Control & Power Management Systems',
      tagline: 'Integrated generator control and electrical power management.',
      body: 'Generator control, synchronisation, load sharing, power management and associated automation interfaces for drilling rigs, offshore installations and industrial power systems.',
      tags: ['Generator Control', 'PMS', 'Load Sharing', 'Power System Automation'],
      cta: { label: 'Explore Power Management Systems', href: '/products/generator-control-pms/' },
      // SYSTEMS & PRODUCTS/Generator Control & PMS.jpg
      image: {
        src: '/images/system-generator-switchboards.webp',
        alt: 'Two generator control switchboards, one grey and one green, fitted with breakers, meters and control modules',
        width: 1366,
        height: 768,
      },
    },
  ] satisfies SystemSlide[],
  viewAll: { label: 'Explore All Systems & Products', href: '/products/' },
  prompt: {
    title: 'Need an engineered system, replacement package or technical integration proposal?',
    body: 'Share the equipment specifications, existing system details, drawings or project RFQ with SMEC’s engineering team.',
    cta: { label: 'Submit a Technical RFQ', href: '/contact/' },
  },
};

/* ------------------------------------------------------- digitalisation */

export type Platform = {
  name: string;
  focus: string;
  tagline: string;
  body: string;
  tags: string[];
  cta: ExternalCta;
  image: Img;
};

/**
 * Her Digitalisation launcher (Tab 3) sends every platform link to the
 * Asset Digital Intelligence site, and so do these cards (image 15). The
 * visuals are the platforms' own key visuals, logos included — rendered
 * artwork rather than photographs.
 */
export const PLATFORM_SITE = 'https://asset-digital-intelligence.smec.in/';

export const DIGITAL_COPY = {
  label: 'Industrial Digitalisation',
  title: 'Connected Assets. Intelligent Operations.',
  topics: [
    'Industrial IoT',
    'Remote Asset Monitoring',
    'Predictive Maintenance',
    'Digital Twins',
    'AI Video Analytics',
  ],
  intro: [
    'From individual equipment to geographically distributed energy assets, SMEC delivers industrial digitalisation solutions that connect operational data, equipment condition and maintenance intelligence.',
    'Our digital platforms support onshore and offshore oil and gas operations, refineries, processing facilities, utilities and industrial infrastructure through remote monitoring, condition-based maintenance, digital twins and AI-powered video analytics.',
  ],
  platforms: [
    {
      name: 'NexWave',
      focus: 'Industrial IoT & Remote Monitoring',
      tagline: 'Connect equipment. Monitor operations. Act on critical data.',
      body: 'NexWave supports industrial IoT connectivity and remote asset monitoring by bringing operational signals, equipment parameters, alarms and performance information into a centralised monitoring environment.',
      tags: ['Industrial IoT', 'Remote Asset Monitoring', 'Connected Assets', 'Operational Dashboards'],
      cta: { label: 'Explore NexWave', href: PLATFORM_SITE, external: true },
      // DIGITAL PLATFORMS/Nexwave.jpg — rendered key visual
      image: {
        src: '/images/platform-nexwave.webp',
        alt: 'NexWave logo above a laptop showing an SMEC monitoring dashboard of gauges and charts',
        width: 1366,
        height: 768,
      },
    },
    {
      name: 'ProSet360',
      focus: 'Predictive Maintenance & CMMS',
      tagline: 'Turn equipment condition into maintenance decisions.',
      body: 'ProSet360 combines condition monitoring and maintenance management to support asset health visibility, predictive alerts, maintenance planning and equipment lifecycle management.',
      tags: ['Predictive Maintenance', 'Condition Monitoring', 'CMMS', 'Asset Health Intelligence'],
      cta: { label: 'Explore ProSet360', href: PLATFORM_SITE, external: true },
      // DIGITAL PLATFORMS/ProSet 360.jpg — rendered key visual
      image: {
        src: '/images/platform-proset360.webp',
        alt: 'A tablet showing a ProSet360 maintenance dashboard of trend charts, bar charts and figures',
        width: 1366,
        height: 768,
      },
    },
    {
      name: 'NexVerse',
      focus: 'Digital Twin Solutions',
      tagline: 'Connect physical assets with digital operational intelligence.',
      body: 'NexVerse supports digital twin applications that bring asset information, operating parameters and engineering context into a connected digital environment for asset visualisation and operational analysis.',
      tags: ['Industrial Digital Twin', 'Asset Visualisation', 'Operational Data Integration', 'Digital Engineering'],
      cta: { label: 'Explore NexVerse', href: PLATFORM_SITE, external: true },
      // DIGITAL PLATFORMS/Nexverse.jpg — rendered key visual
      image: {
        src: '/images/platform-nexverse.webp',
        alt: 'A processing plant at sunset beside its glowing blue wireframe digital twin, under the NexVerse logo',
        width: 1366,
        height: 768,
      },
    },
    {
      name: 'NexView',
      focus: 'AI Video Analytics',
      tagline: 'Move beyond video recording to actionable operational visibility.',
      body: 'NexView integrates video management and AI-powered analytics to support automated event detection, safety monitoring, security applications and centralised video intelligence across industrial and energy facilities.',
      tags: ['AI Video Analytics', 'Industrial Safety Monitoring', 'Intelligent CCTV', 'Video Management Systems'],
      cta: { label: 'Explore NexView', href: PLATFORM_SITE, external: true },
      // DIGITAL PLATFORMS/Nexview (1).jpg — rendered key visual
      image: {
        src: '/images/platform-nexview.webp',
        alt: 'Engineers on a plant walkway at dusk, with a security camera, video tiles and the NexView logo overlaid',
        width: 1366,
        height: 768,
      },
    },
  ] satisfies Platform[],
  viewAll: { label: 'Explore All Digitalisation Solutions', href: '/digital/' },
  prompt: {
    title: 'Turn an Existing Asset into a Connected Asset.',
    body: 'Whether the requirement involves remote equipment monitoring, predictive maintenance, digital twin integration or AI video analytics, share the asset type, existing infrastructure and operational challenge with SMEC’s digital engineering team.',
    cta: { label: 'Discuss a Digitalisation Project', href: '/contact/' },
  },
};

/* ----------------------------------------------------------- industries */

export type IndustryCard = {
  num: string;
  title: string;
  focus: string;
  body: string;
  cta: Cta;
  image: Img;
};

/**
 * Image 16 is a six-card grid; her text lists a seventh, Marine & Offshore
 * Vessels, which keeps its page and its place in the menu. The six are the
 * grid, as the requirements audit records; the seventh is kept below so it
 * can join in one line.
 */
export const INDUSTRIES_COPY = {
  label: 'Industries & Markets',
  title: 'From the Wellhead to the Refinery.',
  subtitle: 'Engineering Solutions for Upstream, Midstream & Downstream Oil and Gas Operations',
  intro: [
    'From offshore drilling rigs and onshore production facilities to gas processing plants, pipelines, LNG terminals and refineries, SMEC supports electrical, instrumentation, automation, engineered control systems and industrial digitalisation requirements across the energy value chain.',
    'Working with oil and gas operators, drilling contractors, EPC companies and OEMs, SMEC provides engineering, system integration, equipment upgrades, testing and commissioning support for new projects, existing facilities and asset modernisation programmes.',
  ],
  cards: [
    {
      num: '01',
      title: 'Offshore Drilling & Jack-Up Rigs',
      focus: 'Offshore Rig Automation, Power Systems & Modernisation',
      body: 'Electrical and automation engineering for jack-up rigs and offshore drilling assets, covering SCR/VFD systems, drilling monitoring, jacking controls, generator power management, safety-system interfaces and rig modernisation.',
      cta: { label: 'Explore Offshore Drilling Solutions', href: '/industries/upstream/offshore-drilling/' },
      // Industries/OFFSHORE RIG (1).jpg — generated?
      image: {
        src: '/images/industry-offshore-platform.webp',
        alt: 'An offshore drilling platform with a derrick, cranes and orange lifeboats, standing in open sea',
        width: 1366,
        height: 768,
      },
    },
    {
      num: '02',
      title: 'Onshore Drilling & Rig Reactivation',
      focus: 'Drilling Control Systems, Rig Upgrades & Reactivation',
      body: 'Engineering support for land drilling rigs, including control-system retrofits, drilling instrumentation, power distribution, PLC/SCADA upgrades, obsolete equipment replacement, troubleshooting and recommissioning.',
      cta: { label: 'Explore Onshore Drilling Solutions', href: '/industries/upstream/onshore-drilling/' },
      // Industries/LAND RIG (1).jpg — generated?
      image: {
        src: '/images/industry-land-rig.webp',
        alt: 'A land drilling rig with its equipment containers on a desert site at sunset',
        width: 1366,
        height: 768,
      },
    },
    {
      num: '03',
      title: 'Oil & Gas Production Facilities',
      focus: 'Production Automation, Instrumentation & Asset Monitoring',
      body: 'Electrical, instrumentation and control-system integration for oil and gas production facilities, including field instrumentation, PLC/SCADA systems, safety interfaces, remote monitoring and brownfield automation upgrades.',
      cta: { label: 'Explore Production Facility Solutions', href: '/industries/upstream/production-facilities/' },
      // Industries/WHO WE SUPPORT.jpg — generated?
      image: {
        src: '/images/industry-valve-actuator-check.webp',
        alt: 'An engineer in SMEC coveralls and hard hat checking the control unit of a valve actuator on a plant platform',
        width: 800,
        height: 800,
      },
    },
    {
      num: '04',
      title: 'Refineries & Petrochemical Plants',
      focus: 'Process Automation, E&I Engineering & Control-System Upgrades',
      body: 'Industrial automation and electrical engineering support for refinery and petrochemical facilities, including control panels, instrumentation integration, PLC/DCS interfaces, obsolete control-system migration, shutdown support and commissioning.',
      cta: { label: 'Explore Refinery & Petrochemical Solutions', href: '/industries/downstream/refineries/' },
      // Industries/Workshop (1).jpg — generated?
      image: {
        src: '/images/industry-refinery-tablet.webp',
        alt: 'An engineer in SMEC coveralls holding a tablet in front of refinery columns at sunset, with a projected data display',
        width: 800,
        height: 800,
      },
    },
    {
      num: '05',
      title: 'Gas Processing & LNG Facilities',
      focus: 'Instrumentation, Safety Systems & Process Control Integration',
      body: 'Engineering and integration support for gas processing and LNG applications, including gas detection, fire and gas interfaces, ESD control systems, electrical packages, instrumentation and industrial monitoring.',
      cta: { label: 'Explore Gas Processing & LNG Solutions', href: '/industries/downstream/gas-processing/' },
      // Industries/OIL & GAS FACILITIES (1).jpg — generated?
      image: {
        src: '/images/industry-gas-plant.webp',
        alt: 'Aerial view of a gas processing plant with spherical storage tanks, pipe racks and process columns',
        width: 800,
        height: 800,
      },
    },
    {
      num: '06',
      title: 'Pipelines, Terminals & Energy Infrastructure',
      focus: 'Remote Monitoring, Automation & Electrical Control Systems',
      body: 'Electrical and automation solutions for pipeline infrastructure, storage facilities and terminals, covering control systems, equipment monitoring, field instrumentation, industrial communications and remote operational visibility.',
      cta: { label: 'Explore Pipeline & Terminal Solutions', href: '/industries/midstream/pipelines/' },
      // Engineering Solutions/ENGINEERING SOLUTIONS (6).jpg — generated?
      image: {
        src: '/images/industry-pipeline-plant.webp',
        alt: 'Large pipelines running towards a processing plant under a clear sky',
        width: 1366,
        height: 768,
      },
    },
  ] satisfies IndustryCard[],
  /** Her seventh entry, outside image 16's grid. No photograph is chosen yet. */
  marine: {
    num: '07',
    title: 'Marine & Offshore Vessels',
    focus: 'Marine Electrical, Automation & Offshore Control Systems',
    body: 'Engineering support for marine and offshore vessels, including electrical distribution, generator controls, power management, automation retrofits, monitoring systems and specialised marine control applications.',
    cta: { label: 'Explore Marine & Offshore Solutions', href: '/industries/marine-offshore-vessels/' },
  },
  valueChain: {
    title: 'Engineering Support Across the Energy Value Chain',
    audiences: [
      { label: 'Oil & Gas Operators', href: '/customers/' },
      { label: 'Drilling Contractors', href: '/customers/drilling-contractors/' },
      { label: 'EPC Contractors', href: '/customers/epc-contractors/' },
      { label: 'OEMs & Package Vendors', href: '/customers/oem-package-vendors/' },
    ],
    body: 'From individual equipment packages to multidisciplinary engineering scopes, SMEC works with project and asset teams to define technical requirements, integrate systems and support project execution.',
  },
  viewAll: { label: 'Explore All Industries', href: '/industries/' },
  rfq: { label: 'Submit an Industry-Specific RFQ', href: '/contact/' },
};

/* ------------------------------------------- quality & certifications */

export type CertIcon = 'award' | 'leaf' | 'shield' | 'bolt';

/** Images 17 and 18: one tab per legal entity, each with its own standards. */
export const QUALITY_COPY = {
  label: 'Quality & Certifications',
  title: 'Certified Systems. Engineering Confidence.',
  intro:
    'Quality, environmental responsibility, occupational health and safety, and energy management are integral to SMEC’s engineering and project execution approach.',
  tabs: [
    {
      id: 'uae',
      tab: 'Middle East — UAE',
      entity: 'SMEC Oil & Gas Solutions LLC — UAE',
      body: 'Four management-system certifications covering quality, environmental management, occupational health and safety, and energy management.',
      certs: [
        { standard: 'ISO 9001:2015', name: 'Quality Management System', icon: 'award' },
        { standard: 'ISO 14001:2015', name: 'Environmental Management System', icon: 'leaf' },
        { standard: 'ISO 45001:2018', name: 'Occupational Health & Safety Management', icon: 'shield' },
        { standard: 'ISO 50001:2018', name: 'Energy Management System', icon: 'bolt' },
      ],
    },
    {
      id: 'india',
      tab: 'India',
      entity: 'SMEC Automation Pvt Ltd — India',
      body: 'Management-system certifications supporting engineering, manufacturing, system integration and project delivery activities in India.',
      certs: [
        { standard: 'ISO 9001', name: 'Quality Management System', icon: 'award' },
        { standard: 'ISO 14001', name: 'Environmental Management System', icon: 'leaf' },
        { standard: 'ISO 45001', name: 'Occupational Health & Safety Management', icon: 'shield' },
      ],
    },
  ] as { id: string; tab: string; entity: string; body: string; certs: { standard: string; name: string; icon: CertIcon }[] }[],
  footnote: 'Certification documents and verification details',
  cta: { label: 'View Certifications', href: '/company/certifications/' },
};

/* ------------------------------------------------ about: bases & delivery */

export const ABOUT_COPY = {
  label: 'About SMEC — Engineering & Delivery',
  title: 'Regional Presence. Integrated Engineering. Project-Ready Execution.',
  subtitle:
    'Oil & Gas Engineering and System Integration Across the UAE, Middle East and International Markets',
  intro: [
    'SMEC Oil & Gas Solutions LLC, based in Abu Dhabi, supports electrical and instrumentation (E&I), industrial automation, drilling rig modernisation, engineered control systems and digitalisation requirements across onshore and offshore energy assets.',
    'Working with SMEC Automation Pvt Ltd in India, the company draws on engineering, system integration, panel manufacturing and testing capabilities to support projects from technical evaluation and design through equipment integration, factory acceptance testing (FAT), site commissioning and lifecycle support.',
  ],
  basesTitle: 'Two Engineering Bases. Connected Project Delivery.',
  /** Panel names from image 19; entity and description from her text. */
  bases: [
    {
      num: '01',
      name: 'UAE Operations',
      entity: 'SMEC Oil & Gas Solutions LLC',
      body: 'Middle East project coordination, customer and EPC engagement, technical evaluation, engineering services, equipment integration and site execution support.',
      href: '/company/about/',
      // OFFICE/SMEC OIL AND GAS SOLUTIONS OFFICE.jpg — logo may be composited
      image: {
        src: '/images/office-smec-oil-gas-entrance.webp',
        alt: 'Office reception wall bearing the SMEC Oil & Gas Solutions LLC logo, between a lift and glass entrance doors',
        width: 1366,
        height: 768,
      },
    },
    {
      num: '02',
      name: 'India Engineering & Manufacturing',
      entity: 'SMEC Automation Pvt Ltd',
      body: 'Engineering design, PLC/SCADA development, industrial automation, electrical and control-panel manufacturing, system integration, factory testing and technical project support.',
      href: '/company/india-engineering-hub/',
      // OFFICE/SMEC.jpg — an edited banner photograph
      image: {
        src: '/images/office-smec-building.webp',
        alt: 'The entrance of the SMEC building, its sign carrying the SMEC logo with IADC and SIDM membership marks',
        width: 1366,
        height: 768,
      },
    },
  ],
  lifecycleTitle: 'Engineering Capabilities Across the Project Lifecycle',
  lifecycle: [
    { step: 'Engineer', note: 'Technical assessment, system architecture, design and equipment selection.' },
    { step: 'Integrate', note: 'Electrical, instrumentation, automation, power, safety and digital system interfaces.' },
    { step: 'Build & Test', note: 'Engineered control packages, panel manufacturing, integration and FAT.' },
    { step: 'Commission & Support', note: 'Site installation support, SAT, troubleshooting, modernisation and lifecycle services.' },
  ],
  primary: { label: 'Discover SMEC’s Engineering Capabilities', href: '/solutions/' },
  secondary: { label: 'Explore Our Project Experience', href: '/company/project-experience/' },
};

/* --------------------------------------------------------- corporate film */

/** Image 20. The video ID stays the current one until the new upload. */
export const FILM_COPY = {
  label: 'Inside SMEC / Corporate Film',
  title: 'Beyond the Drawings. Inside the Engineering.',
  body: 'A closer look at the people, facilities and technical capabilities behind SMEC’s engineering, manufacturing, system integration and project execution.',
  videoTitle: 'SMEC Corporate Film',
  playHint: 'Click to watch · Video loads on demand',
  topics: ['Engineering', 'Manufacturing', 'System Integration', 'Testing', 'Site Execution'],
};

/* -------------------------------------------------------------- training */

export type TrainingIcon = 'helmet' | 'gear' | 'wrench' | 'cap';

/** Her text, with the four cards and the topic list from image 21. */
export const TRAINING_COPY = {
  label: 'Technical Training & Workforce Development',
  title: 'We Engineer the Systems. We Help Teams Master Them.',
  lead: 'Technical competence doesn’t end with installation and commissioning.',
  intro: [
    'SMEC supports project-specific technical training, on-the-job learning and workforce upskilling for engineering, operations and maintenance teams working with industrial electrical, instrumentation, automation and control systems.',
    'From new system handovers to legacy equipment modernisation, training programmes can be developed around the installed equipment, operational responsibilities and technical requirements of each facility.',
  ],
  cards: [
    {
      title: 'On-the-Job Training',
      body: 'Practical learning around installed systems, equipment and operating environments.',
      icon: 'helmet',
    },
    {
      title: 'Project-Specific Training',
      body: 'Training aligned with newly commissioned, upgraded or integrated systems.',
      icon: 'gear',
    },
    {
      title: 'Maintenance & Troubleshooting',
      body: 'System diagnostics, fault identification and maintenance practices.',
      icon: 'wrench',
    },
    {
      title: 'Engineering Team Upskilling',
      body: 'Capability development for electrical, instrumentation and automation personnel.',
      icon: 'cap',
    },
  ] as { title: string; body: string; icon: TrainingIcon }[],
  topicsTitle: 'Training can be tailored to:',
  topics: [
    'PLC, HMI & SCADA Systems',
    'Electrical & Control Panels',
    'VFDs & Motor Control',
    'Industrial Instrumentation',
    'Drilling Control Systems',
    'Power Management',
    'Remote Monitoring & Digital Platforms',
  ],
  cta: { label: 'Discuss a Customised Training Programme', href: '/contact/' },
  audience: 'For operators, EPCs, OEMs, drilling contractors and industrial maintenance teams.',
};

/* ----------------------------------------------- knowledge library */

export type LibraryCategory = {
  num: string;
  name: string;
  title: string;
  body: string;
  cta: Cta;
  image: Img;
};

/**
 * The six interactive categories of images 22–27, each a link to the
 * Resources page her SEO table names for it. Three of those pages are still
 * draft while their content is written; they answer, and are linked.
 */
export const LIBRARY_COPY = {
  label: 'Projects & Engineering Knowledge Library',
  title: 'Knowledge Beyond the Datasheet.',
  subtitle: 'Oil & Gas Engineering Projects, Technical Case Studies & Industrial Knowledge',
  intro: [
    'Explore technical guides, engineering case studies and practical resources covering oil and gas automation, drilling systems, electrical and instrumentation engineering, industrial digitalisation and asset modernisation.',
    'From understanding complex control-system architectures to evaluating retrofit decisions, SMEC’s technical resources connect engineering knowledge with real-world industrial applications.',
  ],
  explorerLabel: 'The Engineering Library',
  explorerIntro: 'Technical perspectives, documented experience and practical engineering resources.',
  categories: [
    {
      num: '01',
      name: 'Technical Guides & Whitepapers',
      title: 'Engineering Decisions, Explained.',
      body: 'Technical guidance on industrial automation, drilling systems, electrical engineering, control integration and digitalisation.',
      cta: { label: 'Explore Technical Guides', href: '/resources/whitepapers/' },
      // Gallery/workshop.jpg — generated?
      image: {
        src: '/images/gallery-workshop-team.webp',
        alt: 'Technicians in SMEC coveralls at workbenches in a panel workshop, two of them reviewing a document together',
        width: 800,
        height: 800,
      },
    },
    {
      num: '02',
      name: 'Asset Archaeology',
      title: 'The Technology Behind the Timeline.',
      body: 'Explore the evolution of industrial systems, ageing infrastructure and the engineering decisions that shape modernisation.',
      cta: { label: 'Explore Asset Archaeology', href: '/resources/asset-archaeology/' },
      // Gallery/Emergency Switchboard Control Panel.png
      image: {
        src: '/images/gallery-switchboard-front.webp',
        alt: 'The front of an SMEC emergency switchboard: rows of analogue meters, a controller display, selector switches and an emergency stop button',
        width: 900,
        height: 1068,
      },
    },
    {
      num: '03',
      name: 'Engineering Case Studies',
      title: 'Inside the Engineering.',
      body: 'Project challenges, technical approaches, system integration, factory testing and execution experience.',
      cta: { label: 'Read Case Studies', href: '/resources/case-studies/' },
      // Gallery/WORKSHOP (3).jpg
      image: {
        src: '/images/gallery-workbench.webp',
        alt: 'Two technicians, one in SMEC coveralls, working at a bench in a workshop stocked with wrapped parts',
        width: 800,
        height: 800,
      },
    },
    {
      num: '04',
      name: 'Engineering FAQs',
      title: 'Questions Engineers Actually Ask.',
      body: 'Practical answers about PLC migration, control-system integration, equipment upgrades and commissioning.',
      cta: { label: 'Explore Engineering FAQs', href: '/resources/faqs/' },
      // Engineering Solutions/Workshop (5).jpg — generated?
      image: {
        src: '/images/engineering-panel-room.webp',
        alt: 'SMEC technicians testing a row of electrical panels, one with a tablet and one kneeling by an open cabinet',
        width: 800,
        height: 800,
      },
    },
    {
      num: '05',
      name: 'Engineering Glossary',
      title: 'The Language of Industrial Systems.',
      body: 'Clear definitions of technical terminology across E&I, drilling, automation and digital engineering.',
      cta: { label: 'Explore the Glossary', href: '/resources/glossary/' },
      // Engineering Solutions/Workshop (8).jpg — generated?
      image: {
        src: '/images/engineering-junction-box.webp',
        alt: 'Two technicians in SMEC coveralls wiring a stainless-steel junction box, one taking notes on a clipboard',
        width: 800,
        height: 800,
      },
    },
    {
      num: '06',
      name: 'Technical Checklists',
      title: 'Before the Work Begins.',
      body: 'Practical checklists for engineering reviews, equipment upgrades, FAT, SAT and commissioning preparation.',
      cta: { label: 'Explore Checklists', href: '/resources/checklists/' },
      // Engineering Solutions/ENGINEERING SOLUTIONS (2).jpg — generated?
      image: {
        src: '/images/engineering-panel-checklist.webp',
        alt: 'An engineer in an SMEC hard hat and ear defenders filling in a checklist beside yellow control panels',
        width: 1366,
        height: 768,
      },
    },
  ] satisfies LibraryCategory[],
  experienceTitle: 'Explore Our Engineering Experience',
  experience: [
    {
      num: '01',
      title: 'Project Experience',
      body: 'Electrical, automation and engineered system projects supporting drilling rigs, oil and gas facilities and industrial energy infrastructure.',
      cta: { label: 'Explore Project Experience', href: '/company/project-experience/' },
    },
    {
      num: '02',
      title: 'Engineering Case Studies',
      body: 'A closer look at engineering challenges, system architectures, equipment interfaces, testing approaches and project execution.',
      cta: { label: 'Read Engineering Case Studies', href: '/resources/case-studies/' },
    },
    {
      num: '03',
      title: 'Engineering & Manufacturing Facilities',
      body: 'Explore the engineering, system integration, panel manufacturing, assembly and testing capabilities supporting SMEC’s project delivery.',
      cta: { label: 'Explore Our Facilities', href: '/company/india-engineering-hub/' },
    },
    {
      num: '04',
      title: 'Technical Articles & Engineering Guides',
      body: 'Practical engineering perspectives covering PLC/SCADA migration, drilling automation, power management, instrumentation, safety systems, asset modernisation and industrial digitalisation.',
      cta: { label: 'Explore Technical Knowledge', href: '/resources/whitepapers/' },
    },
    {
      num: '05',
      title: 'Engineering FAQs, Checklists & Downloads',
      body: 'Technical references for engineering teams, project managers and procurement professionals evaluating equipment upgrades, system integration and commissioning requirements.',
      cta: { label: 'Access Engineering Resources', href: '/resources/faqs/' },
    },
    {
      num: '06',
      title: 'Asset Archaeology',
      body: 'Exploring the evolution of industrial equipment, control technologies and critical energy infrastructure — and what ageing systems reveal about modernisation decisions.',
      cta: { label: 'Explore Asset Archaeology', href: '/resources/asset-archaeology/' },
    },
  ],
  viewAll: { label: 'Explore All Projects & Resources', href: '/resources/' },
};

/* ------------------------------------------------------------ newsletter */

/**
 * SMEC EDGE, image 28. The design's "Latest edition" cover and "Read Latest
 * Edition" link wait for a first edition to exist; nothing here stands in
 * for one.
 */
export const NEWSLETTER_COPY = {
  label: 'SMEC EDGE | The SMEC Group Newsletter',
  title: 'The Industries Are Evolving. Stay in the Know.',
  topics: ['Oil & Gas', 'Marine & Offshore', 'Industrial Automation', 'Heavy Industries', 'Digitalisation'],
  kicker: 'SMEC EDGE / Monthly Industry Intelligence',
  cover: {
    publisher: 'SMEC Group Publications',
    name: 'SMEC EDGE',
    strap: ['Engineering', 'Industry', 'Innovation'],
    sectors: ['Oil & Gas', 'Marine', 'Industrial', 'Digital'],
  },
  heading: 'A Wider View of Engineering.',
  body: 'Market developments, technical insights and updates from across the SMEC Group.',
  placeholder: 'Your work email',
  submit: 'Subscribe',
};

/* ------------------------------------------------------------------ faqs */

export type FaqBlock = string | { list: string[] };

/** A phrase of her answer that becomes a link, and where it goes. */
export type FaqLink = { phrase: string; href: string };

export type Faq = { q: string; a: FaqBlock[]; links: FaqLink[] };

/**
 * Her eleven questions and answers, word for word. Her table asks for each
 * answer to link to its service or system page, so a phrase of the answer
 * itself carries the link — the wording stays hers and the anchor text says
 * where it goes. There is no training page yet; question 10 links to the
 * training section above it.
 */
export const FAQ_COPY = {
  label: 'Engineering FAQs',
  title: 'Technical Questions. Engineering-Led Answers.',
  intro:
    'From drilling rig modernisation and electrical and instrumentation engineering to industrial automation, engineered systems and digitalisation, explore how SMEC supports complex engineering requirements across onshore and offshore oil and gas operations.',
  faqs: [
    {
      q: 'What engineering solutions does SMEC provide for the oil and gas industry?',
      a: [
        'SMEC provides electrical and instrumentation (E&I) engineering, industrial automation, PLC/SCADA integration, drilling rig modernisation, engineered power and control systems, safety-system integration and industrial digitalisation.',
        'Our engineering capabilities support drilling contractors, oil and gas operators, EPC companies and OEMs across new installations, brownfield upgrades, system integration, commissioning and asset lifecycle requirements.',
      ],
      links: [
        { phrase: 'electrical and instrumentation (E&I) engineering', href: '/solutions/electrical-engineering/' },
        { phrase: 'Our engineering capabilities', href: '/solutions/' },
      ],
    },
    {
      q: 'Can SMEC modernise existing drilling rig automation and control systems?',
      a: [
        'Yes. SMEC supports onshore and offshore drilling rig modernisation, including drilling monitoring systems, PLC/HMI upgrades, SCR and VFD systems, generator control and power management, jacking control interfaces and integrated automation.',
        'Modernisation may involve complete system replacement, partial upgrades or integration with existing equipment, depending on the rig’s technical condition and operational requirements.',
      ],
      links: [{ phrase: 'drilling rig modernisation', href: '/solutions/rig-modernization/' }],
    },
    {
      q: 'Does SMEC provide PLC, SCADA and industrial control-system migration?',
      a: [
        'Yes. SMEC supports PLC migration, SCADA modernisation, HMI upgrades, obsolete control-system replacement and integration with existing DCS and industrial communication networks.',
        'Our engineering approach considers control logic, I/O compatibility, system architecture, operational continuity, testing and commissioning requirements.',
      ],
      links: [{ phrase: 'PLC migration, SCADA modernisation', href: '/solutions/control-system-migration/' }],
    },
    {
      q: 'What industrial digitalisation solutions does SMEC offer?',
      a: [
        'SMEC’s digitalisation portfolio includes remote asset monitoring, Industrial Internet of Things (IIoT), condition monitoring, predictive maintenance, digital twin applications and AI-powered video analytics.',
        'Our digital platforms include:',
        {
          list: [
            'NexWave: Remote monitoring and connected asset visibility.',
            'ProSet360: Predictive maintenance and computerised maintenance management.',
            'NexVerse: Digital twin applications and asset visualisation.',
            'NexView: AI-powered video analytics for safety, security and operational monitoring.',
          ],
        },
        'These solutions help engineering and operations teams access relevant asset information, identify developing issues and support more informed maintenance and operational decisions.',
      ],
      links: [
        { phrase: 'SMEC’s digitalisation portfolio', href: '/digital/' },
        { phrase: 'NexWave', href: '/digital/remote-monitoring-nexwave/' },
        { phrase: 'ProSet360', href: '/digital/cmms-proset360/' },
        { phrase: 'NexVerse', href: '/digital/digital-twin-nexverse/' },
        { phrase: 'NexView', href: '/digital/industrial-ai-video-nexview/' },
      ],
    },
    {
      q: 'Can SMEC integrate digital monitoring solutions with existing industrial equipment?',
      a: [
        'Yes. Depending on the existing infrastructure, SMEC can evaluate integration with PLCs, SCADA systems, industrial sensors, field instruments, communication gateways and other operational technology systems.',
        'Digitalisation projects may involve industrial data acquisition, protocol integration, remote dashboards, asset condition monitoring and integration with maintenance workflows.',
      ],
      links: [{ phrase: 'remote dashboards', href: '/digital/remote-monitoring-nexwave/' }],
    },
    {
      q: 'Does SMEC provide drilling, electrical power and industrial safety systems?',
      a: [
        'SMEC’s engineered systems portfolio covers drilling monitoring and control, SCR/VFD power systems, generator control and power management, jacking control interfaces, MCC/PCC panels, PLC control panels, gas detection, flare ignition and associated industrial safety systems.',
        'Engineering, manufacturing, integration and testing responsibilities are defined according to the project specifications.',
      ],
      links: [{ phrase: 'SMEC’s engineered systems portfolio', href: '/products/' }],
    },
    {
      q: 'Can SMEC support brownfield upgrades and obsolete equipment replacement?',
      a: [
        'Yes. SMEC supports brownfield automation upgrades, electrical system modernisation, instrumentation replacement, obsolete PLC and HMI migration, drive retrofits and control-system integration.',
        'Where technically feasible, existing equipment can be retained while selected components or subsystems are upgraded to address obsolescence, maintainability, compatibility and operational requirements.',
      ],
      links: [{ phrase: 'brownfield automation upgrades', href: '/solutions/brownfield-engineering/' }],
    },
    {
      q: 'Does SMEC provide engineering, manufacturing, FAT, SAT and commissioning support?',
      a: [
        'Yes. SMEC Oil & Gas Solutions LLC in the UAE works with SMEC Automation Pvt Ltd in India to support engineering, system integration, electrical and control-panel manufacturing, factory acceptance testing (FAT), site acceptance testing (SAT), installation and commissioning.',
        'The execution model and responsibilities are determined by project location, technical requirements and agreed scope.',
      ],
      links: [
        { phrase: 'electrical and control-panel manufacturing', href: '/solutions/panel-engineering-manufacturing/' },
        { phrase: 'factory acceptance testing (FAT)', href: '/solutions/testing-commissioning/' },
      ],
    },
    {
      q: 'Which industries and organisations does SMEC support?',
      a: [
        'SMEC supports oil and gas operators, drilling contractors, EPC contractors, OEMs and industrial asset owners.',
        'Applications span offshore and onshore drilling, oil and gas production, refineries, petrochemicals, gas processing, pipelines, terminals, marine and offshore vessels, utilities and heavy industrial facilities.',
      ],
      links: [
        { phrase: 'oil and gas operators, drilling contractors, EPC contractors', href: '/customers/' },
        { phrase: 'offshore and onshore drilling', href: '/industries/' },
      ],
    },
    {
      q: 'Does SMEC provide customised technical training and on-the-job training for industrial teams?',
      a: [
        'SMEC can support project-specific technical training, operator familiarisation, maintenance training and engineering workforce upskilling for electrical, instrumentation, automation and control systems. Training requirements can be aligned with installed equipment, system upgrades, commissioning activities and the technical responsibilities of the client’s personnel.',
      ],
      links: [{ phrase: 'project-specific technical training', href: '#training' }],
    },
    {
      q: 'How can I submit an engineering enquiry or technical RFQ to SMEC?',
      a: [
        'Share the project scope, technical specifications, equipment details, drawings, datasheets, applicable standards, project location and required schedule.',
        'For modernisation and retrofit projects, information about the existing control systems, installed equipment, operational issues and integration requirements will help SMEC’s engineering team evaluate the scope.',
      ],
      links: [{ phrase: 'Share the project scope', href: '/contact/' }],
    },
  ] satisfies Faq[],
  cta: { label: 'Submit a Technical RFQ', href: '/contact/' },
};

/* ------------------------------------------------------------- final RFQ */

/** Her closing section; the chooser and its contacts are images 30–31. */
export const FINAL_RFQ_COPY = {
  label: 'Project Enquiries',
  title: 'Have a Technical Requirement? Send Us the Scope.',
  lead: 'New project, retrofit, equipment replacement, system integration or commissioning requirement?',
  body: 'Share the technical specification, SLD, P&ID, BOQ, existing equipment details or project brief. SMEC’s team can review the scope and assess the appropriate engineering response.',
  chooserTitle: 'Choose the project region',
  cta: 'Submit a Technical RFQ',
};
