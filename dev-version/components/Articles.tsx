"use client";

import Image from "next/image";
import Rail from "@/components/ui/Rail";
import SectionHeading from "@/components/ui/SectionHeading";
import { articles, type Article } from "@/lib/siteData";
import styles from "./Articles.module.css";

function ArticleCard({ article }: { article: Article }) {
  return (
    <article className={`card ${styles.card}`}>
      <div className={styles.media}>
        <Image
          src={article.image}
          alt={article.title}
          width={500}
          height={500}
          className={styles.image}
          sizes="(max-width: 767px) 82vw, 330px"
        />
      </div>

      <h3 className={styles.title}>{article.title}</h3>
      {article.text && <p className={styles.text}>{article.text}</p>}
      <a
        className="more"
        href={article.href}
        {...(article.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        Read More →
      </a>
    </article>
  );
}

/** Prototype `.paper` section; cards ride the scroll-snap rail. */
export default function Articles() {
  return (
    <section className="paper" aria-labelledby="articles">
      <div className="container">
        <SectionHeading id="articles" eyebrow="Insights" title="Articles" />

        <Rail
          items={articles}
          ariaLabel="Articles"
          gap={20}
          cardWidth={{ desktop: "300px", tablet: "290px", mobile: "82vw" }}
          autoplayDelay={4500}
          renderItem={(article) => <ArticleCard article={article} />}
        />
      </div>
    </section>
  );
}
