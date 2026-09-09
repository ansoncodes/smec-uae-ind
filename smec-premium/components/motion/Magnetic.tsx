'use client';

import { useEffect, useRef, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** How far the element may drift, in px. Keep it small — 6–12 reads best. */
  strength?: number;
  className?: string;
};

/**
 * Very slight magnetic pull toward the cursor. Desktop pointers only: it is
 * disabled for coarse pointers and for reduced motion, and it only ever writes
 * a transform, so it stays on the compositor.
 */
export default function Magnetic({ children, strength = 9, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;

    const move = (event: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = el.getBoundingClientRect();
        const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
        el.style.transform = `translate3d(${(dx * strength).toFixed(2)}px, ${(
          dy * strength
        ).toFixed(2)}px, 0)`;
      });
    };

    const reset = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      el.style.transform = '';
    };

    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', reset);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', reset);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [strength]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: 'inline-flex', transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1)' }}
    >
      {children}
    </span>
  );
}
