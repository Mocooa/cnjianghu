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

test('fifteenth glossary batch exists as live slugs for social-life bridge terms', () => {
  const slugs = new Set(
    fs
      .readdirSync(glossaryDir)
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx$/, '')),
  );

  for (const slug of [
    'blind-date',
    'morning-exercise',
    'tiewanfan',
    'stability',
    'community-life',
  ]) {
    assert.equal(slugs.has(slug), true, `${slug} should exist as a live glossary route`);
  }
});

test('fifteenth glossary batch resolves social-life bridge labels into links', () => {
  const lookup = buildGlossaryDependencyLookup(loadGlossaryEntries());

  assert.deepEqual(resolveGlossaryDependency('Blind Date', lookup), {
    label: 'Blind Date',
    isLinked: true,
    href: '/glossary/blind-date',
    title: 'Blind Date',
    chinese: '相亲',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Morning Exercise', lookup), {
    label: 'Morning Exercise',
    isLinked: true,
    href: '/glossary/morning-exercise',
    title: 'Morning Exercise',
    chinese: '晨练',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Tiewanfan', lookup), {
    label: 'Tiewanfan',
    isLinked: true,
    href: '/glossary/tiewanfan',
    title: 'Tiewanfan',
    chinese: '铁饭碗',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Stability', lookup), {
    label: 'Stability',
    isLinked: true,
    href: '/glossary/stability',
    title: 'Stability',
    chinese: '稳定',
    kind: 'concept-note',
  });

  assert.deepEqual(resolveGlossaryDependency('Community Life', lookup), {
    label: 'Community Life',
    isLinked: true,
    href: '/glossary/community-life',
    title: 'Community Life',
    chinese: '社区生活',
    kind: 'concept-note',
  });
});

test('fifteenth glossary batch turns social-life bridge terms into inline links', () => {
  const lookup = buildGlossaryDependencyLookup(loadGlossaryEntries());

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('Why `Community Life` in China Is More Visible Than Many Foreigners Expect', lookup),
    [
      { type: 'text', value: 'Why ' },
      {
        type: 'link',
        value: 'Community Life',
        href: '/glossary/community-life',
        kind: 'concept-note',
      },
      { type: 'text', value: ' in China Is More Visible Than Many Foreigners Expect' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('Why `Morning Exercise` Has Such Strong Cultural Weight in China', lookup),
    [
      { type: 'text', value: 'Why ' },
      {
        type: 'link',
        value: 'Morning Exercise',
        href: '/glossary/morning-exercise',
        kind: 'term',
      },
      { type: 'text', value: ' Has Such Strong Cultural Weight in China' },
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

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('Why `Blind Date` in China Is a Bigger Social Category Than Foreigners Expect', lookup),
    [
      { type: 'text', value: 'Why ' },
      {
        type: 'link',
        value: 'Blind Date',
        href: '/glossary/blind-date',
        kind: 'term',
      },
      { type: 'text', value: ' in China Is a Bigger Social Category Than Foreigners Expect' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('What `Tiewanfan` Still Means in Chinese Imagination', lookup),
    [
      { type: 'text', value: 'What ' },
      {
        type: 'link',
        value: 'Tiewanfan',
        href: '/glossary/tiewanfan',
        kind: 'term',
      },
      { type: 'text', value: ' Still Means in Chinese Imagination' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('Why `Stability` Has Such Strong Moral Weight in China', lookup),
    [
      { type: 'text', value: 'Why ' },
      {
        type: 'link',
        value: 'Stability',
        href: '/glossary/stability',
        kind: 'concept-note',
      },
      { type: 'text', value: ' Has Such Strong Moral Weight in China' },
    ],
  );
});
