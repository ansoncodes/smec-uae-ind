import Image from 'next/image';
import { PRODUCTS_INTRO } from '@/lib/siteData';
import { SYSTEMS, SYSTEM_INDEX } from '@/lib/experience';
import { localHref } from '@/lib/routes';
import { ArrowRight, ArrowUpRight } from './Icons';
import styles from './Systems.module.css';

/**
 * Column span and plate ratio per card. The spans vary so the grid reads
 * editorially, and each row's ratios are chosen to give its cards the same
 * height — 7+5 and 5+7 on the wide rows, three 4s on the narrow one.
 */
const SPAN = [7, 5, 3, 5, 4, 5, 4, 3];
const RATIO = ['7 / 4', '5 / 4', '1 / 1', '5 / 3', '4 / 3', '5 / 3', '4 / 3', '1 / 1'];

/**
 * 02 / Systems — the twelve engineered systems the site sells.
 *
 * The eight with photography become large interactive plates at varying
 * widths; the four the live site lists without a page of their own follow as a
 * ruled index, carrying their real names and links and nothing invented.
 */
export default function Systems() {
  const photographed = SYSTEMS.filter((s) => s.image);

  return (
    <section className="section" id="systems" data-tone="dark" aria-labelledby="systems-title">
      <div className="gridLines" aria-hidden="true" />
      <div className="container">
        <p className="sectionLabel" data-reveal="fade">
          <span className="num">02</span>
          <span>Our Solutions</span>
          <span className="rule" />
        </p>

        <div className={`sectionHead ${styles.head}`}>
          <h2 id="systems-title" className="sectionTitle" data-reveal="up">
            Engineered for the field
          </h2>
          <div data-reveal="up" data-reveal-delay="90">
            <p className={styles.subtitle}>
              Integrated systems built for demanding environments.
            </p>
            <p className={styles.intro}>{PRODUCTS_INTRO}</p>
          </div>
        </div>

        <ul className={styles.grid}>
          {photographed.map((system, i) => (
            <li
              key={system.slug}
              className={styles.cell}
              style={{
                ['--span' as string]: SPAN[i] ?? 4,
                ['--ratio' as string]: RATIO[i] ?? '4 / 3',
              }}
              data-reveal="up"
              data-reveal-delay={(i % 3) * 90}
            >
              {/* The system photographs are studio cut-outs on white, so each
                  sits whole on a pale specimen plate; the caption goes below
                  it on the dark ground where it stays legible. */}
              <a className={styles.card} href={localHref(system.href)}>
                <div className={styles.plate}>
                  <Image
                    src={system.image!}
                    alt={system.title}
                    width={system.width}
                    height={system.height}
                    sizes="(max-width: 720px) 92vw, (max-width: 1100px) 46vw, 40vw"
                    className={styles.img}
                    loading={i < 2 ? 'eager' : 'lazy'}
                  />
                  <span className={styles.num} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.wash} aria-hidden="true">
                    <span className={styles.explore}>
                      Explore Solution
                      <ArrowRight className={styles.exploreArrow} />
                    </span>
                  </span>
                </div>

                <div className={styles.body}>
                  <h3 className={styles.name}>{system.title}</h3>
                  <p className={styles.lead}>{system.lead}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>

        {/* ------------------------------------------------ remaining index */}
        <div className={styles.index}>
          <div className={styles.indexHead}>
            <p className={styles.indexLabel}>Also engineered by SMEC</p>
            <span className={styles.indexRule} data-reveal="line" />
          </div>

          <ul className={styles.indexList}>
            {SYSTEM_INDEX.map((system, i) => (
              <li key={system.slug} data-reveal="up" data-reveal-delay={i * 70}>
                <a className={styles.indexRow} href={localHref(system.href)}>
                  <span className={styles.indexNum}>
                    {String(9 + i).padStart(2, '0')}
                  </span>
                  <span className={styles.indexName}>{system.title}</span>
                  <span className={styles.indexBlurb}>{system.lead}</span>
                  <ArrowUpRight className={styles.indexArrow} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
