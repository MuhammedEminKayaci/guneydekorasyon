// Ürün kataloğu yardımcıları. Veri: src/data/catalog.json (scripts/build-catalog.mjs üretir).
import type { ImageMetadata } from 'astro';
import raw from '../data/catalog.json';
import { CATEGORIES, categoryHref, type Category, type SubCategory, type Leaf } from '../data/categories';

export type AttrKey = 'renk' | 'cinsiyet' | 'tip' | 'kol';

export interface Product {
  id: string;
  slug: string;
  name: string;
  code: string;
  /** Kategori yolu: [ana, alt?, tür?] */
  path: string[];
  images: string[];
  fit: 'contain' | 'cover';
  attrs: Partial<Record<AttrKey, string>>;
  specs?: [string, string][];
  order: number;
}

export const PRODUCTS = raw as Product[];

export const ATTR_LABELS: Record<AttrKey, string> = {
  renk: 'Renk',
  cinsiyet: 'Cinsiyet',
  tip: 'Tip',
  kol: 'Kol',
};

// Tüm ürün görselleri build sırasında Astro'nun görsel işleme hattına girer.
const imageModules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/urunler/**/*.{png,jpg,jpeg}',
  { eager: true },
);

export function productImage(path: string): ImageMetadata {
  const mod = imageModules[`/src/assets/images/${path}`];
  if (!mod) throw new Error(`Ürün görseli bulunamadı: ${path}`);
  return mod.default;
}

/** Yol öneki eşleşen ürünler (ör. ['mankenler'] tüm mankenler, ['mankenler','terzi-mankeni','kadin'] sadece o tür). */
export const productsIn = (prefix: string[]) =>
  PRODUCTS.filter((p) => prefix.every((seg, i) => p.path[i] === seg));

export const countIn = (prefix: string[]) => productsIn(prefix).length;

// ---- Kategori düğümleri ----------------------------------------------------

export interface CategoryNode {
  /** URL yolu, ör. ['mankenler','terzi-mankeni'] */
  path: string[];
  name: string;
  href: string;
  image: ImageMetadata;
  /** Doğrudan alt düğümler (filtrede "Kategori" seçenekleri) */
  children: { slug: string; name: string; href: string; image: ImageMetadata }[];
  /** Kökten bu düğüme kadar isimler (breadcrumb) */
  trail: { name: string; href: string }[];
  category: Category;
  sub?: SubCategory;
  leaf?: Leaf;
}

export function allCategoryNodes(): CategoryNode[] {
  const nodes: CategoryNode[] = [];
  for (const cat of CATEGORIES) {
    const catTrail = [{ name: cat.name, href: categoryHref(cat.slug) }];
    nodes.push({
      path: [cat.slug],
      name: cat.name,
      href: categoryHref(cat.slug),
      image: cat.image,
      children: cat.children.map((s) => ({
        slug: s.slug,
        name: s.name,
        href: categoryHref(cat.slug, s.slug),
        image: s.image,
      })),
      trail: catTrail,
      category: cat,
    });
    for (const sub of cat.children) {
      const subTrail = [...catTrail, { name: sub.name, href: categoryHref(cat.slug, sub.slug) }];
      nodes.push({
        path: [cat.slug, sub.slug],
        name: sub.name,
        href: categoryHref(cat.slug, sub.slug),
        image: sub.image,
        children: (sub.children ?? []).map((l) => ({
          slug: l.slug,
          name: leafFullName(sub, l),
          href: categoryHref(cat.slug, sub.slug, l.slug),
          image: l.image ?? sub.image,
        })),
        trail: subTrail,
        category: cat,
        sub,
      });
      for (const leaf of sub.children ?? []) {
        nodes.push({
          path: [cat.slug, sub.slug, leaf.slug],
          name: leafFullName(sub, leaf),
          href: categoryHref(cat.slug, sub.slug, leaf.slug),
          image: leaf.image ?? sub.image,
          children: [],
          trail: [...subTrail, { name: leafFullName(sub, leaf), href: categoryHref(cat.slug, sub.slug, leaf.slug) }],
          category: cat,
          sub,
          leaf,
        });
      }
    }
  }
  return nodes;
}

/** "Kadın" + "Terzi Mankeni" → "Kadın Terzi Mankeni" */
export const leafFullName = (sub: SubCategory, leaf: Leaf) => `${leaf.name} ${sub.name}`;

/** Ürünün bulunduğu en derin kategorinin adı (kart üst etiketi için) */
export function productCategoryName(p: Product): string {
  const cat = CATEGORIES.find((c) => c.slug === p.path[0]);
  const sub = cat?.children.find((s) => s.slug === p.path[1]);
  const leaf = sub?.children?.find((l) => l.slug === p.path[2]);
  if (sub && leaf) return leafFullName(sub, leaf);
  return sub?.name ?? cat?.name ?? '';
}

export const productHref = (p: Product) => `/urun/${p.slug}/`;

/** Benzer ürünler: aynı en derin kategori, önce aynı renk/tip/cinsiyet; yetmezse üst kategoriden tamamlanır. */
export function relatedProducts(p: Product, limit = 8): Product[] {
  const score = (q: Product) =>
    (['renk', 'tip', 'cinsiyet', 'kol'] as AttrKey[]).reduce((s, k) => s + (p.attrs[k] && q.attrs[k] === p.attrs[k] ? 1 : 0), 0);
  const picked: Product[] = [];
  for (let depth = p.path.length; depth >= 1 && picked.length < limit; depth--) {
    const pool = productsIn(p.path.slice(0, depth))
      .filter((q) => q.id !== p.id && !picked.includes(q))
      .sort((a, b) => score(b) - score(a) || Math.abs(a.order - p.order) - Math.abs(b.order - p.order));
    picked.push(...pool.slice(0, limit - picked.length));
  }
  return picked;
}

/** Aynı kategorideki önceki/sonraki ürün (katalog sırasına göre, uçlarda başa sarar) */
export function neighbours(p: Product): { prev: Product; next: Product } | undefined {
  const siblings = productsIn(p.path).sort((a, b) => a.order - b.order);
  if (siblings.length < 2) return undefined;
  const i = siblings.findIndex((q) => q.id === p.id);
  return { prev: siblings[(i - 1 + siblings.length) % siblings.length], next: siblings[(i + 1) % siblings.length] };
}
