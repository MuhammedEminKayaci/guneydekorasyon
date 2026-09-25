// Teklif listesi: kullanıcının beğendiği ürünler (tarayıcıda saklanır). Değişiklikte
// "teklif-listesi:degisti" olayı yayınlanır; header rozeti, çekmece ve kartlar dinler.

export interface QuoteItem {
  id: string;
  name: string;
  code: string;
  thumb: string;
  /** Ürün sayfası */
  href?: string;
  qty: number;
}

const KEY = 'guney-teklif-listesi';
export const CHANGE_EVENT = 'teklif-listesi:degisti';

function read(): QuoteItem[] {
  try {
    const data = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function write(items: QuoteItem[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    // Gizli sekme vb.: liste sadece bu sayfa ömrü boyunca tutulur
  }
  memory = items;
  document.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: items }));
}

let memory: QuoteItem[] | undefined;
export const getItems = (): QuoteItem[] => (memory ??= read());

export const has = (id: string) => getItems().some((i) => i.id === id);

export function add(item: Omit<QuoteItem, 'qty'>, qty = 1) {
  const items = getItems();
  const existing = items.find((i) => i.id === item.id);
  if (existing) existing.qty += qty;
  else items.push({ ...item, qty });
  write([...items]);
}

export function toggle(item: Omit<QuoteItem, 'qty'>) {
  if (has(item.id)) remove(item.id);
  else add(item);
}

export function setQty(id: string, qty: number) {
  write(getItems().map((i) => (i.id === id ? { ...i, qty: Math.max(1, Math.min(99999, Math.round(qty) || 1)) } : i)));
}

export function remove(id: string) {
  write(getItems().filter((i) => i.id !== id));
}

export function clear() {
  write([]);
}

export const totalCount = () => getItems().length;

// Başka sekmede değişirse senkronla
window.addEventListener('storage', (e) => {
  if (e.key === KEY) {
    memory = read();
    document.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: memory }));
  }
});
