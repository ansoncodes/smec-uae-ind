import Image from 'next/image';
import Link from 'next/link';
import { CONTACT, PRODUCT_LINKS, PRODUCTS, type Product } from '@/lib/siteData';
import { productDetail } from '@/lib/productDetails';
import { localHref, productSlug } from '@/lib/routes';
import styles from './ProductDetail.module.css';

/**
 * Detail page for one product, in the smec.com language: pale hero with the
 * photograph on a white plate, an overview band with specifications and
 * feature cards, then the rest of the range. Copy comes from the matching
 * page on smecoilandgas.com via `lib/productDetails.ts`; the photograph,
 * title and tagline are the same record the homepage card uses.
 */
export default function ProductDetail({ product, slug }: { product: Product; slug: string }) {
  const detail = productDetail(slug);
  const related = PRODUCTS.filter((item) => productSlug(item) !== slug);

  // The nav lists the Power House variants as their own links; surface them
  // on the parent page, pointing wherever those links already go.
  const variants =
    slug === 'power-house'
      ? PRODUCT_LINKS.filter((link) => /\/(vfd|scr)-houses$/.test(link.href))
      : [];

  const [lead, ...rest] = detail?.body ?? [product.body];

  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.copy}>
            <p className="eyebrow">Product</p>
            <h1 className={styles.title}>{product.title}</h1>
            {detail?.subtitle && <p className={styles.subtitle}>{detail.subtitle}</p>}
            <p className={styles.body}>{lead}</p>

            {variants.length > 0 && (
              <div className={styles.variants}>
                <span className={styles.variantsLabel}>Variants</span>
                <ul>
                  {variants.map((variant) => (
                    <li key={variant.label}>
                      <a href={localHref(variant.href)}>{variant.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className={styles.ctas}>
              <a
                className="btn btnPrimary"
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                Enquire About This Product
              </a>
              <a className="btn btnGhost" href={CONTACT.phoneHref}>
                {CONTACT.phone}
              </a>
            </div>
          </div>

          <div className={styles.media}>
            <Image
              src={product.image}
              alt={product.title}
              width={product.width}
              height={product.height}
              priority
              className={styles.image}
              sizes="(max-width: 900px) 92vw, 640px"
            />
          </div>
        </div>
      </section>

      {detail && (
        <section className={styles.overview} aria-labelledby="product-overview">
          <div className={`container ${styles.overviewGrid}`}>
            <div className={styles.prose}>
              <p className="eyebrow">Overview</p>
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
        </section>
      )}

      <section className={styles.related} aria-labelledby="related-products">
        <div className="container">
          <div className={styles.relatedHead}>
            <p className="eyebrow">More from the range</p>
            <h2 id="related-products" className={styles.h2}>
              Other SMEC products
            </h2>
          </div>

          <div className={styles.grid}>
            {related.map((item) => (
              <article key={item.title} className={styles.card}>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={item.width}
                  height={item.height}
                  className={styles.cardImage}
                  sizes="(max-width: 560px) 92vw, (max-width: 900px) 46vw, 300px"
                />
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardTagline}>{item.tagline}</p>
                <a href={localHref(item.href)} className={`arrowLink ${styles.cardLink}`}>
                  Know More
                </a>
              </article>
            ))}
          </div>

          <p className={styles.backRow}>
            <Link className="arrowLink" href="/#major-products">
              All products
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
