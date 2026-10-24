# Content mined from the live site

Three pages that are live on **smecoilandgas.com** today carry copy that pages in
this build are waiting for. This directory is that copy, pulled out of WordPress /
Elementor markup into reviewable markdown, with a mapping to its destination and an
honest account of what still needs approval.

**Nothing here has been applied to the build.** No edit to
`lib/spec/pages.generated.ts` (generated), `lib/redirects.mjs`, `lib/siteData.ts`,
`lib/people.ts` or any component. Mined source and notes only.

## Why these three pages were never seen before

`docs/legacy-inventory.md` records that the redirect map was built from the live
site's XML sitemap, so only the 14 product pages and 15 articles were carried across.
These three were not in that set. They were substantially rewritten in 2025/26 — 186
of the site's images were uploaded in that period — and nobody has read them since.

One mechanical reason they stayed invisible is worth recording: **every headline
statistic on the Abu Dhabi page is an Elementor animated counter that renders as `0`
without JavaScript.** A crawler that does not execute scripts sees no numbers at all.

## What is here

| Path | Contents |
|---|---|
| [mapping.md](mapping.md) | **Start here.** Each mined block → its destination page, what duplicates copy already in the build, and whether it clears that page's gate. |
| [sign-off-queue.md](sign-off-queue.md) | Every claim that needs engineering, QA or commercial sign-off before it publishes — certifications, ATEX/Zone wording, ratings, percentages, named clients, warranty. |
| [smec-oil-gas-solutions-llc-abu-dhabi.md](smec-oil-gas-solutions-llc-abu-dhabi.md) | 9,664 chars. The MD message signed by Saiju Mohamed, Vision/Mission/Core Values, the Abu Dhabi street address, named clients. |
| [industrial-control-panel.md](industrial-control-panel.md) | 9,370 chars. Panel retrofit and obsolescence copy, hazardous-area and marine panel scope, 5 FAQs, field credentials. |
| [e-house-solutions-india.md](e-house-solutions-india.md) | 4,471 chars. Modular E-House page. **Mostly overlaps the destination** — four discrete facts are additive, the prose is not. |

Each source file names its URL, fetch date, HTTP status and byte count at the top.
Everything in them is SMEC's own wording; our insertions are marked
`[extraction note: …]` and nothing else was added.

## The headline

**One gate clears.** `/company/md-message/` is draft, gated `"Needs SMEC: an approved
signed message."` SMEC has published a signed first-person message from **Saiju
Mohamed, Managing Director, SMEC Group** on its own domain. On confirmation that it
is current, that gate clears.

**Three pages get content they should have had.** `/company/vision-mission/` is
currently shipping a vision and mission *we* composed — SMEC's own published versions
differ substantively and should replace them. `/company/abu-dhabi-office/` declares
`LocalBusiness` schema with no street address; the live page has one.
`/products/plc-hmi-drive-panels/` gains ~1,200 characters of real retrofit and
obsolescence argument plus five well-formed FAQs.

**Two draft pages the brief did not name are spoken to.**
`/company/certifications/` and `/company/leadership/` — partially, and
certifications **not** in a way that clears its gate (see below).

**Two corrections to the brief.** `/company/vision-mission/` is already approved, not
draft — only `/company/md-message/` is actually draft. And the e-House page adds
little: its destination now carries 20 sections merged from the client's own
prototypes, and the live page is substantially a subset. Recommend closing the
"e-House page rebuild from the live site" item carried in
`prototype-content-merge.md` as **not needed**.

## Two things that must not be quietly published

1. **The certifications are three image logos with no text, and two of the three
   filenames name standards that do not exist** — `ISO-2001-2015` (no such standard;
   probably 9001) and `ISO-40001` (no such standard; probably 45001). This does not
   clear the certifications gate and must not be transcribed as text. It does turn an
   open request into a specific one.

2. **The build and the live site publish two different Abu Dhabi addresses**, under
   two different legal-entity suffixes — `Store-104, M34, Mussafah` / "LLC SPC" in
   `lib/siteData.ts:527` versus `147-1st Floor … Hamdan Street` / "LLC" live. Both may
   be real, or one is stale. This is a NAP and legal-identity question for the client,
   and it blocks correct `LocalBusiness` markup.

## How this was extracted

`curl` for the HTML (all three HTTP 200), then a Python pass that drops
`script`/`style`/`svg`/`nav`/`header`/`footer`, converts headings and list items,
unescapes entities and collapses the Elementor wrapper soup. Extracted character
counts came out at 4,471 / 9,370 / 9,664 against the 4,500 / 9,600 / 9,600 the task
estimated, so nothing substantial was lost.

Three things needed recovering separately, because they are not in the text layer:

- **Counter values** from `data-to-value` attributes (the rendered page shows `0`).
- **Certification and client-logo evidence** from `img` alt text and filenames, since
  both "Certifications" headings have no text under them.
- **Email addresses** by decoding Cloudflare `data-cfemail` attributes — both pages
  render the literal string `[email protected]`. They decode to `info@smecong.com`
  and `sales@smecong.com`, which match `lib/siteData.ts`.

The safety flags in [sign-off-queue.md](sign-off-queue.md) were produced by running
the generator's own `SAFETY_CLAIM` regexes from
[scripts/build-spec-content.mjs](../../../scripts/build-spec-content.mjs) over the
extracted text, so they match what the build would actually gate on. Scripts live in
the session scratchpad, not the repo.

## Scope note

The client has said she does not want the new site to depend on the old ones. That
concerns runtime links and the enquiry backend. Reusing SMEC's own published copy is
a different thing, and is in scope — the point of this exercise is that we stop
waiting for text SMEC has already written.
