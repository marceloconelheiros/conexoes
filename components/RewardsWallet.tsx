"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  cashbackCents,
  formatCashbackRate,
  getCashbackRate,
  getCashierCode,
  type RankedStore,
} from "@/data/ranking";
import { REWARD_OFFERS } from "@/data/rewards";

const STORAGE_KEY = "conexao-cashback";

type WalletState = {
  cents: number;
  history: { label: string; cents: number; at: string }[];
};

const emptyWallet: WalletState = { cents: 0, history: [] };

function money(cents: number) {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

type RewardsWalletProps = {
  stores: RankedStore[];
};

export function RewardsWallet({ stores }: RewardsWalletProps) {
  const [wallet, setWallet] = useState<WalletState>(emptyWallet);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");
  const [slug, setSlug] = useState(stores[0]?.business.slug ?? "");
  const [code, setCode] = useState("");
  const [amount, setAmount] = useState("");

  const selected = useMemo(
    () => stores.find((item) => item.business.slug === slug),
    [stores, slug],
  );

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

  function validatePurchase() {
    if (!selected) return;

    const spent = Number(amount.replace(",", "."));
    if (!Number.isFinite(spent) || spent <= 0) {
      setNotice("Informe o valor pago no caixa.");
      return;
    }

    const expected = getCashierCode(selected.business.slug);
    if (code.trim().toUpperCase() !== expected) {
      setNotice("Código do caixa inválido. Peça o código do dia na loja.");
      return;
    }

    const credit = cashbackCents(spent, selected.rate);
    commit(
      {
        cents: wallet.cents + credit,
        history: [
          {
            label: `Cashback · ${selected.business.name}`,
            cents: credit,
            at: new Date().toISOString(),
          },
          ...wallet.history,
        ].slice(0, 10),
      },
      `${money(credit)} de cashback em ${selected.business.name}.`,
    );
    setCode("");
    setAmount("");
  }

  function redeem(cents: number, label: string) {
    if (wallet.cents < cents) {
      setNotice("Ainda falta crédito para este benefício.");
      return;
    }

    commit(
      {
        cents: wallet.cents - cents,
        history: [
          {
            label: `Resgate · ${label}`,
            cents: -cents,
            at: new Date().toISOString(),
          },
          ...wallet.history,
        ].slice(0, 10),
      },
      `Resgate confirmado na ${label}.`,
    );
  }

  return (
    <div>
      <div className="border border-gold/35 bg-surface/70 px-6 py-8 sm:px-10 sm:py-10">
        <p className="font-sans text-[11px] tracking-[0.38em] text-gold uppercase">
          Seu cashback
        </p>
        <p className="mt-5 font-display text-[clamp(2.6rem,8vw,5.2rem)] leading-none tracking-[0.02em] text-foreground">
          {ready ? money(wallet.cents) : "—"}
        </p>
        <p className="mt-3 font-sans text-[11px] tracking-[0.22em] text-muted uppercase">
          Crédito gerado pelas lojas
        </p>
        {notice ? (
          <p className="mt-5 text-sm leading-7 text-gold-soft">{notice}</p>
        ) : (
          <p className="mt-5 max-w-md text-sm leading-7 text-muted">
            Você paga na loja, como sempre. O app só confirma a compra e a loja
            libera o cashback. Nada passa pelo caixa da Conexão Negócios.
          </p>
        )}
      </div>

      <div className="mt-16">
        <p className="font-sans text-[11px] tracking-[0.38em] text-gold uppercase">
          Validar compra
        </p>
        <p className="mt-4 max-w-lg text-sm leading-7 text-muted">
          Pague no PIX, cartão ou dinheiro. Depois peça o código do dia no
          caixa e registre o valor do cupom.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <label className="block">
            <span className="font-sans text-[10px] tracking-[0.2em] text-gold uppercase">
              Loja
            </span>
            <select
              value={slug}
              onChange={(event) => setSlug(event.target.value)}
              className="mt-3 h-12 w-full border border-line bg-background/70 px-4 text-sm text-foreground outline-none focus:border-gold/55"
            >
              {stores.map((item) => (
                <option key={item.business.slug} value={item.business.slug}>
                  {item.business.name} · {formatCashbackRate(item.rate)}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="font-sans text-[10px] tracking-[0.2em] text-gold uppercase">
              Código do caixa
            </span>
            <input
              value={code}
              onChange={(event) => setCode(event.target.value.toUpperCase())}
              placeholder="XXXX-0000"
              className="mt-3 h-12 w-full border border-line bg-background/70 px-4 text-sm tracking-[0.12em] text-foreground outline-none placeholder:text-muted/70 focus:border-gold/55"
            />
          </label>

          <label className="block">
            <span className="font-sans text-[10px] tracking-[0.2em] text-gold uppercase">
              Valor pago
            </span>
            <input
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              inputMode="decimal"
              placeholder="0,00"
              className="mt-3 h-12 w-full border border-line bg-background/70 px-4 text-sm text-foreground outline-none placeholder:text-muted/70 focus:border-gold/55"
            />
          </label>
        </div>

        {selected ? (
          <p className="mt-4 text-sm leading-7 text-muted">
            Cashback desta loja: {formatCashbackRate(selected.rate)}. Para
            testar agora, o código do dia está no{" "}
            <Link
              href={`/empresa/${selected.business.slug}/painel`}
              className="text-gold transition-colors hover:text-gold-soft"
            >
              painel da loja
            </Link>
            .
          </p>
        ) : null}

        <button
          type="button"
          onClick={validatePurchase}
          className="mt-6 inline-flex h-12 items-center justify-center bg-gold px-7 text-[11px] font-medium tracking-[0.22em] text-background uppercase transition-colors duration-300 hover:bg-gold-soft"
        >
          Gerar cashback
        </button>
      </div>

      <div className="mt-16">
        <p className="font-sans text-[11px] tracking-[0.38em] text-gold uppercase">
          Usar crédito
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {REWARD_OFFERS.map((offer) => (
            <article
              key={offer.slug}
              className="flex flex-col border border-line bg-surface/70 px-5 py-6"
            >
              <p className="font-sans text-[10px] tracking-[0.24em] text-gold uppercase">
                {money(offer.cents)}
              </p>
              <h3 className="mt-3 font-display text-[1.55rem] leading-[0.95] tracking-[0.04em] text-foreground uppercase">
                {offer.name}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">{offer.reward}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => redeem(offer.cents, offer.name)}
                  className="inline-flex h-11 items-center justify-center bg-gold px-5 text-[10px] font-medium tracking-[0.2em] text-background uppercase transition-colors duration-300 hover:bg-gold-soft"
                >
                  Usar crédito
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
                <span className={item.cents > 0 ? "text-gold" : "text-foreground"}>
                  {item.cents > 0 ? "+" : ""}
                  {money(item.cents)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
