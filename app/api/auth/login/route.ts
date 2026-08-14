import { NextRequest } from "next/server";
import { findAdmin, STORE_PASSWORD } from "@/data/accounts";
import { getBusinessBySlug } from "@/data/businesses";
import { setSession } from "@/lib/auth";
import { createUser, findUser } from "@/lib/user-store";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    role?: string;
    email?: string;
    password?: string;
    slug?: string;
    name?: string;
    action?: string;
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

  if (body.role === "user") {
    const email = (body.email ?? "").trim().toLowerCase();
    const name = (body.name ?? "").trim();

    if (!email || !password) {
      return Response.json(
        { error: "Informe e-mail e senha." },
        { status: 400 },
      );
    }

    if (body.action === "register") {
      if (name.length < 2) {
        return Response.json(
          { error: "Informe seu nome completo." },
          { status: 400 },
        );
      }
      if (password.length < 6) {
        return Response.json(
          { error: "A senha precisa ter pelo menos 6 caracteres." },
          { status: 400 },
        );
      }

      const created = await createUser({ name, email, password });
      if ("error" in created) {
        return Response.json({ error: created.error }, { status: 409 });
      }

      await setSession({
        role: "user",
        id: created.account.id,
        name: created.account.name,
        email: created.account.email,
      });

      return Response.json({
        role: "user",
        name: created.account.name,
        redirect: "/perfil",
      });
    }

    const account = await findUser(email, password);
    if (!account) {
      return Response.json(
        { error: "E-mail ou senha inválidos." },
        { status: 401 },
      );
    }

    await setSession({
      role: "user",
      id: account.id,
      name: account.name,
      email: account.email,
    });

    return Response.json({
      role: "user",
      name: account.name,
      redirect: "/perfil",
    });
  }

  return Response.json({ error: "Informe o tipo de acesso." }, { status: 400 });
}
