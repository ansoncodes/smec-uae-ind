/**
 * Approved project evidence.
 *
 * Row 9 of the component standard is "Evidence: approved case
 * study/project/reference/datasheet", and the CMS model gives it its own
 * component with a publication status. Today the site has nowhere to put an
 * approved project even when one arrives, which is why this exists empty: the
 * shape is fixed, the page renders it when there is something to render, and
 * the schema follows the visible card rather than being written separately.
 *
 * Nothing goes in here without approval. §15 and Brief §17 both gate client
 * names, quantified outcomes and OEM references, and an unapproved case study
 * is the single most expensive thing this site could publish by accident.
 */

export type Evidence = {
  /** The URLs this evidence belongs on, e.g. ['/solutions/rig-modernization/']. */
  pages: string[];
  title: string;
  /** Asset type — 'Jack-up rig', 'Gas gathering station'. Never a client name unless approved. */
  asset: string;
  /** What triggered the work. */
  problem: string;
  /** What SMEC engineered, supplied or integrated. */
  scope: string;
  /** Main subsystems and interfaces, in one or two sentences. */
  architecture?: string;
  /** Testing actually performed: FAT, SAT, commissioning. */
  testing?: string;
  /** Only an approved, quantified outcome. Leave empty rather than estimate. */
  outcome?: string;
  /** Named only with written permission (§15). */
  client?: string;
  /** A full case-study page under /resources/case-studies/, once one exists. */
  href?: string;
};

export const EVIDENCE: Evidence[] = [];

export const evidenceFor = (url: string) => EVIDENCE.filter((item) => item.pages.includes(url));

/**
 * `CreativeWork` per card, describing what the card shows and nothing more —
 * no rating, no review, no outcome that is not printed on the page.
 */
export const evidenceSchema = (items: Evidence[], siteUrl: string) =>
  items.map((item) => ({
    '@type': 'CreativeWork',
    '@id': item.href ? `${siteUrl}${item.href}` : undefined,
    name: item.title,
    about: item.asset,
    description: [item.problem, item.scope, item.outcome].filter(Boolean).join(' '),
    creator: { '@id': `${siteUrl}/#organization` },
    ...(item.href ? { url: `${siteUrl}${item.href}` } : {}),
  }));
