import assert from 'node:assert/strict';
import test from 'node:test';

import { entryIsConceptNote, getGlossaryContext } from '../src/data/glossary-index.mjs';

test('entryIsConceptNote uses kind instead of loose tags', () => {
  assert.equal(
    entryIsConceptNote({
      data: {
        kind: 'concept-note',
      },
    }),
    true,
  );

  assert.equal(
    entryIsConceptNote({
      data: {
        kind: 'term',
      },
    }),
    false,
  );
});

test('getGlossaryContext returns pillar metadata and dossier label', () => {
  const context = getGlossaryContext({
    data: {
      pillar: 'digital-china',
      dossier: 'Bullet Comments and Collective Spectatorship',
    },
  });

  assert.deepEqual(context, {
    pillar: {
      slug: 'digital-china',
      name: 'Digital China',
      chinese: '数字中国',
    },
    dossier: 'Bullet Comments and Collective Spectatorship',
  });
});
