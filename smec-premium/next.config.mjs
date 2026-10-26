import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { nextRedirects } from './lib/redirects.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Security headers the Technical SEO Master asks for at the application layer.
 * HSTS and a Content-Security-Policy belong at the edge once the host is
 * chosen, and the CSP needs validating against the YouTube embed and
 * next/image before it can be enforced.
 */
/**
 * Content-Security-Policy, in report-only.
 *
 * §20 asks for a CSP. It ships as Report-Only rather than enforcing, because
 * an enforced policy written before the analytics container, the consent tool
 * and the host are known will block one of them on launch day — and a CSP
 * that breaks the site is worse than one that watches it. This is the policy
 * the site actually needs today, so the switch to enforcing is a one-word
 * change once 0.3 and 0.5 are answered and the reports come back clean.
 *
 * 'unsafe-inline' for styles is Next's inlined critical CSS; for scripts it
 * is the framework's own bootstrap. Both are removable with a nonce, which
 * needs a server rendering every request — a hosting decision, not a code one.
 *
 * The analytics hosts are Google's published list for GA4 through Tag Manager,
 * plus Clarity's. Whatever else SMEC adds to the container will show up in the
 * reports first, which is the point of watching before enforcing.
 */
const ANALYTICS = {
  // Tag Manager and GA4 (lib/tags.ts), and Clarity, which the container loads.
  script: 'https://www.googletagmanager.com https://*.clarity.ms',
  connect:
    'https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.clarity.ms https://c.bing.com',
  img: 'https://*.google-analytics.com https://*.googletagmanager.com https://*.clarity.ms https://c.bing.com',
  // The container's no-JavaScript fallback.
  frame: 'https://www.googletagmanager.com',
};

// The corporate film's privacy-enhanced player (components/CorporateFilm.tsx),
// inserted only when a visitor presses play.
const FILM_FRAME = 'https://www.youtube-nocookie.com';

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "object-src 'none'",
  `script-src 'self' 'unsafe-inline' ${ANALYTICS.script}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${ANALYTICS.img}`,
  "font-src 'self' data:",
  // The lead API the RFQ form posts to, when it is called directly.
  `connect-src 'self' https://api.smec.in ${ANALYTICS.connect}`,
  `frame-src 'self' ${ANALYTICS.frame} ${FILM_FRAME}`,
  // No upgrade-insecure-requests: browsers ignore it in a report-only policy
  // and log an error on every page. It belongs in the enforced policy at the
  // edge, with HSTS, once the host is live (audit SEC-01).
].join('; ');

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Content-Security-Policy-Report-Only', value: contentSecurityPolicy },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // this folder is its own app inside a larger repo
  outputFileTracingRoot: __dirname,
  // The locked URL format: lowercase, descriptive, trailing slash, self-canonical.
  trailingSlash: true,
  // Next's own trailing-slash redirect runs before the legacy map and turned
  // every slashless legacy URL into two hops. It is replaced by the same rule
  // at the end of nextRedirects(), after the map. Internal links are written
  // with their slash (lib/routes.ts canonicalPath), so nothing relies on the
  // client adding it.
  skipTrailingSlashRedirect: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Next 16 only serves qualities declared here; the build uses 75 and 82.
    qualities: [75, 82],
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      // Vercel's own hostnames serve the same build as the real domain, so
      // they stay out of search whatever NEXT_PUBLIC_SITE_ENV says (SEO-08).
      {
        source: '/:path*',
        has: [{ type: 'host', value: '.*\\.vercel\\.app' }],
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
  // The WordPress map, plus this build's own retired paths. One hop each,
  // permanent, and nothing lands on the homepage.
  async redirects() {
    return nextRedirects();
  },
};

export default nextConfig;
