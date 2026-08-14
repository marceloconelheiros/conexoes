import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CoverMedia } from "@/components/CoverMedia";
import { ContactQr } from "@/components/ContactQr";
import { DEFAULT_CATALOG } from "@/data/catalog";
import { StoreCatalog } from "@/components/StoreCatalog";
import { StoreComments } from "@/components/StoreComments";
import { StoreInsights } from "@/components/StoreInsights";
import { getStoreAnalytics } from "@/data/analytics";
import {
  getBusinessBySlug,
  getBusinesses,
  getInstagramUrl,
  getPrimaryContactLabel,
  getPrimaryContactUrl,
  getWhatsAppUrl,
} from "@/data/businesses";
import { formatCashbackRate, getCashbackRate } from "@/data/ranking";

type EmpresaPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const businesses = await getBusinesses();
  return businesses.map((business) => ({ slug: business.slug }));
}

export async function generateMetadata({
  params,
}: EmpresaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const business = await getBusinessBySlug(slug);

  if (!business) {
    return {
      title: "Loja | Conexão Negócios",
    };
  }

  return {
    title: `${business.name} | Conexão Negócios`,
    description: business.shortDescription,
  };
}

export default async function EmpresaPage({ params }: EmpresaPageProps) {
  const { slug } = await params;
  const business = await getBusinessBySlug(slug);

  if (!business) {
    notFound();
  }

  const gallery = business.gallery?.slice(0, 4) ?? [];
  const analytics = getStoreAnalytics(business.slug, 30);
  const rate = getCashbackRate(business.plan);
  const contactUrl = business.whatsapp
    ? getWhatsAppUrl(business.whatsapp)
    : getPrimaryContactUrl(business);
  const contactLabel = business.whatsapp
    ? "Pedir no WhatsApp"
    : `Abrir ${getPrimaryContactLabel(business)}`;

  return (
    <div className="relative flex min-h-full flex-1 flex-col bg-[#f5f5f5] text-[#1a1a1a]">
      <header className="bg-gradient-to-r from-[#EA1D2C] to-[#FF5A1F] px-4 pt-4 pb-16 sm:px-8">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4">
          <Link
            href="/negocios"
            className="text-[13px] font-semibold text-white"
          >
            ← Vitrine
          </Link>
          <p className="text-[12px] font-medium text-white/90">Marília</p>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 sm:px-8">
        <div className="-mt-10 overflow-hidden rounded-2xl bg-white shadow-[0_14px_32px_rgba(0,0,0,0.16)]">
          <CoverMedia
            src={business.coverImage}
            name={business.name}
            fit={business.coverFit}
            className="aspect-[16/8] w-full sm:aspect-[21/8]"
          />
          <div className="px-5 py-5 sm:px-7 sm:py-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-[#EA1D2C] px-2.5 py-1 text-[11px] font-semibold text-white">
                {formatCashbackRate(rate)} de volta
              </span>
              <span className="text-[12px] font-medium text-[#FF5A1F] uppercase">
                {business.category}
              </span>
            </div>
            <h1 className="mt-3 text-[1.7rem] leading-tight font-bold text-[#1a1a1a] sm:text-[2.1rem]">
              {business.name}
            </h1>
            <p className="mt-2 text-[14px] text-[#6b6b6b]">
              {business.neighborhood} · {business.hours}
            </p>
            <p className="mt-3 max-w-2xl text-[15px] leading-6 text-[#3e3e3e]">
              {business.shortDescription}
            </p>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <a
                href={contactUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-[#EA1D2C] px-6 text-[12px] font-semibold tracking-[0.12em] text-white uppercase transition-colors hover:bg-[#c71826]"
              >
                {contactLabel}
              </a>
              {business.website ? (
                <a
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-[#ffd4c8] bg-white px-6 text-[12px] font-semibold tracking-[0.12em] text-[#EA1D2C] uppercase"
                >
                  Site
                </a>
              ) : null}
              {business.instagram ? (
                <a
                  href={getInstagramUrl(business.instagram)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-[#ffd4c8] bg-white px-6 text-[12px] font-semibold tracking-[0.12em] text-[#EA1D2C] uppercase"
                >
                  Instagram
                </a>
              ) : null}
            </div>
          </div>
        </div>

        <section className="mt-6 rounded-2xl bg-white px-5 py-6 shadow-[0_14px_32px_rgba(0,0,0,0.12)] sm:px-7">
          <h2 className="text-[1.25rem] font-bold text-[#1a1a1a]">Sobre a loja</h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[#6b6b6b]">
            {business.description}
          </p>
          {business.plan === "partner" ? (
            <p className="mt-4 text-[13px] text-[#FF5A1F]">
              Esta loja faz parte da estrutura física da Conexão Negócios.
            </p>
          ) : null}

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.16em] text-[#EA1D2C] uppercase">
                Endereço
              </p>
              <p className="mt-2 text-[14px] leading-6 text-[#1a1a1a]">
                {business.address}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold tracking-[0.16em] text-[#EA1D2C] uppercase">
                Contato
              </p>
              <p className="mt-2 text-[14px] leading-6 text-[#1a1a1a]">
                {business.phone}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold tracking-[0.16em] text-[#EA1D2C] uppercase">
                Horário
              </p>
              <p className="mt-2 text-[14px] leading-6 text-[#1a1a1a]">
                {business.hours}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold tracking-[0.16em] text-[#EA1D2C] uppercase">
                Destaques
              </p>
              <ul className="mt-2 space-y-1.5 text-[14px] text-[#1a1a1a]">
                {business.products.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-6">
          <StoreCatalog
            slug={business.slug}
            storeName={business.name}
            initialItems={DEFAULT_CATALOG[business.slug] ?? []}
          />
        </section>

        <section className="mt-6">
          <StoreInsights
            storeName={business.name}
            points={analytics}
            mode="public"
            tone="light"
          />
        </section>

        <section className="mt-6 rounded-2xl bg-white px-5 py-4 text-center shadow-[0_14px_32px_rgba(0,0,0,0.12)] sm:px-7">
          <h2 className="text-[1.2rem] font-bold text-[#1a1a1a]">Peça agora</h2>
          <p className="mx-auto mt-1 max-w-lg text-[13px] leading-5 text-[#6b6b6b]">
            Escaneie o QR Code ou fale direto com a loja.
          </p>
          <div className="mt-3">
            <ContactQr business={business} />
          </div>
        </section>

        <section className="mt-6">
          <StoreComments business={business} />
        </section>

        {gallery.length > 0 ? (
          <section className="mt-6 mb-4">
            <h2 className="px-1 text-[1.25rem] font-bold text-[#1a1a1a]">
              Galeria
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {gallery.map((item) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={item}
                  src={item}
                  alt=""
                  className="aspect-[4/3] w-full rounded-2xl object-cover shadow-[0_10px_24px_rgba(0,0,0,0.12)]"
                />
              ))}
            </div>
          </section>
        ) : (
          <div className="h-4" />
        )}
      </main>

      <footer className="px-4 py-8 sm:px-8">
        <p className="text-center text-[12px] text-[#8a8a8a]">
          Conexão Negócios · Lojas locais · Marília
        </p>
      </footer>
    </div>
  );
}
