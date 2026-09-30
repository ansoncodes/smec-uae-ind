# Legacy inventory — what the live site serves

The redirect map was built from smecoilandgas.com's XML sitemap: 37 pages and
18 posts. §9 asks for more than that — "export all current production URLs
before launch: HTML pages, PDFs, images receiving traffic/backlinks and
indexed legacy URLs" — so the live site was crawled with the owner's
permission. 220 URLs fetched, 303 asset URLs collected.

It matters because the new site replaces the old one **on the same domain**.
Every URL below stops working at cutover unless something answers for it.

Raw data: `legacy-crawl.json` in the session scratch directory. Re-runnable
with `scripts/crawl-legacy.py`.

---

## What the sitemap did not list

**151 live, indexable URLs outside the sitemap.** Of those:

| Kind | Count | Handled by |
| --- | --- | --- |
| `/wp-json/` REST endpoints | 121 | Left to 404 — not content, and they leave with WordPress |
| RSS feeds (site, per-post, per-category) | 22 | Redirected: a post feed to its article, the rest to `/resources/` |
| Category archives (`/category/blog`, `news`, `oil`, `oil-gas`, `products`, `uncategorized`) | 6 | Redirected to `/resources/` or `/products/` |
| Paginated indexes (`/blogs/page/2`, `/category/blog/page/2`) | 2 | Redirected to `/resources/` |
| Author archive (`/author/shiyas`) | 1 | Redirected to `/resources/` |
| Elementor template parts (`/elementor-hf/header`, `footer`, `contact-us`) | 3 | Retired — page furniture that was never meant to have a URL |
| `/home-new` — a second, live copy of the homepage | 1 | Redirected to `/` |

The last two are worth noticing on their own account: a duplicate homepage and
three Elementor fragments have been indexable this whole time.

## PDFs — 15 product datasheets

Every one is linked from exactly one product page, and each now redirects to
that product's new URL.

| Datasheet | Now goes to |
| --- | --- |
| `smec-power-house.pdf` | `/products/power-houses/` |
| `smec-vfd.pdf` | `/products/vfd-houses/` |
| `smec-scr.pdf` | `/products/scr-houses/` |
| `smec-battery.pdf` | `/products/battery-charger/` |
| `smec-drill-monitoring.pdf` | `/products/dms3000-drill-monitoring-system/` |
| `Integrated-Drilling.pdf` | `/products/integrated-drilling-control-system/` |
| `Jacking-Control-System.pdf` | `/products/jacking-control-system/` |
| `RPD-System.pdf` | `/products/rpd-system/` |
| `Load-Monitoring-System.pdf` | `/products/load-monitoring-system/` |
| `BOP-Control-System.pdf` | `/products/bop-control-system/` |
| `smec-gas.pdf` | `/products/gas-watch-panel/` |
| `smec-paga.pdf` | `/products/paga-system/` |
| `smec-ignition.pdf` | `/products/flare-ignition-system/` |
| `perimeter.pdf` | `/products/explosion-proof-cctv/` |
| `Adam-Edge.pdf` | `/digital/digital-engineering/` |

**Ask SMEC:** these are published product datasheets. If they are current,
hosting them again is better than redirecting them — §5 wants datasheets
reachable and the HTML page linked from them — and they are very likely the
approved numerical source the product pages are waiting on (0.7).

## Images — 288, of which 25 survive

25 resolve to a file the new build already has and are redirected. **263 will
404.** They break down as:

- 49 WordPress-generated size variants (`-768x460`, `-300x245`)
- 11 favicon and cropped-logo variants
- 203 originals the redesign does not use

**Decision needed.** Three options, in order of cost:

1. **Copy the `/wp-content/uploads/` tree across before cutover.** Every old
   image URL keeps working, no mapping needed. It is a file copy from the
   current host, and it is the only option that loses nothing.
2. **Copy only the 203 originals**, skipping thumbnails and favicons.
3. **Accept the loss.** Defensible for thumbnails; not for anything with
   inbound links, which needs Search Console data to identify.

## The finding that is not about redirects

**186 of the images were uploaded in 2025 and 2026 — after the content this
build was made from.** They sit on pages that have been substantially
rewritten since:

| Live page | Visible text | What is on it |
| --- | --- | --- |
| `/smec-oil-gas-solutions-llc-abu-dhabi` | ~9,600 chars | **"From the Managing Director's Desk", signed Saiju Mohamed, Managing Director, SMEC Group** — plus Vision, Mission and Core Values |
| `/industrial-control-panel` | ~9,600 chars | Panel retrofit and upgrade, oil & gas panels, marine and offshore panels, certifications |
| `/e-house-solutions-india` | ~4,500 chars | Modular E-Houses, factory-built MV/LV rooms, prefabricated substations |

This is content SMEC has already published under its own name, and it covers
three things currently listed as blocked:

- the **MD message** page, held out of search for want of an approved message
- **Vision, Mission & Values**, same
- the **E-House** page, which the coverage audit flagged as having zero
  source content and being a launch priority

None of it has been mined, because the redirect map was built from the
sitemap and only the 14 product pages and 15 articles were carried across.

**Recommended next step:** confirm with SMEC that these pages are current and
approved, then mine them. That is a day's work and it closes three gates
without anyone having to write anything new.
