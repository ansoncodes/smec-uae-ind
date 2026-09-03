import type { ReactNode } from "react";
import styles from "./SectionHeading.module.css";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  align?: "center" | "left";
  id?: string;
  /** Cool (teal→violet) eyebrow instead of the default hot gradient. */
  cool?: boolean;
  /** Kept for call-site compatibility; the page is single-tone. */
  tone?: "default" | "inverse";
};

/** The prototype's `.section-head`: eyebrow, 32px display heading, soft lead. */
export default function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  id,
  cool = false,
}: Props) {
  return (
    <div className={`section-head ${align === "center" ? styles.center : ""}`}>
      {eyebrow && <div className={`eyebrow${cool ? " cool" : ""}`}>{eyebrow}</div>}
      <h2 id={id}>{title}</h2>
      {body && <p>{body}</p>}
    </div>
  );
}
