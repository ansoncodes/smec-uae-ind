import Image from "next/image";
import { contact, footer } from "@/lib/siteData";
import {
  ArrowRightIcon,
  EnvelopeIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  PhoneIcon,
  YoutubeIcon,
} from "@/components/Icons";
import styles from "./Footer.module.css";

const socialIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  Linkedin: LinkedinIcon,
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  Youtube: YoutubeIcon,
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Closing call to action, built from the header/footer contact details. */}
      <div className="container container-wide">
        <div className={styles.cta}>
          <div>
            <h2 className={styles.ctaTitle}>Turnkey solutions for the oil and gas industry</h2>
            <p className={styles.ctaBody}>
              Talk to the SMEC team about your onshore or offshore requirement.
            </p>
          </div>
          <div className={styles.ctaActions}>
            <a className="btn btn-primary" href="https://smecoilandgas.com/contact-us">
              Contact Us
              <ArrowRightIcon size={15} />
            </a>
            <a className="btn btn-secondary" href={contact.phoneHref}>
              <PhoneIcon size={14} />
              {contact.phone}
            </a>
          </div>
        </div>
      </div>

      <div className={styles.main}>
        <div className="container container-wide">
          <div className={styles.grid}>
            <div className={styles.brandCol}>
              <a href="https://smecoilandgas.com/" aria-label="SMEC Oil and Gas home">
                <Image
                  src={footer.logo}
                  alt="SMEC Oil and Gas"
                  width={300}
                  height={109}
                  className={styles.logo}
                />
              </a>

              <p className={styles.addressTitle}>{footer.addressTitle}</p>
              <address className={styles.address}>
                {footer.addressLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>

              <ul className={styles.contactList}>
                <li>
                  <PhoneIcon size={13} />
                  <span>
                    Landline:{" "}
                    <a href={footer.landline.href}>{footer.landline.label}</a>
                  </span>
                </li>
                <li>
                  <PhoneIcon size={13} />
                  <span>
                    Mobile: <a href={footer.mobile.href}>{footer.mobile.label}</a>
                  </span>
                </li>
                <li>
                  <EnvelopeIcon size={13} />
                  <span>
                    Email: <a href={footer.email.href}>{footer.email.label}</a>
                  </span>
                </li>
              </ul>
            </div>

            <div className={styles.linkCol}>
              <h2 className={styles.colTitle}>Our Company</h2>
              <ul className={styles.linkList}>
                {footer.company.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.linkColWide}>
              <h2 className={styles.colTitle}>Our Solutions and Services</h2>
              <div className={styles.serviceCols}>
                <ul className={styles.linkList}>
                  {footer.services.map((link) => (
                    <li key={link.label}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
                <ul className={styles.linkList}>
                  {footer.servicesSecondary.map((link) => (
                    <li key={link.label}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container container-wide">
          <div className={styles.bottomInner}>
            <p className={styles.copyright}>{footer.copyright}</p>

            <div className={styles.bottomRight}>
              <div className={styles.social}>
                {footer.social.map((item) => {
                  const Icon = socialIcons[item.label];
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialIcon}
                    >
                      <span className="sr-only">{item.label}</span>
                      {Icon && <Icon size={13} />}
                    </a>
                  );
                })}
              </div>
              <p className={styles.terms}>
                <a href={footer.termsHref}>Terms &amp; Conditions</a>
                <span aria-hidden="true">|</span>
                Privacy Notice
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
