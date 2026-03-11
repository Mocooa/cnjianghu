export interface Pillar {
  slug: string;
  name: string;
  chinese: string;
  description: string;
  color: string;
  icon: string;
}

export const pillars: Pillar[] = [
  {
    slug: 'digital-china',
    name: 'Digital China',
    chinese: '数字中国',
    description: 'Decode the world\'s most vibrant internet culture',
    color: 'azure',
    icon: '🌐',
  },
  {
    slug: 'taste-life',
    name: 'Taste & Life',
    chinese: '饮食生活',
    description: 'Food, tea, and the rituals of everyday life',
    color: 'jade',
    icon: '🍜',
  },
  {
    slug: 'aesthetic-china',
    name: 'Aesthetic China',
    chinese: '审美创造',
    description: 'Art, design, fashion, and the logic of Chinese beauty',
    color: 'gold',
    icon: '🎨',
  },
  {
    slug: 'mind-china',
    name: 'Mind China',
    chinese: '思维智慧',
    description: 'Philosophy, wisdom, and the Chinese way of thinking',
    color: 'indigo',
    icon: '🧠',
  },
  {
    slug: 'living-china',
    name: 'Living China',
    chinese: '真实中国',
    description: 'Cities, youth culture, and contemporary life',
    color: 'sienna',
    icon: '🏙',
  },
  {
    slug: 'future-china',
    name: 'Future China',
    chinese: '科技未来',
    description: 'Technology, innovation, and what\'s next',
    color: 'teal',
    icon: '🚀',
  },
];

export function getPillar(slug: string): Pillar | undefined {
  return pillars.find(p => p.slug === slug);
}

export function getPillarColor(slug: string): string {
  return getPillar(slug)?.color ?? 'ink';
}
