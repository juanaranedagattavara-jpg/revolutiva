"use client";

import { useState } from "react";
import { ELEMENTOS, ESCALA_SIGNIFICADOS, ORDEN_ELEMENTOS, PRINCIPIOS } from "@/lib/flowmap/data";
import type { Respuestas } from "@/lib/flowmap/types";
import styles from "./flowmap.module.css";

export default function PanelCuaderno({ respuestas }: { respuestas: Respuestas }) {
  const [buscar, setBuscar] = useState("");
  const term = buscar.toLowerCase().trim();

  return (
    <div className={styles.card}>
      <h3 style={{ fontSize: "1.3rem" }}>Cuaderno de reflexión</h3>
      <div className={styles.cuadernoControls}>
        <input
          type="search"
          placeholder="Buscar palabras dentro de las reflexiones…"
          aria-label="Buscar en el cuaderno de reflexión"
          value={buscar}
          onChange={(e) => setBuscar(e.target.value)}
        />
        <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => window.print()}>
          Imprimir cuaderno
        </button>
      </div>
      {ORDEN_ELEMENTOS.map((elKey) => {
        const el = ELEMENTOS[elKey];
        return (
          <div key={elKey} className={`${styles.cuadernoElementoBlock} ${styles[el.claseColor]}`}>
            <h3>{el.icon} {el.nombre} — {el.ambito}</h3>
            {el.principios.map((pid) => {
              const p = PRINCIPIOS[pid];
              const resp = respuestas[pid] ?? { escala: null, texto: "" };
              const searchable = `${p.nombre} ${p.preguntas.join(" ")} ${resp.texto || ""}`.toLowerCase();
              if (term && !searchable.includes(term)) return null;
              const significado = resp.escala !== null ? `${resp.escala} — ${ESCALA_SIGNIFICADOS[resp.escala].titulo}` : "Sin puntuar";
              return (
                <details key={pid} className={styles.reflexionEntry} open={!!term}>
                  <summary>{p.nombre}</summary>
                  <div className={styles.entryBody}>
                    {p.preguntas.map((q, i) => (
                      <p key={q}><strong>Pregunta {i + 1}:</strong> {q}</p>
                    ))}
                    <p><strong>Puntuación:</strong> {significado}</p>
                    <p>
                      <strong>Reflexión escrita:</strong>{" "}
                      {resp.texto?.trim() ? resp.texto : <span className={styles.empty}>Sin reflexión escrita.</span>}
                    </p>
                  </div>
                </details>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
