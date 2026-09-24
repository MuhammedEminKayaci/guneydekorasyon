// Header aramasının öneri indeksi. Build sırasında üretilir, sayfaya JSON olarak gömülür.
// 5. adımda ürünler de bu indekse eklenecek.
import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import { CATEGORIES, categoryHref } from '../data/categories';

export interface SearchItem {
  name: string;
  /** Üst kategori yolu, ör. "Askılar › Ahşap Askı" */
  path: string;
  href: string;
  thumb: string;
  /** Aramada eşleşme için ek kelimeler */
  terms: string;
}

const thumb = async (image: ImageMetadata) =>
  (await getImage({ src: image, width: 96, height: 96, fit: 'contain', background: '#ffffff', format: 'webp' })).src;

let cache: SearchItem[] | undefined;

export async function getSearchIndex(): Promise<SearchItem[]> {
  if (cache) return cache;
  const items: SearchItem[] = [];

  for (const cat of CATEGORIES) {
    items.push({
      name: cat.name,
      path: 'Kategori',
      href: categoryHref(cat.slug),
      thumb: await thumb(cat.image),
      terms: cat.summary,
    });
    for (const sub of cat.children) {
      items.push({
        name: sub.name,
        path: cat.name,
        href: categoryHref(cat.slug, sub.slug),
        thumb: await thumb(sub.image),
        terms: `${cat.name} ${sub.children?.map((l) => l.name).join(' ') ?? ''}`,
      });
      for (const leaf of sub.children ?? []) {
        items.push({
          // "Kadın" tek başına anlamsız; "Kadın terzi mankeni" gibi tam ad üret
          name: `${leaf.name} ${sub.name.toLocaleLowerCase('tr')}`,
          path: `${cat.name} › ${sub.name}`,
          href: categoryHref(cat.slug, sub.slug, leaf.slug),
          thumb: await thumb(leaf.image ?? sub.image),
          terms: `${cat.name} ${sub.name}`,
        });
      }
    }
  }

  cache = items;
  return items;
}

export const POPULAR_SEARCHES = ['Terzi mankeni', 'Ahşap askı', 'Depo rafı', 'Polyester manken', 'Orta sistemi'];
