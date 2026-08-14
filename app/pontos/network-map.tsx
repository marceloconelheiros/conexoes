import { PlaceIcon, type PlaceName } from "./icons";
import { Reveal } from "./reveal";

const places: { name: PlaceName; label: string }[] = [
  { name: "academia", label: "Academia" },
  { name: "clinica", label: "Clínica" },
  { name: "restaurante", label: "Restaurante" },
  { name: "loja", label: "Loja" },
  { name: "salao", label: "Salão" },
  { name: "escritorio", label: "Escritório" },
  { name: "mercado", label: "Mercado" },
  { name: "imobiliaria", label: "Imobiliária" },
  { name: "farmacia", label: "Farmácia" },
  { name: "cafe", label: "Café" },
];

function point(index: number, radius: number) {
  const angle = (index / 10) * Math.PI * 2 - Math.PI / 2;
  return {
    x: 50 + radius * Math.cos(angle),
    y: 50 + radius * Math.sin(angle),
  };
}

export function NetworkMap() {
  const outer = places.map((_, index) => point(index, 34));
  const inner = places.map((_, index) => point(index, 14));

  return (
    <Reveal className="network-stage mt-6 sm:mt-8">
      <div className="relative mx-auto hidden aspect-square w-full max-w-[720px] lg:block">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <circle cx="50" cy="50" r="34" className="net-ring" />
          {outer.map((node, index) => (
            <line
              key={`spoke-${places[index].name}`}
              x1={inner[index].x}
              y1={inner[index].y}
              x2={node.x}
              y2={node.y}
              className="net-line"
              style={{ animationDelay: `${0.1 + index * 0.06}s` }}
            />
          ))}
          {outer.map((node, index) => {
            const next = outer[(index + 1) % outer.length];
            return (
              <line
                key={`ring-${places[index].name}`}
                x1={node.x}
                y1={node.y}
                x2={next.x}
                y2={next.y}
                className="net-arc"
                style={{ animationDelay: `${0.35 + index * 0.05}s` }}
              />
            );
          })}
        </svg>

        <div className="absolute top-1/2 left-1/2 z-10 flex h-[7.25rem] w-[7.25rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-gold/40 bg-background">
          <span
            className="net-hub-glow pointer-events-none absolute inset-0 rounded-full border border-gold/30"
            aria-hidden
          />
          <span className="font-display text-4xl leading-none text-gold">
            10
          </span>
          <span className="mt-1 text-[9px] tracking-[0.28em] text-muted uppercase">
            Pontos
          </span>
        </div>

        {places.map((place, index) => {
          const position = outer[index];
          return (
            <div
              key={place.name}
              className="absolute z-10 w-[6.8rem] -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${position.x}%`, top: `${position.y}%` }}
            >
              <div className="flex flex-col items-center gap-2 border border-line bg-surface/90 px-3 py-3 backdrop-blur-sm">
                <span className="text-gold">
                  <PlaceIcon name={place.name} />
                </span>
                <span className="text-center font-sans text-[10px] tracking-[0.16em] text-foreground uppercase">
                  {place.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-5 lg:hidden">
        {places.map((place, index) => (
          <div
            key={place.name}
            className="flex flex-col items-center gap-2 border border-line bg-surface/70 px-3 py-5"
          >
            <span className="font-sans text-[9px] tracking-[0.22em] text-gold">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-gold">
              <PlaceIcon name={place.name} />
            </span>
            <span className="text-center font-sans text-[10px] tracking-[0.16em] text-foreground uppercase">
              {place.label}
            </span>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
