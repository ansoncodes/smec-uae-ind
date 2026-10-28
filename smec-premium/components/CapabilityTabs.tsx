'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import type { CapabilityCard } from '@/lib/homepage';
import { ArrowRight } from './Icons';
import styles from './Capabilities.module.css';

/**
 * Her six capabilities as tabs: the names down the left, and on the right the
 * chosen one's photograph, tagline, scope, tags and link. Every panel is in
 * the HTML and the tabs only choose which one shows, as in the systems
 * slider. The arrow keys move between the tabs, whichever way the names run
 * (down the side, or across on a phone); Home and End jump to the ends.
 */
export default function CapabilityTabs({ cards }: { cards: CapabilityCard[] }) {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const count = cards.length;

  const onKeyDown = (event: React.KeyboardEvent) => {
    const map: Record<string, number> = {
      ArrowUp: active - 1,
      ArrowLeft: active - 1,
      ArrowDown: active + 1,
      ArrowRight: active + 1,
      Home: 0,
      End: count - 1,
    };
    const next = map[event.key];
    if (next === undefined) return;
    event.preventDefault();
    const index = (next + count) % count;
    setActive(index);
    listRef.current?.querySelectorAll<HTMLButtonElement>('[role=tab]')[index]?.focus();
  };

  return (
    <div className={styles.showcase}>
      <div
        ref={listRef}
        className={styles.tabs}
        role="tablist"
        aria-label="Engineering solutions"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
      >
        {cards.map((card, i) => (
          <button
            key={card.num}
            type="button"
            role="tab"
            id={`solution-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`solution-panel-${i}`}
            tabIndex={i === active ? 0 : -1}
            className={styles.tab}
            data-on={i === active ? 'true' : undefined}
            onClick={() => setActive(i)}
          >
            <span className={styles.tabNum} aria-hidden="true">
              {card.num}
            </span>
            <span className={styles.tabName}>{card.title}</span>
            <ArrowRight className={styles.tabArrow} />
          </button>
        ))}
      </div>

      <div className={styles.panels}>
        {cards.map((card, i) => (
          <article
            key={card.num}
            id={`solution-panel-${i}`}
            role="tabpanel"
            aria-labelledby={`solution-tab-${i}`}
            className={styles.panel}
            data-on={i === active ? 'true' : undefined}
            hidden={i !== active}
          >
            <div className={styles.media} data-parallax>
              <Image
                src={card.image.src}
                alt={card.image.alt}
                width={card.image.width}
                height={card.image.height}
                sizes="(max-width: 900px) 92vw, 52vw"
                className={`${styles.img} drift`}
                loading="lazy"
              />
              <span className={styles.mediaNum} aria-hidden="true">
                {card.num}
                <span className={styles.mediaCount}> / {String(count).padStart(2, '0')}</span>
              </span>
            </div>
            <div className={styles.body}>
              <h3 className={styles.title}>{card.title}</h3>
              <p className={styles.tagline}>{card.tagline}</p>
              <p className={styles.text}>{card.body}</p>
              <ul className={`inlineList ${styles.tags}`} aria-label="Scope">
                {card.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <a className={`arrowLink ${styles.cta}`} href={card.cta.href}>
                {card.cta.label}
                <ArrowRight className="arrow" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
