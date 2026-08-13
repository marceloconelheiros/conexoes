import { Reveal } from "./reveal";

export function ScreensLink() {
  return (
    <Reveal className="screens-stage mt-16 sm:mt-20">
      <div className="flex flex-col items-center">
        <div className="relative z-10 border border-gold/50 bg-surface px-8 py-5 text-center">
          <p className="text-[10px] tracking-[0.32em] text-gold uppercase">
            Origem
          </p>
          <p className="mt-2 font-display text-2xl tracking-[0.08em] text-foreground uppercase sm:text-3xl">
            Sua empresa
          </p>
        </div>

        <div
          className="screens-spine h-14 w-px bg-gradient-to-b from-gold/65 to-gold/15"
          aria-hidden
        />

        <p className="mb-6 text-center font-sans text-[10px] tracking-[0.32em] text-muted uppercase">
          Dez telas da rede
        </p>

        <div className="grid w-full grid-cols-5 gap-2 sm:gap-3">
          {Array.from({ length: 10 }, (_, index) => (
            <div
              key={index}
              className="screen-node flex aspect-[5/3] flex-col items-center justify-center border border-line bg-background"
              style={{ animationDelay: `${0.18 + index * 0.07}s` }}
            >
              <span className="font-display text-base text-gold/70 sm:text-xl">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
