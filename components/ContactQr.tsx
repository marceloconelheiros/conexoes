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
    <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
      <div className="rounded-2xl bg-[#f5f5f5] p-3 shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={`QR Code para ${label} da ${business.name}`}
          width={168}
          height={168}
          className="h-[168px] w-[168px] rounded-xl bg-white"
        />
      </div>
      <div className="max-w-sm">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-[#EA1D2C] uppercase">
          Aproxime a câmera
        </p>
        <p className="mt-2 text-[1.2rem] font-bold text-[#1a1a1a]">
          QR Code · {label}
        </p>
        <p className="mt-2 text-[14px] leading-6 text-[#6b6b6b]">
          Escaneie para abrir o {label.toLowerCase()} de {business.name} no
          celular.
        </p>
      </div>
    </div>
  );
}
