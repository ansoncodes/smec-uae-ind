import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import FloatingWidgets from '@/components/FloatingWidgets';
import Breadcrumb from '@/components/ui/Breadcrumb';
import EnquiryForm from '@/components/page/EnquiryForm';
import { Mail, Phone, Pin, WhatsApp } from '@/components/Icons';
import { CONTACT, FOOTER_ADDRESS, FOOTER_CONTACT, MARQUEE_COUNTRIES, SITE } from '@/lib/siteData';
import styles from './contact.module.css';

export const metadata: Metadata = {
  title: 'Contact Us — SMEC Oil & Gas',
  description:
    'Fueling innovation in oil and gas — connect with SMEC for automation, electrical and instrumentation solutions. Offices in Abu Dhabi, Dubai and Kochi.',
  alternates: { canonical: '/contact-us' },
  openGraph: {
    type: 'website',
    url: `${SITE.url}/contact-us`,
    title: 'Contact Us — SMEC Oil & Gas',
    description:
      'Fueling innovation in oil and gas — connect with SMEC for automation, electrical and instrumentation solutions.',
  },
};

/** Offices as the live contact page lists them. */
const OFFICES = [
  {
    tag: 'Middle East & global support',
    name: 'SMEC Oil & Gas Solutions LLC SPC',
    lines: ['Store-104, M34, Mussafah', 'Abu Dhabi, United Arab Emirates'],
    phones: [
      { label: 'Landline', value: '+971 2 546 0027', href: 'tel:+97125460027' },
      { label: 'Mobile', value: '+971 50 249 1903', href: 'tel:+971502491903' },
    ],
  },
  {
    tag: 'Marine',
    name: 'SMEC Marine Solutions LLC',
    lines: ['Office 181/2, Al Jadaf', 'Dubai, United Arab Emirates'],
    phones: [{ label: 'Mobile', value: CONTACT.phone, href: CONTACT.phoneHref }],
  },
  {
    tag: 'Engineering & manufacturing',
    name: 'SMEC Automation Pvt. Ltd.',
    lines: ['2nd Floor, Kaloor Bus Stand Complex', 'Kochi, Kerala 682017, India'],
    phones: [
      { label: 'Mobile', value: '+91 85888 70618', href: 'tel:+918588870618' },
      { label: 'Mobile', value: '+91 86060 47714', href: 'tel:+918606047714' },
    ],
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.name,
  url: SITE.url,
  email: CONTACT.email,
  telephone: CONTACT.phone,
  address: OFFICES.map((office) => ({
    '@type': 'PostalAddress',
    name: office.name,
    streetAddress: office.lines[0],
    addressLocality: office.lines[1],
  })),
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />

      <main id="main">
        <header className={`${styles.masthead} grain`}>
          <div className="container">
            <p className={styles.kicker}>
              <span className={styles.kickerRule} aria-hidden="true" />
              Contact
            </p>
            <h1 className={styles.title}>Let&rsquo;s build the right solution together.</h1>
            <p className={styles.lead}>
              Fueling innovation in oil &amp; gas — connect with us for cutting-edge automation
              solutions.
            </p>

            <ul className={styles.quick}>
              <li>
                <a href={CONTACT.emailHref}>
                  <Mail className={styles.quickIcon} />
                  <span>
                    <span className={styles.quickLabel}>Email</span>
                    {CONTACT.email}
                  </span>
                </a>
              </li>
              <li>
                <a href={CONTACT.phoneHref}>
                  <Phone className={styles.quickIcon} />
                  <span>
                    <span className={styles.quickLabel}>Call</span>
                    {CONTACT.phone}
                  </span>
                </a>
              </li>
              <li>
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
                  <WhatsApp className={styles.quickIcon} />
                  <span>
                    <span className={styles.quickLabel}>WhatsApp</span>
                    {CONTACT.phone}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </header>

        <section className="section" data-tone="light" aria-labelledby="enquiry">
          <div className="container">
            <div className={styles.layout}>
              <div className={styles.formCol}>
                <div className={styles.blockHead}>
                  <span className={styles.blockNum}>01</span>
                  <h2 id="enquiry" className={styles.blockTitle}>
                    Send an enquiry
                  </h2>
                </div>
                <EnquiryForm />
              </div>

              <div className={styles.officeCol}>
                <div className={styles.blockHead}>
                  <span className={styles.blockNum}>02</span>
                  <h2 className={styles.blockTitle}>Our offices</h2>
                </div>

                <ul className={styles.offices}>
                  {OFFICES.map((office) => (
                    <li key={office.name} data-reveal="up">
                      <p className={styles.officeTag}>{office.tag}</p>
                      <p className={styles.officeName}>{office.name}</p>
                      <address className={styles.officeAddress}>
                        <Pin className={styles.officeIcon} />
                        <span>
                          {office.lines.map((line) => (
                            <span key={line}>
                              {line}
                              <br />
                            </span>
                          ))}
                        </span>
                      </address>
                      <ul className={styles.officePhones}>
                        {office.phones.map((phone) => (
                          <li key={phone.value}>
                            <span className={styles.phoneLabel}>{phone.label}</span>
                            <a className="wipeLink" href={phone.href}>
                              {phone.value}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>

                <div className={styles.reach}>
                  <p className={styles.reachLabel}>Global support</p>
                  <ul className={styles.reachList}>
                    {MARQUEE_COUNTRIES.map((country) => (
                      <li key={country}>{country}</li>
                    ))}
                  </ul>
                </div>

                <p className={styles.registered}>
                  {FOOTER_ADDRESS[1]} · {FOOTER_CONTACT[2].value}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <FloatingWidgets />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
