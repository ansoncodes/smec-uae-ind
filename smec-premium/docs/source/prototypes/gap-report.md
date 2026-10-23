# Gap report

## 1. Entities too thin to publish as an indexable page

16 of 54 entities carry under ~800 characters of copy. At this length a page cannot carry a distinct H1, a 140-160 character meta description and enough body to avoid being read as thin or duplicate content.

| Entity | Tab | chars | Prototype slug | Already built? |
|---|---|---|---|---|
| SMEC EDGE — Newsletter | 5 | 51 | _none_ | **no** |
| Technical Guides & Whitepapers | 5 | 67 | _none_ | `/resources/whitepapers/` |
| Case Studies | 5 | 75 | _none_ | `/resources/case-studies/` |
| Asset Archaeology | 5 | 76 | _none_ | `/resources/asset-archaeology/` |
| Drilling Contractors | 4 | 195 | `/industries/drilling-contractors` | `/customers/drilling-contractors/` |
| Oil & Gas Operators | 4 | 205 | `/industries/oil-and-gas-operators` | `/customers/iocs/ + /customers/nocs/` |
| OEMs & Package Vendors | 4 | 205 | `/industries/oems-and-package-vendors` | `/customers/oem-package-vendors/` |
| EPC Contractors | 4 | 228 | `/industries/epc-contractors` | `/customers/epc-contractors/` |
| Gas Processing & LNG | 4 | 273 | `/industries/gas-processing-and-lng` | `/industries/downstream/gas-processing/ + /industries/midstream/lng-terminals/` |
| Marine & Offshore Vessels | 4 | 555 | `/industries/marine-offshore-vessels` | **no** |
| Pipelines & Terminals | 4 | 565 | `/industries/pipelines-terminals` | `/industries/midstream/pipelines/ + /industries/midstream/tank-farms/` |
| Oil & Gas Production | 4 | 585 | `/industries/oil-gas-production` | `/industries/upstream/production-facilities/` |
| Refineries & Petrochemicals | 4 | 610 | `/industries/refineries-petrochemicals` | `/industries/downstream/refineries/ + /industries/downstream/petrochemicals/` |
| Onshore Drilling | 4 | 621 | `/industries/onshore-drilling` | `/industries/upstream/onshore-drilling/ + /industries/onshore/land-rigs/` |
| Rig Reactivation | 4 | 641 | `/industries/rig-reactivation` | `/solutions/rig-modernization/` |
| Offshore Drilling & Jack-Up Rigs | 4 | 724 | `/industries/offshore-drilling-jack-up-rigs` | `/industries/upstream/offshore-drilling/` |

Two clean groups:

- **All 12 Tab 4 industry entries** (195-724 chars). Not one industry page in the client's prototype is publishable as supplied. The seven marked `dedicated: true` average ~614 chars; the five alias entries average ~221.
- **4 of the 7 Tab 5 resource hubs** (51-76 chars): Asset Archaeology, Case Studies, Technical Guides & Whitepapers, SMEC EDGE — Newsletter. These are a title and a one-line blurb above a list of outbound links, nothing more.

By contrast every Tab 1 solution (4,189-6,205) and every Tab 2 product page (4,717-7,228) is comfortably publishable.

## 2. The 65-item catalogue against our 31 built product pages

Inside the prototype itself, **31 of the 65 catalogue rows carry a `landing` URL** and **34 do not** - they are names in a filter grid with no destination. The 31 landing URLs resolve to only **19 distinct pages**, and the 20th prototype page (`/products/emergency-shutdown-systems`) is not reachable from any catalogue row.

### 2a. Which of the 65 have no page on our side

**24 of the 65 have no equivalent page in `pages.generated.ts`:**

| # | Catalogue item | Category | Has landing URL in prototype? |
|---|---|---|---|
| 1 | Drill String Compensator Systems | Drilling & Offshore | no |
| 2 | Bulk Weight Monitoring Systems | Drilling & Offshore | no |
| 3 | Barge Instrumentation Systems | Drilling & Offshore | no |
| 4 | Riser Tension Control Interfaces | Drilling & Offshore | no |
| 5 | Wellhead & Skid Control Panels | Onshore Upstream | `/products/onshore-wellhead-skid-controls` |
| 6 | Remote Terminal Units (RTUs) | Onshore Upstream | `/products/pipeline-scada-rtu` |
| 7 | Pump & Compressor Control | Onshore Upstream | no |
| 8 | Production Monitoring & Remote Telemetry | Onshore Upstream | no |
| 9 | Pipeline SCADA & RTU Systems | Midstream & Pipelines | `/products/pipeline-scada-rtu` |
| 10 | Compressor Station Automation | Midstream & Pipelines | no |
| 11 | Pump Station Automation | Midstream & Pipelines | no |
| 12 | Flow & Metering Integration | Midstream & Pipelines | no |
| 13 | Leak Detection & Alarm Integration | Midstream & Pipelines | no |
| 14 | Terminal ESD & Remote Control | Midstream & Pipelines | no |
| 15 | Emergency Shutdown (ESD) Systems | Downstream & Process | no |
| 16 | Smart Gas & Emission Monitoring Systems | Downstream & Process | no |
| 17 | Air Shut-Off Systems | Safety & Communications | no |
| 18 | Twin Stop Systems | Safety & Communications | no |
| 19 | Marine Main-Engine Remote Controls | Marine & Vessel | no |
| 20 | AC/DC Module & PCB Repair | Testing, Repair & Lifecycle | no |
| 21 | Air Circuit Breaker Calibration | Testing, Repair & Lifecycle | no |
| 22 | Primary Current Injection Testing | Testing, Repair & Lifecycle | no |
| 23 | Secondary Current Injection Testing | Testing, Repair & Lifecycle | no |
| 24 | Fire & Gas Detector Calibration | Testing, Repair & Lifecycle | no |

