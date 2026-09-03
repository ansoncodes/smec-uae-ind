import Eyebrow from "@/components/ui/Eyebrow";
import { entities } from "@/lib/siteData";
import styles from "./Entities.module.css";

/**
 * "Two locations. One engineering standard." — the prototype's navy band.
 * The Abu Dhabi entity leads (first card, hot eyebrow, permanent gradient
 * rule); the India hub sits beside it on equal footing but reads as the
 * engineering capability behind the UAE delivery, not a second front door.
 */
export default function Entities() {
  return (
    <section className="navy" aria-labelledby="our-entities">
      <div className="container">
        <div className={`section-head ${styles.head}`}>
          <Eyebrow index="02">{entities.eyebrow}</Eyebrow>
          <h2 id="our-entities">{entities.heading}</h2>
          <p>{entities.body}</p>
        </div>

        <div className="grid g2">
          {entities.items.map((entity) => (
            <article
              key={entity.name}
              className={`card ${styles.card} ${entity.primary ? styles.primary : ""}`}
            >
              {/* Map crop centred on the real pin coordinates, so each card
                  shows where the entity actually is. */}
              <div
                className={styles.map}
                aria-hidden="true"
                style={
                  { "--mx": entity.map.x, "--my": entity.map.y } as React.CSSProperties
                }
              >
                <span className={styles.marker} />
              </div>

              <Eyebrow tone={entity.primary ? "hot" : "cool"}>{entity.location}</Eyebrow>
              <h3 className={styles.name}>{entity.name}</h3>
              <p className={styles.role}>{entity.role}</p>

              <ul className={styles.points}>
                {entity.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

              <div className={styles.foot}>
                {entity.address && (
                  <address className={styles.address}>
                    {entity.address.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </address>
                )}
                <a
                  className="more"
                  href={entity.link.href}
                  {...(entity.link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {entity.link.label} →
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.ctas}>
          {entities.ctas.map((cta) => (
            <a
              key={cta.label}
              className={`btn ${cta.primary ? "btn-primary" : "btn-ghost"}`}
              href={cta.href}
              {...(cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {cta.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
