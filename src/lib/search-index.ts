// Tarayıcı tarafında kullanılan katalog verisi (/katalog.json): header araması, hızlı bakış, teklif listesi.
// Build sırasında üretilir; sayfalar ilk ihtiyaç anında indirir.
import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import { PRODUCTS, productImage, productCategoryName, productHref, allCategoryNodes, type AttrKey } from './catalog';
import { contentFor } from '../data/category-content';

export interface SearchCategory {
  name: string;
  /** Üst kategori yolu, ör. "Askılar › Ahşap Askı" */
  path: string;
  href: string;
  thumb: string;
  /** Aramada eşleşme için ek kelimeler */
  terms: string;
  count: number;
}

export interface CatalogProduct {
  id: string;
  name: string;
  code: string;
  /** Ürün sayfası */
  href: string;
  /** Kategori adı (en derin) */
  cat: string;
  /** Kategori sayfası */
  catHref: string;
  /** Kategori kısa açıklaması (hızlı bakış) */
  intro: string;
  thumb: string;
  images: string[];
  fit: 'contain' | 'cover';
  attrs: Partial<Record<AttrKey, string>>;
  specs?: [string, string][];
}

export interface CatalogData {
  categories: SearchCategory[];
  products: CatalogProduct[];
}

const thumb = async (image: ImageMetadata, fit: 'contain' | 'cover' = 'contain') =>
  (await getImage({ src: image, width: 160, height: 160, fit, background: '#ffffff', format: 'webp' })).src;
const large = async (image: ImageMetadata) => (await getImage({ src: image, width: 900, format: 'webp' })).src;

let cache: CatalogData | undefined;

export async function getCatalogData(): Promise<CatalogData> {
  if (cache) return cache;
  const nodes = allCategoryNodes();

  const categories: SearchCategory[] = [];
  for (const node of nodes) {
    const parentNames = node.trail.slice(0, -1).map((t) => t.name);
    categories.push({
      name: node.name,
      path: parentNames.length ? parentNames.join(' › ') : 'Kategori',
      href: node.href,
      thumb: await thumb(node.image),
      terms: [node.category.summary, ...node.children.map((c) => c.name)].join(' '),
      count: PRODUCTS.filter((p) => node.path.every((s, i) => p.path[i] === s)).length,
    });
  }

  const nodeByPath = new Map(nodes.map((n) => [n.path.join('/'), n]));
  const products: CatalogProduct[] = [];
  for (const p of PRODUCTS) {
    const node = nodeByPath.get(p.path.join('/'))!;
    const images = p.images.map(productImage);
    products.push({
      id: p.id,
      name: p.name,
      code: p.code,
      href: productHref(p),
      cat: productCategoryName(p),
      catHref: node.href,
      intro: contentFor(node.path, node.name).intro,
      thumb: await thumb(images[0], p.fit),
      images: await Promise.all(images.map(large)),
      fit: p.fit,
      attrs: p.attrs,
      ...(p.specs && { specs: p.specs }),
    });
  }

  cache = { categories, products };
  return cache;
}

export const POPULAR_SEARCHES = ['Terzi mankeni', 'Ahşap askı', 'Depo rafı', 'Polyester manken', 'Orta sistemi'];
