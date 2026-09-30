import { ImageResponse } from 'next/og';
import { articleRoute } from '@/lib/spec/legacy';
import { canonicalPath } from '@/lib/routes';
import { SITE } from '@/lib/siteData';
import { specPage } from '@/lib/spec';

/**
 * The social card, generated per URL at build time.
 *
 * Every page shared into WhatsApp, LinkedIn or a Teams channel was showing
 * the same homepage image, because the site had one. The Technical Master
 * asks for 1200×630, unique per priority page, at an absolute URL with its
 * dimensions declared (§21) — Next writes the tags from these files.
 *
 * The card is drawn, not photographed: the section, the page's own H1, and
 * the answer sentence beneath it, on the ink ground the site opens with. No
 * photograph is used, because the approved image library is still with SMEC
 * (docs/spec-alignment.md 0.6), and no claim appears that the page does not
 * already make.
 *
 * The cards are served by `app/api/og/route.tsx` rather than Next's
 * `opengraph-image` file convention, because every section of this site is an
 * optional catch-all and a catch-all has to be the last segment of its route —
 * the convention cannot sit inside one. The endpoint takes the page's own URL,
 * builds the card from the same record the page renders from, and is cached
 * hard: the content of a card only changes when the document does.
 */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

const INK = '#0a0c0f';
const WHITE = '#f7f8f9';
const ACCENT = '#1257fd';
const STEEL = '#8b949e';

/** Long headings have to fit: three sizes, chosen by length. */
const titleSize = (title: string) =>
  title.length > 64 ? 56 : title.length > 40 ? 68 : 82;

function Card({
  eyebrow,
  title,
  answer,
}: {
  eyebrow: string;
  title: string;
  answer?: string;
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: INK,
        color: WHITE,
        padding: '64px 72px',
        position: 'relative',
      }}
    >
      {/* The accent edge the site uses to mark a section. */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 10,
          background: ACCENT,
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 10, height: 10, borderRadius: 5, background: ACCENT }} />
        <div style={{ fontSize: 22, letterSpacing: 6, textTransform: 'uppercase', color: STEEL }}>
          {eyebrow}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div
          style={{
            fontSize: titleSize(title),
            lineHeight: 1.05,
            letterSpacing: -2,
            fontWeight: 600,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        {answer ? (
          <div style={{ fontSize: 26, lineHeight: 1.45, color: STEEL, maxWidth: 900 }}>
            {answer.length > 150 ? `${answer.slice(0, 147).trimEnd()}…` : answer}
          </div>
        ) : null}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 28,
          borderTop: `1px solid rgba(255,255,255,0.14)`,
          fontSize: 21,
          letterSpacing: 3,
          textTransform: 'uppercase',
          color: STEEL,
        }}
      >
        <div style={{ color: WHITE, letterSpacing: 5, fontWeight: 600 }}>
          SMEC Oil &amp; Gas
        </div>
        <div>Abu Dhabi · Kochi · Global support</div>
      </div>
    </div>
  );
}

const render = (props: Parameters<typeof Card>[0]) =>
  new ImageResponse(<Card {...props} />, ogSize);

/** The card for any URL on the site, drawn from that page's own record. */
export function cardFor(url: string) {
  const path = canonicalPath(url);

  if (path === '/') {
    return {
      eyebrow: 'SMEC Oil & Gas Solutions LLC',
      title: specPage('/')?.h1 ?? 'Engineering Critical Energy Assets',
      answer: specPage('/')?.answer,
    };
  }

  const article = articleRoute(path.split('/').filter(Boolean).slice(1));
  if (article && path.startsWith('/resources/')) {
    return {
      eyebrow: specPage(article.collection)?.h1 ?? 'Resources',
      title: article.article.title,
      answer: article.article.subtitle,
    };
  }

  const page = specPage(path);
  if (!page) return null;

  return {
    eyebrow: page.breadcrumb.slice(1, -1).join(' · ') || page.breadcrumb[1] || 'SMEC Oil & Gas',
    title: page.h1,
    answer: page.answer || page.metaDescription,
  };
}

export const ogImageResponse = (url: string) =>
  render(cardFor(url) ?? { eyebrow: 'SMEC Oil & Gas', title: 'Engineering Critical Energy Assets' });

/**
 * What a page puts in its metadata. Absolute, with dimensions, as §21 asks.
 * One card per URL, so a shared product page shows that product.
 */
export const ogImageFor = (url: string, alt: string) => [
  {
    url: `${SITE.url}/api/og?u=${encodeURIComponent(canonicalPath(url))}`,
    width: ogSize.width,
    height: ogSize.height,
    alt,
  },
];
