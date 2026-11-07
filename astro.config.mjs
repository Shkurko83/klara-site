import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';

// Адрес сайта задаётся переменной SITE_URL (см. .env.example), пока домена нет, используется заглушка.
const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const site = env.SITE_URL || 'https://example.ru';

export default defineConfig({
  site,
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/poisk/'),
      changefreq: 'weekly',
      priority: 0.7,
    }),
  ],
  image: {
    responsiveStyles: true,
  },
});
