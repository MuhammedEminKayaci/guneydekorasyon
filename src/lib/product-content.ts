// Ürün sayfası içerikleri: ürünün kendi özelliklerinden (renk, tip, kol, cinsiyet, teknik özellikler)
// üretilen açıklama, öne çıkanlar, kullanım alanları, SSS ve SEO metinleri.
// Aynı kategorideki ürünler ortak bilgiyi paylaşır; ürüne özgü cümleler her sayfayı ayırır.
import { CONTACT } from '../config/site';
import { CATEGORY_CONTENT } from '../data/category-content';
import { productCategoryName, type Product } from './catalog';

type Group = 'raf' | 'orta' | 'stand' | 'terzi' | 'plastik-manken' | 'polyester' | 'ahsap' | 'plastik-aski' | 'metal' | 'baskili';

function groupOf(p: Product): Group {
  const [cat, sub] = p.path;
  if (cat === 'raf-sistemleri') return 'raf';
  if (cat === 'orta-sistemleri') return 'orta';
  if (cat === 'standlar') return 'stand';
  if (sub === 'terzi-mankeni') return 'terzi';
  if (sub === 'plastik-manken') return 'plastik-manken';
  if (sub === 'polyester-manken') return 'polyester';
  if (sub === 'ahsap-aski') return 'ahsap';
  if (sub === 'metal-aski') return 'metal';
  if (sub === 'baskili-aski') return 'baskili';
  return 'plastik-aski';
}

/** Ölçüye göre üretilen gruplar (montajlı mağaza ekipmanı) */
const MADE_TO_MEASURE: Group[] = ['raf', 'orta', 'stand'];

const COLOR_SENTENCES: Record<string, string> = {
  Altın: 'Altın rengi yüzeyi vitrinde ve premium mağaza konseptlerinde dikkat çekici, lüks bir görünüm sağlar.',
  Gümüş: 'Gümüş tonlu yüzeyi modern ve minimal mağaza konseptleriyle uyumludur.',
  Siyah: 'Siyah rengi her mağaza konseptine uyum sağlar ve ürünü ön plana çıkaran zamansız bir seçimdir.',
  Beyaz: 'Beyaz rengi ferah ve sade mağaza tasarımlarında ürünü ön plana çıkarır.',
  Gri: 'Gri tonu endüstriyel ve minimal mağaza tasarımlarıyla uyumludur.',
  Naturel: 'Doğal ahşap tonu mağazada sıcak ve samimi bir atmosfer oluşturur.',
  Kahverengi: 'Kahverengi tonu klasik ve premium mağaza konseptlerine yakışır.',
  Bronz: 'Bronz rengi sıcak metalik tonuyla vitrine farklı ve iddialı bir görünüm kazandırır.',
  Bakır: 'Bakır tonu sıcak metalik görünümüyle butik ve konsept mağazalarda öne çıkar.',
  'Ten rengi': 'Ten rengi yüzeyi kıyafetin insan üzerindeki görünümüne en yakın sunumu sağlar.',
  Şeffaf: 'Şeffaf yapısı ürünün önüne geçmez, ürünün rengini olduğu gibi gösterir.',
};
const colorSentence = (renk: string) =>
  COLOR_SENTENCES[renk] ?? `${renk} rengiyle marka renklerinize uyumlu, dikkat çekici bir sunum sağlar.`;

const TIP_SENTENCES: Record<string, string> = {
  'Tam boy': 'Tam boy formu kıyafetin baştan aşağı bütün kombinini sergilemek için idealdir.',
  Gövde: 'Gövde (torso) formu üst giyim, iç giyim ve tişört sunumunda raf ve tezgâh üzerinde kullanılır.',
  Kafa: 'Manken kafası şapka, peruk, eşarp, gözlük ve aksesuar teşhiri için kullanılır.',
  'Alt beden': 'Alt beden formu pantolon, şort, tayt ve iç giyim sunumu için tasarlanmıştır.',
  'Bacak ve ayak': 'Bacak mankeni çorap, külotlu çorap ve ayakkabı teşhiri için idealdir.',
};