**3 of those 24 already have a full written page in the client's own prototype** - Wellhead & Skid Control Panels (`/products/onshore-wellhead-skid-controls`), Remote Terminal Units (RTUs) (`/products/pipeline-scada-rtu`), Pipeline SCADA & RTU Systems (`/products/pipeline-scada-rtu`). That copy is extracted in [products/](products/) at 4,700-5,500 characters each, so these are the cheapest new pages available anywhere in this handover. Add `/products/emergency-shutdown-systems` to the same list: the client wrote the page but never linked it from the catalogue, so anyone working from the catalogue alone would miss it.

A further **14 are covered only partially** - the subject is inside a broader page rather than being that page's named topic: Onshore Rig Automation & Retrofit -> `/solutions/rig-modernization/`, Refinery PLC / SCADA Modernisation -> `/solutions/control-system-migration/`, Instrumentation & Transmitter Packages -> `/solutions/instrumentation/`, E-Houses / Modular Electrical Rooms -> `/solutions/e-houses-modular-electrical-rooms/`, Power Distribution Skids -> `/products/mcc-pcc-power-distribution/`, Alternator PMS Control Systems -> `/products/generator-control-pms/`, Starter Panels -> `/products/plc-hmi-drive-panels/`, Switchboards & Enclosures -> `/products/mcc-pcc-power-distribution/`, PLC-Based Audio-Visual Alarm Systems -> `/products/driller-talkback-av-alarm/`, Fire Alarm Control Systems -> `/products/automatic-fire-fighting-control/`, Marine Generator PMS -> `/products/generator-control-pms/`, SCR System Upgrades -> `/products/scr-houses/`, Transmitter Installation & Commissioning -> `/solutions/testing-commissioning/`, PLC & SCADA Upgrade Integration -> `/solutions/control-system-migration/`.

**27 map cleanly onto an existing built page.**

### 2b. Which of our 31 are missing from the catalogue

We hold **30 product pages plus the `/products/` index**. **4 of them have no corresponding row anywhere in the client's 65-item catalogue:**

| Built page | H1 |
|---|---|
| `/products/boiler-burner-management/` | Boiler Control & Burner Management Systems |
| `/products/dam-level-monitoring/` | Dam Level Monitoring & Remote Alarm System |
| `/products/plant-automation-scada/` | Plant Automation & SCADA Systems |
| `/products/skidding-current-monitoring/` | Skidding Current Monitoring System |

If the client's catalogue is taken as the definitive product list, these pages lose their nav entry and become orphans. They are all real built pages with copy, so the decision is whether to add catalogue rows for them or let them fall out of the menu.

## 3. The Tab 2 version conflict, resolved

Both files are labelled authoritative. They are not equal.

| | `..._Complete_Systems_Products_Responsive_Interactive.html` | `..._Interactive_FINAL_No_Digital.html` |
|---|---|---|
| File size | 187,585 bytes | 26,350 bytes |
| 65-item catalogue | `catalogue`, 18,888 bytes | `products`, 14,759 bytes |
| Catalogue contents | identical names, order, summaries, applications, tags | identical |
| Extra catalogue fields | `landing` + `landing_name` on 31 rows | **absent** |
| Full product pages | **`pages`: 20 pages, 151,323 bytes** | **absent** |
| External panel links | absent | `links`: 4 URLs |
| Quick-pick names | absent | `quickNames`: 10 |

**Resolution: `TAB 2 _ SMEC_Complete_Systems_Products_Responsive_Interactive.html` is the superset and the one to build from.** I compared all 65 rows field by field on every shared key: zero differences, same order. The "FINAL" file is not a later revision of the catalogue - it is the same catalogue with the landing URLs stripped and all 20 product pages removed. Its filename (`No_Digital`) suggests it was cut down to drop the digital cluster, not to supersede the larger file.

Two things exist **only** in the smaller file and must not be lost:

