"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type NavItem = {
  href: string;
  label: string;
  match: (path: string) => boolean;
  icon: (active: boolean) => ReactNode;
  center?: boolean;
};

const items: NavItem[] = [
  {
    href: "/",
    label: "Início",
    match: (path) => path === "/",
    icon: (active) => (
      <HomeIcon active={active} />
    ),
  },
  {
    href: "/negocios",
    label: "Rede",
    match: (path) =>
      path.startsWith("/negocios") ||
      path.startsWith("/empresa") ||
      path.startsWith("/carrinho"),
    icon: (active) => <GridIcon active={active} />,
  },
  {
    href: "/recompensas",
    label: "Pontos",
    match: (path) => path.startsWith("/recompensas"),
    center: true,
    icon: (active) => <PointsIcon active={active} />,
  },
  {
    href: "/pontos",
    label: "Telas",
    match: (path) => path.startsWith("/pontos"),
    icon: (active) => <ScreensIcon active={active} />,
  },
  {
    href: "/anuncie",
    label: "Anunciar",
    match: (path) => path.startsWith("/anuncie"),
    icon: (active) => <AnnounceIcon active={active} />,
  },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/20 bg-[#0b0b0c]/96 shadow-[0_-16px_40px_rgba(0,0,0,0.55)] backdrop-blur-xl"
    >
      <div className="mx-auto flex h-[4.35rem] max-w-lg items-center justify-between px-1 sm:px-2">
        {items.map((item) => {
          const active = item.match(pathname);
          const labelClass = active ? "text-gold" : "text-muted";
          const iconClass = active ? "text-gold" : "text-foreground/55";

          if (item.center) {
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className="flex h-full min-w-0 flex-1 flex-col items-center justify-center gap-1"
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center border transition-colors duration-300 ${
                    active
                      ? "border-gold bg-gold text-background"
                      : "border-gold/70 bg-gold/10 text-gold hover:bg-gold/20"
                  }`}
                >
                  <span className={active ? "text-background" : "text-gold"}>
                    {item.icon(active)}
                  </span>
                </span>
                <span
                  className={`font-sans text-[9px] tracking-[0.18em] uppercase ${labelClass}`}
                >
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex h-full min-w-0 flex-1 flex-col items-center justify-center gap-1 transition-colors duration-300 ${iconClass} hover:text-gold`}
            >
              {item.icon(active)}
              <span
                className={`font-sans text-[9px] tracking-[0.18em] uppercase ${labelClass}`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
      <div
        aria-hidden
        className="h-[calc(0.85rem+env(safe-area-inset-bottom))] bg-[#0b0b0c]"
      />
    </nav>
  );
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4.5 11.2 12 4.8l7.5 6.4V19a1.2 1.2 0 0 1-1.2 1.2H5.7A1.2 1.2 0 0 1 4.5 19v-7.8Z"
        stroke="currentColor"
        strokeWidth={active ? 1.7 : 1.4}
        strokeLinejoin="round"
      />
      <path
        d="M9.5 20.2v-6.2h5v6.2"
        stroke="currentColor"
        strokeWidth={active ? 1.7 : 1.4}
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GridIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="4" width="6.5" height="6.5" stroke="currentColor" strokeWidth={active ? 1.7 : 1.4} />
      <rect x="13.5" y="4" width="6.5" height="6.5" stroke="currentColor" strokeWidth={active ? 1.7 : 1.4} />
      <rect x="4" y="13.5" width="6.5" height="6.5" stroke="currentColor" strokeWidth={active ? 1.7 : 1.4} />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" stroke="currentColor" strokeWidth={active ? 1.7 : 1.4} />
    </svg>
  );
}

function PointsIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3.8 14.7 9l5.8.6-4.4 3.9 1.3 5.7L12 16.8 6.6 19.2l1.3-5.7L3.5 9.6 9.3 9 12 3.8Z"
        stroke="currentColor"
        strokeWidth={active ? 1.7 : 1.45}
        strokeLinejoin="round"
        fill={active ? "currentColor" : "none"}
      />
    </svg>
  );
}

function ScreensIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3.5"
        y="5"
        width="17"
        height="11.5"
        stroke="currentColor"
        strokeWidth={active ? 1.7 : 1.4}
      />
      <path
        d="M8 20h8M12 16.5V20"
        stroke="currentColor"
        strokeWidth={active ? 1.7 : 1.4}
        strokeLinecap="round"
      />
    </svg>
  );
}

function AnnounceIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4.5 10.5v3l4 1.2 7.2 3.3V6L8.5 9.3 4.5 10.5Z"
        stroke="currentColor"
        strokeWidth={active ? 1.7 : 1.4}
        strokeLinejoin="round"
      />
      <path
        d="M8.5 14.6v3.2l2.4-.6"
        stroke="currentColor"
        strokeWidth={active ? 1.7 : 1.4}
        strokeLinejoin="round"
      />
    </svg>
  );
}
