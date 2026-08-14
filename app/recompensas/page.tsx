import type { Metadata } from "next";
import Link from "next/link";
import { RewardsWallet } from "@/components/RewardsWallet";
import { Reveal } from "../pontos/reveal";

export const metadata: Metadata = {
  title: "Pontos Conexão | Conexão Negócios",
  description:
    "Ganhe pontos por presença e interação na rede. Troque benefícios nas empresas anunciantes — sem comissão sobre vendas.",
};

const steps = [
  {
    n: "01",
    title: "Presença",
    text: "A pessoa passa na tela, abre o app ou visita o perfil da empresa.",
  },
  {
    n: "02",
    title: "Pontos",
    text: "Cada interação vira Pontos Conexão. Não depende do valor da compra.",
  },
  {
    n: "03",
    title: "Retorno",
    text: "O benefício é resgatado na própria empresa anunciante, que já paga a mídia.",
  },
];

export default function RecompensasPage() {
  return (
    <div className="relative flex min-h-full flex-1 flex-col overflow-x-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(198,166,103,0.08),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:72px_72px]"
      />

      <header className="relative z-10 px-6 py-8 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-5xl">
          <Link
            href="/"
            className="font-sans text-[11px] font-medium tracking-[0.42em] text-gold uppercase transition-colors duration-300 hover:text-gold-soft"
          >
            Conexão Negócios
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex flex-1 flex-col">
        <section className="px-6 pb-10 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-5xl">
            <p className="font-sans text-[11px] tracking-[0.38em] text-gold uppercase">
              Recompensas
            </p>
            <h1 className="mt-8 font-display text-[clamp(2.1rem,6.4vw,4.8rem)] leading-[0.92] font-medium tracking-[0.04em] text-foreground uppercase">
              Pontos por
              <br />
              presença.
              <br />
              <span className="text-gold">Não por venda.</span>
            </h1>
            <p className="mt-10 max-w-xl font-display text-2xl leading-snug text-gold-soft sm:text-3xl">
              A Conexão Negócios ganha nos anúncios. A cidade ganha motivo para
              voltar.
            </p>
            <p className="mt-8 max-w-lg text-base leading-8 text-muted sm:text-lg">
              Quem anuncia na rede oferece um benefício em pontos. Quem usa o
              app acumula ao circular pela cidade, ver as telas e conhecer os
              negócios. Nenhuma venda passa pela nossa comissão.
            </p>
          </div>
        </section>

        <section className="border-t border-line px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
          <div className="mx-auto w-full max-w-5xl">
            <ol className="grid gap-10 sm:grid-cols-3 sm:gap-8">
              {steps.map((step) => (
                <li key={step.n}>
                  <p className="font-display text-2xl text-gold">{step.n}</p>
                  <h2 className="mt-4 font-display text-[1.7rem] leading-[0.95] tracking-[0.04em] text-foreground uppercase">
                    {step.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-muted">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-t border-line px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
          <div className="mx-auto w-full max-w-5xl">
            <Reveal>
              <RewardsWallet />
            </Reveal>
          </div>
        </section>

        <section className="border-t border-line px-6 py-16 sm:px-10 sm:py-24 lg:px-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-display text-[clamp(1.6rem,4vw,2.6rem)] leading-tight text-foreground">
              Instale o app. Leve a cidade no bolso.
            </p>
            <p className="mx-auto mt-6 max-w-md text-base leading-8 text-muted">
              No celular, use o menu do navegador e escolha{" "}
              <span className="text-gold-soft">Adicionar à tela inicial</span>.
              O atalho abre como aplicativo.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
