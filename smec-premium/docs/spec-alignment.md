# Spec alignment — smec-premium

What has to change in this build to satisfy the three 2026 handover documents:

| Document | Owns |
| --- | --- |
| Website Content Master 2026 V3 (deep content) | Page inventory, URLs, titles/meta, H1s, answer blocks, FAQs, RFQ wording |
| Technical, SEO, GEO & AI Master 2026 | Architecture, rendering, schema, indexation, redirects, performance, a11y, security, analytics |
| Developer Handover Brief 2026 | Build decisions, assets, integrations, responsibilities, UAT, acceptance |

Where they conflict, the order above is the source-of-truth order the brief sets.
Anything marked **SMEC** is not ours to close.

Status keys: `[ ]` open · `[x]` done · `[~]` partially done · `[S]` under an hour ·
`[M]` half a day · `[L]` multi-day.

---

## 0. Decisions still open — SMEC

> These are written up for SMEC, with what each one blocks, in
> [`questions-for-smec.md`](./questions-for-smec.md).
 (everything else waits on 0.1 and 0.2)

- [~] **0.1 Production domain — expected to be `smecoilandgas.com`** (client,
      unconfirmed). The build already defaults to it, so canonicals, the sitemap,
      schema `@id`s and social-card URLs are correct as they stand.

      What follows from it being the *same* domain as the current site, rather than
      a new one:

      - The redirect map is live from the first request, because this build serves
        the paths the old site serves. Already tested: every live URL is one 301 to
        a 200.
      - `/cart`, `/checkout`, `/my-account`, `/thank-you`, `/sample-page`, `/hi` and
        `/test` start returning 404 on a domain where they currently return 200.
        That is the intent (§9: a true 404 rather than a soft landing), but it is a
        visible change on a live domain, so it should be a decision rather than a
        surprise.
      - **Legacy `/wp-content/` assets break.** Every image and PDF indexed or
        linked at `https://smecoilandgas.com/wp-content/uploads/...` will 404 after
        cutover, because those paths do not exist in this build. §9 requires
        valuable legacy assets to be preserved or redirected. This is the
        inventory in 4.4 of the question list, and it now has a deadline.
      - Staging cannot share the domain. It needs its own host or subdomain with
        authentication (1.9), and production must not inherit its noindex.
      - There is no DNS move to a new name, so the cutover is a hosting change on
        one domain — which means no window where both sites are reachable, and no
        way to soft-launch. Worth planning as a single switch with a rollback.

      Original note: no document names one. Drives canonicals, sitemap,
      schema `@id`s, OG URLs. **SMEC**
- [ ] **0.2 Content source.** The brief requires non-technical editing of title, meta,
      H1, answer block, FAQs and CTAs, with a Draft → Engineering Review → Corporate
      Review → Approved → Published workflow. Today content is typed data in `lib/`,
      editable only by a developer. Options: keep in-repo (SMEC sends copy), Payload
      self-hosted, or Sanity. **SMEC + dev**
- [ ] 0.3 Hosting, repository owner, environments (staging must be protected). **SMEC**
- [ ] 0.4 Sales/RFQ destination: mailbox or CRM, phone, WhatsApp number. **SMEC**
- [ ] 0.5 GA4 / GTM / Search Console / Bing ownership and IDs. **SMEC**
- [ ] 0.6 Brand assets: logo files, licensed fonts, real photography (replaces
      `lib/scaffold.ts`), product renders, diagrams. **SMEC**
- [ ] 0.7 Approved datasheets for every numerical product claim — 16 of the 30 product
      pages in the Content Master ship with placeholder parameters. **SMEC**
- [ ] 0.8 Approved certifications, OEM authorisations, client names/logos, leadership
      bios, MD message, office/entity details. **SMEC**
- [ ] 0.9 Privacy policy, cookie/consent wording, form consent text, data-retention
      statement for uploaded RFQ files. **SMEC**
- [ ] 0.10 English-only launch confirmed (no hreflang until real variants exist). **SMEC**
- [ ] 0.11 Orphans: the spec has no home for `/sustainability`, `/research-and-developement`
      (ADAM-Edge), `/employee-training`, or the ADIPEC event pages, and drops the marine /
      defence / industrial verticals. Keep as extra pages or retire? **SMEC**

