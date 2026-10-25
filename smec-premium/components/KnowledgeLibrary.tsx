import { LIBRARY_COPY } from '@/lib/homepage';
import { INSIGHTS } from '@/lib/experience';
import { ARTICLE_ROUTES } from '@/lib/spec/legacy';
import LibraryExplorer from './LibraryExplorer';
import Insights, { type InsightCard } from './Insights';
import { ArrowRight } from './Icons';
import styles from './KnowledgeLibrary.module.css';

/** Every article with a page on this site, in the order the live site lists them. */
const insightCards: InsightCard[] = INSIGHTS.flatMap((insight) => {
  const route = ARTICLE_ROUTES.find((entry) => entry.slug === insight.slug);
  if (!route) return [];
  return [
    {
      url: route.url,
      title: insight.title,
      subtitle: insight.subtitle,
      category: insight.category,
      image: insight.image,
    },
  ];
});

/**
 * Projects & Engineering Knowledge Library — her text, the six interactive
 * categories of images 22–27, her "Explore Our Engineering Experience" list,
 * and the articles in a sliding row (10 Sep).
 *
 * Every category, item and article is a real link in the server HTML. The
 * explorer only changes which preview shows on a wide screen; nothing waits
 * on a hover, and on a phone all six previews are simply listed.
 */
export default function KnowledgeLibrary() {
  const {
    label,
    title,
    subtitle,
    intro,
    explorerLabel,
    explorerIntro,
    categories,
    experienceTitle,
    experience,
    viewAll,
  } = LIBRARY_COPY;

  return (
    <section className={`section ${styles.section} grain`} id="library" data-tone="dark" aria-labelledby="library-title">
      <div className="container">
        <p className="sectionLabel" data-reveal="fade">
          <span>{label}</span>
          <span className="rule" />
        </p>

        <div className="sectionHead">
          <div>
            <h2 id="library-title" className="sectionTitle" data-reveal="up">
              {title}
            </h2>
            <p className={styles.subtitle} data-reveal="up" data-reveal-delay="60">
              {subtitle}
            </p>
          </div>
          <div className={styles.headSide} data-reveal="up" data-reveal-delay="90">
            {intro.map((paragraph, i) => (
              <p key={paragraph.slice(0, 24)} className={i === 0 ? 'sectionIntro' : styles.more}>
                {paragraph}
              </p>
            ))}
            <a className={`arrowLink ${styles.viewAll}`} href={viewAll.href}>
              {viewAll.label}
              <ArrowRight className="arrow" />
            </a>
          </div>
        </div>

        <LibraryExplorer label={explorerLabel} intro={explorerIntro} categories={categories} />

        {/* ------------------------------------------------- experience */}
        <div className={styles.experience}>
          <h3 className={styles.blockTitle} data-reveal="up">
            {experienceTitle}
          </h3>
          <ul className={styles.items}>
            {experience.map((item, i) => (
              <li key={item.num} className={styles.item} data-reveal="up" data-reveal-delay={(i % 3) * 80}>
                <span className={styles.itemNum} aria-hidden="true">
                  {item.num}
                </span>
                <h4 className={styles.itemTitle}>{item.title}</h4>
                <p className={styles.itemBody}>{item.body}</p>
                <a className={`arrowLink ${styles.itemCta}`} href={item.cta.href}>
                  {item.cta.label}
                  <ArrowRight className="arrow" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <Insights items={insightCards} />
      </div>
    </section>
  );
}
