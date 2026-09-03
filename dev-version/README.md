# SMEC Oil & Gas — prototype theme

The same page as `../wireframe-version/`, restyled to the design system in
`../reference/smec_website_prototype (5).html`. Content, copy, links, images
and section order are unchanged; only the presentation differs.
`../wireframe-version/` and `../reference/` are untouched.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Structure

```
app/
  layout.tsx        root layout + Google Fonts (Space Grotesk, Inter, IBM Plex Mono)
  page.tsx          composes the sections
  globals.css       tokens + the prototype primitives (.wrap, .eyebrow, .btn,
                    .card, .section-head, .grid/.gN, .diagram-panel, .schematic,
                    .paper / .navy / .tight section variants)
  icon.png          favicon

components/
  Header.tsx            utility bar + sticky nav row, mega-menu, mobile drawer
  Hero.tsx              two-column hero: gradient heading, CTAs, diagram panel
  ApprovedPartners.tsx  logostrip row on a paper band
  MajorProducts.tsx     8 cards in a g4 grid
  Stats.tsx             statrow with scroll-triggered count-up
  WhoWeAre.tsx          copy + three region tiles
  Entities.tsx          navy band: the UAE entity and the India hub side by side
  Certifications.tsx    four ISO cards
  Clients.tsx           logostrip grid
  GlobalPresence.tsx    navy band: pin map in a diagram panel + region tiles + ticker
  RDFocus.tsx           copy + tinted gallery tile
  SolutionsServices.tsx paper split with click-to-play video
  Sustainability.tsx    navy band: copy card + tinted gallery tile
  Articles.tsx          card rail
  Footer.tsx            navy CTA strip + footgrid + mono bottom line
  FloatingWidgets.tsx   Quick Enquiry, WhatsApp, scroll-to-top
  Icons.tsx             inline SVG icon set
  ui/Logo.tsx           mark + mono word lock-up (real SMEC wordmark, reversed)
  ui/Schematic.tsx      the prototype's wellhead → grid schematic SVG
  ui/Rail.tsx           reusable scroll-snap rail with arrows
  ui/Reveal.tsx         entrance reveal on scroll
  ui/SectionHeading.tsx eyebrow + title + body (.section-head)

lib/siteData.ts     all copy, links, image paths, map pin coordinates
public/             logos and images (same set as the wireframe build)
```

## Design system

Ported verbatim from the prototype's `:root` and primitives:

- **Ground** — `#0A0714` page, `#120B22` paper bands, `#1B1230` surfaces,
  `#150E28` utility/footer; fixed radial pink / cyan / violet glows behind
  everything
- **Lines** — `#2E2149` hairlines, square corners everywhere
- **Accents** — hot gradient (copper `#FF8A4C` → pink `#F72585` → plum
  `#7209B7`) for eyebrows, primary buttons, card hover bars and the `.navy`
  band's top rule; cool gradient (teal → cyan `#4CC9F0` → violet `#9B5DE5`)
  for stat figures and secondary eyebrows
- **Type** — Space Grotesk for headings, Inter for body, IBM Plex Mono
  (uppercase, tracked) for eyebrows, buttons, nav, labels and captions
- **Hover** — cards lift 3px with a violet shadow and a gradient top bar;
  ghost buttons and tiles glow cyan

## Entity positioning

The UAE entity is the one clients contract with, so it leads everywhere it
appears; the India hub is shown as the engineering and manufacturing capability
behind it rather than a second front door. Both are named in five places:

| Place | UAE | India |
| --- | --- | --- |
| Utility bar | Named first | Follows after a middot; hidden under 1180px so the UAE half is never the part that clips |
| Hero | First entity line, hot gradient dash | Second line, cool gradient dash |
| `Entities` section | First card, permanent gradient rule, full address | Second card, cool eyebrow, links to smecautomation.com |
| Global presence map | `UAE` → Headquarters, `ABU DHABI` → Registered office | `INDIA` → Engineering hub; all three tiles get a cyan border and label |
| Footer | First address block | Second block under "Engineering & manufacturing hub" |

Copy for the `Entities` section is the reference prototype's "Two locations.
One engineering standard." block, which carries the same split. Everything
else in `lib/siteData.ts` still comes from the live site.

## Notes on the assets

The prototype is dark; most of the saved assets were made for a white page.

- **Logo** — the navy SMEC wordmark is reversed to white with a CSS filter and
  set in the prototype's mark + mono word lock-up.
- **Partner and client logos** — inverted, desaturated and lighten-blended so
  their white plates drop into the surface and only a monochrome mark
  remains, matching the prototype's mono logostrips.
- **Product shots and certificates** — cut-outs on white, so they sit on a
  light plate inset in the dark card.
- **Map** — the saved dotted map is grey-on-white; the same invert + lighten
  treatment makes it a pale dot field. Pin coordinates are unchanged from the
  reference. Pins are drawn as the schematic's copper nodes.
- **R&D and sustainability photos** — shown as gallery tiles under the
  prototype's hot / cool gradient tints.

**Note on `next.config.mjs`.** `turbopack.root` is pinned to this directory
because an unrelated empty `package-lock.json` sits one level up, which would
otherwise be inferred as the workspace root.
