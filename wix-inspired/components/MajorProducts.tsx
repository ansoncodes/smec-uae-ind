'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { PRODUCTS, PRODUCTS_INTRO } from '@/lib/siteData';
import { AngleLeft, AngleRight } from './Icons';
import styles from './MajorProducts.module.css';

/* Mirrors the live Swiper config: loop, 500ms slide, 500ms dwell,
   4 / 2 / 1 slides per view, pause on hover. */
const TRANSITION = 500;
const DWELL = 500;

function perViewFor(width: number) {
  if (width >= 1024) return 4;
  if (width >= 767) return 2;
  return 1;
}

export default function MajorProducts() {
  const [perView, setPerView] = useState(4);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const resetting = useRef(false);

  useEffect(() => {
    const apply = () => setPerView(perViewFor(window.innerWidth));
    apply();
    window.addEventListener('resize', apply);
    return () => window.removeEventListener('resize', apply);
  }, []);

  const total = PRODUCTS.length;
  // Head clones let the track run past the end and snap back invisibly.
  const slides = [...PRODUCTS, ...PRODUCTS.slice(0, perView)];

  const advance = useCallback(
    (step: number) => {
      if (resetting.current) return;
      setAnimate(true);
      setIndex((i) => i + step);
    },
    []
  );

  // Snap back to the real slide once a clone scrolls into place.
  useEffect(() => {
    if (index >= total) {
      resetting.current = true;
      const t = setTimeout(() => {
        setAnimate(false);
        setIndex((i) => i - total);
        requestAnimationFrame(() => {
          resetting.current = false;
        });
      }, TRANSITION);
      return () => clearTimeout(t);
    }
    if (index < 0) {
      resetting.current = true;
      const t = setTimeout(() => {
        setAnimate(false);
        setIndex((i) => i + total);
        requestAnimationFrame(() => {
          resetting.current = false;
        });
      }, TRANSITION);
      return () => clearTimeout(t);
    }
  }, [index, total]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => advance(1), TRANSITION + DWELL);
    return () => clearInterval(id);
  }, [paused, advance]);

  return (
    <section className={styles.section} aria-labelledby="major-products">
      <div className={styles.inner}>
        <div className={styles.stack}>
          <h2 id="major-products" className={`${styles.heading} m-fade`}>
            Our Major Products
          </h2>
          <p className={`${styles.intro} m-slide-down`}>{PRODUCTS_INTRO}</p>

          <div
            className={styles.carousel}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
          <button
            type="button"
            className={`${styles.arrow} ${styles.prev} m-fade`}
            aria-label="Previous products"
            onClick={() => advance(-1)}
          >
            <AngleLeft />
          </button>

          <div className={styles.viewport}>
            <ul
              className={styles.track}
              style={{
                transform: `translate3d(-${(index * 100) / perView}%, 0, 0)`,
                transition: animate ? `transform ${TRANSITION}ms ease` : 'none',
              }}
            >
              {slides.map((product, i) => (
                <li
                  key={`${product.title}-${i}`}
                  className={`${styles.slide} m-fade`}
                  style={{ flexBasis: `${100 / perView}%` }}
                  aria-hidden={i >= total ? true : undefined}
                >
                  <article className={styles.card}>
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={product.width}
                      height={product.height}
                      className={styles.cardImage}
                    />
                    <h2 className={styles.cardTitle}>{product.title}</h2>
                    <h3
                      className={
                        product.scale === 'lead' ? styles.cardTaglineLead : styles.cardTagline
                      }
                    >
                      {product.tagline}
                    </h3>
                    <p
                      className={
                        product.scale === 'lead' ? styles.cardBodyLead : styles.cardBody
                      }
                    >
                      {product.body}
                    </p>
                    {product.spacer > 0 && (
                      <div className={styles.cardSpacer} style={{ height: product.spacer }} />
                    )}
                    <a href={product.href} className={styles.cardButton}>
                      Know More
                    </a>
                  </article>
                </li>
              ))}
            </ul>
          </div>

            <button
              type="button"
              className={`${styles.arrow} ${styles.next} m-fade`}
              aria-label="Next products"
              onClick={() => advance(1)}
            >
              <AngleRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
