// Yayın paketi: siteyi derler, yönlendirmeleri yeniler ve hosting'e yüklenecek zip dosyalarını üretir.
// Kullanım: npm run paket
//   yayin/guneydekorasyonraf.com.zip       → yeni sitenin public_html içeriği (.htaccess dahil)
//   yayin/eski-domain-com-tr.zip           → eski guneydekorasyonraf.com.tr sunucusuna konacak .htaccess
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const run = (file, args, cwd) => execFileSync(file, args, { stdio: 'inherit', cwd });

run('node', ['scripts/build-redirects.mjs']);
run('npm', ['run', 'build']);

fs.rmSync('yayin', { recursive: true, force: true });
fs.mkdirSync('yayin');

// zip -r . : dist içeriğini (gizli .htaccess dahil) klasörsüz olarak paketler
run('zip', ['-qr', path.resolve('yayin/guneydekorasyonraf.com.zip'), '.', '-x', '*.DS_Store'], 'dist');
run('zip', ['-qr', path.resolve('yayin/eski-domain-com-tr.zip'), '.htaccess'], 'deploy/eski-domain');

const size = (f) => `${(fs.statSync(f).size / 1024 / 1024).toFixed(1)} MB`;
console.log(`\nHazır:\n  yayin/guneydekorasyonraf.com.zip  (${size('yayin/guneydekorasyonraf.com.zip')})\n  yayin/eski-domain-com-tr.zip      (${size('yayin/eski-domain-com-tr.zip')})\nKurulum adımları: YAYINA-ALMA.md`);
