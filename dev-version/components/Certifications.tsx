import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { certifications } from "@/lib/siteData";
import styles from "./Certifications.module.css";

/** Standard + scope read off the certificate artwork, so each card is
 *  legible without opening the full-size image. */
const CAPTIONS = [
  { name: "ISO 9001:2015", scope: "Quality Management" },
  { name: "ISO 14001:2015", scope: "Environmental Management" },
  { name: "ISO 45001:2018", scope: "Occupational Health & Safety" },
  { name: "ISO 50001:2018", scope: "Energy Management" },
];

export default function Certifications() {
  return (
    <section className="section section-subtle" aria-labelledby="our-certifications">
      <div className="container container-wide">
        <SectionHeading
          id="our-certifications"
          eyebrow="Accredited"
          title="Our Certifications"
        />

        <div className={styles.grid}>
          {certifications.map((cert, i) => (
            <figure className={`card card-hover ${styles.item}`} key={cert.src}>
              <div className={styles.media}>
                <Image
                  src={cert.src}
                  alt={cert.alt}
                  width={cert.width}
                  height={cert.height}
                  className={styles.image}
                  sizes="(max-width: 767px) 45vw, (max-width: 1024px) 30vw, 290px"
                />
              </div>
              <figcaption className={styles.caption}>
                <span className={styles.name}>{CAPTIONS[i].name}</span>
                <span className={styles.scope}>{CAPTIONS[i].scope}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
