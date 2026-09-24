# Güney Mağaza Dekorasyon — Astro sitesi

Eski statik site (sadece referans, dokunma): `~/Desktop/PROJELERİM/İsmail Duman - Güney Dekorasyon`

## Komutlar
- `npm run dev` — geliştirme sunucusu (arka planda: `npx astro dev --background`, durdur: `npx astro dev stop`)
- `npm run build` — üretim çıktısı `dist/`
- `npm run check` — TypeScript / Astro tip kontrolü
- `npm run images` — eski siteden görselleri yeniden taşır (eşleme: `scripts/gorsel-eslesme.json`)
- `npm run catalog` — ürün kataloğunu görsel klasörlerinden yeniden üretir → `src/data/catalog.json`

## Ürün kataloğu
- 500 ürün `scripts/build-catalog.mjs` ile üretilir: klasör → kategori yolu, ad, katalog no, filtre özellikleri (renk/cinsiyet/tip/kol), teknik özellikler.
- Renk görselden otomatik tespit edilir; yanlışlar `COLOR_OVERRIDES` (kod → renk) ile düzeltilir. Terzi mankeni ve plastik seri-2 askılarda renk filtresi bilinçli olarak yok.
- Plastik manken tip/cinsiyet sınıflandırması elle yapıldı (`PLASTIK_LOOSE`, `PLASTIK_MODELLER`).
- Kategori ağacı: `src/data/categories.ts`; kategori SEO metinleri: `src/data/category-content.ts`.
- Kategori sayfaları tek şablon: `src/pages/[...kategori].astro`. Liste/filtre: `components/product/ProductListing.astro` (durum URL'de).
- Tarayıcı tarafı katalog verisi `/katalog.json` (arama, hızlı bakış, teklif listesi) — sayfalara gömülmez.
- Teklif listesi `localStorage`'da (`scripts/quote-list.ts`); gönderim WhatsApp mesajı olarak.

## Görsel temizleme betikleri
- `scripts/clean-category-covers.mjs` — kategori kapaklarındaki gömülü etiketleri siler
- `scripts/clean-white-bg.mjs <dosya...>` — beyaz zemindeki soluk gri izleri temizler (→ `-temiz.png`)
- `scripts/crop-supplier-cards.mjs` — tedarikçi kartlarından sadece fotoğrafı kırpar (→ `-foto.jpg`)

## Kurallar
- Firma bilgileri (telefon, adres, saat, sosyal) sadece `src/config/site.ts` içinde. Sayfalara elle yazma.
- Her sayfa `BaseLayout` kullanır ve `title` + `description` verir; SEO etiketleri `components/seo/Seo.astro` üretir.
- Görseller `src/assets/images/` altında, her zaman `astro:assets` `<Image>`/`<Picture>` ile kullanılır (otomatik WebP + boyutlandırma). `public/` sadece favicon/logo gibi sabit URL gereken dosyalar için.
- URL'ler ve dosya adları Türkçe karaktersiz, küçük harf, tireli (`/mankenler/terzi-mankeni/`). `trailingSlash: 'always'`.
- Stil: Tailwind v4, tasarım değişkenleri `src/styles/global.css` `@theme` içinde.

## Dokümantasyon
https://docs.astro.build — routing, content collections, styling, fonts, images rehberlerine bakmadan ilgili işe başlama.
