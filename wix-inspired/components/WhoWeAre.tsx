import Image from 'next/image';
import { WHO_WE_ARE } from '@/lib/siteData';
import { SCAFFOLD_WHO_WE_ARE } from '@/lib/scaffold';
import styles from './WhoWeAre.module.css';

/** Small label, oversized statement, and a bracketed people photograph. */
export default function WhoWeAre() {
  return (
    <section className={styles.section} aria-labelledby="who-we-are">
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <h2 id="who-we-are" className={styles.heading}>
            {WHO_WE_ARE.title}
          </h2>
          <p className={styles.body}>{WHO_WE_ARE.body}</p>
        </div>

        <div className={`${styles.media} brackets`}>
          {/* SCAFFOLD IMAGE: placeholder photograph — replace via lib/scaffold.ts */}
          <Image
            src={SCAFFOLD_WHO_WE_ARE.src}
            alt={SCAFFOLD_WHO_WE_ARE.alt}
            width={1600}
            height={1200}
            sizes="(max-width: 900px) 92vw, 640px"
            className={styles.image}
            data-scaffold={SCAFFOLD_WHO_WE_ARE.id}
          />
        </div>
      </div>
    </section>
  );
}
