import Image from 'next/image';
import { SITE, SUSTAINABILITY } from '@/lib/siteData';
import { localHref } from '@/lib/routes';
import { ArrowRight } from './Icons';
import styles from './Sustainability.module.css';

const CONTRIBUTIONS = [
  { k: 'Energy efficiency', v: 'Drives and power systems specified to cut consumption' },
  { k: 'Automation', v: 'Control that removes waste from routine operation' },
  { k: 'Optimisation', v: 'Data from the field turned into operating decisions' },
  { k: 'Safer operations', v: 'Detection, alarm and shutdown engineered in' },
];

/**
 * 08 / Sustainability — a wide editorial plate that drifts against the scroll,
 * with SMEC's own sustainability statement and what the work contributes.
 */
export default function Sustainability() {
  return (
    <section
      className="section"
      id="sustainability"
      data-tone="light"
      aria-labelledby="sustainability-title"
    >
      <div className="container">
        <p className="sectionLabel" data-reveal="fade">
          <span className="num">08</span>
          <span>Sustainability</span>
          <span className="rule" />
        </p>

        <h2 id="sustainability-title" className={styles.title} data-reveal="up">
          Engineering a more responsible energy future.
        </h2>
      </div>

      <figure className={styles.plate} data-reveal="mask">
        <div className={styles.plateInner} data-parallax="0.14">
          <Image
            src={SUSTAINABILITY.image}
            alt="SMEC promoting sustainable energy awareness"
            width={SUSTAINABILITY.width}
            height={SUSTAINABILITY.height}
            sizes="100vw"
            className={styles.image}
            loading="lazy"
          />
        </div>
      </figure>

      <div className="container">
        <div className={styles.body}>
          <div className={styles.statement}>
            <p className={styles.statementTitle}>{SUSTAINABILITY.title}</p>
            <p className={styles.statementBody}>{SUSTAINABILITY.body}</p>
            <a
              className={`arrowLink ${styles.link}`}
              href={localHref(`${SITE.url}/sustainability`)}
            >
              Our approach
              <ArrowRight className="arrow" />
            </a>
          </div>

          <ul className={styles.list}>
            {CONTRIBUTIONS.map((item, i) => (
              <li key={item.k} data-reveal="up" data-reveal-delay={i * 80}>
                <span className={styles.listNum}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.listKey}>{item.k}</span>
                <span className={styles.listVal}>{item.v}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
