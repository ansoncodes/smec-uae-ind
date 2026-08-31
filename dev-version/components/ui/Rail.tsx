"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/Icons";
import styles from "./Rail.module.css";

type RailProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  /** CSS width for a single card at each breakpoint. */
  cardWidth?: { desktop: string; tablet: string; mobile: string };
  gap?: number;
  ariaLabel: string;
  /** Optional autoscroll interval in ms; `0` disables it. */
  autoplayDelay?: number;
};

/**
 * A scroll-snapped horizontal rail — the pattern most SaaS marketing pages use
 * for card sets that are too long to grid out. Native overflow scrolling keeps
 * touch, trackpad and keyboard behaviour for free; the arrows page it on
 * pointer devices.
 */
export default function Rail<T>({
  items,
  renderItem,
  cardWidth = { desktop: "320px", tablet: "300px", mobile: "82vw" },
  gap = 20,
  ariaLabel,
  autoplayDelay = 0,
}: RailProps<T>) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [paused, setPaused] = useState(false);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const page = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth + gap : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }, [gap]);

  useEffect(() => {
    if (!autoplayDelay || paused) return;
    const id = window.setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        page(1);
      }
    }, autoplayDelay);
    return () => window.clearInterval(id);
  }, [autoplayDelay, paused, page]);

  return (
    <div
      className={styles.root}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        className={styles.track}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
        style={
          {
            gap: `${gap}px`,
            ["--card-w" as string]: cardWidth.desktop,
            ["--card-w-tablet" as string]: cardWidth.tablet,
            ["--card-w-mobile" as string]: cardWidth.mobile,
          } as React.CSSProperties
        }
      >
        {items.map((item, i) => (
          <div className={styles.cell} key={i}>
            {renderItem(item, i)}
          </div>
        ))}
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.arrow}
          onClick={() => page(-1)}
          disabled={atStart}
          aria-label="Scroll left"
        >
          <ChevronLeftIcon size={16} />
        </button>
        <button
          type="button"
          className={styles.arrow}
          onClick={() => page(1)}
          disabled={atEnd}
          aria-label="Scroll right"
        >
          <ChevronRightIcon size={16} />
        </button>
      </div>
    </div>
  );
}
