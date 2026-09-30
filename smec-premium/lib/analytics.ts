import { consentState, onConsentChange } from '@/lib/consent';

/**
 * The eleven conversion events the Technical Master names (§19), and one way
 * to send them.
 *
 * Nothing is loaded here: GA4/GTM ownership and the container ID are still
 * with SMEC (docs/spec-alignment.md 0.5), so `track` pushes onto the
 * dataLayer and stops. When the container is added the events are already
 * being emitted with their agreed names, and when it is not, the calls cost
 * one array push.
 *
 * §19 also forbids sending RFQ text or uploaded-file contents to analytics.
 * `track` only accepts the parameters below — page path, page type, the
 * product or solution in question, where the control was, and how many files
 * were attached. Never a field value.
 */

export type AnalyticsEvent =
  | 'rfq_submit'
  | 'rfq_file_upload'
  | 'cta_talk_engineer'
  | 'click_phone'
  | 'click_whatsapp'
  | 'click_email'
  | 'datasheet_download'
  | 'case_study_view'
  | 'product_to_rfq'
  | 'solution_to_rfq'
  | 'form_error';

export type EventParams = {
  /** Where the control was: 'header', 'hero', 'rfq_form', 'footer'… */
  location?: string;
  /** 'product' | 'solution' | 'industry' | 'resource' | 'contact' | 'home' */
  page_type?: string;
  /** The product or solution the enquiry is about, by name. */
  item?: string;
  /** Counts only — never names, never contents. */
  file_count?: number;
  /** Which field group failed, for form_error. */
  field?: string;
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Events raised before a visitor has chosen. They are held, not dropped: an
 * RFQ submitted before the banner is answered still counts if the visitor
 * then accepts, and is discarded entirely if they refuse.
 */
let pending: Record<string, unknown>[] = [];
let listening = false;

const flush = () => {
  const queued = pending;
  pending = [];
  (window.dataLayer ??= []).push(...queued);
};

function watchConsent() {
  if (listening || typeof window === 'undefined') return;
  listening = true;
  onConsentChange((state) => {
    if (state === 'granted') flush();
    else pending = [];
  });
}

export function track(event: AnalyticsEvent, params: EventParams = {}) {
  if (typeof window === 'undefined') return;

  const payload: Record<string, unknown> = { event, page_path: window.location.pathname };
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') payload[key] = value;
  }

  const state = consentState();
  if (state === 'denied') return;
  if (state === 'unknown') {
    watchConsent();
    // A bounded queue: a visitor who never answers cannot grow it forever.
    if (pending.length < 50) pending.push(payload);
    return;
  }

  (window.dataLayer ??= []).push(payload);
}

/** The page type for a path, so every event carries the same vocabulary. */
export function pageTypeOf(path: string): string {
  const section = path.split('/').filter(Boolean)[0];
  if (!section) return 'home';
  if (section === 'products') return 'product';
  if (section === 'solutions') return 'solution';
  if (section === 'industries' || section === 'customers' || section === 'markets') {
    return 'segment';
  }
  if (section === 'resources') return 'resource';
  if (section === 'digital') return 'digital';
  if (section === 'company') return 'company';
  return section;
}
