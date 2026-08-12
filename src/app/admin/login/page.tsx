"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (authError) {
      setError("Credenciales inválidas.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <section style={{ padding: "90px 0", minHeight: "60vh", display: "flex", alignItems: "center" }}>
      <div className="wrap" style={{ maxWidth: "420px" }}>
        <div className="eyebrow">REVOLUTIVA.TRAVEL</div>
        <h2>Acceso administrador</h2>
        <form className="formstep" onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <div className="field">
            <label>Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="field">
            <label>Contraseña</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p style={{ color: "var(--red)", fontSize: ".88rem" }}>{error}</p>}
          <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
            {loading ? "Ingresando…" : "Ingresar"}
          </button>
        </form>
      </div>
    </section>
  );
}
