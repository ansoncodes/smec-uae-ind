SMEC OIL & GAS

# Website Technical, SEO, GEO & AI Discoverability Master
Developer implementation specification | 2026
Companion to: SMEC Website Content Master 2026

# 1. Purpose and Build Principle
This document is the implementation layer for the SMEC Oil & Gas website. The Content Master owns approved page copy, page intent, product/solution scope and RFQ language. This Technical Master owns information architecture, rendering, technical SEO, structured data, indexation, redirects, performance, analytics, forms, accessibility, security, GEO/AI discoverability and launch QA. Where a technical claim conflicts with an approved engineering datasheet, the approved datasheet wins.
Primary commercial position: SMEC is presented as a turnkey engineering and system/package solution provider for defined E&I, automation, electrical, rig/offshore, brownfield and digital scopes. Do not describe SMEC as the full EPC contractor for an entire facility unless that exact contractual responsibility is verified.

# 2. Non-Negotiable Architecture Rules
One indexable URL = one primary search intent, one visible H1 and one self-referencing canonical.
Core commercial copy, answer blocks, FAQs and internal links must exist in server-rendered HTML. Do not hide critical text in client-only JavaScript.
Use clean, lowercase, descriptive URLs with trailing slashes. Avoid query-string URLs for canonical commercial pages.
No orphan commercial pages. Every product/solution page must be reachable from navigation or a relevant hub and linked from at least two contextually relevant pages.
Do not merge E-House with drilling Power House. E-House owns modular electrical-room intent; Power House owns drilling-rig power/control intent.
Turnkey is a cross-site positioning layer and a dedicated solution page, not a replacement for individual capability pages.
Do not publish unverified ratings, OEM authorizations, client logos, certifications, SIL/Ex claims, project outcomes or office details.
Every product page must support new build, retrofit/modernization and replacement where technically valid.
Every technical page must answer: what it is; where it is used; what problem triggers the requirement; what SMEC can engineer/supply/integrate; interfaces/constraints; what is needed to quote.
Staging must be blocked from indexing. Production must not inherit staging noindex rules.

# 3. Final Information Architecture
| Navigation group | Pages / entities |
| Industries & Markets | Upstream; Offshore Drilling; Onshore Drilling; Well Services; Production Facilities; Onshore Fields; Land Rigs; Gathering Stations; Midstream; Pipelines; Tank Farms; LNG Terminals; Pumping Stations; Downstream; Refineries; Petrochemicals; Gas Processing; Utilities |
| By Customer | Drilling Contractors; EPC Contractors; NOCs; IOCs; OEM & Package Vendors; Fleet Operators; Industrial Manufacturers |
| Solutions — Engineering | Turnkey Engineering & System Solutions; Automation & Control; Electrical Engineering; Instrumentation; System Integration; Panel Engineering & Manufacturing; Testing & Commissioning; Hydraulics & Pneumatics |
| Solutions — Programs | Rig Modernization; Brownfield Engineering; Greenfield Projects; PLC/SCADA/DCS Migration; Shutdown & Turnaround; Lifecycle & Obsolescence |
| Electrical Packages | E-Houses & Modular Electrical Rooms |
| Rig & Offshore Systems | Power Houses; VFD Houses; SCR Houses; Battery Chargers; DMS3000; Integrated Drilling Control; Top Drive Control; Jacking Control; RPD; Load Monitoring; BOP Control; Gas Watch; PAGA; Explosion-Proof CCTV; Flare Ignition; Generator Control/PMS; Skidding Current Monitoring; Ballast Control; Marine Growth Prevention; Illumination Hut |
| Plant / Electrical / Control Products | MCC/PCC/Distribution; PLC/HMI/Drive Panels; Fire & Gas; ICSS; Boiler/Burner Management; Bilge Alarm; Driller Talkback/AV Alarm; Plant Automation/SCADA; Dam Level Monitoring; Automatic Fire Fighting |
| Digital | Digital Engineering; NexWave; ProSet360; NexVerse; NexView; Fuel Monitoring |
| Resources | Asset Archaeology; Technical Guides/Whitepapers; Case Studies; Checklists; Calculators; Glossary; FAQs |
| Company | About; MD Message; Vision & Mission; Abu Dhabi Office; India Engineering Hub; Leadership; Certifications; OEM Partners; Clients & Project Experience; Careers; Contact/RFQ |
| Markets | Middle East; Global Project Support |


