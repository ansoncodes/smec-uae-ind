import { createHash } from 'node:crypto';
import { NextResponse } from 'next/server';
import { newsletterConfig } from '@/lib/newsletter';

/**
 * The SMEC EDGE sign-up the homepage form posts to.
 *
 * Mailchimp is called from here, never from the browser, so the API key
 * stays on the server. Sign-up is double opt-in: a new address is added as
 * "pending" and Mailchimp emails it a confirmation link; nobody is mailed an
 * edition until they click it. An address already on the list is left as it
 * is, and one that unsubscribed before is sent a fresh confirmation rather
 * than quietly put back.
 *
 * Configuration and the stub override are in lib/newsletter.ts.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Same shape as the RFQ's limit: every request, and the ones that pass. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_SIGNUPS = 6;
const MAX_ATTEMPTS = 30;
const hits = new Map<string, number[]>();

function tooMany(key: string, limit: number) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((at) => now - at < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
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

type Errors = { email?: string; consent?: string; form?: string };

const fail = (errors: Errors, status = 400) =>
  NextResponse.json({ success: false, errors }, { status });

export async function POST(request: Request) {
  const config = newsletterConfig();
  if (!config) {
    console.error('Newsletter: MAILCHIMP_API_KEY or MAILCHIMP_AUDIENCE_ID is not set.');
    return fail({ form: 'The newsletter sign-up is not connected yet.' }, 503);
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail({ form: 'That sign-up could not be read. Please try again.' });
  }

  // The hidden field: accepted and dropped, as the RFQ does.
  if (String(body.website ?? '').trim()) {
    return NextResponse.json({ success: true, status: 'pending' });
  }

  const ip = clientIp(request);
  if (tooMany(`${ip}:attempt`, MAX_ATTEMPTS)) {
    return fail({ form: 'Too many requests from here. Please wait a few minutes.' }, 429);
  }

  const email = String(body.email ?? '').trim();
  const errors: Errors = {};
  if (!email) errors.email = 'Enter the address the newsletter should go to.';
  else if (!EMAIL.test(email) || email.length > 254) errors.email = 'That address looks incomplete.';
  if (body.consent !== true) errors.consent = 'Tick the box to confirm you want the newsletter.';
  if (Object.keys(errors).length) return fail(errors);

  if (tooMany(`${ip}:signup`, MAX_SIGNUPS)) {
    return fail({ form: 'That is a lot of sign-ups from one place. Please try again later.' }, 429);
  }

  const member = createHash('md5').update(email.toLowerCase()).digest('hex');
  const url = `${config.base}/lists/${encodeURIComponent(config.audience)}/members/${member}`;
  const headers = {
    Authorization: `Basic ${Buffer.from(`smec:${config.key}`).toString('base64')}`,
    'Content-Type': 'application/json',
  };

  const call = async (method: 'PUT' | 'PATCH', payload: Record<string, string>) => {
    const response = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });
    const data = await response.json().catch(() => null);
    return { response, data };
  };

  let status: string | undefined;
  try {
    // Add as pending, or leave an existing member exactly as they are.
    let { response, data } = await call('PUT', { email_address: email, status_if_new: 'pending' });
    if (response.ok && data?.status === 'unsubscribed') {
      ({ response, data } = await call('PATCH', { status: 'pending' }));
    }

    if (!response.ok) {
      // Mailchimp answers 400 for an address it will not take — invalid,
      // previously bounced, or deleted at the owner's request.
      if (response.status === 400) {
        console.warn('Newsletter: Mailchimp refused an address.', data?.title);
        return fail({ email: 'That address could not be added. Please check it and try again.' });
      }
      console.error('Newsletter: Mailchimp answered', response.status, data?.title);
      return fail({ form: 'Something went wrong at our end. Please try again later.' }, 502);
    }
    status = data?.status;
  } catch (error) {
    console.error('Newsletter: Mailchimp could not be reached.', error);
    return fail({ form: 'We could not reach the newsletter service just now. Please try again.' }, 502);
  }

  if (status === 'pending' || status === 'subscribed') {
    return NextResponse.json({ success: true, status });
  }
  console.warn('Newsletter: member left in status', status);
  return fail({ email: 'That address could not be added. Please check it and try again.' });
}
