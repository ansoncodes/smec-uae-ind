import { WHO_WE_ARE } from '@/lib/siteData';
import styles from './WhoWeAre.module.css';

export default function WhoWeAre() {
  return (
    <section className={styles.section} aria-labelledby="who-we-are">
      <div className={styles.inner}>
        <h2 id="who-we-are" className={styles.heading}>
          {WHO_WE_ARE.title}
        </h2>
        <p className={styles.body}>{WHO_WE_ARE.body}</p>
      </div>
    </section>
  );
}
