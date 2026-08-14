import { formatCep } from "@/lib/cep";
import { getShopUser, saveShopUser, type ShopUser } from "@/lib/commerce";

const KEY = "conexao-profiles";

export const LIKE_SUGGESTIONS = [
  "Café",
  "Pizza",
  "Churrasco",
  "Moda",
  "Beleza",
  "Música",
  "Cinema",
  "Esportes",
  "Pets",
  "Tecnologia",
  "Gastronomia",
  "Viagem",
];

export const DESIRE_SUGGESTIONS = [
  "Cashback",
  "Desconto em restaurantes",
  "Novidades de moda",
  "Promoções da semana",
  "Eventos na cidade",
  "Delivery",
  "Salão e estética",
  "Serviços para casa",
];

export const PLACE_SUGGESTIONS = [
  "Centro",
  "Shopping",
  "Academia",
  "Padaria",
  "Parque",
  "Trabalho",
  "Faculdade",
  "Mercado",
];

export const DOCUMENT_KINDS = [
  "RG",
  "CPF",
  "CNH",
  "Comprovante de residência",
  "Outro",
] as const;

export type ProfileDocument = {
  id: string;
  name: string;
  kind: (typeof DOCUMENT_KINDS)[number] | string;
  dataUrl?: string;
  addedAt: string;
};

export type UserProfileData = ShopUser & {
  email: string;
  bio: string;
  birthDate: string;
  avatar: string;
  photos: string[];
  likes: string[];
  desires: string[];
  places: string[];
  documents: ProfileDocument[];
  marketingAccepted: boolean;
  marketingAcceptedAt: string | null;
};

const emptyProfile = (email = ""): UserProfileData => ({
  name: "",
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
});

function readAll(): Record<string, UserProfileData> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Record<string, UserProfileData>) : {};
  } catch {
    return {};
  }
}

function writeAll(value: Record<string, UserProfileData>) {
  localStorage.setItem(KEY, JSON.stringify(value));
  window.dispatchEvent(new Event("conexao-commerce"));
}

export function getUserProfile(email: string): UserProfileData {
  const key = email.trim().toLowerCase();
  const stored = readAll()[key];
  const shop = getShopUser();
  const base = emptyProfile(key);

  return {
    ...base,
    ...shop,
    ...stored,
    email: key,
  };
}

export function saveUserProfile(profile: UserProfileData) {
  const key = profile.email.trim().toLowerCase();
  const next: UserProfileData = {
    ...profile,
    email: key,
    phone: profile.phone.replace(/\D/g, ""),
    cep: formatCep(profile.cep),
  };

  const all = readAll();
  all[key] = next;
  writeAll(all);

  if (next.name.trim() && next.phone.replace(/\D/g, "").length >= 10) {
    saveShopUser({
      name: next.name,
      phone: next.phone,
      cep: next.cep,
      number: next.number,
      street: next.street,
      neighborhood: next.neighborhood,
      city: next.city,
      state: next.state,
    });
  }

  return next;
}

export function toggleTag(list: string[], value: string) {
  const item = value.trim();
  if (!item) return list;
  return list.includes(item)
    ? list.filter((entry) => entry !== item)
    : [...list, item];
}

export async function fileToDataUrl(
  file: File,
  options?: { maxSize?: number; imageMax?: number },
) {
  const maxSize = options?.maxSize ?? 900_000;
  if (file.size > maxSize && !file.type.startsWith("image/")) {
    throw new Error("Arquivo grande demais. Use até 900 KB.");
  }

  if (file.type.startsWith("image/")) {
    return compressImage(file, options?.imageMax ?? 720);
  }

  return readAsDataUrl(file);
}

function readAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(new Error("Não foi possível ler o arquivo."));
    reader.readAsDataURL(file);
  });
}

function compressImage(file: File, max: number) {
  return new Promise<string>((resolve, reject) => {
    const image = new Image();
    const url = URL.createObjectURL(file);
    image.onload = () => {
      const scale = Math.min(1, max / Math.max(image.width, image.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      const context = canvas.getContext("2d");
      if (!context) {
        URL.revokeObjectURL(url);
        reject(new Error("Não foi possível tratar a foto."));
        return;
      }
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.82));
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Foto inválida."));
    };
    image.src = url;
  });
}
