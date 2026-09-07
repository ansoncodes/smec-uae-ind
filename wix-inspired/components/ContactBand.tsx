import { CONTACT, FOOTER_ADDRESS, HERO } from '@/lib/siteData';
import { Bolt, Envelope, Phone } from './Icons';
import styles from './ContactBand.module.css';

/**
 * Pale, centred call-to-action band ahead of the footer, in the manner of
 * the template. Presentation only: every string here already exists
 * elsewhere on the page (the support label and entity name from the footer
 * address, the contact details from the header, the Contact Us link from
 * the hero).
 */
export default function ContactBand() {
  return (
    <section className={styles.band} aria-label="Contact SMEC Oil and Gas">
      <div className={`container ${styles.inner}`}>
        <span className="tile" aria-hidden="true">
          <Bolt />
        </span>
        <p className={styles.label}>{FOOTER_ADDRESS[0]}</p>
        <p className={styles.title}>{FOOTER_ADDRESS[1]}</p>

        <div className={styles.contacts}>
          <a href={CONTACT.phoneHref} className={styles.contactLink}>
            <Phone className={styles.icon} />
            <span>{CONTACT.phone}</span>
          </a>
          <a href={CONTACT.emailHref} className={styles.contactLink}>
            <Envelope className={styles.icon} />
            <span>{CONTACT.email}</span>
          </a>
        </div>

        <a href={HERO.cta.href} className="pill">
          {HERO.cta.label}
        </a>
      </div>
    </section>
  );
}
