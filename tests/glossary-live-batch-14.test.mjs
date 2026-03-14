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

test('fourteenth glossary batch exists as live slugs for title-bank bridge terms', () => {
  const slugs = new Set(
    fs
      .readdirSync(glossaryDir)
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx$/, '')),
  );

  for (const slug of [
    'nanie',
    'tiktok-refugee',
    'jiachangcai',
    'xiafan',
    'bride-price',
  ]) {
    assert.equal(slugs.has(slug), true, `${slug} should exist as a live glossary route`);
  }
});

test('fourteenth glossary batch resolves title-bank bridge labels into links', () => {
  const lookup = buildGlossaryDependencyLookup(loadGlossaryEntries());

  assert.deepEqual(resolveGlossaryDependency('Nanie', lookup), {
    label: 'Nanie',
    isLinked: true,
    href: '/glossary/nanie',
    title: 'Nanie',
    chinese: '拿捏',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('TikTok Refugee', lookup), {
    label: 'TikTok Refugee',
    isLinked: true,
    href: '/glossary/tiktok-refugee',
    title: 'TikTok Refugee',
    chinese: 'TikTok 难民',
    kind: 'concept-note',
  });

  assert.deepEqual(resolveGlossaryDependency('Jiachangcai', lookup), {
    label: 'Jiachangcai',
    isLinked: true,
    href: '/glossary/jiachangcai',
    title: 'Jiachangcai',
    chinese: '家常菜',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Xiafan', lookup), {
    label: 'Xiafan',
    isLinked: true,
    href: '/glossary/xiafan',
    title: 'Xiafan',
    chinese: '下饭',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Bride Price', lookup), {
    label: 'Bride Price',
    isLinked: true,
    href: '/glossary/bride-price',
    title: 'Bride Price',
    chinese: '彩礼',
    kind: 'term',
  });
});

test('fourteenth glossary batch turns title-bank bridge terms into inline links', () => {
  const lookup = buildGlossaryDependencyLookup(loadGlossaryEntries());

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('Why `Nanie` Is Harder to Translate Than It Looks', lookup),
    [
      { type: 'text', value: 'Why ' },
      {
        type: 'link',
        value: 'Nanie',
        href: '/glossary/nanie',
        kind: 'term',
      },
      { type: 'text', value: ' Is Harder to Translate Than It Looks' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('What `TikTok Refugee` Meant in the China App Context', lookup),
    [
      { type: 'text', value: 'What ' },
      {
        type: 'link',
        value: 'TikTok Refugee',
        href: '/glossary/tiktok-refugee',
        kind: 'concept-note',
      },
      { type: 'text', value: ' Meant in the China App Context' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('What `Jiachangcai` Actually Means', lookup),
    [
      { type: 'text', value: 'What ' },
      {
        type: 'link',
        value: 'Jiachangcai',
        href: '/glossary/jiachangcai',
        kind: 'term',
      },
      { type: 'text', value: ' Actually Means' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('Why `Xiafan` Says More Than "Good with Rice"', lookup),
    [
      { type: 'text', value: 'Why ' },
      {
        type: 'link',
        value: 'Xiafan',
        href: '/glossary/xiafan',
        kind: 'term',
      },
      { type: 'text', value: ' Says More Than "Good with Rice"' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('What `Bride Price` Actually Means in Contemporary China', lookup),
    [
      { type: 'text', value: 'What ' },
      {
        type: 'link',
        value: 'Bride Price',
        href: '/glossary/bride-price',
        kind: 'term',
      },
      { type: 'text', value: ' Actually Means in Contemporary China' },
    ],
  );
});
