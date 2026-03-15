import { pillars } from '../utils/pillars';
import { loadTitleBankItems } from './title-bank-parser.mjs';
import { normalizeRoadmapTitleKey } from './roadmap-title-key.mjs';

export type RoadmapTag =
  | 'Launch first'
  | 'Evergreen'
  | 'High shareability'
  | 'Needs glossary support';

export type RoadmapFormat =
  | 'Quick Bites'
  | 'Misread / Actually'
  | 'Scene Decoder'
  | 'Deep Dives'
  | 'Glossary-led';

export interface LaunchSlateItem {
  rank: number;
  wave: 1 | 2 | 3;
  pillar: string;
  dossier: string;
  format: Extract<RoadmapFormat, 'Quick Bites' | 'Misread / Actually' | 'Deep Dives'>;
  title: string;
  tags: readonly RoadmapTag[];
  dependencies: readonly string[];
}

export interface PlannedTitleItem {
  pillar: string;
  dossier: string;
  format: RoadmapFormat;
  title: string;
  tags: readonly RoadmapTag[];
  sourceFile: string;
  dependencies: readonly string[];
  launchRank?: number;
  launchWave?: 1 | 2 | 3;
  order: number;
}

export interface RoadmapDossierGroup<TItem = PlannedTitleItem> {
  dossier: string;
  items: TItem[];
}

export interface PlannedPillarSummary {
  titleCount: number;
  dossierCount: number;
  launchCount: number;
  evergreenCount: number;
  shareabilityCount: number;
  glossaryCount: number;
}

const launchShare = ['Launch first', 'Evergreen', 'High shareability'] as const satisfies readonly RoadmapTag[];
const launchShareGlossary = [
  'Launch first',
  'Evergreen',
  'High shareability',
  'Needs glossary support',
] as const satisfies readonly RoadmapTag[];
const launchEvergreen = ['Launch first', 'Evergreen'] as const satisfies readonly RoadmapTag[];
const launchEvergreenGlossary = [
  'Launch first',
  'Evergreen',
  'Needs glossary support',
] as const satisfies readonly RoadmapTag[];

export const roadmapWaveMeta = [
  {
    wave: 1 as const,
    label: 'Immediate Curiosity Hooks',
    description: 'Fast front-door titles that help outsiders enter China through high-recognition curiosity.',
  },
  {
    wave: 2 as const,
    label: 'Strong Explainers',
    description: 'Titles that correct common misreadings and add structure after the first click.',
  },
  {
    wave: 3 as const,
    label: 'Authority Builders',
    description: 'Longer anchors that make the archive feel trustworthy, deep, and worth returning to.',
  },
] as const;

