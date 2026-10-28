'use client';

import { useState } from 'react';

/**
 * Which item of a list the reader is on, the one under the pointer or holding
 * keyboard focus, for the stylesheet: --a is its index and --o is 1 while
 * there is one. The items are rendered on the server and passed in, each
 * marked with data-index. Crossing the gap between two items keeps the last
 * one, so nothing snaps shut on the way past. With `keep` it also stays when
 * the pointer or focus leaves the list; without, leaving clears it.
 */
export default function ActiveIndex({
  as: Tag = 'div',
  className,
  initial = null,
  keep = false,
  children,
}: {
  as?: 'div' | 'ul';
  className: string;
  initial?: number | null;
  keep?: boolean;
  children: React.ReactNode;
}) {
  const [active, setActive] = useState<number | null>(initial);

  const pick = (target: EventTarget) => {
    const index = Number((target as Element).closest?.('[data-index]')?.getAttribute('data-index'));
    if (Number.isInteger(index)) setActive(index);
  };

  return (
    <Tag
      className={className}
      style={{ '--a': active ?? 0, '--o': active === null ? 0 : 1 } as React.CSSProperties}
      onPointerOver={(event: React.PointerEvent) => {
        if (event.pointerType !== 'touch') pick(event.target);
      }}
      onPointerLeave={() => {
        if (!keep) setActive(null);
      }}
      onFocus={(event: React.FocusEvent) => pick(event.target)}
      onBlur={(event: React.FocusEvent) => {
        if (!keep && !event.currentTarget.contains(event.relatedTarget as Node | null)) setActive(null);
      }}
    >
      {children}
    </Tag>
  );
}
