import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/ProductCard";
import { products, productsIntro } from "@/lib/siteData";
import Reveal from "@/components/ui/Reveal";
import styles from "./MajorProducts.module.css";

/** `.g4` grid of product cards, each linking to its detail page. */
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
            <Reveal key={product.slug} delay={(i % 4) * 70} className={styles.cell}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
