import Image from "next/image";
import { hero } from "@/lib/siteData";
import { ArrowRightIcon, CheckIcon } from "@/components/Icons";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.glowA} aria-hidden="true" />
      <div className={styles.glowB} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />

      <div className="container container-wide">
        <div className={styles.inner}>
          <div className={styles.copy}>
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              ADNOC In-Country Value certified
            </span>

            <h1 className={styles.title}>{hero.title}</h1>
            <p className={styles.subtitle}>{hero.subtitle}</p>

            <ul className={styles.points}>
              {hero.lines.map((line) => (
                <li key={line}>
                  <span className={styles.check}>
                    <CheckIcon size={11} />
                  </span>
                  {line}
                </li>
              ))}
            </ul>

            <div className={styles.ctas}>
              <a className="btn btn-primary" href={hero.ctaHref}>
                {hero.ctaLabel}
                <ArrowRightIcon size={15} />
              </a>
              <a className="btn btn-secondary" href="#products">
                Explore products
              </a>
            </div>
          </div>

          <div className={styles.visual}>
            <div className={styles.badgeCard}>
              <Image
                src={hero.badge.src}
                alt={hero.badge.alt}
                width={hero.badge.width}
                height={hero.badge.height}
                priority
                className={styles.badge}
              />
            </div>

            <div className={styles.floatCard}>
              <span className={styles.pulse} aria-hidden="true" />
              <div>
                <strong>Onshore &amp; offshore rigs</strong>
                <span>Design · Build · Install · Commission</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
