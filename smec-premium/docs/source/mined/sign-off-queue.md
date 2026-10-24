# Claims in the mined pages that need sign-off before they publish

Written 24 October 2026. Every claim below is **published on smecoilandgas.com
today**. That it is live is not sign-off: these pages are Elementor marketing pages,
and the build holds its pages to a stricter standard than the site it replaces.

Two audiences. **§1–4 and §9 need engineering or QA** — a person who can say whether
a certificate exists, a rating is right, a number is measured. **§5–8 need the client
or commercial** — entity identity, reference permission, superlatives.

The safety flags were produced by running the generator's own regexes
(`SAFETY_CLAIM` in [scripts/build-spec-content.mjs](../../../scripts/build-spec-content.mjs))
over the extracted text, not by eye.

---

## 1. The ISO logos are the only certification evidence, and two of the three filenames name no real standard

**Where:** "Certifications" heading on *both* the e-House page and the
industrial-control-panel page. Both headings have **zero text under them** — three
image logos and nothing else.

**Served as:**

| File | Alt text | What it probably means | Does the standard exist? |
|---|---|---|---|
| `ISO-2001-2015.png` | `ISO-2001-2015` | ISO **9001**:2015, quality management | **No.** There is no ISO 2001 |
| `ISO-14001.png` | `ISO-14001` | ISO 14001, environmental management | Yes |
| `ISO-40001.png` | `ISO-40001` | ISO **45001**, occupational H&S | **No.** There is no ISO 40001 |

Two of three filenames name standards that do not exist. The most likely reading is
transposed digits — 9001 → 2001, 45001 → 40001 — in which case SMEC holds the
conventional ISO trio and someone mis-saved the files. But that is an inference, and
the inference is the entire problem: **the certification claim on SMEC's live site is
carried by three images whose only machine-readable labels are two-thirds wrong.**

**Why this matters more than a typo.** `/company/certifications/` is draft, gated
`"Needs SMEC: verified certificates and validity."` Its own `answer` requires
certificate number, standard, issuing body, validity period and downloadable proof,
and its developer rule says certificates from different legal entities must not be
combined without naming the holder. Nothing here supplies any of those five fields,
and the two source pages are the **India** entity (Kochi footer, Indian GST) while
the destination is UAE-primary — so even the holding entity is unresolved.

**Verdict: does not clear the gate, and must not be published as text.**
Transcribing "ISO 9001:2015, ISO 14001, ISO 45001" from these filenames would be us
inventing certifications. Do not do it.

**What it is worth.** It converts an open request into a closed one. Instead of
"please send your certifications", ask: *send the three certificates behind these
logos — certificate number, standard, issuing body, validity dates, and which SMEC
legal entity holds each.* Also worth telling the client the filenames are wrong on
their live site regardless of what we publish.

**Also check:** the panel page claims "**Authorized OEM Partnerships**" and the
e-House page names Schneider Electric, Siemens, ABB and Phoenix Contact under "Built
with Integrity. Engineered with Global Leaders." Authorised-partner status is a
contractual claim each OEM can contest. Needs the same treatment: which partnerships,
with which entity, current?

## 2. ATEX and "Zone 1 / Zone 2" as blanket capability claims

**Where:** industrial-control-panel, "Hazardous Area & Oil and Gas Control Panel
Specialists".

Regex hits (`/\bATEX\b/i`, 2 occurrences):

- "Our portfolio includes **ATEX** panels, ESD control panels, FG panels, emergency control panels, RTU panels and offshore control systems built for **Zone 1 and Zone 2** hazardous locations."
- "**ATEX**-ready panels for **Zone 1 and Zone 2** locations"
- "**Zone 1 / Zone 2** compliant panel solutions"
- FAQ: "SMEC engineers hazardous area panels, ESD panels, FG panels and **Zone 1 / Zone 2** solutions…"

Note `"hazardous area"` alone appears 6 times and `"Zone 1"` 3 times. The generator
deliberately ignores "hazardous area" on its own — it appears on approved pages as an
RFQ input — so **ATEX is the trigger**, and it fires.

**Mechanical consequence, if merged as-is:** `/products/plc-hmi-drive-panels/` goes
from `approved` to `draft`, noindex, out of the sitemap. Indexable page count
93 → 92. The generator is right to do that.

