import { NEWSLETTER_COPY } from '@/lib/homepage';
import NewsletterForm from './NewsletterForm';
import styles from './Newsletter.module.css';

/**
 * SMEC EDGE — the group newsletter (image 28). The page only renders this
 * once a Mailchimp audience is configured (lib/newsletter.ts). The design's
 * "Latest edition" cover and "Read Latest Edition" link wait for a first
 * edition; until then the cover is the masthead alone.
 */
export default function Newsletter() {
  const { label, title, topics, kicker, cover, heading, body } = NEWSLETTER_COPY;

  return (
    <section className={`section ${styles.section}`} id="newsletter" data-tone="light" aria-labelledby="newsletter-title">
      <div className="container">
        <p className="sectionLabel" data-reveal="fade">
          <span>{label}</span>
          <span className="rule" />
        </p>

        <div className={styles.head}>
          <h2 id="newsletter-title" className="sectionTitle" data-reveal="up">
            {title}
          </h2>
          <ul className={`inlineList ${styles.topics}`} data-reveal="up" data-reveal-delay="60">
            {topics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </div>

        <div className={styles.panel} data-reveal="up">
          <p className={styles.kicker}>{kicker}</p>

          <div className={styles.layout}>
            {/* The masthead, drawn rather than pictured. Its words are the
                design's; it says nothing a reader needs that is not below. */}
            <div className={styles.cover} aria-hidden="true">
              <span className={styles.publisher}>{cover.publisher}</span>
              <span className={styles.name}>{cover.name}</span>
              <span className={styles.strap}>{cover.strap.join(' • ')}</span>
              <span className={styles.sectors}>{cover.sectors.join(' / ')}</span>
            </div>

            <div className={styles.signup}>
              <h3 className={styles.heading}>{heading}</h3>
              <p className={styles.body}>{body}</p>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
