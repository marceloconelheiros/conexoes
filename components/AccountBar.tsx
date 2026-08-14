"use client";

import { logout } from "@/lib/auth-client";

type AccountBarProps = {
  name: string;
  detail: string;
};

export function AccountBar({ name, detail }: AccountBarProps) {
  return (
    <div className="flex flex-col gap-4 border border-line bg-surface/70 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-sans text-[10px] tracking-[0.22em] text-gold uppercase">
          Conta
        </p>
        <p className="mt-2 font-display text-2xl text-foreground">{name}</p>
        <p className="mt-1 text-sm text-muted">{detail}</p>
      </div>
      <button
        type="button"
        onClick={() => void logout()}
        className="h-11 border border-line px-5 text-[10px] tracking-[0.2em] text-muted uppercase hover:border-gold/45 hover:text-gold"
      >
        Sair
      </button>
    </div>
  );
}
