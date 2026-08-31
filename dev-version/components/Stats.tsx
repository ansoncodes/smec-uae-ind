"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/lib/siteData";
import styles from "./Stats.module.css";

/** Counts up the first time the band scrolls into view. */
function useCountUp(target: number, duration = 1800) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    const run = () => {
      if (started.current) return;
      started.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        // ease-out so the number settles instead of stopping dead
        setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (typeof IntersectionObserver === "undefined") {
      run();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  return { ref, value };
}

function Stat({
  title,
  value,
  suffix,
}: {
  title: string;
  value: number;
  suffix: string;
}) {
  const { ref, value: current } = useCountUp(value);

  return (
    <div className={styles.item} ref={ref}>
      <div className={styles.number}>
        {current.toLocaleString("en-US")}
        <span className={styles.suffix}>{suffix}</span>
      </div>
      <div className={styles.title}>{title}</div>
    </div>
  );
}

export default function Stats() {
  return (
    <section className={styles.section} id="year" aria-label="SMEC by the numbers">
      <div className="container container-wide">
        <div className={styles.panel}>
          {stats.map((stat) => (
            <Stat key={stat.title} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
