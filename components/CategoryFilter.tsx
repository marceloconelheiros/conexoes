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
  return (
    <div
      role="group"
      aria-label="Filtrar por categoria"
      className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {options.map((category) => {
        const isActive = selected === category;

        return (
          <button
            key={category}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(category)}
            className={`flex h-10 shrink-0 items-center gap-1.5 rounded-full px-4 text-[12px] font-medium whitespace-nowrap transition-colors duration-300 ${
              isActive
                ? "bg-[#EA1D2C] text-white"
                : "bg-white text-[#3e3e3e] shadow-sm hover:bg-[#fff1ee]"
            }`}
          >
            <span aria-hidden>{categoryEmoji[category]}</span>
            {category}
          </button>
        );
      })}
    </div>
  );
}
