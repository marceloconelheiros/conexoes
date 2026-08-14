"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { AccountBar } from "@/components/AccountBar";
import {
  clearBrowseHistory,
  formatBrowseTime,
  getBrowseHistory,
  type BrowseEntry,
} from "@/lib/browse";
import { digitsOnly, formatCep, isCompleteCep, lookupCep } from "@/lib/cep";
import { formatPhone } from "@/lib/customers";
import {
  DESIRE_SUGGESTIONS,
  DOCUMENT_KINDS,
  LIKE_SUGGESTIONS,
  PLACE_SUGGESTIONS,
  fileToDataUrl,
  getUserProfile,
  saveUserProfile,
  toggleTag,
  type UserProfileData,
} from "@/lib/profile";

type UserProfileProps = {
  email: string;
  name: string;
};

export function UserProfile({ email, name }: UserProfileProps) {
  const [profile, setProfile] = useState<UserProfileData>(() => ({
    ...emptyFallback(email, name),
  }));
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");
  const [cepStatus, setCepStatus] = useState("");
  const [customLike, setCustomLike] = useState("");
  const [customDesire, setCustomDesire] = useState("");
  const [customPlace, setCustomPlace] = useState("");
  const [docKind, setDocKind] = useState<(typeof DOCUMENT_KINDS)[number]>("RG");
  const [history, setHistory] = useState<BrowseEntry[]>([]);
  const [currentPassword, setCurrentPassword] = useState("");
  const [nextPassword, setNextPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordNotice, setPasswordNotice] = useState("");
  const [passwordPending, setPasswordPending] = useState(false);
  const avatarRef = useRef<HTMLInputElement>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const docRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = getUserProfile(email);
    setProfile({
      ...stored,
      name: stored.name || name,
      email,
    });
    setHistory(getBrowseHistory());
    setReady(true);

    const syncBrowse = () => setHistory(getBrowseHistory());
    window.addEventListener("conexao-browse", syncBrowse);
    return () => window.removeEventListener("conexao-browse", syncBrowse);
  }, [email, name]);

  function patch(next: Partial<UserProfileData>) {
    setProfile((current) => ({ ...current, ...next }));
    setNotice("");
  }

  async function onCepChange(value: string) {
    const cep = formatCep(value);
    patch({ cep });
    setCepStatus("");
    if (!isCompleteCep(cep)) return;

    setCepStatus("Buscando endereço...");
    const address = await lookupCep(cep);
    if (!address) {
      setCepStatus("CEP não encontrado. Preencha rua, bairro e cidade.");
      return;
    }

    setProfile((current) => {
      if (digitsOnly(current.cep) !== digitsOnly(cep)) return current;
      return {
        ...current,
        cep: formatCep(address.cep),
        street: address.street,
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state,
      };
    });
    setCepStatus(
      address.street
        ? "Endereço preenchido pelo CEP."
        : "Cidade encontrada. Complete a rua se precisar.",
    );
  }

  function persist(
    updater: UserProfileData | ((current: UserProfileData) => UserProfileData),
    message?: string,
  ) {
    setProfile((current) => {
      const next =
        typeof updater === "function" ? updater(current) : updater;
      return saveUserProfile(next);
    });
    if (message) setNotice(message);
  }

  function save() {
    persist(profile, "Perfil salvo neste aparelho.");
  }

  async function onAvatar(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      const avatar = await fileToDataUrl(file, { imageMax: 480 });
      persist((current) => ({ ...current, avatar }));
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Foto inválida.");
    }
  }

  async function onPhotos(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (files.length === 0) return;
    try {
      const extras: string[] = [];
      for (const file of files.slice(0, 6 - profile.photos.length)) {
        extras.push(await fileToDataUrl(file, { imageMax: 720 }));
      }
      persist((current) => ({
        ...current,
        photos: [...current.photos, ...extras].slice(0, 6),
      }));
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Foto inválida.");
    }
  }

  async function onDocument(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      const dataUrl = await fileToDataUrl(file);
      persist((current) => ({
        ...current,
        documents: [
          {
            id: `doc-${Date.now()}`,
            name: file.name,
            kind: docKind,
            dataUrl,
            addedAt: new Date().toISOString(),
          },
          ...current.documents,
        ],
      }));
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Documento inválido.");
    }
  }

  function acceptMarketing() {
    persist(
      (current) => ({
        ...current,
        marketingAccepted: true,
        marketingAcceptedAt: new Date().toISOString(),
      }),
      "Termo aceito. Os parceiros podem usar seus dados para marketing.",
    );
  }

  function revokeMarketing() {
    persist(
      (current) => ({
        ...current,
        marketingAccepted: false,
        marketingAcceptedAt: null,
      }),
      "Consentimento revogado.",
    );
  }

  async function onPassword(event: FormEvent) {
    event.preventDefault();
    setPasswordNotice("");
    if (nextPassword !== confirmPassword) {
      setPasswordNotice("A confirmação não bate com a nova senha.");
      return;
    }

    setPasswordPending(true);
    const response = await fetch("/api/auth/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, nextPassword }),
    });
    const data = (await response.json()) as { error?: string };
    setPasswordPending(false);

    if (!response.ok) {
      setPasswordNotice(data.error ?? "Não foi possível alterar a senha.");
      return;
    }

    setCurrentPassword("");
    setNextPassword("");
    setConfirmPassword("");
    setPasswordNotice("Senha alterada.");
  }

  if (!ready) {
    return (
      <p className="text-sm text-muted">Carregando seu perfil...</p>
    );
  }

  return (
    <div className="space-y-10">
      <AccountBar
        name={profile.name || name}
        detail={`${email} · conta de cliente`}
      />

      <section>
        <p className="font-sans text-[11px] tracking-[0.38em] text-gold uppercase">
          Área do cliente
        </p>
        <h1 className="mt-6 font-display text-[clamp(2rem,5.5vw,3.8rem)] leading-[0.92] font-medium tracking-[0.04em] text-foreground uppercase">
          Seu perfil
        </h1>
        <p className="mt-6 max-w-xl text-base leading-8 text-muted">
          Fotos, gostos, documentos, lugares e o histórico da navegação. Os
          parceiros só usam esses dados para marketing se você aceitar o termo.
        </p>
      </section>

      <Section title="Fotos e dados" kicker="Cadastro">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <button
            type="button"
            onClick={() => avatarRef.current?.click()}
            className="group relative h-28 w-28 shrink-0 overflow-hidden border border-line bg-background/70"
          >
            {profile.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.avatar}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="flex h-full items-center justify-center font-display text-3xl text-gold">
                {(profile.name || name).slice(0, 1).toUpperCase()}
              </span>
            )}
            <span className="absolute inset-x-0 bottom-0 bg-background/80 py-1 text-[9px] tracking-[0.16em] text-gold uppercase">
              Foto
            </span>
          </button>
          <input
            ref={avatarRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => void onAvatar(event)}
          />
          <p className="max-w-sm text-sm leading-7 text-muted">
            A foto de perfil aparece na sua conta. Você também pode guardar
            até 6 fotos da rotina.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {profile.photos.map((photo, index) => (
            <div key={`${photo.slice(0, 24)}-${index}`} className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo} alt="" className="h-36 w-full object-cover" />
              <button
                type="button"
                onClick={() =>
                  persist((current) => ({
                    ...current,
                    photos: current.photos.filter((_, item) => item !== index),
                  }))
                }
                className="absolute top-2 right-2 bg-background/80 px-2 py-1 text-[9px] tracking-[0.16em] text-gold uppercase"
              >
                Tirar
              </button>
            </div>
          ))}
          {profile.photos.length < 6 ? (
            <button
              type="button"
              onClick={() => photoRef.current?.click()}
              className="flex h-36 items-center justify-center border border-dashed border-line text-[10px] tracking-[0.18em] text-muted uppercase hover:border-gold/45 hover:text-gold"
            >
              Adicionar foto
            </button>
          ) : null}
          <input
            ref={photoRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(event) => void onPhotos(event)}
          />
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Field
            label="Nome"
            value={profile.name}
            onChange={(value) => patch({ name: value })}
            autoComplete="name"
          />
          <Field
            label="WhatsApp"
            value={formatPhone(profile.phone)}
            onChange={(value) => patch({ phone: value })}
            autoComplete="tel"
          />
          <label className="block sm:col-span-2">
            <span className="font-sans text-[10px] tracking-[0.2em] text-gold uppercase">
              Sobre você
            </span>
            <textarea
              value={profile.bio}
              onChange={(event) => patch({ bio: event.target.value })}
              rows={3}
              className="mt-3 w-full border border-line bg-background/70 px-4 py-3 text-sm outline-none focus:border-gold/55"
            />
          </label>
          <Field
            label="Nascimento"
            value={profile.birthDate}
            onChange={(value) => patch({ birthDate: value })}
            type="date"
          />
          <div className="grid grid-cols-[1fr_5.5rem] gap-3">
            <Field
              label="CEP"
              value={profile.cep}
              onChange={(value) => void onCepChange(value)}
              autoComplete="postal-code"
            />
            <Field
              label="Nº"
              value={profile.number}
              onChange={(value) => patch({ number: value })}
            />
          </div>
          <Field
            label="Rua"
            value={profile.street}
            onChange={(value) => patch({ street: value })}
            autoComplete="address-line1"
          />
          <Field
            label="Bairro"
            value={profile.neighborhood}
            onChange={(value) => patch({ neighborhood: value })}
          />
          <Field
            label="Cidade"
            value={profile.city}
            onChange={(value) => patch({ city: value })}
          />
          <Field
            label="Estado"
            value={profile.state}
            onChange={(value) => patch({ state: value })}
          />
        </div>
        {cepStatus ? (
          <p className="mt-3 text-xs leading-5 text-gold-soft">{cepStatus}</p>
        ) : null}
        <SaveButton onClick={save} />
      </Section>

      <Section title="Gostos" kicker="Preferências">
        <p className="text-sm leading-7 text-muted">
          O que você curte na cidade. Os parceiros usam isso só depois do
          termo de marketing.
        </p>
        <ChipGroup
          suggestions={LIKE_SUGGESTIONS}
          selected={profile.likes}
          custom={customLike}
          onCustom={setCustomLike}
          onToggle={(value) => patch({ likes: toggleTag(profile.likes, value) })}
        />
        <SaveButton onClick={save} />
      </Section>

      <Section title="Desejos" kicker="O que procura">
        <p className="text-sm leading-7 text-muted">
          Ofertas, cashback e novidades que você quer receber.
        </p>
        <ChipGroup
          suggestions={DESIRE_SUGGESTIONS}
          selected={profile.desires}
          custom={customDesire}
          onCustom={setCustomDesire}
          onToggle={(value) =>
            patch({ desires: toggleTag(profile.desires, value) })
          }
        />
        <SaveButton onClick={save} />
      </Section>

      <Section title="Documentos" kicker="Arquivos">
        <p className="text-sm leading-7 text-muted">
          RG, CPF, CNH ou comprovante ficam neste aparelho para você
          reutilizar nos cadastros da rede.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <select
            value={docKind}
            onChange={(event) =>
              setDocKind(event.target.value as (typeof DOCUMENT_KINDS)[number])
            }
            className="h-12 border border-line bg-background/70 px-4 text-sm outline-none focus:border-gold/55"
          >
            {DOCUMENT_KINDS.map((kind) => (
              <option key={kind} value={kind}>
                {kind}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => docRef.current?.click()}
            className="h-12 border border-line px-5 text-[10px] tracking-[0.18em] text-gold uppercase hover:border-gold/45"
          >
            Enviar arquivo
          </button>
          <input
            ref={docRef}
            type="file"
            accept="image/*,.pdf"
            className="hidden"
            onChange={(event) => void onDocument(event)}
          />
        </div>
        <ul className="mt-6 divide-y divide-[rgba(198,166,103,0.18)] border-y border-line">
          {profile.documents.length === 0 ? (
            <li className="py-5 text-sm text-muted">Nenhum documento ainda.</li>
          ) : (
            profile.documents.map((doc) => (
              <li
                key={doc.id}
                className="flex items-center justify-between gap-4 py-4"
              >
                <div>
                  <p className="text-sm text-foreground">{doc.kind}</p>
                  <p className="mt-1 text-xs text-muted">{doc.name}</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    persist((current) => ({
                      ...current,
                      documents: current.documents.filter(
                        (item) => item.id !== doc.id,
                      ),
                    }))
                  }
                  className="text-[10px] tracking-[0.16em] text-gold uppercase"
                >
                  Remover
                </button>
              </li>
            ))
          )}
        </ul>
        <SaveButton onClick={save} />
      </Section>

      <Section title="Lugares que frequenta" kicker="Rotina">
        <p className="text-sm leading-7 text-muted">
          Bairro, shopping, academia, padaria — o mapa da sua semana.
        </p>
        <ChipGroup
          suggestions={PLACE_SUGGESTIONS}
          selected={profile.places}
          custom={customPlace}
          onCustom={setCustomPlace}
          onToggle={(value) =>
            patch({ places: toggleTag(profile.places, value) })
          }
        />
        <SaveButton onClick={save} />
      </Section>

      <Section title="Onde navegou" kicker="Histórico">
        <p className="text-sm leading-7 text-muted">
          Páginas da Conexão Negócios abertas neste aparelho.
        </p>
        <ul className="mt-6 divide-y divide-[rgba(198,166,103,0.18)] border-y border-line">
          {history.length === 0 ? (
            <li className="py-5 text-sm text-muted">
              Ainda não há navegação registrada.
            </li>
          ) : (
            history.slice(0, 18).map((entry) => (
              <li
                key={`${entry.path}-${entry.at}`}
                className="flex items-baseline justify-between gap-4 py-4"
              >
                <div>
                  <p className="text-sm text-foreground">{entry.title}</p>
                  <p className="mt-1 font-mono text-[11px] text-muted">
                    {entry.path}
                  </p>
                </div>
                <p className="shrink-0 text-[11px] text-muted">
                  {formatBrowseTime(entry.at)}
                </p>
              </li>
            ))
          )}
        </ul>
        {history.length > 0 ? (
          <button
            type="button"
            onClick={() => {
              clearBrowseHistory();
              setHistory([]);
            }}
            className="mt-6 text-[10px] tracking-[0.18em] text-gold uppercase hover:text-gold-soft"
          >
            Limpar histórico
          </button>
        ) : null}
      </Section>

      <Section title="Alterar senha" kicker="Acesso">
        <form onSubmit={(event) => void onPassword(event)} className="max-w-md space-y-3">
          <Field
            label="Senha atual"
            value={currentPassword}
            onChange={setCurrentPassword}
            type="password"
            autoComplete="current-password"
          />
          <Field
            label="Nova senha"
            value={nextPassword}
            onChange={setNextPassword}
            type="password"
            autoComplete="new-password"
          />
          <Field
            label="Confirmar nova senha"
            value={confirmPassword}
            onChange={setConfirmPassword}
            type="password"
            autoComplete="new-password"
          />
          {passwordNotice ? (
            <p className="text-sm text-gold-soft">{passwordNotice}</p>
          ) : null}
          <button
            type="submit"
            disabled={passwordPending}
            className="mt-2 inline-flex h-11 items-center justify-center bg-gold px-6 text-[10px] tracking-[0.2em] text-background uppercase hover:bg-gold-soft disabled:opacity-60"
          >
            {passwordPending ? "Salvando..." : "Trocar senha"}
          </button>
        </form>
      </Section>

      <Section title="Uso dos dados pelos parceiros" kicker="Marketing">
        <div className="max-w-2xl space-y-4 text-sm leading-7 text-muted">
          <p>
            A Conexão Negócios e as lojas parceiras da rede em Marília podem
            usar nome, contato, bairro, gostos, desejos, lugares frequentados
            e o histórico de navegação neste app para enviar ofertas,
            cashback e comunicação de marketing.
          </p>
          <p>
            Os dados não são vendidos para empresas fora da rede. Você pode
            revogar este consentimento a qualquer momento. Cadastros e
            pedidos feitos nas lojas continuam valendo para a compra.
          </p>
        </div>
        {profile.marketingAccepted ? (
          <div className="mt-8 border border-gold/35 bg-gold/[0.06] px-5 py-5">
            <p className="font-sans text-[10px] tracking-[0.2em] text-gold uppercase">
              Consentimento ativo
            </p>
            <p className="mt-3 text-sm leading-7 text-foreground">
              Você selecionou e aceitou o termo
              {profile.marketingAcceptedAt
                ? ` em ${formatBrowseTime(profile.marketingAcceptedAt)}`
                : ""}
              .
            </p>
            <button
              type="button"
              onClick={revokeMarketing}
              className="mt-4 text-[10px] tracking-[0.18em] text-muted uppercase hover:text-gold"
            >
              Revogar
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={acceptMarketing}
            className="mt-8 inline-flex h-12 items-center justify-center bg-gold px-7 text-[11px] tracking-[0.2em] text-background uppercase hover:bg-gold-soft"
          >
            Seleciono e aceito
          </button>
        )}
      </Section>

      {notice ? <p className="text-sm text-gold-soft">{notice}</p> : null}
    </div>
  );
}

