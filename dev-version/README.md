# SMEC Oil & Gas — prototype theme

The `../wireframe-version/` homepage plus a page per product, restyled to the
design system in `../reference/smec_website_prototype (5).html`. All copy comes
from `lib/siteData.ts` and nothing about the products is invented.
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
  layout.tsx        root layout + Google Fonts (Manrope, IBM Plex Mono)
  page.tsx          composes the homepage sections
  products/[slug]/  one prerendered detail page per product
  articles/[slug]/  one prerendered page per article
  globals.css       tokens + the prototype primitives (.wrap, .eyebrow, .btn,
                    .card, .section-head, .grid/.gN, .diagram-panel, .schematic,
                    .paper / .navy / .tight section variants)
  icon.png          favicon

components/
  Header.tsx            utility bar + sticky nav row, mega-menu, mobile drawer
  Hero.tsx              full-bleed photo hero + instrument panel
  ApprovedPartners.tsx  logostrip row on a paper band
  MajorProducts.tsx     8 cards in a g4 grid
  ProductCard.tsx       one product card, shared by the grid and detail pages
  ProductDetail.tsx     product page body: hero, variants, related products
  ArticleDetail.tsx     article page body: cover, long-form prose, more to read
  Stats.tsx             statrow with scroll-triggered count-up
  WhoWeAre.tsx          copy + three region tiles
  Entities.tsx          navy band: the UAE entity and the India hub side by side
  Certifications.tsx    four ISO cards
  Clients.tsx           logostrip grid
  GlobalPresence.tsx    navy band: full-width pin map, region tiles, country ticker
  RDFocus.tsx           full-bleed photographic band + numbered focus areas
  SolutionsServices.tsx paper split with click-to-play video
  Sustainability.tsx    navy band: copy card + tinted gallery tile
  Articles.tsx          card rail
  Footer.tsx            navy CTA strip + footgrid + mono bottom line
  FloatingWidgets.tsx   Quick Enquiry, WhatsApp, scroll-to-top
  Icons.tsx             inline SVG icon set
  ui/Logo.tsx           mark + mono word lock-up (real SMEC wordmark, reversed)
  ui/Breadcrumb.tsx     the prototype's breadcrumb strip
  ui/Eyebrow.tsx        numbered technical label — `01 / COMPANY`
  ui/Schematic.tsx      the prototype's wellhead → grid schematic SVG
  ui/Rail.tsx           reusable scroll-snap rail with arrows
  ui/Reveal.tsx         entrance reveal on scroll
  ui/SectionHeading.tsx eyebrow + title + body (.section-head)

