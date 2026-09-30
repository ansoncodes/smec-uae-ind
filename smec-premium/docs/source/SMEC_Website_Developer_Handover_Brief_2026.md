SMEC OIL & GAS
WEBSITE DEVELOPER HANDOVER BRIEF
Build decisions • assets • integrations • responsibilities • acceptance criteria | 2026
| DOCUMENT ROLE |
| Purpose | Translate the approved Content Master and Technical/SEO Master into an executable web-development scope. |
| Developer principle | Do not invent content, technical claims, URLs, schema properties or corporate facts. |
| Build sequence | Freeze architecture → configure templates/CMS → load approved content → integrate forms/analytics → migrate/redirect → UAT → launch → monitor. |
| Unresolved items | Items marked CLIENT DECISION or VERIFIED INPUT must be confirmed by SMEC before the relevant build/UAT gate. |


# 1. Source of Truth
| Priority | Document | Owns |
| 1 | Approved engineering datasheet / project specification | Numerical ratings, standards, safety-critical and product-specific technical claims |
| 2 | Website Content Master 2026 — Final Handoff | Publishable wording, page intent, FAQs, RFQ language, content status |
| 3 | Technical, SEO, GEO & AI Master 2026 — Final Handoff | Architecture implementation, SEO, schema, performance, accessibility, security, analytics |
| 4 | This Developer Handover Brief | Build decisions, assets, integrations, responsibilities, UAT and acceptance |
| 5 | Verified corporate/legal records | Entity names, addresses, certifications, authorizations, public contact data |


# 2. Locked Site Architecture
Top-level navigation is locked to:
Industries & Markets
By Customer
Solutions
Products
Digital
Resources
Company
Contact / RFQ
Products is a single top-level tab. Product categories may be presented inside a mega-menu or Products hub, but must not become separate top-level navigation items.

# 3. Locked URL Decisions
| Decision | Locked value |
| Turnkey canonical | /solutions/turnkey-engineering-system-solutions/ |
| Product canonical pattern | /products/<slug>/ |
| Hub pages | /industries/, /industries/onshore/, /customers/, /solutions/, /products/, /digital/, /resources/, /company/ |
| URL format | Lowercase, descriptive, trailing slash, self-canonical |
| Legacy URLs | One-to-one 301 to closest equivalent; never bulk-redirect unrelated URLs to homepage |


# 4. Homepage Build Direction
The homepage is a semantic and conversion hub, not a corporate brochure.
Primary logic: asset → engineering problem → system architecture → SMEC scope → evidence → RFQ.
Answer quickly: what SMEC engineers; assets served; problems solved; delivery model; what the buyer should send.
Keep full Mission/Vision, MD Message, corporate history, leadership, certifications, OEM relationships and legal/group detail under Company.
Use verified proof only. No invented numbers, client logos, certifications, OEM authorization or outcomes.

# 5. Required Page Templates
| Template | Core components | Notes |
| Industry | Hero; buyer trigger; scope; interfaces; applications; lifecycle; evidence; FAQ; RFQ; related pages | Asset/facility search intent |
| Customer | Hero; procurement context; scope; delivery model; evidence; FAQ; RFQ | Buyer-context search intent |
| Solution / Program | Hero; problem trigger; architecture; delivery chain; interfaces; evidence; FAQ; RFQ | Capability or change-event intent |
| Product | Hero; purpose; architecture; verified specs; integration; lifecycle; FAT/SAT; documents; FAQ; RFQ | Exact product/system intent |
| Digital | Hero; operating decision; data sources; architecture; integration; cybersecurity boundary; FAQ; RFQ | Software/use-case intent |
| Resource | Direct answer; assumptions; diagrams/tables; evidence/sources; author/reviewer; related commercial page | Article/guide/case study/checklist/calculator/glossary |
| Company | Verified corporate content only | Do not publish placeholders as facts |
| Contact / RFQ | Progressive form; uploads; consent; confirmation | Protect technical uploads and sensitive enquiry text |


# 6. CMS / Editing Requirements
Non-technical SMEC users must be able to edit title, meta description, H1, answer block, body sections, FAQs, CTAs, related pages, evidence cards and publication status.
Reusable components: RFQ block, FAQ, evidence card, specification table, related-pages block, office/contact card and CTA.
Structured data must be generated from visible CMS content, not maintained as separate contradictory copy.
Support Draft / Engineering Review / Corporate Review / Approved / Published states, or an equivalent editorial workflow.
Prevent accidental indexation of draft/placeholder pages.

