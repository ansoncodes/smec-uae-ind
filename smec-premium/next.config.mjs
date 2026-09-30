import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Security headers the Technical SEO Master asks for at the application layer.
 * HSTS and a Content-Security-Policy belong at the edge once the host is
 * chosen, and the CSP needs validating against the YouTube embed and
 * next/image before it can be enforced.
 */
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
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
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  // Redirects live in lib/redirects.ts and get wired in the same change that
  // re-cuts the routes (docs/spec-alignment.md, 1.1 and 1.3). Wiring them now
  // would 301 the paths this build currently serves into 404s.
};

export default nextConfig;
