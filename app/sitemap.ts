import type { MetadataRoute } from "next";
import { getBusinesses } from "@/data/businesses";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const businesses = await getBusinesses();

  const pages: MetadataRoute.Sitemap = [
    "",
    "/negocios",
    "/pontos",
    "/anuncie",
    "/recompensas",
    "/carrinho",
  ].map((path) => ({
    url: `${SITE_URL}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: path === "" || path === "/negocios" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const companies = businesses.map((business) => ({
    url: `${SITE_URL}/empresa/${business.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...pages, ...companies];
}
