# Build plan to launch

Target: **30 October 2026**. Written 23 October, so seven days.

This plan assumes the client's 20–22 October decisions: the six-tab navigation
is adopted, Fuel Monitoring stays under Digitalisation, the Marine Electrical
Solutions landing page is dropped while the Marine & Offshore Vessels industry
page stays, e-House is rebuilt here rather than linked, enquiries run through
our own Django backend on a hostname under `smecoilandgas.com`, and nothing on
the new site depends on the old ones. Gallery is deferred by agreement.

The client also handed over ownership of navigation, URLs and structure:
"all the documents I gave are ChatGPT — only the content is mine". The
structure below is therefore ours to decide, and this plan decides it.

---

## 0. The decision that saves the week

**Keep the existing URL structure. Merge the new content onto it.**

The architecture document proposes renaming almost every route and contracting
105 pages to about 58. Adopting that means rebuilding the redirect map from
scratch — the one that is already verified against a crawl of the live site at
79 of 95 pages and 15 of 15 datasheets, one hop each. There is not time to
rebuild and re-verify that in seven days, and no reason to: the client wanted
better search visibility, not specific slugs.

The merge is clean. All 13 prototype solution pages map onto the 15 built
solution URLs with nothing orphaned in either direction:

| Prototype source | Built URL | |
| --- | --- | --- |
| `system-integration` | `/solutions/system-integration/` | exact |
| `hydraulics-pneumatics` | `/solutions/hydraulics-pneumatics/` | exact |
| `panel-engineering-manufacturing` | `/solutions/panel-engineering-manufacturing/` | exact |
| `e-houses-modular-electrical-rooms` | `/solutions/e-houses-modular-electrical-rooms/` | exact |
| `industrial-automation-control` | `/solutions/automation-control-systems/` | rename |
| `plc-scada-dcs-migration` | `/solutions/control-system-migration/` | rename |
| `fat-sat-commissioning` | `/solutions/testing-commissioning/` | rename |
| `obsolescence-retrofit` | `/solutions/lifecycle-obsolescence/` | rename |
| `rig-modernisation-reactivation` | `/solutions/rig-modernization/` | rename |
| `turnkey-engineering-packages` | `/solutions/turnkey-engineering-system-solutions/` | rename |
| `electrical-instrumentation-engineering` | `electrical-engineering` + `instrumentation` | 1 → 2 |
| `greenfield-brownfield-engineering` | `brownfield-engineering` + `greenfield-projects` | 1 → 2 |

So: **six tabs as the navigation shell, existing URLs underneath.** The client
sees the structure she asked for; the redirect map, sitemap and internal links
do not move.

Two consequences worth stating plainly:

- `/customers/` (8 pages) and `/markets/` (2) survive. The architecture document
  deletes them; they are real buyer-segmentation pages with content already
  written, and nothing is gained by removing them.
- The seven `/digital/` pages survive, with Fuel Monitoring among them, which is
  what the client asked for on 22 October.

---

## 1. What ships, and what is held back

Measured from the extracted prototypes (`docs/source/prototypes/gap-report.md`):

| Cluster | Content state | Launch |
| --- | --- | --- |
| Solutions (13) | 4,189–6,205 chars each | **ships** |
| Products (20 pages + 65 catalogue) | 4,717–7,228 chars each | **ships** |
| Home | written, locked in spec | **ships** |
| About | 4,244 chars, in markup | **ships** |
| Contact / RFQ | built and tested | **ships** |
| Industries (12) | **195–724 chars each** | routes ship, pages `noindex` |
| Resources (7) | 4 hubs at **51–76 chars**, no article text | routes ship, pages `noindex` |
| Gallery | no images | deferred |

Launching Industries and Resources behind `noindex` is deliberate: the
navigation is complete and nothing 404s, but nothing thin reaches the index.
They come out of `noindex` as content arrives, which needs no redeploy of
anything else.

This is the honest shape of 30 October and should be said to the client in
those terms before the date, not after it.

---

## 2. The seven days

Ordered so that nothing waits on anything the client still owes.

### Days 1–2 — structure and the things that expire

- [ ] **Freeze the URL map** per section 0 and publish it to the client. One
      page, their six tabs mapped onto the existing routes.

      *The legacy inventory was re-verified on 23 October: the live sitemap
      still carries 64 URLs (37 pages, 18 posts, 6 categories, 3 Elementor
      parts), unchanged since the page sitemap's 13 August lastmod, and every
      one is accounted for in the redirect map. No re-crawl needed. What is
      still outstanding from the old site is assets, not URLs.*
- [ ] **Copy `/wp-content/uploads/`** off the live site — 203 originals, 186 of
      them uploaded in 2025–26. *This window closes at cutover and does not
      reopen.* See `legacy-inventory.md`.
- [ ] **Search Console baseline.** DNS is on Cloudflare, so the client can
      verify by TXT record today without touching either site. Export the
      performance history before anything changes.
- [ ] **Cloudflare member access** for the zone, for cutover.

### Days 2–4 — the bulk of the build

