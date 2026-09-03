import type { ArticleContent } from "./types";

/** The long-form timeline and market-outlook pieces. */
export const timeline: Record<string, ArticleContent> = {
  "from-seepages-to-sensors-the-complete-timeline-of-oil-gas-firsts-global-india": {
    standfirst: "The complete timeline of oil & gas 'firsts' (global + India).",
    blocks: [
      {
        t: "p",
        text: "The history of the energy sector is not merely a timeline of oil discoveries; it is an evolution of risk management and engineering complexity. Every major “first”, from the first mechanized drill to the first subsea compressor, represents a moment when engineers cracked a systemic challenge: distance, pressure, or hostile environments.",
      },
      {
        t: "p",
        text: "Before AI dashboards, digital twins, and floating production storage units, the world's energy evolution began with a guess, and a hole in the ground. For an industry obsessed with uptime, control, and safety, history reminds us: every “first” was an engineering gamble that reshaped how we power civilization.",
      },
      {
        t: "p",
        text: "This article chronicles the engineering lineage of oil & gas, from seepages to sensors, refineries to real-time monitoring, with two parallel timelines: global milestones and India's milestones. Each “first” is not just a date, it's a blueprint of innovation, risk, and reliability.",
      },
      { t: "h2", text: "Global firsts: from kerosene lamps to global energy grids" },
      { t: "h3", text: "3000 BCE — early uses of oil & bitumen" },
      {
        t: "p",
        text: "Ancient Mesopotamians used natural bitumen for waterproofing, ship caulking, and even mummification (Egypt). The city of Babylon reportedly had asphalt streets and “tar pits” mentioned in the Epic of Gilgamesh. Lesson: hydrocarbons started as materials engineering, not energy.",
      },
      { t: "h3", text: "1846 — first mechanically drilled oil well, Bibi-Heybat, Azerbaijan" },
      {
        t: "p",
        text: "The true technological birth of the industry was not a discovery, but the method: proving that mechanical, repeatable drilling (cable-tool/percussion) was feasible, transitioning oil recovery from shallow pits to deep, commercial targets. Predating Edwin Drake's well by 13 years, Baku's Bibi-Heybat field was drilled using primitive percussion methods, the first engineered extraction system. Impact: introduced drilling as a repeatable mechanical process.",
      },
      { t: "h3", text: "1859 — Drake Well, Pennsylvania, USA" },
      {
        t: "p",
        text: "The Drake Well (69 ft) marked the commercial birth of the modern petroleum industry, the first to produce, store, and distribute oil systematically. Impact: the world's first “proof of concept” for large-scale drilling economics.",
      },
      { t: "h3", text: "1860s–1880s — first modern refineries" },
      {
        t: "p",
        text: "Refineries in Poland, Canada, and the US began distilling kerosene for lamps. Impact: triggered the first global commodity supply chain for energy.",
      },
      { t: "h3", text: "1870 — Standard Oil & integration" },
      {
        t: "p",
        text: "This was the birth of the vertical integration model (exploration, production, refining, distribution). John D. Rockefeller's Standard Oil introduced vertical integration, from well to refinery to retail. This structure dictated the scale of engineering: pipelines and refineries became standardized industrial assets for the first time. Impact: defined the “supermajor” business model still mirrored by ExxonMobil, Shell, and Chevron.",
      },
      { t: "h3", text: "1901 — Spindletop, Texas: the modern gusher" },
      {
        t: "p",
        text: "The Lucas Gusher at Spindletop erupted 100 ft into the air, producing 100,000 barrels per day. The massive gusher proved that oil could be produced at a scale previously unimaginable. It instantly shifted the industry's focus from illumination (kerosene) to mass transportation fuel (gasoline), demanding high-volume pipelines and cracking technologies. Impact: the birth of mass oil culture, mechanized drilling, and automotive expansion.",
      },
      { t: "h3", text: "1911 — dissolution of Standard Oil" },
      {
        t: "p",
        text: "The U.S. Supreme Court ordered the breakup of Standard Oil, paving the way for multiple global majors and standardization of global oil engineering practices. Impact: formalised competition, scale and engineering efficiency across hemispheres.",
      },
      { t: "h3", text: "1930s–40s — Middle East emerges" },
      {
        t: "p",
        text: "Dammam No. 7 (1938): Saudi Arabia's first commercial well. Similar finds in Bahrain, Kuwait, Iraq, Iran turned deserts into the world's energy core. Impact: shifted global energy gravity eastward.",
      },
      { t: "h3", text: "1947 — Kermac 16, Gulf of Mexico: first offshore well out of sight of land" },
      {
        t: "p",
        text: "Built by Kerr-McGee, it proved offshore drilling viability. The pivot from fixed piers to independent, open-water structures. This moment introduced marine engineering, structural dynamics, and weather resilience as core competencies for O&G projects. Impact: offshore engineering was born.",
      },
      { t: "h3", text: "LNG firsts — turning gas into a global commodity" },
      {
        t: "ul",
        items: [
          "1917: first LNG liquefaction experiment, West Virginia, USA.",
          "1959: Methane Pioneer delivers the first transoceanic LNG cargo (Louisiana → UK).",
          "1964: Arzew, Algeria — first full-scale LNG export terminal.",
        ],
      },
      {
        t: "p",
        text: "Impact: transformed gas from a local by-product into a global fuel.",
      },
      { t: "h2", text: "The unsung pioneers" },
      { t: "h3", text: "1949–1951 — Neft Daşları, Caspian Sea: world's first offshore oil city" },
      {
        t: "p",
        text: "Azerbaijan's Neft Daşları (Oil Rocks) featured bridges, platforms, and even apartment blocks in the sea. Azerbaijan constructed the world's first fully permanent offshore “city”, a massive complex of platforms, roads, and housing. It was a Soviet-era marvel of infrastructure, demonstrating that offshore life and operations could be sustained indefinitely, predating much of the North Sea's development. Impact: pioneered the offshore production complex model.",
      },
      { t: "h3", text: "1953 — “Mr. Charlie”, the first mobile offshore rig" },
      {
        t: "p",
        text: "Designed by Shell & Marathon LeTourneau, “Mr. Charlie” revolutionized offshore mobility. This self-elevating jack-up rig revolutionized flexibility. Instead of building fixed platforms, Mr. Charlie proved rigs could be moved, drastically reducing the cost and time of exploratory drilling and opening up global continental shelves. Impact: created the concept of moveable assets for offshore drilling.",
      },
      { t: "h3", text: "1961 — first subsea completion system (Shell, Gulf of Mexico)" },
      {
        t: "p",
        text: "Shell completed a subsea well in the Gulf of Mexico in 1961, marking the beginning of engineered subsea systems.",
      },
      { t: "h3", text: "1970s–80s — North Sea & Alaska" },
      {
        t: "p",
        text: "Developments under extreme weather led to innovations in corrosion protection, control systems, and subsea automation, the birth of reliability engineering. TAPS had to be built across permafrost. The engineering challenge: oil must be transported above freezing point, but the hot pipeline would melt the permafrost, causing it to sink. The solution involved sophisticated heat pipes and supports to dissipate heat into the air, a critical infrastructure “first”.",
      },
      { t: "h3", text: "1980s — the rise of DCS" },
      {
        t: "p",
        text: "While boring on the surface, the widespread adoption of DCS replaced centralized pneumatic control rooms. This was the true genesis of modern industrial automation, allowing for distributed logic, redundancy, and hierarchical control, making today's complex mega-projects possible.",
      },
      { t: "h3", text: "1990s–2000s — subsea systems & deepwater frontiers" },
      {
        t: "p",
        text: "Subsea trees, remotely operated vehicles (ROVs), and fibre-optic telemetry enabled drilling in >1 km depths. Impact: introduced real-time data management underwater, early digitalization.",
      },
      { t: "h3", text: "2000s–present — the digital twin era" },
      {
        t: "p",
        text: "The modern oil & gas industry is defined by intelligent monitoring, AI-based predictive maintenance, and energy transition strategies. Impact: the control room became the command center of decarbonization.",
      },
      { t: "h2", text: "India's strategic firsts: building energy sovereignty" },
      {
        t: "ol",
        items: [
          "1866 — first oil strike near Makum, Assam. Indian rail engineers discovered natural oil seeps during the Makum rail line expansion. Impact: Asia's earliest hydrocarbon exploration.",
          "1889 — Well No. 1, Digboi, India's first commercial well. Drilled 178 ft; produced ~200 gallons/day, Asia's first sustained commercial well. Impact: birth of the Indian upstream sector.",
          "1901 — Digboi Refinery, Asia's first refinery. Commissioned by Assam Oil Co., still operational today, one of the world's oldest running refineries. Impact: heritage of continuity; proof of system longevity.",
          "1956 — creation of ONGC. Established to nationalise exploration and build self-reliance. Impact: from colonial concession to indigenous capability.",
          "1962–1964 — Naharkatiya–Noonmati–Barauni pipeline. India's first cross-state crude pipeline (~1,150 km). Impact: laid the foundation of the national grid.",
          "1962 — Guwahati Refinery (public sector first). Commissioned by Indian Oil; start of the PSU refining era.",
          "1973–74 — Sagar Samrat & Bombay High discovery. India's offshore revolution. Bombay High became one of Asia's most productive fields. This discovery, using the nation's first jack-up rig, fundamentally transformed India's production profile and shifted exploration capital expenditure from onshore to high-potential offshore fields, securing energy stability.",
          "1987 — HVJ pipeline, India's first cross-country gas pipeline. The Hazira–Vijaipur–Jagdishpur line created the first cross-country gas backbone, integrating gas into the national energy mix and enabling the growth of fertilizer, power, and later, City Gas Distribution networks. Impact: sparked the domestic natural gas economy.",
          "2004 — Dahej LNG, India's first LNG import terminal. Commissioned by Petronet LNG; gateway to gas-based power and industry. Impact: integration into the global LNG chain.",
          "2010s–present — deepwater (KG-D6), digitalisation & energy transition. Krishna–Godavari Basin introduced subsea control systems, DCS-based production, and remote monitoring, bringing India into the global deepwater league.",
        ],
      },
      { t: "h2", text: "The new frontier: from hydrocarbon extraction to data sovereignty" },
      {
        t: "p",
        text: "The historical “firsts” were about conquering physical frontiers (distance, depth, pressure). The current mandate is about conquering the digital frontier, integrating and protecting the data streams that manage those physical assets.",
      },
      {
        t: "ol",
        items: [
          "The digital divide: a large challenge is the integration of legacy analog assets (30-year-old flow meters, pneumatic valves) with modern IIoT and cloud infrastructure. The engineer's role has shifted to being a translator, ensuring data integrity across technologies separated by decades.",
          "Cybersecurity as operational uptime: protecting the control systems (SCADA, DCS) is no longer solely an IT function; it's a critical operational priority. The consequences of a cyber intrusion are no longer financial data loss but catastrophic physical failure, making control system resilience and network segmentation a strategic engineering investment.",
          "The predictive edge: the ultimate goal of the digital twin framework is shifting CAPEX toward OPEX avoidance. The maturation of Condition-Based Monitoring transforms the purpose of control systems from mere operational supervision into a proactive strategy for maximizing asset life, guaranteeing long-term expenditure control, and optimizing energy consumption.",
        ],
      },
      { t: "h2", text: "The road ahead: reliability as the new frontier" },
      {
        t: "p",
        text: "The next set of “firsts” won't be about who drills deeper, but who connects better:",
      },
      {
        t: "ul",
        items: [
          "Integrated SCADA–IIoT ecosystems",
          "Cyber-secure control rooms",
          "Autonomous rigs and predictive AI",
          "Smart energy twins bridging oil, gas, renewables",
        ],
      },
      {
        t: "p",
        text: "At SMEC, we study these engineering leaps not as history, but as instructions, for reliability, uptime, and the next generation of intelligent systems.",
      },
    ],
  },

  "how-the-middle-east-is-engineering-energy": {
    standfirst: "How the Middle East is engineering energy, 2030–2050.",
    author: "Shiyas",
    date: "27 November 2025",
    blocks: [
      {
        t: "p",
        text: "In the 21st century, the fossil-boom script is no longer the hero's story. Across Saudi Arabia, UAE, Oman, Qatar, Kuwait, and Egypt, a new act unfolds, one powered by vision, not volatility.",
      },
      {
        t: "p",
        text: "These are not “national branding” exercises. They're system rewrites, transforming the Gulf from a barrel-based economy into a brain-based ecosystem.",
      },
      { t: "h2", text: "1. Saudi Arabia — Vision 2030" },
      {
        t: "p",
        text: "Launched in 2016 under Crown Prince Mohammed bin Salman, Vision 2030 is Saudi Arabia's roadmap to move beyond oil dependency while deepening industrial and economic sovereignty.",
      },
      {
        t: "ul",
        items: [
          "50% of power generation from renewables by 2030.",
          "Expansion of gas and hydrogen infrastructure.",
          "Localization across petrochemicals, EPC, manufacturing & digital services.",
          "Giga-projects like NEOM, King Salman Energy Park, and The Rig Project redefining energy and urban ecosystems.",
        ],
      },
      {
        t: "quote",
        text: "Oil built Saudi's balance sheet. Vision 2030 is building its operating system.",
      },
      { t: "h2", text: "2. Oman — Vision 2040, the hydrogen dark horse" },
      {
        t: "p",
        text: "Adopted in 2020, Oman's Vision 2040 balances hydrocarbons with hydrogen diversification.",
      },
      {
        t: "ul",
        items: [
          "Green hydrogen scale-up to 8.5 Mtpa by 2050.",
          "Integrated LNG & gas-to-chemicals systems.",
          "Hybrid energy (gas + solar) power stability.",
          "National Hydrogen Company Hydrom, as a global hub.",
        ],
      },
      { t: "h2", text: "3. United Arab Emirates — Energy Strategy 2050 & Net Zero 2050" },
      {
        t: "p",
        text: "The UAE multi-track strategy is about engineering sustainability — balancing growth and carbon neutrality.",
      },
      {
        t: "ul",
        items: [
          "50% clean energy mix by 2050.",
          "AED 200 billion in renewable investments.",
          "Dubai Clean Energy 2050 — 75% power from clean sources.",
          "ADNOC's XRG investments in low-carbon fuels & AI asset efficiency.",
        ],
      },
      { t: "quote", text: "The UAE isn't racing toward zero, it's engineering it." },
      { t: "h2", text: "4. Qatar — National Vision 2030" },
      {
        t: "p",
        text: "Qatar leverages its LNG dominance to power a sustainable future.",
      },
      {
        t: "ul",
        items: [
          "Expand North Field LNG capacity.",
          "CO₂ management & renewables integration.",
          "Diversify exports via hydrogen and low-carbon chemicals.",
        ],
      },
      { t: "quote", text: "Qatar isn't turning away from LNG — it's decarbonizing it." },
      { t: "h2", text: "5. Kuwait — Vision 2035" },
      {
        t: "p",
        text: "Kuwait's Vision 2035 focused on diversification and private-sector growth.",
      },
      {
        t: "ul",
        items: [
          "Upgrade refining & petrochemicals through KIPIC and KNPC.",
          "Develop industrial cities for clean manufacturing and logistics.",
          "Expand private-sector partnerships in renewables and smart grids.",
          "Build digital-ready infrastructure and enhance regulatory transparency.",
        ],
      },
      { t: "h2", text: "6. Bahrain — Economic Vision 2030" },
      {
        t: "p",
        text: "Launched in 2008, Bahrain's Economic Vision 2030 emphasizes efficiency, inclusivity, and sustainability, making size its advantage.",
      },
      {
        t: "ul",
        items: [
          "Build a competitive private sector with low-carbon industrial reforms.",
          "Modernize gas and power infrastructure for cost-efficient energy.",
          "Drive digital transformation across maritime and manufacturing sectors.",
          "Expand clean-energy pilots under the Bahrain Sustainable Energy Authority.",
        ],
      },
      { t: "h2", text: "7. Egypt — Vision 2030" },
      {
        t: "p",
        text: "Egypt's Vision 2030 builds on geography as strategy, linking Africa's solar belt to Europe's demand corridor.",
      },
      {
        t: "ul",
        items: [
          "42% renewables by 2030.",
          "Expanded LNG terminals & cross-border grid links.",
          "Smart grids, storage & digital reliability systems.",
        ],
      },
      { t: "quote", text: "Egypt is the integration hub of two continents." },
      { t: "h2", text: "The convergence point — five shared rhythms" },
      {
        t: "p",
        text: "Different clocks, same countdown. Every GCC & MENA vision beats to five shared rhythms:",
      },
      {
        t: "ol",
        items: [
          "Diversify beyond hydrocarbons",
          "Localize value and talent",
          "Leverage gas as the transition bridge",
          "Scale renewables + hydrogen",
          "Digitize for reliability and resilience",
        ],
      },
      {
        t: "quote",
        text: "The region is no longer selling energy. It's redefining how energy is made, moved, and maintained.",
      },
      { t: "h2", text: "The engineering reality — where vision meets execution" },
      {
        t: "p",
        text: "For EPCs, OEMs & integrators, these visions are procurement blueprints. The opportunity stack:",
      },
      {
        t: "ul",
        items: [
          "Smart grids & energy storage",
          "Hydrogen & CCUS integration",
          "Refinery & LNG digitalization",
          "Industrial automation & predictive diagnostics",
          "Local manufacturing alliances",
        ],
      },
      { t: "quote", text: "We will build it — but we will build it here." },
      {
        t: "p",
        text: "By 2030, the Middle East could supply 25% of the world's clean hydrogen, triple renewable output, and lead the world in energy reliability engineering. The Gulf once fueled economies. Now, it's fueling the global energy transition itself.",
      },
      { t: "h2", text: "From India's legacy to the Middle East's future" },
      {
        t: "p",
        text: "Born in India, SMEC Automation has spent over two decades powering the heartbeat of the oil & gas industry, from rigs to refineries, from process control to predictive reliability. Now headquartered in Abu Dhabi, we extend that legacy to support the region's boldest energy visions.",
      },
      {
        t: "ul",
        items: [
          "Smart automation & control systems",
          "Electrical & instrumentation retrofits",
          "Fire & gas detection systems",
          "Condition-Based Monitoring (CBM)",
          "Predictive diagnostics & SCADA upgrades",
        ],
      },
      {
        t: "p",
        text: "While nations craft their visions, someone must engineer the systems that make them work. From brownfields to breakthroughs, we're helping operators reimagine reliability.",
      },
      { t: "quote", text: "Oil built the region's wealth. Vision will build its legacy." },
    ],
  },
};
