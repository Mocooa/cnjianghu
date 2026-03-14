import assert from 'node:assert/strict';
import test from 'node:test';

import { formatEvidenceType, groupPublishedGlossaryEntries } from '../src/data/glossary-index.mjs';

test('groupPublishedGlossaryEntries separates true terms from concept notes', () => {
  const grouped = groupPublishedGlossaryEntries([
    {
      id: 'jianghu',
      data: {
        pinyin: 'jiang hu',
        kind: 'term',
      },
    },
    {
      id: 'city-tier',
      data: {
        pinyin: 'cheng shi ceng ji',
        kind: 'concept-note',
      },
    },
    {
      id: 'mianzi',
      data: {
        pinyin: 'mian zi',
        kind: 'term',
      },
    },
  ]);

  assert.deepEqual(grouped.terms.map((entry) => entry.id), ['jianghu', 'mianzi']);
  assert.deepEqual(grouped.conceptNotes.map((entry) => entry.id), ['city-tier']);
});

test('groupPublishedGlossaryEntries sorts each bucket by pinyin', () => {
  const grouped = groupPublishedGlossaryEntries([
    {
      id: 'renqing',
      data: {
        pinyin: 'ren qing',
        kind: 'term',
      },
    },
    {
      id: 'mianzi',
      data: {
        pinyin: 'mian zi',
        kind: 'term',
      },
    },
    {
      id: 'new-first-tier-city',
      data: {
        pinyin: 'xin yi xian',
        kind: 'concept-note',
      },
    },
    {
      id: 'city-tier',
      data: {
        pinyin: 'cheng shi ceng ji',
        kind: 'concept-note',
      },
    },
  ]);

  assert.deepEqual(grouped.terms.map((entry) => entry.id), ['mianzi', 'renqing']);
  assert.deepEqual(grouped.conceptNotes.map((entry) => entry.id), ['city-tier', 'new-first-tier-city']);
});

test('formatEvidenceType returns stable public labels', () => {
  assert.equal(formatEvidenceType('platform-led'), 'Platform-led');
  assert.equal(formatEvidenceType('data-led'), 'Data-led');
});
