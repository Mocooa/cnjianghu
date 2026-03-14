import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

import { buildGlossaryDependencyLookup, resolveGlossaryDependency } from '../src/data/glossary-dependency-links.mjs';
import { tokenizeGlossaryLinkedTitle } from '../src/data/glossary-inline-links.mjs';

const glossaryDir = path.join(process.cwd(), 'content/published/glossary');

function parseFrontmatter(filePath) {
  const source = fs.readFileSync(filePath, 'utf8');
  const match = source.match(/^---\n([\s\S]*?)\n---/);

  if (!match) {
    throw new Error(`Missing frontmatter in ${filePath}`);
  }

  const frontmatter = match[1];

  const getField = (fieldName) => {
    const fieldMatch = frontmatter.match(new RegExp(`^${fieldName}:\\s*(.+)$`, 'm'));
    return fieldMatch ? fieldMatch[1].trim().replace(/^"|"$/g, '') : null;
  };

  return {
    title: getField('title'),
    kind: getField('kind'),
    chinese: getField('chinese'),
  };
}

function loadGlossaryEntries() {
  return fs
    .readdirSync(glossaryDir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const filePath = path.join(glossaryDir, file);
      const metadata = parseFrontmatter(filePath);

      return {
        id: file.replace(/\.mdx$/, ''),
        data: metadata,
      };
    });
}

test('seventeenth glossary batch exists as live slugs for future-china strategy terms', () => {
  const slugs = new Set(
    fs
      .readdirSync(glossaryDir)
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx$/, '')),
  );

  for (const slug of [
    'going-global',
    'domestic-replacement',
    'industrial-upgrading',
    'made-in-china',
    'overseas-warehouse',
  ]) {
    assert.equal(slugs.has(slug), true, `${slug} should exist as a live glossary route`);
  }
});

test('seventeenth glossary batch resolves future-china strategy labels into links', () => {
  const lookup = buildGlossaryDependencyLookup(loadGlossaryEntries());

  assert.deepEqual(resolveGlossaryDependency('Going Global', lookup), {
    label: 'Going Global',
    isLinked: true,
    href: '/glossary/going-global',
    title: 'Going Global',
    chinese: '出海',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Domestic Replacement', lookup), {
    label: 'Domestic Replacement',
    isLinked: true,
    href: '/glossary/domestic-replacement',
    title: 'Domestic Replacement',
    chinese: '国产替代',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Industrial Upgrading', lookup), {
    label: 'Industrial Upgrading',
    isLinked: true,
    href: '/glossary/industrial-upgrading',
    title: 'Industrial Upgrading',
    chinese: '产业升级',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Made in China', lookup), {
    label: 'Made in China',
    isLinked: true,
    href: '/glossary/made-in-china',
    title: 'Made in China',
    chinese: '中国制造',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Overseas Warehouse', lookup), {
    label: 'Overseas Warehouse',
    isLinked: true,
    href: '/glossary/overseas-warehouse',
    title: 'Overseas Warehouse',
    chinese: '海外仓',
    kind: 'term',
  });
});

test('seventeenth glossary batch turns future-china strategy terms into inline links', () => {
  const lookup = buildGlossaryDependencyLookup(loadGlossaryEntries());

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('What `Going Global` Means in Chinese Tech Strategy', lookup),
    [
      { type: 'text', value: 'What ' },
      {
        type: 'link',
        value: 'Going Global',
        href: '/glossary/going-global',
        kind: 'term',
      },
      { type: 'text', value: ' Means in Chinese Tech Strategy' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('Why `Domestic Replacement` Still Matters Even When Chinese Brands Go Abroad', lookup),
    [
      { type: 'text', value: 'Why ' },
      {
        type: 'link',
        value: 'Domestic Replacement',
        href: '/glossary/domestic-replacement',
        kind: 'term',
      },
      { type: 'text', value: ' Still Matters Even When Chinese Brands Go Abroad' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('What `Industrial Upgrading` Actually Signals in China', lookup),
    [
      { type: 'text', value: 'What ' },
      {
        type: 'link',
        value: 'Industrial Upgrading',
        href: '/glossary/industrial-upgrading',
        kind: 'term',
      },
      { type: 'text', value: ' Actually Signals in China' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('Why `Made in China` Feels Different in 2026 Than It Did a Decade Ago', lookup),
    [
      { type: 'text', value: 'Why ' },
      {
        type: 'link',
        value: 'Made in China',
        href: '/glossary/made-in-china',
        kind: 'term',
      },
      { type: 'text', value: ' Feels Different in 2026 Than It Did a Decade Ago' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('Why an `Overseas Warehouse` Matters to the Experience of Buying from China', lookup),
    [
      { type: 'text', value: 'Why an ' },
      {
        type: 'link',
        value: 'Overseas Warehouse',
        href: '/glossary/overseas-warehouse',
        kind: 'term',
      },
      { type: 'text', value: ' Matters to the Experience of Buying from China' },
    ],
  );
});
