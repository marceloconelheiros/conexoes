import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parseSession, SESSION_COOKIE } from "@/lib/session";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = parseSession(request.cookies.get(SESSION_COOKIE)?.value);

  if (pathname.startsWith("/admin")) {
    if (session?.role !== "admin") {
      const url = request.nextUrl.clone();
      url.pathname = "/perfil";
      url.searchParams.set("next", "/admin");
      return NextResponse.redirect(url);
    }
  }

  if (pathname.includes("/painel")) {
    const storeMatch = pathname.match(/^\/empresa\/([^/]+)\/painel/);
    const slug = storeMatch?.[1];
    const allowed =
      session?.role === "admin" ||
      (session?.role === "store" && session.slug === slug);

    if (!allowed) {
      const url = request.nextUrl.clone();
      url.pathname = "/perfil";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/empresa/:slug/painel"],
};
