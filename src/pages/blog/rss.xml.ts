import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { publishedPosts, postHref } from '../../lib/blog';
import { blogCategory } from '../../data/blog-categories';
import { SITE } from '../../config/site';

export const GET: APIRoute = async ({ site }) =>
  rss({
    title: `${SITE.name} Blog`,
    description: 'Mağaza dekorasyonu, raf sistemleri, manken ve askı seçimi üzerine rehberler.',
    site: site ?? SITE.url,
    items: (await publishedPosts()).map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: postHref(post),
      categories: [blogCategory(post.data.category).name],
    })),
    customData: '<language>tr-TR</language>',
  });
