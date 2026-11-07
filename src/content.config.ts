import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const characters = [
  'klara', 'zoya', 'oscar', 'leo', 'kate',
  'rufus', 'effie', 'leka', 'luka', 'jinnandnight', 'grokh', 'bur', 'lu', 'millyandminny', 'sasha', 'dub',
  'blink', 'neyron', 'pixel', 'flora',
] as const;

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string().max(90),
    /** Описание для поиска и превью ссылок, до 160 символов. */
    description: z.string().min(70).max(170),
    /** Короткий прямой ответ в начале статьи. Его же берут поисковики и AI-ассистенты. */
    summary: z.string(),
    category: z.enum(['chtenie', 'rech', 'shkola', 'pismo', 'schet', 'zanyatiya']),
    age: z.string(),
    character: z.enum(characters),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    author: z.string().default('konstantin-shkurko'),
    /** Специалист, который проверил статью. */
    reviewedBy: z.string().optional(),
    keywords: z.array(z.string()).default([]),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    /** Как с этим помогает приложение. Показывается в конце статьи. */
    appTip: z.string().optional(),
    related: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