# 4. URL and Search-Intent Ownership
Do not let multiple URLs compete for the same query. Use the following ownership model:
| Page type | Owns | Examples |
| Homepage | Broad brand + category intent | oil and gas engineering company; E&I; automation; turnkey system solutions |
| Industry pages | Asset/facility context | refinery automation; LNG E&I; offshore drilling electrical systems |
| Customer pages | Procurement/buyer context | E&I partner for EPC; engineering support for drilling contractors |
| Engineering solution pages | Capability/RFQ intent | system integration; electrical engineering; instrumentation |
| Program pages | Change-event intent | rig modernization; PLC migration; shutdown support; brownfield engineering |
| Product pages | Exact system/product intent | VFD House; DMS3000; Gas Watch; Jacking Control |
| Digital pages | Software/use-case intent | remote monitoring; CMMS; digital twin; industrial video analytics |
| Resources | Informational/question intent | how to plan PLC migration; E-House RFQ checklist; SCR vs VFD |


# 5. On-Page SEO Standard
| Element | Implementation rule |
| Title tag | Unique and descriptive. Aim for concise SERP readability rather than a rigid character count. Put the primary entity early and SMEC at the end where natural. |
| Meta description | Unique conversion-oriented summary. Explain scope and buyer value; avoid keyword stuffing. Treat as snippet copy, not a ranking field. |
| H1 | Exactly one primary visible H1 matching the page's core entity/search intent. |
| Answer block | 2–3 factual sentences directly below/near H1 that can stand alone in search and AI retrieval. |
| H2/H3 | Organize by buyer question and technical entity: scope, architecture, applications, interfaces, lifecycle, RFQ inputs, FAQs. |
| Images | Descriptive filename + factual alt text. Decorative images use empty alt. Never put essential text only inside images. |
| Internal links | Use descriptive anchor text. Link entity-to-entity where the relationship is real; avoid repetitive exact-match stuffing. |
| Downloads | Keep datasheets indexable/reachable where approved. Link the canonical HTML product page prominently from the PDF/download context. |
| Breadcrumbs | Visible breadcrumb matching information architecture. Use BreadcrumbList JSON-LD on indexable non-home pages. |
| Canonical | Absolute HTTPS self-canonical for normal indexable pages. Canonical must match sitemap URL and preferred trailing-slash format. |


# 6. FAQ Strategy — Yes, FAQs Are Included
The content architecture includes visible buyer FAQs on the homepage and priority product, solution and industry pages. FAQs should be written for qualification and decision support, not added merely to create schema.
| Page family | Question pattern | Answer rule |
| Product | Can this system be supplied as new build, retrofit or replacement? | Answer against the actual product scope and installed-base constraints. |
| Product | What information is required for quotation? | List datasheet/specification, make/model, drawings, ratings, interfaces, site and required date. |
| Migration | Can the existing field wiring/I/O be retained? | State that this depends on survey, I/O condition, compatibility, safety and cutover strategy. |
| Turnkey | What does SMEC mean by turnkey? | Defined package responsibility from engineering/procurement through build, integration, FAT, site execution and commissioning, subject to agreed scope. |
| E-House | What can be integrated inside an E-House? | Project-defined switchgear, MCC/PCC, drives, UPS/DC, control/automation, HVAC and auxiliaries subject to approved design. |
| Digital | Can the solution work with existing PLC/SCADA/cameras? | State that installed-base and protocol/data availability are assessed first. |

Important 2026 implementation note: visible FAQ content is still useful for users, search understanding and AI retrieval. Do not promise Google FAQ rich results. FAQ structured data may be used only when it accurately describes visible content and remains appropriate under current search-engine guidance; rich-result eligibility is not guaranteed.

