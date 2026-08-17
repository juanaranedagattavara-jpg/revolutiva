import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import StatusSelect from "@/components/admin/StatusSelect";

const FLOWMAP_STATUSES = [
  { value: "nuevo", label: "Nuevo" },
  { value: "en_revision", label: "En revisión" },
  { value: "contactado", label: "Contactado" },
  { value: "archivado", label: "Archivado" },
];

export default async function AdminFlowmapPage() {
  const supabase = await createClient();
  const { data: diagnosticos } = await supabase
    .from("flowmap_diagnosticos")
    .select("id, organizacion, persona, email, territorio, promedio_general, nivel_general, status, created_at")
    .order("created_at", { ascending: false });

  return (
    <>
      <h2>Diagnósticos FlowMap</h2>
      <div style={{ marginTop: "20px", display: "grid", gap: "12px" }}>
        {(diagnosticos ?? []).map((d) => (
          <div key={d.id} style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "14px", padding: "18px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
              <div>
                <div style={{ fontWeight: 600 }}>
                  <Link href={`/admin/flowmap/${d.id}`}>{d.organizacion || "Organización sin nombre"}</Link>
                  {d.nivel_general && ` · ${d.nivel_general}`}
                </div>
                <div className="muted" style={{ fontSize: ".85rem" }}>
                  {d.persona} · {d.email} · {d.territorio || "—"} · {new Date(d.created_at).toLocaleString("es-CL")}
                </div>
              </div>
              <StatusSelect table="flowmap_diagnosticos" id={d.id} value={d.status} options={FLOWMAP_STATUSES} />
            </div>
            <div style={{ marginTop: "10px", fontSize: ".92rem" }}>
              <span>
                <b>Promedio general:</b> {d.promedio_general != null ? `${d.promedio_general.toFixed(1)} / 7` : "—"}
              </span>
            </div>
          </div>
        ))}
        {(!diagnosticos || diagnosticos.length === 0) && <p className="muted">Aún no hay diagnósticos.</p>}
      </div>
    </>
  );
}
