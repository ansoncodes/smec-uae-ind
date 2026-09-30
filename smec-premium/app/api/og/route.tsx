import { ogImageResponse } from '@/lib/og';

/**
 * The social card for one URL: /api/og?u=/products/vfd-houses/
 *
 * Next's `opengraph-image` file convention cannot be used here — every
 * section is an optional catch-all, and a catch-all must be the last segment
 * of its route, so no file can sit inside one. This endpoint takes the page's
 * path instead and draws from the same record the page renders from.
 *
 * `u` is a path on this site and nothing else: anything unrecognised falls
 * back to the homepage card rather than being drawn into an image.
 */

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const url = new URL(request.url).searchParams.get('u') ?? '/';
  const safe = url.startsWith('/') && !url.startsWith('//') ? url : '/';

  const image = ogImageResponse(safe);
  // A card changes only when the document does, so it can sit in a CDN for a
  // day and revalidate quietly for a week after that.
  image.headers.set('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
  return image;
}
