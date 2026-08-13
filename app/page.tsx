import Link from "next/link";

const flow = [
  { label: "Empresa", delay: "0.1s" },
  { label: "Conexão Negócios", delay: "0.25s" },
  { label: "Telas em pontos estratégicos", delay: "0.4s" },
  { label: "Consumidores", delay: "0.55s" },
];

export default function Home() {
  return (
    <div className="relative flex min-h-full flex-1 flex-col overflow-x-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(198,166,103,0.08),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:72px_72px]"
      />

      <header className="relative z-10 px-6 py-8 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-5xl">
          <p className="font-sans text-[11px] font-medium tracking-[0.42em] text-gold uppercase">
            Conexão Negócios
          </p>
        </div>
      </header>

      <main className="relative z-10 flex flex-1 flex-col">
        <section className="flex min-h-[calc(100vh-5.5rem)] flex-col justify-center px-6 pb-28 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-5xl">
            <p
              className="animate-fade-up font-sans text-[11px] tracking-[0.38em] text-gold uppercase"
              style={{ animationDelay: "0.05s" }}
            >
              Rede de mídia digital
            </p>

            <h1
              className="animate-fade-up mt-8 font-display text-[clamp(2.6rem,8vw,6.4rem)] leading-[0.92] font-medium tracking-[0.04em] text-foreground uppercase"
              style={{ animationDelay: "0.15s" }}
            >
              Conexão
              <br />
              Negócios
            </h1>

            <p
              className="animate-fade-up mt-10 max-w-xl font-display text-2xl leading-snug font-normal text-gold-soft sm:text-3xl"
              style={{ animationDelay: "0.28s" }}
            >
              Sua empresa presente onde seus clientes estão.
            </p>

            <p
              className="animate-fade-up mt-8 max-w-lg text-base leading-8 text-muted sm:text-lg"
              style={{ animationDelay: "0.4s" }}
            >
              Uma rede de mídia digital criada para conectar empresas aos
              consumidores através de telas instaladas em pontos estratégicos da
              cidade.
            </p>

            <div
              className="animate-fade-up mt-14 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
              style={{ animationDelay: "0.52s" }}
            >
              <Link
                href="/anuncie"
                className="inline-flex h-12 items-center justify-center bg-gold px-7 text-[11px] font-medium tracking-[0.22em] text-background uppercase transition-colors duration-300 hover:bg-gold-soft"
              >
                Quero anunciar
              </Link>
              <Link
                href="/pontos"
                className="inline-flex h-12 items-center justify-center border border-gold/50 px-7 text-[11px] font-medium tracking-[0.22em] text-gold uppercase transition-colors duration-300 hover:border-gold hover:bg-gold/10"
              >
                Quero ser um ponto parceiro
              </Link>
              <Link
                href="/negocios"
                className="inline-flex h-12 items-center justify-center px-4 text-[11px] font-medium tracking-[0.22em] text-foreground/80 uppercase transition-colors duration-300 hover:text-gold"
              >
                Conhecer os negócios da rede
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-line px-6 py-28 sm:px-10 sm:py-36 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-display text-[clamp(2.2rem,6vw,5rem)] leading-[0.95] font-medium tracking-[0.02em] text-foreground uppercase">
              <span className="text-[1.12em]">10 pontos.</span>
              <br />
              Uma única rede.
              <br />
              <span className="text-gold">Inúmeras conexões.</span>
            </h2>
            <p className="mt-12 max-w-md text-base leading-8 text-muted sm:text-lg">
              Empresas presentes nos ambientes frequentados diariamente por
              consumidores locais — visibilidade contínua, no caminho de quem
              decide, compra e recomenda.
            </p>
          </div>
        </section>

        <section className="border-t border-line px-6 py-28 sm:px-10 sm:py-36 lg:px-16">
          <div className="mx-auto max-w-xl">
            <p className="mb-16 text-center font-sans text-[11px] tracking-[0.38em] text-gold uppercase">
              Como funciona
            </p>

            <ol className="flex flex-col items-center">
              {flow.map((step, index) => (
                <li
                  key={step.label}
                  className="flex w-full flex-col items-center"
                >
                  <div
                    className="animate-fade-up w-full border border-line bg-surface/70 px-6 py-7 text-center backdrop-blur-sm"
                    style={{ animationDelay: step.delay }}
                  >
                    <span className="block font-sans text-[10px] tracking-[0.32em] text-gold uppercase">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-3 block font-display text-2xl tracking-[0.06em] text-foreground uppercase sm:text-3xl">
                      {step.label}
                    </span>
                  </div>
                  {index < flow.length - 1 ? (
                    <div
                      className="flex flex-col items-center py-5"
                      aria-hidden
                    >
                      <span className="animate-draw-line h-10 w-px bg-gold/50" />
                      <span className="mt-1 text-gold/80">↓</span>
                    </div>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-t border-line px-6 py-28 sm:px-10 sm:py-40 lg:px-16">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-display text-[clamp(1.7rem,4.2vw,3.1rem)] leading-tight font-normal text-foreground">
              Conectando empresas.
              <br />
              Aproximando clientes.
              <br />
              <span className="text-gold">Fortalecendo negócios locais.</span>
            </p>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-line px-6 py-8 sm:px-10 lg:px-16">
        <p className="text-center text-[11px] tracking-[0.28em] text-muted uppercase">
          Conexão Negócios
        </p>
      </footer>
    </div>
  );
}
