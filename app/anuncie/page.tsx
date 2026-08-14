import type { Metadata } from "next";
import Link from "next/link";
import { NetworkMap } from "../pontos/network-map";
import { Reveal } from "../pontos/reveal";
import {
  AffinityGrid,
  ConceptPath,
  FrequencyCycle,
  GrowthPath,
  ProductionTimeline,
  Section,
  VitrinePreview,
} from "./visuals";

export const metadata: Metadata = {
  title: "Anuncie | Conexão Negócios",
  description:
    "Sua empresa presente onde seus clientes estão. Anuncie na rede de telas digitais da Conexão Negócios.",
};

const presenceLines = [
  "Seu cliente não precisa clicar.",
  "Não precisa seguir.",
  "Não precisa pesquisar.",
  "Não precisa abrir uma rede social.",
];

const plans = [
  {
    name: "Start",
    tagline: "Comece sua presença.",
    screens: "2 telas",
    price: "197",
    featured: false,
    benefits: [
      "presença em 2 telas",
      "produção publicitária inclusa",
      "perfil na Vitrine Conexão Negócios",
    ],
    cta: "Começar no Start",
  },
  {
    name: "Pro",
    tagline: "Amplie sua presença.",
    screens: "5 telas",
    price: "349",
    featured: true,
    benefits: [
      "presença em 5 telas",
      "produção publicitária inclusa",
      "perfil completo na Vitrine",
      "destaque na categoria",
    ],
    cta: "Quero o Pro",
  },
  {
    name: "Premium",
    tagline: "Máxima presença.",
    screens: "10 telas",
    price: "697",
    featured: false,
    benefits: [
      "presença nas 10 telas",
      "produção publicitária inclusa",
      "perfil premium na Vitrine",
      "maior destaque dentro da rede",
    ],
    cta: "Quero o Premium",
  },
];

const daily = [
  { name: "Start", month: "197", day: "6,57" },
  { name: "Pro", month: "349", day: "11,63" },
  { name: "Premium", month: "697", day: "23,23" },
];

const linkClass =
  "inline-flex h-12 items-center justify-center px-7 text-[11px] font-medium tracking-[0.22em] uppercase transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

