# Mined block → destination page, and what each one does to its gate

Written 24 October 2026. Companion to the three source files in this directory.
Nothing here has been applied to the build: no edit to `lib/spec/pages.generated.ts`,
`lib/redirects.mjs`, `lib/siteData.ts`, `lib/people.ts` or any component.

**The whole premise of this exercise.** The client has been asked since
30 September for the MD message, leadership details and certifications and has not
supplied them. All three already exist, published by SMEC under its own name, on
smecoilandgas.com. So the question put to the client is not "please write this" —
it is **"this is your own published text; confirm it is current and we publish it."**
That is a much shorter conversation, and it is the only thing standing between
three of these blocks and a cleared gate.

## Correction to the brief this task started from

The brief named three gated destinations. Checked against
`lib/spec/pages.generated.ts` as built:

| URL | Brief said | Actually is |
|---|---|---|
| `/company/md-message/` | draft, "Needs SMEC: an approved signed message" | **Correct** — draft, that exact gate |
| `/company/vision-mission/` | gated | **Approved already.** Ships indexable today |
| `/solutions/e-houses-modular-electrical-rooms/` | zero source | **Approved**, 20 sections, 9 FAQs |
| `/company/abu-dhabi-office/` | — | Approved |
| `/products/plc-hmi-drive-panels/` | — | Approved, datasheet gate only |

So **one** of the named destinations is actually draft. That does not make the
exercise less useful — it changes what the useful output is. For
`/company/vision-mission/` the win is not clearing a gate, it is replacing
copy *we* drafted with SMEC's own published words. For `/company/abu-dhabi-office/`
it is a street address the build does not have. And the mining turned up two
*other* draft pages this content speaks to, which the brief did not name:
`/company/certifications/` and `/company/leadership/`.

---

## Summary table

| # | Mined block | Source page | Destination | Gate effect |
|---|---|---|---|---|
| 1 | From the Managing Director's Desk, signed | Abu Dhabi | `/company/md-message/` | **Clears it**, on confirmation |
| 2 | Vision / Mission / Core Values | Abu Dhabi | `/company/vision-mission/` | Already open; replaces our draft |
| 3 | Abu Dhabi street address + numbers | Abu Dhabi | `/company/abu-dhabi-office/` | Already open; fills empty `LocalBusiness` |
| 4 | Saiju Mohamed, Managing Director | Abu Dhabi | `/company/leadership/` | **Partial** — one of N officers |
| 5 | Three ISO logos | e-House + panel | `/company/certifications/` | **Does not clear it** — see sign-off §1 |
| 6 | Named clients (ONGC, BPCL, Shelf Drilling, ADES) | Abu Dhabi | `/company/project-experience/` | Needs reference permission |
| 7 | Retrofit / obsolescence body copy | Panel | `/products/plc-hmi-drive-panels/` | Already open; additive |
| 8 | Hazardous-area + marine panel lists | Panel | `/products/plc-hmi-drive-panels/` | **Would gate the page** — sign-off §2 |
| 9 | MV range, OEM names, turnkey framing | e-House | `/solutions/e-houses-modular-electrical-rooms/` | Already open; thin addition |
| 10 | Four unattributed project cards | Panel | — | Not usable as evidence |

---

## 1. MD message → `/company/md-message/`

**The one gate this exercise actually clears.** Current state: `status: "draft"`,
`gates: ["Needs SMEC: an approved signed message."]`.

What the build has today is an *answer* paragraph we wrote plus an internal section
headed "Suggested MD themes" — a brief for a message that was never written. What
the live site has is the message itself: 1,100 characters of first-person copy, a
pull-quote, and a signature block reading **Saiju Mohamed, Managing Director, SMEC
Group**, with a portrait (`saiju-sie.webp`).

It is signed, it is first-person, it is on SMEC's own domain under SMEC's own
branding. That is about as close to "an approved signed message" as a document gets
without a countersignature.

