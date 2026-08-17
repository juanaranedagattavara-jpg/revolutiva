import { ELEMENTOS, ORDEN_ELEMENTOS, ORDEN_RS, PRINCIPIOS, RS, getNivel, resolveColor } from "@/lib/flowmap/data";
import { fmt1, pctNum } from "@/lib/flowmap/scoring";
import type { DatosIniciales, ResultadosCompletos } from "@/lib/flowmap/types";
import styles from "./flowmap.module.css";

export default function PanelSintesis({ resultados, datosIniciales }: { resultados: ResultadosCompletos; datosIniciales: DatosIniciales }) {
  const elementosArr = ORDEN_ELEMENTOS.map((k) => ({ key: k, val: resultados.elementos[k] })).filter((e) => e.val !== null) as { key: typeof ORDEN_ELEMENTOS[number]; val: number }[];
  const rsArr = ORDEN_RS.map((k) => ({ key: k, val: resultados.rs[k] })).filter((r) => r.val !== null) as { key: typeof ORDEN_RS[number]; val: number }[];
  const principiosArr = Object.keys(resultados.principios)
    .map((k) => ({ key: k, val: resultados.principios[k] }))
    .filter((p) => p.val !== null) as { key: string; val: number }[];

  const elMax = elementosArr.length ? elementosArr.reduce((a, b) => (a.val > b.val ? a : b)) : null;
  const elMin = elementosArr.length ? elementosArr.reduce((a, b) => (a.val < b.val ? a : b)) : null;
  const rMax = rsArr.length ? rsArr.reduce((a, b) => (a.val > b.val ? a : b)) : null;
  const rMin = rsArr.length ? rsArr.reduce((a, b) => (a.val < b.val ? a : b)) : null;

  const principiosOrdenados = [...principiosArr].sort((a, b) => b.val - a.val);
  const top3 = principiosOrdenados.slice(0, 3);
  const bottom3 = [...principiosOrdenados].sort((a, b) => a.val - b.val).slice(0, 3);

  let diffElementosBox: { titulo: string; texto: string; clase: "warningBox" | "balanceBox" } | null = null;
  if (elementosArr.length === 4) {
    const maxV = Math.max(...elementosArr.map((e) => e.val));
    const minV = Math.min(...elementosArr.map((e) => e.val));
    const diff = maxV - minV;
    if (diff > 2) {
      diffElementosBox = {
        titulo: "Desequilibrio entre elementos",
        texto: `Existe una diferencia de ${diff.toFixed(1)} puntos entre el elemento con mayor y menor puntuación. Esto puede indicar un desarrollo desigual entre las dimensiones de la organización, útil de observar en profundidad.`,
        clase: "warningBox",
      };
    } else if (diff <= 1) {
      diffElementosBox = {
        titulo: "Equilibrio entre elementos",
        texto: "Los cuatro elementos se encuentran dentro de un rango de diferencia menor o igual a 1 punto, lo que sugiere un desarrollo relativamente armónico entre identidad, relaciones, procesos y recursos.",
        clase: "balanceBox",
      };
    }
  }

  let diffRsTexto = "";
  if (rsArr.length === 5) {
    const maxV = Math.max(...rsArr.map((r) => r.val));
    const minV = Math.min(...rsArr.map((r) => r.val));
    const diff = maxV - minV;
    if (diff > 2) diffRsTexto = `Entre las cinco R también se observa una diferencia relevante de ${diff.toFixed(1)} puntos entre la de mayor y menor puntuación.`;
  }

  const primerNombre = (datosIniciales.persona || "").trim().split(" ")[0];
  const orgNombre = datosIniciales.organizacion?.trim() ? datosIniciales.organizacion.trim() : "tu organización";

  return (
    <>
      <div className={`${styles.card} ${styles.welcomeCard}`}>
        <span className={styles.nivelesEyebrow}>Autodiagnóstico completado</span>
        <h3 className={styles.welcomeTitle}>Hola{primerNombre ? `, ${primerNombre}` : ""} — has terminado tu autodiagnóstico</h3>
        <p className={styles.welcomeSub}>
          Este es un primer espejo del estado actual de <strong>{orgNombre}</strong> frente al marco FlowMap de
          Turismo Regenerativo. A continuación, los resultados principales.
        </p>
      </div>

      <div className={styles.card} style={{ marginTop: "1.25rem" }}>
        <h4 className={styles.panelSubtitle}>Cuatro elementos</h4>
        <div className={styles.miniElementoRow}>
          {ORDEN_ELEMENTOS.map((key) => {
            const el = ELEMENTOS[key];
            const val = resultados.elementos[key];
            const niv = val !== null ? getNivel(val) : null;
            return (
              <div key={key} className={styles.miniElementoCard} style={{ borderLeftColor: `var(--${key})` }}>
                <span className={styles.miniIcon}>{el.icon}</span>
                <span className={styles.miniName}>{el.nombre}</span>
                <span className={styles.miniAmbito}>{el.ambito}</span>
                <div className={styles.miniScoreRow}>
                  <span className={styles.miniScore}>{fmt1(val)}<span className={styles.of7}> / 7</span></span>
                </div>
                <div className={styles.miniBarTrack}>
                  <div className={styles.miniBarFill} style={{ width: `${pctNum(val)}%`, background: `var(--${key})` }} />
                </div>
                {niv && <span className={styles.miniLevelLabel} style={{ color: resolveColor(niv.color) }}>{niv.nivel}</span>}
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.card} style={{ marginTop: "1.25rem" }}>
        <h4 className={styles.panelSubtitle}>Cinco R — nivel de evolución</h4>
        <div className={styles.miniRRow}>
          {ORDEN_RS.map((key) => {
            const r = RS[key];
            const val = resultados.rs[key];
            const niv = val !== null ? getNivel(val) : null;
            return (
              <div key={key} className={styles.miniRCard} style={{ borderLeftColor: `var(--${key})` }}>
                <span className={styles.miniRName}>{r.nombre}</span>
                <div className={styles.miniScoreRow}>
                  <span className={styles.miniScore}>{fmt1(val)}<span className={styles.of7}> / 7</span></span>
                </div>
                <div className={styles.miniBarTrack}>
                  <div className={styles.miniBarFill} style={{ width: `${pctNum(val)}%`, background: `var(--${key})` }} />
                </div>
                {niv && <span className={styles.levelBadge} style={{ background: `${resolveColor(niv.color)}22`, color: resolveColor(niv.color) }}>{niv.nivel}</span>}
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.card} style={{ marginTop: "1.25rem" }}>
        {elMax && elMin ? (
          <div className={styles.synthesisBox}>
            <p>
              El resultado muestra una mayor integración en el ámbito <strong>{ELEMENTOS[elMax.key].nombre} — {ELEMENTOS[elMax.key].ambito}</strong> ({fmt1(elMax.val)}/7),
              mientras que <strong>{ELEMENTOS[elMin.key].nombre} — {ELEMENTOS[elMin.key].ambito}</strong> ({fmt1(elMin.val)}/7) presenta actualmente el mayor espacio de evolución.
            </p>
          </div>
        ) : (
          <p>Aún no hay suficientes datos para generar la síntesis.</p>
        )}
        {rMax && rMin && (
          <div className={styles.synthesisBox}>
            <p>
              En la lectura de las cinco R, <strong>{RS[rMax.key].nombre}</strong> ({fmt1(rMax.val)}/7) es la de mayor puntuación, mientras que{" "}
              <strong>{RS[rMin.key].nombre}</strong> ({fmt1(rMin.val)}/7) muestra el mayor potencial de evolución. {diffRsTexto}
            </p>
          </div>
        )}
        {diffElementosBox && (
          <div className={`${styles.synthesisBox} ${styles[diffElementosBox.clase]}`}>
            <h4>{diffElementosBox.titulo}</h4>
            <p>{diffElementosBox.texto}</p>
          </div>
        )}
        <div className={styles.chartFlex} style={{ marginTop: "1.5rem" }}>
          <div>
            <h4>Tres principios con mayor puntuación</h4>
            <ul className={styles.resultDetailList}>
              {top3.map((p) => (
                <li key={p.key}><span>{PRINCIPIOS[p.key].nombre}</span><span>{fmt1(p.val)}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Tres principios con mayor espacio de evolución</h4>
            <ul className={styles.resultDetailList}>
              {bottom3.map((p) => (
                <li key={p.key}><span>{PRINCIPIOS[p.key].nombre}</span><span>{fmt1(p.val)}</span></li>
              ))}
            </ul>
          </div>
        </div>
        <p style={{ marginTop: "1.5rem", color: "var(--ink-soft)", fontSize: ".9rem" }}>
          Estos resultados reflejan el nivel de integración declarado, no una certificación. Te invitamos a
          contrastarlos con tu equipo y a repetir el diagnóstico periódicamente.
        </p>
      </div>
    </>
  );
}
