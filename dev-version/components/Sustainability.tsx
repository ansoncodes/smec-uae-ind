import Image from "next/image";
import { sustainability } from "@/lib/siteData";
import { LeafIcon } from "@/components/Icons";
import styles from "./Sustainability.module.css";

export default function Sustainability() {
  return (
    <section className="section-tight" aria-labelledby="sustainability">
      <div className="container container-wide">
        <div className={styles.panel}>
          <div className={styles.copy}>
            <span className={styles.icon}>
              <LeafIcon size={20} />
            </span>
            <h2 id="sustainability" className={styles.heading}>
              {sustainability.heading}
            </h2>
            <p className={styles.body}>{sustainability.body}</p>
          </div>

          <div className={styles.media}>
            <Image
              src={sustainability.image}
              alt="SMEC sustainable energy initiatives"
              width={1200}
              height={660}
              className={styles.image}
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
