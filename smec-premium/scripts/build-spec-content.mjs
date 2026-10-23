/**
 * Turns the Content Master into typed page data.
 *
 *   node scripts/build-spec-content.mjs
 *
 * Reads docs/source/SMEC_Website_Content_Master_2026_V3_DEEP_CONTENT.md and
 * writes lib/spec/pages.generated.ts. Re-run it when a new revision lands; the
 * diff then shows exactly what the client changed.
 *
 * Nothing is rewritten on the way through. Headings, answer blocks, body lines
 * and FAQs are carried across verbatim, because the document is the source of
 * truth for wording — a page that reads badly is a question for SMEC, not
 * something to fix here.
 *
 * The document holds two kinds of page entry:
 *
 *   full     meta table, then "### H1 / answer block" and body sections.
 *   compact  a "| Field | Developer copy |" meta table followed by a
 *            "| Parameter | Website treatment |" table. That second table is
 *            internal instruction ("publish exact voltage only from approved
 *            datasheet"), never page copy, so it is kept separately as
 *            specTreatment and the page is marked draft: there is no answer
 *            block written for it yet.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SOURCE = path.join(
  root,
  'docs/source/SMEC_Website_Content_Master_2026_V3_DEEP_CONTENT.md'
);
const OUT = path.join(root, 'lib/spec/pages.generated.ts');

const lines = fs.readFileSync(SOURCE, 'utf8').split(/\r?\n/);

/** `| Key | value | more |` → ['Key', 'value | more'] — SEO titles contain pipes. */
function tableRow(line) {
  if (!line.startsWith('|')) return null;
  const cells = line.replace(/^\|/, '').replace(/\|\s*$/, '').split('|');
  if (cells.length < 2) return null;
  return [cells[0].trim(), cells.slice(1).join('|').trim()];
}

const isPageHeading = (line) => /^#{2,6}\s/.test(line);
/** "# 5C. PRODUCTS …", "## Visible Buyer FAQs …" — a new part of the document. */
const isDocumentHeading = (line) =>
  /^#{1,2}\s+\d/.test(line) || /^#{1,2}\s+(Visible Buyer|Engineering) FAQs/i.test(line);
