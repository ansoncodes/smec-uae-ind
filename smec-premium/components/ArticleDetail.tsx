import Image from 'next/image';
import Link from 'next/link';
import { type Article } from '@/lib/siteData';
import { articleBody, type Block } from '@/lib/articles';
import { INSIGHTS } from '@/lib/experience';
import { ArrowRight, ArrowUpRight } from './Icons';
import styles from './ArticleDetail.module.css';

function renderBlock(block: Block, i: number) {
  switch (block.t) {
    case 'h2':
      return <h2 key={i}>{block.text}</h2>;
    case 'h3':
      return <h3 key={i}>{block.text}</h3>;
    case 'p':
      return <p key={i}>{block.text}</p>;
    case 'ul':
      return (
        <ul key={i}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol key={i}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );
    case 'quote':
      return <blockquote key={i}>{block.text}</blockquote>;
  }
}

/**
 * Article page: a dark masthead carrying the headline over the piece's own
 * artwork, the body set as a single measured column on the paper ground, then
 * three more to read. Copy comes from the matching post via `lib/articles`.
 *
 * The posters are a mix of portrait and landscape, so each is shown whole on
 * a blurred copy of itself rather than cropped.
 */
export default function ArticleDetail({ article, slug }: { article: Article; slug: string }) {
  const content = articleBody(slug);
  const current = INSIGHTS.find((item) => item.slug === slug);
  const more = INSIGHTS.filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <>
      <header className={`${styles.head} grain`}>
        <div className={`container ${styles.headGrid}`}>
          <div className={styles.headCopy}>
            <p className={styles.kicker}>
              <span className={styles.kickerRule} aria-hidden="true" />
              {current?.category ?? 'Insight'}
            </p>

            <h1 className={styles.title}>{article.title}</h1>

            {content?.standfirst ? (
              <p className={styles.standfirst}>{content.standfirst}</p>
            ) : article.subtitle ? (
              <p className={styles.standfirst}>{article.subtitle}</p>
            ) : null}

            {content?.author || content?.date ? (
              <p className={styles.meta}>
                {[content.author, content.date].filter(Boolean).join(' · ')}
              </p>
            ) : null}
          </div>

          <div className={styles.cover}>
            <Image
              src={article.image}
              alt=""
              fill
              sizes="300px"
              quality={30}
              className={styles.coverBlur}
              aria-hidden="true"
            />
            <div className={styles.coverInner}>
              <Image
                src={article.image}
                alt={article.alt}
                fill
                priority
                sizes="(max-width: 980px) 92vw, 46vw"
                className={styles.coverImage}
              />
            </div>
          </div>
        </div>
      </header>

      <article className={styles.article} data-tone="light">
        <div className="container">
          <div className={styles.prose}>
            {content ? (
              content.blocks.map(renderBlock)
            ) : (
              <p>{article.subtitle || article.title}</p>
            )}
          </div>

          <footer className={styles.foot}>
            <a
              className={styles.source}
              href={article.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="wipeLink">Read the original</span>
              <ArrowUpRight />
            </a>
          </footer>
        </div>
      </article>

      <section className="section" data-tone="dark" aria-labelledby="more-articles">
        <div className="container">
          <p className="sectionLabel" data-reveal="fade">
            <span className="num">→</span>
            <span>Keep reading</span>
            <span className="rule" />
          </p>

          <div className="sectionHead">
            <h2 id="more-articles" className="sectionTitle" data-reveal="up">
              More insights
            </h2>
            <p className="sectionIntro" data-reveal="up" data-reveal-delay="90">
              Technical writing from the SMEC team.
            </p>
          </div>

          <ul className={styles.moreGrid}>
            {more.map((item, i) => (
              <li key={item.slug} data-reveal="up" data-reveal-delay={i * 90}>
                <Link href={`/${item.slug}`} className={styles.card}>
                  <span className={styles.cardMedia}>
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="200px"
                      quality={30}
                      className={styles.coverBlur}
                      aria-hidden="true"
                    />
                    <span className={styles.cardInner}>
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 900px) 92vw, 30vw"
                        className={styles.coverImage}
                        loading="lazy"
                      />
                    </span>
                  </span>
                  <span className={styles.cardCategory}>{item.category}</span>
                  <span className={styles.cardTitle}>{item.title}</span>
                  {item.subtitle ? <span className={styles.cardText}>{item.subtitle}</span> : null}
                  <span className={`arrowLink ${styles.cardLink}`}>
                    Read Article
                    <ArrowRight className="arrow" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className={styles.backRow}>
            <Link className="arrowLink" href="/insights">
              All insights
              <ArrowRight className="arrow" />
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
