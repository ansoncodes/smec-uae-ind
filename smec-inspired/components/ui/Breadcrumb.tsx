import Link from 'next/link';
import styles from './Breadcrumb.module.css';

export type Crumb = { label: string; href?: string };

/** Breadcrumb strip under the header. The last crumb is the current page. */
export default function Breadcrumb({ trail }: { trail: Crumb[] }) {
  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <div className="container">
        <ol className={styles.list}>
          {trail.map((crumb, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={crumb.label}>
                {crumb.href && !last ? (
                  <Link href={crumb.href} className={styles.link}>
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={styles.current} aria-current={last ? 'page' : undefined}>
                    {crumb.label}
                  </span>
                )}
                {!last && (
                  <span className={styles.sep} aria-hidden="true">
                    /
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
