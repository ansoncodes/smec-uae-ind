import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import FloatingWidgets from '@/components/FloatingWidgets';
import styles from './not-found.module.css';

/**
 * Real 404 with a way onward, as the spec requires: products, solutions,
 * industries and contact. Next returns the 404 status for this route.
 *
 * The destinations are this build's current paths; they move to the locked
 * hubs (/products/, /solutions/, /industries/, /contact/) with the route
 * re-cut (docs/spec-alignment.md 1.1).
 */
const DESTINATIONS = [
  { href: '/#systems', label: 'Products' },
  { href: '/solutions-and-services', label: 'Solutions' },
  { href: '/#industries', label: 'Industries' },
  { href: '/insights', label: 'Insights' },
  { href: '/contact-us', label: 'Contact' },
];

export default function NotFound() {
  return (
    <>
      <SiteHeader />

      <main id="main" className={styles.main}>
        <div className={styles.inner}>
          <p className={styles.kicker}>Error 404</p>

          <h1 className={styles.title}>This page is not here</h1>

          <p className={styles.body}>
            The page may have moved, or the address may be mistyped. Start from one
            of these, or send us the requirement and an engineer will reply.
          </p>

          <ul className={styles.links}>
            {DESTINATIONS.map((destination) => (
              <li key={destination.href}>
                <Link className={styles.link} href={destination.href}>
                  {destination.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <SiteFooter />
      <FloatingWidgets />
    </>
  );
}
