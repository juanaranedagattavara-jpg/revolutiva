import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import PublishToggle from "@/components/admin/PublishToggle";

export default async function AdminListingsPage() {
  const supabase = await createClient();
  const { data: listings } = await supabase
    .from("listings")
    .select("id, slug, nombre, category, pais, nivel, published, sort_order")
    .order("sort_order", { ascending: true });

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
        <h2 style={{ margin: 0 }}>Listings</h2>
        <Link href="/admin/listings/new" className="btn btn-terra btn-sm">
          + Nuevo listing
        </Link>
      </div>
      <div style={{ marginTop: "20px", background: "var(--card)", border: "1px solid var(--line)", borderRadius: "14px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".9rem" }}>
          <thead>
            <tr style={{ background: "var(--bg-2)", textAlign: "left" }}>
              <th style={{ padding: "12px 16px" }}>Nombre</th>
              <th style={{ padding: "12px 16px" }}>Categoría</th>
              <th style={{ padding: "12px 16px" }}>País</th>
              <th style={{ padding: "12px 16px" }}>Nivel</th>
              <th style={{ padding: "12px 16px" }}>Publicado</th>
              <th style={{ padding: "12px 16px" }} />
            </tr>
          </thead>
          <tbody>
            {(listings ?? []).map((l) => (
              <tr key={l.id} style={{ borderTop: "1px solid var(--line)" }}>
                <td style={{ padding: "12px 16px" }}>
                  <Link href={`/admin/listings/${l.id}`}>{l.nombre}</Link>
                </td>
                <td style={{ padding: "12px 16px" }}>{l.category}</td>
                <td style={{ padding: "12px 16px" }}>{l.pais}</td>
                <td style={{ padding: "12px 16px" }}>{l.nivel}</td>
                <td style={{ padding: "12px 16px" }}>
                  <PublishToggle id={l.id} published={l.published} />
                </td>
                <td style={{ padding: "12px 16px", textAlign: "right" }}>
                  <Link href={`/admin/listings/${l.id}`} className="btn btn-ghost btn-sm">
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
