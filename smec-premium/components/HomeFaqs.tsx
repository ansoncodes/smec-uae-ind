import { FAQ_COPY, type FaqLink } from '@/lib/homepage';
import { ArrowRight, Plus } from './Icons';
import styles from './HomeFaqs.module.css';

/**
 * Her phrase links, applied to one block of answer text: each phrase becomes
 * a link at its first appearance, and is marked used.
 */
function withLinks(text: string, links: FaqLink[], used: Set<string>): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let rest = text;
  while (rest) {
    let next: { at: number; link: FaqLink } | null = null;
    for (const link of links) {
      if (used.has(link.phrase)) continue;
      const at = rest.indexOf(link.phrase);
      if (at >= 0 && (!next || at < next.at)) next = { at, link };
    }
    if (!next) {
      parts.push(rest);
      break;
    }
    if (next.at > 0) parts.push(rest.slice(0, next.at));
    parts.push(
      <a key={next.link.phrase} className={styles.link} href={next.link.href}>
        {next.link.phrase}
      </a>
    );
    used.add(next.link.phrase);
    rest = rest.slice(next.at + next.link.phrase.length);
  }
  return parts;
}

/**
 * Engineering FAQs — her eleven questions, every answer in the HTML.
 *
 * Native disclosure widgets: each question is a <summary>, so it is a
 * button to assistive technology, opens with Enter or Space, and works
 * before any script has loaded; Chrome's find-in-page opens the one that
 * holds the match. There is deliberately no FAQPage schema — Google keeps
 * that rich result for government and health sites, as her own table notes.
 */
export default function HomeFaqs() {
  const { label, title, intro, faqs, cta } = FAQ_COPY;

  return (
    <section className={`section ${styles.section}`} id="faqs" data-tone="light" aria-labelledby="faqs-title">
      <div className="container">
        <p className="sectionLabel" data-reveal="fade">
          <span>{label}</span>
          <span className="rule" />
        </p>

        <div className="sectionHead">
          <h2 id="faqs-title" className="sectionTitle" data-reveal="up">
            {title}
          </h2>
          <p className="sectionIntro" data-reveal="up" data-reveal-delay="90">
            {intro}
          </p>
        </div>

        <div className={styles.list}>
          {faqs.map((faq, i) => {
            const used = new Set<string>();
            const answer = faq.a.map((block, b) =>
              typeof block === 'string' ? (
                <p key={b}>{withLinks(block, faq.links, used)}</p>
              ) : (
                <ul key={b} className={styles.points}>
                  {block.list.map((point) => (
                    <li key={point}>{withLinks(point, faq.links, used)}</li>
                  ))}
                </ul>
              )
            );
            // A phrase that no longer appears in her answer would drop its
            // link silently; stop the build instead.
            const missing = faq.links.filter((link) => !used.has(link.phrase));
            if (missing.length) {
              throw new Error(
                `FAQ "${faq.q}": no "${missing.map((link) => link.phrase).join('", "')}" in the answer.`
              );
            }

            return (
              <details key={faq.q} className={styles.item}>
                <summary className={styles.question}>
                  <span className={styles.num} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.qText}>{faq.q}</span>
                  <Plus className={styles.toggle} />
                </summary>
                <div className={styles.answer}>{answer}</div>
              </details>
            );
          })}
        </div>

        <div className={styles.cta} data-reveal="up">
          <a className="btn btnAccent" href={cta.href}>
            {cta.label}
            <ArrowRight className="arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}
