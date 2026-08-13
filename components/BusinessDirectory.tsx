"use client";

import { useMemo, useState } from "react";
import {
  filterBusinesses,
  sortBusinesses,
  type Business,
} from "@/data/businesses";
import { BusinessCard } from "./BusinessCard";
import {
  CategoryFilter,
  type CategoryFilterValue,
} from "./CategoryFilter";
import { SearchBar } from "./SearchBar";

type BusinessDirectoryProps = {
  businesses: Business[];
};

export function BusinessDirectory({ businesses }: BusinessDirectoryProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilterValue>("Todos");

  const results = useMemo(() => {
    return sortBusinesses(filterBusinesses(businesses, query, category));
  }, [businesses, query, category]);

  function applySearch() {
    document.getElementById("empresas")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div>
      <SearchBar
        query={query}
        onQueryChange={setQuery}
        onSubmit={applySearch}
      />

      <div className="mt-12">
        <CategoryFilter
          selected={category}
          onSelect={setCategory}
        />
      </div>

      <div className="mt-16" aria-live="polite">
        {results.length === 0 ? (
          <div className="border border-line bg-surface/50 px-6 py-20 text-center sm:px-10 sm:py-28">
            <p className="font-display text-[clamp(1.7rem,4vw,2.6rem)] leading-[0.98] tracking-[0.04em] text-foreground uppercase">
              Nenhum negócio encontrado.
            </p>
            <p className="mx-auto mt-6 max-w-md text-base leading-8 text-muted">
              Tente outro termo ou escolha uma categoria diferente.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {results.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
