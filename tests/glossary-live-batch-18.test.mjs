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

test('eighteenth glossary batch exists as live slugs for remaining bridge concepts', () => {
  const slugs = new Set(
    fs
      .readdirSync(glossaryDir)
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx$/, '')),
  );

  for (const slug of [
    'factory-direct',
    'platform-integration',
    'qr-access',
    'workaround',
    'lying-flat',
    'residential-compound',
  ]) {
    assert.equal(slugs.has(slug), true, `${slug} should exist as a live glossary route`);
  }
});

test('eighteenth glossary batch resolves remaining bridge labels into links', () => {
  const lookup = buildGlossaryDependencyLookup(loadGlossaryEntries());

  assert.deepEqual(resolveGlossaryDependency('Factory-Direct', lookup), {
    label: 'Factory-Direct',
    isLinked: true,
    href: '/glossary/factory-direct',
    title: 'Factory-Direct',
    chinese: '工厂直发',
    kind: 'concept-note',
  });

  assert.deepEqual(resolveGlossaryDependency('Platform Integration', lookup), {
    label: 'Platform Integration',
    isLinked: true,
    href: '/glossary/platform-integration',
    title: 'Platform Integration',
    chinese: '平台整合',
    kind: 'concept-note',
  });

  assert.deepEqual(resolveGlossaryDependency('QR Access', lookup), {
    label: 'QR Access',
    isLinked: true,
    href: '/glossary/qr-access',
    title: 'QR Access',
    chinese: '扫码通行',
    kind: 'concept-note',
  });

  assert.deepEqual(resolveGlossaryDependency('Workaround', lookup), {
    label: 'Workaround',
    isLinked: true,
    href: '/glossary/workaround',
    title: 'Workaround',
    chinese: '变通办法',
    kind: 'concept-note',
  });

  assert.deepEqual(resolveGlossaryDependency('Lying Flat', lookup), {
    label: 'Lying Flat',
    isLinked: true,
    href: '/glossary/lying-flat',
    title: 'Lying Flat',
    chinese: '躺平状态',
    kind: 'concept-note',
  });

  assert.deepEqual(resolveGlossaryDependency('Residential Compound', lookup), {
    label: 'Residential Compound',
    isLinked: true,
    href: '/glossary/residential-compound',
    title: 'Residential Compound',
    chinese: '住宅小区',
    kind: 'concept-note',
  });
});

test('eighteenth glossary batch turns remaining bridge concepts into inline links', () => {
  const lookup = buildGlossaryDependencyLookup(loadGlossaryEntries());

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('What `Factory-Direct` Actually Means in Cross-Border Commerce', lookup),
    [
      { type: 'text', value: 'What ' },
      {
        type: 'link',
        value: 'Factory-Direct',
        href: '/glossary/factory-direct',
        kind: 'concept-note',
      },
      { type: 'text', value: ' Actually Means in Cross-Border Commerce' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('Why `Platform Integration` Matters More Than the Phrase "Smart City"', lookup),
    [
      { type: 'text', value: 'Why ' },
      {
        type: 'link',
        value: 'Platform Integration',
        href: '/glossary/platform-integration',
        kind: 'concept-note',
      },
      { type: 'text', value: ' Matters More Than the Phrase "Smart City"' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('What `QR Access` Really Means in Chinese Urban Life', lookup),
    [
      { type: 'text', value: 'What ' },
      {
        type: 'link',
        value: 'QR Access',
        href: '/glossary/qr-access',
        kind: 'concept-note',
      },
      { type: 'text', value: ' Really Means in Chinese Urban Life' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('Why a `Workaround` Can Carry Respect in China', lookup),
    [
      { type: 'text', value: 'Why a ' },
      {
        type: 'link',
        value: 'Workaround',
        href: '/glossary/workaround',
        kind: 'concept-note',
      },
      { type: 'text', value: ' Can Carry Respect in China' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('Why `Lying Flat` Belongs to Life-Script Debate, Not Just Internet Slang', lookup),
    [
      { type: 'text', value: 'Why ' },
      {
        type: 'link',
        value: 'Lying Flat',
        href: '/glossary/lying-flat',
        kind: 'concept-note',
      },
      { type: 'text', value: ' Belongs to Life-Script Debate, Not Just Internet Slang' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('What a `Residential Compound` Actually Means in China', lookup),
    [
      { type: 'text', value: 'What a ' },
      {
        type: 'link',
        value: 'Residential Compound',
        href: '/glossary/residential-compound',
        kind: 'concept-note',
      },
      { type: 'text', value: ' Actually Means in China' },
    ],
  );
});
