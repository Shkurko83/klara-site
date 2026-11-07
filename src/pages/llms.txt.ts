import type { APIRoute } from 'astro';
import { getArticles } from '../lib/articles';
import { APP, AUTHOR, SITE } from '../site.config';

export const GET: APIRoute = async ({ site }) => {
  const articles = await getArticles();
  const origin = site?.toString().replace(/\/$/, '') ?? '';
  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.description}`,
    '',
    `Сайт для родителей на русском языке. Автор: ${AUTHOR.name} (${AUTHOR.nameLatin}).`,
    `Приложение: «${APP.name}», в App Store также «${APP.alternateName}», Apple ID ${APP.appStoreId}.`,
    'Автор не логопед. При стойких трудностях речи и чтения нужна очная консультация специалиста.',
    '',
    '## Главное',
    `- [Главная](${origin}/): с чего начать обучение чтению по возрастам.`,
    `- [Приложение «${APP.name}»](${origin}/prilozhenie/): как устроены уроки, кабинет родителя, что бесплатно.`,
    `- [Константин Шкурко](${origin}/avtor/${AUTHOR.id}/): автор приложения и текстов.`,
    `- [Тест готовности к чтению](${origin}/instrumenty/gotovnost-k-chteniyu/)`,
    `- [Проверка техники чтения](${origin}/instrumenty/tehnika-chteniya/)`,
    `- [Материалы для печати](${origin}/materialy/)`,
    `- [Клара и друзья](${origin}/druzya-klary/)`,
    '',
    '## Статьи',
    ...articles.map((article) => `- [${article.data.title}](${origin}/stati/${article.id}/): ${article.data.summary}`),
    '',
    '## Полный текст',
    `- [llms-full.txt](${origin}/llms-full.txt)`,
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
