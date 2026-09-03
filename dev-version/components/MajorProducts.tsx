import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { products, productsIntro } from "@/lib/siteData";
import Reveal from "@/components/ui/Reveal";
import styles from "./MajorProducts.module.css";

/** Prototype `.paper` section with a `.g4` grid of `.card`s. */
export default function MajorProducts() {
  return (
    <section id="products" aria-labelledby="major-products">
      <div className="container">
        <SectionHeading
          id="major-products"
          index="03"
          eyebrow="Products"
          title="Our Major Products"
          body={productsIntro}
        />

        <div className={`grid g4 ${styles.grid}`}>
          {products.map((product, i) => (
            <Reveal key={product.title} delay={(i % 4) * 70} className={styles.cell}>
              <article className={`card ${styles.card}`}>
                <div className={styles.media}>
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={768}
                    height={460}
                    className={styles.image}
                    sizes="(max-width: 1000px) 46vw, 290px"
                  />
                </div>
                <h3 className={styles.title}>{product.title}</h3>
                <p className={styles.tagline}>{product.tagline}</p>
                {product.text && <p className={styles.text}>{product.text}</p>}
                <a className="more" href={product.href}>
                  Know More →
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
