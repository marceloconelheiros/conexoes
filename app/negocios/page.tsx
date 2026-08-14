import type { Metadata } from "next";
import Link from "next/link";
import { BusinessDirectory } from "@/components/BusinessDirectory";
import { getBusinesses } from "@/data/businesses";

export const metadata: Metadata = {
  title: "Vitrine | Conexão Negócios",
  description:
    "Encontre lojas, produtos e serviços de Marília na Vitrine Conexão Negócios.",
};

export default async function NegociosPage() {
  const businesses = await getBusinesses();

  return (
    <div className="relative flex min-h-full flex-1 flex-col overflow-x-hidden bg-[#f5f5f5] text-[#1a1a1a]">
      <header className="bg-gradient-to-r from-[#EA1D2C] to-[#FF5A1F] px-4 pt-4 pb-8 sm:px-8">
        <div className="mx-auto w-full max-w-5xl">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="font-sans text-[11px] font-semibold tracking-[0.28em] text-white/90 uppercase"
            >
              Conexão Negócios
            </Link>
            <p className="text-[12px] font-medium text-white/90">Marília</p>
          </div>
          <h1 className="mt-4 text-[1.65rem] leading-tight font-bold text-white sm:text-[2rem]">
            O que você quer agora?
          </h1>
          <p className="mt-1.5 max-w-lg text-[14px] leading-6 text-white/90">
            Lojas parceiras da cidade. Abra, veja e fale direto com quem vende.
          </p>
        </div>
      </header>

      <main className="relative z-10 flex flex-1 flex-col px-4 sm:px-8">
        <div
          id="empresas"
          className="mx-auto w-full max-w-5xl -mt-5 scroll-mt-6"
        >
          <BusinessDirectory businesses={businesses} />
        </div>

        <section className="mx-auto w-full max-w-3xl py-12 text-center sm:py-16">
          <h2 className="text-[1.6rem] leading-tight font-bold text-[#1a1a1a] sm:text-[2rem]">
            Quer ver sua loja aqui?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-7 text-[#6b6b6b]">
            Anunciantes parceiros da Conexão Negócios também ganham presença
            nesta vitrine — o ponto de encontro entre quem vende e quem busca.
          </p>
          <Link
            href="/anuncie"
            className="mt-7 inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#EA1D2C] px-7 text-[12px] font-semibold tracking-[0.16em] text-white uppercase transition-colors duration-300 hover:bg-[#c71826] sm:w-auto"
          >
            Quero fazer parte
          </Link>
        </section>
      </main>

      <footer className="px-4 py-8 sm:px-8">
        <p className="text-center text-[12px] text-[#8a8a8a]">
          Conexão Negócios · Lojas locais · Marília
        </p>
      </footer>
    </div>
  );
}
