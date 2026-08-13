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
  whatsapp: string;
  instagram: string;
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

export const MOCK_BUSINESSES: Business[] = [
  {
    id: "1",
    slug: "mesa-do-cais",
    name: "Mesa do Cais",
    category: "Alimentação",
    plan: "premium",
    shortDescription:
      "Cozinha contemporânea com ingredientes da região e ambiente para almoços e encontros.",
    description:
      "A Mesa do Cais reúne uma cozinha contemporânea, ingredientes de produtores locais e um ambiente pensado para almoços de negócios, jantares e encontros. A casa faz parte da Vitrine Conexão Negócios como um ponto de referência gastronômica na cidade.",
    neighborhood: "Centro",
    address: "Rua do Cais, 120 — Centro",
    phone: "(11) 3400-2100",
    whatsapp: "5511940021001",
    instagram: "mesadocais",
    hours: "Terça a sábado · 12h às 23h",
    products: [
      "Almoço executivo",
      "Menu degustação",
      "Carta de vinhos",
      "Eventos privados",
    ],
    extraCall: "Conheça esta empresa",
  },
  {
    id: "2",
    slug: "clinica-vereda",
    name: "Clínica Vereda",
    category: "Saúde",
    plan: "partner",
    shortDescription:
      "Cuidado clínico com atendimento humanizado em um ponto estratégico da cidade.",
    description:
      "A Clínica Vereda oferece acompanhamento em saúde com foco em acolhimento, clareza e permanência. Como Ponto Parceiro, a clínica também integra a estrutura física da Conexão Negócios, conectando pacientes e empresas da rede no mesmo território.",
    neighborhood: "Jardins",
    address: "Avenida das Palmeiras, 540 — Jardins",
    phone: "(11) 3510-4480",
    whatsapp: "5511940021002",
    instagram: "clinicavereda",
    hours: "Segunda a sexta · 8h às 19h",
    products: [
      "Consultas especializadas",
      "Check-up",
      "Acompanhamento contínuo",
      "Orientações preventivas",
    ],
  },
  {
    id: "3",
    slug: "atelier-bruma",
    name: "Atelier Bruma",
    category: "Beleza",
    plan: "pro",
    shortDescription:
      "Estúdio de beleza com atendimento reservado e estética contemporânea.",
    description:
      "O Atelier Bruma é um estúdio de beleza pensado para quem busca cuidado, silêncio e um resultado elegante. O espaço combina técnicas atuais com um atendimento reservado, no ritmo de quem valoriza presença e detalhe.",
    neighborhood: "Vila Nova",
    address: "Rua das Hortênsias, 88 — Vila Nova",
    phone: "(11) 3620-7710",
    whatsapp: "5511940021003",
    instagram: "atelierbruma",
    hours: "Terça a sábado · 9h às 19h",
    products: [
      "Cabelo",
      "Estética facial",
      "Design de sobrancelhas",
      "Ritual de bem-estar",
    ],
  },
  {
    id: "4",
    slug: "oficina-lumen",
    name: "Oficina Lumen",
    category: "Automotivo",
    plan: "pro",
    shortDescription:
      "Manutenção automotiva com diagnóstico preciso e atendimento transparente.",
    description:
      "A Oficina Lumen cuida de veículos com diagnóstico técnico, comunicação clara e respeito ao tempo de quem depende do carro no dia a dia. Um serviço local pensado para confiança, não para pressa.",
    neighborhood: "Distrito",
    address: "Rua das Oficinas, 310 — Distrito",
    phone: "(11) 3330-9050",
    whatsapp: "5511940021004",
    instagram: "oficinalumen",
    hours: "Segunda a sexta · 8h às 18h · Sábado · 8h às 13h",
    products: [
      "Revisão programada",
      "Diagnóstico eletrônico",
      "Freios e suspensão",
      "Manutenção preventiva",
    ],
  },
  {
    id: "5",
    slug: "casa-alinea",
    name: "Casa Alínea",
    category: "Casa e Construção",
    plan: "start",
    shortDescription:
      "Arquitetura de interiores e reformas com linhas limpas e materiais duráveis.",
    description:
      "A Casa Alínea desenvolve projetos de interiores e reformas para residências e pequenos comércios. O trabalho parte da escuta do espaço e chega a soluções objetivas, com materiais escolhidos para durar.",
    neighborhood: "Bairro Alto",
    address: "Rua das Acácias, 75 — Bairro Alto",
    phone: "(11) 3288-4412",
    whatsapp: "5511940021005",
    instagram: "casaalinea",
    hours: "Segunda a sexta · 9h às 18h",
    products: [
      "Projeto de interiores",
      "Reforma residencial",
      "Consultoria de materiais",
      "Acompanhamento de obra",
    ],
  },
  {
    id: "6",
    slug: "linha-viva",
    name: "Linha Viva",
    category: "Moda",
    plan: "start",
    shortDescription:
      "Peças autorais e alfaiataria contemporânea com atendimento próximo.",
    description:
      "A Linha Viva trabalha moda autoral com corte preciso e atendimento reservado. A loja é um ponto de encontro para quem busca peças duráveis, feitas para o cotidiano da cidade.",
    neighborhood: "Vila Nova",
    address: "Rua das Figueiras, 42 — Vila Nova",
    phone: "(11) 3260-1180",
    whatsapp: "5511940021006",
    instagram: "linhaviva",
    hours: "Segunda a sábado · 10h às 19h",
    products: [
      "Alfaiataria",
      "Peças autorais",
      "Consultoria de estilo",
      "Ajustes",
    ],
  },
  {
    id: "7",
    slug: "orienta-imoveis",
    name: "Orienta Imóveis",
    category: "Imobiliárias",
    plan: "partner",
    shortDescription:
      "Assessoria imobiliária local para compra, venda e locação com acompanhamento próximo.",
    description:
      "A Orienta Imóveis atua na cidade com foco em escuta, clareza e acompanhamento próximo. Como Ponto Parceiro da Conexão Negócios, a imobiliária também recebe uma tela da rede e participa da estrutura física que conecta empresas e consumidores.",
    neighborhood: "Orla",
    address: "Avenida Beira-Rio, 900 — Orla",
    phone: "(11) 3444-8080",
    whatsapp: "5511940021007",
    instagram: "orientaimoveis",
    hours: "Segunda a sexta · 9h às 18h · Sábado · 9h às 13h",
    products: [
      "Compra e venda",
      "Locação residencial",
      "Imóveis comerciais",
      "Avaliação local",
    ],
  },
  {
    id: "8",
    slug: "ponto-certo",
    name: "Ponto Certo",
    category: "Serviços",
    plan: "start",
    shortDescription:
      "Serviços para casa e empresa, com agendamento simples e execução cuidadosa.",
    description:
      "O Ponto Certo reúne manutenção, pequenos reparos e apoio operacional para residências e comércios locais. O atendimento é direto, o prazo é combinado e o trabalho é feito para não precisar ser refeito.",
    neighborhood: "Bairro Alto",
    address: "Rua do Ofício, 155 — Bairro Alto",
    phone: "(11) 3377-6400",
    whatsapp: "5511940021008",
    instagram: "pontocerto.servicos",
    hours: "Segunda a sexta · 8h às 18h",
    products: [
      "Manutenção residencial",
      "Reparos comerciais",
      "Instalações",
      "Suporte avulso",
    ],
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
