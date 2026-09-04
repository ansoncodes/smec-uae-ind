/**
 * Process schematic: wellhead → pipeline → refinery → grid.
 *
 * The prototype's version had three traces that stopped in mid-air — a branch
 * off the trunk that ended at nothing, and a trunk that began and ended on a
 * bare line end. Here every line terminates in something: the trunk runs
 * between two end bars, and each branch is an instrument tap that ends at a
 * gauge tick with its readout attached. The four labelled nodes all sit
 * exactly on the trunk.
 */

/** Trunk: in at the left, stepped up over the refinery, out at the right. */
const TRUNK = "M40,150 H470 L505,78 H700 L735,150 H920";

const NODES = [
  { x: 170, y: 150, label: "Wellhead", lx: 170, ly: 126 },
  { x: 400, y: 150, label: "Pipeline", lx: 400, ly: 126 },
  { x: 630, y: 78, label: "Refinery", lx: 614, ly: 54 },
  { x: 860, y: 150, label: "Grid", lx: 860, ly: 126 },
];

/** Instrument taps. Each drops off the trunk and ends at a gauge tick. */
const TAPS = [
  { d: "M170,150 V222", tick: "M156,222 H184", tx: 196, ty: 226, text: "PRESS. 2,140 PSI" },
  { d: "M400,150 V258", tick: "M386,258 H414", tx: 426, ty: 262, text: "FLOW 18.4 MMSCFD" },
  { d: "M672,78 V36", tick: "M658,36 H686", tx: 698, ty: 40, text: "UPTIME 99.2%" },
];

export default function Schematic({ id }: { id: string }) {
  const grad = `${id}-trace`;

  return (
    <svg
      className="schematic"
      id={id}
      viewBox="0 0 960 300"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={grad} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFB457" />
          <stop offset="45%" stopColor="#FF8C1A" />
          <stop offset="100%" stopColor="#7AB6D5" />
        </linearGradient>
      </defs>

      {/* End bars, so the trunk starts and finishes on something. */}
      <path className="term" d="M40,134 V166" />
      <path className="term" d="M920,134 V166" />

      <path className="trace" stroke={`url(#${grad})`} d={TRUNK} />
      {/* A single pulse travelling the length of the run. */}
      <path className="flow" stroke={`url(#${grad})`} d={TRUNK} />

      {TAPS.map((tap) => (
        <g key={tap.text}>
          <path className="tap" d={tap.d} />
          <path className="tap" d={tap.tick} />
          <text className="readout" x={tap.tx} y={tap.ty}>
            {tap.text}
          </text>
        </g>
      ))}

      {NODES.map((node) => (
        <g key={node.label}>
          <circle className="node" cx={node.x} cy={node.y} r="9" />
          <circle className="node-dot" cx={node.x} cy={node.y} r="3.2" />
          <text x={node.lx} y={node.ly} textAnchor="middle">
            {node.label.toUpperCase()}
          </text>
        </g>
      ))}
    </svg>
  );
}
