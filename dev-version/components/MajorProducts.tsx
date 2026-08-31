import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { products, productsIntro } from "@/lib/siteData";
import { ArrowRightIcon } from "@/components/Icons";
import styles from "./MajorProducts.module.css";

export default function MajorProducts() {
  return (
    <section className="section" id="products" aria-labelledby="major-products">
      <div className="container container-wide">
        <SectionHeading
          id="major-products"
          eyebrow="Product suite"
          title="Our Major Products"
          body={productsIntro}
        />

        <div className={styles.grid}>
          {products.map((product) => (
            <article className={`card card-hover ${styles.card}`} key={product.title}>
              <div className={styles.media}>
                <Image
                  src={product.image}
                  alt={product.title}
                  width={768}
                  height={460}
                  className={styles.image}
                  sizes="(max-width: 767px) 92vw, (max-width: 1024px) 46vw, 300px"
                />
              </div>

              <div className={styles.body}>
                <h3 className={styles.title}>{product.title}</h3>
                <p className={styles.tagline}>{product.tagline}</p>
                {product.text && <p className={styles.text}>{product.text}</p>}
                <a className={styles.link} href={product.href}>
                  Know More
                  <ArrowRightIcon size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
