import { WHO_WE_ARE_COPY } from '@/lib/homepage';
import styles from './WhoWeAre.module.css';

/**
 * "Who we are?" — her crawlable company description, placed directly under
 * the hero and its credentials band as the document asks. Three paragraphs,
 * set as plain text in the server HTML, with the first one leading.
 */
export default function WhoWeAre() {
  const [lead, ...rest] = WHO_WE_ARE_COPY.paragraphs;

  return (
    <section className={styles.section} data-tone="light" id="who-we-are" aria-labelledby="who-title">
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.head}>
            <p className="sectionLabel" data-reveal="fade">
              <span>{WHO_WE_ARE_COPY.label}</span>
              <span className="rule" />
            </p>
            <h2 id="who-title" className={`sectionTitle ${styles.title}`} data-reveal="up">
              {WHO_WE_ARE_COPY.title}
            </h2>
          </div>

          <div className={styles.copy}>
            <p className={styles.lead} data-reveal="up">
              {lead}
            </p>
            {rest.map((paragraph, i) => (
              <p
                key={paragraph.slice(0, 24)}
                className={styles.body}
                data-reveal="up"
                data-reveal-delay={(i + 1) * 90}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
