// /katalog.json'u ilk ihtiyaçta bir kez indirir; arama, hızlı bakış ve teklif listesi paylaşır.
import type { CatalogData, CatalogProduct } from '../lib/search-index';

let promise: Promise<CatalogData> | undefined;

export function loadCatalog(): Promise<CatalogData> {
  promise ??= fetch('/katalog.json').then((r) => {
    if (!r.ok) throw new Error(`Katalog yüklenemedi (${r.status})`);
    return r.json();
  });
  return promise;
}

export async function findProduct(id: string): Promise<CatalogProduct | undefined> {
  return (await loadCatalog()).products.find((p) => p.id === id);
}

/** Türkçe karakterleri sadeleştirip küçük harfe çevirir (arama eşleşmesi için) */
export const normalize = (s: string) =>
  s
    .toLocaleLowerCase('tr')
    .replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i')
    .replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u')
    .replace(/×/g, 'x')
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/** "rafı" → "raf", "askılar" → "aski": kelime kökü yaklaşık eşleşmesi */
export const wordMatch = (word: string, token: string) =>
  word.startsWith(token) || (word.length >= 3 && token.startsWith(word));

/** Sorgudaki her kelime metindeki bir kelimeyle eşleşiyor mu */
export const matchesAll = (haystackWords: string[], tokens: string[]) =>
  tokens.every((t) => haystackWords.some((w) => wordMatch(w, t)));

export const escapeHtml = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
