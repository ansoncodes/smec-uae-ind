'use client';

import { useId, useRef, useState } from 'react';
import { CONTACT } from '@/lib/siteData';
import { pageTypeOf, track } from '@/lib/analytics';
import {
  ALLOWED_EXTENSIONS,
  FIELDS,
  LABELS,
  MAX_FILES,
  PROJECT_STAGES,
  SCOPE_TYPES,
  SITE_EXECUTION,
  UPLOAD_KINDS,
  filesError,
  formatSize,
  hasErrors,
  validate,
  type Errors,
} from '@/lib/rfq';
import { ArrowRight } from '@/components/Icons';
import styles from './RfqForm.module.css';

/**
 * The RFQ form.
 *
 * It replaces a `mailto:` link that put the enquiry, the sender's name, email
 * and phone into a URL and hoped the visitor had a mail client configured.
 * This posts to /api/rfq, which validates again and forwards to the lead
 * backend with the campaign key attached server-side.
 *
 * Shape is the Technical Master's §18: identity, commercial context,
 * technical context, schedule, uploads, consent. Four fields are mandatory —
 * name, email, requirement and consent — because the same section asks for
 * progressive qualification, "minimum viable contact + scope first, richer
 * technical inputs optional but encouraged". The technical groups are
 * therefore open and inviting rather than required, and the file picker is
 * never hidden behind a toggle: an attached drawing is worth more to an
 * estimator than any field on the form.
 */

const ENDPOINT = process.env.NEXT_PUBLIC_RFQ_ENDPOINT || '/api/rfq/';

type Props = {
  /** The product or solution the enquiry starts from, for the sales team. */
  item?: string;
  /** Where the form sits, for the conversion events. */
  location?: string;
};

