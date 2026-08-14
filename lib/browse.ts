const KEY = "conexao-browse";
const LIMIT = 40;

export type BrowseEntry = {
  path: string;
  title: string;
  at: string;
};

const TITLES: Record<string, string> = {
  "/": "Início",
  "/negocios": "Vitrine",
  "/carrinho": "Carrinho",
  "/recompensas": "Pontos e cashback",
  "/pontos": "Telas da rede",
  "/anuncie": "Anuncie",
  "/perfil": "Perfil",
  "/admin": "Admin",
  "/offline": "Offline",
};

export function titleForPath(path: string) {
  if (TITLES[path]) return TITLES[path];
  if (path.startsWith("/empresa/") && path.endsWith("/painel")) {
    return "Painel da loja";
  }
  if (path.startsWith("/empresa/")) return "Página da loja";
  return path;
}

export function getBrowseHistory(): BrowseEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as BrowseEntry[]) : [];
  } catch {
    return [];
  }
}

export function recordBrowse(path: string) {
  if (typeof window === "undefined") return;
  if (path.startsWith("/api")) return;

  const now = new Date().toISOString();
  const current = getBrowseHistory();
  const last = current[0];
  if (last?.path === path) {
    localStorage.setItem(
      KEY,
      JSON.stringify([{ ...last, at: now }, ...current.slice(1)].slice(0, LIMIT)),
    );
    window.dispatchEvent(new Event("conexao-browse"));
    return;
  }

  const next: BrowseEntry[] = [
    { path, title: titleForPath(path), at: now },
    ...current,
  ].slice(0, LIMIT);

  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("conexao-browse"));
}

export function clearBrowseHistory() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("conexao-browse"));
}

export function formatBrowseTime(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}
