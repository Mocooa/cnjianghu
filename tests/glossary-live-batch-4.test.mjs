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

test('fourth glossary batch exists as live slugs for remaining launch support concepts', () => {
  const slugs = new Set(
    fs
      .readdirSync(glossaryDir)
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx$/, '')),
  );

  for (const slug of [
    'qr-economy',
    'night-economy',
    'new-energy-vehicle',
    'last-mile-system',
    'infrastructure-buildout',
  ]) {
    assert.equal(slugs.has(slug), true, `${slug} should exist as a live glossary route`);
  }
});

test('fourth glossary batch resolves remaining launch support labels into live links', () => {
  const lookup = buildGlossaryDependencyLookup(loadGlossaryEntries());

  assert.deepEqual(resolveGlossaryDependency('QR Economy', lookup), {
    label: 'QR Economy',
    isLinked: true,
    href: '/glossary/qr-economy',
    title: 'QR Economy',
    chinese: '扫码经济',
    kind: 'concept-note',
  });

  assert.deepEqual(resolveGlossaryDependency('Night Economy', lookup), {
    label: 'Night Economy',
    isLinked: true,
    href: '/glossary/night-economy',
    title: 'Night Economy',
    chinese: '夜间经济',
    kind: 'concept-note',
  });

  assert.deepEqual(resolveGlossaryDependency('New Energy Vehicle', lookup), {
    label: 'New Energy Vehicle',
    isLinked: true,
    href: '/glossary/new-energy-vehicle',
    title: 'New Energy Vehicle',
    chinese: '新能源汽车',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Last-Mile System', lookup), {
    label: 'Last-Mile System',
    isLinked: true,
    href: '/glossary/last-mile-system',
    title: 'Last-Mile System',
    chinese: '最后一公里',
    kind: 'concept-note',
  });

  assert.deepEqual(resolveGlossaryDependency('Infrastructure Buildout', lookup), {
    label: 'Infrastructure Buildout',
    isLinked: true,
    href: '/glossary/infrastructure-buildout',
    title: 'Infrastructure Buildout',
    chinese: '基建',
    kind: 'concept-note',
  });
});

test('fourth glossary batch turns remaining launch backticked terms into inline links', () => {
  const lookup = buildGlossaryDependencyLookup(loadGlossaryEntries());

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('Why `QR Economy` Is More Than a Payment Trend in China', lookup),
    [
      { type: 'text', value: 'Why ' },
      {
        type: 'link',
        value: 'QR Economy',
        href: '/glossary/qr-economy',
        kind: 'concept-note',
      },
      { type: 'text', value: ' Is More Than a Payment Trend in China' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('What `New Energy Vehicle` Actually Means in China', lookup),
    [
      { type: 'text', value: 'What ' },
      {
        type: 'link',
        value: 'New Energy Vehicle',
        href: '/glossary/new-energy-vehicle',
        kind: 'term',
      },
      { type: 'text', value: ' Actually Means in China' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('What `Infrastructure Buildout` Actually Means in the Chinese Context', lookup),
    [
      { type: 'text', value: 'What ' },
      {
        type: 'link',
        value: 'Infrastructure Buildout',
        href: '/glossary/infrastructure-buildout',
        kind: 'concept-note',
      },
      { type: 'text', value: ' Actually Means in the Chinese Context' },
    ],
  );
});
