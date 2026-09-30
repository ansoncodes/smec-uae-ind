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

## 0. Decisions still open — SMEC (everything else waits on 0.1 and 0.2)

- [ ] **0.1 Production domain.** No document names one. Drives canonicals, sitemap,
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

- [ ] **1.1 Re-cut routes to the locked architecture** — eight sections, hub pages,
      products at `/products/<slug>/`. Today's routes mirror the old WordPress paths.
      Do this before launch: changing URLs afterwards means a second redirect round,
      which the spec forbids chaining. `app/` `[L]`
- [x] **1.2 `trailingSlash: true`** — the URL lock requires trailing slashes.
      `next.config.mjs` `[S]`
- [ ] **1.3 Redirect map wired** — `lib/redirects.ts` holds the full old→new map
      (section 6 below). Wire it into `next.config.mjs` **with** 1.1, not before: the
      old paths are what this build currently serves. `[M]`
- [ ] **1.4 RFQ form** — `components/page/EnquiryForm.tsx:50` builds a `mailto:` URL
      containing name, company, email, phone and message and sets
      `window.location.href`. Nothing reaches a server; personal data sits in a URL,
      which the spec forbids. Replace with a POST to the SMEC lead API
      (`api.smec.in`, which already handles uploads, consent, spam protection and the
      sales dashboard), add the spec's field groups, file uploads (RFQ/BOQ/P&ID/SLD/
      I-O/drawings), a consent checkbox and a success state. `[L]`
- [ ] **1.5 Analytics** — none exists. Eleven named events required: `rfq_submit`,
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
- [ ] **1.10 Per-page noindex for unapproved content** — the content model needs a
      publication status that drives both noindex and sitemap exclusion. `[M]`
- [x] **1.11 Environment-driven site URL** — `SITE.url` was hardcoded to
      `https://smecoilandgas.com`, so every canonical pointed at the old site. Now
      reads `NEXT_PUBLIC_SITE_URL`. Set it once 0.1 lands. `[S]`
- [ ] **1.12 Unverified EPC claim** — "SMEC is a complete EPC company"
      (`lib/siteData.ts` `WHO_WE_ARE`, `components/SiteFooter.tsx:45`) and
      "multinational EPC organisation" (`lib/companyPages.ts:44,51`). The spec: do not
      describe SMEC as the full EPC contractor unless that contractual responsibility
      is verified. Replace with the Content Master's approved positioning. `[S]`
- [ ] **1.13 Garbled homepage copy** — the same `WHO_WE_ARE` paragraph ends
      "system integration of the leading OEMs in the  bulbs our strength", inherited
      verbatim from WordPress. `[S]`
- [ ] **1.14 Gated assets are published** — 14 client logos (`Clients.tsx`),
      TAQA/SNOC/DEWA partner marks (`Credentials.tsx`), certificate scans
      (`Certifications.tsx`), the ADNOC ICV badge and the 25 years / 10 countries /
      500 employees / 10,000 projects counters (`siteData.ts`). Hide until 0.8. `[M]`
- [ ] **1.15 Placeholder photography** — `lib/scaffold.ts` and the seven
      `SCAFFOLD-*.jpg` files are stock imagery standing in for client assets, used on
      About, Careers, the company pages and all five industry panels. Needs 0.6. `[M]`
- [ ] **1.16 Links that still point at the old site** — `lib/routes.ts` `localHref()`
      falls back to absolute `smecoilandgas.com` URLs for pages this build lacks, and
      every article ends with a "Read the original" link to the WordPress post
      (`ArticleDetail.tsx:108`). After migration these are links to a dead or
      competing site. `[M]`

---

## 2. Required by the spec

- [ ] 2.1 Rebuild the sitewide Organization JSON-LD. `app/layout.tsx:70` mirrors the
      old Rank Math graph: a `['Person','Organization']` hybrid, a logo at
      `/wp-content/uploads/2022/05/smec-logo.png`, hardcoded `datePublished` /
      `dateModified`, and a `SearchAction` pointing at WordPress's `?s=`.
      `app/contact-us/page.tsx:53` emits a second, conflicting Organization. One
      `@id`, verified address and contact point, per the spec's §7.1 template. `[M]`
- [ ] 2.2 `BreadcrumbList` JSON-LD on every indexable non-home page — visible
      breadcrumbs already exist (`components/ui/Breadcrumb.tsx`). `[S]`
- [ ] 2.3 Breadcrumb trails must point at real hubs, not `/#systems` fragments
      (`app/[slug]/page.tsx:111`). Comes with 1.1. `[S]`
- [ ] 2.4 Missing schema types: `Service` (industries, customers, solutions, programs,
      markets), `SoftwareApplication` (NexWave, ProSet360, NexVerse, NexView),
      `Person` (leadership, MD), `DefinedTerm`/`DefinedTermSet` (glossary),
      `JobPosting`/`CollectionPage` (careers). Generate from visible content, the way
      `Product` and `FAQPage` already do. `[L]`
