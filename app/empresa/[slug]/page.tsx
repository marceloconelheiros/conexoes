import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LogoMark } from "@/components/CoverArt";
import { CoverMedia } from "@/components/CoverMedia";
import { ContactQr } from "@/components/ContactQr";
import {
  getBusinessBySlug,
  getBusinesses,
  getInstagramUrl,
  getPrimaryContactLabel,
  getPrimaryContactUrl,
  getWhatsAppUrl,
  PLAN_LABEL,
} from "@/data/businesses";
import { Reveal } from "../../pontos/reveal";

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
      title: "Empresa | Conexão Negócios",
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

  const planLabel = PLAN_LABEL[business.plan];
  const gallery = business.gallery?.slice(0, 4) ?? [];
  const isPartner = business.plan === "partner";

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
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-6">
          <Link
            href="/"
            className="font-sans text-[11px] font-medium tracking-[0.42em] text-gold uppercase transition-colors duration-300 hover:text-gold-soft"
          >
            Conexão Negócios
          </Link>
          <Link
            href="/negocios"
            className="font-sans text-[11px] tracking-[0.22em] text-muted uppercase transition-colors duration-300 hover:text-gold"
          >
            Vitrine
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex flex-1 flex-col">
        <section className="px-6 pb-20 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-5xl">
            <div className="relative overflow-hidden border border-line">
              <CoverMedia
                src={business.coverImage}
                name={business.name}
                fit={business.coverFit}
                className="aspect-[16/8] w-full sm:aspect-[21/8]"
              />

              {business.logo ? (
                <div className="absolute bottom-0 left-6 translate-y-1/2 sm:left-8">
                  <LogoMark
                    name={business.name}
                    logo={business.logo}
                    className="h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]"
                  />
                </div>
              ) : null}
            </div>

            <div className={business.logo ? "mt-14 sm:mt-16" : "mt-10 sm:mt-12"}>
              <p className="font-sans text-[11px] tracking-[0.38em] text-gold uppercase">
                Faz parte da Conexão Negócios
              </p>
              <p className="mt-3 font-sans text-[10px] tracking-[0.28em] text-gold-soft uppercase">
                {planLabel}
              </p>

              <h1 className="mt-6 font-display text-[clamp(2.2rem,6vw,4.4rem)] leading-[0.92] font-medium tracking-[0.04em] text-foreground uppercase">
                {business.name}
              </h1>

              <p className="mt-4 font-sans text-[11px] tracking-[0.22em] text-muted uppercase">
                {business.category}
                <span className="mx-3 text-gold/40">·</span>
                {business.neighborhood}
              </p>

              <p className="mt-8 max-w-2xl font-display text-2xl leading-snug text-gold-soft sm:text-3xl">
                {business.shortDescription}
              </p>

              <p className="mt-8 max-w-2xl text-base leading-8 text-muted sm:text-lg">
                {business.description}
              </p>

              {isPartner ? (
                <p className="mt-8 max-w-xl text-sm leading-7 text-foreground/80">
                  Esta empresa faz parte da estrutura física da Conexão
                  Negócios.
                </p>
              ) : null}

              <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {business.whatsapp ? (
                  <a
                    href={getWhatsAppUrl(business.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center bg-gold px-7 text-[11px] font-medium tracking-[0.22em] text-background uppercase transition-colors duration-300 hover:bg-gold-soft"
                  >
                    Falar no WhatsApp
                  </a>
                ) : (
                  <a
                    href={getPrimaryContactUrl(business)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center bg-gold px-7 text-[11px] font-medium tracking-[0.22em] text-background uppercase transition-colors duration-300 hover:bg-gold-soft"
                  >
                    Abrir {getPrimaryContactLabel(business)}
                  </a>
                )}
                {business.website ? (
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center border border-gold/50 px-7 text-[11px] font-medium tracking-[0.22em] text-gold uppercase transition-colors duration-300 hover:border-gold hover:bg-gold/10"
                  >
                    Visitar site
                  </a>
                ) : null}
                {business.instagram ? (
                  <a
                    href={getInstagramUrl(business.instagram)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center border border-gold/50 px-7 text-[11px] font-medium tracking-[0.22em] text-gold uppercase transition-colors duration-300 hover:border-gold hover:bg-gold/10"
                  >
                    Ver Instagram
                  </a>
                ) : null}
                {business.googleUrl ? (
                  <a
                    href={business.googleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center px-4 text-[11px] font-medium tracking-[0.22em] text-foreground/80 uppercase transition-colors duration-300 hover:text-gold"
                  >
                    Google Meu Negócio
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-line px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
          <div className="mx-auto grid w-full max-w-5xl gap-12 sm:grid-cols-2 sm:gap-16">
            <Reveal>
              <div>
                <p className="font-sans text-[10px] tracking-[0.28em] text-gold uppercase">
                  Endereço
                </p>
                <p className="mt-4 text-base leading-8 text-foreground/90">
                  {business.address}
                </p>
                <p className="mt-2 text-sm leading-7 text-muted">
                  {business.neighborhood}
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div>
                <p className="font-sans text-[10px] tracking-[0.28em] text-gold uppercase">
                  Contato
                </p>
                <p className="mt-4 text-base leading-8 text-foreground/90">
                  {business.phone}
                </p>
                {business.instagram ? (
                  <p className="mt-2 text-sm leading-7 text-muted">
                    Instagram · @{business.instagram.replace(/^@/, "")}
                  </p>
                ) : business.website ? (
                  <p className="mt-2 text-sm leading-7 text-muted">
                    Site · {business.website.replace(/^https?:\/\//, "")}
                  </p>
                ) : null}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div>
                <p className="font-sans text-[10px] tracking-[0.28em] text-gold uppercase">
                  Horário de funcionamento
                </p>
                <p className="mt-4 text-base leading-8 text-foreground/90">
                  {business.hours}
                </p>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div>
                <p className="font-sans text-[10px] tracking-[0.28em] text-gold uppercase">
                  Produtos ou serviços
                </p>
                <ul className="mt-4 space-y-3">
                  {business.products.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-base leading-7 text-foreground/90"
                    >
                      <span
                        className="mt-3.5 h-px w-4 shrink-0 bg-gold/60"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-line px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
          <div className="mx-auto w-full max-w-5xl">
            <Reveal>
              <p className="font-sans text-[11px] tracking-[0.38em] text-gold uppercase">
                Conecte agora
              </p>
              <h2 className="mt-6 max-w-xl font-display text-[clamp(1.7rem,3.8vw,2.6rem)] leading-tight font-medium text-foreground">
                Serviços, produtos e contato direto.
              </h2>
            </Reveal>

            <Reveal delay={80} className="mt-12">
              <ContactQr business={business} />
            </Reveal>
          </div>
        </section>

        {gallery.length > 0 ? (
        <section className="border-t border-line px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
          <div className="mx-auto w-full max-w-5xl">
            <Reveal>
              <p className="font-sans text-[11px] tracking-[0.38em] text-gold uppercase">
                Galeria
              </p>
            </Reveal>

            <div className="mt-10 grid grid-cols-2 gap-3">
              {gallery.map((item, index) => (
                <Reveal key={item} delay={index * 70}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item}
                    alt=""
                    className="aspect-[4/3] w-full object-cover"
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        ) : null}
      </main>

      <footer className="relative z-10 border-t border-line px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[11px] tracking-[0.28em] text-gold uppercase">
            Conexão Negócios
          </p>
          <p className="mt-6 text-base leading-8 text-muted">
            Empresas locais.
            <br />
            Consumidores locais.
            <br />
            Novas conexões.
          </p>
        </div>
      </footer>
    </div>
  );
}
