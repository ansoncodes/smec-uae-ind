import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import FloatingWidgets from '@/components/FloatingWidgets';
import ContactCTA from '@/components/ContactCTA';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { INSIGHTS } from '@/lib/experience';
import { SITE } from '@/lib/siteData';
import { ArrowRight } from '@/components/Icons';
import styles from './insights.module.css';

export const metadata: Metadata = {
  title: 'Insights & Perspectives — SMEC Oil & Gas',
  description:
    'Technical writing from the SMEC team on the systems, history and direction of oil and gas engineering.',
  alternates: { canonical: '/insights' },
  openGraph: {
    type: 'website',
    url: `${SITE.url}/insights`,
    title: 'Insights & Perspectives — SMEC Oil & Gas',
    description:
      'Technical writing from the SMEC team on the systems, history and direction of oil and gas engineering.',
  },
};

/** Index of every article the site publishes. */
export default function InsightsPage() {
  return (
    <>
      <SiteHeader />
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Insights' }]} />

      <main id="main">
        <header className={`${styles.head} grain`}>
          <div className="container">
            <p className={styles.kicker}>
              <span className={styles.kickerRule} aria-hidden="true" />
              {INSIGHTS.length} articles
            </p>
            <h1 className={styles.title}>Insights &amp; perspectives</h1>
            <p className={styles.intro}>
              Technical writing from the SMEC team on the systems, history and direction of oil
              and gas engineering.
            </p>
          </div>
        </header>

        <section className="section" data-tone="light" aria-label="All insights">
          <div className="container">
            <ul className={styles.grid}>
              {INSIGHTS.map((article, i) => (
                <li key={article.slug} data-reveal="up" data-reveal-delay={(i % 3) * 80}>
                  <Link className={styles.card} href={`/${article.slug}`}>
                    <span className={styles.media}>
                      <Image
                        src={article.image}
                        alt=""
                        fill
                        sizes="200px"
                        quality={30}
                        className={styles.blur}
                        aria-hidden="true"
                      />
                      <span className={styles.mediaInner}>
                        <Image
                          src={article.image}
                          alt={article.alt}
                          fill
                          sizes="(max-width: 900px) 92vw, 30vw"
                          className={styles.img}
                          loading={i < 3 ? 'eager' : 'lazy'}
                        />
                      </span>
                    </span>

                    <span className={styles.category}>{article.category}</span>
                    <span className={styles.cardTitle}>{article.title}</span>
                    {article.subtitle ? (
                      <span className={styles.cardSub}>{article.subtitle}</span>
                    ) : null}
                    <span className={`arrowLink ${styles.read}`}>
                      Read Article
                      <ArrowRight className="arrow" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <ContactCTA />
      </main>

      <SiteFooter />
      <FloatingWidgets />
    </>
  );
}