# 7. Structured Data / JSON-LD
| Page type | Schema |
| Sitewide entity | Organization |
| Homepage | WebSite + Organization |
| Non-home pages | BreadcrumbList |
| Industry / customer / service / program / market | Service where it truthfully describes a service |
| Physical engineered product/system | Product |
| NexWave / ProSet360 / NexVerse / NexView where software definition is accurate | SoftwareApplication |
| Resource article / case study / technical guide | Article |
| Leadership / MD | Person |
| Careers listing | CollectionPage; JobPosting only on live individual vacancies |
| Glossary | DefinedTermSet / DefinedTerm |
| Verified office page | LocalBusiness or appropriate subtype only when the legal entity, address and public business data are verified |

Structured data must describe visible page content. Never create ratings, reviews, prices, offers, certifications or properties that are not present and verified.

## 7.1 Organization JSON-LD template
{  "@context": "https://schema.org",  "@type": "Organization",  "@id": "https://DOMAIN/#organization",  "name": "SMEC Oil & Gas Solutions LLC",  "url": "https://DOMAIN/",  "logo": "https://DOMAIN/path/logo.png",  "description": "VISIBLE APPROVED ORGANIZATION DESCRIPTION",  "address": {    "@type": "PostalAddress",    "streetAddress": "VERIFIED",    "addressLocality": "Abu Dhabi",    "addressCountry": "AE"  },  "contactPoint": [{    "@type": "ContactPoint",    "telephone": "VERIFIED",    "email": "VERIFIED",    "contactType": "sales"  }],  "sameAs": ["ONLY VERIFIED OFFICIAL PROFILES"]}

## 7.2 Product JSON-LD template
{  "@context":"https://schema.org",  "@type":"Product",  "name":"PAGE H1 / APPROVED PRODUCT NAME",  "brand":{"@type":"Brand","name":"SMEC"},  "description":"VISIBLE ANSWER BLOCK",  "image":["ABSOLUTE IMAGE URL"],  "url":"CANONICAL URL",  "additionalProperty":[    {"@type":"PropertyValue","name":"VERIFIED PROPERTY","value":"VERIFIED VALUE"}  ]}

# 8. Crawl, Indexation and Canonicalization
Production robots.txt must allow normal search crawling and reference the XML sitemap.
Do not use robots.txt as a substitute for noindex. Pages that must stay out of search should use authentication or an appropriate noindex directive while remaining crawlable if removal is required.
Staging, preview and development hosts must be password-protected and/or noindex from the start.
XML sitemap contains only canonical, indexable, 200-status URLs. Exclude redirects, 404s, noindex pages and parameter duplicates.
Use accurate lastmod only when the page meaningfully changes.
Submit sitemap in Google Search Console and Bing Webmaster Tools.
Use IndexNow for newly published, materially updated or deleted URLs where the stack supports it.
No mass submission of unchanged URLs.

# 9. Redirect and Migration Plan
Export all current production URLs before launch: HTML pages, PDFs, images receiving traffic/backlinks and indexed legacy URLs.
Create one-to-one 301 redirects from each replaced URL to the closest equivalent new URL.
Never redirect the entire old site to the homepage.
Keep valuable legacy datasheet URLs reachable where possible. If a PDF is replaced, redirect it to the current equivalent or preserve the old URL.
Update internal links to final URLs; do not rely on redirect chains.
Eliminate redirect chains and loops. Target one hop.
Return true 404/410 for content with no replacement rather than soft-404ing to unrelated pages.
After launch, crawl both the old URL inventory and new sitemap to verify status/canonical/redirect behavior.

