import { ELEMENTOS, PRINCIPIOS, RS } from "@/lib/flowmap/data";
import { fmt1 } from "@/lib/flowmap/scoring";
import type { ResultadosCompletos, Respuestas, RId } from "@/lib/flowmap/types";
import styles from "./flowmap.module.css";

export default function ModalTrazabilidad({
  rId,
  resultados,
  respuestas,
  onClose,
}: {
  rId: RId | null;
  resultados: ResultadosCompletos;
  respuestas: Respuestas;
  onClose: () => void;
}) {
  const r = rId ? RS[rId] : null;

  return (
    <div className={`${styles.modalOverlay} ${rId ? styles.show : ""}`} role="dialog" aria-modal="true" aria-labelledby="modal-r-title">
      <div className={styles.modalBox} style={{ maxWidth: "640px", maxHeight: "85vh", overflowY: "auto" }}>
        <h3 id="modal-r-title">Trazabilidad{r ? ` — ${r.nombre}` : ""}</h3>
        <div>
          {r &&
            rId &&
            r.principios.map((pid) => {
              const p = PRINCIPIOS[pid];
              const el = ELEMENTOS[p.elemento];
              const val = resultados.principios[pid];
              const esSecundaria = p.rSecundaria === rId;
              const resp = respuestas[pid];
              return (
                <div key={pid} style={{ border: "1px solid var(--border)", borderRadius: "8px", padding: ".9rem", marginBottom: ".75rem" }}>
                  <span className={`${styles.tag} ${styles[el.claseColor]}`}>{el.icon} {el.nombre}</span>
                  {esSecundaria ? (
                    <span style={{ color: "var(--fuego-dark)", fontWeight: 700, marginLeft: ".5rem", fontSize: ".8rem" }}>Relación secundaria — puntuación completa</span>
                  ) : (
                    <span className={`${styles.tag} ${styles.neutral}`} style={{ marginLeft: ".5rem" }}>Relación principal</span>
                  )}
                  <h4 style={{ margin: ".5rem 0 .2rem" }}>
                    {p.nombre} <span style={{ fontWeight: 400, color: "var(--ink-soft)", fontSize: ".85rem" }}>(código {p.codigoR})</span>
                  </h4>
                  <p style={{ margin: "0 0 .5rem", fontWeight: 700 }}>Puntuación: {fmt1(val)} / 7</p>
                  {resp?.texto?.trim() && <div className={styles.reflexionQuote}>{resp.texto}</div>}
                </div>
              );
            })}
        </div>
        <div className={styles.btnRow}>
          <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}
