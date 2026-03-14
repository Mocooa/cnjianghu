import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildReviewFormatGroups,
  groupDossierItemsByFormat,
} from '../src/data/roadmap-grouping.mjs';

test('groupDossierItemsByFormat returns format buckets in stable editorial order', () => {
  const groups = groupDossierItemsByFormat([
    { format: 'Glossary-led', title: 'Glossary 1' },
    { format: 'Quick Bites', title: 'Quick 1' },
    { format: 'Deep Dives', title: 'Deep 1' },
    { format: 'Quick Bites', title: 'Quick 2' },
  ]);

  assert.deepEqual(
    groups.map(group => group.format),
    ['Quick Bites', 'Deep Dives', 'Glossary-led'],
  );

  assert.deepEqual(
    groups[0].items.map(item => item.title),
    ['Quick 1', 'Quick 2'],
  );
});

test('groupDossierItemsByFormat omits empty format buckets', () => {
  const groups = groupDossierItemsByFormat([
    { format: 'Scene Decoder', title: 'Scene 1' },
  ]);

  assert.equal(groups.length, 1);
  assert.equal(groups[0].format, 'Scene Decoder');
});

test('buildReviewFormatGroups adds compact preview metadata for dense dossier review', () => {
  const groups = buildReviewFormatGroups([
    { format: 'Quick Bites', title: 'Quick 1' },
    { format: 'Quick Bites', title: 'Quick 2' },
    { format: 'Quick Bites', title: 'Quick 3' },
    { format: 'Deep Dives', title: 'Deep 1' },
  ]);

  assert.deepEqual(groups[0], {
    format: 'Quick Bites',
    items: [
      { format: 'Quick Bites', title: 'Quick 1' },
      { format: 'Quick Bites', title: 'Quick 2' },
      { format: 'Quick Bites', title: 'Quick 3' },
    ],
    previewItems: [
      { format: 'Quick Bites', title: 'Quick 1' },
      { format: 'Quick Bites', title: 'Quick 2' },
    ],
    hiddenCount: 1,
    defaultOpen: false,
  });

  assert.deepEqual(groups[1], {
    format: 'Deep Dives',
    items: [
      { format: 'Deep Dives', title: 'Deep 1' },
    ],
    previewItems: [
      { format: 'Deep Dives', title: 'Deep 1' },
    ],
    hiddenCount: 0,
    defaultOpen: true,
  });
});
