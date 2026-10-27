'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { SYSTEMS_COPY } from '@/lib/homepage';
import { ArrowRight, Pause, Play } from './Icons';
import styles from './SystemFeature.module.css';

/** How long each system stays up while the slideshow runs. Slow on purpose:
    her document rules out fast rotation, and every panel is a paragraph. */
const DWELL_MS = 10000;

/**
 * Engineered Systems & Products — her eight featured systems in one frame,
 * stepped through by the reader (images 13–14, and "products in a sliding
 * format", 10 Sep).
 *
 * This is a normal-height section: the page scrolls past it at the usual
 * rate. The systems come up one after another, slowly, and only while the
 * slider is on screen and nobody is using it: it holds while the pointer is
 * over it or keyboard focus is inside it, and stops for good when the reader
 * picks a system or presses pause, the first control inside it. Under
 * reduced motion it never starts and the pause button is not shown. Every
 * panel is rendered into the markup, so all eight names, descriptions and
 * links are in the HTML whether or not anyone steps through them.
 */
export default function SystemFeature() {
  const { label, title, groups, intro, slides, viewAll, prompt } = SYSTEMS_COPY;
  const [active, setActive] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const count = slides.length;

  /* `playing` is the reader's choice; everything else only holds it. */
  const [playing, setPlaying] = useState(true);
  const [motionOk, setMotionOk] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [pageShown, setPageShown] = useState(true);
  const auto = motionOk && playing;
  const held = hovered || focused || !onScreen || !pageShown;

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setMotionOk(!reduced.matches);
    update();
    reduced.addEventListener('change', update);
    return () => reduced.removeEventListener('change', update);
  }, []);

  /* A system that comes up where nobody can see it has been skipped, so the
     slideshow holds while the slider is mostly off screen or the tab is in
     the background. A browser that never reports intersections never starts
     it at all. */
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    // A batch can hold several changes; the last one is the current state.
    const observer = new IntersectionObserver(
      (entries) => setOnScreen(entries[entries.length - 1].intersectionRatio >= 0.25),
      { threshold: [0, 0.25, 0.5] }
    );
    observer.observe(slider);
    const onVisibility = () => setPageShown(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  /* A reader who picks a system has taken over: the slideshow stays stopped
     until they press play. */
  const choose = (next: number) => {
    setPlaying(false);
    setActive((next + count) % count);
  };

  /* Pressing play is an explicit request, so it starts at once even with the
     pointer or focus still on the button. */
  const toggle = () => {
    setPlaying((on) => !on);
    setHovered(false);
    setFocused(false);
  };

  /* The selected bar's fill is the slideshow's clock (see the CSS): when it
     is full, the next system comes up. Holding the slideshow pauses the fill,
     so the bar and the change can never disagree. */
  const onFillEnd = (event: React.AnimationEvent) => {
    if (!event.animationName.includes('railFill')) return;
    setActive((current) => (current + 1) % count);
  };

  /* On a phone the rail scrolls sideways; keep the selected name in view
     when the selection moves off the visible part. Not on the first render:
     the first name is already in view, and the page should not scroll
     anything before the visitor does. */
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
    choose(index);
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

        <div
          ref={sliderRef}
          className={styles.inner}
          data-auto={auto ? 'true' : undefined}
          data-hold={held ? 'true' : undefined}
          style={{ '--dwell': `${DWELL_MS}ms` } as React.CSSProperties}
          onPointerEnter={(event) => {
            if (event.pointerType !== 'touch') setHovered(true);
          }}
          onPointerLeave={(event) => {
            if (event.pointerType !== 'touch') setHovered(false);
          }}
          // Keyboard focus holds the slideshow; a mouse click does not, since
          // the pointer is already holding it.
          onFocus={(event) => setFocused((event.target as HTMLElement).matches(':focus-visible'))}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
          }}
        >
          {/* --------------------------------------------------- media */}
          <div className={styles.stage} data-reveal="fade" data-parallax>
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

            {/* Docked to the picture, where the affordance is unmissable. The
                pause button leads, so it is the first control a keyboard
                reaches inside the slider. */}
            <div className={styles.stageNav}>
              <button
                type="button"
                className={`${styles.stepper} ${styles.toggle}`}
                onClick={toggle}
                aria-label={playing ? 'Pause the systems slideshow' : 'Play the systems slideshow'}
              >
                {playing ? <Pause /> : <Play />}
              </button>
              <button
                type="button"
                className={styles.stepper}
                onClick={() => choose(active - 1)}
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
                onClick={() => choose(active + 1)}
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
          </div>

          {/* ------------------------------------------------ controls */}
          {/* Her eight systems as a strip of photographs on white plates, the
              way the premium build's product grid shows them: the slide
              indicators, and the way to pick one. */}
          <div className={styles.controls}>
            <p className={styles.controlsHint} id="systems-rail-label">
              Switch system
            </p>
            {/* Swiping the rail on a phone is reading it, so the slideshow
                stops rather than scroll it back from under the finger. */}
            <div
              ref={tabsRef}
              className={styles.rail}
              role="tablist"
              aria-labelledby="systems-rail-label"
              onKeyDown={onKeyDown}
              onAnimationEnd={onFillEnd}
              onPointerDown={(event) => {
                if (event.pointerType === 'touch') setPlaying(false);
              }}
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
                  onClick={() => choose(i)}
                >
                  {/* The name below labels the tab; the photograph is the
                      same one the stage shows, so it stays silent. */}
                  <span className={styles.railPlate}>
                    <Image
                      src={slide.image.src}
                      alt=""
                      width={slide.image.width}
                      height={slide.image.height}
                      sizes="(max-width: 1099px) 140px, 11vw"
                      className={styles.railImg}
                      loading="lazy"
                    />
                    <span className={styles.railNum} aria-hidden="true">
                      {pad(i + 1)}
                    </span>
                  </span>
                  <span className={styles.railBar} />
                  <span className={styles.railName}>{slide.title}</span>
                </button>
              ))}
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