**Substantive problem.** "ATEX-ready" and "Zone 1 / Zone 2 compliant" are, as
written, unconditional. ATEX is an EU conformity regime; a panel is not ATEX
"compliant" in the abstract — specific equipment carries specific certification for
a specific protection concept, and in the UAE/GCC the applicable regime is more often
IECEx. The build's existing `specTreatment` row on this very page already states the
defensible version:

> "Where applicable; exact Zone/Class, Ex protection and certificate must match
> supplied equipment."

The live copy contradicts that row. **Recommend: do not merge the ATEX and
Zone sentences.** Merge the retrofit and obsolescence body copy (mapping §7), which
trips nothing, and if hazardous-area capability must be stated, state it in the
conditional form the page already uses — then the gate does not fire and the claim
is true.

**Question for engineering:** does SMEC hold, or has it delivered against, specific
Ex/ATEX/IECEx certification for panel assemblies — and for which entity, protection
concept and zone? If yes, this becomes publishable with certificate references. If
no, the conditional wording is the only honest version.

## 3. "MV Switchgear (5kV–33kV)"

**Where:** e-House, "Technical Scope". Trips no safety regex — it is a plain rating.

The only hard electrical number in any of the three pages, and the build's e-House
page publishes no voltage range at all (`specTreatment` defers every rating to the
approved datasheet). Publishing a range is genuinely useful: it qualifies buyers and
it is the kind of specific that search rewards.

But 5 kV–33 kV is a claim about what SMEC can actually engineer and integrate, and
33 kV switchgear integration in a transportable module is not a small capability.
**Needs an engineer to confirm the range is the demonstrated envelope, not an
aspiration**, and to say whether it describes equipment SMEC integrates (selected
from an OEM) or equipment SMEC builds. Those are different claims and buyers read
them differently.

## 4. Quantified benefit and efficacy claims with no stated basis

None trip the safety rule. All are unsourced percentages, and the build's house
voice ("Engineering accountability over marketing claims" — the MD page's own
internal theme list) is against every one of them.

**e-House:**

| Claim | Problem |
|---|---|
| "Cut **90%** of on-site electrical risk" | "Risk" is not a quantity with a unit. 90% of what, measured how? Unpublishable as written |
| "Reduce installation time from months to weeks" | Directionally fair for modular; no baseline |
| "reducing commissioning time by weeks" | Same |
| "**Zero** Rework", "eliminates on-site troubleshooting / rework costs / integration failures / project delays" | Absolutes. "Eliminates project delays" is not survivable |

**Panel page:** "**25+** Years Panel Engineering Expertise" (twice), "**250+** Rigs,
Vessels & Industrial Assets Supported", "**1000+** Retrofit Projects Executed". These
are the ordinary kind of corporate scale claim and are probably fine — but the build
currently makes *no* numeric scale claim anywhere, so introducing them is a policy
decision, and someone should be able to source them.

**Abu Dhabi page** — nine animated counters. Worth knowing: **these render as `0` to
any reader without JavaScript.** The published targets are in the markup as
`data-to-value`:

| Counter | Value | | Counter | Value |
|---|---|---|---|---|
| Downtime Reduction | 30% | | Faster Leak Detection Response | 40% |
| Years System Life Extension | 10+ | | Energy Efficiency Gain | 25% |
| Energy Efficiency Gain | 40% | | Faster Process Response Time | 30% |
| System Availability | **99.9%** | | Power Optimization | 25% |
| | | | Lower Emissions Achieved | 15% |

Two notes. "Energy Efficiency Gain" is published as **40%** in the upstream block and
**25%** in the midstream block — SMEC's own page disagrees with itself. And **99.9%
system availability** is a specific reliability figure that in a pipeline/terminal
context implies an availability calculation someone must own. Also "optimizes
lifecycle by **10+ years**" under NexVerse.

**Recommend: publish none of these numbers without a source.** They are not needed —
the mined content that matters (MD message, vision, address, retrofit copy) carries
no numbers at all.

## 5. "zero downtime" in SMEC's published Vision

**Where:** Abu Dhabi, Vision statement. Destination `/company/vision-mission/`,
already approved.

> "To engineer a smarter energy world — where every rig, refinery, and industrial
> plant operates with intelligence, integrity, and **zero downtime**."

A vision statement is allowed to be aspirational, and this is SMEC's own published
wording — which is precisely why it should not be quietly edited. But "zero downtime"
in an oil and gas context is an absolute reliability claim, and the build is careful
about those everywhere else.

