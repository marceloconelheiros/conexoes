import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { BusinessDirectory } from "@/components/BusinessDirectory";
import { getBusinesses } from "@/data/businesses";
import { Reveal } from "../pontos/reveal";

export const metadata: Metadata = {
  title: "Vitrine | Conexão Negócios",
  description:
    "Conheça empresas, produtos e serviços que fazem parte da Conexão Negócios. Uma vitrine digital de negócios locais.",
};

function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`border-t border-line px-6 py-28 sm:px-10 sm:py-36 lg:px-16 ${className}`}
    >
      <div className="mx-auto w-full max-w-5xl">{children}</div>
    </section>
  );
}

export default async function NegociosPage() {
  const businesses = await getBusinesses();

  return (
    <div className="relative flex min-h-full flex-1 flex-col overflow-x-hidden">
      <noscript>
        <style>{`.reveal{opacity:1;transform:none}`}</style>
      </noscript>

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
        <section className="flex min-h-[calc(100vh-5.5rem)] flex-col justify-center px-6 pb-28 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-5xl">
            <p
              className="animate-fade-up font-sans text-[11px] tracking-[0.38em] text-gold uppercase"
              style={{ animationDelay: "0.05s" }}
            >
              Vitrine Conexão Negócios
            </p>

            <h1
              className="animate-fade-up mt-8 font-display text-[clamp(2rem,6.2vw,4.6rem)] leading-[0.92] font-medium tracking-[0.04em] text-foreground uppercase"
              style={{ animationDelay: "0.15s" }}
            >
              Descubra negócios
              <br />
              que fazem parte
              <br />
              da nossa rede.
            </h1>

            <p
              className="animate-fade-up mt-10 max-w-xl font-display text-2xl leading-snug font-normal text-gold-soft sm:text-3xl"
              style={{ animationDelay: "0.28s" }}
            >
              Empresas locais conectadas a consumidores locais.
            </p>

            <p
              className="animate-fade-up mt-8 max-w-lg text-base leading-8 text-muted sm:text-lg"
              style={{ animationDelay: "0.4s" }}
            >
              Conheça empresas, produtos e serviços que fazem parte da Conexão
              Negócios.
            </p>

            <div
              className="animate-fade-up mt-14"
              style={{ animationDelay: "0.52s" }}
            >
              <a
                href="#empresas"
                className="inline-flex h-12 w-full items-center justify-center bg-gold px-7 text-[11px] font-medium tracking-[0.22em] text-background uppercase transition-colors duration-300 hover:bg-gold-soft sm:w-auto"
              >
                Explorar negócios
              </a>
            </div>
          </div>
        </section>

        <Section>
          <Reveal>
            <h2 className="font-display text-[clamp(1.85rem,4.8vw,3.6rem)] leading-[0.98] font-medium tracking-[0.02em] text-foreground uppercase">
              Mais do que anunciantes.
              <br />
              Uma rede de negócios.
            </h2>
          </Reveal>

          <div className="mt-12 max-w-xl space-y-8 text-base leading-8 text-muted sm:mt-16 sm:text-lg">
            <Reveal delay={80}>
              <p>
                As empresas presentes na Conexão Negócios não aparecem apenas
                nas telas.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <p>
                Elas também fazem parte de uma vitrine digital criada para
                facilitar novas conexões entre empresas e consumidores.
              </p>
            </Reveal>
          </div>

          <Reveal delay={220}>
            <p className="mt-16 font-display text-[clamp(1.6rem,3.8vw,2.6rem)] leading-tight text-gold uppercase">
              Telas + presença digital + conexão local.
            </p>
          </Reveal>
        </Section>

        <Section id="empresas" className="scroll-mt-8">
          <Reveal>
            <p className="font-sans text-[11px] tracking-[0.38em] text-gold uppercase">
              Encontre na rede
            </p>
            <h2 className="mt-8 max-w-xl font-display text-[clamp(1.8rem,4vw,2.75rem)] leading-tight font-medium text-foreground">
              Empresas de Marília na Vitrine.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-8 text-muted">
              Toque em um card para abrir a página da empresa, ver serviços e
              escanear o QR Code de contato.
            </p>
          </Reveal>

          <Reveal delay={80} className="mt-10">
            <BusinessDirectory businesses={businesses} />
          </Reveal>
        </Section>

        <Section>
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="font-display text-[clamp(1.85rem,4.8vw,3.6rem)] leading-[0.98] font-medium tracking-[0.02em] text-foreground uppercase">
                Quer ver sua empresa aqui?
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <p className="mx-auto mt-12 max-w-lg text-base leading-8 text-muted sm:text-lg">
                Anunciantes ativos da Conexão Negócios também ganham presença na
                nossa Vitrine Digital.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <Link
                href="/anuncie"
                className="mt-14 inline-flex h-12 w-full items-center justify-center bg-gold px-7 text-[11px] font-medium tracking-[0.22em] text-background uppercase transition-colors duration-300 hover:bg-gold-soft sm:w-auto"
              >
                Quero fazer parte
              </Link>
            </Reveal>
          </div>
        </Section>

        <Section className="sm:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="font-display text-[clamp(1.85rem,4.8vw,3.6rem)] leading-[0.98] font-medium tracking-[0.02em] text-foreground uppercase">
                Conectar é encontrar.
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <p className="mx-auto mt-12 max-w-lg text-base leading-8 text-muted sm:text-lg">
                A Conexão Negócios aproxima empresas locais das pessoas que
                procuram por elas.
              </p>
            </Reveal>
          </div>
        </Section>
      </main>

      <footer className="relative z-10 border-t border-line px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[11px] tracking-[0.28em] text-gold uppercase">
            Conexão Negócios
          </p>
          <p className="mt-6 text-base leading-8 text-muted">
            Empresas locais.
            <br />
            Consumidores locais.
            <br />
            Novas conexões.
          </p>
        </div>
      </footer>
    </div>
  );
}
