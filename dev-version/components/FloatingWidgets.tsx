"use client";

import { useEffect, useState } from "react";
import { contact } from "@/lib/siteData";
import { ArrowUpIcon, WhatsappIcon } from "@/components/Icons";
import styles from "./FloatingWidgets.module.css";

/** The reference page's three fixed widgets — Quick Enquiry, WhatsApp and
 *  scroll-to-top — restyled as light, elevated pills. */
export default function FloatingWidgets() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        className={styles.enquiry}
        href="https://smecoilandgas.com/contact-us"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className={styles.enquiryText}>Quick Enquiry</span>
      </a>

      <div className={styles.dock}>
        <button
          type="button"
          className={`${styles.top} ${showTop ? styles.visible : ""}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to Top"
        >
          <ArrowUpIcon size={16} />
        </button>

        <a
          className={styles.whatsapp}
          href={contact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp us"
        >
          <WhatsappIcon size={48} />
          <span className={styles.whatsappLabel}>WhatsApp us</span>
        </a>
      </div>
    </>
  );
}
