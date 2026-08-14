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
    <div className="rounded-2xl bg-white px-5 py-6 shadow-[0_14px_32px_rgba(0,0,0,0.12)] sm:px-7">
      <p className="text-[11px] font-semibold tracking-[0.16em] text-[#EA1D2C] uppercase">
        Comentários
      </p>
      <h2 className="mt-2 text-[1.35rem] font-bold text-[#1a1a1a]">
        Conte como foi
      </h2>
      <p className="mt-2 max-w-lg text-[14px] leading-6 text-[#6b6b6b]">
        Depois do pedido no WhatsApp, um comentário na loja confirma a
        experiência e gera o crédito.
      </p>

      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        rows={4}
        placeholder="Como foi o atendimento, o produto, a promoção da semana..."
        className="mt-5 w-full rounded-xl border border-[#eadfdb] bg-[#fafafa] px-4 py-3 text-sm leading-7 text-[#1a1a1a] outline-none focus:border-[#EA1D2C]"
      />
      <button
        type="button"
        onClick={publish}
        className="mt-3 inline-flex h-12 items-center justify-center rounded-xl bg-[#EA1D2C] px-7 text-[12px] font-semibold tracking-[0.12em] text-white uppercase hover:bg-[#c71826]"
      >
        Publicar comentário
      </button>
      {notice ? <p className="mt-3 text-sm text-[#FF5A1F]">{notice}</p> : null}

      <ul className="mt-8 space-y-5">
        {comments.map((item) => (
          <li key={item.id} className="border-t border-[#eadfdb] pt-4">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-[#EA1D2C] uppercase">
              {item.author}
            </p>
            <p className="mt-2 text-sm leading-6 text-[#3e3e3e]">{item.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
