"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { money, type CatalogItem } from "@/data/catalog";
import { addToCart, getCatalog } from "@/lib/commerce";
import { SafeImage } from "./SafeImage";

type StoreCatalogProps = {
  slug: string;
  storeName: string;
  initialItems: CatalogItem[];
};

export function StoreCatalog({ slug, storeName, initialItems }: StoreCatalogProps) {
  const router = useRouter();
  const [items, setItems] = useState<CatalogItem[]>(initialItems);

  useEffect(() => {
    const sync = () => setItems(getCatalog(slug));
    sync();
    window.addEventListener("conexao-commerce", sync);
    return () => window.removeEventListener("conexao-commerce", sync);
  }, [slug]);

  const ordered = useMemo(
    () => [...items].sort((a, b) => Number(Boolean(b.promo)) - Number(Boolean(a.promo))),
    [items],
  );

  if (ordered.length === 0) return null;

  function add(item: CatalogItem, goToCart: boolean) {
    addToCart({
      ...item,
      storeSlug: slug,
      storeName,
    });
    if (goToCart) router.push("/carrinho");
  }

  return (
    <div className="rounded-2xl bg-white px-5 py-7 shadow-[0_14px_32px_rgba(0,0,0,0.12)] sm:px-7">
      <p className="text-[16px] font-bold tracking-[0.08em] text-[#EA1D2C] uppercase">
        Promoção da semana
      </p>
      <h2 className="mt-2 text-[1.75rem] font-bold text-[#1a1a1a] sm:text-[2rem]">
        Escolha e peça
      </h2>
      <p className="mt-3 max-w-lg text-[17px] leading-7 text-[#6b6b6b]">
        Monte o pedido aqui. O pagamento continua no WhatsApp da loja.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ordered.map((item) => (
          <article
            key={item.id}
            className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_14px_32px_rgba(0,0,0,0.16),0_4px_10px_rgba(0,0,0,0.08)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2),0_8px_16px_rgba(0,0,0,0.1)]"
          >
            <div className="relative overflow-hidden">
              <SafeImage
                src={item.photo}
                name={item.name}
                className="aspect-[16/10] w-full object-cover"
              />
              {item.promo ? (
                <span className="absolute top-3 left-3 rounded-md bg-[#EA1D2C] px-3 py-1.5 text-[14px] font-bold text-white">
                  Promoção
                </span>
              ) : null}
            </div>
            <div className="flex flex-1 flex-col px-4 py-5">
              <h3 className="text-[1.2rem] leading-snug font-bold text-[#1a1a1a]">
                {item.name}
              </h3>
              <p className="mt-2 text-[1.2rem] font-bold text-[#FF5A1F]">
                {money(item.priceCents)}
              </p>
              <div className="mt-5 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => add(item, false)}
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-[#FF5A1F] px-4 text-[15px] font-bold text-white shadow-[0_6px_16px_rgba(255,90,31,0.35)] transition-colors hover:bg-[#e04e18]"
                >
                  Adicionar ao carrinho
                </button>
                <button
                  type="button"
                  onClick={() => add(item, true)}
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-[#EA1D2C] px-4 text-[15px] font-bold text-white shadow-[0_6px_16px_rgba(234,29,44,0.35)] transition-colors hover:bg-[#c71826]"
                >
                  Pedir agora
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Link
        href="/carrinho"
        className="mt-6 inline-flex text-[18px] font-bold text-[#EA1D2C]"
      >
        Ver carrinho →
      </Link>
    </div>
  );
}
