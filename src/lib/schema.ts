// schema.org yapısal veri üreticileri (Google zengin sonuçları için).
import { CONTACT, SITE } from '../config/site';

export const localBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Store',
  '@id': `${SITE.url}/#firma`,
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  logo: `${SITE.url}/logo.png`,
  telephone: CONTACT.phones[0].tel,
  email: CONTACT.email,
  address: {
    '@type': 'PostalAddress',
    // Boş alanlar undefined olur ve JSON'a hiç yazılmaz.
    streetAddress: CONTACT.address.street || undefined,
    addressLocality: CONTACT.address.district,
    addressRegion: CONTACT.address.city,
    postalCode: CONTACT.address.postalCode || undefined,
    addressCountry: CONTACT.address.country,
  },
  ...(CONTACT.geo && {
    geo: { '@type': 'GeoCoordinates', latitude: CONTACT.geo.lat, longitude: CONTACT.geo.lng },
  }),
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: CONTACT.hours.days,
    opens: CONTACT.hours.opens,
    closes: CONTACT.hours.closes,
  },
  sameAs: Object.values(CONTACT.social).filter(Boolean),
});

export const faqSchema = (items: readonly { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: new URL(item.path, SITE.url).href,
  })),
});

/**
 * Ürün yapısal verisi. Fiyat sitede yayınlanmadığı için Offer eklenmez (uydurma fiyat vermemek için);
 * ürün özellikleri additionalProperty olarak verilir.
 */
export const productSchema = (p: {
  name: string;
  code: string;
  description: string;
  url: string;
  images: string[];
  category: string;
  color?: string;
  /** Sadece firmanın kendi ürettiği ürünlerde (tedarik ürünlerinde marka Güney değildir) */
  brand?: string;
  properties: [string, string][];
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  '@id': `${p.url}#urun`,
  name: p.name,
  sku: p.code,
  description: p.description,
  url: p.url,
  image: p.images,
  category: p.category,
  ...(p.color && { color: p.color }),
  ...(p.brand && { brand: { '@type': 'Brand', name: p.brand } }),
  additionalProperty: p.properties.map(([name, value]) => ({ '@type': 'PropertyValue', name, value })),
});
