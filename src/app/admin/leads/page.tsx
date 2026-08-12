import { createClient } from "@/lib/supabase/server";
import StatusSelect from "@/components/admin/StatusSelect";

const LEAD_STATUSES = [
  { value: "nuevo", label: "Nuevo" },
  { value: "contactado", label: "Contactado" },
  { value: "en_proceso", label: "En proceso" },
  { value: "cerrado", label: "Cerrado" },
  { value: "descartado", label: "Descartado" },
];

export default async function AdminLeadsPage() {
  const supabase = await createClient();
  const { data: leads } = await supabase.from("leads").select("*").order("created_at", { ascending: false });

  return (
    <>
      <h2>Leads</h2>
      <div style={{ marginTop: "20px", display: "grid", gap: "12px" }}>
        {(leads ?? []).map((l) => (
          <div key={l.id} style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "14px", padding: "18px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
              <div>
                <div style={{ fontWeight: 600 }}>
                  {l.nombre} · {l.accion}
                </div>
                <div className="muted" style={{ fontSize: ".85rem" }}>
                  {l.listing_name} · {new Date(l.created_at).toLocaleString("es-CL")}
                </div>
              </div>
              <StatusSelect table="leads" id={l.id} value={l.status} options={LEAD_STATUSES} />
            </div>
            <div style={{ marginTop: "10px", fontSize: ".92rem", display: "flex", gap: "18px", flexWrap: "wrap" }}>
              <span>
                <b>Email:</b> {l.email}
              </span>
              {l.telefono && (
                <span>
                  <b>Tel:</b> {l.telefono}
                </span>
              )}
            </div>
            {l.mensaje && (
              <p className="muted" style={{ marginTop: "8px", fontSize: ".9rem" }}>
                {l.mensaje}
              </p>
            )}
          </div>
        ))}
        {(!leads || leads.length === 0) && <p className="muted">Aún no hay leads.</p>}
      </div>
    </>
  );
}
