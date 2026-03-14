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

test('twelfth glossary batch exists as live slugs for urban and platform concept terms', () => {
  const slugs = new Set(
    fs
      .readdirSync(glossaryDir)
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx$/, '')),
  );

  for (const slug of [
    'county-town',
    'livability',
    'property-management',
    'dui-zhang',
    'open-source-model',
  ]) {
    assert.equal(slugs.has(slug), true, `${slug} should exist as a live glossary route`);
  }
});

test('twelfth glossary batch resolves urban and platform concept labels into links', () => {
  const lookup = buildGlossaryDependencyLookup(loadGlossaryEntries());

  assert.deepEqual(resolveGlossaryDependency('County Town', lookup), {
    label: 'County Town',
    isLinked: true,
    href: '/glossary/county-town',
    title: 'County Town',
    chinese: '县城',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Livability', lookup), {
    label: 'Livability',
    isLinked: true,
    href: '/glossary/livability',
    title: 'Livability',
    chinese: '宜居性',
    kind: 'concept-note',
  });

  assert.deepEqual(resolveGlossaryDependency('Property Management', lookup), {
    label: 'Property Management',
    isLinked: true,
    href: '/glossary/property-management',
    title: 'Property Management',
    chinese: '物业',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Dui Zhang', lookup), {
    label: 'Dui Zhang',
    isLinked: true,
    href: '/glossary/dui-zhang',
    title: 'Dui Zhang',
    chinese: '对账',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Open-Source Model', lookup), {
    label: 'Open-Source Model',
    isLinked: true,
    href: '/glossary/open-source-model',
    title: 'Open-Source Model',
    chinese: '开源模型',
    kind: 'term',
  });
});

test('twelfth glossary batch turns urban and platform concept terms into inline links', () => {
  const lookup = buildGlossaryDependencyLookup(loadGlossaryEntries());

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('Why `County Town` Is Not a Simple Rural Category in Modern China', lookup),
    [
      { type: 'text', value: 'Why ' },
      {
        type: 'link',
        value: 'County Town',
        href: '/glossary/county-town',
        kind: 'term',
      },
      { type: 'text', value: ' Is Not a Simple Rural Category in Modern China' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('Why `Livability` Means Something Specific in Chinese Urban Talk', lookup),
    [
      { type: 'text', value: 'Why ' },
      {
        type: 'link',
        value: 'Livability',
        href: '/glossary/livability',
        kind: 'concept-note',
      },
      { type: 'text', value: ' Means Something Specific in Chinese Urban Talk' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('Why `Property Management` Matters So Much in Chinese Urban Life', lookup),
    [
      { type: 'text', value: 'Why ' },
      {
        type: 'link',
        value: 'Property Management',
        href: '/glossary/property-management',
        kind: 'term',
      },
      { type: 'text', value: ' Matters So Much in Chinese Urban Life' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('Why `Dui Zhang` Became a Useful Word for Cross-Platform Comparison', lookup),
    [
      { type: 'text', value: 'Why ' },
      {
        type: 'link',
        value: 'Dui Zhang',
        href: '/glossary/dui-zhang',
        kind: 'term',
      },
      { type: 'text', value: ' Became a Useful Word for Cross-Platform Comparison' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('Why `Open-Source Model` Matters So Much in China\'s AI Story', lookup),
    [
      { type: 'text', value: 'Why ' },
      {
        type: 'link',
        value: 'Open-Source Model',
        href: '/glossary/open-source-model',
        kind: 'term',
      },
      { type: 'text', value: " Matters So Much in China's AI Story" },
    ],
  );
});
