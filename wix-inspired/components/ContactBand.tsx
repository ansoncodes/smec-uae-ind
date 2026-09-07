import type { CSSProperties } from 'react';
import { CONTACT, FOOTER_ADDRESS, HERO } from '@/lib/siteData';
import { Bolt, Envelope, Phone } from './Icons';
import styles from './ContactBand.module.css';

/**
 * Pale, centred call-to-action band ahead of the footer, in the manner of
 * the template: turning lime tile, label, 76px heading, 22px contact line,
 * pill. Presentation only: every string here already exists elsewhere on
 * the page (the support label and entity name from the footer address, the
 * contact details from the header, the Contact Us link from the hero).
 */
const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

export default function ContactBand() {
  return (
    <section className={styles.band} aria-label="Contact SMEC Oil and Gas">
      <div className={`container ${styles.inner}`}>
        <span className="tile spin" aria-hidden="true">
          <Bolt />
        </span>
        <p className={`${styles.label} m-fade`}>{FOOTER_ADDRESS[0]}</p>
        <p className={`${styles.title} m-slide-down`}>{FOOTER_ADDRESS[1]}</p>

        <div className={`${styles.contacts} m-fade`} style={delay(300)}>
          <a href={CONTACT.phoneHref} className={styles.contactLink}>
            <Phone className={styles.icon} />
            <span>{CONTACT.phone}</span>
          </a>
          <a href={CONTACT.emailHref} className={styles.contactLink}>
            <Envelope className={styles.icon} />
            <span>{CONTACT.email}</span>
          </a>
        </div>

        <a href={HERO.cta.href} className="pill m-fade" style={delay(800)}>
          {HERO.cta.label}
        </a>
      </div>
    </section>
  );
}
