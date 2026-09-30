import { NextResponse } from 'next/server';

/**
 * The IndexNow key file.
 *
 * IndexNow verifies ownership by fetching `<origin>/<key>.txt` and checking
 * it contains the key. Next cannot route a filename that is itself the key,
 * so the host rewrites `/<key>.txt` to this route — one line in the hosting
 * config, noted in docs/spec-alignment.md alongside 0.3. Until a key exists
 * this answers 404, which is the correct answer to "is this site verified".
 */
export const runtime = 'nodejs';

export function GET() {
  const key = process.env.INDEXNOW_KEY;
  if (!key) return new NextResponse('Not found', { status: 404 });
  return new NextResponse(key, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
}
