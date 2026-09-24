// Kategori sayfası metinleri (SEO başlığı, açıklama, giriş, içerik, SSS).
// Anahtar: kategori yolu ("mankenler/terzi-mankeni"). Alt türler (kadın/erkek vb.) üst kategorinin
// içeriğini kullanır; giriş cümlesi otomatik üretilir.
// Kaynak: eski sitedeki kategori açıklamaları, anahtar kelime tekrarları temizlenerek.

export interface CategoryContent {
  metaTitle: string;
  metaDescription: string;
  intro: string;
  body: string[];
  faq?: { q: string; a: string }[];
}

export const CATEGORY_CONTENT: Record<string, CategoryContent> = {
  // ---------------------------------------------------------------- Raf sistemleri
  'raf-sistemleri': {
    metaTitle: 'Mağaza Raf Sistemleri',
    metaDescription:
      'Mağaza raf sistemleri: metal depo rafı, boru raf ve 40×40 raf sistemleri. Ölçüye özel üretim, Türkiye geneli montaj ve 2 yıl garanti. Güney Mağaza Dekorasyon, İstanbul.',
    intro:
      'Duvar, depo ve teşhir alanları için ölçüye özel metal raf sistemleri. Tasarımını yapıyor, atölyemizde üretiyor ve mağazanıza kuruyoruz.',
    body: [
      'Raf sistemi, mağazada ürünün müşteriyle ilk buluştuğu yerdir. Doğru yükseklik, doğru derinlik ve ürün grubuna uygun aparatlar hem sergilemeyi hem de mağaza içi dolaşımı belirler. Bu yüzden her projeye ölçü alarak başlıyor, rafı mağazanın duvarına ve ürün yelpazesine göre tasarlıyoruz.',
      'Depo alanları için yüksek taşıma kapasiteli metal depo rafları, teşhir duvarları için endüstriyel görünümlü boru raf sistemleri ve modüler, ayarlanabilir 40×40 profil raf sistemleri üretiyoruz. Tüm sistemler giyim, ayakkabı, çanta, aksesuar ve kutulu ürünlerin sergilenmesine uygundur.',
    ],
    faq: [
      {
        q: 'Raf sistemleri mağazamın ölçüsüne göre üretiliyor mu?',
        a: 'Evet. Yerinde ölçü alıyor, duvar uzunluğu, tavan yüksekliği ve ürün grubunuza göre raf aralıklarını belirliyoruz. Standart ölçü zorunluluğu yok.',
      },
      {
        q: 'Raf sistemlerinin üretimi ve montajı ne kadar sürer?',
        a: 'Onaydan sonra üretim ortalama 7–15 gün sürer. Montaj proje büyüklüğüne göre 1–3 gün içinde tamamlanır.',
      },
      {
        q: 'İstanbul dışına raf sistemi kurulumu yapıyor musunuz?',
        a: 'Evet. Kendi montaj ekibimizle Türkiye’nin her iline kurulum yapıyoruz.',
      },
    ],
  },
  'raf-sistemleri/depo-raf': {
    metaTitle: 'Metal Depo Rafı',
    metaDescription:
      'Yüksek taşıma kapasiteli metal depo rafları. Mağaza deposu ve stok alanları için ölçüye özel üretim ve montaj. Güney Mağaza Dekorasyon.',
    intro: 'Mağaza deposu ve stok alanları için yüksek taşıma kapasiteli, kaliteli metal malzemeden üretilen depo rafları.',
    body: [
      'Metal depo rafları, stok alanını düzenli ve erişilebilir tutmanın en pratik yoludur. Dayanıklı metal gövdesi sayesinde ağır koli ve ürünleri güvenle taşır, uzun yıllar sorunsuz kullanılır.',
      'Raf yüksekliği, kat sayısı ve derinliği deponuzun ölçüsüne göre belirlenir. Farklı renk seçenekleriyle depo düzeninizi ürün gruplarına göre ayırabilirsiniz.',
    ],
  },
  'raf-sistemleri/boru-raf': {
    metaTitle: 'Boru Raf Sistemi',
    metaDescription:
      'Endüstriyel görünümlü boru raf sistemleri. Butik, spor giyim ve konsept mağazalar için duvar teşhir çözümü. Ölçüye özel üretim ve montaj.',
    intro:
      'Dayanıklılığı ve modern endüstriyel tasarımı bir arada sunan boru raf sistemleri. Butik, spor giyim ve konsept mağazalar için.',
    body: [
      'Sağlam metal boru konstrüksiyonu, ağır ürünlerde bile yüksek taşıma kapasitesi sağlar. Sade ama güçlü görünümü ürünü öne çıkarır ve mağaza ambiyansına modern bir dokunuş katar.',
      'Kıyafet, mont, gömlek, pantolon, çanta, aksesuar ve kutulu ürünlerin düzenli sergilenmesine uygundur. Duvar montajlı yapısı alanı verimli kullanır, istenen ölçü ve düzende kurulur.',
    ],
  },
  'raf-sistemleri/40x40-raf': {
    metaTitle: '40×40 Raf Sistemi',
    metaDescription:
      '40×40 profil raf sistemleri: modüler, ayarlanabilir ve yüksek taşıma kapasiteli mağaza rafları. Tekstil ve perakende mağazaları için ölçüye özel üretim.',
    intro:
      'Modüler yapısı, yüksek taşıma kapasitesi ve modern görünümüyle tekstil ve perakende mağazalarında en çok tercih edilen raf sistemi.',
    body: [
      'Kaliteli 40×40 profilden üretilen raf sistemleri, ağır ürünlerde bile eğilme ve deformasyon yapmaz. Ayarlanabilir raf yapısı sayesinde mağazanın kullanım alanına göre istenen ölçü ve düzende konumlandırılır.',
      'Spor giyimden klasik butiklere kadar farklı mağaza konseptlerine uyum sağlar. Kıyafet, ayakkabı, çanta ve aksesuarların düzenli ve profesyonel bir şekilde sergilenmesini sağlar.',
    ],
  },

  // ---------------------------------------------------------------- Orta sistemleri
  'orta-sistemleri': {
    metaTitle: 'Mağaza Orta Sistemleri ve Teşhir Üniteleri',
    metaDescription:
      'Mağaza orta sistemleri: altın, gümüş ve siyah teşhir üniteleri, askılık ve orta ünite modelleri. Ölçüye özel üretim ve montaj. Güney Mağaza Dekorasyon.',
    intro:
      'Mağazanın ortasında ürünü öne çıkaran teşhir üniteleri ve askılıklar. Farklı ölçü, malzeme ve renk seçenekleriyle mağaza konseptinize göre üretiyoruz.',
    body: [
      'Orta sistemleri, müşterinin mağaza içindeki dolaşımını yönlendirir ve kampanya ürünlerini görünür kılar. Dayanıklı malzemelerden üretilen bu üniteler, mağaza dekorasyonuna estetik bir dokunuş katarak alışveriş deneyimini iyileştirir.',
      'Metal, cam ve ahşap kombinasyonlarıyla altın, gümüş ve siyah renk seçeneklerinde üretim yapıyoruz. Tüm modeller mağazanızın ölçüsüne ve markanıza göre özelleştirilebilir.',
    ],
    faq: [
      {
        q: 'Orta ünitelerde renk ve ölçü değiştirilebilir mi?',
        a: 'Evet. Katalogdaki modeller örnek niteliğindedir. Ölçü, renk ve malzemeyi mağazanıza göre değiştirerek üretiyoruz.',
      },
      {
        q: 'Orta sistemleri tek başına sipariş edebilir miyim?',
        a: 'Evet. Komple mağaza projesi zorunlu değil; tek ünite veya birkaç adet için de teklif hazırlıyoruz.',
      },
    ],
  },

  // ---------------------------------------------------------------- Standlar
  standlar: {
    metaTitle: 'Konfeksiyon Askılığı ve Mağaza Standları',
    metaDescription:
      'Tekerlekli konfeksiyon askılıkları ve mağaza standları. Krom ve siyah seçenekler, ayarlanabilir yükseklik. Güney Mağaza Dekorasyon, İstanbul.',
    intro:
      'Mağaza, showroom ve atölyeler için tekerlekli konfeksiyon askılıkları ve teşhir standları.',
    body: [
      'Tekerlekli konfeksiyon askılıkları, ürünleri mağaza içinde kolayca taşımanızı ve kampanya alanlarını hızla yeniden düzenlemenizi sağlar. Sağlam metal gövdesi yoğun kullanıma dayanır.',
      'Krom ve siyah renk seçenekleriyle, tek ve çift askı borulu modeller üretiyoruz. Showroom, atölye ve depo kullanımı için de uygundur.',
    ],
  },

  // ---------------------------------------------------------------- Mankenler
  mankenler: {
    metaTitle: 'Vitrin Mankeni ve Terzi Mankeni Modelleri',
    metaDescription:
      'Terzi mankeni, plastik manken ve polyester vitrin mankeni modelleri. Kadın, erkek ve çocuk seçenekleri. Güney Mağaza Dekorasyon, İstanbul.',
    intro:
      'Vitrin, mağaza içi sunum ve atölye kullanımı için terzi, plastik ve polyester manken modelleri. Kadın, erkek ve çocuk seçenekleriyle.',
    body: [
      'Doğru manken, kıyafetin müşteriye nasıl duracağını gösterir ve vitrinin ilk izlenimini belirler. Terzi mankenleri atölyede prova ve kalıp çalışması için, plastik ve polyester mankenler ise vitrin ve mağaza içi sunum için tasarlanır.',
      'Plastik mankenler hafif ve ekonomiktir; tam boy modellerin yanında gövde, kafa ve alt beden seçenekleri de sunar. Polyester mankenler parlak ve mat yüzey seçenekleriyle daha premium bir görünüm sağlar.',
    ],
    faq: [
      {
        q: 'Terzi mankeni ile vitrin mankeni arasındaki fark nedir?',
        a: 'Terzi mankeni prova, ölçü ve kalıp çalışması için tasarlanır; üzerine iğne batırılabilir ve genellikle ayarlanabilir ayağı vardır. Vitrin mankenleri (plastik, polyester) ürün sergilemek içindir.',
      },
      {
        q: 'Plastik mi polyester manken mi tercih etmeliyim?',
        a: 'Plastik mankenler hafif ve ekonomiktir, yoğun kullanılan mağazalar için idealdir. Polyester mankenler parlak ve mat yüzey seçenekleriyle daha şık bir vitrin görünümü sağlar.',
      },
      {
        q: 'Toplu manken siparişi veriyor musunuz?',
        a: 'Evet. Zincir mağazalar ve toplu alımlar için adet bazlı teklif hazırlıyoruz. Teklif listesine modelleri ekleyip bize gönderebilirsiniz.',
      },
    ],
  },
  'mankenler/terzi-mankeni': {
    metaTitle: 'Terzi Mankeni Modelleri',
    metaDescription:
      'Kadın ve erkek terzi mankeni modelleri. Kollu ve kolsuz seçenekler, ahşap veya metal taban, ayarlanabilir ayak. Terzi atölyeleri ve butikler için.',
    intro:
      'Prova, ölçü ve kalıp çalışmaları için gerçekçi vücut oranlarına sahip kadın ve erkek terzi mankenleri.',
    body: [
      'Terzi mankenleri, profesyonel terzilerin, butiklerin ve moda tasarımcılarının yüksek verimle çalışabilmesi için tasarlanır. Gerçekçi vücut oranları sayesinde dikilen kıyafetin bedendeki duruşu doğru gözlemlenir.',
      'Üzerine kolayca iğne takılabilir, kumaş kaymadan prova yapılır. Ahşap veya metal taban seçenekleri ve yüksekliği ayarlanabilir ayak yapısıyla atölyede işlevsel, vitrinde dekoratif kullanım sunar.',
    ],
  },
  'mankenler/plastik-manken': {
    metaTitle: 'Plastik Manken Modelleri',
    metaDescription:
      'Plastik manken modelleri: tam boy, gövde, kafa ve alt beden. Kadın, erkek ve çocuk seçenekleri. Mağaza vitrini ve e-ticaret çekimleri için.',
    intro:
      'Mağaza vitrinleri, butik sunumları ve e-ticaret çekimleri için dayanıklı ve hafif plastik mankenler.',
    body: [
      'Plastik mankenler darbelere dayanıklı yapısı ve kolay taşınabilirliği sayesinde yoğun kullanılan mağazalar için idealdir. Kolay temizlenen yüzeyi ve sabit ayak yapısıyla uzun ömürlüdür.',
      'Tam boy mankenlerin yanında gövde, kafa, alt beden ve bacak modelleri de sunuyoruz. Tişört, elbise, ceket, pantolon, çorap ve aksesuar sergilemek için doğru parçayı filtrelerden seçebilirsiniz.',
    ],
  },
  'mankenler/polyester-manken': {
    metaTitle: 'Polyester Manken Modelleri',
    metaDescription:
      'Polyester vitrin mankenleri: kadın, erkek ve çocuk. Altın, gümüş, siyah ve beyaz; parlak ve mat yüzey seçenekleri. Güney Mağaza Dekorasyon.',
    intro:
      'Parlak ve mat yüzey seçenekleriyle vitrine premium bir görünüm kazandıran kadın, erkek ve çocuk polyester mankenler.',
    body: [
      'Yüksek kaliteli polyester malzemeden üretilen mankenler, darbelere ve çizilmelere dayanıklı yapısıyla yoğun mağaza kullanımında bile formunu korur. Gerçekçi anatomik hatları sayesinde kıyafetleri en doğru şekilde sergiler.',
      'Altın, gümüş, siyah, beyaz ve ten rengi seçenekleriyle mağaza konseptinize uyum sağlar. Hafif yapısı sayesinde vitrinde kolayca yeniden konumlandırılır.',
    ],
  },

  // ---------------------------------------------------------------- Askılar
  askilar: {
    metaTitle: 'Mağaza Askısı Modelleri: Ahşap, Plastik, Metal',
    metaDescription:
      'Ahşap, plastik, metal ve logo baskılı mağaza askıları. Ceket, pantolon, bluz, çocuk, eşarp ve mayo askıları. Toplu sipariş için teklif alın.',
    intro:
      'Ahşap, plastik, metal ve logo baskılı askılar. Ceketten mayoya, eşarptan çocuk giyimine kadar her ürün grubu için doğru askı.',
    body: [
      'Askı, mağazada en çok göz önünde olan ama en az düşünülen ekipmandır. Doğru askı kıyafetin formunu korur, raf düzenini sadeleştirir ve markanın kalitesini yansıtır.',
      'Premium mağazalar için doğal ve boyalı ahşap askılar, yüksek adetli ihtiyaçlar için ekonomik plastik askılar, eşarp, mayo ve aksesuar için metal askılar sunuyoruz. Ahşap ve plastik askılara markanızın logosunu baskılı olarak uygulayabiliyoruz.',
    ],
    faq: [
      {
        q: 'Askılara logo baskısı yapılıyor mu?',
        a: 'Evet. Ahşap ve plastik askılara yaldız veya tampon baskı ile logo uyguluyoruz. Baskılı askı örneklerini “Baskılı Askı” kategorisinde görebilirsiniz.',
      },
      {
        q: 'Minimum sipariş adedi var mı?',
        a: 'Adet, askı modeline ve baskı ihtiyacına göre değişir. Plastik askılar koli bazında satılır; koli adedi bilinen modellerde bu bilgi ürün özelliklerinde yazılıdır.',
      },
      {
        q: 'Farklı modelleri tek teklifte isteyebilir miyim?',
        a: 'Evet. Beğendiğiniz modelleri teklif listesine ekleyip adetleriyle birlikte tek mesajda gönderebilirsiniz.',
      },
    ],
  },
  'askilar/ahsap-aski': {
    metaTitle: 'Ahşap Askı Modelleri',
    metaDescription:
      'Ahşap askı modelleri: klasik, ceket, pantolon, bluz ve çocuk askısı. Naturel, siyah, beyaz ve renkli seçenekler, logo baskı imkânı.',
    intro:
      'Premium mağazalar için klasik, ceket, pantolon, bluz ve çocuk ahşap askıları. Naturel, boyalı ve logo baskılı seçeneklerle.',
    body: [
      'Ahşap askılar kıyafete değer katan, markanın kalitesini ilk dokunuşta hissettiren ürünlerdir. Geniş omuz formlu ceket askıları formu korur, mandallı pantolon askıları ürünü kırıştırmadan tutar.',
      'Naturel, kahverengi, siyah, beyaz ve renkli boya seçenekleriyle üretilir. Markanızın logosunu yaldız veya tampon baskı ile uygulayabiliyoruz.',
    ],
  },
  'askilar/plastik-aski': {
    metaTitle: 'Plastik Askı Modelleri',
    metaDescription:
      'Plastik askı modelleri: ceket, gömlek, iç çamaşır, mayo, şal ve eşarp askıları; askı aksesuarları. Koli bazında toplu satış. Güney Mağaza Dekorasyon.',
    intro:
      'Mağazalar için en pratik ve ekonomik çözüm: ceket, gömlek, iç çamaşır, mayo, şal ve eşarp için plastik askılar ve askı aksesuarları.',
    body: [
      'Plastik askılar hafif yapıları, sağlam malzemeleri ve uygun maliyetleri sayesinde yüksek adet ihtiyacı olan mağazaların ilk tercihidir. Kıyafetin formunu korur, kırışmayı önler ve raf düzenini sadeleştirir.',
      'Premium görünümlü parlak ve metalik ceket askılarının yanında iç çamaşır, mayo, şal ve eşarp askıları ile beden belirleyici, askı köprüsü ve klips gibi aksesuarlar da sunuyoruz.',
    ],
  },
  'askilar/metal-aski': {
    metaTitle: 'Metal Askı ve Kanca Modelleri',
    metaDescription:
      'Metal askı modelleri: mandallı kanca, S kanca, tel askı, eşarp ve mayo askıları. Tedarikçi kodlarıyla katalog. Güney Mağaza Dekorasyon.',
    intro: 'Mandallı kanca, S kanca, tel askı, eşarp ve mayo askıları. Aksesuar ve iç giyim sunumu için metal askılar.',
    body: [
      'Metal askılar ince profilleri sayesinde raf ve duvar sistemlerinde yer kazandırır. Mandallı kancalar çorap, aksesuar ve küçük ürünlerin askıda sergilenmesini sağlar.',
      'Eşarp ve şal askıları tek askıda birden fazla ürünü düzenli gösterir; tel mayo askıları mayo ve iç giyim ürünlerinin formunu korur.',
    ],
  },
  'askilar/baskili-aski': {
    metaTitle: 'Logo Baskılı Askı',
    metaDescription:
      'Markanıza özel logo baskılı ahşap ve plastik askılar. Yaldız ve tampon baskı. Örnek çalışmalar ve toplu sipariş için teklif alın.',
    intro: 'Markanızın logosunu taşıyan ahşap ve plastik askılar. Aşağıdaki örnekler farklı markalar için ürettiğimiz çalışmalardır.',
    body: [
      'Logo baskılı askı, mağazada markayı kıyafetin ilk dokunduğu noktaya taşır. Yaldız ve tampon baskı seçenekleriyle logonuzu ahşap veya plastik askılara uyguluyoruz.',
      'Askı modeli, renk ve baskı rengini birlikte seçiyor, onayınızdan sonra üretime geçiyoruz. Logo dosyanızı WhatsApp üzerinden gönderebilirsiniz.',
    ],
  },
};

/** Bir kategori yolu için içerik; alt türlerde üst kategorinin içeriği ve üretilmiş giriş kullanılır. */
export function contentFor(path: string[], name: string, parentName?: string): CategoryContent {
  const key = path.join('/');
  if (CATEGORY_CONTENT[key]) return CATEGORY_CONTENT[key];
  const parent = CATEGORY_CONTENT[path.slice(0, -1).join('/')] ?? CATEGORY_CONTENT[path[0]];
  return {
    metaTitle: `${name} Modelleri`,
    metaDescription: `${name} modelleri ve fiyat teklifi. ${parent.metaDescription}`.slice(0, 158),
    intro: `${name} modellerimizi aşağıda filtreleyerek inceleyebilir, beğendiklerinizi teklif listesine ekleyebilirsiniz.${parentName ? ` Tüm ${parentName.toLocaleLowerCase('tr')} modelleri için üst kategoriye göz atın.` : ''}`,
    body: parent.body,
  };
}
