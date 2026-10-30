import type { Article } from '@/lib/siteData';

export type Cover = { src: string; alt: string; width: number; height: number };

/**
 * The artwork at the top of an article page.
 *
 * Every article's `image` is the 250 x 400 portrait thumbnail from the old
 * site's article cards. Blown up to fill a wide frame it went soft, and in a
 * 4:3 frame it left a bar of empty plate down each side (software test report
 * Bug_001 to Bug_015). Seven of the old article pages carried their own
 * artwork at full size, which they used as their social image; those are
 * below, in /images. The other eight pointed at generic site pictures, one of
 * them printing a staff member's own phone and email, so those keep their
 * thumbnail, shown no larger than it was drawn.
 */
const COVERS: Record<string, Cover> = {
  'digboi-the-forgotten-flame-that-lit-indias-oil-gas-story': {
    src: '/images/article-cover-digboi-refinery.webp',
    alt: 'Three photographs of Digboi Refinery’s process units, storage tanks and pipework, captioned “Digboi Refinery: Asia’s oldest refinery”',
    width: 1280,
    height: 720,
  },
  'the-birth-of-indias-offshore-energy-journey': {
    src: '/images/article-cover-sagar-samrat.webp',
    alt: 'The Sagar Samrat drilling rig at sea, captioned “Sagar Samrat: the rig that changed India’s offshore destiny”',
    width: 1280,
    height: 720,
  },
  'the-pipeline-that-changed-india-naharkatiya-noonmati-barauni-1962': {
    src: '/images/article-cover-first-crude-pipeline.webp',
    alt: 'A map of the Naharkatia–Noonmati–Barauni crude oil pipeline across north-east India beside a photograph of pipe being laid, captioned “India’s first crude oil pipeline”',
    width: 1280,
    height: 720,
  },
  'navigating-automation-architecture': {
    src: '/images/article-cover-plc-scada-dcs.webp',
    alt: 'SMEC graphic titled “PLC, SCADA & DCS: the heart of industrial reliability in 2025”, with HMI screens and open control panels',
    width: 1280,
    height: 720,
  },
  'unlocking-the-future-digital-twin-technology-the-future-is-now': {
    src: '/images/article-cover-digital-twin.webp',
    alt: 'Illustration of a digital twin: a glowing model of a plant and an engineer at a data screen, titled “Unlocking the future: digital twin technology”',
    width: 1600,
    height: 900,
  },
  'smec-the-solution-hub-3-engineering-resilience-starts-inside-the-panel': {
    src: '/images/article-cover-mcc-panels.webp',
    alt: 'Rows of SMEC motor control centre panels under the line “Still losing hours to motor trips?”',
    width: 1000,
    height: 1000,
  },
  'how-the-middle-east-is-engineering-energy': {
    src: '/images/article-cover-vision-2030.webp',
    alt: 'The Saudi Vision 2030 emblem over the Riyadh skyline at night',
    width: 711,
    height: 400,
  },
};

/** The thumbnails are all drawn at this size. */
const THUMBNAIL = { width: 250, height: 400 };

export const articleCover = (slug: string, article: Article): Cover =>
  COVERS[slug] ?? { src: article.image, alt: article.alt, ...THUMBNAIL };
