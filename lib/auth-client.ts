"use client";

export const AUTH_EVENT = "conexao-auth";

export function notifyAuth() {
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export async function logout() {
  await fetch("/api/auth/logout", { method: "POST" });
  notifyAuth();
  window.location.assign("/perfil");
}
