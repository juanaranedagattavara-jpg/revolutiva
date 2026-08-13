import { createAdminClient } from "@/lib/supabase/admin";
import CreateAdminForm from "@/components/admin/CreateAdminForm";

export default async function AdminUsersPage() {
  const supabase = createAdminClient();
  const { data, error } = await supabase.auth.admin.listUsers();
  const admins = (data?.users ?? []).filter((u) => u.user_metadata?.role === "admin");

  return (
    <>
      <h2>Usuarios admin</h2>
      <p className="muted" style={{ marginTop: "4px", maxWidth: "560px" }}>
        Cualquier cuenta creada acá tiene acceso completo al panel — listings, leads y
        postulaciones. Crea cuentas solo para personas de confianza del equipo IGTR.
      </p>

      <div style={{ marginTop: "24px", maxWidth: "440px" }}>
        <CreateAdminForm />
      </div>

      <div style={{ marginTop: "36px" }}>
        <h3>Cuentas actuales</h3>
        {error && <p style={{ color: "var(--red)", marginTop: "10px" }}>No pudimos cargar la lista de usuarios.</p>}
        <div style={{ marginTop: "12px", display: "grid", gap: "10px" }}>
          {admins.map((u) => (
            <div
              key={u.id}
              style={{
                background: "var(--card)",
                border: "1px solid var(--line)",
                borderRadius: "10px",
                padding: "12px 16px",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              <span>{u.email}</span>
              <span className="muted" style={{ fontSize: ".85rem" }}>
                {u.last_sign_in_at
                  ? `Último ingreso: ${new Date(u.last_sign_in_at).toLocaleDateString("es-CL")}`
                  : "Nunca ingresó"}
              </span>
            </div>
          ))}
          {!error && admins.length === 0 && <p className="muted">No hay cuentas admin todavía.</p>}
        </div>
      </div>
    </>
  );
}
