import assert from 'node:assert/strict';
import test from 'node:test';

import { buildStaticSitemapPaths } from '../src/data/sitemap.mjs';

test('buildStaticSitemapPaths includes editorial standards and every series page', () => {
  const paths = buildStaticSitemapPaths({
    pillarSlugs: ['living-china'],
    seriesSlugs: ['pressure-cooker', 'digital-china-series'],
  });

  assert.ok(paths.includes('/editorial-standards'));
  assert.ok(paths.includes('/series/pressure-cooker'));
  assert.ok(paths.includes('/series/digital-china-series'));
});

test('buildStaticSitemapPaths returns unique paths', () => {
  const paths = buildStaticSitemapPaths({
    pillarSlugs: ['living-china'],
    seriesSlugs: ['pressure-cooker'],
  });

  assert.equal(new Set(paths).size, paths.length);
});