---

## 1. Blocking for launch

- [x] **1.1 Re-cut routes to the locked architecture** — done. Eight sections, each
      an optional catch-all prerendering its hub and children from the Content
      Master; 105 URLs, 91 indexable. The 14 product pages and 15 articles this
      build already had keep their design and depth at their new addresses
      (`lib/spec/legacy.ts`). The old routes (`app/[slug]`, `about-us`, `careers`,
      `contact-us`, `insights`, `solutions-and-services`) are deleted.
      `app/`, `lib/spec/` `[L]`
- [x] **1.2 `trailingSlash: true`** — the URL lock requires trailing slashes.
      `next.config.mjs` `[S]`
- [x] **1.3 Redirect map wired** — done, with 1.1. `lib/redirects.mjs` (moved from
      `.ts` so the config and the app share one copy) is served by
      `next.config.mjs`. Verified against a running server: every live URL is a
      single 301 to a 200, including the 15 posts. `statusCode: 301` rather than
      `permanent: true`, which emits a 308. Requests to the unslashed form of an old
      URL take the `trailingSlash` 308 first and then the 301 — inherent to
      `trailingSlash: true`, and the live site's own URLs are the slashed form. `[M]`
- [x] **1.4 RFQ form** — done. `components/rfq/RfqForm.tsx` posts to
      `app/api/rfq/route.ts`, which validates again and forwards to the lead API.
      All six field groups from §18; four fields required, the rest optional, as
      "progressive qualification" asks. Uploads accept the nine document types with
      the count, size and extension rules copied from the backend's own validator.
      On-page success state, no query strings (§9). The campaign key is
      `LEAD_API_KEY`, server-side only — verified absent from the client bundle.
      Rate limited per IP: 8 accepted submissions and 40 requests per 10 minutes,
      counted separately so a visitor fixing a typo is not locked out. Honeypot
      kept. Tested against a local instance of the real backend: validation,
      honeypot, oversize and wrong-type files, the limiter, and a full submission
      with attachments arriving complete in the dashboard's data model.
      Still needs 0.4 (the destination mailbox or CRM) and 0.9 (the consent
      wording, currently a plain-English placeholder). `[L]`

      One consequence for 0.3: the handler needs a Node runtime. Static-only
      hosting would mean posting to the lead API from the browser with the key
      public, losing the server-side validation and the limiter.
- [~] **1.5 Analytics** — events and consent are built; only the container ID is
      missing (0.5). `lib/consent.ts` holds the visitor's choice, `track()` queues
      events until it is made and discards them if consent is refused, and
      `components/analytics/ConsentBanner.tsx` asks once, with stand-in wording for
      legal to replace (0.9). It is fixed to the viewport, so CLS stays 0.000, and
      Decline is the same size as Accept.
      Original note: the eleven events are emitted (`lib/analytics.ts`, plus
      `components/analytics/ConversionEvents.tsx`, which reads clicks off the
      document so every phone, email, WhatsApp and RFQ link is counted without
      per-component wiring). They push onto `window.dataLayer` and stop: no GA4 or
      GTM container until SMEC provides the ID (0.5). No field values, enquiry text
      or file contents are sent, per §19.
      Original note: none exists. Eleven named events required: `rfq_submit`,
      `rfq_file_upload`, `cta_talk_engineer`, `click_phone`, `click_whatsapp`,
      `click_email`, `datasheet_download`, `case_study_view`, `product_to_rfq`,
      `solution_to_rfq`, `form_error`. No RFQ text or file contents may reach
      analytics. Needs 0.5. `[L]`
- [x] **1.6 `app/robots.ts`** — allow crawling in production, disallow everywhere else,
      reference the sitemap. `[S]`
- [x] **1.7 `app/sitemap.ts`** — canonical, indexable, 200-status URLs only. `[M]`
- [x] **1.8 `app/not-found.tsx`** — real 404 with navigation. `[S]`
- [ ] **1.9 Staging protection** — password or auth in front of non-production
      environments; `robots.ts` noindex alone is not enough. Needs 0.3. `[M]`
