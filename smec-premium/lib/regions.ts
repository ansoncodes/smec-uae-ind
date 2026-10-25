import { CONTACT, CONTACT_INDIA } from '@/lib/siteData';

/**
 * The two enquiry desks, as the homepage document's RFQ table sets them out:
 * one form for both, routed to the Middle East & International team or the
 * India team by a choice the visitor makes (RFQ-03).
 *
 * Her instruction is to preselect by page and leave the choice open — "the
 * project location may differ from their own location" — so a page passes
 * `?region=` to /contact/ and the form starts there. Without one it starts
 * on the Middle East team: every page of this site is the UAE entity's, and
 * her rule for UAE and Middle East pages is to preselect that team.
 *
 * The ids match the event and variable names she and we use for each side
 * (`whatsapp_click_uae`, `LEAD_API_KEY_UAE`), not the labels, which may
 * still change.
 */

export const REGIONS = [
  {
    id: 'uae',
    label: 'Middle East & International',
    code: 'AE',
    entity: CONTACT.entity,
    place: 'Abu Dhabi, UAE',
    desk: 'Middle East & International RFQs',
    team: 'Middle East Team',
    mailLabel: 'Email UAE Engineering Team',
    email: CONTACT.email,
    emailHref: CONTACT.emailHref,
    phone: CONTACT.phone,
    phoneHref: CONTACT.phoneHref,
  },
  {
    id: 'india',
    label: 'India',
    code: 'IN',
    entity: CONTACT_INDIA.entity,
    place: 'Kochi, Kerala, India',
    desk: 'India RFQs',
    team: 'India Team',
    mailLabel: 'Email India Engineering Team',
    email: CONTACT_INDIA.email,
    emailHref: CONTACT_INDIA.emailHref,
    phone: CONTACT_INDIA.phone,
    phoneHref: CONTACT_INDIA.phoneHref,
  },
] as const;

export type Region = (typeof REGIONS)[number];
export type RegionId = Region['id'];

export const DEFAULT_REGION: RegionId = 'uae';

export const regionById = (id: RegionId): Region =>
  REGIONS.find((region) => region.id === id) ?? REGIONS[0];

/** Spellings a link or a person might reasonably use for each desk. */
const ALIASES: Record<string, RegionId> = {
  uae: 'uae',
  ae: 'uae',
  'middle-east': 'uae',
  me: 'uae',
  international: 'uae',
  india: 'india',
  in: 'india',
};

/** The desk a `?region=` value names, or null when it names neither. */
export function parseRegion(value: string | null | undefined): RegionId | null {
  if (!value) return null;
  return ALIASES[value.trim().toLowerCase()] ?? null;
}

export const isRegionId = (value: string): value is RegionId =>
  REGIONS.some((region) => region.id === value);

/** The RFQ page, starting on a desk when the caller knows which. */
export const rfqHref = (region?: RegionId) =>
  region ? `/contact/?region=${region}` : '/contact/';

/**
 * Pages about the India company, whose RFQ links start on the India desk.
 * Every other page is the UAE entity's and keeps the default.
 */
const INDIA_PAGES = new Set(['/company/india-engineering-hub/']);

/* The client form imports this module, so it trims the path itself rather
   than pull lib/routes — and the whole redirect map — into the browser. */
export const regionForPath = (path: string): RegionId | undefined =>
  INDIA_PAGES.has(`/${path.replace(/^\/+|\/+$/g, '')}/`) ? 'india' : undefined;