const KOL_SENTENCES: Record<string, string> = {
  Kollu: 'Hareketli kolları sayesinde ceket, gömlek ve kollu modellerin provası ve sunumu kolaylaşır.',
  Kolsuz: 'Kolsuz yapısı giydirmeyi hızlandırır; abiye, elbise ve kolsuz modellerin provasında pratiklik sağlar.',
};

const USAGE: Record<Group, string[]> = {
  raf: ['Giyim ve tekstil mağazaları', 'Ayakkabı ve çanta mağazaları', 'Aksesuar ve konsept mağazalar', 'Depo ve stok alanları'],
  orta: ['Mağaza ortası teşhir alanları', 'Kampanya ve yeni sezon sunumları', 'Butik ve konsept mağazalar', 'Showroomlar'],
  stand: ['Mağaza içi askılık alanları', 'Showroom ve fuar alanları', 'Atölye ve üretim alanları', 'Depo ve sevkiyat hazırlığı'],
  terzi: ['Terzi ve dikim atölyeleri', 'Moda tasarım stüdyoları', 'Moda okulları', 'Butik vitrinleri'],
  'plastik-manken': ['Mağaza vitrinleri', 'Mağaza içi sunum alanları', 'E-ticaret ürün çekimleri', 'Fuar ve showroomlar'],
  polyester: ['Mağaza vitrinleri', 'Premium butikler', 'Showroom ve fuar alanları', 'Ürün fotoğraf çekimleri'],
  ahsap: ['Premium giyim mağazaları', 'Butikler', 'Otel ve gardırop düzeni', 'Kurumsal hediye ve marka askısı'],
  'plastik-aski': ['Giyim mağazaları', 'İç giyim ve mayo reyonları', 'Toptan ve yüksek adetli kullanım', 'Depo ve sevkiyat'],
  metal: ['Aksesuar, çorap ve iç giyim reyonları', 'Eşarp ve şal sunumu', 'Mayo ve plaj giyim', 'Raf ve duvar sistemleri'],
  baskili: ['Markalı giyim mağazaları', 'Otel ve konaklama', 'Kurumsal promosyon', 'Premium butikler'],
};

const HIGHLIGHTS: Record<Group, string[]> = {
  raf: ['Ölçüye özel üretim', 'Yüksek taşıma kapasitesi', 'Profesyonel montaj', '2 yıl garanti'],
  orta: ['Ölçü, renk ve malzeme seçimi', 'Metal, cam ve ahşap kombinasyonu', 'Profesyonel montaj', '2 yıl garanti'],
  stand: ['Tekerlekli, kolay taşınır yapı', 'Dayanıklı metal gövde', 'Yoğun kullanıma uygun', '2 yıl garanti'],
  terzi: ['Gerçekçi vücut oranları', 'İğne batırılabilir gövde', 'Ayarlanabilir ayak', 'Atölye ve vitrin kullanımı'],
  'plastik-manken': ['Hafif ve kolay taşınır', 'Darbelere dayanıklı', 'Kolay temizlenir yüzey', 'Ekonomik çözüm'],
  polyester: ['Yüksek kaliteli polyester', 'Darbe ve çizilmeye dayanıklı', 'Gerçekçi anatomik form', 'Parlak ve mat yüzey seçenekleri'],
  ahsap: ['Doğal ahşap malzeme', 'Kıyafetin formunu korur', 'Logo baskı imkânı', 'Premium görünüm'],
  'plastik-aski': ['Hafif ve dayanıklı', 'Ekonomik, yüksek adetli kullanım', 'Kıyafetin formunu korur', 'Toplu siparişe uygun'],
  metal: ['İnce profil, az yer kaplar', 'Dayanıklı metal yapı', 'Aksesuar ve iç giyim sunumu', 'Tedarikçi koduyla sipariş'],
  baskili: ['Markanıza özel logo', 'Yaldız ve tampon baskı', 'Ahşap ve plastik seçenekler', 'Kurumsal görünüm'],
};

