import type { ArticleContent } from "./types";

/** The systems and reliability engineering pieces. */
export const systems: Record<string, ArticleContent> = {
  "a-technical-deep-dive-into-the-critical-systems-that-define-reliability-in-oil-gas-operations":
    {
      standfirst:
        "A technical deep-dive into the critical systems that define reliability in oil & gas operations.",
      author: "Shiyas",
      date: "22 November 2025",
      blocks: [
        {
          t: "quote",
          text: "A rig doesn't just produce oil, it produces reliability, one signal at a time.",
        },
        { t: "h2", text: "The anatomy of reliability" },
        {
          t: "p",
          text: "Whether it's a jack-up anchored off Abu Dhabi or a land rig drilling through shale in Gujarat, every rig shares the same lifeblood, systems that never sleep. Behind the rumble of generators and the spin of the top-drive lies a choreography of circuits, hydraulics, logic, and data. If one system fails, the others strain. If two fail, the rig stops breathing.",
        },
        {
          t: "p",
          text: "Let's uncover the twelve interlocked systems that keep both offshore and onshore rigs alive, validated against API RP 53, DNV-GL OS-D202, IEC 61511, and IEC 61892.",
        },
        { t: "h2", text: "1. Power generation & distribution (PMS / SCR / VFD) — the heartbeat" },
        {
          t: "p",
          text: "Generates, manages, and distributes electrical power across all rig systems. Every control loop, from ESD logic to thruster control, depends on stable, synchronized power. A millisecond dip can cause a rig-wide blackout cascade.",
        },
        {
          t: "ul",
          items: [
            "PMS (Power Management System) automatically synchronizes generators, balances load, and prevents overload.",
            "SCR (Silicon Controlled Rectifier) systems in land rigs modulate DC power for draw works and top-drives.",
            "VFDs (Variable Frequency Drives) regulate motor speed, reduce start-up surges, and extend equipment life.",
          ],
        },
        {
          t: "p",
          text: "On an offshore DP rig, the PMS works in closed feedback with DP and ESD, forming a real-time “triangular handshake” between power, motion, and safety. The hidden risk: generator desynchronization can trigger an AVR-hunting loop, a power oscillation that melts breakers and cascades into rig-wide blackout. Veterans call it the heart attack.",
        },
        {
          t: "p",
          text: "Current reading: more than 20% of offshore CAPEX retrofits now focus on PMS modernization. Digital twist: AI-based load forecasting plus digital-twin breaker analytics equals zero-downtime resilience.",
        },
        { t: "h2", text: "2. Drilling / hoisting & load monitoring — the muscles" },
        {
          t: "p",
          text: "The muscles that move the drill string, top-drive, draw works, and mud pumps, deliver both power and precision. Load Monitoring Systems measure hook-load, torque, and bit pressure in real time. Data feeds to drill monitoring dashboards that predict stick-slip and vibration before failure.",
        },
        {
          t: "p",
          text: "The hidden risk: over-pull or unseen vibration can shear drill pipe connections and damage crown-blocks. Offshore, dynamic load cells and CBM integration reduce derrick fatigue; onshore, automated jacking and skidding systems cut rig move time by 25%. Condition-based load analytics cut draw works failures by 22%.",
        },
        { t: "h2", text: "3. Well control / blow-out preventer (BOP) — the gatekeeper" },
        {
          t: "p",
          text: "The BOP is the iron wall between control and catastrophe. Hydraulic rams seal the wellbore at thousands of psi. Accumulators and choke manifolds regulate pressure surges, complying with API RP 53 testing intervals.",
        },
        {
          t: "p",
          text: "The hidden risk: a failed shear ram, as in Deepwater Horizon (2010), can rewrite history. Offshore, subsea BOP pods operate via redundant control lines; onshore, surface BOPs are easier to maintain but cycle twice as often. BOP market $1.2B → $1.9B by 2032.",
        },
        { t: "h2", text: "4. Mud circulation & fluid monitoring — the lifeblood" },
        {
          t: "p",
          text: "Mud is the circulatory system of every well. It cools, lubricates, and balances pressure. Mud pumps circulate drilling fluid through shale shakers and desanders before returning downhole. Sensors track density, viscosity, and gas content.",
        },
        {
          t: "p",
          text: "The hidden risk: a 1 psi pressure imbalance can collapse the wellbore or cause a kick. Closed-loop mud systems cut spill risk by 40%. AI mud-rheology analytics predict density shift before loss of circulation.",
        },
        { t: "h2", text: "5. Fire & gas detection / suppression — the guardian of seconds" },
        {
          t: "p",
          text: "When seconds decide survival, fire & gas is the system that buys them. Infrared, ultrasonic, and flame detectors feed to logic that activates deluge valves and shutdown signals per IEC 61511.",
        },
        {
          t: "p",
          text: "The hidden risk: delayed detection or false trip can be equally fatal — Piper Alpha (1988) proved it. Safety automation is now a $3.6B market. Gas-cloud mapping and sensor self-calibration minimize blind spots.",
        },
        { t: "h2", text: "6. Emergency shutdown / safety instrumented system (SIS) — the parachute" },
        {
          t: "p",
          text: "When all else fails, this system saves lives. A layered shutdown hierarchy brings the rig to a safe state, linked to F&G and process control under DNV-GL OS-D202.",
        },
        {
          t: "p",
          text: "The hidden risk: improper setpoints or bypass logic can delay a trip by seconds, long enough to lose control. Automated SIS cut incidents by 30%. Virtual commissioning via digital twin (SMEC NexVerse) validates logic without production loss.",
        },
        { t: "h2", text: "7. Process control & automation (DCS / SCADA / PLC) — the brain" },
        {
          t: "p",
          text: "The brain that thinks, responds, and records every action. Distributed Control Systems govern drilling, separation, and utilities. Supervisory SCADA systems aggregate data to the bridge or remote center.",
        },
        {
          t: "p",
          text: "The hidden risk: legacy PLCs over 20 years old introduce millisecond lags that compound under cyber load. 60% of operators plan DCS modernization by 2026. Edge computing plus AI fault-prediction gives self-healing control loops.",
        },
        { t: "h2", text: "8. Structural integrity & load monitoring — the skeleton" },
        {
          t: "p",
          text: "The bones that bear the weight of steel, sea, and time. Sensors monitor hull stress, mooring tension, and foundation settlement. Data feeds into finite-element digital twins for fatigue prediction.",
        },
        {
          t: "p",
          text: "The hidden risk: undetected corrosion can propagate micro-fractures in jackets, responsible for 30% of failures (ABS 2023). ROV integrity inspections reduce manual dives by 60%. AI fatigue-analytics and ultrasonic mapping extend hull life by a decade.",
        },
        { t: "h2", text: "9. Gas monitoring & environmental control — the lungs" },
        {
          t: "p",
          text: "Clean air is non-negotiable in confined environments. Continuous H₂S and CH₄ detection with auto-vent and flare logic maintains safe ppm levels.",
        },
        {
          t: "p",
          text: "The hidden risk: sensor poisoning or blockage can delay alarms by critical seconds. Gas monitoring incidents fell 40% after multi-sensor fusion (2024). Optical IR sensors and drone gas-visualization improve reach in hazard zones.",
        },
        { t: "h2", text: "10. Communications & cyber defence — the nervous system" },
        {
          t: "p",
          text: "Data connectivity is now as vital as hydraulics. VSAT, microwave, and 5G links carry SCADA and crew comms. Cyber firewalls segregate OT and IT traffic.",
        },
        {
          t: "p",
          text: "The hidden risk: unpatched PLC gateways are attack magnets, with OT breaches up 30% (IBM 2024). Zero-Trust policies are now mandatory in new MODU designs. Cyber-twins simulate intrusion events to train SOCs remotely.",
        },
        { t: "h2", text: "11. Drill monitoring & data acquisition (DAS / RTD) — the eyes and ears" },
        {
          t: "p",
          text: "Without feedback, you can't steer precision. Downhole sensors feed pressure, temperature, and vibration to surface DAS systems per API RP 7G. Real-time data optimizes bit performance and wellbore trajectory.",
        },
        {
          t: "p",
          text: "The hidden risk: signal latency over 3 seconds can mislead operators and cause kick misinterpretation. Smart DAS reduced NPT by 18% in 2024. Edge-AI models predict bit wear and ROP optimization autonomously.",
        },
        { t: "h2", text: "12. Asset integrity & maintenance (CMMS / AMS) — the memory" },
        {
          t: "p",
          text: "The rig remembers, if you let it. CMMS tracks maintenance cycles, failure history, and critical spares, linked to DCS for condition-based alerts.",
        },
        {
          t: "p",
          text: "The hidden risk: out-of-sync maintenance data causes duplicate failures and spare stock shortages. Predictive integrity cuts downtime by 20%. SMEC's NexVerse digital twin plus ProSet360 gives maintenance and operations a single source of truth.",
        },
        { t: "h2", text: "Conclusion: building intelligence into reliability" },
        {
          t: "p",
          text: "Across both offshore and onshore operations, every system that once acted in isolation is now part of an integrated intelligence network. Standards like API RP 53, DNV-GL OS-D202, and IEC 61511 remain the foundation of safety, but digital transformation is redefining how those standards are achieved.",
        },
        {
          t: "p",
          text: "AI analytics, digital twins, and edge computing are bridging engineering disciplines that were once siloed. Power, process, safety, and integrity now inform each other in real time. The measurable outcomes are undeniable:",
        },
        {
          t: "ul",
          items: [
            "20% less unplanned downtime",
            "25% lower maintenance OPEX",
            "Higher energy efficiency and safety KPIs",
          ],
        },
        {
          t: "p",
          text: "The rigs of the future won't merely operate; they'll self-optimize. Reliability has become predictive, and intelligence has become the industry's new infrastructure.",
        },
        {
          t: "p",
          text: "At SMEC Automation, we see this transformation not as a shift in technology, but as a shift in thinking. Our role is to engineer intelligence into control, bridging legacy infrastructure with next-generation reliability. Because in modern energy operations, precision is power, and intelligence is the new uptime.",
        },
      ],
    },

  "navigating-automation-architecture": {
    standfirst: "PLC, SCADA and DCS — and why the future is convergence, not silos.",
    author: "Vinita Thomas",
    date: "18 September 2025",
    blocks: [
      {
        t: "p",
        text: "In today's energy, marine, and industrial landscapes, downtime is the single most expensive line item. Whether it's a rig in the Arabian Sea, a tanker in dry dock, or a refinery onshore, every hour of lost uptime translates into hundreds of thousands of dollars in losses, not to mention safety and compliance risks.",
      },
      {
        t: "p",
        text: "At the core of uptime lies one question: how strong, integrated, and future-ready are your control systems? This is where PLC, SCADA, and DCS step in. But while these three acronyms are used interchangeably, they serve distinct functions, and the future lies not in choosing one over the other, but in engineering them together intelligently.",
      },
      { t: "h2", text: "PLC — the rugged backbone" },
      { t: "p", text: "PLCs are the workhorses of industrial automation." },
      {
        t: "ul",
        items: [
          "What they do: handle machine-level, high-speed control logic (motors, valves, compressors, pumps).",
          "Strengths: rugged, real-time, modular.",
          "Limitations: on their own, PLCs can't provide supervisory visibility or plant-wide intelligence.",
        ],
      },
      { t: "h3", text: "The challenge today" },
      {
        t: "ul",
        items: [
          "PLCs installed before 2010 are hitting obsolescence.",
          "Spare parts are scarce, vendor support ends, and downtime risk grows.",
          "Many operators keep “stretching” PLC life until failure forces an expensive replacement.",
        ],
      },
      { t: "h3", text: "The opportunity" },
      {
        t: "ul",
        items: [
          "Modern PLCs integrate seamlessly with SCADA/DCS.",
          "Protocols like Modbus, Profibus, and Ethernet/IP ensure connectivity across OEMs.",
          "PLC upgrades extend lifecycle 10+ years and enable condition monitoring at the edge.",
        ],
      },
      { t: "h2", text: "SCADA — from monitoring to intelligence" },
      {
        t: "p",
        text: "Think of SCADA as the nervous system. It connects PLCs, RTUs, and sensors into one supervisory dashboard.",
      },
      {
        t: "ul",
        items: [
          "What it does: centralizes monitoring, logs events, enables alarms, provides HMI interfaces.",
          "Strengths: excellent for distributed assets — offshore rigs, multi-plant operations, pipelines.",
          "Limitations: legacy SCADA floods operators with alarms, lacks predictive insights, and struggles with multi-protocol environments.",
        ],
      },
      {
        t: "p",
        text: "SCADA without analytics is just data noise. Many operators still rely on SCADA purely for visualization, missing predictive maintenance benefits. Next-gen SCADA integrates with ERP, CMMS and IoT sensors; adding condition-based monitoring turns alarms into actionable insights, and centralized dashboards enable decisions in minutes instead of days.",
      },
      { t: "h2", text: "DCS — reliability at scale" },
      {
        t: "p",
        text: "DCS is the reliability anchor for large, continuous processes.",
      },
      {
        t: "ul",
        items: [
          "What it does: distributes control across the plant, ensuring no single point of failure.",
          "Strengths: advanced process control, redundancy, reliability.",
          "Limitations: vendor lock-in, costly migrations, longer deployment times.",
        ],
      },
      {
        t: "p",
        text: "Plants struggle with obsolete DCS control cards. Migrations often risk long shutdowns and high costs, and cybersecurity vulnerabilities are growing in older DCS setups. Hybrid architectures deliver flexibility plus reliability; layering AI and digital twin technology provides predictive insights across the entire process, and modular upgrades allow phased migration without halting production.",
      },
      { t: "h2", text: "The future: convergence, not silos" },
      {
        t: "p",
        text: "The real winners in oil & gas, marine, and industrial sectors won't be the companies with the best PLC, SCADA, or DCS in isolation. The winners will be those who engineer:",
      },
      {
        t: "ul",
        items: [
          "PLCs for local precision",
          "SCADA for supervisory visibility",
          "DCS for process reliability",
          "All tied together with AI, digital twins, and condition-based monitoring",
        ],
      },
      {
        t: "p",
        text: "This convergence means less downtime through predictive trips instead of reactive failures, smarter OPEX decisions through energy savings and reduced spares, and longer lifecycle through retrofit readiness instead of replacement panic.",
      },
      { t: "h2", text: "Conclusion" },
      {
        t: "p",
        text: "The age of siloed, vendor-locked PLCs, SCADA, and DCS is over. Leaders who treat control systems as isolated acronyms will keep fighting downtime, alarm floods, and rising OPEX. The future belongs to integrated, intelligent ecosystems that deliver uptime, visibility, and ROI across every asset.",
      },
      {
        t: "p",
        text: "So the real question is no longer “Is the PLC obsolete?” It's “How long can the operations afford to depend on outdated control systems?”",
      },
      {
        t: "p",
        text: "At SMEC, we've spent 25 years retrofitting, integrating, and future-proofing control systems for rigs, vessels, and industrial plants worldwide. Whether it's extending lifecycle by a decade, cutting downtime by 30%, or giving decision-makers one pane of glass for operations, we engineer reliability into every project.",
      },
    ],
  },

  "smec-the-solution-hub-3-engineering-resilience-starts-inside-the-panel": {
    standfirst:
      "Why emergency, power & control panels decide whether assets survive — or stall.",
    blocks: [
      {
        t: "p",
        text: "Open your control panel. Does it look like a masterpiece of engineering, or a bird's nest of “temporary” bypasses, jumpers, and unlabeled wires?",
      },
      {
        t: "p",
        text: "In marine, oil & gas, and heavy industries, panels are often treated as static infrastructure: installed once, modified endlessly, and understood by fewer people each year. That assumption is now one of the largest hidden risks to asset availability.",
      },
      {
        t: "p",
        text: "If your technical team needs a map, a flashlight, and a prayer to find a fault, your system isn't just old — it's obsolete. Whether it is a $50M vessel stuck at the pier or a high-output industrial plant facing a “mystery” trip, the cost of an un-engineered, messy panel is measured in massive hourly losses.",
      },
      {
        t: "p",
        text: "At SMEC Automation, we don't just wire boxes. We engineer the central nervous system of your entire operation. This article breaks down critical panel systems, not as products, but as decision-making organs of modern assets.",
      },
      { t: "h2", text: "The evolution of the panel" },
      {
        t: "ol",
        items: [
          "The age of iron (relay logic): robust but “dumb”. Troubleshooting a single failed relay in a sequence of fifty takes hours of manual testing.",
          "The “spaghetti” era (hybrid systems): this is the danger zone. Digital meters tacked on to 30-year-old iron. A mix of analog noise and digital logic that no one fully understands.",
          "The SMEC intelligent era (2026 standards): we replace miles of redundant wiring with a single industrial backbone. Our panels communicate, self-diagnose, and self-protect.",
        ],
      },
      { t: "h2", text: "1. Emergency control panels" },
      {
        t: "p",
        text: "When seconds matter, logic integrity matters more than hardware. Emergency control panels are rarely complex by component count. They are complex by decision density. Most start life as clean, deterministic systems — hardwired, linear, and easy to reason about. The problem begins when the asset evolves but the emergency philosophy does not.",
      },
      {
        t: "ul",
        items: [
          "Emergency stop chains expanded incrementally without re-verifying priority hierarchy",
          "Safety inputs added as parallel permissives instead of restructured logic paths",
          "Latched emergency states that do not reset cleanly after transient undervoltage or blackout recovery",
        ],
      },
      {
        t: "p",
        text: "Emergency panel failures are rarely caused by contactors or relays failing. They are caused by logic paths that were never tested together under dynamic failure sequences. Emergency panels must be validated using sequence-based failure simulations, not static I/O checks.",
      },
      { t: "h2", text: "2. RTU panels" },
      {
        t: "p",
        text: "Data without authority is operational noise. RTU panels are often deployed to increase visibility, but visibility without decision authority creates confusion, not control.",
      },
      {
        t: "ul",
        items: [
          "RTUs polling faster than the upstream SCADA can process, creating timestamp ambiguity",
          "Drift between RTU clocks and master systems leading to incorrect event sequencing",
          "Alarms generated without defined escalation ownership",
        ],
      },
      {
        t: "p",
        text: "RTUs must sit at the boundary between detection and action: alarm prioritization tied to response time rather than signal importance, clear separation between advisory data and actionable triggers, and deterministic communication paths for emergency or protective signals. An RTU that only reports conditions after margins are lost is not a control asset. It is a historian input.",
      },
      { t: "h2", text: "3. Motor control centers (MCC)" },
      {
        t: "p",
        text: "Where electrical protection and mechanical behavior collide. MCCs are often upgraded for higher motor ratings, VFD integration, or redundancy — but rarely re-engineered for behavior under stress.",
      },
      {
        t: "ul",
        items: [
          "Unequal thermal loading across incomers causing asymmetric aging",
          "Protection curves still tuned to original motor inertia, not retrofitted drives",
          "Short-circuit coordination compromised by partial upgrades",
        ],
      },
      {
        t: "p",
        text: "A safe MCC is not defined by nameplate margins. It is defined by thermal profiling across operating envelopes, protection selectivity validated during non-ideal fault paths, and starter logic that accounts for degraded motor characteristics. An MCC can energize motors flawlessly and still be operationally unsafe.",
      },
      { t: "h2", text: "4. Power control panels" },
      {
        t: "p",
        text: "Power availability is electrical. Power stability is control logic. Power control panels fail most often during transitions, not during faults.",
      },
      {
        t: "ul",
        items: [
          "Logic designed around steady-state assumptions",
          "Control wiring routed alongside power paths, inducing noise during switching",
          "Manual overrides introduced without logic-state reconciliation",
        ],
      },
      {
        t: "p",
        text: "When loads shift rapidly or generators synchronize, control logic must arbitrate conflicting priorities in milliseconds. Power stability is governed by decision timing, not breaker speed.",
      },
      { t: "h2", text: "5. PLCC & distribution panels" },
      {
        t: "p",
        text: "When signal integrity is mistaken for equipment failure. PLCC panels rarely fail outright. They degrade.",
      },
      {
        t: "ul",
        items: [
          "Harmonic injection from VFDs overwhelming carrier frequencies",
          "Earthing schemes incompatible with modern electronic loads",
          "Attenuation misinterpreted as relay malfunction",
        ],
      },
      {
        t: "p",
        text: "Most PLCC failures are system-integration failures, not communication failures. Distribution panels must be engineered as part of the signal environment, not just power routing hardware.",
      },
      { t: "h2", text: "6. Main switchboard (MSB)" },
      {
        t: "p",
        text: "Blackouts begin during coordination, not collapse. The MSB is where electrical power becomes operational decision-making.",
      },
      {
        t: "ul",
        items: [
          "Protection discrimination not revisited after generator upgrades",
          "Load-sharing logic assuming ideal governor behavior",
          "Manual restoration sequences executed under time pressure",
        ],
      },
      {
        t: "p",
        text: "Blackouts rarely result from a single catastrophic fault. They emerge from minor misalignments during transitions — synchronization, fault clearance, or load pickup. An MSB must be validated for transition behavior, not just fault isolation.",
      },
      { t: "h2", text: "7. Emergency switchboard (ESB)" },
      {
        t: "p",
        text: "Redundancy without coordination is false security. ESBs are often treated as isolated safety islands, which creates blind spots: transfer delays during undervoltage recovery, emergency loads exceeding assumed duty cycles, and battery systems sized for drawings rather than reality. An ESB must mirror the decision philosophy of the MSB, not merely duplicate hardware.",
      },
      { t: "h2", text: "8. Power management system (PMS) panels" },
      {
        t: "p",
        text: "Where logic ages faster than hardware. PMS panels fail quietly, through logic drift: load-shedding thresholds based on obsolete consumption data, generator sequencing tuned to new machines but applied to aged ones, and incremental logic edits without full-system simulation. A PMS that passes trials can still collapse under operational stress.",
      },
      { t: "h2", text: "9. Shore power connection panels" },
      {
        t: "p",
        text: "Grid integration, not plug-and-play compliance. Shore power systems introduce two grids with different assumptions: harmonic resonance between shore supply and onboard converters, isolation logic that fails during abnormal transitions, and transients damaging sensitive electronics during connection and disconnection. Shore power panels are grid-integration systems. They must manage synchronization, isolation, and protection dynamically, not statically.",
      },
      { t: "h2", text: "10. Distribution boards (DBs)" },
      {
        t: "p",
        text: "Where small failures cascade. Distribution boards are the most underestimated risk nodes: critical and non-critical loads mixed without priority logic, breakers drifting from original trip characteristics, and no visibility into downstream degradation. DBs are not secondary hardware. They are failure multipliers if engineered casually.",
      },
      { t: "h2", text: "Why SMEC panels outperform" },
      {
        t: "ul",
        items: [
          "The digital bridge (logic conversion): you don't need to scrap a $1M engine or machine just because the OEM panel is obsolete. We engineer custom panels that speak to 30-year-old sensors while giving you 2026-level diagnostic data. We upgrade the brain; you keep the iron.",
          "Phased modernization (the zero-blackout upgrade): you don't need a total shutdown to upgrade your main switchboard. Our experts replace vital organs — breakers and protection relays — in modular stages during scheduled windows.",
          "Thermal intelligence: most panels fail because of heat-creep. SMEC panels use laser-mapped airflow and infrared-ready inspection ports, allowing you to scan for hot-spots without ever breaking the arc flash boundary.",
        ],
      },
      { t: "h2", text: "Global powerhouse: India & UAE" },
      {
        t: "p",
        text: "Our UAE facility has been specifically designed to handle the rapid-response needs of the Middle Eastern energy and maritime sectors. Whether it is a custom MSB retrofit or a new RTU deployment, our UAE and India teams operate under a unified single standard of excellence.",
      },
      {
        t: "p",
        text: "If your engineers are relying on a map and a prayer, your system is a ticking clock. Whether you are in a factory in India or a vessel in the Arabian Gulf, SMEC builds for the 25-year life of your asset. We aren't just experts in panels — we are the architects of your uptime.",
      },
    ],
  },
};
