import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* ─── Shared schemas ─── */

const pillarEnum = z.enum([
  'digital-china',
  'taste-life',
  'aesthetic-china',
  'mind-china',
  'living-china',
  'future-china',
]);

const sourceSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  platform: z.string().optional(),
});

/* ─── Deep Dives ─── */

const deepDives = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './content/published/deep-dives' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    pillar: pillarEnum,
    tags: z.array(z.string()),
    date: z.coerce.date(),
    author: z.string().default('cnjianghu'),
    sources: z.array(sourceSchema).optional(),
    cover_image: z.string().optional(),
    summary: z.string(),
    reading_time: z.number().optional(),
    related: z.array(z.string()).optional(),
    series: z.object({
      name: z.string(),
      slug: z.string(),
      part: z.number(),
      total: z.number(),
    }).optional(),
    draft: z.boolean().default(false),
  }),
});

/* ─── Quick Bites ─── */

const quickBites = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './content/published/quick-bites' }),
  schema: z.object({
    title: z.string(),
    type: z.enum(['word-of-the-day', 'visual-china', 'trending', 'did-you-know']),
    pillar: pillarEnum,
    tags: z.array(z.string()),
    date: z.coerce.date(),
    chinese_term: z.string().optional(),
    pinyin: z.string().optional(),
    cover_image: z.string().optional(),
    summary: z.string(),
    reading_time: z.number().default(2),
    draft: z.boolean().default(false),
  }),
});

/* ─── Glossary ─── */

const glossary = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './content/published/glossary' }),
  schema: z.object({
    title: z.string(),
    kind: z.enum(['term', 'concept-note']),
    pillar: pillarEnum,
    dossier: z.string(),
    evidence_type: z.enum(['language-led', 'worldview-led', 'platform-led', 'data-led']),
    category: z.enum([
      'philosophy', 'social', 'food', 'internet',
      'arts', 'daily-life', 'business', 'history',
    ]),
    chinese: z.string(),
    pinyin: z.string(),
    literal: z.string(),
    short_definition: z.string(),
    tags: z.array(z.string()).optional(),
    related_terms: z.array(z.string()).optional(),
    sources: z.array(sourceSchema).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  'deep-dives': deepDives,
  'quick-bites': quickBites,
  glossary,
};
