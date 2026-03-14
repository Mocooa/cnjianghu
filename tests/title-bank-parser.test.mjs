import test from 'node:test';
import assert from 'node:assert/strict';

import {
  loadTitleBankItems,
  parseTitleBankMarkdown,
} from '../src/data/title-bank-parser.mjs';

test('parseTitleBankMarkdown parses dossiers, formats, titles, and trailing tags', () => {
  const markdown = `
# Example Title Bank

## 1. WeChat and Super-App Life

### Quick Bites

- Why WeChat Feels Bigger Than Any Messaging App Foreigners Expect \`Launch first\` \`Evergreen\` \`High shareability\`
- Why Terms Like \`Neijuan\` and \`Tangping\` Keep Traveling Beyond China \`Launch first\` \`Evergreen\` \`High shareability\` \`Needs glossary support\`

### Deep Dives

- What WeChat Solves That Western Apps Keep Splitting Apart \`Launch first\` \`Evergreen\`
`;

  const items = parseTitleBankMarkdown(markdown, {
    pillar: 'digital-china',
    sourceFile: 'example.md',
  });

  assert.equal(items.length, 3);

  assert.deepEqual(items[0], {
    pillar: 'digital-china',
    dossier: 'WeChat and Super-App Life',
    format: 'Quick Bites',
    title: 'Why WeChat Feels Bigger Than Any Messaging App Foreigners Expect',
    tags: ['Launch first', 'Evergreen', 'High shareability'],
    sourceFile: 'example.md',
  });

  assert.equal(
    items[1].title,
    'Why Terms Like `Neijuan` and `Tangping` Keep Traveling Beyond China',
  );
  assert.deepEqual(items[1].tags, [
    'Launch first',
    'Evergreen',
    'High shareability',
    'Needs glossary support',
  ]);
  assert.equal(items[2].format, 'Deep Dives');
});

test('loadTitleBankItems reads the six real title-bank files and exposes known titles', () => {
  const items = loadTitleBankItems();

  const pillarSlugs = new Set(items.map(item => item.pillar));
  assert.equal(pillarSlugs.size, 6);

  assert.ok(
    items.some(
      item =>
        item.pillar === 'digital-china' &&
        item.dossier === 'WeChat and Super-App Life' &&
        item.title === 'Why WeChat Feels Bigger Than Any Messaging App Foreigners Expect',
    ),
  );

  assert.ok(
    items.some(
      item =>
        item.pillar === 'taste-life' &&
        item.dossier === 'Hot Water and Body Temperature Logic' &&
        item.title === `Why "Drink Hot Water" Is One of China's Most Misunderstood Care Gestures`,
    ),
  );

  assert.ok(
    items.some(
      item =>
        item.pillar === 'future-china' &&
        item.dossier === 'Cashless Life' &&
        item.title === 'Why Paying in China Can Feel Frictionless to First-Time Visitors',
    ),
  );
});

test('parseTitleBankMarkdown ignores editorial notes outside dossier sections', () => {
  const markdown = `
# Example Title Bank

## 1. Cashless Life

### Glossary-led

- What \`Scan to Pay\` Actually Organizes in Chinese Daily Life \`Launch first\` \`Evergreen\` \`Needs glossary support\`

## Editorial Notes

- Most production-ready dossier clusters:
- \`Cashless Life\`
`;

  const items = parseTitleBankMarkdown(markdown, {
    pillar: 'future-china',
    sourceFile: 'example.md',
  });

  assert.equal(items.length, 1);
  assert.equal(items[0].title, 'What `Scan to Pay` Actually Organizes in Chinese Daily Life');
});
