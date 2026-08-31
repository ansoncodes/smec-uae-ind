import { rdFocus } from "@/lib/siteData";
import { SparkIcon } from "@/components/Icons";
import styles from "./RDFocus.module.css";

export default function RDFocus() {
  return (
    <section className="section-tight" aria-labelledby="rd-focus">
      <div className="container container-wide">
        <div className={styles.panel}>
          <div className={styles.pattern} aria-hidden="true" />
          <div className={styles.content}>
            <span className={styles.icon}>
              <SparkIcon size={20} />
            </span>
            <h2 id="rd-focus" className={styles.heading}>
              {rdFocus.heading}
            </h2>
            <p className={styles.body}>{rdFocus.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
