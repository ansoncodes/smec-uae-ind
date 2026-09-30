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
];

const isInternalSection = (heading) => INTERNAL_SECTION.some((re) => re.test(heading));

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
      answer: page.answer ?? '',
      sections: page.sections.map((section) => ({
        ...section,
        ...(isInternalSection(section.heading) ? { internal: true } : {}),
      })),
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
 * Source: docs/source/SMEC_Website_Content_Master_2026_V3_DEEP_CONTENT.md
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
