# SMEC Oil & Gas — template-inspired theme (Wix "Electrician (Simple)")

`../wireframe-version/` (the faithful rebuild of smecoilandgas.com) restyled
in the manner of the Wix template *Electrician (Simple) / Ampere Craft*
(`wix.com/website-template/view/html/wh-1213`): editorial and typographic —
Inter, black on white, one giant tight-tracked headline, oversized statement
paragraphs, black pill buttons with a lime dot, corner-bracket photo frames,
staggered white cards on a white-to-steel gradient, a dark photographic band,
a pale-steel centred call to action and a black footer with lime social pills.

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

## Scaffold images — read before shipping

The template is carried by photography and SMEC Oil & Gas does not yet have
enough of its own, so five stock photographs from Wikimedia Commons stand in.
They are **placeholders**, not assets:

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

To replace one: put the client photograph in `public/images`, point the entry
in `lib/scaffold.ts` at it, delete the `SCAFFOLD-` file and its credits row.
When all are gone, delete `lib/scaffold.ts` and the `data-scaffold` props.

```bash
grep -rn "SCAFFOLD" app components lib
```

## What changed, section by section

| Section | Now |
|---|---|
| Header | White, minimal, sticky; thin contact line above; plain text nav with an underline on hover; a white dropdown for Products |
| Hero | Giant headline over a hairline; subtitle and statement copy left, black pill right; full-bleed photo band with corner brackets rotating five photographs (banner + 4 scaffold); badge as a small white card on the photo |
| Approved Partners | Small label + greyscale logos between hairlines |
| Major Products | Small label, oversized intro statement, plain cards under a hairline with pill "Know More" buttons; arrows sit top-right |
| Stats | Four oversized figures between hairlines, lime "+" |
| Who We Are | Small label + statement left, bracketed people photograph (scaffold) right |
| Certifications | Four white cards, staggered, on the white-to-steel gradient |
| Clients | Small label + greyscale strip between hairlines |
| Global presence | Greyscale map, black-and-lime pins with black label pills, black country strip in lime |
| R&D Focus | Dark photographic band (the site's own R&D banner), lime tile, white statement, corner brackets |
| Solutions & Services | Statement beside the video, lime play button |
| Sustainability | Statement + photograph on the pale steel band |
| Articles | Poster on a grey plate, copy below, underlined "Read More" with a lime dot; same continuous strip |
| Contact band | New pale centred band built only from existing strings (lime tile, support label, entity name, phone, email, Contact Us pill) |
| Footer | Black; large white logo; link columns; lime uppercase social pills; underlined legal links |

## Design tokens

Defined in [app/globals.css](app/globals.css).

| Token | Value | Used for |
|---|---|---|
| `--black` | `#000000` | Type, buttons, footer, marquee |
| `--lime` | `#acff58` | The single accent: dots, tiles, social pills, marquee text |
| `--steel` | `#c2cfdd` | Pale band and gradient end |
| `--plate` | `#f2f2f2` | Image plates |
| `--line` | `#dfe4ea` | Hairlines |
| `--text-soft` | `#4d4d4d` | Secondary copy |

Font: **Inter** only, via `next/font/google`. Type scale is fluid
(`--fs-display` 56–132px at -0.05em, `--fs-statement` 22–31px, body 16px,
labels 15px regular).

Shared helpers in `globals.css`: `.container`, `.eyebrow`, `.statement`,
`.pill`, `.pillLime`, `.ulink`, `.tile`, `.brackets` / `.bracketsDark`.

## Structure

```
app/
  layout.tsx      metadata, JSON-LD, Inter
  page.tsx        section composition (wireframe order + ContactBand)
  globals.css     tokens, reset, shared helpers
components/       one component + CSS module per section
lib/siteData.ts   all page copy, links and image references (unchanged)
lib/scaffold.ts   the placeholder photographs — see above
public/images/    the wireframe assets, plus scaffold/ for the placeholders
```
