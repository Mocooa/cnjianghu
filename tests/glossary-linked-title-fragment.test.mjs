import assert from 'node:assert/strict';
import test from 'node:test';

import { buildGlossaryDependencyLookup } from '../src/data/glossary-dependency-links.mjs';
import { tokenizeGlossaryLinkedTitle } from '../src/data/glossary-inline-links.mjs';

test('launch-slate style titles can also reuse the same glossary-linked tokenization', () => {
  const lookup = buildGlossaryDependencyLookup([
    {
      id: 'city-tier',
      data: {
        title: 'City Tier',
        chinese: '城市层级',
        kind: 'concept-note',
      },
    },
  ]);

  assert.deepEqual(
    tokenizeGlossaryLinkedTitle('Why `City Tier` Is More Social Than Administrative', lookup),
    [
      { type: 'text', value: 'Why ' },
      {
        type: 'link',
        value: 'City Tier',
        href: '/glossary/city-tier',
        kind: 'concept-note',
      },
      { type: 'text', value: ' Is More Social Than Administrative' },
    ],
  );
});
