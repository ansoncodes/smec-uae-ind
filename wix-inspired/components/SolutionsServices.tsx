'use client';

import { useState } from 'react';
import { SOLUTIONS } from '@/lib/siteData';
import { Play } from './Icons';
import styles from './SolutionsServices.module.css';

export default function SolutionsServices() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className={styles.section} aria-labelledby="solutions-services">
      <div className={styles.copyCol}>
        <div className={styles.copyInner}>
          <h2 id="solutions-services" className={`${styles.heading} m-fade`}>
            {SOLUTIONS.title}
          </h2>
          <p className={`${styles.body} m-slide-down`}>{SOLUTIONS.body}</p>
        </div>
      </div>

      <div className={`${styles.videoCol} m-reveal`}>
        {playing ? (
          <iframe
            className={styles.frame}
            src={`https://www.youtube.com/embed/${SOLUTIONS.videoId}?autoplay=1&rel=0`}
            title="SMEC Automation Pvt Ltd corporate video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className={styles.overlay}
            style={{ backgroundImage: `url(${SOLUTIONS.poster})` }}
            onClick={() => setPlaying(true)}
            aria-label="Play the SMEC corporate video"
          >
            <span className={styles.play}>
              <Play />
            </span>
          </button>
        )}
      </div>
    </section>
  );
}
