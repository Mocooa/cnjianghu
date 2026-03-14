import assert from 'node:assert/strict';
import test from 'node:test';

import { normalizeRoadmapTitleKey } from '../src/data/roadmap-title-key.mjs';

test('normalizeRoadmapTitleKey strips backticks so launch-slate and title-bank titles still match', () => {
  assert.equal(
    normalizeRoadmapTitleKey('Why `Hanfu` Is About More Than Historical Costume'),
    normalizeRoadmapTitleKey('Why Hanfu Is About More Than Historical Costume'),
  );

  assert.equal(
    normalizeRoadmapTitleKey('`Neijuan` Is Not Just Involution'),
    normalizeRoadmapTitleKey('Neijuan Is Not Just Involution'),
  );
});
