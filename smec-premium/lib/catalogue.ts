import { CATALOGUE } from '@/lib/spec/catalogue.generated';
import type { CatalogueItem } from '@/lib/spec/types';

/**
 * Where a row of the client's Systems & Products catalogue leads (CNT-03).
 *
 * A row with a page links to it. The rest go to the RFQ form with the row
 * named, as `/contact/?item=`: the form reads it after load, the way it reads
 * `?region=`, and shows it as the system of interest, which the visitor can
 * still change. Only a slug of a real row is honoured, so a link cannot put
 * words of its own on the form.
 *
 * The RFQ form imports this module, so it imports the generated catalogue
 * alone and never lib/spec, which would pull every page into the browser.
 */

export const catalogueHref = (item: CatalogueItem) => item.url ?? `/contact/?item=${item.slug}`;

/** The row an `?item=` value names, or undefined when it names none. */
export const catalogueItem = (slug: string | null | undefined) => {
  const wanted = slug?.trim().toLowerCase();
  return wanted ? CATALOGUE.find((item) => item.slug === wanted) : undefined;
};

/** Every page a catalogue row links to. */
export const catalogueUrls = new Set(CATALOGUE.flatMap((item) => (item.url ? [item.url] : [])));
