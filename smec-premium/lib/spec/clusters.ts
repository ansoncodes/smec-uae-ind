import { SPEC_PAGES, specPage } from './index';
import type { SpecPage } from './types';

/**
 * The internal-linking clusters of Technical Master §10.
 *
 * "Related pages" used to mean siblings — the pages that happen to share a
 * parent. That is not what the document asks for. It names five clusters and
 * the relationships inside them, and they run across sections: E-House to
 * refineries and LNG, Rig Modernization to VFD and SCR Houses and DMS3000,
 * Turnkey to EPC Contractors. Those are the links a buyer follows and the
 * ones that tell a crawler which pages belong together.
 *
 * Membership is mutual: naming a pair once links it both ways.
 */

const CLUSTERS: string[][] = [
  // Turnkey
  [
    '/solutions/turnkey-engineering-system-solutions/',
    '/solutions/electrical-engineering/',
    '/solutions/instrumentation/',
    '/solutions/automation-control-systems/',
    '/solutions/system-integration/',
    '/solutions/panel-engineering-manufacturing/',
    '/solutions/testing-commissioning/',
    '/customers/epc-contractors/',
  ],
  // E-House
  [
    '/solutions/e-houses-modular-electrical-rooms/',
    '/solutions/electrical-engineering/',
    '/products/mcc-pcc-power-distribution/',
    '/products/plc-hmi-drive-panels/',
    '/products/battery-charger/',
    '/solutions/system-integration/',
    '/industries/downstream/',
    '/industries/downstream/refineries/',
    '/industries/midstream/',
    '/industries/midstream/lng-terminals/',
    '/industries/midstream/pipelines/',
    '/industries/downstream/utilities/',
  ],
  // Rig modernization
  [
    '/solutions/rig-modernization/',
    '/industries/upstream/',
    '/industries/onshore/',
    '/industries/upstream/offshore-drilling/',
    '/industries/upstream/onshore-drilling/',
    '/products/power-houses/',
    '/products/vfd-houses/',
    '/products/scr-houses/',
    '/products/dms3000-drill-monitoring-system/',
    '/products/jacking-control-system/',
    '/products/rpd-system/',
    '/products/load-monitoring-system/',
    '/products/bop-control-system/',
    '/products/paga-system/',
    '/products/gas-watch-panel/',
    '/customers/drilling-contractors/',
  ],
  // Brownfield
  [
    '/solutions/brownfield-engineering/',
    '/solutions/lifecycle-obsolescence/',
    '/solutions/control-system-migration/',
    '/solutions/shutdown-turnaround/',
    '/solutions/panel-engineering-manufacturing/',
    '/solutions/testing-commissioning/',
    '/products/integrated-control-safety-system/',
  ],
  // Digital
  [
    '/digital/digital-engineering/',
    '/digital/remote-monitoring-nexwave/',
    '/digital/cmms-proset360/',
    '/digital/digital-twin-nexverse/',
    '/digital/industrial-ai-video-nexview/',
    '/digital/fuel-monitoring/',
    '/industries/upstream/production-facilities/',
    '/industries/upstream/well-services/',
    '/industries/midstream/tank-farms/',
    '/industries/midstream/pumping-stations/',
  ],
  // Safety and fire, which the product set splits across several pages.
  // Detection sits with shutdown: the trip an F&G system raises is executed
  // by the ESD, and a buyer reading one is specifying the other.
  [
    '/products/fire-gas-detection/',
    '/products/gas-watch-panel/',
    '/products/emergency-shutdown-systems/',
    '/products/integrated-control-safety-system/',
    '/products/flare-ignition-system/',
    '/products/automatic-fire-fighting-control/',
    '/products/explosion-proof-cctv/',
    '/products/driller-talkback-av-alarm/',
  ],
  // Marine and offshore hulls, likewise. The industry page is the asset the
  // other four are fitted to, so it belongs here rather than under a
  // value-chain stage.
  [
    '/industries/marine-offshore-vessels/',
    '/products/ballast-control-system/',
    '/products/bilge-alarm-system/',
    '/products/marine-growth-prevention/',
    '/products/skidding-current-monitoring/',
    '/customers/fleet-operators/',
  ],
  // Plant and process control.
  [
    '/products/plant-automation-scada/',
    '/products/boiler-burner-management/',
    '/products/integrated-control-safety-system/',
    '/products/dam-level-monitoring/',
    '/products/generator-control-pms/',
    '/industries/downstream/petrochemicals/',
    '/customers/industrial-manufacturers/',
  ],
  // Remote and distributed assets: a station or a well pad runs its own
  // control locally and reports to a supervisory system over telemetry, so
  // the SCADA, RTU and wellhead pages answer one buyer's question together.
  [
    '/products/pipeline-scada-rtu/',
    '/products/wellhead-skid-controls/',
    '/products/plant-automation-scada/',
    '/industries/midstream/pipelines/',
    '/industries/midstream/pumping-stations/',
    '/industries/upstream/production-facilities/',
    '/industries/upstream/well-services/',
    '/digital/remote-monitoring-nexwave/',
  ],
  // Where SMEC delivers from, and to.
  [
    '/markets/middle-east/',
    '/markets/global-project-support/',
    '/company/abu-dhabi-office/',
    '/company/india-engineering-hub/',
  ],
];

