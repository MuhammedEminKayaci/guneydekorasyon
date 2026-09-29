// Firma bilgileri tek yerde: header, footer, iletişim sayfası ve schema verisi buradan beslenir.

export const SITE = {
  url: 'https://guneydekorasyonraf.com',
  name: 'Güney Mağaza Dekorasyon',
  shortName: 'Güney Dekorasyon',
  description:
    'İstanbul Güngören’de mağaza raf sistemleri, orta sistemler, standlar, mankenler ve askılar. Tasarımdan montaja anahtar teslim mağaza dekorasyonu.',
  locale: 'tr_TR',
  lang: 'tr',
} as const;

// Google işletme kaydı (Güney Mağaza Dekorasyon, Güngören). CID = ftid 0x70869acda501e91'in ondalık hali.
const MAPS_CID = '506771149197155985';

export const CONTACT = {
  phones: [
    { label: 'Mobil', display: '+90 532 291 92 77', tel: '+905322919277' },
    { label: 'Mobil', display: '+90 538 341 40 94', tel: '+905383414094' },
    { label: 'Sabit', display: '+90 212 505 94 04', tel: '+902125059404' },
  ],
  whatsapp: '905322919277',
  email: 'guneydekorasyonraf@gmail.com',
  address: {
    street: 'Mehmet Nesih Özmen Mh., Mehmet Akif Cd., Sedir Sk. No:12-9',
    district: 'Güngören',
    city: 'İstanbul',
    postalCode: '34173',
    country: 'TR',
  },
  geo: { lat: 41.013544, lng: 28.8814898 } as { lat: number; lng: number } | null,
  map: {
    /** İşletme kaydını gösteren gömülü harita */
    embed: `https://www.google.com/maps?cid=${MAPS_CID}&hl=tr&output=embed`,
    /** Google Haritalar'da işletme sayfası */
    place: `https://www.google.com/maps?cid=${MAPS_CID}`,
    /** Yol tarifi */
    directions: 'https://www.google.com/maps/dir/?api=1&destination=41.013544,28.8814898',
  },
  // Google İşletme puanı (Haritalar'dan elle alındı, 29.09.2026). Değiştikçe güncelleyin.
  // Kendi sitesinde işaretlenen puanı Google yok saydığı için schema'ya eklenmez, sadece rozet olarak gösterilir.
  googleRating: { score: '5,0', count: 8 },
  hours: {
    label: 'Pzt–Cmt: 09.00–19.00',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '19:00',
  },
  // Sosyal medya hesabı yok; link eklenirse footer'da otomatik görünür
  social: {
    instagram: '',
    facebook: '',
    youtube: '',
  },
} as const;

/** Tek satır adres: "…Sedir Sk. No:12-9, 34173 Güngören/İstanbul" */
export const fullAddress = () =>
  `${CONTACT.address.street}, ${CONTACT.address.postalCode} ${CONTACT.address.district}/${CONTACT.address.city}`;

export const whatsappLink = (message?: string) =>
  `https://wa.me/${CONTACT.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
