import { RD_FOCUS } from '@/lib/siteData';
import styles from './RDFocus.module.css';

export default function RDFocus() {
  return (
    <section className={styles.section} aria-labelledby="rd-focus">
      <div className={styles.inner}>
        <h2 id="rd-focus" className={styles.heading}>
          {RD_FOCUS.title}
        </h2>
        <p className={styles.body}>{RD_FOCUS.body}</p>
      </div>
    </section>
  );
}
