"use client";

import { useState } from "react";
import { ELEMENTOS, ORDEN_ELEMENTOS, ORDEN_RS, PRINCIPIOS, RANGOS, RS, getNivel } from "@/lib/flowmap/data";
import { fmt1, pctNum } from "@/lib/flowmap/scoring";
import type { ResultadosCompletos } from "@/lib/flowmap/types";
import DonutRing from "./DonutRing";
import styles from "./flowmap.module.css";

const ELEMENTO_MINI_COLOR: Record<string, string> = { fuego: "#a3654b", aire: "#5c7488", agua: "#5f8a7e", tierra: "#6b7d4a" };

export default function PanelMatriz({ resultados }: { resultados: ResultadosCompletos }) {
  const [filtroElemento, setFiltroElemento] = useState("");
  const [filtroR, setFiltroR] = useState("");
  const [filtroNivel, setFiltroNivel] = useState("");

  const rows = Object.keys(PRINCIPIOS).map((pid) => {
    const p = PRINCIPIOS[pid];
    const el = ELEMENTOS[p.elemento];
    const val = resultados.principios[pid];
    const niv = val !== null ? getNivel(val) : null;
    return { pid, p, el, val, niv };
  });

  const rowsVisibles = rows.filter((r) => {
    return (!filtroElemento || r.p.elemento === filtroElemento) && (!filtroR || r.p.rPrincipal === filtroR) && (!filtroNivel || r.niv?.nivel === filtroNivel);
  });

  return (
    <div className={styles.card}>
      <h3 style={{ fontSize: "1.3rem" }}>Matriz de trazabilidad</h3>
      <div className={styles.filtersRow}>
        <select value={filtroElemento} onChange={(e) => setFiltroElemento(e.target.value)}>
          <option value="">Todos los elementos</option>
          {ORDEN_ELEMENTOS.map((k) => (
            <option key={k} value={k}>{ELEMENTOS[k].nombre}</option>
          ))}
        </select>
        <select value={filtroR} onChange={(e) => setFiltroR(e.target.value)}>
          <option value="">Todas las R</option>
          {ORDEN_RS.map((k) => (
            <option key={k} value={k}>{RS[k].nombre}</option>
          ))}
        </select>
        <select value={filtroNivel} onChange={(e) => setFiltroNivel(e.target.value)}>
          <option value="">Todos los niveles</option>
          {RANGOS.map((r) => (
            <option key={r.nivel} value={r.nivel}>{r.nivel}</option>
          ))}
        </select>
      </div>
      <div className={styles.dataTableWrap}>
        <table>
          <thead><tr><th>Elemento</th><th>Principio FlowMap</th><th>Puntuación</th><th>Avance</th><th>Nivel</th><th>R principal</th></tr></thead>
          <tbody>
            {rowsVisibles.map((r) => (
              <tr key={r.pid} className={styles[`matrizRow${r.p.elemento.charAt(0).toUpperCase()}${r.p.elemento.slice(1)}`]}>
                <td><span className={`${styles.tag} ${styles[r.el.claseColor]}`}>{r.el.icon} {r.el.nombre}</span></td>
                <td>{r.p.nombre}</td>
                <td>{fmt1(r.val)}</td>
                <td>{r.val !== null ? <DonutRing pctValue={pctNum(r.val)} size={38} stroke={5} arcColor={ELEMENTO_MINI_COLOR[r.p.elemento]} trackColor="rgba(0,0,0,0.1)" showText={false} /> : "—"}</td>
                <td>{r.niv ? r.niv.nivel : "—"}</td>
                <td>{RS[r.p.rPrincipal].nombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
