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
    <div className="rounded-2xl bg-white px-5 py-7 shadow-[0_14px_32px_rgba(0,0,0,0.16),0_4px_10px_rgba(0,0,0,0.08)] sm:px-7">
      <p className="text-[16px] font-bold tracking-[0.08em] text-[#EA1D2C] uppercase">
        Comentários
      </p>
      <h2 className="mt-2 text-[1.75rem] font-bold text-[#1a1a1a] sm:text-[2rem]">
        Conte como foi
      </h2>
      <p className="mt-3 max-w-lg text-[17px] leading-7 text-[#6b6b6b]">
        Depois do pedido no WhatsApp, um comentário na loja confirma a
        experiência e gera o crédito.
      </p>

      <div className="mt-6 rounded-2xl bg-white p-4 shadow-[0_14px_32px_rgba(0,0,0,0.16),0_4px_10px_rgba(0,0,0,0.08)]">
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={4}
          placeholder="Como foi o atendimento, o produto, a promoção da semana..."
          className="w-full rounded-xl border-2 border-[#ffd4c8] bg-[#fff8f6] px-4 py-3 text-[16px] leading-7 text-[#1a1a1a] outline-none transition-shadow duration-300 placeholder:text-[#9a9a9a] focus:border-[#EA1D2C] focus:shadow-[0_0_0_4px_rgba(234,29,44,0.15)]"
        />
        <button
          type="button"
          onClick={publish}
          className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#EA1D2C] px-7 text-[16px] font-bold text-white shadow-[0_6px_16px_rgba(234,29,44,0.35)] transition-colors hover:bg-[#c71826] sm:w-auto"
        >
          Publicar comentário
        </button>
        {notice ? (
          <p className="mt-3 rounded-xl bg-[#fff1ee] px-4 py-3 text-[16px] text-[#EA1D2C] shadow-[0_6px_16px_rgba(0,0,0,0.06)]">
            {notice}
          </p>
        ) : null}
      </div>

      <ul className="mt-6 space-y-4">
        {comments.length === 0 ? (
          <li className="rounded-2xl bg-white px-5 py-5 text-[16px] leading-7 text-[#8a8a8a] shadow-[0_14px_32px_rgba(0,0,0,0.12),0_4px_10px_rgba(0,0,0,0.06)]">
            Ainda não há comentários nesta loja. Seja o primeiro a contar como
            foi.
          </li>
        ) : (
          comments.map((item) => (
            <li
              key={item.id}
              className="rounded-2xl bg-white px-5 py-5 shadow-[0_14px_32px_rgba(0,0,0,0.16),0_4px_10px_rgba(0,0,0,0.08)]"
            >
              <p className="text-[15px] font-bold text-[#EA1D2C]">{item.author}</p>
              <p className="mt-2 text-[16px] leading-7 text-[#3e3e3e]">
                {item.text}
              </p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