const headingText = (line) => line.replace(/^#{1,6}\s+/, '').trim();

const FIELDS = {
  Breadcrumb: 'breadcrumb',
  'SEO title': 'seoTitle',
  'Meta description': 'metaDescription',
  Schema: 'schema',
  'Primary search intent': 'intent',
  H1: 'h1',
};

/** Rows that belong to the document's own scaffolding, not to a page. */
const META_TABLE_HEADERS = new Set(['Field', 'Parameter', 'URL']);

/* ------------------------------------------------------------------ pages */

const blocks = [];
let current = null;

for (const line of lines) {
  const row = tableRow(line);

  if (row && row[0] === 'URL' && row[1].startsWith('/')) {
    current = { url: row[1], body: [] };
    blocks.push(current);
    continue;
  }

  if (!current) continue;

  // Everything a page owns is written as ### or deeper; a # or ## heading
  // starts a new part of the document.
  if (isDocumentHeading(line)) current = null;
  else current.body.push(line);
}

function parseBlock(block) {
  const page = { url: block.url, sections: [], specTreatment: [] };
  let section = null;
  let inSpecTable = false;
  const lead = [];
  let leadClosed = false;

  for (const line of block.body) {
    const row = tableRow(line);

    if (row && row[0] === 'Parameter') {
      inSpecTable = true;
      continue;
    }

    if (row && inSpecTable && !FIELDS[row[0]]) {
      page.specTreatment.push({ parameter: row[0], treatment: row[1] });
      continue;
    }

    if (row && FIELDS[row[0]] && !section) {
      page[FIELDS[row[0]]] = row[1];
      continue;
    }

    if (row && META_TABLE_HEADERS.has(row[0])) continue;

    if (isPageHeading(line)) {
      inSpecTable = false;
      const title = headingText(line);
      section = /^H1\s*\/\s*answer block$/i.test(title)
        ? { heading: '__answer__', lines: [] }
        : { heading: title, lines: [] };
      page.sections.push(section);
      continue;
    }

    const text = line.trim();

    if (!text) {
      inSpecTable = false;
      if (lead.length) leadClosed = true;
      continue;
    }

    if (section) section.lines.push(text);
    else if (!leadClosed) lead.push(text);
  }

  // "### H1 / answer block" carries the H1 on its first line, the answer after.
  const answer = page.sections.find((s) => s.heading === '__answer__');
  if (answer) {
    page.sections = page.sections.filter((s) => s !== answer);
    if (!page.h1) page.h1 = answer.lines[0] ?? '';
    page.answer = answer.lines.slice(page.h1 === answer.lines[0] ? 1 : 0).join(' ');
  }

  if (!page.answer && lead.length) page.answer = lead.join(' ');

  // An SEO title is "<page> | SMEC"; the page half is the H1 when none is given.
  if (!page.h1 && page.seoTitle) page.h1 = page.seoTitle.split('|')[0].trim();

  page.sections = page.sections.filter((s) => s.lines.length > 0);

  return page;
}

/** Where the document disagrees with itself, the locked value wins. */
const H1_OVERRIDES = { '/': 'Engineering Critical Energy Assets' };

const byUrl = new Map();
const conflicts = [];

for (const block of blocks) {
  const page = parseBlock(block);
  const existing = byUrl.get(page.url);

  if (!existing) {
    byUrl.set(page.url, page);
    continue;
  }

  // Merge: the two entries for a URL carry different halves of the page.
  const merged = {
    ...existing,
    ...Object.fromEntries(Object.entries(page).filter(([, v]) => v && v.length !== 0)),
    sections: existing.sections.length ? existing.sections : page.sections,
    specTreatment: existing.specTreatment.length ? existing.specTreatment : page.specTreatment,
  };
  if (existing.h1 && page.h1 && existing.h1 !== page.h1 && !(page.url in H1_OVERRIDES)) {
    conflicts.push({ url: page.url, kept: existing.h1, ignored: page.h1 });
    merged.h1 = existing.h1;
  }
  byUrl.set(page.url, merged);
}

for (const [url, h1] of Object.entries(H1_OVERRIDES)) {
  const page = byUrl.get(url);
  if (page && page.h1 !== h1) {
    conflicts.push({ url, kept: h1, ignored: page.h1 });
    page.h1 = h1;
  }
}

/* ------------------------------------------- section 5C product bodies */

/**
 * "5C. PRODUCTS — Additional Engineered Systems & Packages" writes each page
 * as "# Product Name" with ## sections, and keeps its meta table in another
 * part of the document. Parse the bodies here and match them to the URLs by
 * name.
 */
const bodies5c = [];
const start5c = lines.findIndex((l) => /^#\s+5C\./.test(l));

if (start5c !== -1) {
  let entry = null;
  let section = null;

  for (const line of lines.slice(start5c + 1)) {
    if (/^#\s+(?!5C)/.test(line) && /^#\s+\d/.test(line)) break; // next numbered part

    const product = /^#\s+(?!\d)(.+)$/.exec(line);
    if (product) {
      entry = { name: product[1].trim(), sections: [] };
      bodies5c.push(entry);
      section = null;
      continue;
    }

    if (!entry) continue;

    const heading = /^##\s+(.+)$/.exec(line);
    if (heading) {
      const title = heading[1].trim();
      section = /^H1\s*\/\s*(AI\s+)?answer block$/i.test(title)
        ? { heading: '__answer__', lines: [] }
        : { heading: title, lines: [] };
      entry.sections.push(section);
      continue;
    }

    const text = line.trim();
    if (text && section) section.lines.push(text);
  }
}

const words = (value) =>
  new Set(
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .split(' ')
      .filter((word) => word.length > 2 && word !== 'smec' && word !== 'system')
  );

/** Best-matching URL for a 5C heading, by word overlap with slug and title. */
function matchUrl(name) {
  const wanted = words(name);
  let best = null;
  let bestScore = 0;

  for (const page of byUrl.values()) {
    if (!page.url.startsWith('/products/') || page.sections.length) continue;
    const candidate = words(`${page.url.split('/').filter(Boolean).pop()} ${page.seoTitle ?? ''}`);
    const score = [...wanted].filter((word) => candidate.has(word)).length;
    if (score > bestScore) {
      bestScore = score;
      best = page;
    }
  }

  return bestScore >= 2 ? best : null;
}

const unmatched5c = [];

for (const entry of bodies5c) {
  const page = matchUrl(entry.name);
  if (!page) {
    unmatched5c.push(entry.name);
    continue;
  }

  const answer = entry.sections.find((s) => s.heading === '__answer__');
  if (answer && !page.answer) page.answer = answer.lines.join(' ');
  page.sections = entry.sections.filter((s) => s.heading !== '__answer__' && s.lines.length);
}

/* ------------------------------------------------------------------- FAQs */

const faqStart = lines.findIndex((l) => /^##\s+Visible Buyer FAQs/i.test(l));
const faqsByUrl = new Map();

if (faqStart !== -1) {
  let url = null;
  let question = null;

  for (const line of lines.slice(faqStart + 1)) {
    if (/^##\s/.test(line)) break;

    const heading = /^###\s+(\/\S*)\s*$/.exec(line);
    if (heading) {
      url = heading[1];
      faqsByUrl.set(url, faqsByUrl.get(url) ?? []);
      continue;
    }

    if (!url) continue;
    const text = line.trim();
    if (text.startsWith('Q.')) question = text.slice(2).trim();
    else if (text.startsWith('A.') && question) {
      faqsByUrl.get(url).push({ q: question, a: text.slice(2).trim() });
      question = null;
    }
  }
}

for (const [url, faqs] of faqsByUrl) {
  const page = byUrl.get(url);
  if (page) page.faqs = faqs;
}

/* ------------------------------------------- the client's prototype copy */

/**
 * The handover's second source: docs/source/prototypes/, the 54 entities
 * pulled out of the client's interactive HTML prototypes and the Tab 1 docx.
 * It is the richest copy anywhere in the handover — 4,189-6,205 characters
 * per solution and 4,717-7,228 per product, against the 700-1,900 the
 * Content Master writes for the same URLs — so where both describe a page,
 * the prototype's body wins.
 *
 * What the prototype does not win is the URL. It proposes its own slugs and
 * the architecture docx proposes a third set; both are discarded, because the
 * redirect map is already verified against a crawl of the live site and
 * moving a URL means rebuilding it (docs/build-plan-to-launch.md section 0).
 * The file-to-URL mapping is the table below rather than a hand edit, so a
 * re-run is deterministic and the decision is reviewable in one place.
 *
 * Nor does it win the answer block. The Content Master writes two to three
 * sentences per page for exactly the job the Technical Master sets out —
 * standing alone in a search result — and the prototype has no equivalent
 * field. Its opening headline and intro become the page's first body section.
 *
 * Industries and Resources are deliberately absent. At 195-724 and 51-76
 * characters they are thinner than what the Content Master already gives
 * those pages, and they launch behind noindex until real copy arrives;
 * merging them would replace something better with something worse.
 */

const PROTOTYPES = path.join(root, 'docs/source/prototypes');

/**
 * Thirteen prototype solution pages onto the fifteen built solution URLs.
 * Ten are one-to-one. Two prototype pages each cover a subject the build
 * splits in two, so their capability tabs are divided between the pair by
 * name; the shared intro, engineering approach and project evidence go to
 * the primary page only, because the same paragraphs on two URLs is
 * duplicate content, not twice the content.
 */
const SOLUTION_MERGE = [
  { file: 'solutions/system-integration.md', url: '/solutions/system-integration/' },
  { file: 'solutions/hydraulics-pneumatics.md', url: '/solutions/hydraulics-pneumatics/' },
  {
    file: 'solutions/panel-engineering-manufacturing.md',
    url: '/solutions/panel-engineering-manufacturing/',
  },
  {
    file: 'solutions/e-houses-modular-electrical-rooms.md',
    url: '/solutions/e-houses-modular-electrical-rooms/',
  },
  {
    file: 'solutions/industrial-automation-control.md',
    url: '/solutions/automation-control-systems/',
  },
  { file: 'solutions/plc-scada-dcs-migration.md', url: '/solutions/control-system-migration/' },
  { file: 'solutions/fat-sat-commissioning.md', url: '/solutions/testing-commissioning/' },
  { file: 'solutions/obsolescence-retrofit.md', url: '/solutions/lifecycle-obsolescence/' },
  { file: 'solutions/rig-modernisation-reactivation.md', url: '/solutions/rig-modernization/' },
  { file: 'solutions/shutdown-turnaround-support.md', url: '/solutions/shutdown-turnaround/' },
  {
    file: 'solutions/turnkey-engineering-packages.md',
    url: '/solutions/turnkey-engineering-system-solutions/',
  },
  {
    // Power distribution, motors and the marine/safety electrical packages
    // are electrical scope; field measurement and its calibration and loop
    // validation are instrumentation scope.
    file: 'solutions/electrical-instrumentation-engineering.md',
    split: [
      {
        url: '/solutions/electrical-engineering/',
        primary: true,
        capabilities: ['Power Distribution & Quality', 'Motors & Critical Power', 'Safety & Marine E&I'],
        faqs: [
          'Can one project combine power distribution and field instrumentation?',
          'What should accompany an E&I RFQ?',
        ],
      },
      {
        url: '/solutions/instrumentation/',
        capabilities: ['Instrumentation & Field Systems', 'Testing & Lifecycle'],
        faqs: ['Can existing instruments and electrical equipment be retained?'],
      },
    ],
  },
  {
    // The new-build tabs to greenfield; the operating-plant tabs, including
    // retrofitted metering and condition monitoring, to brownfield, which is
    // also where the prototype's own case study and approach sit.
    file: 'solutions/greenfield-brownfield-engineering.md',
    split: [
      {
        url: '/solutions/brownfield-engineering/',
        primary: true,
        capabilities: ['Brownfield Modifications', 'Phased Execution', 'Energy & Monitoring'],
        faqs: [
          'Can new systems be tied into an operating plant?',
          'What drawings should be supplied?',
        ],
      },
      {
        url: '/solutions/greenfield-projects/',
        capabilities: ['Greenfield Electrical', 'Greenfield Automation'],
        faqs: ['Can greenfield and brownfield scopes be combined?'],
      },
    ],
  },
];

/**
 * Seventeen of the twenty prototype product pages onto built product URLs.
 *
 * Where the client's own documents disagree about a slug the built URL wins,
 * as everywhere else: RPD is `/products/rpd-system/`, not the prototype's
 * `/products/rpd-systems` or the docx's `/products/rack-phase-difference`.
 *
 * E-Houses is the one subject the client wrote twice, once as a Tab 1
 * solution and once as a Tab 2 product. Both merge onto the single built
 * URL: the solution supplies the capability tabs, the product the
 * engineering detail underneath them, and nothing is thrown away.
 */
const PRODUCT_MERGE = [
  { file: 'products/scr-houses.md', url: '/products/scr-houses/' },
  { file: 'products/vfd-houses.md', url: '/products/vfd-houses/' },
  { file: 'products/power-houses.md', url: '/products/power-houses/' },
  { file: 'products/generator-control-pms.md', url: '/products/generator-control-pms/' },
  { file: 'products/e-houses.md', url: '/solutions/e-houses-modular-electrical-rooms/' },
  // "MCC, PCC, PLC, HMI, VFD and starter panels" — the built split puts power
  // panels under MCC/PCC and logic panels under PLC/HMI; the prototype's own
  // keywords lead with MCC/PCC, which is where the inventory maps it too.
  { file: 'products/industrial-control-panels.md', url: '/products/mcc-pcc-power-distribution/' },
  {
    file: 'products/dms3000-drill-monitoring.md',
    url: '/products/dms3000-drill-monitoring-system/',
  },
  { file: 'products/flare-boom-pilot-ignition-systems.md', url: '/products/flare-ignition-system/' },
  { file: 'products/rack-phase-difference-rpd-systems.md', url: '/products/rpd-system/' },
  {
    file: 'products/integrated-drilling-control-systems.md',
    url: '/products/integrated-drilling-control-system/',
  },
  { file: 'products/jacking-control-systems.md', url: '/products/jacking-control-system/' },
  { file: 'products/bop-control-systems.md', url: '/products/bop-control-system/' },
  {
    file: 'products/cctv-surveillance-perimeter-security.md',
    url: '/products/explosion-proof-cctv/',
  },
  { file: 'products/load-monitoring-systems.md', url: '/products/load-monitoring-system/' },
  // The inventory suggested the driller talkback page; PAGA has its own built
  // URL and talkback is a different system, so it goes to the named page.
  { file: 'products/paga-communication-systems.md', url: '/products/paga-system/' },
  { file: 'products/fire-gas-detection-systems.md', url: '/products/fire-gas-detection/' },
  { file: 'products/gas-watch-panel-mud-gas-detection.md', url: '/products/gas-watch-panel/' },
];

/**
 * Three prototype product pages have no built URL that is the same subject.
 * They are not merged, because the nearest page would be published under
 * someone else's H1 — and they are not dropped either: each is a written
 * page of 4,800-5,400 characters, which makes them the cheapest new pages
 * available in the handover. Adding a URL is a decision for the team, not
 * for a content generator, so they are listed here and printed on every run.
 */
const PRODUCTS_DEFERRED = [
  {
    file: 'products/pipeline-scada-rtu-systems.md',
    reason:
      'no built page; nearest is /products/plant-automation-scada/, a different subject. Candidate new URL: /products/pipeline-scada-rtu/',
  },
  {
    file: 'products/onshore-wellhead-skid-controls.md',
    reason:
      'no built page. Candidate new URL: /products/wellhead-skid-controls/ (the architecture docx slug)',
  },
  {
    file: 'products/emergency-shutdown-systems.md',
    reason:
      'no built page; /products/integrated-control-safety-system/ is control-and-safety integration, not ESD. Candidate new URL: /products/emergency-shutdown-system/',
  },
];

const HIDDEN_MARKER = /\s*_\(hidden in prototype\)_\s*$/;
const EMPTY_MARKER = /^_\((empty|not present) in source\)_$/i;

/** Nav lines the prototype writes as bare paths: "Case Studies — /projects". */
const BARE_PATH = /(^|\s)\/[a-z0-9][a-z0-9-]*(\/|\?|$)/;

/** A heading the prototype shows but the built page already answers. */
const PROTOTYPE_SKIP = [
  /^Explore Technical Capabilities$/i,
  /^Applications & Systems$/i,
  /^Industries Where This Engineering Applies$/i,
  /^Have (a|an|any)\b.*\?$/i,
  /^Related Navigation$/i,
  /^Publishing checklist/i,
  /^Frequently Asked Questions$/i,
  /^FAQs$/i,
  // Verbatim restatement of the headline block above it, in every product file.
  /^What is\b.*\?$/i,
];

/** `[MCC/PCC](/products/mcc-pcc-panels)` → `MCC/PCC`: the body renders text. */
const flattenLinks = (line) => line.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');

/**
 * One prototype file as headings in document order, each with its raw lines
 * and the level-2 heading it sits under.
 */
function readPrototype(relative) {
  const file = path.join(PROTOTYPES, relative);
  const text = fs.readFileSync(file, 'utf8');
  const all = text.split(/\r?\n/);

  let index = 0;
  const meta = {};

  if (all[0] === '---') {
    for (index = 1; index < all.length && all[index] !== '---'; index += 1) {
      const row = /^([a-z_]+):\s*(.*)$/.exec(all[index]);
      if (row) meta[row[1]] = row[2].trim().replace(/^"(.*)"$/, '$1');
    }
    index += 1;
  }

  const nodes = [];
  let node = null;
  let parent = null;

  for (const line of all.slice(index)) {
    const heading = /^(#{1,6})\s+(.*)$/.exec(line);

    if (heading) {
      const level = heading[1].length;
      const title = heading[2].replace(HIDDEN_MARKER, '').trim();
      node = { level, heading: title, raw: [] };
      if (level <= 2) parent = title;
      node.parent = level <= 2 ? null : parent;
      nodes.push(node);
      continue;
    }

    if (node) node.raw.push(line);
  }

  return { meta, nodes };
}

/**
 * Prototype prose into the shape the page data uses. Bullets lose their
 * marker, a bold label and the paragraph under it become one line, and the
 * two-column specification tables are kept apart from the copy.
 */
function prototypeLines(raw) {
  const lines = [];
  const table = [];
  let label = null;

  for (const line of raw) {
    const text = flattenLinks(line.trim());

    if (!text || EMPTY_MARKER.test(text)) continue;

    if (text.startsWith('|')) {
      const row = tableRow(text);
      if (!row || /^-+$/.test(row[0]) || /^Specification$/i.test(row[0])) continue;
      table.push({ parameter: row[0], treatment: row[1].replace(/\|/g, ' ').trim() });
      continue;
    }

    const bold = /^\*\*(.+)\*\*$/.exec(text);
    if (bold) {
      label = bold[1].trim();
      continue;
    }

    const body = text.replace(/^[-*]\s+/, '').replace(/\*\*/g, '').trim();
    if (!body || BARE_PATH.test(body)) continue;

    if (label) {
      lines.push(`${label} — ${body}`);
      label = null;
      continue;
    }

    lines.push(body);
  }

  return { lines, table };
}

/** `**Question?**` then the paragraph under it, as the prototype writes FAQs. */
function prototypeFaqs(raw) {
  const faqs = [];
  let question = null;

  for (const line of raw) {
    const text = line.trim();
    if (!text) continue;

    const bold = /^\*\*(.+)\*\*$/.exec(text);
    if (bold) {
      question = bold[1].trim();
      continue;
    }

    if (question) {
      faqs.push({ q: question, a: flattenLinks(text) });
      question = null;
    }
  }

  return faqs;
}

const section = (heading, raw) => {
  const { lines } = prototypeLines(raw);
  return lines.length ? { heading, lines } : null;
};

/** A Tab 1 solution page: headline and intro, capability tabs, approach. */
function parseSolution(relative) {
  const { meta, nodes } = readPrototype(relative);
  const title = nodes.find((n) => n.level === 2);

  const intro = nodes.find((n) => n.level === 3 && n.parent === title?.heading);
  const capabilities = nodes
    .filter(
      (n) =>
        n.level === 3 &&
        n.parent === 'Explore Technical Capabilities' &&
        !/^(Applications & Systems|Project Evidence)$/i.test(n.heading)
    )
    .map((n) => section(n.heading, n.raw))
    .filter(Boolean);

  const evidence = nodes.find((n) => n.level === 3 && /^Project Evidence$/i.test(n.heading));
  const approach = nodes.find((n) => n.level === 2 && /^Engineering Approach/i.test(n.heading));

  const faqs = nodes
    .filter((n) => n.level === 3 && n.parent === 'Frequently Asked Questions')
    .map((n) => ({ q: n.heading, a: prototypeLines(n.raw).lines.join(' ') }))
    .filter((faq) => faq.a);

  return {
    meta,
    intro: intro ? section(intro.heading, intro.raw) : null,
    capabilities,
    shared: [evidence, approach]
      .filter(Boolean)
      .map((n) => section(n.heading, n.raw))
      .filter(Boolean),
    faqs,
    specTreatment: [],
  };
}

/** A Tab 2 product page: the headline block, then the engineering detail. */
function parseProduct(relative) {
  const { meta, nodes } = readPrototype(relative);

  const hidden = nodes.filter(
    (n) => n.level === 2 && !PROTOTYPE_SKIP.some((re) => re.test(n.heading))
  );

  const body = [];
  const specTreatment = [];
  let intro = null;

  for (const node of hidden) {
    if (/^Specifications table$/i.test(node.heading)) {
      specTreatment.push(...prototypeLines(node.raw).table);
      continue;
    }

    const block = section(node.heading, node.raw);
    if (!block) continue;

    // "Technical specifications" is values, which may only be published from
    // an approved datasheet: kept in the data, never rendered.
    if (/^Technical specifications$/i.test(node.heading)) {
      body.push({ ...block, internal: true });
      continue;
    }

    if (!intro && node === hidden[0]) {
      intro = block;
      continue;
    }

    body.push(block);
  }

  const faqNode = nodes.find((n) => n.level === 2 && /^FAQs$/i.test(n.heading));

  return {
    meta,
    intro,
    capabilities: body,
    shared: [],
    faqs: faqNode ? prototypeFaqs(faqNode.raw) : [],
    specTreatment,
  };
}

const headingKey = (heading) => heading.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const isCta = (heading) => /conversion cta|rfq inputs/i.test(heading);

/**
 * Prototype sections over Content Master sections. A heading both sources
 * write is replaced where it stands, so the page keeps its shape; the rest
 * is inserted ahead of the RFQ block, which always closes the page.
 */
function mergeSections(built, incoming) {
  const byHeading = new Map(incoming.map((block) => [headingKey(block.heading), block]));
  const used = new Set();

  const kept = built.map((block) => {
    const replacement = byHeading.get(headingKey(block.heading));
    if (!replacement) return block;
    used.add(headingKey(block.heading));
    return replacement;
  });

  const added = incoming.filter((block) => !used.has(headingKey(block.heading)));
  const cta = kept.findIndex((block) => isCta(block.heading));

  const merged = cta === -1 ? [...kept, ...added] : [...kept.slice(0, cta), ...added, ...kept.slice(cta)];

  // One section per heading: the page data is keyed by it when rendered.
  const seen = new Set();
  return merged.filter((block) => {
    const key = headingKey(block.heading);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * The prototypes repeat themselves. Every product page states its opening
 * paragraph twice — once in SMEC's voice and once in the third person — and
 * "Configurations & options" is in several files a verbatim restatement of
 * "How it works". Publishing the same four sentences twice under two
 * headings is a defect whoever reads the page will see, so a paragraph that
 * has already appeared on the page is dropped, and a section left holding
 * nothing but its own lead-in goes with it.
 *
 * Only prose is compared. Short list items repeat across capability tabs
 * legitimately — "RTUs" belongs under both field systems and communications.
 */
const PROSE = 60;
const proseKey = (line) =>
  line.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().slice(0, 80);

function withoutRepeats(blocks, seen) {
  const kept = [];

  for (const block of blocks) {
    const lines = block.lines.filter((line) => {
      if (line.length < PROSE) return true;
      const key = proseKey(line);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    if (!lines.length || lines.every((line) => line.endsWith(':'))) continue;
    kept.push({ ...block, lines });
  }

  return kept;
}

const merged = new Set();
const mergeReport = [];

function applyPrototype(url, parsed, { capabilities, faqs, intro, shared }) {
  const page = byUrl.get(url);
  if (!page) throw new Error(`prototype merge: no built page at ${url}`);

  const before = measure(page);

  const seen = new Set();
  for (const block of page.sections) {
    for (const line of block.lines) {
      if (line.length >= PROSE) seen.add(proseKey(line));
    }
  }

  const incoming = withoutRepeats([...(intro ? [intro] : []), ...capabilities, ...shared], seen);

  // The headline block opens the page the first time a prototype lands on
  // this URL; a second prototype on the same URL continues underneath.
  const opens = intro && !merged.has(url) && incoming[0]?.heading === intro.heading;

  page.sections = mergeSections(
    opens ? [incoming[0], ...page.sections] : page.sections,
    opens ? incoming.slice(1) : incoming
  );

  if (!page.answer && intro) page.answer = intro.lines.join(' ');

  const have = new Set(page.faqs?.map((faq) => headingKey(faq.q)) ?? []);
  page.faqs = [
    ...(page.faqs ?? []),
    ...faqs.filter((faq) => !have.has(headingKey(faq.q))),
  ];

  const specs = new Set(page.specTreatment.map((row) => headingKey(row.parameter)));
  page.specTreatment = [
    ...page.specTreatment,
    ...parsed.specTreatment.filter((row) => !specs.has(headingKey(row.parameter))),
  ];

  merged.add(url);
  mergeReport.push({ url, source: parsed.meta.slug ?? '', before, after: measure(page) });
}

/** Published characters on a page, for the before-and-after on every run. */
function measure(page) {
  return [
    page.answer ?? '',
    ...(page.sections ?? [])
      .filter((block) => !block.internal)
      .flatMap((block) => [block.heading, ...block.lines]),
    ...(page.faqs ?? []).flatMap((faq) => [faq.q, faq.a]),
  ].join(' ').length;
}

for (const entry of SOLUTION_MERGE) {
  const parsed = parseSolution(entry.file);

  if (!entry.split) {
    applyPrototype(entry.url, parsed, {
      intro: parsed.intro,
      capabilities: parsed.capabilities,
      shared: parsed.shared,
      faqs: parsed.faqs,
    });
    continue;
  }

  const assigned = new Set();

  for (const target of entry.split) {
    const capabilities = target.capabilities.map((name) => {
      const block = parsed.capabilities.find((c) => headingKey(c.heading) === headingKey(name));
      if (!block) throw new Error(`${entry.file}: no capability tab named "${name}"`);
      assigned.add(headingKey(name));
      return block;
    });

    const faqs = target.faqs.map((question) => {
      const faq = parsed.faqs.find((f) => headingKey(f.q) === headingKey(question));
      if (!faq) throw new Error(`${entry.file}: no FAQ "${question}"`);
      return faq;
    });

    applyPrototype(target.url, parsed, {
      intro: target.primary ? parsed.intro : null,
      capabilities,
      shared: target.primary ? parsed.shared : [],
      faqs,
    });
  }

  const orphaned = parsed.capabilities.filter((c) => !assigned.has(headingKey(c.heading)));
  if (orphaned.length) {
    throw new Error(
      `${entry.file}: capability tabs assigned to neither page: ${orphaned.map((c) => c.heading).join(', ')}`
    );
  }
}

for (const entry of PRODUCT_MERGE) {
  const parsed = parseProduct(entry.file);
  applyPrototype(entry.url, parsed, {
    intro: parsed.intro,
    capabilities: parsed.capabilities,
    shared: parsed.shared,
    faqs: parsed.faqs,
  });
}

for (const entry of PRODUCTS_DEFERRED) {
  fs.accessSync(path.join(PROTOTYPES, entry.file));
}

/* ------------------------------------------------------------- publishing */

/**
 * Pages that cannot publish until SMEC supplies facts the documents gate:
 * people, certifications, OEM authorisations, client outcomes, and the
 * resource collections that have no items written yet.
 */
const NEEDS_ENGINEERING = new Set([
  '/products/bop-control-system/',
  '/products/gas-watch-panel/',
  '/products/flare-ignition-system/',
  '/products/fire-gas-detection/',
  '/products/integrated-control-safety-system/',
]);

const NEEDS_SMEC = {
  '/company/leadership/': 'names, roles and biographies',
  '/company/md-message/': 'an approved signed message',
  '/company/certifications/': 'verified certificates and validity',
  '/company/oem-partners/': 'current OEM authorisation and permission',
  '/company/project-experience/': 'client-approved project references',
  '/resources/case-studies/': 'approved case studies',
  '/resources/checklists/': 'the checklists themselves',
  '/resources/calculators/': 'the calculators themselves',
  '/resources/glossary/': 'glossary terms',
};

function gatesFor(page) {
  const gates = [];
  if (NEEDS_SMEC[page.url]) gates.push(`Needs SMEC: ${NEEDS_SMEC[page.url]}.`);
  if (NEEDS_ENGINEERING.has(page.url)) {
    gates.push('Safety-critical: ratings, standards and any SIL/Ex claim need engineering sign-off.');
  }
  if (!page.answer) gates.push('The Content Master gives no answer block for this page.');
  if (!page.sections.length && page.specTreatment.length) {
    gates.push('No body copy written: the document supplies publishing rules only.');
  }
  if (page.specTreatment.length) {
    gates.push('Specifications are project-specific and need the approved datasheet.');
  }
  return gates;
}

/**
 * The document mixes page copy with instructions to whoever builds the page
 * ("Homepage placement", "Publication control: …"). Those sections are kept
 * in the data — dropping client wording silently is worse — but flagged so
 * the template does not publish them. Worth an editorial pass with SMEC.
 */
const INTERNAL_SECTION = [
  /placement$/i,
  /locked content decision/i,
  /^rfq fields$/i,
  /^publication control/i,
  /^website treatment/i,
  /^technical specification fields$/i,
  /^developer copy/i,
  /on this website$/i,
  /^profile fields$/i,
  /^content structure$/i,
  /^suggested .* themes$/i,
];

/**
 * Instructions do not only appear as headings. Some are sentences inside an
 * ordinary block — "Publication control: numerical ratings … must be checked
 * by engineering" sat in the RFQ inputs of seventeen product pages. The
 * Technical Master is explicit that an internal editorial note must never
 * reach the page (§34), so lines are filtered as well as headings.
 */
const INTERNAL_LINE = [
  /^publication control\b/i,
  /^website treatment\b/i,
  /^developer copy\b/i,
  /^placement\b/i,
  /^use only approved/i,
  /must be (checked|approved|verified) (by|before)/i,
  /^do not publish\b/i,
  /sign-?off (is )?required/i,
];

/**
 * Some lines are half content, half instruction: "AI accuracy depends on the
 * scene, camera placement, lighting, occlusion and use case; do not promise
 * universal detection performance without site validation." The sentence is
 * for the visitor, the clause after it is for whoever writes the page.
 */
const trimInstruction = (line) =>
  line
    .replace(/[;.]\s*do not (promise|publish|imply|state|claim|use|expose)\b[^.;]*[.;]?\s*$/i, '.')
    .trim();

/**
 * An answer block written to the developer rather than to the visitor.
 *
 * Five pages open with a sentence like "Publish calculators only where the
 * formula, units, assumptions and limitations have been reviewed by
 * engineering" — a rule for whoever builds the page, printed as the first
 * thing a reader sees. §34 keeps internal notes off the page; §5 wants an
 * answer block that stands alone in a search result. The meta description is
 * written for exactly that, so it stands in.
 */
const ANSWER_IS_INSTRUCTION = [
  /^(publish|use only|do not|keep|render|write|avoid|maintain)\b/i,
  /^each [a-z ]+ should\b/i,
  /should (be presented|be searchable|include|establish|attract|show|state)\b/i,
  /reviewed by engineering/i,
];

const answerIsInstruction = (answer) =>
  !!answer && ANSWER_IS_INSTRUCTION.some((re) => re.test(answer.trim()));

const isInternalSection = (heading) => INTERNAL_SECTION.some((re) => re.test(heading));
const isInternalLine = (line) => INTERNAL_LINE.some((re) => re.test(line.trim()));

const SECTION_LABELS = {
  industries: 'Industries & Markets',
  customers: 'By Customer',
  solutions: 'Solutions',
  products: 'Products',
  digital: 'Digital',
  resources: 'Resources',
  company: 'Company',
  markets: 'Markets',
  contact: 'Contact',
};

/** Home › Section › Page, from the URL, when the document gives no trail. */
function derivedBreadcrumb(url, h1) {
  const parts = url.split('/').filter(Boolean);
  if (!parts.length) return ['Home'];
  return [
    'Home',
    ...parts.map((part, index) =>
      index === parts.length - 1 ? h1 || SECTION_LABELS[part] || part : SECTION_LABELS[part] || part
    ),
  ];
}

const pages = [...byUrl.values()]
  .map((page) => {
    const gates = gatesFor(page);
    const breadcrumb = (page.breadcrumb ?? '')
      .split('›')
      .map((part) => part.trim())
      .filter(Boolean);

    return {
      url: page.url,
      breadcrumb: breadcrumb.length ? breadcrumb : derivedBreadcrumb(page.url, page.h1),
      seoTitle: page.seoTitle ?? '',
      metaDescription: page.metaDescription ?? '',
      schema: (page.schema ?? '')
        .split(/\+|;/)
        .map((part) => part.trim())
        .filter(Boolean),
      intent: page.intent ?? '',
      h1: page.h1 ?? '',
      answer: answerIsInstruction(page.answer)
        ? page.metaDescription || ''
        : page.answer ?? '',
      sections: page.sections
        .map((section) => ({
          ...section,
          lines: section.lines
            .filter((line) => !isInternalLine(line))
            .map(trimInstruction),
          ...(isInternalSection(section.heading) ? { internal: true } : {}),
        }))
        // A block that was nothing but instructions is not a block.
        .filter((section) => section.internal || section.lines.length),
      specTreatment: page.specTreatment,
      faqs: page.faqs ?? [],
      // Draft pages render, but stay out of the index and the sitemap until
      // the gate clears — the Technical Master's rule for placeholder content.
      status: gates.some((g) => !g.startsWith('Specifications')) ? 'draft' : 'approved',
      gates,
    };
  })
  .sort((a, b) => a.url.localeCompare(b.url));

const drafts = pages.filter((p) => p.status === 'draft');

const banner = `/**
 * GENERATED — do not edit.
 *
 * Sources: docs/source/SMEC_Website_Content_Master_2026_V3_DEEP_CONTENT.md
 *          docs/source/prototypes/ (merged over it on ${merged.size} URLs)
 * Rebuild: node scripts/build-spec-content.mjs
 *
 * ${pages.length} pages · ${drafts.length} draft (noindex until their gate clears)
 * · ${pages.filter((p) => p.faqs.length).length} with approved FAQ copy.
 */

import type { SpecPage } from './types';

export const SPEC_PAGES: SpecPage[] = `;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, `${banner}${JSON.stringify(pages, null, 2)};\n`, 'utf8');

const counts = pages.reduce((acc, page) => {
  const group = page.url === '/' ? '/' : `/${page.url.split('/')[1]}/`;
  acc[group] = (acc[group] ?? 0) + 1;
  return acc;
}, {});

console.log(`wrote ${path.relative(root, OUT)}`);
console.log(`  ${pages.length} pages — ${JSON.stringify(counts)}`);
console.log(`  ${drafts.length} draft, ${pages.length - drafts.length} publishable`);
console.log(`  ${pages.filter((p) => p.faqs.length).length} with FAQ copy`);
console.log(`  ${pages.filter((p) => !p.answer).length} without an answer block`);
console.log(`  ${pages.filter((p) => !p.sections.length).length} without body sections`);
console.log(
  `  ${pages.reduce((n, p) => n + p.sections.filter((s) => s.internal).length, 0)} sections flagged internal (not published)`
);
if (typeof unmatched5c !== 'undefined' && unmatched5c.length) {
  console.log(`  5C bodies with no matching URL: ${unmatched5c.join(', ')}`);
}
if (conflicts.length) {
  console.log('  conflicts (the document disagrees with itself):');
  for (const c of conflicts) console.log(`    ${c.url}: kept "${c.kept}", ignored "${c.ignored}"`);
}

console.log(`\nprototype content merged onto ${merged.size} URLs (published characters):`);
for (const row of mergeReport.sort((a, b) => a.url.localeCompare(b.url))) {
  const gain = row.after - row.before;
  console.log(
    `  ${row.url.padEnd(52)} ${String(row.before).padStart(5)} → ${String(row.after).padStart(5)}  (+${gain})`
  );
}
console.log(
  `  total ${mergeReport.reduce((n, r) => n + r.before, 0)} → ${mergeReport.reduce((n, r) => n + r.after, 0)}`
);
console.log(`\nprototype pages held back (${PRODUCTS_DEFERRED.length}), no built URL is the same subject:`);
for (const entry of PRODUCTS_DEFERRED) console.log(`  ${entry.file} — ${entry.reason}`);
