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

/** Each certificate is shown whole, with its standard and scope beneath it. */
export default function Certifications() {
  return (
    <section className="paper" aria-labelledby="our-certifications">
      <div className="container">
        <SectionHeading
          id="our-certifications"
          index="04"
          eyebrow="Accredited"
          title="Our Certifications"
          body="Independently audited management systems covering quality, environment, occupational health and safety, and energy."
        />

        <div className="grid g4">
          {certifications.map((cert, i) => (
            <figure className={`card ${styles.item}`} key={cert.src}>
              <div className={styles.media}>
                <Image
                  src={cert.src}
                  alt={cert.alt}
                  width={cert.width}
                  height={cert.height}
                  className={styles.image}
                  sizes="(max-width: 1000px) 45vw, 380px"
                />
              </div>
              <figcaption className={styles.caption}>
                <span className={styles.std}>Certified</span>
                <h3 className={styles.name}>{CAPTIONS[i].name}</h3>
                <p className={styles.scope}>{CAPTIONS[i].scope}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
