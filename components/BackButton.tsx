"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

export function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  const onClick = useCallback(() => {
    if (window.scrollY >= 24) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (pathname === "/") {
      return;
    }

    const fromSameSite = document.referrer.startsWith(window.location.origin);

    if (fromSameSite) {
      router.back();
      return;
    }

    router.push("/");
  }, [pathname, router]);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Voltar"
      className="fixed bottom-6 left-6 z-50 inline-flex h-11 items-center bg-background/90 px-5 text-[11px] font-medium tracking-[0.22em] text-gold uppercase shadow-[0_0_0_1px_rgba(198,166,103,0.45)] backdrop-blur-sm transition-colors duration-300 hover:bg-gold/10 sm:bottom-8 sm:left-10"
    >
      Voltar
    </button>
  );
}
