import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getAllFeedEntries, getEntryContentHtml, getEntryUrl, SITE_URL } from '../utils/content';

export const GET: APIRoute = async ({ site = new URL(SITE_URL) }) => {
  const entries = await getAllFeedEntries();

  return rss({
    title: 'cnjianghu',
    description: 'Deep dives, quick bites, and cultural notes for readers exploring China from the inside.',
    site,
    items: entries.map((entry) => ({
      title: entry.data.title,
      description: entry.data.summary,
      pubDate: entry.data.date,
      link: getEntryUrl(entry),
      content: getEntryContentHtml(entry),
      categories: [
        entry.data.pillar,
        ...(entry.data.tags ?? []),
        ...(entry.collection === 'quick-bites' ? [entry.data.type] : []),
      ],
    })),
    customData: '<language>en-us</language>',
  });
};
