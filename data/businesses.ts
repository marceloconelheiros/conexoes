/**
 * Dados de exemplo da Vitrine Conexão Negócios.
 *
 * IMPORTANTE: este arquivo contém MOCKS apenas para demonstração visual.
 * Substituir posteriormente por consultas ao Supabase (ou outro backend),
 * mantendo a interface `Business` e as funções `getBusinesses` / `getBusinessBySlug`.
 *
 * Troca futura sugerida:
 * - getBusinesses()        -> supabase.from("businesses").select("*")
 * - getBusinessBySlug()    -> supabase.from("businesses").eq("slug", slug).single()
 */

export const BUSINESS_CATEGORIES = [
  "Alimentação",
  "Saúde",
  "Beleza",
  "Automotivo",
  "Casa e Construção",
  "Educação",
  "Imobiliárias",
  "Moda",
  "Serviços",
  "Negócios B2B",
] as const;

export type BusinessCategory = (typeof BUSINESS_CATEGORIES)[number];

export type BusinessPlan = "start" | "pro" | "premium" | "partner";

export interface Business {
  id: string;
  slug: string;
  name: string;
  category: BusinessCategory;
  plan: BusinessPlan;
  shortDescription: string;
  description: string;
  neighborhood: string;
  address: string;
  phone: string;
  whatsapp?: string;
  instagram?: string;
  website?: string;
  googleUrl?: string;
  hours: string;
  products: string[];
  extraCall?: string;
  coverImage?: string;
  logo?: string;
  gallery?: string[];
}

export const PLAN_LABEL: Record<BusinessPlan, string> = {
  start: "Start",
  pro: "Pro",
  premium: "Premium",
  partner: "Ponto Parceiro",
};

const PLAN_PRIORITY: Record<BusinessPlan, number> = {
  premium: 0,
  pro: 1,
  partner: 2,
  start: 3,
};

/**
 * Empresas reais de Marília usadas como exemplo de layout da Vitrine.
 * Dados públicos (Google, sites e listagens) para demonstração visual.
 */
