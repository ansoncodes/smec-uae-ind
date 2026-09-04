import type { ReactNode } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import styles from "./SectionHeading.module.css";

type Props = {
  eyebrow?: string;
  /** Section number shown as `01 /` before the eyebrow label. */
  index?: string;
  title: ReactNode;
  body?: ReactNode;
  align?: "center" | "left";
  id?: string;
  cool?: boolean;
  tone?: "default" | "inverse";
};

/** The prototype's `.section-head`: eyebrow, section title, lead. */
export default function SectionHeading({
  eyebrow,
  index,
  title,
  body,
  align = "left",
  id,
}: Props) {
  return (
    <div className={`section-head ${align === "center" ? styles.center : ""}`}>
      {eyebrow && <Eyebrow index={index}>{eyebrow}</Eyebrow>}
      <h2 id={id}>{title}</h2>
      {body && <p>{body}</p>}
    </div>
  );
}
