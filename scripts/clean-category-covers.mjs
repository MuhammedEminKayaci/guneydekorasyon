// Eski kategori görsellerinin altındaki gömülü kırmızı etiketleri zemin rengiyle kapatır.
// Kullanım: node scripts/clean-category-covers.mjs → src/assets/images/anasayfa/kategoriler/kapak-*.png
import sharp from 'sharp';

const DIR = 'src/assets/images/anasayfa/kategoriler';

for (const n of [1, 2, 3, 4, 5]) {
  const src = `${DIR}/${n}.png`;
  const { width, height } = await sharp(src).metadata();
  // Zemin rengini sol alt köşeden al
  const { data } = await sharp(src).extract({ left: 4, top: height - 8, width: 1, height: 1 }).raw().toBuffer({ resolveWithObject: true });
  const [r, g, b] = data;
  const box = { left: Math.round(width * 0.15), top: Math.round(height * 0.825), w: Math.round(width * 0.7), h: Math.round(height * 0.14) };
  const patch = await sharp({ create: { width: box.w, height: box.h, channels: 3, background: { r, g, b } } }).png().toBuffer();
  await sharp(src).composite([{ input: patch, left: box.left, top: box.top }]).toFile(`${DIR}/kapak-${n}.png`);
  console.log(`kapak-${n}.png zemin rgb(${r},${g},${b})`);
}
