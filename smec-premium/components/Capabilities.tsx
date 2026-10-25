import Image from 'next/image';
import { CAPABILITIES_COPY } from '@/lib/homepage';
import { ArrowRight } from './Icons';
import styles from './Capabilities.module.css';

/**
 * Oil & Gas Engineering Solutions — her six capability cards, photo on the
 * left as images 11–12 set them out, each with its tagline, scope, tags and
 * a link to the solution page. The whole card answers a click; the link is
 * the named target, so a screen reader hears "Explore E&I Engineering", not
 * the card's every word.
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

        <ul className={styles.grid}>
          {cards.map((card, i) => (
            <li key={card.num} data-reveal="up" data-reveal-delay={(i % 2) * 90}>
              <article className={styles.card}>
                <div className={styles.media}>
                  <Image
                    src={card.image.src}
                    alt={card.image.alt}
                    width={card.image.width}
                    height={card.image.height}
                    sizes="(max-width: 560px) 34vw, (max-width: 1100px) 22vw, 15vw"
                    className={styles.img}
                    loading="lazy"
                  />
                </div>

                <div className={styles.body}>
                  <span className={styles.num} aria-hidden="true">
                    {card.num}
                  </span>
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
        </ul>

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