export const roadmapItems: LaunchSlateItem[] = [
  {
    rank: 1,
    wave: 1,
    pillar: 'taste-life',
    dossier: 'Hot Water and Body Temperature Logic',
    format: 'Quick Bites',
    title: `Why "Drink Hot Water" Is One of China's Most Misunderstood Care Gestures`,
    tags: launchShareGlossary,
    dependencies: ['Shanghuo', 'Warming vs cooling foods'],
  },
  {
    rank: 2,
    wave: 1,
    pillar: 'digital-china',
    dossier: 'WeChat and Super-App Life',
    format: 'Quick Bites',
    title: 'Why WeChat Feels Bigger Than Any Messaging App Foreigners Expect',
    tags: launchShare,
    dependencies: ['Mini Program'],
  },
  {
    rank: 3,
    wave: 1,
    pillar: 'living-china',
    dossier: 'City Personalities',
    format: 'Quick Bites',
    title: 'Why Chinese Cities Feel More Distinct Than Many Foreigners Expect',
    tags: launchShare,
    dependencies: [],
  },
  {
    rank: 4,
    wave: 1,
    pillar: 'aesthetic-china',
    dossier: 'Mythology Reborn',
    format: 'Quick Bites',
    title: 'Why Chinese Mythology Feels Suddenly Everywhere Again',
    tags: launchShare,
    dependencies: ['Immortal', 'Auspicious beast'],
  },
  {
    rank: 5,
    wave: 1,
    pillar: 'mind-china',
    dossier: 'Face, Favor, and Indirectness',
    format: 'Quick Bites',
    title: `Why "Saving Face" Explains More Than Politeness in China`,
    tags: launchShareGlossary,
    dependencies: ['Mianzi', 'Renqing'],
  },
  {
    rank: 6,
    wave: 1,
    pillar: 'future-china',
    dossier: 'China AI Ecosystem',
    format: 'Quick Bites',
    title: `Why China's AI Story Feels Different from Silicon Valley's Story`,
    tags: launchShare,
    dependencies: ['Large model', 'Open-source model'],
  },
  {
    rank: 7,
    wave: 1,
    pillar: 'taste-life',
    dossier: 'Breakfast China',
    format: 'Quick Bites',
    title: 'Why Breakfast in China Is So Often Hot, Fast, and Savory',
    tags: launchShare,
    dependencies: ['Zaodian', 'Doujiang'],
  },
  {
    rank: 8,
    wave: 1,
    pillar: 'digital-china',
    dossier: 'Meme Universes',
    format: 'Quick Bites',
    title: 'Why Chinese Chats Use So Many Stickers and Meme Images',
    tags: launchShare,
    dependencies: ['Zhenghuo', 'Pofang'],
  },
  {
    rank: 9,
    wave: 1,
    pillar: 'living-china',
    dossier: 'Public Leisure Rituals',
    format: 'Quick Bites',
    title: 'Why Public Leisure in China Is So Visible',
    tags: launchShare,
    dependencies: ['Public square'],
  },
  {
    rank: 10,
    wave: 1,
    pillar: 'aesthetic-china',
    dossier: 'Chinese Fantasy Visual Language',
    format: 'Quick Bites',
    title: 'Why Chinese Fantasy Looks Different from Medieval European Fantasy',
    tags: launchShareGlossary,
    dependencies: ['Xianxia', 'Shanshui'],
  },
  {
    rank: 11,
    wave: 1,
    pillar: 'mind-china',
    dossier: 'Parenting Logic and Educational Pressure',
    format: 'Quick Bites',
    title: 'Why Chinese Parenting Can Feel Intense Even When It Is Loving',
    tags: launchShareGlossary,
    dependencies: ['Gaokao'],
  },
  {
    rank: 12,
    wave: 1,
    pillar: 'future-china',
    dossier: 'Cashless Life',
    format: 'Quick Bites',
    title: 'Why Paying in China Can Feel Frictionless to First-Time Visitors',
    tags: launchShare,
    dependencies: ['Scan to pay', 'QR economy'],
  },
  {
    rank: 13,
    wave: 2,
    pillar: 'taste-life',
    dossier: 'Banquet Codes',
    format: 'Deep Dives',
    title: 'The Twelve Unwritten Rules of a Chinese Banquet',
    tags: launchShare,
    dependencies: ['Jingjiu', 'Giving face'],
  },
  {
    rank: 14,
    wave: 2,
    pillar: 'digital-china',
    dossier: 'Livestream Worlds',
    format: 'Deep Dives',
    title: 'A Livestream Room in China Is Not Just Someone Selling Things',
    tags: launchShare,
    dependencies: ['Danmu'],
  },
  {
    rank: 15,
    wave: 2,
    pillar: 'living-china',
    dossier: 'Park Life and Square Dancing',
    format: 'Deep Dives',
    title: '100 Million Women, Zero Membership Fees — China\'s Largest Social Network Has No App',
    tags: launchShare,
    dependencies: ['Guangchangwu'],
  },
  {
    rank: 16,
    wave: 2,
    pillar: 'aesthetic-china',
    dossier: 'Guochao / New Chinese Style',
    format: 'Deep Dives',
    title: 'The Sneaker That Quoted a Tang Dynasty Poem',
    tags: launchShareGlossary,
    dependencies: ['Guochao', 'New Chinese Style'],
  },
  {
    rank: 17,
    wave: 2,
    pillar: 'mind-china',
    dossier: 'Neijuan / Tangping / Bailan',
    format: 'Deep Dives',
    title: 'Involution, Lying Flat, Let It Rot — Three Words That Track a Generation\'s Exhaustion',
    tags: launchShareGlossary,
    dependencies: ['Neijuan', 'Tangping', 'Bailan'],
  },
  {
    rank: 18,
    wave: 2,
    pillar: 'future-china',
    dossier: 'Logistics and Instant Delivery',
    format: 'Deep Dives',
    title: 'Thirty Minutes from Tap to Door — Inside China\'s Instant Delivery Machine',
    tags: launchShare,
    dependencies: ['Last-mile system', 'Rider'],
  },
  {
    rank: 19,
    wave: 2,
    pillar: 'taste-life',
    dossier: 'Hosting and Hospitality',
    format: 'Deep Dives',
    title: 'The Weight Behind a Chinese Host\'s Smile',
    tags: launchShare,
    dependencies: ['Giving face'],
  },
  {
    rank: 20,
    wave: 2,
    pillar: 'digital-china',
    dossier: 'Internet Slang',
    format: 'Deep Dives',
    title: 'One Word, One Era — How Chinese Internet Slang Tracks the National Mood',
    tags: launchShareGlossary,
    dependencies: ['Neijuan', 'Tangping'],
  },
  {
    rank: 21,
    wave: 2,
    pillar: 'living-china',
    dossier: 'Night Markets and Night Economies',
    format: 'Deep Dives',
    title: 'The Three Lives of a Chinese Night Market',
    tags: launchShare,
    dependencies: ['Night economy'],
  },
  {
    rank: 22,
    wave: 2,
    pillar: 'aesthetic-china',
    dossier: 'Hanfu and Historical Dress',
    format: 'Deep Dives',
    title: 'Getting Dressed in 3,000 Years of History',
    tags: launchShareGlossary,
    dependencies: ['Hanfu', 'Mamianqun'],
  },
  {
    rank: 23,
    wave: 2,
    pillar: 'mind-china',
    dossier: 'Neijuan / Tangping / Bailan',
    format: 'Deep Dives',
    title: 'What \'Involution\' Loses in Translation',
    tags: launchShareGlossary,
    dependencies: ['Neijuan'],
  },
  {
    rank: 24,
    wave: 2,
    pillar: 'future-china',
    dossier: 'EV Life and Charging Culture',
    format: 'Deep Dives',
    title: 'The Parking Lot That Tells the Future',
    tags: launchShare,
    dependencies: ['New energy vehicle', 'Battery swap'],
  },
  {
    rank: 25,
    wave: 3,
    pillar: 'taste-life',
    dossier: 'Home Cooking and Family Taste Memory',
    format: 'Deep Dives',
    title: 'What Home Cooking Reveals That Restaurant China Cannot',
    tags: launchEvergreen,
    dependencies: ['Jiachangcai', 'Xiafan'],
  },
  {
    rank: 26,
    wave: 3,
    pillar: 'digital-china',
    dossier: 'Short Video and Attention Economy',
    format: 'Deep Dives',
    title: 'How Douyin Rewired the Way a Billion People Spend Their Evenings',
    tags: launchEvergreen,
    dependencies: ['Danmu'],
  },
  {
    rank: 27,
    wave: 3,
    pillar: 'living-china',
    dossier: 'Dating, Marriage, and Family Pressure',
    format: 'Deep Dives',
    title: 'What Marriage Pressure Reveals About Family, Security, and Adulthood in China',
    tags: launchEvergreen,
    dependencies: ['Bride price', 'Blind date'],
  },
  {
    rank: 28,
    wave: 3,
    pillar: 'aesthetic-china',
    dossier: 'Pop Mart and Designer Toy Worlds',
    format: 'Deep Dives',
    title: 'Why Pop Mart Became a Cultural World, Not Just a Retail Brand',
    tags: launchEvergreen,
    dependencies: ['Blind box', 'Secret edition'],
  },
  {
    rank: 29,
    wave: 3,
    pillar: 'mind-china',
    dossier: 'Face, Favor, and Indirectness',
    format: 'Deep Dives',
    title: 'What Face and Favor Actually Do in Chinese Social Life',
    tags: launchEvergreenGlossary,
    dependencies: ['Mianzi', 'Renqing'],
  },
  {
    rank: 30,
    wave: 3,
    pillar: 'future-china',
    dossier: 'High-Speed Rail and Infrastructure Modernity',
    format: 'Deep Dives',
    title: 'Why High-Speed Rail Became a Signature of Modern China',
    tags: launchEvergreen,
    dependencies: ['Infrastructure buildout', 'Modernity'],
  },
];