**Does it clear the gate?** Yes — on confirmation, not automatically. The text SMEC
has published is a message about *launching* the Abu Dhabi entity ("Now, with SMEC
Oil & Gas Solutions LLC, Abu Dhabi, that reliability expands…"). On a site that goes
live 30 October 2026 as the entity's main site, a launch announcement reads slightly
oddly as a standing MD message. So the ask is:

> This is your published MD message, word for word. Confirm (a) it is current,
> (b) Saiju Mohamed's title is still Managing Director, SMEC Group, and (c) you are
> happy for a launch-framed message to stand as the permanent one, or send one
> sentence to re-frame it.

Note what this *also* unlocks: the page declares `schema: ["Person", …]`, and
`lib/people.ts` is deliberately empty with a comment saying a fabricated director is
worse than a missing one. One name and one role fills it honestly.

**Duplication to resolve.** Our drafted `answer` and the mined message say
compatible things in different voices; ours is better written for the site's
register, SMEC's is authentic and signed. Publish SMEC's. Keep "Suggested MD themes"
as `internal: true` or delete it — it is scaffolding for work now done.

## 2. Vision / Mission / Core Values → `/company/vision-mission/`

**This page is already approved and indexable.** So this is not a gate clearance —
it is a correction.

The build publishes a vision and mission *we* composed. The live site publishes
SMEC's own. They are not the same, and the differences are not cosmetic:

| | Build (ours) | Live (SMEC's) |
|---|---|---|
| Vision | "to be a trusted engineering and technology partner for critical energy, marine and industrial assets across the Middle East and global markets" | "To engineer a smarter energy world — where every rig, refinery, and industrial plant operates with intelligence, integrity, and **zero downtime**" |
| Mission | "combine practical field engineering, automation, system integration, manufacturing and digital intelligence to solve asset problems from design through lifecycle support" | "To empower the region's Oil & Gas, Marine, and Industrial sectors with mission-critical systems that deliver measurable performance, resilience, and value" |
| Values | 6 sentences — engineering integrity, safety and quality, lifecycle accountability, practical innovation, clear documentation and handover, long-term customer support | 5 words — "Reliability. Innovation. Integrity. Agility. Sustainability." |

A company's vision statement is not ours to invent, and shipping an invented one on
an approved page is a worse outcome than shipping a gated one. **Recommend replacing
all three with SMEC's published wording**, and treating this as the easiest approval
in the set: SMEC is being shown its own words.

Two snags, both small. "**zero downtime**" is an absolute reliability claim; it is
SMEC's own published aspiration so it is defensible as a vision statement, but it
sits oddly next to the build's house rule against unverified claims — flag it, do
not silently soften it. And our six values are more useful to a reader than five
abstract nouns; the honest resolution is SMEC's five values as the values, our six
moved to a differently-headed section (e.g. "How we work") if the team wants to keep
them, clearly not presented as SMEC's declared values.

## 3. Abu Dhabi address and contact → `/company/abu-dhabi-office/`

The page is approved and declares `schema: ["LocalBusiness", "BreadcrumbList"]`.
A `LocalBusiness` with no street address is the weakest possible version of that
markup. The live page has a full one.

**But it conflicts with the address already in the build.** This is the most
consequential single finding in this exercise and it is not a content question:

| | |
|---|---|
| `lib/siteData.ts:527-532` (`FOOTER_ADDRESS`) | SMEC Oil & Gas Solutions **LLC SPC** · Store-104, M34, **Mussafah** · Abu Dhabi, UAE |
| Live page footer | SMEC Oil & Gas Solutions **LLC** · 147-1st Floor, Business Center, Xpressmall Properties, 45464 – OBY Building (35), **Hamdan Street**, Abu Dhabi |

Two different premises — Mussafah is the industrial area, Hamdan Street is central
business district — and two different legal-entity suffixes, **LLC SPC** versus
**LLC**. Both may well be true (workshop and office), or one is stale. Either way,
**the build and the live site are currently telling Google two different NAPs for
the same business**, and the entity name on a `LocalBusiness` is a legal-identity
claim.

This must go to the client as a direct question before launch, not as a content
review item:

> You have two Abu Dhabi addresses in play. Which is the registered address of the
> entity trading as SMEC Oil & Gas Solutions, is the correct legal name "LLC" or
> "LLC SPC", and should the other address appear at all?

Phones partly corroborate and partly conflict: live `+971 502491903` matches the
build's mobile exactly; the build also carries a landline `+971 2 546 0027` the live
page does not show; and the live page's second number is published as
`+97 1502288904`, which is a typo — the country code breaks one digit early. Do not
reproduce that as published.

Emails match the build: `info@smecong.com`, `sales@smecong.com`.

## 4. Saiju Mohamed → `/company/leadership/`

Draft, gated `"Needs SMEC: names, roles and biographies."` **Not cleared — partially
answered.** We now have one name and one role from a published source. A leadership
page with a single officer is a thin page, and we have no biography and no approved
profile link. Worth sending with the MD question as one combined ask: "we have the
MD from your own site; who else belongs here, and can we have two or three lines
each?"

## 5. ISO logos → `/company/certifications/`

Draft, gated `"Needs SMEC: verified certificates and validity."` The page's own
`answer` demands certificate number, standard, issuing body, validity period and
proof, and its developer rule forbids mixing entities without naming the holder.

Both mined pages carry a "Certifications" heading with **no text at all** — three
image logos and nothing else. **This does not clear the gate, and it should not be
treated as even partial evidence.** The filenames are
`ISO-2001-2015.png`, `ISO-14001.png`, `ISO-40001.png`, and two of those three name
standards that do not exist. See
[sign-off-queue.md §1](sign-off-queue.md#1-the-iso-logos-are-the-only-certification-evidence-and-two-of-the-three-filenames-name-no-real-standard).

What it *is* good for: evidence that SMEC believes it holds three ISO
certifications, which turns the open-ended request ("please send your
certifications") into a specific one ("send the certificates behind these three
logos — number, body, validity, and which legal entity holds each").

## 6. Named clients → `/company/project-experience/`

`grep` across `lib/spec/pages.generated.ts` and `docs/source/*.md`: **no operator is
named anywhere in this build.** Not one. So this line would be a first:

> Our clients include ONGC, BPCL, Shelf Drilling, ADES, and global EPCs who trust
> SMEC for automation, electrical, instrumentation, hydraulics, and digital
> intelligence.

This is a materially better basis than the client list the sibling session found in
the case-study deck, which came off a signed commercial proposal letter and is not
publishable (see `prototype-extraction-findings.md` §3). This one SMEC publishes
itself, on its own homepage-adjacent page, in its own voice. Three of the four are
corroborated by client-wall logo filenames (`bharat-petroleum`, `ades-energy4099`,
`aban-1`).

Even so: client reference permission is contractual, not editorial, and it is
usually per-client. Recommend asking rather than assuming, and noting that SMEC has
already published it — which makes "yes" the likely answer.

## 7–8. Panel copy → `/products/plc-hmi-drive-panels/`

Approved, with the standard datasheet gate. Note the sibling merge sent the client's
*prototype* "Industrial Control Panels" copy to `/products/mcc-pcc-power-distribution/`
instead (a judgment call recorded in `prototype-content-merge.md`), so this URL still
carries Content-Master-only copy and the redirect from `/industrial-control-panel`
lands here. Worth a second look at whether that split is right, but out of scope here.

**§7, additive and safe.** The build's page has one line of lifecycle context ("the
market is increasingly brownfield…"). The live page has ~1,200 characters of real
retrofit and obsolescence argument — why obsolete panels cause unplanned shutdowns,
nine named retrofit scopes (MCC refurbishment, obsolete panel replacement, legacy
panel migration, switchboard upgrade…), and the five triggers under "When Do Clients
Typically Approach SMEC?" That last block is the most genuinely useful thing on the
page: it is buyer-intent copy the build has nothing equivalent to, and it names no
standard, no number and no client. **Lowest-risk, highest-value block in this whole
exercise.** The five FAQs are also well-formed and non-duplicative — the build's
three FAQs here are generic lifecycle/RFQ boilerplate.

**§8, do not merge without sign-off.** The hazardous-area and marine sections name
**ATEX**, **Zone 1 / Zone 2** and "**ATEX-ready**" / "**Zone 1 / Zone 2 compliant**".
`safetyClaims()` in `scripts/build-spec-content.mjs` matches `/\bATEX\b/i`, so
merging this text as-is **flips this page from approved to draft** and takes it out
of the sitemap. That is the generator working correctly, and it is exactly why the
rule exists. Details in [sign-off-queue.md §2](sign-off-queue.md#2-atex-and-zone-1--zone-2-as-blanket-capability-claims).

Also note the page's existing `specTreatment` already says the honest version:
"Where applicable; exact Zone/Class, Ex protection and certificate must match
supplied equipment." The live page's blanket "ATEX-ready panels" contradicts it.

## 9. e-House → `/solutions/e-houses-modular-electrical-rooms/`

**Reporting the overlap honestly, as asked: the live page adds very little.**

The destination is now the longest page on the site — 20 sections, 9 FAQs, 8
specification rows, merged from the client's own prototypes (which wrote E-Houses
twice, as a solution and as a product). It already covers, at greater depth and in
the site's register: integrated scope, what the buyer is actually buying, digital
readiness, project lifecycle, E-House vs rig Power House, MV/LV distribution, motors
and drives, critical power, automation and safety, modular engineering and FAT,
upgrades and retrofits, applications, and testing and documentation.

Set against that, the live page's 4,471 characters are **substantially a subset**.
Its "Technical Scope: What's Inside an E-House?" is a shorter version of the build's
"Typical integrated scope". Its "Ideal Applications" is the build's "Applications"
plus mining/metals, power generation and substation projects, and large
infrastructure. Its "Pre-Tested Quality" section is the build's "Factory
integration" and "Modular Engineering & FAT" with marketing adjectives.

**Four things are genuinely additive:**

1. **`MV Switchgear (5kV–33kV)`** — a hard number. The build's page gives no voltage
   range anywhere; its `specTreatment` defers all ratings to the datasheet. A
   published range is useful for search and for buyer qualification. Needs
   engineering sign-off ([sign-off-queue.md §3](sign-off-queue.md#3-mv-switchgear-5kv33kv)).
2. **Four named OEMs** — Schneider Electric, Siemens, ABB, Phoenix Contact. The
   build has `/company/oem-partners/`; the e-House page names nobody. Feeds the OEM
   partners page as much as this one, and the panel page's "Authorized OEM
   Partnerships" claim needs the same evidence.
3. **Build location and FAT** — "FAT-tested in our Indian manufacturing facility
   before shipment". Concrete, and it supports the India-hub story the build already
   tells at `/company/india-engineering-hub/`.
4. **Single-vendor commercial framing** — "one supplier, one warranty, one point of
   accountability", plus "built in parallel with your civil works". The build argues
   interface ownership technically but never commercially, and never makes the
   schedule argument. This is the only block with a distinct *argument* rather than
   distinct wording.

**Three things to leave behind:** the unquantified "Cut 90% of on-site electrical
risk" (sign-off §4); "India's leading Modular E-House Manufacturer" (unsubstantiated
superlative, wrong entity for a UAE-primary site); and the whole India framing —
"For Indian Projects", "Turnkey Vendor in India", a +91 number, and an enquiry form
naming **SMEC Automation** as data controller.

On the brief's open item "the e-House page rebuild from the live site" (carried in
`prototype-content-merge.md`): **recommend closing it as not needed.** The live page
is weaker than what the merge already produced. Take the four facts, drop the rest.

## 10. The four project cards — not usable

"Offshore Rig MCC Retrofit", "Vessel PMS Panel Upgrade", "Gas Watch / F&G Panel
Build", "Brownfield Switchboard Upgrade", each with two or three sentences of real
engineering detail (ACB interlocks, bus-tie logic, protection coordination,
automatic changeover). Well written. But **every one is unattributed** — no client,
vessel, field, date, scale or outcome figure. The build's `/company/project-experience/`
and the solution pages' "Project Evidence" sections use the same de-identified
pattern, so these would fit the house style — but they add capability claims, not
evidence. The real evidence is the 49-page case-study deck the sibling session found,
and the ask there is still the source PowerPoint.

The same goes for the twelve-image e-House gallery and the 47-logo client walls:
**no logo on any of these pages identifies its company** in alt text, filename or
caption, beyond the four named above. Unusable as published proof.

---

## What to send the client

One message, five questions, each one showing SMEC its own published text:

1. **MD message** — confirm current, confirm title, confirm launch framing is OK as
   permanent. *Clears a gate.*
2. **Vision / Mission / Core Values** — confirm current; we will replace the
   placeholder we wrote. *Corrects an approved page.*
3. **Abu Dhabi address** — Mussafah or Hamdan Street, and is the legal name "LLC" or
   "LLC SPC"? *Blocks correct `LocalBusiness` markup; affects local SEO.*
4. **Certifications** — send the certificates behind these three logos: number,
   standard, issuing body, validity, holding entity. *Needed for the gate; the logo
   filenames are wrong.*
5. **Client references** — you name ONGC, BPCL, Shelf Drilling and ADES on your own
   site; may we? *Per-client permission.*

Plus one internal question, for engineering not the client: everything in
[sign-off-queue.md](sign-off-queue.md).
