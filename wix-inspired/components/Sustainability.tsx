import Image from 'next/image';
import { SUSTAINABILITY } from '@/lib/siteData';
import styles from './Sustainability.module.css';

export default function Sustainability() {
  return (
    <section className={styles.section} aria-labelledby="sustainability">
      <div className={styles.copyCol}>
        <h2 id="sustainability" className={`${styles.heading} m-fade`}>
          {SUSTAINABILITY.title}
        </h2>
        <p className={`${styles.body} m-slide-down`}>{SUSTAINABILITY.body}</p>
      </div>

      <div className={`${styles.imageCol} m-reveal`}>
        <Image
          src={SUSTAINABILITY.image}
          alt="SMEC promoting sustainable energy awareness"
          width={SUSTAINABILITY.width}
          height={SUSTAINABILITY.height}
          className={styles.image}
        />
      </div>
    </section>
  );
}
