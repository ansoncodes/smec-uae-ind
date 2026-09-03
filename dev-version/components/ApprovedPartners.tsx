import Image from "next/image";
import { partners } from "@/lib/siteData";
import styles from "./ApprovedPartners.module.css";

/** Prototype logostrip row on a `.paper` band. */
export default function ApprovedPartners() {
  return (
    <section className={`tight paper ${styles.section}`} aria-labelledby="approved-partners">
      <div className="container">
        <div className={styles.row}>
          <h2 id="approved-partners" className={`eyebrow ${styles.label}`}>
            Approved Partners
          </h2>
          <div className={`grid ${styles.grid}`}>
            {partners.map((partner) => (
              <div className={styles.strip} key={partner.alt}>
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  width={partner.width}
                  height={partner.height}
                  className={styles.logo}
                  style={{ height: partner.cap }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
