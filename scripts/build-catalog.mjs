// Ürün kataloğunu görsel klasörlerinden üretir → src/data/catalog.json
// Kullanım: node scripts/build-catalog.mjs
//
// - Her ürün: ad, katalog no, kategori yolu, görseller, filtre özellikleri (renk/cinsiyet/tip/kol), varsa teknik özellikler.
// - Renk, beyaz zeminli ürün görsellerinden otomatik çıkarılır (sadece renk: true olan gruplarda).
//   Yanlış tespitler COLOR_OVERRIDES ile düzeltilir.
// - Etiketli kapak görselleri ve filigranlı görseller katalogda yer almaz.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = 'src/assets/images/urunler';
const OUT = 'src/data/catalog.json';

const numeric = (a, b) => a.localeCompare(b, 'tr', { numeric: true });
const list = (dir, filter = /\.(png|jpe?g)$/i) =>
  fs.readdirSync(path.join(ROOT, dir)).filter((f) => filter.test(f)).sort(numeric).map((f) => `${dir}/${f}`);
const num = (file) => parseInt(path.basename(file), 10);
const pad = (n) => String(n).padStart(2, '0');

const slugify = (s) =>
  s
    .toLocaleLowerCase('tr')
    .replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i')
    .replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u')
    .replace(/×/g, 'x')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

// ---------------------------------------------------------------------------
// Renk tespiti
// ---------------------------------------------------------------------------
function bucket(r, g, b) {
  const max = Math.max(r, g, b) / 255;
  const min = Math.min(r, g, b) / 255;
  const l = (max + min) / 2;
  const d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  let h = 0;
  if (d !== 0) {
    const rr = r / 255, gg = g / 255, bb = b / 255;
    if (max === rr) h = 60 * (((gg - bb) / d) % 6);
    else if (max === gg) h = 60 * ((bb - rr) / d + 2);
    else h = 60 * ((rr - gg) / d + 4);
    if (h < 0) h += 360;
  }
  if (l < 0.17) return 'Siyah';
  if (s < 0.16 || d < 0.08) return l > 0.8 ? 'Beyaz' : l < 0.3 ? 'Siyah' : 'Gri';
  if (h < 12 || h >= 340) return l < 0.33 ? 'Bordo' : 'Kırmızı';
  if (h < 34) {
    if (l < 0.42) return 'Kahverengi';
    if (s > 0.7 && l < 0.6) return 'Turuncu';
    return 'Naturel';
  }
  if (h < 38) return l < 0.42 ? 'Kahverengi' : 'Naturel';
  if (h < 64) return s > 0.25 ? (l < 0.28 ? 'Kahverengi' : 'Altın') : 'Naturel';
  if (h < 165) return 'Yeşil';
  if (h < 260) return l < 0.3 ? 'Lacivert' : 'Mavi';
  if (h < 300) return 'Mor';
  return 'Pembe';
}

async function detectColor(file, region) {
  let img = sharp(path.join(ROOT, file)).removeAlpha();
  if (region) {
    const { width, height } = await sharp(path.join(ROOT, file)).metadata();
    img = img.extract({
      left: Math.round(width * region[0]),
      top: Math.round(height * region[1]),
      width: Math.round(width * (region[2] - region[0])),
      height: Math.round(height * (region[3] - region[1])),
    });
  }
  const { data } = await img.resize(96, 96, { fit: 'inside' }).raw().toBuffer({ resolveWithObject: true });
  const counts = {};
  let total = 0;
  for (let i = 0; i < data.length; i += 3) {
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
    if (Math.min(r, g, b) > 228) continue; // beyaz zemin
    const k = bucket(r, g, b);
    counts[k] = (counts[k] ?? 0) + 1;
    total++;
  }
  if (!total) return undefined;
  // Renkli pikseller nesnenin kayda değer bir kısmıysa (ör. altın, ahşap) baskın rengi onlardan seç;
  // metalik yüzeylerdeki beyaz parlama ve gri yansımalar sonucu griye çekmesin.
  const ACHROMATIC = ['Siyah', 'Beyaz', 'Gri'];
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const chromatic = sorted.filter(([k]) => !ACHROMATIC.includes(k));
  const chromaticTotal = chromatic.reduce((sum, [, n]) => sum + n, 0);
  if (chromatic.length && chromaticTotal / total >= 0.22) return chromatic[0][0];
  return sorted[0][0];
}

