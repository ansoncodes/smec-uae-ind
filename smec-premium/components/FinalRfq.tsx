'use client';

import { useState } from 'react';
import { FINAL_RFQ_COPY } from '@/lib/homepage';
import { DEFAULT_REGION, REGIONS, rfqHref, type RegionId } from '@/lib/regions';
import { ArrowRight, ArrowUpRight, Mail, Phone } from './Icons';
import styles from './FinalRfq.module.css';

/**
 * Have a Technical Requirement? — her closing section, with the project
 * region chooser of images 30–31. Picking a region swaps the regional
 * contacts and points "Submit a Technical RFQ" at the form with that region
 * already chosen (`/contact/?region=…`), where it can still be changed.
 *
 * Both regions' contacts are in the markup; the choice only decides which
 * one shows. The Middle East desk is the default, as on every UAE page.
 */
export default function FinalRfq() {
  const { label, title, lead, body, chooserTitle, cta } = FINAL_RFQ_COPY;
  const [region, setRegion] = useState<RegionId>(DEFAULT_REGION);

  return (
    <section className={`${styles.section} grain`} id="contact" data-tone="dark" aria-labelledby="rfq-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <p className={styles.kicker} data-reveal="fade">
            <span className={styles.kickerDot} aria-hidden="true" />
            {label}
          </p>
          <h2 id="rfq-title" className={styles.title} data-reveal="up">
            {title}
          </h2>
          <p className={styles.lead} data-reveal="up" data-reveal-delay="90">
            {lead}
          </p>
          <p className={styles.body} data-reveal="up" data-reveal-delay="120">
            {body}
          </p>
        </div>

        <div className={styles.card} data-reveal="up" data-reveal-delay="150">
          <fieldset className={styles.choices}>
            <legend className={styles.legend}>{chooserTitle}</legend>
            {REGIONS.map((option) => (
              <label key={option.id} className={styles.choice}>
                <input
                  type="radio"
                  name="home-rfq-region"
                  value={option.id}
                  checked={region === option.id}
                  onChange={() => setRegion(option.id)}
                />
                <span>
                  {option.label} — {option.entity}
                </span>
              </label>
            ))}
          </fieldset>

          {REGIONS.map((option) => (
            <div key={option.id} className={styles.desk} hidden={region !== option.id}>
              <p className={styles.deskTitle}>{option.desk}</p>
              <ul className={styles.deskLines}>
                <li>
                  <Mail className={styles.deskIcon} />
                  <span>
                    Email: <a href={option.emailHref}>{option.email}</a>
                  </span>
                </li>
                <li>
                  <Phone className={styles.deskIcon} />
                  <span>
                    Phone: <a href={option.phoneHref}>{option.phone}</a>
                  </span>
                </li>
              </ul>
              <a className={styles.mail} href={option.emailHref}>
                {option.mailLabel}
                <ArrowUpRight />
              </a>
            </div>
          ))}

          <a className={`btn btnAccent ${styles.submit}`} href={rfqHref(region)}>
            {cta}
            <ArrowRight className="arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}
