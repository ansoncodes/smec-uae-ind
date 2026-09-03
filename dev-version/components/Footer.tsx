import Logo from "@/components/ui/Logo";
import { contact, footer } from "@/lib/siteData";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "@/components/Icons";
import styles from "./Footer.module.css";

const socialIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  Linkedin: LinkedinIcon,
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  Youtube: YoutubeIcon,
};

/**
 * Prototype footer: a `.navy.tight` CTA strip, then `footer.site` with the
 * five-column `.footgrid` and the mono `.footbottom` line.
 */
export default function Footer() {
  return (
    <>
      <section className="navy tight" aria-label="Contact SMEC">
        <div className={`container ${styles.ctaRow}`}>
          <h2 className={styles.ctaTitle}>Turnkey solutions for the oil and gas industry</h2>
          <div className={styles.ctas}>
            <a className="btn btn-primary" href="https://smecoilandgas.com/contact-us">
              Contact Us
            </a>
            <a className="btn btn-ghost" href={contact.phoneHref}>
              {contact.phone}
            </a>
          </div>
        </div>
      </section>

      <footer className={styles.site}>
        <div className={`container ${styles.wrap}`}>
          <div className={styles.footgrid}>
            <div>
              <Logo />
              <p className={styles.addressTitle}>{footer.addressTitle}</p>
              <address className={styles.address}>
                {footer.addressLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
              <ul className={styles.contactList}>
                <li>
                  Landline: <a href={footer.landline.href}>{footer.landline.label}</a>
                </li>
                <li>
                  Mobile: <a href={footer.mobile.href}>{footer.mobile.label}</a>
                </li>
                <li>
                  Email: <a href={footer.email.href}>{footer.email.label}</a>
                </li>
              </ul>

              <p className={styles.addressTitle}>{footer.hub.title}</p>
              <address className={styles.address}>
                <a href={footer.hub.href} target="_blank" rel="noopener noreferrer">
                  {footer.hub.lines[0]}
                </a>
                {footer.hub.lines.slice(1).map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            </div>

            <div>
              <h5>Our Company</h5>
              <ul>
                {footer.company.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5>Our Solutions and Services</h5>
              <ul>
                {footer.services.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className={styles.spacer} aria-hidden="true">
                &nbsp;
              </h5>
              <ul>
                {footer.servicesSecondary.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5>Follow SMEC</h5>
              <ul>
                {footer.social.map((item) => {
                  const Icon = socialIcons[item.label];
                  return (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.social}
                      >
                        {Icon && <Icon size={12} />}
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className={styles.footbottom}>
            <span>{footer.copyright}</span>
            <span>
              <a href={footer.termsHref}>Terms &amp; Conditions</a> · Privacy Notice
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
