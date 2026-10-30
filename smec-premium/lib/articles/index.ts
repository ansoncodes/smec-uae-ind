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
    paragraphsOf(slug)[0] ||
    (isByline(subtitle) ? "" : subtitle) ||
    title;
  return clip(lead);
}

const paragraphsOf = (slug: string) =>
  (articleBody(slug)?.blocks ?? [])
    .filter((block): block is Extract<Block, { t: "p" }> => block.t === "p")
    .map((block) => block.text);

/** Cut at a sentence or a word near 160 characters. */
function clip(lead: string): string {
  if (lead.length <= 160) return lead;
  const sentence = lead.slice(0, 160).match(/^.*[.!?](?=\s|$)/)?.[0];
  if (sentence && sentence.length >= 90) return sentence;
  return `${lead.slice(0, 159).replace(/\s+\S*$/, "")}…`;
}

/** Text compared without case or punctuation. */
const plain = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

/**
 * A collection card's title and note. The note is the subtitle where it is
 * one; where the subtitle is empty, a byline or the second half of a split
 * headline, it is the article's standfirst or opening paragraph instead,
 * passing over an opening line that only repeats the headline, so every card
 * says what the piece is about (software test report Bug_043).
 */
export function articleCard(slug: string, title: string, subtitle = ""): { title: string; note: string } {
  const headline = articleHeadline(title, subtitle);
  const ownSubtitle = !!subtitle.trim() && !isByline(subtitle) && !/[:–—]$/.test(title.trim());
  if (ownSubtitle) return { title: headline, note: subtitle.trim() };
  const lead = [articleBody(slug)?.standfirst ?? "", ...paragraphsOf(slug)].find(
    (text) => text && plain(text) !== plain(headline)
  );
  return { title: headline, note: lead ? clip(lead) : "" };
}
