// Beyaz zeminli ürün görsellerindeki soluk gri kutu/ızgara izlerini temizler:
// beyaza yakın pikselleri (>= ESIK) tam beyaza çeker. Çıktı: <ad>-temiz.png
// Kullanım: node scripts/clean-white-bg.mjs <görsel> [<görsel>...]
import sharp from 'sharp';
import path from 'node:path';

const THRESHOLD = 228;

for (const file of process.argv.slice(2)) {
  const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 3) {
    if (data[i] >= THRESHOLD && data[i + 1] >= THRESHOLD && data[i + 2] >= THRESHOLD) {
      data[i] = data[i + 1] = data[i + 2] = 255;
    }
  }
  const out = path.join(path.dirname(file), `${path.parse(file).name}-temiz.png`);
  await sharp(data, { raw: info }).png().toFile(out);
  console.log(out);
}
