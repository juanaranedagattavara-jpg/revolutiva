import type { MetadataRoute } from "next";
import { CAT_META } from "@/lib/constants";
import { getPublishedListings } from "@/lib/queries";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://revolutiva.travel";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Best-effort: a transient Supabase error shouldn't fail the whole build/
  // deploy over a crawler-facing file — fall back to the static routes.
  let listings: Awaited<ReturnType<typeof getPublishedListings>> = [];
  try {
    listings = await getPublishedListings();
  } catch (error) {
    console.error("sitemap: failed to load listings, falling back to static routes only", error);
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/explorar",
    "/experiencias",
    "/hospedajes",
    "/operadores",
    "/principios",
    "/niveles",
    "/indicadores",
    "/mentoria",
    "/postular",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const listingRoutes: MetadataRoute.Sitemap = listings.map((l) => ({
    url: `${SITE_URL}/${CAT_META[l.category].slug}/${l.slug}`,
    lastModified: new Date(l.updated_at),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...listingRoutes];
}
