# Images embedded in the full-site preview

All 18 images decoded out of the `IMG` block of `reference/SMEC Oil & Gas Solutions - Website/SMEC Oil & Gas Solutions - Website.html`. They are the only thing in that file that is not duplicated from the per-tab prototypes.

**18 files, 558,287 bytes decoded** (744,400 bytes as base64 text inside the HTML, which is why that file is 1.1 MB).

## These are not SMEC's project photography

This matters, because the brief for this task was that they might be. They are not:

- **Nothing in the set is identifiable as SMEC.** No SMEC branding, signage, equipment nameplate, vessel, rig or facility appears in any of the 18. No image shows a named person. The preview's own markup calls each one a *"Representative image"* in its `alt` text - the client's developer labelled them as placeholders.
- **Five of the 18 are AI-generated**: all four Digitalisation platform cards and `base-india`. The giveaways are plain: `dig-proset` renders a dashboard whose labels and numbers are near-text, `dig-nexwave` and `dig-nexview` have screen content that does not resolve into real UI, and `base-india` has cabinet wiring and panel internals that do not connect to anything. Publishing these on an engineering site invites the obvious objection from any engineer who looks closely.
- **The other 13 are conventional stock photography**, several clearly from commercial libraries - `lib-faqs` and `lib-guides` in particular look like another manufacturer's marketing photography, down to the branded polo shirts in `lib-faqs`. **None of them ships with a licence or an attribution anywhere in the client's folder.** Using them on smecoilandgas.com without establishing provenance is a licensing exposure, not just an aesthetic one.
- **They are too small to use as anything but thumbnails.** The largest is 584x462. Every one is a card-sized crop. None can serve as a hero, a banner or a full-width section image at any modern viewport width.

So: treat this set as layout reference showing what *kind* of image each slot wants, and commission or licence real images for the slots. If the client does have their own project photography, it is not in this handover and should be asked for directly.

## The 18 files

