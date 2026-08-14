"use client";

import { useState } from "react";
import { CoverArt } from "./CoverArt";

type CoverMediaProps = {
  src?: string;
  name: string;
  fit?: "cover" | "contain";
  className?: string;
};

export function CoverMedia({
  src,
  name,
  fit = "cover",
  className = "",
}: CoverMediaProps) {
  const [failed, setFailed] = useState(false);
  const resolved =
    src && src.startsWith("http")
      ? `https://wsrv.nl/?url=${encodeURIComponent(src)}&w=1400&h=900&fit=cover`
      : src;

  if (!resolved || failed) {
    return <CoverArt name={name} className={className} />;
  }

  if (fit === "contain") {
    return (
      <div
        className={`flex items-center justify-center bg-[#f4f1ea] ${className}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          className="max-h-[70%] max-w-[78%] object-contain"
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={resolved}
      alt=""
      className={`object-cover ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
