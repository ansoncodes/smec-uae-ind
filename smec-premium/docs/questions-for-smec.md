# Questions for SMEC

Everything on this list blocks something specific. Each one says what is
waiting on it, so it can be answered out of order — and several can be
answered "no" or "drop it" just as usefully as "yes".

Grouped by who has to answer, because that is usually what decides how long
it takes.

---

## 1. Management — decisions, not documents

**1.1 Confirm the production domain is `smecoilandgas.com`.**
Indicated, not yet confirmed. The build already assumes it, so canonicals,
the sitemap, schema and social cards are correct as they stand.

Three things follow from it being the *same* domain as the current site
rather than a new one, and each needs a yes:

- Seven WooCommerce and WordPress leftovers start returning 404 where they
  currently return 200: `/cart`, `/checkout`, `/my-account`, `/thank-you`,
  `/sample-page`, `/hi`, `/test`. That is intended, but it is visible.
- Every image and PDF currently served from `/wp-content/uploads/...` will
  stop working, because those paths do not exist in the new build. Anything
  with traffic or inbound links needs preserving or redirecting — see 4.4,
  which this makes urgent rather than tidy.
- There is no window where both sites are reachable. The cutover is a single
  switch on one domain, so we should agree a rollback plan before it.

*Blocks: launch. Everything else about the domain is already done.*

**1.2 Where should an RFQ land — a mailbox, or a CRM?**
The form is built and tested; it needs a destination. Also confirm the public
phone number and whether there is a WhatsApp business number to publish.
*Blocks: the enquiry form going live.*

**1.3 Who hosts it, and who owns the repository?**
This decides two things in the build: whether the RFQ form can keep its
server-side validation and rate limiting (it needs a Node runtime), and how
staging is password-protected. Staging must not be publicly crawlable.
*Blocks: launch, staging protection, the RFQ endpoint's final shape.*

**1.4 Who writes the content after launch, and in what?**
The handover requires that non-technical staff can edit titles, meta
descriptions, H1s, answer blocks, FAQs and CTAs. Today content is a generated
file and every edit needs a developer. A CMS is a platform decision before it
is a build task — but the decision has to be made.
*Blocks: the "content can be edited" acceptance criterion.*

**1.5 Are we launching English-only?**
Assumed yes. Confirming it means no hreflang, no Arabic variant, and no
country pages written only to target a country.
*Blocks: nothing today; closes an item.*

**1.6 The three pages with no home in the new architecture —
`/sustainability/`, `/research-and-developement/` (ADAM-Edge) and the ADIPEC
event pages. Keep them, or retire them?**
They are live on the current site and have no place in the new structure.
Right now they are reachable but excluded from search. Keeping them means
writing them into the architecture; retiring them means a 410 and a note in
the redirect map. Either is fine — leaving them undecided is not.
*Blocks: the redirect map being final.*

---

## 2. Marketing / corporate — the facts the pages are waiting for

**2.1 Which clients may be named, and which logos may be shown?**
Fourteen client logos are on the homepage right now: Shelf Drilling, GAIL,
Kongsberg, Jindal Drilling, NOV, IndianOil, Reliance, HPCL, Cochin Shipyard,
ADES, Hindustan Shipyard, ONGC, Focus Energy, Schlumberger. The documents are
explicit that client names and logos are published only with approval. We
need a yes or no per logo, and ideally written permission on file.
*Blocks: a launch gate. Until it is answered they should come down.*

**2.2 Are the four counters correct and defensible — 25 years, 10 countries,
500 employees, 10,000 projects?**
Your own wireframe prototype dropped "500 employees" and "10,000 projects"
and kept only "25+ years", alongside "3 entities" and "3 sectors". If that
was deliberate, say so and we will match it. If the figures are real, we need
the basis for them.
*Blocks: a launch gate.*

**2.3 Are the four ISO certificates current, and in this legal entity's name?**
The certificate scans are already in the build — 9001, 14001, 45001 and
50001, issued to "SMEC Oil and Gas Solutions L.L.C S.P". We need confirmation
they are in date and that the entity name matches the one we publish. Also:
is the ADNOC In-Country Value certificate current, and at what score?
*Blocks: the certifications page, and the badges on the homepage.*

**2.4 Which OEM relationships can be stated publicly, and do we hold the
authorisation letters?**
The prototype names Schneider Electric, VAF, Kangrim, GE-IP and Banner
Engineering. Publishing an OEM relationship needs current documentary support
and permission. Same question for the TAQA, SNOC and DEWA marks currently on
the homepage.
*Blocks: the OEM partners page, and marks on the homepage.*

