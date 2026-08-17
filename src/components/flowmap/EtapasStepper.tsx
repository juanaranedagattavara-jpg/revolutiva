import { ELEMENTOS, EVALUACIONES, ORDEN_ELEMENTOS } from "@/lib/flowmap/data";
import type { ElementoId, Respuestas } from "@/lib/flowmap/types";
import styles from "./flowmap.module.css";

export default function EtapasStepper({
  indiceActual,
  respuestas,
}: {
  indiceActual: "datos" | "review" | number;
  respuestas: Respuestas;
}) {
  const elementoActual: ElementoId | null = typeof indiceActual === "number" ? EVALUACIONES[indiceActual].elemento : null;

  return (
    <div className={styles.etapasStepper}>
      <div className={`${styles.etapaPill} ${styles.datos} ${indiceActual === "datos" ? styles.actual : styles.completa}`}>
        Etapa 1: Autodiagnóstico
      </div>
      {ORDEN_ELEMENTOS.map((key, i) => {
        const el = ELEMENTOS[key];
        const evsDeEtapa = EVALUACIONES.filter((ev) => ev.elemento === key);
        const completas = evsDeEtapa.every((ev) => (respuestas[ev.id]?.escala ?? null) !== null);
        const cls = [styles.etapaPill, styles[el.claseColor]];
        if (key === elementoActual) cls.push(styles.actual);
        else if (completas) cls.push(styles.completa);
        return (
          <div key={key} className={cls.join(" ")}>
            Etapa {i + 2}: {el.nombre}
          </div>
        );
      })}
    </div>
  );
}