export default function AnunciePage() {
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
        <section className="flex flex-col px-6 pb-8 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-5xl">
            <p
              className="animate-fade-up font-sans text-[11px] tracking-[0.38em] text-gold uppercase"
              style={{ animationDelay: "0.05s" }}
            >
              Anuncie na rede
            </p>

            <h1
              className="animate-fade-up mt-8 font-display text-[clamp(2rem,6.2vw,4.6rem)] leading-[0.92] font-medium tracking-[0.04em] text-foreground uppercase"
              style={{ animationDelay: "0.15s" }}
            >
              E se sua empresa aparecesse
              <br />
              todos os dias nos lugares
              <br />
              que seus clientes já frequentam?
            </h1>

            <p
              className="animate-fade-up mt-10 max-w-xl font-display text-2xl leading-snug font-normal text-gold-soft sm:text-3xl"
              style={{ animationDelay: "0.28s" }}
            >
              Sua empresa presente onde seus clientes estão.
            </p>

            <p
              className="animate-fade-up mt-8 max-w-lg text-base leading-8 text-muted sm:text-lg"
              style={{ animationDelay: "0.4s" }}
            >
              A Conexão Negócios conecta empresas aos consumidores por meio de
              uma rede de telas digitais instaladas em pontos estratégicos da
              cidade.
            </p>

            <div
              className="animate-fade-up mt-14 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
              style={{ animationDelay: "0.52s" }}
            >
              <a
                href="#"
                className={`${linkClass} w-full bg-gold text-background hover:bg-gold-soft sm:w-auto`}
              >
                Quero colocar minha empresa na rede
              </a>
              <a
                href="#planos"
                className={`${linkClass} w-full border border-gold/50 text-gold hover:border-gold hover:bg-gold/10 sm:w-auto`}
              >
                Conhecer os planos
              </a>
              <Link
                href="/negocios"
                className="animate-pulse-gold-ring inline-flex h-24 w-24 shrink-0 items-center justify-center self-center rounded-full border-2 border-gold bg-gold/10 text-center text-[10px] font-medium tracking-[0.16em] text-gold uppercase transition-colors duration-300 hover:bg-gold/20 hover:text-gold-soft"
              >
                Conheça
                <br />
                a vitrine
              </Link>
            </div>
          </div>
        </section>

        <Section>
          <Reveal>
            <h2 className="font-display text-[clamp(1.85rem,4.8vw,3.6rem)] leading-[0.98] font-medium tracking-[0.02em] text-foreground uppercase">
              A cidade virou
              <br />
              nosso canal de comunicação.
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-12 max-w-xl text-base leading-8 text-muted sm:mt-16 sm:text-lg">
              Em vez de esperar que o consumidor encontre sua empresa, colocamos
              sua marca dentro dos ambientes que ele já frequenta.
            </p>
          </Reveal>

          <ConceptPath />
        </Section>

        <Section>
          <Reveal>
            <h2 className="font-display text-[clamp(2.2rem,6vw,5rem)] leading-[0.95] font-medium tracking-[0.02em] text-foreground uppercase">
              <span className="text-[1.12em]">Dez pontos.</span>
              <br />
              Uma única rede.
              <br />
              <span className="text-gold">Inúmeras oportunidades de ser visto.</span>
            </h2>
          </Reveal>

          <NetworkMap />

          <Reveal delay={120}>
            <p className="mt-16 max-w-xl text-base leading-8 text-muted sm:text-lg">
              Nossa primeira rede será formada por 10 TVs instaladas em
              estabelecimentos selecionados por localização, circulação, perfil
              de público e potencial de exposição.
            </p>
          </Reveal>
        </Section>

        <Section>
          <Reveal>
            <h2 className="font-display text-[clamp(1.85rem,4.8vw,3.6rem)] leading-[0.98] font-medium tracking-[0.02em] text-foreground uppercase">
              Sua marca presente
              <br />
              durante o dia.
            </h2>
          </Reveal>

          <div className="mt-12 max-w-xl space-y-8 text-base leading-8 text-muted sm:mt-16 sm:text-lg">
            <Reveal delay={80}>
              <p>
                As telas funcionam durante o horário de atendimento dos
                estabelecimentos.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <p>
                A programação acontece em ciclos aproximados de 15 minutos e se
                repete ao longo do dia.
              </p>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <p className="mt-16 font-display text-[clamp(2rem,5.4vw,4.2rem)] leading-[0.95] font-medium tracking-[0.02em] text-gold uppercase">
              Frequência gera lembrança.
            </p>
          </Reveal>

          <FrequencyCycle />
        </Section>

        <Section>
          <Reveal>
            <h2 className="font-display text-[clamp(1.85rem,4.8vw,3.6rem)] leading-[0.98] font-medium tracking-[0.02em] text-foreground uppercase">
              Publicidade onde
              <br />
              as pessoas já estão.
            </h2>
          </Reveal>

          <div className="mt-16 max-w-2xl space-y-5">
            {presenceLines.map((line, index) => (
              <Reveal key={line} delay={index * 90}>
                <p className="font-display text-[clamp(1.45rem,3.4vw,2.2rem)] leading-snug text-foreground">
                  {line}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={380}>
            <p className="mt-16 font-display text-[clamp(1.85rem,4.8vw,3.4rem)] leading-[0.98] font-medium tracking-[0.02em] text-gold uppercase">
              Sua marca já está no ambiente.
            </p>
          </Reveal>
        </Section>

        <Section>
          <Reveal>
            <h2 className="font-display text-[clamp(1.85rem,4.8vw,3.6rem)] leading-[0.98] font-medium tracking-[0.02em] text-foreground uppercase">
              Não é só quantas
              <br />
              pessoas vão ver.
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-12 font-display text-[clamp(2rem,5.4vw,4.2rem)] leading-[0.95] font-medium tracking-[0.02em] text-gold uppercase">
              É quem você quer que veja.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-12 max-w-xl text-base leading-8 text-muted sm:text-lg">
              A Conexão Negócios permite selecionar pontos com maior afinidade
              com o perfil de cliente da sua empresa.
            </p>
          </Reveal>

          <AffinityGrid />

          <Reveal delay={120}>
            <p className="mt-10 text-sm leading-7 text-muted">
              Exemplos de afinidade — a escolha dos pontos acompanha a
              estratégia de cada anunciante.
            </p>
          </Reveal>
        </Section>

        <Section>
          <Reveal>
            <h2 className="font-display text-[clamp(1.85rem,4.8vw,3.6rem)] leading-[0.98] font-medium tracking-[0.02em] text-foreground uppercase">
              Sua comunicação
              <br />
              não fica parada.
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-12 font-display text-[clamp(1.7rem,4vw,3rem)] leading-tight text-gold-soft">
              1 nova produção publicitária a cada 2 meses.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-10 max-w-xl text-base leading-8 text-muted sm:text-lg">
              Enquanto seu plano estiver ativo, a Conexão Negócios produz
              periodicamente uma nova comunicação publicitária para utilização
              nas telas da rede, conforme condições contratuais.
            </p>
          </Reveal>

          <ProductionTimeline />

          <Reveal delay={160}>
            <p className="mt-16 font-display text-[clamp(1.7rem,4vw,3rem)] leading-tight text-gold uppercase">
              Até 6 novas produções em 12 meses.
            </p>
          </Reveal>
        </Section>

        <Section id="planos" className="scroll-mt-8">
          <Reveal>
            <h2 className="font-display text-[clamp(1.85rem,4.8vw,3.6rem)] leading-[0.98] font-medium tracking-[0.02em] text-foreground uppercase">
              Escolha sua presença.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-4 lg:grid-cols-3 lg:items-stretch">
            {plans.map((plan, index) => (
              <Reveal key={plan.name} delay={index * 90} className="h-full">
                <article
                  id={`plano-${plan.name.toLowerCase()}`}
                  className={`relative flex h-full scroll-mt-24 flex-col border px-6 py-8 transition-colors duration-300 sm:px-7 sm:py-10 ${
                    plan.featured
                      ? "border-gold/60 bg-gold/[0.06] hover:border-gold"
                      : "border-line bg-surface/70 hover:border-gold/45"
                  } target:border-gold target:bg-gold/[0.08]`}
                >
                  <p
                    className={`mb-6 font-sans text-[10px] tracking-[0.28em] uppercase ${
                      plan.featured ? "text-gold" : "invisible"
                    }`}
                    aria-hidden={!plan.featured}
                  >
                    Mais escolhido
                  </p>

                  <h3 className="font-display text-[2.4rem] leading-none tracking-[0.08em] text-foreground uppercase">
                    {plan.name}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-muted">
                    {plan.tagline}
                  </p>

                  <p className="mt-8 font-sans text-[11px] tracking-[0.22em] text-gold uppercase">
                    {plan.screens}
                  </p>
                  <p className="mt-3 font-display text-[2.6rem] leading-none tracking-[0.02em] text-foreground">
                    R$ {plan.price}
                    <span className="ml-1 font-sans text-sm tracking-[0.12em] text-muted">
                      /mês
                    </span>
                  </p>

                  <ul className="mt-8 flex-1 space-y-3">
                    {plan.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex gap-3 text-sm leading-6 text-foreground/85"
                      >
                        <span className="mt-2 h-px w-4 shrink-0 bg-gold/60" aria-hidden />
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#"
                    className={`${linkClass} mt-10 w-full ${
                      plan.featured
                        ? "bg-gold text-background hover:bg-gold-soft"
                        : "border border-gold/50 text-gold hover:border-gold hover:bg-gold/10"
                    }`}
                  >
                    {plan.cta}
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section>
          <Reveal>
            <h2 className="font-display text-[clamp(1.85rem,4.8vw,3.6rem)] leading-[0.98] font-medium tracking-[0.02em] text-foreground uppercase">
              Quanto custa estar
              <br />
              presente todos os dias?
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-3 sm:grid-cols-3">
            {daily.map((item, index) => (
              <Reveal key={item.name} delay={index * 80}>
                <article className="border border-line bg-surface/70 px-6 py-8">
                  <p className="font-sans text-[10px] tracking-[0.28em] text-gold uppercase">
                    {item.name}
                  </p>
                  <p className="mt-5 font-display text-[2.2rem] leading-none text-foreground">
                    R$ {item.month}
                    <span className="ml-1 font-sans text-sm tracking-[0.12em] text-muted">
                      /mês
                    </span>
                  </p>
                  <p className="mt-5 text-sm leading-6 text-muted">
                    aproximadamente
                    <br />
                    <span className="text-gold-soft">R$ {item.day} por dia*</span>
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <p className="mt-8 text-xs leading-6 text-muted">
              *Valores aproximados considerando 30 dias.
            </p>
          </Reveal>
        </Section>

        <Section>
          <Reveal>
            <h2 className="font-display text-[clamp(1.85rem,4.8vw,3.6rem)] leading-[0.98] font-medium tracking-[0.02em] text-foreground uppercase">
              Sua empresa também
              <br />
              ganha presença online.
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-12 max-w-xl text-base leading-8 text-muted sm:mt-16 sm:text-lg">
              Anunciantes ativos da Conexão Negócios também poderão fazer parte
              da Vitrine de Negócios da Rede.
            </p>
          </Reveal>

          <VitrinePreview />

          <Reveal delay={160}>
            <p className="mt-16 font-display text-[clamp(1.6rem,3.8vw,2.6rem)] leading-tight text-gold">
              Telas + presença digital + conexão local.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <Link
              href="/negocios"
              className="animate-pulse-gold-ring mt-12 inline-flex h-40 w-40 items-center justify-center rounded-full border-2 border-gold bg-gold/10 text-center text-[11px] font-medium tracking-[0.18em] text-gold uppercase transition-colors duration-300 hover:bg-gold/20 hover:text-gold-soft"
            >
              Conhecer
              <br />
              a vitrine
            </Link>
          </Reveal>
        </Section>

        <Section>
          <Reveal>
            <h2 className="font-display text-[clamp(1.85rem,4.8vw,3.6rem)] leading-[0.98] font-medium tracking-[0.02em] text-foreground uppercase">
              Sua presença
              <br />
              pode crescer.
            </h2>
          </Reveal>

          <GrowthPath />

          <Reveal delay={140}>
            <p className="mt-16 max-w-xl text-base leading-8 text-muted sm:text-lg">
              Comece onde fizer sentido para sua estratégia e amplie sua
              presença conforme sua empresa evoluir dentro da rede.
            </p>
          </Reveal>
        </Section>

        <Section>
          <div className="relative overflow-hidden">
            <span
              aria-hidden
              className="pointer-events-none absolute -top-8 -right-2 font-display text-[8rem] leading-none text-gold/[0.06] sm:text-[12rem]"
            >
              10
            </span>

            <Reveal>
              <h2 className="relative font-display text-[clamp(1.85rem,4.8vw,3.6rem)] leading-[0.98] font-medium tracking-[0.02em] text-foreground uppercase">
                A rede possui
                <br />
                posições limitadas.
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <p className="relative mt-12 max-w-xl text-base leading-8 text-muted sm:text-lg">
                Parte da programação é reservada aos Pontos Parceiros e os
                demais espaços são disponibilizados para anunciantes.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <p className="relative mt-12 max-w-3xl font-display text-[clamp(1.5rem,3.6vw,2.4rem)] leading-tight text-gold-soft">
                Quando um ponto atinge sua capacidade, novos anunciantes
                precisam escolher outra posição da rede.
              </p>
            </Reveal>
          </div>
        </Section>

        <Section>
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="font-display text-[clamp(1.85rem,4.8vw,3.6rem)] leading-[0.98] font-medium tracking-[0.02em] text-foreground uppercase">
                Em qual ponto da cidade
                <br />
                está o seu próximo cliente?
              </h2>
            </Reveal>

            <div className="mx-auto mt-12 max-w-lg space-y-6 text-base leading-8 text-muted sm:text-lg">
              <Reveal delay={80}>
                <p>Talvez ele ainda não conheça sua empresa.</p>
              </Reveal>
              <Reveal delay={160}>
                <p>
                  Mas amanhã ele pode entrar em um dos pontos da nossa rede e
                  encontrar sua marca ali.
                </p>
              </Reveal>
            </div>

            <Reveal delay={220}>
              <nav
                aria-label="Escolher plano"
                className="mt-14 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-sans text-[11px] tracking-[0.32em] text-gold uppercase"
              >
                {plans.map((plan, index) => (
                  <span key={plan.name} className="flex items-center gap-3">
                    {index > 0 ? (
                      <span className="text-gold/40" aria-hidden>
                        |
                      </span>
                    ) : null}
                    <a
                      href={`#plano-${plan.name.toLowerCase()}`}
                      className="transition-colors duration-300 hover:text-gold-soft"
                    >
                      {plan.name}
                    </a>
                  </span>
                ))}
              </nav>
            </Reveal>

            <Reveal delay={280}>
              <a
                href="#"
                className={`${linkClass} mt-10 w-full bg-gold text-background hover:bg-gold-soft sm:w-auto`}
              >
                Quero anunciar na Conexão Negócios
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
            Sua empresa presente onde seus clientes estão.
          </p>
        </div>
      </footer>
    </div>
  );
}
