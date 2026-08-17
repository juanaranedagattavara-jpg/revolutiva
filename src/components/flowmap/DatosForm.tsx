"use client";

import { useState } from "react";
import { MODALIDADES, TIPOS_ORGANIZACION } from "@/lib/flowmap/data";
import type { DatosIniciales } from "@/lib/flowmap/types";
import styles from "./flowmap.module.css";

export default function DatosForm({
  datos,
  onChange,
  onComenzar,
}: {
  datos: DatosIniciales;
  onChange: (datos: DatosIniciales) => void;
  onComenzar: () => void;
}) {
  const [showValidation, setShowValidation] = useState(false);
  const fecha = datos.fecha || new Date().toISOString().slice(0, 10);

  function set<K extends keyof DatosIniciales>(key: K, value: DatosIniciales[K]) {
    onChange({ ...datos, [key]: value });
    if (key === "email" && value) setShowValidation(false);
  }

  function handleComenzar() {
    const emailVal = (datos.email || "").trim();
    const emailOk = emailVal && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
    if (!emailOk) {
      setShowValidation(true);
      document.getElementById("f-email")?.focus();
      return;
    }
    onComenzar();
  }

  return (
    <div className={`${styles.card} ${styles.preguntaCard}`}>
      <div className={styles.preguntaMeta}>
        <span className={`${styles.tag} ${styles.neutral}`}>Etapa 1 · Autodiagnóstico</span>
      </div>
      <h3 className={styles.preguntaTitulo}>Autodiagnóstico</h3>
      <p className={styles.sectionSub}>Antes de comenzar, cuéntanos brevemente quién realiza este autodiagnóstico.</p>

      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label htmlFor="f-org">Nombre de la organización</label>
          <input id="f-org" autoComplete="organization" value={datos.organizacion} onChange={(e) => set("organizacion", e.target.value)} />
        </div>
        <div className={styles.field}>
          <label htmlFor="f-tipo">Tipo de organización</label>
          <select id="f-tipo" value={datos.tipo} onChange={(e) => set("tipo", e.target.value)}>
            <option value="">Selecciona una opción</option>
            {TIPOS_ORGANIZACION.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="f-persona">Nombre de la persona que responde</label>
          <input id="f-persona" autoComplete="name" value={datos.persona} onChange={(e) => set("persona", e.target.value)} />
        </div>
        <div className={styles.field}>
          <label htmlFor="f-cargo">Cargo o función</label>
          <input id="f-cargo" value={datos.cargo} onChange={(e) => set("cargo", e.target.value)} />
        </div>
        <div className={styles.field}>
          <label htmlFor="f-email">Correo electrónico <span className={styles.reqMark}>*</span></label>
          <input id="f-email" type="email" autoComplete="email" required value={datos.email} onChange={(e) => set("email", e.target.value)} />
        </div>
        <div className={styles.field}>
          <label htmlFor="f-whatsapp">WhatsApp <span className={styles.optMark}>(opcional)</span></label>
          <input id="f-whatsapp" type="tel" autoComplete="tel" value={datos.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} />
        </div>
        <div className={styles.field}>
          <label htmlFor="f-territorio">Territorio, localidad o destino</label>
          <input id="f-territorio" value={datos.territorio} onChange={(e) => set("territorio", e.target.value)} />
        </div>
        <div className={styles.field}>
          <label htmlFor="f-fecha">Fecha del diagnóstico</label>
          <input id="f-fecha" type="date" value={fecha} onChange={(e) => set("fecha", e.target.value)} />
        </div>
        <div className={`${styles.field} ${styles.fieldFull}`}>
          <label>Modalidad</label>
          <div className={styles.radioGroup}>
            {MODALIDADES.map((m) => (
              <label key={m}>
                <input type="radio" name="modalidad" value={m} checked={datos.modalidad === m} onChange={() => set("modalidad", m)} /> {m}
              </label>
            ))}
          </div>
        </div>
      </div>

      {showValidation && <div className={styles.validationMsg}>Ingresa un correo electrónico válido para comenzar.</div>}

      <div className={styles.navButtons}>
        <span />
        <div className={styles.rightGroup}>
          <button type="button" className={`${styles.btn} ${styles.btnBig}`} onClick={handleComenzar}>
            Comenzar el autodiagnóstico
          </button>
        </div>
      </div>
    </div>
  );
}