# 7. Platform & Hosting — CLIENT DECISION
| Decision | Requirement | Owner / status |
| Framework/CMS | Confirm final stack. Requirement: server-render or statically render core commercial content; avoid JS-only core copy. | SMEC + Developer — TO CONFIRM |
| Hosting/CDN | Confirm production hosting, CDN, backup and deployment ownership. | SMEC + Developer — TO CONFIRM |
| Repository | Confirm code repository owner, access, branching and handover. | SMEC + Developer — TO CONFIRM |
| Environments | Development, staging and production. Staging must be password-protected and/or noindex. | SMEC + Developer — TO CONFIRM |
| CMS access | Define admin roles, MFA and least-privilege permissions. | SMEC + Developer — TO CONFIRM |
| Support | Confirm warranty/bug-fix period, maintenance owner, dependency updates and SLA after launch. | SMEC + Developer — TO CONFIRM |


# 8. Design & Brand Inputs — VERIFIED INPUT
Approved logo files and brand usage rules
Approved colour palette and typography / licensed fonts
Desktop and mobile design direction or approved reference sites
Photography / factory / panel / project / product image library with usage rights
Product renders, diagrams, videos and approved datasheets
Icon style and illustration approach
Social-share image template (1200 × 630)
Design must remain engineering-led and information-dense without becoming brochure-like. Mobile readability and RFQ conversion take priority over decorative motion.

# 9. Forms, CRM & Enquiry Routing — CLIENT DECISION
| Item | Requirement | To confirm |
| Destination | Named sales/RFQ mailbox and/or CRM | Exact mailbox/CRM |
| WhatsApp | Track click; use verified business number | Number |
| Telephone | Track click; use verified public number | Number |
| Uploads | RFQ, BOQ, P&ID, SLD, I/O, equipment list, drawings, fault history, specification | Allowed types/size/retention |
| Spam protection | Server-side validation + rate limiting + suitable anti-abuse control | Provider |
| Confirmation | On-page success state and/or thank-you page; no sensitive query strings | Final copy |
| Data retention | Define retention/deletion/access policy for technical RFQ files | SMEC policy |


# 10. Analytics, Search & Consent
Confirm GA4 and/or GTM ownership and account IDs before UAT.
Implement events: rfq_submit, rfq_file_upload, cta_talk_engineer, click_phone, click_whatsapp, click_email, datasheet_download, case_study_view, product_to_rfq, solution_to_rfq and form_error.
Never send RFQ text, uploaded file contents or sensitive technical data into analytics.
Verify Google Search Console and Bing Webmaster Tools; submit final sitemap after launch.
Implement cookie/consent behavior appropriate to the selected analytics and legal requirements.

# 11. Legal & Compliance Pages — CLIENT INPUT
Privacy Policy
Cookie notice / consent information
Website Terms / Terms of Use
Form consent wording
Data-retention statement for uploaded RFQ/technical files where required
Accessibility statement if SMEC chooses to publish one

# 12. Language & Regional Scope
Launch language must be explicitly confirmed. Do not create Arabic or country-specific SEO pages merely for keyword coverage. If a real language variant is commissioned later, use dedicated URLs and correct hreflang pairs plus x-default.

# 13. Asset Migration Inventory
| Asset class | Action | Owner | Status |
| Current production URLs | Export full crawl/indexed inventory before launch | Developer | Required |
| PDF datasheets | Inventory; retain valuable URLs or redirect to current equivalent | SMEC + Developer | Required |
| Images/videos | Map source, rights, filename, alt requirement and destination page | SMEC | Required |
| Client/OEM logos | Publish only with approval/current authorization | SMEC | Gated |
| Case studies/projects | Verify naming, scope and outcomes before publication | SMEC | Gated |
| Certifications | Verify legal entity, validity and approved certificate file | SMEC | Gated |
| Office data | Verify legal entity, address, phone, email and public status | SMEC | Gated |


# 14. Redirect & Migration Deliverables
Old-to-new URL manifest with keep / 301 / retire status
No redirect chains or loops; target one hop
True 404/410 where no relevant replacement exists
Final internal links point directly to canonical URLs
Sitemap contains only canonical, indexable, 200-status URLs
Staging noindex/password protection removed correctly only on production launch

