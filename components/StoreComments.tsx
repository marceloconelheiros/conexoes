"use client";

import { useEffect, useState } from "react";
import type { Business } from "@/data/businesses";
import {
  addComment,
  cashbackForOrder,
  creditWallet,
  getComments,
  getShopUser,
  markOrderCommented,
  pendingOrderForStore,
  type ShopComment,
} from "@/lib/commerce";

export function StoreComments({ business }: { business: Business }) {
  const [comments, setComments] = useState<ShopComment[]>([]);
  const [text, setText] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const sync = () => setComments(getComments(business.slug));
    sync();
    window.addEventListener("conexao-commerce", sync);
    return () => window.removeEventListener("conexao-commerce", sync);
  }, [business.slug]);

  function publish() {
    const user = getShopUser();
    if (!user) {
      setNotice("Faça um pedido primeiro. O cadastro acontece no carrinho.");
      return;
    }
    if (text.trim().length < 8) {
      setNotice("Escreva um comentário um pouco mais completo.");
      return;
    }

    addComment({
      id: `c-${Date.now()}`,
      storeSlug: business.slug,
      author: user.name,
      text: text.trim(),
      at: new Date().toISOString(),
    });
    setText("");

    const pending = pendingOrderForStore(business.slug);
    if (pending) {
      const credit = cashbackForOrder(pending.totalCents, business.plan);
      markOrderCommented(pending.id);
      creditWallet(credit, `Cashback após comentário · ${business.name}`);
      setNotice("Comentário publicado. Cashback liberado na carteira.");
      return;
    }

    setNotice(
      "Comentário publicado. O cashback libera depois de um pedido nesta loja.",
    );
  }

  return (
    <div>
      <p className="font-sans text-[11px] tracking-[0.38em] text-gold uppercase">
        Comentários
      </p>
      <h2 className="mt-4 font-display text-[clamp(1.7rem,3.8vw,2.6rem)] leading-tight font-medium text-foreground">
        Conte como foi. É assim que o cashback conta.
      </h2>
      <p className="mt-4 max-w-lg text-sm leading-7 text-muted">
        Depois do pedido no WhatsApp, um comentário na loja confirma a
        experiência e gera o crédito.
      </p>

      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        rows={4}
        placeholder="Como foi o atendimento, o produto, a promoção da semana..."
        className="mt-8 w-full border border-line bg-background/70 px-4 py-3 text-sm leading-7 outline-none focus:border-gold/55"
      />
      <button
        type="button"
        onClick={publish}
        className="mt-4 inline-flex h-12 items-center justify-center bg-gold px-7 text-[11px] font-medium tracking-[0.22em] text-background uppercase hover:bg-gold-soft"
      >
        Publicar comentário
      </button>
      {notice ? <p className="mt-4 text-sm text-gold-soft">{notice}</p> : null}

      <ul className="mt-10 space-y-6">
        {comments.map((item) => (
          <li key={item.id} className="border-t border-line pt-5">
            <p className="font-sans text-[10px] tracking-[0.2em] text-gold uppercase">
              {item.author}
            </p>
            <p className="mt-2 text-sm leading-7 text-foreground/90">{item.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