- [ ] 2.5 `Article` schema needs ISO `datePublished`/`dateModified`; `lib/articles/*`
      carry dates as prose. `[S]`
- [ ] 2.6 Answer blocks: 2–3 factual sentences directly under every H1, able to stand
      alone in search results. The homepage H1 is currently just the brand name. `[M]`
- [ ] 2.7 FAQs: one block exists sitewide (about-us). The spec wants 3–6 visible
      questions on the homepage, Turnkey, E-House, migration and priority product
      pages; 48 URLs already have approved FAQ copy in the Content Master. `[L]`
- [ ] 2.8 OG/Twitter images — no default image and no per-page 1200×630 template, so
      every subpage inherits the homepage card. `[M]`
- [ ] 2.9 Replace the homepage title "Best SMEC OIL AND GAS Company in India, GCC
      Countries" with the Content Master's, and add a `title.template`. `[S]`
- [x] 2.10 Security headers: nosniff, Referrer-Policy, frame protection,
      Permissions-Policy. HSTS and CSP belong at the edge once the host is known
      (0.3). `next.config.mjs` `[S]`
- [x] 2.11 AVIF alongside WebP. `next.config.mjs` `[S]`
- [ ] 2.12 Accessibility — WCAG 2.2 AA is the acceptance baseline:
    - [ ] Closed mobile drawer keeps ~30 links in the tab order
          (`SiteHeader.module.css:383` uses only `opacity`/`pointer-events`). `[S]`
    - [ ] `aria-hidden` on the utility rail whose links stay focusable
          (`SiteHeader.tsx:94`). `[S]`
    - [ ] Drawer and mega menu: no `aria-modal`, no focus trap, no focus return,
          hover-only open with no `aria-controls`. `[M]`
    - [ ] Form error messaging: no `aria-invalid`, `aria-describedby`, per-field
          messages or error summary. `[M]`
- [ ] 2.13 Descriptive image filenames (`/images/1.png`, `749986-middle-1.png`). `[M]`
- [ ] 2.14 Client logos carry `alt=""` (`Clients.tsx:41`) — identity lost for assistive
      technology even once the section is approved. `[S]`

---

## 3. Worth fixing while in there

- [ ] 3.1 Two `priority` images per page compete for the LCP preload
      (`ProductDetail.tsx:83`, `PageShell.tsx:129`, `ArticleDetail.tsx:91`, each
      alongside `SiteHeader.tsx:116`). `[S]`
- [ ] 3.2 Duplicate blurred backdrop images double requests per card
      (`insights/page.tsx:57-65`, `ArticleDetail.tsx:78-83,145-152`). `[S]`
- [ ] 3.3 Lenis smooth scroll (`MotionRoot.tsx:134`) hijacks native scrolling and keeps
      a body-subtree `MutationObserver` alive for the page lifetime — INP risk. `[S]`
- [ ] 3.4 `Counter.tsx:28` resets to 0 after hydration, so the credentials strip visibly
      swaps numbers post-paint. `[S]`
- [ ] 3.5 Three font families and eight weights; the spec asks to limit weights. `[S]`

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

## 5. Content coverage — 20 built, 39 partial, 46 missing of 105

| Section | Built | Partial | Missing | Notes |
| --- | --- | --- | --- | --- |
| Industries (20) | 0 | 8 | 12 | Only one-line cards in `experience.ts` |
| Customers (8) | 0 | 0 | 8 | No customer-segment content exists |
| Solutions (16) | 1 | 12 | 3 | **E-Houses has zero coverage** and is a launch priority |
| Products (31) | 14 | 1 | 16 | Missing ones are plant, marine and safety systems |
| Digital (7) | 0 | 6 | 1 | One-liners only; NexView absent entirely |
| Resources (8) | 1 | 3 | 4 | 17 articles map to archaeology/whitepapers; case studies, checklists, calculators, glossary empty |
| Company (12) | 2 | 7 | 2 | Leadership and MD message need SMEC |
| Contact + markets (3) | 2 | 2 | 0 | Homepage copy is the old positioning |

About 95 of the 105 pages can be built from Content Master copy plus existing `lib/`
content. The ~10 that genuinely need SMEC input: leadership, MD message,
certifications, OEM partners, project experience, the four empty resource collections,
NexView and fuel monitoring.

Depth warning: only ~22 pages have publishable depth in the spec. Roughly 74 are a
heading, an answer block and two or three bullet lists — enough to launch, short of the
spec's own deep-content standard. 57 URLs have FAQ schema specified but no FAQ copy
written: either drop the schema on those or SMEC writes the questions.

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
