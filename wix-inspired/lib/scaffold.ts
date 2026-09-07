/**
 * SCAFFOLD IMAGES — TEMPORARY PLACEHOLDERS.
 *
 * The reference template is carried by large photography and SMEC Oil & Gas
 * does not yet have enough of its own, so these stock photographs (Wikimedia
 * Commons, reuse licences) stand in until client assets arrive.
 *
 * To replace one: drop the client photo in /public/images, point `src` at it,
 * remove the `SCAFFOLD-` file from /public/images/scaffold and its row in
 * /public/images/scaffold/SCAFFOLD-CREDITS.md. Once every entry is gone,
 * delete this module and the `data-scaffold` attributes it feeds.
 *
 * Find every usage with:   grep -rn "SCAFFOLD" app components lib
 * In the browser:          document.querySelectorAll('[data-scaffold]')
 */

export type ScaffoldImage = {
  /** Stable id, also emitted as data-scaffold="<id>" on the rendered <img>. */
  id: string;
  src: string;
  /** Decorative uses pass alt="" at the call site; this is the descriptive fallback. */
  alt: string;
  /** Attribution required by the source licence — see SCAFFOLD-CREDITS.md. */
  credit: string;
};

/** Hero photo band — rotates after the real site banner. */
export const SCAFFOLD_HERO_SLIDES: ScaffoldImage[] = [
  {
    id: 'hero-offshore-platform',
    src: '/images/scaffold/SCAFFOLD-hero-offshore-platform.jpg',
    alt: 'Offshore oil platform at sea',
    credit: 'Wikimedia Commons, CC BY-SA 2.0',
  },
  {
    id: 'hero-platform-flare',
    src: '/images/scaffold/SCAFFOLD-hero-platform-flare.jpg',
    alt: 'Offshore platform flaring in heavy seas',
    credit: 'Wikimedia Commons, CC BY 3.0',
  },
  {
    id: 'hero-jackup-rig',
    src: '/images/scaffold/SCAFFOLD-hero-jackup-rig.jpg',
    alt: 'Jack-up drilling rig at sea',
    credit: 'Wikimedia Commons, CC BY-SA 3.0',
  },
  {
    id: 'hero-supply-vessel',
    src: '/images/scaffold/SCAFFOLD-hero-supply-vessel.jpg',
    alt: 'Offshore supply vessel',
    credit: 'Wikimedia Commons, CC0',
  },
];

/** Who We Are — the people picture beside the company statement. */
export const SCAFFOLD_WHO_WE_ARE: ScaffoldImage = {
  id: 'who-we-are-crew',
  src: '/images/scaffold/SCAFFOLD-who-we-are-crew.jpg',
  alt: 'Rig crew in protective equipment at work',
  credit: 'Wikimedia Commons, public domain',
};
