"use client";

import { useEffect, useState } from "react";
import type { DatosIniciales, ResultadosCompletos, Respuestas, RId } from "@/lib/flowmap/types";
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

export default function ResultadosView({
  active,
  resultados,
  datosIniciales,
  respuestas,
  onReset,
  onEditBack,
  onDownload,
}: {
  active: boolean;
  resultados: ResultadosCompletos;
  datosIniciales: DatosIniciales;
  respuestas: Respuestas;
  onReset: () => void;
  onEditBack: () => void;
  onDownload: () => void;
}) {
  const [tab, setTab] = useState<TabId>("sintesis");
  const [modalR, setModalR] = useState<RId | null>(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const [incluirCuadernoImpresion, setIncluirCuadernoImpresion] = useState(true);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setShowResetModal(false);
        setModalR(null);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <section className={`${styles.view} ${active ? styles.active : ""}`} aria-labelledby="resultados-title">
      <h2 id="resultados-title" className={styles.sectionTitle}>Resultados del autodiagnóstico</h2>
      <p className={styles.sectionSub}>Estos resultados son un espejo de reflexión, no una certificación ni una evaluación externa.</p>

      <div className={`${styles.resultsTabs} ${styles.noPrint}`}>
        {TABS.map((t) => (
          <button key={t.id} type="button" aria-current={tab === t.id} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      <div className={`${styles.btnRow} ${styles.noPrint} ${styles.resultsBtnRow}`}>
        <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => setShowResetModal(true)}>Reiniciar diagnóstico</button>
        <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={onEditBack}>Volver a editar respuestas</button>
        <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={onDownload}>Descargar diagnóstico</button>
      </div>

      <div>
        <div className={`${styles.resultsPanel} ${tab === "sintesis" ? styles.active : ""}`}>
          <PanelSintesis resultados={resultados} datosIniciales={datosIniciales} />
        </div>
        <div className={`${styles.resultsPanel} ${tab === "elementos" ? styles.active : ""}`}>
          <PanelElementos resultados={resultados} />
        </div>
        <div className={`${styles.resultsPanel} ${tab === "rs" ? styles.active : ""}`}>
          <PanelRs resultados={resultados} onAbrirModal={setModalR} />
        </div>
        <div className={`${styles.resultsPanel} ${tab === "cuaderno" ? styles.active : ""} ${incluirCuadernoImpresion ? "" : styles.noPrint}`}>
          <PanelCuaderno
            respuestas={respuestas}
            incluirEnImpresion={incluirCuadernoImpresion}
            onToggleIncluirEnImpresion={setIncluirCuadernoImpresion}
          />
        </div>
        <div className={`${styles.resultsPanel} ${tab === "matriz" ? styles.active : ""}`}>
          <PanelMatriz resultados={resultados} />
        </div>
      </div>

      <div className={`${styles.privacyNote} ${styles.printOnly}`}>
        <p><strong>FlowMap de Turismo Regenerativo</strong> — Informe generado localmente. Este documento es una herramienta de reflexión y no constituye una certificación.</p>
      </div>

      <ModalTrazabilidad rId={modalR} resultados={resultados} respuestas={respuestas} onClose={() => setModalR(null)} />

      <div className={`${styles.modalOverlay} ${showResetModal ? styles.show : ""}`} role="dialog" aria-modal="true" aria-labelledby="modal-reset-title">
        <div className={styles.modalBox}>
          <h3 id="modal-reset-title">Confirmar reinicio</h3>
          <p>Esta acción eliminará todas las respuestas y resultados guardados en este dispositivo. ¿Deseas continuar?</p>
          <div className={styles.btnRow}>
            <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => setShowResetModal(false)}>Cancelar</button>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnDanger}`}
              onClick={() => {
                setShowResetModal(false);
                onReset();
              }}
            >
              Sí, reiniciar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
