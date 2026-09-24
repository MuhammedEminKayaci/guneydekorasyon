// Ana kategoriler. Header, footer ve ana sayfa bu listeden beslenir.
// Alt kategoriler ve ürünler 5. adımda content collection olarak eklenecek.
import type { ImageMetadata } from 'astro';
import manken from '../assets/images/anasayfa/kategoriler/kapak-1.png';
import raf from '../assets/images/anasayfa/kategoriler/kapak-2.png';
import aski from '../assets/images/anasayfa/kategoriler/kapak-3.png';
import stand from '../assets/images/anasayfa/kategoriler/kapak-4.png';
import orta from '../assets/images/anasayfa/kategoriler/kapak-5.png';

export interface Category {
  slug: string;
  name: string;
  summary: string;
  image: ImageMetadata;
  children: { slug: string; name: string }[];
}

export const CATEGORIES: Category[] = [
  {
    slug: 'raf-sistemleri',
    name: 'Raf Sistemleri',
    summary: 'Duvar, depo, boru ve 40×40 raf sistemleri',
    image: raf,
    children: [
      { slug: 'depo-raf', name: 'Metal Depo Raf' },
      { slug: 'boru-raf', name: 'Boru Raf Sistemi' },
      { slug: '40x40-raf', name: '40×40 Raf Sistemi' },
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
    slug: 'mankenler',
    name: 'Mankenler',
    summary: 'Terzi, plastik ve polyester vitrin mankenleri',
    image: manken,
    children: [
      { slug: 'terzi-mankeni', name: 'Terzi Mankeni' },
      { slug: 'plastik-manken', name: 'Plastik Manken' },
      { slug: 'polyester-manken', name: 'Polyester Manken' },
    ],
  },
  {
    slug: 'standlar',
    name: 'Standlar',
    summary: 'Teşhir masaları ve ürün standları',
    image: stand,
    children: [],
  },
  {
    slug: 'askilar',
    name: 'Askılar',
    summary: 'Ahşap, plastik ve metal askılar',
    image: aski,
    children: [
      { slug: 'ahsap-aski', name: 'Ahşap Askı' },
      { slug: 'plastik-aski', name: 'Plastik Askı' },
      { slug: 'metal-aski', name: 'Metal Askı' },
    ],
  },
];

export const categoryHref = (slug: string, child?: string) => `/${slug}/${child ? `${child}/` : ''}`;
