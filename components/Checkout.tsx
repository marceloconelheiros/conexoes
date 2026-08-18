"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Business } from "@/data/businesses";
import { money } from "@/data/catalog";
import { digitsOnly, formatCep, isCompleteCep, lookupCep } from "@/lib/cep";
import {
  buildWhatsAppOrder,
  cartTotal,
  clearCart,
  getCart,
  getLastOrderNotice,
  getShopUser,
  isCompleteShopUser,
  registerCustomerForStore,
  resolveStoreWhatsApp,
  saveLastOrderNotice,
  saveOrder,
  saveShopUser,
  saveStoreWhatsApp,
  setCartQty,
  toLocalWhatsApp,
  type CartLine,
  type LastOrderNotice,
  type ShopUser,
} from "@/lib/commerce";
import { formatPhone } from "@/lib/customers";

const emptyUser: ShopUser = {
  name: "",
  phone: "",
  cep: "",
  number: "",
  street: "",
  neighborhood: "",
  city: "",
  state: "",
};

export function Checkout({ businesses }: { businesses: Business[] }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [form, setForm] = useState<ShopUser>(emptyUser);
  const [editing, setEditing] = useState(true);
  const [cepStatus, setCepStatus] = useState("");
  const [notice, setNotice] = useState("");
  const [lastOrder, setLastOrder] = useState<LastOrderNotice | null>(null);
  const [storeWhatsapp, setStoreWhatsapp] = useState("");

  useEffect(() => {
    const sync = () => {
      const nextCart = getCart();
      setCart(nextCart);
      setLastOrder(nextCart.length === 0 ? getLastOrderNotice() : null);
      const stored = getShopUser();
      if (stored) {
        setForm({ ...emptyUser, ...stored });
        setEditing(!isCompleteShopUser(stored));
      }
    };
    sync();
    window.addEventListener("conexao-commerce", sync);
    return () => window.removeEventListener("conexao-commerce", sync);
  }, []);

  const store = useMemo(
    () => businesses.find((item) => item.slug === cart[0]?.storeSlug),
    [businesses, cart],
  );
  const total = cartTotal(cart);
  const complete = isCompleteShopUser(form);
  const needsStoreWhatsapp = Boolean(store) && storeWhatsapp.replace(/\D/g, "").length < 10;

  useEffect(() => {
    if (!store) {
      setStoreWhatsapp("");
      return;
    }
    setStoreWhatsapp(
      toLocalWhatsApp(resolveStoreWhatsApp(store) || store.whatsapp || ""),
    );
  }, [store]);

  function patch(next: Partial<ShopUser>) {
    setForm((current) => ({ ...current, ...next }));
  }

  async function onCepChange(value: string) {
    const cep = formatCep(value);
    patch({ cep });
    setCepStatus("");

    if (!isCompleteCep(cep)) return;

    setCepStatus("Buscando endereço...");
    const address = await lookupCep(cep);
    if (!address) {
      setCepStatus("CEP não encontrado. Preencha rua, bairro e cidade.");
      return;
    }

    setForm((current) => {
      if (digitsOnly(current.cep) !== digitsOnly(cep)) return current;
      return {
        ...current,
        cep: formatCep(address.cep),
        street: address.street,
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state,
      };
    });
    setCepStatus(
      address.street
        ? "Endereço preenchido pelo CEP."
        : "Cidade encontrada. Complete a rua se precisar.",
    );
  }

  function sendOrder() {
    if (!complete) {
      setNotice("Preencha nome, WhatsApp, CEP e número da casa.");
      setEditing(true);
      return;
    }
    if (!store || cart.length === 0) return;

    saveShopUser(form);

    const storePhone = storeWhatsapp || resolveStoreWhatsApp(store);
    if (storePhone.replace(/\D/g, "").length >= 10) {
      saveStoreWhatsApp(store.slug, storePhone);
    }

    const url = buildWhatsAppOrder(
      { ...store, whatsapp: storePhone || store.whatsapp },
      form,
      cart,
    );

    registerCustomerForStore(form, { slug: store.slug, name: store.name });
    saveOrder({
      id: `p-${Date.now()}`,
      storeSlug: store.slug,
      storeName: store.name,
      totalCents: total,
      items: cart.map((item) => ({
        name: item.name,
        qty: item.qty,
        priceCents: item.priceCents,
      })),
      at: new Date().toISOString(),
    });
    saveLastOrderNotice({
      storeSlug: store.slug,
      storeName: store.name,
      whatsappUrl: url,
      at: new Date().toISOString(),
    });
    setEditing(false);
    clearCart();
    window.location.assign(url);
  }

  if (cart.length === 0 && lastOrder) {
    return (
      <div className="max-w-lg">
        <p className="font-display text-[clamp(1.8rem,4vw,2.8rem)] leading-tight">
          Pedido enviado para {lastOrder.storeName}.
        </p>
        <p className="mt-6 text-base leading-8 text-muted">
          Você já aparece na lista de clientes da loja. Comente na página para
          liberar o cashback.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          {lastOrder.whatsappUrl ? (
            <a
              href={lastOrder.whatsappUrl}
              className="inline-flex h-12 items-center justify-center bg-gold px-7 text-[11px] tracking-[0.22em] text-background uppercase"
            >
              Abrir WhatsApp
            </a>
          ) : null}
          <Link
            href={`/empresa/${lastOrder.storeSlug}`}
            className="inline-flex h-12 items-center justify-center border border-gold/40 px-7 text-[11px] tracking-[0.22em] text-gold uppercase"
          >
            Ir para a loja
          </Link>
          <Link
            href="/negocios"
            className="inline-flex h-12 items-center justify-center px-4 text-[11px] tracking-[0.22em] text-muted uppercase"
          >
            Ver lojas
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-lg">
        <p className="font-display text-[clamp(1.8rem,4vw,2.8rem)] leading-tight">
          Carrinho vazio.
        </p>
        <p className="mt-6 text-base leading-8 text-muted">
          Escolha um produto na landing da loja para montar o pedido.
        </p>
        <Link
          href="/negocios"
          className="mt-10 inline-flex h-12 items-center justify-center bg-gold px-7 text-[11px] tracking-[0.22em] text-background uppercase"
        >
          Ver lojas
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_24rem]">
      <div>
        <p className="font-sans text-[11px] tracking-[0.28em] text-gold uppercase">
          {cart[0]?.storeName}
        </p>
        <ul className="mt-8 divide-y divide-[rgba(198,166,103,0.18)] border-y border-line">
          {cart.map((item) => (
            <li key={item.id} className="flex items-center gap-4 py-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.photo} alt="" className="h-16 w-20 object-cover" />
              <div className="min-w-0 flex-1">
                <p className="font-display text-xl uppercase">{item.name}</p>
                <p className="mt-1 text-sm text-gold">
                  {money(item.priceCents * item.qty)}
                </p>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <button
                  type="button"
                  onClick={() => setCartQty(item.id, item.qty - 1)}
                  className="text-gold"
                >
                  −
                </button>
                <span>{item.qty}</span>
                <button
                  type="button"
                  onClick={() => setCartQty(item.id, item.qty + 1)}
                  className="text-gold"
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <aside className="border border-line bg-surface/70 px-5 py-6">
        <p className="font-sans text-[10px] tracking-[0.22em] text-gold uppercase">
          Cadastro do cliente
        </p>

        {!editing && complete ? (
          <div className="mt-4 text-sm leading-7 text-muted">
            <p className="text-foreground">{form.name}</p>
            <p>{formatPhone(form.phone)}</p>
            <p>
              {form.street}, {form.number}
            </p>
            <p>
              {form.neighborhood} · {form.city}
              {form.state ? ` - ${form.state}` : ""}
            </p>
            <p>CEP {formatCep(form.cep)}</p>
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="mt-3 text-[10px] tracking-[0.18em] text-gold uppercase hover:text-gold-soft"
            >
              Alterar cadastro
            </button>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            <input
              value={form.name}
              onChange={(event) => patch({ name: event.target.value })}
              placeholder="Seu nome"
              autoComplete="name"
              className="h-11 w-full border border-line bg-background/70 px-4 text-sm outline-none focus:border-gold/55"
            />
            <input
              value={formatPhone(form.phone)}
              onChange={(event) => patch({ phone: event.target.value })}
              placeholder="WhatsApp"
              inputMode="tel"
              autoComplete="tel"
              className="h-11 w-full border border-line bg-background/70 px-4 text-sm outline-none focus:border-gold/55"
            />
            <div className="grid grid-cols-[1fr_5.5rem] gap-3">
              <input
                value={form.cep}
                onChange={(event) => void onCepChange(event.target.value)}
                placeholder="CEP"
                inputMode="numeric"
                autoComplete="postal-code"
                className="h-11 w-full border border-line bg-background/70 px-4 text-sm outline-none focus:border-gold/55"
              />
              <input
                value={form.number}
                onChange={(event) => patch({ number: event.target.value })}
                placeholder="Nº"
                inputMode="numeric"
                autoComplete="address-line2"
                className="h-11 w-full border border-line bg-background/70 px-4 text-sm outline-none focus:border-gold/55"
              />
            </div>
            <input
              value={form.street}
              onChange={(event) => patch({ street: event.target.value })}
              placeholder="Rua"
              autoComplete="address-line1"
              className="h-11 w-full border border-line bg-background/70 px-4 text-sm outline-none focus:border-gold/55"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                value={form.neighborhood}
                onChange={(event) =>
                  patch({ neighborhood: event.target.value })
                }
                placeholder="Bairro"
                autoComplete="address-level3"
                className="h-11 w-full border border-line bg-background/70 px-4 text-sm outline-none focus:border-gold/55"
              />
              <input
                value={form.city}
                onChange={(event) => patch({ city: event.target.value })}
                placeholder="Cidade"
                autoComplete="address-level2"
                className="h-11 w-full border border-line bg-background/70 px-4 text-sm outline-none focus:border-gold/55"
              />
            </div>
            {cepStatus ? (
              <p className="text-xs leading-5 text-gold-soft">{cepStatus}</p>
            ) : (
              <p className="text-xs leading-5 text-muted">
                O CEP preenche rua, bairro e cidade para a loja e para o
                marketing da rede.
              </p>
            )}
          </div>
        )}

        <p className="mt-6 font-display text-3xl">{money(total)}</p>
        <p className="mt-2 text-sm leading-6 text-muted">
          O pedido vai para o WhatsApp da loja. O pagamento é combinado por lá.
        </p>
        {needsStoreWhatsapp ? (
          <div className="mt-5">
            <p className="text-xs leading-5 text-gold-soft">
              Esta loja ainda não tem WhatsApp no cadastro. Cole o número com
              DDD para enviar o pedido.
            </p>
            <input
              value={formatPhone(storeWhatsapp)}
              onChange={(event) => setStoreWhatsapp(event.target.value)}
              placeholder="WhatsApp da loja (14) 9xxxx-xxxx"
              inputMode="tel"
              className="mt-3 h-11 w-full border border-line bg-background/70 px-4 text-sm outline-none focus:border-gold/55"
            />
          </div>
        ) : null}
        <button
          type="button"
          onClick={sendOrder}
          className="mt-6 inline-flex h-12 w-full items-center justify-center bg-gold px-5 text-[11px] tracking-[0.2em] text-background uppercase hover:bg-gold-soft"
        >
          Enviar no WhatsApp
        </button>
        {notice ? <p className="mt-4 text-sm text-gold-soft">{notice}</p> : null}
      </aside>
    </div>
  );
}
