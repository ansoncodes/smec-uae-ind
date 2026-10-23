# Projects & Resources: what is publishable today

Tab 5 is the cluster where the gap between "finished content" and publishable content is widest. This is what is actually in the folder.

## The 58 links

`const ARTICLES` holds 58 entries. Every entry has exactly five fields — `category`, `region`, `title`, `type`, `url`. **There is no body, excerpt, summary or content field on any of them.** The title is the whole of the content.

All 58 URLs point at LinkedIn:

| Host | Count |
|---|---|
| `www.linkedin.com` | 41 |
| `lnkd.in` (LinkedIn's own shortener) | 15 |
| `linkedin.com` | 1 |
| `http://link/` — a literal unfilled placeholder | 1 |

Distribution across the four link-bearing hubs:

| Hub | Links | Breakdown |
|---|---|---|
| Asset Archaeology | 38 | 22 `linkedin.com` + 15 `lnkd.in` + 1 `http://link/` |
| SMEC EDGE Newsletter | 10 | all `linkedin.com` |
| Technical Guides & Whitepapers | 9 | all `linkedin.com` |
| Case Studies | **1** | `linkedin.com` |
| Engineering FAQs / Glossary / Checklists | 0 | — |

The `http://link/` placeholder sits on a real article title ("The complete story of GAIL — from South Bassein and the HVJ Pipeline to India's National Gas Grid and beyond"), so it is an unfinished row, not a deliberate blank.

The four accompanying spreadsheets — `Asset Archaeology.xlsx`, `Case Studies_.xlsx`, `SMEC Edge - Newsletter.xlsx`, `Technical Guides & Whitepaper.xlsx` — add nothing. They are the same lists in a different container: a title column and a column of hyperlinks labelled "LINK". The newsletter sheet is just ten Excel date serials against the word "Link".

## What this means

**Taking the 58 links at face value, Projects & Resources has four hub pages whose entire content is a title, a one-line blurb and a list of outbound links to another platform.** The blurbs are 51–76 characters each. Four pages of that shape cannot be published as indexable pages on smecoilandgas.com: there is no body text to rank, the only outbound links leave the domain, and a page that exists to send visitors to LinkedIn is the opposite of what this cluster is supposed to do for the site.

There is also a strategic point worth putting to the client plainly: these 58 articles are the single largest body of genuine SMEC thought leadership in the whole handover, and all of it currently lives on LinkedIn, where it earns LinkedIn the search traffic. Republishing them on smecoilandgas.com — as canonical originals, not as link stubs — is the highest-value content work available in this project. It is also the one piece nobody has started.

## Three hubs that *are* publishable

`const REFS` is the exception, and it was missed in the original read of this folder. It holds genuinely authored copy for the three hubs that have no links at all:

| Hub | Entries | Chars | Status |
|---|---|---|---|
| Engineering FAQs | 8 question/answer pairs | 2,157 | **Publishable as supplied** |
| Engineering Glossary | 22 term/definition pairs | 1,911 | **Publishable as supplied** |
| Engineering Checklists | 5 checklist summaries | 1,491 | **Publishable as supplied** |

These three are real content, written for the web, needing no authoring. They are extracted in full into [resources/](resources/).

## The case studies do exist — in a form nobody can use yet

This corrects the premise this task started from. `SMEC - Oil & Gas - Case Study pdf.pdf`, sitting in the same Tab 5 folder, is **a 49-page SMEC-branded case-study deck containing substantial, genuine project write-ups** — far more than the single LinkedIn link in the Case Studies hub suggests.

What is in it, from sampling the slides:

- Numbered case studies with the structure a case study page needs: client context, requirement, implementation detail, bill of materials, conclusion. Example openers: *"Development of Real-Time Remote Monitoring System for Drilling Instrument Parameters"*, *"Primary & Secondary Injection Kits"*.
- Real engineering specifics — reinforced copper bus bars at 100×8 mm, 4-run per phase; arc-fault detection relays; integration with an existing Drilling Management System PLC; a BOM listing SMEC's own Edge IoT Unit.
- Named assets and named customers, including a rig referred to as *Rig Discovery*.
- Genuine SMEC project photography throughout — control rooms, open panels, switchgear, technicians on site. **This is the real photography that the full-site preview's 18 images are not.**

**The blocker is the file format.** The PDF is 244 MB and contains **zero fonts and zero text objects**. All 49 pages are flattened raster images — 41 full-page JPEGs at 6000×3375, averaging 4.7 MB each. Nothing can be copied, searched, indexed or reflowed out of it. Getting this content onto the site means OCR followed by a full editorial pass, or asking the client for the source deck (PowerPoint or InDesign), which would be far quicker. **Ask for the source file before anyone starts OCR.**

Two cautions before any of it is published:

1. Slide 28 embeds a photograph of a signed **Technical Proposal letter**, complete with a quotation reference number and a paragraph naming SMEC's clients (ONGC, Shelf Drilling, Jindal Drilling, Vantage Drilling, Focus Energy, Sun Petro, ADES, John Energy). That is commercial correspondence. It must not be reproduced on a public page, and customer names need written clearance before they appear anywhere on the site. The client's own architecture document already says this: *"Do not publish proposed case studies as factual completed projects until approved evidence exists."*
2. The deck's contact block is the **India entity** — `www.smec.in`, `sales@smecong.com`, a +91 number. If these case studies are reused on smecoilandgas.com, every CTA and contact reference has to be re-pointed to the UAE entity.

## Summary

| | Publishable on smecoilandgas.com today | Needs authoring or clearance |
|---|---|---|
| Engineering FAQs | Yes — 8 Q&A pairs, as supplied | — |
| Engineering Glossary | Yes — 22 definitions, as supplied | — |
| Engineering Checklists | Yes — 5 checklists, as supplied | — |
| Technical Guides & Whitepapers | **No** — 67-char blurb + 9 outbound links | Republish the 9 articles as on-site pages |
| Asset Archaeology | **No** — 76-char blurb + 38 outbound links, one broken | Republish the 38 articles; fix the `http://link/` row |
| SMEC EDGE Newsletter | **No** — 51-char blurb + 10 outbound links | Decide whether a newsletter archive belongs on-site at all |
| Case Studies | **No** — 75-char blurb + 1 outbound link | Recover the 49-slide deck from source; OCR or retype; legal clearance on client names |

Three of the seven hubs can launch with the cluster. The other four should be held behind `noindex` until they have bodies, or the cluster should launch with only the three that are ready. Publishing four near-empty hub pages at go-live would put thin content on a brand-new domain at exactly the moment it is being assessed for the first time.
