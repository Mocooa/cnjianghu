const CORE_STATIC_PATHS = [
  '/',
  '/about',
  '/editorial-standards',
  '/explore',
  '/glossary',
  '/search',
  '/series',
  '/today',
  '/rss.xml',
];

export function buildStaticSitemapPaths({ pillarSlugs = [], seriesSlugs = [] } = {}) {
  return [
    ...new Set([
      ...CORE_STATIC_PATHS,
      ...pillarSlugs.map((slug) => `/explore/${slug}`),
      ...pillarSlugs.map((slug) => `/rss/${slug}.xml`),
      ...seriesSlugs.map((slug) => `/series/${slug}`),
    ]),
  ];
}
