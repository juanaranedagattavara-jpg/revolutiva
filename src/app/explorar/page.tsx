import type { Metadata } from "next";
import { getPublishedListings } from "@/lib/queries";
import ExploreClient from "@/components/ExploreClient";

export const metadata: Metadata = {
  title: "Explorar",
  description:
    "Filtra por territorio, categoría, relación dominante, nivel de madurez e indicadores R en la red viva de REVOLUTIVA.TRAVEL.",
};

export const revalidate = 3600;

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ tipo?: string }>;
}) {
  const items = await getPublishedListings();
  const { tipo } = await searchParams;
  return <ExploreClient items={items} initialTipo={tipo} />;
}
