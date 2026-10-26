'use client';

import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import Image from 'next/image';
import type { GalleryCategory, GalleryPhoto } from '@/lib/gallery';
import { ArrowRight, Close, Plus } from './Icons';
import styles from './Gallery.module.css';

/**
 * The gallery: a category filter, the grid, and a full-screen viewer.
 *
 * Every photograph is in the server HTML with its alt text, and the filter
 * only hides tiles, so a crawler — or a visitor whose script has not loaded —
 * sees all of them. The viewer is a native modal <dialog>: the browser keeps
 * focus inside it, and Escape closes it; focus then returns to the tile that
 * opened it. Arrow keys step through whatever the filter is showing.
 *
 * Opening and closing are driven from here rather than from the dialog's
 * `close` event, which not every browser fires when Escape closes a dialog
 * (the desktop app's own browser does not); `cancel` is still handled, for a
 * close request that comes from elsewhere, such as Android's back gesture.
 */
export default function Gallery({
  photos,
  categories,
}: {
  photos: GalleryPhoto[];
  /** The categories that have photographs, in the client's order. */
  categories: GalleryCategory[];
}) {
  const [filter, setFilter] = useState<string | null>(null);
  const [current, setCurrent] = useState<number | null>(null);
  const [status, setStatus] = useState('');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  const shown = photos.filter((photo) => !filter || photo.category === filter);
  const labelOf = (id: string) => categories.find((category) => category.id === id)?.label ?? '';
  const countOf = (id: string | null) =>
    photos.filter((photo) => !id || photo.category === id).length;
  const photo = current === null ? null : shown[current];

  const choose = (id: string | null) => {
    setFilter(id);
    const count = countOf(id);
    setStatus(
      `Showing ${count} ${count === 1 ? 'photograph' : 'photographs'}${id ? `: ${labelOf(id)}` : ''}.`
    );
  };

  useEffect(
    () => () => {
      document.body.style.overflow = '';
    },
    []
  );

  const open = (index: number, from: HTMLButtonElement) => {
    opener.current = from;
    // Rendered first, so there is a Close button to put focus on.
    flushSync(() => setCurrent(index));
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
  };

  /** Every way out ends here; running it twice is harmless. */
  const finish = () => {
    document.body.style.overflow = '';
    setCurrent(null);
    opener.current?.focus();
  };

  const close = () => {
    if (dialogRef.current?.open) dialogRef.current.close();
    finish();
  };

  const step = (by: number) =>
    setCurrent((index) => (index === null ? index : (index + by + shown.length) % shown.length));

  return (
    <>
      {categories.length > 1 ? (
        <div className={styles.filters} role="group" aria-label="Show photographs from">
          {[{ id: null, label: 'All' }, ...categories].map(({ id, label }) => (
            <button
              key={label}
              type="button"
              className={styles.filter}
              aria-pressed={filter === id}
              onClick={() => choose(id)}
            >
              {label}
              <span className={styles.filterCount}>
                {countOf(id)}
                <span className="visuallyHidden"> photographs</span>
              </span>
            </button>
          ))}
        </div>
      ) : null}
      <p className="visuallyHidden" role="status">
        {status}
      </p>

      <ul className={styles.grid}>
        {photos.map((item, i) => (
          <li key={item.src} hidden={!!filter && item.category !== filter}>
            <figure className={styles.tile}>
              <div className={styles.frame}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 600px) 92vw, (max-width: 1080px) 46vw, 30vw"
                  preload={i === 0}
                  className={styles.image}
                />
                <button
                  type="button"
                  className={styles.open}
                  aria-haspopup="dialog"
                  aria-label={`Enlarge: ${item.title}`}
                  onClick={(event) => open(shown.indexOf(item), event.currentTarget)}
                >
                  <span className={styles.openHint} aria-hidden="true">
                    <Plus />
                  </span>
                </button>
              </div>
              <figcaption className={styles.caption}>
                <span className={styles.captionTitle}>{item.title}</span>
                <span className={styles.captionCategory}>{labelOf(item.category)}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className={styles.viewer}
        aria-labelledby="gallery-viewer-title"
        onCancel={finish}
        onClose={finish}
        onKeyDown={(event) => {
          if (event.key === 'Escape') close();
          else if (shown.length > 1 && event.key === 'ArrowRight') step(1);
          else if (shown.length > 1 && event.key === 'ArrowLeft') step(-1);
          else return;
          event.preventDefault();
        }}
      >
        {photo && current !== null ? (
          <div
            className={styles.stage}
            onClick={(event) => {
              if (event.target === event.currentTarget) close();
            }}
          >
            <div className={styles.bar}>
              <p className={styles.count} aria-hidden="true">
                {String(current + 1).padStart(2, '0')} / {String(shown.length).padStart(2, '0')}
              </p>
              <button
                ref={closeRef}
                type="button"
                className={styles.control}
                aria-label="Close"
                onClick={close}
              >
                <Close />
              </button>
            </div>

            <figure
              className={styles.view}
              onClick={(event) => {
                if (event.target === event.currentTarget) close();
              }}
            >
              <Image
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 700px) 92vw, 70vw"
                // Asked for, so not lazy; and sized from its proportions, so
                // the caption does not jump when it arrives.
                loading="eager"
                style={{ ['--ratio' as string]: photo.width / photo.height }}
                className={styles.viewImage}
              />
              <figcaption className={styles.viewCaption}>
                <span id="gallery-viewer-title">{photo.title}</span>
                <span className={styles.captionCategory}>{labelOf(photo.category)}</span>
              </figcaption>
            </figure>

            {shown.length > 1 ? (
              <>
                <button
                  type="button"
                  className={`${styles.control} ${styles.prev}`}
                  aria-label="Previous photograph"
                  onClick={() => step(-1)}
                >
                  <ArrowRight className={styles.flip} />
                </button>
                <button
                  type="button"
                  className={`${styles.control} ${styles.next}`}
                  aria-label="Next photograph"
                  onClick={() => step(1)}
                >
                  <ArrowRight />
                </button>
              </>
            ) : null}

            <p className="visuallyHidden" aria-live="polite">
              {`Photograph ${current + 1} of ${shown.length}: ${photo.title}`}
            </p>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
