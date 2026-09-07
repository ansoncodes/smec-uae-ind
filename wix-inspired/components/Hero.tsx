'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { HERO } from '@/lib/siteData';
import { SCAFFOLD_HERO_SLIDES } from '@/lib/scaffold';
import { AngleRight } from './Icons';
import styles from './Hero.module.css';

/**
 * Template-style hero: a giant headline over a hairline, then a row with
 * the statement copy left and the pill button right, then a full-bleed
 * photo band with corner brackets. The headline, subtitle, body, CTA and
 * badge are exactly the wireframe's; only the photograph rotates.
 *
 * Slide 0 is the real site banner. Every slide after it is a SCAFFOLD IMAGE
 * (see lib/scaffold.ts) to be swapped for client photography.
 */
const DWELL = 6500;

const SLIDES = [
  { id: 'banner', src: HERO.image, scaffold: false },
  ...SCAFFOLD_HERO_SLIDES.map((s) => ({ id: s.id, src: s.src, scaffold: true })),
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
      <div className="container">
        <h1 className={styles.title}>{HERO.title}</h1>
        <div className={styles.rule} aria-hidden="true" />
        <div className={styles.row}>
          <div className={styles.copy}>
            <h2 className={styles.subtitle}>{HERO.subtitle}</h2>
            <p className={styles.body}>
              {HERO.body[0]}
              <br />
              {HERO.body[1]}
            </p>
          </div>
          <a href={HERO.cta.href} className="pill">
            {HERO.cta.label}
          </a>
        </div>
      </div>

      <div className={`${styles.band} brackets`}>
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

        {/* the ADNOC ICV credential, kept as a small card on the photograph */}
        <div className={styles.badgeWrap}>
          <Image
            src={HERO.badge.src}
            alt={HERO.badge.alt}
            width={HERO.badge.width}
            height={HERO.badge.height}
            className={styles.badge}
          />
        </div>

        <div className={styles.controls}>
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
      </div>
    </section>
  );
}
