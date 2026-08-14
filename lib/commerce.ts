import { DEFAULT_CATALOG, type CatalogItem, money } from "@/data/catalog";
import type { Business } from "@/data/businesses";
import { cashbackCents, getCashbackRate } from "@/data/ranking";
import { formatCep } from "@/lib/cep";
import { formatPhone, upsertCustomer } from "@/lib/customers";

const KEYS = {
  catalog: "conexao-catalog",
  cart: "conexao-cart",
  user: "conexao-user",
  orders: "conexao-orders",
  comments: "conexao-comments",
  wallet: "conexao-cashback",
} as const;

export type CartLine = CatalogItem & {
  qty: number;
  storeSlug: string;
  storeName: string;
};

export type ShopUser = {
  name: string;
  phone: string;
  cep: string;
  number: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
};

export function isCompleteShopUser(user: ShopUser | null): user is ShopUser {
  if (!user) return false;
  return (
    (user.name ?? "").trim().length > 1 &&
    (user.phone ?? "").replace(/\D/g, "").length >= 10 &&
    (user.cep ?? "").replace(/\D/g, "").length === 8 &&
    (user.number ?? "").trim().length > 0 &&
    (user.street ?? "").trim().length > 0 &&
    (user.neighborhood ?? "").trim().length > 0 &&
    (user.city ?? "").trim().length > 0
  );
}

export type ShopOrder = {
  id: string;
  storeSlug: string;
  storeName: string;
  totalCents: number;
  items: { name: string; qty: number; priceCents: number }[];
  at: string;
  commented?: boolean;
};

export type ShopComment = {
  id: string;
  storeSlug: string;
  productName?: string;
  author: string;
  text: string;
  at: string;
};

type WalletState = {
  cents: number;
  history: { label: string; cents: number; at: string }[];
};

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event("conexao-commerce"));
  } catch (error) {
    console.error("Não foi possível salvar os dados do pedido.", error);
  }
}

export function getCatalog(slug: string): CatalogItem[] {
  const overlay = readJson<Record<string, CatalogItem[]>>(KEYS.catalog, {});
  return overlay[slug] ?? DEFAULT_CATALOG[slug] ?? [];
}

export function saveCatalog(slug: string, items: CatalogItem[]) {
  const overlay = readJson<Record<string, CatalogItem[]>>(KEYS.catalog, {});
  overlay[slug] = items;
  writeJson(KEYS.catalog, overlay);
}

export function getCart(): CartLine[] {
  return readJson<CartLine[]>(KEYS.cart, []);
}

export function addToCart(line: Omit<CartLine, "qty">, qty = 1) {
  const cart = getCart();
  const sameStore = cart.length === 0 || cart[0]?.storeSlug === line.storeSlug;
  const next = sameStore ? [...cart] : [];
  const found = next.find((item) => item.id === line.id);

  if (found) {
    found.qty += qty;
  } else {
    next.push({ ...line, qty });
  }

  clearLastOrderNotice();
  writeJson(KEYS.cart, next);
  return next;
}

export function setCartQty(id: string, qty: number) {
  const next = getCart()
    .map((item) => (item.id === id ? { ...item, qty } : item))
    .filter((item) => item.qty > 0);
  writeJson(KEYS.cart, next);
  return next;
}

export function clearCart() {
  writeJson(KEYS.cart, []);
}

export function cartTotal(cart = getCart()) {
  return cart.reduce((sum, item) => sum + item.priceCents * item.qty, 0);
}