# 10. Internal Linking / Topic Clusters
| Cluster | Required contextual links |
| Turnkey | Turnkey Solutions ↔ E&I ↔ Automation ↔ System Integration ↔ Panel Manufacturing ↔ Testing & Commissioning ↔ EPC Contractors |
| E-House | E-House ↔ Electrical Engineering ↔ MCC/PCC ↔ VFD/UPS/DC ↔ System Integration ↔ LNG/Refinery/Pipeline/Utilities |
| Rig Modernization | Offshore/Onshore Drilling ↔ Rig Modernization ↔ Power/VFD/SCR Houses ↔ DMS3000 ↔ Jacking/RPD/Load ↔ BOP/PAGA/Gas Watch |
| Brownfield | Brownfield ↔ Lifecycle/Obsolescence ↔ PLC/SCADA/DCS Migration ↔ Shutdown ↔ Panel Modification ↔ Commissioning |
| Digital | Digital Engineering ↔ NexWave ↔ ProSet360 ↔ NexVerse ↔ NexView ↔ Fuel Monitoring ↔ industry use cases |


# 11. GEO / AI Discoverability
Use exact engineering entities in the H1 and first 100 words when they are the page subject: E-House, VFD House, DMS3000, Jacking Control System, Gas Watch, PAGA, etc.
Use short answer blocks that identify entity + function + SMEC role without slogans.
Keep key facts in crawlable HTML, not only PDFs, videos, images or sliders.
Use consistent organization/entity names across About, footer, schema, contact pages and external business profiles.
Publish evidence-led case studies with asset type, problem, scope, architecture, FAT/SAT and approved outcome.
Use primary/official sources for technical standards, regulations and project facts in resource content.
Show authorship/reviewer information for technical articles where approved, including role and expertise.
Maintain datePublished/dateModified on articles and visibly update materially revised technical resources.
Use llms.txt only as an optional discovery aid. It is not a substitute for crawlable HTML, sitemaps, internal linking, structured data or evidence.
Avoid mass-produced near-duplicate AI pages. Every indexable page must have a distinct buyer purpose and substantive technical content.

# 12. Page Component Wireframe — Developer Standard
| Order | Component | Rule |
| 1 | Breadcrumb | Visible; matches IA |
| 2 | Hero / answer block | Eyebrow + H1 + 2–3 sentence answer + primary CTA + secondary CTA |
| 3 | Buyer trigger | What problem/event brings the buyer here? |
| 4 | Technical scope | Systems, equipment, software and engineering included |
| 5 | Architecture / interfaces | What connects to what; boundaries; protocols only where relevant |
| 6 | Applications | Asset/facility/use-case contexts |
| 7 | Lifecycle options | New build / repair / retrofit / migrate / replace as applicable |
| 8 | SMEC delivery chain | Engineering → procurement/build → integration → FAT → site → SAT/commissioning → lifecycle |
| 9 | Evidence | Approved case study/project/reference/datasheet |
| 10 | FAQ | 3–6 visible buyer questions where useful |
| 11 | RFQ inputs | Exact information needed to quote |
| 12 | Related pages | 3–6 contextual internal links |
| 13 | Closing CTA | Send RFQ / Talk to an Engineer |


# 13. Turnkey Solutions Page — Technical Build Specification
Recommended canonical: /solutions/turnkey-engineering-system-solutions/
H1: Turnkey E&I, Automation & System Solutions
Answer block: SMEC takes defined electrical, instrumentation, automation, control and packaged-system scopes from engineering and procurement through panel/package build, software, integration, FAT, site execution, testing and commissioning. Scope boundaries, exclusions and responsibility matrices must be explicit at quotation stage.
| Section | Content / implementation |
| What turnkey means | Single defined package responsibility; not an unqualified claim to whole-facility EPC. |
| Scope families | E&I; automation/control; panels; E-Houses; rig/offshore systems; brownfield modernization; testing/commissioning; digital integration. |
| Delivery chain | Requirements → engineering → procurement → build → software → integration → FAT → logistics → site execution → SAT/commissioning → handover/support. |
| Interface ownership | Vendor packages, protocols, electrical/control boundaries, field interfaces, drawings, software, FAT and site cutover. |
| RFQ inputs | BOQ, P&IDs, SLDs, I/O list, datasheets, control philosophy, vendor list, site, schedule, standards and execution boundary. |
| FAQ | What does turnkey mean? Can SMEC work from FEED/tender? Can SMEC integrate multi-OEM systems? Does turnkey include site installation? What documents are needed? |


