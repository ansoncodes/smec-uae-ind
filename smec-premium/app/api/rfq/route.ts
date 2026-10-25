import { NextResponse } from 'next/server';
import { FIELDS, validate, hasErrors, type Errors } from '@/lib/rfq';
import { regionById, type RegionId } from '@/lib/regions';

/**
 * The RFQ endpoint the form posts to.
 *
 * It exists rather than the browser posting straight to the lead API because
 * the Technical Master asks for three things a browser cannot provide: the
 * campaign key must not sit in client JavaScript, validation must run
 * server-side, and the form must be rate-limited against automated abuse
 * (§20). The submission is validated here with the same rules the form used,
 * then forwarded to the lead API with the key attached.
 *
 * Configuration:
 *   LEAD_API_URL        — default https://api.smec.in
 *   LEAD_API_KEY_UAE    — the Middle East & International campaign key
 *   LEAD_API_KEY_INDIA  — the India campaign key
 *   LEAD_API_KEY        — the key either region falls back to
 *   All server-only: no NEXT_PUBLIC_ prefix, so none is ever bundled. With
 *   no key for the chosen region the endpoint refuses and says so, rather
 *   than silently dropping an enquiry.
 *
 * Routing (RFQ-03): the visitor picks a region and the region picks the key,
 * so each team's enquiries land in its own campaign. Until a second campaign
 * exists both regions use LEAD_API_KEY, and the region still reaches the lead
 * as `region` — the backend files any field it has no column for under the
 * lead's extra_data, which the sales team sees with the enquiry.
 *
 * If SMEC chooses static hosting with no Node runtime (docs/spec-alignment.md
 * 0.3), the form can post to the lead API directly instead by setting
 * NEXT_PUBLIC_RFQ_ENDPOINT — but then the key is public and this file's
 * validation and rate limiting are lost, so the host should support running
 * this handler.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const LEAD_API = (process.env.LEAD_API_URL ?? 'https://api.smec.in').replace(/\/+$/, '');

/**
 * Rate limit: two counts per IP, in memory.
 *
 * The strict one counts submissions that passed validation, because those
 * are what reach the lead API and the sales dashboard. The loose one counts
 * every request, so a script posting rubbish still meets a wall.
 *
 * Counting rejected attempts against the strict limit would punish the
 * person who mistypes an email twice, and §20 asks for protection "without
 * making legitimate industrial RFQs difficult".
 *
 * In memory means one server instance — enough to stop a script hammering a
 * single host, not a substitute for a limit at the edge, which belongs with
 * the hosting decision (docs/spec-alignment.md 0.3).
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_SUBMISSIONS = 8;
const MAX_ATTEMPTS = 40;
const hits = new Map<string, number[]>();

function tooMany(key: string, limit: number) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((at) => now - at < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 5000) {
    for (const [other, times] of hits) {
      if (!times.some((at) => now - at < WINDOW_MS)) hits.delete(other);
    }
  }

  return recent.length > limit;
}

const clientIp = (request: Request) =>
  (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() ||
  request.headers.get('x-real-ip') ||
  'unknown';

const fail = (errors: Errors, status = 400) =>
  NextResponse.json({ success: false, errors }, { status });

/** The campaign key for a region: its own, else the shared one. */
const leadKey = (region: RegionId) =>
  (region === 'india' ? process.env.LEAD_API_KEY_INDIA : process.env.LEAD_API_KEY_UAE) ||
  process.env.LEAD_API_KEY;

const NOT_CONNECTED: Errors = {
  form: 'The enquiry form is not connected yet. Please email or call us instead.',
};

/**
 * The reference the lead system issues (RFQ-04), passed on only when it
 * sends one and only in a plain form — nothing here invents a number.
 */
const referenceFrom = (body: unknown): string | undefined => {
  const value = (body as { reference?: unknown } | null)?.reference;
  return typeof value === 'string' && /^[A-Za-z0-9-]{1,40}$/.test(value) ? value : undefined;
};

export async function POST(request: Request) {
  if (!leadKey('uae') && !leadKey('india')) {
    console.error('RFQ: no LEAD_API_KEY is set — the enquiry was not forwarded.');
    return fail(NOT_CONNECTED, 503);
  }

  let submitted: FormData;
  try {
    submitted = await request.formData();
  } catch (error) {
    console.error('RFQ: the submission body could not be parsed.', error);
    return fail({ form: 'That submission could not be read. Please try again.' });
  }

  // A bot filled the hidden field. Accept it and drop it: telling it what
  // happened only teaches it how to get through next time.
  if (String(submitted.get('website') ?? '').trim()) {
    return NextResponse.json({ success: true });
  }

  const ip = clientIp(request);
  if (tooMany(`${ip}:attempt`, MAX_ATTEMPTS)) {
    return fail({ form: 'Too many requests from here. Please wait a few minutes.' }, 429);
  }

  const values: Record<string, string> = {};
  for (const field of FIELDS) values[field] = String(submitted.get(field) ?? '');
  values.region = String(submitted.get('region') ?? '').trim().toLowerCase();
  values.consent = String(submitted.get('consent') ?? '');

  const files = submitted.getAll('rfq_files').filter((f): f is File => f instanceof File && f.size > 0);

  const errors = validate(values, files);
  if (hasErrors(errors)) return fail(errors);

  // Only a submission worth forwarding counts against the strict limit.
  if (tooMany(`${ip}:submit`, MAX_SUBMISSIONS)) {
    return fail(
      { form: 'That is a lot of enquiries from one place. Please email us and we will pick it up.' },
      429
    );
  }

  // validate() has already refused anything that is not one of the two.
  const region = regionById(values.region as RegionId);
  const apiKey = leadKey(region.id);
  if (!apiKey) {
    console.error(
      `RFQ: neither LEAD_API_KEY_${region.id.toUpperCase()} nor LEAD_API_KEY is set — the enquiry was not forwarded.`
    );
    return fail(NOT_CONNECTED, 503);
  }

  const outgoing = new FormData();
  outgoing.set('api_key', apiKey);
  for (const [key, value] of Object.entries(values)) {
    if (key === 'consent' || key === 'region' || !value.trim()) continue;
    outgoing.set(key, value.trim());
  }
  // The readable name, so the lead says "India", not "india".
  outgoing.set('region', region.label);
  outgoing.set('consent', 'true');
  for (const file of files) outgoing.append('rfq_files', file, file.name);

  let response: Response;
  try {
    response = await fetch(`${LEAD_API}/api/leads/submit/`, { method: 'POST', body: outgoing });
  } catch (error) {
    console.error('RFQ: the lead API could not be reached.', error);
    return fail(
      { form: 'We could not reach our systems just now. Please try again, or email us.' },
      502
    );
  }

  const body = await response.json().catch(() => null);

  if (!response.ok || !body?.success) {
    // The lead API answers with {errors: {field: [message]}}; keep the field
    // mapping so the message lands on the input that caused it.
    const remote = body?.errors as Record<string, string[] | string> | undefined;
    if (remote && typeof remote === 'object') {
      const mapped: Errors = {};
      for (const [field, message] of Object.entries(remote)) {
        mapped[field as keyof Errors] = Array.isArray(message) ? message[0] : String(message);
      }
      if (hasErrors(mapped)) return fail(mapped, response.status === 429 ? 429 : 400);
    }
    console.error('RFQ: the lead API rejected the submission.', response.status, body);
    return fail({ form: 'Something went wrong at our end. Please try again, or email us.' }, 502);
  }

  const reference = referenceFrom(body);
  return NextResponse.json(reference ? { success: true, reference } : { success: true });
}
