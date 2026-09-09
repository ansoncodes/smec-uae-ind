'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SOLUTIONS } from '@/lib/siteData';
import { Play } from './Icons';
import styles from './CorporateFilm.module.css';

/** The source copy carries hard line breaks; let it set naturally instead. */
const flow = (text: string) => text.split(/\s*\n\s*/).join(' ');

/**
 * The company film. The YouTube player is only inserted once the poster is
 * clicked, so the page never pays for the embed's scripts up front.
 */
export default function CorporateFilm() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className={styles.section} data-tone="dark" aria-labelledby="film-title" id="film">
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.copy}>
            <p className={styles.kicker}>
              <span className={styles.kickerRule} aria-hidden="true" />
              Corporate film
            </p>
            <h2 id="film-title" className={styles.title} data-reveal="up">
              {SOLUTIONS.title}
            </h2>
            <p className={styles.body} data-reveal="up" data-reveal-delay="90">
              {flow(SOLUTIONS.body)}
            </p>
          </div>

          <div className={styles.stage} data-reveal="fade" data-reveal-delay="120">
            {playing ? (
              <iframe
                className={styles.frame}
                src={`https://www.youtube-nocookie.com/embed/${SOLUTIONS.videoId}?autoplay=1&rel=0`}
                title="SMEC Automation Pvt Ltd corporate video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                className={styles.poster}
                onClick={() => setPlaying(true)}
                aria-label="Play the SMEC corporate video"
              >
                <Image
                  src={SOLUTIONS.poster}
                  alt=""
                  width={1280}
                  height={720}
                  sizes="(max-width: 900px) 92vw, 58vw"
                  className={styles.posterImg}
                  loading="lazy"
                />
                <span className={styles.veil} aria-hidden="true" />
                <span className={styles.play}>
                  <Play />
                </span>
                <span className={styles.playLabel}>Watch the film</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
