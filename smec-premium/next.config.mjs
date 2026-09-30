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
