import Link from "next/link";
import { AccountBar } from "@/components/AccountBar";
import { CustomerTable } from "@/components/CustomerTable";
import { OwnerCatalog } from "@/components/OwnerCatalog";
import { StoreInsights } from "@/components/StoreInsights";
import { getStoreAnalytics } from "@/data/analytics";
import {
  PLAN_LABEL,
  type Business,
} from "@/data/businesses";
import {
  CLASS_LABEL,
  formatCashbackRate,
  getCashbackRate,
  getCashierCode,
  getStoreClass,
} from "@/data/ranking";

type StoreDashboardProps = {
  business: Business;
};

export function StoreDashboard({ business }: StoreDashboardProps) {
  const points = getStoreAnalytics(business.slug, 30);
  const cashierCode = getCashierCode(business.slug);
  const rate = getCashbackRate(business.plan);
  const storeClass = getStoreClass(0, business.plan);

  return (
    <div className="space-y-12">
      <AccountBar name={business.name} detail="Anunciante · Perfil da loja" />

      <section>
        <p className="font-sans text-[11px] tracking-[0.38em] text-gold uppercase">
          Área do anunciante
        </p>
        <h1 className="mt-6 font-display text-[clamp(2rem,5.5vw,3.8rem)] leading-[0.92] font-medium tracking-[0.04em] text-foreground uppercase">
          {business.name}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-8 text-muted">
          Dados da loja, clientes desta vitrine e a vitrine da semana. A venda
          continua no seu caixa.
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-3">
        <InfoCard label="Plano" value={PLAN_LABEL[business.plan]} />
        <InfoCard label="Classificação" value={CLASS_LABEL[storeClass]} />
        <InfoCard label="Cashback" value={formatCashbackRate(rate)} />
      </div>

      <div className="border border-line bg-surface/70 px-5 py-7 sm:px-8">
        <p className="font-sans text-[10px] tracking-[0.28em] text-gold uppercase">
          Informações da loja
        </p>
        <h2 className="mt-3 font-display text-[1.7rem] leading-tight tracking-[0.04em] text-foreground uppercase">
          Cadastro
        </h2>
        <dl className="mt-8 grid gap-6 sm:grid-cols-2">
          <Field label="Categoria" value={business.category} />
          <Field label="Bairro" value={business.neighborhood} />
          <Field label="Endereço" value={business.address} />
          <Field label="Horário" value={business.hours} />
          <Field label="Telefone" value={business.phone} />
          <Field
            label="WhatsApp"
            value={business.whatsapp ?? "Não informado"}
          />
        </dl>
        <Link
          href={`/empresa/${business.slug}`}
          className="mt-8 inline-flex h-11 items-center text-[10px] tracking-[0.2em] text-gold uppercase hover:text-gold-soft"
        >
          Ver vitrine pública
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
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
        <div className="border border-line bg-surface/70 px-5 py-6 sm:col-span-2">
          <p className="font-sans text-[10px] tracking-[0.22em] text-gold uppercase">
            Sobre
          </p>
          <p className="mt-4 text-sm leading-7 text-muted">
            {business.shortDescription}
          </p>
        </div>
      </div>

      <CustomerTable
        mode="store"
        storeSlug={business.slug}
        storeName={business.name}
      />

      <OwnerCatalog slug={business.slug} />

      <StoreInsights
        storeName={business.name}
        points={points}
        mode="owner"
      />
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-line bg-surface/70 px-5 py-6">
      <p className="font-sans text-[10px] tracking-[0.22em] text-gold uppercase">
        {label}
      </p>
      <p className="mt-4 font-display text-3xl text-foreground">{value}</p>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-sans text-[10px] tracking-[0.2em] text-muted uppercase">
        {label}
      </dt>
      <dd className="mt-2 text-sm leading-7 text-foreground">{value}</dd>
    </div>
  );
}
