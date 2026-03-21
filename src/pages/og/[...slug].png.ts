import type { APIRoute } from 'astro';
import { getPublishedDeepDives, getPublishedQuickBites } from '../../utils/content';
import { renderArticleOgImage, renderSiteOgImage } from '../../utils/og';

type SiteOgProps = {
  kind: 'site';
};

type ArticleOgProps = {
  kind: 'article';
  title: string;
  summary: string;
  subtitle?: string;
  pillar: string;
  date: string;
  contentType?: string;
};

const quickBiteTypeLabels: Record<string, string> = {
  'word-of-the-day': 'Word of the Day',
  'visual-china': 'Visual China',
  'trending': 'Trending Now',
  'did-you-know': 'Did You Know',
};

export async function getStaticPaths() {
  const [articles, quickBites] = await Promise.all([
    getPublishedDeepDives(),
    getPublishedQuickBites(),
  ]);

  return [
    {
      params: { slug: 'site' },
      props: { kind: 'site' satisfies SiteOgProps['kind'] },
    },
    ...articles.map((article) => ({
      params: { slug: `read/${article.id}` },
      props: {
        kind: 'article' satisfies ArticleOgProps['kind'],
        title: article.data.title,
        summary: article.data.summary,
        subtitle: article.data.subtitle,
        pillar: article.data.pillar,
        date: article.data.date.toISOString(),
      },
    })),
    ...quickBites.map((bite) => ({
      params: { slug: `quick-bites/${bite.id}` },
      props: {
        kind: 'article' satisfies ArticleOgProps['kind'],
        title: bite.data.chinese_term
          ? `${bite.data.chinese_term} — ${bite.data.title}`
          : bite.data.title,
        summary: bite.data.summary,
        pillar: bite.data.pillar,
        date: bite.data.date.toISOString(),
        contentType: quickBiteTypeLabels[bite.data.type] ?? 'Quick Bite',
      },
    })),
  ];
}

export const GET: APIRoute = async ({ props }) => {
  const png =
    props.kind === 'site'
      ? renderSiteOgImage()
      : renderArticleOgImage({
          title: props.title,
          summary: props.summary,
          subtitle: props.subtitle,
          pillar: props.pillar,
          date: props.date,
          contentType: props.contentType,
        });

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