# 15. Performance & Accessibility Acceptance
Target WCAG 2.2 AA implementation baseline.
Keyboard-accessible navigation, mega menus, accordions, modals and forms.
Visible focus states; semantic headings; labelled form controls; meaningful error messages.
Responsive images using modern formats where practical; explicit dimensions/aspect ratio; no mobile autoplay hero video by default.
Core content server-rendered; below-the-fold media lazy-loaded; LCP asset not lazy-loaded.
Representative mobile pages tested before launch: homepage, E-House, VFD House, product-heavy page, article and Contact/RFQ.

# 16. Security Acceptance
HTTPS only; HTTP redirects to HTTPS.
Server-side validation and sanitization for forms and uploads.
Restrict file types and sizes; malware scanning where infrastructure supports it.
Rate-limit forms and protect against automated abuse.
No API keys, SMTP credentials or private endpoints exposed in client JavaScript.
MFA and least-privilege access for privileged CMS/admin accounts.
Appropriate security headers after validation: HSTS, CSP, frame-ancestors, X-Content-Type-Options and Referrer-Policy.

# 17. Content Publication Gates
| Content family | Gate | Launch behavior |
| Numerical product specs | Engineering/datasheet approval | Do not publish unverified values |
| Gas Watch / Flare / VFD / SCR / Battery / E-House | Engineering sign-off | Publish only approved ratings/standards |
| BOP / F&G / ICSS | Safety-critical engineering approval | No implied certification beyond actual scope |
| OEM partners/logos | Current documentary support + permission | Hide until approved |
| Clients/case studies/outcomes | Approval for names/logos/outcomes | Hide or anonymize until approved |
| Leadership / MD Message | Approved names, roles, biographies/message | No placeholder facts |
| Office pages | Verified legal entity/address/contact | No LocalBusiness schema until verified |


# 18. UAT & Sign-Off Matrix
| Area | Acceptance test | Primary owner | Sign-off |
| Content | Approved H1, answer block, FAQs, CTA and no internal notes visible | SMEC Marketing/BD | Required |
| Engineering | Technical claims/specifications verified | SMEC Engineering | Required |
| Corporate/legal | Entity, office, certification, OEM/client claims verified | SMEC Management | Required |
| SEO | Titles/meta/canonicals/breadcrumbs/schema/sitemap/robots/redirects validated | SEO + Developer | Required |
| Forms | Routing, uploads, consent, validation and success state tested | SMEC + Developer | Required |
| Analytics | Events fire correctly without sensitive payloads | Developer/Marketing | Required |
| Accessibility | Keyboard, focus, headings, labels, contrast and responsive tables checked | Developer | Required |
| Performance | Representative mobile pages tested and material defects fixed | Developer | Required |
| Security | HTTPS, headers, uploads, secrets, admin access reviewed | Developer/IT | Required |
| Migration | Old URLs and valuable assets mapped and tested | Developer/SEO | Required |


# 19. Definition of Done
Final URL manifest implemented with no unresolved architecture conflicts.
All launch pages use approved content and correct publication status.
No visible internal notes, placeholders, DOMAIN tokens or VERIFIED tokens remain on production.
No missing breadcrumb hubs or orphan commercial pages.
Products are consolidated under one Products architecture and canonical /products/ URLs.
Visible FAQ copy and FAQ schema are synchronized where schema is used.
Forms, uploads, routing, confirmation, spam protection and analytics are tested.
Redirect manifest, sitemap, robots.txt, canonicals and structured data pass QA.
Mobile, accessibility, performance and security checks are completed.
SMEC receives source code/repository access, CMS/admin access, deployment documentation, backup/restore information and post-launch support contacts.

# 20. Launch Blockers — Must Be Closed by SMEC / Developer
☐ Production domain and final hosting/CMS stack
☐ Verified Abu Dhabi / India office details and public contact information
☐ Sales/RFQ email, telephone and WhatsApp destination
☐ GA4/GTM/Search Console/Bing ownership and IDs
☐ Privacy/Terms/Cookie/consent wording
☐ Approved brand assets, fonts and image library
☐ Approved datasheets/specifications for numerical product claims
☐ Approved OEM/client/certification evidence
☐ Legacy URL and PDF inventory
☐ English-only vs multilingual launch decision
☐ Post-launch support/warranty and maintenance ownership

# 21. Handover Package
Developer receives these three coordinated documents:
SMEC Website Content Master 2026 — FINAL HANDOFF
SMEC Website Technical, SEO, GEO & AI Master 2026 — FINAL HANDOFF
SMEC Website Developer Handover Brief 2026
Where a conflict remains, use the source-of-truth order in Section 1 and raise the conflict before implementation rather than choosing a version silently.