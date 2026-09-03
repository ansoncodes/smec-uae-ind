import Image from "next/image";
import Link from "next/link";
import { productHref, type Product } from "@/lib/siteData";
import styles from "./ProductCard.module.css";

/** Shared by the homepage grid and the related-products grid on detail pages. */
export default function ProductCard({
  product,
  sizes = "(max-width: 1000px) 46vw, 340px",
}: {
  product: Product;
  sizes?: string;
}) {
  return (
    <article className={`card ${styles.card}`}>
      <div className={styles.media}>
        <Image
          src={product.image}
          alt={product.title}
          width={768}
          height={460}
          className={styles.image}
          sizes={sizes}
        />
      </div>
      <h3 className={styles.title}>{product.title}</h3>
      <p className={styles.tagline}>{product.tagline}</p>
      {product.text && <p className={styles.text}>{product.text}</p>}
      <Link className="more" href={productHref(product.slug)}>
        Know More →
      </Link>
    </article>
  );
}
