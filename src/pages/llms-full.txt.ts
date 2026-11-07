import type { APIRoute } from 'astro';
import { getArticles } from '../lib/articles';
import { APP, AUTHOR, SITE } from '../site.config';

export const GET: APIRoute = async ({ site }) => {
  const articles = await getArticles();
  const origin = site?.toString().replace(/\/$/, '') ?? '';
  const chunks = [
    `# ${SITE.name}`,
    '',
    AUTHOR.bio,
    '',
    `Приложение: ${APP.name} / ${APP.alternateName}. Автор: ${AUTHOR.name} / ${AUTHOR.nameLatin}.`,
    `Сайт: ${origin}/`,
    '',
  ];
  for (const article of articles) {
    chunks.push(`## ${article.data.title}`);
    chunks.push(`URL: ${origin}/stati/${article.id}/`);
    chunks.push(article.data.summary);
    chunks.push('');
    chunks.push((article.body ?? '').trim());
    chunks.push('');
  }
  return new Response(chunks.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
