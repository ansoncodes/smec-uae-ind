"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import styles from "./Reveal.module.css";

type Props = {
  children: ReactNode;
  /** Stagger in ms, applied only once the element enters the viewport. */
  delay?: number;
  as?: ElementType;
  className?: string;
};

/** Nothing may stay hidden longer than this, whatever the observer does. */
const FAILSAFE_MS = 2500;

/**
 * Entrance choreography, built so content can never be stranded invisible.
 *
 * Three independent guarantees:
 *  1. The hidden state is only ever applied by JS, so no-JS renders visible.
 *  2. The observer also reveals anything the viewport has already passed —
 *     a fast programmatic scroll can skip the intersecting frame entirely.
 *  3. A failsafe timer reveals everything regardless after 2.5s.
 *
 * Motion is skipped outright under prefers-reduced-motion.
 */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const node = ref.current;
    if (!node) return;

    // Already on screen at mount (above the fold): leave it alone.
    if (node.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    setArmed(true);

    const reveal = () => {
      setShown(true);
      io.disconnect();
      clearTimeout(failsafe);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        // isIntersecting alone is not enough: scroll fast and the element can
        // go from below the fold to above it without an intersecting frame.
        if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight) {
          reveal();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );
    io.observe(node);

    const failsafe = setTimeout(reveal, FAILSAFE_MS);

    return () => {
      io.disconnect();
      clearTimeout(failsafe);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={[styles.reveal, armed && !shown ? styles.hidden : "", className]
        .filter(Boolean)
        .join(" ")}
      style={armed ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
