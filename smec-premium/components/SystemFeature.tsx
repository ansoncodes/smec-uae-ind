'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { FEATURED_SYSTEMS } from '@/lib/experience';
import { localHref } from '@/lib/routes';
import { ArrowRight } from './Icons';
import styles from './SystemFeature.module.css';

/**
 * Five systems in one frame, stepped through by the reader.
 *
 * This is a normal-height section: the page scrolls past it at the usual
 * rate and the controls — a named rail of tabs plus previous/next — are the
 * only thing that changes the system on show. Every panel is rendered into
 * the markup, so all five are in the HTML whether or not the reader steps
 * through them.
 */
export default function SystemFeature() {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const count = FEATURED_SYSTEMS.length;

  const go = (next: number) => setActive((next + count) % count);

  /* Left/right walk the rail and move focus with the selection, per the
     tabs pattern; Home and End jump to the ends. */
  const onKeyDown = (event: React.KeyboardEvent) => {
    const map: Record<string, number> = {
      ArrowLeft: active - 1,
      ArrowRight: active + 1,
      Home: 0,
      End: count - 1,
    };
    const next = map[event.key];
    if (next === undefined) return;
    event.preventDefault();
    const index = (next + count) % count;
    setActive(index);
    tabsRef.current?.querySelectorAll('button')[index]?.focus();
  };

  return (
    <section
      className={`section ${styles.section} grain`}
      id="capability"
      data-tone="dark"
      aria-labelledby="feature-title"
    >
      <div className="container">
        <p className="sectionLabel" data-reveal="fade">
          <span className="num">03</span>
          <span>System in focus</span>
          <span className="rule" />
        </p>

        <div className={styles.inner}>
          {/* --------------------------------------------------- media */}
          <div className={styles.stage} data-reveal="fade">
            {FEATURED_SYSTEMS.map((system, i) => (
              <figure
                key={system.slug}
                className={styles.frame}
                data-on={i === active ? 'true' : undefined}
                aria-hidden={i !== active}
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

            {/* Docked to the picture, where the affordance is unmissable. */}
            <div className={styles.stageNav}>
              <button
                type="button"
                className={styles.stepper}
                onClick={() => go(active - 1)}
                aria-label="Previous system"
              >
                <ArrowRight className={styles.stepperBack} />
              </button>
              <span className={styles.stageCount} aria-hidden="true">
                {String(active + 1).padStart(2, '0')}
                <span className={styles.stageCountDim}>
                  {' / '}
                  {String(count).padStart(2, '0')}
                </span>
              </span>
              <button
                type="button"
                className={styles.stepper}
                onClick={() => go(active + 1)}
                aria-label="Next system"
              >
                <ArrowRight />
              </button>
            </div>
          </div>

          {/* ---------------------------------------------------- copy */}
          <div className={styles.copyCol}>
            <h2 id="feature-title" className={styles.h2} data-reveal="up">
              Precision systems,
              <br />
              <span className={styles.h2Dim}>proven on the rig.</span>
            </h2>

            <div className={styles.slides}>
              {FEATURED_SYSTEMS.map((system, i) => (
                <article
                  key={system.slug}
                  className={styles.slide}
                  id={`system-panel-${i}`}
                  role="tabpanel"
                  aria-labelledby={`system-tab-${i}`}
                  data-on={i === active ? 'true' : undefined}
                  hidden={i !== active}
                >
                  <p className={styles.slideKicker}>
                    {String(i + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
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

            {/* ------------------------------------------------ controls */}
            <div className={styles.controls}>
              <p className={styles.controlsHint}>Switch system</p>
              <div
                ref={tabsRef}
                className={styles.rail}
                role="tablist"
                aria-label="Featured systems"
                onKeyDown={onKeyDown}
              >
                {FEATURED_SYSTEMS.map((system, i) => (
                  <button
                    key={system.slug}
                    type="button"
                    role="tab"
                    id={`system-tab-${i}`}
                    aria-selected={i === active}
                    aria-controls={`system-panel-${i}`}
                    tabIndex={i === active ? 0 : -1}
                    className={styles.railItem}
                    data-on={i === active ? 'true' : undefined}
                    onClick={() => setActive(i)}
                  >
                    <span className={styles.railBar} />
                    <span className={styles.railName}>{system.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
