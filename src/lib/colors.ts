// Renk filtresindeki renk adları → ekranda gösterilen renk örneği.
// Metalik tonlar degrade ile gösterilir.
export const COLOR_SWATCHES: Record<string, string> = {
  Siyah: '#16181c',
  Beyaz: '#ffffff',
  Gri: '#8a9099',
  Gümüş: 'linear-gradient(135deg, #f4f5f7 0%, #b9bec6 50%, #eef0f3 100%)',
  Altın: 'linear-gradient(135deg, #f6e27a 0%, #c9a227 50%, #f3d77a 100%)',
  Bronz: 'linear-gradient(135deg, #d9a36a 0%, #8c5a2b 60%, #c28a52 100%)',
  Bakır: 'linear-gradient(135deg, #f0b39a 0%, #b8653f 60%, #e39b7a 100%)',
  Naturel: '#d9b98c',
  Kahverengi: '#6b4428',
  'Ten rengi': '#e6bfa0',
  Kırmızı: '#d0342c',
  Bordo: '#7a1f2b',
  Pembe: '#f2a6c0',
  Mavi: '#2f6fd6',
  Lacivert: '#1f2f5c',
  Yeşil: '#8fb59a',
  Şeffaf: 'repeating-conic-gradient(#e8ebef 0% 25%, #ffffff 0% 50%) 50% / 8px 8px',
};

/** Filtrede renkler bu sırayla listelenir */
export const COLOR_ORDER = Object.keys(COLOR_SWATCHES);
