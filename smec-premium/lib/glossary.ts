import { SPEC_PAGES, isPublished, type SpecPage } from '@/lib/spec';

/**
 * The engineering glossary, derived rather than written.
 *
 * The Content Master asks for "one canonical definition per term" and
 * "cross-link to product/service pages" (/resources/glossary/). Every one of
 * those pages already opens with a definitional sentence — "A VFD House
 * packages variable-frequency drives…" — so the glossary takes each term's
 * definition from the page that owns it. Nothing is authored here, and a
 * definition cannot drift from the page it describes: change the document,
 * rebuild, and both move together.
 */

export type GlossaryTerm = {
  term: string;
  definition: string;
  /** The page that owns the term. */
  url: string;
};

const SECTIONS = ['/products/', '/solutions/', '/digital/'];

/** The first sentence of an answer, when it reads as a definition. */
function definitionOf(page: SpecPage): string | null {
  const first = (page.answer ?? '').split(/(?<=\.)\s/)[0]?.trim();
  if (!first || first.length < 40 || first.length > 260) return null;
  return first;
}

export const GLOSSARY: GlossaryTerm[] = SPEC_PAGES.filter(
  (page) =>
    isPublished(page) &&
    SECTIONS.some((section) => page.url.startsWith(section) && page.url !== section)
)
  .flatMap((page) => {
    const definition = definitionOf(page);
    return definition ? [{ term: page.h1, definition, url: page.url }] : [];
  })
  .sort((a, b) => a.term.localeCompare(b.term));

/**
 * `DefinedTermSet` with a `DefinedTerm` for each entry, as the schema table
 * assigns to this URL. Every term is visible on the page it marks up.
 */
export const glossarySchema = (siteUrl: string, pageUrl: string) => ({
  '@type': 'DefinedTermSet',
  '@id': `${siteUrl}${pageUrl}#glossary`,
  name: 'SMEC Oil & Gas engineering glossary',
  url: `${siteUrl}${pageUrl}`,
  hasDefinedTerm: GLOSSARY.map((entry) => ({
    '@type': 'DefinedTerm',
    name: entry.term,
    description: entry.definition,
    url: `${siteUrl}${entry.url}`,
    inDefinedTermSet: { '@id': `${siteUrl}${pageUrl}#glossary` },
  })),
});
