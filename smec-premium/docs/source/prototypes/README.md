# Client prototype content, extracted

The client's October 2026 handover delivers its website copy as **JavaScript array literals inside interactive HTML prototypes** — one per navigation tab — plus a Word document for Tab 1 and an SEO architecture document. In that form the copy cannot be read, reviewed, costed or built from. This directory is that copy pulled out into reviewable markdown, one file per entity, nothing added and nothing padded.

**This is a record of what the client supplied. It is not a decision about the site's information architecture, and nothing here has been applied to the build.** The six-tab IA those prototypes propose is still being negotiated; the slugs recorded here are the prototypes' own, reproduced as-is so the two can be compared.

## What is here

| Path | Contents |
|---|---|
| [inventory.md](inventory.md) | **Start here.** All 54 entities, proposed URL, character count, and whether we already have it built. |
| [gap-report.md](gap-report.md) | What is too thin to publish, the 65-item catalogue against our built product pages, the Tab 2 version conflict, and the client's internal contradictions. |
| [projects-resources-note.md](projects-resources-note.md) | Tab 5 in detail: what can go live and what has to be written first. |
| [images/index.md](images/index.md) | The 18 photographs decoded from the full-site preview, what each depicts, and why they are not usable as supplied. |
| [solutions/](solutions/) | 13 engineering solution pages (Tab 1). |
| [products/](products/) | 20 product pages (Tab 2). |
| [catalogue.md](catalogue.md) | The 65-item product catalogue (Tab 2) — the only place it exists. The generator builds the `/products/` catalogue from it. |
| [industries/](industries/) | 12 industry entries (Tab 4), 7 dedicated + 5 aliases. |
| [resources/](resources/) | 7 resource hubs (Tab 5). |
| [digitalisation.md](digitalisation.md) | Tab 3. |
| [about-smec.md](about-smec.md) | Tab 6. |

Every file's front matter names the source file it came from and reproduces the entity's title and slug exactly as the prototype has them. Where a prototype section is empty, it is recorded as empty rather than filled in.

## Headline numbers

- **54 entities, 187,716 characters of prose.**
- **38 of 54 are publishable as supplied** — all 13 solutions (4,189–6,205 chars), all 20 products (4,717–7,228), Digitalisation, About SMEC, and 3 of the 7 resource hubs.
- **16 are too thin to publish** — all 12 industries (195–724 chars) and 4 resource hubs (51–76 chars).
- **24 of the 65 catalogue items have no page** anywhere, on their side or ours.
- **18 images, none of them SMEC's own**; 5 are AI-generated.

## Sources, and what was ignored

Priority order, all under `reference/`:

1. `Main Tab 1 .../TAB 1 _SMEC_13_Separate_Engineering_Solution_Pages.docx` — **the source for all 13 solution pages.** Verified to be a superset of the Tab 1 HTML prototype: it adds FAQs, Project Evidence, Engineering Approach and Related Navigation sections the prototype drops, and carries per-page URL, SEO title and meta description. Using it rather than the prototype roughly doubles the copy per solution (1,828–3,682 chars from the HTML vs 4,189–6,205 from the docx). The HTML prototype still supplies `group`, `rfq` and the referenced-project URL, recorded in front matter as `source_secondary`.
2. `Main Tab 2 .../TAB 2 _ SMEC_Complete_Systems_Products_Responsive_Interactive.zip` — `const pages` (20 product pages) and `const catalogue` (65 items).
3. `Main Tab 2 .../TAB 2_SMEC_Systems_Products_Interactive_FINAL_.zip` — the second, smaller Tab 2. Resolved in [gap-report.md](gap-report.md) §3: source 2 is the superset; the two unique fragments in this file are recorded there so they are not lost.
4. `Main Tab 4 .../TAB 4_SMEC_Industries_Interactive_Explorer_FINAL.zip` — 12 industries, not the 7 the architecture document implies.
5. `Main Tab 5 .../TAB 5 _SMEC_Projects_Resources_Interactive_Preview.zip` — link cards, **plus `const REFS`, which holds genuine authored FAQ, glossary and checklist copy** that an earlier read of this folder missed.
6. `Main Tab 6 - About SMEC.zip` and `Main Tab 3 - Digitalization/...zip` — copy in markup, flattened in document order.
7. `SMEC_Complete_Six_Tab_SEO_Architecture_2026.docx` — proposed URLs, SEO titles and H1s, used for the "Proposed URL" column only.

**`reference/SMEC Oil & Gas Solutions — Website/...html` was used only for its images.** It is an assembly, not a content source: its `D` block duplicates the per-tab copy verbatim, its other constants are navigation scaffolding with no prose, and its menu labels disagree with the tab files. Its 745 KB `IMG` block is the one thing in it that exists nowhere else.

Two further files in the Tab 5 folder turned out to matter and are covered in [projects-resources-note.md](projects-resources-note.md): the four `.xlsx` files (which add nothing — the same link lists in a different container) and `SMEC - Oil & Gas - Case Study pdf.pdf`, which contains real case-study content locked in 49 rasterised slides.

## How it was extracted

Scripts live outside this repo, in the session scratchpad. Each prototype's `const NAME = [...]` literal was located by bracket matching and parsed by a tolerant recursive-descent parser for JS object literals — unquoted keys, single and backtick quotes, trailing commas. **Nothing was executed.** The two computed constants (`categories`, `cats`, both `[...new Set(...)]`) are derived from data already captured, not content.

Two encoding notes, in case anyone re-runs this:

- The prototype HTML files are UTF-8 but **declare no charset**, so a browser renders them as windows-1252 mojibake. The underlying copy is clean; see [gap-report.md](gap-report.md) §5.
- The docx must be written to a file as UTF-8. Printing it to stdout on this machine fails on the arrow and dash glyphs, and `python -I` ignores `PYTHONIOENCODING`.