export const MOCK_BUSINESSES: Business[] = [
  {
    id: "1",
    slug: "cheia-de-charme",
    name: "Cheia de Charme",
    category: "Beleza",
    plan: "premium",
    shortDescription:
      "Salão de beleza em Marília com corte, escova, progressiva e tratamentos capilares.",
    description:
      "A Cheia de Charme é uma rede de salões com unidade em Marília. O espaço reúne cortes, escova, progressiva, cristalização e coloração em um atendimento pensado para o dia a dia da cidade.",
    neighborhood: "Centro",
    address: "Avenida Carlos Gomes, 629 — Centro, Marília - SP",
    phone: "Ver no Google",
    website: "https://www.salaocheiadecharme.com.br/",
    googleUrl: "https://share.google/P5AyiLQY4J2t036fl",
    hours: "Segunda a sexta · 8h30 às 18h",
    products: [
      "Corte e escova",
      "Progressiva",
      "Cristalização",
      "Mechas, luzes e coloração",
      "Hidratação e reconstrução",
    ],
    extraCall: "Conheça esta empresa",
    coverImage:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "2",
    slug: "pizzaria-marilia",
    name: "Pizzaria Marília",
    category: "Alimentação",
    plan: "pro",
    shortDescription:
      "Pizzas e lanches em Marília, para comer no local ou pedir delivery.",
    description:
      "A Pizzaria Marília serve pizzas, lanches e pratos do dia a dia em um ponto conhecido da cidade. O cardápio é direto, o atendimento é local e o espaço funciona para famílias, encontros e pedidos para viagem.",
    neighborhood: "Jardim Santa Antonieta",
    address: "Avenida João Martins Coelho, 1680 — Jardim Santa Antonieta, Marília - SP",
    phone: "Ver no Google",
    googleUrl: "https://share.google/S2JlFZlVACHrD3bDj",
    hours: "Todos os dias · a partir das 18h",
    products: [
      "Pizzas",
      "Lanches",
      "Delivery",
      "Atendimento no local",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "3",
    slug: "rocca-barbearia",
    name: "Rocca Barbearia",
    category: "Beleza",
    plan: "pro",
    shortDescription:
      "Barbearia no Centro de Marília, com corte, barba e agendamento pelo WhatsApp.",
    description:
      "A Rocca Barbearia atende no Centro de Marília com corte masculino, barba e acabamento. O espaço combina o ofício clássico da barbearia com um atendimento próximo, feito para quem quer sair bem e no horário.",
    neighborhood: "Centro",
    address: "Rua Álvares Cabral, 513 — Centro, Marília - SP",
    phone: "(14) 3454-5017",
    whatsapp: "5514991257811",
    instagram: "roccabarbearia",
    website: "https://roccabarbearia.com.br/",
    googleUrl: "https://share.google/0htxCiHJ013dKoY9P",
    hours: "Terça a sábado · consulte o horário no Google",
    products: [
      "Corte masculino",
      "Barba",
      "Acabamento",
      "Agendamento pelo WhatsApp",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3ea?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "4",
    slug: "masc-pro",
    name: "Masc PRO",
    category: "Beleza",
    plan: "premium",
    shortDescription:
      "Cosméticos profissionais de Marília para salões e cuidado capilar em casa.",
    description:
      "A Masc PRO desenvolve e comercializa cosméticos capilares profissionais a partir de Marília. A linha atende salões e consumidores finais, com shampoos, máscaras e tratamentos pensados para performance no lavatório e no uso diário.",
    neighborhood: "Jardim Domingos de Leo",
    address: "Avenida Doutor Durval de Menezes, 164 — Jardim Domingos de Leo, Marília - SP",
    phone: "(14) 3316-2136",
    instagram: "mascprofessional",
    website: "https://mascprofessional.com/",
    googleUrl: "https://share.google/LlhAEv4ac3qJw03Vc",
    hours: "Segunda a sexta · horário comercial",
    products: [
      "Shampoos profissionais",
      "Máscaras e tratamentos",
      "Linha Curls",
      "Produtos para salão e varejo",
    ],
    extraCall: "Conheça esta empresa",
    coverImage:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "5",
    slug: "orly-bagueteria",
    name: "Orly Bagueteria",
    category: "Alimentação",
    plan: "premium",
    shortDescription:
      "Padaria e cafeteria tradicional do Centro, com baguetes, doces, café e almoço.",
    description:
      "Há décadas no Centro de Marília, a Orly Bagueteria é referência em pães — com destaque para a baguete — além de doces, bolos, lanches e almoços. O ambiente é de padaria clássica, com serviço no local, para viagem e delivery.",
    neighborhood: "Centro",
    address: "Rua Paes Leme, 88 — Centro, Marília - SP",
    phone: "(14) 3413-8488",
    whatsapp: "5514991310044",
    instagram: "orlybagueteria",
    website: "https://linktr.ee/bagueteriaorly",
    googleUrl: "https://share.google/CwGn2H8e1yggao0gA",
    hours: "Segunda a sábado · 6h30 às 22h · Domingo com intervalo",
    products: [
      "Baguetes e pães",
      "Doces, bolos e tortas",
      "Café e lanches",
      "Almoço",
      "Retirada e delivery",
    ],
    extraCall: "Conheça esta empresa",
    coverImage:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "6",
    slug: "coca-cola",
    name: "Coca-Cola",
    category: "Negócios B2B",
    plan: "premium",
    shortDescription:
      "Fábrica e operação Coca-Cola FEMSA em Marília, presente no cotidiano da cidade.",
    description:
      "A Coca-Cola FEMSA mantém operação industrial em Marília, na Chácara dos Laranjais. A unidade faz parte da rede de fabricantes da marca no Brasil e abastece pontos de venda da região com o portfólio Coca-Cola.",
    neighborhood: "Chácara dos Laranjais",
    address: "Rua João Viggiani, 10 — Chácara dos Laranjais, Marília - SP",
    phone: "(14) 2105-2600",
    website: "https://www.coca-cola.com/br/pt",
    googleUrl: "https://share.google/SYN3B67DQrLyXanye",
    hours: "Segunda a sexta · 8h às 18h",
    products: [
      "Bebidas Coca-Cola",
      "Distribuição regional",
      "Atendimento a pontos de venda",
      "Marcas do portfólio",
    ],
    extraCall: "Conheça esta empresa",
    coverImage:
      "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "7",
    slug: "mercado-livre",
    name: "Mercado Livre",
    category: "Negócios B2B",
    plan: "pro",
    shortDescription:
      "Marketplace para comprar e vender online, com pagamentos, envios e ofertas.",
    description:
      "O Mercado Livre é a plataforma de compra e venda online mais usada no Brasil. Empresas e consumidores encontram produtos, pagam pelo Mercado Pago e recebem com a malha de envios da companhia — um exemplo de presença digital de grande escala na vitrine.",
    neighborhood: "Brasil",
    address: "Mercado Livre Brasil · mercadolivre.com.br",
    phone: "Atendimento pelo site",
    website: "https://www.mercadolivre.com.br",
    googleUrl: "https://share.google/Df7wErSGUo5UXEo3s",
    instagram: "mercadolivre",
    hours: "Online · 24h",
    products: [
      "Compra e venda online",
      "Mercado Pago",
      "Envios",
      "Ofertas e lojas oficiais",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "8",
    slug: "top-frio",
    name: "Top Frio",
    category: "Casa e Construção",
    plan: "start",
    shortDescription:
      "Instalação e manutenção de ar condicionado em Marília, com atendimento pelo WhatsApp.",
    description:
      "A Top Frio atua em Marília com instalação, manutenção e higienização de ar condicionado para residências e comércios. O contato é direto pelo WhatsApp, para orçamento e agendamento sem burocracia.",
    neighborhood: "Marília",
    address: "Marília - SP",
    phone: "(14) 99788-5990",
    whatsapp: "5514997885990",
    hours: "Segunda a sábado · agendamento pelo WhatsApp",
    products: [
      "Instalação de ar condicionado",
      "Manutenção",
      "Higienização",
      "Atendimento residencial e comercial",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=80",
  },
];

/** Preparado para troca futura por Supabase. */
export async function getBusinesses(): Promise<Business[]> {
  return MOCK_BUSINESSES;
}

/** Preparado para troca futura por Supabase. */
export async function getBusinessBySlug(
  slug: string,
): Promise<Business | undefined> {
  return MOCK_BUSINESSES.find((business) => business.slug === slug);
}

export function getBusinessInitials(name: string): string {
  const ignored = new Set(["de", "da", "do", "das", "dos", "e"]);
  const parts = name
    .split(/\s+/)
    .filter((part) => part.length > 0 && !ignored.has(part.toLowerCase()));

  return parts
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
}

export function getWhatsAppUrl(whatsapp: string): string {
  return `https://wa.me/${whatsapp.replace(/\D/g, "")}`;
}

export function getInstagramUrl(instagram: string): string {
  if (instagram.startsWith("http")) return instagram;
  return `https://instagram.com/${instagram.replace(/^@/, "")}`;
}

export function getPrimaryContactUrl(business: Business): string {
  if (business.whatsapp) return getWhatsAppUrl(business.whatsapp);
  if (business.website) return business.website;
  if (business.googleUrl) return business.googleUrl;
  return `https://www.google.com/search?q=${encodeURIComponent(`${business.name} Marília`)}`;
}

export function getPrimaryContactLabel(business: Business): string {
  if (business.whatsapp) return "WhatsApp";
  if (business.website) return "Site oficial";
  return "Google";
}

export function getQrCodeImageUrl(data: string, size = 240): string {
  const params = new URLSearchParams({
    size: `${size}x${size}`,
    bgcolor: "0b0b0c",
    color: "c6a667",
    qzone: "2",
    data,
  });

  return `https://api.qrserver.com/v1/create-qr-code/?${params.toString()}`;
}

export function filterBusinesses(
  businesses: Business[],
  query: string,
  category: BusinessCategory | "Todos",
): Business[] {
  const term = query.trim().toLowerCase();

  return businesses.filter((business) => {
    const matchesCategory =
      category === "Todos" || business.category === category;

    if (!matchesCategory) return false;
    if (!term) return true;

    const haystack = [
      business.name,
      business.category,
      business.shortDescription,
      business.description,
      business.neighborhood,
      business.address,
      ...business.products,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(term);
  });
}

export function sortBusinesses(businesses: Business[]): Business[] {
  return [...businesses].sort((a, b) => {
    const planDiff = PLAN_PRIORITY[a.plan] - PLAN_PRIORITY[b.plan];
    if (planDiff !== 0) return planDiff;
    return a.name.localeCompare(b.name, "pt-BR");
  });
}
