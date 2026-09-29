// Blog yardımcıları: yayınlanan yazılar, okuma süresi, benzer yazılar, tarih biçimi.
import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

export const POSTS_PER_PAGE = 9;

/** Taslak olmayan yazılar, yeniden eskiye */
export async function publishedPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export const postHref = (post: Post) => `/blog/${post.id}/`;

/** Türkçe eklemeli bir dil olduğundan kelime başına okuma daha yavaş: ≈170 kelime/dakika */
export const readingMinutes = (post: Post) =>
  Math.max(1, Math.round((post.body ?? '').split(/\s+/).filter(Boolean).length / 170));

const DATE_FORMAT = new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
export const formatDate = (d: Date) => DATE_FORMAT.format(d);

/** Benzer yazılar: önce aynı kategori, sonra en yeniler */
export function relatedPosts(post: Post, all: Post[], limit = 3): Post[] {
  const others = all.filter((p) => p.id !== post.id);
  const same = others.filter((p) => p.data.category === post.data.category);
  return [...same, ...others.filter((p) => !same.includes(p))].slice(0, limit);
}
