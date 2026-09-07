import Image from 'next/image';
import { RD_FOCUS } from '@/lib/siteData';
import styles from './RDFocus.module.css';

/** Full-bleed photographic band; the image is the site's own R&D banner. */
export default function RDFocus() {
  return (
    <section className={styles.section} aria-labelledby="rd-focus">
      <Image src={RD_FOCUS.image} alt="" fill sizes="100vw" className={styles.bg} />
      <div className={styles.scrim} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <h2 id="rd-focus" className={styles.heading}>
            {RD_FOCUS.title}
          </h2>
          <p className={styles.body}>{RD_FOCUS.body}</p>
        </div>
      </div>
    </section>
  );
}
