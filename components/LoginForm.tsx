"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { notifyAuth } from "@/lib/auth-client";

type LoginMode = "user" | "store" | "admin";

type LoginFormProps = {
  stores: { slug: string; name: string }[];
  initialMode?: LoginMode;
};

export function LoginForm({ stores, initialMode = "user" }: LoginFormProps) {
  const router = useRouter();
  const [mode, setMode] = useState<LoginMode>(initialMode);
  const [registering, setRegistering] = useState(false);
  const [slug, setSlug] = useState(stores[0]?.slug ?? "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setPending(true);

    const body =
      mode === "admin"
        ? { role: "admin", email, password }
        : mode === "store"
          ? { role: "store", slug, password }
          : {
              role: "user",
              action: registering ? "register" : "login",
              name,
              email,
              password,
            };

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = (await response.json()) as {
      error?: string;
      redirect?: string;
    };

    setPending(false);

    if (!response.ok) {
      setError(data.error ?? "Não foi possível entrar.");
      return;
    }

    notifyAuth();
    router.push(data.redirect ?? "/perfil");
    router.refresh();
  }

  return (
    <div className="mx-auto w-full max-w-md border border-line bg-surface/70 px-5 py-8 sm:px-8">
      <p className="font-sans text-[10px] tracking-[0.28em] text-gold uppercase">
        Acesso
      </p>
      <h2 className="mt-3 font-display text-[1.8rem] leading-tight tracking-[0.04em] text-foreground uppercase">
        {mode === "user" && registering ? "Criar conta" : "Entrar"}
      </h2>
      <p className="mt-3 text-sm leading-7 text-muted">
        {mode === "user"
          ? "Guarde fotos, gostos, documentos e o histórico da sua navegação na rede."
          : "Anunciante vê a loja no Perfil. Admin é só para a Conexão Negócios."}
      </p>

      <div className="mt-8 grid grid-cols-3 gap-2">
        <ModeButton
          active={mode === "user"}
          onClick={() => setMode("user")}
          label="Cliente"
        />
        <ModeButton
          active={mode === "store"}
          onClick={() => setMode("store")}
          label="Anunciante"
        />
        <ModeButton
          active={mode === "admin"}
          onClick={() => setMode("admin")}
          label="Admin"
        />
      </div>

      <form onSubmit={onSubmit} className="mt-6 space-y-3">
        {mode === "store" ? (
          <label className="block">
            <span className="font-sans text-[10px] tracking-[0.2em] text-gold uppercase">
              Sua loja
            </span>
            <select
              value={slug}
              onChange={(event) => setSlug(event.target.value)}
              className="mt-3 h-12 w-full border border-line bg-background/70 px-4 text-sm text-foreground outline-none focus:border-gold/55"
            >
              {stores.map((store) => (
                <option key={store.slug} value={store.slug}>
                  {store.name}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <>
            {mode === "user" && registering ? (
              <label className="block">
                <span className="font-sans text-[10px] tracking-[0.2em] text-gold uppercase">
                  Nome
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                  className="mt-3 h-12 w-full border border-line bg-background/70 px-4 text-sm outline-none focus:border-gold/55"
                />
              </label>
            ) : null}
            <label className="block">
              <span className="font-sans text-[10px] tracking-[0.2em] text-gold uppercase">
                E-mail
              </span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="username"
                className="mt-3 h-12 w-full border border-line bg-background/70 px-4 text-sm outline-none focus:border-gold/55"
              />
            </label>
          </>
        )}

        <label className="block">
          <span className="font-sans text-[10px] tracking-[0.2em] text-gold uppercase">
            Senha
          </span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete={
              registering ? "new-password" : "current-password"
            }
            className="mt-3 h-12 w-full border border-line bg-background/70 px-4 text-sm outline-none focus:border-gold/55"
          />
        </label>

        {error ? <p className="text-sm text-gold-soft">{error}</p> : null}

        <button
          type="submit"
          disabled={pending}
          className="mt-3 inline-flex h-12 w-full items-center justify-center bg-gold px-5 text-[11px] tracking-[0.2em] text-background uppercase hover:bg-gold-soft disabled:opacity-60"
        >
          {pending
            ? "Aguarde..."
            : mode === "user" && registering
              ? "Criar conta"
              : "Entrar"}
        </button>
      </form>

      {mode === "user" ? (
        <button
          type="button"
          onClick={() => {
            setRegistering((current) => !current);
            setError("");
          }}
          className="mt-5 w-full text-center text-[10px] tracking-[0.18em] text-gold uppercase hover:text-gold-soft"
        >
          {registering ? "Já tenho conta" : "Criar conta de cliente"}
        </button>
      ) : null}
    </div>
  );
}

function ModeButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-10 px-1 text-[9px] font-medium tracking-[0.14em] uppercase transition-colors duration-300 sm:text-[10px] sm:tracking-[0.18em] ${
        active
          ? "border border-gold bg-gold/[0.08] text-gold-soft"
          : "border border-line text-muted hover:border-gold/45 hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}
