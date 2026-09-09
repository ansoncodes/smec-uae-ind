import Image from 'next/image';
import { SITE, WHO_WE_ARE } from '@/lib/siteData';
import { SCAFFOLD_WHO_WE_ARE } from '@/lib/scaffold';
import { PROCESS } from '@/lib/experience';
import { localHref } from '@/lib/routes';
import { ArrowRight } from './Icons';
import styles from './About.module.css';

/**
 * 01 / About — an editorial split: a tall photograph that drifts against the
 * scroll, the company statement beside it, and the EPC process drawn as a
 * ruled timeline that fills stage by stage as it comes into view.
 */
export default function About() {
  return (
    <section className="section" id="about" data-tone="light" aria-labelledby="about-title">
      <div className="container">
        <p className="sectionLabel" data-reveal="fade">
          <span className="num">01</span>
          <span>About SMEC</span>
          <span className="rule" />
        </p>

        <div className={styles.split}>
          <figure className={styles.media} data-reveal="mask">
            <div className={styles.mediaInner} data-parallax="0.1">
              {/* SCAFFOLD IMAGE: placeholder photograph — replace via lib/scaffold.ts */}
              <Image
                src={SCAFFOLD_WHO_WE_ARE.src}
                alt={SCAFFOLD_WHO_WE_ARE.alt}
                width={1600}
                height={2000}
                sizes="(max-width: 980px) 92vw, 46vw"
                className={styles.image}
                data-scaffold={SCAFFOLD_WHO_WE_ARE.id}
              />
            </div>
            <figcaption className={styles.caption}>
              <span className={styles.captionRule} aria-hidden="true" />
              Field operations &amp; system integration
            </figcaption>
          </figure>

          <div className={styles.copy}>
            <h2 id="about-title" className={styles.title} data-reveal="up">
              Engineering complexity.
              <br />
              <span className={styles.titleDim}>Simplified.</span>
            </h2>

            <p className={styles.lead} data-reveal="up" data-reveal-delay="90">
              {WHO_WE_ARE.body}
            </p>

            <ul className={styles.points} data-reveal="up" data-reveal-delay="160">
              <li>
                <span className={styles.pointKey}>One roof</span>
                Design, estimation, build, installation and commissioning
              </li>
              <li>
                <span className={styles.pointKey}>OEM integration</span>
                Systems integrated across the leading manufacturers
              </li>
              <li>
                <span className={styles.pointKey}>People</span>
                A team of professionals with superior skill
              </li>
            </ul>

            <a
              className={`btn ${styles.cta}`}
              href={localHref(`${SITE.url}/about-us`)}
              data-reveal="up"
              data-reveal-delay="220"
            >
              Discover SMEC
              <ArrowRight className="arrow" />
            </a>
          </div>
        </div>

        {/* -------------------------------------------------- process line */}
        <div className={styles.process} aria-label="How SMEC delivers a project">
          <div className={styles.processHead}>
            <p className={styles.processLabel}>The delivery model</p>
            <span className={styles.processRule} data-reveal="line" />
          </div>

          <ol className={styles.steps}>
            {PROCESS.map((stage, i) => (
              <li
                key={stage.step}
                className={styles.step}
                data-reveal="up"
                data-reveal-delay={i * 110}
              >
                <span className={styles.node} aria-hidden="true" />
                <span className={styles.stepIndex}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.stepName}>{stage.step}</span>
                <span className={styles.stepNote}>{stage.note}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
