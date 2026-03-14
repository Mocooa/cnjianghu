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

test('ninth glossary batch exists as live slugs for hospitality and timing terms', () => {
  const slugs = new Set(
    fs
      .readdirSync(glossaryDir)
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx$/, '')),
  );

  for (const slug of [
    'gongfu-tea',
    'reunion-dinner',
    'keqi',
    'yuanfen',
    'auspicious-day',
  ]) {
    assert.equal(slugs.has(slug), true, `${slug} should exist as a live glossary route`);
  }
});

test('ninth glossary batch resolves hospitality and timing labels into links', () => {
  const lookup = buildGlossaryDependencyLookup(loadGlossaryEntries());

  assert.deepEqual(resolveGlossaryDependency('Gongfu Tea', lookup), {
    label: 'Gongfu Tea',
    isLinked: true,
    href: '/glossary/gongfu-tea',
    title: 'Gongfu Tea',
    chinese: '工夫茶',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Reunion Dinner', lookup), {
    label: 'Reunion Dinner',
    isLinked: true,
    href: '/glossary/reunion-dinner',
    title: 'Reunion Dinner',
    chinese: '年夜饭',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Keqi', lookup), {
    label: 'Keqi',
    isLinked: true,
    href: '/glossary/keqi',
    title: 'Keqi',
    chinese: '客气',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Yuanfen', lookup), {
    label: 'Yuanfen',
    isLinked: true,
    href: '/glossary/yuanfen',
    title: 'Yuanfen',
    chinese: '缘分',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Auspicious Day', lookup), {
    label: 'Auspicious Day',
    isLinked: true,
    href: '/glossary/auspicious-day',
    title: 'Auspicious Day',
    chinese: '黄道吉日',
    kind: 'term',
  });
});

test('ninth glossary batch turns hospitality and timing terms into inline links', () => {
  const lookup = buildGlossaryDependencyLookup(loadGlossaryEntries());

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('What `Gongfu Tea` Actually Means', lookup),
    [
      { type: 'text', value: 'What ' },
      {
        type: 'link',
        value: 'Gongfu Tea',
        href: '/glossary/gongfu-tea',
        kind: 'term',
      },
      { type: 'text', value: ' Actually Means' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('What `Keqi` Really Means in Chinese Hospitality', lookup),
    [
      { type: 'text', value: 'What ' },
      {
        type: 'link',
        value: 'Keqi',
        href: '/glossary/keqi',
        kind: 'term',
      },
      { type: 'text', value: ' Really Means in Chinese Hospitality' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('What `Yuanfen` Actually Means in Chinese Life', lookup),
    [
      { type: 'text', value: 'What ' },
      {
        type: 'link',
        value: 'Yuanfen',
        href: '/glossary/yuanfen',
        kind: 'term',
      },
      { type: 'text', value: ' Actually Means in Chinese Life' },
    ],
  );
});
