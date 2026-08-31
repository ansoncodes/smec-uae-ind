import Image from 'next/image';
import { HERO } from '@/lib/siteData';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <div className={styles.spacer} />
          <h1 className={styles.title}>{HERO.title}</h1>
          <h2 className={styles.subtitle}>{HERO.subtitle}</h2>
          <p className={styles.body}>
            {HERO.body[0]}
            <br />
            {HERO.body[1]}
          </p>
          <a href={HERO.cta.href} className={styles.cta}>
            {HERO.cta.label}
          </a>
        </div>

        <div className={styles.badgeWrap}>
          <Image
            src={HERO.badge.src}
            alt={HERO.badge.alt}
            width={HERO.badge.width}
            height={HERO.badge.height}
            className={styles.badge}
            priority
          />
        </div>
      </div>
    </section>
  );
}
