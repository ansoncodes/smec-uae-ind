/**
 * The shape of a page as the Content Master defines it. One entry per URL in
 * the locked architecture; pages.generated.ts is built from the document by
 * scripts/build-spec-content.mjs.
 */

export type SpecSection = {
  heading: string;
  lines: string[];
  /** Instructions to whoever builds the page, not copy: never rendered. */
  internal?: boolean;
};

export type SpecFaq = { q: string; a: string };

/** How a specification row may be published — internal, never rendered. */
export type SpecTreatment = { parameter: string; treatment: string };

export type SpecStatus = 'approved' | 'draft';

export type SpecPage = {
  /** Canonical path, trailing slash. */
  url: string;
  breadcrumb: string[];
  seoTitle: string;
  metaDescription: string;
  /** Schema types the document assigns, e.g. ['Product', 'FAQPage']. */
  schema: string[];
  intent: string;
  h1: string;
  /** Two to three sentences that can stand alone in search and AI answers. */
  answer: string;
  sections: SpecSection[];
  specTreatment: SpecTreatment[];
  faqs: SpecFaq[];
  /** Draft pages render but stay out of the index and the sitemap. */
  status: SpecStatus;
  /** Why a page is draft, in plain words, for the team and for UAT. */
  gates: string[];
};
