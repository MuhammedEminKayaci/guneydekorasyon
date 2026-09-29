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
| `eski-domain-com-tr.zip` | Eski domainin (`.com.tr`) hosting'i (`web.config` + `.htaccess`) |

## 2. Mevcut durum (TurkTicaret.net, 29.09.2026 itibarıyla)

| Domain | Şu an | Sunucu |
|---|---|---|
| `guneydekorasyonraf.com.tr` | Eski site yayında | TurkTicaret **Windows / Plesk (IIS)** hosting, IP 31.186.11.163 |
| `guneydekorasyonraf.com` | Hosting'e bağlı değil, TurkTicaret park sayfası | Park sunucusu, IP 31.186.11.254 |

İki domainin DNS'i de TurkTicaret'te (ns1–ns3.turkticaret.net). Bu yüzden hosting'e bağlandığında DNS kaydı otomatik güncellenir.

Paketteki dosyalar hem Windows hem Linux hosting'de çalışır:
- **Windows (Plesk/IIS):** `web.config` okunur.
- **Linux (cPanel/Apache):** `.htaccess` okunur.

## 3. Yeni siteyi yükle (`guneydekorasyonraf.com`)

### 3a. `.com` domainini hosting'e bağla
TurkTicaret müşteri panelinde:
- **Mevcut Windows hosting paketiniz birden fazla domaine izin veriyorsa** (önerilen, ek ücret yok): Plesk → **Web Siteleri ve Alan Adları → Alan Adı Ekle** → `guneydekorasyonraf.com`. Belge kökü olarak ayrı bir klasör oluşur (ör. `guneydekorasyonraf.com/`).
- **İzin vermiyorsa:** `.com` için ayrı bir hosting paketi alın. Linux (cPanel) paket yeterli ve genellikle daha ucuz. Site statik HTML'dir, PHP veya veritabanı gerekmez.

### 3b. SSL
Plesk → ilgili alan adı → **SSL/TLS Sertifikaları → Let's Encrypt**. `guneydekorasyonraf.com` ve `www.guneydekorasyonraf.com` için ücretsiz sertifika alın. Aynı işlemi `guneydekorasyonraf.com.tr` için de yapın, eski adresin https yönlendirmeleri de sertifika ister.

> SSL kurulmadan siteyi açmayın. `web.config` / `.htaccess` her isteği https'e yönlendirir; sertifika yoksa tarayıcı hata verir.

### 3c. Dosyaları yükle
1. Plesk → **Dosyalar** → `.com` domaininin belge kökü (`httpdocs` ya da `guneydekorasyonraf.com` klasörü). cPanel'de `public_html`.
2. İçindeki varsayılan dosyaları (`index.html`, `default.htm` vb.) silin.
3. `guneydekorasyonraf.com.zip` dosyasını yükleyin → **Çıkart**. `index.html` doğrudan belge kökünde olmalı, alt klasörde değil.
4. `web.config` ve `.htaccess` dosyalarının belge kökünde olduğunu kontrol edin.

`web.config` / `.htaccess` şunları yapar:
- `http://` ve `www.` isteklerini `https://guneydekorasyonraf.com` adresine yönlendirir.
- Eski dosya adlarıyla gelenleri (`/kadinterzi-urun-7.html` gibi) yeni sayfalara 301 ile yönlendirir.
- Bulunamayan sayfalarda özel 404 sayfasını gösterir.
- WebP görseller ve WOFF2 fontlar için dosya türlerini tanımlar. Eski IIS sürümlerinde bu tanım olmazsa görseller açılmaz.

**Olası sorun (Windows):** Site "500 – Internal Server Error" verirse:
- **1. ihtimal:** Hosting özel hata sayfası ayarını kilitlemiştir. `web.config` içindeki `<httpErrors>` bloğunu silin; 404 sayfasını Plesk → **Sanal Dizinler → Hata Belgeleri** bölümünden `/404.html` olarak ayarlayın.
- **2. ihtimal:** Sunucuda **IIS URL Rewrite** modülü yoktur. TurkTicaret destek hattından açılmasını isteyin; Plesk Windows paketlerinde standarttır.

## 4. Eski domaini yönlendir (`guneydekorasyonraf.com.tr`)

Eski sitenin Plesk'inde:
1. **Önce yedek alın:** Belge kökündeki (`httpdocs`) tüm dosyaları indirin ya da bir `yedek-eski-site` klasörüne taşıyın.
2. Belge kökünü boşaltın.
3. `eski-domain-com-tr.zip` dosyasını yükleyip çıkartın. İçinden `web.config` (Windows için) ve `.htaccess` (Linux için) çıkar.
4. Test edin: `https://guneydekorasyonraf.com.tr/kadinterzi-urun-7.html` yeni sitedeki ürün sayfasına gitmeli; `https://guneydekorasyonraf.com.tr/` yeni ana sayfaya gitmeli.

> **Önemli:** `.com.tr` domainini ve hosting'ini **en az 1 yıl** kapatmayın. Google'ın eski adresleri yeni domaine taşıması aylar sürer. Domain süresi dolarsa yönlendirmeler de biter. Hosting'i küçültmek isterseniz TurkTicaret'in "yönlendirme" özelliği yalnızca ana sayfayı taşır, sayfa sayfa eşlemeyi yapmaz. Bu yüzden `web.config` yöntemi tercih edilmeli.

## 5. Google Search Console

1. https://search.google.com/search-console adresinde **iki mülk** ekle: `guneydekorasyonraf.com` ve `guneydekorasyonraf.com.tr`. Doğrulamayı DNS (TXT kaydı) ile yap.
2. `.com` mülkünde → Site haritaları → `sitemap-index.xml` gönder.
3. `.com.tr` mülkünde → Ayarlar → **Adres değişikliği** → yeni site olarak `guneydekorasyonraf.com` seç. Bu adım, Google'a taşınmayı resmi olarak bildirir.
4. Birkaç gün sonra `.com` mülkünde Sayfalar raporunu kontrol et. 500 ürün sayfası dizine girmeye başlamalı.

## 6. Google İşletme Profili

Google Haritalar'daki **Güney Mağaza Dekorasyon** kaydında web sitesi adresini `https://guneydekorasyonraf.com` olarak güncelle. Sitedeki harita ve adres bu kayıtla birebir aynı.

## 7. Yayın sonrası kontrol listesi

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
| Yeni blog yazısı | `src/content/blog/` altına `.md` dosyası ekle (AGENTS.md → Blog) → `npm run paket` |

Her güncellemeden sonra sadece yeni `guneydekorasyonraf.com.zip` dosyasını yükle. Eski domain dosyası değişmez.
