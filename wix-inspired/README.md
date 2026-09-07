# SMEC Oil & Gas — template-inspired theme (Wix "Electrician (Simple)")

`../wireframe-version/` (the faithful rebuild of smecoilandgas.com) restyled
after the Wix template *Electrician (Simple) / Ampere Craft*
(`wix.com/website-template/view/html/wh-1213`, demo at
`wix.com/demone2/ampere-craft`). The template was measured at 1440px and its
motion system read out of its markup, so proportions and entrances match:

- Inter, black on white, a 131px headline at -0.05em / line-height 0.9,
  31px statement paragraphs set solid, 15.6px labels and body
- 39px black pills with 15.6px regular text and a 7px lime dot; 44px lime
  social pills with the network name and a 20px icon
- 22px gutters on a 1396px container, 16px card gaps, hairlines everywhere
- corner-bracket frames on photographs and around the dark band's copy
- staggered white cards on a white-to-steel gradient, a dark photographic
  band, a pale-steel centred call to action, a black footer

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

## Motion

The template animates every block as it scrolls into view with Wix's motion
presets. The same four are reproduced in `app/globals.css`, with the
template's own timing (1000–1200ms, `cubic-bezier(0.645, 0.045, 0.355, 1)`):

| Class | What it does | Used for |
|---|---|---|
| `m-fade` | opacity 0 → 1, 1200ms | labels, cards, logos, photographs, buttons (800ms late in the hero and the contact band) |
| `m-slide-down` | drops in by its own height behind a clip mask, 1200ms | statement paragraphs, card titles, counters |
| `m-slide-up` | rises by its own height behind a clip mask, 1000ms, 200ms late | the hero headline |
| `m-reveal` | clip-path wipe from the bottom, 1200ms | the hero hairline, the Who We Are photo, the video, the sustainability image |
| `spin` | continuous turn about the vertical axis, 5s | the lime bolt tiles |

`components/ui/Motion.tsx` is the trigger: a wrapper that sets `data-in` once
it enters the viewport (each section is wrapped in `app/page.tsx`).
Descendants stagger with `--d`. Reduced-motion users, browsers without
IntersectionObserver and no-JavaScript visitors see everything at once, and a
6s failsafe reveals anything the observer never reached.

## Scaffold images — read before shipping

Five stock photographs from Wikimedia Commons stand in where the template
would have photography. They are **placeholders**, not assets:

| Where | Id | File |
|---|---|---|
| Hero photo band (slides 2–5; slide 1 is the real banner) | `hero-offshore-platform`, `hero-platform-flare`, `hero-jackup-rig`, `hero-supply-vessel` | `public/images/scaffold/SCAFFOLD-hero-*.jpg` |
| Who We Are, photograph beside the statement | `who-we-are-crew` | `SCAFFOLD-who-we-are-crew.jpg` |

How they are marked, so they cannot be missed:

- every file name starts with `SCAFFOLD-` and lives in `public/images/scaffold/`
- every reference goes through `lib/scaffold.ts`, which carries a `SCAFFOLD` banner
- every call site has a `SCAFFOLD IMAGE` comment
- every rendered `<img>` carries `data-scaffold="<id>"`, so
  `document.querySelectorAll('[data-scaffold]')` lists them in the browser
- `public/images/scaffold/SCAFFOLD-CREDITS.md` records source, author and licence

```bash
grep -rn "SCAFFOLD" app components lib
```

## Design tokens

Defined in [app/globals.css](app/globals.css).

| Token | Value | Used for |
|---|---|---|
| `--black` | `#000000` | Type, buttons, footer, marquee |
| `--lime` | `#acff58` | The single accent: dots, tiles, social pills, marquee text |
| `--steel` | `#c2cfdd` | Pale band and gradient end |
| `--plate` | `#f2f2f2` | Image plates |
| `--line` | `#dfe4ea` | Hairlines |
| `--fs-display` | 56–131px | Hero headline |
| `--fs-display-sm` | 40–76px | Contact band heading |
| `--fs-statement` | 22–31.2px | Statement paragraphs, card titles |
| `--fs-body` / `--fs-eyebrow` | 15.6px | Copy and labels |

Shared helpers: `.container`, `.eyebrow`, `.statement`, `.pill`, `.pillLime`,
`.ulink`, `.tile`, `.spin`, `.brackets` / `.bracketsDark`, and the `m-*`
motion classes above.

## Structure

```
app/
  layout.tsx        metadata, JSON-LD, Inter, no-JS fallback for the entrances
  page.tsx          section composition (wireframe order + ContactBand), Motion groups
  globals.css       tokens, reset, shared helpers, motion system
components/         one component + CSS module per section
components/ui/      Motion.tsx (scroll trigger)
lib/siteData.ts     all page copy, links and image references (unchanged)
lib/scaffold.ts     the placeholder photographs — see above
public/images/      the wireframe assets, plus scaffold/ for the placeholders
```
