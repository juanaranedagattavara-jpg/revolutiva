"use client";

import { useState } from "react";
import { calcularResultadosCompletos } from "@/lib/flowmap/scoring";
import type { DatosIniciales, RId, Respuestas } from "@/lib/flowmap/types";
import ModalTrazabilidad from "./ModalTrazabilidad";
import PanelCuaderno from "./PanelCuaderno";
import PanelElementos from "./PanelElementos";
import PanelMatriz from "./PanelMatriz";
import PanelRs from "./PanelRs";
import PanelSintesis from "./PanelSintesis";
import styles from "./flowmap.module.css";

const TABS = [
  { id: "sintesis", label: "Síntesis general" },
  { id: "elementos", label: "Cuatro elementos" },
  { id: "rs", label: "Cinco R" },
  { id: "cuaderno", label: "Cuaderno de reflexión" },
  { id: "matriz", label: "Matriz de trazabilidad" },
] as const;

type TabId = (typeof TABS)[number]["id"];

/** Vista de solo lectura para el panel admin — reusa los paneles del FlowMap sin las acciones de reinicio/edición. */
export default function AdminFlowmapResultView({ datosIniciales, respuestas }: { datosIniciales: DatosIniciales; respuestas: Respuestas }) {
  const [tab, setTab] = useState<TabId>("sintesis");
  const [modalR, setModalR] = useState<RId | null>(null);
  const resultados = calcularResultadosCompletos(respuestas);

  return (
    <div className={styles.app}>
      <div className={styles.resultsTabs}>
        {TABS.map((t) => (
          <button key={t.id} type="button" aria-current={tab === t.id} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      <div>
        {tab === "sintesis" && <PanelSintesis resultados={resultados} datosIniciales={datosIniciales} />}
        {tab === "elementos" && <PanelElementos resultados={resultados} />}
        {tab === "rs" && <PanelRs resultados={resultados} onAbrirModal={setModalR} />}
        {tab === "cuaderno" && <PanelCuaderno respuestas={respuestas} />}
        {tab === "matriz" && <PanelMatriz resultados={resultados} />}
      </div>
      <ModalTrazabilidad rId={modalR} resultados={resultados} respuestas={respuestas} onClose={() => setModalR(null)} />
    </div>
  );
}
