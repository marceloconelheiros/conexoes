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

      <div className="mt-4">
        <CategoryFilter selected={category} onSelect={setCategory} />
      </div>

      <div className="mt-6" aria-live="polite">
        {results.length === 0 ? (
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <p className="text-xl font-semibold text-[#1a1a1a]">
              Nenhuma loja encontrada.
            </p>
            <p className="mx-auto mt-3 max-w-md text-[15px] leading-7 text-[#6b6b6b]">
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
