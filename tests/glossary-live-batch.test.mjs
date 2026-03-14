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

test('high-leverage second glossary batch exists as live glossary slugs', () => {
  const slugs = new Set(
    fs
      .readdirSync(glossaryDir)
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx$/, '')),
  );

  for (const slug of [
    'mini-program',
    'wecom',
    'xianxia',
    'shanshui',
    'waimai',
    'gaokao',
    'large-model',
  ]) {
    assert.equal(slugs.has(slug), true, `${slug} should exist as a live glossary route`);
  }
});

test('new live glossary batch resolves repeated roadmap dependencies into links', () => {
  const lookup = buildGlossaryDependencyLookup(loadGlossaryEntries());

  assert.deepEqual(resolveGlossaryDependency('Mini Program', lookup), {
    label: 'Mini Program',
    isLinked: true,
    href: '/glossary/mini-program',
    title: 'Mini Program',
    chinese: '小程序',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Xianxia', lookup), {
    label: 'Xianxia',
    isLinked: true,
    href: '/glossary/xianxia',
    title: 'Xianxia',
    chinese: '仙侠',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Waimai', lookup), {
    label: 'Waimai',
    isLinked: true,
    href: '/glossary/waimai',
    title: 'Waimai',
    chinese: '外卖',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Gaokao', lookup), {
    label: 'Gaokao',
    isLinked: true,
    href: '/glossary/gaokao',
    title: 'Gaokao',
    chinese: '高考',
    kind: 'concept-note',
  });

  assert.deepEqual(resolveGlossaryDependency('Large Model', lookup), {
    label: 'Large Model',
    isLinked: true,
    href: '/glossary/large-model',
    title: 'Large Model',
    chinese: '大模型',
    kind: 'term',
  });
});

test('new live glossary batch turns backticked roadmap terms into inline links', () => {
  const lookup = buildGlossaryDependencyLookup(loadGlossaryEntries());

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('What `Mini Program` Actually Means in Chinese Digital Life', lookup),
    [
      { type: 'text', value: 'What ' },
      {
        type: 'link',
        value: 'Mini Program',
        href: '/glossary/mini-program',
        kind: 'term',
      },
      { type: 'text', value: ' Actually Means in Chinese Digital Life' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('What `Xianxia` Actually Means Beyond "Immortal Fantasy"', lookup),
    [
      { type: 'text', value: 'What ' },
      {
        type: 'link',
        value: 'Xianxia',
        href: '/glossary/xianxia',
        kind: 'term',
      },
      { type: 'text', value: ' Actually Means Beyond "Immortal Fantasy"' },
    ],
  );
});
