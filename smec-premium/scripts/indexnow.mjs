/**
 * IndexNow submission (§24).
 *
 * "IndexNow should notify participating search engines when URLs are added,
 * materially updated or deleted; it does not guarantee indexing." And: "No
 * mass submission of unchanged URLs" (§8) — so this takes the URLs you name,
 * and only falls back to the whole sitemap when you ask for it explicitly.
 *
 *   node scripts/indexnow.mjs /products/vfd-houses/ /solutions/
 *   node scripts/indexnow.mjs --all          # a launch or a re-architecture
 *
 * Needs two environment variables, both SMEC's to provide (0.1, 0.3):
 *   NEXT_PUBLIC_SITE_URL   the production origin
 *   INDEXNOW_KEY           the key, also served at /<key>.txt by app/indexnow
 *
 * Without the key it explains itself and exits 0, so a deploy pipeline can
 * call it before the key exists without failing the deploy.
 */

const ENDPOINT = 'https://api.indexnow.org/IndexNow';

const site = (process.env.NEXT_PUBLIC_SITE_URL ?? '').replace(/\/+$/, '');
const key = process.env.INDEXNOW_KEY ?? '';

if (!site || !key) {
  console.log('IndexNow: NEXT_PUBLIC_SITE_URL and INDEXNOW_KEY are not both set — nothing sent.');
  process.exit(0);
}

const args = process.argv.slice(2);
const wantsAll = args.includes('--all');
const named = args.filter((arg) => arg.startsWith('/'));

async function fromSitemap() {
  const response = await fetch(`${site}/sitemap.xml`);
  if (!response.ok) throw new Error(`sitemap returned ${response.status}`);
  const xml = await response.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const urls = wantsAll
  ? await fromSitemap()
  : named.map((path) => `${site}${path}`);

if (!urls.length) {
  console.log('IndexNow: name the paths that changed, or pass --all.');
  process.exit(0);
}

// The API takes up to 10,000 per call; this site is far short of that.
const body = {
  host: new URL(site).host,
  key,
  keyLocation: `${site}/${key}.txt`,
  urlList: urls,
};

const response = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
});

// 200 accepted, 202 accepted but key still being validated.
console.log(`IndexNow: ${urls.length} URL(s) → ${response.status} ${response.statusText}`);
if (!response.ok) {
  console.error(await response.text());
  process.exit(1);
}
