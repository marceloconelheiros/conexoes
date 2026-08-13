import { getBusinessInitials } from "@/data/businesses";

type CoverArtProps = {
  name: string;
  className?: string;
  variant?: number;
};

export function CoverArt({ name, className = "", variant = 0 }: CoverArtProps) {
  const initials = getBusinessInitials(name);
  const positions = [
    "ellipse_at_top_right",
    "ellipse_at_bottom_left",
    "ellipse_at_top_left",
    "ellipse_at_center",
  ];
  const position = positions[variant % positions.length];

  return (
    <div className={`relative overflow-hidden bg-[#101012] ${className}`}>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(${position}, rgba(198,166,103,0.16), transparent 58%)`,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(to_right,rgba(198,166,103,0.55)_1px,transparent_1px),linear-gradient(to_bottom,rgba(198,166,103,0.55)_1px,transparent_1px)] [background-size:32px_32px]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-2 -bottom-8 font-display text-[7.5rem] leading-none text-gold/[0.14] sm:text-[8.5rem]"
      >
        {initials}
      </span>
    </div>
  );
}

type LogoMarkProps = {
  name: string;
  logo?: string;
  className?: string;
};

export function LogoMark({ name, logo, className = "" }: LogoMarkProps) {
  const initials = getBusinessInitials(name);

  return (
    <div
      className={`flex h-14 w-14 items-center justify-center border border-gold/45 bg-background ${className}`}
    >
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logo} alt="" className="h-full w-full object-cover" />
      ) : (
        <span className="font-display text-lg tracking-[0.08em] text-gold">
          {initials}
        </span>
      )}
    </div>
  );
}
