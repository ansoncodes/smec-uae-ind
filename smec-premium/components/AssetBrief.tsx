import Link from 'next/link';
import { specPage } from '@/lib/spec';
import { ArrowRight } from './Icons';
import styles from './AssetBrief.module.css';

/**
 * The layer the Content Master puts directly under the homepage answer: the
 * six things a buyer arrives wanting done to an asset, each one a door into
 * the section that does it.
 *
 * Copy is read from the homepage spec record, not retyped here, and the verbs
 * are the document's own — a visitor who searches "obsolete PLC migration"
 * and a visitor who searches "E-House" both find their own words on the page.
 */

/** Where each intent is answered in the locked architecture. */
const DESTINATION: Record<string, string> = {
  Integrate: '/solutions/system-integration/',
  Modernize: '/solutions/lifecycle-obsolescence/',
  Electrify: '/solutions/electrical-engineering/',
  Reactivate: '/solutions/rig-modernization/',
  Execute: '/solutions/turnkey-engineering-system-solutions/',
  Digitalize: '/digital/',
};

const sectionNamed = (heading: RegExp) =>
  specPage('/')?.sections.find((section) => heading.test(section.heading));

export default function AssetBrief() {
  const intents = (sectionNamed(/needs to happen/i)?.lines ?? []).flatMap((line) => {
    const [term, ...rest] = line.split(' — ');
    const body = rest.join(' — ');
    if (!body) return [];
    return [{ term, body: body[0].toUpperCase() + body.slice(1), href: DESTINATION[term] }];
  });

  const chain = sectionNamed(/^engineering chain$/i)?.lines[0];

  if (!intents.length) return null;

  return (
    <section className={styles.section} aria-labelledby="asset-brief-title">
      <div className="container">
        <div className={styles.head}>
          <p className={styles.kicker} data-reveal="fade">
            <span className={styles.kickerDot} aria-hidden="true" />
            Where to start
          </p>
          <h2 id="asset-brief-title" className={styles.title} data-reveal="up">
            What needs to happen to the asset?
          </h2>
        </div>

        <ul className={styles.list}>
          {intents.map((intent, i) => (
            <li
              key={intent.term}
              className={styles.item}
              data-reveal="up"
              data-reveal-delay={(i % 3) * 80}
            >
              <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
              <h3 className={styles.term}>
                {intent.href ? (
                  <Link className={styles.termLink} href={intent.href}>
                    {intent.term}
                    <ArrowRight className={styles.arrow} />
                  </Link>
                ) : (
                  intent.term
                )}
              </h3>
              <p className={styles.body}>{intent.body}</p>
            </li>
          ))}
        </ul>

        {chain ? (
          <p className={styles.chain} data-reveal="fade">
            {chain}
          </p>
        ) : null}
      </div>
    </section>
  );
}
