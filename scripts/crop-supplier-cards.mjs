// Tedarikçi ürün kartlarından (fotoğraf + yazılı özellik paneli) sadece fotoğraf alanını kırpar.
// Özellikler kartlardan okunup src/data/catalog-overrides.ts'e yazıldı.
// Kullanım: node scripts/crop-supplier-cards.mjs → askilar/esarp/*-foto.jpg
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const DIR = 'src/assets/images/urunler/askilar/esarp';
for (const file of fs.readdirSync(DIR).filter((f) => /^\d+-.*\.jpg$/.test(f) && !f.includes('-foto'))) {
  const src = path.join(DIR, file);
  const { width, height } = await sharp(src).metadata();
  const left = Math.round(width * 0.035);
  const top = Math.round(height * 0.09);
  const out = path.join(DIR, file.replace('.jpg', '-foto.jpg'));
  await sharp(src)
    .extract({ left, top, width: Math.round(width * 0.598) - left, height: Math.round(height * 0.915) - top })
    .jpeg({ quality: 90 })
    .toFile(out);
  console.log(out);
}
