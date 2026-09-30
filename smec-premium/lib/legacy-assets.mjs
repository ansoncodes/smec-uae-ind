/**
 * What the old site serves that is not a page.
 *
 * The redirect map in redirects.mjs was built from the WordPress XML sitemap:
 * 37 pages and 18 posts. §9 asks for more than that — "HTML pages, PDFs,
 * images receiving traffic/backlinks and indexed legacy URLs" — so the live
 * site was crawled (220 URLs, with the owner's permission) and this is what
 * the sitemap left out.
 *
 * It matters more than it would on a new domain: the new site replaces the
 * old one on smecoilandgas.com, so every one of these URLs stops working the
 * moment it goes live unless something here answers for it.
 */

/**
 * The fifteen product datasheets, each linked from exactly one product page
 * and each now pointing at that product's new home.
 *
 * §9 allows "redirect it to the current equivalent"; §5 asks that the PDF
 * context link the canonical HTML page. The PDFs themselves are not
 * republished, because their numerical content has not been through the
 * engineering gate (0.7) — if SMEC confirms they are current, hosting them
 * again is a better answer than redirecting them, and one line each.
 *
 * @type {{ from: string, to: string }[]}
 */
export const DATASHEET_REDIRECTS = [
  ['2023/09/smec-power-house.pdf', '/products/power-houses/'],
  ['2023/09/smec-vfd.pdf', '/products/vfd-houses/'],
  ['2023/09/smec-scr.pdf', '/products/scr-houses/'],
  ['2023/09/smec-battery.pdf', '/products/battery-charger/'],
  ['2023/09/smec-drill-monitoring.pdf', '/products/dms3000-drill-monitoring-system/'],
  ['2023/09/Integrated-Drilling.pdf', '/products/integrated-drilling-control-system/'],
  ['2023/09/Jacking-Control-System.pdf', '/products/jacking-control-system/'],
  ['2023/09/RPD-System.pdf', '/products/rpd-system/'],
  ['2023/09/Load-Monitoring-System.pdf', '/products/load-monitoring-system/'],
  ['2023/09/BOP-Control-System.pdf', '/products/bop-control-system/'],
  ['2023/09/smec-gas.pdf', '/products/gas-watch-panel/'],
  ['2023/09/smec-paga.pdf', '/products/paga-system/'],
  ['2023/09/smec-ignition.pdf', '/products/flare-ignition-system/'],
  ['2023/09/perimeter.pdf', '/products/explosion-proof-cctv/'],
  // ADAM-Edge belongs to the R&D page, which has no home in the locked
  // architecture yet (0.11). Digital engineering is the nearest true parent.
  ['2024/10/Adam-Edge.pdf', '/digital/digital-engineering/'],
].map(([file, to]) => ({ from: `/wp-content/uploads/${file}`, to }));

/**
 * Images the redesign still uses, under their old upload paths. Twenty-five
 * of the 288 on the old site; the rest are WordPress thumbnails, favicons and
 * artwork the new design does not use, and are listed in
 * docs/legacy-inventory.md for SMEC to decide on.
 *
 * @type {{ from: string, to: string }[]}
 */
