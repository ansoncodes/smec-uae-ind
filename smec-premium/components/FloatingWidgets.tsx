'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { CONTACT, CONTACT_INDIA, WHATSAPP_MESSAGE } from '@/lib/siteData';
import { onBannerClearance } from '@/lib/consent';
import { ArrowDown, ArrowUpRight, Close, Document, WhatsApp } from './Icons';
import styles from './FloatingWidgets.module.css';

/**
 * The two WhatsApp conversations, as the homepage document's chooser lists
 * them (image 34). The Middle East company comes first, except on pages about
 * India, where the India team does.
 */
const CHATS = [
  { region: 'uae', code: 'AE', label: 'Middle East & International', office: CONTACT },
  { region: 'india', code: 'IN', label: 'India', office: CONTACT_INDIA },
] as const;

const INDIA_PAGES = ['/company/india-engineering-hub/'];

const chatHref = (number: string) => `${number}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

/** The RFQ page, which the pill opens. */
const RFQ_PAGE = '/contact/';

/** Room kept between the stack and the consent banner it stands on. */
const GAP = 12;

/**
 * Every floating control, in one stack at the bottom right as the homepage
 * document draws it (image 33): a "Submit RFQ" pill directly above the
 * WhatsApp button, on phones too, and under them a back-to-top control that
 * appears once the page has moved. The scroll progress ring around the top
 * button doubles as a read indicator.
 *
 * WhatsApp is one button that opens a chooser between the two regional teams,
 * as the homepage document specifies. Each conversation opens with the
 * document's prefilled message; ConversionEvents counts the click as
 * `click_whatsapp` with a `region` of `uae` or `india`, read from the number
 * it dials. The pill counts like any other link to the RFQ page —
 * `product_to_rfq` or `solution_to_rfq` from those pages — with a location of
 * `floating`.
 *
 * None of it may cover the privacy notice, the navigation or the RFQ control
 * (the same document). While the consent banner is open the stack stands on
 * top of it rather than over it. The chooser opens above the whole stack, so
 * the pill stays in view and usable while it is open. The mobile menu sits
 * above all of it.
 *
 * The RFQ page itself has no pill: it would lead back to the form it floats
 * over, and a "Submit RFQ" button beside an unsent form reads as that form's
 * own submit.
 */
export default function FloatingWidgets() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [lift, setLift] = useState(0);
  const stackRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => onBannerClearance(setLift), []);

  // A new page starts with the chooser closed.
  useEffect(() => setOpen(false), [pathname]);

  // Open, focus goes to the first team; Escape or a press elsewhere closes it.
  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>('a')?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      triggerRef.current?.focus();
    };
    const onPointer = (event: PointerEvent) => {
      if (!stackRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);

  const shown = progress > 0.03;
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const chats = INDIA_PAGES.includes(path) ? [CHATS[1], CHATS[0]] : CHATS;

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div
      ref={stackRef}
      className={`${styles.stack} ${lift ? styles.lifted : ''}`}
      style={lift ? ({ '--stack-bottom': `${lift + GAP}px` } as React.CSSProperties) : undefined}
      data-widget="rail"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      {path === RFQ_PAGE ? null : (
        <a className={styles.rfq} href={RFQ_PAGE}>
          <Document className={styles.rfqIcon} />
          <span>Submit RFQ</span>
        </a>
      )}

      <button
        ref={triggerRef}
        type="button"
        className={styles.whatsapp}
        aria-label="Chat with SMEC on WhatsApp"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="whatsapp-chooser"
        onClick={() => setOpen((value) => !value)}
      >
        <WhatsApp />
      </button>

      <div
        ref={panelRef}
        id="whatsapp-chooser"
        className={`${styles.panel} ${open ? styles.panelOpen : ''}`}
        role="dialog"
        aria-labelledby="whatsapp-chooser-title"
      >
        <div className={styles.panelHead}>
          <span className={styles.panelIcon}>
            <WhatsApp />
          </span>
          <div>
            <p id="whatsapp-chooser-title" className={styles.panelTitle}>
              Chat with SMEC
            </p>
            <p className={styles.panelNote}>Select the engineering team for your region.</p>
          </div>
          <button type="button" className={styles.panelClose} aria-label="Close" onClick={close}>
            <Close />
          </button>
        </div>

        <ul className={styles.chats}>
          {chats.map((chat) => (
            <li key={chat.region}>
              <a
                className={styles.chat}
                href={chatHref(chat.office.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                <span className={styles.chatCode} aria-hidden="true">
                  {chat.code}
                </span>
                <span className={styles.chatText}>
                  <span className={styles.chatRegion}>{chat.label}</span>
                  <span className={styles.chatEntity}>{chat.office.entity}</span>
                  <span className={styles.chatPhone}>{chat.office.phone}</span>
                </span>
                <ArrowUpRight className={styles.chatArrow} />
                <span className="visuallyHidden">, opens WhatsApp</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className={`${styles.top} ${shown ? styles.topShown : ''}`}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg className={styles.ring} viewBox="0 0 44 44" aria-hidden="true">
          <circle className={styles.ringTrack} cx="22" cy="22" r="20" />
          <circle
            className={styles.ringFill}
            cx="22"
            cy="22"
            r="20"
            pathLength={1}
            style={{ strokeDashoffset: 1 - progress }}
          />
        </svg>
        <ArrowDown className={styles.topIcon} />
      </button>
    </div>
  );
}
