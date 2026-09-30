'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CONTACT, MOBILE_EXTRA_NAV, SITE } from '@/lib/siteData';
import { TOP_NAV, type TopNavItem } from '@/lib/navigation';
import { localHref } from '@/lib/routes';
import { ArrowRight, ArrowUpRight, Chevron, Mail, Phone } from './Icons';
import styles from './SiteHeader.module.css';

/**
 * Sticky header. It rides transparent over the hero, then condenses onto a
 * blurred near-black bar once the page scrolls — shorter, hairlined, with the
 * utility rail folded away.
 *
 * Products and Solutions open a mega menu: three columns of grouped systems
 * with a one-line description each, rather than a list of links.
 */
/** Everything the keyboard can land on inside a container. */
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Panels are addressed by id so a trigger can declare what it controls. */
const megaId = (label: string) => `mega-${label.toLowerCase().replace(/\W+/g, '-')}`;

export default function SiteHeader() {
  const [condensed, setCondensed] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [drawerGroup, setDrawerGroup] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggers = useRef(new Map<string, HTMLButtonElement | null>());
  const panels = useRef(new Map<string, HTMLDivElement | null>());

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The drawer owns the viewport while it is open.
  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawer]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      // Escape closes what is open and puts focus back where it came from, so
      // a keyboard user is not left at the top of the document.
      if (openMega) triggers.current.get(openMega)?.focus();
      else if (drawer) burgerRef.current?.focus();
      setOpenMega(null);
      setDrawer(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawer, openMega]);

  /**
   * The drawer is a modal: while it is open the keyboard stays inside it and
   * the burger that opened it, and on close focus returns to that button.
   */
  useEffect(() => {
    if (!drawer) return;

    const chain = () =>
      [
        burgerRef.current,
        ...Array.from(drawerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []),
      ].filter((el): el is HTMLElement => !!el && el.offsetParent !== null);

    drawerRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const list = chain();
      if (!list.length) return;
      const here = list.indexOf(document.activeElement as HTMLElement);
      const next = e.shiftKey
        ? here <= 0
          ? list.length - 1
          : here - 1
        : here === -1 || here === list.length - 1
          ? 0
          : here + 1;
      e.preventDefault();
      list[next].focus();
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      if (drawerRef.current?.contains(document.activeElement)) burgerRef.current?.focus();
    };
  }, [drawer]);

  /* A short close delay keeps the menu open while the pointer crosses the gap
     between the trigger and the panel. */
  const hold = (label: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenMega(label);
  };
  const release = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMega(null), 140);
  };

  const renderTrigger = (item: TopNavItem) => {
    const isOpen = openMega === item.label;
    if (!item.mega) {
      return (
        <a className={styles.navLink} href={localHref(item.href)}>
          <span className={styles.navLabel}>{item.label}</span>
        </a>
      );
    }
    return (
      <button
        type="button"
        ref={(node) => {
          triggers.current.set(item.label, node);
        }}
        className={`${styles.navLink} ${isOpen ? styles.navLinkOpen : ''}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={megaId(item.label)}
        onClick={() => setOpenMega(isOpen ? null : item.label)}
        // Down opens the panel and steps into it, which is how a menu button
        // is expected to behave; the panel is not next in the document, so
        // Tab alone would never reach it.
        onKeyDown={(event) => {
          if (event.key !== 'ArrowDown') return;
          event.preventDefault();
          setOpenMega(item.label);
          requestAnimationFrame(() =>
            panels.current.get(item.label)?.querySelector<HTMLElement>(FOCUSABLE)?.focus()
          );
        }}
      >
        <span className={styles.navLabel}>{item.label}</span>
        <Chevron className={styles.chev} />
      </button>
    );
  };

  return (
    <header
      className={`${styles.header} ${condensed ? styles.condensed : ''} ${
        openMega ? styles.megaOpen : ''
      }`}
      onMouseLeave={release}
    >
      {/* utility rail — contact details, folded away once the page scrolls */}
      <div className={styles.rail} inert={condensed}>
        <div className={styles.railInner}>
          <span className={styles.railNote}>Abu Dhabi · Kochi · Global support</span>
          <div className={styles.railLinks}>
            <a href={CONTACT.emailHref}>
              <Mail /> {CONTACT.email}
            </a>
            <a href={CONTACT.phoneHref}>
              <Phone /> {CONTACT.phone}
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bar}>
        <div className={styles.barInner}>
          <Link href="/" className={styles.logo} aria-label={`${SITE.name} — home`}>
            <Image
              src={SITE.logo}
              alt={SITE.name}
              width={197}
              height={48}
              // Not preloaded: the page's own hero is the LCP candidate and
              // §16 allows one. The logo is at the top of the document, so
              // the browser fetches it straight away regardless.
              className={styles.logoImg}
            />
          </Link>

          <nav className={styles.nav} aria-label="Primary">
            <ul className={styles.navList}>
              {TOP_NAV.map((item) => (
                <li
                  key={item.label}
                  className={styles.navItem}
                  onMouseEnter={() => (item.mega ? hold(item.label) : release())}
                >
                  {renderTrigger(item)}
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <a className={styles.talk} href={localHref(`${SITE.url}/contact-us`)}>
              <span>Let&rsquo;s Talk</span>
              <ArrowRight className={styles.talkArrow} />
            </a>
            <button
              type="button"
              ref={burgerRef}
              className={styles.burger}
              aria-label={drawer ? 'Close menu' : 'Open menu'}
              aria-expanded={drawer}
              aria-controls="site-menu"
              onClick={() => setDrawer((v) => !v)}
            >
              <span className={`${styles.burgerBox} ${drawer ? styles.burgerOpen : ''}`}>
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------- mega */}
      {TOP_NAV.filter((i) => i.mega).map((item) => (
        <div
          key={item.label}
          id={megaId(item.label)}
          ref={(node) => {
            panels.current.set(item.label, node);
          }}
          className={`${styles.mega} ${openMega === item.label ? styles.megaVisible : ''}`}
          onMouseEnter={() => hold(item.label)}
          onMouseLeave={release}
          // Leaving the panel by keyboard closes it, so a visitor tabbing on
          // through the page is not dragged back into a menu they passed.
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setOpenMega((open) => (open === item.label ? null : open));
            }
          }}
          hidden={openMega !== item.label}
        >
          <div className={styles.megaInner}>
            <div className={styles.megaAside}>
              <p className={styles.megaKicker}>{item.label}</p>
              <p className={styles.megaBlurb}>{item.blurb}</p>
              <a className={styles.megaAll} href={localHref(item.href)}>
                <span>{item.allLabel ?? item.label}</span>
                <ArrowRight />
              </a>
            </div>

            <div className={styles.megaCols}>
              {item.mega!.map((col) => (
                <div key={col.heading} className={styles.megaCol}>
                  <p className={styles.megaHeading}>{col.heading}</p>
                  <ul>
                    {col.entries.map((entry) => (
                      <li key={entry.label}>
                        <a
                          className={styles.megaLink}
                          href={localHref(entry.href)}
                          onClick={() => setOpenMega(null)}
                        >
                          <span className={styles.megaLabel}>
                            {entry.label}
                            <ArrowUpRight className={styles.megaArrow} />
                          </span>
                          {entry.blurb ? (
                            <span className={styles.megaDesc}>{entry.blurb}</span>
                          ) : null}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* -------------------------------------------------------- drawer */}
      <div
        id="site-menu"
        ref={drawerRef}
        className={`${styles.drawer} ${drawer ? styles.drawerOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!drawer}
      >
        <div className={styles.drawerScroll}>
          <ul className={styles.drawerList}>
            {TOP_NAV.map((item, i) => (
              <li key={item.label} style={{ ['--i' as string]: i }}>
                {item.mega ? (
                  <>
                    <button
                      type="button"
                      className={styles.drawerRow}
                      aria-expanded={drawerGroup === item.label}
                      aria-controls={`drawer-${megaId(item.label)}`}
                      onClick={() =>
                        setDrawerGroup(drawerGroup === item.label ? null : item.label)
                      }
                    >
                      <span>{item.label}</span>
                      <Chevron
                        className={`${styles.drawerChev} ${
                          drawerGroup === item.label ? styles.drawerChevOpen : ''
                        }`}
                      />
                    </button>
                    {/* One clip element only: the 0fr → 1fr row trick sizes a
                        single grid child, so every group lives inside it. */}
                    <div
                      id={`drawer-${megaId(item.label)}`}
                      className={`${styles.drawerSub} ${
                        drawerGroup === item.label ? styles.drawerSubOpen : ''
                      }`}
                    >
                      <div className={styles.drawerSubClip}>
                        {item.mega.map((col) => (
                          <div key={col.heading} className={styles.drawerSubGroup}>
                            <p className={styles.drawerSubHead}>{col.heading}</p>
                            {col.entries.map((entry) => (
                              <a
                                key={entry.label}
                                href={localHref(entry.href)}
                                onClick={() => setDrawer(false)}
                              >
                                {entry.label}
                              </a>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <a
                    className={styles.drawerRow}
                    href={localHref(item.href)}
                    onClick={() => setDrawer(false)}
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight />
                  </a>
                )}
              </li>
            ))}
          </ul>

          <div className={styles.drawerFoot}>
            {MOBILE_EXTRA_NAV.map((item) => (
              <a key={item.label} href={localHref(item.href)} onClick={() => setDrawer(false)}>
                {item.label}
              </a>
            ))}
            <a className={styles.drawerCta} href={localHref(`${SITE.url}/contact-us`)}>
              <span>Let&rsquo;s Talk</span>
              <ArrowRight />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
