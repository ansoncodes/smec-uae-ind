import { MAP_PINS, MARQUEE_COUNTRIES } from '@/lib/siteData';
import { LocationDot } from './Icons';
import styles from './GlobalPresence.module.css';

export default function GlobalPresence() {
  // The strip repeats its first few entries so the loop reads as seamless.
  const marqueeItems = [...MARQUEE_COUNTRIES, ...MARQUEE_COUNTRIES.slice(0, 3)];

  return (
    <section className={styles.section} aria-label="Global presence">
      {/* interactive pin map - desktop only, same as the live site */}
      <div className={`${styles.mapWrapper} m-fade`}>
        <ul className={styles.mapList}>
          {MAP_PINS.map((pin) => (
            <li
              key={pin.code}
              className={styles.pin}
              style={{ bottom: pin.bottom, left: pin.left }}
            >
              <div className={styles.details}>
                <h2>{pin.name}</h2>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* static fallback map for tablet / mobile */}
      <div className={`${styles.mapFallback} m-fade`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/map-final-1024x500.png"
          alt="Map of SMEC Oil &amp; Gas locations across Asia, the Middle East and Africa"
          width={1024}
          height={500}
        />
        <ul className={styles.fallbackList}>
          {MAP_PINS.map((pin) => (
            <li key={pin.code}>{pin.name}</li>
          ))}
        </ul>
      </div>

      {/* scrolling country strip */}
      <div className={`${styles.marqueeOuter} m-fade`}>
        <div
          className={styles.marquee}
          style={{ ['--marquee-elements' as string]: MARQUEE_COUNTRIES.length }}
        >
          <ul className={styles.marqueeContent}>
            {marqueeItems.map((country, i) => (
              <li key={`${country}-${i}`} aria-hidden={i >= MARQUEE_COUNTRIES.length}>
                <LocationDot className={styles.pinIcon} />
                &nbsp;{country}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
