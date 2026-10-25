'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from './Icons';
import styles from './Insights.module.css';

export type InsightCard = {
  url: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
};

/**
 * Insights & perspectives — the site's own articles in a sliding row, as the
 * client asked on 10 September.
 *
 * The row is a native horizontal scroller with snap points, so touch,
 * trackpad and keyboard all move it the way the platform already does:
 * tabbing to a card brings it into view. Previous and next step a page at a
 * time, and the counter and bar show where the reader is. Nothing moves on
 * its own.
 */
export default function Insights({ items }: { items: InsightCard[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [range, setRange] = useState({ first: 0, last: 0 });

  /** Which cards are fully in view, from the scroller's own geometry. */
  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const box = track.getBoundingClientRect();
    const cards = Array.from(track.children) as HTMLElement[];
    let first = -1;
    let last = -1;
    cards.forEach((card, i) => {
      const r = card.getBoundingClientRect();
      if (r.left >= box.left - 2 && r.right <= box.right + 2) {
        if (first < 0) first = i;
        last = i;
      }
    });
    if (first < 0) first = last = 0;
    setRange((current) =>
      current.first === first && current.last === last ? current : { first, last }
    );
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    measure();
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [measure]);

  const step = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track || (direction < 0 ? atStart : atEnd)) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({ left: direction * track.clientWidth * 0.9, behavior: reduced ? 'auto' : 'smooth' });
  };

  const count = items.length;
  const atStart = range.first <= 0;
  const atEnd = range.last >= count - 1;
  const pad = (n: number) => String(n).padStart(2, '0');

  /* aria-disabled rather than disabled: a button that disables itself under
     the keyboard would throw focus back to the top of the page. */

  return (
    <div className={styles.insights}>
      <div className={styles.head}>
        <h3 className={styles.title} id="insights-title">
          Insights &amp; perspectives
        </h3>
        <div className={styles.controls}>
          <p className={styles.count} aria-live="polite">
            <span className="visuallyHidden">Showing articles </span>
            {pad(range.first + 1)}
            {range.last > range.first ? `–${pad(range.last + 1)}` : ''}
            <span className={styles.countDim}> / {pad(count)}</span>
          </p>
          <button
            type="button"
            className={styles.stepper}
            onClick={() => step(-1)}
            aria-disabled={atStart}
            aria-label="Previous articles"
          >
            <ArrowRight className={styles.back} />
          </button>
          <button
            type="button"
            className={styles.stepper}
            onClick={() => step(1)}
            aria-disabled={atEnd}
            aria-label="Next articles"
          >
            <ArrowRight />
          </button>
        </div>
      </div>

      <ul className={styles.track} ref={trackRef} aria-labelledby="insights-title">
        {items.map((item) => (
          <li key={item.url} className={styles.slide}>
            <a className={styles.card} href={item.url}>
              <span className={styles.media}>
                <Image
                  src={item.image}
                  alt=""
                  width={720}
                  height={480}
                  sizes="(max-width: 640px) 80vw, 340px"
                  className={styles.img}
                  loading="lazy"
                />
              </span>
              <span className={styles.category}>{item.category}</span>
              <span className={styles.cardTitle}>{item.title}</span>
              {item.subtitle ? <span className={styles.cardSub}>{item.subtitle}</span> : null}
              <span className={styles.read}>
                Read Article
                <ArrowRight className="arrow" />
              </span>
            </a>
          </li>
        ))}
      </ul>

      {/* Where the row is, as a bar: the visible span over the whole. */}
      <div className={styles.bar} aria-hidden="true">
        <span
          className={styles.barFill}
          style={{
            left: `${(range.first / count) * 100}%`,
            width: `${((range.last - range.first + 1) / count) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