**2.5 Leadership names and biographies — and can we reuse the MD message you
have already published?**
Your current site carries "From the Managing Director's Desk", signed Saiju
Mohamed, Managing Director, SMEC Group, along with Vision, Mission and Core
Values, on the Abu Dhabi page. If that is current and approved, it closes two
of the pages that are held out of search today without anyone writing
anything. Leadership still needs names, roles and a line each.
*Blocks: two company pages, one of which may already be answered.*

**2.6 Which projects may be written up, and what may be said about the
outcome?**
There are no case studies on the site and no evidence cards anywhere, because
nothing is approved. Three to five would change the site materially. For
each: the asset type, what the problem was, what SMEC engineered, what
testing was done, and what may be quantified. A project can be anonymised
("a jack-up rig in the Gulf") if the client cannot be named.
*Blocks: the case-studies collection, and the evidence block on every
commercial page.*

**2.7 Do we have real photography we are allowed to use?**
Seven stock placeholder images are in the build — About, Careers and all five
industry panels — plus a gallery of product shots that would benefit. Site,
factory, FAT and panel photography is what is wanted. Your LinkedIn page and
the group company sites may already have usable material; we need to know we
may use it.
**If the answer is no, say so** — the design can drop photography entirely
and use the diagram-led treatment the prototype uses, which removes the
blocker instead of parking it.
*Blocks: a launch gate.*

**2.8 Verified office details.**
Registered address, public phone and public email for Abu Dhabi and for the
India engineering hub. The prototype also lists a **Singapore entity**, which
appears nowhere in the content documents — is it real, and should it be on
the site?
*Blocks: the office pages, and LocalBusiness schema, which stays off until
the addresses are verified.*

---

## 3. Engineering — one signature, mostly on things already written

**3.1 Sign off the numerical product claims.**
Sixteen of the thirty product pages carry parameters the content document
marks as placeholders, and the build already holds seventeen specification
groupings taken from the current site. This is mostly confirming what exists
rather than writing anything new. The pages that need it most: Gas Watch,
Flare Ignition, VFD/SCR Houses, Battery Chargers, E-House, BOP, Fire & Gas
and ICSS — ranges, standards, hazardous-area classifications and any SIL or
certification statement.
*Blocks: five product pages are held out of search; the rest publish without
their numbers.*

**3.2 Review 123 draft FAQ answers.**
`docs/faq-drafts.md` holds drafts for the 37 buyer-facing pages that have no
approved FAQ copy. Every answer is assembled from that page's own approved
text; 16 are marked as needing an engineer because the page does not say
enough to answer honestly. This is a review, not a writing job.
*Blocks: nothing — the pages publish without FAQs. It improves them.*

**3.3 Review the two calculators and two checklists.**
Built and on the site, held out of search until an engineer agrees: UPS/DC
battery autonomy, generator and transformer loading, the E-House enquiry
checklist and the control-system migration readiness checklist. Each states
its formula, assumptions and limitations; we need agreement that those are
the right things to state.
*Blocks: two resource collections.*

---

## 4. IT / analytics

**4.1 Who owns GA4, Google Search Console and Bing Webmaster Tools, and what
are the IDs?**
All eleven conversion events are built and firing into the data layer, behind
a consent gate. They go nowhere until a container ID exists.
*Blocks: measurement from day one, and a UAT sign-off row.*

**4.2 Privacy notice, cookie wording, form consent text and a retention
policy for uploaded RFQ files.**
The consent banner and the form's consent checkbox both carry plain-English
stand-in wording written to be replaced. Uploaded drawings and specifications
are the sensitive part: how long are they kept, who can see them, and how are
they deleted?
*Blocks: launch, legally rather than technically.*

**4.3 Is there an IndexNow key, and can the host rewrite `/<key>.txt`?**
Submission is built and dormant. Optional, but cheap.
*Blocks: nothing.*

**4.4 What should happen to 263 legacy image URLs, and should the 15 product
datasheets be republished?**
The live site has been crawled and the inventory is in `legacy-inventory.md`.
The 15 datasheets and 25 images now redirect to their new homes. The
remaining 263 image URLs will 404 after cutover — copying the
`/wp-content/uploads/` folder across before launch keeps every one of them
working and is the only option that loses nothing.

On the datasheets: they are published product PDFs, and they are very likely
the approved numerical source the product pages are waiting on in 3.1. If
they are current, hosting them again is better than redirecting them.

**Also needed: Search Console access.** It is the only way to see which old
URLs and images actually have traffic and inbound links, rather than guessing
from a crawl.
*Blocks: an item on the migration deliverables list, and possibly 3.1.*

---

## The five that actually hold up a launch

1. The production domain (1.1)
2. Where an RFQ lands (1.2)
3. Hosting, and staging protection (1.3)
4. Client logos and the counters — approve them or take them down (2.1, 2.2)
5. Privacy and consent wording (4.2)

Everything else makes the site better or closes a checklist row. These five
decide whether it can go live at all.
