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
//   public/web.config        → Windows / IIS (Plesk) hosting (gerçek 301, URL Rewrite modülü)
//   deploy/eski-domain/.htaccess + web.config → eski guneydekorasyonraf.com.tr sunucusuna konur
//                                  (şu an Windows Plesk/IIS): her eski sayfayı yeni domaindeki karşılığına taşır
import fs from 'node:fs';
import path from 'node:path';

const SITE_URL = 'https://guneydekorasyonraf.com';
const SITE_HOST = new URL(SITE_URL).host;
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
  'AddDefaultCharset UTF-8',
  'ErrorDocument 404 /404.html',
  '',
  '# IIS yapılandırma dosyası Apache\'de dışarıya sunulmasın',
  '<Files "web.config">',
  '  <IfModule mod_authz_core.c>',
  '    Require all denied',
  '  </IfModule>',
  '  <IfModule !mod_authz_core.c>',
  '    Order allow,deny',
  '    Deny from all',
  '  </IfModule>',
  '</Files>',
  '',
  '# Tek adres: http ve www istekleri https://' + SITE_HOST + ' adresine',
  '<IfModule mod_rewrite.c>',
  '  RewriteEngine On',
  '  RewriteCond %{HTTPS} off',
  '  RewriteCond %{HTTP:X-Forwarded-Proto} !https',
  `  RewriteRule ^ ${SITE_URL}%{REQUEST_URI} [L,R=301]`,
  `  RewriteCond %{HTTP_HOST} !^${SITE_HOST.replace(/\./g, '\\.')}$ [NC]`,
  `  RewriteRule ^ ${SITE_URL}%{REQUEST_URI} [L,R=301]`,
  '</IfModule>',
  '',
  '# Eski site adreslerinden yeni sayfalara kalıcı (301) yönlendirmeler',
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

// Eski domain (.com.tr): her eski sayfa yeni domaindeki karşılığına, kalan her şey yeni ana sayfaya
fs.mkdirSync('deploy/eski-domain', { recursive: true });
fs.writeFileSync(
  'deploy/eski-domain/.htaccess',
  [
    '# Otomatik üretildi: scripts/build-redirects.mjs',
    '# Bu dosya ESKİ domainin (guneydekorasyonraf.com.tr) sunucusuna, eski dosyaların yerine konur.',
    'AddDefaultCharset UTF-8',
    '',
    ...Object.entries(sorted).map(([from, to]) => `Redirect 301 "${from}" "${SITE_URL}${to}"`),
    '',
    '# Eşlenmeyen her adres (eski görseller, bilinmeyen sayfalar) yeni ana sayfaya',
    `RedirectMatch 301 ^/.*$ ${SITE_URL}/`,
    '',
  ].join('\n'),
);

console.log(`${Object.keys(sorted).length} yönlendirme: ${stats.product} ürün, ${stats.static} sayfa, ${stats.fallback} kategoriye yedek`);

// ---------------------------------------------------------------------------
// Windows / IIS (web.config). Türkçe karakterli yollar hem çözülmüş ({URL}) hem yüzde kodlu
// ({UNENCODED_URL}) haliyle haritaya girer; hangisi gelirse eşleşir.
const xml = (v) => v.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const mapEntries = (prefix) =>
  Object.entries(sorted)
    .flatMap(([from, to]) => {
      const rows = [[from, prefix + to]];
      const encoded = encodeURI(from);
      if (encoded !== from) rows.push([encoded, prefix + to]);
      return rows;
    })
    .map(([k, v]) => `          <add key="${xml(k)}" value="${xml(v)}" />`)
    .join('\n');
const mapRules = (name) => `
        <rule name="${name}" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAny">
            <add input="{EskiAdresler:{URL}}" pattern="(.+)" />
            <add input="{EskiAdresler:{UNENCODED_URL}}" pattern="(.+)" />
          </conditions>
          <action type="Redirect" url="{C:1}" redirectType="Permanent" appendQueryString="false" />
        </rule>`;

const iisNew = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Otomatik üretildi: scripts/build-redirects.mjs — elle düzenlemeyin. Windows / IIS (Plesk) için. -->
<configuration>
  <system.webServer>
    <rewrite>
      <rewriteMaps>
        <rewriteMap name="EskiAdresler">
${mapEntries('')}
        </rewriteMap>
      </rewriteMaps>
      <rules>
        <rule name="HTTPS ve tek alan adi" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAny">
            <add input="{HTTPS}" pattern="^OFF$" />
            <add input="{HTTP_HOST}" pattern="^${SITE_HOST.replace(/\./g, '\\.')}$" negate="true" />
          </conditions>
          <action type="Redirect" url="${SITE_URL}{UNENCODED_URL}" redirectType="Permanent" appendQueryString="false" />
        </rule>${mapRules('Eski site adresleri')}
      </rules>
    </rewrite>
    <defaultDocument enabled="true">
      <files>
        <remove value="index.html" />
        <add value="index.html" />
      </files>
    </defaultDocument>
    <staticContent>
      <remove fileExtension=".webp" />
      <mimeMap fileExtension=".webp" mimeType="image/webp" />
      <remove fileExtension=".avif" />
      <mimeMap fileExtension=".avif" mimeType="image/avif" />
      <remove fileExtension=".woff2" />
      <mimeMap fileExtension=".woff2" mimeType="font/woff2" />
      <remove fileExtension=".json" />
      <mimeMap fileExtension=".json" mimeType="application/json" />
    </staticContent>
    <!-- Sunucu 500 hatası verirse (hosting bu bölümü kilitlemişse) aşağıdaki httpErrors bloğunu silin. -->
    <httpErrors errorMode="Custom" existingResponse="Replace">
      <remove statusCode="404" subStatusCode="-1" />
      <error statusCode="404" path="/404.html" responseMode="ExecuteURL" />
    </httpErrors>
  </system.webServer>
  <!-- Dosya adları içerik özetli (hash) olduğundan _astro altındaki dosyalar 1 yıl önbelleğe alınabilir -->
  <location path="_astro">
    <system.webServer>
      <staticContent>
        <clientCache cacheControlMode="UseMaxAge" cacheControlMaxAge="365.00:00:00" />
      </staticContent>
    </system.webServer>
  </location>
</configuration>
`;
fs.writeFileSync('public/web.config', iisNew);

const iisOld = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Otomatik üretildi: scripts/build-redirects.mjs -->
<!-- Bu dosya ESKİ domainin (guneydekorasyonraf.com.tr) sunucusuna, eski dosyaların yerine konur (Windows / IIS). -->
<configuration>
  <system.webServer>
    <rewrite>
      <rewriteMaps>
        <rewriteMap name="EskiAdresler">
${mapEntries(SITE_URL)}
        </rewriteMap>
      </rewriteMaps>
      <rules>${mapRules('Eski sayfalar yeni karsiliklarina')}
        <rule name="Kalan her sey yeni ana sayfaya" stopProcessing="true">
          <match url=".*" />
          <action type="Redirect" url="${SITE_URL}/" redirectType="Permanent" appendQueryString="false" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
`;
fs.writeFileSync('deploy/eski-domain/web.config', iisOld);