export default function RfqForm({ item, location = 'contact_page' }: Props) {
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');

  const fieldId = (name: string) => `${formId}-${name}`;
  const errorId = (name: string) => `${formId}-${name}-error`;

  const describedBy = (name: string, hint?: string) =>
    [errors[name as keyof Errors] ? errorId(name) : null, hint ? `${fieldId(name)}-hint` : null]
      .filter(Boolean)
      .join(' ') || undefined;

  /** One message under one field, announced with it. */
  const Message = ({ name }: { name: string }) =>
    errors[name as keyof Errors] ? (
      <span className={styles.error} id={errorId(name)}>
        {errors[name as keyof Errors]}
      </span>
    ) : null;

  const addFiles = (incoming: FileList | null) => {
    if (!incoming?.length) return;
    const next = [...files];
    for (const file of Array.from(incoming)) {
      if (!next.some((f) => f.name === file.name && f.size === file.size)) next.push(file);
    }
    setFiles(next);
    setErrors((current) => ({ ...current, rfq_files: filesError(next) ?? undefined }));
  };

  const removeFile = (index: number) => {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    setErrors((current) => ({ ...current, rfq_files: filesError(next) ?? undefined }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state === 'sending') return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const values: Record<string, string> = { consent: data.get('consent') ? 'true' : '' };
    for (const field of FIELDS) values[field] = String(data.get(field) ?? '');

    const found = validate(values, files);
    if (hasErrors(found)) {
      setErrors(found);
      track('form_error', { location, field: Object.keys(found)[0] });
      // Move to the summary so the problem is read out, not just coloured in.
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setErrors({});
    setState('sending');

    const payload = new FormData();
    for (const [key, value] of Object.entries(values)) {
      if (key === 'consent' || !value.trim()) continue;
      payload.set(key, value.trim());
    }
    payload.set('consent', 'true');
    payload.set('form_location', item ? `${location}: ${item}` : location);
    payload.set('website', String(data.get('website') ?? ''));
    for (const file of files) payload.append('rfq_files', file, file.name);

    try {
      const response = await fetch(ENDPOINT, { method: 'POST', body: payload });
      const body = await response.json().catch(() => null);

      if (!response.ok || !body?.success) {
        const returned: Errors = body?.errors ?? {
          form: 'Something went wrong sending that. Please try again, or email us.',
        };
        setErrors(returned);
        setState('idle');
        track('form_error', { location, field: Object.keys(returned)[0] });
        requestAnimationFrame(() => summaryRef.current?.focus());
        return;
      }

      if (files.length) track('rfq_file_upload', { location, file_count: files.length });
      track('rfq_submit', {
        location,
        item,
        page_type: pageTypeOf(typeof window === 'undefined' ? '/' : window.location.pathname),
      });

      setState('sent');
      setFiles([]);
      form.reset();
    } catch {
      setErrors({ form: 'We could not reach our systems. Please try again, or email us.' });
      setState('idle');
      track('form_error', { location, field: 'network' });
      requestAnimationFrame(() => summaryRef.current?.focus());
    }
  };

  if (state === 'sent') {
    return (
      <div className={styles.done} role="status">
        <p className={styles.doneTitle}>Your enquiry is with our engineers.</p>
        <p className={styles.doneBody}>
          An engineer reviews the scope and replies — usually within one working day
          across the UAE and India. If it is urgent, call{' '}
          <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>.
        </p>
        <button type="button" className="btn btnOutline" onClick={() => setState('idle')}>
          Send another enquiry
        </button>
      </div>
    );
  }

  const problems = Object.entries(errors).filter(([, message]) => message);

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate ref={formRef}>
      {/* Focusable so the browser can be sent here when a submit fails. */}
      <div
        className={problems.length ? styles.summary : styles.summaryHidden}
        ref={summaryRef}
        tabIndex={-1}
        role={problems.length ? 'alert' : undefined}
      >
        {problems.length ? (
          <>
            <p className={styles.summaryTitle}>
              {problems.length === 1 ? 'One thing to fix' : `${problems.length} things to fix`}
            </p>
            <ul>
              {problems.map(([name, message]) => (
                <li key={name}>
                  {name === 'form' ? (
                    message
                  ) : (
                    <a href={`#${fieldId(name)}`}>
                      {LABELS[name] ?? name}: {message}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>

      <fieldset className={styles.group}>
        <legend className={styles.legend}>Who to reply to</legend>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor={fieldId('full_name')}>
              {LABELS.full_name} <span className={styles.req}>required</span>
            </label>
            <input
              id={fieldId('full_name')}
              name="full_name"
              type="text"
              autoComplete="name"
              aria-invalid={errors.full_name ? true : undefined}
              aria-describedby={describedBy('full_name')}
            />
            <Message name="full_name" />
          </div>

          <div className={styles.field}>
            <label htmlFor={fieldId('company')}>{LABELS.company}</label>
            <input
              id={fieldId('company')}
              name="company"
              type="text"
              autoComplete="organization"
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor={fieldId('email')}>
              {LABELS.email} <span className={styles.req}>required</span>
            </label>
            <input
              id={fieldId('email')}
              name="email"
              type="email"
              autoComplete="email"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={describedBy('email')}
            />
            <Message name="email" />
          </div>

          <div className={styles.field}>
            <label htmlFor={fieldId('phone')}>{LABELS.phone}</label>
            <input
              id={fieldId('phone')}
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+971…"
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={describedBy('phone')}
            />
            <Message name="phone" />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor={fieldId('country')}>{LABELS.country}</label>
            <input id={fieldId('country')} name="country" type="text" autoComplete="country-name" />
          </div>

          <div className={styles.field}>
            <label htmlFor={fieldId('requirement_type')}>{LABELS.requirement_type}</label>
            <select id={fieldId('requirement_type')} name="requirement_type" defaultValue="">
              <option value="">Select a scope</option>
              {SCOPE_TYPES.map((scope) => (
                <option key={scope} value={scope}>
                  {scope}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor={fieldId('message')}>
            {LABELS.message} <span className={styles.req}>required</span>
          </label>
          <textarea
            id={fieldId('message')}
            name="message"
            rows={5}
            placeholder="The asset, the scope, and the problem. A fault description or a line from the specification is enough to start."
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={describedBy('message')}
          />
          <Message name="message" />
        </div>
      </fieldset>

      <fieldset className={styles.group}>
        <legend className={styles.legend}>
          Technical context <span className={styles.optional}>optional — it speeds up the quote</span>
        </legend>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor={fieldId('end_user')}>{LABELS.end_user}</label>
            <input id={fieldId('end_user')} name="end_user" type="text" />
          </div>
          <div className={styles.field}>
            <label htmlFor={fieldId('asset')}>{LABELS.asset}</label>
            <input id={fieldId('asset')} name="asset" type="text" />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor={fieldId('project_stage')}>{LABELS.project_stage}</label>
            <select id={fieldId('project_stage')} name="project_stage" defaultValue="">
              <option value="">Select a stage</option>
              {PROJECT_STAGES.map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor={fieldId('existing_oem')}>{LABELS.existing_oem}</label>
            <input
              id={fieldId('existing_oem')}
              name="existing_oem"
              type="text"
              placeholder="Make and model, if you know it"
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor={fieldId('required_date')}>{LABELS.required_date}</label>
            <input id={fieldId('required_date')} name="required_date" type="date" />
          </div>
          <div className={styles.field}>
            <label htmlFor={fieldId('window')}>{LABELS.window}</label>
            <input id={fieldId('window')} name="window" type="text" placeholder="Dates, if fixed" />
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor={fieldId('site_execution')}>{LABELS.site_execution}</label>
          <select id={fieldId('site_execution')} name="site_execution" defaultValue="">
            <option value="">Select</option>
            {SITE_EXECUTION.map((answer) => (
              <option key={answer} value={answer}>
                {answer}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      <fieldset className={styles.group}>
        <legend className={styles.legend}>Attachments</legend>

        <p className={styles.hint} id={`${fieldId('rfq_files')}-hint`}>
          {UPLOAD_KINDS}. Up to {MAX_FILES} files, 10 MB each —{' '}
          {ALLOWED_EXTENSIONS.join(', ')}.
        </p>

        <input
          className={styles.file}
          id={fieldId('rfq_files')}
          name="rfq_files_picker"
          type="file"
          multiple
          accept={ALLOWED_EXTENSIONS.map((ext) => `.${ext}`).join(',')}
          onChange={(event) => {
            addFiles(event.target.files);
            event.target.value = '';
          }}
          aria-invalid={errors.rfq_files ? true : undefined}
          aria-describedby={describedBy('rfq_files', 'hint')}
        />
        <label className={styles.pick} htmlFor={fieldId('rfq_files')}>
          {files.length ? 'Attach another file' : 'Attach drawings or a specification'}
        </label>
        <Message name="rfq_files" />

        {files.length ? (
          <ul className={styles.files}>
            {files.map((file, index) => (
              <li key={`${file.name}-${file.size}`}>
                <span className={styles.fileName}>{file.name}</span>
                <span className={styles.fileSize}>{formatSize(file.size)}</span>
                <button
                  type="button"
                  className={styles.remove}
                  onClick={() => removeFile(index)}
                >
                  Remove<span className={styles.srOnly}> {file.name}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </fieldset>

      <div className={styles.field}>
        <label className={styles.consent} htmlFor={fieldId('consent')}>
          <input
            id={fieldId('consent')}
            name="consent"
            type="checkbox"
            value="true"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={describedBy('consent')}
          />
          <span>
            An engineer may contact me about this enquiry, and SMEC may hold the details and
            any files I attach for that purpose. <span className={styles.req}>required</span>
          </span>
        </label>
        <Message name="consent" />
      </div>

      {/* Left empty by people, filled by bots. Hidden from both the page and
          assistive technology, and skipped by the keyboard. */}
      <div className={styles.trap} aria-hidden="true">
        <label htmlFor={fieldId('website')}>Website</label>
        <input id={fieldId('website')} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={styles.foot}>
        <button type="submit" className={`btn btnAccent ${styles.submit}`} disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending…' : 'Send the RFQ'}
          <ArrowRight className="arrow" />
        </button>
        <p className={styles.note}>
          Or email{' '}
          <a href={CONTACT.emailHref} onClick={() => track('click_email', { location })}>
            {CONTACT.email}
          </a>{' '}
          ·{' '}
          <a href={CONTACT.phoneHref} onClick={() => track('click_phone', { location })}>
            {CONTACT.phone}
          </a>
        </p>
      </div>
    </form>
  );
}
