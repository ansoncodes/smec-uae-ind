'use client';

import { useEffect, useState } from 'react';
import { CONTACT, SITE } from '@/lib/siteData';
import { localHref } from '@/lib/routes';
import { ArrowDown, WhatsApp } from './Icons';
import styles from './FloatingWidgets.module.css';

/**
 * Edge widgets: the quick-enquiry tab, WhatsApp, and a back-to-top control
 * that appears once the page has moved. The scroll progress ring around the
 * top button doubles as a read indicator.
 */
export default function FloatingWidgets() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const shown = progress > 0.03;

  return (
    <>
      <a
        href={localHref(`${SITE.url}/contact-us`)}
        className={styles.enquiry}
        aria-label="Quick Enquiry"
      >
        <span>Quick Enquiry</span>
      </a>

      <div className={styles.stack}>
        <a
          href={CONTACT.whatsapp}
          className={styles.whatsapp}
          aria-label="Chat with us on WhatsApp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsApp />
        </a>

        <button
          type="button"
          className={`${styles.top} ${shown ? styles.topShown : ''}`}
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <svg className={styles.ring} viewBox="0 0 44 44" aria-hidden="true">
            <circle className={styles.ringTrack} cx="22" cy="22" r="20" />
            <circle
              className={styles.ringFill}
              cx="22"
              cy="22"
              r="20"
              pathLength={1}
              style={{ strokeDashoffset: 1 - progress }}
            />
          </svg>
          <ArrowDown className={styles.topIcon} />
        </button>
      </div>
    </>
  );
}
