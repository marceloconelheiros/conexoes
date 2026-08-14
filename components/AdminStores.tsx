import Link from "next/link";
import type { ReactNode } from "react";
import { PLAN_LABEL, type Business } from "@/data/businesses";

export function AdminStores({ businesses }: { businesses: Business[] }) {
  return (
    <div className="border border-line bg-surface/70 px-5 py-7 sm:px-8">
      <p className="font-sans text-[10px] tracking-[0.28em] text-gold uppercase">
        Rede
      </p>
      <h2 className="mt-3 font-display text-[1.7rem] leading-tight tracking-[0.04em] text-foreground uppercase sm:text-[2rem]">
        Lojas cadastradas
      </h2>
      <p className="mt-3 max-w-xl text-sm leading-7 text-muted">
        Todas as lojas da vitrine. O anunciante vê só a dele no Perfil.
      </p>

      <div className="mt-8 overflow-x-auto">
        <table className="min-w-[48rem] w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-line">
              <Th>Loja</Th>
              <Th>Categoria</Th>
              <Th>Bairro</Th>
              <Th>Plano</Th>
              <Th>WhatsApp</Th>
              <Th>Endereço</Th>
            </tr>
          </thead>
          <tbody>
            {businesses.map((business) => (
              <tr key={business.id} className="border-b border-line/70 align-top">
                <Td>
                  <Link
                    href={`/empresa/${business.slug}`}
                    className="text-foreground hover:text-gold"
                  >
                    {business.name}
                  </Link>
                </Td>
                <Td>{business.category}</Td>
                <Td>{business.neighborhood}</Td>
                <Td>{PLAN_LABEL[business.plan]}</Td>
                <Td>{business.whatsapp ?? business.phone}</Td>
                <Td>{business.address}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({ children }: { children: string }) {
  return (
    <th className="whitespace-nowrap px-3 py-3 font-sans text-[9px] font-medium tracking-[0.18em] text-gold uppercase">
      {children}
    </th>
  );
}

function Td({ children }: { children: ReactNode }) {
  return (
    <td className="whitespace-nowrap px-3 py-4 text-sm text-muted">{children}</td>
  );
}
