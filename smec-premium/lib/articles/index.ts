import type { ArticleContent, Block } from "./types";
import { history } from "./history";
import { timeline } from "./timeline";
import { systems } from "./systems";
import { solutions } from "./solutions";
import { company } from "./company";

export type { ArticleContent, Block } from "./types";

/** Every article body, keyed by the article's slug. */
export const articleContent: Record<string, ArticleContent> = {
  ...history,
  ...timeline,
  ...systems,
  ...solutions,
  ...company,
};

export const articleBody = (slug: string): ArticleContent | undefined =>
  articleContent[slug];

/**
 * Several subtitles are the LinkedIn byline a post was copied with ("SMEC
 * Automation Pvt Ltd", "SMEC Automation | #EnergyTransition …"), not a line
 * about the piece. They are neither shown as a standfirst nor used as the
 * search snippet.
 */
export const isByline = (text?: string): boolean =>
  !!text && /^SMEC Automation\b|#\w/.test(text.trim());

/**
 * The headline for an article's title tag and structured data. Two titles
 * stop at a colon because the post split its headline across two lines
 * ("Unlocking the Future:" / "Digital Twin Technology"): the second line
 * completes them, and where it is only a byline the colon goes.
 */
export function articleHeadline(title: string, subtitle = ""): string {
  const head = title.trim();
  if (!/[:–—]$/.test(head)) return head;
  return subtitle.trim() && !isByline(subtitle)
    ? `${head.replace(/\s+([:–—])$/, "$1")} ${subtitle.trim()}`
    : head.replace(/\s*[:–—]$/, "");
}

/**
 * An article's search snippet (Technical Master §5): its standfirst, else its
 * first paragraph, cut at a sentence or a word near 160 characters. The
 * subtitle stands in only when the body has neither.
 */
export function articleSummary(slug: string, subtitle = "", title = ""): string {
  const body = articleBody(slug);
  const lead =
    body?.standfirst ||
    body?.blocks.find((block): block is Extract<Block, { t: "p" }> => block.t === "p")?.text ||
    (isByline(subtitle) ? "" : subtitle) ||
    title;
  if (lead.length <= 160) return lead;
  const sentence = lead.slice(0, 160).match(/^.*[.!?](?=\s|$)/)?.[0];
  if (sentence && sentence.length >= 90) return sentence;
  return `${lead.slice(0, 159).replace(/\s+\S*$/, "")}…`;
}
