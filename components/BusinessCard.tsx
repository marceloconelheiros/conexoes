import Link from "next/link";
import { getWhatsAppUrl, type Business, type BusinessPlan } from "@/data/businesses";
import { CoverArt, LogoMark } from "./CoverArt";

const badges: Partial<Record<BusinessPlan, string>> = {
  pro: "Destaque",
  premium: "Premium",
  partner: "Ponto Parceiro",
};

type BusinessCardProps = {
  business: Business;
};

export function BusinessCard({ business }: BusinessCardProps) {
  const isPremium = business.plan === "premium";
  const isPro = business.plan === "pro";
  const isPartner = business.plan === "partner";
  const badge = badges[business.plan];
  const profileHref = `/empresa/${business.slug}`;

  return (
    <article
      className={`group flex h-full flex-col border bg-surface/70 transition-colors duration-300 ${
        isPremium
          ? "border-gold/55 hover:border-gold sm:col-span-2 sm:flex-row"
          : isPro
            ? "border-gold/32 hover:border-gold/55"
            : "border-line hover:border-gold/45"
      }`}
    >
      <div className={`relative overflow-hidden ${isPremium ? "sm:w-[44%] sm:shrink-0" : ""}`}>
        {business.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={business.coverImage}
            alt=""
            className={
              isPremium
                ? "aspect-[16/10] h-full w-full object-cover sm:aspect-auto sm:min-h-[280px]"
                : "aspect-[16/10] w-full object-cover"
            }
          />
        ) : (
          <CoverArt
            name={business.name}
            className={
              isPremium
                ? "aspect-[16/10] sm:aspect-auto sm:h-full sm:min-h-[280px]"
                : "aspect-[16/10]"
            }
          />
        )}

        {badge ? (
          <span className="absolute top-4 right-4 border border-gold/50 bg-background/85 px-3 py-1.5 font-sans text-[9px] tracking-[0.22em] text-gold uppercase backdrop-blur-sm">
            {badge}
          </span>
        ) : null}
      </div>

      <div
        className={`flex flex-1 flex-col px-6 py-7 sm:px-7 ${
          isPremium ? "sm:justify-center sm:py-10" : ""
        }`}
      >
        <LogoMark name={business.name} logo={business.logo} />

        <p className="mt-5 font-sans text-[10px] tracking-[0.24em] text-gold uppercase">
          {business.category}
        </p>
        <h3 className="mt-3 font-display text-[1.85rem] leading-[0.95] tracking-[0.04em] text-foreground uppercase sm:text-[2.05rem]">
          {business.name}
        </h3>
        <p className="mt-4 max-w-md text-sm leading-7 text-muted">
          {business.shortDescription}
        </p>
        <p className="mt-4 font-sans text-[11px] tracking-[0.16em] text-foreground/70 uppercase">
          {business.neighborhood}
        </p>

        {isPartner ? (
          <p className="mt-4 max-w-sm text-xs leading-6 text-muted">
            Esta empresa faz parte da estrutura física da Conexão Negócios.
          </p>
        ) : null}

        {isPremium && business.extraCall ? (
          <Link
            href={profileHref}
            className="mt-5 font-sans text-[10px] tracking-[0.22em] text-gold uppercase transition-colors duration-300 hover:text-gold-soft"
          >
            {business.extraCall}
          </Link>
        ) : null}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={getWhatsAppUrl(business.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center border border-gold/50 px-5 text-[10px] font-medium tracking-[0.2em] text-gold uppercase transition-colors duration-300 hover:border-gold hover:bg-gold/10"
          >
            WhatsApp
          </a>
          <Link
            href={profileHref}
            className="inline-flex h-11 items-center justify-center bg-gold px-5 text-[10px] font-medium tracking-[0.2em] text-background uppercase transition-colors duration-300 hover:bg-gold-soft"
          >
            Ver perfil
          </Link>
        </div>
      </div>
    </article>
  );
}
