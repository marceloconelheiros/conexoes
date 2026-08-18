"use client";

import { useEffect, useState } from "react";
import { getStoreWhatsApp, saveStoreWhatsApp, toLocalWhatsApp } from "@/lib/commerce";
import { formatPhone } from "@/lib/customers";

type StoreWhatsAppFieldProps = {
  slug: string;
  initial?: string;
};

export function StoreWhatsAppField({ slug, initial }: StoreWhatsAppFieldProps) {
  const [value, setValue] = useState(initial ?? "");
  const [status, setStatus] = useState("");

  useEffect(() => {
    setValue(toLocalWhatsApp(getStoreWhatsApp(slug) || initial || ""));
  }, [slug, initial]);

  function save() {
    const digits = value.replace(/\D/g, "");
    if (digits.length < 10) {
      setStatus("Digite o WhatsApp com DDD, pelo menos 10 números.");
      return;
    }
    saveStoreWhatsApp(slug, value);
    setStatus("WhatsApp da loja salvo. Os pedidos vão para este número.");
  }

  return (
    <div>
      <p className="font-sans text-[10px] tracking-[0.2em] text-muted uppercase">
        WhatsApp
      </p>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        <input
          value={formatPhone(value)}
          onChange={(event) => {
            setValue(event.target.value);
            setStatus("");
          }}
          placeholder="(14) 9xxxx-xxxx"
          inputMode="tel"
          className="h-11 w-full border border-line bg-background/70 px-4 text-sm outline-none focus:border-gold/55"
        />
        <button
          type="button"
          onClick={save}
          className="inline-flex h-11 shrink-0 items-center justify-center bg-gold px-5 text-[10px] tracking-[0.18em] text-background uppercase"
        >
          Salvar
        </button>
      </div>
      <p className="mt-2 text-xs leading-5 text-gold-soft">
        {status ||
          "Este número recebe o pedido montado no carrinho da vitrine."}
      </p>
    </div>
  );
}
