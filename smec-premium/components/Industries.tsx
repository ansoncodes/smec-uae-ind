import Image from 'next/image';
import { INDUSTRIES_COPY } from '@/lib/homepage';
import { ArrowRight } from './Icons';
import IndustryPanels from './IndustryPanels';
import styles from './Industries.module.css';

/**
 * Industries & Markets — her six industries, each a link to its own industry
 * page rather than a jump within this one, then the value-chain block and
 * the two calls to action from her text.
 *
 * On a wide screen with a mouse the six are photographic panels side by
 * side, and the one under the pointer or holding keyboard focus opens to
 * show her focus line, text and link (see the stylesheet). On touch, narrow
 * screens and under reduced motion they are image 16's cards, with every
 * word on show. Either way all of it is in the HTML.
 */
export default function Industries() {
  const { label, title, subtitle, intro, cards, valueChain, viewAll, rfq } = INDUSTRIES_COPY;

  return (
    <section className={styles.section} data-tone="light" id="industries" aria-labelledby="industries-title">
      <div className="container">
        <p className="sectionLabel" data-reveal="fade">
          <span>{label}</span>
          <span className="rule" />
        </p>

        <div className="sectionHead">
          <div>
            <h2 id="industries-title" className="sectionTitle" data-reveal="up">
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

        <IndustryPanels className={styles.grid}>
          {cards.map((card, i) => (
            <li
              key={card.num}
              style={{ '--i': i } as React.CSSProperties}
              data-reveal="up"
              data-reveal-delay={(i % 3) * 80}
            >
              {/* data-label is the closed panel's caption, drawn by CSS so
                  the title is not in the page twice. */}
              <article className={styles.card} data-label={card.title}>
                <div className={styles.media} data-parallax>
                  <Image
                    src={card.image.src}
                    alt={card.image.alt}
                    width={card.image.width}
                    height={card.image.height}
                    sizes="(max-width: 640px) 92vw, (max-width: 1000px) 46vw, 36vw"
                    className={`${styles.img} drift`}
                    loading="lazy"
                  />
                  <span className={styles.num} aria-hidden="true">
                    {card.num}
                  </span>
                </div>
                <div className={styles.body}>
                  <h3 className={styles.name}>{card.title}</h3>
                  <p className={styles.focus}>{card.focus}</p>
                  <p className={styles.text}>{card.body}</p>
                  <a className={`arrowLink ${styles.cta}`} href={card.cta.href}>
                    {card.cta.label}
                    <ArrowRight className="arrow" />
                  </a>
                </div>
              </article>
            </li>
          ))}
        </IndustryPanels>

        {/* ------------------------------------------------ value chain */}
        <div className={styles.chain} data-reveal="up">
          <div className={styles.chainHead}>
            <h3 className={styles.chainTitle}>{valueChain.title}</h3>
            <p className={styles.chainBody}>{valueChain.body}</p>
          </div>
          <ul className={styles.audiences}>
            {valueChain.audiences.map((audience) => (
              <li key={audience.label}>
                <a className={styles.audience} href={audience.href}>
                  {audience.label}
                  <ArrowRight className={styles.audienceArrow} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.ctas} data-reveal="up">
          <a className="btn btnOutline" href={viewAll.href}>
            {viewAll.label}
            <ArrowRight className="arrow" />
          </a>
          <a className="btn btnAccent" href={rfq.href}>
            {rfq.label}
            <ArrowRight className="arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}