// ---------------------------------------------------------------------------
// Grup tanımları
// ---------------------------------------------------------------------------
/** @type {Array<{files:string[]|string[][], path:string[], code:(f:string,i:number)=>string, name:(a:object,f:string)=>string, color?:boolean, region?:number[], fit?:'contain'|'cover', attrs?:(f:string)=>object, specs?:(f:string)=>[string,string][]}>} */
const GROUPS = [];
const add = (g) => GROUPS.push(g);

// Raf sistemleri ------------------------------------------------------------
add({
  files: list('raf-sistemleri/depo'),
  path: ['raf-sistemleri', 'depo-raf'],
  code: (f) => `DR-${pad(num(f))}`,
  name: (a, f) => (num(f) === 10 ? 'Depo Raf Sistemi Uygulaması' : 'Metal Depo Rafı'),
});
add({
  files: [list('raf-sistemleri/40x40/model-1'), list('raf-sistemleri/40x40/model-2')],
  path: ['raf-sistemleri', '40x40-raf'],
  code: (f, i) => `R40-M${i + 1}`,
  name: (a, f, i) => `40×40 Raf Sistemi Model ${i + 1}`,
  fit: 'cover',
});
add({
  // 7.png üzerinde "dekorasyon Güney tarafından yapılmaktadır" pankartı var: katalog dışı
  files: list('raf-sistemleri/40x40').filter((f) => num(f) !== 7),
  path: ['raf-sistemleri', '40x40-raf'],
  code: (f, i) => `R40-U${i + 1}`,
  name: (a, f, i) => `40×40 Raf Sistemi Uygulaması ${i + 1}`,
  fit: 'cover',
});
add({
  files: [list('raf-sistemleri/boru/silindir'), list('raf-sistemleri/boru/model-2'), list('raf-sistemleri/boru/model-3')],
  path: ['raf-sistemleri', 'boru-raf'],
  code: (f, i) => `BR-${pad(i + 1)}`,
  name: (a, f, i) => ['Silindir Boru Raf Sistemi', 'Boru Raf Sistemi Model 2', 'Boru Raf Sistemi Model 3'][i],
  fit: 'cover',
});

// Orta sistemleri ve standlar ----------------------------------------------
add({
  files: list('orta-sistemleri'),
  path: ['orta-sistemleri'],
  code: (f) => `OS-${pad(num(f))}`,
  name: (a) => 'Orta Teşhir Ünitesi',
  color: true,
  remap: { Gri: 'Gümüş', Naturel: 'Altın' },
});
add({
  // 3, 5, 6 numaralı görseller 4 numaralı askılığın detay çekimleri
  files: [['standlar/1.png'], ['standlar/2.png'], ['standlar/4.png', 'standlar/3.png', 'standlar/5.png', 'standlar/6.png'], ['standlar/7.png'], ['standlar/8.png'], ['standlar/9.png']],
  path: ['standlar'],
  code: (f, i) => `ST-${pad(i + 1)}`,
  name: () => 'Tekerlekli Konfeksiyon Askılığı',
  color: true,
  remap: { Gri: 'Gümüş' },
});

// Mankenler -----------------------------------------------------------------
// Terzi mankenleri renk filtresine dahil değil: kumaş, ahşap ayak ve metal gövde karışık, otomatik tespit güvenilmez.
add({
  files: list('mankenler/terzi/kadin/kollu'),
  path: ['mankenler', 'terzi-mankeni', 'kadin'],
  code: (f) => `KTM-${pad(num(f))}`,
  name: () => 'Kollu Kadın Terzi Mankeni',
  attrs: () => ({ kol: 'Kollu', cinsiyet: 'Kadın' }),
});
add({
  files: list('mankenler/terzi/kadin/kolsuz'),
  path: ['mankenler', 'terzi-mankeni', 'kadin'],
  code: (f) => `KTS-${pad(num(f))}`,
  name: () => 'Kolsuz Kadın Terzi Mankeni',
  attrs: () => ({ kol: 'Kolsuz', cinsiyet: 'Kadın' }),
});
add({
  files: list('mankenler/terzi/erkek'),
  path: ['mankenler', 'terzi-mankeni', 'erkek'],
  code: (f) => `ETM-${pad(num(f))}`,
  name: () => 'Erkek Terzi Mankeni',
  attrs: () => ({ cinsiyet: 'Erkek' }),
});

