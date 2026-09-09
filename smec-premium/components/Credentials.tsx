import Image from 'next/image';
import { PARTNERS, STATS } from '@/lib/siteData';
import Counter from './motion/Counter';
import styles from './Credentials.module.css';

/**
 * The credentials strip, directly under the hero: four counters on a ruled
 * grid, then the approved-partner marks. Figures are the site's own.
 */
export default function Credentials() {
  return (
    <section className={styles.section} id="credentials" aria-label="SMEC by the numbers">
      <div className={styles.grid} aria-hidden="true" />

      <div className="container">
        <ul className={styles.stats}>
          {STATS.map((stat, i) => (
            <li
              key={stat.label}
              className={styles.stat}
              data-reveal="up"
              data-reveal-delay={i * 90}
            >
              <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.value}>
                <Counter to={stat.value} suffix="+" />
              </span>
              <span className={styles.label}>{stat.label}</span>
            </li>
          ))}
        </ul>

        <div className={styles.partners} data-reveal="fade" data-reveal-delay="140">
          <p className={styles.partnersLabel}>Approved Partners</p>
          <div className={styles.partnersRow}>
            {PARTNERS.map((partner) => (
              <span key={partner.alt} className={styles.partner}>
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  width={partner.width}
                  height={partner.height}
                  sizes="180px"
                  className={styles.partnerLogo}
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
