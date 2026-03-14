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

test('tenth glossary batch exists as live slugs for taste and reasoning bridge terms', () => {
  const slugs = new Set(
    fs
      .readdirSync(glossaryDir)
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx$/, '')),
  );

  for (const slug of [
    'hui-gan',
    'tangyuan',
    'treating-guests',
    'bian-tong',
    'zhongyong',
  ]) {
    assert.equal(slugs.has(slug), true, `${slug} should exist as a live glossary route`);
  }
});

test('tenth glossary batch resolves taste and reasoning labels into links', () => {
  const lookup = buildGlossaryDependencyLookup(loadGlossaryEntries());

  assert.deepEqual(resolveGlossaryDependency('Hui Gan', lookup), {
    label: 'Hui Gan',
    isLinked: true,
    href: '/glossary/hui-gan',
    title: 'Hui Gan',
    chinese: '回甘',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Tangyuan', lookup), {
    label: 'Tangyuan',
    isLinked: true,
    href: '/glossary/tangyuan',
    title: 'Tangyuan',
    chinese: '汤圆',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Treating Guests', lookup), {
    label: 'Treating Guests',
    isLinked: true,
    href: '/glossary/treating-guests',
    title: 'Treating Guests',
    chinese: '请客',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Bian Tong', lookup), {
    label: 'Bian Tong',
    isLinked: true,
    href: '/glossary/bian-tong',
    title: 'Bian Tong',
    chinese: '变通',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Zhongyong', lookup), {
    label: 'Zhongyong',
    isLinked: true,
    href: '/glossary/zhongyong',
    title: 'Zhongyong',
    chinese: '中庸',
    kind: 'term',
  });
});

test('tenth glossary batch turns taste and reasoning terms into inline links', () => {
  const lookup = buildGlossaryDependencyLookup(loadGlossaryEntries());

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('Why `Hui Gan` Is Harder to Translate Than It Looks', lookup),
    [
      { type: 'text', value: 'Why ' },
      {
        type: 'link',
        value: 'Hui Gan',
        href: '/glossary/hui-gan',
        kind: 'term',
      },
      { type: 'text', value: ' Is Harder to Translate Than It Looks' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('What `Bian Tong` Really Means in Chinese Problem-Solving', lookup),
    [
      { type: 'text', value: 'What ' },
      {
        type: 'link',
        value: 'Bian Tong',
        href: '/glossary/bian-tong',
        kind: 'term',
      },
      { type: 'text', value: ' Really Means in Chinese Problem-Solving' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('What `Zhongyong` Really Means Beyond "Moderation"', lookup),
    [
      { type: 'text', value: 'What ' },
      {
        type: 'link',
        value: 'Zhongyong',
        href: '/glossary/zhongyong',
        kind: 'term',
      },
      { type: 'text', value: ' Really Means Beyond "Moderation"' },
    ],
  );
});
