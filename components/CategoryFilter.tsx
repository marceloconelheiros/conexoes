import { BUSINESS_CATEGORIES, type BusinessCategory } from "@/data/businesses";

export type CategoryFilterValue = BusinessCategory | "Todos";

type CategoryFilterProps = {
  selected: CategoryFilterValue;
  onSelect: (category: CategoryFilterValue) => void;
};

const options: CategoryFilterValue[] = ["Todos", ...BUSINESS_CATEGORIES];

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div
      role="group"
      aria-label="Filtrar por categoria"
      className="flex flex-wrap gap-2"
    >
      {options.map((category) => {
        const isActive = selected === category;

        return (
          <button
            key={category}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(category)}
            className={`h-10 px-4 text-[10px] font-medium tracking-[0.18em] uppercase transition-colors duration-300 ${
              isActive
                ? "border border-gold bg-gold/[0.08] text-gold-soft"
                : "border border-line text-muted hover:border-gold/45 hover:text-foreground"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
