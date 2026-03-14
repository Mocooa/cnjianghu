import type { APIRoute } from 'astro';
import {
  getDeepDiveUrl,
  getGlossaryUrl,
  getPublishedDeepDives,
  getPublishedGlossary,
  SITE_URL,
  toAbsoluteUrl,
} from '../utils/content';
import { pillars } from '../utils/pillars';

type SitemapItem = {
  url: string;
  lastmod?: string;
};

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function buildSitemapXml(items: SitemapItem[]): string {
  const urls = items
    .map((item) => {
      const lastmod = item.lastmod ? `<lastmod>${item.lastmod}</lastmod>` : '';
      return `<url><loc>${escapeXml(item.url)}</loc>${lastmod}</url>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
}

export const GET: APIRoute = async ({ site = new URL(SITE_URL) }) => {
  const [deepDives, glossaryEntries] = await Promise.all([
    getPublishedDeepDives(),
    getPublishedGlossary(),
  ]);

  const staticPages = [
    '/',
    '/about',
    '/explore',
    '/glossary',
    '/search',
    '/series',
    '/today',
    '/rss.xml',
    ...pillars.map((pillar) => `/explore/${pillar.slug}`),
    ...pillars.map((pillar) => `/rss/${pillar.slug}.xml`),
  ];

  const items: SitemapItem[] = [
    ...staticPages.map((pathname) => ({
      url: toAbsoluteUrl(pathname, site),
    })),
    ...deepDives.map((entry) => ({
      url: toAbsoluteUrl(getDeepDiveUrl(entry.id), site),
      lastmod: entry.data.date.toISOString(),
    })),
    ...glossaryEntries.map((entry) => ({
      url: toAbsoluteUrl(getGlossaryUrl(entry.id), site),
    })),
  ];

  return new Response(buildSitemapXml(items), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
