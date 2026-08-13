import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { PlaceIcon, type PlaceName } from "./icons";
import { NetworkMap } from "./network-map";
import { Reveal } from "./reveal";
import { ScreensLink } from "./screens-link";

export const metadata: Metadata = {
  title: "Pontos Parceiros | Conexão Negócios",
  description:
    "Seja um dos 10 pontos estratégicos da primeira rede da Conexão Negócios. Sua empresa pode fazer parte de uma nova rede de comunicação local.",
};

const programming = [
  "comunicação dos próprios Pontos Parceiros",
  "empresas e serviços da cidade",
  "campanhas publicitárias",
  "conteúdos institucionais",
  "oportunidades e informações locais",
];

const criteria = [
  { n: "01", label: "Localização" },
  { n: "02", label: "Movimento" },
  { n: "03", label: "Perfil do público" },
  { n: "04", label: "Tempo de permanência" },
  { n: "05", label: "Qualidade do estabelecimento" },
  { n: "06", label: "Potencial de conexão com outros negócios" },
];

const benefits = [
  {
    title: "Presença",
    text: "Sua empresa passa a aparecer em outros pontos estratégicos da cidade.",
  },
  {
    title: "Visibilidade",
    text: "Pessoas que ainda não frequentam seu estabelecimento passam a ter contato com sua marca.",
  },
  {
    title: "Comunicação",
    text: "Sua empresa recebe material institucional preparado para utilização na rede, conforme as condições da parceria.",
  },
  {
    title: "Conteúdo",
    text: "Sua tela passa a contar com uma programação administrada profissionalmente.",
  },
  {
    title: "Conexão",
    text: "Seu estabelecimento passa a fazer parte de um ecossistema de empresas locais.",
  },
  {
    title: "Posicionamento",
    text: "Você passa a ser oficialmente um Ponto Parceiro Conexão Negócios.",
  },
];

const chain: { name: PlaceName; label: string }[] = [
  { name: "academia", label: "Academia" },
  { name: "restaurante", label: "Restaurante" },
  { name: "clinica", label: "Clínica" },
  { name: "loja", label: "Loja" },
  { name: "imobiliaria", label: "Imobiliária" },
];

const chainLines = [
  "Imagine uma academia apresentando um restaurante.",
  "Um restaurante apresentando uma clínica.",
  "Uma clínica apresentando uma loja.",
  "Uma loja apresentando uma imobiliária.",
];

const needs = [
  "Local adequado para instalação da tela",
  "Energia elétrica",
  "Conectividade necessária",
  "Equipamento ligado nos períodos acordados",
  "Cuidado com o equipamento",
  "Permissão para exibição da programação",
];

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

