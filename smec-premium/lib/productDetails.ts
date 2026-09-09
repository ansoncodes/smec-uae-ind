/**
 * Body content for the product detail pages, taken from the corresponding
 * pages on smecoilandgas.com (see each product's `sourceHref`).
 *
 * Wording is the site's own. Two edits were made deliberately:
 *   - Headings are set in sentence case, matching the rest of this build.
 *   - "SPONTANIOUS" and "HASSELFREE" in the shared subtitle are corrected to
 *     "spontaneous" and "hassle-free"; both are typos on the live pages.
 */

export type ProductSection = {
  heading: string;
  items: string[];
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductDetailContent = {
  /** The strapline under the page title. */
  subtitle?: string;
  /** Body paragraphs, in page order. The first is used as the hero lead. */
  body: string[];
  sections: ProductSection[];
  specs?: { heading: string; rows: ProductSpec[] };
};

const PRECISE_SYSTEMS =
  "Delivering spontaneous and precise systems for hassle-free operations";

export const productDetails: Record<string, ProductDetailContent> = {
  "power-house": {
    subtitle: "Delivering customized turnkey solutions for your power requirements",
    body: [
      "Power Houses offered by SMEC are unique and built specifically giving importance to client requirements. They are very cost effective and also do not compromise in quality.",
      "The Power panels can be transported to any location and SMEC makes sure that the panel is designed to support such characteristics of the specific rig such as skid mount, trailer mount, or even top lifted.",
    ],
    sections: [
      {
        heading: "Why SMEC?",
        items: [
          "Cost effective solutions custom made to meet your requirements",
          "Integrate multiple systems as per your choice",
          "No compromise in quality and standards",
          "Swift generator controls with automatic operations and load sharing",
          "Fully automated system with integrated IoT features",
          "Different mounts for transportation",
          "Easy to assemble and start operation",
          "Perfect HVAC systems to manage heat load",
          "Retractable entries and openings as per size and requirement",
          "Safety and security features for secure operation",
        ],
      },
    ],
  },

  "advanced-perimeter-security-systems": {
    subtitle: "Exproof CCTV surveillance",
    body: [
      "SMEC understands how important it is to have a close monitoring surveillance system that can withstand extreme conditions in a highly hazardous environment. Our experts listen to your requirements and custom build the setup. We install them at the right spots, test them and finally will give your team a training on how to work on it.",
    ],
    sections: [
      {
        heading: "Specifications",
        items: [
          "Industrial Safety Compliance",
          "IECE X and ATEX Certification",
          "Stainless Steel Enclosure",
          "Lightning Protection",
          "Excellent Encoding",
          "High Resolution Image Sensor",
          "Integrated Wiper",
          "Up to 36X Zoom",
          "Low Light Imaging",
          "Reliable Storage for Videos",
        ],
      },
      {
        heading: "Why SMEC?",
        items: [
          "Suitable for Hazardous Environment",
          "Weatherproof",
          "High-Definition Video Surveillance",
          "Long Range PTZ Cameras",
          "Thermal Imaging",
          "Video Management Software",
          "IP 66/67/68",
          "Integration with Security System",
          "Robust Construction",
          "Advanced Analytics",
          "Remote Monitoring",
          "Explosion Proof",
          "Scalability",
          "Reliable Storage for Video",
        ],
      },
      {
        heading: "Our services",
        items: [
          "Our team of experts will arrive and complete installation of surveillance systems as per standards",
          "Our expert team will not only set up the surveillance systems, but also train your team to work on the systems",
        ],
      },
    ],
  },

  "drill-monitor": {
    subtitle: PRECISE_SYSTEMS,
    body: [
      "The SMEC DMS3000 Drill Monitor System is designed to give operators a clear, unambiguous overview of critical drilling and mud data processes. The system has been developed by SMEC Oil & Gas to greatly improve how information is presented using modern display technology, multi-color and coded graphics and flexible screen configurations.",
      "High-end CPU and IO cards are used for processing the signals and its compact footprint allows easy integration into the existing processing cabinets. The solution includes the bespoke development of new intuitive SCADA software by in-house engineers, hosted by Powerful Ex Proof IPC's, a SCADA server and multiple clients are implemented as the visual interface with displays fitted within the existing drilling console arrangement, an ATEX compliant HMI display will be provided for the pit room.",
      "The SCADA solution allowed for the flexibility required in the graphics generation, along with the responsive refresh/update times required to ensure that the rig driller has live drilling parameter data.",
    ],
    sections: [
      {
        heading: "Why SMEC?",
        items: [
          "High performance Controller & remote IO Racks",
          "Multiple client PCs to serve Driller, Tool pusher and other users as required",
          "Multiple access level secure against unauthorized system modifications to drilling parameters",
          "Large format touch screens installed in a driller's console",
          "Tool pushers IPC operator station with desktop monitor",
          "Hazardous Area Touchscreen HMI for use on the pit room to monitor mud pits and trip tanks",
          "DMS3000 by SMEC offers a quick and cost-effective solution",
          "Total replacement of systems or a partial upgrade to their existing system",
          "Multiple configurable pages",
        ],
      },
      {
        heading: "Pages available",
        items: [
          "Drilling / Coring Screens",
          "Tripping / Casing Screens",
          "Well Control / Circulation Screens",
          "Weight Indicator Screens",
          "Pit Volume Screens",
          "Configurable Strip Chart Screens",
          "Drilling Maintenance Screens",
          "System Maintenance Screens",
        ],
      },
    ],
  },

  "integrated-drilling-control-system": {
    subtitle: "Integrated with modern technology for seamless operations",
    body: [
      "The SMEC integrated drilling control system is a high-availability integrated rig control system for managing, controlling, and monitoring rig floor equipment in independent and activity-based operations. The system is designed to allow operators to focus on drilling, tripping, and stand-building processes by providing an efficient and intuitive rig floor command center.",
    ],
    sections: [
      {
        heading: "Why SMEC?",
        items: [
          "Cut down rig operation and maintenance costs",
          "Increases safety",
          "Centralized control",
          "Significant rig tasks Automation",
          "Improves response time and safety",
          "Simultaneous monitoring of multiple equipment",
          "Continuous power management",
          "Easy maintenance and troubleshooting",
          "Seamless control of rig & drill operations",
          "User-friendly interfaces and field-proven technology",
          "Provides comfortable, ergonomic work area",
          "Easy installation, commission, maintenance, support & repair",
        ],
      },
      {
        heading: "Also featuring",
        items: ["Advanced technology", "Interactive controls", "Multi-tool control cabinet"],
      },
    ],
  },

  "jacking-control-system": {
    subtitle: PRECISE_SYSTEMS,
    body: [
      "SMEC Jacking Control System is composed of Upper leg Guide, Jacking Frame, jacking pinion on jacking unit, Leg chord-split-pipe with oppose teeth rack and rack chock system for static holding. The control system supports control start-up operations and precise speed control can be achieved. It provides information needed for jacking control and maintenance. Advanced report function enhances the safe and smart operation which is user friendly.",
      "SMEC jacking system consists of a security feature which is the fail-safe monitoring system. This fail-safe monitoring system will come in handy if the operator can't respond to a warning signal in proper time. So in case of any emergency, the fail-safe monitoring system will shut down the jack-up process.",
    ],
    sections: [
      {
        heading: "Why SMEC?",
        items: [
          "Single cord jacking can be done with daisy wheel sensor",
          "SMEC Jacking system can use hydraulic as well as electric motor system too",
          "SMEC Jacking system can be controlled by an advanced control system that are futuristic",
          "The hydraulic jacking system will come in handy during the installation process",
          "SMEC hydraulic jacking system provides hydrodynamic and aerodynamic characters",
          "The jacking system will be protected from mechanical or environmental hazards by the jacking house",
          "The monitoring system will be useful for the operator to achieve accurate measurements with the help of proper electronic and mechanical systems",
          "Automated operation",
          "Real-time monitoring and controlling can be achieved",
          "Advanced display which provides all the relevant information such as the RPD information",
        ],
      },
    ],
  },

  "flare-boom-ignition-system": {
    subtitle: "Delivering the most reliable pilot ignition system for you",
    body: [
      "SMEC offers a full range of Ignition equipment to suit your needs. Our Ignition system is assured to give you better and long-lasting performance as they are fired and tested before installation. Our team of professionals can deliver New / Retrofit / Replacement of Flare Boom Pilot Ignition System.",
    ],
    sections: [
      {
        heading: "Why SMEC?",
        items: [
          "High Energy Ignition",
          "Natural Draft Pilot",
          "Compact Design",
          "Cost Effective",
          "MOC SS316",
          "High Temperature Resistance Steel Braided Cables",
          "Explosion Proof",
          "Stainless Steel Panels",
          "Longer Life",
          "Easy Maintenance",
          "Insensitive to Moisture & Dirt Easy Retrofit",
          "Optional Flame Monitoring AC and DC Input",
          "Options Cable Length Up to 150 Meters",
        ],
      },
    ],
    specs: {
      heading: "Standards and specifications",
      rows: [
        { label: "Standard Energy", value: "12 Joules" },
        { label: "Spark Rate Per Second", value: "> 5 Sparks" },
        { label: "Input Voltage", value: "110 or 230 V AC, 50/60 Hz" },
        { label: "Duty Cycle", value: "15 Mins On & 15 Mins Off (1:1)" },
        { label: "Maximum Current", value: "5 Amps" },
      ],
    },
  },

  "bop-control-system": {
    subtitle: PRECISE_SYSTEMS,
    body: [
      "Secure your oil rig operations with the SMEC BOP control system. Our BOP control system will prevent well kicks and any other explosion that will be caused due to the liquid surfacing. SMEC provides a BOP control system for subsea, platforms, and also for land.",
    ],
    sections: [
      {
        heading: "Why SMEC?",
        items: [
          "PLC-based BOP control panels",
          "SMEC BOP control system is composed of ring topology networking and this will improve the system redundancy",
          "Electric and hydraulic lines",
          "Pump modules are electric motor-driven",
          "The accumulator module is designed in a way that it can occupy the hydraulic control manifold, electric pump, etc.",
          "Control pods and test valves",
          "Provide security against the cybersecurity threats",
          "HMI system which will be compatible with the existing control panels",
        ],
      },
    ],
  },

  "gas-detection-system": {
    body: [
      "SMEC is a leading provider of innovative drilling solutions and technologies for the oil and gas industry. With a commitment to safety and efficiency, our Gas detection system for Drilling Mud Circulation system is a game-changer in gas detection and monitoring, ensuring a secure drilling environment while optimizing costs.",
    ],
    sections: [
      {
        heading: "Why SMEC?",
        items: [
          "Cost effective solutions custom made to meet your requirements",
          "Integrate multiple systems as per your choice",
          "Modern Digital Design",
          "Easy to assemble and start operation",
          "Safety and security features for secure operation",
        ],
      },
      {
        heading: "Improved operational safety",
        items: [
          "IECEX, Atex certification meets the certification needs in virtually every location",
          "Accurate and consistent gas readings are critical in evaluating potential problems",
          "H2S extracted from the mud delivers the earliest warning of potential hazards",
          "Safety Isolators",
        ],
      },
      {
        heading: "Flexible installation and connectivity",
        items: [
          "4-20mA analogue outputs for standard sensor data and system status",
          "Optional Data Connectivity",
        ],
      },
      {
        heading: "Highly reliable",
        items: [
          "Sample flow control for consistent sample readings",
          "Agitator maintains consistent gas extraction",
          "Digital controller-based System with advanced processor",
        ],
      },
      {
        heading: "Low maintenance",
        items: [
          "Automatic sample line blockage clearing",
          "Electrochemical H2S sensor",
          "Remote Connectivity Option",
          "Infrared sensor for Total Gas",
        ],
      },
    ],
    specs: {
      heading: "Certifications",
      rows: [
        { label: "Sensors", value: "ATEX Class 1" },
        { label: "Purge System", value: "Atex Zone 1 / Zone 2" },
      ],
    },
  },
};

export const productDetail = (slug: string) => productDetails[slug];
