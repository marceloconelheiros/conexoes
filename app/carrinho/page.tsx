import type { Metadata } from "next";
import Link from "next/link";
import { Checkout } from "@/components/Checkout";
import { getBusinesses } from "@/data/businesses";

export const metadata: Metadata = {
  title: "Carrinho | Conexão Negócios",
};

export default async function CarrinhoPage() {
  const businesses = await getBusinesses();

  return (
    <div className="relative flex min-h-full flex-1 flex-col overflow-x-hidden">
      <header className="relative z-10 px-6 pt-10 pb-8 sm:px-10 lg:px-16">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
          <Link
            href="/"
            className="font-sans text-[11px] font-medium tracking-[0.42em] text-gold uppercase"
          >
            Conexão Negócios
          </Link>
          <Link
            href="/negocios"
            className="font-sans text-[11px] tracking-[0.22em] text-muted uppercase hover:text-gold"
          >
            Vitrine
          </Link>
        </div>
      </header>

      <main className="relative z-10 px-6 pb-10 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-5xl">
          <p className="font-sans text-[11px] tracking-[0.38em] text-gold uppercase">
            Pedido
          </p>
          <h1 className="mt-6 font-display text-[clamp(2rem,5.5vw,3.8rem)] leading-[0.92] font-medium tracking-[0.04em] text-foreground uppercase">
            Carrinho
          </h1>
          <div className="mt-12">
            <Checkout businesses={businesses} />
          </div>
        </div>
      </main>
    </div>
  );
}
