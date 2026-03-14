import { getCollection, type CollectionEntry } from 'astro:content';

export const SITE_URL = 'https://cnjianghu.vercel.app';

export type DeepDiveEntry = CollectionEntry<'deep-dives'>;
export type QuickBiteEntry = CollectionEntry<'quick-bites'>;
export type GlossaryEntry = CollectionEntry<'glossary'>;
export type FeedEntry = DeepDiveEntry | QuickBiteEntry;

function sortByDateDesc<T extends { data: { date: Date } }>(entries: T[]): T[] {
  return [...entries].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function renderQuickBiteFallback(entry: QuickBiteEntry): string {
  const term = entry.data.chinese_term
    ? `<p><strong>${escapeHtml(entry.data.chinese_term)}</strong>${entry.data.pinyin ? ` <em>${escapeHtml(entry.data.pinyin)}</em>` : ''}</p>`
    : '';

  return `${term}<p>${escapeHtml(entry.data.summary)}</p>`;
}

export async function getPublishedDeepDives(): Promise<DeepDiveEntry[]> {
  const entries = await getCollection('deep-dives', ({ data }) => !data.draft);
  return sortByDateDesc(entries);
}

export async function getPublishedQuickBites(): Promise<QuickBiteEntry[]> {
  const entries = await getCollection('quick-bites', ({ data }) => !data.draft);
  return sortByDateDesc(entries);
}

export async function getPublishedGlossary(): Promise<GlossaryEntry[]> {
  const entries = await getCollection('glossary', ({ data }) => !data.draft);
  return [...entries].sort((a, b) => a.data.title.localeCompare(b.data.title));
}

export async function getAllFeedEntries(): Promise<FeedEntry[]> {
  const [deepDives, quickBites] = await Promise.all([
    getPublishedDeepDives(),
    getPublishedQuickBites(),
  ]);

  return sortByDateDesc([...deepDives, ...quickBites]);
}

export async function getFeedEntriesForPillar(pillar: string): Promise<FeedEntry[]> {
  const entries = await getAllFeedEntries();
  return entries.filter((entry) => entry.data.pillar === pillar);
}

export function getDeepDiveUrl(slug: string): string {
  return `/read/${slug}`;
}

export function getQuickBiteUrl(slug: string): string {
  return `/today#${slug}`;
}

export function getGlossaryUrl(slug: string): string {
  return `/glossary/${slug}`;
}

export function getEntryUrl(entry: FeedEntry | GlossaryEntry): string {
  if (entry.collection === 'deep-dives') {
    return getDeepDiveUrl(entry.id);
  }

  if (entry.collection === 'quick-bites') {
    return getQuickBiteUrl(entry.id);
  }

  return getGlossaryUrl(entry.id);
}

export function getEntryContentHtml(entry: FeedEntry): string {
  if (entry.rendered?.html) {
    return entry.rendered.html;
  }

  if (entry.collection === 'quick-bites') {
    return renderQuickBiteFallback(entry);
  }

  return `<p>${escapeHtml(entry.data.summary)}</p>`;
}

export function toAbsoluteUrl(pathname: string, site: URL | string = SITE_URL): string {
  return new URL(pathname, site).toString();
}