export default function PontosPage() {
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
              Ponto parceiro
            </p>

            <h1
              className="animate-fade-up mt-8 font-display text-[clamp(2.15rem,6.6vw,5.1rem)] leading-[0.92] font-medium tracking-[0.04em] text-foreground uppercase"
              style={{ animationDelay: "0.15s" }}
            >
              Seja um dos 10
              <br />
              pontos estratégicos
              <br />
              da nossa primeira rede.
            </h1>

            <p
              className="animate-fade-up mt-10 max-w-xl font-display text-2xl leading-snug font-normal text-gold-soft sm:text-3xl"
              style={{ animationDelay: "0.28s" }}
            >
              Sua empresa pode fazer parte de uma nova rede de comunicação
              local.
            </p>

            <p
              className="animate-fade-up mt-8 max-w-lg text-base leading-8 text-muted sm:text-lg"
              style={{ animationDelay: "0.4s" }}
            >
              A Conexão Negócios conecta estabelecimentos estratégicos por meio
              de uma rede de telas digitais, criando presença, visibilidade e
              novas oportunidades de conexão entre empresas e consumidores.
            </p>

            <div
              className="animate-fade-up mt-14"
              style={{ animationDelay: "0.52s" }}
            >
              <a
                href="#contato"
                className="inline-flex h-12 w-full items-center justify-center bg-gold px-7 text-[11px] font-medium tracking-[0.22em] text-background uppercase transition-colors duration-300 hover:bg-gold-soft sm:w-auto"
              >
                Quero ser um ponto parceiro
              </a>
            </div>
          </div>
        </section>

        <Section>
          <Reveal>
            <h2 className="font-display text-[clamp(1.85rem,4.8vw,3.6rem)] leading-[0.98] font-medium tracking-[0.02em] text-foreground uppercase">
              Sua empresa como
              <br />
              ponto de conexão
            </h2>
          </Reveal>

          <div className="mt-12 max-w-xl space-y-8 text-base leading-8 text-muted sm:mt-16 sm:text-lg">
            <Reveal delay={80}>
              <p>
                Todos os dias, pessoas entram no seu estabelecimento.
                <br />
                Elas aguardam, circulam, compram, conversam e permanecem no
                ambiente.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <p>
                A Conexão Negócios transforma parte desse tempo em uma nova
                oportunidade de comunicação.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <p>
                Instalamos uma tela em seu estabelecimento e conectamos sua
                empresa a uma rede formada por 10 pontos estratégicos da cidade.
              </p>
            </Reveal>
          </div>
        </Section>

        <Section>
          <Reveal>
            <h2 className="font-display text-[clamp(2.2rem,6vw,5rem)] leading-[0.95] font-medium tracking-[0.02em] text-foreground uppercase">
              <span className="text-[1.12em]">Dez pontos.</span>
              <br />
              Uma única rede.
              <br />
              <span className="text-gold">Inúmeras conexões.</span>
            </h2>
          </Reveal>

          <NetworkMap />
        </Section>

        <Section>
          <Reveal>
            <h2 className="font-display text-[clamp(1.85rem,4.8vw,3.6rem)] leading-[0.98] font-medium tracking-[0.02em] text-foreground uppercase">
              O que é a
              <br />
              Conexão Negócios?
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <p className="mt-12 max-w-xl text-base leading-8 text-muted sm:mt-16 sm:text-lg">
              A Conexão Negócios é uma rede de mídia digital local.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-8 max-w-xl text-base leading-8 text-muted sm:text-lg">
              Telas instaladas em estabelecimentos selecionados exibem uma
              programação formada por:
            </p>
          </Reveal>

          <div className="mt-12 max-w-xl">
            {programming.map((item, index) => (
              <Reveal key={item} delay={80 + index * 70}>
                <div className="flex gap-5 border-t border-line py-5">
                  <span className="font-sans text-[11px] tracking-[0.22em] text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base leading-7 text-foreground/90">
                    {item}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <p className="mt-10 max-w-xl text-base leading-8 text-muted sm:text-lg">
              A programação funciona durante o horário de atendimento dos
              estabelecimentos e é administrada pela Conexão Negócios.
            </p>
          </Reveal>
        </Section>

        <Section>
          <Reveal>
            <h2 className="max-w-4xl font-display text-[clamp(1.85rem,4.8vw,3.6rem)] leading-[0.98] font-medium tracking-[0.02em] text-foreground uppercase">
              Não buscamos apenas lugares para instalar uma TV.
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-12 max-w-xl font-display text-2xl leading-snug text-gold-soft sm:mt-16 sm:text-3xl">
              Buscamos empresas para fazer parte da rede.
            </p>
          </Reveal>

          <div className="mt-16 grid sm:grid-cols-2">
            {criteria.map((item, index) => (
              <Reveal key={item.n} delay={index * 70}>
                <div className="flex items-baseline gap-5 border-t border-line px-0 py-7 sm:px-6">
                  <span className="font-sans text-[11px] tracking-[0.22em] text-gold">
                    {item.n}
                  </span>
                  <span className="font-display text-xl tracking-[0.04em] text-foreground uppercase sm:text-2xl">
                    {item.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section>
          <Reveal>
            <h2 className="font-display text-[clamp(1.85rem,4.8vw,3.6rem)] leading-[0.98] font-medium tracking-[0.02em] text-foreground uppercase">
              Sua empresa não aparece
              <br />
              somente na sua TV.
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-12 font-display text-[clamp(2rem,5.4vw,4.2rem)] leading-[0.95] font-medium tracking-[0.02em] text-gold uppercase">
              Sua empresa aparecerá
              <br />
              nas 10 telas da rede.
            </p>
          </Reveal>

          <div className="mt-12 max-w-xl space-y-8 text-base leading-8 text-muted sm:text-lg">
            <Reveal delay={80}>
              <p>
                Esse é um dos principais benefícios de ser um Ponto Parceiro.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <p>
                Seu anúncio institucional não ficará restrito à tela instalada
                no seu estabelecimento.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <p>
                Clientes de outros estabelecimentos também poderão conhecer sua
                marca.
              </p>
            </Reveal>
          </div>

          <ScreensLink />
        </Section>

        <Section>
          <Reveal>
            <h2 className="font-display text-[clamp(1.85rem,4.8vw,3.6rem)] leading-[0.98] font-medium tracking-[0.02em] text-foreground uppercase">
              O que o ponto
              <br />
              parceiro ganha?
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-3 sm:grid-cols-2">
            {benefits.map((item, index) => (
              <Reveal key={item.title} delay={index * 80}>
                <article className="flex h-full flex-col border border-line bg-surface/70 px-6 py-8 backdrop-blur-sm transition-colors duration-300 hover:border-gold/45">
                  <span className="font-sans text-[10px] tracking-[0.28em] text-gold uppercase">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-display text-2xl tracking-[0.08em] text-foreground uppercase sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-5 text-base leading-8 text-muted">
                    {item.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section>
          <Reveal>
            <h2 className="font-display text-[clamp(1.85rem,4.8vw,3.6rem)] leading-[0.98] font-medium tracking-[0.02em] text-foreground uppercase">
              Uma rede que
              <br />
              cresce junto
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-16 hidden items-stretch md:flex">
              {chain.map((item, index) => (
                <div key={item.name} className="flex flex-1 items-stretch">
                  <div className="flex flex-1 flex-col items-center justify-center border border-line bg-surface/70 px-3 py-7">
                    <span className="text-gold">
                      <PlaceIcon name={item.name} />
                    </span>
                    <span className="mt-3 text-center font-sans text-[10px] tracking-[0.18em] text-foreground uppercase">
                      {item.label}
                    </span>
                  </div>
                  {index < chain.length - 1 ? (
                    <div
                      className="flex w-8 items-center justify-center text-gold/70"
                      aria-hidden
                    >
                      →
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </Reveal>

          <ol className="mt-16 flex flex-col items-center md:hidden">
            {chain.map((item, index) => (
              <li key={item.name} className="flex w-full flex-col items-center">
                <Reveal delay={index * 90} className="w-full">
                  <div className="w-full border border-line bg-surface/70 px-6 py-7 text-center">
                    <span className="text-gold">
                      <PlaceIcon name={item.name} />
                    </span>
                    <span className="mt-3 block font-display text-2xl tracking-[0.06em] text-foreground uppercase">
                      {item.label}
                    </span>
                  </div>
                </Reveal>
                {index < chain.length - 1 ? (
                  <div className="flex flex-col items-center py-4" aria-hidden>
                    <span className="h-8 w-px bg-gold/50" />
                    <span className="mt-1 text-gold/80">↓</span>
                  </div>
                ) : null}
              </li>
            ))}
          </ol>

          <div className="mt-16 max-w-xl space-y-5 text-base leading-8 text-muted sm:text-lg">
            {chainLines.map((line, index) => (
              <Reveal key={line} delay={index * 80}>
                <p>{line}</p>
              </Reveal>
            ))}
            <Reveal delay={360}>
              <p className="text-foreground/90">
                E todos esses estabelecimentos também apresentando a sua
                empresa.
              </p>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <p className="mt-16 max-w-3xl font-display text-[clamp(1.6rem,3.8vw,2.6rem)] leading-tight text-gold">
              Negócios locais conectando negócios locais aos consumidores da
              cidade.
            </p>
          </Reveal>
        </Section>

        <Section>
          <Reveal>
            <h2 className="font-display text-[clamp(1.85rem,4.8vw,3.6rem)] leading-[0.98] font-medium tracking-[0.02em] text-foreground uppercase">
              O que precisamos
              <br />
              do ponto parceiro?
            </h2>
          </Reveal>

          <div className="mt-16 max-w-xl">
            {needs.map((item, index) => (
              <Reveal key={item} delay={index * 70}>
                <div className="flex gap-5 border-t border-line py-5">
                  <span className="font-sans text-[11px] tracking-[0.22em] text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base leading-7 text-foreground/90">
                    {item}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={160}>
            <p className="mt-10 max-w-xl text-sm leading-7 text-muted">
              Detalhes técnicos, responsabilidades, manutenção e condições serão
              definidos no contrato de parceria.
            </p>
          </Reveal>
        </Section>

        <Section>
          <div className="relative overflow-hidden">
            <span
              aria-hidden
              className="pointer-events-none absolute -top-10 -right-4 font-display text-[10rem] leading-none text-gold/[0.06] sm:text-[14rem]"
            >
              10
            </span>

            <Reveal>
              <h2 className="relative font-display text-[clamp(1.85rem,4.8vw,3.6rem)] leading-[0.98] font-medium tracking-[0.02em] text-foreground uppercase">
                Apenas 10 pontos
                <br />
                na primeira rede.
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <p className="relative mt-12 max-w-2xl font-display text-[clamp(1.7rem,4vw,3rem)] leading-tight text-gold-soft">
                Os primeiros 10 serão nossos pontos fundadores.
              </p>
            </Reveal>

            <div className="relative mt-12 max-w-xl space-y-8 text-base leading-8 text-muted sm:text-lg">
              <Reveal delay={80}>
                <p>Não queremos apenas colocar uma tela dentro da sua empresa.</p>
              </Reveal>
              <Reveal delay={160}>
                <p className="text-foreground/90">
                  Queremos colocar sua empresa dentro de uma rede.
                </p>
              </Reveal>
            </div>
          </div>
        </Section>

        <Section id="contato" className="sm:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="font-display text-[clamp(1.85rem,4.8vw,3.6rem)] leading-[0.98] font-medium tracking-[0.02em] text-foreground uppercase">
                Quer ser um dos 10 primeiros pontos parceiros?
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <p className="mx-auto mt-12 max-w-lg text-base leading-8 text-muted sm:text-lg">
                Estamos selecionando empresas com boa reputação, movimento,
                localização e público compatível com a proposta da Conexão
                Negócios.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <a
                href="#"
                className="mt-14 inline-flex h-12 w-full items-center justify-center bg-gold px-7 text-[11px] font-medium tracking-[0.22em] text-background uppercase transition-colors duration-300 hover:bg-gold-soft sm:w-auto"
              >
                Quero conhecer a parceria
              </a>
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
            Você disponibiliza um ponto.
            <br />
            Nós conectamos sua empresa à rede.
          </p>
          <p className="mt-10 font-display text-xl leading-snug text-foreground/85 sm:text-2xl">
            Conectando empresas.
            <br />
            Aproximando clientes.
            <br />
            <span className="text-gold">Fortalecendo negócios locais.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
