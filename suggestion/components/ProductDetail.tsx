import Image from "next/image";
import Link from "next/link";
import Eyebrow from "@/components/ui/Eyebrow";
import ProductCard from "@/components/ProductCard";
import { contact, navItems, products, type Product } from "@/lib/siteData";
import { productDetail } from "@/lib/productDetails";
import styles from "./ProductDetail.module.css";

/**
 * Detail page for one product. Copy comes from the matching page on
 * smecoilandgas.com via `lib/productDetails.ts`; the photograph, title and
 * tagline come from the same record the homepage card uses.
 */
export default function ProductDetail({ product }: { product: Product }) {
  const detail = productDetail(product.slug);
  const related = products.filter((p) => p.slug !== product.slug);

  // Variants the nav already lists for this product (Power House only).
  const productsNav = navItems.find((n) => n.label === "Products");
  const variants =
    productsNav?.children?.find((c) => c.href.endsWith(`/${product.slug}`))?.children ?? [];

  const [lead, ...rest] = detail?.body ?? [product.text];

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.glow} aria-hidden="true" />
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.copy}>
            <Eyebrow>Product</Eyebrow>
            <h1 className={styles.title}>{product.title}</h1>
            {detail?.subtitle && <p className={styles.subtitle}>{detail.subtitle}</p>}
            <p className={styles.body}>{lead}</p>

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
              <a
                className="btn btn-primary"
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                Enquire About This Product
              </a>
              <a className="btn btn-ghost" href={contact.phoneHref}>
                {contact.phone}
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
              sizes="(max-width: 900px) 95vw, 768px"
            />
          </div>
        </div>
      </section>

      {detail && (
        <section className="paper" aria-labelledby="product-overview">
          <div className="container">
            <div className={styles.overview}>
              <div className={styles.prose}>
                <Eyebrow index="01">Overview</Eyebrow>
                <h2 id="product-overview" className={styles.h2}>
                  About the {product.title}
                </h2>
                {rest.map((para) => (
                  <p key={para.slice(0, 40)}>{para}</p>
                ))}
                {rest.length === 0 && <p>{lead}</p>}

                {detail.specs && (
                  <div className={styles.specs}>
                    <h3 className={styles.specsHeading}>{detail.specs.heading}</h3>
                    <dl>
                      {detail.specs.rows.map((row) => (
                        <div key={row.label}>
                          <dt>{row.label}</dt>
                          <dd>{row.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </div>

              <div className={styles.features}>
                {detail.sections.map((section) => (
                  <div key={section.heading} className={styles.feature}>
                    <h3 className={styles.featureHeading}>{section.heading}</h3>
                    <ul>
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="related-products">
        <div className="container">
          <div className="section-head">
            <Eyebrow index="02">More from the range</Eyebrow>
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
