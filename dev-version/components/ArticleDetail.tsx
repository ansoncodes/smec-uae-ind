import Image from "next/image";
import Link from "next/link";
import Eyebrow from "@/components/ui/Eyebrow";
import { articleHref, articles, type Article } from "@/lib/siteData";
import { articleBody, type Block } from "@/lib/articles";
import styles from "./ArticleDetail.module.css";

function renderBlock(block: Block, i: number) {
  switch (block.t) {
    case "h2":
      return <h2 key={i}>{block.text}</h2>;
    case "h3":
      return <h3 key={i}>{block.text}</h3>;
    case "p":
      return <p key={i}>{block.text}</p>;
    case "ul":
      return (
        <ul key={i}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={i}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );
    case "quote":
      return <blockquote key={i}>{block.text}</blockquote>;
  }
}

/** Article page: cover image, standfirst, body, then three more to read. */
export default function ArticleDetail({ article }: { article: Article }) {
  const content = articleBody(article.slug);
  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <article className={styles.article}>
        <div className={styles.glow} aria-hidden="true" />
        <div className="container">
          <header className={styles.head}>
            <Eyebrow>Insight</Eyebrow>
            <h1 className={styles.title}>{article.title}</h1>
            {content?.standfirst && (
              <p className={styles.standfirst}>{content.standfirst}</p>
            )}
            {(content?.author || content?.date) && (
              <p className={styles.meta}>
                {[content.author, content.date].filter(Boolean).join(" · ")}
              </p>
            )}
          </header>

          <div className={styles.cover}>
            <Image
              src={article.image}
              alt=""
              width={500}
              height={500}
              priority
              className={styles.coverImage}
              sizes="(max-width: 900px) 92vw, 900px"
            />
          </div>

          {content ? (
            <div className={styles.prose}>{content.blocks.map(renderBlock)}</div>
          ) : (
            <div className={styles.prose}>
              <p>{article.text}</p>
            </div>
          )}

          <footer className={styles.foot}>
            <a
              className="more"
              href={article.sourceHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the original →
            </a>
          </footer>
        </div>
      </article>

      <section className="paper" aria-labelledby="more-articles">
        <div className="container">
          <div className="section-head">
            <Eyebrow>Keep reading</Eyebrow>
            <h2 id="more-articles">More insights</h2>
          </div>

          <div className="grid g3">
            {more.map((item) => (
              <Link key={item.slug} href={articleHref(item.slug)} className={`card ${styles.card}`}>
                <div className={styles.cardMedia}>
                  <Image
                    src={item.image}
                    alt=""
                    width={500}
                    height={500}
                    className={styles.cardImage}
                    sizes="(max-width: 1000px) 46vw, 420px"
                  />
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                {item.text && <p className={styles.cardText}>{item.text}</p>}
                <span className="more">Read More →</span>
              </Link>
            ))}
          </div>

          <p className={styles.backRow}>
            <Link className="more" href="/#articles">
              ← All articles
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
