import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { FlowmapDiagnostico } from "@/lib/types";
import StatusSelect from "@/components/admin/StatusSelect";
import AdminFlowmapResultView from "@/components/flowmap/AdminFlowmapResultView";

const FLOWMAP_STATUSES = [
  { value: "nuevo", label: "Nuevo" },
  { value: "en_revision", label: "En revisión" },
  { value: "contactado", label: "Contactado" },
  { value: "archivado", label: "Archivado" },
];

export default async function AdminFlowmapDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("flowmap_diagnosticos").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const d = data as FlowmapDiagnostico;

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", flexWrap: "wrap" }}>
        <div>
          <h2 style={{ margin: 0 }}>{d.organizacion || "Organización sin nombre"}</h2>
          <p className="muted" style={{ marginTop: "6px" }}>
            {d.persona} {d.cargo && `· ${d.cargo}`} · {d.email} {d.whatsapp && `· ${d.whatsapp}`}
          </p>
          <p className="muted" style={{ fontSize: ".9rem" }}>
            {d.tipo_organizacion || "—"} · {d.territorio || "—"} · {d.modalidad || "—"} ·{" "}
            {new Date(d.created_at).toLocaleString("es-CL")}
          </p>
        </div>
        <StatusSelect table="flowmap_diagnosticos" id={d.id} value={d.status} options={FLOWMAP_STATUSES} />
      </div>

      <div style={{ marginTop: "24px" }}>
        <AdminFlowmapResultView datosIniciales={{
          organizacion: d.organizacion || "",
          tipo: d.tipo_organizacion || "",
          persona: d.persona || "",
          cargo: d.cargo || "",
          email: d.email,
          whatsapp: d.whatsapp || "",
          territorio: d.territorio || "",
          fecha: d.fecha_diagnostico || "",
          modalidad: d.modalidad || "",
        }} respuestas={d.respuestas} />
      </div>
    </>
  );
}
