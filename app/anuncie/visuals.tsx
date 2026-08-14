import type { ReactNode } from "react";
import { PlaceIcon, type PlaceName } from "../pontos/icons";
import { Reveal } from "../pontos/reveal";

const concept = [
  { label: "Empresa", detail: "A marca que deseja ser vista." },
  {
    label: "Conexão Negócios",
    detail: "A rede que organiza a presença.",
    highlight: true,
  },
  { label: "Pontos estratégicos", detail: "Onde o público já circula." },
  { label: "Consumidores", detail: "Quem encontra a marca no caminho." },
];

export function ConceptPath() {
  return (
    <Reveal className="mt-10 sm:mt-16">
      <ol className="hidden items-stretch lg:flex">
        {concept.map((step, index) => (
          <li key={step.label} className="flex min-w-0 flex-1 items-stretch">
            <div
              className={`flex min-w-0 flex-1 flex-col justify-between border px-4 py-6 xl:px-5 xl:py-7 ${
                step.highlight
                  ? "border-gold/50 bg-gold/[0.05]"
                  : "border-line bg-surface/70"
              }`}
            >
              <span className="font-sans text-[10px] tracking-[0.28em] text-gold uppercase">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3
                className={`mt-6 font-display text-[clamp(1.25rem,1.5vw,1.65rem)] leading-[1.05] tracking-[0.04em] break-words uppercase ${
                  step.highlight ? "text-gold" : "text-foreground"
                }`}
              >
                {step.label}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">{step.detail}</p>
            </div>
            {index < concept.length - 1 ? (
              <div
                className="flex w-7 shrink-0 items-center justify-center text-gold/70 xl:w-10"
                aria-hidden
              >
                →
              </div>
            ) : null}
          </li>
        ))}
      </ol>

      <ol className="flex flex-col lg:hidden">
        {concept.map((step, index) => (
          <li key={step.label} className="flex flex-col items-center">
            <div
              className={`w-full border px-5 py-6 sm:px-6 sm:py-7 ${
                step.highlight
                  ? "border-gold/50 bg-gold/[0.05]"
                  : "border-line bg-surface/70"
              }`}
            >
              <span className="font-sans text-[10px] tracking-[0.28em] text-gold uppercase">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3
                className={`mt-4 font-display text-[1.55rem] leading-[1.05] tracking-[0.06em] break-words uppercase sm:text-[1.85rem] sm:leading-[0.95] ${
                  step.highlight ? "text-gold" : "text-foreground"
                }`}
              >
                {step.label}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">{step.detail}</p>
            </div>
            {index < concept.length - 1 ? (
              <div className="flex flex-col items-center py-3" aria-hidden>
                <span className="h-7 w-px bg-gold/45" />
                <span className="mt-1 text-gold/80">↓</span>
              </div>
            ) : null}
          </li>
        ))}
      </ol>
    </Reveal>
  );
}

const hours = [
  { label: "08h", delay: "freq-delay-1" },
  { label: "10h", delay: "freq-delay-2" },
  { label: "12h", delay: "freq-delay-3" },
  { label: "14h", delay: "freq-delay-4" },
  { label: "16h", delay: "freq-delay-5" },
  { label: "18h", delay: "freq-delay-6" },
];

const brands = [
  { delay: "freq-delay-1", line1: "Studio", line2: "Norte" },
  { delay: "freq-delay-2", line1: "Clínica", line2: "Atlas" },
  { delay: "freq-delay-3", line1: "Casa", line2: "Leme" },
  { delay: "freq-delay-4", line1: "Oficina", line2: "Prisma" },
  { delay: "freq-delay-5", line1: "Imobiliária", line2: "Vale" },
  { delay: "freq-delay-6", line1: "Café", line2: "Brasa" },
];

