import Eyebrow from "@/components/ui/Eyebrow";
import { whoWeAre } from "@/lib/siteData";
import { LayersIcon, ShieldIcon, GlobeIcon } from "@/components/Icons";
import styles from "./WhoWeAre.module.css";

/* Three capability tiles distilled from the "Who We Are" copy — no new claims,
   just the phases the paragraph already names. */
const pillars = [
  { icon: LayersIcon, label: "Design & Estimation" },
  { icon: ShieldIcon, label: "Build & Installation" },
  { icon: GlobeIcon, label: "Commissioning" },
];

/** Prototype two-column split: copy on the left, `.region` tiles on the right. */
export default function WhoWeAre() {
  return (
    <section aria-labelledby="who-we-are">
      <div className={`container ${styles.split}`}>
        <div>
          <Eyebrow index="01">Company</Eyebrow>
          <h2 id="who-we-are" className={styles.heading}>
            {whoWeAre.heading}
          </h2>
          <p className={styles.body}>{whoWeAre.body}</p>
        </div>

        <div>
          <Eyebrow>Under one roof</Eyebrow>
          <ul className={`grid g3 ${styles.tiles}`}>
            {pillars.map(({ icon: Icon, label }) => (
              <li key={label} className={styles.region}>
                <span className={styles.icon}>
                  <Icon size={16} />
                </span>
                <div className={styles.rn}>{label}</div>
                <div className={styles.rs}>Turnkey EPC</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