const launchMetadataByTitle = new Map(
  roadmapItems.map(item => [
    normalizeRoadmapTitleKey(item.title),
    {
      launchRank: item.rank,
      launchWave: item.wave,
      dependencies: item.dependencies,
    },
  ]),
);

const plannedTitleItems: PlannedTitleItem[] = loadTitleBankItems().map((item, order) => {
  const launchMetadata = launchMetadataByTitle.get(normalizeRoadmapTitleKey(item.title));

  return {
    ...item,
    format: item.format as RoadmapFormat,
    tags: item.tags as readonly RoadmapTag[],
    dependencies: launchMetadata?.dependencies ?? [],
    launchRank: launchMetadata?.launchRank,
    launchWave: launchMetadata?.launchWave,
    order,
  };
});

export function getRoadmapWaveGroups() {
  return roadmapWaveMeta.map(waveMeta => ({
    ...waveMeta,
    items: roadmapItems
      .filter(item => item.wave === waveMeta.wave)
      .sort((left, right) => left.rank - right.rank),
  }));
}

export function getPlannedItems(): PlannedTitleItem[] {
  return plannedTitleItems.slice();
}

export function getPlannedItemsForPillar(pillarSlug: string): PlannedTitleItem[] {
  return plannedTitleItems.filter(item => item.pillar === pillarSlug);
}