# 14. Product Page Technical Template
| Field | Required content |
| SEO | Title, meta description, canonical, primary query/entity, OG title/description/image |
| Hero | Product name + concise functional definition + CTA |
| System purpose | Operational function and buyer trigger |
| Architecture | Main subsystems, inputs/outputs, interfaces and operator layer |
| Technical specifications | Only verified ratings/standards; otherwise label project-specific |
| Integration | PLC/SCADA/PMS/DCS/ESD/field/OEM interfaces as relevant |
| Environment | Indoor/outdoor, hazardous area, enclosure, temperature only if verified |
| Lifecycle | New build, retrofit, repair, replacement |
| Testing | FAT/SAT/commissioning scope |
| Documents | GA, SLD/schematic, BOM, I/O, terminal plan, software/configuration, test records/as-built where applicable |
| FAQ | Buyer qualification questions |
| RFQ | Make/model, datasheet, drawings, ratings, fault, site, required date/window |


# 15. Product Publication Gate
| Page / claim family | Required sign-off |
| Gas Watch | Confirm measurement ranges, H2S details, response time, outputs, enclosure, hazardous-area classification, ATEX/IECEx and any SIL statement. |
| Flare Ignition | Confirm ignition hardware/energy, number of points, HV cable limits, enclosure/IP/Ex details and terminal ratings. |
| VFD/SCR/Battery Charger | Confirm voltage/current/power ranges, topology, cooling and applicable standards. |
| E-House | Confirm voltage classes, fault level, IP, fire/blast requirements, structural/transport limits and certification scope. |
| BOP / F&G / ICSS | Safety-critical claims require engineering and project-document approval; do not imply certification authority beyond actual scope. |
| OEM logos/authorization | Publish only with current documentary support and permission. |
| Clients/case studies | Use names, logos and quantified outcomes only with approval. |


# 16. Performance / Core Web Vitals
Design for fast LCP: optimize hero media, preload only the true LCP asset, use responsive AVIF/WebP, avoid autoplay video as the default hero on mobile.
Protect CLS: set explicit width/height or aspect-ratio for images, video, embeds, cards and banners; reserve space for dynamic content.
Protect INP: minimize main-thread JavaScript, third-party scripts and heavy client-side hydration; defer non-critical widgets.
Server-render core page content. Use progressive enhancement for filters, accordions and calculators.
Lazy-load below-the-fold images/iframes; do not lazy-load the LCP image.
Self-host/subset fonts where licensing allows; limit weights; use font-display strategy that avoids invisible text.
Use CDN caching, Brotli/Gzip, immutable hashed static assets and long cache headers for versioned files.
Set a performance budget and test representative mobile pages before launch: homepage, E-House, VFD House, product-heavy page, article and contact/RFQ.

# 17. Accessibility
Semantic heading hierarchy; do not use headings only for visual styling.
Keyboard-accessible navigation, mega menus, accordions, modals and forms.
Visible focus states and sufficient contrast.
Form labels must be programmatically associated; errors must identify the field and corrective action.
Alt text for informative images; empty alt for decorative images.
Do not encode technical meaning by color alone.
Tables require real header cells and sensible mobile behavior.
Respect reduced-motion preferences; avoid essential information in animation.
Target WCAG 2.2 AA as the implementation baseline.

# 18. RFQ / Lead Form Engineering
| Group | Fields |
| Identity | Name; company; email; phone; country/site |
| Commercial context | End user; asset/facility/rig; project stage: FEED/tender/execution/operating/shutdown |
| Technical context | Scope type; existing OEM/model; brief requirement/fault |
| Schedule | Required date; shutdown/mobilization window; site execution yes/no |
| Uploads | RFQ; BOQ; P&ID; SLD; I/O list; equipment list; drawings; fault history; specification |
| Consent | Privacy/consent text and anti-spam protection |

Do not make every field mandatory. Use progressive qualification: minimum viable contact + scope first, richer technical inputs optional but encouraged.

