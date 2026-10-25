'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { SOLUTIONS } from '@/lib/siteData';
import { FILM_COPY } from '@/lib/homepage';
import { pageTypeOf, track } from '@/lib/analytics';
import { Play } from './Icons';
import styles from './CorporateFilm.module.css';

/**
 * The company film (image 20). The YouTube player is only inserted once the
 * poster is clicked, so the page never pays for the embed's scripts up front,
 * and it comes from youtube-nocookie.com, which sets no cookie until the film
 * plays. The click is the visitor pressing play, so it starts the film and
 * raises `video_start`.
 *
 * The video is still the one already on the live site; the client's new
 * upload replaces `SOLUTIONS.videoId` when it arrives. Captions are asked
 * for in the embed and show wherever the upload carries them.
 */
export default function CorporateFilm() {
  const [playing, setPlaying] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);

  // The play button is gone once pressed; hand keyboard focus to the player
  // that replaced it rather than drop it back at the top of the page.
  useEffect(() => {
    if (playing) frameRef.current?.focus();
  }, [playing]);

  const play = () => {
    setPlaying(true);
    track('video_start', {
      location: 'corporate_film',
      page_type: pageTypeOf(window.location.pathname),
      item: FILM_COPY.videoTitle,
    });
  };

  return (
    <section className={styles.section} data-tone="dark" aria-labelledby="film-title" id="film">
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.copy}>
            <p className={styles.kicker}>
              <span className={styles.kickerRule} aria-hidden="true" />
              {FILM_COPY.label}
            </p>
            <h2 id="film-title" className={styles.title} data-reveal="up">
              {FILM_COPY.title}
            </h2>
            <p className={styles.body} data-reveal="up" data-reveal-delay="90">
              {FILM_COPY.body}
            </p>
          </div>

          <div className={styles.player} data-reveal="fade" data-reveal-delay="120">
            <div className={styles.stage}>
              {playing ? (
                <iframe
                  ref={frameRef}
                  className={styles.frame}
                  src={`https://www.youtube-nocookie.com/embed/${SOLUTIONS.videoId}?autoplay=1&rel=0&cc_load_policy=1`}
                  title={FILM_COPY.videoTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  className={styles.poster}
                  onClick={play}
                  aria-label={`Play the ${FILM_COPY.videoTitle}`}
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
                  <span className={styles.playTitle} aria-hidden="true">
                    {FILM_COPY.videoTitle}
                  </span>
                  <span className={styles.playLabel} aria-hidden="true">
                    {FILM_COPY.playHint}
                  </span>
                </button>
              )}
            </div>

            <ul className={`inlineList ${styles.topics}`}>
              {FILM_COPY.topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
