"use client";

import { useMemo, useState } from "react";
import {
  filterAnalytics,
  summarizeAnalytics,
  type AnalyticsPeriod,
  type AnalyticsSource,
  type DayPoint,
} from "@/data/analytics";

type SeriesKey = "views" | "clicks" | "interactions";

type StoreInsightsProps = {
  storeName: string;
  points: DayPoint[];
  mode?: "public" | "owner";
  tone?: "dark" | "light";
};

const seriesMeta: { key: SeriesKey; label: string; color: string }[] = [
  { key: "views", label: "Visitas", color: "#c6a667" },
  { key: "clicks", label: "Cliques", color: "#e4d2a3" },
  { key: "interactions", label: "Interações", color: "#9a958a" },
];

const periods: { value: AnalyticsPeriod; label: string }[] = [
  { value: 7, label: "7 dias" },
  { value: 15, label: "15 dias" },
  { value: 30, label: "30 dias" },
];

const sources: { value: AnalyticsSource; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "vitrine", label: "Vitrine" },
  { value: "telas", label: "Telas" },
  { value: "contato", label: "Contato" },
];

export function StoreInsights({
  storeName,
  points,
  mode = "public",
  tone = "dark",
}: StoreInsightsProps) {
  const owner = mode === "owner";
  const light = tone === "light";
  const [period, setPeriod] = useState<AnalyticsPeriod>(owner ? 15 : 7);
  const [source, setSource] = useState<AnalyticsSource>("todos");
  const [visible, setVisible] = useState<Record<SeriesKey, boolean>>({
    views: true,
    clicks: true,
    interactions: owner,
  });

  const filtered = useMemo(
    () => filterAnalytics(points, period, owner ? source : "todos"),
    [points, period, source, owner],
  );
  const totals = useMemo(() => summarizeAnalytics(filtered), [filtered]);

  return (
    <div
      className={
        light
          ? "rounded-2xl bg-white px-5 py-6 shadow-[0_14px_32px_rgba(0,0,0,0.12)] sm:px-7"
          : "border border-line bg-surface/70 px-5 py-7 sm:px-8 sm:py-8"
      }
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p
            className={
              light
                ? "text-[11px] font-semibold tracking-[0.16em] text-[#EA1D2C] uppercase"
                : "font-sans text-[10px] tracking-[0.28em] text-gold uppercase"
            }
          >
            {owner ? "Painel da empresa" : "Movimento nesta loja"}
          </p>
          <h2
            className={
              light
                ? "mt-2 text-[1.35rem] font-bold text-[#1a1a1a]"
                : "mt-3 font-display text-[1.7rem] leading-tight tracking-[0.04em] text-foreground uppercase sm:text-[2rem]"
            }
          >
            {owner ? "Interações e cliques" : "Visitas e cliques"}
          </h2>
          <p
            className={
              light
                ? "mt-2 max-w-md text-[14px] leading-6 text-[#6b6b6b]"
                : "mt-3 max-w-md text-sm leading-7 text-muted"
            }
          >
            {owner
              ? "Filtre o período e a origem para acompanhar visitas, cliques e interações da sua loja na rede."
              : `Visitas, cliques e interações geradas pela Conexão Negócios em ${storeName}.`}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {periods.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setPeriod(item.value)}
            className={`h-9 px-4 text-[10px] font-medium tracking-[0.18em] uppercase transition-colors duration-300 ${
              period === item.value
                ? light
                  ? "rounded-full bg-[#EA1D2C] text-white"
                  : "border border-gold bg-gold/[0.08] text-gold-soft"
                : light
                  ? "rounded-full bg-[#f5f5f5] text-[#6b6b6b]"
                  : "border border-line text-muted hover:border-gold/45 hover:text-foreground"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {owner ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {sources.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setSource(item.value)}
              className={`h-9 px-4 text-[10px] font-medium tracking-[0.18em] uppercase transition-colors duration-300 ${
                source === item.value
                  ? "border border-gold bg-gold/[0.08] text-gold-soft"
                  : "border border-line text-muted hover:border-gold/45 hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}

      <div className="mt-6 grid grid-cols-3 gap-3">
        <MetricCard label="Visitas" value={totals.views} light={light} />
        <MetricCard label="Cliques" value={totals.clicks} light={light} />
        <MetricCard label="Interações" value={totals.interactions} light={light} />
      </div>

      <div className="mt-6">
        <LineChart points={filtered} visible={visible} light={light} />
      </div>

      <div className="mt-5 flex flex-wrap gap-4">
        {seriesMeta.map((item) => {
          if (!owner && item.key === "interactions") return null;
          const color = light
            ? item.key === "views"
              ? "#EA1D2C"
              : item.key === "clicks"
                ? "#FF5A1F"
                : "#9a9a9a"
            : item.color;

          return (
            <button
              key={item.key}
              type="button"
              onClick={() =>
                setVisible((current) => ({
                  ...current,
                  [item.key]: !current[item.key],
                }))
              }
              className={`flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase ${
                visible[item.key]
                  ? light
                    ? "text-[#1a1a1a]"
                    : "text-foreground"
                  : "text-[#8a8a8a]"
              }`}
            >
              <span
                className="h-2 w-2"
                style={{
                  background: visible[item.key] ? color : "transparent",
                  outline: `1px solid ${color}`,
                }}
              />
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  light = false,
}: {
  label: string;
  value: number;
  light?: boolean;
}) {
  return (
    <div
      className={
        light
          ? "rounded-xl bg-[#f5f5f5] px-3 py-4 sm:px-4"
          : "border border-line bg-background/50 px-3 py-4 sm:px-4"
      }
    >
      <p
        className={
          light
            ? "text-[9px] font-semibold tracking-[0.16em] text-[#8a8a8a] uppercase"
            : "font-sans text-[9px] tracking-[0.2em] text-muted uppercase"
        }
      >
        {label}
      </p>
      <p
        className={
          light
            ? "mt-2 text-2xl leading-none font-bold text-[#1a1a1a] sm:text-3xl"
            : "mt-2 font-display text-2xl leading-none text-foreground sm:text-3xl"
        }
      >
        {value}
      </p>
    </div>
  );
}

function LineChart({
  points,
  visible,
  light = false,
}: {
  points: DayPoint[];
  visible: Record<SeriesKey, boolean>;
  light?: boolean;
}) {
  const width = 640;
  const height = 220;
  const pad = { l: 8, r: 8, t: 16, b: 28 };
  const innerW = width - pad.l - pad.r;
  const innerH = height - pad.t - pad.b;
  const max = Math.max(
    1,
    ...points.flatMap((point) => {
      const values: number[] = [];
      if (visible.views) values.push(point.views);
      if (visible.clicks) values.push(point.clicks);
      if (visible.interactions) values.push(point.interactions);
      return values;
    }),
  );

  function toPath(key: SeriesKey) {
    return points
      .map((point, index) => {
        const x =
          pad.l + (points.length === 1 ? 0 : (index / (points.length - 1)) * innerW);
        const y = pad.t + innerH - (point[key] / max) * innerH;
        return `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ");
  }

  const labelStep = points.length > 15 ? 4 : points.length > 8 ? 2 : 1;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-48 w-full sm:h-56"
      role="img"
      aria-label="Gráfico de visitas, cliques e interações"
    >
      {[0.25, 0.5, 0.75, 1].map((line) => (
        <line
          key={line}
          x1={pad.l}
          x2={width - pad.r}
          y1={pad.t + innerH * (1 - line)}
          y2={pad.t + innerH * (1 - line)}
          stroke={light ? "rgba(0,0,0,0.08)" : "rgba(198,166,103,0.16)"}
          strokeWidth="1"
        />
      ))}

      {seriesMeta.map((item) =>
        visible[item.key] ? (
          <path
            key={item.key}
            d={toPath(item.key)}
            fill="none"
            stroke={
              light
                ? item.key === "views"
                  ? "#EA1D2C"
                  : item.key === "clicks"
                    ? "#FF5A1F"
                    : "#9a9a9a"
                : item.color
            }
            strokeWidth="1.8"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        ) : null,
      )}

      {points.map((point, index) =>
        index % labelStep === 0 ? (
          <text
            key={point.date}
            x={pad.l + (points.length === 1 ? 0 : (index / (points.length - 1)) * innerW)}
            y={height - 6}
            textAnchor="middle"
            fill="#9a958a"
            fontSize="10"
          >
            {point.label}
          </text>
        ) : null,
      )}
    </svg>
  );
}
