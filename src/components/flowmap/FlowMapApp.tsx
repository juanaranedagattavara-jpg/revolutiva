"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { EVALUACIONES, PRINCIPIOS, RS, getNivel } from "@/lib/flowmap/data";
import { calcularPromedioGeneral, calcularResultadosCompletos } from "@/lib/flowmap/scoring";
import { DATOS_INICIALES_VACIOS, respuestaDe, useFlowMapState } from "@/lib/flowmap/useFlowMapState";
import type { DatosIniciales, Respuesta } from "@/lib/flowmap/types";
import CuestionarioView from "./CuestionarioView";
import IntroView from "./IntroView";
import ResultadosView from "./ResultadosView";
import styles from "./flowmap.module.css";

type Vista = "intro" | "cuestionario" | "resultados";

export default function FlowMapApp() {
  const { estado, setEstado, hydrated, savedPulse, reset } = useFlowMapState();
  const [vista, setVista] = useState<Vista>("intro");
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const respondidas = EVALUACIONES.filter((ev) => respuestaDe(estado, ev.id).escala !== null).length;
  const resultadosDisponibles = respondidas === EVALUACIONES.length;

  const irAVista = useCallback(
    (v: Vista) => {
      setVista(v);
      setEstado((prev) => ({ ...prev, vistaActual: v }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [setEstado]
  );

  // Al restaurar el estado guardado (localStorage), retoma la última vista visitada.
  useEffect(() => {
    if (hydrated) setVista(estado.vistaActual);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  function setDatosIniciales(datos: DatosIniciales) {
    setEstado((prev) => ({ ...prev, datosIniciales: datos }));
  }

  function setIndice(idx: "datos" | "review" | number) {
    setEstado((prev) => ({ ...prev, indiceActual: idx }));
  }

  function setRespuesta(principioId: string, respuesta: Respuesta) {
    setEstado((prev) => ({ ...prev, respuestas: { ...prev.respuestas, [principioId]: respuesta } }));
  }

  function handleGuardarContinuar() {
    setSaveMessage("Progreso guardado. Puedes continuar más tarde.");
    setTimeout(() => setSaveMessage(null), 2500);
  }

  async function enviarDiagnostico() {
    try {
      const promedio = calcularPromedioGeneral(estado.respuestas);
      const supabase = createClient();
      await supabase.from("flowmap_diagnosticos").insert({
        organizacion: estado.datosIniciales.organizacion || null,
        tipo_organizacion: estado.datosIniciales.tipo || null,
        persona: estado.datosIniciales.persona || null,
        cargo: estado.datosIniciales.cargo || null,
        email: estado.datosIniciales.email,
        whatsapp: estado.datosIniciales.whatsapp || null,
        territorio: estado.datosIniciales.territorio || null,
        fecha_diagnostico: estado.datosIniciales.fecha || null,
        modalidad: estado.datosIniciales.modalidad || null,
        respuestas: estado.respuestas,
        promedio_general: promedio,
        nivel_general: promedio !== null ? getNivel(promedio).nivel : null,
      });
    } catch (e) {
      console.warn("No se pudo enviar el diagnóstico a IGTR; tus resultados siguen disponibles localmente.", e);
    }
  }

  function handleCalcular() {
    setEstado((prev) => ({ ...prev, vistaActual: "resultados" }));
    irAVista("resultados");
    void enviarDiagnostico();
  }

  function handleReset() {
    reset();
    irAVista("intro");
  }

  function handleDownload() {
    const resultados = calcularResultadosCompletos(estado.respuestas);
    const now = new Date();
    const payload = {
      herramienta: "FlowMap de Turismo Regenerativo — Autodiagnóstico para Organizaciones Vivas",
      esCertificacion: false,
      informacionOrganizacion: estado.datosIniciales,
      fechaGeneracion: now.toISOString(),
      resultadosEvaluaciones: EVALUACIONES.map((ev) => {
        const resp = respuestaDe(estado, ev.id);
        return { principioId: ev.id, numero: ev.numero, elemento: ev.elemento, principio: ev.nombre, preguntas: ev.preguntas, escala: resp.escala, texto: resp.texto };
      }),
      resultadosPrincipios: Object.keys(PRINCIPIOS).map((pid) => ({
        id: pid, nombre: PRINCIPIOS[pid].nombre, elemento: PRINCIPIOS[pid].elemento,
        puntuacion: resultados.principios[pid], rPrincipal: PRINCIPIOS[pid].rPrincipal, codigoR: PRINCIPIOS[pid].codigoR, rSecundaria: PRINCIPIOS[pid].rSecundaria,
      })),
      resultadosElementos: Object.entries(resultados.elementos).map(([id, puntuacion]) => ({ id, puntuacion })),
      resultadosCincoR: Object.entries(resultados.rs).map(([id, puntuacion]) => ({ id, nombre: RS[id as keyof typeof RS].nombre, puntuacion })),
      matrizRelaciones: Object.keys(PRINCIPIOS).map((pid) => ({
        principio: PRINCIPIOS[pid].nombre, rPrincipal: PRINCIPIOS[pid].rPrincipal, rSecundaria: PRINCIPIOS[pid].rSecundaria, codigoR: PRINCIPIOS[pid].codigoR,
      })),
    };
    const orgSlug = (estado.datosIniciales.organizacion || "organizacion")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "organizacion";
    const filename = `flowmap_${orgSlug}_${now.toISOString().slice(0, 10)}.json`;
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const resultados = calcularResultadosCompletos(estado.respuestas);

  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <div className={styles.appHeaderInner}>
          <a
            href="https://www.turismoregenerativo.org"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.headerLogoLink}
            aria-label="Visitar turismoregenerativo.org"
          >
            <Image
              src="https://turismoregenerativo.org/v4/wp-content/uploads/elementor/thumbs/Logo-TR-1000-qz56jyib1wtdhze387v6ovpgw6mkrqdo09uazlxkwe.png"
              alt="Turismo Regenerativo"
              width={230}
              height={96}
              className={styles.headerLogo}
              style={{ width: "auto", height: "96px", filter: "brightness(0) invert(1) drop-shadow(0 2px 8px rgba(0,0,0,0.3))" }}
            />
          </a>
          <div>
            <h1>FLOWMAP DE TURISMO REGENERATIVO</h1>
            <p className={styles.subtitle}>Autodiagnóstico para Organizaciones Vivas</p>
          </div>
        </div>
      </header>

      <nav className={styles.mainNav} aria-label="Etapas del autodiagnóstico">
        <button type="button" className={styles.navIntro} aria-current={vista === "intro"} onClick={() => irAVista("intro")}>
          <span className={styles.navText}><span className={styles.stepNum}>Paso 1</span><span className={styles.stepLabel}>Introducción</span></span>
        </button>
        <button
          type="button"
          className={styles.navCuestionario}
          aria-current={vista === "cuestionario"}
          onClick={() => {
            if (estado.indiceActual === undefined || estado.indiceActual === null) setIndice("datos");
            irAVista("cuestionario");
          }}
        >
          <span className={styles.navText}><span className={styles.stepNum}>Paso 2</span><span className={styles.stepLabel}>Cuestionario</span></span>
        </button>
        <button type="button" className={styles.navResultados} aria-current={vista === "resultados"} disabled={!resultadosDisponibles} onClick={() => irAVista("resultados")}>
          <span className={styles.navText}><span className={styles.stepNum}>Paso 3</span><span className={styles.stepLabel}>Resultados</span></span>
        </button>
      </nav>

      <main className={styles.appMain}>
        <section className={`${styles.view} ${vista === "intro" ? styles.active : ""}`} aria-labelledby="intro-title">
          <IntroView
            onComenzar={() => {
              if (estado.indiceActual === undefined || estado.indiceActual === null) setIndice("datos");
              irAVista("cuestionario");
            }}
          />
        </section>

        <CuestionarioView
          active={vista === "cuestionario"}
          estado={estado}
          setDatosIniciales={setDatosIniciales}
          setIndice={setIndice}
          setRespuesta={setRespuesta}
          onCalcular={handleCalcular}
          onGuardarContinuar={handleGuardarContinuar}
        />

        {resultadosDisponibles && (
          <ResultadosView
            active={vista === "resultados"}
            resultados={resultados}
            datosIniciales={estado.datosIniciales}
            respuestas={estado.respuestas}
            onReset={handleReset}
            onEditBack={() => {
              setIndice("review");
              irAVista("cuestionario");
            }}
            onDownload={handleDownload}
          />
        )}
      </main>

      <footer className={styles.appFooter}>
        <div className={styles.footerLogos}>
          <a href="https://www.caminaconsultores.com" target="_blank" rel="noopener noreferrer">
            <Image
              src="https://caminaconsultores.com/wp-content/uploads/2025/11/Logo-Camina.png"
              alt="Camina Consultores — Somos Movimiento"
              width={160}
              height={40}
              className={styles.footerLogo}
              style={{ width: "auto", height: "40px" }}
            />
          </a>
          <a href="https://turismoregenerativo.org" target="_blank" rel="noopener noreferrer">
            <Image
              src="https://turismoregenerativo.org/v4/wp-content/uploads/elementor/thumbs/Logo-TR-1000-qz56jyib1wtdhze387v6ovpgw6mkrqdo09uazlxkwe.png"
              alt="Iniciativa Global de Turismo Regenerativo"
              width={160}
              height={40}
              className={styles.footerLogo}
              style={{ width: "auto", height: "40px" }}
            />
          </a>
          <Link href="/">
            <Image
              src="/FlowMap/revolutiva-travel-logo.png"
              alt="Revolutiva.travel — Evolucionar viajando"
              width={500}
              height={75}
              className={styles.footerLogoRevolutiva}
              style={{ width: "auto", height: "28px" }}
            />
          </Link>
        </div>
        <p className={styles.footerCredit}>
          El <strong>FlowMap de Turismo Regenerativo</strong> es una metodología desarrollada por{" "}
          <strong>Camina Consultores</strong> en el marco de la <strong>Iniciativa Global de Turismo Regenerativo (IGTR)</strong>,
          una comunidad internacional que acompaña a organizaciones, empresas y destinos turísticos en su camino
          hacia una relación más madura con la vida, el territorio y las personas.
        </p>
        <p className={styles.footerLinks}>caminaconsultores.com · turismoregenerativo.org · revolutiva.travel</p>
      </footer>

      <div className={styles.saveIndicator}>
        <span className={styles.dot} aria-hidden="true" style={{ opacity: savedPulse ? 1 : 0.6 }} />
        <span>{saveMessage || "Guardado automático activo"}</span>
      </div>
    </div>
  );
}
