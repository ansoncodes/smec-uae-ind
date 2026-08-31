import Image from "next/image";
import { mapPins, marqueeCountries } from "@/lib/siteData";
import { LocationIcon } from "@/components/Icons";
import styles from "./GlobalPresence.module.css";

export default function GlobalPresence() {
  const loop = [...marqueeCountries, ...marqueeCountries];

  return (
    <section className="section section-subtle" aria-label="Global presence">
      <div className="container container-wide">
        <div className={`card ${styles.mapCard}`}>
          {/* Desktop: interactive pin map. */}
          <div className={styles.mapWrap}>
            <ul className={styles.mapList}>
              {mapPins.map((pin) => (
                <li
                  key={pin.code}
                  className={styles.pin}
                  style={{ bottom: pin.bottom, left: pin.left }}
                  tabIndex={0}
                >
                  <span className={styles.dot} aria-hidden="true" />
                  <span className={styles.tip}>{pin.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tablet / mobile: the flat map image. */}
          <Image
            src="/images/misc/map-final-1024x500.png"
            alt="SMEC locations worldwide"
            width={1024}
            height={500}
            className={styles.flatMap}
            sizes="100vw"
          />

          <ul className={styles.legend}>
            {mapPins.map((pin) => (
              <li key={pin.code}>{pin.label}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.marquee}>
        <ul className={styles.track} style={{ ["--count" as string]: marqueeCountries.length }}>
          {loop.map((country, i) => (
            <li key={`${country}-${i}`} aria-hidden={i >= marqueeCountries.length}>
              <LocationIcon size={14} />
              {country}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
