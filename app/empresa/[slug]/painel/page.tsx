import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OwnerCatalog } from "@/components/OwnerCatalog";
import { StoreInsights } from "@/components/StoreInsights";
import { getStoreAnalytics } from "@/data/analytics";
import { getBusinessBySlug, getBusinesses } from "@/data/businesses";
import {
  CLASS_LABEL,
  formatCashbackRate,
  getCashbackRate,
  getCashierCode,
  getStoreClass,
} from "@/data/ranking";

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
  const cashierCode = getCashierCode(business.slug);
  const rate = getCashbackRate(business.plan);
  const storeClass = getStoreClass(0, business.plan);

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
            A venda continua no seu caixa. O app só confirma a compra com o
            código do dia e gera o cashback da loja.
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            <div className="border border-gold/35 bg-surface/70 px-5 py-6">
              <p className="font-sans text-[10px] tracking-[0.22em] text-gold uppercase">
                Código do caixa hoje
              </p>
              <p className="mt-4 font-display text-3xl tracking-[0.12em] text-foreground">
                {cashierCode}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted">
                Passe este código depois do pagamento.
              </p>
            </div>
            <div className="border border-line bg-surface/70 px-5 py-6">
              <p className="font-sans text-[10px] tracking-[0.22em] text-gold uppercase">
                Cashback da loja
              </p>
              <p className="mt-4 font-display text-3xl text-foreground">
                {formatCashbackRate(rate)}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted">
                Percentual que a loja devolve em crédito.
              </p>
            </div>
            <div className="border border-line bg-surface/70 px-5 py-6">
              <p className="font-sans text-[10px] tracking-[0.22em] text-gold uppercase">
                Classificação
              </p>
              <p className="mt-4 font-display text-3xl text-foreground">
                {CLASS_LABEL[storeClass]}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted">
                Sobe com anúncio, movimento e cashback.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <OwnerCatalog slug={business.slug} />
          </div>

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
