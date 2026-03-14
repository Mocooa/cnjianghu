import test from 'node:test';
import assert from 'node:assert/strict';

import { pillars } from './review-data.mjs';
import { buildReviewPageHtml } from './page-template.mjs';

test('buildReviewPageHtml renders a standalone audit page with bilingual review controls', () => {
  const html = buildReviewPageHtml(pillars);

  assert.match(html, /<!DOCTYPE html>/);
  assert.match(html, /Pillar Dossier Review/);
  assert.match(html, /保留/);
  assert.match(html, /删除/);
  assert.match(html, /备注/);
  assert.match(html, /建议/);
  assert.match(html, /Digital China/);
  assert.match(html, /数字中国/);
  assert.match(html, /localStorage/);
});
