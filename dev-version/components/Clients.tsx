import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { clients } from "@/lib/siteData";
import styles from "./Clients.module.css";

/** Prototype logostrip grid ("Serving operators across the region"). */
export default function Clients() {
  return (
    <section aria-labelledby="our-clients">
      <div className="container">
        <SectionHeading id="our-clients" eyebrow="Trusted by" title="Our Clients" />

        <ul className={`grid ${styles.grid}`}>
          {clients.map((client) => (
            <li key={client.src} className={styles.strip}>
              <Image
                src={client.src}
                alt={client.alt}
                width={150}
                height={52}
                className={styles.logo}
                sizes="150px"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
