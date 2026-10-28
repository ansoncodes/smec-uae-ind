import { CAPABILITIES_COPY } from '@/lib/homepage';
import CapabilityTabs from './CapabilityTabs';
import { ArrowRight } from './Icons';
import styles from './Capabilities.module.css';

/**
 * Oil & Gas Engineering Solutions — her six capabilities, each with its
 * photograph, tagline, scope, tags and a link to the solution page, as tabs:
 * the names down the left, the chosen one beside them. All six are in the
 * HTML; the tabs keep the section to the height of one.
 */
export default function Capabilities() {
  const { label, title, intro, cards, viewAll, prompt } = CAPABILITIES_COPY;

  return (
    <section
      className={styles.section}
      data-tone="light"
      id="engineering-solutions"
      aria-labelledby="solutions-title"
    >
      <div className="container">
        <p className="sectionLabel" data-reveal="fade">
          <span>{label}</span>
          <span className="rule" />
        </p>

        <div className="sectionHead">
          <h2 id="solutions-title" className="sectionTitle" data-reveal="up">
            {title}
          </h2>
          <div className={styles.headSide} data-reveal="up" data-reveal-delay="90">
            <p className="sectionIntro">{intro}</p>
            <a className="arrowLink" href={viewAll.href}>
              {viewAll.label}
              <ArrowRight className="arrow" />
            </a>
          </div>
        </div>

        <div data-reveal="up">
          <CapabilityTabs cards={cards} />
        </div>

        <div className={styles.prompt} data-reveal="up">
          <div>
            <p className={styles.promptTitle}>{prompt.title}</p>
            <p className={styles.promptBody}>{prompt.body}</p>
          </div>
          <a className="btn btnAccent" href={prompt.cta.href}>
            {prompt.cta.label}
            <ArrowRight className="arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}
