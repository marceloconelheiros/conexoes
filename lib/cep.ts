export type CepAddress = {
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
};

export function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

export function formatCep(value: string) {
  const digits = digitsOnly(value).slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

export function isCompleteCep(value: string) {
  return digitsOnly(value).length === 8;
}

export async function lookupCep(cep: string): Promise<CepAddress | null> {
  const digits = digitsOnly(cep);
  if (digits.length !== 8) return null;

  const response = await fetch(`/api/cep/${digits}`);
  if (!response.ok) return null;

  const data = (await response.json()) as Partial<CepAddress> & {
    error?: string;
  };
  if (data.error || !data.city) return null;

  return {
    cep: data.cep ?? digits,
    street: data.street ?? "",
    neighborhood: data.neighborhood ?? "",
    city: data.city,
    state: data.state ?? "",
  };
}
