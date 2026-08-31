import Image from 'next/image';
import { CERTIFICATES } from '@/lib/siteData';
import styles from './Certifications.module.css';

export default function Certifications() {
  return (
    <section className={styles.section} aria-labelledby="our-certifications">
      <div className={styles.pillRow}>
        <div className={styles.pill}>
          <h2 id="our-certifications" className={styles.pillTitle}>
            Our Certifications
          </h2>
        </div>
        <div className={styles.pillSpacer} />
      </div>

      <div className={styles.grid}>
        {CERTIFICATES.map((cert) => (
          <div key={cert.src} className={styles.cell}>
            <Image
              src={cert.src}
              alt={cert.alt}
              width={cert.width}
              height={cert.height}
              className={styles.certificate}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
