import { whoWeAre } from "@/lib/siteData";
import { LayersIcon, ShieldIcon, GlobeIcon } from "@/components/Icons";
import styles from "./WhoWeAre.module.css";

/* Three capability chips distilled from the "Who We Are" copy — no new claims,
   just the phases the paragraph already names. */
const pillars = [
  { icon: LayersIcon, label: "Design & Estimation" },
  { icon: ShieldIcon, label: "Build & Installation" },
  { icon: GlobeIcon, label: "Commissioning" },
];

export default function WhoWeAre() {
  return (
    <section className="section" aria-labelledby="who-we-are">
      <div className="container">
        <div className={styles.inner}>
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            About SMEC
          </span>
          <h2 id="who-we-are" className={styles.heading}>
            {whoWeAre.heading}
          </h2>
          <p className={styles.body}>{whoWeAre.body}</p>

          <ul className={styles.pillars}>
            {pillars.map(({ icon: Icon, label }) => (
              <li key={label} className={styles.pillar}>
                <span className={styles.pillarIcon}>
                  <Icon size={16} />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
