import Image from 'next/image';
import { ABOUT_COPY } from '@/lib/homepage';
import { ArrowRight } from './Icons';
import styles from './About.module.css';

/**
 * About SMEC — Engineering & Delivery (image 19): the two engineering bases,
 * each with the office it works from, then her four-step delivery sequence as
 * one compact horizontal line beneath them.
 */
export default function About() {
  const {
    label,
    title,
    subtitle,
    intro,
    basesTitle,
    bases,
    lifecycleTitle,
    lifecycle,
    primary,
    secondary,
  } = ABOUT_COPY;

  return (
    <section className={`section ${styles.section}`} id="about" data-tone="light" aria-labelledby="about-title">
      <div className="container">
        <p className="sectionLabel" data-reveal="fade">
          <span>{label}</span>
          <span className="rule" />
        </p>

        <div className="sectionHead">
          <div>
            <h2 id="about-title" className="sectionTitle" data-reveal="up">
              {title}
            </h2>
            <p className={styles.subtitle} data-reveal="up" data-reveal-delay="60">
              {subtitle}
            </p>
          </div>
          <div className={styles.headSide} data-reveal="up" data-reveal-delay="90">
            {intro.map((paragraph, i) => (
              <p key={paragraph.slice(0, 24)} className={i === 0 ? 'sectionIntro' : styles.more}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------------ bases */}
        <h3 className={styles.blockTitle} data-reveal="up">
          {basesTitle}
        </h3>

        <ul className={styles.bases}>
          {bases.map((base, i) => (
            <li key={base.num} data-reveal="up" data-reveal-delay={i * 90}>
              <article className={styles.base}>
                <div className={styles.media}>
                  <Image
                    src={base.image.src}
                    alt={base.image.alt}
                    width={base.image.width}
                    height={base.image.height}
                    sizes="(max-width: 900px) 92vw, 44vw"
                    className={styles.img}
                    loading="lazy"
                  />
                </div>
                <div className={styles.baseBody}>
                  <p className={styles.baseKicker}>
                    {base.num} — {base.name}
                  </p>
                  <h4 className={styles.baseEntity}>
                    <a className={styles.baseLink} href={base.href}>
                      {base.entity}
                      <ArrowRight className={styles.baseArrow} />
                    </a>
                  </h4>
                  <p className={styles.baseText}>{base.body}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {/* -------------------------------------------------- lifecycle */}
        <div className={styles.lifecycle}>
          <h3 className={styles.blockTitle} data-reveal="up">
            {lifecycleTitle}
          </h3>
          <ol className={styles.steps}>
            {lifecycle.map((stage, i) => (
              <li key={stage.step} className={styles.step} data-reveal="up" data-reveal-delay={i * 90}>
                <span className={styles.stepIndex} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={styles.stepName}>{stage.step}</span>
                <span className={styles.stepNote}>{stage.note}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.ctas} data-reveal="up">
          <a className="btn btnAccent" href={primary.href}>
            {primary.label}
            <ArrowRight className="arrow" />
          </a>
          <a className="btn btnOutline" href={secondary.href}>
            {secondary.label}
            <ArrowRight className="arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}
