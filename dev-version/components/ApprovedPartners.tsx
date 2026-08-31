import Image from "next/image";
import { partners } from "@/lib/siteData";
import styles from "./ApprovedPartners.module.css";

export default function ApprovedPartners() {
  return (
    <section className={styles.section} aria-labelledby="approved-partners">
      <div className="container container-wide">
        <div className={styles.inner}>
          <h2 id="approved-partners" className={styles.label}>
            Approved Partners
          </h2>
          <div className={styles.logos}>
            {partners.map((partner) => (
              <div className={styles.logo} key={partner.alt}>
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  width={220}
                  height={110}
                  className={styles.logoImg}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