// Plastik mankenler: tip ve cinsiyet görsellerden elle sınıflandırıldı
const PLASTIK_LOOSE = {
  1: ['Gövde', 'Kadın'], 2: ['Gövde', 'Kadın'], 3: ['Gövde', 'Kadın'], 4: ['Gövde', 'Kadın'],
  5: ['Gövde', 'Erkek'], 6: ['Gövde', 'Erkek'], 7: ['Kafa', 'Kadın'], 8: ['Kafa', 'Erkek'],
  9: ['Kafa', 'Erkek'], 10: ['Kafa', 'Erkek'], 11: ['Kafa', 'Erkek'], 12: ['Kafa', 'Kadın'],
  13: ['Kafa', 'Kadın'], 14: ['Kafa', 'Çocuk'], 15: ['Kafa', 'Çocuk'], 16: ['Bacak ve ayak'],
  17: ['Bacak ve ayak'], 18: ['Bacak ve ayak'], 19: ['Bacak ve ayak'], 20: ['Tam boy'],
};
const T = 'Tam boy', G = 'Gövde', A = 'Alt beden';
const PLASTIK_MODELLER = {
  1: [T, 'Erkek'], 2: [G, 'Kadın'], 3: [T, 'Çocuk'], 4: [T, 'Erkek'], 5: [T, 'Çocuk'], 6: [T, 'Çocuk'],
  7: [A], 8: [G, 'Kadın'], 9: [T, 'Erkek'], 10: [G, 'Kadın'], 11: [T, 'Çocuk'], 12: [T, 'Çocuk'],
  13: [G, 'Kadın'], 14: [G, 'Çocuk'], 15: [G, 'Erkek'], 16: [A], 17: [G, 'Erkek'], 18: [A], 19: [A],
  20: [A], 21: [G, 'Çocuk'], 22: [T, 'Kadın'], 23: [A], 24: [A], 25: [A], 26: [T, 'Kadın'],
  27: [T, 'Kadın'], 28: [T, 'Kadın'], 29: [T, 'Erkek'], 30: [T, 'Kadın'], 31: [T, 'Erkek'],
  32: [T, 'Çocuk'], 33: [T, 'Erkek'], 34: [T, 'Erkek'], 35: [T, 'Çocuk'], 36: [T, 'Çocuk'],
  37: [T, 'Erkek'], 38: [T, 'Kadın'], 39: [T, 'Çocuk'], 40: [T, 'Çocuk'], 41: [A], 42: [A],
  43: [T, 'Çocuk'], 44: [T, 'Çocuk'], 45: [T, 'Erkek'], 46: [A], 47: [T, 'Erkek'], 48: [T, 'Erkek'],
  49: [T, 'Çocuk'], 50: [T, 'Çocuk'], 51: [T, 'Çocuk'], 52: [T, 'Çocuk'], 53: [G, 'Erkek'],
  54: [T, 'Kadın'], 55: [T, 'Kadın'], 56: [T, 'Çocuk'], 57: [T, 'Çocuk'], 58: [T, 'Çocuk'],
  59: [T, 'Kadın'], 60: [T, 'Çocuk'],
};
const plastikName = ({ tip, cinsiyet }) => {
  const base = {
    'Tam boy': 'Tam Boy Plastik Manken',
    Gövde: 'Plastik Gövde Manken',
    Kafa: 'Plastik Manken Kafası',
    'Alt beden': 'Plastik Alt Beden Manken',
    'Bacak ve ayak': 'Plastik Bacak Manken',
  }[tip];
  return cinsiyet ? `${cinsiyet} ${base}` : base;
};
add({
  files: list('mankenler/plastik'),
  path: ['mankenler', 'plastik-manken'],
  code: (f) => `PM-P${pad(num(f))}`,
  attrs: (f) => {
    const [tip, cinsiyet] = PLASTIK_LOOSE[num(f)];
    return { tip, ...(cinsiyet && { cinsiyet }) };
  },
  name: (a, f) => (num(f) === 20 ? 'Kadın ve Erkek Tam Boy Plastik Manken Seti' : plastikName(a)),
});
add({
  files: list('mankenler/plastik/modeller'),
  path: ['mankenler', 'plastik-manken'],
  code: (f) => `PM-${pad(num(f))}`,
  attrs: (f) => {
    const [tip, cinsiyet] = PLASTIK_MODELLER[num(f)];
    return { tip, ...(cinsiyet && { cinsiyet }) };
  },
  name: (a) => plastikName(a),
});

