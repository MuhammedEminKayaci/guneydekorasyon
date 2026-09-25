// Eski sitenin adreslerinden yeni sayfalara 301 yönlendirme haritası üretir.
// Kullanım: node scripts/build-redirects.mjs (katalog güncellendikten sonra)
//
// Ürün sayfaları: eski sayfanın ana görseli → görsel taşıma eşlemesi (scripts/gorsel-eslesme.json)
// → aynı görseli kullanan yeni ürün. Kategori ve kurumsal sayfalar elle eşlendi.
//
// Çıktılar:
//   src/data/redirects.json  → 404 sayfasındaki yedek yönlendirme (her sunucuda çalışır)
//   public/.htaccess         → Apache / cPanel hosting (gerçek 301)
//   public/_redirects        → Netlify / Cloudflare Pages (gerçek 301)
import fs from 'node:fs';
import path from 'node:path';

const OLD_ROOT = path.join(process.env.HOME, 'Desktop/PROJELERİM/İsmail Duman - Güney Dekorasyon');
const imageMap = JSON.parse(fs.readFileSync('scripts/gorsel-eslesme.json', 'utf8'));
const catalog = JSON.parse(fs.readFileSync('src/data/catalog.json', 'utf8'));
const productByImage = new Map(catalog.flatMap((p) => p.images.map((img) => [img, p])));

const STATIC = {
  'index.html': '/',
  'rafsistemleri.html': '/raf-sistemleri/',
  'deporafsistemleri.html': '/raf-sistemleri/depo-raf/',
  'boru-rafsistemleri.html': '/raf-sistemleri/boru-raf/',
  'rafsistemleri-40-40.html': '/raf-sistemleri/40x40-raf/',
  'ortasistemleri.html': '/orta-sistemleri/',
  'standlar.html': '/standlar/',
  'mankenlerkatagori.html': '/mankenler/',
  'terzimanken.html': '/mankenler/terzi-mankeni/',
  'terzimankenlerikadin.html': '/mankenler/terzi-mankeni/kadin/',
  'terzimankenlerierkek.html': '/mankenler/terzi-mankeni/erkek/',
  'plastikmanken.html': '/mankenler/plastik-manken/',
  'polyestermanken.html': '/mankenler/polyester-manken/',
  'polyestermanken-kadin.html': '/mankenler/polyester-manken/kadin/',
  'polyestermanken-erkek.html': '/mankenler/polyester-manken/erkek/',
  'polyestermanken-cocuk.html': '/mankenler/polyester-manken/cocuk/',
  'askılar.html': '/askilar/',
  'ahsapaskılar.html': '/askilar/ahsap-aski/',
  'ahsapaskılar-ahsap.html': '/askilar/ahsap-aski/klasik/',
  'ahsapaskılar-bluz.html': '/askilar/ahsap-aski/bluz/',
  'ahsapaskılar-ceket.html': '/askilar/ahsap-aski/ceket/',
  'ahsapaskılar-cocuk.html': '/askilar/ahsap-aski/cocuk/',
  'ahsapaskılar-pantalon.html': '/askilar/ahsap-aski/pantolon/',
  'plastikaskılar.html': '/askilar/plastik-aski/',
  'projeler.html': '/projeler/',
  'hakkımızda.html': '/hakkimizda/',
  'iletişim.html': '/iletisim/',
};

// Ürün sayfası eşlenemezse ait olduğu kategoriye yönlenir
const PRODUCT_GROUP_FALLBACK = {
  'rafsistemleri-urun': '/raf-sistemleri/depo-raf/',
  'rafsistemleri-40x40-urun': '/raf-sistemleri/40x40-raf/',
  'boru-rafsistemleri-urun': '/raf-sistemleri/boru-raf/',
  'ortasistemleri-urun': '/orta-sistemleri/',
  'kadinterzi-urun': '/mankenler/terzi-mankeni/kadin/',
  'erkekterzi-urun': '/mankenler/terzi-mankeni/erkek/',
  'plastikterzi-urun': '/mankenler/plastik-manken/',
  'polyestermanken-kadin-urun': '/mankenler/polyester-manken/kadin/',
  'polyestermanken-erkek-urun': '/mankenler/polyester-manken/erkek/',
  'polyestermanken-cocuk-urun': '/mankenler/polyester-manken/cocuk/',
  'plastikaskılar-urun': '/askilar/plastik-aski/',
};

const redirects = {};
const stats = { static: 0, product: 0, fallback: 0 };

for (const raw of fs.readdirSync(OLD_ROOT).filter((f) => f.endsWith('.html'))) {
  const file = raw.normalize('NFC');
  if (STATIC[file]) {
    redirects[`/${file}`] = STATIC[file];
    stats.static++;
    continue;
  }
  const group = file.replace(/-\d+\.html$/, '');
  if (!PRODUCT_GROUP_FALLBACK[group]) {
    console.warn('Eşlenmeyen sayfa:', file);
    continue;
  }
  const html = fs.readFileSync(path.join(OLD_ROOT, raw), 'utf8');
  const img = html.match(/id="main-image" src="([^"]+)"/)?.[1]?.normalize('NFC');
  const newImage = img && imageMap[img]?.replace(/^src\/assets\/images\//, '');
  const product = newImage && productByImage.get(newImage);
  if (product) {
    redirects[`/${file}`] = `/urun/${product.slug}/`;
    stats.product++;
  } else {
    redirects[`/${file}`] = PRODUCT_GROUP_FALLBACK[group];
    stats.fallback++;
  }
}

const sorted = Object.fromEntries(Object.entries(redirects).sort(([a], [b]) => a.localeCompare(b, 'tr', { numeric: true })));
fs.writeFileSync('src/data/redirects.json', JSON.stringify(sorted, null, 1) + '\n');

// Apache (.htaccess): mod_alias Redirect, çözülmüş (UTF-8) yolla eşleşir
const htaccess = [
  '# Otomatik üretildi: scripts/build-redirects.mjs — elle düzenlemeyin.',
  '# Eski site adreslerinden yeni sayfalara kalıcı (301) yönlendirmeler.',
  'AddDefaultCharset UTF-8',
  'ErrorDocument 404 /404.html',
  '',
  ...Object.entries(sorted).map(([from, to]) => `Redirect 301 "${from}" "${to}"`),
  '',
].join('\n');
fs.writeFileSync('public/.htaccess', htaccess);

// Netlify / Cloudflare Pages: Türkçe karakterli yollar hem ham hem yüzde kodlu yazılır
const lines = ['# Otomatik üretildi: scripts/build-redirects.mjs', ''];
for (const [from, to] of Object.entries(sorted)) {
  lines.push(`${from}  ${to}  301`);
  const encoded = encodeURI(from);
  if (encoded !== from) lines.push(`${encoded}  ${to}  301`);
}
fs.writeFileSync('public/_redirects', lines.join('\n') + '\n');

console.log(`${Object.keys(sorted).length} yönlendirme: ${stats.product} ürün, ${stats.static} sayfa, ${stats.fallback} kategoriye yedek`);
