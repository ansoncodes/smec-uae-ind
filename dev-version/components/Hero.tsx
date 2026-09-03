import Image from "next/image";
import Schematic from "@/components/ui/Schematic";
import { contact, entities, hero } from "@/lib/siteData";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroGrid}`}>
        <div>
          <div className="eyebrow">{hero.subtitle}</div>
          <h1 className={styles.title}>{hero.title}</h1>
          <p className={`lead ${styles.lead}`}>
            {hero.lines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
          <div className={styles.ctas}>
            <a className="btn btn-primary" href={hero.ctaHref}>
              {hero.ctaLabel}
            </a>
            <a className="btn btn-ghost" href="#products">
              Explore Products
            </a>
            <a
              className="btn btn-ghost"
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </div>

          {/* Names the contracting entity above the fold, with the India hub
              directly under it. */}
          <ul className={styles.entities}>
            {entities.items.map((entity) => (
              <li
                key={entity.name}
                className={`${styles.entity} ${entity.primary ? "" : styles.entityCool}`}
              >
                <span className={styles.entityName}>{entity.name}</span>
                <span className={styles.entityWhere}>{entity.location}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={`diagram-panel ${styles.panel}`}>
          <Schematic id="heroSvg" />
          <div className={styles.badgeRow}>
            <Image
              src={hero.badge.src}
              alt={hero.badge.alt}
              width={hero.badge.width}
              height={hero.badge.height}
              priority
              className={styles.badge}
            />
            <span className={styles.badgeCap}>{hero.badge.alt}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
