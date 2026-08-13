"use client";

import { useRef, useState, useTransition } from "react";
import { createAdminUser } from "@/app/admin/usuarios/actions";

export default function CreateAdminForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError("");
    setSuccess(false);
    startTransition(async () => {
      const result = await createAdminUser(formData);
      if (result?.error) {
        setError(result.error);
        return;
      }
      setSuccess(true);
      formRef.current?.reset();
    });
  }

  return (
    <form ref={formRef} action={handleSubmit} className="formstep" style={{ display: "grid", gap: "14px" }}>
      <div className="field">
        <label>Email</label>
        <input type="email" name="email" required placeholder="nombre@igtr.org" />
      </div>
      <div className="field">
        <label>Contraseña temporal</label>
        <input type="password" name="password" required minLength={8} placeholder="Mínimo 8 caracteres" />
      </div>
      {error && <p style={{ color: "var(--red)", fontSize: ".88rem" }}>{error}</p>}
      {success && <p style={{ color: "var(--forest)", fontSize: ".88rem" }}>✓ Cuenta admin creada.</p>}
      <button type="submit" className="btn btn-primary" disabled={pending} style={{ justifySelf: "start" }}>
        {pending ? "Creando…" : "Crear cuenta admin"}
      </button>
    </form>
  );
}