lib/siteData.ts     all copy, links, image paths, map pin coordinates
lib/productDetails.ts  product page bodies, from the live product pages
lib/articles/       article bodies, from the live posts
public/             logos and images (same set as the wireframe build)
```

## Product pages

`/products/[slug]` renders a page per product, prerendered at build time from
`generateStaticParams`. The eight "Know More" links and the matching entries in
the Products mega-menu now resolve internally; nav entries with no product
record (Load Monitoring, PAGA, Battery Charger and the rest) still point at the
live site, so the menu is a mix by design.

**Copy is the live site's own**, taken from each product's page on
smecoilandgas.com and held in `lib/productDetails.ts`: the strapline, the body
paragraphs, the "Why SMEC?" list, any additional feature groups, and the
specification and certification tables. Nothing is invented — this is
safety-critical equipment, so no ratings, certifications or capability claims
are generated. The photograph, title and card tagline still come from
`lib/siteData.ts`, and Power House's VFD/SCR variants come from `navItems`.

Two deliberate edits to the source copy, both noted at the top of
`productDetails.ts`: headings are set in sentence case to match this build, and
"SPONTANIOUS"/"HASSELFREE" in the shared strapline are corrected — both are
typos on the live pages.

Layout adapts to how much a product has: a single feature list runs full width,
several sit two-up, and the spec table only renders where the source page has
one (Flare Boom Pilot Ignition and Gas Watch Panel).

## Article pages

`/articles/[slug]` does the same for all 17 posts in the Insights rail, again
prerendered at build time. Bodies live in `lib/articles/`, split across five
files by subject, and are keyed by slug.

Each body is a list of typed blocks — `h2`, `h3`, `p`, `ul`, `ol`, `quote` —
rather than raw HTML, so the prose picks up the site's own type scale and can
never inject markup. Copy is the site's own; headings are set in sentence case
to match this build, and hashtag blocks, share widgets and comment prompts are
dropped. Every page links out to the original post at the foot.

The reading column is capped at 760px, narrower than the rest of the site,
because 1580px line lengths are unreadable for long-form.

## Typography

Two faces, no more. **Manrope** carries everything structural and gets its
hierarchy from weight and size rather than from a second display face;
**IBM Plex Mono** carries anything that should read as data — eyebrows,
buttons, labels, captions, panel readouts.

| Token | Desktop | Weight | Used for |
| --- | --- | --- | --- |
| `--fs-display` | 44–68px | 800 | Hero headline only |
| `--fs-h2` | 28–38px | 700 | Section titles |
| `--fs-h2-sm` | 22–27px | 700 | Titles inside a card or panel |
| `--fs-h3` | 20–24px | 700 | Standalone headings |
| `--fs-card` | 18px | 600 | Card titles |
| `--fs-lead` | 17px | 400 | Intro copy |
| `--fs-body` | 16px | 400 | Paragraphs |
| `--fs-small` | 14px | 400 | Card body |
| `--fs-nav` | 14px | 500 | Navigation |
| `--fs-btn` | 13.5px | 600 | Buttons |
| `--fs-mono` / `--fs-mono-sm` | 11.5 / 10.5px | 500–600 | Labels and data |

Nothing sits below 400. Headings and paragraphs never share a line-height:
`--lh-tight` (1.06) sets headings, `--lh-body` (1.65) sets copy, and
`--measure` (620px) caps descriptive paragraphs so they never run a full
section wide.

Every size step is a `clamp()`, so the steps stay distinct at any width and
the per-breakpoint font overrides that used to collapse them are gone.
`--card-pad` drives both card padding and the negative margins that bleed card
images to the edge, so they cannot drift apart.

## Page width

`--wrap` is 1680px and `--gutter` is `clamp(20px, 2.8vw, 52px)`. The earlier
fixed 1320px column left roughly 200px of dead margin on each side of a
1728px display, which made the whole page read as a narrow box floating in the
middle. The gutter being a clamp also means there are no per-breakpoint gutter
overrides to keep in sync.

### Case

Uppercase is reserved for eyebrows, buttons, and technical metadata. Headings,
paragraphs, product names and navigation are sentence case — including two
strings the live site sets in caps, the hero subtitle and "Power Houses",
which at heading size read as shouting.

### Numbered eyebrows

Every chapter of the page carries `01 /`…`10 /` before its label, which is
what makes the sections read as one indexed document rather than a stack of
unrelated blocks. Strips rather than chapters — the partner row, the stats
band — pass no index and keep the plain rule instead.

## Page rhythm

Sections alternate ground so no two neighbours share one, reading down as
`bg → paper → bg → paper → navy → bg → paper → bg → navy → bg → paper →
navy → bg`. Order follows a narrative: who we are, the proof, where we
operate, then what we make. Products used to come before any of that.

The stats band is the page's mid-scroll anchor. It was a hairline strip with
26px figures despite carrying the strongest proof on the site; it now has its
own ground, a brand glow and figures on `--fs-display`'s neighbouring step.

## Accent discipline

Magenta and cyan were competing because the most-repeated element on the page,
the eyebrow, was magenta. The two accents now have jobs:

- **Cyan** carries information — eyebrows, section rules, labels, readouts,
  map pins for the two home locations, the hero's promise line.
- **Magenta** is reserved for action and emphasis — primary buttons, the card
  hover rule, the Quick Enquiry tab, the hero headline, and the single eyebrow
  that marks the contracting entity (`.eyebrow.hot`).

`.eyebrow` therefore defaults to the cool gradient; `.cool` is kept as an alias
so existing markup keeps working.

## Design system

Ported verbatim from the prototype's `:root` and primitives:

- **Ground** — `#0A0714` page, `#120B22` paper bands, `#1B1230` surfaces,
  `#150E28` utility/footer; fixed radial pink / cyan / violet glows behind
  everything