# 19. Analytics & Conversion Measurement
| Event | Definition |
| rfq_submit | Successful RFQ submission |
| rfq_file_upload | At least one technical file uploaded |
| cta_talk_engineer | Talk to an Engineer CTA |
| click_phone | Telephone link |
| click_whatsapp | WhatsApp CTA |
| click_email | Email CTA |
| datasheet_download | Approved technical datasheet download |
| case_study_view | Case-study detail open |
| product_to_rfq | RFQ initiated from product page |
| solution_to_rfq | RFQ initiated from solution page |
| form_error | Validation/submission failure |

Capture page path, page type, product/solution name, CTA location and campaign parameters where privacy rules allow. Do not send sensitive RFQ text or uploaded-file contents into analytics.

# 20. Security and Form Hardening
HTTPS only; redirect HTTP to HTTPS.
Security headers appropriate to the stack: HSTS after validation, CSP, frame-ancestors, X-Content-Type-Options and a sensible Referrer-Policy.
Server-side form validation; sanitize uploads and filenames; restrict file types and size; malware-scan where infrastructure supports it.
Rate-limit forms and protect against automated abuse without making legitimate industrial RFQs difficult.
Do not expose API keys, SMTP credentials or private endpoints in client JavaScript.
Use least-privilege access for CMS/admin systems and enable MFA for privileged accounts.
Keep dependencies patched and monitor production errors.

# 21. Open Graph, Social and Media SEO
Unique OG title/description for priority pages; default to SEO title/description where appropriate.
Use 1200×630 social images for priority commercial/resource pages.
Use absolute image URLs and specify image dimensions.
Product images: descriptive filename such as smec-vfd-house-factory-acceptance-test.webp, not IMG_1234.webp.
Video pages should include a transcript/summary in HTML and a poster image. Add VideoObject only when the page actually contains a qualifying video and metadata is accurate.

# 22. International / Regional SEO
Do not generate thin UAE/Saudi/Oman/Qatar pages merely to target locations.
Use Middle East, Abu Dhabi Office, India Engineering Hub and Global Project Support as evidence-rich regional pages.
Create a country page only when SMEC has meaningful country-specific evidence: office/partner/execution model, projects, approvals, local contact or substantial market-specific content.
If language variants are introduced later, use dedicated URLs and correct hreflang pairs plus x-default. Do not use hreflang for English pages that merely mention different countries.

# 23. Resource Centre SEO System
| Resource type | SEO role | Required structure |
| Asset Archaeology | Entity/history + lifecycle authority | Entity-first title; sourced timeline; engineering significance; current relevance; internal links |
| Technical Guide | Problem/question capture | Direct answer; assumptions; diagrams/tables; decision framework; related commercial page |
| Case Study | Evidence | Asset → problem → SMEC scope → architecture → FAT/SAT → approved outcome |
| Checklist | Lead utility | Practical inputs; downloadable version optional; HTML summary remains indexable |
| Calculator | Utility/search intent | Formula, units, assumptions, limitations, engineering-review statement |
| Glossary | Entity definitions | One canonical definition per term; DefinedTerm markup where appropriate; contextual links |


# 24. Sitemap / Robots / IndexNow
Recommended production robots.txt:
User-agent: *Allow: /Sitemap: https://DOMAIN/sitemap.xml
If the site becomes large, use a sitemap index separating commercial pages, resources and media. IndexNow should notify participating search engines when URLs are added, materially updated or deleted; it does not guarantee indexing.

# 25. 404, Search and Empty States
Custom 404 with clear navigation to Products, Solutions, Industries and Contact/RFQ. Return HTTP 404.
Site search results should normally be noindex unless there is a deliberate search landing-page strategy.
Filter/facet combinations should not create unlimited indexable URLs.
Empty category/filter states must not return thin indexable pages.
Broken or retired PDFs should have an intentional replacement/redirect strategy.

