import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildGlossaryDependencyLookup,
  buildGlossarySupportSections,
  groupGlossaryDependencies,
  resolveGlossaryDependency,
} from '../src/data/glossary-dependency-links.mjs';

test('buildGlossaryDependencyLookup indexes glossary entries by title, slug, and chinese label', () => {
  const lookup = buildGlossaryDependencyLookup([
    {
      id: 'danmu',
      data: {
        title: 'Danmu',
        chinese: '弹幕',
        kind: 'term',
      },
    },
    {
      id: 'city-tier',
      data: {
        title: 'City Tier',
        chinese: '城市层级',
        kind: 'concept-note',
      },
    },
  ]);

  assert.deepEqual(lookup.get('danmu'), {
    slug: 'danmu',
    title: 'Danmu',
    chinese: '弹幕',
    kind: 'term',
  });

  assert.deepEqual(lookup.get('city-tier'), {
    slug: 'city-tier',
    title: 'City Tier',
    chinese: '城市层级',
    kind: 'concept-note',
  });

  assert.deepEqual(lookup.get('弹幕'), {
    slug: 'danmu',
    title: 'Danmu',
    chinese: '弹幕',
    kind: 'term',
  });
});

test('resolveGlossaryDependency returns linked metadata for published glossary dependencies', () => {
  const lookup = buildGlossaryDependencyLookup([
    {
      id: 'mianzi',
      data: {
        title: 'Mianzi',
        chinese: '面子',
        kind: 'term',
      },
    },
  ]);

  assert.deepEqual(resolveGlossaryDependency('Mianzi', lookup), {
    label: 'Mianzi',
    isLinked: true,
    href: '/glossary/mianzi',
    title: 'Mianzi',
    chinese: '面子',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Mini Program', lookup), {
    label: 'Mini Program',
    isLinked: false,
    href: null,
    title: null,
    chinese: null,
    kind: null,
  });
});

test('groupGlossaryDependencies separates live terms, concept notes, and planned support', () => {
  const lookup = buildGlossaryDependencyLookup([
    {
      id: 'danmu',
      data: {
        title: 'Danmu',
        chinese: '弹幕',
        kind: 'term',
      },
    },
    {
      id: 'city-tier',
      data: {
        title: 'City Tier',
        chinese: '城市层级',
        kind: 'concept-note',
      },
    },
  ]);

  assert.deepEqual(
    groupGlossaryDependencies(['Danmu', 'City Tier', 'Mini Program'], lookup),
    {
      liveTerms: [
        {
          label: 'Danmu',
          isLinked: true,
          href: '/glossary/danmu',
          title: 'Danmu',
          chinese: '弹幕',
          kind: 'term',
        },
      ],
      liveConceptNotes: [
        {
          label: 'City Tier',
          isLinked: true,
          href: '/glossary/city-tier',
          title: 'City Tier',
          chinese: '城市层级',
          kind: 'concept-note',
        },
      ],
      planned: [
        {
          label: 'Mini Program',
          isLinked: false,
          href: null,
          title: null,
          chinese: null,
          kind: null,
        },
      ],
    },
  );
});

test('buildGlossarySupportSections returns ordered non-empty sections for support UI', () => {
  const lookup = buildGlossaryDependencyLookup([
    {
      id: 'danmu',
      data: {
        title: 'Danmu',
        chinese: '弹幕',
        kind: 'term',
      },
    },
    {
      id: 'city-tier',
      data: {
        title: 'City Tier',
        chinese: '城市层级',
        kind: 'concept-note',
      },
    },
  ]);

  assert.deepEqual(
    buildGlossarySupportSections(['Danmu', 'City Tier', 'Mini Program'], lookup),
    [
      {
        key: 'liveTerms',
        label: 'Live terms',
        items: [
          {
            label: 'Danmu',
            isLinked: true,
            href: '/glossary/danmu',
            title: 'Danmu',
            chinese: '弹幕',
            kind: 'term',
          },
        ],
      },
      {
        key: 'liveConceptNotes',
        label: 'Live concept notes',
        items: [
          {
            label: 'City Tier',
            isLinked: true,
            href: '/glossary/city-tier',
            title: 'City Tier',
            chinese: '城市层级',
            kind: 'concept-note',
          },
        ],
      },
      {
        key: 'planned',
        label: 'Planned support',
        items: [
          {
            label: 'Mini Program',
            isLinked: false,
            href: null,
            title: null,
            chinese: null,
            kind: null,
          },
        ],
      },
    ],
  );
});
