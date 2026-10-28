import { TRAINING_COPY, type TrainingIcon } from '@/lib/homepage';
import { Cap, Gear, Helmet, Wrench } from './HomeIcons';
import { ArrowRight } from './Icons';
import styles from './Training.module.css';

const ICONS: Record<TrainingIcon, (p: { className?: string }) => React.JSX.Element> = {
  helmet: Helmet,
  gear: Gear,
  wrench: Wrench,
  cap: Cap,
};

/**
 * Technical Training & Workforce Development — her text, then the four kinds
 * of training as open, numbered columns between hairlines, the "tailored to"
 * topics and the call to action of image 21. There is no training page yet,
 * so the action is an enquiry.
 */
export default function Training() {
  const { label, title, lead, intro, cards, topicsTitle, topics, cta, audience } = TRAINING_COPY;

  return (
    <section className={`section ${styles.section}`} id="training" data-tone="light" aria-labelledby="training-title">
      <div className="container">
        <p className="sectionLabel" data-reveal="fade">
          <span>{label}</span>
          <span className="rule" />
        </p>

        <div className="sectionHead">
          <h2 id="training-title" className="sectionTitle" data-reveal="up">
            {title}
          </h2>
          <div className={styles.headSide} data-reveal="up" data-reveal-delay="90">
            <p className={styles.lead}>{lead}</p>
            {intro.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className={styles.more}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <ol className={styles.cards}>
          {cards.map((card, i) => {
            const Icon = ICONS[card.icon];
            return (
              <li key={card.title} className={styles.card} data-reveal="up" data-reveal-delay={i * 90}>
                <div className={styles.cardHead}>
                  <span className={styles.cardNum} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <Icon className={styles.icon} />
                </div>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardBody}>{card.body}</p>
              </li>
            );
          })}
        </ol>

        <div className={styles.foot} data-reveal="up">
          <div className={styles.topicsBlock}>
            <p className={styles.topicsTitle} id="training-topics">
              {topicsTitle}
            </p>
            <ul className={styles.topics} aria-labelledby="training-topics">
              {topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </div>

          <div className={styles.action}>
            <a className="btn btnAccent" href={cta.href}>
              {cta.label}
              <ArrowRight className="arrow" />
            </a>
            <p className={styles.audience}>{audience}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
