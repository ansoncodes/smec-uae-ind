"use client";

import Image from "next/image";
import Rail from "@/components/ui/Rail";
import SectionHeading from "@/components/ui/SectionHeading";
import { articles, type Article } from "@/lib/siteData";
import { ArrowRightIcon } from "@/components/Icons";
import styles from "./Articles.module.css";

function ArticleCard({ article }: { article: Article }) {
  return (
    <article className={`card card-hover ${styles.card}`}>
      <div className={styles.media}>
        <Image
          src={article.image}
          alt={article.title}
          width={500}
          height={500}
          className={styles.image}
          sizes="(max-width: 767px) 82vw, 340px"
        />
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{article.title}</h3>
        {article.text && <p className={styles.text}>{article.text}</p>}
        <a
          className={styles.link}
          href={article.href}
          {...(article.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          Read More
          <ArrowRightIcon size={14} />
        </a>
      </div>
    </article>
  );
}

export default function Articles() {
  return (
    <section className="section section-subtle" aria-labelledby="articles">
      <div className="container container-wide">
        <SectionHeading id="articles" eyebrow="Insights" title="Articles" />

        <div className={styles.rail}>
          <Rail
            items={articles}
            ariaLabel="Articles"
            gap={22}
            cardWidth={{ desktop: "330px", tablet: "310px", mobile: "82vw" }}
            autoplayDelay={4500}
            renderItem={(article) => <ArticleCard article={article} />}
          />
        </div>
      </div>
    </section>
  );
}
