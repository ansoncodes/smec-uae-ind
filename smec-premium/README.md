# smec-premium

The SMEC Oil & Gas website: Next.js 16, React 19 and TypeScript. It replaces
the WordPress site on smecoilandgas.com on the same domain, so every old URL
either keeps working or redirects in one hop.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 127 prerendered pages
npm run start    # serve the build
```

## Where the content comes from

Nothing here is invented copy. The client's documents are the source of truth
for wording; a page that reads badly is a question for SMEC, not something to
fix in code.

| File | Holds |
| --- | --- |
| `docs/source/SMEC_Website_Content_Master_2026_V3_DEEP_CONTENT.md`, `docs/source/prototypes/` | The client's copy for every solution, product, digital, industry, resource and company page |
| `lib/spec/pages.generated.ts` | That copy as typed page data, written by `node scripts/build-spec-content.mjs`. **Generated — never hand-edit it**; change the sources and re-run the script |
| `lib/homepage.ts` | The homepage copy, from the client's 18 October homepage document |
| `lib/navigation.ts` | The header's six tabs and their mega menus |
| `lib/regions.ts`, `lib/siteData.ts` | The two regional teams (Middle East & International, India) and their contact details |
| `lib/landingPages.ts` | The two smec.in landing pages the client asked the site to link |
| `lib/redirects.mjs`, `lib/legacy-assets.mjs` | Every legacy URL from the old site |

**Publication gate.** Every generated page is `approved` or `draft`. A draft
still renders (200), but with `noindex, follow`, and is left out of the
sitemap. A page is a draft while its content waits on SMEC or on engineering
sign-off, or while it makes a safety-critical claim (SIL, ATEX, IECEx, Ex
ratings, explosion-proof, intrinsically safe, functional safety) that an
engineer has not approved. The homepage has no gate, so its copy must not
make those claims.

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

## Homepage

The sections of the client's homepage document, in her order, with her
section titles as the H2s: hero and credentials, who we are, clients and
registrations, engineering solutions, systems and products, digitalisation,
industries, quality and certifications, about, the corporate film, training,
the engineering knowledge library, the SMEC EDGE newsletter, FAQs, and the
final RFQ with its region chooser. The newsletter stays off the page until
Mailchimp is configured.

## Routes

127 prerendered pages, all with a trailing slash.

| Route | Pages |
| --- | --- |
| `/` | the homepage |
| `/solutions/…` | 16 |
| `/products/…` | 34 |
| `/digital/…` | 7 |
| `/industries/…`, `/customers/…`, `/markets/…` | 21, 8 and 2 |
| `/resources/…` | 23 |
| `/company/…` | 11 |
| `/contact/` | the RFQ form |
| `/privacy-policy/`, `/research-and-developement/`, `/sustainability/` | old pages kept at their old paths; SMEC has still to decide on the last two |

**Legacy URLs.** Every page the old site published either keeps its path or
redirects to its new home in one hop, with or without the trailing slash. Its uploads are served
unchanged from `public/wp-content/uploads/`, except those whose URLs redirect,
because Next checks redirects before public files.

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

## Deploying

- **Variables.** `.env.example` lists every variable and what it does.
  Production needs `NEXT_PUBLIC_SITE_URL=https://smecoilandgas.com`,
  `NEXT_PUBLIC_SITE_ENV=production`, the lead API URL and key, and the
  analytics IDs. `NEXT_PUBLIC_*` values are fixed at build time, so change
  them and redeploy.
- **Environments.** Today the Vercel project `smec-premium` deploys `main` to
  `smec-premium.vercel.app` and builds a preview of every other branch behind
  Vercel sign-in. Any `*.vercel.app` host is sent `X-Robots-Tag: noindex`
  (`next.config.mjs`), so none of them competes with the real domain. Where
  production is hosted is still for SMEC to confirm (Developer Brief §7).
- **Cutover.** The domain's DNS is on Cloudflare, so going live is pointing
  smecoilandgas.com at the production deployment, and rolling back is
  pointing it back. Mail runs on smecong.com, so cutover cannot affect it.
  Afterwards, submit the sitemap in Search Console and run `npm run indexnow`
  with `INDEXNOW_KEY` set.
- **Rollback.** Vercel keeps every deployment; promote the previous one.
- **Backups.** The site has no database: the repository holds all its code
  and content. Enquiries live in the Django lead system behind
  `LEAD_API_URL`. That repository's `PRODUCTION.md` sets out nightly database
  backups kept for 14 days; confirm they are switched on before launch.

## Notes for whoever picks this up

- **The RFQ form** (`components/rfq/RfqForm.tsx`) posts to
  `app/api/rfq/route.ts`, which validates, rate-limits and forwards the
  enquiry to the lead API with a server-only key, choosing the key by region.
  The success message shows the lead system's `SMEC-RFQ-…` reference whenever
  the API returns one.
- **Analytics** load only after a visitor accepts the consent banner
  (`lib/consent.ts`, `lib/tags.ts`). `lib/analytics.ts` holds the event names
  and never sends form contents.
- **Sections no longer on the homepage.** Asset Brief, Innovation,
  Sustainability, Careers, Global Reach and Systems are not rendered, because
  the client's homepage document leaves them out. Their files are kept so each
  can return in one line if she asks. Careers still holds the last stock
  photograph (`lib/scaffold.ts`).
- **The YouTube embed** is only inserted after the poster is clicked, so the
  page never pays for it up front.
