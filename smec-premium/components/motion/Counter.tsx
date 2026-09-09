'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  to: number;
  /** Rendered after the number, e.g. "+". */
  suffix?: string;
  duration?: number;
};

const format = (n: number) => n.toLocaleString('en-US');

/**
 * Counts up once, the first time it is scrolled into view. The final value is
 * rendered on the server and on first paint, so the number is correct before
 * hydration, correct without JavaScript and correct under reduced motion.
 */
export default function Counter({ to, suffix = '', duration = 1800 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setValue(0);
    let frame = 0;
    let start = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const tick = (now: number) => {
          if (!start) start = now;
          const t = Math.min(1, (now - start) / duration);
          // Ease-out cubic: fast off the mark, settles into the final figure.
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(Math.round(to * eased));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [to, duration]);

  return (
    <span ref={ref}>
      <span style={{ fontVariantNumeric: 'tabular-nums' }}>{format(value)}</span>
      {suffix}
    </span>
  );
}
