"use client";

import { useState } from "react";
import { ELEMENTOS, ESCALA_SIGNIFICADOS } from "@/lib/flowmap/data";
import type { Principio, Respuesta } from "@/lib/flowmap/types";
import styles from "./flowmap.module.css";

const ESCALAS = [0, 1, 2, 3, 4, 5, 6, 7];

export default function PreguntaCard({
  evaluacion,
  indice,
  total,
  respuesta,
  onChange,
  onAnterior,
  onSiguiente,
  onGuardarContinuar,
  esUltima,
}: {
  evaluacion: Principio;
  indice: number;
  total: number;
  respuesta: Respuesta;
  onChange: (respuesta: Respuesta) => void;
  onAnterior: () => void;
  onSiguiente: () => void;
  onGuardarContinuar: () => void;
  esUltima: boolean;
}) {
  const [showValidation, setShowValidation] = useState(false);
  const el = ELEMENTOS[evaluacion.elemento];
  const etapaNum = ["fuego", "aire", "agua", "tierra"].indexOf(evaluacion.elemento) + 2;
  const recomienda = respuesta.escala !== null && (respuesta.escala <= 2 || respuesta.escala >= 6);

  function handleEscala(valor: number) {
    onChange({ ...respuesta, escala: valor });
    setShowValidation(false);
  }

  function handleSiguiente() {
    if (respuesta.escala === null) {
      setShowValidation(true);
      return;
    }
    onSiguiente();
  }

  return (
    <div className={`${styles.card} ${styles.preguntaCard} ${styles[el.claseColor]}`}>
      <div className={styles.preguntaTopRow}>
        <div className={`${styles.preguntaElementoBox} ${styles[el.claseColor]}`}>
          <span className={styles.icon} aria-hidden="true">{el.icon}</span>
          <span>{el.nombre} — {el.ambito}</span>
        </div>
        <div className={styles.preguntaDireccionBox}>
          <span className={styles.label}>Dirección del principio</span>
          <p>{evaluacion.direccion}</p>
        </div>
      </div>

      <h3 className={styles.preguntaTitulo}>Principio: {evaluacion.nombre}</h3>
      <div className={styles.preguntaMeta}>
        <span className={`${styles.tag} ${styles.neutral}`}>Etapa {etapaNum} de 5</span>
        <span className={`${styles.tag} ${styles.neutral}`}>Evaluación {indice + 1} de {total}</span>
      </div>

      <div className={styles.preguntasGenerativasBox}>
        <span className={styles.pgTitle}>Preguntas orientadoras</span>
        <ul className={styles.subpreguntasListCompact}>
          {evaluacion.preguntas.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
      </div>

      <div className={styles.reflexionWrap}>
        <label htmlFor={`reflexion-${evaluacion.id}`}>Reflexión, evidencias o ejemplos</label>
        <p className={styles.reflexionHint}>Describe prácticas, ejemplos, contradicciones, aprendizajes, evidencias o desafíos relacionados con estas preguntas.</p>
        <textarea
          id={`reflexion-${evaluacion.id}`}
          value={respuesta.texto}
          onChange={(e) => onChange({ ...respuesta, texto: e.target.value })}
        />
        {recomienda && (
          <p className={styles.reflexionRecommend}>
            {respuesta.escala !== null && respuesta.escala <= 2
              ? "Se recomienda especialmente describir la brecha."
              : "Se recomienda especialmente aportar evidencias."}
          </p>
        )}
      </div>

      <div className={styles.escalaWrap} role="group" aria-label={`Puntuación para ${evaluacion.nombre}`}>
        <span className={styles.escalaTitle}>Puntuación (0 a 7) — evalúa en conjunto las preguntas anteriores</span>
        <div className={styles.escalaButtons}>
          {ESCALAS.map((n) => (
            <button
              key={n}
              type="button"
              className={styles.escalaBtn}
              data-valor={n}
              aria-pressed={respuesta.escala === n}
              aria-label={`Puntuación ${n}: ${ESCALA_SIGNIFICADOS[n].titulo}`}
              onClick={() => handleEscala(n)}
            >
              {n}
            </button>
          ))}
        </div>
        {respuesta.escala !== null && (
          <div className={styles.escalaMeaning}>
            <strong>{respuesta.escala} — {ESCALA_SIGNIFICADOS[respuesta.escala].titulo}</strong>
          </div>
        )}
      </div>

      {showValidation && <div className={styles.validationMsg}>Selecciona una puntuación entre 0 y 7 para continuar.</div>}

      <div className={styles.navButtons}>
        <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={onAnterior}>← Anterior</button>
        <div className={styles.rightGroup}>
          <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={onGuardarContinuar}>Guardar y continuar después</button>
          <button type="button" className={styles.btn} onClick={handleSiguiente}>{esUltima ? "Ir a revisión →" : "Siguiente →"}</button>
        </div>
      </div>
    </div>
  );
}
