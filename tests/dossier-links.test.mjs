import assert from 'node:assert/strict';
import test from 'node:test';

import {
  getArchiveMapDossierHref,
  getDossierAnchorId,
  getExploreDossierHref,
  slugifyDossierLabel,
} from '../src/data/dossier-links.mjs';

test('slugifyDossierLabel normalizes dossier labels into stable anchors', () => {
  assert.equal(
    slugifyDossierLabel('Face, Favor, and Indirectness'),
    'face-favor-and-indirectness',
  );

  assert.equal(
    slugifyDossierLabel('Guochao / New Chinese Style'),
    'guochao-new-chinese-style',
  );
});

test('getDossierAnchorId namespaces anchors by pillar', () => {
  assert.equal(
    getDossierAnchorId('mind-china', 'Face, Favor, and Indirectness'),
    'mind-china--face-favor-and-indirectness',
  );
});

test('dossier href builders point glossary readers back into explore and archive-map', () => {
  assert.equal(
    getExploreDossierHref('living-china', 'Tier-System Lives'),
    '/explore/living-china#living-china--tier-system-lives',
  );

  assert.equal(
    getArchiveMapDossierHref('living-china', 'Tier-System Lives'),
    '/archive-map#living-china--tier-system-lives',
  );
});