function emptyFallback(email: string, name: string): UserProfileData {
  return {
    name,
    email,
    phone: "",
    bio: "",
    birthDate: "",
    cep: "",
    number: "",
    street: "",
    neighborhood: "",
    city: "",
    state: "",
    avatar: "",
    photos: [],
    likes: [],
    desires: [],
    places: [],
    documents: [],
    marketingAccepted: false,
    marketingAcceptedAt: null,
  };
}

function Section({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border border-line bg-surface/70 px-5 py-7 sm:px-8">
      <p className="font-sans text-[10px] tracking-[0.28em] text-gold uppercase">
        {kicker}
      </p>
      <h2 className="mt-3 font-display text-[1.7rem] leading-tight tracking-[0.04em] text-foreground uppercase">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="font-sans text-[10px] tracking-[0.2em] text-gold uppercase">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        className="mt-3 h-12 w-full border border-line bg-background/70 px-4 text-sm outline-none [color-scheme:dark] focus:border-gold/55"
      />
    </label>
  );
}

function ChipGroup({
  suggestions,
  selected,
  custom,
  onCustom,
  onToggle,
}: {
  suggestions: string[];
  selected: string[];
  custom: string;
  onCustom: (value: string) => void;
  onToggle: (value: string) => void;
}) {
  const extras = selected.filter((item) => !suggestions.includes(item));

  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-2">
        {[...suggestions, ...extras].map((item) => {
          const active = selected.includes(item);
          return (
            <button
              key={item}
              type="button"
              onClick={() => onToggle(item)}
              className={`h-9 px-3 text-[10px] tracking-[0.14em] uppercase ${
                active
                  ? "border border-gold bg-gold/[0.08] text-gold-soft"
                  : "border border-line text-muted hover:border-gold/45 hover:text-foreground"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
      <form
        className="mt-4 flex gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          onToggle(custom);
          onCustom("");
        }}
      >
        <input
          value={custom}
          onChange={(event) => onCustom(event.target.value)}
          placeholder="Outro"
          className="h-11 flex-1 border border-line bg-background/70 px-4 text-sm outline-none focus:border-gold/55"
        />
        <button
          type="submit"
          className="h-11 border border-line px-4 text-[10px] tracking-[0.16em] text-gold uppercase"
        >
          Incluir
        </button>
      </form>
    </div>
  );
}

function SaveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-8 inline-flex h-11 items-center justify-center border border-gold/45 px-6 text-[10px] tracking-[0.2em] text-gold uppercase hover:bg-gold/[0.08]"
    >
      Salvar
    </button>
  );
}
