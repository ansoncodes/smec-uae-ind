/**
 * Google Tag Manager and GA4, as SMEC sent them on 25 September for
 * smecoilandgas.com, loaded only once a visitor accepts analytics.
 *
 * Both IDs come from the environment and are set in production only, so a
 * preview or a local build never reports into SMEC's property. Clarity is not
 * here on purpose: the container loads it, and a second copy would count every
 * session twice.
 *
 * SMEC asked for gtag and the container separately. If the container also
 * holds a GA4 tag for the same measurement ID, every page view is counted
 * twice (audit ANA-07, a question still with SMEC). Leaving NEXT_PUBLIC_GA4_ID
 * unset hands GA4 to the container alone; nothing else changes.
 *
 * Both share the one `dataLayer` that lib/analytics.ts pushes its events onto,
 * which is what lets the container's triggers see them.
 */

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

let loaded = false;

function inject(src: string) {
  const script = document.createElement('script');
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

/**
 * Call only with consent. Safe to call more than once: the first call loads
 * the tags and the rest do nothing.
 */
export function loadTags() {
  if (loaded || typeof window === 'undefined') return;
  loaded = true;

  const dataLayer = (window.dataLayer ??= []);

  if (GTM_ID) {
    // At the front, not the end. Events can reach the dataLayer before this
    // runs — the queue lib/analytics.ts flushes on Accept, or one raised on a
    // return visit before the banner has mounted — and the container must
    // still read its own start event first.
    dataLayer.unshift({ 'gtm.start': Date.now(), event: 'gtm.js' });
    inject(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`);
  }

  if (GA4_ID) {
    // Google's snippet as given: gtag.js reads the arguments object itself,
    // so it is pushed as it is rather than copied into an array.
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      dataLayer.push(arguments as unknown as Record<string, unknown>);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA4_ID);
    inject(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID)}`);
  }
}

/** For the `<noscript>` fallback, which has to be in the server HTML. */
export const GTM_NOSCRIPT = GTM_ID
  ? `https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(GTM_ID)}`
  : null;
