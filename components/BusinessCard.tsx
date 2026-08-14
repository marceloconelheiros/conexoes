import Link from "next/link";
import type { Business, BusinessPlan } from "@/data/businesses";
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
  const badge = badges[business.plan];
  const profileHref = `/empresa/${business.slug}`;

  return (
    <Link
      href={profileHref}
      className={`group flex h-full flex-col border bg-surface/70 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
        isPremium
          ? "border-gold/55 hover:border-gold"
          : isPro
            ? "border-gold/32 hover:border-gold/55"
            : "border-line hover:border-gold/45"
      }`}
    >
      <div className="relative overflow-hidden">
        {business.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={business.coverImage}
            alt=""
            className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <CoverArt
            name={business.name}
            className="aspect-[16/10] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        )}

        {badge ? (
          <span className="absolute top-4 right-4 border border-gold/50 bg-background/85 px-3 py-1.5 font-sans text-[9px] tracking-[0.22em] text-gold uppercase backdrop-blur-sm">
            {badge}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col px-6 py-7 sm:px-7">
        <LogoMark name={business.name} logo={business.logo} />

        <p className="mt-5 font-sans text-[10px] tracking-[0.24em] text-gold uppercase">
          {business.category}
        </p>
        <h3 className="mt-3 font-display text-[1.7rem] leading-[0.95] tracking-[0.04em] text-foreground uppercase sm:text-[1.9rem]">
          {business.name}
        </h3>
        <p className="mt-4 max-w-md text-sm leading-7 text-muted">
          {business.shortDescription}
        </p>
        <p className="mt-4 font-sans text-[11px] tracking-[0.16em] text-foreground/70 uppercase">
          {business.neighborhood}
        </p>

        <span className="mt-auto flex pt-8">
          <span className="inline-flex h-11 w-full items-center justify-center bg-gold px-5 text-[10px] font-medium tracking-[0.2em] text-background uppercase transition-colors duration-300 group-hover:bg-gold-soft">
            Ver perfil
          </span>
        </span>
      </div>
    </Link>
  );
}
