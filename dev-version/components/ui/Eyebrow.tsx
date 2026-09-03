import type { ReactNode } from "react";

/**
 * Technical section label: `01 / CAPABILITIES`.
 *
 * The number is what makes the page read as an editorial index rather than a
 * stack of unrelated blocks, so every major section carries one. Sections that
 * are strips rather than chapters (the partner row, the stats band) pass no
 * index and keep the plain rule instead.
 */
export default function Eyebrow({
  index,
  tone = "cool",
  children,
}: {
  index?: string;
  /** `hot` is reserved for the contracting entity — see the accent rules. */
  tone?: "cool" | "hot";
  children: ReactNode;
}) {
  const cls = ["eyebrow", tone === "hot" ? "hot" : "", index ? "numbered" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <p className={cls}>
      {index && <span className="eyebrow-no">{index}</span>}
      {children}
    </p>
  );
}
