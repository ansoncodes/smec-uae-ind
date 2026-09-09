import Image from 'next/image';
import { RD_FOCUS, SITE } from '@/lib/siteData';
import { localHref } from '@/lib/routes';
import { ArrowRight } from './Icons';
import styles from './Innovation.module.css';

/**
 * 07 / Innovation — SMEC's R&D focus, drawn as a system architecture rather
 * than illustrated with stock imagery. The schematic is inline SVG in a fixed
 * user space; its connectors draw themselves once the block is in view.
 */

const NODES = {
  field: [
    { label: 'Field instruments', y: 70 },
    { label: 'Gas detection', y: 173 },
    { label: 'Load & position', y: 276 },
  ],
  out: [
    { label: 'Rig HMI', y: 110 },
    { label: 'Remote / IoT', y: 226 },
  ],
};

const FOCUS = [
  { k: 'Automation', v: 'Control architecture for rig and plant systems' },
  { k: 'Reliability', v: 'Redundancy and diagnostics designed in' },
  { k: 'Data', v: 'Wellhead and equipment data, collected and used' },
  { k: 'Efficiency', v: 'Energy and operational optimisation' },
];

export default function Innovation() {
  return (
    <section
      className={`section ${styles.section} grain`}
      id="innovation"
      data-tone="dark"
      aria-labelledby="innovation-title"
    >
      <div className={styles.backdrop} aria-hidden="true">
        <Image
          src={RD_FOCUS.image}
          alt=""
          fill
          sizes="100vw"
          className={styles.backdropImg}
          loading="lazy"
        />
      </div>
      <div className={styles.mesh} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <p className="sectionLabel" data-reveal="fade">
          <span className="num">07</span>
          <span>{RD_FOCUS.title}</span>
          <span className="rule" />
        </p>

        <div className={styles.layout}>
          <div className={styles.copy}>
            <h2 id="innovation-title" className={styles.title} data-reveal="up">
              Engineering
              <br />
              what comes next.
            </h2>

            <p className={styles.lead} data-reveal="up" data-reveal-delay="90">
              Developing automation technologies that improve efficiency, reliability and safety
              across oil &amp; gas operations.
            </p>

            <p className={styles.note} data-reveal="up" data-reveal-delay="140">
              {RD_FOCUS.body}
            </p>

            <ul className={styles.focus} data-reveal="up" data-reveal-delay="190">
              {FOCUS.map((item) => (
                <li key={item.k}>
                  <span className={styles.focusKey}>{item.k}</span>
                  <span className={styles.focusVal}>{item.v}</span>
                </li>
              ))}
            </ul>

            <a
              className={`btn ${styles.cta}`}
              href={localHref(`${SITE.url}/research-and-developement`)}
              data-reveal="up"
              data-reveal-delay="240"
            >
              Explore Our R&amp;D
              <ArrowRight className="arrow" />
            </a>
          </div>

          {/* --------------------------------------------------- schematic */}
          <figure className={styles.schematic} data-reveal="fade" data-reveal-delay="140">
            <figcaption className={styles.schematicCap}>
              Reference control architecture
            </figcaption>

            <svg viewBox="0 0 720 400" className={styles.svg} role="img" aria-label="Reference control architecture: field instruments, gas detection and load sensing feed an integrated control system, which serves the rig HMI and remote monitoring.">
              {/* connectors, drawn first so the nodes sit on top */}
              <g className={styles.wires} fill="none" strokeWidth="1" pathLength={1}>
                <path d="M160 97 H215 V200 H270" />
                <path d="M160 200 H270" />
                <path d="M160 303 H215 V200 H270" />
                <path d="M450 200 H505 V137 H560" />
                <path d="M450 200 H505 V253 H560" />
              </g>

              {/* field side */}
              {NODES.field.map((node) => (
                <g key={node.label} className={styles.node}>
                  <rect x="10" y={node.y} width="150" height="54" rx="2" />
                  <text x="26" y={node.y + 31}>
                    {node.label}
                  </text>
                </g>
              ))}

              {/* controller */}
              <g className={`${styles.node} ${styles.core}`}>
                <rect x="270" y="140" width="180" height="120" rx="2" />
                <text x="294" y="188">
                  Integrated
                </text>
                <text x="294" y="212">
                  control system
                </text>
                <text x="294" y="240" className={styles.small}>
                  IEC 61131 · redundant
                </text>
              </g>

              {/* output side */}
              {NODES.out.map((node) => (
                <g key={node.label} className={styles.node}>
                  <rect x="560" y={node.y} width="150" height="54" rx="2" />
                  <text x="576" y={node.y + 31}>
                    {node.label}
                  </text>
                </g>
              ))}

              {/* junction points */}
              <g className={styles.dots}>
                <circle cx="215" cy="200" r="3" />
                <circle cx="505" cy="200" r="3" />
              </g>
            </svg>
          </figure>
        </div>
      </div>
    </section>
  );
}
