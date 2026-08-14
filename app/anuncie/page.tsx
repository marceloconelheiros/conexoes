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
    price: "389,90",
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
  { name: "Pro", month: "389,90", day: "13,00" },
  { name: "Premium", month: "697", day: "23,23" },
];

const linkClass =
  "inline-flex min-h-12 items-center justify-center px-5 py-3.5 text-center text-[10px] font-medium leading-snug tracking-[0.12em] uppercase transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:px-7 sm:text-[11px] sm:tracking-[0.22em]";

const headingClass =
  "font-display text-[clamp(1.7rem,7vw,3.6rem)] leading-[1.06] font-medium tracking-[0.02em] text-pretty break-words text-foreground uppercase sm:leading-[0.98]";

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

      <header className="relative z-10 px-5 pt-8 pb-6 sm:px-10 sm:pt-10 sm:pb-8 lg:px-16">
        <div className="mx-auto w-full max-w-5xl">
          <Link
            href="/"
            className="font-sans text-[10px] font-medium tracking-[0.32em] text-gold uppercase transition-colors duration-300 hover:text-gold-soft sm:text-[11px] sm:tracking-[0.42em]"
          >
            Conexão Negócios
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex flex-1 flex-col">
        <section className="flex flex-col px-5 pb-16 sm:px-10 sm:pb-24 lg:px-16 lg:pb-28">
          <div className="mx-auto w-full max-w-5xl">
            <p
              className="animate-fade-up font-sans text-[10px] tracking-[0.28em] text-gold uppercase sm:text-[11px] sm:tracking-[0.38em]"
              style={{ animationDelay: "0.05s" }}
            >
              Anuncie na rede
            </p>

            <h1
              className="animate-fade-up mt-6 font-display text-[clamp(1.7rem,7.4vw,4.6rem)] leading-[1.06] font-medium tracking-[0.02em] text-pretty break-words text-foreground uppercase sm:mt-8 sm:leading-[0.94] sm:tracking-[0.04em]"
              style={{ animationDelay: "0.15s" }}
            >
              E se sua empresa aparecesse{" "}
              <br className="hidden sm:block" />
              todos os dias nos lugares{" "}
              <br className="hidden sm:block" />
              que seus clientes já frequentam?
            </h1>

            <p
              className="animate-fade-up mt-8 max-w-xl font-display text-[1.45rem] leading-snug font-normal text-gold-soft sm:mt-10 sm:text-3xl"
              style={{ animationDelay: "0.28s" }}
            >
              Sua empresa presente onde seus clientes estão.
            </p>

            <p
              className="animate-fade-up mt-6 max-w-lg text-[0.95rem] leading-7 text-muted sm:mt-8 sm:text-lg sm:leading-8"
              style={{ animationDelay: "0.4s" }}
            >
              A Conexão Negócios conecta empresas aos consumidores por meio de
              uma rede de telas digitais instaladas em pontos estratégicos da
              cidade.
            </p>

            <div
              className="animate-fade-up mt-10 flex flex-col gap-3 sm:mt-14 sm:flex-row sm:flex-wrap sm:items-center"
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
                className={`${linkClass} w-full border border-gold/50 text-gold hover:border-gold hover:bg-gold/10 sm:w-auto`}
              >
                Conheça a vitrine
              </Link>
            </div>
          </div>
        </section>

        <Section>
          <Reveal>
            <h2 className={headingClass}>
              A cidade virou
              <br />
              nosso canal de comunicação.
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-8 max-w-xl text-[0.95rem] leading-7 text-muted sm:mt-12 sm:text-lg sm:leading-8">
              Em vez de esperar que o consumidor encontre sua empresa, colocamos
              sua marca dentro dos ambientes que ele já frequenta.
            </p>
          </Reveal>

          <ConceptPath />
        </Section>

        <Section>
          <Reveal>
            <h2 className="font-display text-[clamp(1.7rem,6.8vw,5rem)] leading-[1.06] font-medium tracking-[0.02em] text-pretty break-words text-foreground uppercase sm:leading-[0.95]">
              <span className="text-[1.12em]">Dez pontos.</span>
              <br />
              Uma única rede.
              <br />
              <span className="text-gold">
                Inúmeras oportunidades de ser visto.
              </span>
            </h2>
          </Reveal>

          <NetworkMap />

          <Reveal delay={120}>
            <p className="mt-10 max-w-xl text-[0.95rem] leading-7 text-muted sm:mt-16 sm:text-lg sm:leading-8">
              Nossa primeira rede será formada por 10 TVs instaladas em
              estabelecimentos selecionados por localização, circulação, perfil
              de público e potencial de exposição.
            </p>
          </Reveal>
        </Section>

        <Section>
          <Reveal>
            <h2 className={headingClass}>
              Sua marca presente
              <br />
              durante o dia.
            </h2>
          </Reveal>

          <div className="mt-8 max-w-xl space-y-6 text-[0.95rem] leading-7 text-muted sm:mt-12 sm:space-y-8 sm:text-lg sm:leading-8">
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
            <p className="mt-12 font-display text-[clamp(1.7rem,6.5vw,4.2rem)] leading-[1.05] font-medium tracking-[0.02em] text-pretty break-words text-gold uppercase sm:mt-16 sm:leading-[0.95]">
              Frequência gera lembrança.
            </p>
          </Reveal>

          <FrequencyCycle />
        </Section>

        <Section>
          <Reveal>
            <h2 className={headingClass}>
              Publicidade onde
              <br />
              as pessoas já estão.
            </h2>
          </Reveal>

          <div className="mt-10 max-w-2xl space-y-4 sm:mt-16 sm:space-y-5">
            {presenceLines.map((line, index) => (
              <Reveal key={line} delay={index * 90}>
                <p className="font-display text-[clamp(1.3rem,5.2vw,2.2rem)] leading-snug text-pretty text-foreground">
                  {line}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={380}>
            <p className="mt-12 font-display text-[clamp(1.55rem,6vw,3.4rem)] leading-[1.05] font-medium tracking-[0.02em] text-pretty break-words text-gold uppercase sm:mt-16 sm:leading-[0.98]">
              Sua marca já está no ambiente.
            </p>
          </Reveal>
        </Section>

        <Section>
          <Reveal>
            <h2 className={headingClass}>
              Não é só quantas
              <br />
              pessoas vão ver.
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-8 font-display text-[clamp(1.7rem,6.5vw,4.2rem)] leading-[1.05] font-medium tracking-[0.02em] text-pretty break-words text-gold uppercase sm:mt-12 sm:leading-[0.95]">
              É quem você quer que veja.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-8 max-w-xl text-[0.95rem] leading-7 text-muted sm:mt-12 sm:text-lg sm:leading-8">
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
            <h2 className={headingClass}>
              Sua comunicação
              <br />
              não fica parada.
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-8 font-display text-[clamp(1.45rem,5.4vw,3rem)] leading-snug text-pretty text-gold-soft sm:mt-12 sm:leading-tight">
              1 nova produção publicitária a cada 3 meses.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-8 max-w-xl text-[0.95rem] leading-7 text-muted sm:mt-10 sm:text-lg sm:leading-8">
              Enquanto seu plano estiver ativo, a Conexão Negócios produz
              periodicamente uma nova comunicação publicitária para utilização
              nas telas da rede, conforme condições contratuais.
            </p>
          </Reveal>

          <ProductionTimeline />

          <Reveal delay={160}>
            <p className="mt-12 font-display text-[clamp(1.45rem,5.4vw,3rem)] leading-snug text-pretty break-words text-gold uppercase sm:mt-16 sm:leading-tight">
              Até 4 novas produções em 12 meses.
            </p>
          </Reveal>
        </Section>

        <Section id="planos" className="scroll-mt-6 sm:scroll-mt-10">
          <Reveal>
            <h2 className={headingClass}>Escolha sua presença.</h2>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:items-stretch">
            {plans.map((plan, index) => (
              <Reveal key={plan.name} delay={index * 90} className="h-full">
                <article
                  id={`plano-${plan.name.toLowerCase()}`}
                  className={`relative flex h-full scroll-mt-24 flex-col border px-5 py-7 transition-colors duration-300 sm:px-7 sm:py-10 ${
                    plan.featured
                      ? "border-gold/60 bg-gold/[0.06] hover:border-gold"
                      : "border-line bg-surface/70 hover:border-gold/45"
                  } target:border-gold target:bg-gold/[0.08]`}
                >
                  <p
                    className={`mb-5 font-sans text-[10px] tracking-[0.28em] uppercase sm:mb-6 ${
                      plan.featured ? "text-gold" : "invisible"
                    }`}
                    aria-hidden={!plan.featured}
                  >
                    Mais escolhido
                  </p>

                  <h3 className="font-display text-[2rem] leading-none tracking-[0.08em] text-foreground uppercase sm:text-[2.4rem]">
                    {plan.name}
                  </h3>
                  <p className="mt-4 text-[0.95rem] leading-7 text-muted">
                    {plan.tagline}
                  </p>

                  <p className="mt-7 font-sans text-[11px] tracking-[0.22em] text-gold uppercase">
                    {plan.screens}
                  </p>
                  <p className="mt-3 flex flex-wrap items-baseline gap-x-1 font-display text-[clamp(1.85rem,5vw,2.45rem)] leading-none tracking-[0.02em] text-foreground">
                    <span>R$ {plan.price}</span>
                    <span className="font-sans text-sm tracking-[0.12em] text-muted">
                      /mês
                    </span>
                  </p>

                  <ul className="mt-7 flex-1 space-y-3 sm:mt-8">
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
                    className={`${linkClass} mt-8 w-full sm:mt-10 ${
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
            <h2 className={headingClass}>
              Quanto custa estar
              <br />
              presente todos os dias?
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-3 sm:mt-16 md:grid-cols-3">
            {daily.map((item, index) => (
              <Reveal key={item.name} delay={index * 80}>
                <article className="border border-line bg-surface/70 px-5 py-7 sm:px-6 sm:py-8">
                  <p className="font-sans text-[10px] tracking-[0.28em] text-gold uppercase">
                    {item.name}
                  </p>
                  <p className="mt-5 flex flex-wrap items-baseline gap-x-1 font-display text-[clamp(1.7rem,5vw,2.2rem)] leading-none text-foreground">
                    <span>R$ {item.month}</span>
                    <span className="font-sans text-sm tracking-[0.12em] text-muted">
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
            <h2 className={headingClass}>
              Sua empresa também
              <br />
              ganha presença online.
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-8 max-w-xl text-[0.95rem] leading-7 text-muted sm:mt-12 sm:text-lg sm:leading-8">
              Anunciantes ativos da Conexão Negócios também poderão fazer parte
              da Vitrine de Negócios da Rede.
            </p>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-10 font-display text-[clamp(1.4rem,5.4vw,2.6rem)] leading-snug text-pretty text-gold sm:mt-16 sm:leading-tight">
              Telas + presença digital + conexão local.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <Link
              href="/negocios"
              className={`${linkClass} animate-pulse-cta mt-8 w-full bg-gold text-background hover:bg-gold-soft sm:mt-12 sm:w-auto`}
            >
              Conheça a vitrine
            </Link>
          </Reveal>
        </Section>

        <Section>
          <Reveal>
            <h2 className={headingClass}>
              Sua presença
              <br />
              pode crescer.
            </h2>
          </Reveal>

          <GrowthPath />

          <Reveal delay={140}>
            <p className="mt-10 max-w-xl text-[0.95rem] leading-7 text-muted sm:mt-16 sm:text-lg sm:leading-8">
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
              <h2 className={`relative ${headingClass}`}>
                A rede possui
                <br />
                posições limitadas.
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <p className="relative mt-8 max-w-xl text-[0.95rem] leading-7 text-muted sm:mt-12 sm:text-lg sm:leading-8">
                Parte da programação é reservada aos Pontos Parceiros e os
                demais espaços são disponibilizados para anunciantes.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <p className="relative mt-8 max-w-3xl font-display text-[clamp(1.3rem,5vw,2.4rem)] leading-snug text-pretty text-gold-soft sm:mt-12 sm:leading-tight">
                Quando um ponto atinge sua capacidade, novos anunciantes
                precisam escolher outra posição da rede.
              </p>
            </Reveal>
          </div>
        </Section>

        <Section>
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className={headingClass}>
                Em qual ponto da cidade{" "}
                <br className="hidden sm:block" />
                está o seu próximo cliente?
              </h2>
            </Reveal>

            <div className="mx-auto mt-8 max-w-lg space-y-5 text-[0.95rem] leading-7 text-muted sm:mt-12 sm:space-y-6 sm:text-lg sm:leading-8">
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
                className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-sans text-[10px] tracking-[0.22em] text-gold uppercase sm:mt-14 sm:text-[11px] sm:tracking-[0.32em]"
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
                className={`${linkClass} mt-8 w-full bg-gold text-background hover:bg-gold-soft sm:mt-10 sm:w-auto`}
              >
                Quero anunciar na Conexão Negócios
              </a>
            </Reveal>
          </div>
        </Section>
      </main>

      <footer className="relative z-10 border-t border-line px-5 py-12 sm:px-10 sm:py-16 lg:px-16">
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
