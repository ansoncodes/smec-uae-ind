import Image from 'next/image';
import type { CompanyPage, PageSection } from '@/lib/companyPages';
import styles from './PageShell.module.css';

/**
 * One renderer for every company page, so About, Solutions, R&D, Careers,
 * Sustainability and the privacy policy share a single layout language:
 * a dark masthead with the picture on a plate, then the body on the paper
 * ground as prose, ruled point lists, pillar cards or disclosures.
 */

function Section({ section, i }: { section: PageSection; i: number }) {
  const num = String(i + 1).padStart(2, '0');

  if (section.t === 'prose') {
    return (
      <section className={styles.block}>
        {section.heading ? (
          <div className={styles.blockHead} data-reveal="up">
            <span className={styles.blockNum}>{num}</span>
            <h2 className={styles.blockTitle}>{section.heading}</h2>
          </div>
        ) : null}
        <div className={styles.prose} data-reveal="up" data-reveal-delay="60">
          {section.body.map((para) => (
            <p key={para.slice(0, 40)}>{para}</p>
          ))}
        </div>
      </section>
    );
  }

  if (section.t === 'points') {
    return (
      <section className={styles.block}>
        <div className={styles.blockHead} data-reveal="up">
          <span className={styles.blockNum}>{num}</span>
          <h2 className={styles.blockTitle}>{section.heading}</h2>
        </div>
        {section.intro ? (
          <p className={styles.intro} data-reveal="up" data-reveal-delay="60">
            {section.intro}
          </p>
        ) : null}
        <ul className={styles.points}>
          {section.items.map((item, j) => (
            <li key={item.k} data-reveal="up" data-reveal-delay={Math.min(j, 5) * 60}>
              <span className={styles.pointKey}>{item.k}</span>
              {item.v ? <span className={styles.pointVal}>{item.v}</span> : null}
            </li>
          ))}
        </ul>
      </section>
    );
  }

  if (section.t === 'pillars') {
    return (
      <section className={styles.block}>
        <div className={styles.blockHead} data-reveal="up">
          <span className={styles.blockNum}>{num}</span>
          <h2 className={styles.blockTitle}>{section.heading}</h2>
        </div>
        <ul className={styles.pillars}>
          {section.items.map((item, j) => (
            <li key={item} data-reveal="up" data-reveal-delay={j * 70}>
              <span className={styles.pillarNum}>{String(j + 1).padStart(2, '0')}</span>
              {item}
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section className={styles.block}>
      <div className={styles.blockHead} data-reveal="up">
        <span className={styles.blockNum}>{num}</span>
        <h2 className={styles.blockTitle}>{section.heading}</h2>
      </div>
      <div className={styles.faq}>
        {section.items.map((item, j) => (
          <details key={item.q} className={styles.faqItem} data-reveal="up" data-reveal-delay={Math.min(j, 4) * 50}>
            <summary>
              <span>{item.q}</span>
              <span className={styles.faqMark} aria-hidden="true" />
            </summary>
            <div className={styles.faqBody}>
              {item.a.map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
              {item.list ? (
                <ul>
                  {item.list.map((entry) => (
                    <li key={entry}>{entry}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

export default function PageShell({ page }: { page: CompanyPage }) {
  return (
    <>
      <header className={`${styles.masthead} grain`}>
        <div className={`container ${styles.mastheadGrid}`}>
          <div>
            <p className={styles.kicker}>
              <span className={styles.kickerRule} aria-hidden="true" />
              {page.kicker}
            </p>
            <h1 className={styles.title}>{page.title}</h1>
            <p className={styles.lead}>{page.lead}</p>
          </div>

          {page.image ? (
            <div className={styles.media}>
              <Image
                src={page.image}
                alt={page.imageAlt ?? ''}
                width={1400}
                height={1000}
                priority
                sizes="(max-width: 980px) 92vw, 44vw"
                className={styles.image}
              />
              <span className={styles.mediaEdge} aria-hidden="true" />
            </div>
          ) : null}
        </div>
      </header>

      <div className="section" data-tone="light">
        <div className="containerTight">
          {page.sections.map((section, i) => (
            <Section key={i} section={section} i={i} />
          ))}
        </div>
      </div>
    </>
  );
}
