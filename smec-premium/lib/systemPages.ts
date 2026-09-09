/**
 * The six systems the live site lists in its product menu but that the
 * homepage data set never carried: VFD Houses, SCR Houses, RPD System, Load
 * Monitoring System, PAGA System and Battery Charger.
 *
 * Copy is taken from the matching page on smecoilandgas.com. Two consistent
 * edits, the same ones `lib/productDetails.ts` makes: straplines are set in
 * sentence case, and lines the source splits across two rows for layout are
 * rejoined into the single sentence they were written as.
 *
 * Where the live page has no photograph of its own, `image` is omitted and
 * the page renders its specification in place of a picture.
 */

import type { ProductDetailContent } from '@/lib/productDetails';
import { SITE } from '@/lib/siteData';

export type SystemPage = ProductDetailContent & {
  slug: string;
  title: string;
  href: string;
  image?: string;
  width?: number;
  height?: number;
  /** Sits under the title on the catalogue index. */
  tagline: string;
};

export const systemPages: SystemPage[] = [
  {
    slug: 'vfd-houses',
    title: 'VFD Houses',
    href: `${SITE.url}/vfd-houses`,
    image: '/images/Power-House-SMEC.png',
    width: 879,
    height: 527,
    tagline: 'Variable frequency drive houses',
    subtitle: 'Delivering customized turnkey solutions for your power requirements',
    body: [
      'VFD power houses are custom designed with the highest quality material combined with the latest generator and superior AC drive technology and controls. Our VFD power houses are designed to deliver reliable performance in demanding drilling environments. SMEC designed VFD house is incorporated with all the necessary arrangements for the requisite power solutions required for AC drives, MCC, control system components, all the hardware required to generate and distribute power for the available equipment on the rig, VFD control cubicles and other instruments that support the system are present in VFD House / System. The system operates within the range of 380 V to 600 V AC.',
      'The customization of the systems for designing shall be undertaken with the customer input for completing a user-friendly system that can be made in a scalable architecture. We also support for optimization of user requirements in respect to distribution panels, orientation and handling capability viz. top lifted, skidded, or trailer mounted as per the drilling contractor’s site layout and transportation methodology. The system offers superior performance and control for drilling operations with optimal monitoring systems.',
    ],
    sections: [
      {
        heading: 'Why SMEC?',
        items: [
          'Advanced AC variable frequency drives (VFD) with integral dV/dT filters for compatibility with draw works, top drive and mud pumps',
          'Generator controls for automatic breaker closing synchronization and load sharing',
          'Programmable Logic Controllers (PLCs) and communication networks for ease of operation',
          'Formed wall construction with insulation in walls, ceiling, and under skid',
          'Variety of transportation characteristics (skid mounted, top lifted, or trailer mounted)',
          'Covered and protected subfloor wiring with removable plates and rubber matting',
          'HVAC systems rated and designed for 100% sensible heat loads',
          'Greater dynamic braking and rectifier capacity for longevity',
          'Includes remote input/output boxes and critical sensors',
          'Two personnel doors with convenient, foldable steps',
          'Porch mounted equipment includes power and lighting transformers, VFD dynamic braking resistors',
          'Streamlines energy delegation and conversion for reliable service',
        ],
      },
    ],
    specs: {
      heading: 'Operating range',
      rows: [{ label: 'System voltage', value: '380 V to 600 V AC' }],
    },
  },

  {
    slug: 'scr-houses',
    title: 'SCR Houses',
    href: `${SITE.url}/scr-houses`,
    image: '/images/Power-House-SMEC.png',
    width: 879,
    height: 527,
    tagline: 'Silicon controlled rectifier houses',
    subtitle: 'Delivering customized turnkey solutions for your power requirements',
    body: [
      'The Silicon Controlled Rectifier (SCR) House or System is one of the key setups on a rig or facility irrespective of if it is a floater or onshore rig. SMEC has been instrumental in giving support for new, retrofit and replacement of SCR House / SCR System for various customers in the oil and gas industry.',
      'Functional components such as motor control centers, engine and generator controls, SCR control cubicles and other instruments that support the system are present in SCR House / System. The system operates within the range of 600 V to 1200 V DC.',
      'State-of-the-art control systems developed by us are based on the established and well proven technology and designs with respect to modern hybrid / digital technology.',
    ],
    sections: [
      {
        heading: 'Why SMEC?',
        items: [
          'Cost effective solutions custom made to meet your requirements',
          'Integrate multiple systems as per your choice',
          'Modern digital design',
          'Swift generator controls with automatic operations and load sharing',
          'Efficient energy consumption due to high power',
          'Precise speed regulation over a wider speed range',
          'Full torque at zero speed',
          'Regenerative braking for safe and efficient control of drawworks',
          'For construction of walls, ceilings and under skid we have various materials and combinations to choose from to meet site requirements',
          'Different mounts for transportation',
          'Easy to assemble and start operation',
          'Perfect HVAC systems to manage heat load',
          'Retractable entries and openings as per size and requirement',
          'Safety and security features for secure operation',
          'Starter panels, MCC panels, diodes, power management units etc. up to any rating as per the safety standards',
        ],
      },
    ],
    specs: {
      heading: 'Operating range',
      rows: [{ label: 'System voltage', value: '600 V to 1200 V DC' }],
    },
  },

  {
    slug: 'rpd-system',
    title: 'RPD System',
    href: `${SITE.url}/rpd-system`,
    image: '/images/RPD-System-Jacking-Control-System-768x460.png',
    width: 768,
    height: 460,
    tagline: 'Rack phase differential monitoring',
    subtitle: 'Precise control for jack-up rigs',
    body: [
      'RPD System is a Rack Phase Differential monitoring system used in a jack-up rig for precise recording of rack phase differences for all three legs of the jack-up rig. It gives accurate information of electronic and mechanical measurements to the operator for a controlled operation. It helps to avoid leg over stresses during the jacking process.',
      'Among the three legs of a jack-up rig each individual leg consists of three daisy wheel sensors for each chord. This adds to a total of nine for a single jack-up rig.',
    ],
    sections: [
      {
        heading: 'Why SMEC?',
        items: [
          'Avoids leg over stresses',
          'Speeds up deployment and recovery safely',
          'Eliminates risks of damage',
          'HMI for easy monitoring and control operation',
          'Graphical representations with precise indication and numerical values',
          'Alarm information can be generated',
          'Data can be recovered from trends',
          'New, retrofit or repair can be done',
          'Manufactured and commissioned for easy operations',
          'Automation control systems installed for smooth operations',
          'Individual motors working in required torque settings',
          'IO points and remote IO racks',
        ],
      },
    ],
    specs: {
      heading: 'Sensing',
      rows: [
        { label: 'Legs monitored', value: 'Three' },
        { label: 'Sensors per leg', value: 'Three daisy wheel sensors, one per chord' },
        { label: 'Sensors per rig', value: 'Nine' },
      ],
    },
  },

  {
    slug: 'load-monitoring-system',
    title: 'Load Monitoring System',
    href: `${SITE.url}/load-monitoring-system`,
    tagline: 'Load monitoring for lifting operations',
    subtitle: 'Precise monitoring and controlling for jack-up rigs',
    body: [
      'Load Monitoring System is basically a touch screen display with graphical representation. It helps to monitor the crane operations — the hook load, operating radius and duty. The display will have various unit indications such as tonne, lbs, feet and meters.',
      'The tension on lines and hooks are displayed in real time in a software. It also delivers an alarm with display indication and sound to warn the operators in case of loads and of any dangerous imbalance. A protective casing for the safety of the touch panel is also provided.',
    ],
    sections: [
      {
        heading: 'Why SMEC?',
        items: [
          'Simple interface',
          'Precise indication',
          'Angle inclination',
          'Touch pad that is portable',
          'Safety casing',
          'Overturning / tipping',
          'Additional communication ports',
          'Windows and Android platform available',
          'Graphical representation',
          'Modification based on customer requirements',
        ],
      },
    ],
    specs: {
      heading: 'Readout',
      rows: [
        { label: 'Monitored', value: 'Hook load, operating radius and duty' },
        { label: 'Units', value: 'Tonne, lbs, feet, meters' },
        { label: 'Platforms', value: 'Windows and Android' },
      ],
    },
  },

  {
    slug: 'paga-system',
    title: 'PAGA System',
    href: `${SITE.url}/paga-system`,
    tagline: 'Public address and general alarm',
    subtitle: 'Customized solutions for safety communication',
    body: [
      'The PAGA system that SMEC offers is custom designed for safety communications in high integrity Public Address and General Alarm. The system is specially used in petrochemical industry sites such as drilling rigs, offshore platforms, refineries, natural gas, thermal power, nuclear power, metallurgy and other fields.',
    ],
    sections: [
      {
        heading: 'Components',
        items: [
          'Central processor unit',
          'Access panels',
          'Amplifiers',
          'Speakers',
          'Beacons',
          'Telephone hoods',
        ],
      },
      {
        heading: 'Why SMEC?',
        items: [
          'Suitable for harsh environments',
          'Extreme temperature',
          'Humidity',
          'Can withstand vibrations',
          'Fire resistant',
          'Highly reliable system',
          'Redundant power supplies',
          'Backup control units',
          'ATEX and IECEx certified',
        ],
      },
    ],
  },

  {
    slug: 'battery-charger',
    title: 'Battery Charger',
    href: `${SITE.url}/battery-charger`,
    tagline: 'Industrial battery charging systems',
    subtitle: 'Suitable for all emergency power requirements in harsh environment',
    body: [
      'A general-purpose fully automatic battery charger / rectifier, converting AC to DC ranging from 110 V – 415 V AC to 12 V / 24 V / 48 V DC (considering the purpose and client requirements as per standards). Can be used for different battery types. Protection against short circuits, overload and high temperature.',
    ],
    sections: [
      {
        heading: 'Why SMEC?',
        items: [
          'Fully automatic three stage charge characteristic',
          'Suitable for different battery types',
          'Protection against short circuit, overload and high temperature',
          'Forced air cooling for harsh environments',
          'LED display and read-out',
          'Galvanic isolation',
        ],
      },
    ],
    specs: {
      heading: 'Specifications',
      rows: [
        { label: 'Nominal output voltage', value: '12 / 24 / 48 V DC' },
        { label: 'Total charge current', value: '10 / 20 / 40 / 100 A' },
        { label: 'Number of battery outlets', value: '1 No.' },
        { label: 'Battery capacity range', value: '200 – 1000 Ah' },
        { label: 'Nominal input voltage', value: '110 / 230 / 415 V AC 50/60 Hz' },
        { label: 'Input voltage range', value: '+10% / −10%' },
        { label: 'Power supply mode', value: 'Yes' },
        { label: 'Display / read-out', value: 'LED display' },
        { label: 'Galvanic isolation', value: 'Yes' },
        { label: 'Weight', value: '6 – 15 kg' },
        { label: 'Charge characteristic', value: '3 stage charger' },
        { label: 'Charge current bulk', value: '0 – 100 A (as per ratings)' },
        { label: 'Charge voltage absorption', value: '28.5 V' },
        { label: 'Absorption time', value: '1 – 2 hours' },
        { label: 'Charge voltage float', value: '26.5 V' },
        { label: 'Temperature sensor', value: 'Optional' },
        { label: 'DC voltage compensation', value: 'Optional' },
        { label: 'Full load consumption', value: 'As per ratings' },
        { label: 'Current control function', value: 'Yes' },
        { label: 'Temperature range', value: '0 – 55 °C' },
        { label: 'Cooling', value: 'Forced air cooling' },
        { label: 'Protection degree', value: 'IP 23' },
        {
          label: 'Protections',
          value: 'Over voltage, over current, over load, over temperature, short circuit',
        },
      ],
    },
  },
];

export const systemPage = (slug: string) => systemPages.find((page) => page.slug === slug);
