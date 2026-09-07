# SMEC Oil & Gas — smec.com-inspired theme

`../wireframe-version/` (the faithful rebuild of smecoilandgas.com) restyled in
the manner of <https://www.smec.com/>: white grounds, near-black navy type, one
electric-blue accent, Poppins throughout, pill buttons, arrow links and large
full-bleed photography.

**Nothing SEO-bearing changed.** Every heading, paragraph, link, image alt,
the metadata and the JSON-LD are the wireframe's, byte for byte, and
`lib/siteData.ts` is untouched. Section order is the same. The carousels,
counters, pin map, marquee, video facade and off-canvas menu keep their
original behaviour. Only the presentation layer was rewritten.

## Run

```bash
npm install
```

```bash
npm run dev
```

## Product and article pages

Every "Know More" and "Read More" link now resolves to a page in this build,
at the **same path the live site uses** (`/power-house`,
`/retrofit-solutions`, …), so indexed URLs and canonicals are unchanged:

- `app/[slug]/page.tsx` serves all 8 products and 17 articles, prerendered
  from `generateStaticParams`; anything else 404s.
- Copy is the live page's own, ported in `lib/productDetails.ts` and
  `lib/articles/` (the same files `../dev-version/` uses). Each article page
  uses the article's own artwork as its cover, shown whole on a blurred copy
  of itself, and links back to the original post.
- `lib/siteData.ts` is still untouched. `lib/routes.ts` maps a homepage href
  to its local page when one exists and leaves every other link (About Us,
  Careers, the extra nav products, the policies) pointing at the live site.
- Each page carries its own metadata, a canonical to the live URL and
  Product / Article JSON-LD alongside the site graph in the layout.

## Scaffold images — read before shipping

smec.com is carried by photography and SMEC Oil & Gas does not yet have enough
of its own, so six stock photographs from Wikimedia Commons stand in. They are
**placeholders**, not assets:

| Where | Id | File |
|---|---|---|
| Hero slideshow (slides 2–5; slide 1 is the real banner) | `hero-offshore-platform`, `hero-platform-flare`, `hero-jackup-rig`, `hero-supply-vessel` | `public/images/scaffold/SCAFFOLD-hero-*.jpg` |
| Who We Are, photograph beside the statement | `who-we-are-crew` | `SCAFFOLD-who-we-are-crew.jpg` |
| Stats band background | `stats-refinery-panorama` | `SCAFFOLD-stats-refinery-panorama.jpg` |

How they are marked, so they cannot be missed:

- every file name starts with `SCAFFOLD-` and lives in `public/images/scaffold/`
- every reference goes through `lib/scaffold.ts`, which carries a `SCAFFOLD` banner
- every call site has a `SCAFFOLD IMAGE` comment
- every rendered `<img>` carries `data-scaffold="<id>"`, so
  `document.querySelectorAll('[data-scaffold]')` lists them in the browser
- `public/images/scaffold/SCAFFOLD-CREDITS.md` records source, author and licence

To replace one: put the client photograph in `public/images`, point the entry
in `lib/scaffold.ts` at it, delete the `SCAFFOLD-` file and its credits row.
When all are gone, delete `lib/scaffold.ts` and the `data-scaffold` props.

Find everything with:

```bash
grep -rn "SCAFFOLD" app components lib
```

## What changed, section by section

| Section | Before (wireframe) | Now |
|---|---|---|
| Header | Transparent over the banner, dropdown list | Solid navy bar, utility row with contact details, sticky, full-width white mega panel for Products |
| Hero | One banner, copy centred with the badge beside | Full-bleed slideshow (banner + 4 scaffold photographs) behind the same copy, anchored bottom-left; dots and next arrow; badge kept small at the right |
| Approved Partners | Blue pill + logos | Small uppercase label + greyscale logos that colour on hover |
| Major Products | Indigo cards | White cards with a pale image plate, navy title, blue tagline, arrow link; same looping carousel |
| Stats | Plain counters | Counters on a full-bleed photograph (scaffold) with a navy scrim |
| Who We Are | Centred text | Statement left, people photograph (scaffold) right |
| Certifications | Pill + grid | Heading + four white cards on the pale band |
| Clients | Pill + strip | Centred label + greyscale strip on white |
| Global presence | Blue pins, grey labels | Blue pins with shadow, white label cards, navy country strip |
| R&D Focus | Background image | Full-bleed band using the site's own R&D banner, gradient scrim |
| Solutions & Services | Copy + video | Same, with a blue play button and a rounded, shadowed player |
| Sustainability | Copy + image | Same on the pale band |
| Articles | Dark cropped posters, overlay copy | White insight cards: whole poster on a pale plate, copy below, arrow link; same continuous strip |
| Contact band | — | New blue band before the footer built only from existing strings (support label, entity name, phone, email, Contact Us) |
| Footer | Grey | Dark navy, three columns, circular social buttons, darker copyright bar |

## Design tokens

Defined in [app/globals.css](app/globals.css).

| Token | Value | Used for |
|---|---|---|
| `--navy` | `#09202e` | Headings, header, scrims |
| `--navy-deep` | `#0a112d` | Footer |
| `--blue` | `#1257fd` | Buttons, links, labels, pins, contact band |
| `--blue-hover` | `#2b6eff` | Hover state |
| `--blue-light` | `#7fa6ff` | Accent on dark grounds (stat "+", icons) |
| `--tint` | `#f3f7ff` | Pale bands and image plates |
| `--body` | `#4a5560` | Paragraph text |
| `--line` | `#e3e8ef` | Hairlines and card borders |

Font: **Poppins** only, via `next/font/google`. Type scale is fluid
(`--fs-hero` 40–68px, `--fs-h2` 30–46px, `--fs-lead` 17–20px).

## Structure

```
app/
  layout.tsx      metadata, JSON-LD, Poppins
  page.tsx        section composition (wireframe order + ContactBand)
  globals.css     tokens, reset, shared helpers (.container, .btn*, .arrowLink, .eyebrow)
components/       one component + CSS module per section
lib/siteData.ts   all page copy, links and image references (unchanged)
lib/scaffold.ts   the placeholder photographs — see above
public/images/    the wireframe assets, plus scaffold/ for the placeholders
```
