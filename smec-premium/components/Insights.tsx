import Image from 'next/image';
import Link from 'next/link';
import { INSIGHTS } from '@/lib/experience';
import { ArrowRight } from './Icons';
import styles from './Insights.module.css';

/**
 * 09 / Insights — one featured piece, a ruled rail of four beside it and a row
 * of three underneath. Every article is the site's own; the rest are listed on
 * /insights.
 */
export default function Insights() {
  const [featured, ...rest] = INSIGHTS;
  const rail = rest.slice(0, 4);
  const row = rest.slice(4, 7);

  return (
    <section className="section" id="insights" data-tone="light" aria-labelledby="insights-title">
      <div className="container">
        <p className="sectionLabel" data-reveal="fade">
          <span className="num">09</span>
          <span>Insights</span>
          <span className="rule" />
        </p>

        <div className="sectionHead">
          <h2 id="insights-title" className="sectionTitle" data-reveal="up">
            Insights &amp; perspectives
          </h2>
          <div className={styles.headSide} data-reveal="up" data-reveal-delay="90">
            <p className="sectionIntro">
              Technical writing from the SMEC team on the systems, history and direction of oil
              and gas engineering.
            </p>
            <Link className={`arrowLink ${styles.viewAll}`} href="/insights">
              View All Insights
              <ArrowRight className="arrow" />
            </Link>
          </div>
        </div>

        <div className={styles.top}>
          {/* ------------------------------------------------- featured */}
          <article className={styles.featured} data-reveal="up">
            <Link className={styles.featuredLink} href={`/${featured.slug}`}>
              <div className={styles.featuredMedia}>
                <Image
                  src={featured.image}
                  alt={featured.alt}
                  width={1200}
                  height={800}
                  sizes="(max-width: 980px) 92vw, 56vw"
                  className={styles.featuredImg}
                  loading="lazy"
                />
                <span className={styles.badge}>Featured</span>
              </div>

              <div className={styles.featuredBody}>
                <p className={styles.meta}>
                  <span className={styles.category}>{featured.category}</span>
                  <span className={styles.metaRule} aria-hidden="true" />
                  <span>Article</span>
                </p>
                <h3 className={styles.featuredTitle}>{featured.title}</h3>
                {featured.subtitle ? (
                  <p className={styles.featuredSub}>{featured.subtitle}</p>
                ) : null}
                <span className={`arrowLink ${styles.read}`}>
                  Read Article
                  <ArrowRight className="arrow" />
                </span>
              </div>
            </Link>
          </article>

          {/* ----------------------------------------------------- rail */}
          <ul className={styles.rail}>
            {rail.map((article, i) => (
              <li key={article.slug} data-reveal="up" data-reveal-delay={i * 80}>
                <Link className={styles.railItem} href={`/${article.slug}`}>
                  <span className={styles.railMedia}>
                    <Image
                      src={article.image}
                      alt=""
                      width={320}
                      height={240}
                      sizes="140px"
                      className={styles.railImg}
                      loading="lazy"
                    />
                  </span>
                  <span className={styles.railBody}>
                    <span className={styles.category}>{article.category}</span>
                    <span className={styles.railTitle}>{article.title}</span>
                    {article.subtitle ? (
                      <span className={styles.railSub}>{article.subtitle}</span>
                    ) : null}
                  </span>
                  <ArrowRight className={styles.railArrow} />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* -------------------------------------------------------- row */}
        <ul className={styles.row}>
          {row.map((article, i) => (
            <li key={article.slug} data-reveal="up" data-reveal-delay={i * 90}>
              <Link className={styles.card} href={`/${article.slug}`}>
                <span className={styles.cardMedia}>
                  <Image
                    src={article.image}
                    alt=""
                    width={720}
                    height={480}
                    sizes="(max-width: 900px) 92vw, 30vw"
                    className={styles.cardImg}
                    loading="lazy"
                  />
                </span>
                <span className={styles.category}>{article.category}</span>
                <span className={styles.cardTitle}>{article.title}</span>
                {article.subtitle ? (
                  <span className={styles.cardSub}>{article.subtitle}</span>
                ) : null}
                <span className={`arrowLink ${styles.read}`}>
                  Read Article
                  <ArrowRight className="arrow" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
