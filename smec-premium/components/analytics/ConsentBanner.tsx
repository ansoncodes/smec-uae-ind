'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { consentState, onConsentChange, setBannerClearance, setConsent } from '@/lib/consent';
import { loadTags } from '@/lib/tags';
import styles from './ConsentBanner.module.css';

/**
 * The consent choice, asked once.
 *
 * WORDING IS A STAND-IN. The Developer Brief puts cookie and consent wording
 * with SMEC's legal review (§11, docs/spec-alignment.md 0.9); what is written
 * below is plain English so the mechanism can be built and tested, and it is
 * the one string a lawyer needs to replace.
 *
 * It is fixed to the bottom of the viewport and rendered only after mount, so
 * it cannot move the page — the build measures 0.000 CLS and this must not
 * change that. Refusing is one button, the same size as accepting: a consent
 * request where "no" is harder than "yes" is not a choice.
 *
 * It is also the gate the tags load through (lib/tags.ts): at once on a
 * return visit with consent on record, on Accept on a first visit, and never
 * after Decline.
 */
export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const state = consentState();
    if (state === 'granted') {
      loadTags();
      return;
    }
    if (state === 'unknown') setVisible(true);
    return onConsentChange((next) => {
      if (next === 'granted') loadTags();
    });
  }, []);

  // While open, tell the floating controls how much of the corner it takes.
  useEffect(() => {
    const node = bar.current;
    if (!visible || !node) return;

    const measure = () => setBannerClearance(window.innerHeight - node.getBoundingClientRect().top);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
      setBannerClearance(0);
    };
  }, [visible]);

  if (!visible) return null;

  const choose = (state: 'granted' | 'denied') => {
    setConsent(state);
    setVisible(false);
  };

  return (
    <div
      ref={bar}
      className={styles.bar}
      role="region"
      aria-label="Analytics consent"
      data-consent-banner=""
    >
      <p className={styles.copy}>
        We would like to measure how this site is used — pages viewed and enquiries sent — so
        we can improve it. No personal details from an enquiry are ever sent to analytics.{' '}
        <Link className={styles.link} href="/privacy-policy/">
          Privacy notice
        </Link>
      </p>

      <div className={styles.actions}>
        <button type="button" className={styles.decline} onClick={() => choose('denied')}>
          Decline
        </button>
        <button type="button" className={styles.accept} onClick={() => choose('granted')}>
          Accept
        </button>
      </div>
    </div>
  );
}
