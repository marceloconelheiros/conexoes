export type CustomerStore = {
  slug: string;
  name: string;
  lastOrderAt: string;
};

export type Customer = {
  id: string;
  name: string;
  phone: string;
  cep: string;
  number: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  stores: CustomerStore[];
  createdAt: string;
  updatedAt: string;
};

const KEY = "conexao-customers";

function daysAgo(days: number) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

function seedCustomers(): Customer[] {
  return [
    {
      id: "cli-mariana",
      name: "Mariana Costa",
      phone: "14997651234",
      cep: "17500-021",
      number: "318",
      street: "Rua Nove de Julho",
      neighborhood: "Centro",
      city: "Marília",
      state: "SP",
      stores: [
        {
          slug: "orly-bagueteria",
          name: "Orly Bagueteria",
          lastOrderAt: daysAgo(1),
        },
      ],
      createdAt: daysAgo(18),
      updatedAt: daysAgo(1),
    },
    {
      id: "cli-rafael",
      name: "Rafael Andrade",
      phone: "14998112200",
      cep: "17509-142",
      number: "90",
      street: "Rua Amazonas",
      neighborhood: "Fragata",
      city: "Marília",
      state: "SP",
      stores: [
        {
          slug: "rocca-barbearia",
          name: "Rocca Barbearia",
          lastOrderAt: daysAgo(3),
        },
        {
          slug: "orly-bagueteria",
          name: "Orly Bagueteria",
          lastOrderAt: daysAgo(12),
        },
      ],
      createdAt: daysAgo(40),
      updatedAt: daysAgo(3),
    },
    {
      id: "cli-camila",
      name: "Camila Ferreira",
      phone: "14991004567",
      cep: "17512-210",
      number: "1540",
      street: "Avenida das Esmeraldas",
      neighborhood: "Jardim América",
      city: "Marília",
      state: "SP",
      stores: [
        {
          slug: "cheia-de-charme",
          name: "Cheia de Charme",
          lastOrderAt: daysAgo(2),
        },
      ],
      createdAt: daysAgo(9),
      updatedAt: daysAgo(2),
    },
    {
      id: "cli-lucas",
      name: "Lucas Oliveira",
      phone: "14998880011",
      cep: "17519-000",
      number: "672",
      street: "Avenida João Martins Coelho",
      neighborhood: "Jardim Santa Antonieta",
      city: "Marília",
      state: "SP",
      stores: [
        {
          slug: "pizzaria-marilia",
          name: "Pizzaria Marília",
          lastOrderAt: daysAgo(4),
        },
      ],
      createdAt: daysAgo(22),
      updatedAt: daysAgo(4),
    },
    {
      id: "cli-patricia",
      name: "Patrícia Nogueira",
      phone: "14997443321",
      cep: "17506-000",
      number: "45",
      street: "Rua São Luiz",
      neighborhood: "Alto Cafezal",
      city: "Marília",
      state: "SP",
      stores: [
        {
          slug: "masc-pro",
          name: "Masc PRO",
          lastOrderAt: daysAgo(6),
        },
        {
          slug: "cheia-de-charme",
          name: "Cheia de Charme",
          lastOrderAt: daysAgo(15),
        },
      ],
      createdAt: daysAgo(31),
      updatedAt: daysAgo(6),
    },
    {
      id: "cli-bruno",
      name: "Bruno Teixeira",
      phone: "14999775544",
      cep: "17515-000",
      number: "210",
      street: "Rua Sampaio Vidal",
      neighborhood: "Centro",
      city: "Marília",
      state: "SP",
      stores: [
        {
          slug: "top-frio",
          name: "Top Frio",
          lastOrderAt: daysAgo(5),
        },
      ],
      createdAt: daysAgo(14),
      updatedAt: daysAgo(5),
    },
    {
      id: "cli-helena",
      name: "Helena Martins",
      phone: "14996543210",
      cep: "17504-000",
      number: "88",
      street: "Rua Paes Leme",
      neighborhood: "Centro",
      city: "Marília",
      state: "SP",
      stores: [
        {
          slug: "orly-bagueteria",
          name: "Orly Bagueteria",
          lastOrderAt: daysAgo(0),
        },
        {
          slug: "pizzaria-marilia",
          name: "Pizzaria Marília",
          lastOrderAt: daysAgo(8),
        },
      ],
      createdAt: daysAgo(27),
      updatedAt: daysAgo(0),
    },
  ];
}

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event("conexao-commerce"));
}

export function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function formatAddress(customer: Pick<
  Customer,
  "street" | "number" | "neighborhood" | "city" | "state"
>) {
  const street = [customer.street, customer.number].filter(Boolean).join(", ");
  const city = [customer.city, customer.state].filter(Boolean).join(" - ");
  return [street, customer.neighborhood, city].filter(Boolean).join(" · ");
}

export function getCustomers(): Customer[] {
  const stored = readJson<Customer[] | null>(KEY, null);
  if (stored && stored.length > 0) return stored;

  const seed = seedCustomers();
  if (typeof window !== "undefined") writeJson(KEY, seed);
  return seed;
}

export function getStoreCustomers(storeSlug: string): Customer[] {
  return getCustomers()
    .filter((customer) =>
      customer.stores.some((store) => store.slug === storeSlug),
    )
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function upsertCustomer(
  input: Omit<Customer, "id" | "stores" | "createdAt" | "updatedAt">,
  store: { slug: string; name: string },
) {
  const phone = input.phone.replace(/\D/g, "");
  const now = new Date().toISOString();
  const customers = getCustomers();
  const existing = customers.find((customer) => customer.phone === phone);

  if (existing) {
    const stores = existing.stores.filter((item) => item.slug !== store.slug);
    const next: Customer = {
      ...existing,
      name: input.name,
      phone,
      cep: input.cep,
      number: input.number,
      street: input.street,
      neighborhood: input.neighborhood,
      city: input.city,
      state: input.state,
      stores: [{ slug: store.slug, name: store.name, lastOrderAt: now }, ...stores],
      updatedAt: now,
    };
    writeJson(
      KEY,
      customers.map((customer) =>
        customer.id === existing.id ? next : customer,
      ),
    );
    return next;
  }

  const created: Customer = {
    id: `cli-${phone}-${Date.now()}`,
    name: input.name,
    phone,
    cep: input.cep,
    number: input.number,
    street: input.street,
    neighborhood: input.neighborhood,
    city: input.city,
    state: input.state,
    stores: [{ slug: store.slug, name: store.name, lastOrderAt: now }],
    createdAt: now,
    updatedAt: now,
  };

  writeJson(KEY, [created, ...customers]);
  return created;
}
