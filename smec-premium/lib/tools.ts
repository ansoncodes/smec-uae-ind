/**
 * The two resource collections that need an engineer's review rather than
 * SMEC's approval: checklists and calculators.
 *
 * §23 sets what each must carry — a checklist gives practical inputs, a
 * calculator gives "formula, units, assumptions, limitations, engineering-
 * review statement". Both are built from the documents' own RFQ input lists
 * and from standard engineering relationships, so nothing here asserts
 * anything about SMEC. They sit on pages that are noindex until the gate
 * clears, which for these two is an engineering sign-off, not a fact SMEC
 * has to supply.
 */

export type Checklist = {
  slug: string;
  title: string;
  intro: string;
  groups: { heading: string; items: string[] }[];
};

export const CHECKLISTS: Checklist[] = [
  {
    slug: 'e-house-rfq',
    title: 'E-House enquiry checklist',
    intro:
      'What an estimator needs before an E-House or modular electrical room can be priced. ' +
      'Send what exists; a partial list is still worth reviewing.',
    groups: [
      {
        heading: 'Electrical scope',
        items: [
          'Single line diagram, or the intended distribution arrangement',
          'Voltage classes and system earthing',
          'Fault level and duration at the incomer',
          'Equipment list: switchgear, MCC/PCC, drives, UPS/DC, transformers',
          'Load list, with duty and starting method for motor loads',
          'Control and automation scope inside the building',
        ],
      },
      {
        heading: 'Building and environment',
        items: [
          'Internal arrangement or space envelope, and access requirements',
          'Ambient temperature range and solar loading',
          'Area classification, if any part is in a hazardous zone',
          'Ingress protection, fire and blast requirements',
          'HVAC duty, redundancy and control philosophy',
        ],
      },
      {
        heading: 'Transport and site',
        items: [
          'Transport route limits: weight, width, height, lifting arrangement',
          'Site location and installation interfaces (cable entries, earthing, foundations)',
          'Whether site installation, termination and commissioning are in scope',
        ],
      },
      {
        heading: 'Project',
        items: [
          'Project stage: FEED, tender, execution, operating, shutdown',
          'Required delivery date and any shutdown or mobilization window',
          'Applicable standards and client specifications',
          'Documentation, FAT and witness requirements',
        ],
      },
    ],
  },
  {
    slug: 'control-system-migration',
    title: 'Control system migration readiness checklist',
    intro:
      'Before a PLC, SCADA or DCS migration can be scoped, these are the things that ' +
      'decide whether the existing installation can be kept and how the cutover is planned.',
    groups: [
      {
        heading: 'Existing system',
        items: [
          'Make, model and firmware of the existing controllers and HMI/SCADA',
          'Application backup: program, tags, graphics, historical configuration',
          'Spare-parts position and known obsolescence notices',
          'Fault and downtime history, with the events that triggered the review',
        ],
      },
      {
        heading: 'Field and I/O',
        items: [
          'I/O list with signal types, ranges and locations',
          'Condition and age of field wiring, marshalling and terminations',
          'Whether existing cabinets, racks and field wiring are to be retained',
          'Instrument and final-element list, with anything already scheduled for replacement',
        ],
      },
      {
        heading: 'Interfaces',
        items: [
          'OEM packages and third-party systems that must remain connected',
          'Protocols in use, and which are available on the new platform',
          'Safety system boundary, and whether it is in or out of scope',
          'Historian, reporting and any remote-monitoring interfaces',
        ],
      },
      {
        heading: 'Cutover',
        items: [
          'Available window: shutdown, turnaround, phased or hot cutover',
          'Acceptable loss of view and loss of control durations',
          'Fallback and rollback plan, and who authorises it',
          'FAT scope, site acceptance criteria and operator training needs',
        ],
      },
    ],
  },
];

export type CalculatorField = {
  name: string;
  label: string;
  unit: string;
  initial: number;
  step?: number;
  min?: number;
};

export type Calculator = {
  slug: string;
  title: string;
  question: string;
  fields: CalculatorField[];
  /** The formula, written out for the reader. */
  formula: string;
  resultLabel: string;
  resultUnit: string;
  assumptions: string[];
  limitations: string[];
};

export const CALCULATORS: Calculator[] = [
  {
    slug: 'ups-autonomy',
    title: 'UPS / DC battery autonomy',
    question: 'How long will the battery hold the load?',
    fields: [
      { name: 'load', label: 'Connected load', unit: 'W', initial: 1200, step: 50, min: 1 },
      { name: 'voltage', label: 'System voltage', unit: 'V DC', initial: 110, step: 1, min: 1 },
      { name: 'capacity', label: 'Battery capacity', unit: 'Ah', initial: 100, step: 5, min: 1 },
      { name: 'efficiency', label: 'Inverter efficiency', unit: '%', initial: 92, step: 1, min: 1 },
      { name: 'usable', label: 'Usable capacity', unit: '%', initial: 80, step: 5, min: 1 },
    ],
    formula:
      'autonomy (h) = (capacity × voltage × usable%) ÷ (load ÷ efficiency%)',
    resultLabel: 'Indicative autonomy',
    resultUnit: 'hours',
    assumptions: [
      'Constant load for the whole discharge.',
      'Usable capacity accounts for the end-of-discharge voltage and ageing margin.',
      'Battery at its rated temperature, at the start of life.',
      'No allowance for the charger supplying load during the discharge.',
    ],
    limitations: [
      'Lead-acid capacity falls at high discharge rates (Peukert); a short, heavy discharge will be shorter than this figure suggests.',
      'Capacity derates with temperature and with age — commonly 80% at end of life.',
      'This is a sizing sanity check, not a battery sizing calculation. IEEE 485 or the battery manufacturer’s method governs the final design.',
    ],
  },
  {
    slug: 'generator-loading',
    title: 'Generator and transformer loading',
    question: 'What apparent power does this load draw, and how loaded is the set?',
    fields: [
      { name: 'kw', label: 'Real power', unit: 'kW', initial: 450, step: 10, min: 0 },
      { name: 'pf', label: 'Power factor', unit: '', initial: 0.8, step: 0.01, min: 0.1 },
      { name: 'rating', label: 'Source rating', unit: 'kVA', initial: 750, step: 25, min: 1 },
    ],
    formula: 'kVA = kW ÷ power factor    ·    loading % = kVA ÷ rating × 100',
    resultLabel: 'Apparent power',
    resultUnit: 'kVA',
    assumptions: [
      'Balanced three-phase load at the stated power factor.',
      'Steady-state running load — no starting or transient contribution.',
      'Source rating is at site conditions, already derated for temperature and altitude.',
    ],
    limitations: [
      'Motor starting can demand several times running current; a set sized on running load alone may not start the largest motor.',
      'Non-linear loads (drives, UPS) draw harmonic current that this does not represent.',
      'Generator sets have a minimum recommended loading; running lightly loaded for long periods causes its own problems.',
    ],
  },
];

/** Required on every calculator by §23. */
export const REVIEW_STATEMENT =
  'Indicative only. These figures support an early conversation about scope — they are not a ' +
  'design, and they do not replace calculation against the applicable standard, the equipment ' +
  'datasheet and the project specification. Every value that reaches a design is checked by a ' +
  'responsible engineer.';
