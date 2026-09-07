import Image from 'next/image';
import { RD_FOCUS } from '@/lib/siteData';
import { Bolt } from './Icons';
import styles from './RDFocus.module.css';

/**
 * Dark photographic band after the template's testimonial section: the
 * copy sits inside a bracketed frame, the lime tile turns continuously.
 * The image is the site's own R&D banner.
 */
export default function RDFocus() {
  return (
    <section className={styles.section} aria-labelledby="rd-focus">
      <Image src={RD_FOCUS.image} alt="" fill sizes="100vw" className={styles.bg} />
      <div className={styles.scrim} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={`${styles.frame} brackets`}>
          <span className="tile spin" aria-hidden="true">
            <Bolt />
          </span>
          <h2 id="rd-focus" className={`${styles.heading} m-fade`}>
            {RD_FOCUS.title}
          </h2>
          <p className={`${styles.body} m-slide-down`}>{RD_FOCUS.body}</p>
        </div>
      </div>
    </section>
  );
}
