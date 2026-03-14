import assert from 'node:assert/strict';
import test from 'node:test';

import {
  getTimeZoneDateKey,
  selectDailyQuickBites,
} from '../src/data/quick-bite-rotation.mjs';

const baseItems = [
  {
    id: 'word-1',
    type: 'word-of-the-day',
    title: 'Word 1',
    date: '2026-03-10T00:00:00.000Z',
  },
  {
    id: 'word-2',
    type: 'word-of-the-day',
    title: 'Word 2',
    date: '2026-03-11T00:00:00.000Z',
  },
  {
    id: 'visual-1',
    type: 'visual-china',
    title: 'Visual 1',
    date: '2026-03-09T00:00:00.000Z',
  },
  {
    id: 'trend-1',
    type: 'trending',
    title: 'Trend 1',
    date: '2026-03-08T00:00:00.000Z',
  },
  {
    id: 'fact-1',
    type: 'did-you-know',
    title: 'Fact 1',
    date: '2026-03-07T00:00:00.000Z',
  },
];

test('getTimeZoneDateKey uses the requested timezone rather than local machine defaults', () => {
  assert.equal(
    getTimeZoneDateKey(new Date('2026-03-10T16:30:00.000Z'), 'Asia/Shanghai'),
    '2026-03-11',
  );

  assert.equal(
    getTimeZoneDateKey(new Date('2026-03-10T16:30:00.000Z'), 'UTC'),
    '2026-03-10',
  );
});

test('selectDailyQuickBites takes one per type when available and keeps type order stable', () => {
  const selected = selectDailyQuickBites(baseItems, {
    now: new Date('2026-03-11T01:00:00.000Z'),
    timeZone: 'Asia/Shanghai',
    maxItems: 4,
  });

  assert.deepEqual(selected.map((item) => item.id), [
    'word-2',
    'visual-1',
    'trend-1',
    'fact-1',
  ]);
});

test('selectDailyQuickBites rotates within a type across days and excludes future-dated entries', () => {
  const selectedDayOne = selectDailyQuickBites(baseItems, {
    now: new Date('2026-03-11T01:00:00.000Z'),
    timeZone: 'Asia/Shanghai',
    maxItems: 4,
  });

  const selectedDayTwo = selectDailyQuickBites(baseItems, {
    now: new Date('2026-03-12T01:00:00.000Z'),
    timeZone: 'Asia/Shanghai',
    maxItems: 4,
  });

  assert.equal(selectedDayOne[0].id, 'word-2');
  assert.equal(selectedDayTwo[0].id, 'word-1');

  const withFutureItem = selectDailyQuickBites(
    [
      ...baseItems,
      {
        id: 'future-word',
        type: 'word-of-the-day',
        title: 'Future Word',
        date: '2026-03-20T00:00:00.000Z',
      },
    ],
    {
      now: new Date('2026-03-12T01:00:00.000Z'),
      timeZone: 'Asia/Shanghai',
      maxItems: 4,
    },
  );

  assert.equal(withFutureItem.some((item) => item.id === 'future-word'), false);
});

test('selectDailyQuickBites backfills from remaining entries when some types are missing', () => {
  const selected = selectDailyQuickBites(
    [
      {
        id: 'word-1',
        type: 'word-of-the-day',
        title: 'Word 1',
        date: '2026-03-10T00:00:00.000Z',
      },
      {
        id: 'word-2',
        type: 'word-of-the-day',
        title: 'Word 2',
        date: '2026-03-11T00:00:00.000Z',
      },
      {
        id: 'word-3',
        type: 'word-of-the-day',
        title: 'Word 3',
        date: '2026-03-09T00:00:00.000Z',
      },
    ],
    {
      now: new Date('2026-03-11T01:00:00.000Z'),
      timeZone: 'Asia/Shanghai',
      maxItems: 4,
    },
  );

  assert.deepEqual(selected.map((item) => item.id), ['word-2', 'word-1', 'word-3']);
});
