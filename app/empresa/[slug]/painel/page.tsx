import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StoreInsights } from "@/components/StoreInsights";
import { getStoreAnalytics } from "@/data/analytics";
import { getBusinessBySlug, getBusinesses } from "@/data/businesses";

type PainelPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const businesses = await getBusinesses();
  return businesses.map((business) => ({ slug: business.slug }));
}

export async function generateMetadata({
  params,
}: PainelPageProps): Promise<Metadata> {
  const { slug } = await params;
  const business = await getBusinessBySlug(slug);

  return {
    title: business
      ? `Painel · ${business.name} | Conexão Negócios`
      : "Painel da empresa | Conexão Negócios",
  };
}

export default async function EmpresaPainelPage({ params }: PainelPageProps) {
  const { slug } = await params;
  const business = await getBusinessBySlug(slug);

  if (!business) {
    notFound();
  }

  const points = getStoreAnalytics(business.slug, 30);

  return (
    <div className="relative flex min-h-full flex-1 flex-col overflow-x-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(198,166,103,0.08),transparent_55%)]"
      />

      <header className="relative z-10 px-6 py-8 sm:px-10 lg:px-16">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-6">
          <Link
            href="/"
            className="font-sans text-[11px] font-medium tracking-[0.42em] text-gold uppercase transition-colors duration-300 hover:text-gold-soft"
          >
            Conexão Negócios
          </Link>
          <Link
            href={`/empresa/${business.slug}`}
            className="font-sans text-[11px] tracking-[0.22em] text-muted uppercase transition-colors duration-300 hover:text-gold"
          >
            Ver vitrine
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex flex-1 flex-col px-6 pb-10 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-5xl">
          <p className="font-sans text-[11px] tracking-[0.38em] text-gold uppercase">
            Área do anunciante
          </p>
          <h1 className="mt-6 font-display text-[clamp(2rem,5.5vw,3.8rem)] leading-[0.92] font-medium tracking-[0.04em] text-foreground uppercase">
            {business.name}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-muted">
            Acompanhe o que a rede gera para esta loja. Os números são de
            demonstração até a conexão com o painel real.
          </p>

          <div className="mt-12">
            <StoreInsights
              storeName={business.name}
              points={points}
              mode="owner"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
