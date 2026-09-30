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
  [
    '/products/fire-gas-detection/',
    '/products/gas-watch-panel/',
    '/products/flare-ignition-system/',
    '/products/automatic-fire-fighting-control/',
    '/products/explosion-proof-cctv/',
    '/products/driller-talkback-av-alarm/',
  ],
  // Marine and offshore hulls, likewise.
  [
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
  // Where SMEC delivers from, and to.
  [
    '/markets/middle-east/',
    '/markets/global-project-support/',
    '/company/abu-dhabi-office/',
    '/company/india-engineering-hub/',
  ],
];

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
  const named = [...(RELATED.get(page.url) ?? [])]
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