export function cartCount(cart = getCart()) {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

export function getShopUser(): ShopUser | null {
  return readJson<ShopUser | null>(KEYS.user, null);
}

export function saveShopUser(user: ShopUser) {
  writeJson(KEYS.user, {
    ...user,
    phone: user.phone.replace(/\D/g, ""),
    cep: formatCep(user.cep),
  });
}

export function registerCustomerForStore(
  user: ShopUser,
  store: { slug: string; name: string },
) {
  return upsertCustomer(
    {
      name: user.name.trim(),
      phone: user.phone.replace(/\D/g, ""),
      cep: formatCep(user.cep),
      number: user.number.trim(),
      street: user.street.trim(),
      neighborhood: user.neighborhood.trim(),
      city: user.city.trim(),
      state: user.state.trim() || "SP",
    },
    store,
  );
}

export function getOrders(): ShopOrder[] {
  return readJson<ShopOrder[]>(KEYS.orders, []);
}

export function saveOrder(order: ShopOrder) {
  writeJson(KEYS.orders, [order, ...getOrders()].slice(0, 20));
}

export function getComments(slug: string): ShopComment[] {
  return readJson<ShopComment[]>(KEYS.comments, []).filter(
    (item) => item.storeSlug === slug,
  );
}

export function addComment(comment: ShopComment) {
  writeJson(KEYS.comments, [comment, ...readJson<ShopComment[]>(KEYS.comments, [])].slice(0, 80));
}

export function pendingOrderForStore(slug: string): ShopOrder | undefined {
  return getOrders().find((order) => order.storeSlug === slug && !order.commented);
}

export function markOrderCommented(orderId: string) {
  writeJson(
    KEYS.orders,
    getOrders().map((order) =>
      order.id === orderId ? { ...order, commented: true } : order,
    ),
  );
}

export function creditWallet(cents: number, label: string) {
  const wallet = readJson<WalletState>(KEYS.wallet, { cents: 0, history: [] });
  writeJson(KEYS.wallet, {
    cents: wallet.cents + cents,
    history: [
      { label, cents, at: new Date().toISOString() },
      ...wallet.history,
    ].slice(0, 12),
  });
}

export function buildWhatsAppOrder(
  business: Pick<Business, "name" | "whatsapp" | "phone">,
  user: ShopUser,
  cart: CartLine[],
) {
  const lines = [
    `Pedido Conexão Negócios`,
    `Loja: ${business.name}`,
    `Cliente: ${user.name}`,
    `WhatsApp: ${formatPhone(user.phone)}`,
    `Endereço: ${user.street}, ${user.number} — ${user.neighborhood}`,
    `Cidade: ${user.city}${user.state ? ` - ${user.state}` : ""}`,
    `CEP: ${formatCep(user.cep)}`,
    "",
    ...cart.map(
      (item) =>
        `• ${item.qty}x ${item.name} — ${money(item.priceCents * item.qty)}`,
    ),
    "",
    `Total: ${money(cartTotal(cart))}`,
    "",
    "Pagamento combinado pela loja.",
  ];

  const text = encodeURIComponent(lines.join("\n"));
  const phone = whatsappDigits(business.whatsapp, business.phone);
  return phone ? `https://wa.me/${phone}?text=${text}` : null;
}

function whatsappDigits(whatsapp?: string, phone?: string) {
  const fromWhatsapp = (whatsapp ?? "").replace(/\D/g, "");
  if (fromWhatsapp.length >= 12) return fromWhatsapp;
  if (fromWhatsapp.length === 11) return `55${fromWhatsapp}`;
  if (fromWhatsapp.length === 10) return `55${fromWhatsapp}`;

  const fromPhone = (phone ?? "").replace(/\D/g, "");
  if (fromPhone.length >= 12) return fromPhone;
  if (fromPhone.length === 11) return `55${fromPhone}`;
  return "";
}

const LAST_ORDER_KEY = "conexao-last-order";

export type LastOrderNotice = {
  storeSlug: string;
  storeName: string;
  whatsappUrl: string | null;
  at: string;
};

export function saveLastOrderNotice(notice: LastOrderNotice) {
  try {
    sessionStorage.setItem(LAST_ORDER_KEY, JSON.stringify(notice));
  } catch {
    /* ignore */
  }
}

export function getLastOrderNotice(): LastOrderNotice | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(LAST_ORDER_KEY);
    return raw ? (JSON.parse(raw) as LastOrderNotice) : null;
  } catch {
    return null;
  }
}

export function clearLastOrderNotice() {
  try {
    sessionStorage.removeItem(LAST_ORDER_KEY);
  } catch {
    /* ignore */
  }
}

export function cashbackForOrder(totalCents: number, plan: Business["plan"]) {
  return cashbackCents(totalCents / 100, getCashbackRate(plan));
}
