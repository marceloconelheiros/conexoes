"use client";

import { useState } from "react";

type SafeImageProps = {
  src: string;
  alt?: string;
  name?: string;
  className?: string;
};

export function SafeImage({ src, alt = "", name = "", className = "" }: SafeImageProps) {
  const [failed, setFailed] = useState(false);
  const resolved = src.startsWith("http")
    ? `https://wsrv.nl/?url=${encodeURIComponent(src)}&w=1200&h=800&fit=cover`
    : src;

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-[#EA1D2C] to-[#FF5A1F] ${className}`}
      >
        <span className="px-4 text-center text-lg font-semibold text-white">
          {name || alt || "Foto"}
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={resolved}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
