'use client';

import { useEffect, useState } from 'react';
import { CONTACT } from '@/lib/siteData';
import { AngleRight, WhatsApp } from './Icons';
import styles from './FloatingWidgets.module.css';

export default function FloatingWidgets() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <a
        href="https://smecoilandgas.com/contact-us"
        className={styles.enquiry}
        aria-label="Quick Enquiry"
      >
        Quick Enquiry
      </a>

      <a
        href={CONTACT.whatsapp}
        className={styles.whatsapp}
        aria-label="Chat with us on WhatsApp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsApp />
      </a>

      <button
        type="button"
        className={`${styles.scrollTop} ${showTop ? styles.scrollTopVisible : ''}`}
        aria-label="Scroll to Top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <AngleRight className={styles.scrollIcon} />
      </button>
    </>
  );
}
