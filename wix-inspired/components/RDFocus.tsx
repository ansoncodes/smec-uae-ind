import Image from 'next/image';
import { RD_FOCUS } from '@/lib/siteData';
import { Bolt } from './Icons';
import styles from './RDFocus.module.css';

/**
 * Dark photographic band with corner brackets, after the template's
 * testimonial section. The image is the site's own R&D banner.
 */
export default function RDFocus() {
  return (
    <section className={`${styles.section} brackets`} aria-labelledby="rd-focus">
      <Image src={RD_FOCUS.image} alt="" fill sizes="100vw" className={styles.bg} />
      <div className={styles.scrim} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <span className="tile" aria-hidden="true">
            <Bolt />
          </span>
          <h2 id="rd-focus" className={styles.heading}>
            {RD_FOCUS.title}
          </h2>
          <p className={styles.body}>{RD_FOCUS.body}</p>
        </div>
      </div>
    </section>
  );
}
