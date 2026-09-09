import Image from 'next/image';
import Link from 'next/link';
import {
  COPYRIGHT,
  CONTACT,
  FOOTER_ADDRESS,
  FOOTER_COMPANY,
  FOOTER_CONTACT,
  FOOTER_SOLUTIONS_A,
  FOOTER_SOLUTIONS_B,
  LEGAL_LINKS,
  MARQUEE_COUNTRIES,
  SITE,
  SOCIALS,
} from '@/lib/siteData';
import { FOOTER_NAV } from '@/lib/experience';
import { localHref } from '@/lib/routes';
import { ArrowUpRight, Pin, SOCIAL_ICON } from './Icons';
import styles from './SiteFooter.module.css';

/** Multi-column footer carrying every link, office and contact the site has. */
export default function SiteFooter() {
  const solutions = [...FOOTER_SOLUTIONS_A, ...FOOTER_SOLUTIONS_B];

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
            <p className={styles.blurb}>
              A complete EPC company delivering turnkey solutions for the oil and gas industry —
              design, estimation, build, installation and commissioning under one roof.
            </p>

            <ul className={styles.socials}>
              {SOCIALS.map((social) => {
                const Icon = SOCIAL_ICON[social.label];
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {Icon ? <Icon /> : social.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <nav className={styles.cols} aria-label="Footer">
            <div className={styles.col}>
              <p className={styles.colHead}>Company</p>
              <ul>
                {FOOTER_NAV.map((item) => (
                  <li key={item.label}>
                    <a className="wipeLink" href={localHref(item.href)}>
                      {item.label}
                    </a>
                  </li>
                ))}
                <li>
                  <Link className="wipeLink" href="/insights">
                    Insights
                  </Link>
                </li>
              </ul>
            </div>

            <div className={styles.col}>
              <p className={styles.colHead}>Solutions</p>
              <ul>
                {solutions.map((item) => (
                  <li key={item.label}>
                    <a className="wipeLink" href={localHref(item.href)}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.col}>
              <p className={styles.colHead}>SMEC Group</p>
              <ul>
                {FOOTER_COMPANY.map((item) => (
                  <li key={item.label}>
                    <a
                      className={styles.external}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="wipeLink">{item.label}</span>
                      <ArrowUpRight className={styles.externalIcon} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.col}>
              <p className={styles.colHead}>Head office</p>
              <address className={styles.address}>
                <Pin className={styles.addressIcon} />
                <span>
                  {FOOTER_ADDRESS.map((line, i) => (
                    <span key={line} className={i === 0 ? styles.addressLabel : undefined}>
                      {line}
                      <br />
                    </span>
                  ))}
                </span>
              </address>

              <ul className={styles.contact}>
                {FOOTER_CONTACT.map((row) => (
                  <li key={row.label}>
                    <span className={styles.contactLabel}>{row.label}</span>
                    <a className="wipeLink" href={row.href}>
                      {row.value}
                    </a>
                  </li>
                ))}
                <li>
                  <span className={styles.contactLabel}>WhatsApp:</span>
                  <a
                    className="wipeLink"
                    href={CONTACT.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {CONTACT.phone}
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* -------------------------------------------------- country strip */}
        <div className={styles.countries}>
          <p className={styles.countriesLabel}>Global support</p>
          <ul className={styles.countriesList}>
            {MARQUEE_COUNTRIES.map((country) => (
              <li key={country}>{country}</li>
            ))}
          </ul>
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
