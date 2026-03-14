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

test('seventh glossary batch exists as live slugs for aesthetic bridge entries', () => {
  const slugs = new Set(
    fs
      .readdirSync(glossaryDir)
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx$/, '')),
  );

  for (const slug of [
    'journey-to-the-west',
    'sun-wukong',
    'borrowed-scenery',
    'threshold',
    'auspicious-red',
  ]) {
    assert.equal(slugs.has(slug), true, `${slug} should exist as a live glossary route`);
  }
});

test('seventh glossary batch resolves aesthetic bridge labels into links', () => {
  const lookup = buildGlossaryDependencyLookup(loadGlossaryEntries());

  assert.deepEqual(resolveGlossaryDependency('Journey to the West', lookup), {
    label: 'Journey to the West',
    isLinked: true,
    href: '/glossary/journey-to-the-west',
    title: 'Journey to the West',
    chinese: '西游记',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Sun Wukong', lookup), {
    label: 'Sun Wukong',
    isLinked: true,
    href: '/glossary/sun-wukong',
    title: 'Sun Wukong',
    chinese: '孙悟空',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Borrowed Scenery', lookup), {
    label: 'Borrowed Scenery',
    isLinked: true,
    href: '/glossary/borrowed-scenery',
    title: 'Borrowed Scenery',
    chinese: '借景',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Threshold', lookup), {
    label: 'Threshold',
    isLinked: true,
    href: '/glossary/threshold',
    title: 'Threshold',
    chinese: '门槛',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Auspicious Red', lookup), {
    label: 'Auspicious Red',
    isLinked: true,
    href: '/glossary/auspicious-red',
    title: 'Auspicious Red',
    chinese: '喜庆红',
    kind: 'concept-note',
  });
});

test('seventh glossary batch turns aesthetic bridge terms into inline links', () => {
  const lookup = buildGlossaryDependencyLookup(loadGlossaryEntries());

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('What `Journey to the West` Still Means in Modern China', lookup),
    [
      { type: 'text', value: 'What ' },
      {
        type: 'link',
        value: 'Journey to the West',
        href: '/glossary/journey-to-the-west',
        kind: 'term',
      },
      { type: 'text', value: ' Still Means in Modern China' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('What `Borrowed Scenery` Actually Means in Chinese Design', lookup),
    [
      { type: 'text', value: 'What ' },
      {
        type: 'link',
        value: 'Borrowed Scenery',
        href: '/glossary/borrowed-scenery',
        kind: 'term',
      },
      { type: 'text', value: ' Actually Means in Chinese Design' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('What `Auspicious Red` Actually Means in Chinese Use', lookup),
    [
      { type: 'text', value: 'What ' },
      {
        type: 'link',
        value: 'Auspicious Red',
        href: '/glossary/auspicious-red',
        kind: 'concept-note',
      },
      { type: 'text', value: ' Actually Means in Chinese Use' },
    ],
  );
});
