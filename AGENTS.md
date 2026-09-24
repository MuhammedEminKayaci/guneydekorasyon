# Güney Mağaza Dekorasyon — Astro sitesi

Eski statik site (sadece referans, dokunma): `~/Desktop/PROJELERİM/İsmail Duman - Güney Dekorasyon`

## Komutlar
- `npm run dev` — geliştirme sunucusu (arka planda: `npx astro dev --background`, durdur: `npx astro dev stop`)
- `npm run build` — üretim çıktısı `dist/`
- `npm run check` — TypeScript / Astro tip kontrolü
- `npm run images` — eski siteden görselleri yeniden taşır (eşleme: `scripts/gorsel-eslesme.json`)

## Kurallar
- Firma bilgileri (telefon, adres, saat, sosyal) sadece `src/config/site.ts` içinde. Sayfalara elle yazma.
- Her sayfa `BaseLayout` kullanır ve `title` + `description` verir; SEO etiketleri `components/seo/Seo.astro` üretir.
- Görseller `src/assets/images/` altında, her zaman `astro:assets` `<Image>`/`<Picture>` ile kullanılır (otomatik WebP + boyutlandırma). `public/` sadece favicon/logo gibi sabit URL gereken dosyalar için.
- URL'ler ve dosya adları Türkçe karaktersiz, küçük harf, tireli (`/mankenler/terzi-mankeni/`). `trailingSlash: 'always'`.
- Stil: Tailwind v4, tasarım değişkenleri `src/styles/global.css` `@theme` içinde.

## Dokümantasyon
https://docs.astro.build — routing, content collections, styling, fonts, images rehberlerine bakmadan ilgili işe başlama.
