import type { ArticleContent } from "./types";
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
