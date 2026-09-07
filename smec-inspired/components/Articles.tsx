'use client';

import { ARTICLES } from '@/lib/siteData';
import { isExternal, localHref } from '@/lib/routes';
import styles from './Articles.module.css';

export default function Articles() {
  // Duplicated once so the linear scroll can wrap without a visible seam.
  const loop = [...ARTICLES, ...ARTICLES];

  return (
    <section className={styles.section} aria-labelledby="articles">
      <h2 id="articles" className={styles.heading}>
        ARTICLES
      </h2>

      <div className={styles.viewport}>
        <ul className={styles.track} style={{ ['--count' as string]: ARTICLES.length }}>
          {loop.map((article, i) => {
            // Local article pages open in place; anything still off-site
            // keeps the original new-tab behaviour.
            const href = localHref(article.href);
            const external = isExternal(href);
            return (
              <li
                key={`${article.href}-${i}`}
                className={styles.card}
                aria-hidden={i >= ARTICLES.length}
              >
                <div className={styles.media}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.image}
                    alt={article.alt}
                    width={250}
                    height={400}
                    className={styles.image}
                    loading="lazy"
                  />
                  <span className={styles.scrim} />
                </div>

                <div className={styles.content}>
                  <h3 className={styles.cardTitleSlot} />
                  <div className={styles.text}>
                    <span className={styles.title}>{article.title}</span>
                    {article.subtitle && (
                      <>
                        <br />
                        {article.subtitle}
                      </>
                    )}
                  </div>
                  <div className={styles.buttonWrap}>
                    <a
                      href={href}
                      className={styles.button}
                      title="Read More"
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      tabIndex={i >= ARTICLES.length ? -1 : undefined}
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
