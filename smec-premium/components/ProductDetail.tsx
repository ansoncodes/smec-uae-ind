import Image from 'next/image';
import Link from 'next/link';
import { CONTACT, PRODUCT_LINKS, PRODUCTS, type Product } from '@/lib/siteData';
import { productDetail } from '@/lib/productDetails';
import { localHref, productSlug } from '@/lib/routes';
import { titleCase } from '@/lib/experience';
import { ArrowRight, Plus } from './Icons';
import styles from './ProductDetail.module.css';

/**
 * System page. A dark opening frame with the photograph on a plate, then the
 * specification laid out on the paper ground as ruled lists, then the rest of
 * the range. Copy comes from the matching page on smecoilandgas.com via
 * `lib/productDetails.ts`.
 */
export default function ProductDetail({ product, slug }: { product: Product; slug: string }) {
  const detail = productDetail(slug);
  const related = PRODUCTS.filter((item) => productSlug(item) !== slug).slice(0, 4);

  // The nav lists the Power House variants as their own links; surface them
  // on the parent page, pointing wherever those links already go.
  const variants =
    slug === 'power-house'
      ? PRODUCT_LINKS.filter((link) => /\/(vfd|scr)-houses$/.test(link.href))
      : [];

  const [lead, ...rest] = detail?.body ?? [product.body];
  const name = titleCase(product.title);

  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      <section className={`${styles.hero} grain`} aria-labelledby="product-title">
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.copy}>
            <p className={styles.kicker}>
              <span className={styles.kickerRule} aria-hidden="true" />
              Product system
            </p>

            <h1 id="product-title" className={styles.title}>
              {name}
            </h1>

            {detail?.subtitle ? <p className={styles.subtitle}>{detail.subtitle}</p> : null}
            <p className={styles.lead}>{lead}</p>

            {variants.length > 0 ? (
              <div className={styles.variants}>
                <span className={styles.variantsLabel}>Variants</span>
                <ul>
                  {variants.map((variant) => (
                    <li key={variant.label}>
                      <a href={localHref(variant.href)}>
                        <Plus className={styles.variantIcon} />
                        {variant.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className={styles.ctas}>
              <a
                className="btn btnAccent"
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                Enquire About This System
                <ArrowRight className="arrow" />
              </a>
              <a className="btn btnOutline" href={CONTACT.phoneHref}>
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
              sizes="(max-width: 980px) 92vw, 46vw"
              className={styles.image}
            />
            <span className={styles.mediaEdge} aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- overview */}
      {detail ? (
        <section className="section" data-tone="light" aria-labelledby="product-overview">
          <div className="container">
            <p className="sectionLabel" data-reveal="fade">
              <span className="num">01</span>
              <span>Overview</span>
              <span className="rule" />
            </p>

            <div className={styles.overview}>
              <div className={styles.prose} data-reveal="up">
                <h2 id="product-overview" className={styles.h2}>
                  About the {name}
                </h2>
                {(rest.length > 0 ? rest : [lead]).map((para) => (
                  <p key={para.slice(0, 40)}>{para}</p>
                ))}

                {detail.specs ? (
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
                ) : null}
              </div>

              <div className={styles.features}>
                {detail.sections.map((section, i) => (
                  <div
                    key={section.heading}
                    className={styles.feature}
                    data-reveal="up"
                    data-reveal-delay={i * 90}
                  >
                    <h3 className={styles.featureHeading}>
                      <span className={styles.featureNum}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {section.heading}
                    </h3>
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
      ) : null}

      {/* --------------------------------------------------------- related */}
      <section className="section" data-tone="dark" aria-labelledby="related-products">
        <div className="container">
          <p className="sectionLabel" data-reveal="fade">
            <span className="num">02</span>
            <span>More from the range</span>
            <span className="rule" />
          </p>

          <div className="sectionHead">
            <h2 id="related-products" className="sectionTitle" data-reveal="up">
              Other SMEC systems
            </h2>
            <p className="sectionIntro" data-reveal="up" data-reveal-delay="90">
              Every system is built to the rig it serves and integrated with the rest of the
              installation.
            </p>
          </div>

          <ul className={styles.grid}>
            {related.map((item, i) => (
              <li key={item.title} data-reveal="up" data-reveal-delay={i * 80}>
                <a className={styles.card} href={localHref(item.href)}>
                  <span className={styles.cardMedia}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={item.width}
                      height={item.height}
                      sizes="(max-width: 560px) 92vw, (max-width: 980px) 46vw, 24vw"
                      className={styles.cardImage}
                      loading="lazy"
                    />
                  </span>
                  <span className={styles.cardTitle}>{titleCase(item.title)}</span>
                  <span className={styles.cardTagline}>{item.tagline}</span>
                  <span className={`arrowLink ${styles.cardLink}`}>
                    Know More
                    <ArrowRight className="arrow" />
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <p className={styles.backRow}>
            <Link className="arrowLink" href="/#systems">
              All systems
              <ArrowRight className="arrow" />
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
