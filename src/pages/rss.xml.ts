import rss from '@astrojs/rss';
import { getArticles } from '../lib/articles';
import { SITE } from '../site.config';

export async function GET(context: { site?: URL }) {
  const articles = await getArticles();
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site!,
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.updated ?? article.data.published,
      link: `/stati/${article.id}/`,
    })),
    customData: '<language>ru</language>',
  });
}
