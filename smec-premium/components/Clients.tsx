import Image from 'next/image';
import { CLIENT_LOGOS } from '@/lib/siteData';
import styles from './Clients.module.css';

/**
 * Client wall: two rows drifting in opposite directions, slowly enough to
 * read. Each row is its own half of the list, duplicated once so the loop
 * closes on a -50% translate.
 */
export default function Clients() {
  const half = Math.ceil(CLIENT_LOGOS.length / 2);
  const rows = [CLIENT_LOGOS.slice(0, half), CLIENT_LOGOS.slice(half)];

  return (
    <section
      className={styles.section}
      data-tone="light"
      aria-labelledby="clients-title"
      id="clients"
    >
      <div className="container">
        <div className={styles.head}>
          <h2 id="clients-title" className={styles.title} data-reveal="up">
            Trusted by industry leaders
          </h2>
          <span className={styles.rule} data-reveal="line" />
        </div>
      </div>

      <div className={styles.wall}>
        {rows.map((row, i) => (
          <div key={i} className={styles.row}>
            <div
              className={`${styles.track} ${i === 1 ? styles.trackReverse : ''}`}
              style={{ ['--speed' as string]: `${58 + i * 12}s` }}
            >
              {[...row, ...row].map((src, j) => (
                <span key={`${src}-${j}`} className={styles.cell} aria-hidden={j >= row.length}>
                  <Image
                    src={src}
                    alt=""
                    width={190}
                    height={90}
                    sizes="170px"
                    className={styles.logo}
                    loading="lazy"
                  />
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
