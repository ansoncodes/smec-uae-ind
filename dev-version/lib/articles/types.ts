/**
 * Article body content, ported from the corresponding posts on
 * smecoilandgas.com (and smec.in for the VARD piece). Each article's
 * `sourceHref` in `lib/siteData.ts` points at the original.
 *
 * Wording is the site's own. Headings are set in sentence case to match this
 * build, and hashtag blocks, share widgets and comment prompts are dropped.
 */

export type Block =
  | { t: "h2"; text: string }
  | { t: "h3"; text: string }
  | { t: "p"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "quote"; text: string };

export type ArticleContent = {
  /** Standfirst under the headline. */
  standfirst?: string;
  author?: string;
  date?: string;
  blocks: Block[];
};
