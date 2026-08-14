"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { money, type CatalogItem } from "@/data/catalog";
import { addToCart, getCatalog } from "@/lib/commerce";

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

  if (items.length === 0) return null;

  function add(item: CatalogItem, goToCart: boolean) {
    addToCart({
      ...item,
      storeSlug: slug,
      storeName,
    });
    if (goToCart) router.push("/carrinho");
  }

  return (
    <div className="rounded-2xl bg-white px-5 py-6 shadow-[0_14px_32px_rgba(0,0,0,0.12)] sm:px-7">
      <p className="text-[11px] font-semibold tracking-[0.16em] text-[#EA1D2C] uppercase">
        Cardápio e ofertas
      </p>
      <h2 className="mt-2 text-[1.35rem] font-bold text-[#1a1a1a]">
        Escolha e peça
      </h2>
      <p className="mt-2 max-w-lg text-[14px] leading-6 text-[#6b6b6b]">
        Monte o pedido aqui. O pagamento continua no WhatsApp da loja.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_10px_24px_rgba(0,0,0,0.12)]"
          >
            <div className="relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.photo}
                alt=""
                className="aspect-[16/10] w-full object-cover"
              />
              {item.promo ? (
                <span className="absolute top-3 left-3 rounded-md bg-[#EA1D2C] px-2.5 py-1 text-[11px] font-semibold text-white">
                  Promoção
                </span>
              ) : null}
            </div>
            <div className="flex flex-1 flex-col px-4 py-4">
              <h3 className="text-[1.05rem] leading-snug font-semibold text-[#1a1a1a]">
                {item.name}
              </h3>
              <p className="mt-2 text-[15px] font-bold text-[#FF5A1F]">
                {money(item.priceCents)}
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => add(item, false)}
                  className="inline-flex h-10 items-center justify-center rounded-xl border border-[#ffd4c8] text-[12px] font-semibold tracking-[0.12em] text-[#EA1D2C] uppercase"
                >
                  Add carrinho
                </button>
                <button
                  type="button"
                  onClick={() => add(item, true)}
                  className="inline-flex h-10 items-center justify-center rounded-xl bg-[#EA1D2C] text-[12px] font-semibold tracking-[0.12em] text-white uppercase hover:bg-[#c71826]"
                >
                  Pedir
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Link
        href="/carrinho"
        className="mt-5 inline-flex text-[13px] font-semibold text-[#EA1D2C]"
      >
        Ver carrinho →
      </Link>
    </div>
  );
}
