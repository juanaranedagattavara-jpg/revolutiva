"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { DatosIniciales, EstadoFlowMap, Respuesta } from "./types";

const STORAGE_KEY = "flowmap_turismo_regenerativo_v3";

export const DATOS_INICIALES_VACIOS: DatosIniciales = {
  organizacion: "", tipo: "", persona: "", cargo: "", email: "", whatsapp: "", territorio: "", fecha: "",
  modalidad: "Diagnóstico individual",
};

const ESTADO_INICIAL: EstadoFlowMap = {
  datosIniciales: DATOS_INICIALES_VACIOS,
  respuestas: {},
  indiceActual: "datos",
  vistaActual: "intro",
  iniciado: false,
};

export function respuestaDe(estado: EstadoFlowMap, principioId: string): Respuesta {
  return estado.respuestas[principioId] ?? { escala: null, texto: "" };
}

export function useFlowMapState() {
  const [estado, setEstado] = useState<EstadoFlowMap>(ESTADO_INICIAL);
  const [hydrated, setHydrated] = useState(false);
  const [savedPulse, setSavedPulse] = useState(false);
  const pulseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setEstado((prev) => ({ ...prev, ...parsed, datosIniciales: { ...prev.datosIniciales, ...parsed.datosIniciales } }));
      }
    } catch (e) {
      console.warn("No se pudo cargar el estado guardado", e);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
      setSavedPulse(true);
      if (pulseTimeout.current) clearTimeout(pulseTimeout.current);
      pulseTimeout.current = setTimeout(() => setSavedPulse(false), 1200);
    } catch (e) {
      console.warn("No se pudo guardar el estado", e);
    }
  }, [estado, hydrated]);

  const reset = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setEstado(ESTADO_INICIAL);
  }, []);

  return { estado, setEstado, hydrated, savedPulse, reset };
}
