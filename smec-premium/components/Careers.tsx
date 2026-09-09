import Image from 'next/image';
import { SITE, STATS } from '@/lib/siteData';
import { SCAFFOLD_WHO_WE_ARE } from '@/lib/scaffold';
import { localHref } from '@/lib/routes';
import { ArrowRight } from './Icons';
import styles from './Careers.module.css';

/**
 * 10 / Careers — a full-bleed band. The photograph drifts against the scroll
 * behind a heavy scrim; the copy sits on the container grid over it.
 */
export default function Careers() {
  const employees = STATS.find((s) => s.label === 'Employees')?.value ?? 500;
  const countries = STATS.find((s) => s.label === 'Countries')?.value ?? 10;

  return (
    <section className={`${styles.section} grain`} id="careers" aria-labelledby="careers-title">
      <div className={styles.media} data-parallax="0.1">
        {/* SCAFFOLD IMAGE: placeholder photograph — replace via lib/scaffold.ts */}
        <Image
          src={SCAFFOLD_WHO_WE_ARE.src}
          alt=""
          fill
          sizes="100vw"
          className={styles.image}
          loading="lazy"
          data-scaffold={SCAFFOLD_WHO_WE_ARE.id}
        />
      </div>
      <div className={styles.scrim} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <p className="sectionLabel" data-reveal="fade">
          <span className="num">10</span>
          <span>Careers</span>
          <span className="rule" />
        </p>

        <div className={styles.layout}>
          <div>
            <h2 id="careers-title" className={styles.title} data-reveal="up">
              Build the future
              <br />
              with SMEC.
            </h2>
          </div>

          <div className={styles.copy}>
            <p className={styles.body} data-reveal="up" data-reveal-delay="90">
              A team of professionals with superior skill is the key asset of SMEC. Join a global
              engineering organisation delivering turnkey systems for onshore and offshore
              operations, from Abu Dhabi to Kochi and across {countries}+ countries.
            </p>

            <div className={styles.figures} data-reveal="up" data-reveal-delay="140">
              <div>
                <span className={styles.figureValue}>{employees}+</span>
                <span className={styles.figureLabel}>Employees</span>
              </div>
              <div>
                <span className={styles.figureValue}>{countries}+</span>
                <span className={styles.figureLabel}>Countries</span>
              </div>
            </div>

            <a
              className={`btn ${styles.cta}`}
              href={localHref(`${SITE.url}/careers`)}
              data-reveal="up"
              data-reveal-delay="190"
            >
              View Careers
              <ArrowRight className="arrow" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
