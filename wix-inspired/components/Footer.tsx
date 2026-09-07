import Image from 'next/image';
import {
  SITE,
  FOOTER_ADDRESS,
  FOOTER_CONTACT,
  FOOTER_COMPANY,
  FOOTER_SOLUTIONS_A,
  FOOTER_SOLUTIONS_B,
  SOCIALS,
  COPYRIGHT,
  LEGAL_LINKS,
} from '@/lib/siteData';
import { Facebook, Instagram, LinkedIn, YouTube } from './Icons';
import styles from './Footer.module.css';

const SOCIAL_ICON = {
  Linkedin: LinkedIn,
  Facebook: Facebook,
  Instagram: Instagram,
  Youtube: YouTube,
} as const;

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={`${styles.inner} m-fade`}>
          {/* address */}
          <div className={styles.col}>
            <Image
              src={SITE.logoFooter}
              alt="SMEC Oil &amp; Gas Solutions LLC"
              width={300}
              height={109}
              className={styles.logo}
            />
            <p className={styles.address}>
              {FOOTER_ADDRESS.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
              {FOOTER_CONTACT.map((item) => (
                <span key={item.label}>
                  {item.label}{' '}
                  <a href={item.href} className={styles.inlineLink}>
                    {item.value}
                  </a>
                  <br />
                </span>
              ))}
            </p>
          </div>

          {/* group companies */}
          <div className={styles.col}>
            <h2 className={styles.colTitle}>Our Company</h2>
            <ul className={styles.linkList}>
              {FOOTER_COMPANY.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className={styles.link}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* solutions */}
          <div className={styles.col}>
            <h2 className={styles.colTitle}>Our Solutions and Services</h2>
            <ul className={styles.linkList}>
              {FOOTER_SOLUTIONS_A.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className={styles.link}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <ul className={`${styles.linkList} ${styles.linkListSecond}`}>
              {FOOTER_SOLUTIONS_B.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className={styles.link}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <ul className={styles.socials}>
              {SOCIALS.map((social) => {
                const Icon = SOCIAL_ICON[social.label];
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      className={styles.socialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon />
                      <span className={styles.srOnly}>{social.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </footer>

      <div className={styles.copyright}>
        <div className={`${styles.copyInner} m-fade`}>
          <p className={styles.copyText}>{COPYRIGHT}</p>
          <p className={styles.legal}>
            {LEGAL_LINKS.map((item, i) => (
              <span key={item.label}>
                {i > 0 && ' | '}
                <a href={item.href} className={styles.legalLink}>
                  {item.label}
                </a>
              </span>
            ))}
          </p>
        </div>
      </div>
    </>
  );
}
