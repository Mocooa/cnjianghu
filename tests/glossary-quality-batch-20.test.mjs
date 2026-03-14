import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const glossaryDir = path.join(process.cwd(), 'content/published/glossary');

const expectedSections = [
  '## Why this phrase shows up',
  '## What people are really pointing to',
  '## What outsiders often miss',
  '## What this does and does not explain',
];

function readEntry(slug) {
  return fs.readFileSync(path.join(glossaryDir, `${slug}.mdx`), 'utf8');
}

function readKind(slug) {
  const source = readEntry(slug);
  const match = source.match(/^---\n([\s\S]*?)\n---/);

  if (!match) {
    throw new Error(`Missing frontmatter in ${slug}`);
  }

  const kindMatch = match[1].match(/^kind:\s*(.+)$/m);
  return kindMatch ? kindMatch[1].trim().replace(/^"|"$/g, '') : null;
}

test('quality batch 20 keeps selected bridge entries as concept notes', () => {
  for (const slug of ['livability', 'modernity', 'qr-economy', 'residential-compound']) {
    assert.equal(readKind(slug), 'concept-note');
  }
});

test('quality batch 20 concept notes use the stronger bridge-structure headings', () => {
  for (const slug of ['livability', 'modernity', 'qr-economy', 'residential-compound']) {
    const source = readEntry(slug);

    for (const section of expectedSections) {
      assert.equal(
        source.includes(section),
        true,
        `${slug} should include section heading: ${section}`,
      );
    }
  }
});
