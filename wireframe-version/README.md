# SMEC Oil & Gas — Next.js rebuild

A faithful Next.js 16 (App Router + TypeScript) rebuild of the homepage at
<https://smecoilandgas.com/>, which runs on WordPress/Elementor.

Copy, headings, links and metadata are reproduced verbatim because the original
page is SEO-tuned. Layout values (sizes, spacing, colours, section heights) were
read off the live page's computed styles rather than guessed.

## Running it

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

The page is fully static (`○ (Static) prerendered as static content`), so all
copy is in the server-rendered HTML.

`npm audit` reports zero vulnerabilities. Next.js is kept on 16.x — 15.5.x
pulls in a vulnerable `postcss`, and 15.5.4 specifically carries CVE-2025-66478.

## Layout fidelity

Measured against the live site at a 1440px viewport (1425px content width).
Every section height matches within 1px; total document height is 6010px vs the
original's 6008px.

| Section | Top | Height |
|---|---|---|
| Header | 0 | 66 |
| Hero | −117 | 792 |
| Approved Partners | 619 | 100 |
| Our Major Products | 719 | 702 |
| Stats | 1421 | 138 |
| Who We Are | 1552 | 189 |
| Our Certifications | 1741 | 609 |
| Our Clients | 2350 | 65 |
| Global presence (map + strip) | 2415 | 785 |
| R&D Focus | 3200 | 560 |
| Solutions & Services | 3759 | 560 |
| Sustainability | 4319 | 470 |
| Articles | 4834 | 632 |
| Footer | 5466 | 458 |
| Copyright | 5924 | 84 |

Two quirks of the original are reproduced deliberately, because they are what
the page actually looks like:

- The hero carries `margin-top: -183px` so the transparent header sits on top of
  the banner (and the banner's top 117px is cropped off-screen).
- The Approved Partners band carries `margin-top: -56px` so its blue pill
  overlaps the bottom of the banner.

## Design tokens

Defined in [app/globals.css](app/globals.css).

| Token | Value | Used for |
|---|---|---|
| `--blue` | `#003582` | Section headings, label pills, Solutions band |
| `--blue-deep` | `#10228a` | Copyright bar, Quick Enquiry tab |
| `--indigo` | `#393f8b` | Product card titles |
| `--indigo-btn` | `#272197` | Product card buttons |
| `--violet` | `#3518cc` | Hero button label |
| `--teal` | `#00a99d` | Product card taglines |
| `--green` | `#1f5e08` | Sustainability gradient end |
| `--muted` | `#54595f` | Counter labels |
| `--grey-bg` | `#f1f1f1` | Footer background |

Fonts (via `next/font/google`, matching the original): **Poppins** (hero H1,
Who We Are body, R&D body), **Roboto** (most everything), **Rosario** (R&D and
Sustainability headings), **Enriqueta** (counter labels).

## Structure

```
app/
  layout.tsx      metadata, JSON-LD (Rank Math @graph), fonts
  page.tsx        section composition
  globals.css     tokens, reset, shared helpers
components/       one component + CSS module per section
lib/siteData.ts   all page copy, links and image references
public/images/    69 assets pulled from the live site
```

`lib/siteData.ts` is the single place to edit copy. Treat the strings as
SEO-critical — reword them only deliberately.

## Interactive behaviour

Ported to match the original's configuration:

| Element | Behaviour |
|---|---|
| Products carousel | Loop, 4 / 2 / 1 per view, 500ms slide + 500ms dwell, arrows, pause on hover |
| Clients strip | Loop, 9 / 2 / 5 per view, advances 2 at a time every 5s |
| Articles carousel | Continuous linear scroll, pauses on hover |
| Counters | Count up over 2000ms when scrolled into view |
| World map | CSS pin map with hover labels on desktop; static map image below 1024px |
| Country strip | CSS marquee, duration = `count × 3s` |
| Corporate video | Poster facade; loads the YouTube embed on click |

All motion respects `prefers-reduced-motion`.

## Notes / deviations

- The original ships a **hidden** duplicate certifications section
  (`display: none`). It is not reproduced; its logo assets are still in
  `public/images` and listed as `CERT_LOGOS` in `lib/siteData.ts` if wanted.
- The original's mobile-menu logo (`logo-main.png`) is an 11.5MB PNG of a
  273×59 image. The standard logo is used instead — visually identical, 20KB.
- **Quick Enquiry** links to `/contact-us`. On the original it opens a
  Popup Builder form; there is no form plugin here to reproduce.
- Cookie-consent, analytics and other third-party scripts are not included.
- Navigation and article links point at absolute `smecoilandgas.com` URLs, since
  only the homepage exists in this project. Swap them for relative paths as
  those pages get built.
