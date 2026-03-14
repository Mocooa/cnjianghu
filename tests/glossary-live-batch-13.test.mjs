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

test('thirteenth glossary batch exists as live slugs for digital and AI bridge terms', () => {
  const slugs = new Set(
    fs
      .readdirSync(glossaryDir)
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx$/, '')),
  );

  for (const slug of [
    'shang-jiazhi',
    'kongjiang',
    'qianshui',
    'ai-agent',
    'multi-step-task',
  ]) {
    assert.equal(slugs.has(slug), true, `${slug} should exist as a live glossary route`);
  }
});

test('thirteenth glossary batch resolves digital and AI bridge labels into links', () => {
  const lookup = buildGlossaryDependencyLookup(loadGlossaryEntries());

  assert.deepEqual(resolveGlossaryDependency('Shang Jiazhi', lookup), {
    label: 'Shang Jiazhi',
    isLinked: true,
    href: '/glossary/shang-jiazhi',
    title: 'Shang Jiazhi',
    chinese: '上价值',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Kongjiang', lookup), {
    label: 'Kongjiang',
    isLinked: true,
    href: '/glossary/kongjiang',
    title: 'Kongjiang',
    chinese: '空降',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Qianshui', lookup), {
    label: 'Qianshui',
    isLinked: true,
    href: '/glossary/qianshui',
    title: 'Qianshui',
    chinese: '潜水',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('AI Agent', lookup), {
    label: 'AI Agent',
    isLinked: true,
    href: '/glossary/ai-agent',
    title: 'AI Agent',
    chinese: '智能体',
    kind: 'term',
  });

  assert.deepEqual(resolveGlossaryDependency('Multi-Step Task', lookup), {
    label: 'Multi-Step Task',
    isLinked: true,
    href: '/glossary/multi-step-task',
    title: 'Multi-Step Task',
    chinese: '多步任务',
    kind: 'concept-note',
  });
});

test('thirteenth glossary batch turns digital and AI bridge terms into inline links', () => {
  const lookup = buildGlossaryDependencyLookup(loadGlossaryEntries());

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('What `Shang Jiazhi` Really Means in Chinese Online Speech', lookup),
    [
      { type: 'text', value: 'What ' },
      {
        type: 'link',
        value: 'Shang Jiazhi',
        href: '/glossary/shang-jiazhi',
        kind: 'term',
      },
      { type: 'text', value: ' Really Means in Chinese Online Speech' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('Why `Kongjiang` Is a Very Chinese Way of Using a Video Timeline', lookup),
    [
      { type: 'text', value: 'Why ' },
      {
        type: 'link',
        value: 'Kongjiang',
        href: '/glossary/kongjiang',
        kind: 'term',
      },
      { type: 'text', value: ' Is a Very Chinese Way of Using a Video Timeline' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('Why `Qianshui` in a Chinese Chat Is Not Just "Lurking"', lookup),
    [
      { type: 'text', value: 'Why ' },
      {
        type: 'link',
        value: 'Qianshui',
        href: '/glossary/qianshui',
        kind: 'term',
      },
      { type: 'text', value: ' in a Chinese Chat Is Not Just "Lurking"' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('What `AI Agent` Means in the Chinese Product Conversation', lookup),
    [
      { type: 'text', value: 'What ' },
      {
        type: 'link',
        value: 'AI Agent',
        href: '/glossary/ai-agent',
        kind: 'term',
      },
      { type: 'text', value: ' Means in the Chinese Product Conversation' },
    ],
  );

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('Why `Multi-Step Task` Has Become a Core AI Benchmark in China', lookup),
    [
      { type: 'text', value: 'Why ' },
      {
        type: 'link',
        value: 'Multi-Step Task',
        href: '/glossary/multi-step-task',
        kind: 'concept-note',
      },
      { type: 'text', value: ' Has Become a Core AI Benchmark in China' },
    ],
  );
});
