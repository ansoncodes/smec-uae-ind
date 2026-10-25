'use client';

import { useId, useRef, useState } from 'react';
import { NEWSLETTER_COPY } from '@/lib/homepage';
import { pageTypeOf, track } from '@/lib/analytics';
import { ArrowRight } from './Icons';
import styles from './Newsletter.module.css';

type Errors = { email?: string; consent?: string; form?: string };

/**
 * The SMEC EDGE sign-up: one address, explicit consent, then Mailchimp's own
 * confirmation email. The page says so plainly, because nothing arrives until
 * the reader clicks that link.
 */
export default function NewsletterForm() {
  const id = useId();
  const doneRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'idle' | 'sending' | 'pending' | 'subscribed'>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [address, setAddress] = useState('');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state === 'sending') return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get('email') ?? '').trim();
    const consent = data.get('consent') === 'true';

    /* Send the reader to the first field at fault; its message is tied to
       it, so it is read out on arrival. */
    const showErrors = (next: Errors) => {
      setErrors(next);
      requestAnimationFrame(() =>
        form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
      );
    };

    const found: Errors = {};
    if (!email) found.email = 'Enter the address the newsletter should go to.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) found.email = 'That address looks incomplete.';
    if (!consent) found.consent = 'Tick the box to confirm you want the newsletter.';
    if (Object.keys(found).length) {
      showErrors(found);
      return;
    }

    setErrors({});
    setState('sending');
    try {
      const response = await fetch('/api/newsletter/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, consent, website: String(data.get('website') ?? '') }),
      });
      const body = await response.json().catch(() => null);
      if (!response.ok || !body?.success) {
        showErrors(body?.errors ?? { form: 'Something went wrong. Please try again.' });
        setState('idle');
        return;
      }

      setAddress(email);
      setState(body.status === 'subscribed' ? 'subscribed' : 'pending');
      // A new sign-up Mailchimp has accepted; never the address itself.
      if (body.status !== 'subscribed') {
        track('newsletter_signup', {
          location: 'home_newsletter',
          page_type: pageTypeOf(window.location.pathname),
        });
      }
      requestAnimationFrame(() => doneRef.current?.focus());
    } catch {
      setErrors({ form: 'We could not reach the newsletter service. Please try again.' });
      setState('idle');
    }
  };

  if (state === 'pending' || state === 'subscribed') {
    return (
      <div className={styles.done} role="status" tabIndex={-1} ref={doneRef}>
        <p className={styles.doneTitle}>
          {state === 'pending' ? 'Check your inbox to confirm.' : 'You are already subscribed.'}
        </p>
        <p className={styles.doneBody}>
          {state === 'pending'
            ? `We have sent a confirmation link to ${address}. SMEC EDGE starts arriving once you click it.`
            : `${address} is already on the SMEC EDGE list.`}
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.row}>
        <label className="visuallyHidden" htmlFor={`${id}-email`}>
          Work email
        </label>
        <input
          id={`${id}-email`}
          className={styles.input}
          name="email"
          type="email"
          autoComplete="email"
          placeholder={NEWSLETTER_COPY.placeholder}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? `${id}-email-error` : undefined}
        />
        <button type="submit" className={`btn btnAccent ${styles.submit}`} disabled={state === 'sending'}>
          {state === 'sending' ? 'Subscribing…' : NEWSLETTER_COPY.submit}
          <ArrowRight className="arrow" />
        </button>
      </div>
      {errors.email ? (
        <p className={styles.error} id={`${id}-email-error`}>
          {errors.email}
        </p>
      ) : null}

      <label className={styles.consent} htmlFor={`${id}-consent`}>
        <input
          id={`${id}-consent`}
          name="consent"
          type="checkbox"
          value="true"
          aria-invalid={errors.consent ? true : undefined}
          aria-describedby={errors.consent ? `${id}-consent-error` : undefined}
        />
        <span>
          Send me SMEC EDGE by email. I can unsubscribe at any time from any issue. See the{' '}
          <a href="/privacy-policy/">privacy notice</a>.
        </span>
      </label>
      {errors.consent ? (
        <p className={styles.error} id={`${id}-consent-error`}>
          {errors.consent}
        </p>
      ) : null}

      {errors.form ? (
        <p className={styles.error} role="alert">
          {errors.form}
        </p>
      ) : null}

      {/* Left empty by people, filled by bots. */}
      <div className={styles.trap} aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
    </form>
  );
}
