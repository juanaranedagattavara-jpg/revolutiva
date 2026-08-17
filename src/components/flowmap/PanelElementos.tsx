import { ELEMENTOS, ELEMENTO_COLOR_HEX, ORDEN_ELEMENTOS, PRINCIPIOS, getNivel } from "@/lib/flowmap/data";
import { fmt1, pct, pctNum } from "@/lib/flowmap/scoring";
import type { ResultadosCompletos } from "@/lib/flowmap/types";
import BarChart from "./BarChart";
import DonutRing from "./DonutRing";
import RadarChart from "./RadarChart";
import styles from "./flowmap.module.css";

export default function PanelElementos({ resultados }: { resultados: ResultadosCompletos }) {
  const colores = ORDEN_ELEMENTOS.map((k) => ELEMENTO_COLOR_HEX[k]);

  return (
    <>
      <h3 style={{ fontSize: "1.3rem" }}>FlowMap — Cuatro elementos</h3>
      <div className={`${styles.resultGrid} ${styles.resultGridElementos}`}>
        {ORDEN_ELEMENTOS.map((key) => {
          const el = ELEMENTOS[key];
          const val = resultados.elementos[key];
          const niv = val !== null ? getNivel(val) : null;
          const principiosVals = el.principios.map((pid) => ({ id: pid, v: resultados.principios[pid] })).filter((p) => p.v !== null) as { id: string; v: number }[];
          const fort = principiosVals.length ? principiosVals.reduce((a, b) => (a.v > b.v ? a : b)) : null;
          const evol = principiosVals.length ? principiosVals.reduce((a, b) => (a.v < b.v ? a : b)) : null;
          const otros = ORDEN_ELEMENTOS.filter((k) => k !== key).map((k) => resultados.elementos[k]).filter((v): v is number => v !== null);
          const maxOtro = otros.length ? Math.max(...otros, val || 0) : val;
          const diferencia = val !== null && maxOtro !== undefined && maxOtro !== null ? maxOtro - val : null;

          return (
            <div key={key} className={`${styles.resultCardVisual} ${styles[el.claseColor]}`}>
              <span className={styles.iconBig} aria-hidden="true">{el.icon}</span>
              <h3>{el.nombre} — {el.ambito}</h3>
              <div className={styles.ringRow}>
                <DonutRing pctValue={pctNum(val)} size={74} stroke={8} arcColor="#ffffff" trackColor="rgba(255,255,255,0.28)" textColor="#ffffff" />
                <div>
                  <div className={styles.resultScore} style={{ color: "#fff" }}>
                    {fmt1(val)}<span className={styles.of7} style={{ color: "rgba(255,255,255,0.8)" }}> / 7</span>
                  </div>
                  {niv && <span className={styles.levelBadge}>{niv.nivel}</span>}
                </div>
              </div>
              {niv && <p className={styles.visualDesc}>{niv.texto}</p>}
              <strong style={{ fontSize: ".85rem" }}>Puntuación de sus cuatro principios:</strong>
              <ul className={styles.resultDetailList}>
                {el.principios.map((pid) => (
                  <li key={pid}><span>{PRINCIPIOS[pid].nombre}</span><span>{fmt1(resultados.principios[pid])}</span></li>
                ))}
              </ul>
              {fort && <p style={{ fontSize: ".85rem", marginTop: ".5rem" }}><strong>Principio más fortalecido:</strong> {PRINCIPIOS[fort.id].nombre} ({fmt1(fort.v)})</p>}
              {evol && <p style={{ fontSize: ".85rem" }}><strong>Mayor posibilidad de evolución:</strong> {PRINCIPIOS[evol.id].nombre} ({fmt1(evol.v)})</p>}
              {diferencia !== null && <p style={{ fontSize: ".8rem", color: "rgba(255,255,255,0.85)" }}>Diferencia respecto del elemento con mayor puntuación: {diferencia.toFixed(1)}</p>}
            </div>
          );
        })}
      </div>

      <div className={styles.chartFlex}>
        <div className={styles.chartWrap}>
          <h4>Gráfico radar — cuatro elementos</h4>
          <RadarChart
            labels={ORDEN_ELEMENTOS.map((k) => ELEMENTOS[k].nombre)}
            valores={ORDEN_ELEMENTOS.map((k) => resultados.elementos[k])}
            colores={colores}
            ariaLabel="Gráfico radar de los cuatro elementos"
          />
        </div>
        <div className={styles.chartWrap}>
          <h4>Gráfico de barras — cuatro elementos</h4>
          <BarChart
            labels={ORDEN_ELEMENTOS.map((k) => ELEMENTOS[k].nombre)}
            valores={ORDEN_ELEMENTOS.map((k) => resultados.elementos[k])}
            colores={colores}
            ariaLabel="Gráfico de barras de los cuatro elementos"
          />
        </div>
      </div>

      <div className={styles.dataTableWrap}>
        <h4>Tabla comparativa</h4>
        <table>
          <thead><tr><th>Elemento</th><th>Ámbito</th><th>Puntuación</th><th>Porcentaje</th><th>Nivel</th></tr></thead>
          <tbody>
            {ORDEN_ELEMENTOS.map((k) => {
              const el = ELEMENTOS[k];
              const v = resultados.elementos[k];
              const n = v !== null ? getNivel(v) : null;
              return (
                <tr key={k}>
                  <td>{el.icon} {el.nombre}</td>
                  <td>{el.ambito}</td>
                  <td>{fmt1(v)}</td>
                  <td>{pct(v)}</td>
                  <td>{n ? n.nivel : "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
