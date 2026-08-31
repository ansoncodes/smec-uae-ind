'use client';

import { useEffect, useRef, useState } from 'react';
import { STATS } from '@/lib/siteData';
import styles from './Stats.module.css';

const DURATION = 2000; // matches data-duration on the live counters

function useCountUp(target: number, run: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const tick = (t: number) => {
      if (start === null) start = t;
      const progress = Math.min((t - start) / DURATION, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setValue(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
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
    <div className={styles.counter} ref={ref}>
      <div className={styles.number}>
        <span>{current.toLocaleString('en-US')}</span>
        <span className={styles.suffix}>+</span>
      </div>
      <div className={styles.title}>{label}</div>
    </div>
  );
}

export default function Stats() {
  return (
    <section className={styles.section} aria-label="SMEC by the numbers">
      <div className={styles.inner}>
        {STATS.map((stat) => (
          <Counter key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>
    </section>
  );
}
