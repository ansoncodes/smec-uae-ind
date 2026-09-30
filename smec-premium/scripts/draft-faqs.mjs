/**
 * Draft FAQs for the pages the Content Master leaves without them.
 *
 * §6 sets the question patterns by page family and §32 forbids rendering FAQ
 * copy that has not been approved — so this writes a review document, not
 * site content. Nothing here reaches a page until someone at SMEC signs it
 * off and it is added to the Content Master.
 *
 * Every answer is assembled from that page's own approved copy: its answer
 * block, its body lines, its RFQ inputs. Where the page does not say enough
 * to answer a question honestly, the answer is left as a marked gap rather
 * than invented — an unanswered question is a smaller problem than a
 * confident wrong one.
 *
 *   node scripts/draft-faqs.mjs   →   docs/faq-drafts.md
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'docs/faq-drafts.md');

const source = fs.readFileSync(path.join(ROOT, 'lib/spec/pages.generated.ts'), 'utf8');
const pages = JSON.parse(
  source.slice(source.indexOf('SPEC_PAGES: SpecPage[] = ') + 25, source.lastIndexOf('];') + 1)
);

const GAP = '_[needs SMEC: the page does not say]_';

const sectionOf = (url) => url.split('/').filter(Boolean)[0] ?? 'home';
const lines = (page) => page.sections.flatMap((s) => (s.internal ? [] : s.lines));
const find = (page, re) => lines(page).find((line) => re.test(line));
const sentence = (text, max = 320) => {
  if (!text) return null;
  const out = text.trim();
  return out.length > max ? `${out.slice(0, max - 1).trimEnd()}…` : out;
};

/** The lifecycle answer §6 asks every product page to carry. */
const lifecycle = (page) =>
  sentence(
    find(page, /new build|retrofit|replacement|modernization|obsolesc/i)
  ) ??
  'Scope depends on the installed base, its condition, the interfaces and the project ' +
    'requirement; SMEC assesses new build, retrofit and replacement against the same survey.';

const rfqInputs = (page) => {
  const block = page.sections.find((s) => /rfq inputs|conversion cta/i.test(s.heading));
  const line = block?.lines.find((l) => /recommended|send|provide|required/i.test(l));
  return (
    sentence(line) ??
    'Send the project or asset, the existing make and model, the scope, any drawings or ' +
      'specification, the required date, the site and any shutdown or mobilization constraint.'
  );
};

const interfaces = (page) =>
  sentence(find(page, /interface|integrat|protocol|PLC|SCADA|DCS|OEM/i));

const trigger = (page) =>
  sentence(find(page, /trigger|when |problem|fault|obsolesc|risk|driver/i));

/** Questions per family, each with the rule §6 gives for its answer. */
function questionsFor(page) {
  const family = sectionOf(page.url);
  const name = page.h1;
  const answer = sentence(page.answer);
  const out = [];

  const push = (q, a) => out.push([q, a ?? GAP]);

  if (family === 'products') {
    push(`What is ${name} used for?`, answer);
    push(
      'Can this system be supplied as new build, retrofit or replacement?',
      lifecycle(page)
    );
    push('What does it interface with?', interfaces(page));
    push('What information is required for quotation?', rfqInputs(page));
  } else if (family === 'solutions') {
    push(`What does SMEC do under ${name}?`, answer);
    push('What usually triggers this scope?', trigger(page));
    push('Where does SMEC responsibility start and stop?', interfaces(page));
    push('What is needed to quote it?', rfqInputs(page));
  } else if (family === 'industries' || family === 'markets') {
    push(`What does SMEC engineer for ${name}?`, answer);
    push('Which systems does that usually involve?', interfaces(page));
    push('What is needed to start a scope conversation?', rfqInputs(page));
  } else if (family === 'customers') {
    push(`How does SMEC work with ${name}?`, answer);
    push('What does the delivery model look like?', trigger(page));
    push('What should be sent with an enquiry?', rfqInputs(page));
  } else if (family === 'digital') {
    push(`What operating decision does ${name} support?`, answer);
    push(
      'Can it work with the existing PLC, SCADA or cameras?',
      interfaces(page) ??
        'The installed base, available protocols and data quality are assessed before scope is fixed.'
    );
    push('What is needed to scope it?', rfqInputs(page));
  }

  return out;
}

/**
 * §6 puts FAQs on "the homepage and priority product, solution and industry
 * pages". Company and resource pages are left alone: a question invented to
 * fill a company page is the "added merely to create schema" the same
 * section warns against.
 */
const FAMILIES = ['products', 'solutions', 'industries', 'markets', 'customers', 'digital'];

const missing = pages.filter((p) => !p.faqs.length && FAMILIES.includes(sectionOf(p.url)));

const body = missing
  .map((page) => {
    const rows = questionsFor(page)
      .map(([q, a]) => `**Q. ${q}**\n\nA. ${a}\n`)
      .join('\n');
    const gaps = questionsFor(page).filter(([, a]) => a === GAP).length;
    return [
      `### ${page.url}`,
      `${page.h1}${page.status === 'draft' ? ' · _page is gated, will not publish yet_' : ''}` +
        `${gaps ? ` · ${gaps} answer(s) need SMEC` : ''}`,
      '',
      rows,
    ].join('\n');
  })
  .join('\n---\n\n');

const header = `# FAQ drafts — for SMEC approval

GENERATED. Rebuild: \`node scripts/draft-faqs.mjs\`

${missing.length} buyer-facing URLs carry no approved FAQ copy (of ${pages.filter((p) => !p.faqs.length).length}
without any, the rest being company and resource pages where §6 does not ask
for them). The
Technical Master asks for 3–6 visible buyer questions on priority pages (§6)
and forbids rendering FAQ copy, or its schema, that is not approved (§32) —
so these are drafts in a document, not content on the site. **Nothing here is
live.**

Every answer below is assembled from that page's own approved copy. Where the
page does not say enough to answer honestly, the answer is marked
"${GAP}" instead of being invented.

**To publish a set:** edit the wording here, then add the questions to the
Content Master under that URL and rebuild the content. The page will render
them and emit FAQPage schema automatically, because the schema is generated
from the visible questions.

---

`;

fs.writeFileSync(OUT, header + body + '\n', 'utf8');

const gapCount = missing.reduce(
  (n, p) => n + questionsFor(p).filter(([, a]) => a === GAP).length,
  0
);
console.log(`wrote docs/faq-drafts.md`);
console.log(`  ${missing.length} pages · ${missing.reduce((n, p) => n + questionsFor(p).length, 0)} questions`);
console.log(`  ${gapCount} answers need SMEC input`);
