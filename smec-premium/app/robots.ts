import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/siteData';

/**
 * Crawling is allowed on production only.
 *
 * The spec requires staging, preview and development hosts to stay out of
 * search from the start, and production never to inherit a staging noindex.
 * Defaulting to "disallow" means a host has to opt in by setting
 * NEXT_PUBLIC_SITE_ENV=production, rather than leaking because someone forgot
 * a flag. This is not a substitute for putting staging behind auth
 * (docs/spec-alignment.md 1.9).
 */
const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === 'production';

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
