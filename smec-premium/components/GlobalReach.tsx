import Image from 'next/image';
import { STATS } from '@/lib/siteData';
import { COUNTRIES, HOME_COUNTRY } from '@/lib/experience';
import styles from './GlobalReach.module.css';

/**
 * 05 / Global presence — the site's own dotted world map on a dark ground,
 * with SMEC's twelve country pins placed at the coordinates the live site's
 * map stylesheet uses, and hairline arcs drawn from the Abu Dhabi head office
 * out to each one.
 *
 * The arcs are one inline SVG in a 100×100 user space, so the geometry matches
 * the pins' percentage positions exactly at any width.
 */

const home = COUNTRIES.find((c) => c.name === HOME_COUNTRY) ?? COUNTRIES[0];

/** Quadratic arc from the head office to a country, bowed away from the pole. */
function arc(x: number, y: number) {
  const mx = (home.x + x) / 2;
  const my = (home.y + y) / 2;
  const dx = x - home.x;
  const dy = y - home.y;
  const distance = Math.hypot(dx, dy);
  // Bow perpendicular to the chord; longer links bow further.
  const lift = Math.min(14, distance * 0.28);
  const nx = -dy / (distance || 1);
  const ny = dx / (distance || 1);
  return `M ${home.x} ${home.y} Q ${mx + nx * lift} ${my + ny * lift} ${x} ${y}`;
}

export default function GlobalReach() {
  const countries = STATS.find((s) => s.label === 'Countries')?.value ?? 10;
  const links = COUNTRIES.filter((c) => c.name !== home.name);

  return (
    <section
      className={`section ${styles.section} grain`}
      id="global"
      data-tone="dark"
      aria-labelledby="global-title"
    >
      <div className="container">
        <p className="sectionLabel" data-reveal="fade">
          <span className="num">05</span>
          <span>Global presence</span>
          <span className="rule" />
        </p>

        <div className="sectionHead">
          <h2 id="global-title" className="sectionTitle" data-reveal="up">
            Engineering without borders
          </h2>
          <p className="sectionIntro" data-reveal="up" data-reveal-delay="90">
            Global engineering and support capabilities, run out of Abu Dhabi and delivered
            wherever the asset is.
          </p>
        </div>

        <div className={styles.layout}>
          {/* ------------------------------------------------------ aside */}
          <div className={styles.aside}>
            <div className={styles.figure} data-reveal="up">
              <span className={styles.figureValue}>{countries}+</span>
              <span className={styles.figureLabel}>Countries</span>
            </div>

            <ul className={styles.list} data-reveal="up" data-reveal-delay="120">
              {COUNTRIES.map((country) => (
                <li key={country.code} className={styles.listItem}>
                  <span className={styles.listDot} aria-hidden="true" />
                  {country.name}
                  {country.name === HOME_COUNTRY ? (
                    <span className={styles.hq}>HQ</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>

          {/* -------------------------------------------------------- map */}
          <div className={styles.mapWrap} data-reveal="fade" data-reveal-delay="120">
            <div className={styles.map}>
              <Image
                src="/images/map-blue-smecoilandgas.png"
                alt="World map showing SMEC Oil &amp; Gas locations across Asia, the Middle East and Africa"
                width={1500}
                height={728}
                sizes="(max-width: 980px) 92vw, 62vw"
                className={styles.mapImg}
                loading="lazy"
              />

              <svg
                className={styles.links}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {links.map((country, i) => (
                  <path
                    key={country.code}
                    d={arc(country.x, country.y)}
                    className={styles.link}
                    style={{ ['--i' as string]: i }}
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </svg>

              <ul className={styles.pins}>
                {COUNTRIES.map((country, i) => (
                  <li
                    key={country.code}
                    className={`${styles.pin} ${
                      country.name === HOME_COUNTRY ? styles.pinHome : ''
                    }`}
                    style={{
                      left: `${country.x}%`,
                      top: `${country.y}%`,
                      ['--i' as string]: i,
                    }}
                  >
                    <span className={styles.pinPulse} aria-hidden="true" />
                    <span className={styles.pinDot} aria-hidden="true" />
                    <span className={styles.pinName}>{country.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
