import type { ReactNode } from "react";

export type PlaceName =
  | "academia"
  | "clinica"
  | "restaurante"
  | "loja"
  | "salao"
  | "escritorio"
  | "mercado"
  | "imobiliaria"
  | "farmacia"
  | "cafe";

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden
    >
      {children}
    </svg>
  );
}

const glyphs: Record<PlaceName, ReactNode> = {
  academia: <path d="M6 8v8M8 9.5v5M16 9.5v5M18 8v8M8 12h8" />,
  clinica: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8.5v7M8.5 12h7" />
    </>
  ),
  restaurante: (
    <>
      <path d="M8 4h8l-1.4 6.4a4.6 4.6 0 0 1-5.2 0L8 4z" />
      <path d="M12 14.8V20M9.5 20h5" />
    </>
  ),
  loja: (
    <>
      <path d="M6 8h12l-1 12H7L6 8z" />
      <path d="M9 8V6.8a3 3 0 0 1 6 0V8" />
    </>
  ),
  salao: (
    <>
      <circle cx="6.2" cy="6.2" r="2.2" />
      <circle cx="6.2" cy="17.8" r="2.2" />
      <path d="M8.2 7.6 20 18.2M8.2 16.4 20 5.8" />
    </>
  ),
  escritorio: (
    <>
      <path d="M5 20V7l7-3 7 3v13H5z" />
      <path d="M10 20v-5h4v5M9 10h1.2M13.8 10H15M9 13.5h1.2M13.8 13.5H15" />
    </>
  ),
  mercado: (
    <>
      <path d="M4 6h2.2L8 16h9.2L19.4 9H8.1" />
      <circle cx="9.2" cy="19" r="1.1" />
      <circle cx="16.2" cy="19" r="1.1" />
    </>
  ),
  imobiliaria: (
    <>
      <path d="M4 11 12 4l8 7v9H4v-9z" />
      <path d="M10 20v-6h4v6" />
    </>
  ),
  farmacia: (
    <>
      <rect x="5" y="5" width="14" height="14" rx="2" />
      <path d="M12 8.5v7M8.5 12h7" />
    </>
  ),
  cafe: (
    <>
      <path d="M6 9h10v5.2A3.8 3.8 0 0 1 12.2 18H9.8A3.8 3.8 0 0 1 6 14.2V9z" />
      <path d="M16 10h1.6a2 2 0 0 1 0 4H16M9 4.5c.4.8.4 1.6 0 2.4M12 4.5c.4.8.4 1.6 0 2.4" />
    </>
  ),
};

export function PlaceIcon({ name }: { name: PlaceName }) {
  return <Icon>{glyphs[name]}</Icon>;
}
