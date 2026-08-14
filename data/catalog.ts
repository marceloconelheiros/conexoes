export type CatalogItem = {
  id: string;
  name: string;
  priceCents: number;
  photo: string;
  promo?: boolean;
};

export const DEFAULT_CATALOG: Record<string, CatalogItem[]> = {
  "orly-bagueteria": [
    {
      id: "orly-baguete",
      name: "Baguete tradicional",
      priceCents: 890,
      photo:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "orly-cafe",
      name: "Café da manhã da semana",
      priceCents: 2490,
      promo: true,
      photo:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "orly-bolo",
      name: "Fatia de bolo",
      priceCents: 1290,
      photo:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80",
    },
  ],
  "pizzaria-marilia": [
    {
      id: "pizza-semana",
      name: "Pizza da semana",
      priceCents: 4990,
      promo: true,
      photo:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "pizza-refri",
      name: "Refrigerante 2L",
      priceCents: 1200,
      photo:
        "https://images.unsplash.com/photo-1629203851122-3706f0c546d4?auto=format&fit=crop&w=900&q=80",
    },
  ],
  "rocca-barbearia": [
    {
      id: "rocca-corte",
      name: "Corte masculino",
      priceCents: 4500,
      photo:
        "https://images.unsplash.com/photo-1503951914875-452162b0f3ea?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "rocca-barba",
      name: "Barba da semana",
      priceCents: 3500,
      promo: true,
      photo:
        "https://images.unsplash.com/photo-1621605815971-fbc54d83437f?auto=format&fit=crop&w=900&q=80",
    },
  ],
  "cheia-de-charme": [
    {
      id: "charme-hidro",
      name: "Hidratação da semana",
      priceCents: 7900,
      promo: true,
      photo:
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "charme-escova",
      name: "Escova",
      priceCents: 4500,
      photo:
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80",
    },
  ],
  "masc-pro": [
    {
      id: "masc-kit",
      name: "Kit curls da semana",
      priceCents: 12900,
      promo: true,
      photo:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80",
    },
  ],
  "top-frio": [
    {
      id: "frio-higienizacao",
      name: "Higienização promocional",
      priceCents: 14900,
      promo: true,
      photo:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
    },
  ],
};

export function money(cents: number) {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