- [x] **1.10 Per-page noindex for unapproved content** — the content model needs a
      publication status that drives both noindex and sitemap exclusion. Done:
      14 pages are generated as drafts with their reason recorded — 5 company
      pages needing SMEC facts, 5 safety-critical products needing engineering
      sign-off, 4 empty resource collections. `[M]`
- [x] **1.11 Environment-driven site URL** — `SITE.url` was hardcoded to
      `https://smecoilandgas.com`, so every canonical pointed at the old site. Now
      reads `NEXT_PUBLIC_SITE_URL`. Set it once 0.1 lands. `[S]`
- [x] **1.12 Unverified EPC claim** — "SMEC is a complete EPC company"
      (`lib/siteData.ts` `WHO_WE_ARE`, `components/SiteFooter.tsx:45`) and
      "multinational EPC organisation" (`lib/companyPages.ts:44,51`). The spec: do not
      describe SMEC as the full EPC contractor unless that contractual responsibility
      is verified. Replaced with the Content Master's /company/about/ positioning, verbatim. Also struck from the about-us meta description, the about-us body and the R&D paragraph. `[S]`
- [x] **1.13 Garbled homepage copy** — the same `WHO_WE_ARE` paragraph ends
      "system integration of the leading OEMs in the  bulbs our strength", inherited
      verbatim from WordPress. Gone with 1.12. `[S]`
- [ ] **1.14 Gated assets are published** — 14 client logos (`Clients.tsx`),
      TAQA/SNOC/DEWA partner marks (`Credentials.tsx`), certificate scans
      (`Certifications.tsx`), the ADNOC ICV badge and the 25 years / 10 countries /
      500 employees / 10,000 projects counters (`siteData.ts`). Hide until 0.8. `[M]`
- [ ] **1.15 Placeholder photography** — `lib/scaffold.ts` and the seven
      `SCAFFOLD-*.jpg` files are stock imagery standing in for client assets, used on
      About, Careers, the company pages and all five industry panels. Needs 0.6. `[M]`
- [x] **1.16 Links that still point at the old site** — done. `localHref()` now
      resolves every old path through the redirect map, so internal links land on the
      canonical URL instead of taking a 301. The "Read the original" link is gone:
      the article's original address redirects to the page it was on. `[M]`

---

## 2. Required by the spec

- [x] 2.1 Rebuild the sitewide Organization JSON-LD — done. One `Organization` at
      `#organization` (legal entity, Abu Dhabi address, sales contact point, the four
      social profiles, the logo from `/public`) and the `WebSite` that belongs to it.
      The Person hybrid, the `/wp-content/` logo, the fake `?s=` SearchAction and the
      hardcoded page dates are gone, and the conflicting second Organization went
      with `app/contact-us/`. Nothing about certifications, headcount or founding
      date is asserted (0.7, 0.8). `app/layout.tsx` `[M]`
- [x] 2.1b Global navigation rebuilt around the locked architecture
      (`lib/navigation.ts`): Products, Solutions, Industries, Digital, Resources,
      Company, Contact, with Industries carrying by-asset, by-customer and
      by-region so no section is unreachable from the header. Every destination is
      checked against the generated page set at module load, and the footer lists
      the same sections. Verified by crawling the rendered pages: 102 distinct
      internal links, all 200, none taking a redirect. `[M]`
- [x] 2.2 `BreadcrumbList` JSON-LD on every indexable non-home page — visible
      breadcrumbs already exist (`components/ui/Breadcrumb.tsx`). `[S]`
- [x] 2.3 Breadcrumb trails must point at real hubs, not `/#systems` fragments
      (`app/[slug]/page.tsx:111`). Comes with 1.1. `[S]`
- [~] 2.4 Schema types, all generated from visible content. Done: `Product`,
      `Service`, `SoftwareApplication`, `CollectionPage`, `FAQPage`, `Article`,
      `BreadcrumbList`, `Organization`, `WebSite`, and `DefinedTermSet` with 46
      `DefinedTerm` entries on the glossary — each term taken from the page that
      owns it, so a definition cannot drift from the product it describes.

      `Person` and `JobPosting` are wired (`lib/people.ts`) and emit nothing,
      because both need facts SMEC has not approved: names and roles for leadership
      and the MD, live vacancies for careers (0.8). Fill the two lists and the
      markup appears. Nothing is invented to satisfy a validator. `[L]`