# 26. Pre-Launch SEO QA
☐ Every indexable URL returns 200 and is HTTPS.
☐ One H1 per page; title/meta/canonical present and unique.
☐ Canonical URL equals preferred sitemap URL.
☐ No production noindex/nofollow left accidentally.
☐ robots.txt accessible and sitemap referenced.
☐ XML sitemap contains only canonical 200 indexable URLs.
☐ Old URL redirect map tested; no chains/loops.
☐ Structured data validates syntactically and matches visible content.
☐ Breadcrumbs work and match schema.
☐ All priority pages have internal links and no orphan pages.
☐ Images have correct dimensions, compression and alt treatment.
☐ Mobile navigation, accordions and forms keyboard-tested.
☐ RFQ upload and confirmation flow tested.
☐ Analytics conversion events tested without sensitive payloads.
☐ Core Web Vitals tested on representative mobile pages.
☐ 404s, server errors and broken links crawled and fixed.
☐ Google Search Console and Bing Webmaster Tools verified; sitemap submitted.
☐ IndexNow enabled if supported.
☐ Production domain has correct Organization/entity details and verified office information.
☐ Engineering sign-off complete for numerical specs, safety claims, certifications, OEM/client references.

# 27. Post-Launch 30/60/90-Day Plan
| Window | Actions |
| Days 0–7 | Inspect sitemap/indexation; crawl redirects; monitor 404/5xx; verify analytics/RFQ; inspect priority URLs in Search Console/Bing. |
| Days 8–30 | Review impressions/query coverage; fix duplicate titles/canonicals; strengthen internal links; publish first evidence-led guides/case studies; assess CWV field data as it appears. |
| Days 31–60 | Expand high-intent resource clusters; compare product/solution impressions to RFQ actions; improve weak answer blocks and FAQs; review crawl/indexation anomalies. |
| Days 61–90 | Content pruning/merging where cannibalization appears; add verified project evidence; refresh priority pages; build quarterly technical content roadmap from actual query/RFQ data. |


# 28. SEO KPI Framework
| Layer | KPIs |
| Technical health | Indexable pages; valid canonicals; 404/5xx; redirect errors; structured-data errors; CWV pass rate |
| Visibility | Non-brand impressions; top queries by solution/product; indexed commercial pages; rich/standard result coverage |
| Engagement | Organic landing sessions; scroll/engagement; datasheet/case-study interactions |
| Commercial | RFQ submits; qualified RFQs; product-to-RFQ rate; solution-to-RFQ rate; assisted conversions |
| Content authority | Queries and links to technical guides/case studies; commercial-page internal-link contribution |


# 29. Source-of-Truth Hierarchy
1. Approved engineering datasheet / project specification for numerical technical claims.
2. Approved SMEC Content Master for website wording, page ownership and RFQ copy.
3. This Technical SEO Master for implementation rules.
4. Verified legal/corporate records for addresses, certifications, entity names and authorizations.
5. Search-engine/platform documentation for current implementation eligibility and validation.

# 30. Final Developer Handoff Checklist
Build from the Content Master; do not rewrite answer blocks into generic marketing slogans.
Keep full technical content in HTML even when visually presented with tabs/accordions/cards.
Implement the final sitemap and URL ownership before coding page templates.
Create reusable templates for Industry, Customer, Solution, Program, Product, Digital, Resource and Company pages.
Create reusable JSON-LD generators by page type; never hard-code unverified properties.
Create a redirect manifest and preserve valuable legacy assets.
Implement analytics events before UAT.
Run accessibility, performance, structured-data, crawl and form QA before DNS cutover.
After launch, monitor indexation and RFQ behavior; SEO is an operating system, not a one-time metadata exercise.
END — SMEC WEBSITE TECHNICAL, SEO, GEO & AI DISCOVERABILITY MASTER 2026

# 31. FINAL ARCHITECTURE LOCK — SUPERSEDES CONFLICTING IA
This section resolves the final handoff architecture. Where earlier navigation tables in this document conflict with this section, this section wins.
| LOCKED TOP-LEVEL NAVIGATION |
| 1 | Industries & Markets |
| 2 | By Customer |
| 3 | Solutions |
| 4 | Products |
| 5 | Digital |
| 6 | Resources |
| 7 | Company |
| 8 | Contact / RFQ |