- `links` - 4 catalogue rows that point off-site rather than to a page: Motor Control Centres (MCC), PCC & Distribution Panels, PLC, HMI & Drive Panels, Starter Panels, all to `https://industrial-control-panels.smec.in/`. Note this is a **third-party-looking subdomain on smec.in, not smecoilandgas.com**; confirm before wiring it into the new nav.
- `quickNames` - a 10-item quick-pick list: Driller / Talkback Communication System, Illumination Huts, Gas Watch Panel & Mud Gas Detection, Drill Monitoring System — DMS3000, Load Monitoring Systems, CCTV Surveillance & Perimeter Security (Ex-Proof), Integrated Drilling Control Systems, Power Distribution Skids, Starter Panels, Switchboards & Enclosures.

## 4. The client's own documents contradict each other

These are the client's internal contradictions, not ours. Each one has to be settled before any of this can be built, whichever IA wins.

### 4a. Same entity, two different slugs

| Entity | Prototype slug | Architecture docx URL |
|---|---|---|
| Onshore Wellhead & Skid Controls | `/products/onshore-wellhead-skid-controls` | `/products/wellhead-skid-controls` |
| Rack Phase Difference (RPD) Systems | `/products/rpd-systems` | `/products/rack-phase-difference` |

Cosmetic individually, but each is a different canonical URL and a different redirect row.

### 4b. Prototype builds a page the architecture deletes

The Tab 4 prototype gives each of these its own slug, headline, intro and capability tabs. The architecture docx routes the same menu label at an existing page instead, so the prototype copy has nowhere to live:

| Entity | Prototype slug | Architecture routes it to |
|---|---|---|
| Gas Processing & LNG | `/industries/gas-processing-and-lng` | `/industries/gas-processing-lng` |
| EPC Contractors | `/industries/epc-contractors` | `/solutions/turnkey-engineering` |
| Oil & Gas Operators | `/industries/oil-and-gas-operators` | `/industries/oil-gas-production` |
| OEMs & Package Vendors | `/industries/oems-and-package-vendors` | `/solutions/system-integration` |
| Drilling Contractors | `/industries/drilling-contractors` | `/industries/onshore-drilling` |

### 4c. Tab 1's outbound product links do not survive the proposed IA

The 13 solution pages link out to **38 distinct product URLs**. Under the architecture docx's own URL map, **34 of them do not exist** - only `/products/bop-control-systems`, `/products/e-houses`, `/products/emergency-shutdown-systems` resolve.

The dead ones: `/products/dms3000`, `/products/flare-ignition-systems`, `/products/gas-watch`, `/products/generator-power-management`, `/products/hydraulic-power-packs`, `/products/hydraulic-valve-manifolds`, `/products/industrial-battery-chargers`, `/products/industrial-electronics`, `/products/industrial-gateways`, `/products/integrated-drilling-controls`, `/products/jacking-rpd-control`, `/products/marine-main-engine-remote-control`, `/products/marine-pms`, `/products/mcc-pcc-panels`, `/products/mv-lv-switchgear`, `/products/nexverse`, `/products/nexwave`, `/products/paga`, `/products/plc`, `/products/plc-scada-systems`, `/products/process-instrumentation`, `/products/proset360`, `/products/protection-and-metering`, `/products/remote-io`, `/products/remote-terminal-units`, `/products/rtu-panels`, `/products/scada-hmi`, `/products/scr-power-house`, `/products/ups-and-battery-chargers`, `/products/ups-systems`, `/products/vfd-panels`, `/products/vfd-power-house`, `/products/vfd-systems`, `/products/winch-control-systems`.

Some are near-misses the docx renamed (`/products/mcc-pcc-panels` vs `/products/industrial-control-panels`, `/products/gas-watch` vs `/products/gas-watch-mud-gas-detection`). Others have no counterpart at any slug - `/products/mv-lv-switchgear`, `/products/ups-systems`, `/products/winch-control-systems`, `/products/hydraulic-power-packs` and the four `/products/nexwave`-style digital entries, which the architecture moves off-domain entirely. **Tab 1's internal linking has to be rebuilt from scratch against whatever URL map is agreed; it cannot be carried over.**

### 4d. "Seven dedicated industry pages" is wrong in the docx

The architecture docx says seven, while its own table gives **eight** distinct `/industries/` URLs. The prototype settles it: `gas-processing-and-lng` is flagged `dedicated: false`, so the prose is right and the table is wrong.

## 5. Character set — withdrawn, this was wrong

~~None of the seven prototype HTML files declares a charset.~~

**Retracted on verification.** All seven files declare `<meta charset="utf-8">`
at byte offset 43-44, comfortably inside the 1024-byte window in which the
declaration has to appear to take effect. The files are UTF-8 encoded and
render correctly. There is no mojibake and no packaging defect.

Do not raise this with the client. Left here rather than deleted so the same
claim is not re-derived later.
