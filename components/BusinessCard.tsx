import Link from "next/link";
import type { Business } from "@/data/businesses";
import {
  formatCashbackRate,
  getCashbackRate,
} from "@/data/ranking";
import { CoverMedia } from "./CoverMedia";

type BusinessCardProps = {
  business: Business;
};

export function BusinessCard({ business }: BusinessCardProps) {
  const rate = getCashbackRate(business.plan);
  const profileHref = `/empresa/${business.slug}`;

  return (
    <Link
      href={profileHref}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-transform duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EA1D2C] hover:-translate-y-0.5"
    >
      <div className="relative overflow-hidden">
        <CoverMedia
          src={business.coverImage}
          name={business.name}
          fit={business.coverFit}
          className="aspect-[16/10] w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />

        <span className="absolute top-3 left-3 rounded-md bg-[#EA1D2C] px-2.5 py-1 text-[11px] font-semibold text-white">
          {formatCashbackRate(rate)} de volta
        </span>
      </div>

      <div className="flex flex-1 flex-col px-4 pt-3.5 pb-4">
        <p className="text-[12px] font-medium tracking-wide text-[#FF5A1F] uppercase">
          {business.category}
        </p>
        <h3 className="mt-1 text-[1.15rem] leading-snug font-semibold text-[#1a1a1a]">
          {business.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-[13px] leading-5 text-[#6b6b6b]">
          {business.shortDescription}
        </p>
        <p className="mt-2 text-[12px] text-[#8a8a8a]">
          {business.neighborhood}
        </p>

        <span className="mt-auto flex pt-3">
          <span className="inline-flex h-10 w-full items-center justify-center rounded-xl bg-[#EA1D2C] text-[12px] font-semibold tracking-[0.12em] text-white uppercase transition-colors duration-300 group-hover:bg-[#c71826]">
            Ver loja
          </span>
        </span>
      </div>
    </Link>
  );
}
