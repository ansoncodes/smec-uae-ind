/**
 * Analytics consent.
 *
 * The Developer Brief requires a consent implementation before UAT (§10) and
 * the wording to come from SMEC (§11, docs/spec-alignment.md 0.9). Those are
 * two different things: the mechanism is a build job, the sentence is a legal
 * one. This is the mechanism, and the sentence it shows is a plain-English
 * stand-in marked for replacement.
 *
 * Nothing is measured until a visitor chooses. Events raised before then are
 * held in memory and released on acceptance, or dropped on refusal — so a
 * page view is not silently lost, and it is not silently recorded either.
 */

export type ConsentState = 'granted' | 'denied' | 'unknown';

const KEY = 'smec.consent.analytics';
const listeners = new Set<(state: ConsentState) => void>();

/** Reading storage can throw in a private window or with cookies blocked. */
export function consentState(): ConsentState {
  if (typeof window === 'undefined') return 'unknown';
  try {
    const value = window.localStorage.getItem(KEY);
    return value === 'granted' || value === 'denied' ? value : 'unknown';
  } catch {
    return 'unknown';
  }
}

export function setConsent(state: Exclude<ConsentState, 'unknown'>) {
  try {
    window.localStorage.setItem(KEY, state);
  } catch {
    /* A visitor who blocks storage is asked again next time, which is the
       safe failure: it never assumes consent it could not record. */
  }
  for (const listener of listeners) listener(state);
}

export function onConsentChange(listener: (state: ConsentState) => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
