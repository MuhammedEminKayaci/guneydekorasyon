// Ana sayfa içeriği. Metinler eski siteden alındı, kopukluklar düzeltildi.
// Görseller: aynı fotoğraf sayfada iki kez kullanılmaz.
import slide1 from '../assets/images/anasayfa/slider/6.jpg';
import slide2 from '../assets/images/anasayfa/slider/4.jpg';
import slide3 from '../assets/images/anasayfa/slider/3.jpg';
import slide4 from '../assets/images/anasayfa/slider/11.jpg';
import aboutMain from '../assets/images/anasayfa/slider/10.jpg';
import aboutSmall from '../assets/images/anasayfa/slider/5.jpg';
import faqImage from '../assets/images/anasayfa/slider/7.jpg';

export const HERO_SLIDES = [
  {
    image: slide1,
    alt: 'Duvar raf sistemleri ve orta ünitelerle döşenmiş giyim mağazası',
    title: 'Mağaza dekorasyonu ve raf sistemleri',
    text: 'Raf, orta sistem, stand, manken ve askı. Tasarımdan montaja tek elden.',
    cta: { label: 'Raf sistemlerini incele', href: '/raf-sistemleri/' },
  },
  {
    image: slide2,
    alt: 'Mont ve aksesuar mağazası için ahşap duvar raf sistemi',
    title: 'Mağazanızı baştan kuruyoruz',
    text: 'Manken, askı ve raf çözümlerini tek projede planlıyoruz.',
    cta: { label: 'Projelerimizi görün', href: '/projeler/' },
  },
  {
    image: slide3,
    alt: 'Butik mağaza için altın rengi kemerli askılık sistemi',
    title: 'Ölçüye özel, uzun ömürlü',
    text: 'Her mağazanın ölçüsüne ve markasına göre üretim.',
    cta: { label: 'Bize ulaşın', href: '/iletisim/' },
  },
  {
    image: slide4,
    alt: 'Dekohop mağazası için beyaz duvar raf sistemi',
    title: 'Vitrininiz satışınızı taşısın',
    text: 'Ürünü öne çıkaran teşhir sistemleri, profesyonel montaj.',
    cta: { label: 'Ücretsiz teklif isteyin', href: 'whatsapp' },
  },
] as const;

// Rakamlar firma tarafından teyit edildi (29.09.2026).
export const STATS = [
  { value: '35', unit: 'yıl', label: 'sektör tecrübesi' },
  { value: '30', unit: 'kişi', label: 'usta üretim ve montaj ekibi' },
  { value: '10.000+', unit: '', label: 'tamamlanan proje' },
  { value: '15.000+', unit: '', label: 'müşteri' },
] as const;

export const ABOUT = {
  images: { main: aboutMain, small: aboutSmall },
  text: 'Güney Mağaza Dekorasyon olarak mağaza içi raf, orta sistem ve stand üretiminde tasarım, üretim ve montajı uçtan uca üstleniyoruz. Dayanıklı malzeme, işlevsel tasarım ve zamanında teslim ilkeleriyle çalışıyoruz.',
  checklist: [
    'Ölçüye özel tasarım ve projelendirme',
    'Yerinde keşif ve ücretsiz danışmanlık',
    'Hızlı üretim ve profesyonel montaj',
  ],
} as const;

export const PROMISES = [
  { icon: 'ShieldCheck', title: '2 yıl garanti', text: 'Ürün ve işçilikte iki yıl garanti veriyoruz.' },
  { icon: 'Ruler', title: 'Ölçüye özel üretim', text: 'Her parça mağazanızın ölçüsüne göre kesilir.' },
  { icon: 'Truck', title: 'Türkiye geneli montaj', text: 'Kendi ekibimizle her ile kurulum yapıyoruz.' },
  { icon: 'Headset', title: 'Satış sonrası destek', text: 'Montajdan sonra da ulaşabileceğiniz bir ekip.' },
] as const;

// Ana sayfadaki "Kurduğumuz mağazalar" bölümünde gösterilen gerçek projeler (data/projects.ts)
export const FEATURED_PROJECTS = ['dekohop-taksim', 'converse', 'bayan-butik-ucyuzlu', 'erkek-butik-sariyer'];

export const FAQ = {
  image: faqImage,
  items: [
    {
      q: 'Üretim süreci ne kadar sürüyor?',
      a: 'Keşif ve onaydan sonra üretimi ortalama 7–15 günde tamamlayıp montaja başlıyoruz. Süre projenin kapsamına göre değişebilir.',
    },
    {
      q: 'Türkiye geneline hizmet veriyor musunuz?',
      a: 'Evet. Lojistik ve montaj ekibimizle Türkiye’nin her iline kurulum yapıyoruz.',
    },
    {
      q: 'Keşif ve ölçüm hizmeti ücretli mi?',
      a: 'Merkez bölgelerde keşif ücretsizdir. Uzak lokasyonlar için yol masrafı talep edilebilir.',
    },
    {
      q: 'Ürünleriniz için garanti var mı?',
      a: 'Ürün ve işçilikte 2 yıl garanti veriyoruz. Montaj sonrasında da destek ekibimize ulaşabilirsiniz.',
    },
    {
      q: 'Ödeme koşullarınız neler?',
      a: 'Onayla birlikte kapora, üretim sonrası bakiye ve teslimde son ödeme şeklinde çalışıyoruz. Projeye göre esneklik sağlayabiliriz.',
    },
    {
      q: 'Montaj ortalama ne kadar sürer?',
      a: 'Proje büyüklüğüne göre 1–3 gün içinde tamamlanır. Mağazanızın çalışmasını aksatmayacak şekilde planlıyoruz.',
    },
  ],
} as const;
