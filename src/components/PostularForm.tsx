"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function PostularForm() {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<{ nombre: string; mentoria: boolean } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (String(fd.get("website") || "")) return; // honeypot — bot submission, silently drop
    setSending(true);
    setError("");
    const quiereMentoria = fd.get("mentoria") === "on";
    const quien = String(fd.get("quien") || "");

    const supabase = createClient();
    const { error: insertError } = await supabase.from("postulations").insert({
      quien,
      email: String(fd.get("email") || ""),
      donde: String(fd.get("donde") || ""),
      territorio: String(fd.get("territorio") || "") || null,
      tipo_oferta: String(fd.get("tipo") || ""),
      que_hace: String(fd.get("quehaces") || ""),
      oferta: String(fd.get("oferta") || ""),
      r_viajero: String(fd.get("rViajero") || "") || null,
      r_comunidad: String(fd.get("rComunidad") || "") || null,
      r_naturaleza: String(fd.get("rNaturaleza") || "") || null,
      ritmos: String(fd.get("ritmos") || "") || null,
      evidencias: String(fd.get("evidencias") || "") || null,
      fortalecer: String(fd.get("fortalecer") || "") || null,
      quiere_mentoria: quiereMentoria,
    });

    setSending(false);
    if (insertError) {
      setError("No pudimos enviar tu postulación. Intenta de nuevo en unos minutos.");
      return;
    }
    setDone({ nombre: quien.split(" ")[0] || "", mentoria: quiereMentoria });
    window.scrollTo(0, 0);
  }

  if (done) {
    return (
      <div className="center">
        <div
          className="rel-icon"
          style={{ margin: "0 auto 18px", width: "70px", height: "70px", background: "#dde7dd", color: "var(--forest)", fontSize: "2rem" }}
        >
          ✓
        </div>
        <h2>Gracias, {done.nombre}</h2>
        <p className="lead">
          Recibimos la postulación de tu proyecto. Nuestro equipo de curaduría IGTR la revisará y te
          enviará una lectura honesta de tu nivel regenerativo y de los próximos pasos para enraizar tu
          propuesta{done.mentoria ? ", junto con opciones de mentoría" : ""}.
        </p>
        <div className="hero-actions" style={{ justifyContent: "center", marginTop: "20px" }}>
          <Link href="/explorar" className="btn btn-primary">
            Explorar la red
          </Link>
          <Link href="/" className="btn btn-ghost">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form className="formstep" onSubmit={handleSubmit}>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
      />
      <h3>Quién eres y qué habitas</h3>
      <div className="field-row">
        <div className="field">
          <label>¿Quién eres?</label>
          <input name="quien" required maxLength={120} placeholder="Nombre y rol" />
        </div>
        <div className="field">
          <label>Correo de contacto</label>
          <input type="email" name="email" required maxLength={160} placeholder="tu@correo.com" />
        </div>
      </div>
      <div className="field-row">
        <div className="field">
          <label>¿Dónde estás? (país / región)</label>
          <input name="donde" required placeholder="Ej: Chile, La Araucanía" />
        </div>
        <div className="field">
          <label>¿Qué territorio habitas?</label>
          <input name="territorio" placeholder="Cuenca, valle, bioregión…" />
        </div>
      </div>
      <div className="field">
        <label>¿Qué haces? Cuéntanos tu proyecto</label>
        <textarea name="quehaces" required placeholder="Tu vocación, tu historia, tu lugar…" />
      </div>

      <div className="divider" style={{ margin: "24px 0" }} />
      <h3>Qué ofreces</h3>
      <div className="field">
        <label>Tipo de oferta</label>
        <select name="tipo" required defaultValue="">
          <option value="" disabled>
            Selecciona…
          </option>
          <option>Experiencia regenerativa</option>
          <option>Hospedaje regenerativo</option>
          <option>Guiado regenerativo</option>
          <option>Más de una</option>
        </select>
      </div>
      <div className="field">
        <label>Describe tu experiencia, hospedaje o guiado</label>
        <textarea name="oferta" required />
      </div>

      <div className="divider" style={{ margin: "24px 0" }} />
      <h3>Las tres relaciones</h3>
      <div className="field">
        <label>¿Qué relación cuidas con el viajero?</label>
        <textarea name="rViajero" placeholder="Bienestar, presencia, aprendizaje, transformación…" />
      </div>
      <div className="field">
        <label>¿Qué relación cuidas con la comunidad?</label>
        <textarea name="rComunidad" placeholder="Empleo local, cultura viva, acuerdos…" />
      </div>
      <div className="field">
        <label>¿Qué relación cuidas con la naturaleza?</label>
        <textarea name="rNaturaleza" placeholder="Agua, suelo, biodiversidad, residuos…" />
      </div>
      <div className="field">
        <label>¿Qué ritmos del lugar reconoces?</label>
        <textarea name="ritmos" placeholder="Temporadas sensibles, festividades, ciclos…" />
      </div>

      <div className="divider" style={{ margin: "24px 0" }} />
      <h3>Evidencias y evolución</h3>
      <div className="field">
        <label>¿Qué evidencias puedes mostrar?</label>
        <textarea name="evidencias" placeholder="Acuerdos, prácticas, datos, fotos, certificaciones…" />
      </div>
      <div className="field">
        <label>¿Qué necesitas fortalecer?</label>
        <textarea name="fortalecer" placeholder="Sé honesto: aquí empieza la mejora." />
      </div>
      <div className="field">
        <div className="checkrow">
          <input type="checkbox" name="mentoria" id="ment" />
          <label htmlFor="ment" style={{ margin: 0 }}>
            Quiero acceder a <b>mentoría IGTR</b> para fortalecer mi propuesta
          </label>
        </div>
      </div>

      {error && <p style={{ color: "var(--red)", fontSize: ".9rem" }}>{error}</p>}

      <button className="btn btn-terra btn-block" type="submit" style={{ marginTop: "10px" }} disabled={sending}>
        {sending ? "Enviando…" : "Enviar postulación"}
      </button>
      <p className="note muted" style={{ textAlign: "center", marginTop: "12px", fontSize: ".82rem" }}>
        Recibirás una lectura honesta de tu nivel regenerativo y próximos pasos.
      </p>
    </form>
  );
}
