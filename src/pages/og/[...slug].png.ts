import type { APIRoute } from 'astro';
import { getPublishedDeepDives } from '../../utils/content';
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
};

export async function getStaticPaths() {
  const articles = await getPublishedDeepDives();

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
        });

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
