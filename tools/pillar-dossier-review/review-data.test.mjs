import test from 'node:test';
import assert from 'node:assert/strict';

import {
  pillars,
  createInitialReviews,
  summarizeReviews,
  buildMarkdownExport,
} from './review-data.mjs';

test('createInitialReviews creates an unreviewed entry for every dossier', () => {
  const reviews = createInitialReviews(pillars);
  const totalDossiers = pillars.reduce((sum, pillar) => sum + pillar.dossiers.length, 0);

  assert.equal(Object.keys(reviews).length, totalDossiers);
  assert.deepEqual(reviews['digital-china:super-app-life'], {
    decision: '',
    note: '',
    suggestion: '',
  });
});

test('summarizeReviews counts keep, delete, and pending dossiers', () => {
  const reviews = createInitialReviews(pillars);
  reviews['digital-china:super-app-life'].decision = 'keep';
  reviews['digital-china:platform-ecologies'].decision = 'delete';
  reviews['taste-life:tea-worlds'].decision = 'keep';

  assert.deepEqual(summarizeReviews(pillars, reviews), {
    total: pillars.reduce((sum, pillar) => sum + pillar.dossiers.length, 0),
    keep: 2,
    delete: 1,
    pending: pillars.reduce((sum, pillar) => sum + pillar.dossiers.length, 0) - 3,
  });
});

test('buildMarkdownExport groups reviewed dossiers by pillar and includes note fields', () => {
  const reviews = createInitialReviews(pillars);
  reviews['digital-china:super-app-life'] = {
    decision: 'keep',
    note: 'Useful entry point for app behavior.',
    suggestion: 'Later merge with mini-program life if it feels redundant.',
  };
  reviews['taste-life:tea-worlds'] = {
    decision: 'delete',
    note: '',
    suggestion: 'May fit under a narrower ritual dossier later.',
  };

  const markdown = buildMarkdownExport(pillars, reviews);

  assert.match(markdown, /# Pillar Dossier Review/);
  assert.match(markdown, /## Digital China \| 数字中国/);
  assert.match(markdown, /- Super-App Life \| 超级应用生活 — keep/);
  assert.match(markdown, /Note: Useful entry point for app behavior\./);
  assert.match(markdown, /Suggestion: Later merge with mini-program life if it feels redundant\./);
  assert.match(markdown, /## Taste & Life \| 饮食与生活/);
  assert.match(markdown, /- Tea Worlds \| 茶世界 — delete/);
});
