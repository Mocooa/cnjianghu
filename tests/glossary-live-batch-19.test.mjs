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

test('nineteenth glossary batch keeps core Future China vocabulary as true terms', () => {
  const slugs = new Set(
    fs
      .readdirSync(glossaryDir)
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx$/, '')),
  );

  for (const slug of [
    'high-speed-rail',
    'new-energy-vehicle',
    'open-source-model',
    'large-model',
    'made-in-china',
  ]) {
    assert.equal(slugs.has(slug), true, `${slug} should exist as a live glossary route`);
  }
});

test('nineteenth glossary batch resolves core Future China vocabulary as term links', () => {
  const lookup = buildGlossaryDependencyLookup(loadGlossaryEntries());

  assert.deepEqual(resolveGlossaryDependency('High-Speed Rail', lookup), {
    label: 'High-Speed Rail',
    isLinked: true,
    href: '/glossary/high-speed-rail',
    title: 'High-Speed Rail',
    chinese: '高铁',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('New Energy Vehicle', lookup), {
    label: 'New Energy Vehicle',
    isLinked: true,
    href: '/glossary/new-energy-vehicle',
    title: 'New Energy Vehicle',
    chinese: '新能源汽车',
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

  assert.deepEqual(resolveGlossaryDependency('Large Model', lookup), {
    label: 'Large Model',
    isLinked: true,
    href: '/glossary/large-model',
    title: 'Large Model',
    chinese: '大模型',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Made in China', lookup), {
    label: 'Made in China',
    isLinked: true,
    href: '/glossary/made-in-china',
    title: 'Made in China',
    chinese: '中国制造',
    kind: 'term',
  });
});

test('nineteenth glossary batch turns core Future China terms into inline term links', () => {
  const lookup = buildGlossaryDependencyLookup(loadGlossaryEntries());

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('Why `High-Speed Rail` Still Feels Like Everyday Proof of Scale in China', lookup),
    [
      { type: 'text', value: 'Why ' },
      {
        type: 'link',
        value: 'High-Speed Rail',
        href: '/glossary/high-speed-rail',
        kind: 'term',
      },
      { type: 'text', value: ' Still Feels Like Everyday Proof of Scale in China' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('Why `Large Model` Became a Public Chinese AI Word So Fast', lookup),
    [
      { type: 'text', value: 'Why ' },
      {
        type: 'link',
        value: 'Large Model',
        href: '/glossary/large-model',
        kind: 'term',
      },
      { type: 'text', value: ' Became a Public Chinese AI Word So Fast' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('How `Made in China` Stopped Meaning Only One Thing', lookup),
    [
      { type: 'text', value: 'How ' },
      {
        type: 'link',
        value: 'Made in China',
        href: '/glossary/made-in-china',
        kind: 'term',
      },
      { type: 'text', value: ' Stopped Meaning Only One Thing' },
    ],
  );
});
