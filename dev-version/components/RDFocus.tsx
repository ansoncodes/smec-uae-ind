import Image from "next/image";
import { navItems, rdFocus } from "@/lib/siteData";
import styles from "./RDFocus.module.css";

const rdLink = navItems.find((n) => n.label === "Research & Development");

/** Prototype split: copy on the left, a gradient-tinted gallery tile right. */
export default function RDFocus() {
  return (
    <section aria-labelledby="rd-focus">
      <div className={`container ${styles.split}`}>
        <div>
          <div className="eyebrow">Research &amp; Development</div>
          <h2 id="rd-focus" className={styles.heading}>
            {rdFocus.heading}
          </h2>
          <p className={styles.body}>{rdFocus.body}</p>
          {rdLink && (
            <div className={styles.ctas}>
              <a className="btn btn-ghost" href={rdLink.href}>
                {rdLink.label}
              </a>
            </div>
          )}
        </div>

        <div className={styles.tile}>
          <Image
            src="/images/misc/SMECoilandhasbanner-3.webp"
            alt="SMEC research and development"
            width={1920}
            height={720}
            className={styles.image}
            sizes="(max-width: 900px) 100vw, 560px"
          />
          <div className={styles.tint} aria-hidden="true" />
          <div className={styles.cap}>{rdFocus.heading}</div>
        </div>
      </div>
    </section>
  );
}