/**
 * The chains §10 actually draws — Turnkey ↔ E&I ↔ Automation ↔ … — as groups
 * of pages, in the document's order. A page links at least one page from the
 * group on either side of it, ahead of the rest of its cluster: the six slots
 * fill up quickly in the larger clusters, and these are the links the
 * document names.
 */
const S = (slug: string) => `/solutions/${slug}/`;
const P = (slug: string) => `/products/${slug}/`;
const D = (slug: string) => `/digital/${slug}/`;
const CHAINS: string[][][] = [
  // Turnkey ↔ E&I ↔ Automation ↔ System Integration ↔ Panel Manufacturing ↔
  // Testing & Commissioning ↔ EPC Contractors
  [
    [S('turnkey-engineering-system-solutions')],
    [S('electrical-engineering'), S('instrumentation')],
    [S('automation-control-systems')],
    [S('system-integration')],
    [S('panel-engineering-manufacturing')],
    [S('testing-commissioning')],
    ['/customers/epc-contractors/'],
  ],
  // E-House ↔ Electrical Engineering ↔ MCC/PCC ↔ VFD/UPS/DC ↔ System
  // Integration ↔ LNG/Refinery/Pipeline/Utilities
  [
    [S('e-houses-modular-electrical-rooms')],
    [S('electrical-engineering')],
    [P('mcc-pcc-power-distribution')],
    [P('vfd-houses'), P('battery-charger')],
    [S('system-integration')],
    [
      '/industries/midstream/lng-terminals/',
      '/industries/downstream/refineries/',
      '/industries/midstream/pipelines/',
      '/industries/downstream/utilities/',
    ],
  ],
  // Offshore/Onshore Drilling ↔ Rig Modernization ↔ Power/VFD/SCR Houses ↔
  // DMS3000 ↔ Jacking/RPD/Load ↔ BOP/PAGA/Gas Watch
  [
    ['/industries/upstream/offshore-drilling/', '/industries/upstream/onshore-drilling/'],
    [S('rig-modernization')],
    [P('power-houses'), P('vfd-houses'), P('scr-houses')],
    [P('dms3000-drill-monitoring-system')],
    [P('jacking-control-system'), P('rpd-system'), P('load-monitoring-system')],
    [P('bop-control-system'), P('paga-system'), P('gas-watch-panel')],
  ],
  // Brownfield ↔ Lifecycle/Obsolescence ↔ PLC/SCADA/DCS Migration ↔ Shutdown ↔
  // Panel Modification ↔ Commissioning
  [
    [S('brownfield-engineering')],
    [S('lifecycle-obsolescence')],
    [S('control-system-migration')],
    [S('shutdown-turnaround')],
    [S('panel-engineering-manufacturing')],
    [S('testing-commissioning')],
  ],
  // Digital Engineering ↔ NexWave ↔ ProSet360 ↔ NexVerse ↔ NexView ↔ Fuel
  // Monitoring ↔ industry use cases
  [
    [D('digital-engineering')],
    [D('remote-monitoring-nexwave')],
    [D('cmms-proset360')],
    [D('digital-twin-nexverse')],
    [D('industrial-ai-video-nexview')],
    [D('fuel-monitoring')],
    [
      '/industries/upstream/production-facilities/',
      '/industries/upstream/well-services/',
      '/industries/midstream/tank-farms/',
      '/industries/midstream/pumping-stations/',
    ],
  ],
];

