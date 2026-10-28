import Image from 'next/image';
import { DIGITAL_COPY } from '@/lib/homepage';
import { ArrowRight, ArrowUpRight } from './Icons';
import styles from './Digitalisation.module.css';

/**
 * Digitalisation & Asset Intelligence — her four platforms, each with its own
 * key visual and logo (image 15), as wide rows down the page: the visual in a
 * dark screen on one side, every word of her text on the other, the two
 * changing sides from row to row. Every "Explore …" goes to the Asset Digital
 * Intelligence site, as her Digitalisation launcher does; "Explore All
 * Digitalisation Solutions" stays on this site, at the /digital/ hub.
 */
export default function Digitalisation() {
  const { label, title, topics, intro, platforms, viewAll, prompt } = DIGITAL_COPY;

  return (
    <section className={styles.section} data-tone="light" id="digitalisation" aria-labelledby="digital-title">
      <div className="container">
        <p className="sectionLabel" data-reveal="fade">
          <span>{label}</span>
          <span className="rule" />
        </p>

        <div className="sectionHead">
          <div>
            <h2 id="digital-title" className="sectionTitle" data-reveal="up">
              {title}
            </h2>
            <ul className={`inlineList ${styles.topics}`} data-reveal="up" data-reveal-delay="60">
              {topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </div>
          <div className={styles.headSide} data-reveal="up" data-reveal-delay="90">
            {intro.map((paragraph, i) => (
              <p key={paragraph.slice(0, 24)} className={i === 0 ? 'sectionIntro' : styles.more}>
                {paragraph}
              </p>
            ))}
            <a className="arrowLink" href={viewAll.href}>
              {viewAll.label}
              <ArrowRight className="arrow" />
            </a>
          </div>
        </div>

        <ol className={styles.rows}>
          {platforms.map((platform, i) => (
            <li key={platform.name} className={styles.row} data-reveal="up">
              <article className={styles.item}>
                {/* The screen floats a little against the scroll (--p, from
                    MotionRoot) rather than cropping the render inside it. */}
                <div className={styles.visual} data-parallax>
                  <div className={styles.screen}>
                    <Image
                      src={platform.image.src}
                      alt={platform.image.alt}
                      width={platform.image.width}
                      height={platform.image.height}
                      sizes="(max-width: 900px) 92vw, 52vw"
                      className={styles.img}
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className={styles.body}>
                  <span className={styles.num} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className={styles.name}>{platform.name}</h3>
                  <p className={styles.focus}>{platform.focus}</p>
                  <p className={styles.tagline}>{platform.tagline}</p>
                  <p className={styles.text}>{platform.body}</p>
                  <ul className={`inlineList ${styles.tags}`} aria-label="Covers">
                    {platform.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <a
                    className={`arrowLink ${styles.cta}`}
                    href={platform.cta.href}
                    target="_blank"
                    rel="noopener"
                  >
                    {platform.cta.label}
                    <ArrowUpRight className="arrow" />
                    <span className="visuallyHidden"> (opens the SMEC Asset Digital Intelligence site in a new tab)</span>
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ol>

        <div className={styles.prompt} data-reveal="up">
          <div>
            <p className={styles.promptTitle}>{prompt.title}</p>
            <p className={styles.promptBody}>{prompt.body}</p>
          </div>
          <a className="btn btnAccent" href={prompt.cta.href}>
            {prompt.cta.label}
            <ArrowRight className="arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}