// Polyester mankenler
const polyester = (dir, leaf, cinsiyet, prefix) =>
  add({
    files: list(dir),
    path: ['mankenler', 'polyester-manken', leaf],
    code: (f) => `${prefix}-${pad(num(f))}`,
    name: () => `${cinsiyet} Polyester Manken`,
    attrs: () => ({ cinsiyet }),
    color: true,
    remap: { Gri: 'Gümüş', Naturel: 'Altın' },
  });
polyester('mankenler/polyester/kadin', 'kadin', 'Kadın', 'PKM-A');
polyester('mankenler/polyester/kadin/seri-1', 'kadin', 'Kadın', 'PKM-B');
polyester('mankenler/polyester/kadin/seri-2', 'kadin', 'Kadın', 'PKM-C');
polyester('mankenler/polyester/erkek', 'erkek', 'Erkek', 'PEM-A');
polyester('mankenler/polyester/erkek/seri-1', 'erkek', 'Erkek', 'PEM-B');
polyester('mankenler/polyester/cocuk', 'cocuk', 'Çocuk', 'PCM');

// Askılar -------------------------------------------------------------------
const ahsap = (leaf, prefix, name) =>
  add({
    files: list(`askilar/ahsap/${leaf}`),
    path: ['askilar', 'ahsap-aski', leaf],
    code: (f) => `${prefix}-${pad(num(f))}`,
    name: () => name,
    color: true,
    remap: { Altın: 'Naturel' },
  });
ahsap('klasik', 'AAK', 'Klasik Ahşap Askı');
ahsap('ceket', 'AAC', 'Ahşap Ceket Askısı');
ahsap('pantolon', 'AAP', 'Ahşap Pantolon Askısı');
ahsap('bluz', 'AAB', 'Ahşap Bluz Askısı');
ahsap('cocuk', 'ACA', 'Ahşap Çocuk Askısı');

add({
  files: list('askilar/plastik/seri-1'),
  path: ['askilar', 'plastik-aski'],
  code: (f) => `PA-${pad(num(f))}`,
  name: () => 'Plastik Ceket Askısı',
  color: true,
  remap: { Gri: 'Gümüş', Naturel: 'Altın' },
});

// Plastik seri 2: tedarikçi kodları dosya adından
const SERI2_NAMES = {
  as: 'Askı Köprüsü', asu: 'Uzun Askı Köprüsü', beden: 'Beden Belirleyici', bordo: 'Bordo Flok Askı',
  kanca: 'Askı Kancası Çeşitleri', kartela: 'Kartela Askısı', kravat: 'Kravat Askısı',
  logobas: 'Logo Baskılı Plastik Askı Örnekleri', manken: 'Manken Askısı', mavi: 'Mavi Flok Askı',
  mod: 'Flok Askı', pantolon: 'Pantolon Klipsi', parmak: 'Parmak Askı', paspas: 'Paspas Askısı',
  sal: 'Halka Şal Askısı', terlik: 'Terlik Askısı',
};
add({
  files: list('askilar/plastik/seri-2'),
  path: ['askilar', 'plastik-aski'],
  code: (f) => path.basename(f, path.extname(f)).toLocaleUpperCase('tr'),
  // Genel adlı modellerde tedarikçi kodu adın parçası: "Plastik Askı EC-43-47"
  name: (a, f) => SERI2_NAMES[path.basename(f, path.extname(f))] ?? `Plastik Askı ${path.basename(f, path.extname(f)).toLocaleUpperCase('tr')}`,
  // Tedarikçi çizimleri gerçek rengi yansıtmıyor: renk filtresine dahil değil (adında renk geçenler hariç)
  attrs: (f) => ({ mavi: { renk: 'Mavi' }, bordo: { renk: 'Bordo' } })[path.basename(f, path.extname(f))] ?? {},
});

