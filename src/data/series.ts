export interface SeriesInfo {
  slug: string;
  name: string;
  description: string;
  pillar: string;
}

export const seriesList: SeriesInfo[] = [
  {
    slug: 'pressure-cooker',
    name: 'The Pressure Cooker',
    description:
      'How involution, lying flat, and letting it rot became the vocabulary of a generation — and what the pressure behind those words looks like from the inside.',
    pillar: 'mind-china',
  },
  {
    slug: 'the-face-game',
    name: 'The Face Game',
    description:
      'Face, favor, and the invisible ledger that governs every Chinese relationship — from banquet seating to business deals to the weight behind a smile.',
    pillar: 'mind-china',
  },
  {
    slug: 'cultural-revival',
    name: 'Cultural Revival',
    description:
      'Guochao sneakers, hanfu on the subway, xianxia on screen, mythology in games — how a generation is remixing 3,000 years of tradition into something new.',
    pillar: 'aesthetic-china',
  },
  {
    slug: 'digital-china-series',
    name: 'Digital China',
    description:
      'WeChat, mobile payments, Douyin, livestream rooms — the apps and platforms that rewired daily life for a billion people.',
    pillar: 'digital-china',
  },
];

export function getSeriesInfo(slug: string): SeriesInfo | undefined {
  return seriesList.find((s) => s.slug === slug);
}
