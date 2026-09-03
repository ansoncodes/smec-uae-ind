import Image from "next/image";
import Link from "next/link";
import Eyebrow from "@/components/ui/Eyebrow";
import ProductCard from "@/components/ProductCard";
import { contact, navItems, products, type Product } from "@/lib/siteData";
import styles from "./ProductDetail.module.css";

/**
 * Detail page body for one product.
 *
 * Everything here comes from `lib/siteData.ts` — the same title, tagline,
 * description and photograph the homepage card uses, plus any sub-variants the
 * nav already lists for this product. No specifications, ratings or
 * capabilities are invented: this is safety-critical equipment and that copy
 * has to come from SMEC.
 */
export default function ProductDetail({ product }: { product: Product }) {
  const related = products.filter((p) => p.slug !== product.slug);

  // Some products have variants already listed in the nav (Power House has
  // VFD and SCR houses under it). Surface them rather than inventing any.
  const productsNav = navItems.find((n) => n.label === "Products");
  const variants =
    productsNav?.children?.find((c) => c.href.endsWith(`/${product.slug}`))?.children ?? [];

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.glow} aria-hidden="true" />
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.copy}>
            <Eyebrow>Product</Eyebrow>
            <h1 className={styles.title}>{product.title}</h1>
            <p className={styles.tagline}>{product.tagline}</p>
            <p className={styles.body}>{product.text}</p>

            {variants.length > 0 && (
              <div className={styles.variants}>
                <span className={styles.variantsLabel}>Variants</span>
                <ul>
                  {variants.map((variant) => (
                    <li key={variant.label}>{variant.label}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className={styles.ctas}>
              <a className="btn btn-primary" href={`${contact.whatsapp}`} target="_blank" rel="noopener noreferrer">
                Enquire About This Product
              </a>
              <a
                className="btn btn-ghost"
                href={product.sourceHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on smecoilandgas.com
              </a>
            </div>
          </div>

          <div className={styles.media}>
            <Image
              src={product.image}
              alt={product.title}
              width={768}
              height={460}
              priority
              className={styles.image}
              sizes="(max-width: 900px) 92vw, 620px"
            />
          </div>
        </div>
      </section>

      <section className="paper" aria-labelledby="related-products">
        <div className="container">
          <div className="section-head">
            <Eyebrow>More from the range</Eyebrow>
            <h2 id="related-products">Other SMEC products</h2>
          </div>

          <div className="grid g4">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>

          <p className={styles.backRow}>
            <Link className="more" href="/#products">
              ← All products
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
