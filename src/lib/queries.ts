import { createClient } from "@/lib/supabase/server";
import type { Listing, ListingCategory } from "@/lib/types";

export async function getPublishedListings(): Promise<Listing[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data as Listing[];
}

export async function getListingsByCategory(cat: ListingCategory): Promise<Listing[]> {
  const supabase = await createClient();
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
  const supabase = await createClient();
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
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("published", true)
    .neq("id", id)
    .or(`pais.eq.${pais},category.eq.${cat}`)
    .limit(limit);
  if (error) throw error;
  return data as Listing[];
}

export async function getFeaturedListings(limit = 3): Promise<Listing[]> {
  const supabase = await createClient();
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
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("listings")
    .select("pais")
    .eq("published", true);
  if (error) throw error;
  return [...new Set((data as { pais: string }[]).map((d) => d.pais))];
}
