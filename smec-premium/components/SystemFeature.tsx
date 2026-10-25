'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { SYSTEMS_COPY } from '@/lib/homepage';
import { ArrowRight } from './Icons';
import styles from './SystemFeature.module.css';

/**
 * Engineered Systems & Products — her eight featured systems in one frame,
 * stepped through by the reader (images 13–14, and "products in a sliding
 * format", 10 Sep).
 *
 * This is a normal-height section: the page scrolls past it at the usual
 * rate and the controls — a named rail of tabs plus previous/next — are the
 * only thing that changes the system on show. Nothing rotates by itself.
 * Every panel is rendered into the markup, so all eight names, descriptions
 * and links are in the HTML whether or not the reader steps through them.
 */
export default function SystemFeature() {
  const { label, title, groups, intro, slides, viewAll, prompt } = SYSTEMS_COPY;
  const [active, setActive] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const count = slides.length;

  const go = (next: number) => setActive((next + count) % count);

  /* On a phone the rail scrolls sideways; keep the selected name in view
     when previous/next moves the selection off the visible part. Not on the
     first render: the first name is already in view, and the page should not
     scroll anything before the visitor does. */
  const moved = useRef(false);
  useEffect(() => {
    if (!moved.current) {
      moved.current = true;
      return;
    }
    const rail = tabsRef.current;
    if (!rail || rail.scrollWidth <= rail.clientWidth) return;
    const tab = rail.querySelectorAll('button')[active];
    if (!tab) return;
    const railBox = rail.getBoundingClientRect();
    const tabBox = tab.getBoundingClientRect();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    rail.scrollBy({
      left: tabBox.left - railBox.left - (railBox.width - tabBox.width) / 2,
      behavior: reduced ? 'auto' : 'smooth',
    });
  }, [active]);

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

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section
      className={`section ${styles.section} grain`}
      id="systems"
      data-tone="dark"
      aria-labelledby="systems-title"
    >
      <div className="container">
        <p className="sectionLabel" data-reveal="fade">
          <span>{label}</span>
          <span className="rule" />
        </p>

        <div className={`sectionHead ${styles.head}`}>
          <h2 id="systems-title" className="sectionTitle" data-reveal="up">
            {title}
          </h2>
          <div className={styles.headSide} data-reveal="up" data-reveal-delay="90">
            <ul className={`inlineList ${styles.groups}`}>
              {groups.map((group) => (
                <li key={group}>{group}</li>
              ))}
            </ul>
            {intro.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className={styles.intro}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className={styles.inner}>
          {/* --------------------------------------------------- media */}
          <div className={styles.stage} data-reveal="fade">
            {slides.map((slide, i) => (
              <figure
                key={slide.title}
                className={styles.frame}
                data-on={i === active ? 'true' : undefined}
                aria-hidden={i !== active}
              >
                <Image
                  src={slide.image.src}
                  alt={slide.image.alt}
                  width={slide.image.width}
                  height={slide.image.height}
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
                {pad(active + 1)}
                <span className={styles.stageCountDim}>
                  {' / '}
                  {pad(count)}
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
            <div className={styles.slides}>
              {slides.map((slide, i) => (
                <article
                  key={slide.title}
                  className={styles.slide}
                  id={`system-panel-${i}`}
                  role="tabpanel"
                  aria-labelledby={`system-tab-${i}`}
                  data-on={i === active ? 'true' : undefined}
                  hidden={i !== active}
                >
                  <p className={styles.slideKicker}>
                    <span className={styles.slideCount}>
                      {pad(i + 1)} / {pad(count)}
                    </span>
                    <span className={styles.slideKickerRule} />
                    <span className={styles.slideKickerLabel}>{label}</span>
                  </p>
                  <h3 className={styles.slideTitle}>{slide.title}</h3>
                  <p className={styles.slideLead}>{slide.tagline}</p>
                  <p className={styles.slideBody}>{slide.body}</p>

                  <ul className={styles.specs} aria-label="Covers">
                    {slide.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>

                  <a className={`arrowLink ${styles.slideCta}`} href={slide.cta.href}>
                    {slide.cta.label}
                    <ArrowRight className="arrow" />
                  </a>
                </article>
              ))}
            </div>

            {/* ------------------------------------------------ controls */}
            <div className={styles.controls}>
              <p className={styles.controlsHint} id="systems-rail-label">
                Switch system
              </p>
              <div
                ref={tabsRef}
                className={styles.rail}
                role="tablist"
                aria-labelledby="systems-rail-label"
                onKeyDown={onKeyDown}
              >
                {slides.map((slide, i) => (
                  <button
                    key={slide.title}
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
                    <span className={styles.railName}>{slide.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- foot */}
        <div className={styles.foot}>
          <a className={`arrowLink ${styles.viewAll}`} href={viewAll.href}>
            {viewAll.label}
            <ArrowRight className="arrow" />
          </a>

          <div className={styles.prompt}>
            <div>
              <p className={styles.promptTitle}>{prompt.title}</p>
              <p className={styles.promptBody}>{prompt.body}</p>
            </div>
            <a className="btn btnAccent" href={prompt.cta.href}>
              {prompt.cta.label}
              <ArrowRight className="arrow" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
