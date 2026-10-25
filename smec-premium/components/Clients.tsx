'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ECOSYSTEM, type Logo } from '@/lib/siteData';
import { Building } from './Icons';
import styles from './Clients.module.css';

/**
 * Clients, Registrations & Technology Ecosystem — the client's three-tab
 * design (homepage document, images 8–10): Middle East clients and vendor
 * registrations, India, and the OEM brands SMEC engineers with.
 *
 * Every panel is rendered into the markup, so all three are in the HTML
 * whether or not a reader opens them; the tabs only choose which one shows.
 */

/** Tile width ÷ height; Clients.module.css sets the same aspect ratio. */
const TILE_RATIO = 3 / 2;

/**
 * Marks are sized by area rather than by width, so a tall one (ADNOC) and a
 * long one (Siemens) carry the same weight in identical tiles: each covers a
 * fifth of its tile, capped at 76% of the tile's width and 60% of its height.
 * The result is a share of the tile's width.
 */
const markWidth = ({ width, height }: Logo) => {
  const ratio = width / height;
  const share = Math.min(
    Math.sqrt((0.2 / TILE_RATIO) * ratio),
    0.76,
    (0.6 / TILE_RATIO) * ratio
  );
  return `${Math.round(share * 1000) / 10}%`;
};

export default function Clients() {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const count = ECOSYSTEM.length;

  /* Left/right walk the tabs and move focus with the selection, per the
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
      className={styles.section}
      data-tone="light"
      aria-labelledby="clients-title"
      id="clients"
    >
      <div className="container">
        <p className="sectionLabel" data-reveal="fade">
          <span>Clients, Registrations &amp; Technology Ecosystem</span>
          <span className="rule" />
        </p>

        <div className="sectionHead">
          <h2 id="clients-title" className="sectionTitle" data-reveal="up">
            Engineering Relationships Across Markets.
          </h2>
          <p className="sectionIntro" data-reveal="up" data-reveal-delay="90">
            From Middle East energy operators and utilities to Indian industrial clients and
            global automation technology providers, SMEC&rsquo;s engineering ecosystem supports
            projects across drilling, production, electrical systems, industrial automation and
            digitalisation.
          </p>
        </div>

        <div className={styles.ecosystem} data-reveal="up">
          <div
            ref={tabsRef}
            className={styles.tabs}
            role="tablist"
            aria-labelledby="clients-title"
            onKeyDown={onKeyDown}
          >
            {ECOSYSTEM.map((tab, i) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`ecosystem-tab-${tab.id}`}
                aria-selected={i === active}
                aria-controls={`ecosystem-panel-${tab.id}`}
                tabIndex={i === active ? 0 : -1}
                className={styles.tab}
                onClick={() => setActive(i)}
              >
                {tab.tab}
              </button>
            ))}
          </div>

          {ECOSYSTEM.map((tab, i) => (
            <div
              key={tab.id}
              id={`ecosystem-panel-${tab.id}`}
              role="tabpanel"
              aria-labelledby={`ecosystem-tab-${tab.id}`}
              // Nothing inside is focusable, so the panel itself takes the
              // next Tab stop and a keyboard reader lands on what changed.
              tabIndex={0}
              className={styles.panel}
              hidden={i !== active}
            >
              <h3 className={styles.panelTitle}>{tab.title}</h3>
              <p className={styles.panelBody}>{tab.body}</p>

              <div className={styles.groups}>
                {tab.groups.map((group) => (
                  <div
                    key={group.label}
                    className={styles.group}
                    // A group spans one column per mark on the wide grid, so
                    // every tile in every tab comes out the same size.
                    style={{ ['--span' as string]: group.logos.length || 6 }}
                  >
                    <h4 className={styles.groupLabel}>{group.label}</h4>
                    {group.logos.length > 0 ? (
                      <ul className={styles.logos}>
                        {group.logos.map((logo) => (
                          <li key={logo.src} className={styles.tile}>
                            <Image
                              src={logo.src}
                              alt={logo.alt}
                              width={logo.width}
                              height={logo.height}
                              sizes="(max-width: 560px) 34vw, 160px"
                              className={styles.logo}
                              style={{ width: markWidth(logo) }}
                              loading="lazy"
                            />
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className={styles.pending}>
                        <Building className={styles.pendingIcon} />
                        <span>{group.pending}</span>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
