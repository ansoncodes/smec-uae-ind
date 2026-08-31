import Image from 'next/image';
import { PARTNERS } from '@/lib/siteData';
import styles from './ApprovedPartners.module.css';

export default function ApprovedPartners() {
  return (
    <section className={styles.section} aria-label="Approved Partners">
      <div className={styles.row}>
        <div className={styles.pill}>
          <h2 className={styles.pillTitle}>Approved Partners</h2>
        </div>

        {PARTNERS.map((partner) => (
          <div key={partner.alt} className={styles.logoCell}>
            <Image
              src={partner.src}
              alt={partner.alt}
              width={partner.width}
              height={partner.height}
              className={styles.logo}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
