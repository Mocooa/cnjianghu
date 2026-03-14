import assert from 'node:assert/strict';
import test from 'node:test';

import { buildGlossaryDependencyLookup } from '../src/data/glossary-dependency-links.mjs';
import { tokenizeGlossaryLinkedTitle } from '../src/data/glossary-inline-links.mjs';

test('tokenizeGlossaryLinkedTitle converts backticked published glossary terms into link tokens', () => {
  const lookup = buildGlossaryDependencyLookup([
    {
      id: 'mianzi',
      data: {
        title: 'Mianzi',
        chinese: '面子',
        kind: 'term',
      },
    },
  ]);

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('What `Mianzi` Actually Means Beyond "Face"', lookup),
    [
      { type: 'text', value: 'What ' },
      {
        type: 'link',
        value: 'Mianzi',
        href: '/glossary/mianzi',
        kind: 'term',
      },
      { type: 'text', value: ' Actually Means Beyond "Face"' },
    ],
  );
});

test('tokenizeGlossaryLinkedTitle leaves unpublished backticked terms as code tokens', () => {
  const lookup = buildGlossaryDependencyLookup([]);

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('What `Waimai` Really Means in Chinese City Life', lookup),
    [
      { type: 'text', value: 'What ' },
      { type: 'code', value: 'Waimai' },
      { type: 'text', value: ' Really Means in Chinese City Life' },
    ],
  );
});

test('tokenizeGlossaryLinkedTitle returns a plain text token when no glossary markers exist', () => {
  const lookup = buildGlossaryDependencyLookup([]);

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('Why Breakfast in China Is So Often Hot, Fast, and Savory', lookup),
    [
      {
        type: 'text',
        value: 'Why Breakfast in China Is So Often Hot, Fast, and Savory',
      },
    ],
  );
});
