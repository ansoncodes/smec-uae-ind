"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/lib/siteData";
import styles from "./Stats.module.css";

/**
 * Counts up the first time the band scrolls into view.
 *
 * The real figure is the DEFAULT state, not the end state. These numbers are
 * content, and a count-up that fails to run must never leave the page reading
 * "0+" — which is what a full-page screenshot produced, where the observer
 * never fired and every stat looked like an unfilled placeholder. So the value
 * only drops to zero in the same tick a confirmed-runnable animation starts,
 * and a timer restores the figure if that animation stalls.
 */
function useCountUp(target: number, duration = 1800) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(target);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Any reason we cannot animate: leave the real figure on screen.
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already on screen at mount — counting up under the reader is worse than
    // simply showing the number.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    let raf = 0;
    let failsafe = 0;

    const run = () => {
      io.disconnect();
      // requestAnimationFrame is throttled to a standstill in a hidden tab, so
      // don't blank the figure we cannot then animate back.
      if (document.hidden) return;

      const start = performance.now();
      setValue(0); // only now is showing zero safe

      const tick = (now: number) => {
        // A rAF timestamp is the time the frame began, which can predate the
        // performance.now() taken just above it — without the lower clamp the
        // first painted frame reads "-0+".
        const t = Math.min(1, Math.max(0, (now - start) / duration));
        // ease-out so the number settles instead of stopping dead
        setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
        if (t < 1) raf = requestAnimationFrame(tick);
        else window.clearTimeout(failsafe);
      };
      raf = requestAnimationFrame(tick);

      // Timers are only clamped in a backgrounded tab, never stopped, so this
      // is what guarantees the figure comes back if rAF dies mid-count.
      failsafe = window.setTimeout(() => {
        cancelAnimationFrame(raf);
        setValue(target);
      }, duration + 1000);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) run();
      },
      { threshold: 0.35 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(failsafe);
    };
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
    <div className={styles.stat} ref={ref}>
      <div className={styles.n}>
        {current.toLocaleString("en-US")}
        <span className={styles.suffix}>{suffix}</span>
      </div>
      <div className={styles.l}>{title}</div>
    </div>
  );
}

export default function Stats() {
  return (
    <section className={styles.section} id="year" aria-label="SMEC by the numbers">
      <div className="container">
        <div className={styles.statrow}>
          {stats.map((stat) => (
            <Stat key={stat.title} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
