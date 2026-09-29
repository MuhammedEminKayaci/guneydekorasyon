// Blog kategorileri. İçerik şeması (content.config.ts) ve blog sayfaları bu listeyi kullanır.
export const BLOG_CATEGORIES = [
  {
    slug: 'magaza-tasarimi',
    name: 'Mağaza tasarımı',
    description: 'Mağaza yerleşimi, dekorasyon fikirleri ve proje örnekleri.',
  },
  {
    slug: 'raf-ve-teshir',
    name: 'Raf ve teşhir',
    description: 'Raf sistemleri, orta üniteler ve teşhir çözümleri üzerine rehberler.',
  },
  {
    slug: 'manken',
    name: 'Manken',
    description: 'Terzi, plastik ve polyester manken seçimi ve kullanımı.',
  },
  {
    slug: 'aski',
    name: 'Askı',
    description: 'Ahşap, plastik, metal ve baskılı askı seçimi.',
  },
] as const;

export type BlogCategorySlug = (typeof BLOG_CATEGORIES)[number]['slug'];

export const blogCategory = (slug: string) => BLOG_CATEGORIES.find((c) => c.slug === slug)!;
