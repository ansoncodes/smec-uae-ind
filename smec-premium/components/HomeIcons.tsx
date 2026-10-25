/**
 * The homepage's symbol icons — the four certification marks of images 17–18
 * and the four training cards of image 21 — drawn to match Icons.tsx: one
 * 1.5px line weight, currentColor, 24px grid.
 */

type P = { className?: string };

const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false as const,
};

/* -------------------------------------------------------- certifications */

export const Award = ({ className }: P) => (
  <svg className={className} {...base}>
    <circle cx="12" cy="9" r="5.5" />
    <path d="m8.6 13.4-1.4 7.1 4.8-2.6 4.8 2.6-1.4-7.1" />
  </svg>
);

export const Leaf = ({ className }: P) => (
  <svg className={className} {...base}>
    <path d="M5 19c0-8 5-13.5 14-14 .5 9-5 14-12 14Z" />
    <path d="M5 19c3.5-4 6.5-6.5 10-8.5" />
  </svg>
);

export const ShieldCheck = ({ className }: P) => (
  <svg className={className} {...base}>
    <path d="M12 3 5 6v5.5c0 4.4 3 7.8 7 9.5 4-1.7 7-5.1 7-9.5V6Z" />
    <path d="m9 12 2.2 2.2L15.5 10" />
  </svg>
);

export const Bolt = ({ className }: P) => (
  <svg className={className} {...base}>
    <path d="M13.5 3 5.5 13.5h6L10.5 21l8-10.5h-6Z" />
  </svg>
);

/* -------------------------------------------------------------- training */

export const Helmet = ({ className }: P) => (
  <svg className={className} {...base}>
    <path d="M4 16.5a8 8 0 0 1 16 0" />
    <path d="M10 8.8V5.5h4v3.3" />
    <path d="M2.5 16.5h19v2.5h-19Z" />
  </svg>
);

export const Gear = ({ className }: P) => (
  <svg className={className} {...base}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2.8v2.4M12 18.8v2.4M21.2 12h-2.4M5.2 12H2.8M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7M18.5 18.5l-1.7-1.7M7.2 7.2 5.5 5.5" />
    <circle cx="12" cy="12" r="6.6" />
  </svg>
);

export const Wrench = ({ className }: P) => (
  <svg className={className} {...base}>
    <path d="M14.7 6.3a4 4 0 0 0 5 5L20.5 12a5 5 0 0 1-6.3 2.3L7 21.5a2.1 2.1 0 0 1-3-3l7.2-7.2A5 5 0 0 1 13.5 5Z" />
  </svg>
);

export const Cap = ({ className }: P) => (
  <svg className={className} {...base}>
    <path d="M2.5 9 12 4.5 21.5 9 12 13.5Z" />
    <path d="M6.5 11v4.5c0 1.6 2.5 3 5.5 3s5.5-1.4 5.5-3V11" />
    <path d="M21.5 9v5" />
  </svg>
);
