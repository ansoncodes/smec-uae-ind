'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { CERT_LOGOS } from '@/lib/siteData';
import { QUALITY_COPY, type CertIcon } from '@/lib/homepage';
import { Award, Bolt, Leaf, ShieldCheck } from './HomeIcons';
import { ArrowRight } from './Icons';
import styles from './Certifications.module.css';

const ICONS: Record<CertIcon, (p: { className?: string }) => React.JSX.Element> = {
  award: Award,
  leaf: Leaf,
  shield: ShieldCheck,
  bolt: Bolt,
};

/**
 * Quality & Certifications — one tab per legal entity, as images 17–18 lay
 * them out: the UAE company's four ISO management systems and the India
 * company's three. Both panels are in the markup; the tabs only choose which
 * one shows. The standards' marks under them are unchanged.
 */
export default function Certifications() {
  const { label, title, intro, tabs, footnote, cta } = QUALITY_COPY;
  const [active, setActive] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const count = tabs.length;

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
    <section className={`section ${styles.section}`} id="assurance" data-tone="light" aria-labelledby="assurance-title">
      <div className="container">
        <p className="sectionLabel" data-reveal="fade">
          <span>{label}</span>
          <span className="rule" />
        </p>

        <div className="sectionHead">
          <h2 id="assurance-title" className="sectionTitle" data-reveal="up">
            {title}
          </h2>
          <p className="sectionIntro" data-reveal="up" data-reveal-delay="90">
            {intro}
          </p>
        </div>

        <div className={styles.box} data-reveal="up">
          <div
            ref={tabsRef}
            className={styles.tabs}
            role="tablist"
            aria-labelledby="assurance-title"
            onKeyDown={onKeyDown}
          >
            {tabs.map((tab, i) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`quality-tab-${tab.id}`}
                aria-selected={i === active}
                aria-controls={`quality-panel-${tab.id}`}
                tabIndex={i === active ? 0 : -1}
                className={styles.tab}
                onClick={() => setActive(i)}
              >
                {tab.tab}
              </button>
            ))}
          </div>

          {tabs.map((tab, i) => (
            <div
              key={tab.id}
              id={`quality-panel-${tab.id}`}
              role="tabpanel"
              aria-labelledby={`quality-tab-${tab.id}`}
              className={styles.panel}
              hidden={i !== active}
            >
              <h3 className={styles.entity}>{tab.entity}</h3>
              <p className={styles.body}>{tab.body}</p>

              <ul className={styles.certs}>
                {tab.certs.map((cert) => {
                  const Icon = ICONS[cert.icon];
                  return (
                    <li key={cert.standard} className={styles.cert}>
                      <Icon className={styles.icon} />
                      <span className={styles.standard}>{cert.standard}</span>
                      <span className={styles.name}>{cert.name}</span>
                    </li>
                  );
                })}
              </ul>

              <div className={styles.foot}>
                <p className={styles.footnote}>{footnote}</p>
                <a className="arrowLink" href={cta.href}>
                  {cta.label}
                  <ArrowRight className="arrow" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------ standards marks */}
      {/* Three marks hold still: a marquee this short would loop with a gap. */}
      <ul className={styles.marks} aria-label="Certified management standards">
        {CERT_LOGOS.map((mark) => (
          <li key={mark.src} className={styles.mark}>
            <Image
              src={mark.src}
              alt={mark.alt}
              width={160}
              height={80}
              sizes="140px"
              className={styles.markImg}
              loading="lazy"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
