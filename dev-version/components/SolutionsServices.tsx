"use client";

import { useState } from "react";
import Image from "next/image";
import { solutions } from "@/lib/siteData";
import { PlayIcon } from "@/components/Icons";
import styles from "./SolutionsServices.module.css";

/** Prototype `.paper` split: copy left, bordered video frame right. */
export default function SolutionsServices() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="paper" aria-labelledby="solutions-services">
      <div className={`container ${styles.split}`}>
        <div>
          <div className="eyebrow">Upstream · Midstream · Downstream</div>
          <h2 id="solutions-services" className={styles.heading}>
            {solutions.heading}
          </h2>
          <p className={styles.body}>{solutions.lines.join(" ")}</p>
          <div className={styles.ctas}>
            <a className="btn btn-ghost" href="https://smecoilandgas.com/solutions-and-services">
              Solutions and Services
            </a>
          </div>
        </div>

        <div className={styles.frame}>
          {playing ? (
            <iframe
              className={styles.iframe}
              src={`https://www.youtube.com/embed/${solutions.youtubeId}?autoplay=1&rel=0`}
              title="SMEC corporate video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              className={styles.poster}
              onClick={() => setPlaying(true)}
              aria-label="Play Video"
            >
              <Image
                src={solutions.poster.src}
                alt={solutions.poster.alt}
                width={solutions.poster.width}
                height={solutions.poster.height}
                className={styles.posterImage}
              />
              <span className={styles.scrim} />
              <span className={styles.play}>
                <PlayIcon size={20} />
              </span>
              <span className={styles.cap}>Corporate video</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
