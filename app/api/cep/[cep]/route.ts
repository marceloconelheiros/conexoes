import { NextRequest } from "next/server";

type ViaCepResponse = {
  cep?: string;
  logradouro?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  erro?: boolean;
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ cep: string }> },
) {
  const { cep } = await params;
  const digits = cep.replace(/\D/g, "");

  if (digits.length !== 8) {
    return Response.json({ error: "CEP inválido" }, { status: 400 });
  }

  const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`, {
    cache: "force-cache",
  });

  if (!response.ok) {
    return Response.json({ error: "CEP não encontrado" }, { status: 404 });
  }

  const data = (await response.json()) as ViaCepResponse;

  if (data.erro || !data.localidade) {
    return Response.json({ error: "CEP não encontrado" }, { status: 404 });
  }

  return Response.json({
    cep: digits,
    street: data.logradouro ?? "",
    neighborhood: data.bairro ?? "",
    city: data.localidade,
    state: data.uf ?? "",
  });
}
