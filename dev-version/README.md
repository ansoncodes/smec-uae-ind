# SMEC Oil & Gas — light SaaS theme

The same page as `../wireframe-version/`, rebuilt with a light SaaS visual
language. Content, copy, links, images and section order are unchanged; only the
design system differs. `../wireframe-version/` and `../reference/` are untouched.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Structure

```
app/
  layout.tsx        root layout + Google Fonts (Inter, Plus Jakarta Sans)
  page.tsx          composes the sections
  globals.css       design tokens, layout primitives, buttons, cards
  icon.png          favicon

components/
  Header.tsx            sticky translucent header, dropdowns, mobile drawer
  Hero.tsx              light hero with gradient glows and a badge card
  ApprovedPartners.tsx  logo cloud
  MajorProducts.tsx     8-card product grid
  Stats.tsx             stat panel with scroll-triggered count-up
  WhoWeAre.tsx          centred about block + capability chips
  Certifications.tsx    four ISO certificate cards
  Clients.tsx           continuous logo marquee
  GlobalPresence.tsx    pin map card + country marquee
  RDFocus.tsx           tinted feature panel
  SolutionsServices.tsx split section with click-to-play video
  Sustainability.tsx    gradient panel + image
  Articles.tsx          scroll-snapped article rail
  Footer.tsx            closing CTA + footer columns + bottom bar
  FloatingWidgets.tsx   Quick Enquiry, WhatsApp, scroll-to-top
  Icons.tsx             inline SVG icon set
  ui/Rail.tsx           reusable scroll-snap rail with arrows
  ui/SectionHeading.tsx eyebrow + title + body

lib/siteData.ts     all copy, links, image paths, map pin coordinates
public/             logos and images (same set as the wireframe build)
```

## Design system

Defined as tokens in `app/globals.css`:

- **Surfaces** — `#ffffff` / `#f7f9fc` / `#eef2f9`, hairline borders at `#e5eaf2`
- **Brand** — the SMEC navy `#003582` anchors a nine-step blue ramp; the brand
  teal `#00a99d` is the single secondary accent
- **Type** — Plus Jakarta Sans for headings (tight tracking), Inter for body
- **Elevation** — four blue-tinted shadow steps; cards lift on hover
- **Shape** — 8/12/18/26 px radii plus a pill for buttons and chips

## What changed from the wireframe build

Content is identical. These are presentation decisions:

| Wireframe | Here | Why |
| --- | --- | --- |
| Two navs — transparent over the hero, plus a second bar that appeared on scroll, both with the same menu | One sticky header that condenses on scroll | A repeated nav reads as a bug in a SaaS layout; every link from both is kept |
| Dark photographic hero | Light hero: white ground, soft brand glows, faint grid, badge card | The theme is light throughout |
| Products in a 4-up autoplay carousel | 8-card grid | Shows the whole catalogue at once |
| Client logos in a stepped 9-up swiper | Continuous marquee with edge fades | Standard for a long client list |
| Articles as full-bleed cards with captions overlaid on darkened images | Scroll-snapped rail, image above a white card body | Keeps headlines legible on a light page |
| Navy side-label panels ("Approved Partners", "Our Clients", "Our Certifications") | Section headings with eyebrow chips | Consistent section rhythm |
| Dark parallax R&D band, navy Solutions band, navy→green Sustainability band | Tinted light panels using the same gradient directions | Same structure, light palette |
| Quick Enquiry as a vertical side tab | Side tab on desktop, bottom-left pill under 768px | The vertical tab covered body text on narrow screens |

**Small additions.** The SaaS layout needs a little scaffolding the reference
did not have: one-or-two-word eyebrow chips above section titles ("Product
suite", "Accredited", "Trusted by", "Insights"), a closing CTA block in the
footer, and short labels assembled from existing copy — the hero's capability
card ("Onshore & offshore rigs" / "Design · Build · Install · Commission"), the
"Who We Are" capability chips, and the ISO standard names read off the
certificate artwork. No claims beyond what the reference page already states.

**Missing background images.** As in the wireframe build, the reference's hero
photo, R&D banner and video poster were never saved with the page. Here they are
replaced by light gradient treatments rather than dark ones, so nothing needs
swapping unless the originals turn up.

**Map.** `public/images/misc/map-base.png` (the saved map with its printed pins
removed) backs the desktop pin map; the pin coordinates and their hover labels
come straight from the reference. The untouched `map-final-1024x500.png` is the
tablet/mobile image.

**Note on `next.config.mjs`.** `turbopack.root` is pinned to this directory
because an unrelated empty `package-lock.json` sits one level up, which would
otherwise be inferred as the workspace root.
