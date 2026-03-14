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

test('sixth glossary batch exists as live slugs for the next mixed bridge entries', () => {
  const slugs = new Set(
    fs
      .readdirSync(glossaryDir)
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx$/, '')),
  );

  for (const slug of [
    'healing-aesthetic',
    'high-speed-rail-station',
    'apartment-compound',
    'giving-face',
    'school-district-housing',
  ]) {
    assert.equal(slugs.has(slug), true, `${slug} should exist as a live glossary route`);
  }
});

test('sixth glossary batch resolves mixed bridge labels into linked glossary entries', () => {
  const lookup = buildGlossaryDependencyLookup(loadGlossaryEntries());

  assert.deepEqual(resolveGlossaryDependency('Healing Aesthetic', lookup), {
    label: 'Healing Aesthetic',
    isLinked: true,
    href: '/glossary/healing-aesthetic',
    title: 'Healing Aesthetic',
    chinese: '治愈系',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('High-Speed Rail Station', lookup), {
    label: 'High-Speed Rail Station',
    isLinked: true,
    href: '/glossary/high-speed-rail-station',
    title: 'High-Speed Rail Station',
    chinese: '高铁站',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Apartment Compound', lookup), {
    label: 'Apartment Compound',
    isLinked: true,
    href: '/glossary/apartment-compound',
    title: 'Apartment Compound',
    chinese: '小区',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Giving Face', lookup), {
    label: 'Giving Face',
    isLinked: true,
    href: '/glossary/giving-face',
    title: 'Giving Face',
    chinese: '给面子',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('School District Housing', lookup), {
    label: 'School District Housing',
    isLinked: true,
    href: '/glossary/school-district-housing',
    title: 'School District Housing',
    chinese: '学区房',
    kind: 'term',
  });
});

test('sixth glossary batch turns new bridge terms into inline links', () => {
  const lookup = buildGlossaryDependencyLookup(loadGlossaryEntries());

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('Why the `Healing Aesthetic` Became So Widespread in China', lookup),
    [
      { type: 'text', value: 'Why the ' },
      {
        type: 'link',
        value: 'Healing Aesthetic',
        href: '/glossary/healing-aesthetic',
        kind: 'term',
      },
      { type: 'text', value: ' Became So Widespread in China' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('Why `School District Housing` Matters So Much in China', lookup),
    [
      { type: 'text', value: 'Why ' },
      {
        type: 'link',
        value: 'School District Housing',
        href: '/glossary/school-district-housing',
        kind: 'term',
      },
      { type: 'text', value: ' Matters So Much in China' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('What `Giving Face` Looks Like at a Chinese Dinner Table', lookup),
    [
      { type: 'text', value: 'What ' },
      {
        type: 'link',
        value: 'Giving Face',
        href: '/glossary/giving-face',
        kind: 'term',
      },
      { type: 'text', value: ' Looks Like at a Chinese Dinner Table' },
    ],
  );
});