/** The groups either side of a page in every chain it belongs to. */
function neighbourGroups(url: string): string[][] {
  const groups: string[][] = [];
  for (const chain of CHAINS) {
    chain.forEach((group, i) => {
      if (!group.includes(url)) return;
      for (const side of [chain[i - 1], chain[i + 1]]) if (side) groups.push(side);
    });
  }
  return groups;
}

/** url → every other page named in a cluster with it. */
const RELATED = new Map<string, Set<string>>();
for (const cluster of CLUSTERS) {
  for (const url of cluster) {
    const others = RELATED.get(url) ?? new Set<string>();
    for (const other of cluster) if (other !== url) others.add(other);
    RELATED.set(url, others);
  }
}

/** Pages in the same section, in a ring, so coverage is even and mutual. */
function ringNeighbours(page: SpecPage, count: number): SpecPage[] {
  const parent = page.url.split('/').slice(0, -2).join('/') + '/';
  const family = SPEC_PAGES.filter(
    (other) => other.url !== parent && other.url.startsWith(parent) && other.url !== page.url
  );
  if (!family.length) return [];

  const here = SPEC_PAGES.filter((o) => o.url.startsWith(parent) && o.url !== parent).findIndex(
    (o) => o.url === page.url
  );
  return Array.from({ length: Math.min(count, family.length) }, (_, i) => family[(here + i) % family.length]);
}

/**
 * The 3–6 contextual links the component standard asks for (§12, row 12):
 * the document's own cluster, plus two neighbours from the same family.
 *
 * The neighbours are not padding. Cluster membership is uneven — a page in a
 * large cluster would otherwise fill all six slots with cluster links and
 * stop linking its own family, which leaves the pages nobody named with a
 * single inbound link from their hub. Reserving two slots for the ring means
 * every page is linked by the two before it, whatever the clusters say, and
 * "no orphan commercial pages" holds by construction rather than by luck.
 */
const RING = 2;

export function relatedFor(page: SpecPage, limit = 6): SpecPage[] {
  // A page the body already links — a solution's systems — is not repeated.
  const linked = new Set(
    page.sections.flatMap((section) => section.links ?? []).map((link) => link.url)
  );
  // One page from each chain neighbour the body does not already reach.
  const neighbours: string[] = [];
  for (const group of neighbourGroups(page.url)) {
    if (group.some((url) => linked.has(url) || neighbours.includes(url))) continue;
    const pick = group.find((url) => url !== page.url && specPage(url));
    if (pick) neighbours.push(pick);
  }
  const named = [...neighbours, ...(RELATED.get(page.url) ?? [])]
    .filter((url, i, all) => all.indexOf(url) === i && !linked.has(url))
    .map((url) => specPage(url))
    .filter((p): p is SpecPage => !!p);

  // A page nested under a section hub links back to it: the hub is the most
  // relevant page there is, and it is how a reader goes back up a level
  // without the breadcrumb.
  const parentUrl = page.url.split('/').slice(0, -2).join('/') + '/';
  const parent = parentUrl.split('/').filter(Boolean).length > 1 ? specPage(parentUrl) : undefined;

  const out = [...(parent ? [parent] : [])];
  for (const entry of named.slice(0, Math.max(0, limit - RING - out.length))) out.push(entry);
  for (const neighbour of ringNeighbours(page, RING)) {
    if (!out.some((p) => p.url === neighbour.url)) out.push(neighbour);
  }
  // Any cluster links that did not fit above can still fill a spare slot.
  for (const extra of named) {
    if (out.length >= limit) break;
    if (!out.some((p) => p.url === extra.url)) out.push(extra);
  }
  return out.slice(0, limit);
}
