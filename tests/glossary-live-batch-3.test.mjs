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

test('third glossary batch exists as live slugs for high-frequency launch dependencies', () => {
  const slugs = new Set(
    fs
      .readdirSync(glossaryDir)
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx$/, '')),
  );

  for (const slug of [
    'immortal',
    'auspicious-beast',
    'public-square',
    'scan-to-pay',
    'jingjiu',
    'rider',
    'mamianqun',
    'blind-box',
    'secret-edition',
    'battery-swap',
  ]) {
    assert.equal(slugs.has(slug), true, `${slug} should exist as a live glossary route`);
  }
});

test('third glossary batch resolves repeated roadmap support labels into links', () => {
  const lookup = buildGlossaryDependencyLookup(loadGlossaryEntries());

  assert.deepEqual(resolveGlossaryDependency('Jingjiu', lookup), {
    label: 'Jingjiu',
    isLinked: true,
    href: '/glossary/jingjiu',
    title: 'Jingjiu',
    chinese: '敬酒',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Mamianqun', lookup), {
    label: 'Mamianqun',
    isLinked: true,
    href: '/glossary/mamianqun',
    title: 'Mamianqun',
    chinese: '马面裙',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Blind box', lookup), {
    label: 'Blind box',
    isLinked: true,
    href: '/glossary/blind-box',
    title: 'Blind Box',
    chinese: '盲盒',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Public square', lookup), {
    label: 'Public square',
    isLinked: true,
    href: '/glossary/public-square',
    title: 'Public Square',
    chinese: '广场',
    kind: 'term',
  });
});

test('third glossary batch turns new backticked title-bank terms into inline links', () => {
  const lookup = buildGlossaryDependencyLookup(loadGlossaryEntries());

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('What `Jingjiu` Really Means in Chinese Dining Culture', lookup),
    [
      { type: 'text', value: 'What ' },
      {
        type: 'link',
        value: 'Jingjiu',
        href: '/glossary/jingjiu',
        kind: 'term',
      },
      { type: 'text', value: ' Really Means in Chinese Dining Culture' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('Why `Mamianqun` Became So Visible Again in China', lookup),
    [
      { type: 'text', value: 'Why ' },
      {
        type: 'link',
        value: 'Mamianqun',
        href: '/glossary/mamianqun',
        kind: 'term',
      },
      { type: 'text', value: ' Became So Visible Again in China' },
    ],
  );
});
