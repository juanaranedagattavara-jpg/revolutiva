import { ORDEN_RS, PRINCIPIOS, RS, R_COLOR_HEX, getNivel, resolveColor } from "@/lib/flowmap/data";
import { fmt1, pct, pctNum } from "@/lib/flowmap/scoring";
import type { ResultadosCompletos, RId } from "@/lib/flowmap/types";
import BarChart from "./BarChart";
import DonutRing from "./DonutRing";
import RadarChart from "./RadarChart";
import styles from "./flowmap.module.css";

export default function PanelRs({ resultados, onAbrirModal }: { resultados: ResultadosCompletos; onAbrirModal: (rId: RId) => void }) {
  const colores = ORDEN_RS.map((k) => R_COLOR_HEX[k]);

  return (
    <>
      <div className={styles.resultGrid}>
        {ORDEN_RS.map((key) => {
          const r = RS[key];
          const val = resultados.rs[key];
          const niv = val !== null ? getNivel(val) : null;
          const principiosVals = r.principios.map((pid) => ({ id: pid, v: resultados.principios[pid] })).filter((p) => p.v !== null) as { id: string; v: number }[];
          const fort = principiosVals.length ? principiosVals.reduce((a, b) => (a.v > b.v ? a : b)) : null;
          const evol = principiosVals.length ? principiosVals.reduce((a, b) => (a.v < b.v ? a : b)) : null;

          return (
            <div
              key={key}
              className={`${styles.resultCard} ${styles[r.claseColor]}`}
              role="button"
              tabIndex={0}
              aria-label={`Ver trazabilidad completa de ${r.nombre}`}
              onClick={() => onAbrirModal(key)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onAbrirModal(key);
                }
              }}
            >
              <div className={styles.ringRow}>
                <DonutRing pctValue={pctNum(val)} size={64} stroke={7} arcColor={R_COLOR_HEX[key]} trackColor="var(--bg-alt)" />
                <div>
                  <h3 style={{ marginBottom: 0 }}>{r.nombre}</h3>
                  <div className={styles.resultScore}>{fmt1(val)}<span className={styles.of7}> / 7</span></div>
                </div>
              </div>
              {niv && <span className={styles.levelBadge} style={{ background: `${resolveColor(niv.color)}22`, color: resolveColor(niv.color) }}>{niv.nivel}</span>}
              <p style={{ fontSize: ".85rem", color: "var(--ink-soft)" }}>{r.descripcion}</p>
              <strong style={{ fontSize: ".85rem" }}>Principios que alimentan esta R:</strong>
              <ul className={styles.resultDetailList}>
                {r.principios.map((pid) => {
                  const p = PRINCIPIOS[pid];
                  const esSecundaria = p.rSecundaria === key;
                  return (
                    <li key={pid}>
                      <span>{p.nombre}{esSecundaria && <span style={{ color: "var(--fuego-dark)", fontWeight: 700 }}> (secundaria)</span>}</span>
                      <span>{fmt1(resultados.principios[pid])}</span>
                    </li>
                  );
                })}
              </ul>
              {fort && <p style={{ fontSize: ".85rem", marginTop: ".5rem" }}><strong>Fortaleza principal:</strong> {PRINCIPIOS[fort.id].nombre} ({fmt1(fort.v)})</p>}
              {evol && <p style={{ fontSize: ".85rem" }}><strong>Posibilidad de evolución:</strong> {PRINCIPIOS[evol.id].nombre} ({fmt1(evol.v)})</p>}
              <p className={styles.clickableHint}>Haz clic para ver la trazabilidad completa</p>
            </div>
          );
        })}
      </div>

      <div className={styles.chartFlex}>
        <div className={styles.chartWrap}>
          <h4>Gráfico radar — cinco R</h4>
          <RadarChart labels={ORDEN_RS.map((k) => k.toUpperCase())} valores={ORDEN_RS.map((k) => resultados.rs[k])} colores={colores} ariaLabel="Gráfico radar de las cinco R" />
        </div>
        <div className={styles.chartWrap}>
          <h4>Gráfico de barras — cinco R</h4>
          <BarChart labels={ORDEN_RS.map((k) => RS[k].nombre)} valores={ORDEN_RS.map((k) => resultados.rs[k])} colores={colores} ariaLabel="Gráfico de barras de las cinco R" />
        </div>
      </div>

      <div className={styles.dataTableWrap}>
        <h4>Tabla comparativa</h4>
        <table>
          <thead><tr><th>R</th><th>Puntuación</th><th>Porcentaje</th><th>Nivel</th></tr></thead>
          <tbody>
            {ORDEN_RS.map((k) => {
              const r = RS[k];
              const v = resultados.rs[k];
              const n = v !== null ? getNivel(v) : null;
              return (
                <tr key={k}>
                  <td>{r.nombre}</td>
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