export function FrequencyCycle() {
  return (
    <Reveal className="freq-stage mt-10 sm:mt-16">
      <div className="mx-auto w-full max-w-xl">
        <div className="freq-bezel border border-gold/30 bg-surface/80 p-2.5 sm:p-4">
          <div className="relative flex aspect-[16/11] flex-col justify-between border border-line bg-background px-4 py-4 sm:aspect-[16/10] sm:px-8 sm:py-7">
            <div className="flex items-center justify-between gap-3">
              <span className="flex gap-1.5" aria-hidden>
                <span className="h-1.5 w-1.5 rounded-full bg-gold/40" />
                <span className="h-1.5 w-1.5 rounded-full bg-gold/25" />
              </span>
              <span className="font-sans text-[8px] tracking-[0.18em] text-muted uppercase sm:text-[9px] sm:tracking-[0.28em]">
                Ciclo · 15 min
              </span>
            </div>

            <div className="relative min-h-[3.8rem] sm:min-h-[5.4rem]" aria-hidden>
              {brands.map((brand) => (
                <p
                  key={brand.delay}
                  className={`freq-brand ${brand.delay} absolute inset-x-0 top-0 font-display text-[clamp(1.35rem,6.2vw,2.8rem)] leading-[0.95] tracking-[0.04em] break-words text-foreground uppercase sm:tracking-[0.06em]`}
                >
                  {brand.line1}
                  <br />
                  {brand.line2}
                </p>
              ))}
            </div>

            <p className="font-sans text-[9px] tracking-[0.16em] text-muted uppercase sm:text-[10px] sm:tracking-[0.22em]">
              Retorna ao longo do dia
            </p>
          </div>
        </div>

        <p className="sr-only">
          Representação visual da programação: anunciantes locais aparecem em
          ciclos ao longo do horário de atendimento, como Studio Norte, Clínica
          Atlas, Casa Leme, Oficina Prisma, Imobiliária Vale e Café Brasa.
        </p>

        <div className="mt-4 grid grid-cols-3 gap-1.5 sm:mt-6 sm:grid-cols-6 sm:gap-2" aria-hidden>
          {hours.map((hour) => (
            <div
              key={hour.label}
              className={`freq-hour ${hour.delay} border px-1 py-2.5 text-center font-sans text-[9px] tracking-[0.14em] uppercase sm:px-2 sm:py-3 sm:text-[10px] sm:tracking-[0.2em]`}
            >
              {hour.label}
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

const affinities: {
  place: PlaceName;
  from: string;
  to: string;
}[] = [
  {
    place: "academia",
    from: "Academia",
    to: "suplementos / estética / alimentação saudável",
  },
  {
    place: "clinica",
    from: "Clínica",
    to: "saúde / seguros / serviços",
  },
  {
    place: "restaurante",
    from: "Restaurante",
    to: "varejo / entretenimento / serviços",
  },
  {
    place: "escritorio",
    from: "Empresa",
    to: "negócios B2B / financeiro / tecnologia",
  },
];

export function AffinityGrid() {
  return (
    <div className="mt-10 grid gap-3 sm:mt-16 sm:grid-cols-2">
      {affinities.map((item, index) => (
        <Reveal key={item.from} delay={index * 80}>
          <article className="flex h-full flex-col border border-line bg-surface/70 px-5 py-6 transition-colors duration-300 hover:border-gold/45 sm:px-6 sm:py-8">
            <span className="text-gold">
              <PlaceIcon name={item.place} />
            </span>
            <h3 className="mt-5 font-display text-2xl tracking-[0.08em] text-foreground uppercase">
              {item.from}
            </h3>
            <p className="mt-4 text-sm leading-7 text-muted">{item.to}</p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

const campaigns = [
  { month: "Mês 1", campaign: "Campanha 01" },
  { month: "Mês 4", campaign: "Campanha 02" },
  { month: "Mês 7", campaign: "Campanha 03" },
  { month: "Mês 10", campaign: "Campanha 04" },
];

export function ProductionTimeline() {
  return (
    <Reveal className="mt-10 overflow-x-hidden sm:mt-16">
      <ol className="hidden md:grid md:grid-cols-4">
        {campaigns.map((item, index) => (
          <li key={item.month} className="relative px-3 text-center">
            {index < campaigns.length - 1 ? (
              <span
                aria-hidden
                className="absolute top-3 right-0 left-1/2 h-px bg-gold/35"
              />
            ) : null}
            <span className="relative z-10 mx-auto block h-2.5 w-2.5 rounded-full border border-gold bg-background" />
            <p className="mt-6 font-sans text-[10px] tracking-[0.24em] text-gold uppercase">
              {item.month}
            </p>
            <p className="mt-3 font-display text-lg tracking-[0.06em] text-foreground uppercase xl:text-xl">
              {item.campaign}
            </p>
          </li>
        ))}
      </ol>

      <ol className="md:hidden">
        {campaigns.map((item, index) => (
          <li key={item.month} className="flex gap-5">
            <div className="flex flex-col items-center" aria-hidden>
              <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full border border-gold bg-background" />
              {index < campaigns.length - 1 ? (
                <span className="w-px flex-1 bg-gold/35" />
              ) : null}
            </div>
            <div className={index < campaigns.length - 1 ? "pb-8" : ""}>
              <p className="font-sans text-[10px] tracking-[0.24em] text-gold uppercase">
                {item.month}
              </p>
              <p className="mt-2 font-display text-2xl tracking-[0.06em] text-foreground uppercase">
                {item.campaign}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}

const growth = [
  { name: "Start", screens: "2 telas" },
  { name: "Pro", screens: "5 telas" },
  { name: "Premium", screens: "10 telas" },
];

export function GrowthPath() {
  return (
    <Reveal className="mt-10 sm:mt-16">
      <ol className="hidden items-stretch md:flex">
        {growth.map((step, index) => (
          <li key={step.name} className="flex min-w-0 flex-1 items-stretch">
            <a
              href={`#plano-${step.name.toLowerCase()}`}
              className="flex min-w-0 flex-1 flex-col items-center justify-center border border-line bg-surface/70 px-3 py-7 text-center transition-colors duration-300 hover:border-gold/55 hover:bg-gold/[0.06] sm:px-4 sm:py-8"
            >
              <span className="font-display text-2xl tracking-[0.08em] text-foreground uppercase lg:text-3xl">
                {step.name}
              </span>
              <span className="mt-3 font-sans text-[10px] tracking-[0.18em] text-gold uppercase sm:text-[11px] sm:tracking-[0.22em]">
                {step.screens}
              </span>
            </a>
            {index < growth.length - 1 ? (
              <div
                className="flex w-6 shrink-0 items-center justify-center text-gold/70 lg:w-10"
                aria-hidden
              >
                →
              </div>
            ) : null}
          </li>
        ))}
      </ol>

      <ol className="flex flex-col md:hidden">
        {growth.map((step, index) => (
          <li key={step.name} className="flex flex-col items-center">
            <a
              href={`#plano-${step.name.toLowerCase()}`}
              className="w-full border border-line bg-surface/70 px-6 py-8 text-center transition-colors duration-300 hover:border-gold/55 hover:bg-gold/[0.06]"
            >
              <span className="font-display text-3xl tracking-[0.08em] text-foreground uppercase">
                {step.name}
              </span>
              <span className="mt-3 block font-sans text-[11px] tracking-[0.22em] text-gold uppercase">
                {step.screens}
              </span>
            </a>
            {index < growth.length - 1 ? (
              <div className="flex flex-col items-center py-3" aria-hidden>
                <span className="h-7 w-px bg-gold/45" />
                <span className="mt-1 text-gold/80">↓</span>
              </div>
            ) : null}
          </li>
        ))}
      </ol>
    </Reveal>
  );
}

export function Section({
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
      className={`border-t border-line px-5 py-16 sm:px-10 sm:py-24 lg:px-16 lg:py-32 ${className}`}
    >
      <div className="mx-auto w-full max-w-5xl">{children}</div>
    </section>
  );
}