## Products consolidation
Use one top-level Products tab. Do not expose Electrical Packages, Rig & Offshore Systems, Plant / Electrical / Control Products as separate top-level navigation items. They are product-category groupings beneath Products.
| Product category | Entities |
| Electrical & Modular Packages | E-Houses & Modular Electrical Rooms; MCC/PCC/Distribution; PLC/HMI/Drive Panels; Battery Chargers |
| Rig & Offshore Systems | Power Houses; VFD Houses; SCR Houses; DMS3000; Integrated Drilling Control; Top Drive Control; Jacking Control; RPD; Load Monitoring; BOP Control; Generator Control/PMS; Skidding Current Monitoring |
| Safety, Communication & Marine Systems | Gas Watch; Fire & Gas; PAGA; Explosion-Proof CCTV; Flare Ignition; Ballast Control; Marine Growth Prevention; Bilge Alarm; Driller Talkback/AV Alarm; Automatic Fire Fighting; Illumination Hut |
| Plant & Control Systems | ICSS; Boiler/Burner Management; Plant Automation/SCADA; Dam Level Monitoring |
| Digital Products | NexWave; ProSet360; NexVerse; NexView; Fuel Monitoring |


## Canonical URL locks
Turnkey: /solutions/turnkey-engineering-system-solutions/
All physical engineered product/system pages: /products/<slug>/
Required hubs: /industries/, /industries/onshore/, /customers/, /solutions/, /products/, /digital/, /resources/, /company/.
No breadcrumb may point to a missing hub. All hubs return 200, self-canonicalize and are present in the XML sitemap if indexable.

# 32. FAQ IMPLEMENTATION LOCK
The Content Master contains the approved visible FAQ library. Render only the FAQs assigned to the current page. Do not generate FAQ schema for a page unless the same question and answer are visible in rendered HTML.
Default priority pages: homepage, Turnkey, E-House, key migration/brownfield pages, priority products, selected industries and digital pages.
Use 3–6 visible buyer questions where they materially help qualification or decision support.
FAQ rich results are not an acceptance criterion.
Do not create invented ratings, prices, reviews, certifications or claims in structured data.

# 33. CMS / COMPONENT MODEL
| Component | Requirement |
| Page shell | Breadcrumb; hero/answer block; primary/secondary CTA; content sections; evidence; FAQ; RFQ; related pages; closing CTA |
| Reusable RFQ block | Common qualification fields and uploads; page-specific additions supported without duplicating copy |
| Evidence card | Approved case study/project/datasheet only; supports publication status and source |
| FAQ component | Question + answer fields; schema generated only from visible component |
| Product specification table | Verified values only; project-specific values labelled accordingly |
| Related pages | Editorially controlled contextual links; 3–6 relevant destinations |
| Publication status | Draft / Engineering Review / Legal-Corporate Review / Approved / Published |


# 34. CONTENT STATUS / INDEXATION RULE
A template may exist before content approval, but thin placeholder pages must remain noindex and excluded from the XML sitemap.
Company pages requiring verified people, certifications, OEM relationships, client/project evidence or office details are not publish-ready until supplied and approved.
Product pages without approved numerical specifications may publish only if the non-numerical technical content is substantive; otherwise keep noindex until enriched.
Internal editorial notes must be stored in CMS/admin fields or documentation, never rendered to the public page.

# 35. FINAL PRE-CODE FREEZE
Freeze final URL manifest before templates are wired.
Map every legacy URL to keep / redirect / retire before launch.
Confirm production domain and replace DOMAIN placeholders in schema, sitemap and robots instructions.
Confirm verified legal entity name, office addresses, sales email, telephone and official social profiles.
Confirm CMS/hosting stack, analytics stack, consent/cookie implementation, spam protection and form destination before UAT.
Confirm English-only launch or approved language scope. Do not add hreflang until real language variants exist.