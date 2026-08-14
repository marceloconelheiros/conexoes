import { promises as fs } from "fs";
import path from "path";

export type UserAccount = {
  id: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
};

const FILE = path.join(process.cwd(), "data", "users.json");
const DEFAULT_PASSWORD = process.env.USER_PASSWORD ?? "ConexaoUser";

const SEED: UserAccount[] = [
  {
    id: "cli-mariana",
    name: "Mariana Costa",
    email: "mariana@email.com",
    password: DEFAULT_PASSWORD,
    phone: "14997651234",
  },
  {
    id: "cli-rafael",
    name: "Rafael Andrade",
    email: "rafael@email.com",
    password: DEFAULT_PASSWORD,
    phone: "14998112200",
  },
];

let cache: UserAccount[] | null = null;

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

async function readAll(): Promise<UserAccount[]> {
  if (cache) return cache;

  try {
    const raw = await fs.readFile(FILE, "utf8");
    const parsed = JSON.parse(raw) as UserAccount[];
    if (Array.isArray(parsed) && parsed.length > 0) {
      cache = parsed;
      return cache;
    }
  } catch {
    /* first run or empty file */
  }

  cache = SEED.map((account) => ({ ...account }));
  return cache;
}

async function writeAll(accounts: UserAccount[]) {
  cache = accounts;
  try {
    await fs.mkdir(path.dirname(FILE), { recursive: true });
    await fs.writeFile(FILE, JSON.stringify(accounts, null, 2), "utf8");
  } catch {
    /* serverless / read-only: keep in memory for this process */
  }
}

export async function findUser(email: string, password: string) {
  const accounts = await readAll();
  const normalized = normalizeEmail(email);
  return (
    accounts.find(
      (account) =>
        account.email === normalized && account.password === password,
    ) ?? null
  );
}

export async function findUserByEmail(email: string) {
  const accounts = await readAll();
  return (
    accounts.find((account) => account.email === normalizeEmail(email)) ?? null
  );
}

export async function findUserById(id: string) {
  const accounts = await readAll();
  return accounts.find((account) => account.id === id) ?? null;
}

export async function createUser(input: {
  name: string;
  email: string;
  password: string;
  phone?: string;
}) {
  const email = normalizeEmail(input.email);
  const accounts = await readAll();
  if (accounts.some((account) => account.email === email)) {
    return { error: "Este e-mail já tem cadastro." as const };
  }

  const created: UserAccount = {
    id: `cli-${Date.now()}`,
    name: input.name.trim(),
    email,
    password: input.password,
    phone: input.phone?.replace(/\D/g, "") || undefined,
  };

  await writeAll([created, ...accounts]);
  return { account: created };
}

export async function updateUserPassword(
  id: string,
  currentPassword: string,
  nextPassword: string,
) {
  const accounts = await readAll();
  const account = accounts.find((item) => item.id === id);
  if (!account) return { error: "Conta não encontrada." as const };
  if (account.password !== currentPassword) {
    return { error: "Senha atual inválida." as const };
  }

  await writeAll(
    accounts.map((item) =>
      item.id === id ? { ...item, password: nextPassword } : item,
    ),
  );
  return { ok: true as const };
}

export async function updateUserName(id: string, name: string) {
  const accounts = await readAll();
  await writeAll(
    accounts.map((item) =>
      item.id === id ? { ...item, name: name.trim() } : item,
    ),
  );
}
