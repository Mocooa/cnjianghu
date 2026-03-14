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

test('fifth glossary batch exists as live slugs for the next bridge concepts', () => {
  const slugs = new Set(
    fs
      .readdirSync(glossaryDir)
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx$/, '')),
  );

  for (const slug of [
    'late-night-snack',
    'high-speed-rail',
    'shared-bike',
    'emotional-value',
    'modernity',
  ]) {
    assert.equal(slugs.has(slug), true, `${slug} should exist as a live glossary route`);
  }
});

test('fifth glossary batch resolves bridge labels into linked glossary entries', () => {
  const lookup = buildGlossaryDependencyLookup(loadGlossaryEntries());

  assert.deepEqual(resolveGlossaryDependency('Late-Night Snack', lookup), {
    label: 'Late-Night Snack',
    isLinked: true,
    href: '/glossary/late-night-snack',
    title: 'Late-Night Snack',
    chinese: '夜宵',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('High-Speed Rail', lookup), {
    label: 'High-Speed Rail',
    isLinked: true,
    href: '/glossary/high-speed-rail',
    title: 'High-Speed Rail',
    chinese: '高铁',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Shared Bike', lookup), {
    label: 'Shared Bike',
    isLinked: true,
    href: '/glossary/shared-bike',
    title: 'Shared Bike',
    chinese: '共享单车',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Emotional Value', lookup), {
    label: 'Emotional Value',
    isLinked: true,
    href: '/glossary/emotional-value',
    title: 'Emotional Value',
    chinese: '情绪价值',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Modernity', lookup), {
    label: 'Modernity',
    isLinked: true,
    href: '/glossary/modernity',
    title: 'Modernity',
    chinese: '现代性',
    kind: 'concept-note',
  });
});

test('fifth glossary batch turns new bridge backticked terms into inline links', () => {
  const lookup = buildGlossaryDependencyLookup(loadGlossaryEntries());

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('What `High-Speed Rail` Means in Chinese Daily Imagination', lookup),
    [
      { type: 'text', value: 'What ' },
      {
        type: 'link',
        value: 'High-Speed Rail',
        href: '/glossary/high-speed-rail',
        kind: 'term',
      },
      { type: 'text', value: ' Means in Chinese Daily Imagination' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('What `Emotional Value` Means in Chinese Consumer Culture', lookup),
    [
      { type: 'text', value: 'What ' },
      {
        type: 'link',
        value: 'Emotional Value',
        href: '/glossary/emotional-value',
        kind: 'term',
      },
      { type: 'text', value: ' Means in Chinese Consumer Culture' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('Why `Modernity` Often Looks Concrete, Rideable, and Measurable in China', lookup),
    [
      { type: 'text', value: 'Why ' },
      {
        type: 'link',
        value: 'Modernity',
        href: '/glossary/modernity',
        kind: 'concept-note',
      },
      { type: 'text', value: ' Often Looks Concrete, Rideable, and Measurable in China' },
    ],
  );
});
