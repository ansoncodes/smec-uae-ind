'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();

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

    /* Sections that mount later join in when the route changes — this effect
       re-runs on `pathname`. A MutationObserver over the whole body subtree
       used to do this, and stayed alive for the life of the page to catch a
       handful of navigations. */

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

    /* Smooth scrolling is the browser's job now. Lenis used to take the
       wheel, easing every scroll through a requestAnimationFrame loop that
       ran for as long as the page was open — main-thread work on every
       frame, which is exactly the input-responsiveness risk §16 warns about,
       and a scroll that no longer matched the visitor's own device settings.
       In-page anchors below still animate, and CSS scroll-behavior covers
       the rest. */

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
      window.clearTimeout(sweepTimer);
      document.removeEventListener('visibilitychange', sweep);
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.removeEventListener('click', onClick);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
