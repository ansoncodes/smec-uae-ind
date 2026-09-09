'use client';

import { useEffect } from 'react';

/**
 * The whole site's motion layer, mounted once.
 *
 * Everything else on the page stays a server component and simply marks
 * itself up with attributes:
 *
 *   data-reveal="up|fade|mask|line|scale"  — enters when scrolled into view
 *   data-reveal-delay="120"                 — stagger, in ms
 *   data-parallax="0.12"                    — sets --p (-1…1) while on screen
 *
 * One IntersectionObserver and one rAF-throttled scroll pass drive the lot,
 * so adding motion to a section costs no extra listener and no extra bundle.
 * Under prefers-reduced-motion nothing is observed at all and the CSS shows
 * every element in its resting state.
 */

const REVEAL = '[data-reveal]';
const PARALLAX = '[data-parallax]';

export default function MotionRoot() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) return;

    /* ------------------------------------------------------------ reveal */

    const seen = new WeakSet<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          const delay = el.dataset.revealDelay;
          if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`);
          el.dataset.in = 'true';
          observer.unobserve(el);
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    );

    const observe = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>(REVEAL).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        observer.observe(el);
      });
    };

    observe(document);

    /* Safety net. A browser that never delivers intersection callbacks — a
       tab that has not painted, a prerender, a headless capture — would
       otherwise leave the page permanently blank. Sweep the geometry by hand
       shortly after load and whenever the tab is shown again. */
    const sweep = () => {
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>(`${REVEAL}:not([data-in])`).forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < vh * 0.95 && rect.bottom > 0) {
          el.dataset.in = 'true';
          observer.unobserve(el);
        }
      });
    };

    const sweepTimer = window.setTimeout(sweep, 2200);
    document.addEventListener('visibilitychange', sweep);

    // Sections that mount later (route changes, client sections) join in.
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node.nodeType !== 1) continue;
          const el = node as HTMLElement;
          if (el.matches(REVEAL) && !seen.has(el)) {
            seen.add(el);
            observer.observe(el);
          }
          observe(el);
        }
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    /* ---------------------------------------------------------- parallax */

    let nodes: HTMLElement[] = [];
    const collect = () => {
      nodes = Array.from(document.querySelectorAll<HTMLElement>(PARALLAX));
    };
    collect();

    let frame = 0;
    const measure = () => {
      frame = 0;
      const vh = window.innerHeight;
      for (const el of nodes) {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) continue;
        // -1 when the element sits below the fold, 1 when it has passed above.
        const progress = (vh / 2 - (rect.top + rect.height / 2)) / (vh / 2 + rect.height / 2);
        el.style.setProperty('--p', progress.toFixed(4));
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    /* ------------------------------------------------- smooth scrolling */

    let lenis: { destroy: () => void; raf: (t: number) => void } | null = null;
    let rafId = 0;
    let cancelled = false;

    // Loaded after paint so it never sits on the critical path.
    const idle =
      window.requestIdleCallback?.bind(window) ??
      ((cb: () => void) => window.setTimeout(cb, 200));

    idle(() => {
      if (cancelled) return;
      import('lenis')
        .then(({ default: Lenis }) => {
          if (cancelled) return;
          const instance = new Lenis({
            duration: 1.05,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 1.6,
          });
          lenis = instance as unknown as typeof lenis;
          const loop = (time: number) => {
            instance.raf(time);
            rafId = requestAnimationFrame(loop);
          };
          rafId = requestAnimationFrame(loop);
          instance.on('scroll', onScroll);
        })
        .catch(() => {
          /* smooth scroll is an enhancement; native scrolling still works */
        });
    });

    /* ------------------------------------------------- in-page anchors */

    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement)?.closest?.('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute('href')!.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `#${id}`);
    };
    document.addEventListener('click', onClick);

    return () => {
      cancelled = true;
      window.clearTimeout(sweepTimer);
      document.removeEventListener('visibilitychange', sweep);
      observer.disconnect();
      mutations.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.removeEventListener('click', onClick);
      if (frame) cancelAnimationFrame(frame);
      if (rafId) cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return null;
}
