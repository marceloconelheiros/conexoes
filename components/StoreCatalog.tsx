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
    <div>
      <p className="font-sans text-[11px] tracking-[0.38em] text-gold uppercase">
        Promoção da semana
      </p>
      <h2 className="mt-4 font-display text-[clamp(1.7rem,3.8vw,2.6rem)] leading-tight font-medium text-foreground">
        Produtos e ofertas
      </h2>
      <p className="mt-4 max-w-lg text-sm leading-7 text-muted">
        Monte o pedido aqui. O pagamento continua no WhatsApp da loja.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="flex flex-col border border-line bg-surface/70"
          >
            <div className="relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.photo}
                alt=""
                className="aspect-[16/10] w-full object-cover"
              />
              {item.promo ? (
                <span className="absolute top-3 left-3 border border-gold/50 bg-background/85 px-3 py-1 font-sans text-[9px] tracking-[0.2em] text-gold uppercase">
                  Promoção
                </span>
              ) : null}
            </div>
            <div className="flex flex-1 flex-col px-5 py-5">
              <h3 className="font-display text-xl leading-tight tracking-[0.04em] text-foreground uppercase">
                {item.name}
              </h3>
              <p className="mt-3 font-sans text-sm tracking-[0.08em] text-gold">
                {money(item.priceCents)}
              </p>
              <div className="mt-5 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => add(item, false)}
                  className="inline-flex h-10 items-center justify-center border border-gold/50 px-4 text-[10px] font-medium tracking-[0.18em] text-gold uppercase transition-colors hover:border-gold hover:bg-gold/10"
                >
                  Add carrinho
                </button>
                <button
                  type="button"
                  onClick={() => add(item, true)}
                  className="inline-flex h-10 items-center justify-center bg-gold px-4 text-[10px] font-medium tracking-[0.18em] text-background uppercase transition-colors hover:bg-gold-soft"
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
        className="mt-8 inline-flex text-[11px] tracking-[0.22em] text-muted uppercase transition-colors hover:text-gold"
      >
        Ver carrinho
      </Link>
    </div>
  );
}
