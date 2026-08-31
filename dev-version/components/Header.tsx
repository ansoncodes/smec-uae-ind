"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { contact, navItems, type NavItem } from "@/lib/siteData";
import {
  CaretDownIcon,
  CloseIcon,
  EnvelopeIcon,
  MenuIcon,
  PhoneIcon,
} from "@/components/Icons";
import styles from "./Header.module.css";

function SubMenu({ items, nested = false }: { items: NavItem[]; nested?: boolean }) {
  return (
    <ul className={nested ? styles.nestedMenu : styles.subMenu}>
      {items.map((child) => (
        <li key={child.label} className={child.children ? styles.hasChildren : undefined}>
          <a href={child.href} className={styles.subLink}>
            <span>{child.label}</span>
            {child.children && <CaretDownIcon className={styles.subCaret} size={10} />}
          </a>
          {child.children && <SubMenu items={child.children} nested />}
        </li>
      ))}
    </ul>
  );
}

function Drawer({ onClose }: { onClose: () => void }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className={styles.drawer} role="dialog" aria-label="Menu" aria-modal="true">
      <div className={styles.drawerHead}>
        <Image
          src="/logos/SMEC-Oil-and-Gas-Logo-300x109.png"
          alt="SMEC Oil and Gas"
          width={300}
          height={109}
          className={styles.drawerLogo}
        />
        <button
          type="button"
          className={styles.drawerClose}
          onClick={onClose}
          aria-label="Close menu"
        >
          <CloseIcon size={18} />
        </button>
      </div>

      <nav aria-label="Mobile">
        <ul className={styles.drawerList}>
          {navItems.map((item) => (
            <li key={item.label}>
              {item.children ? (
                <>
                  <button
                    type="button"
                    className={styles.drawerToggle}
                    aria-expanded={open === item.label}
                    onClick={() => setOpen(open === item.label ? null : item.label)}
                  >
                    {item.label}
                    <CaretDownIcon
                      size={12}
                      className={open === item.label ? styles.caretOpen : undefined}
                    />
                  </button>
                  {open === item.label && (
                    <ul className={styles.drawerSub}>
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <a href={child.href} onClick={onClose}>
                            {child.label}
                          </a>
                          {child.children && (
                            <ul className={styles.drawerSub}>
                              {child.children.map((grand) => (
                                <li key={grand.label}>
                                  <a href={grand.href} onClick={onClose}>
                                    {grand.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <a href={item.href} className={styles.drawerLink} onClick={onClose}>
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.drawerFoot}>
        <a href={`mailto:${contact.email}`} className={styles.drawerContact}>
          <EnvelopeIcon size={14} />
          {contact.email}
        </a>
        <a href={contact.phoneHref} className={styles.drawerContact}>
          <PhoneIcon size={14} />
          {contact.phone}
        </a>
        <a className="btn btn-primary" href="https://smecoilandgas.com/contact-us">
          Contact Us
        </a>
      </div>
    </div>
  );
}

/**
 * One sticky header for the whole page. The wireframe build carried two navs —
 * a transparent one over the hero and a second bar that appeared on scroll —
 * both with identical menus. A single condensing header is the SaaS
 * equivalent and keeps every link from both.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      <div className={styles.topbar}>
        <div className="container container-wide">
          <div className={styles.topbarInner}>
            <span className={styles.topbarNote}>
              Turnkey EPC for onshore &amp; offshore rigs — 10+ countries
            </span>
            <div className={styles.topbarLinks}>
              <a href={`mailto:${contact.email}`}>
                <EnvelopeIcon size={13} />
                {contact.email}
              </a>
              <a href={contact.phoneHref}>
                <PhoneIcon size={13} />
                {contact.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className="container container-wide">
          <div className={styles.bar}>
            <a
              href="https://smecoilandgas.com/"
              className={styles.brand}
              aria-label="SMEC Oil and Gas home"
            >
              <Image
                src="/logos/SMEC-Oil-and-Gas-Logo-300x109.png"
                alt="SMEC Oil and Gas"
                width={300}
                height={109}
                priority
                className={styles.logo}
              />
            </a>

            <nav className={styles.nav} aria-label="Primary">
              <ul className={styles.menu}>
                {navItems.map((item) => (
                  <li
                    key={item.label}
                    className={item.children ? styles.hasChildren : undefined}
                  >
                    <a href={item.href} className={styles.menuLink}>
                      {item.label}
                      {item.children && <CaretDownIcon size={10} />}
                    </a>
                    {item.children && <SubMenu items={item.children} />}
                  </li>
                ))}
              </ul>
            </nav>

            <div className={styles.actions}>
              <a className="btn btn-primary btn-sm" href="https://smecoilandgas.com/contact-us">
                Contact Us
              </a>
              <button
                type="button"
                className={styles.burger}
                aria-label="Menu Toggle"
                aria-expanded={drawerOpen}
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {drawerOpen && (
        <>
          <div
            className={styles.backdrop}
            role="presentation"
            onClick={() => setDrawerOpen(false)}
          />
          <Drawer onClose={() => setDrawerOpen(false)} />
        </>
      )}
    </>
  );
}
