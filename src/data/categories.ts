// Kategori ağacı. Header mega menüsü, footer ve ana sayfa bu listeden beslenir.
// Ürünler 5. adımda content collection olarak eklenecek.
import type { ImageMetadata } from 'astro';
import manken from '../assets/images/anasayfa/kategoriler/kapak-1.png';
import raf from '../assets/images/anasayfa/kategoriler/kapak-2.png';
import aski from '../assets/images/anasayfa/kategoriler/kapak-3.png';
import stand from '../assets/images/anasayfa/kategoriler/kapak-4.png';
import orta from '../assets/images/anasayfa/kategoriler/kapak-5.png';

export interface SubCategory {
  slug: string;
  name: string;
  children?: { slug: string; name: string }[];
}

export interface Category {
  slug: string;
  name: string;
  summary: string;
  image: ImageMetadata;
  children: SubCategory[];
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
    children: [
      {
        slug: 'terzi-mankeni',
        name: 'Terzi Mankeni',
        children: [
          { slug: 'kadin', name: 'Kadın terzi mankeni' },
          { slug: 'erkek', name: 'Erkek terzi mankeni' },
        ],
      },
      { slug: 'plastik-manken', name: 'Plastik Manken' },
      {
        slug: 'polyester-manken',
        name: 'Polyester Manken',
        children: [
          { slug: 'kadin', name: 'Kadın polyester manken' },
          { slug: 'erkek', name: 'Erkek polyester manken' },
          { slug: 'cocuk', name: 'Çocuk polyester manken' },
        ],
      },
    ],
  },
  {
    slug: 'askilar',
    name: 'Askılar',
    summary: 'Ahşap, plastik ve metal askılar',
    image: aski,
    children: [
      {
        slug: 'ahsap-aski',
        name: 'Ahşap Askı',
        children: [
          { slug: 'klasik', name: 'Klasik ahşap askı' },
          { slug: 'ceket', name: 'Ceket askısı' },
          { slug: 'pantolon', name: 'Pantolon askısı' },
          { slug: 'bluz', name: 'Bluz askısı' },
          { slug: 'cocuk', name: 'Çocuk askısı' },
        ],
      },
      { slug: 'plastik-aski', name: 'Plastik Askı' },
      {
        slug: 'metal-aski',
        name: 'Metal Askı',
        children: [
          { slug: 'klasik', name: 'Klasik metal askı' },
          { slug: 'esarp', name: 'Eşarp askısı' },
          { slug: 'mayo', name: 'Mayo askısı' },
        ],
      },
      { slug: 'baskili-aski', name: 'Baskılı Askı' },
    ],
  },
];

export const categoryHref = (...slugs: string[]) => `/${slugs.join('/')}/`;
