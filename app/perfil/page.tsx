import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/LoginForm";
import { StoreDashboard } from "@/components/StoreDashboard";
import { getBusinessBySlug, getBusinesses } from "@/data/businesses";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Perfil",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type PerfilPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function PerfilPage({ searchParams }: PerfilPageProps) {
  const session = await getSession();
  const businesses = await getBusinesses();
  const { next } = await searchParams;

  if (session?.role === "admin") {
    redirect("/admin");
  }

  const store =
    session?.role === "store"
      ? await getBusinessBySlug(session.slug)
      : undefined;

  return (
    <div className="relative flex min-h-full flex-1 flex-col overflow-x-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(198,166,103,0.08),transparent_55%)]"
      />

      <header className="relative z-10 px-6 pt-10 pb-8 sm:px-10 lg:px-16">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6">
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

      <main className="relative z-10 flex flex-1 flex-col px-6 pb-10 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-6xl">
          {store ? (
            <StoreDashboard business={store} />
          ) : (
            <>
              <p className="font-sans text-[11px] tracking-[0.38em] text-gold uppercase">
                Perfil
              </p>
              <h1 className="mt-6 font-display text-[clamp(2rem,5.5vw,3.8rem)] leading-[0.92] font-medium tracking-[0.04em] text-foreground uppercase">
                Sua loja
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-muted">
                Anunciante entra aqui para ver os dados da loja, os clientes e a
                vitrine. Admin tem aba própria, só com o login da operação.
              </p>
              <div className="mt-12">
                <LoginForm
                  initialMode={next === "/admin" ? "admin" : "store"}
                  stores={businesses.map((item) => ({
                    slug: item.slug,
                    name: item.name,
                  }))}
                />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
