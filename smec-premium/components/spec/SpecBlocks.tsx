import Link from 'next/link';
import { ArrowUpRight } from '@/components/Icons';
import { CONTACT } from '@/lib/siteData';
import { hostOf, landingPageFor } from '@/lib/landingPages';
import type { SpecPage, SpecSection } from '@/lib/spec';
import styles from './SpecPageView.module.css';

/**
 * The blocks every page shares, whatever its body looks like: the numbered
 * body sections, the visible FAQs the Content Master approved for that URL,
 * and the RFQ block that tells a buyer exactly what to send. Shared so a
 * product page built from the old design and a page built from the document
 * read the same way and end the same way.
 */

/** Bullets in the document are short lines without terminal punctuation. */
export function looksLikeList(lines: string[]) {
  if (lines.length < 2) return false;
  const bulletish = lines.filter((line) => line.length < 120 && !/[.!?:]$/.test(line));
  return bulletish.length >= Math.ceil(lines.length * 0.6);
}

/**
 * The client's capability blocks open with a sentence and then list what the
 * scope contains. Rendering that opening line as a bullet reads as a mistake,
 * so a block is split into its lead and its list where it has both.
 */
function splitLead(lines: string[]) {
  const [first, ...rest] = lines;
  const hasLead = rest.length >= 2 && /[.!?]$/.test(first) && looksLikeList(rest);
  return hasLead ? { lead: first, points: rest } : { lead: null, points: lines };
}

export function SpecSections({
  sections,
  start = 1,
}: {
  sections: SpecSection[];
  /** The number the first block carries, where a page numbers its own. */
  start?: number;
}) {
  return (
    <>
      {sections.map((block, index) => {
        const { lead, points } = splitLead(block.lines);

        return (
          <section className={styles.block} key={block.heading}>
            <div className={styles.blockHead}>
              <span className={styles.blockNum}>{String(index + start).padStart(2, '0')}</span>
              <h2 className={styles.blockTitle}>{block.heading}</h2>
            </div>

            {lead ? (
              <div className={styles.prose}>
                <p>{lead}</p>
              </div>
            ) : null}

            {looksLikeList(points) ? (
              <ul className={styles.points}>
                {points.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            ) : (
              <div className={styles.prose}>
                {points.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            )}

            {/* A solution's systems, each a page of its own (CNT-04). */}
            {block.links?.length ? (
              <ul className={styles.cards}>
                {block.links.map((link) => (
                  <li key={link.url}>
                    <Link className={styles.card} href={link.url}>
                      <span className={styles.cardTitle}>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        );
      })}
    </>
  );
}

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

/**
 * The 3–6 contextual links of the component standard (§12): the page's own
 * §10 cluster, chain neighbours first (lib/spec/clusters.ts). Shared so the
 * product pages kept from the earlier design carry them too.
 */
export function SpecRelated({ pages, index }: { pages: SpecPage[]; index: number }) {
  if (!pages.length) return null;

  return (
    <section className={styles.block}>
      <div className={styles.blockHead}>
        <span className={styles.blockNum}>{String(index).padStart(2, '0')}</span>
        <h2 className={styles.blockTitle}>Related pages</h2>
      </div>
      <ul className={styles.cards}>
        {pages.map((sibling) => (
          <li key={sibling.url}>
            <Link className={styles.card} href={sibling.url}>
              <span className={styles.cardTitle}>{sibling.h1}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * The smec.in landing page a page links out to, where SMEC asked for one
 * (lib/landingPages.ts). Unnumbered, because it leaves the site: the host is
 * shown so nobody follows it thinking it is another page here. The referrer is
 * kept, so the landing page can see the visit came from this site.
 */
export function SpecLandingPage({ url }: { url: string }) {
  const site = landingPageFor(url);
  if (!site) return null;

  return (
    <section className={styles.block}>
      <div className={styles.outbound}>
        <h2 className={styles.outboundTitle}>{site.title}</h2>
        {site.note ? <p className={styles.outboundNote}>{site.note}</p> : null}
        <a
          className={`btn btnAccent ${styles.outboundLink}`}
          href={site.href}
          target="_blank"
          rel="noopener"
        >
          <span>{site.label}</span>
          <ArrowUpRight />
        </a>
        <span className={styles.outboundHost}>{hostOf(site)}</span>
      </div>
    </section>
  );
}

export function SpecClose({
  rfqInputs = [],
  rfqHref = '/contact/',
}: {
  rfqInputs?: string[];
  /** The RFQ link, with `?region=` on a page that knows its region. */
  rfqHref?: string;
}) {
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
          <Link className="btn btn-primary" href={rfqHref}>
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
