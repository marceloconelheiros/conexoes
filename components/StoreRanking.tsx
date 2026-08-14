import Link from "next/link";
import {
  CLASS_LABEL,
  formatCashbackRate,
  type RankedStore,
} from "@/data/ranking";

export function StoreRanking({ stores }: { stores: RankedStore[] }) {
  return (
    <ol className="divide-y divide-[rgba(198,166,103,0.18)] border-y border-line">
      {stores.map((item, index) => (
        <li key={item.business.slug}>
          <Link
            href={`/empresa/${item.business.slug}`}
            className="grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-baseline gap-4 py-6 transition-colors hover:text-gold sm:grid-cols-[3rem_minmax(0,1fr)_8rem_5rem]"
          >
            <span className="font-display text-2xl text-gold">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>
              <span className="block font-display text-[1.45rem] leading-tight tracking-[0.04em] text-foreground uppercase">
                {item.business.name}
              </span>
              <span className="mt-2 block font-sans text-[10px] tracking-[0.2em] text-muted uppercase">
                {CLASS_LABEL[item.storeClass]} · {item.business.neighborhood}
              </span>
            </span>
            <span className="hidden font-sans text-[10px] tracking-[0.2em] text-muted uppercase sm:block">
              {item.business.category}
            </span>
            <span className="text-right font-sans text-[11px] tracking-[0.18em] text-gold uppercase">
              {formatCashbackRate(item.rate)}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
