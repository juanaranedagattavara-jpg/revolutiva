import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [{ count: totalListings }, { count: publishedListings }, { count: newLeads }, { count: pendingPostulations }, { count: newFlowmap }] =
    await Promise.all([
      supabase.from("listings").select("*", { count: "exact", head: true }),
      supabase.from("listings").select("*", { count: "exact", head: true }).eq("published", true),
      supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "nuevo"),
      supabase.from("postulations").select("*", { count: "exact", head: true }).eq("status", "recibida"),
      supabase.from("flowmap_diagnosticos").select("*", { count: "exact", head: true }).eq("status", "nuevo"),
    ]);

  const cards = [
    { label: "Listings totales", value: totalListings ?? 0, href: "/admin/listings" },
    { label: "Listings publicados", value: publishedListings ?? 0, href: "/admin/listings" },
    { label: "Leads nuevos", value: newLeads ?? 0, href: "/admin/leads" },
    { label: "Postulaciones por revisar", value: pendingPostulations ?? 0, href: "/admin/postulaciones" },
    { label: "Diagnósticos FlowMap nuevos", value: newFlowmap ?? 0, href: "/admin/flowmap" },
  ];

  return (
    <>
      <h2>Dashboard</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "18px", marginTop: "20px" }}>
        {cards.map((c) => (
          <Link
            href={c.href}
            key={c.label}
            style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "14px", padding: "24px" }}
          >
            <div style={{ fontSize: "2.2rem", fontFamily: "var(--font-serif)", color: "var(--forest)" }}>{c.value}</div>
            <div className="muted" style={{ fontSize: ".85rem" }}>
              {c.label}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
