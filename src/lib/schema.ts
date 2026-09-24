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
