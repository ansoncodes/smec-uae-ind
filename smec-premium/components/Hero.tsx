import Image from 'next/image';
import { HERO, SITE } from '@/lib/siteData';
import { localHref } from '@/lib/routes';
import { specPage } from '@/lib/spec';
import { ArrowDown, ArrowRight } from './Icons';
import styles from './Hero.module.css';

/**
 * Full-viewport opening frame: the company's own banner photograph under a
 * cinematic scrim and a film-grain layer, with the headline set at display
 * scale. The entrance is pure CSS on load — no JavaScript on the critical
 * path — and the photograph drifts very slowly to keep the frame alive.
 *
 * The H1 and the sentence under it are the locked homepage copy from the
 * Content Master, read from the spec record rather than retyped, so the
 * heading a visitor sees and the one the document approved stay the same
 * string. The company name moved to the kicker, where it belongs: the H1
 * answers what SMEC does, not who it is.
 */
export default function Hero() {
  const home = specPage('/');

  return (
    <section className={`${styles.hero} grain`} id="top" aria-label={home?.h1 ?? HERO.title}>
      <div className={styles.media}>
        <Image
          src={HERO.image}
          alt=""
          fill
          priority
          quality={82}
          sizes="100vw"
          className={styles.image}
        />
      </div>
      <div className={styles.scrim} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <p className={styles.kicker}>
          <span className={styles.kickerDot} aria-hidden="true" />
          <span className={styles.kickerFull}>
            SMEC Oil &amp; Gas Solutions LLC &nbsp;·&nbsp;
          </span>
          Abu Dhabi &nbsp;·&nbsp; Est. 2000
        </p>

        <h1 className={`${styles.title} ${styles.titleLong}`}>
          <span className={styles.line}>
            <span style={{ animationDelay: '120ms' }}>Engineering</span>
          </span>
          <span className={styles.line}>
            <span style={{ animationDelay: '220ms' }}>
              Critical <em className={styles.em}>Energy</em>
            </span>
          </span>
          <span className={styles.line}>
            <span style={{ animationDelay: '320ms' }}>Assets</span>
          </span>
        </h1>

        <div className={styles.copy}>
          <h2 className={styles.subtitle}>{home?.answer}</h2>

          <div className={styles.ctas}>
            <a className={`btn btnAccent ${styles.cta}`} href="/solutions/">
              Explore Our Solutions
              <ArrowRight className="arrow" />
            </a>
            <a
              className={`btn btnOutline ${styles.cta}`}
              href={localHref(`${SITE.url}/contact-us`)}
            >
              Talk to Our Experts
              <ArrowRight className="arrow" />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.foot}>
        <div className={`container ${styles.footInner}`}>
          <a className={styles.scroll} href="#credentials">
            <span className={styles.scrollRule} aria-hidden="true" />
            <span className={styles.scrollLabel}>Scroll to explore</span>
            <ArrowDown className={styles.scrollIcon} />
          </a>

          <div className={styles.badge}>
            <Image
              src={HERO.badge.src}
              alt={HERO.badge.alt}
              width={HERO.badge.width}
              height={HERO.badge.height}
              sizes="(max-width: 700px) 132px, 176px"
              className={styles.badgeImg}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
