import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getFeedEntriesForPillar, getEntryContentHtml, getEntryUrl, SITE_URL } from '../../utils/content';
import { pillars } from '../../utils/pillars';

export function getStaticPaths() {
  return pillars.map((pillar) => ({
    params: { pillar: pillar.slug },
    props: { pillar },
  }));
}

export const GET: APIRoute = async ({ props, site = new URL(SITE_URL) }) => {
  const pillar = props.pillar;
  const entries = await getFeedEntriesForPillar(pillar.slug);

  return rss({
    title: `cnjianghu — ${pillar.name}`,
    description: pillar.description,
    site,
    items: entries.map((entry) => ({
      title: entry.data.title,
      description: entry.data.summary,
      pubDate: entry.data.date,
      link: getEntryUrl(entry),
      content: getEntryContentHtml(entry),
      categories: [
        pillar.slug,
        ...(entry.data.tags ?? []),
        ...(entry.collection === 'quick-bites' ? [entry.data.type] : []),
      ],
    })),
    customData: '<language>en-us</language>',
  });
};
