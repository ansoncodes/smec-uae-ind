/** Line icons at a single 1.5px weight, inheriting currentColor. */

type P = { className?: string };

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false as const,
};

export const ArrowRight = ({ className }: P) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" {...base}>
    <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
  </svg>
);

export const ArrowDown = ({ className }: P) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" {...base}>
    <path d="M8 2.5v11M3.5 9 8 13.5 12.5 9" />
  </svg>
);

export const ArrowUpRight = ({ className }: P) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" {...base}>
    <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
  </svg>
);

export const Chevron = ({ className }: P) => (
  <svg className={className} width="12" height="12" viewBox="0 0 12 12" {...base}>
    <path d="m3 4.5 3 3 3-3" />
  </svg>
);

export const Plus = ({ className }: P) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" {...base}>
    <path d="M8 3v10M3 8h10" />
  </svg>
);

export const Mail = ({ className }: P) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" {...base}>
    <rect x="1.75" y="3.25" width="12.5" height="9.5" rx="1" />
    <path d="m2.5 4.5 5.5 4 5.5-4" />
  </svg>
);

export const Phone = ({ className }: P) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" {...base}>
    <path d="M5.2 2.5 6.8 5.6 5.4 7a9 9 0 0 0 3.6 3.6l1.4-1.4 3.1 1.6v2A1.3 1.3 0 0 1 12.1 14 10.6 10.6 0 0 1 2 3.9 1.3 1.3 0 0 1 3.3 2.5Z" />
  </svg>
);

export const Pin = ({ className }: P) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" {...base}>
    <path d="M8 14.5S13 10.4 13 6.6A5 5 0 0 0 3 6.6C3 10.4 8 14.5 8 14.5Z" />
    <circle cx="8" cy="6.5" r="1.75" />
  </svg>
);

export const Play = ({ className }: P) => (
  <svg className={className} width="22" height="22" viewBox="0 0 22 22" aria-hidden focusable="false">
    <path d="M7.5 4.8 17 11l-9.5 6.2Z" fill="currentColor" />
  </svg>
);

export const Shield = ({ className }: P) => (
  <svg className={className} width="20" height="20" viewBox="0 0 20 20" {...base}>
    <path d="M10 2.5 16 5v5c0 3.4-2.4 6.3-6 7.5-3.6-1.2-6-4.1-6-7.5V5Z" />
    <path d="m7.4 10 1.9 1.9 3.4-3.6" />
  </svg>
);

export const WhatsApp = ({ className }: P) => (
  <svg className={className} width="22" height="22" viewBox="0 0 24 24" aria-hidden focusable="false">
    <path
      fill="currentColor"
      d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm5.8 14.2c-.2.7-1.4 1.4-2 1.4-.5 0-1.1.2-3.6-.8a12.6 12.6 0 0 1-5.2-4.6c-.4-.5-1.2-1.7-1.2-3.2s.8-2.3 1.1-2.6a1.1 1.1 0 0 1 .8-.4h.6c.2 0 .4 0 .6.5l.9 2.1c0 .2 0 .4-.1.6l-.4.5c-.2.2-.4.4-.2.7a10 10 0 0 0 1.8 2.3 9 9 0 0 0 2.7 1.6c.3.2.5.1.7-.1l1-1.2c.2-.2.4-.2.6-.1l2.1 1c.2.1.4.2.4.3.1.2.1.9-.1 1.5Z"
    />
  </svg>
);

export const Linkedin = ({ className }: P) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" aria-hidden focusable="false">
    <path
      fill="currentColor"
      d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3ZM9.5 9h3.8v1.7h.05a4.2 4.2 0 0 1 3.75-2c4 0 4.75 2.5 4.75 5.9V21h-4v-5.6c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9V21h-4Z"
    />
  </svg>
);

export const Facebook = ({ className }: P) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" aria-hidden focusable="false">
    <path
      fill="currentColor"
      d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6A22 22 0 0 0 14.3 3.5c-2.4 0-4 1.45-4 4.1v2.3H7.6V13h2.7v8Z"
    />
  </svg>
);

export const Instagram = ({ className }: P) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" {...base}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export const Youtube = ({ className }: P) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" aria-hidden focusable="false">
    <path
      fill="currentColor"
      d="M22 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.5a2.5 2.5 0 0 0-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.8 1.8C5.7 19 12 19 12 19s6.3 0 7.8-.5a2.5 2.5 0 0 0 1.8-1.8C22 15.2 22 12 22 12ZM10 15V9l5.2 3Z"
    />
  </svg>
);

export const SOCIAL_ICON: Record<string, (p: P) => React.JSX.Element> = {
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
};
