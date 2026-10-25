/**
 * The two smec.in landing pages SMEC asked us to link (chat, 19 October;
 * again in the 20 October voice note), and the pages of this site that link
 * to them.
 *
 * Only these two. The e-House page is rebuilt here because its old URL is on
 * the domain being replaced, and the marine and AI-video landing pages are not
 * to be linked at all (voice note, 20 October).
 *
 * The wording is the client's own, from her Tab 1 and Tab 3 prototypes, which
 * name both destinations: "Explore Asset Digital Intelligence" and "Explore
 * Industrial Control Panels".
 */

export type LandingPage = {
  href: string;
  /** Link text: what the visitor gets, never "click here". */
  label: string;
  title: string;
  note?: string;
  /** Canonical paths of the pages that carry the link. */
  from: string[];
};

export const ASSET_DIGITAL_INTELLIGENCE: LandingPage = {
  href: 'https://asset-digital-intelligence.smec.in/',
  label: 'Explore Asset Digital Intelligence',
  title: 'Explore the complete digital portfolio',
  note: "See SMEC's digital platforms, applications and enquiry options in one place.",
  from: ['/digital/'],
};

export const INDUSTRIAL_CONTROL_PANELS: LandingPage = {
  href: 'https://industrial-control-panels.smec.in/',
  label: 'Explore Industrial Control Panels',
  title: 'Control-panel landing page',
  note: "SMEC's own page for control-panel enquiries.",
  from: [
    '/solutions/panel-engineering-manufacturing/',
    '/products/plc-hmi-drive-panels/',
    '/products/mcc-pcc-power-distribution/',
  ],
};

export const LANDING_PAGES = [ASSET_DIGITAL_INTELLIGENCE, INDUSTRIAL_CONTROL_PANELS];

export const landingPageFor = (url: string) => LANDING_PAGES.find((page) => page.from.includes(url));

/** `asset-digital-intelligence.smec.in`, shown so the visitor knows they are leaving. */
export const hostOf = (page: LandingPage) => new URL(page.href).host;
