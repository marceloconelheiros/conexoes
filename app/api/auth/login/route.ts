import { NextRequest } from "next/server";
import { findAdmin, STORE_PASSWORD } from "@/data/accounts";
import { getBusinessBySlug } from "@/data/businesses";
import { setSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    role?: string;
    email?: string;
    password?: string;
    slug?: string;
  };

  const password = body.password ?? "";

  if (body.role === "admin") {
    const account = findAdmin(body.email ?? "", password);
    if (!account) {
      return Response.json(
        { error: "E-mail ou senha inválidos." },
        { status: 401 },
      );
    }

    await setSession({
      role: "admin",
      id: account.id,
      name: account.name,
      email: account.email,
    });

    return Response.json({
      role: "admin",
      name: account.name,
      redirect: "/admin",
    });
  }

  if (body.role === "store") {
    const business = await getBusinessBySlug(body.slug ?? "");
    if (!business || password !== STORE_PASSWORD) {
      return Response.json(
        { error: "Loja ou senha inválidos." },
        { status: 401 },
      );
    }

    await setSession({
      role: "store",
      slug: business.slug,
      name: business.name,
    });

    return Response.json({
      role: "store",
      name: business.name,
      redirect: "/perfil",
    });
  }

  return Response.json({ error: "Informe o tipo de acesso." }, { status: 400 });
}