- **Lines** — `#2E2149` hairlines, square corners everywhere
- **Accents** — hot gradient (copper `#FF8A4C` → pink `#F72585` → plum
  `#7209B7`) and cool gradient (teal `#00F5D4` → cyan `#4CC9F0` → violet
  `#9B5DE5`), divided by job as described under Accent discipline above
- **Type** — Space Grotesk for headings, Inter for body, IBM Plex Mono
  (uppercase, tracked) for eyebrows, buttons, nav, labels and captions
- **Hover** — cards lift 3px with a violet shadow and a gradient top bar;
  ghost buttons and tiles glow cyan

## Entity positioning

The UAE entity is the one clients contract with, so it leads everywhere it
appears; the India hub is shown as the engineering and manufacturing capability
behind it rather than a second front door. Both are named in four places (the
hero carried a fifth, dropped in the design-review pass to declutter it — the
utility bar directly above it already names both):

| Place | UAE | India |
| --- | --- | --- |
| Utility bar | Named first | Follows after a middot; hidden under 1180px so the UAE half is never the part that clips |
| `Entities` section | First card, permanent gradient rule, magenta eyebrow, map crop on Abu Dhabi, full address | Second card, cyan eyebrow, map crop on Kochi, links to smecautomation.com |
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
- **Product shots** — white cut-outs of often-white equipment. On a near-white
  plate the whole tile read as blank at any reduced scale, so the plate is a
  deeper cool gradient, the image multiplies onto it, and a vignette gives
  white equipment an edge.
- **Certificates** — a full A4 page scaled to thumbnail size is a white
  rectangle. Each card crops to the printed header instead, and leads with the
  standard and its scope.
- **Client and partner marks** — inverted and lighten-blended. They were also
  at 0.75 opacity, which disappeared in a scaled-down view; they now sit at
  0.95 with a brightness lift.
- **Map** — the saved dotted map is grey-on-white; the same invert + lighten
  treatment makes it a pale dot field. Pin coordinates are unchanged from the
  reference. Pins are drawn as the schematic's copper nodes.
- **Sustainability artwork** — the one green moment on a violet page, so its
  tint is deliberately light. Muddying it toward the palette defeats the point.

## Photography

Three large assets carry the page, run full-bleed the way the wireframe build
used them rather than boxed into tiles:

| Asset | Where | Why there |
| --- | --- | --- |
| `Oil-and-gas-Banner.webp` (1920×581) | Hero background | Its sunset runs violet → pink → copper, which is the theme's own palette. It was sitting unused while the hero had no photograph at all. |
| `SMECoilandhasbanner-3.webp` (1920×720) | R&D Focus, full-bleed band | A near-black night refinery, which is the one photo that needs no darkening to sit on this page. It was being shown in a 300px tile. |
| `SMEoilandgas-green-3.webp` (1200×660) | Sustainability, larger half of the split | Semantic green; given the dominant share of its section. |

Each photographic band pairs the image with a scrim that does two jobs: it
holds the copy at readable contrast and tints the photograph violet so it
joins the palette. The scrims are weighted **horizontally** on desktop, where
copy sits in the left column, and switch to **vertical** under 900px, where
the copy spans the full width and a side-weighted scrim would leave text on
the lit parts of the image.

**Note on `next.config.mjs`.** `turbopack.root` is pinned to this directory
because an unrelated empty `package-lock.json` sits one level up, which would
otherwise be inferred as the workspace root.
