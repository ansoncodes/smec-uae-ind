'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FEATURED_SYSTEMS } from '@/lib/experience';
import { localHref } from '@/lib/routes';
import { ArrowRight } from './Icons';
import styles from './SystemFeature.module.css';

/**
 * A single sticky frame that steps through five systems as the page scrolls:
 * the photograph crossfades on the left, the copy swaps on the right, and a
 * progress rail tracks position. Not a carousel — position in the section is
 * the only control, so it reads as one continuous move.
 *
 * Scroll position is sampled in a rAF-throttled listener and only ever sets an
 * index in state, so nothing lays out per frame. Under reduced motion (and
 * without JavaScript) it degrades to the five systems stacked as plain blocks.
 */
export default function SystemFeature() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [stacked, setStacked] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const narrow = window.matchMedia('(max-width: 900px)');

    const sync = () => setStacked(reduced.matches || narrow.matches);
    sync();
    reduced.addEventListener('change', sync);
    narrow.addEventListener('change', sync);

    let frame = 0;
    const measure = () => {
      frame = 0;
      const el = wrapRef.current;
      if (!el || reduced.matches || narrow.matches) return;
      const rect = el.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      const next = Math.min(
        FEATURED_SYSTEMS.length - 1,
        Math.floor(progress * FEATURED_SYSTEMS.length)
      );
      setActive((current) => (current === next ? current : next));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      reduced.removeEventListener('change', sync);
      narrow.removeEventListener('change', sync);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      className={`${styles.section} grain`}
      id="capability"
      data-tone="dark"
      aria-labelledby="feature-title"
    >
      <div
        ref={wrapRef}
        className={styles.wrap}
        style={{ ['--count' as string]: FEATURED_SYSTEMS.length }}
        data-stacked={stacked || undefined}
      >
        <div className={styles.sticky}>
          <div className={`container ${styles.inner}`}>
            {/* ------------------------------------------------- media */}
            <div className={styles.stage}>
              {FEATURED_SYSTEMS.map((system, i) => (
                <figure
                  key={system.slug}
                  className={styles.frame}
                  data-on={!stacked && i === active ? 'true' : undefined}
                  aria-hidden={!stacked && i !== active}
                >
                  <Image
                    src={system.image!}
                    alt={system.title}
                    width={system.width}
                    height={system.height}
                    sizes="(max-width: 900px) 92vw, 46vw"
                    className={styles.img}
                    loading="lazy"
                  />
                </figure>
              ))}
              <span className={styles.stageEdge} aria-hidden="true" />
            </div>

            {/* -------------------------------------------------- copy */}
            <div className={styles.copyCol}>
              <p className="sectionLabel">
                <span className="num">03</span>
                <span>System in focus</span>
                <span className="rule" />
              </p>

              <h2 id="feature-title" className={styles.h2}>
                Precision systems,
                <br />
                <span className={styles.h2Dim}>proven on the rig.</span>
              </h2>

              <div className={styles.slides}>
                {FEATURED_SYSTEMS.map((system, i) => (
                  <article
                    key={system.slug}
                    className={styles.slide}
                    data-on={stacked || i === active ? 'true' : undefined}
                    aria-hidden={!stacked && i !== active}
                  >
                    <p className={styles.slideKicker}>
                      {String(i + 1).padStart(2, '0')} / {String(FEATURED_SYSTEMS.length).padStart(2, '0')}
                      <span className={styles.slideKickerRule} />
                      Product system
                    </p>
                    <h3 className={styles.slideTitle}>{system.title}</h3>
                    <p className={styles.slideBody}>{system.body}</p>

                    {system.highlights.length > 0 ? (
                      <ul className={styles.specs}>
                        {system.highlights.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}

                    <a className={`arrowLink ${styles.slideCta}`} href={localHref(system.href)}>
                      Explore System
                      <ArrowRight className="arrow" />
                    </a>
                  </article>
                ))}
              </div>

              {/* ---------------------------------------------- rail */}
              <ol className={styles.rail} aria-hidden="true">
                {FEATURED_SYSTEMS.map((system, i) => (
                  <li
                    key={system.slug}
                    className={styles.railItem}
                    data-on={i === active ? 'true' : undefined}
                  >
                    <span className={styles.railBar} />
                    <span className={styles.railName}>{system.title}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
