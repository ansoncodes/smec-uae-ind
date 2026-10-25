/**
 * SMEC EDGE sign-up — Mailchimp, double opt-in.
 *
 * Configuration is server-only, like the RFQ's lead key: no NEXT_PUBLIC_
 * prefix, so none of it is ever bundled for the browser.
 *
 *   MAILCHIMP_API_KEY      — "<key>-<data centre>", e.g. "…-us21"
 *   MAILCHIMP_AUDIENCE_ID  — the SMEC EDGE audience (list) ID
 *   MAILCHIMP_API_BASE     — optional; defaults to the key's data centre,
 *                            https://<dc>.api.mailchimp.com/3.0. Set it only
 *                            to point a test build at a local stub.
 *
 * No audience exists yet (HP-17), so until both required values are set the
 * homepage leaves the newsletter section out and the route refuses. The
 * homepage is prerendered, so the values must be present at build time for
 * the section to appear.
 */

export type NewsletterConfig = { key: string; audience: string; base: string };

export function newsletterConfig(): NewsletterConfig | null {
  const key = process.env.MAILCHIMP_API_KEY?.trim();
  const audience = process.env.MAILCHIMP_AUDIENCE_ID?.trim();
  if (!key || !audience) return null;

  const centre = key.split('-').pop() ?? '';
  const base =
    process.env.MAILCHIMP_API_BASE?.trim() ||
    // A data centre is letters then digits ("us21"); anything else is a
    // malformed key, and is not allowed to choose the host we call.
    (/^[a-z]+\d+$/.test(centre) ? `https://${centre}.api.mailchimp.com/3.0` : '');
  if (!base) return null;

  return { key, audience, base: base.replace(/\/+$/, '') };
}

export const newsletterEnabled = () => newsletterConfig() !== null;
