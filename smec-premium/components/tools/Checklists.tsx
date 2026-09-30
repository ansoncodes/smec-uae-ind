import Link from 'next/link';
import { CHECKLISTS } from '@/lib/tools';
import styles from './Tools.module.css';

/**
 * The checklists §23 describes: "practical inputs; downloadable version
 * optional; HTML summary remains indexable". The HTML is the checklist —
 * there is no PDF behind it, so nothing is hidden from a crawler or from a
 * reader who cannot open one.
 *
 * Every line comes from the RFQ input lists in the Content Master and the
 * Technical Master, so this is the same information the RFQ form asks for,
 * arranged for someone gathering it before they write the enquiry.
 */
export default function Checklists() {
  return (
    <div className={styles.tools}>
      {CHECKLISTS.map((list) => (
        <section className={styles.tool} key={list.slug} aria-labelledby={`list-${list.slug}`}>
          <h3 className={styles.toolTitle} id={`list-${list.slug}`}>
            {list.title}
          </h3>
          <p className={styles.toolQuestion}>{list.intro}</p>

          {list.groups.map((group) => (
            <div className={styles.group} key={group.heading}>
              <h4 className={styles.groupHeading}>{group.heading}</h4>
              <ul className={styles.checkItems}>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}

          <p className={styles.toolCta}>
            Gathered what you can? <Link href="/contact/">Send it with the enquiry</Link> — an
            engineer reviews the scope and replies.
          </p>
        </section>
      ))}
    </div>
  );
}
