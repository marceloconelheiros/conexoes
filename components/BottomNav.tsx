"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AUTH_EVENT } from "@/lib/auth-client";

type NavItem = {
  href: string;
  label: string;
  match: (path: string) => boolean;
  icon: (active: boolean) => ReactNode;
  center?: boolean;
};

type PublicSession = {
  role: "admin" | "store" | "user";
  name: string;
} | null;

const mainItems: NavItem[] = [
  {
    href: "/",
    label: "Início",
    match: (path) => path === "/",
    icon: (active) => <HomeIcon active={active} />,
  },
  {
    href: "/negocios",
    label: "Vitrine",
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
    href: "/anuncie",
    label: "Anunciar",
    match: (path) => path.startsWith("/anuncie"),
    icon: (active) => <AnnounceIcon active={active} />,
  },
];

const telasItem: NavItem = {
  href: "/pontos",
  label: "Telas",
  match: (path) => path.startsWith("/pontos"),
  icon: (active) => <ScreensIcon active={active} />,
};

const perfilItem: NavItem = {
  href: "/perfil",
  label: "Perfil",
  match: (path) => path.startsWith("/perfil"),
  icon: (active) => <ProfileIcon active={active} />,
};

const adminItem: NavItem = {
  href: "/admin",
  label: "Admin",
  match: (path) => path.startsWith("/admin"),
  icon: (active) => <AdminIcon active={active} />,
};

export function BottomNav() {
  const pathname = usePathname();
  const [session, setSession] = useState<PublicSession>(null);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function load() {
      const response = await fetch("/api/auth/session");
      const data = (await response.json()) as { session: PublicSession };
      setSession(data.session);
    }

    void load();
    window.addEventListener(AUTH_EVENT, load);
    return () => window.removeEventListener(AUTH_EVENT, load);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const menuItems = [
    telasItem,
    perfilItem,
    ...(session?.role === "admin" ? [adminItem] : []),
  ];
  const menuActive = menuItems.some((item) => item.match(pathname));

  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/20 bg-[#0b0b0c]/96 shadow-[0_-16px_40px_rgba(0,0,0,0.55)] backdrop-blur-xl"
    >
      <div className="mx-auto flex h-[4.35rem] max-w-lg items-center justify-between px-1 sm:px-2">
        {mainItems.map((item) => (
          <NavLink key={item.href} item={item} pathname={pathname} />
        ))}

        <div ref={menuRef} className="relative flex h-full min-w-0 flex-1">
          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={open}
            aria-haspopup="menu"
            aria-controls="bottom-more-menu"
            onClick={() => setOpen((value) => !value)}
            className={`flex h-full w-full min-w-0 flex-col items-center justify-center gap-1 transition-colors duration-300 ${
              menuActive || open
                ? "text-gold"
                : "text-foreground/55 hover:text-gold"
            }`}
          >
            <MenuIcon active={menuActive || open} />
            <span
              className={`font-sans text-[9px] tracking-[0.18em] uppercase ${
                menuActive || open ? "text-gold" : "text-muted"
              }`}
            >
              Menu
            </span>
          </button>

          {open ? (
            <div
              id="bottom-more-menu"
              role="menu"
              className="absolute right-1 bottom-[calc(100%+0.55rem)] w-52 border border-gold/25 bg-[#0b0b0c] py-2 shadow-[0_-18px_40px_rgba(0,0,0,0.55)]"
            >
              {menuItems.map((item) => {
                const active = item.match(pathname);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 transition-colors duration-300 ${
                      active
                        ? "bg-gold/10 text-gold"
                        : "text-foreground/80 hover:bg-gold/10 hover:text-gold"
                    }`}
                  >
                    {item.icon(active)}
                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
      <div
        aria-hidden
        className="h-[calc(0.85rem+env(safe-area-inset-bottom))] bg-[#0b0b0c]"
      />
    </nav>
  );
}

function NavLink({ item, pathname }: { item: NavItem; pathname: string }) {
  const active = item.match(pathname);
  const labelClass = active ? "text-gold" : "text-muted";
  const iconClass = active ? "text-gold" : "text-foreground/55";

  if (item.center) {
    return (
      <Link
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

function AnnounceIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4.8 10.2h3.1L14 6.4v11.2l-6.1-3.8H4.8v-3.6Z"
        stroke="currentColor"
        strokeWidth={active ? 1.7 : 1.4}
        strokeLinejoin="round"
      />
      <path
        d="M16.6 9.1a3.4 3.4 0 0 1 0 5.8M18.4 7.2a6 6 0 0 1 0 9.6"
        stroke="currentColor"
        strokeWidth={active ? 1.7 : 1.4}
        strokeLinecap="round"
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

function ProfileIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle
        cx="12"
        cy="8.2"
        r="3.2"
        stroke="currentColor"
        strokeWidth={active ? 1.7 : 1.4}
      />
      <path
        d="M5.5 19.2c.8-3.2 3.2-5 6.5-5s5.7 1.8 6.5 5"
        stroke="currentColor"
        strokeWidth={active ? 1.7 : 1.4}
        strokeLinecap="round"
      />
    </svg>
  );
}

function AdminIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3.8 19.2 6.6v5.2c0 4.4-3 7.4-7.2 8.6-4.2-1.2-7.2-4.2-7.2-8.6V6.6L12 3.8Z"
        stroke="currentColor"
        strokeWidth={active ? 1.7 : 1.4}
        strokeLinejoin="round"
      />
      <path
        d="M9.2 12.1 11.2 14l3.8-4"
        stroke="currentColor"
        strokeWidth={active ? 1.7 : 1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 7.5h14M5 12h14M5 16.5h14"
        stroke="currentColor"
        strokeWidth={active ? 1.7 : 1.4}
        strokeLinecap="round"
      />
    </svg>
  );
}
