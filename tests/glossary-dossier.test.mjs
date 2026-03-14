import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildGlossaryDossierLookup,
  getGlossaryEntryPointSummary,
  splitPublishedGlossaryEntriesByKind,
} from '../src/data/glossary-dossier.mjs';

test('buildGlossaryDossierLookup groups published glossary entries by dossier and sorts them by pinyin', () => {
  const lookup = buildGlossaryDossierLookup({
    pillarSlug: 'digital-china',
    publishedEntries: [
      {
        id: 'pofang',
        data: {
          pillar: 'digital-china',
          dossier: 'Internet Slang',
          pinyin: 'pò fáng',
          title: 'Pofang',
          chinese: '破防',
          kind: 'term',
        },
      },
      {
        id: 'zhenghuo',
        data: {
          pillar: 'digital-china',
          dossier: 'Internet Slang',
          pinyin: 'zhěng huó',
          title: 'Zhenghuo',
          chinese: '整活',
          kind: 'term',
        },
      },
      {
        id: 'city-tier',
        data: {
          pillar: 'living-china',
          dossier: 'Tier-System Lives',
          pinyin: 'chéng shì céng jí',
          title: 'City Tier',
          chinese: '城市层级',
          kind: 'concept-note',
        },
      },
    ],
    plannedItems: [],
    publishedSlugs: new Set(['pofang', 'zhenghuo', 'city-tier']),
  });

  assert.deepEqual(lookup['Internet Slang'].publishedEntries, [
    {
      slug: 'pofang',
      title: 'Pofang',
      chinese: '破防',
      pinyin: 'pò fáng',
      kind: 'term',
    },
    {
      slug: 'zhenghuo',
      title: 'Zhenghuo',
      chinese: '整活',
      pinyin: 'zhěng huó',
      kind: 'term',
    },
  ]);
});

test('buildGlossaryDossierLookup groups planned concepts by dossier, deduplicates terms, and skips published slugs', () => {
  const lookup = buildGlossaryDossierLookup({
    pillarSlug: 'digital-china',
    publishedEntries: [],
    plannedItems: [
      {
        pillar: 'digital-china',
        dossier: 'Meme Universes',
        format: 'Glossary-led',
        title: 'How to read `Zhenghuo` and `Lezi Ren` in Chinese internet humor',
        tags: ['Launch first', 'Evergreen'],
      },
      {
        pillar: 'digital-china',
        dossier: 'Meme Universes',
        format: 'Glossary-led',
        title: 'Why `Lezi Ren` keeps showing up in meme conversations',
        tags: ['Evergreen'],
      },
      {
        pillar: 'digital-china',
        dossier: 'Internet Slang',
        format: 'Glossary-led',
        title: 'Why `Pofang` does not quite mean being triggered',
        tags: ['Launch first'],
      },
      {
        pillar: 'digital-china',
        dossier: 'Meme Universes',
        format: 'Quick Bites',
        title: 'Why Chinese chats use so many stickers and meme images',
        tags: ['Launch first'],
      },
      {
        pillar: 'taste-life',
        dossier: 'Tea Worlds',
        format: 'Glossary-led',
        title: 'How to read `Hui Gan` in tea culture',
        tags: ['Evergreen'],
      },
    ],
    publishedSlugs: new Set(['zhenghuo']),
  });

  assert.deepEqual(lookup['Meme Universes'].plannedConcepts, [
    {
      term: 'Lezi Ren',
      slug: 'lezi-ren',
      launchFirst: true,
      evergreen: true,
      titleCount: 2,
    },
  ]);

  assert.deepEqual(lookup['Internet Slang'].plannedConcepts, [
    {
      term: 'Pofang',
      slug: 'pofang',
      launchFirst: true,
      evergreen: false,
      titleCount: 1,
    },
  ]);
});

test('splitPublishedGlossaryEntriesByKind separates terms from concept notes', () => {
  const grouped = splitPublishedGlossaryEntriesByKind([
    {
      slug: 'city-tier',
      title: 'City Tier',
      chinese: '城市层级',
      pinyin: 'chéng shì céng jí',
      kind: 'concept-note',
    },
    {
      slug: 'guangchangwu',
      title: 'Guangchangwu',
      chinese: '广场舞',
      pinyin: 'guǎng chǎng wǔ',
      kind: 'term',
    },
  ]);

  assert.deepEqual(grouped.terms, [
    {
      slug: 'guangchangwu',
      title: 'Guangchangwu',
      chinese: '广场舞',
      pinyin: 'guǎng chǎng wǔ',
      kind: 'term',
    },
  ]);

  assert.deepEqual(grouped.conceptNotes, [
    {
      slug: 'city-tier',
      title: 'City Tier',
      chinese: '城市层级',
      pinyin: 'chéng shì céng jí',
      kind: 'concept-note',
    },
  ]);
});

test('getGlossaryEntryPointSummary marks dossier glossary as primary when live entries exist', () => {
  const summary = getGlossaryEntryPointSummary({
    publishedEntries: [
      {
        slug: 'danmu',
        title: 'Danmu',
        chinese: '弹幕',
        pinyin: 'dàn mù',
        kind: 'term',
      },
      {
        slug: 'city-tier',
        title: 'City Tier',
        chinese: '城市层级',
        pinyin: 'chéng shì céng jí',
        kind: 'concept-note',
      },
    ],
    plannedConcepts: [
      {
        term: 'Lezi Ren',
        slug: 'lezi-ren',
        launchFirst: true,
        evergreen: true,
        titleCount: 2,
      },
    ],
  });

  assert.deepEqual(summary, {
    shouldLead: true,
    liveCount: 2,
    termCount: 1,
    conceptNoteCount: 1,
    plannedCount: 1,
  });
});

test('getGlossaryEntryPointSummary stays secondary when only planned concepts exist', () => {
  const summary = getGlossaryEntryPointSummary({
    publishedEntries: [],
    plannedConcepts: [
      {
        term: 'Lezi Ren',
        slug: 'lezi-ren',
        launchFirst: true,
        evergreen: true,
        titleCount: 2,
      },
    ],
  });

  assert.deepEqual(summary, {
    shouldLead: false,
    liveCount: 0,
    termCount: 0,
    conceptNoteCount: 0,
    plannedCount: 1,
  });
});
