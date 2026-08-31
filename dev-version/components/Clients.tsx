import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { clients } from "@/lib/siteData";
import styles from "./Clients.module.css";

export default function Clients() {
  // Duplicated once so the marquee loops without a visible seam.
  const loop = [...clients, ...clients];

  return (
    <section className="section" aria-labelledby="our-clients">
      <div className="container container-wide">
        <SectionHeading id="our-clients" eyebrow="Trusted by" title="Our Clients" />
      </div>

      <div className={styles.marquee}>
        <ul className={styles.track} style={{ ["--count" as string]: clients.length }}>
          {loop.map((client, i) => (
            <li key={`${client.src}-${i}`} className={styles.cell} aria-hidden={i >= clients.length}>
              <Image
                src={client.src}
                alt={client.alt}
                width={200}
                height={110}
                className={styles.logo}
                sizes="180px"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