export const IMAGE_REDIRECTS = [
  ['2022/05/Drill-Monitor-System-1.png', 'Drill-Monitor-System-1.png'],
  ['2022/05/SMEC-Oil-and-Gas-Logo.png', 'SMEC-Oil-and-Gas-Logo.png'],
  ['2024/10/SMEC-Oil-and-Gas-Logo.png', 'SMEC-Oil-and-Gas-Logo.png'],
  ['2024/10/SMEC-Oil-and-Gas-Logo-300x109.png', 'SMEC-Oil-and-Gas-Logo-300x109.png'],
  ['2024/10/SMEoilandgas-green-3.webp', 'SMEoilandgas-green-3.webp'],
  ['2024/10/map-final-1024x500.png', 'map-final-1024x500.png'],
  ['2024/10/map-blue-smecoilandgas.png', 'map-blue-smecoilandgas.png'],
  ['2022/05/Oil-and-gas-Banner.webp', 'Oil-and-gas-Banner.webp'],
  ['2024/10/Oil-and-gas-Banner.webp', 'Oil-and-gas-Banner.webp'],
  ['2024/10/SMECoilandhasbanner-3.webp', 'SMECoilandhasbanner-3.webp'],
  ['2022/05/Power-House-SMEC.png', 'Power-House-SMEC.png'],
  ['2022/05/Corporate-Video.png', 'Corporate-Video.png'],
  ['2022/05/Advanced-Perimeter-Security-System.png', 'Advanced-Perimeter-Security-System.png'],
  ['2022/05/BOP-Control-System-768x460.png', 'BOP-Control-System-768x460.png'],
  ['2022/05/Gas-Watch-Panel-768x460.webp', 'Gas-Watch-Panel-768x460.webp'],
  ['2022/05/Flare-Boom-Pilot-Ignition-System-768x460.png', 'Flare-Boom-Pilot-Ignition-System-768x460.png'],
  ['2022/05/Integrated-Drilling-Control-System-768x460.png', 'Integrated-Drilling-Control-System-768x460.png'],
  ['2022/05/RPD-System-Jacking-Control-System-768x460.png', 'RPD-System-Jacking-Control-System-768x460.png'],
  ['2024/10/adipec.png', 'adipec.png'],
  ['2024/10/Dwin-technology.webp', 'Dwin-technology.webp'],
  ['2024/10/SMEC-VARD.webp', 'SMEC-VARD.webp'],
  ['2024/10/Seepages-to-Sensors.webp', 'Seepages-to-Sensors.webp'],
  ['2024/10/Naharkatiya-Noonmati-Barauni-1962.webp', 'Naharkatiya-Noonmati-Barauni-1962.webp'],
  ['2024/10/Middle-East-Is-Engineering-Energy.webp', 'Middle-East-Is-Engineering-Energy.webp'],
  ['2024/10/Engineering-Resilience-Starts-Inside-the-Panel.webp', 'Engineering-Resilience-Starts-Inside-the-Panel.webp'],
].map(([file, image]) => ({ from: `/wp-content/uploads/${file}`, to: `/images/${image}` }));

/**
 * WordPress furniture the sitemap never listed but the crawl found live:
 * category archives, an author archive, paginated blog indexes, and a stray
 * second homepage. All of them currently return 200 and are indexable.
 *
 * @type {{ from: string, to: string }[]}
 */
export const ARCHIVE_REDIRECTS = [
  { from: '/category/blog', to: '/resources/' },
  { from: '/category/blog/page/2', to: '/resources/' },
  { from: '/category/news', to: '/resources/' },
  { from: '/category/oil', to: '/resources/' },
  { from: '/category/products', to: '/products/' },
  { from: '/category/uncategorized', to: '/resources/' },
  { from: '/blogs/page/2', to: '/resources/' },
  { from: '/author/shiyas', to: '/resources/' },
  { from: '/category/oil-gas', to: '/resources/' },
  // A duplicate of the homepage, live and indexable — the kind of thing a
  // migration is a good moment to stop serving.
  { from: '/home-new', to: '/' },
];

/**
 * RSS feeds. WordPress gives one to every post, category and the site; the
 * new site has none. A subscriber following a per-post feed is sent to the
 * article, and everything else to the resource centre, rather than meeting a
 * 404 with no explanation.
 *
 * Derived from the page map so it cannot drift from it.
 */
export const feedRedirects = (redirects) => [
  ...redirects.map(({ from, to }) => ({ from: `${from}/feed`, to })),
  { from: '/feed', to: '/resources/' },
  { from: '/comments/feed', to: '/resources/' },
  { from: '/category/blog/feed', to: '/resources/' },
  { from: '/category/news/feed', to: '/resources/' },
  { from: '/category/oil/feed', to: '/resources/' },
  { from: '/category/products/feed', to: '/products/' },
  { from: '/category/uncategorized/feed', to: '/resources/' },
];

/**
 * The WordPress REST API — 121 live endpoints under /wp-json/. They are not
 * content, nothing should link them, and they stop existing with WordPress.
 * Listed here so the next person can see they were considered and left to
 * 404 deliberately.
 */
export const LEFT_TO_404 = [
  '/wp-json/*',
  '/wp-admin/*',
  '/xmlrpc.php',
  '/?p=*',
  // Elementor template parts — a header, a footer and a contact block, each
  // live and indexable at its own URL on the current site. They are page
  // furniture, not pages, and nothing should have been able to reach them.
  '/elementor-hf/*',
];
