/**
 * The Gallery tab: project, site, FAT, facility and event photographs (client,
 * 28 September; a main tab since 23 October).
 *
 * The photographs are the ones she supplied for it, in Creatives/Gallery (25
 * October), and only those that look like real photographs. Whether the
 * generated-looking creatives are acceptable is still her question (AST-06),
 * and a gallery is where a visitor most fairly takes a picture as a record of
 * what happened. Four of the nine are left out for that reason: "Industrial
 * Switchgear Room_ Open and Closed Panels" (a re-rendering of another, with
 * garbled nameplates), "Open Industrial Control Panel Workshop" (components on
 * its door that no panel carries), "workshop (1)" (garbled nameplates) and
 * "workshop" (staged figures and branded furniture). Three of the five used
 * have been sharpened by software that garbles small print — the meter dials
 * on two, the nameplates on the third — but each is a real scene.
 *
 * A category shows only when it has a photograph. None of the five shows a
 * site, a factory acceptance test or an event, so two of her five categories
 * are in use. Alt text says what each picture shows and no more: no project,
 * client or place came with the images, so none is named.
 */

export const GALLERY_URL = '/gallery/';

/** The page's introduction, and its meta description. */
export const GALLERY_INTRO =
  'Photographs from SMEC’s workshop: control panels and emergency switchboards, and the team inspecting, labelling and packing them.';

export type GalleryCategory = { id: string; label: string };

/** Her five categories, in her order. */
export const GALLERY_CATEGORIES: GalleryCategory[] = [
  { id: 'projects', label: 'Projects' },
  { id: 'site', label: 'Site' },
  { id: 'fat', label: 'FAT' },
  { id: 'facility', label: 'Facility' },
  { id: 'events', label: 'Events' },
];

export type GalleryPhoto = {
  src: string;
  width: number;
  height: number;
  /** A short caption under the picture: what it is, not a claim about it. */
  title: string;
  alt: string;
  category: string;
  /** The supplied file it was converted from, in Creatives/Gallery. */
  source: string;
};

/* Converted to WebP for the homepage (957a3a3); the gallery reuses them. */
export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    src: '/images/gallery-emergency-switchboard.webp',
    width: 900,
    height: 1188,
    title: 'Emergency switchboards in the workshop',
    alt: 'Two light-grey emergency switchboard panels on a steel stand in a workshop, each with analogue meters, a digital controller, coloured indicator lamps and a red emergency-stop button; cables run from a row of circuit breakers on the stand down to the floor, and a roller-shutter door is open behind.',
    category: 'projects',
    source: 'Emergency switchboard.jpeg',
  },
  {
    src: '/images/gallery-panel-packing.webp',
    width: 800,
    height: 800,
    title: 'Panel inspection in the workshop',
    alt: 'Two technicians in hard hats among control panel enclosures wrapped in protective film: one, in blue SMEC coveralls, reads a document laid on an enclosure; the other, in a high-visibility vest, holds a panel door bearing the SMEC logo.',
    category: 'facility',
    source: 'workshop (2).jpg',
  },
  {
    src: '/images/gallery-switchboard-front.webp',
    width: 900,
    height: 1068,
    title: 'Emergency switchboard front panel',
    alt: 'Front of an emergency switchboard panel: two rows of analogue meters for frequency, voltage, current, power factor and kilowatts, selector switches, a digital controller, labelled push buttons, coloured indicator lamps and a red emergency-stop button.',
    category: 'projects',
    source: 'Emergency Switchboard Control Panel.png',
  },
  {
    src: '/images/gallery-workbench.webp',
    width: 800,
    height: 800,
    title: 'Labelling and packing',
    alt: 'A technician in navy SMEC coveralls seated at a table, writing on a boxed item, while a colleague in tan coveralls stands at the table behind; shelves of film-wrapped stock fill the background, and a panel with cable connections stands on a bench to the right.',
    category: 'facility',
    source: 'WORKSHOP (3).jpg',
  },
  {
    src: '/images/gallery-control-desk.webp',
    width: 800,
    height: 800,
    title: 'Panel control supply units',
    alt: 'Two control panels labelled "Panel Control Supply" lying face up on workbenches, each with an analogue voltmeter and ammeter, three phase-indicator lamps, a digital meter, two selector switches and stop, start and fault indicators; shelves of electrical components behind.',
    category: 'projects',
    source: 'panel control supply.jpg',
  },
];

/** Her categories that have at least one photograph, in her order. */
export const GALLERY_CATEGORIES_IN_USE = GALLERY_CATEGORIES.filter((category) =>
  GALLERY_PHOTOS.some((photo) => photo.category === category.id)
);