| File | Dimensions | Bytes | Belongs to | What it actually shows | Origin |
|---|---|---|---|---|---|
| `ind-offshore.jpg` | 448x258 | 21,714 | `/industries/offshore-drilling-jack-up-rigs` | Jack-up drilling rig on three legs in blue open water, red derrick, green helideck, orange-and-white supply vessel alongside. Aerial view. | stock photograph |
| `ind-onshore.jpg` | 448x258 | 15,420 | `/industries/onshore-drilling` and reused for `/industries/rig-reactivation` | Land drilling rig in desert, red mast, pipe racks and support equipment on a sand pad under clear sky. Wide panoramic. | stock photograph |
| `ind-production.jpg` | 448x260 | 29,394 | `/industries/oil-gas-production` | Process deck of a production facility: grey vessels, a large horizontal separator, yellow handrails and stair towers, personnel in red coveralls on the upper deck. | stock photograph |
| `ind-refinery.jpg` | 448x260 | 27,690 | `/industries/refineries-petrochemicals` | Refinery seen from the air: columns, stacks, cooling and process units spread to the horizon. | stock photograph |
| `ind-lng.jpg` | 448x260 | 25,685 | `/industries/gas-processing-and-lng` | LNG terminal on a waterfront, several white storage tanks, the nearest dominating the frame, access roads and a jetty crane behind. | stock photograph |
| `ind-pipeline.jpg` | 448x260 | 31,852 | `/industries/pipelines-terminals` | Tank farm and marine terminal from the air: dozens of white storage tanks, a rail loading rack of coloured tank cars, a red tanker berthed at the jetty. | stock photograph |
| `base-uae.jpg` | 564x414 | 42,060 | UAE base block in the About/bases section (`IMG["base-uae"]`), **and reused as the card image for** `/industries/marine-offshore-vessels` | Offshore production platform at sea, twin flare/exhaust stacks, bridge-linked walkways, deep blue water. Preview alt text: "offshore production platform at sea". | stock photograph |
| `base-india.jpg` | 564x410 | 45,171 | India base block in the About/bases section (`IMG["base-india"]`) | Panel-shop interior: two seated engineers at CAD and schematic screens in the foreground, two others in hard hats and hi-vis working on an open control cabinet, rows of finished panels behind. Preview alt text: "engineers testing control panels in a workshop". | AI-generated |
| `dig-nexwave.jpg` | 412x242 | 20,174 | Digitalisation / NexWave platform card (`const PLATFORMS`, `img:"dig-nexwave"`) | Control-room interior at dusk, operator in hi-vis and white hard hat at a desk of six screens, refinery skyline through curved windows. | AI-generated |
| `dig-proset.jpg` | 412x242 | 22,552 | Digitalisation / ProSet360 platform card (`const PLATFORMS`) | Close-up of a tablet reading "Condition Monitoring Dashboard" held beside a pump skid, with vibration trace, 62.4 C, "Asset Health 89%" and a predictive-maintenance alert. | AI-generated |
| `dig-nexverse.jpg` | 412x241 | 24,529 | Digitalisation / NexVerse platform card (`const PLATFORMS`) | Monitor showing a 3D process-plant model with vessels and pipework beside data panels; a hard-hatted figure out of focus at the left edge. | AI-generated |
| `dig-nexview.jpg` | 412x241 | 21,778 | Digitalisation / NexView platform card (`const PLATFORMS`) | Operator in hard hat and hi-vis facing a wall of four CCTV feeds of tank farms and refinery pipework plus two analytics screens. | AI-generated |
| `lib-guides.jpg` | 584x462 | 46,056 | Projects & Resources card, Technical Guides & Whitepapers (`IMG["lib-"+l[0]]`) | Engineer in a blue shirt at a desk of three monitors, two PLC racks with looms of red/yellow/blue wiring in front of her, electrical schematics spread across the desk. | commercial stock photograph |
| `lib-archaeology.jpg` | 564x430 | 47,991 | Projects & Resources card, Asset Archaeology | Heritage power-station control room: a long curved art-deco desk and a full wall of analogue dial instruments under a glazed roof. Reads as mid-20th-century. | commercial/editorial stock photograph |
| `lib-cases.jpg` | 556x424 | 35,932 | Projects & Resources card, Case Studies | Technician in safety glasses writing on a clipboard in front of an open control panel with PLC and terminal rails; a clamp meter and test leads on the bench. | commercial stock photograph |
| `lib-faqs.jpg` | 560x428 | 30,717 | Projects & Resources card, Engineering FAQs | Two people in branded polo shirts looking up at a large wall display of a process/P&ID schematic, one pointing with a stylus. | commercial stock photograph |
| `lib-glossary.jpg` | 562x420 | 41,135 | Projects & Resources card, Engineering Glossary | Close-up of two liquid-filled pressure gauges with green/red dial markings on a manifold, brass fittings and two red handwheel valves below. | commercial stock photograph |
| `lib-checklists.jpg` | 560x428 | 28,437 | Projects & Resources card, Engineering Checklists | Engineer in white hard hat and hi-vis vest reading an equipment nameplate marked 90132 on a grey cabinet, clipboard in hand, plant machinery behind. | commercial stock photograph |

## Slot coverage

- **Industries**: 6 images for the 7 `dedicated: true` industries. `marine-offshore-vessels` has no image of its own - the preview reuses `base-uae`, an offshore platform, for a marine-vessel page. `rig-reactivation` likewise reuses `ind-onshore`. Two slots need new images.
- **Digitalisation**: 4 of 4 platform cards, all AI-generated.
- **Projects & Resources**: 6 of 6 cards.
- **Bases**: UAE and India.
- **Nothing for Tab 1 (13 solutions), Tab 2 (20 product pages) or Tab 6 (About).** The two largest and most publishable content clusters ship with no imagery at all.
