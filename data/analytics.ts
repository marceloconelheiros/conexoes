export type AnalyticsSource = "todos" | "vitrine" | "telas" | "contato";

export type AnalyticsPeriod = 7 | 15 | 30;

export type DayPoint = {
  date: string;
  label: string;
  views: number;
  clicks: number;
  interactions: number;
  vitrine: number;
  telas: number;
  contato: number;
};

function hashSeed(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function wave(seed: number, day: number, base: number, spread: number) {
  const swing = Math.sin((day + (seed % 9)) / 2.4) * spread;
  const noise = ((seed >> (day % 12)) & 15) - 6;
  return Math.max(2, Math.round(base + swing + noise + day * 0.15));
}

export function getStoreAnalytics(slug: string, days: AnalyticsPeriod = 30): DayPoint[] {
  const seed = hashSeed(slug);
  const now = new Date();
  const weekday = ["D", "S", "T", "Q", "Q", "S", "S"];

  return Array.from({ length: days }, (_, offset) => {
    const day = new Date(now);
    day.setDate(now.getDate() - (days - 1 - offset));
    const views = wave(seed, offset, 18 + (seed % 14), 9);
    const clicks = wave(seed + 11, offset, 8 + (seed % 8), 5);
    const interactions = wave(seed + 23, offset, 5 + (seed % 6), 4);
    const vitrine = Math.round(views * 0.48);
    const telas = Math.round(views * 0.32);
    const contato = Math.max(0, views - vitrine - telas);

    return {
      date: day.toISOString().slice(0, 10),
      label: weekday[day.getDay()] ?? "S",
      views,
      clicks,
      interactions,
      vitrine,
      telas,
      contato,
    };
  });
}

export function filterAnalytics(
  points: DayPoint[],
  period: AnalyticsPeriod,
  source: AnalyticsSource,
): DayPoint[] {
  const sliced = points.slice(-period);

  if (source === "todos") return sliced;

  return sliced.map((point) => {
    const share = point[source] / Math.max(1, point.views);
    return {
      ...point,
      views: point[source],
      clicks: Math.max(1, Math.round(point.clicks * share)),
      interactions: Math.max(1, Math.round(point.interactions * share)),
    };
  });
}

export function summarizeAnalytics(points: DayPoint[]) {
  return points.reduce(
    (total, point) => ({
      views: total.views + point.views,
      clicks: total.clicks + point.clicks,
      interactions: total.interactions + point.interactions,
    }),
    { views: 0, clicks: 0, interactions: 0 },
  );
}
