// Referans projeler. Kaynak: eski sitenin projeler sayfası.
// Aynı projenin farklı görselleri tek projede galeri olarak birleştirildi.
// TODO: "Afrika" ve "Fransa" konumları ile proje adları firmadan teyit edilmeli.
import type { ImageMetadata } from 'astro';
import p1 from '../assets/images/anasayfa/slider/1.jpg';
import p2 from '../assets/images/anasayfa/slider/2.jpg';
import p3 from '../assets/images/anasayfa/slider/3.jpg';
import p4 from '../assets/images/anasayfa/slider/4.jpg';
import p5 from '../assets/images/anasayfa/slider/5.jpg';
import p6 from '../assets/images/anasayfa/slider/6.jpg';
import p7 from '../assets/images/anasayfa/slider/7.jpg';
import p8 from '../assets/images/anasayfa/slider/8.jpg';
import p9 from '../assets/images/anasayfa/slider/9.jpg';
import p10 from '../assets/images/anasayfa/slider/10.jpg';
import p11 from '../assets/images/anasayfa/slider/11.jpg';
import p12 from '../assets/images/anasayfa/slider/12.jpg';
import p13 from '../assets/images/anasayfa/slider/13.jpg';
import p15 from '../assets/images/anasayfa/slider/15.jpg';
import p16 from '../assets/images/anasayfa/slider/16.jpg';

export interface Project {
  slug: string;
  title: string;
  type: string;
  location: string;
  year: string;
  summary: string;
  images: ImageMetadata[];
}

export const PROJECTS: Project[] = [
  {
    slug: 'dekohop-taksim',
    title: 'Dekohop Taksim',
    type: 'Aksesuar mağazası',
    location: 'Taksim, İstanbul',
    year: '2025',
    summary: 'Motosiklet aksesuarları için yoğun kullanıma uygun, modüler metal raf sistemi.',
    images: [p1],
  },
  {
    slug: 'perpa-dekohop',
    title: 'Perpa DekoHop',
    type: 'Aksesuar mağazası',
    location: 'Perpa, İstanbul',
    year: '2024',
    summary: 'Beyaz duvar raf sistemi, ızgara panel ve kanca kombinasyonuyla aksesuar mağazası.',
    images: [p11, p12, p15],
  },
  {
    slug: 'converse',
    title: 'Converse mağazası',
    type: 'Ayakkabı mağazası',
    location: 'Afrika',
    year: '2024',
    summary: 'Hızlı kurulum ve yüksek taşıma kapasitesine sahip ayakkabı teşhir duvarı.',
    images: [p2],
  },
  {
    slug: 'aly-butik',
    title: 'Aly Butik',
    type: 'Butik',
    location: 'Fransa',
    year: '2025',
    summary: 'Altın rengi kemerli askılık sistemi ve sezonluk kampanyalara uygun esnek teşhir.',
    images: [p3],
  },
  {
    slug: 'king-at-ciftligi',
    title: 'King At Çiftliği',
    type: 'Binicilik aksesuarları mağazası',
    location: 'Arnavutköy, İstanbul',
    year: '2023',
    summary: 'Ahşap raflı duvar sistemi ve ızgara panellerle şık, dikkat çekici bir sunum.',
    images: [p4],
  },
  {
    slug: 'kuzenler-ic-giyim',
    title: 'Kuzenler İç Giyim',
    type: 'İç giyim mağazası',
    location: 'Güngören, İstanbul',
    year: '2025',
    summary: 'Duvar raf sistemi ve teşhir alanlarıyla iç giyim mağazası.',
    images: [p8],
  },
  {
    slug: 'erkek-butik-sariyer',
    title: 'Erkek butik mağazası',
    type: 'Butik',
    location: 'Sarıyer, İstanbul',
    year: '2023',
    summary: 'Teşhir masaları ve duvar askılıklarıyla erkek giyim butiği.',
    images: [p9, p10],
  },
  {
    slug: 'bayan-butik-ucyuzlu',
    title: 'Bayan butik mağazası',
    type: 'Butik',
    location: 'Üçyüzlü, İstanbul',
    year: '2023',
    summary: 'Altın çerçeveli duvar askılık üniteleriyle kadın giyim butiği.',
    images: [p13],
  },
  {
    slug: 'model-denim',
    title: 'Model Denim',
    type: 'Butik',
    location: 'Ankara',
    year: '2024',
    summary: 'Siyah metal askılık ve orta sistemlerle denim mağazası.',
    images: [p16],
  },
  {
    slug: 'metal-ahsap-hibrit',
    title: 'Metal ve ahşap hibrit',
    type: 'Özel üretim',
    location: 'İzmir',
    year: '2024',
    summary: 'Markaya özel metal ve ahşap malzeme kombinleri.',
    images: [p5],
  },
  {
    slug: 'giyim-duvar-raflari',
    title: 'Giyim duvar rafları',
    type: 'Raf sistemleri',
    location: 'Adana',
    year: '2023',
    summary: 'Fonksiyonel ve modüler duvar raf sistemi.',
    images: [p6],
  },
  {
    slug: 'aksesuar-standlari',
    title: 'Aksesuar standları',
    type: 'Stand',
    location: 'Trabzon',
    year: '2025',
    summary: 'Modüler kanca ve raf kombinli aksesuar standları.',
    images: [p7],
  },
];
