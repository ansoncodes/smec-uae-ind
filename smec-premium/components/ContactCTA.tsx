import { CONTACT, FOOTER_ADDRESS, SITE } from '@/lib/siteData';
import { localHref } from '@/lib/routes';
import Magnetic from './motion/Magnetic';
import { ArrowRight, Mail, Phone, Pin } from './Icons';
import styles from './ContactCTA.module.css';

/**
 * Closing call to action. The background is a set of hairline verticals that
 * drift very slowly — enough to keep the band from reading as a flat block,
 * far too slow to be noticed as an animation.
 */
export default function ContactCTA() {
  return (
    <section className={`${styles.section} grain`} id="contact" aria-labelledby="contact-title">
      <div className={styles.lines} aria-hidden="true">
        {Array.from({ length: 7 }, (_, i) => (
          <span key={i} style={{ ['--i' as string]: i }} />
        ))}
      </div>

      <div className={`container ${styles.inner}`}>
        <p className={styles.kicker} data-reveal="fade">
          <span className={styles.kickerDot} aria-hidden="true" />
          Start a conversation
        </p>

        <h2 id="contact-title" className={styles.title} data-reveal="up">
          Have a complex
          <br />
          engineering challenge?
        </h2>

        <p className={styles.body} data-reveal="up" data-reveal-delay="90">
          Let&rsquo;s build the right solution together.
        </p>

        <div className={styles.ctas} data-reveal="up" data-reveal-delay="150">
          <Magnetic>
            <a className={`btn btnAccent ${styles.cta}`} href={localHref(`${SITE.url}/contact-us`)}>
              Talk to SMEC
              <ArrowRight className="arrow" />
            </a>
          </Magnetic>
          <Magnetic>
            <a className={`btn btnOutline ${styles.cta}`} href={CONTACT.emailHref}>
              Send an Enquiry
              <ArrowRight className="arrow" />
            </a>
          </Magnetic>
        </div>

        <ul className={styles.details} data-reveal="up" data-reveal-delay="210">
          <li>
            <Pin className={styles.icon} />
            <span>
              <span className={styles.detailLabel}>{FOOTER_ADDRESS[0]}</span>
              {FOOTER_ADDRESS[1]}, {FOOTER_ADDRESS[2]}, {FOOTER_ADDRESS[3]}
            </span>
          </li>
          <li>
            <Phone className={styles.icon} />
            <span>
              <span className={styles.detailLabel}>Call</span>
              <a className="wipeLink" href={CONTACT.phoneHref}>
                {CONTACT.phone}
              </a>
            </span>
          </li>
          <li>
            <Mail className={styles.icon} />
            <span>
              <span className={styles.detailLabel}>Email</span>
              <a className="wipeLink" href={CONTACT.emailHref}>
                {CONTACT.email}
              </a>
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
