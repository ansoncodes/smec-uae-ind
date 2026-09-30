import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT } from '@/lib/siteData';
import { breadcrumbTrail, publishableSections, type SpecPage } from '@/lib/spec';
import styles from './SpecPageView.module.css';

/**
 * One renderer for every page the Content Master defines, in the order the
 * Technical Master's component standard sets out: breadcrumb, answer block,
 * body sections, related pages, FAQs, closing CTA.
 *
 * Copy is never rewritten here. Sections the document marks as instructions
 * to the developer are dropped, and specification values are not rendered at
 * all — they may only be published from an approved datasheet.
 */

/** Bullets in the document are short lines without terminal punctuation. */
function looksLikeList(lines: string[]) {
  if (lines.length < 2) return false;
  const bulletish = lines.filter((line) => line.length < 120 && !/[.!?:]$/.test(line));
  return bulletish.length >= Math.ceil(lines.length * 0.6);
}

export default function SpecPageView({
  page,
  children = [],
  related = [],
}: {
  page: SpecPage;
  children?: SpecPage[];
  related?: SpecPage[];
}) {
  const all = publishableSections(page);
  // "Conversion CTA" and "RFQ inputs" describe what a buyer should send. The
  // component standard puts that with the RFQ block, not in the body under a
  // heading written for whoever builds the page.
  const isRfqInputs = (heading: string) => /conversion cta|rfq inputs/i.test(heading);
  const sections = all.filter((section) => !isRfqInputs(section.heading));
  const rfqInputs = all.filter((section) => isRfqInputs(section.heading)).flatMap((s) => s.lines);
  const section = page.breadcrumb[1] ?? 'SMEC Oil & Gas';
  const isDraft = page.status === 'draft';
  const showDraftNote = isDraft && process.env.NEXT_PUBLIC_SITE_ENV !== 'production';

  return (
    <>
      <Breadcrumb trail={breadcrumbTrail(page)} />

      <main id="main">
        <header className={styles.masthead}>
          <div className="container">
            <p className={styles.eyebrow}>
              {section}
              {showDraftNote ? <span className={styles.draft}>Draft · not indexed</span> : null}
            </p>

            <h1 className={styles.title}>{page.h1}</h1>

            {page.answer ? <p className={styles.answer}>{page.answer}</p> : null}

            <div className={styles.actions}>
              <Link className="btn btn-primary" href="/contact/">
                Send an RFQ
              </Link>
              <a className="btn btn-ghost" href={CONTACT.phoneHref}>
                Talk to an engineer
              </a>
            </div>
          </div>
        </header>

        <div className={styles.body}>
          <div className="container">
            {sections.map((block, index) => (
              <section className={styles.block} key={block.heading}>
                <div className={styles.blockHead}>
                  <span className={styles.blockNum}>{String(index + 1).padStart(2, '0')}</span>
                  <h2 className={styles.blockTitle}>{block.heading}</h2>
                </div>

                {looksLikeList(block.lines) ? (
                  <ul className={styles.points}>
                    {block.lines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                ) : (
                  <div className={styles.prose}>
                    {block.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                )}
              </section>
            ))}

            {children.length ? (
              <section className={styles.block}>
                <div className={styles.blockHead}>
                  <span className={styles.blockNum}>
                    {String(sections.length + 1).padStart(2, '0')}
                  </span>
                  <h2 className={styles.blockTitle}>In this section</h2>
                </div>
                <ul className={styles.cards}>
                  {children.map((child) => (
                    <li key={child.url}>
                      <Link className={styles.card} href={child.url}>
                        <span className={styles.cardTitle}>{child.h1}</span>
                        <span className={styles.cardNote}>{child.metaDescription}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {page.faqs.length ? (
              <section className={styles.block}>
                <div className={styles.blockHead}>
                  <span className={styles.blockNum}>
                    {String(sections.length + (children.length ? 2 : 1)).padStart(2, '0')}
                  </span>
                  <h2 className={styles.blockTitle}>Common questions</h2>
                </div>
                {page.faqs.map((faq) => (
                  <details className={styles.faq} key={faq.q}>
                    <summary>{faq.q}</summary>
                    <p>{faq.a}</p>
                  </details>
                ))}
              </section>
            ) : null}

            {related.length ? (
              <section className={styles.block}>
                <div className={styles.blockHead}>
                  <span className={styles.blockNum}>
                    {String(
                      sections.length + 1 + (children.length ? 1 : 0) + (page.faqs.length ? 1 : 0)
                    ).padStart(2, '0')}
                  </span>
                  <h2 className={styles.blockTitle}>Related pages</h2>
                </div>
                <ul className={styles.cards}>
                  {related.map((sibling) => (
                    <li key={sibling.url}>
                      <Link className={styles.card} href={sibling.url}>
                        <span className={styles.cardTitle}>{sibling.h1}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        </div>

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
      </main>
    </>
  );
}
