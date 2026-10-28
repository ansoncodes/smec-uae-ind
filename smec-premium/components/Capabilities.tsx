import Image from 'next/image';
import { CAPABILITIES_COPY } from '@/lib/homepage';
import ActiveIndex from './ActiveIndex';
import { ArrowRight } from './Icons';
import styles from './Capabilities.module.css';

/**
 * Oil & Gas Engineering Solutions — her six capabilities as a numbered, ruled
 * list, each with its tagline, scope, tags and a link to the solution page,
 * every word on show.
 *
 * On a wide screen the photographs stand in one large frame on the left, as
 * images 11–12 put the photo on the left, and the frame shows the photo of
 * the row under the pointer or holding keyboard focus, keeping the last one.
 * On a narrower screen each row carries its own photo instead. A row answers
 * a click anywhere; its link is the named target, so a screen reader hears
 * "Explore E&I Engineering", not the row's every word.
 */
export default function Capabilities() {
  const { label, title, intro, cards, viewAll, prompt } = CAPABILITIES_COPY;

  return (
    <section
      className={styles.section}
      data-tone="light"
      id="engineering-solutions"
      aria-labelledby="solutions-title"
    >
      <div className="container">
        <p className="sectionLabel" data-reveal="fade">
          <span>{label}</span>
          <span className="rule" />
        </p>

        <div className="sectionHead">
          <h2 id="solutions-title" className="sectionTitle" data-reveal="up">
            {title}
          </h2>
          <div className={styles.headSide} data-reveal="up" data-reveal-delay="90">
            <p className="sectionIntro">{intro}</p>
            <a className="arrowLink" href={viewAll.href}>
              {viewAll.label}
              <ArrowRight className="arrow" />
            </a>
          </div>
        </div>

        <ActiveIndex className={styles.layout} initial={0} keep>
          {/* The frame repeats the rows' photographs, so assistive technology
              skips it; each row's own photograph carries the description. */}
          <div className={styles.stage} aria-hidden="true">
            <div className={styles.frame} data-parallax>
              {cards.map((card, i) => (
                <div key={card.num} className={styles.shot} style={{ '--i': i } as React.CSSProperties}>
                  <Image
                    src={card.image.src}
                    alt={card.image.alt}
                    width={card.image.width}
                    height={card.image.height}
                    sizes="(max-width: 999px) 92vw, 38vw"
                    className={`${styles.shotImg} drift`}
                    loading="lazy"
                  />
                  <span className={styles.shotNum}>{card.num}</span>
                </div>
              ))}
            </div>
          </div>

          <ol className={styles.list}>
            {cards.map((card, i) => (
              <li
                key={card.num}
                className={styles.row}
                data-index={i}
                style={{ '--i': i } as React.CSSProperties}
                data-reveal="up"
                data-reveal-delay={i * 70}
              >
                <article className={styles.item}>
                  <div className={styles.thumb}>
                    <Image
                      src={card.image.src}
                      alt={card.image.alt}
                      width={card.image.width}
                      height={card.image.height}
                      sizes="(max-width: 560px) 26vw, 140px"
                      className={styles.thumbImg}
                      loading="lazy"
                    />
                  </div>
                  <span className={styles.num} aria-hidden="true">
                    {card.num}
                  </span>
                  <div className={styles.copy}>
                    <h3 className={styles.title}>{card.title}</h3>
                    <p className={styles.tagline}>{card.tagline}</p>
                    <p className={styles.text}>{card.body}</p>
                    <ul className={`inlineList ${styles.tags}`} aria-label="Scope">
                      {card.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                    <a className={`arrowLink ${styles.cta}`} href={card.cta.href}>
                      {card.cta.label}
                      <ArrowRight className="arrow" />
                    </a>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </ActiveIndex>

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
