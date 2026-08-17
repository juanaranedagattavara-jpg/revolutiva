import { ELEMENTOS, ORDEN_ELEMENTOS, ORDEN_RS, PRINCIPIOS, RS } from "./data";
import type { ElementoId, ResultadosCompletos, RId, Respuestas } from "./types";

export function calcularPrincipio(principioId: string, respuestas: Respuestas): number | null {
  const resp = respuestas[principioId];
  if (!resp || resp.escala === null || resp.escala === undefined) return null;
  return resp.escala;
}

export function calcularTodosPrincipios(respuestas: Respuestas): Record<string, number | null> {
  const out: Record<string, number | null> = {};
  Object.keys(PRINCIPIOS).forEach((pid) => {
    out[pid] = calcularPrincipio(pid, respuestas);
  });
  return out;
}

export function calcularElemento(elementoId: ElementoId, scoresPrincipios: Record<string, number | null>): number | null {
  const el = ELEMENTOS[elementoId];
  const valores = el.principios.map((pid) => scoresPrincipios[pid]).filter((v): v is number => v !== null && v !== undefined);
  if (valores.length === 0) return null;
  return valores.reduce((a, b) => a + b, 0) / el.principios.length;
}

export function calcularR(rId: RId, scoresPrincipios: Record<string, number | null>): number | null {
  const r = RS[rId];
  const valores = r.principios.map((pid) => scoresPrincipios[pid]).filter((v): v is number => v !== null && v !== undefined);
  if (valores.length === 0) return null;
  return valores.reduce((a, b) => a + b, 0) / r.principios.length;
}

export function calcularResultadosCompletos(respuestas: Respuestas): ResultadosCompletos {
  const scoresPrincipios = calcularTodosPrincipios(respuestas);
  const scoresElementos = {} as Record<ElementoId, number | null>;
  ORDEN_ELEMENTOS.forEach((e) => {
    scoresElementos[e] = calcularElemento(e, scoresPrincipios);
  });
  const scoresRs = {} as Record<RId, number | null>;
  ORDEN_RS.forEach((r) => {
    scoresRs[r] = calcularR(r, scoresPrincipios);
  });
  return { principios: scoresPrincipios, elementos: scoresElementos, rs: scoresRs };
}

/** Promedio general 0-7 sobre las 16 evaluaciones respondidas — usado como resumen para admin. */
export function calcularPromedioGeneral(respuestas: Respuestas): number | null {
  const valores = Object.values(respuestas)
    .map((r) => r.escala)
    .filter((v): v is number => v !== null && v !== undefined);
  if (valores.length === 0) return null;
  return valores.reduce((a, b) => a + b, 0) / valores.length;
}

export function fmt1(n: number | null | undefined): string {
  return n === null || n === undefined || Number.isNaN(n) ? "—" : n.toFixed(1);
}

export function pctNum(n: number | null | undefined): number {
  return n === null || n === undefined || Number.isNaN(n) ? 0 : Math.round((n / 7) * 100);
}

export function pct(n: number | null | undefined): string {
  return n === null || n === undefined || Number.isNaN(n) ? "—" : `${pctNum(n)}%`;
}
