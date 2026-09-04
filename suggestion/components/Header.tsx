"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";
import {
  contact,
  footer,
  navItems,
  productBySlug,
  productHref,
  type NavItem,
} from "@/lib/siteData";
import { CaretDownIcon, CloseIcon, MenuIcon } from "@/components/Icons";
import styles from "./Header.module.css";

/** Nav entries whose product now has a page in this build link internally;
 *  everything else still points at the live site. */
function resolve(href: string) {
  const slug = href.split("/").pop() ?? "";
  return productBySlug(slug) ? productHref(slug) : href;
}

/**
 * Prototype mega-menu: a bordered surface panel with mono column headings.
 * Children that carry their own sub-items (Power House) get a column of
 * their own; the remaining products share a two-column list.
 */
function MegaMenu({ item }: { item: NavItem }) {
  const children = item.children ?? [];
  const groups = children.filter((c) => c.children);
  const flat = children.filter((c) => !c.children);

  return (
    <div className={styles.megamenu}>
      {groups.map((group) => (
        <div key={group.label}>
          <h4>
            <a href={resolve(group.href)}>{group.label}</a>
          </h4>
          <ul>
            {group.children?.map((child) => (
              <li key={child.label}>
                <a href={resolve(child.href)}>{child.label}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div>
        <h4>{item.label}</h4>
        <ul className={styles.megaCols}>
          {flat.map((child) => (
            <li key={child.label}>
              <a href={resolve(child.href)}>{child.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Drawer({ onClose }: { onClose: () => void }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className={styles.drawer} role="dialog" aria-label="Menu" aria-modal="true">
      <div className={styles.drawerHead}>
        <Logo />
        <button
          type="button"
          className={styles.drawerClose}
          onClick={onClose}
          aria-label="Close menu"
        >
          <CloseIcon size={16} />
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
                          <a href={resolve(child.href)} onClick={onClose}>
                            {child.label}
                          </a>
                          {child.children && (
                            <ul className={styles.drawerSub}>
                              {child.children.map((grand) => (
                                <li key={grand.label}>
                                  <a href={resolve(grand.href)} onClick={onClose}>
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
          {contact.email}
        </a>
        <a href={contact.phoneHref} className={styles.drawerContact}>
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
 * Prototype header: utility bar + sticky nav row. Menus open on hover and
 * toggle on click (the prototype's behaviour), and any outside click closes
 * them.
 */
export default function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!openMenu) return;
    const close = () => setOpenMenu(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [openMenu]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      <header className={styles.site}>
        <div className={styles.utilitybar}>
          <div className={`container ${styles.utilityInner}`}>
            <span className={styles.utilityNote}>
              {footer.addressLines[0]} — Abu Dhabi, UAE
              <span className={styles.utilityHub}>
                {" · "}
                India engineering hub: {footer.hub.lines[0]}
              </span>
            </span>
            <span className={styles.utilityLinks}>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <span aria-hidden="true">·</span>
              <a href={contact.phoneHref}>{contact.phone}</a>
              <span aria-hidden="true">·</span>
              <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </span>
          </div>
        </div>

        <div className={`container ${styles.navrow}`}>
          <Logo priority />

          <nav className={styles.primary} aria-label="Primary">
            {navItems.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className={`${styles.navitem} ${openMenu === item.label ? styles.open : ""}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    className={styles.navbtn}
                    aria-expanded={openMenu === item.label}
                    onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                  >
                    {item.label}
                  </button>
                  <MegaMenu item={item} />
                </div>
              ) : (
                <div key={item.label} className={styles.navitem}>
                  <a href={item.href} className={styles.navbtn}>
                    {item.label}
                  </a>
                </div>
              ),
            )}
          </nav>

          <div className={styles.navcta}>
            {/* WhatsApp already sits in the utility bar and the floating dock;
                a third copy only crowded the nav. */}
            <a className="btn btn-primary" href="https://smecoilandgas.com/contact-us">
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
