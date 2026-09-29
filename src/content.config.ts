import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { BLOG_CATEGORIES } from './data/blog-categories';

// Blog yazıları: src/content/blog/<slug>.md — dosya adı adres olur (/blog/<slug>/).
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(70),
      /** Google açıklaması (≈150 karakter) */
      description: z.string().min(80).max(165),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      category: z.enum(BLOG_CATEGORIES.map((c) => c.slug) as [string, ...string[]]),
      cover: image(),
      coverAlt: z.string(),
      /** Kapak mağaza fotoğrafıysa 'cover' (kırp), beyaz zeminli ürün görseliyse 'contain' (ortala) */
      coverFit: z.enum(['cover', 'contain']).default('cover'),
      /** Yazıyla ilgili ürün kategorisi yolu, ör. "mankenler/terzi-mankeni" */
      relatedCategory: z.string().optional(),
      /** Yazının sonunda gösterilecek ürünlerin katalog numaraları */
      products: z.array(z.string()).default([]),
      faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
