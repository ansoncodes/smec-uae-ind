import Link from 'next/link';
import { CONTACT } from '@/lib/siteData';
import type { SpecPage } from '@/lib/spec';
import styles from './SpecPageView.module.css';

/**
 * The two blocks every page ends with, whatever its body looks like: the
 * visible FAQs the Content Master approved for that URL, and the RFQ block
 * that tells a buyer exactly what to send. Shared so a product page built
 * from the old design and a page built from the document end the same way.
 */

export function SpecFaqs({ page, index }: { page: SpecPage; index: number }) {
  if (!page.faqs.length) return null;

  return (
    <section className={styles.block}>
      <div className={styles.blockHead}>
        <span className={styles.blockNum}>{String(index).padStart(2, '0')}</span>
        <h2 className={styles.blockTitle}>Common questions</h2>
      </div>
      {page.faqs.map((faq) => (
        <details className={styles.faq} key={faq.q}>
          <summary>{faq.q}</summary>
          <p>{faq.a}</p>
        </details>
      ))}
    </section>
  );
}

export function SpecClose({ rfqInputs = [] }: { rfqInputs?: string[] }) {
  return (
    <section className={styles.close}>
      <div className="container">
        <h2 className={styles.closeTitle}>Send the requirement</h2>
        <p className={styles.closeNote}>
          {rfqInputs.length
            ? rfqInputs.join(' ')
            : 'Send the available drawings, specification, make and model, site and required date. An engineer reviews the scope and replies.'}
        </p>
        <div className={styles.actions} style={{ justifyContent: 'center' }}>
          <Link className="btn btn-primary" href="/contact/">
            Send an RFQ
          </Link>
          <a className="btn btn-ghost" href={CONTACT.emailHref}>
            {CONTACT.email}
          </a>
        </div>
      </div>
    </section>
  );
}

/** "Conversion CTA" / "RFQ inputs" are what to send, not a body heading. */
export const isRfqInputsHeading = (heading: string) =>
  /conversion cta|rfq inputs/i.test(heading);
