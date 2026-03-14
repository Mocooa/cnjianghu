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

test('eleventh glossary batch exists as live slugs for body logic and urban-hierarchy terms', () => {
  const slugs = new Set(
    fs
      .readdirSync(glossaryDir)
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx$/, '')),
  );

  for (const slug of [
    'yin-and-yang',
    'qi',
    'body-constitution',
    'new-first-tier-city',
    'internal-heat',
  ]) {
    assert.equal(slugs.has(slug), true, `${slug} should exist as a live glossary route`);
  }
});

test('eleventh glossary batch resolves body logic and urban-hierarchy labels into links', () => {
  const lookup = buildGlossaryDependencyLookup(loadGlossaryEntries());

  assert.deepEqual(resolveGlossaryDependency('Yin and Yang', lookup), {
    label: 'Yin and Yang',
    isLinked: true,
    href: '/glossary/yin-and-yang',
    title: 'Yin and Yang',
    chinese: '阴阳',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Qi', lookup), {
    label: 'Qi',
    isLinked: true,
    href: '/glossary/qi',
    title: 'Qi',
    chinese: '气',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Body Constitution', lookup), {
    label: 'Body Constitution',
    isLinked: true,
    href: '/glossary/body-constitution',
    title: 'Body Constitution',
    chinese: '体质',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('New First-Tier City', lookup), {
    label: 'New First-Tier City',
    isLinked: true,
    href: '/glossary/new-first-tier-city',
    title: 'New First-Tier City',
    chinese: '新一线城市',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Internal Heat', lookup), {
    label: 'Internal Heat',
    isLinked: true,
    href: '/glossary/internal-heat',
    title: 'Internal Heat',
    chinese: '内热',
    kind: 'concept-note',
  });
});

test('eleventh glossary batch turns body logic and urban-hierarchy terms into inline links', () => {
  const lookup = buildGlossaryDependencyLookup(loadGlossaryEntries());

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('Why `Yin and Yang` Still Matters as Daily Reasoning in China', lookup),
    [
      { type: 'text', value: 'Why ' },
      {
        type: 'link',
        value: 'Yin and Yang',
        href: '/glossary/yin-and-yang',
        kind: 'term',
      },
      { type: 'text', value: ' Still Matters as Daily Reasoning in China' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('What `Qi` Still Means in Modern Chinese Body Talk', lookup),
    [
      { type: 'text', value: 'What ' },
      {
        type: 'link',
        value: 'Qi',
        href: '/glossary/qi',
        kind: 'term',
      },
      { type: 'text', value: ' Still Means in Modern Chinese Body Talk' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('What `New First-Tier City` Actually Means in China', lookup),
    [
      { type: 'text', value: 'What ' },
      {
        type: 'link',
        value: 'New First-Tier City',
        href: '/glossary/new-first-tier-city',
        kind: 'term',
      },
      { type: 'text', value: ' Actually Means in China' },
    ],
  );
});
