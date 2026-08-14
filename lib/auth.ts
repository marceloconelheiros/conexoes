import { cookies } from "next/headers";
import {
  encodeSession,
  parseSession,
  SESSION_COOKIE,
  type Session,
} from "@/lib/session";

export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  return parseSession(store.get(SESSION_COOKIE)?.value);
}

export async function setSession(session: Session) {
  const store = await cookies();
  store.set(SESSION_COOKIE, encodeSession(session), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    secure: process.env.NODE_ENV === "production",
  });
}

export async function clearSession() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}
