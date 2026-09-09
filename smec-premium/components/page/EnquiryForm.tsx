'use client';

import { useState } from 'react';
import { CONTACT } from '@/lib/siteData';
import { ArrowRight } from '@/components/Icons';
import styles from './EnquiryForm.module.css';

const INTERESTS = [
  'Power houses (PCR / SCR / VFD)',
  'Drilling control & monitoring',
  'BOP control',
  'Gas detection & safety',
  'Jacking control / RPD',
  'Perimeter security',
  'Retrofit & recertification',
  'Something else',
];

/**
 * Enquiry form.
 *
 * NOTE FOR DEPLOYMENT — there is no backend in this build, so submitting
 * composes a pre-filled message and hands it to the visitor's mail client.
 * That works everywhere and loses nothing, but it is a stand-in: point
 * `onSubmit` at a real endpoint (or a form service) before launch and drop
 * the mailto branch.
 */
export default function EnquiryForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) ?? '').trim();

    const body = [
      `Name: ${get('name')}`,
      `Company: ${get('company')}`,
      `Email: ${get('email')}`,
      `Phone: ${get('phone')}`,
      `Interest: ${get('interest')}`,
      '',
      get('message'),
    ].join('\n');

    const subject = `Enquiry from ${get('name') || 'the website'}${
      get('company') ? ` — ${get('company')}` : ''
    }`;

    window.location.href = `${CONTACT.emailHref}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>Name</span>
          <input name="name" type="text" required autoComplete="name" />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Company</span>
          <input name="company" type="text" autoComplete="organization" />
        </label>
      </div>

      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>Email</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Phone</span>
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
      </div>

      <label className={styles.field}>
        <span className={styles.label}>What do you need?</span>
        <select name="interest" defaultValue={INTERESTS[0]}>
          {INTERESTS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Details</span>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Rig or facility, scope, timeline, and anything else that helps us respond usefully."
        />
      </label>

      <div className={styles.foot}>
        <button type="submit" className={`btn btnAccent ${styles.submit}`}>
          Send Enquiry
          <ArrowRight className="arrow" />
        </button>
        <p className={styles.note} role="status">
          {sent
            ? 'Your mail client should have opened with the enquiry ready to send.'
            : `Goes to ${CONTACT.email}. UAE and GCC response in 12–24 hours.`}
        </p>
      </div>
    </form>
  );
}
