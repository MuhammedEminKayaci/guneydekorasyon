// Firma bilgileri tek yerde: header, footer, iletişim sayfası ve schema verisi buradan beslenir.
// TODO: domain, açık adres ve koordinatlar firmadan teyit edilecek.

export const SITE = {
  url: 'https://www.guneymagazadekorasyon.com', // TODO: gerçek domain
  name: 'Güney Mağaza Dekorasyon',
  shortName: 'Güney Dekorasyon',
  description:
    'İstanbul Güngören’de mağaza raf sistemleri, orta sistemler, standlar, mankenler ve askılar. Tasarımdan montaja anahtar teslim mağaza dekorasyonu.',
  locale: 'tr_TR',
  lang: 'tr',
} as const;

export const CONTACT = {
  phones: [
    { label: 'Mobil', display: '+90 532 291 92 77', tel: '+905322919277' },
    { label: 'Mobil', display: '+90 538 341 40 94', tel: '+905383414094' },
    { label: 'Sabit', display: '+90 212 505 94 04', tel: '+902125059404' },
  ],
  whatsapp: '905322919277',
  email: 'guneydekorasyonraf@gmail.com',
  address: {
    street: '', // TODO: açık adres
    district: 'Güngören',
    city: 'İstanbul',
    postalCode: '',
    country: 'TR',
  },
  geo: null as { lat: number; lng: number } | null, // TODO: dükkan koordinatları
  hours: {
    label: 'Pzt–Cmt: 09.00–19.00',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '19:00',
  },
  social: {
    instagram: '', // TODO: hesap linkleri
    facebook: '',
    youtube: '',
  },
} as const;

export const whatsappLink = (message?: string) =>
  `https://wa.me/${CONTACT.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
