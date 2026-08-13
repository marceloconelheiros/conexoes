type SearchBarProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onSubmit: () => void;
};

export function SearchBar({ query, onQueryChange, onSubmit }: SearchBarProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      className="w-full"
    >
      <label
        htmlFor="vitrine-busca"
        className="font-sans text-[11px] tracking-[0.28em] text-gold uppercase"
      >
        O que você está procurando?
      </label>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <input
          id="vitrine-busca"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Ex.: restaurante, clínica, imobiliária, salão..."
          className="h-12 w-full border border-line bg-background/70 px-5 text-sm text-foreground outline-none transition-colors duration-300 placeholder:text-muted/70 focus:border-gold/55"
        />
        <button
          type="submit"
          className="inline-flex h-12 shrink-0 items-center justify-center bg-gold px-7 text-[11px] font-medium tracking-[0.22em] text-background uppercase transition-colors duration-300 hover:bg-gold-soft"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}
