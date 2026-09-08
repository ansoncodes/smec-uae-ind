'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { HERO } from '@/lib/siteData';
import { SCAFFOLD_HERO_SLIDES } from '@/lib/scaffold';
import { AngleRight } from './Icons';
import styles from './Hero.module.css';

/**
 * smec.com-style hero: full-bleed photography that slides behind one fixed
 * block of copy. The headline, subtitle, body, CTA and badge are exactly the
 * wireframe's; only the photograph rotates.
 *
 * The scaffold photographs lead (see lib/scaffold.ts) and are to be swapped
 * for client photography; the real site banner runs last in the rotation.
 */
const DWELL = 6500;

const SLIDES = [
  ...SCAFFOLD_HERO_SLIDES.map((s) => ({ id: s.id, src: s.src, scaffold: true })),
  { id: 'banner', src: HERO.image, scaffold: false },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  // Slides are mounted as they are first needed so the page does not fetch
  // five large photographs up front.
  const [reach, setReach] = useState(1);

  useEffect(() => {
    setReach((r) => Math.max(r, Math.min(active + 1, SLIDES.length - 1)));
  }, [active]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % SLIDES.length), DWELL);
    return () => clearInterval(id);
  }, [active]);

  return (
    <section className={styles.hero} aria-label={HERO.title}>
      <div className={styles.slides} aria-hidden="true">
        {SLIDES.map((slide, i) =>
          i <= reach ? (
            <div
              key={slide.id}
              className={`${styles.slide} ${i === active ? styles.slideActive : ''}`}
              data-scaffold={slide.scaffold ? slide.id : undefined}
            >
              {/* SCAFFOLD IMAGE when data-scaffold is set — replace via lib/scaffold.ts */}
              <Image
                src={slide.src}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className={styles.slideImage}
              />
            </div>
          ) : null
        )}
      </div>
      <div className={styles.scrim} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
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
          />
        </div>
      </div>

      <div className={`container ${styles.controls}`}>
        <div className={styles.dots} role="tablist" aria-label="Hero photographs">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Photograph ${i + 1} of ${SLIDES.length}`}
              className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
        <button
          type="button"
          className={styles.next}
          aria-label="Next photograph"
          onClick={() => setActive((a) => (a + 1) % SLIDES.length)}
        >
          <AngleRight />
        </button>
      </div>
    </section>
  );
}
