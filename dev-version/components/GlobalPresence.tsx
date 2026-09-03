import Image from "next/image";
import { mapPins, marqueeCountries, stats } from "@/lib/siteData";
import Eyebrow from "@/components/ui/Eyebrow";
import { LocationIcon } from "@/components/Icons";
import styles from "./GlobalPresence.module.css";

const countries = stats.find((s) => s.title === "Countries");

/**
 * The map gets the full page width rather than half a split — it is the
 * clearest single statement of reach on the site. Locations sit beneath it as
 * a full-width band of tiles, with the two home locations called out.
 */
export default function GlobalPresence() {
  const loop = [...marqueeCountries, ...marqueeCountries];

  return (
    <section className={`navy ${styles.section}`} aria-labelledby="global-presence">
      <div className="container">
        <div className={`section-head ${styles.head}`}>
          <Eyebrow index="06">Reach</Eyebrow>
          <h2 id="global-presence">Engineering delivered wherever the assets are.</h2>
          <p>
            Project delivery and engineering support across{" "}
            {countries ? `${countries.value}${countries.suffix}` : "10+"} countries, run from
            Abu Dhabi with the engineering hub in Kochi behind it.
          </p>
        </div>

        <div className={`diagram-panel ${styles.panel}`}>
          {/* Desktop: interactive pin map. */}
          <div className={styles.mapWrap}>
            <div className={styles.mapBg} aria-hidden="true" />
            <ul className={styles.mapList}>
              {mapPins.map((pin) => (
                <li
                  key={pin.code}
                  className={`${styles.pin} ${pin.role ? styles.homePin : ""}`}
                  style={{ bottom: pin.bottom, left: pin.left }}
                  tabIndex={0}
                >
                  <span className={styles.node} aria-hidden="true" />
                  <span className={styles.tip}>
                    {pin.label}
                    {pin.role && <em>{pin.role}</em>}
                  </span>
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

        <ul className={`grid ${styles.regions}`}>
          {mapPins.map((pin) => (
            <li key={pin.code} className={`${styles.region} ${pin.role ? styles.home : ""}`}>
              <div className={styles.rn}>{pin.label}</div>
              <div className={styles.rs}>{pin.role ?? "Active region"}</div>
            </li>
          ))}
        </ul>
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
