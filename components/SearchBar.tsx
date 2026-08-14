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
      <label htmlFor="vitrine-busca" className="sr-only">
        O que você está procurando?
      </label>

      <div className="flex items-stretch overflow-hidden rounded-2xl bg-white shadow-sm">
        <input
          id="vitrine-busca"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Buscar loja, comida, salão, serviço..."
          className="h-12 w-full bg-transparent px-4 text-[15px] text-[#1a1a1a] outline-none placeholder:text-[#9a9a9a]"
        />
        <button
          type="submit"
          className="inline-flex h-12 shrink-0 items-center justify-center bg-[#EA1D2C] px-5 text-[11px] font-semibold tracking-[0.16em] text-white uppercase transition-colors duration-300 hover:bg-[#c71826]"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}
