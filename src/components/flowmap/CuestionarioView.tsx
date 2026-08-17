"use client";

import { useState } from "react";
import { ELEMENTOS, EVALUACIONES } from "@/lib/flowmap/data";
import type { DatosIniciales, ElementoId, EstadoFlowMap, Respuesta } from "@/lib/flowmap/types";
import { respuestaDe } from "@/lib/flowmap/useFlowMapState";
import DatosForm from "./DatosForm";
import EtapasStepper from "./EtapasStepper";
import PreguntaCard from "./PreguntaCard";
import ReviewScreen from "./ReviewScreen";
import styles from "./flowmap.module.css";

function elementosYaMostrados(indiceActual: EstadoFlowMap["indiceActual"]): Set<ElementoId> {
  const set = new Set<ElementoId>();
  if (typeof indiceActual === "number") {
    for (let i = 0; i < indiceActual; i++) set.add(EVALUACIONES[i].elemento);
  } else if (indiceActual === "review") {
    (["fuego", "aire", "agua", "tierra"] as ElementoId[]).forEach((e) => set.add(e));
  }
  return set;
}

export default function CuestionarioView({
  active,
  estado,
  setDatosIniciales,
  setIndice,
  setRespuesta,
  onCalcular,
  onGuardarContinuar,
}: {
  active: boolean;
  estado: EstadoFlowMap;
  setDatosIniciales: (datos: DatosIniciales) => void;
  setIndice: (idx: "datos" | "review" | number) => void;
  setRespuesta: (principioId: string, respuesta: Respuesta) => void;
  onCalcular: () => void;
  onGuardarContinuar: () => void;
}) {
  const [transicionesVistas, setTransicionesVistas] = useState<Set<ElementoId>>(() => elementosYaMostrados(estado.indiceActual));
  const { indiceActual, respuestas } = estado;

  const respondidas = EVALUACIONES.filter((ev) => (respuestas[ev.id]?.escala ?? null) !== null).length;
  const pct = Math.round((respondidas / EVALUACIONES.length) * 100);

  let progressText: string;
  if (indiceActual === "datos") progressText = "Etapa 1 de 5 — Autodiagnóstico (datos iniciales)";
  else if (indiceActual === "review") progressText = `Revisión final — ${respondidas} de ${EVALUACIONES.length} evaluaciones respondidas`;
  else progressText = `Evaluación ${indiceActual + 1} de ${EVALUACIONES.length}`;

  let transicion: { elemento: ElementoId } | null = null;
  if (typeof indiceActual === "number") {
    const ev = EVALUACIONES[indiceActual];
    const esPrimeraDeElemento = indiceActual === 0 || EVALUACIONES[indiceActual - 1].elemento !== ev.elemento;
    if (esPrimeraDeElemento && !transicionesVistas.has(ev.elemento)) {
      transicion = { elemento: ev.elemento };
    }
  }

  function irA(idx: "datos" | "review" | number) {
    if (typeof idx === "number") {
      const elemento = EVALUACIONES[idx].elemento;
      if (!transicionesVistas.has(elemento)) {
        setTransicionesVistas((prev) => new Set(prev).add(elemento));
      }
    }
    setIndice(idx);
  }

  return (
    <section className={`${styles.view} ${active ? styles.active : ""}`} aria-labelledby="cuestionario-title">
      <h2 id="cuestionario-title" className={styles.visuallyHidden}>Cuestionario</h2>

      <div className={styles.progressWrap}>
        <EtapasStepper indiceActual={indiceActual} respuestas={respuestas} />
        <div className={styles.progressBarBg}>
          <div className={styles.progressBarFill} style={{ width: `${pct}%` }} />
        </div>
        <div className={styles.progressLabel}>
          <span>{progressText}</span>
          <span>Tus respuestas se guardan automáticamente en este dispositivo.</span>
        </div>
      </div>

      {transicion && (
        <div className={`${styles.transitionScreen} ${styles[transicion.elemento]}`}>
          <h2>{ELEMENTOS[transicion.elemento].icon} {ELEMENTOS[transicion.elemento].nombre} — {ELEMENTOS[transicion.elemento].ambito}</h2>
          <p>{ELEMENTOS[transicion.elemento].transicion}</p>
        </div>
      )}

      {indiceActual === "datos" && (
        <DatosForm datos={estado.datosIniciales} onChange={setDatosIniciales} onComenzar={() => irA(0)} />
      )}

      {typeof indiceActual === "number" && (
        <PreguntaCard
          evaluacion={EVALUACIONES[indiceActual]}
          indice={indiceActual}
          total={EVALUACIONES.length}
          respuesta={respuestaDe(estado, EVALUACIONES[indiceActual].id)}
          onChange={(r) => setRespuesta(EVALUACIONES[indiceActual].id, r)}
          onAnterior={() => irA(indiceActual > 0 ? indiceActual - 1 : "datos")}
          onSiguiente={() => irA(indiceActual < EVALUACIONES.length - 1 ? indiceActual + 1 : "review")}
          onGuardarContinuar={onGuardarContinuar}
          esUltima={indiceActual === EVALUACIONES.length - 1}
        />
      )}

      {indiceActual === "review" && (
        <ReviewScreen
          respuestas={respuestas}
          onIrA={(idx) => irA(idx)}
          onAnterior={() => irA(EVALUACIONES.length - 1)}
          onCalcular={onCalcular}
        />
      )}
    </section>
  );
}
