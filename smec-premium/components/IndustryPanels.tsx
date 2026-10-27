'use client';

import { useState } from 'react';

/**
 * The industry list, plus which of its panels is open. The panels themselves
 * are rendered on the server by Industries; this only tells the stylesheet
 * which one the pointer or keyboard focus is on, through --k (its index) and
 * --o (1 while one is open). Moving across the gap between two panels keeps
 * the last one open, so the row never snaps shut on the way past.
 */
export default function IndustryPanels({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState<number | null>(null);

  const indexOf = (target: EventTarget) => {
    const item = (target as Element).closest?.('li');
    return item?.parentElement ? Array.prototype.indexOf.call(item.parentElement.children, item) : -1;
  };

  return (
    <ul
      className={className}
      style={{ '--k': open ?? 0, '--o': open === null ? 0 : 1 } as React.CSSProperties}
      onPointerOver={(event) => {
        if (event.pointerType === 'touch') return;
        const index = indexOf(event.target);
        if (index >= 0) setOpen(index);
      }}
      onPointerLeave={() => setOpen(null)}
      onFocus={(event) => {
        const index = indexOf(event.target);
        if (index >= 0) setOpen(index);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(null);
      }}
    >
      {children}
    </ul>
  );
}
