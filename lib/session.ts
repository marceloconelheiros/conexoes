export const SESSION_COOKIE = "cn_session";

export type AdminSession = {
  role: "admin";
  id: "owner" | "partner";
  name: string;
  email: string;
};

export type StoreSession = {
  role: "store";
  slug: string;
  name: string;
};

export type Session = AdminSession | StoreSession;

export function encodeSession(session: Session) {
  return Buffer.from(JSON.stringify(session), "utf8").toString("base64url");
}

export function parseSession(value?: string | null): Session | null {
  if (!value) return null;
  try {
    const raw = Buffer.from(value, "base64url").toString("utf8");
    const data = JSON.parse(raw) as Session;
    if (data.role === "admin" && data.email && data.id) return data;
    if (data.role === "store" && data.slug && data.name) return data;
    return null;
  } catch {
    return null;
  }
}
