// Kategori ağacı. Header (mega menü + arama önerileri), footer ve ana sayfa bu listeden beslenir.
// Ürünler 5. adımda content collection olarak eklenecek.
import type { ImageMetadata } from 'astro';

// Ana kategori kapakları (etiketleri temizlenmiş)
import manken from '../assets/images/anasayfa/kategoriler/kapak-1.png';
import raf from '../assets/images/anasayfa/kategoriler/kapak-2.png';
import aski from '../assets/images/anasayfa/kategoriler/kapak-3.png';
import stand from '../assets/images/anasayfa/kategoriler/kapak-4.png';
import orta from '../assets/images/anasayfa/kategoriler/kapak-5.png';

// Mega menü tanıtım panelleri (mağaza render'ları)
import promoRaf from '../assets/images/anasayfa/slider/8.jpg';
import promoManken from '../assets/images/anasayfa/slider/3.jpg';
import promoAski from '../assets/images/anasayfa/slider/5.jpg';

// Alt kategori görselleri
import depoRaf from '../assets/images/urunler/raf-sistemleri/depo/3.png';
import boruRaf from '../assets/images/urunler/raf-sistemleri/boru/silindir/1.png';
import raf40 from '../assets/images/urunler/raf-sistemleri/40x40/3.png';
import terziKadin from '../assets/images/urunler/mankenler/terzi/kadin/kollu/1.png';
import terziErkek from '../assets/images/urunler/mankenler/terzi/erkek/1.png';
import plastikManken from '../assets/images/urunler/mankenler/plastik/modeller/1.png';
import polyKadin from '../assets/images/urunler/mankenler/polyester/kadin/seri-1/1.png';
import polyErkek from '../assets/images/urunler/mankenler/polyester/erkek/seri-1/1.png';
import polyCocuk from '../assets/images/urunler/mankenler/polyester/cocuk/6.png';
import ahsapKlasik from '../assets/images/urunler/askilar/ahsap/klasik/2.png';
import ahsapCeket from '../assets/images/urunler/askilar/ahsap/ceket/1.png';
import ahsapPantolon from '../assets/images/urunler/askilar/ahsap/pantolon/1.png';
import ahsapBluz from '../assets/images/urunler/askilar/ahsap/bluz/1.png';
import ahsapCocuk from '../assets/images/urunler/askilar/ahsap/cocuk/1.png';
import plastikAski from '../assets/images/urunler/askilar/plastik/seri-1/1.png';
import metalKlasik from '../assets/images/urunler/askilar/metal/klasik/9001-292-temiz.png';
import metalEsarp from '../assets/images/urunler/askilar/metal/esarp/9101-321.jpg';
import metalMayo from '../assets/images/urunler/askilar/metal/mayo/9601-578-temiz.png';
import baskili from '../assets/images/urunler/askilar/baskili/1.png';

export interface Leaf {
  slug: string;
  name: string;
  image?: ImageMetadata;
}

export interface SubCategory {
  slug: string;
  name: string;
  image: ImageMetadata;
  /** Görsel bir mağaza fotoğrafıysa kutuyu doldurur; beyaz zeminli ürünse ortalanır. */
  photo?: boolean;
  children?: Leaf[];
}

export interface Category {
  slug: string;
  name: string;
  summary: string;
  image: ImageMetadata;
  promo?: ImageMetadata;
  children: SubCategory[];
}

export const CATEGORIES: Category[] = [
  {
    slug: 'raf-sistemleri',
    name: 'Raf Sistemleri',
    summary: 'Duvar, depo, boru ve 40×40 raf sistemleri',
    image: raf,
    promo: promoRaf,
    children: [
      { slug: 'depo-raf', name: 'Metal Depo Raf', image: depoRaf },
      { slug: 'boru-raf', name: 'Boru Raf Sistemi', image: boruRaf, photo: true },
      { slug: '40x40-raf', name: '40×40 Raf Sistemi', image: raf40, photo: true },
    ],
  },
  {
    slug: 'orta-sistemleri',
    name: 'Orta Sistemleri',
    summary: 'Mağaza ortası teşhir ve askılık üniteleri',
    image: orta,
    children: [],
  },
  {
    slug: 'standlar',
    name: 'Standlar',
    summary: 'Teşhir masaları ve ürün standları',
    image: stand,
    children: [],
  },
  {
    slug: 'mankenler',
    name: 'Mankenler',
    summary: 'Terzi, plastik ve polyester vitrin mankenleri',
    image: manken,
    promo: promoManken,
    children: [
      {
        slug: 'terzi-mankeni',
        name: 'Terzi Mankeni',
        image: terziKadin,
        children: [
          { slug: 'kadin', name: 'Kadın', image: terziKadin },
          { slug: 'erkek', name: 'Erkek', image: terziErkek },
        ],
      },
      { slug: 'plastik-manken', name: 'Plastik Manken', image: plastikManken },
      {
        slug: 'polyester-manken',
        name: 'Polyester Manken',
        image: polyKadin,
        children: [
          { slug: 'kadin', name: 'Kadın', image: polyKadin },
          { slug: 'erkek', name: 'Erkek', image: polyErkek },
          { slug: 'cocuk', name: 'Çocuk', image: polyCocuk },
        ],
      },
    ],
  },
  {
    slug: 'askilar',
    name: 'Askılar',
    summary: 'Ahşap, plastik, metal ve baskılı askılar',
    image: aski,
    promo: promoAski,
    children: [
      {
        slug: 'ahsap-aski',
        name: 'Ahşap Askı',
        image: ahsapKlasik,
        children: [
          { slug: 'klasik', name: 'Klasik', image: ahsapKlasik },
          { slug: 'ceket', name: 'Ceket', image: ahsapCeket },
          { slug: 'pantolon', name: 'Pantolon', image: ahsapPantolon },
          { slug: 'bluz', name: 'Bluz', image: ahsapBluz },
          { slug: 'cocuk', name: 'Çocuk', image: ahsapCocuk },
        ],
      },
      { slug: 'plastik-aski', name: 'Plastik Askı', image: plastikAski },
      {
        slug: 'metal-aski',
        name: 'Metal Askı',
        image: metalEsarp,
        children: [
          { slug: 'klasik', name: 'Klasik', image: metalKlasik },
          { slug: 'esarp', name: 'Eşarp', image: metalEsarp },
          { slug: 'mayo', name: 'Mayo', image: metalMayo },
        ],
      },
      { slug: 'baskili-aski', name: 'Baskılı Askı', image: baskili },
    ],
  },
];

export const categoryHref = (...slugs: string[]) => `/${slugs.join('/')}/`;