- [~] 2.5 `Article` schema emits ISO `datePublished` where the article carries a
      date and omits it where none exists rather than inventing one; 12 of 15 have
      one. `dateModified` needs the editing source (0.2).
      Original note: `Article` schema needs ISO `datePublished`/`dateModified`; `lib/articles/*`
      carry dates as prose. `[S]`
- [x] 2.6 Answer blocks: 2–3 factual sentences directly under every H1, able to stand
      alone in search results. Done on all 105 pages, the homepage included. `[M]`
- [~] 2.7 FAQs: 48 URLs render approved copy. Drafts for the 37 buyer-facing pages
      without any are in `docs/faq-drafts.md` — 123 questions, of which 16 answers
      need an engineer because the page does not say enough to answer honestly. A
      review document, not content: §32 forbids rendering unapproved FAQ copy or its
      schema. Company and resource pages are deliberately excluded; §6 asks for FAQs
      on product, solution and industry pages.
      Original note: one block exists sitewide (about-us). The spec wants 3–6 visible
      questions on the homepage, Turnkey, E-House, migration and priority product
      pages. Done: the 48 URLs with approved FAQ copy render them, and FAQPage
      schema is emitted only where the questions are visible — no page claims
      FAQPage without them. The other 57 URLs need SMEC to write questions; the
      homepage's three are written but not yet rendered on it. `[L]`
- [x] 2.8 OG/Twitter images — done. `app/api/og/route.tsx` draws a 1200×630 card
      per URL from that page's own record: section, H1 and answer on the ink ground.
      Absolute URL with dimensions and alt, as §21 asks. Next's `opengraph-image`
      file convention could not be used — every section is an optional catch-all and
      a catch-all must be the last segment of its route — so the endpoint takes the
      path instead and caches for a day. `[M]`
- [x] 2.9 Homepage title and description are now the Content Master's
      ("Oil & Gas Engineering, E&I & Automation | SMEC"), and the H1 is the locked
      "Engineering Critical Energy Assets" with the approved answer sentence under
      it. No `title.template`: the document specifies the full title tag per URL, and
      a template would append a second suffix to the ones that already carry "| SMEC".
      `lib/siteData.ts`, `components/Hero.tsx` `[S]`
- [x] 2.10 Security headers: nosniff, Referrer-Policy, frame protection,
      Permissions-Policy. HSTS and CSP belong at the edge once the host is known
      (0.3). `next.config.mjs` `[S]`
- [x] 2.11 AVIF alongside WebP. `next.config.mjs` `[S]`
- [x] 2.12 Accessibility — WCAG 2.2 AA is the acceptance baseline. All four
      items below are closed; a full audit against the standard is still worth
      running before launch.
    - [x] Closed mobile drawer keeps ~30 links in the tab order
          (`SiteHeader.module.css` used only `opacity`/`pointer-events`; now `visibility`, delayed so the fade still plays). `[S]`
    - [x] `aria-hidden` on the utility rail whose links stay focusable
          (`SiteHeader.tsx`) — now `inert`, which hides it and removes focus. `[S]`
    - [x] Drawer and mega menu: the drawer is `role="dialog"` with `aria-modal`,
          `inert` while closed, a Tab cycle that stays inside it, and focus that
          returns to the burger on close. Each mega trigger declares
          `aria-controls`; Down opens its panel and moves into it, Escape closes
          and returns focus, and tabbing out closes it. `[M]`
    - [x] Form error messaging: the RFQ form has per-field messages tied with
          `aria-describedby`, `aria-invalid` on the field, and an error summary
          that takes focus and links to each field. `[M]`
