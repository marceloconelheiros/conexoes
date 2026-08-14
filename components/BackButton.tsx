"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

function isVitrinePage(path: string) {
  if (path === "/negocios" || path === "/carrinho") return true;
  if (path.startsWith("/empresa/") && !path.includes("/painel")) return true;
  return false;
}

function backHref(path: string) {
  if (path === "/negocios") return "/";
  return "/negocios";
}

export function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  const onClick = useCallback(() => {
    router.push(backHref(pathname));
  }, [pathname, router]);

  if (!isVitrinePage(pathname)) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Voltar"
      className="fixed bottom-[calc(5.6rem+env(safe-area-inset-bottom))] left-4 z-40 inline-flex h-12 items-center rounded-xl bg-white px-5 text-[15px] font-bold text-[#EA1D2C] shadow-[0_10px_24px_rgba(0,0,0,0.18)] transition-colors hover:bg-[#fff1ee] sm:left-8"
    >
      ← Voltar
    </button>
  );
}
