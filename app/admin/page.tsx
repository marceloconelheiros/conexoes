import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AccountBar } from "@/components/AccountBar";
import { AdminStores } from "@/components/AdminStores";
import { CustomerTable } from "@/components/CustomerTable";
import { getBusinesses } from "@/data/businesses";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getSession();
  if (session?.role !== "admin") {
    redirect("/perfil");
  }

  const businesses = await getBusinesses();

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
        <div className="mx-auto w-full max-w-6xl space-y-12">
          <AccountBar
            name={session.name}
            detail={`${session.email} · acesso da operação`}
          />

          <div>
            <p className="font-sans text-[11px] tracking-[0.38em] text-gold uppercase">
              Painel geral
            </p>
            <h1 className="mt-6 font-display text-[clamp(2rem,5.5vw,3.8rem)] leading-[0.92] font-medium tracking-[0.04em] text-foreground uppercase">
              Admin
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-muted">
              Só você e o sócio entram aqui. Lojas, clientes, bairro e cidade
              da rede inteira.
            </p>
          </div>

          <AdminStores businesses={businesses} />

          <CustomerTable mode="admin" />
        </div>
      </main>
    </div>
  );
}
