/** The prototype's process-schematic illustration (wellhead → grid). */
export default function Schematic({ id }: { id: string }) {
  const grad = `${id}-trace`;
  return (
    <svg
      className="schematic"
      id={id}
      viewBox="0 0 960 260"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={grad} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF8A4C" />
          <stop offset="45%" stopColor="#F72585" />
          <stop offset="100%" stopColor="#4CC9F0" />
        </linearGradient>
      </defs>
      <path
        className="trace"
        stroke={`url(#${grad})`}
        d="M20,170 L180,170 L220,110 L400,110 L440,170 L620,170 L660,60 L840,60 L880,110 L940,110"
      />
      <path className="trace" stroke={`url(#${grad})`} d="M180,170 L180,220 L340,220" />
      <path className="trace" stroke={`url(#${grad})`} d="M660,60 L660,20 L820,20" />
      <circle className="node" cx="220" cy="110" r="7" />
      <circle className="node-dot" cx="220" cy="110" r="2.4" />
      <circle className="node" cx="440" cy="170" r="7" />
      <circle className="node-dot" cx="440" cy="170" r="2.4" />
      <circle className="node" cx="660" cy="60" r="7" />
      <circle className="node-dot" cx="660" cy="60" r="2.4" />
      <circle className="node" cx="880" cy="110" r="7" />
      <circle className="node-dot" cx="880" cy="110" r="2.4" />
      <text x="205" y="95">WELLHEAD</text>
      <text x="405" y="195">PIPELINE</text>
      <text x="620" y="45">REFINERY</text>
      <text x="835" y="95">GRID</text>
      <text className="readout" x="20" y="235">
        PRESS. 2,140 PSI
      </text>
      <text className="readout" x="345" y="240">
        FLOW 18.4 MMSCFD
      </text>
      <text className="readout" x="805" y="15">
        UPTIME 99.2%
      </text>
    </svg>
  );
}
