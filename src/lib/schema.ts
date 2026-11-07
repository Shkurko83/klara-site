// Разметка schema.org в JSON-LD. Её читают Яндекс, Google и AI-поисковики.
import { APP, AUTHOR, SITE, appStoreUrl } from '../site.config';

export function absolute(path: string, site: URL | undefined) {
  return new URL(path, site).toString();
}

export function organizationId(site: URL | undefined) {
  return absolute('/#organization', site);
}

export function authorId(site: URL | undefined) {
  return absolute(`/avtor/${AUTHOR.id}/#person`, site);
}

export function appId(site: URL | undefined) {
  return absolute('/prilozhenie/#app', site);
}

export function personSchema(site: URL | undefined) {
  return {
    '@type': 'Person',
    '@id': authorId(site),
    name: AUTHOR.name,
    alternateName: [AUTHOR.nameLatin, 'Шкурко Константин', 'Shkurko Konstantin'],
    jobTitle: AUTHOR.role,
    description: AUTHOR.bio,
    url: absolute(`/avtor/${AUTHOR.id}/`, site),
    image: absolute('/og-default.png', site),
    sameAs: [AUTHOR.github, appStoreUrl('author')],
    knowsAbout: ['обучение чтению', 'подготовка к школе', 'приложения для детей', 'разработка iOS-приложений'],
  };
}

export function organizationSchema(site: URL | undefined) {
  return {
    '@type': 'Organization',
    '@id': organizationId(site),
    name: SITE.name,
    alternateName: APP.name,
    url: absolute('/', site),
    logo: { '@type': 'ImageObject', url: absolute('/logo-512.png', site), width: 512, height: 512 },
    founder: { '@id': authorId(site) },
    sameAs: [appStoreUrl('organization')],
  };
}

export function appSchema(site: URL | undefined) {
  return {
    '@type': 'MobileApplication',
    '@id': appId(site),
    name: APP.name,
    alternateName: APP.alternateName,
    operatingSystem: 'iOS',
    applicationCategory: 'EducationalApplication',
    inLanguage: 'ru',
    url: absolute('/prilozhenie/', site),
    downloadUrl: appStoreUrl('schema'),
    installUrl: appStoreUrl('schema'),
    image: absolute('/logo-512.png', site),
    description:
      'Приложение для детей 3-7 лет: буквы, слоги, слова и предложения, письмо, счёт и логика. Голос Клары, награды за уроки и кабинет для родителей с отчётами о каждом ребёнке.',
    audience: { '@type': 'PeopleAudience', suggestedMinAge: 3, suggestedMaxAge: 7 },
    author: { '@id': authorId(site) },
    publisher: { '@id': organizationId(site) },
    offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD', description: 'Бесплатная загрузка, первые уроки бесплатно, полный доступ по подписке' },
  };
}

export function websiteSchema(site: URL | undefined) {
  return {
    '@type': 'WebSite',
    '@id': absolute('/#website', site),
    name: SITE.name,
    alternateName: [APP.name, 'Учимся читать с Кларой'],
    url: absolute('/', site),
    inLanguage: 'ru-RU',
    publisher: { '@id': organizationId(site) },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: absolute('/poisk/?q={search_term_string}', site) },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[], site: URL | undefined) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absolute(item.path, site),
    })),
  };
}

export function faqSchema(faq: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function graph(...nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
