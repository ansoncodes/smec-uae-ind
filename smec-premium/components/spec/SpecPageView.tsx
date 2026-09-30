import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT } from '@/lib/siteData';
import { breadcrumbTrail, publishableSections, type SpecPage } from '@/lib/spec';
import type { GlossaryTerm } from '@/lib/glossary';
import { evidenceFor } from '@/lib/evidence';
import { isRfqInputsHeading, SpecClose, SpecFaqs } from './SpecBlocks';
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
  articles = [],
  glossary = [],
  form,
}: {
  page: SpecPage;
  children?: SpecPage[];
  related?: SpecPage[];
  /** Articles filed under a resource collection. */
  articles?: { url: string; article: { title: string; subtitle?: string } }[];
  /** Terms defined on this page, each linking to the page that owns it. */
  glossary?: GlossaryTerm[];
  /** A page that does something as well as say something — the RFQ form. */
  form?: React.ReactNode;
}) {
  const all = publishableSections(page);
  // "Conversion CTA" and "RFQ inputs" describe what a buyer should send. The
  // component standard puts that with the RFQ block, not in the body under a
  // heading written for whoever builds the page.
  const sections = all.filter((section) => !isRfqInputsHeading(section.heading));
  const rfqInputs = all
    .filter((section) => isRfqInputsHeading(section.heading))
    .flatMap((section) => section.lines);
  const evidence = evidenceFor(page.url);
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
              {form ? (
                <a className="btn btn-primary" href="#rfq">
                  Send an RFQ
                </a>
              ) : (
                <Link className="btn btn-primary" href="/contact/">
                  Send an RFQ
                </Link>
              )}
              <a className="btn btn-ghost" href={CONTACT.phoneHref}>
                Talk to an engineer
              </a>
            </div>
          </div>
        </header>

        <div className={styles.body} data-tone="light">
          <div className="container">
            {form ? (
              <div className={styles.form} id="rfq">
                {rfqInputs.length ? (
                  <p className={styles.formLead}>{rfqInputs.join(' ')}</p>
                ) : null}
                {form}
              </div>
            ) : null}

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

            {articles.length ? (
              <section className={styles.block}>
                <div className={styles.blockHead}>
                  <span className={styles.blockNum}>
                    {String(sections.length + (children.length ? 2 : 1)).padStart(2, '0')}
                  </span>
                  <h2 className={styles.blockTitle}>In this collection</h2>
                </div>
                <ul className={styles.cards}>
                  {articles.map((entry) => (
                    <li key={entry.url}>
                      <Link className={styles.card} href={entry.url}>
                        <span className={styles.cardTitle}>{entry.article.title}</span>
                        {entry.article.subtitle ? (
                          <span className={styles.cardNote}>{entry.article.subtitle}</span>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {evidence.length ? (
              <section className={styles.block}>
                <div className={styles.blockHead}>
                  <span className={styles.blockNum}>
                    {String(sections.length + 1).padStart(2, '0')}
                  </span>
                  <h2 className={styles.blockTitle}>Evidence</h2>
                </div>
                <ul className={styles.evidence}>
                  {evidence.map((item) => (
                    <li key={item.title}>
                      <p className={styles.evidenceAsset}>{item.asset}</p>
                      <h3 className={styles.evidenceTitle}>
                        {item.href ? <Link href={item.href}>{item.title}</Link> : item.title}
                      </h3>
                      <dl className={styles.evidenceRows}>
                        <div>
                          <dt>Problem</dt>
                          <dd>{item.problem}</dd>
                        </div>
                        <div>
                          <dt>Scope</dt>
                          <dd>{item.scope}</dd>
                        </div>
                        {item.architecture ? (
                          <div>
                            <dt>Architecture</dt>
                            <dd>{item.architecture}</dd>
                          </div>
                        ) : null}
                        {item.testing ? (
                          <div>
                            <dt>Testing</dt>
                            <dd>{item.testing}</dd>
                          </div>
                        ) : null}
                        {item.outcome ? (
                          <div>
                            <dt>Outcome</dt>
                            <dd>{item.outcome}</dd>
                          </div>
                        ) : null}
                      </dl>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {glossary.length ? (
              <section className={styles.block}>
                <div className={styles.blockHead}>
                  <span className={styles.blockNum}>
                    {String(sections.length + 1).padStart(2, '0')}
                  </span>
                  <h2 className={styles.blockTitle}>Terms</h2>
                </div>
                <dl className={styles.terms}>
                  {glossary.map((entry) => (
                    <div key={entry.term}>
                      <dt>
                        <Link href={entry.url}>{entry.term}</Link>
                      </dt>
                      <dd>{entry.definition}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ) : null}

            <SpecFaqs page={page} index={sections.length + (children.length ? 2 : 1)} />

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

        {form ? null : <SpecClose rfqInputs={rfqInputs} />}
      </main>
    </>
  );
}
