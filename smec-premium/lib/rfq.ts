/**
 * The RFQ form's shape and rules, in one place because two sides need them:
 * the form in the browser, so a visitor is told about a problem before they
 * wait for a round trip, and the route handler, because the Technical Master
 * requires server-side validation and a browser check is not one (§20).
 *
 * The field groups are the document's: identity, commercial context,
 * technical context, schedule, uploads, consent (§18). Only name, email,
 * requirement and consent are mandatory — the same section asks for
 * progressive qualification rather than a wall of required fields.
 *
 * File rules mirror leads/validators.py in the lead backend exactly. If they
 * drift, the visitor is told after the upload instead of before it.
 */

export const MAX_FILES = 5;
export const MAX_FILE_BYTES = 10 * 1024 * 1024;

export const ALLOWED_EXTENSIONS = [
  'pdf',
  'doc',
  'docx',
  'xls',
  'xlsx',
  'zip',
  'dwg',
  'jpg',
  'jpeg',
  'png',
] as const;

/** What the document asks a buyer to attach (§18, Content Master RFQ inputs). */
export const UPLOAD_KINDS =
  'RFQ, BOQ, P&ID, SLD, I/O list, equipment list, drawings, fault history or specification';

export const PROJECT_STAGES = [
  'FEED',
  'Tender',
  'Execution',
  'Operating',
  'Shutdown',
] as const;

export const SCOPE_TYPES = [
  'Electrical & instrumentation',
  'Automation & control systems',
  'Panels or E-House',
  'Rig modernization or retrofit',
  'Obsolescence or migration',
  'Testing & commissioning',
  'Digital / monitoring',
  'Not sure yet',
] as const;

export const SITE_EXECUTION = ['Yes', 'No', 'Not decided'] as const;

/** Every field the form posts. Anything not a Lead column lands in extra_data. */
export const FIELDS = [
  'full_name',
  'email',
  'company',
  'phone',
  'country',
  'requirement_type',
  'message',
  'end_user',
  'asset',
  'project_stage',
  'existing_oem',
  'required_date',
  'window',
  'site_execution',
  'form_location',
] as const;

export type FieldName = (typeof FIELDS)[number] | 'consent' | 'rfq_files';

export type Errors = Partial<Record<FieldName | 'form', string>>;

export const LABELS: Record<string, string> = {
  full_name: 'Name',
  email: 'Work email',
  company: 'Company',
  phone: 'Phone',
  country: 'Country or site',
  requirement_type: 'Scope',
  message: 'What do you need engineered?',
  end_user: 'End user',
  asset: 'Asset, facility or rig',
  project_stage: 'Project stage',
  existing_oem: 'Existing system, OEM or model',
  required_date: 'Required date',
  window: 'Shutdown or mobilization window',
  site_execution: 'Site execution required',
  consent: 'Consent',
  rfq_files: 'Attachments',
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const extensionOf = (name: string) => name.split('.').pop()?.toLowerCase() ?? '';

export const formatSize = (bytes: number) =>
  bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;

/** One file, checked against the same rules the backend applies. */
export function fileError(file: { name: string; size: number }): string | null {
  const ext = extensionOf(file.name);
  if (!ALLOWED_EXTENSIONS.includes(ext as (typeof ALLOWED_EXTENSIONS)[number])) {
    return `${file.name} is a .${ext || '?'} file. Send ${ALLOWED_EXTENSIONS.join(', ')}.`;
  }
  if (file.size > MAX_FILE_BYTES) {
    return `${file.name} is ${formatSize(file.size)}. The limit is 10 MB per file.`;
  }
  return null;
}

export function filesError(files: { name: string; size: number }[]): string | null {
  if (files.length > MAX_FILES) {
    return `Attach up to ${MAX_FILES} files. Zip the rest, or send them by email.`;
  }
  for (const file of files) {
    const error = fileError(file);
    if (error) return error;
  }
  return null;
}

type Values = Record<string, string>;

/**
 * The whole submission. Returns a field→message map, empty when it passes.
 * Messages are written to be read by the person filling the form in.
 */
export function validate(values: Values, files: { name: string; size: number }[]): Errors {
  const errors: Errors = {};
  const value = (key: string) => (values[key] ?? '').trim();

  if (!value('full_name')) errors.full_name = 'Please give us a name to reply to.';

  const email = value('email');
  if (!email) errors.email = 'We reply by email, so we need an address.';
  else if (!EMAIL.test(email)) errors.email = 'That address looks incomplete.';

  const phone = value('phone');
  if (phone) {
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 7 || digits.length > 15) {
      errors.phone = 'Enter a phone number with 7 to 15 digits, including the country code.';
    }
  }

  const message = value('message');
  if (message.length < 10) {
    errors.message = 'A sentence is enough — what needs engineering, and on what asset?';
  }

  if (values.consent !== 'true') {
    errors.consent = 'We need your permission before an engineer can contact you.';
  }

  const fileProblem = filesError(files);
  if (fileProblem) errors.rfq_files = fileProblem;

  return errors;
}

export const hasErrors = (errors: Errors) => Object.keys(errors).length > 0;
