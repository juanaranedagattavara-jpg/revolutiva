import { createPublicClient } from "@/lib/supabase/public";
import type { Listing, ListingCategory } from "@/lib/types";

export async function getPublishedListings(): Promise<Listing[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data as Listing[];
}

export async function getListingsByCategory(cat: ListingCategory): Promise<Listing[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("published", true)
    .eq("category", cat)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data as Listing[];
}

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error) throw error;
  return data as Listing | null;
}

export async function getRelatedListings(
  id: string,
  pais: string,
  cat: ListingCategory,
  limit = 3
): Promise<Listing[]> {
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
}

export async function getFeaturedListings(limit = 3): Promise<Listing[]> {
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
}

export async function getAllCountries(): Promise<string[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("listings")
    .select("pais")
    .eq("published", true);
  if (error) throw error;
  return [...new Set((data as { pais: string }[]).map((d) => d.pais))];
}
