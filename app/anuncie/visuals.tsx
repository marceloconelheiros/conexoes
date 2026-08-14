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
    <Reveal className="mt-16 sm:mt-20">
      <ol className="hidden items-stretch lg:flex">
        {concept.map((step, index) => (
          <li key={step.label} className="flex flex-1 items-stretch">
            <div
              className={`flex flex-1 flex-col justify-between border px-5 py-7 ${
                step.highlight
                  ? "border-gold/50 bg-gold/[0.05]"
                  : "border-line bg-surface/70"
              }`}
            >
              <span className="font-sans text-[10px] tracking-[0.28em] text-gold uppercase">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3
                className={`mt-8 font-display text-[1.65rem] leading-[0.95] tracking-[0.06em] uppercase ${
                  step.highlight ? "text-gold" : "text-foreground"
                }`}
              >
                {step.label}
              </h3>
              <p className="mt-4 text-sm leading-6 text-muted">{step.detail}</p>
            </div>
            {index < concept.length - 1 ? (
              <div
                className="flex w-10 items-center justify-center text-gold/70"
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
              className={`w-full border px-6 py-7 ${
                step.highlight
                  ? "border-gold/50 bg-gold/[0.05]"
                  : "border-line bg-surface/70"
              }`}
            >
              <span className="font-sans text-[10px] tracking-[0.28em] text-gold uppercase">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3
                className={`mt-4 font-display text-[1.85rem] leading-[0.95] tracking-[0.06em] uppercase ${
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
    <Reveal className="freq-stage mt-16 sm:mt-20">
      <div className="mx-auto max-w-xl">
        <div className="freq-bezel border border-gold/30 bg-surface/80 p-3 sm:p-4">
          <div className="relative flex aspect-[16/10] flex-col justify-between border border-line bg-background px-5 py-5 sm:px-8 sm:py-7">
            <div className="flex items-center justify-between">
              <span className="flex gap-1.5" aria-hidden>
                <span className="h-1.5 w-1.5 rounded-full bg-gold/40" />
                <span className="h-1.5 w-1.5 rounded-full bg-gold/25" />
              </span>
              <span className="font-sans text-[9px] tracking-[0.28em] text-muted uppercase">
                Ciclo · 15 min
              </span>
            </div>

            <div className="relative min-h-[4.6rem] sm:min-h-[5.4rem]" aria-hidden>
              {brands.map((brand) => (
                <p
                  key={brand.delay}
                  className={`freq-brand ${brand.delay} absolute inset-x-0 top-0 font-display text-[clamp(1.8rem,5vw,2.8rem)] leading-[0.92] tracking-[0.06em] text-foreground uppercase`}
                >
                  {brand.line1}
                  <br />
                  {brand.line2}
                </p>
              ))}
            </div>

            <p className="font-sans text-[10px] tracking-[0.22em] text-muted uppercase">
              Retorna ao longo do dia
            </p>
          </div>
        </div>

        <p className="sr-only">
          Representação visual da programação: anunciantes locais aparecem em
          ciclos ao longo do horário de atendimento, como Studio Norte, Clínica
          Atlas, Casa Leme, Oficina Prisma, Imobiliária Vale e Café Brasa.
        </p>

        <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-6" aria-hidden>
          {hours.map((hour) => (
            <div
              key={hour.label}
              className={`freq-hour ${hour.delay} border px-2 py-3 text-center font-sans text-[10px] tracking-[0.2em] uppercase`}
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
    <div className="mt-16 grid gap-3 sm:grid-cols-2">
      {affinities.map((item, index) => (
        <Reveal key={item.from} delay={index * 80}>
          <article className="flex h-full flex-col border border-line bg-surface/70 px-6 py-8 transition-colors duration-300 hover:border-gold/45">
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
  { month: "Mês 3", campaign: "Campanha 02" },
  { month: "Mês 5", campaign: "Campanha 03" },
  { month: "Mês 7", campaign: "Campanha 04" },
  { month: "Mês 9", campaign: "Campanha 05" },
  { month: "Mês 11", campaign: "Campanha 06" },
];

export function ProductionTimeline() {
  return (
    <Reveal className="mt-16 sm:mt-20">
      <ol className="hidden lg:grid lg:grid-cols-6">
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
            <p className="mt-3 font-display text-xl tracking-[0.06em] text-foreground uppercase">
              {item.campaign}
            </p>
          </li>
        ))}
      </ol>

      <ol className="lg:hidden">
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

const vitrineCards = [
  { category: "Estética", name: "Studio Norte" },
  { category: "Saúde", name: "Clínica Atlas" },
  { category: "Gastronomia", name: "Casa Leme" },
  { category: "Serviços", name: "Oficina Prisma" },
];

export function VitrinePreview() {
  return (
    <Reveal className="mt-16 sm:mt-20">
      <div className="border border-line bg-surface/50 p-4 sm:p-6">
        <div className="mb-5 flex items-center justify-between border-b border-line pb-4">
          <span className="font-sans text-[10px] tracking-[0.28em] text-gold uppercase">
            Vitrine de Negócios
          </span>
          <span className="font-sans text-[10px] tracking-[0.2em] text-muted uppercase">
            Rede local
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {vitrineCards.map((card) => (
            <article
              key={card.name}
              className="border border-line bg-background px-4 py-5 sm:px-5 sm:py-6"
            >
              <p className="font-sans text-[9px] tracking-[0.24em] text-gold uppercase">
                {card.category}
              </p>
              <p className="mt-3 font-display text-xl leading-tight tracking-[0.04em] text-foreground uppercase sm:text-2xl">
                {card.name}
              </p>
            </article>
          ))}
        </div>
      </div>
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
    <Reveal className="mt-16 sm:mt-20">
      <ol className="hidden items-stretch sm:flex">
        {growth.map((step, index) => (
          <li key={step.name} className="flex flex-1 items-stretch">
            <div className="flex flex-1 flex-col items-center justify-center border border-line bg-surface/70 px-4 py-8 text-center">
              <span className="font-display text-3xl tracking-[0.08em] text-foreground uppercase">
                {step.name}
              </span>
              <span className="mt-3 font-sans text-[11px] tracking-[0.22em] text-gold uppercase">
                {step.screens}
              </span>
            </div>
            {index < growth.length - 1 ? (
              <div
                className="flex w-10 items-center justify-center text-gold/70"
                aria-hidden
              >
                →
              </div>
            ) : null}
          </li>
        ))}
      </ol>

      <ol className="flex flex-col sm:hidden">
        {growth.map((step, index) => (
          <li key={step.name} className="flex flex-col items-center">
            <div className="w-full border border-line bg-surface/70 px-6 py-8 text-center">
              <span className="font-display text-3xl tracking-[0.08em] text-foreground uppercase">
                {step.name}
              </span>
              <span className="mt-3 block font-sans text-[11px] tracking-[0.22em] text-gold uppercase">
                {step.screens}
              </span>
            </div>
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
      className={`px-6 py-8 sm:px-10 sm:py-10 lg:px-16 ${className}`}
    >
      <div className="mx-auto w-full max-w-5xl">{children}</div>
    </section>
  );
}
