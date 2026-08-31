'use client';

import { useEffect, useRef, useState } from 'react';
import { CLIENT_LOGOS } from '@/lib/siteData';
import styles from './Clients.module.css';

/* Live Swiper config: 9 / 2 / 5 per view, loop, 5s dwell, 500ms slide,
   advancing two logos at a time. */
const TRANSITION = 500;
const DWELL = 5000;
const STEP = 2;

function perViewFor(width: number) {
  if (width >= 1024) return 9;
  if (width >= 767) return 2;
  return 5;
}

export default function Clients() {
  const [perView, setPerView] = useState(9);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const busy = useRef(false);

  useEffect(() => {
    const apply = () => setPerView(perViewFor(window.innerWidth));
    apply();
    window.addEventListener('resize', apply);
    return () => window.removeEventListener('resize', apply);
  }, []);

  const total = CLIENT_LOGOS.length;
  const slides = [...CLIENT_LOGOS, ...CLIENT_LOGOS.slice(0, perView + STEP)];

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      if (busy.current) return;
      setAnimate(true);
      setIndex((i) => i + STEP);
    }, TRANSITION + DWELL);
    return () => clearInterval(id);
  }, [paused]);

  useEffect(() => {
    if (index < total) return;
    busy.current = true;
    const t = setTimeout(() => {
      setAnimate(false);
      setIndex((i) => i - total);
      requestAnimationFrame(() => {
        busy.current = false;
      });
    }, TRANSITION);
    return () => clearTimeout(t);
  }, [index, total]);

  return (
    <section className={styles.section} aria-labelledby="our-clients">
      <div className={styles.pill}>
        <h2 id="our-clients" className={styles.pillTitle}>
          Our Clients
        </h2>
      </div>

      <div
        className={styles.viewport}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <ul
          className={styles.track}
          style={{
            transform: `translate3d(-${(index * 100) / perView}%, 0, 0)`,
            transition: animate ? `transform ${TRANSITION}ms ease` : 'none',
          }}
        >
          {slides.map((logo, i) => (
            <li
              key={`${logo}-${i}`}
              className={styles.slide}
              style={{ flexBasis: `${100 / perView}%` }}
              aria-hidden={i >= total ? true : undefined}
            >
              {/* plain img: these repeat many times and are already
                  served at their display size */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo} alt="" width={150} height={52} className={styles.logo} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
