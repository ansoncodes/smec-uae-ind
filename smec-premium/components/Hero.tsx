import Image from 'next/image';
import { HERO } from '@/lib/siteData';
import { HERO_COPY } from '@/lib/homepage';
import { specPage } from '@/lib/spec';
import { ArrowDown, ArrowRight } from './Icons';
import styles from './Hero.module.css';

/**
 * Full-viewport opening frame: the company's own banner photograph under a
 * cinematic scrim and a film-grain layer, with the headline set at display
 * scale. The entrance is pure CSS on load — no JavaScript on the critical
 * path — and the photograph drifts very slowly to keep the frame alive.
 *
 * Everything around the H1 is the client's hero from her homepage document:
 * eyebrow, subhead, capability line, the RFQ as the primary action and the
 * two-region line. The H1 stays the headline it has been while she decides
 * between it and the two SEO-proposed alternatives (HP-03), and the subhead
 * is a paragraph rather than a heading so the page's H2s are her section
 * titles and nothing else.
 */
export default function Hero() {
  const home = specPage('/');
  const [entity, place] = HERO_COPY.eyebrow.split(' | ');

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
          <span className={styles.kickerFull}>{entity} &nbsp;|&nbsp; </span>
          {place}
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
          <p className={styles.subtitle}>{HERO_COPY.subhead}</p>

          <ul className={`inlineList ${styles.capabilities}`}>
            {HERO_COPY.capabilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className={styles.ctas}>
            <a className={`btn btnAccent ${styles.cta}`} href={HERO_COPY.primary.href}>
              {HERO_COPY.primary.label}
              <ArrowRight className="arrow" />
            </a>
            <a className={`btn btnOutline ${styles.cta}`} href={HERO_COPY.secondary.href}>
              {HERO_COPY.secondary.label}
              <ArrowRight className="arrow" />
            </a>
          </div>

          <ul className={`inlineList ${styles.regions}`}>
            {HERO_COPY.regions.map((region) => (
              <li key={region}>{region}</li>
            ))}
          </ul>
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
