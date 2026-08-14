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
  const src = getQrCodeImageUrl(url, 160);

  return (
    <div className="flex flex-col items-center text-center">
      <div className="rounded-xl bg-white p-2 shadow-[0_8px_20px_rgba(0,0,0,0.1)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={`QR Code para ${label} da ${business.name}`}
          width={132}
          height={132}
          className="mx-auto h-[132px] w-[132px] bg-white"
        />
      </div>
      <p className="mt-2.5 text-[12px] font-semibold text-[#EA1D2C] uppercase">
        Aproxime a câmera
      </p>
      <p className="mt-0.5 text-[15px] font-bold leading-tight text-[#1a1a1a]">
        QR Code · {label}
      </p>
      <p className="mt-1 max-w-xs text-[13px] leading-5 text-[#6b6b6b]">
        Escaneie para abrir o {label.toLowerCase()} de {business.name}.
      </p>
    </div>
  );
}
