# Yayına alma rehberi

Yeni site: **https://guneydekorasyonraf.com**
Eski site (şu an yayında): **guneydekorasyonraf.com.tr**

Amaç: Yeni siteyi `.com` adresinde yayına almak ve `.com.tr` adresindeki eski sayfaların Google sıralamasını kaybetmeden yeni adreslere taşımak.

---

## 1. Paketi hazırla

```bash
npm run paket
```

`yayin/` klasöründe iki dosya oluşur:

| Dosya | Nereye yüklenecek |
|---|---|
| `guneydekorasyonraf.com.zip` | Yeni domainin (`.com`) hosting'i |
| `eski-domain-com-tr.zip` | Eski domainin (`.com.tr`) hosting'i |

## 2. Yeni siteyi yükle (`guneydekorasyonraf.com`)

Site statik HTML'dir. PHP veya veritabanı gerekmez, her hosting'de çalışır.

**cPanel / Plesk hosting (Natro, Güzel Hosting, TurkTicaret vb.):**
1. Domaini hosting paketine bağla (DNS'te A kaydı veya nameserver).
2. Dosya Yöneticisi → `public_html` klasörünü boşalt.
3. `guneydekorasyonraf.com.zip` dosyasını yükle ve **public_html içine çıkart**. `index.html` doğrudan `public_html` altında olmalı, alt klasörde değil.
4. Gizli dosyaları göster (Settings → Show hidden files): `.htaccess` dosyasının orada olduğunu kontrol et.
5. SSL: cPanel → SSL/TLS Status → AutoSSL veya Let's Encrypt ile `guneydekorasyonraf.com` ve `www.guneydekorasyonraf.com` için sertifika al.

`.htaccess` dosyası şunları otomatik yapar:
- `http://` ve `www.` ile gelenleri `https://guneydekorasyonraf.com` adresine yönlendirir.
- Eski dosya adlarıyla gelenleri (`/kadinterzi-urun-7.html` gibi) yeni sayfalara 301 ile yönlendirir.
- Bulunamayan sayfalarda özel 404 sayfasını gösterir.

**Netlify veya Cloudflare Pages kullanılırsa:** `dist/` klasörünü yayınlamak yeterli. Bu platformlar `_redirects` dosyasını otomatik okur, `.htaccess` dosyası göz ardı edilir.

## 3. Eski domaini yönlendir (`guneydekorasyonraf.com.tr`)

Eski sitenin hosting'inde:
1. `public_html` içindeki eski dosyaları bir yedek klasöre taşı ya da sil.
2. `eski-domain-com-tr.zip` dosyasını `public_html` içine çıkart. İçinde sadece `.htaccess` vardır.
3. Test et: `https://guneydekorasyonraf.com.tr/kadinterzi-urun-7.html` adresi yeni sitedeki ürün sayfasına gitmeli.

> **Önemli:** Eski domaini ve hosting'ini **en az 1 yıl** kapatma. Google'ın bütün eski adresleri yeni domaine taşıması aylar sürer. Domain süresi dolarsa yönlendirmeler de biter.

## 4. Google Search Console

1. https://search.google.com/search-console adresinde **iki mülk** ekle: `guneydekorasyonraf.com` ve `guneydekorasyonraf.com.tr`. Doğrulamayı DNS (TXT kaydı) ile yap.
2. `.com` mülkünde → Site haritaları → `sitemap-index.xml` gönder.
3. `.com.tr` mülkünde → Ayarlar → **Adres değişikliği** → yeni site olarak `guneydekorasyonraf.com` seç. Bu adım, Google'a taşınmayı resmi olarak bildirir.
4. Birkaç gün sonra `.com` mülkünde Sayfalar raporunu kontrol et. 500 ürün sayfası dizine girmeye başlamalı.

## 5. Google İşletme Profili

Google Haritalar'daki **Güney Mağaza Dekorasyon** kaydında web sitesi adresini `https://guneydekorasyonraf.com` olarak güncelle. Sitedeki harita ve adres bu kayıtla birebir aynı.

## 6. Yayın sonrası kontrol listesi

- [ ] `https://guneydekorasyonraf.com` açılıyor, tarayıcıda kilit (SSL) simgesi var
- [ ] `http://guneydekorasyonraf.com` ve `https://www.guneydekorasyonraf.com` adresleri `https://guneydekorasyonraf.com` adresine yönleniyor
- [ ] `https://guneydekorasyonraf.com/kadinterzi-urun-7.html` ürün sayfasına yönleniyor
- [ ] `https://guneydekorasyonraf.com.tr/` yeni ana sayfaya yönleniyor
- [ ] `https://guneydekorasyonraf.com/olmayan-sayfa` özel 404 sayfasını gösteriyor
- [ ] Teklif listesi: bir ürün ekle, "WhatsApp ile gönder" doğru numarayı açıyor
- [ ] https://search.google.com/test/rich-results adresinde bir ürün sayfasını test et (Product, BreadcrumbList, FAQPage)

## Güncelleme yaparken

| Değişiklik | Yapılacak |
|---|---|
| Firma bilgisi (telefon, adres, saat) | `src/config/site.ts` → `npm run paket` |
| Yeni ürün görseli | Görseli ilgili klasöre koy → `npm run catalog` → `npm run paket` |
| Metin, kategori açıklaması | `src/data/…` → `npm run paket` |

Her güncellemeden sonra sadece yeni `guneydekorasyonraf.com.zip` dosyasını yükle. Eski domain dosyası değişmez.
