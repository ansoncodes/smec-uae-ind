'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Scroll-triggered entrance group, after the Wix motion system the reference
 * template uses. The wrapper only observes; descendants carrying an `m-*`
 * class (see globals.css) play their entrance once the wrapper is in view:
 *
 *   m-fade        opacity 0 → 1                       (1200ms)
 *   m-slide-down  drops in from its own height, masked (1200ms)
 *   m-slide-up    rises from its own height, masked    (1000ms)
 *   m-reveal      clip-path wipe upwards               (1200ms)
 *
 * Stagger with `--d` on the element. Reduced-motion users and browsers
 * without IntersectionObserver see everything immediately; without
 * JavaScript the noscript rule in app/layout.tsx shows everything.
 */
export default function Motion({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.06, rootMargin: '0px 0px -6% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} data-motion="" data-in={on ? '' : undefined}>
      {children}
    </div>
  );
}
