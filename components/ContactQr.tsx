import {
  getPrimaryContactLabel,
  getPrimaryContactUrl,
  getQrCodeImageUrl,
  type Business,
} from "@/data/businesses";

type ContactQrProps = {
  business: Business;
};

export function ContactQr({ business }: ContactQrProps) {
  const url = getPrimaryContactUrl(business);
  const label = getPrimaryContactLabel(business);
  const src = getQrCodeImageUrl(url);

  return (
    <div className="flex flex-col items-start gap-6 border border-line bg-surface/70 px-6 py-8 sm:flex-row sm:items-center sm:gap-10 sm:px-8">
      <div className="border border-gold/35 bg-background p-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={`QR Code para ${label} da ${business.name}`}
          width={168}
          height={168}
          className="h-[168px] w-[168px] bg-background"
        />
      </div>
      <div className="max-w-sm">
        <p className="font-sans text-[10px] tracking-[0.28em] text-gold uppercase">
          Aproxime a câmera
        </p>
        <p className="mt-4 font-display text-2xl leading-tight tracking-[0.04em] text-foreground uppercase">
          QR Code · {label}
        </p>
        <p className="mt-4 text-sm leading-7 text-muted">
          Escaneie para abrir o {label.toLowerCase()} de {business.name} no
          celular.
        </p>
      </div>
    </div>
  );
}
