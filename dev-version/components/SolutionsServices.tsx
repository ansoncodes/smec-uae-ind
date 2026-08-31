"use client";

import { useState } from "react";
import { solutions } from "@/lib/siteData";
import { ArrowRightIcon, PlayIcon } from "@/components/Icons";
import styles from "./SolutionsServices.module.css";

export default function SolutionsServices() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="section" aria-labelledby="solutions-services">
      <div className="container container-wide">
        <div className={styles.split}>
          <div className={styles.copy}>
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              Upstream · Midstream · Downstream
            </span>
            <h2 id="solutions-services" className={styles.heading}>
              {solutions.heading}
            </h2>
            <p className={styles.body}>{solutions.lines.join(" ")}</p>
            <a
              className="btn btn-secondary"
              href="https://smecoilandgas.com/solutions-and-services"
            >
              Solutions and Services
              <ArrowRightIcon size={15} />
            </a>
          </div>

          <div className={styles.videoCol}>
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
                  <span className={styles.playBadge}>
                    <PlayIcon size={22} />
                  </span>
                  <span className={styles.posterLabel}>Corporate video</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
