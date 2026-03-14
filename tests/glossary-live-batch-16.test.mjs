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

test('sixteenth glossary batch exists as live slugs for home-life and family-duty bridge terms', () => {
  const slugs = new Set(
    fs
      .readdirSync(glossaryDir)
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx$/, '')),
  );

  for (const slug of [
    'qiuku',
    'yexiao',
    'xiao',
    'changyuan',
    'returning-home',
  ]) {
    assert.equal(slugs.has(slug), true, `${slug} should exist as a live glossary route`);
  }
});

test('sixteenth glossary batch resolves home-life and family-duty labels into links', () => {
  const lookup = buildGlossaryDependencyLookup(loadGlossaryEntries());

  assert.deepEqual(resolveGlossaryDependency('Qiuku', lookup), {
    label: 'Qiuku',
    isLinked: true,
    href: '/glossary/qiuku',
    title: 'Qiuku',
    chinese: '秋裤',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Yexiao', lookup), {
    label: 'Yexiao',
    isLinked: true,
    href: '/glossary/yexiao',
    title: 'Yexiao',
    chinese: '夜宵',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Xiao', lookup), {
    label: 'Xiao',
    isLinked: true,
    href: '/glossary/xiao',
    title: 'Xiao',
    chinese: '孝',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Changyuan', lookup), {
    label: 'Changyuan',
    isLinked: true,
    href: '/glossary/changyuan',
    title: 'Changyuan',
    chinese: '长远',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Returning Home', lookup), {
    label: 'Returning Home',
    isLinked: true,
    href: '/glossary/returning-home',
    title: 'Returning Home',
    chinese: '回家',
    kind: 'concept-note',
  });
});

test('sixteenth glossary batch turns new bridge terms into inline links', () => {
  const lookup = buildGlossaryDependencyLookup(loadGlossaryEntries());

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('What `Qiuku` Really Means in Chinese Everyday Life', lookup),
    [
      { type: 'text', value: 'What ' },
      {
        type: 'link',
        value: 'Qiuku',
        href: '/glossary/qiuku',
        kind: 'term',
      },
      { type: 'text', value: ' Really Means in Chinese Everyday Life' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('Why `Yexiao` Is More Than "Late-Night Snack"', lookup),
    [
      { type: 'text', value: 'Why ' },
      {
        type: 'link',
        value: 'Yexiao',
        href: '/glossary/yexiao',
        kind: 'term',
      },
      { type: 'text', value: ' Is More Than "Late-Night Snack"' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('What `Xiao` Still Means in Modern China', lookup),
    [
      { type: 'text', value: 'What ' },
      {
        type: 'link',
        value: 'Xiao',
        href: '/glossary/xiao',
        kind: 'term',
      },
      { type: 'text', value: ' Still Means in Modern China' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('What `Changyuan` Looks Like in Chinese Life Strategy', lookup),
    [
      { type: 'text', value: 'What ' },
      {
        type: 'link',
        value: 'Changyuan',
        href: '/glossary/changyuan',
        kind: 'term',
      },
      { type: 'text', value: ' Looks Like in Chinese Life Strategy' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('Why `Returning Home` Carries Moral Weight in Chinese Family Life', lookup),
    [
      { type: 'text', value: 'Why ' },
      {
        type: 'link',
        value: 'Returning Home',
        href: '/glossary/returning-home',
        kind: 'concept-note',
      },
      { type: 'text', value: ' Carries Moral Weight in Chinese Family Life' },
    ],
  );
});
