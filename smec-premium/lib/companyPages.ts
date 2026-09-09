/**
 * Body content for the company pages, taken from the matching pages on
 * smecoilandgas.com. Wording is the site's own; headings are set in sentence
 * case to match the rest of this build, and share widgets, download buttons
 * and repeated section titles are dropped.
 *
 * The contact page is not here — it is composed from the addresses and
 * numbers already in `lib/siteData.ts`.
 */

export type PageSection =
  /** Paragraphs, optionally under a heading. */
  | { t: 'prose'; heading?: string; body: string[] }
  /** A ruled list of term / description pairs. */
  | { t: 'points'; heading: string; intro?: string; items: { k: string; v?: string }[] }
  /** Short word list rendered as a row of cards. */
  | { t: 'pillars'; heading: string; items: string[] }
  /** Disclosure list. */
  | { t: 'faq'; heading: string; items: { q: string; a: string[]; list?: string[] }[] };

export type CompanyPage = {
  slug: string;
  num: string;
  kicker: string;
  title: string;
  lead: string;
  metaTitle: string;
  metaDescription: string;
  image?: string;
  imageAlt?: string;
  sections: PageSection[];
};

export const companyPages: CompanyPage[] = [
  /* ------------------------------------------------------------- about */
  {
    slug: 'about-us',
    num: '01',
    kicker: 'About SMEC',
    title: 'Two decades of engineering, under one roof.',
    lead: 'Transforming the oil and gas landscape with innovative, safe, and sustainable solutions.',
    metaTitle: 'About Us — SMEC Oil & Gas',
    metaDescription:
      'SMEC is a multinational EPC organisation delivering electrical, controls, instrumentation, mechanical and hydraulics engineering to the oil and gas industry.',
    image: '/images/scaffold/SCAFFOLD-who-we-are-crew.jpg',
    imageAlt: 'Rig crew in protective equipment at work',
    sections: [
      {
        t: 'prose',
        body: [
          'We introduce SMEC as a multinational EPC organisation, globally recognized for its distinctive services specifically in the electrical, controls, instrumentation, mechanical and hydraulics sectors. SMEC has over two decades of service history, serving various organizations of different verticals such as oil and gas, marine, defence, and industries.',
          'SMEC is recognized for its unique solutions, which are tailor-made for each individual system based on the purpose it serves and the area it is being used in. SMEC’s facilities are equipped with machinery and highly skilled professionals who are efficient enough to deliver the services within the committed time without compromising the quality.',
          'SMEC’s successful global presence was achieved by enhancing its capabilities as a one-stop solution to meet total client requirements. Established in 2001 and ever since our team of experts has grown, our area of expertise has expanded, and the value of our service is recognized worldwide. Our precise, innovative and effective use of the latest technologies has helped us to produce one of the most eminent facilities and products.',
        ],
      },
      {
        t: 'points',
        heading: 'Mission and vision',
        items: [
          {
            k: 'Our mission',
            v: 'To deliver cutting-edge automation solutions that enhance the performance and safety of oil and gas operations. We are dedicated to fostering innovation and sustainability in every project we undertake, empowering our clients to achieve their goals while minimizing their environmental impact. Through collaboration, expertise, and a commitment to excellence, we strive to set new industry standards and contribute to a sustainable energy future.',
          },
          {
            k: 'Our vision',
            v: 'At SMEC, we aspire to be the leading provider of innovative automation solutions in the oil and gas industry. Our commitment to driving efficiency and sustainability positions us at the forefront of industry advancements, paving the way for a greener future. Together, we aim to transform challenges into opportunities, ensuring safe and reliable operations while contributing to a sustainable energy landscape.',
          },
        ],
      },
      {
        t: 'pillars',
        heading: 'Our strength',
        items: ['Reliable', 'Secured', 'Motivating', 'Trustworthy', 'Dynamic'],
      },
      {
        t: 'points',
        heading: 'The divisions behind an oil & gas project',
        intro:
          'SMEC Group is a global engineering and technology company delivering automation, electrical, instrumentation, hydraulics, and digital systems to the oil & gas, marine, industrial, and defence sectors. Established in India with a presence across UAE (Abu Dhabi), Singapore, and the GCC, SMEC has executed 10,000+ projects in 25+ countries.',
        items: [
          {
            k: 'SMEC Automation Pvt. Ltd — India',
            v: 'Core design, manufacturing and service centre for automation and electrical systems',
          },
          {
            k: 'SMEC Oil & Gas Solutions LLC — Abu Dhabi',
            v: 'Regional execution hub for GCC and global energy projects',
          },
          { k: 'SMEC Marine Solutions LLC — UAE', v: 'Marine automation and retrofits' },
          {
            k: 'SMEC Technologies — India',
            v: 'Digital platforms, IIoT and asset intelligence (NexWave, ProSet360, NexVerse)',
          },
          {
            k: 'SMECLabs — India',
            v: 'Training and upskilling for industrial automation and oilfield systems',
          },
        ],
      },
      {
        t: 'faq',
        heading: 'Working with SMEC',
        items: [
          {
            q: 'Where are SMEC’s oil & gas operations based?',
            a: [
              'We operate from two strategic hubs: India (Kochi and Mumbai) for engineering design, manufacturing and R&D, and Abu Dhabi (UAE) for regional execution, service response and client coordination.',
              'This dual presence enables global coverage with fast response and localized execution across UAE, Oman, Saudi Arabia, Qatar, and international offshore projects.',
            ],
          },
          {
            q: 'What services does SMEC provide for the oil & gas industry?',
            a: [
              'SMEC delivers end-to-end automation and electrical systems across upstream, midstream, and downstream operations:',
            ],
            list: [
              'Rig control and power management (SCR, PMS, VFD)',
              'PLC / SCADA-based plant automation',
              'BOP and well-control systems',
              'ESD and safety systems',
              'Pipeline automation and SCADA modernization',
              'Compressor and pump station control',
              'Refinery control and safety integration',
              'Flare boom ignition and gas monitoring systems',
              'Energy efficiency audits and digital retrofits',
              'Predictive maintenance through NexWave and ProSet360',
              'Digital Twin and condition-based monitoring',
            ],
          },
          {
            q: 'Do you offer turnkey project execution?',
            a: [
              'Yes. SMEC provides complete turnkey solutions, including design, panel fabrication, installation, commissioning, testing, and maintenance. We handle projects from concept to commissioning, ensuring zero vendor handoffs and maximum reliability.',
            ],
          },
          {
            q: 'Can SMEC upgrade or retrofit existing control systems?',
            a: [
              'Absolutely. SMEC specializes in retrofit, migration, and modernization of legacy systems, including Hill Graham, Siemens, ABB, Allen-Bradley and Honeywell platforms, and obsolete SCR, MCC and PLC/SCADA systems. We upgrade them into digitally connected, real-time systems with minimal downtime.',
            ],
          },
          {
            q: 'What digital technologies does SMEC offer?',
            a: [
              'We have developed a proprietary Digital Energy Suite 2025+, combining AI, IoT, and Digital Twin capabilities:',
            ],
            list: [
              'NexWave — real-time monitoring and predictive diagnostics',
              'NexVerse — Digital Twin platform for simulation and lifecycle optimization',
              'ProSet360 — CMMS-based asset intelligence and maintenance management',
            ],
          },
          {
            q: 'Which companies has SMEC supported in oil & gas?',
            a: [
              'SMEC has executed projects for leading global and regional clients, including ONGC, BPCL, Shelf Drilling, ADES, Foresight Group and several EPC contractors in the GCC and Asia-Pacific.',
            ],
          },
          {
            q: 'What regions does SMEC serve?',
            a: [
              'With India as our engineering base and Abu Dhabi as our regional hub, we serve clients in:',
            ],
            list: [
              'UAE — ADNOC, EPC contractors, offshore rigs',
              'Oman, Saudi Arabia, Qatar — refinery and pipeline modernization',
              'India — onshore exploration and refinery automation',
              'Global — project exports and digital platform support',
            ],
          },
          {
            q: 'How quickly can SMEC respond?',
            a: ['Our teams are available 24/7 for urgent technical support and commissioning.'],
            list: [
              'UAE and GCC — 12 to 24 hours on-site response',
              'India — 24 to 48 hours',
              'International projects — remote assistance within hours, site mobilization within 72 hours',
            ],
          },
          {
            q: 'Can we source electrical & automation spares from SMEC?',
            a: ['Yes. SMEC’s Procurement-as-a-Service (PaaS) division supplies:'],
            list: [
              'OEM parts and retrofit kits (Schneider, Emerson, Phoenix Contact, Honeywell)',
              'System upgrade kits and enclosures',
              'Retrofit consultation and installation packages',
            ],
          },
          {
            q: 'Does SMEC provide training for client teams?',
            a: [
              'Yes. Through SMECLabs we offer specialized oil & gas automation and safety system training, including PLC programming, SCADA integration, and maintenance practices — both on-site and at our training centres in India.',
            ],
          },
          {
            q: 'What certifications does SMEC hold?',
            a: ['SMEC Group operates under the following international certifications:'],
            list: [
              'ISO 9001 — Quality Management',
              'ISO 14001 — Environmental Management',
              'ISO 45001 — Occupational Health & Safety',
            ],
          },
          {
            q: 'How does SMEC ensure reliability and safety?',
            a: [
              'All systems are engineered with fail-safe logic, redundancy design, and real-time diagnostics, ensuring zero-compromise reliability — tested at our FAT centres in India and validated on-site during commissioning.',
            ],
          },
          {
            q: 'Why choose SMEC for oil & gas automation?',
            a: [],
            list: [
              'Dual operational hubs in India and Abu Dhabi for global coverage',
              'Two decades of multidisciplinary engineering expertise',
              'In-house design, manufacturing and field execution',
              'Proprietary digital suite (NexWave, NexVerse, ProSet360)',
              'Rapid mobilization across GCC and Asia',
              'Proven reliability in harsh environments',
            ],
          },
        ],
      },
    ],
  },

  /* -------------------------------------------------------- solutions */
  {
    slug: 'solutions-and-services',
    num: '02',
    kicker: 'Solutions & Services',
    title: 'From concept to commissioning.',
    lead: 'Complete solutions and services for the oil and gas industry — boosting performance, safety, and sustainability.',
    metaTitle: 'Solutions and Services — SMEC Oil & Gas',
    metaDescription:
      'Testing, calibration and certification services plus complete automation and instrumentation solutions, from system design and integration through to commissioning.',
    image: '/images/scaffold/SCAFFOLD-stats-refinery-panorama.jpg',
    imageAlt: 'Refinery at blue hour',
    sections: [
      {
        t: 'prose',
        heading: 'Our services',
        body: [
          'At SMEC Automation, we offer a wide range of testing, calibration, and certification services to ensure the optimal performance and reliability of your electrical and instrumentation systems. Our team of experts is dedicated to delivering precise and efficient solutions tailored to meet the needs of various industries, ensuring compliance with industry standards and enhancing operational efficiency.',
          'We prioritize safety, precision, and compliance, delivering high-quality services that keep your electrical and instrumentation systems operating at their best. Whether it’s testing, calibration, or recertification, our solutions are designed to meet the unique needs of your business.',
        ],
      },
      {
        t: 'points',
        heading: 'Testing, calibration and certification',
        items: [
          {
            k: 'Testing and calibration of electrical instrumentation',
            v: 'Comprehensive testing and calibration for all types of electrical instrumentation, ensuring accurate measurements and reliable system performance.',
          },
          {
            k: 'Measuring equipment calibration',
            v: 'Calibration across a broad range of measuring equipment, ensuring precision and reliability in every reading for both AC and DC systems.',
          },
          {
            k: 'Circuit breaker testing and troubleshooting',
            v: 'Testing and troubleshooting of circuit breakers to identify and resolve issues, ensuring electrical safety and system integrity.',
          },
          {
            k: 'Servicing and recertification',
            v: 'Expert servicing and recertification for all electrical and instrumentation systems, helping you maintain compliance and system reliability.',
          },
          {
            k: 'SCR rack recertification',
            v: 'Specialized recertification for SCR racks, ensuring optimal performance of your SCR systems and extending their operational life.',
          },
          {
            k: 'VFD system recertification',
            v: 'Maintenance and recertification of variable frequency drive systems, enhancing efficiency and ensuring system longevity.',
          },
        ],
      },
      {
        t: 'prose',
        heading: 'Our solutions',
        body: [
          'At SMEC Automation, we provide all-encompassing automation and instrumentation solutions designed to meet the diverse needs of industries. From concept to commissioning, our tailored services are engineered to enhance efficiency, safety, and performance, with an emphasis on cutting-edge technologies and innovative solutions.',
        ],
      },
      {
        t: 'points',
        heading: 'Automation and instrumentation',
        items: [
          {
            k: 'Complete automation & instrumentation systems',
            v: 'Comprehensive solutions covering everything from system design and integration to commissioning, ensuring seamless and reliable operations for your industrial processes.',
          },
          {
            k: 'End-to-end services',
            v: 'Every phase of your project, from basic design and development to final commissioning, handled with expertise and precision — a complete turnkey solution.',
          },
          {
            k: 'Troubleshooting, repair, retrofit and refurbishment',
            v: 'Specialized services for existing systems, helping you extend the life of your equipment and improve overall efficiency and performance.',
          },
          {
            k: 'Tailored IoT / cloud solutions',
            v: 'Customized IoT and cloud-based solutions enabling remote monitoring, data analytics and enhanced connectivity, offering real-time insight and control over your operations.',
          },
          {
            k: 'Corporate training in industrial technologies',
            v: 'Comprehensive training programmes designed to upskill your workforce in the latest industrial technologies, so your team can operate and maintain advanced systems with confidence.',
          },
        ],
      },
    ],
  },

  /* -------------------------------------------------------------- R&D */
  {
    slug: 'research-and-developement',
    num: '03',
    kicker: 'Research & Development',
    title: 'The engine powering innovation.',
    lead: 'Developing cutting-edge automation technologies to optimise oil and gas operations.',
    metaTitle: 'Research & Development — SMEC Oil & Gas',
    metaDescription:
      'SMEC’s R&D department develops automation technology for the oil and gas industry, including the ADAM-Edge IoT gateway and edge processing device.',
    image: '/images/SMECoilandhasbanner-3.webp',
    imageAlt: 'SMEC research and development',
    sections: [
      {
        t: 'prose',
        body: [
          'At SMEC Automation, our R&D department is the engine powering innovation, pushing the boundaries of what’s possible in industrial automation, particularly in the oil and gas industry. We are committed to creating cutting-edge solutions that not only optimize performance but also drive sustainability in this ever-evolving sector.',
        ],
      },
      {
        t: 'prose',
        heading: 'ADAM-Edge',
        body: [
          'The ADAM-Edge IoT Gateway and Edge Processing device is engineered to accept up to 16 universal inputs and outputs, letting you collect data from various equipment sources effortlessly. Equipped with robust processing capabilities, it doesn’t just collect data; it performs complex calculations right at the edge, ensuring swift decision-making without overwhelming your network bandwidth. With configurable bandwidth options you have full control over cost optimization while keeping data noise to a minimum.',
          'Security is paramount in today’s interconnected world, and the ADAM-Edge prioritizes your data integrity. Featuring encrypted and secured communication channels, your critical information remains protected against unauthorized access. It integrates with industry-standard communication protocols, ensuring interoperability with your existing infrastructure, and its power-efficient design minimizes energy consumption, reducing operational costs and environmental impact.',
          'What truly sets the ADAM-Edge apart is its rugged reliability. Built to withstand harsh environmental conditions such as temperature variations, humidity, dust, and vibration, it thrives where others falter, ensuring uninterrupted performance in even the toughest industrial settings.',
        ],
      },
      {
        t: 'points',
        heading: 'The digital energy suite',
        intro:
          'A proprietary suite combining AI, IoT and Digital Twin capability, developed by the R&D wing and deployed across SMEC projects.',
        items: [
          { k: 'NexWave', v: 'Real-time monitoring and predictive diagnostics' },
          { k: 'NexVerse', v: 'Digital Twin platform for simulation and lifecycle optimization' },
          { k: 'ProSet360', v: 'CMMS-based asset intelligence and maintenance management' },
          { k: 'ADAM-Edge', v: 'IoT gateway and edge processing, up to 16 universal I/O' },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------- careers */
  {
    slug: 'careers',
    num: '04',
    kicker: 'Careers',
    title: 'Build the future with SMEC.',
    lead: 'Join SMEC Automation — innovate, grow, and shape the future of the oil and gas industry.',
    metaTitle: 'Careers — SMEC Oil & Gas',
    metaDescription:
      'Join a global engineering organisation of over 500 employees delivering turnkey automation and electrical systems for onshore and offshore operations.',
    image: '/images/scaffold/SCAFFOLD-who-we-are-crew.jpg',
    imageAlt: 'Rig crew in protective equipment at work',
    sections: [
      {
        t: 'prose',
        heading: 'Our capital',
        body: [
          'Today SMEC has employed over 500 employees across the globe.',
          'We are having highly experienced engineers, who have earned the respect and trust with their years of service with major OEMs. Highly skilled professionals who are a rare blend of various prominent skills have developed facilities to manufacture our best products.',
          'Our engineers with the R&D wing are engaged in developing future technologies which can be readily installed for your hassle-free operations. Being an EPC organisation, it is very important for us to develop various teams of engineering professionals who are experts in handling turnkey projects. Our recruits are handpicked and trained to handle crucial situations. We take pride to have each one of them on our team as they are the best we can ever work with.',
        ],
      },
      {
        t: 'points',
        heading: 'Where you would work',
        items: [
          {
            k: 'Kochi & Mumbai, India',
            v: 'Engineering design, manufacturing and R&D — the group’s core design and service centre',
          },
          {
            k: 'Abu Dhabi, UAE',
            v: 'Regional execution, service response and client coordination across the GCC',
          },
          {
            k: 'On site',
            v: 'Installation, commissioning and field service on onshore and offshore assets worldwide',
          },
        ],
      },
    ],
  },

  /* --------------------------------------------------- sustainability */
  {
    slug: 'sustainability',
    num: '05',
    kicker: 'Sustainability',
    title: 'Engineering a more responsible energy future.',
    lead: 'Innovating sustainability through automation and software solutions.',
    metaTitle: 'Sustainability — SMEC Oil & Gas',
    metaDescription:
      'SMEC Automation’s sustainable energy initiative: reducing carbon footprint through automation, energy optimization and advanced software solutions.',
    image: '/images/SMEoilandgas-green-3.webp',
    imageAlt: 'SMEC promoting sustainable energy awareness',
    sections: [
      {
        t: 'prose',
        body: [
          'In today’s fast-paced business landscape, sustainability has evolved from a trend to an essential strategy for success. At SMEC Automation Pvt Ltd, we are dedicated to reducing our carbon footprint and promoting eco-friendly practices through cutting-edge automation processes and advanced software solutions. Our focus on optimizing energy consumption and enhancing operational efficiency not only aids in carbon emission control but also drives significant revenue growth for our clients.',
        ],
      },
      {
        t: 'prose',
        heading: 'Automation and software for carbon emission control',
        body: [
          'The global commitment to combat climate change, exemplified by the Paris Agreement of 2015, requires drastic reductions in carbon emissions to limit global warming to below 2 degrees Celsius. Achieving net zero emissions by mid-century is a priority for industries worldwide. At SMEC Automation, we harness the power of technology to empower organizations in this vital mission.',
          'Our automation solutions are designed to seamlessly integrate with existing systems, enabling organizations to monitor, manage, and reduce energy consumption across various sectors. By incorporating advanced analytics and Internet of Things platforms, we facilitate real-time tracking of energy usage, empowering organizations to identify inefficiencies and implement corrective measures swiftly. Additionally, our machine learning algorithms predict and optimize energy needs, minimizing waste and lowering carbon emissions.',
          'Our robust supply chain management software further enhances this capability by tracking and reducing emissions throughout the entire supply chain. By analyzing data on transportation, manufacturing, and distribution, our solutions recommend changes that minimize the carbon footprint of products and services.',
        ],
      },
      {
        t: 'points',
        heading: 'Our solutions for a sustainable future',
        items: [
          {
            k: 'Smart automation & control systems',
            v: 'Automation is key to efficiency. Our smart automation solutions allow industries to streamline their operations while significantly reducing energy consumption — optimizing workflows and minimizing unnecessary energy use.',
          },
          {
            k: 'Energy monitoring & management systems',
            v: 'IoT-enabled smart technologies, real-time monitoring and data-driven decision-making tools that enhance energy use across oil and gas, marine and manufacturing.',
          },
          {
            k: 'Advanced process control (APC)',
            v: 'For industries like oil and gas, APC can lead to a 5–10% increase in overall efficiency, according to the IEA. Our APC solutions allow precision control over energy-intensive processes, minimizing waste and maximizing productivity.',
          },
          {
            k: 'Retrofit solutions',
            v: 'Retrofitting existing systems with energy-efficient technologies is one of the most impactful ways to achieve sustainability — modernizing operations without the need for costly replacements, reducing energy consumption and extending the life of critical infrastructure.',
          },
        ],
      },
      {
        t: 'points',
        heading: 'Campaigns and awareness initiatives',
        items: [
          {
            k: 'Green Challenge Month',
            v: 'A month-long challenge encouraging employees to adopt sustainable practices, such as reducing energy consumption and using public transportation.',
          },
          {
            k: 'Workshops and webinars',
            v: 'Regular sessions featuring industry experts discussing sustainability practices, the benefits of automation in reducing emissions, and how our software solutions enhance operational efficiency.',
          },
          {
            k: 'Community partnerships',
            v: 'Collaborations with local environmental organizations supporting tree-planting drives, community clean-up events, and educational programmes on sustainability.',
          },
          {
            k: 'Green Ambassadors programme',
            v: 'Employees volunteer as Green Ambassadors to promote sustainable practices within the workplace, leading initiatives and encouraging their peers.',
          },
        ],
      },
      {
        t: 'prose',
        heading: 'The SMEC difference',
        body: [
          'What sets SMEC apart is our holistic approach to sustainability. We understand that each industry and operation is unique, and we tailor our solutions to meet specific needs — whether it’s optimizing energy use on offshore oil rigs, enhancing vessel operations in the marine industry, or improving energy efficiency in industrial plants.',
          'Industries today must embrace sustainability not as an option but as a core strategy for long-term success. By choosing SMEC, you are not just investing in energy optimization — you are investing in the future of your business and the planet.',
        ],
      },
    ],
  },

  /* --------------------------------------------------------- privacy */
  {
    slug: 'privacy-policy',
    num: '—',
    kicker: 'Legal',
    title: 'Privacy policy',
    lead: 'SMEC Automation Pvt Ltd is committed to protecting the privacy and security of personal data. Last updated 28 March 2026.',
    metaTitle: 'Privacy Policy — SMEC Oil & Gas',
    metaDescription:
      'How SMEC Automation Pvt Ltd collects, uses, discloses and safeguards your information.',
    sections: [
      {
        t: 'prose',
        body: [
          'SMEC Automation Pvt Ltd (“SMEC”, “we”, “our”, or “us”) is committed to protecting the privacy and security of personal data. This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website and interact with our services.',
          'By accessing or using the site, you acknowledge and agree to the practices described in this privacy policy.',
        ],
      },
      {
        t: 'points',
        heading: '1. Information we collect',
        items: [
          {
            k: 'Personal information',
            v: 'Full name; email address; phone number; company name and designation; project requirements or enquiry details; any additional information submitted through forms or communications.',
          },
          {
            k: 'Automatically collected',
            v: 'IP address and approximate location; device type, operating system and browser details; pages visited, time spent and navigation patterns; referring URLs and campaign tracking data.',
          },
          {
            k: 'Cookies and tracking',
            v: 'We use cookies and similar technologies to ensure proper website functionality, improve user experience, analyze traffic and performance, and measure advertising effectiveness. You may control or disable cookies through your browser settings.',
          },
        ],
      },
      {
        t: 'points',
        heading: '2. How we use your information',
        items: [
          { k: 'Enquiries', v: 'Responding to enquiries, RFQs and support requests' },
          { k: 'Information', v: 'Providing information about our services and solutions' },
          { k: 'Performance', v: 'Improving website performance and user experience' },
          { k: 'Analytics', v: 'Conducting analytics and campaign performance tracking' },
          { k: 'Updates', v: 'Sending updates, newsletters or relevant communications' },
          { k: 'Security', v: 'Ensuring website security and preventing fraud' },
          { k: 'Compliance', v: 'Complying with legal and regulatory obligations' },
        ],
      },
      {
        t: 'prose',
        heading: '3. Marketing and communication',
        body: [
          'We may contact you by email, phone or messaging platforms such as WhatsApp, in order to respond to your enquiries and share relevant service updates, insights and offerings. You may opt out of marketing communications at any time.',
        ],
      },
      {
        t: 'prose',
        heading: '4. Legal basis for processing',
        body: [
          'Where applicable, we process personal data based on your consent (for example, form submissions), legitimate business interests, contractual necessity, and legal obligations.',
        ],
      },
      {
        t: 'prose',
        heading: '5. Data sharing and disclosure',
        body: [
          'We do not sell or rent personal data. We may share your information with internal SMEC teams and affiliated entities, trusted third-party service providers (hosting, analytics, CRM, marketing tools), and legal or regulatory authorities when required. All third parties are required to maintain confidentiality and data protection standards.',
        ],
      },
      {
        t: 'prose',
        heading: '6. International data transfers',
        body: [
          'As SMEC operates across multiple regions, your data may be processed outside your country of residence. We ensure appropriate safeguards are in place to protect your information.',
        ],
      },
      {
        t: 'prose',
        heading: '7. Data security',
        body: [
          'We implement reasonable technical and organizational measures, including secure server infrastructure, access controls, and monitoring and protection systems. However, no system can guarantee absolute security.',
        ],
      },
      {
        t: 'prose',
        heading: '8. Data retention',
        body: [
          'We retain personal data only for as long as necessary to fulfil business and service purposes, comply with legal obligations, and resolve disputes and enforce agreements.',
        ],
      },
      {
        t: 'prose',
        heading: '9. Your rights',
        body: [
          'Depending on your jurisdiction, you may have the right to access your data, correct inaccurate information, request deletion of your data, withdraw consent, and object to or restrict processing. To exercise these rights, please contact us.',
        ],
      },
      {
        t: 'prose',
        heading: '10. Third-party links',
        body: [
          'Our site may contain links to external websites. We are not responsible for their content or privacy practices.',
        ],
      },
      {
        t: 'prose',
        heading: '11. Children’s privacy',
        body: [
          'Our website is intended for business use and is not directed toward individuals under the age of 18. We do not knowingly collect personal data from minors.',
        ],
      },
      {
        t: 'prose',
        heading: '12. Updates to this policy',
        body: [
          'We may update this privacy policy periodically. Changes will be reflected on this page with an updated “last updated” date.',
        ],
      },
      {
        t: 'prose',
        heading: '13. Contact us',
        body: [
          'For any questions or concerns regarding this privacy policy, contact SMEC Automation Pvt Ltd at info@smecong.com or +91 86060 47714.',
        ],
      },
    ],
  },
];

export const companyPage = (slug: string) => companyPages.find((page) => page.slug === slug);
