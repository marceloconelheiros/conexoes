export type RewardOffer = {
  slug: string;
  name: string;
  reward: string;
  cents: number;
};

export const REWARD_OFFERS: RewardOffer[] = [
  {
    slug: "orly-bagueteria",
    name: "Orly Bagueteria",
    reward: "Café + pão na chapa",
    cents: 1200,
  },
  {
    slug: "rocca-barbearia",
    name: "Rocca Barbearia",
    reward: "Acabamento de barba",
    cents: 1800,
  },
  {
    slug: "cheia-de-charme",
    name: "Cheia de Charme",
    reward: "Hidratação expressa",
    cents: 2500,
  },
  {
    slug: "pizzaria-marilia",
    name: "Pizzaria Marília",
    reward: "Refrigerante no pedido",
    cents: 800,
  },
  {
    slug: "top-frio",
    name: "Top Frio",
    reward: "Desconto na higienização",
    cents: 3000,
  },
];
