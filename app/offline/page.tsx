import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Offline | Conexão Negócios",
};

export default function OfflinePage() {
  return (
    <main className="flex flex-1 flex-col justify-center px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-xl">
        <p className="font-sans text-[11px] tracking-[0.38em] text-gold uppercase">
          Conexão Negócios
        </p>
        <h1 className="mt-8 font-display text-[clamp(2rem,6vw,3.6rem)] leading-[0.95] font-medium tracking-[0.04em] text-foreground uppercase">
          Sem conexão no momento.
        </h1>
        <p className="mt-8 max-w-md text-base leading-8 text-muted">
          O app continua instalado. Assim que a internet voltar, a rede e os
          pontos de recompensa aparecem de novo.
        </p>
        <Link
          href="/"
          className="mt-12 inline-flex h-12 items-center justify-center bg-gold px-7 text-[11px] font-medium tracking-[0.22em] text-background uppercase"
        >
          Tentar novamente
        </Link>
      </div>
    </main>
  );
}