**Recommend:** publish SMEC's wording as-is and flag it to the client rather than
softening it ourselves. If anyone objects, it is SMEC's sentence to change, not ours.

## 6. Named clients — ONGC, BPCL, Shelf Drilling, ADES

**Where:** Abu Dhabi, "From India's Engineering Legacy". Also four identifiable
client-wall logos: `bharat-petroleum`, `ades-energy4099`, `aban-1`, `foresight-1`.

No operator is named anywhere in this build today. Basis here is strong — SMEC
publishes this itself, in its own voice — and much better than the case-study deck's
list, which came off a signed commercial proposal (`prototype-extraction-findings.md`
§3) and is not publishable at all.

Still a **commercial** question, not an editorial one: client reference permission is
usually per-client and contractual. Ask. "You already name these four on your own
site" makes it an easy yes.

## 7. "10,000+ successful projects" and "over two decades"

**Where:** Abu Dhabi. Inside the MD message ("For over two decades") and the legacy
paragraph ("With 10,000+ successful projects across Oil & Gas, Marine, Defence, and
Industrial sectors, SMEC brings **unmatched** technical depth").

"Over two decades" is consistent with the panel page's "25+ years" and is safe.
"10,000+ successful projects" is a large number that wants a basis — and it sits
against the panel page's "1000+ Retrofit Projects Executed", which is a different
denominator and could be read as inconsistent. "**Unmatched** technical depth" is a
competitive superlative; recommend dropping that word if the sentence is used.

Note this one is awkward because it is *inside the MD message* we most want to
publish. The MD message proper ("For over two decades…") is clean; the 10,000+
figure is in the separate legacy block below it, so the message can be published
without the number.

## 8. "India's leading Modular E-House Manufacturer" and the India framing

**Where:** e-House, throughout — `<title>` ("Best Modular E-House Manufacturer
India"), meta description ("India's leading"), hero, "FACTORY-BUILT PRECISION FOR
INDIAN PROJECTS", "SMEC is your E-House Turnkey Vendor in India", a +91 number, and
an enquiry form naming **SMEC Automation** as the data controller.

Unsubstantiated market-leadership superlatives ("Best", "India's leading"), and the
wrong entity for a UAE-primary destination. **Drop all of it.** Keep only "FAT-tested
in our Indian manufacturing facility", which is a factual build-location statement
and supports `/company/india-engineering-hub/`.

Same applies to the panel page's `<title>`: "**Best** Industrial Control Panel &
Switchboard | SMEC | 2026".

## 9. "one supplier, one warranty, one point of accountability"

**Where:** e-House, "End-to-End Single Vendor Responsibility".

Flagged not for safety but because **"one warranty" is a commercial commitment**, not
a marketing phrase. The build never states a warranty position anywhere. Publishing
it implies a single-point warranty across MV/LV switchgear, drives, automation and
HVAC sourced from four different OEMs, which is a real contractual question.

The surrounding argument — single point of engineering accountability, avoiding
multiple panel builders and separate automation vendors — is the genuinely additive
part (mapping §9.4) and carries no commitment. **Recommend: keep the accountability
framing, drop "one warranty"** unless commercial confirms it.

## 10. Smaller things worth fixing at source

Not blockers for us, but the client should know their live site has them:

- **`+97 1502288904`** (Abu Dhabi footer) — country code split a digit early. Should
  almost certainly be `+971 50 228 8904`. Do not reproduce as published.
- **Duplicated bullet** — "Pipeline Automation & SCADA Migration" appears verbatim in
  both the Midstream and Downstream blocks on the Abu Dhabi page.
- **Contradictory counter** — "Energy Efficiency Gain" is 40% in one block and 25% in
  another on the same page (§4).
- **"Panelsfor"** — missing space, panel page, "MCC (Motor Control Center) Panelsfor
  industrial automation".
- **Orphan word "critical."** on its own line after "Upgrade aging panels before
  failure impacts your operations." (panel page).
- **Nine counters show `0`** without JavaScript (§4) — every headline statistic on
  the Abu Dhabi page is invisible to a crawler that does not execute scripts, which
  is likely why none of this was ever picked up by the sitemap crawl.
- **OEM logo filenames misspell three of four brands** — `schnider.webp`,
  `simens.webp`, `phoniex-contact.webp`.
