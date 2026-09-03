import Image from "next/image";
import { sustainability } from "@/lib/siteData";
import styles from "./Sustainability.module.css";

/** Prototype `.navy` band with a `.g2` grid: copy card + cool-tinted tile. */
export default function Sustainability() {
  return (
    <section className="navy" aria-labelledby="sustainability">
      <div className="container">
        <div className="grid g2">
          <div className={`card ${styles.copy}`}>
            <div className="eyebrow cool">Sustainability</div>
            <h2 id="sustainability" className={styles.heading}>
              {sustainability.heading}
            </h2>
            <p className={styles.body}>{sustainability.body}</p>
          </div>

          <div className={styles.tile}>
            <Image
              src={sustainability.image}
              alt="SMEC sustainable energy initiatives"
              width={1200}
              height={660}
              className={styles.image}
              sizes="(max-width: 600px) 100vw, 50vw"
            />
            <div className={styles.tint} aria-hidden="true" />
            <div className={styles.cap}>Sustainable energy</div>
          </div>
        </div>
      </div>
    </section>
  );
}
