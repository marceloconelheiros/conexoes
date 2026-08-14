/**
 * Contas da operação. Só o servidor usa este arquivo.
 * Trocar e-mails/senhas depois, ou mover para variáveis de ambiente.
 */

export const ADMIN_ACCOUNTS = [
  {
    id: "owner" as const,
    name: "Administrador",
    email: "admin@conexaonegocio.top",
    password: process.env.ADMIN_PASSWORD ?? "ConexaoAdmin",
  },
  {
    id: "partner" as const,
    name: "Sócio",
    email: "socio@conexaonegocio.top",
    password: process.env.SOCIO_PASSWORD ?? "ConexaoSocio",
  },
];

export const STORE_PASSWORD = process.env.STORE_PASSWORD ?? "ConexaoLoja";

export function findAdmin(email: string, password: string) {
  const normalized = email.trim().toLowerCase();
  return ADMIN_ACCOUNTS.find(
    (account) =>
      account.email === normalized && account.password === password,
  );
}
