import { ELEMENTOS, EVALUACIONES } from "@/lib/flowmap/data";
import type { Respuestas } from "@/lib/flowmap/types";
import styles from "./flowmap.module.css";

export default function ReviewScreen({
  respuestas,
  onIrA,
  onAnterior,
  onCalcular,
}: {
  respuestas: Respuestas;
  onIrA: (idx: number) => void;
  onAnterior: () => void;
  onCalcular: () => void;
}) {
  const respondidas = EVALUACIONES.filter((ev) => (respuestas[ev.id]?.escala ?? null) !== null);
  const pendientes = EVALUACIONES.filter((ev) => (respuestas[ev.id]?.escala ?? null) === null);
  const reflexiones = EVALUACIONES.filter((ev) => (respuestas[ev.id]?.texto || "").trim().length > 0);

  return (
    <div className={styles.card}>
      <h2 className={styles.sectionTitle} style={{ fontSize: "1.4rem" }}>Revisión antes de calcular resultados</h2>
      <div className={styles.reviewStats}>
        <div className={styles.reviewStat}><span className={styles.num}>{respondidas.length}</span><span className={styles.lbl}>Evaluaciones contestadas</span></div>
        <div className={styles.reviewStat}><span className={styles.num}>{pendientes.length}</span><span className={styles.lbl}>Evaluaciones pendientes</span></div>
        <div className={styles.reviewStat}><span className={styles.num}>{reflexiones.length}</span><span className={styles.lbl}>Reflexiones escritas</span></div>
      </div>

      {pendientes.length > 0 ? (
        <>
          <h3 style={{ fontSize: "1.05rem" }}>Evaluaciones pendientes</h3>
          <ul className={styles.pendingList}>
            {pendientes.map((ev) => (
              <li key={ev.id}>
                <span>{ELEMENTOS[ev.elemento].icon} {ev.nombre}</span>
                <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => onIrA(EVALUACIONES.indexOf(ev))}>
                  Responder
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className={styles.noticeList}>
          <p style={{ margin: 0 }}>Todas las evaluaciones han sido contestadas. Puedes calcular tus resultados o volver a editar cualquier respuesta.</p>
        </div>
      )}

      <div className={styles.navButtons}>
        <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={onAnterior}>← Volver a la última evaluación</button>
        <div className={styles.rightGroup}>
          <button type="button" className={`${styles.btn} ${styles.btnBig}`} disabled={pendientes.length > 0} onClick={onCalcular}>
            Calcular mis resultados
          </button>
        </div>
      </div>
    </div>
  );
}
