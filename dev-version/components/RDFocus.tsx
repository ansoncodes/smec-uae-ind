import Image from "next/image";
import Eyebrow from "@/components/ui/Eyebrow";
import { navItems, rdFocus } from "@/lib/siteData";
import styles from "./RDFocus.module.css";

const rdLink = navItems.find((n) => n.label === "Research & Development");

/**
 * Full-bleed photographic band, the way the wireframe build ran it. The night
 * refinery is a 1920px asset that was being shown in a 300px tile; at full
 * width it becomes the page's second anchor after the stats.
 */
export default function RDFocus() {
  return (
    <section className={styles.section} aria-labelledby="rd-focus">
      <div className={styles.bg} aria-hidden="true">
        <Image
          src="/images/misc/SMECoilandhasbanner-3.webp"
          alt=""
          fill
          sizes="100vw"
          className={styles.bgImage}
        />
      </div>
      <div className={styles.scrim} aria-hidden="true" />

      <div className="container">
        <div className={styles.inner}>
          <Eyebrow index="07">Research &amp; Development</Eyebrow>
          <h2 id="rd-focus" className={styles.heading}>
            {rdFocus.heading}
          </h2>
          <p className={styles.body}>{rdFocus.body}</p>

          {rdFocus.areas?.length > 0 && (
            <ol className={styles.areas}>
              {rdFocus.areas.map((area, i) => (
                <li key={area}>
                  <span className={styles.no}>{String(i + 1).padStart(2, "0")}</span>
                  {area}
                </li>
              ))}
            </ol>
          )}

          {rdLink && (
            <div className={styles.ctas}>
              <a className="btn btn-ghost" href={rdLink.href}>
                {rdLink.label}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
