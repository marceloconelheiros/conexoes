"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { recordBrowse } from "@/lib/browse";

export function BrowseTracker() {
  const pathname = usePathname();

  useEffect(() => {
    recordBrowse(pathname);
  }, [pathname]);

  return null;
}
