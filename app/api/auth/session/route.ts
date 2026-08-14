import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) return Response.json({ session: null });

  if (session.role === "admin") {
    return Response.json({
      session: {
        role: session.role,
        name: session.name,
        email: session.email,
      },
    });
  }

  if (session.role === "user") {
    return Response.json({
      session: {
        role: session.role,
        name: session.name,
        email: session.email,
        id: session.id,
      },
    });
  }

  return Response.json({
    session: {
      role: session.role,
      name: session.name,
      slug: session.slug,
    },
  });
}
