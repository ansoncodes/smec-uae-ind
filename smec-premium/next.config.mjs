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
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  // The lead API the RFQ form posts to, when it is called directly.
  "connect-src 'self' https://api.smec.in",
  "upgrade-insecure-requests",
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
  images: {
    formats: ['image/avif', 'image/webp'],
    // Next 16 only serves qualities declared here; the build uses 75 and 82.
    qualities: [75, 82],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  // The WordPress map, plus this build's own retired paths. One hop each,
  // permanent, and nothing lands on the homepage.
  async redirects() {
    return nextRedirects();
  },
};

export default nextConfig;