// Tedarikçi kartları (kırpılmış fotoğraflar) + kartlardan okunan özellikler
const KART = {
  '43-sal-askisi': ['Şal Askısı', 'ŞA-43', '1250 adet', '59×39×30 cm', '12 cm'],
  '44-buyuk-sal-askisi': ['Büyük Şal Askısı', 'BŞA-44', '19 cm: 1000 adet, 23 cm: 900 adet', '59×39×30 cm', '19 cm – 23 cm'],
  '45-kugu-sal-askisi': ['Kuğu Şal Askısı', 'KŞA-45', '1250 adet', '59×39×30 cm', '12 cm'],
  '46-esarp-askisi': ['Eşarp Askısı', 'EA-46', '1000 adet', '45×29×29 cm', '26 cm'],
  '47-m-27': ['İç Çamaşır Askısı', 'M 27', '1000 adet', '45×29×29 cm', '27 cm'],
  '48-mb-26': ['İç Çamaşır Askısı', 'MB 26', '750 adet', '59×39×30 cm', '26 cm'],
  '49-mt-21-27': ['Mayo Askısı', 'MT 21 – MT 27', 'MT 21: 1250 adet, MT 27: 900 adet', '68×43×38 cm', '21 cm – 27 cm'],
  '50-kbg-27': ['Mayo ve İç Çamaşır Askısı', 'KBG 27', '300 adet', '59×39×30 cm', '27 cm'],
};
add({
  files: list('askilar/esarp', /-foto\.jpg$/),
  path: ['askilar', 'plastik-aski'],
  code: (f) => KART[path.basename(f).replace('-foto.jpg', '')][1],
  name: (a, f) => KART[path.basename(f).replace('-foto.jpg', '')][0],
  attrs: () => ({ renk: 'Şeffaf' }),
  specs: (f) => {
    const [, , koli, koliOlcu, askiOlcu] = KART[path.basename(f).replace('-foto.jpg', '')];
    return [
      ['Malzeme', 'Şeffaf plastik'],
      ['Askı ölçüsü', askiOlcu],
      ['Koli adedi', koli],
      ['Koli ölçüsü', koliOlcu],
      ['Baskı türü', 'Yaldız, tampon baskı'],
    ];
  },
  fit: 'cover',
});

// Metal askılar: tedarikçi kodları, ızgara izi temizlenmiş PNG'ler
const metalCode = (f) => path.basename(f).replace('-temiz.png', '').replace(/-\d+$/, '').toLocaleUpperCase('tr');
const metalName = (code) => {
  const c = code.replace(/-.*/, '');
  if (c === '9000') return 'Mandallı Kanca';
  if (c === '9001') return 'Mandallı Alt Askı';
  if (['9007', '9008', '9009'].includes(c)) return 'S Kanca';
  if (['9020', '9021'].includes(c)) return 'Askı Kancası';
  if (c === '9401') return 'Mandallı Tel Askı';
  if (c === '9450') return 'Tel Askı';
  if (c === '9502') return 'Tel Mayo Askısı';
  if (/^91\d\d$/.test(c)) return 'Eşarp Askısı';
  if (/^92\d\d$/.test(c)) return 'Halka Eşarp Askısı';
  if (['9302', '9311'].includes(c)) return 'Mandallı Askı';
  if (c === 'ZG') return 'Halka Askı';
  if (/^96(0[1-8])$/.test(c)) return 'Mayo Askısı';
  if (/^96(09|1\d)$/.test(c)) return 'Mandallı Mayo Askısı';
  return 'Askı';
};
for (const leaf of ['klasik', 'esarp', 'mayo']) {
  add({
    files: list(`askilar/metal/${leaf}`, /-temiz\.png$/),
    path: ['askilar', 'metal-aski', leaf],
    code: metalCode,
    name: (a, f) => `${metalName(metalCode(f))} ${metalCode(f)}`,
    color: true,
    remap: { Gri: 'Gümüş' },
  });
}

add({
  files: list('askilar/baskili'),
  path: ['askilar', 'baskili-aski'],
  code: (f) => `BA-${pad(num(f))}`,
  name: () => 'Logo Baskılı Askı',
  color: true,
  remap: { Altın: 'Naturel' },
});

