import { createClient } from "@/lib/supabase/server";
import StatusSelect from "@/components/admin/StatusSelect";

const POST_STATUSES = [
  { value: "recibida", label: "Recibida" },
  { value: "en_revision", label: "En revisión" },
  { value: "aprobada", label: "Aprobada" },
  { value: "rechazada", label: "Rechazada" },
  { value: "en_mentoria", label: "En mentoría" },
];

export default async function AdminPostulacionesPage() {
  const supabase = await createClient();
  const { data: postulations } = await supabase.from("postulations").select("*").order("created_at", { ascending: false });

  return (
    <>
      <h2>Postulaciones</h2>
      <div style={{ marginTop: "20px", display: "grid", gap: "12px" }}>
        {(postulations ?? []).map((p) => (
          <div key={p.id} style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "14px", padding: "18px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
              <div>
                <div style={{ fontWeight: 600 }}>
                  {p.quien} · {p.tipo_oferta}
                </div>
                <div className="muted" style={{ fontSize: ".85rem" }}>
                  {p.donde} · {p.email} · {new Date(p.created_at).toLocaleString("es-CL")}
                  {p.quiere_mentoria && " · quiere mentoría"}
                </div>
              </div>
              <StatusSelect table="postulations" id={p.id} value={p.status} options={POST_STATUSES} />
            </div>
            <p style={{ marginTop: "10px", fontSize: ".92rem" }}>{p.que_hace}</p>
            {p.oferta && (
              <p className="muted" style={{ fontSize: ".9rem" }}>
                <b>Oferta:</b> {p.oferta}
              </p>
            )}
          </div>
        ))}
        {(!postulations || postulations.length === 0) && <p className="muted">Aún no hay postulaciones.</p>}
      </div>
    </>
  );
}
