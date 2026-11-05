import { createPublicClient } from "@/lib/supabase/public";
import type { Listing, ListingCategory } from "@/lib/types";
import { PHASE_PRODUCTION_BUILD } from "next/constants";

/**
 * During `next build`, ISR pages are prerendered and any thrown error aborts
 * the whole deploy. If Supabase is unreachable at build time (project paused,
 * DNS/network hiccup) we fall back to empty data so the image still builds;
 * the pages regenerate with real data on the next ISR revalidation.
 * At runtime errors are still thrown, so a failed revalidation keeps serving
 * the last good page instead of caching an empty one.
 */
async function buildSafe<T>(label: string, fallback: T, fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD) throw error;
    console.warn(`[build] ${label}: Supabase unavailable, using empty fallback`, error);
    return fallback;
  }
}

export async function getPublishedListings(): Promise<Listing[]> {
  return buildSafe("getPublishedListings", [], async () => {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return data as Listing[];
  });
}

export async function getListingsByCategory(cat: ListingCategory): Promise<Listing[]> {
  return buildSafe("getListingsByCategory", [], async () => {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .eq("published", true)
      .eq("category", cat)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return data as Listing[];
  });
}

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  return buildSafe("getListingBySlug", null, async () => {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();
    if (error) throw error;
    return data as Listing | null;
  });
}

export async function getRelatedListings(
  id: string,
  pais: string,
  cat: ListingCategory,
  limit = 3
): Promise<Listing[]> {
  return buildSafe("getRelatedListings", [], async () => {
    const supabase = createPublicClient();
    const [byCountry, byCategory] = await Promise.all([
      supabase.from("listings").select("*").eq("published", true).neq("id", id).eq("pais", pais).limit(limit),
      supabase.from("listings").select("*").eq("published", true).neq("id", id).eq("category", cat).limit(limit),
    ]);
    if (byCountry.error) throw byCountry.error;
    if (byCategory.error) throw byCategory.error;

    const seen = new Set<string>();
    const merged: Listing[] = [];
    for (const item of [...(byCountry.data ?? []), ...(byCategory.data ?? [])] as Listing[]) {
      if (seen.has(item.id)) continue;
      seen.add(item.id);
      merged.push(item);
      if (merged.length >= limit) break;
    }
    return merged;
  });
}

export async function getFeaturedListings(limit = 3): Promise<Listing[]> {
  return buildSafe("getFeaturedListings", [], async () => {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .eq("published", true)
      .eq("nivel", 3)
      .order("sort_order", { ascending: true })
      .limit(limit);
    if (error) throw error;
    return data as Listing[];
  });
}

export async function getAllCountries(): Promise<string[]> {
  return buildSafe("getAllCountries", [], async () => {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("listings")
      .select("pais")
      .eq("published", true);
    if (error) throw error;
    return [...new Set((data as { pais: string }[]).map((d) => d.pais))];
  });
}
