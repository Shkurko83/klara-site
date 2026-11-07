import { getCollection, type CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'articles'>;

export async function getArticles() {
  const all = await getCollection('articles', ({ data }) => import.meta.env.DEV || !data.draft);
  return all.sort((a, b) => b.data.published.getTime() - a.data.published.getTime());
}

/** Похожие статьи: сначала указанные в related, затем из той же темы. */
export function relatedArticles(article: Article, all: Article[], limit = 3) {
  const picked = article.data.related
    .map((id) => all.find((item) => item.id === id))
    .filter((item): item is Article => Boolean(item));
  const sameCategory = all.filter(
    (item) => item.id !== article.id && item.data.category === article.data.category && !picked.includes(item),
  );
  const others = all.filter((item) => item.id !== article.id && !picked.includes(item) && !sameCategory.includes(item));
  return [...picked, ...sameCategory, ...others].slice(0, limit);
}

export function lastModified(article: Article) {
  return article.data.updated ?? article.data.published;
}
