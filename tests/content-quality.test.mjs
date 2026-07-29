import test from 'node:test';
import assert from 'node:assert/strict';

import {
  auditContentFile,
  countSourceRecords,
  extractFrontmatter,
  getFrontmatterScalar,
} from '../src/data/content-quality.mjs';

const sourceRecord = (title = 'Source') => `  - title: "${title}"
    url: "https://example.com"
    platform: Example`;

test('frontmatter helpers extract scalars and source records', () => {
  const source = `---
title: "Example"
type: trending
sources:
${sourceRecord('One')}
${sourceRecord('Two')}
---

Body`;

  const frontmatter = extractFrontmatter(source);
  assert.equal(getFrontmatterScalar(frontmatter, 'type'), 'trending');
  assert.equal(countSourceRecords(frontmatter), 2);
});

test('relaunch trending quick bites require two sources and a review date', () => {
  const source = `---
title: "Example"
type: trending
date: 2026-07-29
sources:
${sourceRecord()}
---

Body`;

  const result = auditContentFile(
    'content/published/quick-bites/trending/example.mdx',
    source,
    { today: '2026-07-29' },
  );

  assert.equal(result.errors.length, 2);
  assert.match(result.errors[0], /at least 2 source/);
  assert.match(result.errors[1], /last_reviewed/);
});

test('deep dives require an author and at least three sources', () => {
  const source = `---
title: "Example"
date: 2026-07-29
sources:
${sourceRecord()}
---

Body`;

  const result = auditContentFile(
    'content/published/deep-dives/example.mdx',
    source,
    { today: '2026-07-29' },
  );

  assert.equal(result.errors.length, 2);
  assert.match(result.errors[0], /at least 3 source/);
  assert.match(result.errors[1], /explicit author/);
});

test('data-led glossary entries require sources', () => {
  const source = `---
title: "Example"
evidence_type: data-led
---

Body`;

  const result = auditContentFile(
    'content/published/glossary/example.mdx',
    source,
  );

  assert.deepEqual(result.errors, [
    'content/published/glossary/example.mdx: data-led glossary entries require sources',
  ]);
});
