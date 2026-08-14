"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { POINT_ACTIONS, REWARD_OFFERS } from "@/data/rewards";

const STORAGE_KEY = "conexao-pontos";
const DAY_KEY = "conexao-pontos-dia";

type WalletState = {
  points: number;
  history: { label: string; points: number; at: string }[];
};

const emptyWallet: WalletState = { points: 0, history: [] };

function todayStamp() {
  return new Date().toISOString().slice(0, 10);
}

export function RewardsWallet() {
  const [wallet, setWallet] = useState<WalletState>(emptyWallet);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setWallet(JSON.parse(raw) as WalletState);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const commit = useCallback((next: WalletState, message: string) => {
    setWallet(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setNotice(message);
  }, []);

  function earn(points: number, label: string, dailyKey?: string) {
    if (dailyKey) {
      const used = localStorage.getItem(`${DAY_KEY}-${dailyKey}`);
      if (used === todayStamp()) {
        setNotice("Você já fez esta ação hoje.");
        return;
      }
      localStorage.setItem(`${DAY_KEY}-${dailyKey}`, todayStamp());
    }

    commit(
      {
        points: wallet.points + points,
        history: [
          { label, points, at: new Date().toISOString() },
          ...wallet.history,
        ].slice(0, 8),
      },
      `+${points} pontos · ${label}`,
    );
  }

  function redeem(points: number, label: string) {
    if (wallet.points < points) {
      setNotice("Ainda faltam pontos para este benefício.");
      return;
    }

    commit(
      {
        points: wallet.points - points,
        history: [
          { label: `Resgate · ${label}`, points: -points, at: new Date().toISOString() },
          ...wallet.history,
        ].slice(0, 8),
      },
      `Resgate confirmado na ${label}.`,
    );
  }

  return (
    <div>
      <div className="border border-gold/35 bg-surface/70 px-6 py-8 sm:px-10 sm:py-10">
        <p className="font-sans text-[11px] tracking-[0.38em] text-gold uppercase">
          Sua carteira
        </p>
        <p className="mt-5 font-display text-[clamp(3.4rem,10vw,6rem)] leading-none tracking-[0.04em] text-foreground">
          {ready ? wallet.points : "—"}
        </p>
        <p className="mt-3 font-sans text-[11px] tracking-[0.22em] text-muted uppercase">
          Pontos Conexão
        </p>
        {notice ? (
          <p className="mt-5 text-sm leading-7 text-gold-soft">{notice}</p>
        ) : (
          <p className="mt-5 max-w-md text-sm leading-7 text-muted">
            Não há comissão sobre venda. Você ganha pontos por presença e
            troca o benefício direto na empresa anunciante.
          </p>
        )}
      </div>

      <div className="mt-16">
        <p className="font-sans text-[11px] tracking-[0.38em] text-gold uppercase">
          Ganhar pontos
        </p>
        <ul className="mt-8 divide-y divide-[rgba(198,166,103,0.18)] border-y border-line">
          {POINT_ACTIONS.map((action) => (
            <li
              key={action.id}
              className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-display text-2xl tracking-[0.04em] text-foreground uppercase">
                  {action.title}
                </p>
                <p className="mt-2 text-sm leading-7 text-muted">
                  {action.detail} · +{action.points} pontos
                </p>
              </div>
              <button
                type="button"
                onClick={() => earn(action.points, action.title, action.id)}
                className="inline-flex h-11 shrink-0 items-center justify-center border border-gold/50 px-5 text-[10px] font-medium tracking-[0.2em] text-gold uppercase transition-colors duration-300 hover:border-gold hover:bg-gold/10"
              >
                Registrar
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-16">
        <p className="font-sans text-[11px] tracking-[0.38em] text-gold uppercase">
          Trocar na cidade
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {REWARD_OFFERS.map((offer) => (
            <article
              key={offer.slug}
              className="flex flex-col border border-line bg-surface/70 px-5 py-6"
            >
              <p className="font-sans text-[10px] tracking-[0.24em] text-gold uppercase">
                {offer.points} pontos
              </p>
              <h3 className="mt-3 font-display text-[1.55rem] leading-[0.95] tracking-[0.04em] text-foreground uppercase">
                {offer.name}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">{offer.reward}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => redeem(offer.points, offer.name)}
                  className="inline-flex h-11 items-center justify-center bg-gold px-5 text-[10px] font-medium tracking-[0.2em] text-background uppercase transition-colors duration-300 hover:bg-gold-soft"
                >
                  Resgatar
                </button>
                <Link
                  href={`/empresa/${offer.slug}`}
                  className="inline-flex h-11 items-center justify-center border border-gold/50 px-5 text-[10px] font-medium tracking-[0.2em] text-gold uppercase transition-colors duration-300 hover:border-gold hover:bg-gold/10"
                >
                  Ver empresa
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      {wallet.history.length > 0 ? (
        <div className="mt-16">
          <p className="font-sans text-[11px] tracking-[0.38em] text-gold uppercase">
            Movimento recente
          </p>
          <ul className="mt-6 space-y-4">
            {wallet.history.map((item, index) => (
              <li
                key={`${item.at}-${index}`}
                className="flex items-baseline justify-between gap-4 border-b border-line pb-3 text-sm"
              >
                <span className="text-muted">{item.label}</span>
                <span className={item.points > 0 ? "text-gold" : "text-foreground"}>
                  {item.points > 0 ? "+" : ""}
                  {item.points}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
