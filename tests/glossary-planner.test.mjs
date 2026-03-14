import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildPlannedGlossaryPillarSections,
  extractBacktickedGlossaryTerms,
  slugifyGlossaryConcept,
} from '../src/data/glossary-planner.mjs';

test('extractBacktickedGlossaryTerms returns unique terms in order', () => {
  assert.deepEqual(
    extractBacktickedGlossaryTerms('Why `Mianzi` and `Renqing` travel together with `Mianzi`'),
    ['Mianzi', 'Renqing'],
  );
});

test('slugifyGlossaryConcept normalizes multi-word terms', () => {
  assert.equal(slugifyGlossaryConcept('New First-Tier City'), 'new-first-tier-city');
  assert.equal(slugifyGlossaryConcept('AI Agent'), 'ai-agent');
});

test('buildPlannedGlossaryPillarSections groups glossary-led terms and omits published slugs', () => {
  const sections = buildPlannedGlossaryPillarSections(
    [
      {
        pillar: 'digital-china',
        dossier: 'Meme Universes',
        format: 'Glossary-led',
        title: 'What `Danmu` Actually Means Beyond "Bullet Comments"',
        tags: ['Launch first', 'Evergreen', 'Needs glossary support'],
        sourceFile: 'digital.md',
      },
      {
        pillar: 'digital-china',
        dossier: 'Internet Slang',
        format: 'Quick Bites',
        title: 'Why `Neijuan` Explains a Whole Social Mood',
        tags: ['Needs glossary support'],
        sourceFile: 'digital.md',
      },
      {
        pillar: 'taste-life',
        dossier: 'TCM Everyday Wellness',
        format: 'Glossary-led',
        title: 'What `Yangsheng` Actually Means in Daily China',
        tags: ['Evergreen', 'Needs glossary support'],
        sourceFile: 'taste.md',
      },
      {
        pillar: 'taste-life',
        dossier: 'Body Temperature Logic',
        format: 'Glossary-led',
        title: 'Why `Yangsheng` Still Matters in Everyday Life',
        tags: ['Launch first', 'Needs glossary support'],
        sourceFile: 'taste.md',
      },
    ],
    { publishedSlugs: new Set(['danmu']) },
  );

  assert.equal(sections.length, 1);
  assert.equal(sections[0].pillar.slug, 'taste-life');
  assert.equal(sections[0].concepts.length, 1);
  assert.deepEqual(sections[0].concepts[0], {
    term: 'Yangsheng',
    slug: 'yangsheng',
    pillar: 'taste-life',
    launchFirst: true,
    evergreen: true,
    dossierCount: 2,
    titleCount: 2,
  });
});
