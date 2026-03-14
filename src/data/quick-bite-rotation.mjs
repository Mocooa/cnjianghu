export const quickBiteTypeOrder = [
  'word-of-the-day',
  'visual-china',
  'trending',
  'did-you-know',
];

export const quickBiteTypeLabels = {
  'word-of-the-day': 'Word of the Day',
  'visual-china': 'Visual China',
  'trending': 'Trending Now',
  'did-you-know': 'Did You Know',
};

export const quickBiteTypeColors = {
  'word-of-the-day': 'vermilion',
  'visual-china': 'gold',
  'trending': 'azure',
  'did-you-know': 'jade',
};

function toDate(value) {
  return value instanceof Date ? value : new Date(value);
}

function formatDateParts(date, timeZone) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const parts = formatter.formatToParts(toDate(date));
  const year = parts.find((part) => part.type === 'year')?.value;
  const month = parts.find((part) => part.type === 'month')?.value;
  const day = parts.find((part) => part.type === 'day')?.value;

  return { year, month, day };
}

function dateKeyToDayNumber(dateKey) {
  const [year, month, day] = dateKey.split('-').map(Number);
  return Math.floor(Date.UTC(year, month - 1, day) / 86_400_000);
}

function getEntryDate(entry) {
  return entry.date ?? entry.data?.date;
}

function compareByDateDesc(a, b) {
  const delta = toDate(getEntryDate(b)).getTime() - toDate(getEntryDate(a)).getTime();
  if (delta !== 0) {
    return delta;
  }

  return (a.id ?? a.title ?? '').localeCompare(b.id ?? b.title ?? '');
}

function reorderForToday(entries, todayKey, timeZone) {
  if (entries.length <= 1) {
    return [...entries];
  }

  const sorted = [...entries].sort(compareByDateDesc);
  const anchorKey = getTimeZoneDateKey(getEntryDate(sorted[0]), timeZone);
  const offset = Math.max(0, dateKeyToDayNumber(todayKey) - dateKeyToDayNumber(anchorKey));
  const start = offset % sorted.length;

  return [...sorted.slice(start), ...sorted.slice(0, start)];
}

export function getTimeZoneDateKey(date, timeZone = 'Asia/Shanghai') {
  const { year, month, day } = formatDateParts(date, timeZone);
  return `${year}-${month}-${day}`;
}

export function serializeQuickBiteEntry(entry) {
  return {
    id: entry.id,
    title: entry.data.title,
    summary: entry.data.summary,
    type: entry.data.type,
    date: entry.data.date.toISOString(),
    chineseTerm: entry.data.chinese_term ?? null,
    pinyin: entry.data.pinyin ?? null,
  };
}

export function selectDailyQuickBites(entries, { now = new Date(), timeZone = 'Asia/Shanghai', maxItems = 4 } = {}) {
  const todayKey = getTimeZoneDateKey(now, timeZone);
  const published = entries
    .filter((entry) => {
      const entryDate = getEntryDate(entry);
      return entryDate && getTimeZoneDateKey(entryDate, timeZone) <= todayKey;
    })
    .sort(compareByDateDesc);

  const selected = [];
  const selectedIds = new Set();

  for (const type of quickBiteTypeOrder) {
    const bucket = published.filter((entry) => entry.type === type);
    if (bucket.length === 0) {
      continue;
    }

    const pick = reorderForToday(bucket, todayKey, timeZone)[0];
    if (!pick || selectedIds.has(pick.id)) {
      continue;
    }

    selected.push(pick);
    selectedIds.add(pick.id);

    if (selected.length >= maxItems) {
      return selected;
    }
  }

  for (const entry of published) {
    if (selectedIds.has(entry.id)) {
      continue;
    }

    selected.push(entry);
    selectedIds.add(entry.id);

    if (selected.length >= maxItems) {
      break;
    }
  }

  return selected;
}
