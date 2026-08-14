import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { updateUserPassword } from "@/lib/user-store";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (session?.role !== "user") {
    return Response.json({ error: "Entre na sua conta para alterar a senha." }, { status: 401 });
  }

  const body = (await request.json()) as {
    currentPassword?: string;
    nextPassword?: string;
  };

  const currentPassword = body.currentPassword ?? "";
  const nextPassword = body.nextPassword ?? "";

  if (nextPassword.length < 6) {
    return Response.json(
      { error: "A nova senha precisa ter pelo menos 6 caracteres." },
      { status: 400 },
    );
  }

  if (currentPassword === nextPassword) {
    return Response.json(
      { error: "A nova senha precisa ser diferente da atual." },
      { status: 400 },
    );
  }

  const result = await updateUserPassword(
    session.id,
    currentPassword,
    nextPassword,
  );

  if ("error" in result) {
    return Response.json({ error: result.error }, { status: 400 });
  }

  return Response.json({ ok: true });
}
