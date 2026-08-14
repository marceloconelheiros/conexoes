"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Business } from "@/data/businesses";
import { money } from "@/data/catalog";
import {
  buildWhatsAppOrder,
  cartTotal,
  clearCart,
  getCart,
  getShopUser,
  saveOrder,
  saveShopUser,
  setCartQty,
  type CartLine,
  type ShopUser,
} from "@/lib/commerce";

export function Checkout({ businesses }: { businesses: Business[] }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [storedUser, setStoredUser] = useState<ShopUser | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const sync = () => {
      setCart(getCart());
      setStoredUser(getShopUser());
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

  function sendOrder() {
    const client =
      storedUser ?? { name: name.trim(), phone: phone.replace(/\D/g, "") };
    if (!client.name || client.phone.length < 10) {
      setNotice("Preencha nome e WhatsApp para contabilizar o pedido.");
      return;
    }
    if (!store || cart.length === 0) return;

    saveShopUser({ name: client.name, phone: client.phone });
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

    const url = buildWhatsAppOrder(store, client, cart);
    clearCart();
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
    setNotice(
      "Pedido enviado. A loja segue o pagamento no WhatsApp. Comente na página da loja para liberar o cashback.",
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
        {notice ? <p className="mt-6 text-sm text-gold-soft">{notice}</p> : null}
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
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
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
          Cadastro simples
        </p>
        {storedUser ? (
          <p className="mt-4 text-sm leading-7 text-muted">
            {storedUser.name}
            <br />
            {storedUser.phone}
          </p>
        ) : (
          <div className="mt-4 space-y-3">
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Seu nome"
              className="h-11 w-full border border-line bg-background/70 px-4 text-sm outline-none focus:border-gold/55"
            />
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="WhatsApp"
              inputMode="tel"
              className="h-11 w-full border border-line bg-background/70 px-4 text-sm outline-none focus:border-gold/55"
            />
          </div>
        )}

        <p className="mt-6 font-display text-3xl">{money(total)}</p>
        <p className="mt-2 text-sm leading-6 text-muted">
          O pedido vai para o WhatsApp da loja. O pagamento é combinado por lá.
        </p>
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
