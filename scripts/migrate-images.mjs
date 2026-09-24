// Eski sitenin görsellerini temiz, Türkçe karaktersiz bir yapıya taşır.
// Kullanım: node scripts/migrate-images.mjs
// Çıktı: src/assets/images/** + scripts/gorsel-eslesme.json (eski yol → yeni yol, 301 yönlendirmeleri için)
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const OLD_ROOT = path.join(
  process.env.HOME,
  'Desktop/PROJELERİM/İsmail Duman - Güney Dekorasyon/images',
);
const NEW_ROOT = path.resolve('src/assets/images');

// Eski klasör → yeni klasör. Listede olmayan klasörler taşınmaz.
const DIR_MAP = {
  '.': 'marka',
  'katagoriler': 'anasayfa/kategoriler',
  'slider': 'anasayfa/slider',
  'ürünler': 'marka/urunler',
  'ürünler/Slider': 'anasayfa/urun-slider',
  'ürünler/Standlar': 'urunler/standlar',
  'ürünler/Orta Sistemleri': 'urunler/orta-sistemleri',

  'ürünler/Raf Sistemleri': 'urunler/raf-sistemleri/depo',
  'ürünler/Raf Sistemleri/40X40 RAF': 'urunler/raf-sistemleri/40x40',
  'ürünler/Raf Sistemleri/40X40 RAF/1.40-RAF': 'urunler/raf-sistemleri/40x40/model-1',
  'ürünler/Raf Sistemleri/40X40 RAF/2-40RAF': 'urunler/raf-sistemleri/40x40/model-2',
  'ürünler/Raf Sistemleri/Slindir Raf Sistemleri': 'urunler/raf-sistemleri/boru',
  'ürünler/Raf Sistemleri/Slindir Raf Sistemleri/slindir': 'urunler/raf-sistemleri/boru/silindir',
  'ürünler/Raf Sistemleri/Slindir Raf Sistemleri/boru2': 'urunler/raf-sistemleri/boru/model-2',
  'ürünler/Raf Sistemleri/Slindir Raf Sistemleri/boru3': 'urunler/raf-sistemleri/boru/model-3',

  'ürünler/Mankenler': 'urunler/mankenler',
  'ürünler/Mankenler/plastik manken': 'urunler/mankenler/plastik',
  'ürünler/Mankenler/plastik manken/plastik': 'urunler/mankenler/plastik/modeller',
  'ürünler/Mankenler/polyestermankenler': 'urunler/mankenler/polyester',
  'ürünler/Mankenler/polyestermankenler/bayan': 'urunler/mankenler/polyester/kadin',
  'ürünler/Mankenler/polyestermankenler/bayan/Polyester Bayan': 'urunler/mankenler/polyester/kadin/seri-1',
  'ürünler/Mankenler/polyestermankenler/bayan/Polyester Bayan 2': 'urunler/mankenler/polyester/kadin/seri-2',
  'ürünler/Mankenler/polyestermankenler/erkek': 'urunler/mankenler/polyester/erkek',
  'ürünler/Mankenler/polyestermankenler/erkek/Polyester Erkek': 'urunler/mankenler/polyester/erkek/seri-1',
  'ürünler/Mankenler/polyestermankenler/çoçuk': 'urunler/mankenler/polyester/cocuk',
  'ürünler/Mankenler/terzimankenleri': 'urunler/mankenler/terzi',
  'ürünler/Mankenler/terzimankenleri/erkek': 'urunler/mankenler/terzi/erkek',
  'ürünler/Mankenler/terzimankenleri/kadın': 'urunler/mankenler/terzi/kadin',
  'ürünler/Mankenler/terzimankenleri/kadın/Kollu': 'urunler/mankenler/terzi/kadin/kollu',
  'ürünler/Mankenler/terzimankenleri/kadın/Kolsuz': 'urunler/mankenler/terzi/kadin/kolsuz',

  'ürünler/Askılar': 'urunler/askilar',
  'ürünler/Askılar/Ahşap Askılar': 'urunler/askilar/ahsap',
  'ürünler/Askılar/Ahşap Askılar/ahsap': 'urunler/askilar/ahsap/klasik',
  'ürünler/Askılar/Ahşap Askılar/bluz': 'urunler/askilar/ahsap/bluz',
  'ürünler/Askılar/Ahşap Askılar/ceket': 'urunler/askilar/ahsap/ceket',
  'ürünler/Askılar/Ahşap Askılar/coçuk': 'urunler/askilar/ahsap/cocuk',
  'ürünler/Askılar/Ahşap Askılar/pantalon': 'urunler/askilar/ahsap/pantolon',
  'ürünler/Askılar/Baskılı Askılar': 'urunler/askilar/baskili',
  'ürünler/Askılar/Metal Askılar/eşarp askısı': 'urunler/askilar/metal/esarp',
  'ürünler/Askılar/Metal Askılar/mayo askıcı': 'urunler/askilar/metal/mayo',
  'ürünler/Askılar/Metal Askılar/metal askı': 'urunler/askilar/metal/klasik',
  'ürünler/Askılar/Plastik Askılar/Sakalar': 'urunler/askilar/plastik/seri-1',
  'ürünler/Askılar/Plastik Askılar/yalçın plastik askılar': 'urunler/askilar/plastik/seri-2',
  'ürünler/Askılar/yigit eşarp askısı': 'urunler/askilar/esarp',
};

// Ana sayfa slider'ı tam ekran: 2560px yeterli, orijinaller 3840px / 4-6 MB.
const MAX_WIDTH = 2560;

const slugify = (s) =>
  s
    .normalize('NFC')
    .toLocaleLowerCase('tr')
    .replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i')
    .replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u')
    .replace(/[^a-z0-9.]+/g, '-')
    .replace(/^-+|-+$/g, '');

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });

const mapping = {};
const skipped = [];
let before = 0;
let after = 0;

for (const file of walk(OLD_ROOT)) {
  if (!/\.(png|jpe?g)$/i.test(file)) continue;
  const rel = path.relative(OLD_ROOT, file).normalize('NFC');
  const relDir = path.dirname(rel);
  const target = DIR_MAP[relDir];
  if (!target) {
    skipped.push(rel);
    continue;
  }
  const ext = path.extname(rel).toLowerCase().replace('jpeg', 'jpg');
  const name = slugify(path.basename(rel, path.extname(rel))) + ext;
  const out = path.join(NEW_ROOT, target, name);
  fs.mkdirSync(path.dirname(out), { recursive: true });

  const img = sharp(file).rotate();
  const { width } = await img.metadata();
  if (ext === '.jpg' && width > MAX_WIDTH) {
    await img.resize({ width: MAX_WIDTH }).jpeg({ quality: 85, mozjpeg: true }).toFile(out);
  } else {
    fs.copyFileSync(file, out);
  }
  before += fs.statSync(file).size;
  after += fs.statSync(out).size;
  mapping[`images/${rel}`] = path.relative(path.resolve('.'), out);
}

fs.writeFileSync('scripts/gorsel-eslesme.json', JSON.stringify(mapping, null, 2) + '\n');

const mb = (n) => (n / 1024 / 1024).toFixed(1) + ' MB';
console.log(`Taşınan: ${Object.keys(mapping).length} görsel (${mb(before)} → ${mb(after)})`);
console.log(`Atlanan: ${skipped.length}`);
const skippedDirs = [...new Set(skipped.map((s) => path.dirname(s)))];
skippedDirs.forEach((d) => console.log('  - ' + d));
