import { SITE_URL } from './content';

type CampaignParams = {
  source: string;
  medium: string;
  campaign: string;
  content?: string;
};

type XShareOptions = {
  text: string;
  url: string;
  via?: string;
};

type RedditShareOptions = {
  title: string;
  url: string;
};

export function buildTrackedUrl(
  pathnameOrUrl: string,
  params: CampaignParams,
  site: string | URL = SITE_URL,
): string {
  const url = pathnameOrUrl.startsWith('http')
    ? new URL(pathnameOrUrl)
    : new URL(pathnameOrUrl, site);

  url.searchParams.set('utm_source', params.source);
  url.searchParams.set('utm_medium', params.medium);
  url.searchParams.set('utm_campaign', params.campaign);

  if (params.content) {
    url.searchParams.set('utm_content', params.content);
  }

  return url.toString();
}

export function buildXShareUrl(options: XShareOptions): string {
  const url = new URL('https://x.com/intent/post');
  url.searchParams.set('text', options.text);
  url.searchParams.set('url', options.url);

  if (options.via) {
    url.searchParams.set('via', options.via);
  }

  return url.toString();
}

export function buildRedditShareUrl(options: RedditShareOptions): string {
  const url = new URL('https://www.reddit.com/submit');
  url.searchParams.set('url', options.url);
  url.searchParams.set('title', options.title);
  return url.toString();
}
