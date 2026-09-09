import Image from 'next/image';
import Link from 'next/link';
import { CONTACT } from '@/lib/siteData';
import { localHref } from '@/lib/routes';
import { relatedSystems, type SystemDetail } from '@/lib/systems';
import { ArrowRight, Plus } from './Icons';
import styles from './ProductDetail.module.css';

/**
 * System page. A dark opening frame with the photograph on a plate, then the
 * specification laid out on the paper ground as ruled lists, then the rest of
 * the range.
 *
 * Six of the fourteen systems have no photograph on the live site. Those
 * pages put their specification — or, failing that, the head of their feature
 * list — on the plate instead, so the frame never sits empty.
 */
export default function ProductDetail({ system }: { system: SystemDetail }) {
  const related = relatedSystems(system.slug);
  const [lead, ...rest] = system.body.length > 0 ? system.body : [system.tagline];
  const hasDetail = system.sections.length > 0 || Boolean(system.specs);

  /* Stand-in for the picture: the first few spec rows, or the first few
     features where the system has no spec table. */
  const plateRows =
    system.specs?.rows.slice(0, 6) ??
    system.sections[0]?.items
      .slice(0, 6)
      .map((item, i) => ({ label: String(i + 1).padStart(2, '0'), value: item }));

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
              {system.title}
            </h1>

            {system.subtitle ? <p className={styles.subtitle}>{system.subtitle}</p> : null}
            <p className={styles.lead}>{lead}</p>

            {system.variants.length > 0 ? (
              <div className={styles.variants}>
                <span className={styles.variantsLabel}>Related</span>
                <ul>
                  {system.variants.map((variant) => (
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
              <a className="btn btnAccent" href="/contact-us">
                Enquire About This System
                <ArrowRight className="arrow" />
              </a>
              <a className="btn btnOutline" href={CONTACT.phoneHref}>
                {CONTACT.phone}
              </a>
            </div>
          </div>

          {system.image ? (
            <div className={styles.media}>
              <Image
                src={system.image}
                alt={system.title}
                width={system.width}
                height={system.height}
                priority
                sizes="(max-width: 980px) 92vw, 46vw"
                className={styles.image}
              />
              <span className={styles.mediaEdge} aria-hidden="true" />
            </div>
          ) : plateRows ? (
            <div className={styles.plate}>
              <p className={styles.plateHead}>
                {system.specs?.heading ?? system.sections[0]?.heading ?? 'At a glance'}
              </p>
              <dl className={styles.plateList}>
                {plateRows.map((row) => (
                  <div key={row.value}>
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
              <span className={styles.mediaEdge} aria-hidden="true" />
            </div>
          ) : null}
        </div>
      </section>

      {/* -------------------------------------------------------- overview */}
      {hasDetail ? (
        <section className="section" data-tone="light" aria-labelledby="product-overview">
          <div className="container">
            <p className="sectionLabel" data-reveal="fade">
              <span className="num">01</span>
              <span>Overview</span>
              <span className="rule" />
            </p>

            {/* The hero already carries the first paragraph. A system whose
                page has nothing after it — and no specification — gives its
                column over to the feature lists rather than repeating. */}
            <div
              className={styles.overview}
              data-single={rest.length === 0 && !system.specs ? 'true' : undefined}
            >
              {rest.length > 0 || system.specs ? (
                <div className={styles.prose} data-reveal="up">
                  <h2 id="product-overview" className={styles.h2}>
                    About the {system.title}
                  </h2>
                  {rest.map((para) => (
                    <p key={para.slice(0, 40)}>{para}</p>
                  ))}

                  {system.specs ? (
                    <div className={styles.specs} data-flush={rest.length === 0 ? 'true' : undefined}>
                      <h3 className={styles.specsHeading}>{system.specs.heading}</h3>
                      <dl>
                        {system.specs.rows.map((row) => (
                          <div key={row.label + row.value}>
                            <dt>{row.label}</dt>
                            <dd>{row.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  ) : null}
                </div>
              ) : (
                <h2 id="product-overview" className="visuallyHidden">
                  About the {system.title}
                </h2>
              )}

              <div className={styles.features}>
                {system.sections.map((section, i) => (
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
              <li key={item.slug} data-reveal="up" data-reveal-delay={i * 80}>
                <a className={styles.card} href={`/${item.slug}`}>
                  <span className={styles.cardMedia} data-empty={item.image ? undefined : 'true'}>
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={item.width}
                        height={item.height}
                        sizes="(max-width: 560px) 92vw, (max-width: 980px) 46vw, 24vw"
                        className={styles.cardImage}
                        loading="lazy"
                      />
                    ) : (
                      <span className={styles.cardGlyph} aria-hidden="true">
                        {item.title
                          .split(' ')
                          .slice(0, 2)
                          .map((word) => word[0])
                          .join('')}
                      </span>
                    )}
                  </span>
                  <span className={styles.cardTitle}>{item.title}</span>
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
