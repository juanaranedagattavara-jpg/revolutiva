import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Listing } from "@/lib/types";
import ListingForm from "@/components/admin/ListingForm";

export default async function EditListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("listings").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  return (
    <>
      <h2>{data.nombre}</h2>
      <div style={{ marginTop: "16px" }}>
        <ListingForm listing={data as Listing} />
      </div>
    </>
  );
}
