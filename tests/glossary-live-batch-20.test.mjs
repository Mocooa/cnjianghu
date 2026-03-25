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

test('twentieth glossary batch exists as live slugs for ChineseTerm gap-fill entries', () => {
  const slugs = new Set(
    fs
      .readdirSync(glossaryDir)
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx$/, '')),
  );

  for (const slug of [
    'zhongyi',
    'hongbao',
    'xiaohongshu',
    'biaoqingbao',
    'doutu',
    'dazi',
    'jinli',
    'chengguan',
    'jiaozi',
    'facial-recognition',
    'yuanlin',
    'piwei',
    'baowenbei',
    'reshui',
    'youtiao',
    'kongyiji-wenxue',
    'anquangan',
    'fangbian',
    'jiashan',
    'yuanbao',
  ]) {
    assert.equal(slugs.has(slug), true, `${slug} should exist as a live glossary route`);
  }
});

test('twentieth glossary batch resolves ChineseTerm gap-fill entries as term links', () => {
  const lookup = buildGlossaryDependencyLookup(loadGlossaryEntries());

  assert.deepEqual(resolveGlossaryDependency('Zhongyi', lookup), {
    label: 'Zhongyi',
    isLinked: true,
    href: '/glossary/zhongyi',
    title: 'Zhongyi',
    chinese: '中医',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Hongbao', lookup), {
    label: 'Hongbao',
    isLinked: true,
    href: '/glossary/hongbao',
    title: 'Hongbao',
    chinese: '红包',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Xiaohongshu', lookup), {
    label: 'Xiaohongshu',
    isLinked: true,
    href: '/glossary/xiaohongshu',
    title: 'Xiaohongshu',
    chinese: '小红书',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Jiaozi', lookup), {
    label: 'Jiaozi',
    isLinked: true,
    href: '/glossary/jiaozi',
    title: 'Jiaozi',
    chinese: '饺子',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Facial Recognition', lookup), {
    label: 'Facial Recognition',
    isLinked: true,
    href: '/glossary/facial-recognition',
    title: 'Facial Recognition',
    chinese: '人脸识别',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Youtiao', lookup), {
    label: 'Youtiao',
    isLinked: true,
    href: '/glossary/youtiao',
    title: 'Youtiao',
    chinese: '油条',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Kongyiji Wenxue', lookup), {
    label: 'Kongyiji Wenxue',
    isLinked: true,
    href: '/glossary/kongyiji-wenxue',
    title: 'Kongyiji Wenxue',
    chinese: '孔乙己文学',
    kind: 'term',
  });
});

test('twentieth glossary batch turns ChineseTerm gap-fill entries into inline links', () => {
  const lookup = buildGlossaryDependencyLookup(loadGlossaryEntries());

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('What `Zhongyi` Means Beyond Medicine in Chinese Life', lookup),
    [
      { type: 'text', value: 'What ' },
      {
        type: 'link',
        value: 'Zhongyi',
        href: '/glossary/zhongyi',
        kind: 'term',
      },
      { type: 'text', value: ' Means Beyond Medicine in Chinese Life' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('How `Xiaohongshu` Became More Than Shopping', lookup),
    [
      { type: 'text', value: 'How ' },
      {
        type: 'link',
        value: 'Xiaohongshu',
        href: '/glossary/xiaohongshu',
        kind: 'term',
      },
      { type: 'text', value: ' Became More Than Shopping' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('Why `Jiaozi` Carry More Weight Than Just Filling', lookup),
    [
      { type: 'text', value: 'Why ' },
      {
        type: 'link',
        value: 'Jiaozi',
        href: '/glossary/jiaozi',
        kind: 'term',
      },
      { type: 'text', value: ' Carry More Weight Than Just Filling' },
    ],
  );
});
