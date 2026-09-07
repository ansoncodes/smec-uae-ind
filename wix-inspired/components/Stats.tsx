'use client';

import { useEffect, useRef, useState } from 'react';
import { STATS } from '@/lib/siteData';
import styles from './Stats.module.css';

const DURATION = 2000; // matches data-duration on the live counters

function useCountUp(target: number, run: boolean) {
  // Starts at the final value so the figure is right even when the observer
  // never fires (background tab, print, static capture); counts up from 0
  // only once the section is confirmed on screen.
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (!run) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    setValue(0);
    const tick = (t: number) => {
      if (start === null) start = t;
      const progress = Math.min(Math.max(0, t - start) / DURATION, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setValue(target);
    };
    raf = requestAnimationFrame(tick);
    const failsafe = setTimeout(() => setValue(target), DURATION + 500);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(failsafe);
    };
  }, [target, run]);

  return value;
}

function Counter({ label, value }: { label: string; value: number }) {
  const [run, setRun] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = useCountUp(value, run);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`${styles.counter} m-slide-down`} ref={ref}>
      <div className={styles.number}>
        <span>{current.toLocaleString('en-US')}</span>
        <span className={styles.suffix}>+</span>
      </div>
      <div className={styles.title}>{label}</div>
    </div>
  );
}

/** Four oversized figures between hairlines, in the template's typographic manner. */
export default function Stats() {
  return (
    <section className={styles.section} aria-label="SMEC by the numbers">
      <div className={`container ${styles.inner}`}>
        {STATS.map((stat) => (
          <Counter key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>
    </section>
  );
}
