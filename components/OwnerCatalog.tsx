"use client";

import { useEffect, useState } from "react";
import { money, type CatalogItem } from "@/data/catalog";
import { getCatalog, saveCatalog } from "@/lib/commerce";

export function OwnerCatalog({ slug }: { slug: string }) {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [promo, setPromo] = useState(false);

  useEffect(() => {
    const sync = () => setItems(getCatalog(slug));
    sync();
    window.addEventListener("conexao-commerce", sync);
    return () => window.removeEventListener("conexao-commerce", sync);
  }, [slug]);

  function persist(next: CatalogItem[]) {
    saveCatalog(slug, next);
  }

  function onFile(file?: File) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(String(reader.result ?? ""));
    reader.readAsDataURL(file);
  }

  function addItem() {
    const reais = Number(price.replace(",", "."));
    if (!name.trim() || !Number.isFinite(reais) || reais <= 0 || !photo) return;

    persist([
      {
        id: `${slug}-${Date.now()}`,
        name: name.trim(),
        priceCents: Math.round(reais * 100),
        photo,
        promo,
      },
      ...items,
    ]);
    setName("");
    setPrice("");
    setPhoto("");
    setPromo(false);
  }

  return (
    <div className="border border-line bg-surface/70 px-5 py-7 sm:px-8">
      <p className="font-sans text-[10px] tracking-[0.28em] text-gold uppercase">
        Vitrine da semana
      </p>
      <h2 className="mt-3 font-display text-[1.7rem] leading-tight tracking-[0.04em] text-foreground uppercase">
        Fotos, valores e promoções
      </h2>
      <p className="mt-3 max-w-lg text-sm leading-7 text-muted">
        O que você publicar aqui aparece na landing da loja. O cliente pede pelo
        app e o pedido chega no seu WhatsApp.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="font-sans text-[10px] tracking-[0.2em] text-gold uppercase">
            Nome
          </span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-3 h-12 w-full border border-line bg-background/70 px-4 text-sm outline-none focus:border-gold/55"
          />
        </label>
        <label className="block">
          <span className="font-sans text-[10px] tracking-[0.2em] text-gold uppercase">
            Valor
          </span>
          <input
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="0,00"
            inputMode="decimal"
            className="mt-3 h-12 w-full border border-line bg-background/70 px-4 text-sm outline-none focus:border-gold/55"
          />
        </label>
        <label className="flex items-end gap-3 pb-3">
          <input
            type="checkbox"
            checked={promo}
            onChange={(event) => setPromo(event.target.checked)}
            className="accent-[#c6a667]"
          />
          <span className="font-sans text-[10px] tracking-[0.2em] text-muted uppercase">
            Promoção da semana
          </span>
        </label>
        <label className="block sm:col-span-2">
          <span className="font-sans text-[10px] tracking-[0.2em] text-gold uppercase">
            Foto (link ou arquivo)
          </span>
          <input
            value={photo.startsWith("data:") ? "" : photo}
            onChange={(event) => setPhoto(event.target.value)}
            placeholder="https://..."
            className="mt-3 h-12 w-full border border-line bg-background/70 px-4 text-sm outline-none focus:border-gold/55"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(event) => onFile(event.target.files?.[0])}
            className="mt-3 block w-full text-xs text-muted"
          />
        </label>
      </div>

      <button
        type="button"
        onClick={addItem}
        className="mt-6 inline-flex h-12 items-center justify-center bg-gold px-7 text-[11px] font-medium tracking-[0.22em] text-background uppercase hover:bg-gold-soft"
      >
        Publicar na landing
      </button>

      <ul className="mt-10 divide-y divide-[rgba(198,166,103,0.18)] border-t border-line">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-4 py-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.photo} alt="" className="h-14 w-16 object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-lg uppercase">{item.name}</p>
              <p className="text-sm text-gold">
                {money(item.priceCents)}
                {item.promo ? " · promoção" : ""}
              </p>
            </div>
            <button
              type="button"
              onClick={() => persist(items.filter((entry) => entry.id !== item.id))}
              className="text-[10px] tracking-[0.18em] text-muted uppercase hover:text-gold"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
