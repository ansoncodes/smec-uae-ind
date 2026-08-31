'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { NAV, MOBILE_EXTRA_NAV, CONTACT, SITE } from '@/lib/siteData';
import { Bars, ChevronDown, Close, Envelope, Phone } from './Icons';
import styles from './Header.module.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);

  // Lock body scroll while the off-canvas menu is up.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* logo */}
        <div className={styles.logoCol}>
          <a href="/" aria-label={SITE.name}>
            <Image
              src={SITE.logo}
              alt="SMEC Oil &amp; Gas Solutions LLC"
              width={741}
              height={268}
              className={styles.logo}
              priority
            />
          </a>
        </div>

        {/* desktop nav */}
        <nav className={styles.navCol} aria-label="Primary">
          <ul className={styles.navList}>
            {NAV.map((item) => (
              <li
                key={item.label}
                className={item.children ? styles.hasSub : undefined}
              >
                <a href={item.href} className={styles.navLink}>
                  {item.label}
                  {item.children && <ChevronDown className={styles.caret} />}
                </a>
                {item.children && (
                  <ul className={styles.subMenu}>
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <a href={child.href} className={styles.subLink}>
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* contact strip */}
        <div className={styles.contactCol}>
          <ul className={styles.contactList}>
            <li>
              <a href={CONTACT.emailHref}>
                <Envelope className={styles.contactIcon} />
                <span>{CONTACT.email}</span>
              </a>
            </li>
            <li>
              <a href={CONTACT.phoneHref}>
                <Phone className={styles.contactIcon} />
                <span>{CONTACT.phone}</span>
              </a>
            </li>
          </ul>
        </div>

        {/* mobile trigger */}
        <button
          type="button"
          className={styles.burger}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <Bars />
        </button>
      </div>

      {/* off-canvas menu */}
      <div
        className={`${styles.overlay} ${menuOpen ? styles.overlayOpen : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.drawerHead}>
          <Image
            src={SITE.logo}
            alt="SMEC Oil &amp; Gas Solutions LLC"
            width={741}
            height={268}
            className={styles.drawerLogo}
          />
          <button
            type="button"
            className={styles.drawerClose}
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <Close />
          </button>
        </div>

        <ul className={styles.drawerList}>
          {NAV.map((item) => (
            <li key={item.label}>
              {item.children ? (
                <>
                  <button
                    type="button"
                    className={styles.drawerLink}
                    aria-expanded={openSub === item.label}
                    onClick={() => setOpenSub(openSub === item.label ? null : item.label)}
                  >
                    {item.label}
                    <ChevronDown
                      className={`${styles.drawerCaret} ${
                        openSub === item.label ? styles.drawerCaretOpen : ''
                      }`}
                    />
                  </button>
                  {openSub === item.label && (
                    <ul className={styles.drawerSub}>
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <a href={child.href} className={styles.drawerSubLink}>
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <a href={item.href} className={styles.drawerLink}>
                  {item.label}
                </a>
              )}
            </li>
          ))}
          {MOBILE_EXTRA_NAV.map((item) => (
            <li key={item.label}>
              <a href={item.href} className={styles.drawerLink}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
