import { MetadataRoute } from 'next';

import { cms } from '~/cms';

const DOMAIN = 'https://exo.inc';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${DOMAIN}`,
      lastModified: new Date(),
    },
    {
      url: `${DOMAIN}/ai`,
      lastModified: new Date(),
    },
    {
      url: `${DOMAIN}/book-demo`,
      lastModified: new Date(),
    },
    {
      url: `${DOMAIN}/book-demo/thank-you`,
      lastModified: new Date(),
    },
    {
      url: `${DOMAIN}/careers`,
      lastModified: new Date(),
    },
    {
      url: `${DOMAIN}/contact`,
      lastModified: new Date(),
    },
    {
      url: `${DOMAIN}/cookie-policy`,
      lastModified: new Date(),
    },
    {
      url: `${DOMAIN}/exo-works`,
      lastModified: new Date(),
    },
    {
      url: `${DOMAIN}/exo-works/specs`,
      lastModified: new Date(),
    },
    {
      url: `${DOMAIN}/iris`,
      lastModified: new Date(),
    },
    {
      url: `${DOMAIN}/iris/demo`,
      lastModified: new Date(),
    },
    {
      url: `${DOMAIN}/iris/integrations`,
      lastModified: new Date(),
    },
    {
      url: `${DOMAIN}/iris/specs`,
      lastModified: new Date(),
    },
    {
      url: `${DOMAIN}/newsroom`,
      lastModified: new Date(),
    },
    {
      url: `${DOMAIN}/our-people`,
      lastModified: new Date(),
    },
    {
      url: `${DOMAIN}/our-vision`,
      lastModified: new Date(),
    },
    {
      url: `${DOMAIN}/privacy-policy`,
      lastModified: new Date(),
    },
    {
      url: `${DOMAIN}/resources`,
      lastModified: new Date(),
    },
    {
      url: `${DOMAIN}/social-policy`,
      lastModified: new Date(),
    },
    {
      url: `${DOMAIN}/technology`,
      lastModified: new Date(),
    },
  ];

  const articlePages: MetadataRoute.Sitemap = [];
  try {
    const articles = await cms().articleSlugs();
    articles.articleCollection?.items.forEach((article) => {
      const slug = article.slug;
      if (slug?.startsWith('https://') || slug?.startsWith('http://') || slug?.startsWith('://')) {
        return;
      }
      articlePages.push({
        url: `${DOMAIN}/article/${slug}`,
        lastModified: new Date(),
      });
    });
  } catch (error) {
    console.error(error);
  }

  const peoplePages: MetadataRoute.Sitemap = [];
  try {
    const people = await cms().personSlugs();
    people.personCollection?.items.forEach((person) => {
      peoplePages.push({
        url: `${DOMAIN}/our-people/${person.slug}`,
        lastModified: new Date(),
      });
    });
  } catch (error) {
    console.error(error);
  }

  return [...staticPages, ...peoplePages, ...articlePages];
}
