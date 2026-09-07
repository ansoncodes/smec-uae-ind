import Image from 'next/image';
import Link from 'next/link';
import { ARTICLES, type Article } from '@/lib/siteData';
import { articleBody, type Block } from '@/lib/articles';
import { articleSlug, localHref } from '@/lib/routes';
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
 * Article page in the smec.com language: pale header, the article's own
 * artwork as the cover (shown whole on a blurred copy of itself, since the
 * posters are portrait), the body, then three more to read. Copy comes from
 * the matching post via `lib/articles`.
 */
export default function ArticleDetail({ article, slug }: { article: Article; slug: string }) {
  const content = articleBody(slug);
  const more = ARTICLES.filter((item) => articleSlug(item) !== slug).slice(0, 3);

  return (
    <>
      <header className={styles.head}>
        <div className="container">
          <div className={styles.headInner}>
            <p className="eyebrow">Insight</p>
            <h1 className={styles.title}>{article.title}</h1>
            {content?.standfirst && <p className={styles.standfirst}>{content.standfirst}</p>}
            {(content?.author || content?.date) && (
              <p className={styles.meta}>
                {[content.author, content.date].filter(Boolean).join(' · ')}
              </p>
            )}
          </div>

          <div className={styles.cover}>
            <Image
              src={article.image}
              alt=""
              fill
              sizes="300px"
              quality={40}
              className={styles.coverBlur}
              aria-hidden="true"
            />
            <div className={styles.coverInner}>
              <Image
                src={article.image}
                alt={article.alt}
                fill
                priority
                sizes="(max-width: 960px) 92vw, 900px"
                className={styles.coverImage}
              />
            </div>
          </div>
        </div>
      </header>

      <article className={styles.article}>
        <div className="container">
          {content ? (
            <div className={styles.prose}>{content.blocks.map(renderBlock)}</div>
          ) : (
            <div className={styles.prose}>
              <p>{article.subtitle || article.title}</p>
            </div>
          )}

          <footer className={styles.foot}>
            <a className="arrowLink" href={article.href} target="_blank" rel="noopener noreferrer">
              Read the original
            </a>
          </footer>
        </div>
      </article>

      <section className={styles.more} aria-labelledby="more-articles">
        <div className="container">
          <div className={styles.moreHead}>
            <p className="eyebrow">Keep reading</p>
            <h2 id="more-articles" className={styles.moreTitle}>
              More insights
            </h2>
          </div>

          <div className={styles.moreGrid}>
            {more.map((item) => (
              <Link key={item.href} href={localHref(item.href)} className={styles.card}>
                <div className={styles.cardMedia}>
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="200px"
                    quality={40}
                    className={styles.coverBlur}
                    aria-hidden="true"
                  />
                  <div className={styles.cardInner}>
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 900px) 92vw, 420px"
                      className={styles.coverImage}
                    />
                  </div>
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  {item.subtitle && <p className={styles.cardText}>{item.subtitle}</p>}
                  <span className={`arrowLink ${styles.cardLink}`}>Read More</span>
                </div>
              </Link>
            ))}
          </div>

          <p className={styles.backRow}>
            <Link className="arrowLink" href="/#articles">
              All articles
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