- [x] 2.15 Core Web Vitals measured (§16, §26, and a required UAT row): Slow 4G,
      4x CPU, 360x800, cold cache, on home, a product, a solution, an article, the
      RFQ page and a hub. LCP 0.9-1.3s, CLS 0.000 everywhere, TBT 0-190ms — all
      inside "good". `MotionRoot` and `ConversionEvents` load as their own chunk so
      they stop competing with the header's hydration. Re-measure on the real host
      before launch; a lab figure is not field data. `[M]`
- [x] 2.16 CSP, in report-only (§20). Enforcing a policy written before the analytics
      container, the consent tool and the host are known would block one of them on
      launch day. This is the policy the site needs today, so switching to enforcing
      is a one-word change once the reports are clean. HSTS belongs at the edge
      (0.3). `next.config.mjs` `[S]`
- [x] 2.17 IndexNow (§24): `scripts/indexnow.mjs` submits the URLs you name, or the
      whole sitemap with `--all` for a launch. Dormant until `INDEXNOW_KEY` exists;
      `app/indexnow-key/` serves the key file and needs one rewrite rule from the
      host. `[S]`
- [x] 2.18 Evidence component (§12 row 9, Brief §6): `lib/evidence.ts` and the card on
      every spec page, with `CreativeWork` generated from the visible card. Empty
      until a project is approved (0.8) — the site had nowhere to put approved
      evidence even when it arrived. `[M]`
- [x] 2.19 Checklists and calculators (§23), two of each, rendering on their pages:
      UPS/DC battery autonomy, generator and transformer loading, the E-House enquiry
      checklist, the control-system migration readiness checklist. Each carries the
      formula, units, assumptions, limitations and engineering-review statement §23
      requires. Engineering utilities rather than company claims, so the gate is an
      engineer's review, not SMEC facts. Both pages stay noindex until that review.
      `[M]`
- [x] 2.13 Descriptive image filenames — done. 41 files renamed: every client and
      accreditation mark (`1.png` → `accreditation-nielit.png`, `6.png` →
      `client-shelf-drilling.png`), the ADNOC ICV badge, the partner marks that
      carried CDN hashes, and the article artwork (`1111.png`, `second-blog.png`).
      No numbered image files remain and every reference resolves. `[M]`
- [x] 2.14 Client and accreditation marks now carry the name of the organisation
      they belong to, identified from the artwork itself. The marquee duplicates each
      strip to loop, so only the first pass is named and the copy stays `alt=""`.
      Original note: Client logos carry `alt=""` (`Clients.tsx:41`) — identity lost for assistive
      technology even once the section is approved. `[S]`

---

## 3. Worth fixing while in there

- [x] 3.1 One preload per page, and it is the page's own hero — verified across
      the built HTML. The header logo no longer preloads (it sits at the top of the
      document and is fetched immediately anyway), and the two homepage system cards
      that were marked `loading="eager"` are lazy: eager emits a preload link too,
      which is how section 02 was competing with the hero. `[S]`
- [x] 3.2 The blurred plate behind every article cover and card was a second copy
      of the same artwork — two requests each, for decoration. It is drawn in CSS
      now; an article page fetches its cover once.
      Original note: Duplicate blurred backdrop images double requests per card
      (`insights/page.tsx:57-65`, `ArticleDetail.tsx:78-83,145-152`). `[S]`
- [x] 3.3 Lenis is gone, with its dependency. It eased every scroll through a
      requestAnimationFrame loop that ran for as long as the page was open, which is
      the input-responsiveness risk §16 warns about, and it overrode the visitor's
      own device settings. `scroll-behavior: smooth` covers in-page links and is
      switched off under reduced motion. The body-subtree `MutationObserver` is
      replaced by a re-scan when the route changes. `[S]`
- [x] 3.4 Counters hold their figure until they are scrolled into view, then count
      from zero. `setValue(0)` ran on mount, so a visible figure blinked back to 0 on
      load; zero now belongs to the animation.
      Original note: `Counter.tsx:28` resets to 0 after hydration, so the credentials strip visibly
      swaps numbers post-paint. `[S]`
- [x] 3.5 Three font files, down from eight. Inter and Inter Tight load as
      variable fonts — one file each, covering every weight the design uses,
      including the 450 the header asks for — and the mono ships the single weight
      the stylesheets actually use. `[S]`

