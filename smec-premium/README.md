# smec-premium

A ground-up redesign of the SMEC Oil & Gas site. Same company, same
information, a completely new visual system and page composition.

`smec-inspired/` is untouched — this build was seeded from a copy of its
`lib/` and `public/` and everything in `app/` and `components/` was written
fresh.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 29 static pages
```

## Where the content comes from

Nothing here is invented copy. The source of truth is unchanged from the
previous build:

| File | Holds |
| --- | --- |
| `lib/siteData.ts` | Every string lifted from smecoilandgas.com — nav, hero, products, stats, certificates, clients, map pins, R&D, sustainability, articles, footer |
| `lib/productDetails.ts` | Body content for the eight product pages |
| `lib/articles/` | Body content for the seventeen articles |
| `lib/scaffold.ts` | The stock photographs standing in until client assets arrive |

`lib/experience.ts` is the one new data module. It does not add facts — it
regroups the existing ones for the new information architecture: the twelve
system catalogue, the discipline-grouped mega menu, the industry panels, the
EPC process, the ISO cards and the article categories.

Four systems (RPD, Load Monitoring, PAGA, Battery Charger) appear in the live
site's product menu but have no page of their own. They are rendered as a
ruled index carrying their real names and links and nothing else — no
fabricated specification.

## Design system

Everything lives in `app/globals.css`.

- **Ground** — near-black `#0a0c0f` as the primary surface, off-white
  `#f5f5f3` as the counter-ground. Sections opt in with `data-tone="light"`,
  which re-points `--bg`, `--fg`, `--hair` and friends; every component styles
  against those semantic tokens rather than raw colours.
- **Accent** — SMEC's own blue `#1257fd`, held back for CTAs, active states,
  data points and hairline details. No decorative gradients.
- **Type** — Inter Tight for display headlines (`clamp(42px, 8.4vw, 108px)` at
  the hero), Inter for running text, IBM Plex Mono for the `01 / ABOUT SMEC`
  micro-labels. Three variable/near-variable families, six weights total.
- **Detail** — 1px hairlines, 2px radii, section numbering, corner brackets on
  technical plates, a single inline-SVG grain layer (`.grain`) reused by every
  dark band.

## Page composition

```
hero · credentials          dark
01 about + EPC process      paper
02 systems · 03 in focus    dark
04 industries               paper
05 global presence          dark
06 assurance · clients      paper
corporate film · 07 R&D     dark
08 sustainability           paper
09 insights                 paper
10 careers · contact        dark
```

Routes: `/` (homepage), `/insights` (all seventeen articles), and `/<slug>`
for each product and article at the live site's own paths.

## Motion

No animation library. `components/motion/MotionRoot.tsx` mounts once and runs
the whole layer with one IntersectionObserver, one rAF-throttled scroll pass
and one delegated click handler; Lenis (3 kB) is dynamically imported after
paint for smooth scrolling and nothing else. Server components stay server
components and opt in with attributes:

```html
<div data-reveal="up" data-reveal-delay="120">   <!-- up | fade | mask | line | scale -->
<div data-parallax="0.12">                       <!-- sets --p, -1…1, while on screen -->
```

Two things worth knowing if you touch this:

- The `mask` wipe applies `clip-path` to the element's **children**, never to
  the observed element. A target clipped to zero area reports no intersection,
  so clipping it would stop its own reveal from ever firing.
- `MotionRoot` sweeps the geometry by hand 2.2s after mount and on
  `visibilitychange`, so a browser that never delivers intersection callbacks
  (a tab that has not painted, a prerender, a headless capture) still shows
  the page rather than a blank one.

Everything animates transform/opacity only. `prefers-reduced-motion: reduce`
short-circuits the whole layer — no observer is created, Lenis is not loaded,
and the CSS shows every element in its resting state.

## Notes for whoever picks this up

- **Scaffold photography.** `grep -rn SCAFFOLD app components lib` finds every
  placeholder; `document.querySelectorAll('[data-scaffold]')` finds them in
  the browser. The crew photograph is used twice — a portrait crop in About
  and a wide crop in Careers — because it is the only people picture
  available. Replace via `lib/scaffold.ts`.
- **Product plates.** The system photographs are studio cut-outs on white, so
  the catalogue sits them on flat white plates with `object-fit: contain`
  rather than cropping them into dark tiles. Card spans and plate ratios are
  paired in `components/Systems.tsx` so every row comes out level; change one
  and change the other.
- **The map.** Pin coordinates in `lib/siteData.ts` are the live site's own
  percentages and are calibrated to `public/images/map-blue-smecoilandgas.png`.
  Swapping the map image will move every pin.
- **The YouTube embed** is only inserted after the poster is clicked, so the
  page never pays for it up front.
