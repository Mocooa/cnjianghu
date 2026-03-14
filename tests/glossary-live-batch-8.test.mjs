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

test('eighth glossary batch exists as live slugs for aesthetic continuation terms', () => {
  const slugs = new Set(
    fs
      .readdirSync(glossaryDir)
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx$/, '')),
  );

  for (const slug of [
    'new-chinese-style',
    'eighty-one-trials',
    'lotus-rebirth',
    'defying-fate',
    'mourning-white',
  ]) {
    assert.equal(slugs.has(slug), true, `${slug} should exist as a live glossary route`);
  }
});

test('eighth glossary batch resolves aesthetic continuation labels into links', () => {
  const lookup = buildGlossaryDependencyLookup(loadGlossaryEntries());

  assert.deepEqual(resolveGlossaryDependency('New Chinese Style', lookup), {
    label: 'New Chinese Style',
    isLinked: true,
    href: '/glossary/new-chinese-style',
    title: 'New Chinese Style',
    chinese: '新中式',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Eighty-One Trials', lookup), {
    label: 'Eighty-One Trials',
    isLinked: true,
    href: '/glossary/eighty-one-trials',
    title: 'Eighty-One Trials',
    chinese: '八十一难',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Lotus Rebirth', lookup), {
    label: 'Lotus Rebirth',
    isLinked: true,
    href: '/glossary/lotus-rebirth',
    title: 'Lotus Rebirth',
    chinese: '莲花化身',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Defying Fate', lookup), {
    label: 'Defying Fate',
    isLinked: true,
    href: '/glossary/defying-fate',
    title: 'Defying Fate',
    chinese: '逆天改命',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Mourning White', lookup), {
    label: 'Mourning White',
    isLinked: true,
    href: '/glossary/mourning-white',
    title: 'Mourning White',
    chinese: '缟素',
    kind: 'term',
  });
});

test('eighth glossary batch turns aesthetic continuation terms into inline links', () => {
  const lookup = buildGlossaryDependencyLookup(loadGlossaryEntries());

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('What `New Chinese Style` Actually Looks Like in Contemporary China', lookup),
    [
      { type: 'text', value: 'What ' },
      {
        type: 'link',
        value: 'New Chinese Style',
        href: '/glossary/new-chinese-style',
        kind: 'term',
      },
      { type: 'text', value: ' Actually Looks Like in Contemporary China' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('What `Lotus Rebirth` Actually Signals in the Ne Zha Story', lookup),
    [
      { type: 'text', value: 'What ' },
      {
        type: 'link',
        value: 'Lotus Rebirth',
        href: '/glossary/lotus-rebirth',
        kind: 'term',
      },
      { type: 'text', value: ' Actually Signals in the Ne Zha Story' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('Why `Mourning White` Still Matters to Foreigners Trying to Read Chinese Color', lookup),
    [
      { type: 'text', value: 'Why ' },
      {
        type: 'link',
        value: 'Mourning White',
        href: '/glossary/mourning-white',
        kind: 'term',
      },
      { type: 'text', value: ' Still Matters to Foreigners Trying to Read Chinese Color' },
    ],
  );
});
