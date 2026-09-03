import Image from "next/image";
import { mapPins, marqueeCountries, stats } from "@/lib/siteData";
import { LocationIcon } from "@/components/Icons";
import styles from "./GlobalPresence.module.css";

const countries = stats.find((s) => s.title === "Countries");

/**
 * Prototype `.navy` band: section head, diagram panel (the pin map) on the
 * left, a `.g3` grid of `.region` tiles on the right, country ticker below.
 */
export default function GlobalPresence() {
  const loop = [...marqueeCountries, ...marqueeCountries];

  return (
    <section className={`navy ${styles.section}`} aria-labelledby="global-presence">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">
            {countries ? `${countries.value}${countries.suffix} Countries` : "Worldwide"}
          </div>
          <h2 id="global-presence">Global Presence</h2>
        </div>

        <div className={styles.split}>
          <div className={`diagram-panel ${styles.panel}`}>
            {/* Desktop: interactive pin map. */}
            <div className={styles.mapWrap}>
              <div className={styles.mapBg} aria-hidden="true" />
              <ul className={styles.mapList}>
                {mapPins.map((pin) => (
                  <li
                    key={pin.code}
                    className={styles.pin}
                    style={{ bottom: pin.bottom, left: pin.left }}
                    tabIndex={0}
                  >
                    <span className={styles.node} aria-hidden="true" />
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
              sizes="1024px"
            />
          </div>

          <div>
            <div className="eyebrow cool">Locations</div>
            <ul className={`grid g3 ${styles.regions}`}>
              {mapPins.map((pin) => (
                <li
                  key={pin.code}
                  className={`${styles.region} ${pin.role ? styles.home : ""}`}
                >
                  <div className={styles.rn}>{pin.label}</div>
                  <div className={styles.rs}>{pin.role ?? "Active region"}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.marquee}>
        <ul className={styles.track} style={{ ["--count" as string]: marqueeCountries.length }}>
          {loop.map((country, i) => (
            <li key={`${country}-${i}`} aria-hidden={i >= marqueeCountries.length}>
              <LocationIcon size={13} />
              {country}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
