import type { ReactNode } from "react";
import styles from "./SectionHeading.module.css";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  align?: "center" | "left";
  id?: string;
  tone?: "default" | "inverse";
};

export default function SectionHeading({
  eyebrow,
  title,
  body,
  align = "center",
  id,
  tone = "default",
}: Props) {
  return (
    <div
      className={[
        styles.root,
        align === "center" ? styles.center : styles.left,
        tone === "inverse" ? styles.inverse : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {eyebrow && (
        <span className="eyebrow">
          <span className="eyebrow-dot" />
          {eyebrow}
        </span>
      )}
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {body && <p className={styles.body}>{body}</p>}
    </div>
  );
}
