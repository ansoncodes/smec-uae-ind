import Image from 'next/image';
import { CERT_LOGOS } from '@/lib/siteData';
import { CERT_CARDS } from '@/lib/experience';
import { Shield } from './Icons';
import styles from './Certifications.module.css';

/**
 * 06 / Assurance — the four ISO certificates SMEC holds, each card showing the
 * certificate itself, and the accreditation marks scrolling underneath.
 */
export default function Certifications() {
  // The strip is duplicated so the marquee can loop on a -50% translate.
  const marks = [...CERT_LOGOS, ...CERT_LOGOS];

  return (
    <section className="section" id="assurance" data-tone="light" aria-labelledby="assurance-title">
      <div className="container">
        <p className="sectionLabel" data-reveal="fade">
          <span className="num">06</span>
          <span>Assurance</span>
          <span className="rule" />
        </p>

        <div className="sectionHead">
          <h2 id="assurance-title" className="sectionTitle" data-reveal="up">
            Built on quality. Verified by standards.
          </h2>
          <p className="sectionIntro" data-reveal="up" data-reveal-delay="90">
            SMEC Oil &amp; Gas Solutions L.L.C S.P is certified against four international
            management standards, audited and current.
          </p>
        </div>

        <ul className={styles.grid}>
          {CERT_CARDS.map((cert, i) => (
            <li key={cert.src} data-reveal="up" data-reveal-delay={i * 80}>
              <article className={styles.card}>
                <div className={styles.head}>
                  <Shield className={styles.icon} />
                  <span className={styles.standard}>{cert.standard}</span>
                </div>

                <h3 className={styles.title}>{cert.title}</h3>

                <div className={styles.scan}>
                  <Image
                    src={cert.src}
                    alt={cert.alt}
                    width={cert.width}
                    height={cert.height}
                    sizes="(max-width: 700px) 44vw, 22vw"
                    className={styles.scanImg}
                    loading="lazy"
                  />
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>

      {/* ------------------------------------------- accreditation marks */}
      <div className={styles.marks} aria-label="Accreditation and certification bodies">
        <div className={styles.marksTrack}>
          {marks.map((src, i) => (
            <span key={`${src}-${i}`} className={styles.mark} aria-hidden={i >= CERT_LOGOS.length}>
              <Image
                src={src}
                alt=""
                width={160}
                height={80}
                sizes="140px"
                className={styles.markImg}
                loading="lazy"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