- [x] **Merge 13 solution pages** from `docs/source/prototypes/solutions/` onto
      the 15 built URLs per the table above. Richest content in the handover.
      *Done: `scripts/build-spec-content.mjs` reads the prototypes as a second
      source and merges them over the Content Master.*
- [x] **Merge 20 product pages** from `docs/source/prototypes/products/`.
      *17 merged onto built URLs. The other three — Pipeline SCADA & RTU,
      wellhead and skid controls, emergency shutdown — are subjects this build
      had no page for, so on 23 October the team added
      `/products/pipeline-scada-rtu/`, `/products/wellhead-skid-controls/` and
      `/products/emergency-shutdown-systems/`, taking the architecture docx's
      slug in each case. 105 pages becomes 108; nothing on the live site points
      at the new URLs, so the verified redirect map is untouched.*
- [x] **Build the Marine & Offshore Vessels industry page**, which the 22
      October note promised to "retain" and which did not exist: all 20
      industry URLs were upstream, midstream, downstream or onshore.
      *`/industries/marine-offshore-vessels/`, flat rather than nested,
      because the other four are stages of the value chain and a vessel is an
      asset. 108 pages becomes 109. It ships draft behind `noindex` like the
      rest of Industries — 555 characters is not a publishable page — so what
      is open is the copy, not the route.*
- [ ] **Rebuild the 65-item catalogue.** Only 31 rows carry a landing URL and
      they resolve to 19 distinct pages; the rest route to an enquiry action.
- [ ] **Rebuild Tab 1's internal links.** 34 of its 38 outbound product URLs do
      not exist under any agreed map — they must be re-pointed at the built
      URLs, not carried across.
- [ ] **Rebuild the e-House page** here, keeping the existing 301 from
      `/e-house-solutions-india`. Mine the live page for source content.

### Days 4–5 — enquiries and measurement

- [ ] **New campaign** in the Django backend for the Oil & Gas site: own
      `api_key`, own `notify_email`, own data.
- [ ] **Add `api.smecoilandgas.com`** to the Caddy site block and
      `DJANGO_ALLOWED_HOSTS`; A record at Cloudflare set to **DNS-only**, or
      Caddy cannot issue its certificate. Additive — `api.smec.in` keeps
      serving the landing pages throughout, so there is no cutover risk.
- [ ] **RFQ reference generation.** The `Lead` model has no reference field;
      add one and return it. `SMEC-RFQ-XXXX` then comes from the live system,
      which is what the homepage document requires.
- [ ] **Wire GA4 `G-VKLSH1HQBX`, GTM `GTM-P4HFZ66X` and the Search Console
      meta tag**, all behind the existing consent gate. Do **not** add the
      standalone Clarity script — the client's third message of 25 September
      says GTM fires it and the standalone copy would double-count. Leave the
      IDs in env vars, unset outside production.
- [ ] Verify all eleven conversion events in **GTM Preview**, which fires to a
      debug view and does not touch production data.

### Days 5–6 — content as it arrives

- [ ] Industries: draft from the prototype summaries for client review, or lift
      `noindex` if real copy arrives. Marine & Offshore Vessels is in the same
      queue, now that it has a route to arrive on.
- [ ] Resources: same. Nothing publishes until there is article text.
- [ ] Drop in photography as Greeshma sends it; fall back to the legacy
      originals copied on day 1.

### Day 7 — cutover

- [ ] Replay the crawl against the production build; confirm 79/95 and 15/15
      still resolve in one hop.
- [ ] Confirm staging is `noindex` and password-protected.
- [ ] Switch the Cloudflare origin. Rollback is an origin switch back, so this
      is reversible in seconds.
- [ ] Set the production env vars: analytics IDs, `LEAD_API_URL`,
      `NEXT_PUBLIC_SITE_ENV=production`.
- [ ] Submit the sitemap; confirm indexability.

**Email is not at risk.** `smecoilandgas.com` has no MX records — mail runs on
`smecong.com`, a separate domain on separate DNS at GoDaddy. The switchover
cannot affect it.

---

## 3. Waiting on the client

Nothing here blocks the build; all of it blocks a page going live or coming out
of `noindex`. Ordered by how long someone else's calendar takes.

| | Needs | Blocks |
| --- | --- | --- |
| Projects & Resources article text | authoring + approval | the whole Resources cluster |
| Industries copy | authoring | 12 pages behind `noindex` |
| Photography | Greeshma | Gallery, and seven stock placeholders |
| Numerical product claims | an engineer | 16 of 30 product pages |
| Client logos and certifications | marketing, permissions | a launch gate |
| Privacy, cookie and consent wording | legal | launch, legally |
| 123 draft FAQ answers | engineering review | 37 pages improve |

The last two have been outstanding since **30 September**.

---

## 4. Decisions taken here, for the record

1. Existing URLs retained; six tabs become navigation, not a URL scheme.
2. `/customers/`, `/markets/` and `/digital/` survive.
3. Industries and Resources launch behind `noindex` rather than thin.
4. `api.smecoilandgas.com` added alongside `api.smec.in`, not instead of it.
5. Clarity loads through GTM only.
6. Gallery deferred.

Any of these can be reversed by the client; none of them wait on her to start.