---

## 4. Already compliant — do not regress

Server-first rendering (8 client components, all behavioural; no commercial copy, FAQ
or internal link is client-only) · `next/image` everywhere with explicit dimensions ·
exactly one H1 per page with clean heading order · `next/font` self-hosted with
`display: swap` · reduced-motion respected (`globals.css:623-643`, `MotionRoot.tsx:26`) ·
skip link and `:focus-visible` · no secrets in client code · `youtube-nocookie` ·
`dynamicParams = false` so unknown slugs 404 · `Product` and `FAQPage` schema derived
from visible content · no TODO/FIXME/lorem anywhere.

---

## 5. Content coverage — 105 of 105 built, 91 indexable

Every URL in the Content Master is built and prerendered. Each page carries the
document's H1, answer block, body sections, FAQs where it approves them, and its
breadcrumb; the 14 products and 15 articles this build already had keep their own
design and depth on top of that.

| Section | URLs | Indexable | Waiting on SMEC |
| --- | --- | --- | --- |
| Products | 31 | 26 | BOP control, fire & gas, flare ignition, gas watch, ICSS |
| Solutions | 16 | 16 | — |
| Industries | 21 | 21 | — |
| Customers | 8 | 8 | — |
| Digital | 7 | 7 | — |
| Resources | 8 | 4 | calculators, case studies, checklists, glossary |
| Company | 11 | 6 | certifications, leadership, MD message, OEM partners, experience |
| Markets, contact, home | 3 | 3 | — |

The 14 that are not indexable render, carry `noindex, follow` and stay out of the
sitemap until their gate clears (1.10). Nothing asserts a number, certification or
client the documents have not approved.

Depth is the honest gap: 13 pages are a heading, an answer and two or three bullet
lists, because that is all the document writes for them. They are accurate and
indexable, not deep. 48 pages carry approved FAQ copy; no page claims `FAQPage`
schema without visible questions.

---

## 6. URL map

Held as data in `lib/redirects.ts` so `next.config.mjs` and this checklist cannot drift.
Wire it with item 1.1. Targets follow the Content Master's locked URLs.

Flagged, no equivalent in the spec (see 0.11): `/research-and-developement`,
`/sustainability`, `/employee-training`, `/adipec-2023`, `/smec-adipec-2023`,
`/smec-at-adipec-2024`.

Retired (404/410, no redirect): `/cart`, `/checkout`, `/my-account`, `/thank-you`,
`/hi`, `/sample-page`, `/test`.

---

## 7. Order of work

1. 0.1 and 0.2 — domain and content source. Everything else is shaped by them.
2. 1.1 + 1.3 — routes to the locked IA, redirect map wired, breadcrumbs to real hubs.
3. 1.10 — content model per page type with publication status.
4. Pour in Content Master copy (95 of 105 pages possible without new SMEC writing).
5. 1.4 + 1.5 — RFQ form to the lead API, uploads, consent, the eleven events.
6. 2.1–2.5, 2.8 — schema generators and social images.
7. 1.12–1.16, 2.12 — claims, assets, links, accessibility.
8. Pre-launch QA against the spec's own checklist, then the 30/60/90 day plan.

---

## 8. How the pages are built

`lib/spec/pages.generated.ts` is the Content Master as data: one record per
URL with breadcrumb, title, meta, schema types, H1, answer block, body
sections, FAQs and a publication status. It is generated —

    node scripts/build-spec-content.mjs

— so a new revision of the document becomes a diff rather than a re-typing
job. Nothing is reworded on the way through.

Each section is one eight-line route (`app/products/[[...path]]/page.tsx` and
its siblings) delegating to the factories in `lib/spec/route.tsx`, which build
the metadata, the JSON-LD and the page from that one record. Sections the
document addresses to the developer rather than the reader ("Homepage
placement", "Publication control") are flagged `internal` and never rendered;
specification values are never rendered at all, since they may only be
published from an approved datasheet.

Worth an editorial pass with SMEC: the document mixes page copy with
instructions, and a few answer blocks read as guidance ("Use this hub to route
buyers…") rather than something a visitor should see.
