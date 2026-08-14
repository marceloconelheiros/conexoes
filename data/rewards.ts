export type RewardOffer = {
  slug: string;
  name: string;
  reward: string;
  points: number;
};

export const REWARD_OFFERS: RewardOffer[] = [
  {
    slug: "orly-bagueteria",
    name: "Orly Bagueteria",
    reward: "Café + pão na chapa",
    points: 80,
  },
  {
    slug: "rocca-barbearia",
    name: "Rocca Barbearia",
    reward: "Acabamento de barba",
    points: 120,
  },
  {
    slug: "cheia-de-charme",
    name: "Cheia de Charme",
    reward: "Hidratação expressa",
    points: 140,
  },
  {
    slug: "pizzaria-marilia",
    name: "Pizzaria Marília",
    reward: "Refrigerante no pedido",
    points: 60,
  },
  {
    slug: "top-frio",
    name: "Top Frio",
    reward: "Desconto na higienização",
    points: 180,
  },
];

export const POINT_ACTIONS = [
  {
    id: "daily",
    title: "Abrir o app no dia",
    detail: "Um motivo para voltar amanhã.",
    points: 10,
  },
  {
    id: "screen",
    title: "Check-in em uma tela da rede",
    detail: "Presença no ponto estratégico.",
    points: 25,
  },
  {
    id: "profile",
    title: "Visitar o perfil de uma empresa",
    detail: "Interação com a vitrine.",
    points: 15,
  },
] as const;