/** Grup için uzun açıklama metni (kategori içeriğinden) */
function bodyFor(p: Product): string[] {
  const keys = [p.path.join('/'), p.path.slice(0, 2).join('/'), p.path[0]];
  for (const k of keys) if (CATEGORY_CONTENT[k]) return CATEGORY_CONTENT[k].body;
  return [];
}

export interface ProductContent {
  /** Ürüne özgü giriş paragrafı */
  lead: string;
  /** Ürüne özgü özellik cümleleri */
  details: string[];
  /** Grup açıklaması */
  body: string[];
  highlights: string[];
  usage: string[];
  faq: { q: string; a: string }[];
  metaTitle: string;
  metaDescription: string;
  /** Özellik tablosu satırları */
  specs: [string, string][];
  /** Firmanın kendi ürettiği ürün mü (schema marka bilgisi için) */
  ownProduct: boolean;
}

export function productContent(p: Product): ProductContent {
  const group = groupOf(p);
  const cat = productCategoryName(p);
  const { renk, tip, kol, cinsiyet } = p.attrs;

  // Giriş: ad + katalog no + kategori + ana kullanım
  const purpose: Record<Group, string> = {
    raf: 'mağaza duvarı, depo ve teşhir alanları için ölçüye özel üretilen bir raf sistemidir',
    orta: 'mağaza ortasında ürünü öne çıkarmak için tasarlanmış bir teşhir ünitesidir',
    stand: 'ürünleri mağaza içinde kolayca taşımak ve sergilemek için tasarlanmış bir konfeksiyon askılığıdır',
    terzi: 'prova, ölçü ve kalıp çalışmaları için tasarlanmış bir terzi mankenidir',
    'plastik-manken': 'vitrin ve mağaza içi sunum için hafif ve dayanıklı bir plastik mankendir',
    polyester: 'vitrine premium bir görünüm kazandıran polyester bir vitrin mankenidir',
    ahsap: 'kıyafetin formunu koruyan, mağazaya kalite hissi katan bir ahşap askıdır',
    'plastik-aski': 'mağazalar için pratik ve ekonomik bir plastik askı modelidir',
    metal: 'aksesuar ve iç giyim sunumu için ince profilli bir metal askı modelidir',
    baskili: 'markanın logosunu taşıyan, kurumsal görünüm kazandıran bir baskılı askı örneğidir',
  };
  const lead = `${p.name} (katalog no: ${p.code}), ${purpose[group]}. ${cat} kategorisindeki modellerimizden biridir.`;

  const details: string[] = [];
  if (tip && TIP_SENTENCES[tip]) details.push(TIP_SENTENCES[tip]);
  if (kol && KOL_SENTENCES[kol]) details.push(KOL_SENTENCES[kol]);
  if (cinsiyet && group !== 'terzi') {
    details.push(
      cinsiyet === 'Çocuk'
        ? 'Çocuk ölçülerine uygun formu, çocuk giyim ürünlerinin doğru beden algısıyla sergilenmesini sağlar.'
        : `${cinsiyet} vücut formuna uygun hatları sayesinde ${cinsiyet.toLocaleLowerCase('tr')} giyim ürünlerini doğal bir duruşla sergiler.`,
    );
  }
  if (renk) details.push(colorSentence(renk));
  const askiOlcu = p.specs?.find(([k]) => k === 'Askı ölçüsü')?.[1];
  const koli = p.specs?.find(([k]) => k === 'Koli adedi')?.[1];
  if (askiOlcu) details.push(`Askı ölçüsü ${askiOlcu}${koli ? `, koli adedi ${koli}` : ''} olarak tedarik edilir.`);
  details.push(
    MADE_TO_MEASURE.includes(group)
      ? 'Katalogdaki görsel örnek bir uygulamadır; ölçü, renk ve malzeme mağazanıza göre belirlenerek üretilir.'
      : 'Renk, yüzey ve adet seçenekleri için katalog numarasıyla bize yazabilirsiniz.',
  );
  if (p.images.length > 1) details.push(`Ürünü ${p.images.length} farklı açıdan çekilmiş görsellerle yukarıdaki galeriden inceleyebilirsiniz.`);

  // Özellik tablosu
  const specs: [string, string][] = [
    ['Katalog no', p.code],
    ['Kategori', cat],
    ...(cinsiyet ? [['Cinsiyet', cinsiyet] as [string, string]] : []),
    ...(tip ? [['Tip', tip] as [string, string]] : []),
    ...(kol ? [['Kol', kol] as [string, string]] : []),
    ...(renk ? [['Renk', renk] as [string, string]] : []),
    ...(p.specs ?? []),
    ['Üretim', MADE_TO_MEASURE.includes(group) ? 'Ölçüye özel' : 'Katalog modeli'],
    // Garanti sadece sitede taahhüt edilen montajlı ürünlerde (2 yıl ürün ve işçilik)
    ...(MADE_TO_MEASURE.includes(group) ? [['Garanti', '2 yıl (ürün ve işçilik)'] as [string, string]] : []),
  ];

  // SSS
  const faq = [
    MADE_TO_MEASURE.includes(group)
      ? {
          q: `${p.name} mağazamın ölçüsüne göre üretilebilir mi?`,
          a: `Evet. ${p.name} modelini mağazanızın ölçüsüne, renk ve malzeme tercihinize göre üretiyoruz. Yerinde keşif için randevu planlayabiliriz.`,
        }
      : {
          q: `${p.name} için farklı renk veya yüzey seçeneği var mı?`,
          a: `Renk ve yüzey seçenekleri modele ve sipariş adedine göre değişir. Katalog numarasıyla (${p.code}) bize yazın, güncel seçenekleri iletelim.`,
        },
    {
      q: `${p.code} için nasıl fiyat teklifi alırım?`,
      a: `Ürünü teklif listesine adediyle ekleyip WhatsApp üzerinden gönderebilir ya da ${CONTACT.phones[0].display} numarasını arayabilirsiniz. Katalog numarasıyla sorduğunuzda en hızlı yanıtı veririz.`,
    },
    MADE_TO_MEASURE.includes(group)
      ? {
          q: 'Teslimat ve montaj yapıyor musunuz?',
          a: 'Evet. Onaydan sonra üretim ortalama 7–15 gün sürer; kendi ekibimizle Türkiye’nin her iline teslimat ve montaj yapıyoruz.',
        }
      : {
          q: 'Türkiye geneline gönderim yapıyor musunuz?',
          a: 'Evet. Türkiye geneline gönderim yapıyoruz; toplu siparişlerde teslim süresini sipariş adedine göre birlikte planlıyoruz.',
        },
  ];
  if (koli) faq.push({ q: `${p.code} koli adedi ve koli ölçüsü nedir?`, a: `Koli adedi ${koli}, koli ölçüsü ${p.specs!.find(([k]) => k === 'Koli ölçüsü')?.[1]}.` });

  // SEO
  const attrText = [renk && `${renk.toLocaleLowerCase('tr')} renk`, cinsiyet && cinsiyet.toLocaleLowerCase('tr'), tip?.toLocaleLowerCase('tr'), kol?.toLocaleLowerCase('tr')]
    .filter(Boolean)
    .join(', ');
  const tail = MADE_TO_MEASURE.includes(group) ? 'Ölçüye özel üretim ve Türkiye geneli montaj.' : 'Türkiye geneline gönderim.';
  let metaDescription = `${p.name} (${p.code})${attrText ? `: ${attrText}` : ''}. ${tail} Fiyat teklifi için hemen yazın.`;
  if (metaDescription.length > 160) metaDescription = `${p.name} (${p.code}). ${tail} Fiyat teklifi için hemen yazın.`;

  // Başlık: adında kod geçmiyorsa ekle
  const metaTitle = p.name.includes(p.code) ? p.name : `${p.name} ${p.code}`;

  return {
    lead,
    details,
    body: bodyFor(p),
    highlights: HIGHLIGHTS[group],
    usage: USAGE[group],
    faq,
    metaTitle,
    metaDescription,
    specs,
    ownProduct: MADE_TO_MEASURE.includes(group),
  };
}
