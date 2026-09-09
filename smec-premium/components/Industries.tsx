import Image from 'next/image';
import { INDUSTRIES } from '@/lib/experience';
import { localHref } from '@/lib/routes';
import { ArrowRight } from './Icons';
import styles from './Industries.module.css';

/**
 * 04 / Industries — six photographic panels laid side by side. On a pointer
 * device the panel under the cursor expands and shows its description, its
 * related systems and a link; on touch and narrow screens the same panels
 * stack and show everything at once.
 *
 * The expansion is one flex-grow transition, so no layout is scripted.
 */
export default function Industries() {
  return (
    <section className="section" id="industries" data-tone="light" aria-labelledby="industries-title">
      <div className="container">
        <p className="sectionLabel" data-reveal="fade">
          <span className="num">04</span>
          <span>Applications</span>
          <span className="rule" />
        </p>

        <div className="sectionHead">
          <h2 id="industries-title" className="sectionTitle" data-reveal="up">
            Built for the most demanding environments
          </h2>
          <p className="sectionIntro" data-reveal="up" data-reveal-delay="90">
            From land rigs to subsea, every system is specified, built and commissioned for the
            conditions it will actually meet.
          </p>
        </div>
      </div>

      <div className={styles.rail} data-reveal="fade">
        <ul className={styles.panels}>
          {INDUSTRIES.map((industry, i) => (
            <li key={industry.key} className={styles.panel}>
              <a className={styles.link} href={localHref(industry.href)}>
                <Image
                  src={industry.image}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 92vw, 34vw"
                  className={styles.img}
                  loading="lazy"
                />
                <span className={styles.veil} aria-hidden="true" />

                <span className={styles.content}>
                  <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>

                  <span className={styles.nameWrap}>
                    <span className={styles.name}>{industry.name}</span>
                  </span>

                  <span className={styles.detail}>
                    <span className={styles.detailInner}>
                      <span className={styles.blurb}>{industry.blurb}</span>
                      <span className={styles.systems}>
                        {industry.systems.map((system) => (
                          <span key={system} className={styles.chip}>
                            {system}
                          </span>
                        ))}
                      </span>
                      <span className={styles.cta}>
                        Explore
                        <ArrowRight className={styles.ctaArrow} />
                      </span>
                    </span>
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
