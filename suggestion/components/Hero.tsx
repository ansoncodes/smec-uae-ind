import Image from "next/image";
import Eyebrow from "@/components/ui/Eyebrow";
import Schematic from "@/components/ui/Schematic";
import { footer, hero } from "@/lib/siteData";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* The banner's sunset runs violet → pink → copper, which is the theme's
          own palette, so it grounds the page rather than fighting it. */}
      <div className={styles.bg} aria-hidden="true">
        <Image
          src="/images/misc/Oil-and-gas-Banner.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.bgImage}
        />
      </div>
      <div className={styles.scrim} aria-hidden="true" />
      <div className={styles.blueprint} aria-hidden="true" />

      <div className={`container ${styles.heroGrid}`}>
        <div className={styles.copy}>
          <Eyebrow>{footer.addressTitle.replace(" SUPPORT", "")}</Eyebrow>
          <h1 className={styles.title}>{hero.title}</h1>
          <p className={styles.subtitle}>{hero.subtitle}</p>
          {/* One paragraph rather than two stacked lines — the hero was
              carrying five separate blocks of small text. */}
          <p className={styles.lead}>{hero.lines.join(". ")}.</p>

          <div className={styles.ctas}>
            <a className={`btn btn-primary ${styles.cta}`} href={hero.ctaHref}>
              {hero.ctaLabel}
            </a>
            <a className={`btn btn-ghost ${styles.cta}`} href="#products">
              Explore Products
            </a>
          </div>
        </div>

        {/* Instrument panel rather than a generic card: technical header,
            blueprint ground, corner registration marks. */}
        <div className={styles.panel}>
          <div className={styles.panelHead}>
            <span className={styles.panelTitle}>Process Schematic</span>
            <span className={styles.panelMeta}>Wellhead → Grid</span>
          </div>

          <div className={styles.panelBody}>
            <span className={`${styles.mark} ${styles.markTL}`} aria-hidden="true" />
            <span className={`${styles.mark} ${styles.markTR}`} aria-hidden="true" />
            <span className={`${styles.mark} ${styles.markBL}`} aria-hidden="true" />
            <span className={`${styles.mark} ${styles.markBR}`} aria-hidden="true" />
            <Schematic id="heroSvg" />
          </div>
        </div>
      </div>
    </section>
  );
}