export function getPlannedDossierGroups(
  pillarSlug: string,
  predicate: (item: PlannedTitleItem) => boolean = () => true,
): RoadmapDossierGroup[] {
  const groups = new Map<string, PlannedTitleItem[]>();

  for (const item of getPlannedItemsForPillar(pillarSlug)) {
    if (!predicate(item)) {
      continue;
    }

    const existing = groups.get(item.dossier);
    if (existing) {
      existing.push(item);
      continue;
    }

    groups.set(item.dossier, [item]);
  }

  return Array.from(groups.entries()).map(([dossier, items]) => ({
    dossier,
    items,
  }));
}

export function getPlannedPillarSummary(pillarSlug: string): PlannedPillarSummary {
  const items = getPlannedItemsForPillar(pillarSlug);

  return {
    titleCount: items.length,
    dossierCount: new Set(items.map(item => item.dossier)).size,
    launchCount: items.filter(item => item.tags.includes('Launch first')).length,
    evergreenCount: items.filter(item => item.tags.includes('Evergreen')).length,
    shareabilityCount: items.filter(item => item.tags.includes('High shareability')).length,
    glossaryCount: items.filter(item => item.tags.includes('Needs glossary support')).length,
  };
}

export function getPlannedPillarSections() {
  return pillars
    .map(pillar => {
      const items = getPlannedItemsForPillar(pillar.slug);

      return {
        pillar,
        items,
        groups: getPlannedDossierGroups(pillar.slug),
        summary: getPlannedPillarSummary(pillar.slug),
      };
    })
    .filter(section => section.items.length > 0);
}

export function getRoadmapStats() {
  const titleCount = plannedTitleItems.length;
  const dossierCount = new Set(plannedTitleItems.map(item => `${item.pillar}:${item.dossier}`)).size;
  const tagCount = new Set(plannedTitleItems.flatMap(item => item.tags)).size;
  const launchCount = plannedTitleItems.filter(item => item.tags.includes('Launch first')).length;

  return {
    pillarCount: pillars.length,
    titleCount,
    waveCount: roadmapWaveMeta.length,
    dossierCount,
    tagCount,
    launchCount,
    launchSlateCount: roadmapItems.length,
  };
}
