import { getStoreAnalytics, summarizeAnalytics } from "./analytics";
import type { Business, BusinessPlan } from "./businesses";

export type StoreClass = "ouro" | "prata" | "bronze";

export const CLASS_LABEL: Record<StoreClass, string> = {
  ouro: "Classe Ouro",
  prata: "Classe Prata",
  bronze: "Classe Bronze",
};

const CASHBACK_RATE: Record<BusinessPlan, number> = {
  premium: 0.05,
  partner: 0.04,
  pro: 0.03,
  start: 0.02,
};

const PLAN_SCORE: Record<BusinessPlan, number> = {
  premium: 40,
  partner: 32,
  pro: 24,
  start: 12,
};

export type RankedStore = {
  business: Business;
  rate: number;
  storeClass: StoreClass;
  score: number;
};

export function getCashbackRate(plan: BusinessPlan): number {
  return CASHBACK_RATE[plan];
}

export function formatCashbackRate(rate: number): string {
  return `${Math.round(rate * 100)}%`;
}

export function getStoreClass(score: number, plan: BusinessPlan): StoreClass {
  if (plan === "premium" || score >= 88) return "ouro";
  if (plan === "pro" || plan === "partner" || score >= 58) return "prata";
  return "bronze";
}

export function getCashierCode(slug: string, day = new Date().toISOString().slice(0, 10)): string {
  let hash = 2166136261;
  const value = `${slug}:${day}`;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  const prefix = slug.replace(/-/g, "").slice(0, 4).toUpperCase();
  return `${prefix}-${String((hash >>> 0) % 10000).padStart(4, "0")}`;
}

export function rankStores(businesses: Business[]): RankedStore[] {
  return businesses
    .map((business) => {
      const movement = summarizeAnalytics(getStoreAnalytics(business.slug, 30));
      const rate = getCashbackRate(business.plan);
      const score =
        PLAN_SCORE[business.plan] +
        rate * 420 +
        movement.clicks * 0.08 +
        movement.interactions * 0.12;
      return {
        business,
        rate,
        score,
        storeClass: getStoreClass(score, business.plan),
      };
    })
    .sort((a, b) => b.score - a.score);
}

export function getStoreRank(businesses: Business[], slug: string): RankedStore | undefined {
  return rankStores(businesses).find((item) => item.business.slug === slug);
}

export function cashbackCents(amountReais: number, rate: number): number {
  return Math.max(1, Math.round(amountReais * rate * 100));
}
