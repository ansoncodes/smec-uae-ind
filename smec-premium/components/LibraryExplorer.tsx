'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { LibraryCategory } from '@/lib/homepage';
import { ArrowRight, ArrowUpRight } from './Icons';
import styles from './LibraryExplorer.module.css';

type Props = { label: string; intro: string; categories: LibraryCategory[] };

/**
 * The Engineering Library of images 22–27: six categories down the left, a
 * preview of one on the right.
 *
 * Each category is a link to its Resources page, so a click, a tap or Enter
 * goes there. Pointing at a category or tabbing to it only swaps the preview
 * beside it — an extra for a wide screen, never the way to reach anything.
 * All six previews are in the markup; on a phone the list gives way and the
 * six are shown one after another.
 */
export default function LibraryExplorer({ label, intro, categories }: Props) {
  const [active, setActive] = useState(0);

  return (
    <div className={styles.explorer} data-reveal="up">
      <div className={styles.head}>
        <p className={styles.label}>{label}</p>
        <p className={styles.intro}>{intro}</p>
      </div>

      <div className={styles.layout}>
        <ul className={styles.list}>
          {categories.map((category, i) => (
            <li key={category.num}>
              <a
                className={styles.entry}
                href={category.cta.href}
                data-on={i === active ? 'true' : undefined}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <span className={styles.entryNum} aria-hidden="true">
                  {category.num}
                </span>
                <span className={styles.entryName}>{category.name}</span>
                <ArrowUpRight className={styles.entryArrow} />
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.previews}>
          {categories.map((category, i) => (
            <article
              key={category.num}
              className={styles.preview}
              data-on={i === active ? 'true' : undefined}
            >
              <div className={styles.media} data-parallax>
                <Image
                  src={category.image.src}
                  alt={category.image.alt}
                  width={category.image.width}
                  height={category.image.height}
                  sizes="(max-width: 900px) 92vw, 46vw"
                  className={`${styles.img} drift`}
                  loading="lazy"
                />
              </div>
              <p className={styles.kicker}>
                <span aria-hidden="true">{category.num} </span>
                {category.name}
              </p>
              <h3 className={styles.title}>{category.title}</h3>
              <p className={styles.body}>{category.body}</p>
              <a className={styles.cta} href={category.cta.href}>
                {category.cta.label}
                <ArrowRight className="arrow" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
