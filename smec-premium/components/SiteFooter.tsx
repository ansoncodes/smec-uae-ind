import Image from 'next/image';
import Link from 'next/link';
import {
  COPYRIGHT,
  FOOTER_DESCRIPTION,
  FOOTER_LOCATIONS,
  LEGAL_LINKS,
  SITE,
  SMEC_GROUP,
  SOCIAL_GROUPS,
} from '@/lib/siteData';
import { FOOTER_COLUMNS } from '@/lib/navigation';
import { localHref } from '@/lib/routes';
import { ArrowUpRight, Pin, SOCIAL_ICON } from './Icons';
import styles from './SiteFooter.module.css';

/**
 * The footer of her design (homepage document, image 32): the description,
 * the social accounts grouped by region (image 36), four link columns that
 * mirror the header, the SMEC Group, and the UAE and India offices.
 */
export default function SiteFooter() {
  return (
    <footer className={styles.footer} aria-labelledby="footer-title">
      <h2 id="footer-title" className="visuallyHidden">
        Site footer
      </h2>

      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href="/" aria-label={`${SITE.name} — home`}>
              <Image
                src={SITE.logo}
                alt={SITE.name}
                width={197}
                height={48}
                sizes="200px"
                className={styles.logo}
              />
            </Link>
            <p className={styles.blurb}>{FOOTER_DESCRIPTION}</p>

            <h3 className={styles.head}>Connect With SMEC</h3>
            {SOCIAL_GROUPS.filter((group) => group.links.length).map((group) => (
              <div key={group.region} className={styles.socialGroup}>
                <h4 className={styles.socialRegion}>
                  <span className={styles.socialCode} aria-hidden="true">
                    {group.code}
                  </span>
                  {group.region}
                </h4>
                <p className={styles.socialEntity}>{group.entity}</p>
                <ul className={styles.socials}>
                  {group.links.map((social) => {
                    const Icon = SOCIAL_ICON[social.label];
                    return (
                      <li key={social.label}>
                        <a href={social.href} target="_blank" rel="noopener noreferrer">
                          {Icon ? <Icon /> : null}
                          <span>{social.name}</span>
                          <span className="visuallyHidden">, {group.entity}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <nav className={styles.cols} aria-label="Footer">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.heading} className={styles.col}>
                <h3 className={styles.head}>{col.heading}</h3>
                <ul>
                  {col.entries.map((entry) => (
                    <li key={entry.label}>
                      <a className={styles.link} href={entry.href}>
                        <span className="wipeLink">{entry.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className={styles.col}>
              <h3 className={styles.head}>SMEC Group</h3>
              <ul className={styles.group}>
                {SMEC_GROUP.map((company) => (
                  <li key={company.name}>
                    {company.href ? (
                      <a
                        className={styles.company}
                        href={company.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className={styles.companyName}>
                          <span className="wipeLink">{company.name}</span>
                          <ArrowUpRight className={styles.externalIcon} />
                        </span>
                        <span className={styles.companyNote}>{company.note}</span>
                      </a>
                    ) : (
                      <span className={styles.company}>
                        <span className={styles.companyName}>{company.name}</span>
                        <span className={styles.companyNote}>{company.note}</span>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        {/* -------------------------------------------------------- offices */}
        <div className={styles.locations}>
          <h3 className={styles.locationsTitle}>Our Engineering Locations</h3>
          <div className={styles.locationGrid}>
            {FOOTER_LOCATIONS.map((location) => (
              <div key={location.region} className={styles.location}>
                <h4 className={styles.region}>
                  <Pin className={styles.pin} />
                  {location.region}
                </h4>
                <address className={styles.address}>
                  <span className={styles.entity}>{location.entity}</span>
                  {location.note ? <span className={styles.note}>{location.note}</span> : null}
                  {location.address.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>
                <ul className={styles.contact}>
                  {location.rows.map((row) => (
                    <li key={row.label}>
                      <span className={styles.contactLabel}>{row.label}</span>
                      <a
                        className={styles.contactLink}
                        href={row.href}
                        {...(row.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        <span className="wipeLink">{row.value}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.legal}>
          <p className={styles.copyright}>{COPYRIGHT}</p>
          <ul className={styles.legalLinks}>
            {LEGAL_LINKS.map((item) => (
              <li key={item.label}>
                <a className="wipeLink" href={localHref(item.href)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
