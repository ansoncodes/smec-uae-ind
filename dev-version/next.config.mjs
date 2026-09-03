import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Next 16 requires the allowlist. 40 is for the blurred cover backdrops,
    // where detail is thrown away anyway; everything else uses the default.
    qualities: [40, 75],
  },
  // There is an unrelated empty package-lock.json one level up; pin the
  // workspace root so Turbopack doesn't infer it.
  turbopack: {
    root: dirname(fileURLToPath(import.meta.url)),
  },
};

export default nextConfig;
