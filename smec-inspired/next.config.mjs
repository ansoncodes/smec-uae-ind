import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // this folder is its own app inside a larger repo
  outputFileTracingRoot: __dirname,
  images: {
    formats: ['image/webp'],
  },
};

export default nextConfig;