// ---------------------------------------------------------------------------
// Elle renk düzeltmeleri (kod → renk). Otomatik tespitin yanıldığı ürünler.
// ---------------------------------------------------------------------------
const COLOR_OVERRIDES = {
  // Orta sistemleri ve standlar
  'OS-12': 'Gümüş', 'OS-16': 'Siyah', 'OS-18': 'Siyah', 'ST-01': 'Siyah', 'ST-06': 'Siyah',
  // Polyester mankenler
  'PKM-B-02': 'Bronz', 'PKM-B-03': 'Bronz', 'PKM-B-05': 'Gri', 'PKM-B-07': 'Siyah', 'PKM-B-08': 'Beyaz',
  'PKM-B-09': 'Beyaz', 'PKM-B-10': 'Beyaz', 'PKM-C-07': 'Ten rengi', 'PKM-C-08': 'Beyaz',
  'PKM-C-09': 'Ten rengi', 'PKM-C-10': 'Ten rengi', 'PEM-B-03': 'Gri',
  // Ahşap askılar
  'AAC-03': 'Naturel', 'AAC-06': 'Naturel', 'AAC-13': 'Kahverengi', 'AAP-08': 'Lacivert', 'AAP-20': 'Kahverengi',
  'AAB-07': 'Yeşil', 'AAB-10': 'Beyaz', 'ACA-01': 'Beyaz', 'ACA-05': 'Yeşil',
  // Plastik ceket askıları
  'PA-07': 'Bakır', 'PA-09': 'Beyaz', 'PA-10': 'Gri', 'PA-19': 'Siyah', 'PA-20': 'Siyah', 'PA-21': 'Siyah', 'PA-35': 'Siyah',
  // Baskılı askılar
  'BA-02': 'Beyaz', 'BA-06': 'Siyah', 'BA-07': 'Beyaz',
  // İkinci gözden geçirme
  'OS-05': 'Altın', 'OS-13': 'Gümüş', 'PEM-B-09': 'Bakır', 'PEM-B-11': 'Bronz', 'AAC-04': 'Lacivert', 'PA-34': 'Mavi',
  '9000-01-B': 'Altın', '9000-5X5': 'Bakır', '9001': 'Bakır', '9021': 'Altın', '9401': 'Bakır', '9203': 'Siyah',
  '9612': 'Naturel', '9102': 'Naturel', 'ZG-01': 'Kahverengi',
};

// ---------------------------------------------------------------------------
const products = [];
const seenSlugs = new Set();
let order = 0;

for (const g of GROUPS) {
  const entries = g.files.map((f) => (Array.isArray(f) ? f : [f]));
  for (const [i, images] of entries.entries()) {
    const main = images[0];
    const code = g.code(main, i);
    const attrs = { ...(g.attrs?.(main) ?? {}) };
    if (g.color && !attrs.renk) {
      const detected = await detectColor(main, g.region);
      const renk = COLOR_OVERRIDES[code] ?? (detected && (g.remap?.[detected] ?? detected));
      if (renk) attrs.renk = renk;
    }
    // Renk filtresi olan gruplarda rengi ada ekle: "Altın Kadın Polyester Manken" (aynı adlı ürünleri ayırt eder)
    const baseName = g.name(attrs, main, i);
    const colorWord = attrs.renk?.replace(/^./, (c) => c.toLocaleUpperCase('tr')).replace(/ rengi$/, ' Rengi');
    const name = g.color && colorWord ? `${colorWord} ${baseName}` : baseName;
    let slug = slugify(`${name} ${code}`);
    while (seenSlugs.has(slug)) slug += '-2';
    seenSlugs.add(slug);

    products.push({
      id: slugify(code),
      slug,
      name,
      code,
      path: g.path,
      images: images.map((f) => `urunler/${f}`),
      fit: g.fit ?? 'contain',
      attrs,
      ...(g.specs && { specs: g.specs(main) }),
      order: order++,
    });
  }
}

fs.writeFileSync(OUT, JSON.stringify(products, null, 1) + '\n');

const byCat = {};
for (const p of products) {
  const k = p.path.join('/');
  byCat[k] = (byCat[k] ?? 0) + 1;
}
console.log(`${products.length} ürün → ${OUT}`);
console.table(byCat);
const colors = {};
products.forEach((p) => p.attrs.renk && (colors[p.attrs.renk] = (colors[p.attrs.renk] ?? 0) + 1));
console.log('Renkler:', colors);
