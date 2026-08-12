"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { showToast } from "./Toast";

interface Props {
  listingId: string;
  listingName: string;
  anfitrion: string;
  accion: string;
  onClose: () => void;
}

export default function LeadFormModal({ listingId, listingName, anfitrion, accion, onClose }: Props) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");
    const supabase = createClient();
    const { error: insertError } = await supabase.from("leads").insert({
      listing_id: listingId,
      listing_name: listingName,
      accion,
      nombre,
      email,
      telefono: telefono || null,
      mensaje: mensaje || null,
      source_url: typeof window !== "undefined" ? window.location.href : null,
    });
    setSending(false);
    if (insertError) {
      setError("No pudimos enviar tu solicitud. Intenta de nuevo en unos minutos.");
      return;
    }
    showToast(`✓ "${accion}" enviada a ${anfitrion || listingName}. Te contactaremos pronto.`);
    onClose();
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(20,28,20,.55)",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="formstep"
        style={{ maxWidth: "480px", width: "100%", maxHeight: "90vh", overflow: "auto" }}
      >
        <div className="eyebrow">{accion}</div>
        <h3 style={{ marginTop: ".2em" }}>{listingName}</h3>
        <p className="muted" style={{ fontSize: ".9rem" }}>
          Déjanos tus datos y te contactaremos en un máximo de 48&nbsp;h.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Nombre</label>
            <input required value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Tu nombre" />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
            />
          </div>
          <div className="field">
            <label>Teléfono <span className="hint">(opcional)</span></label>
            <input value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="+56 9…" />
          </div>
          <div className="field">
            <label>Mensaje <span className="hint">(opcional)</span></label>
            <textarea
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Cuéntanos fechas, número de personas o cualquier detalle…"
            />
          </div>
          {error && (
            <p style={{ color: "var(--red)", fontSize: ".85rem" }}>{error}</p>
          )}
          <div className="stack" style={{ display: "flex", gap: "10px" }}>
            <button type="button" className="btn btn-ghost btn-block" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-terra btn-block" disabled={sending}>
              {sending ? "Enviando…" : "Enviar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
