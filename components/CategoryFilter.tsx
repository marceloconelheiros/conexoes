"use client";

import { useRef, type PointerEvent } from "react";
import { BUSINESS_CATEGORIES, type BusinessCategory } from "@/data/businesses";

export type CategoryFilterValue = BusinessCategory | "Todos";

type CategoryFilterProps = {
  selected: CategoryFilterValue;
  onSelect: (category: CategoryFilterValue) => void;
};

const options: CategoryFilterValue[] = ["Todos", ...BUSINESS_CATEGORIES];

const categoryEmoji: Record<CategoryFilterValue, string> = {
  Todos: "✨",
  Alimentação: "🍕",
  Saúde: "💊",
  Beleza: "💅",
  Automotivo: "🚗",
  "Casa e Construção": "🏠",
  Educação: "📚",
  Imobiliárias: "🔑",
  Moda: "👗",
  Serviços: "🛠️",
  "Negócios B2B": "💼",
};

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef({
    active: false,
    moved: false,
    startX: 0,
    scrollLeft: 0,
  });

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    const el = scroller.current;
    if (!el) return;
    drag.current = {
      active: true,
      moved: false,
      startX: event.clientX,
      scrollLeft: el.scrollLeft,
    };
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const el = scroller.current;
    if (!el || !drag.current.active) return;
    const delta = event.clientX - drag.current.startX;
    if (Math.abs(delta) > 6) drag.current.moved = true;
    if (drag.current.moved) {
      el.scrollLeft = drag.current.scrollLeft - delta;
    }
  }

  function endDrag() {
    drag.current.active = false;
  }

  return (
    <div className="relative">
      <p className="mb-2 text-[12px] font-medium text-[#8a8a8a]">
        Deslize para o lado e veja mais categorias
      </p>
      <div
        ref={scroller}
        role="group"
        aria-label="Filtrar por categoria"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="flex cursor-grab gap-2 overflow-x-auto overscroll-x-contain touch-pan-x pb-2 active:cursor-grabbing [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
      >
        {options.map((category) => {
          const isActive = selected === category;

          return (
            <button
              key={category}
              type="button"
              aria-pressed={isActive}
              onClick={() => {
                if (drag.current.moved) return;
                onSelect(category);
              }}
              className={`flex h-10 shrink-0 items-center gap-1.5 rounded-full px-4 text-[12px] font-medium whitespace-nowrap transition-colors duration-300 ${
                isActive
                  ? "bg-[#EA1D2C] text-white shadow-[0_6px_16px_rgba(234,29,44,0.28)]"
                  : "bg-white text-[#3e3e3e] shadow-[0_6px_16px_rgba(0,0,0,0.08)] hover:bg-[#fff1ee]"
              }`}
            >
              <span aria-hidden>{categoryEmoji[category]}</span>
              {category}
            </button>
          );
        })}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-2 h-10 w-12 bg-gradient-to-l from-[#f5f5f5] to-transparent"
      />
    </div>
  );
}
