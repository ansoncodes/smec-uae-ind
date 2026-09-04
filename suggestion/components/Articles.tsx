"use client";

import Image from "next/image";
import Rail from "@/components/ui/Rail";
import SectionHeading from "@/components/ui/SectionHeading";
import Link from "next/link";
import { articleHref, articles, type Article } from "@/lib/siteData";
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
      <Link className="more" href={articleHref(article.slug)}>
        Read More →
      </Link>
    </article>
  );
}

/** Cards ride the scroll-snap rail. */
export default function Articles() {
  return (
    <section aria-labelledby="articles">
      <div className="container">
        <SectionHeading id="articles" index="10" eyebrow="Insights" title="Articles" />

        <Rail
          items={articles}
          ariaLabel="Articles"
          gap={20}
          cardWidth={{ desktop: "348px", tablet: "310px", mobile: "84vw" }}
          autoplayDelay={4500}
          renderItem={(article) => <ArticleCard article={article} />}
        />
      </div>
    </section>
  );
}
