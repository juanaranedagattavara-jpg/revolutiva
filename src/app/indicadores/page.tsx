import Image from "next/image";
import type { Metadata } from "next";
import { R_DIMS } from "@/lib/constants";
import RPanel, { NextImprovementNote } from "@/components/RPanel";

export const metadata: Metadata = {
  title: "Indicadores R",
  description:
    "Cinco dimensiones simples para evaluar, con honestidad, cómo un proyecto cuida las tres relaciones.",
};

const EJEMPLOS: Record<string, string[]> = {
  R1: ["propósito claro y auténtico", "identidad del anfitrión", "coherencia ética y estética", "consciencia sistémica del territorio", "experiencias de transformación personal", "reflexión guiada", "diseño de experiencia profunda", "presencia y ritmo humano"],
  R2: ["colaboración con comunidades locales", "co-creación con actores del territorio", "redes de proveedores locales", "identidad y sentir del lugar", "participación de familias", "rescate y transmisión de saberes", "gobernanza compartida", "flujos de valor en el territorio"],
  R3: ["restauración de ecosistemas", "protección y cuidado del agua", "suelos sanos y carbono", "biodiversidad activa", "manejo regenerativo de residuos", "eficiencia y energía limpia", "agricultura y ganadería regenerativa", "límites de carga y capacidad"],
  R4: ["calendario regenerativo del lugar", "temporadas sensibles del ecosistema", "festividades y ciclos culturales", "épocas de descanso del territorio", "flujos de movimiento consciente", "experiencias estacionales auténticas"],
  R5: ["devolución concreta al territorio", "distribución de beneficios locales", "gestión de la huella energética", "metabolismo sano del proyecto", "mejora continua con escucha activa", "mentoría y aprendizaje colectivo", "transparencia en impactos y evolución"],
};

const SAMPLE_R = { R1: "desarrollo", R2: "enraizado", R3: "inicial", R4: "desarrollo", R5: "desarrollo" } as const;

export default function IndicadoresPage() {
  return (
    <section style={{ padding: "60px 0 30px" }}>
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">Contra el Regenwashing</div>
          <h2>Indicadores R</h2>
          <p className="lead">
            Cinco dimensiones simples para evaluar, con honestidad, cómo un proyecto cuida las tres
            relaciones. Cada indicador se evalúa en tres estados.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "34px" }}>
          <span className="rstate st-inicial">● Inicial · requiere incubación</span>
          <span className="rstate st-desarrollo">● En desarrollo · en transición</span>
          <span className="rstate st-enraizado">● Enraizado · maduro</span>
        </div>
        <div style={{ display: "grid", gap: "18px" }}>
          {R_DIMS.map((d) => (
            <div className="rdim" style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "24px", alignItems: "start", padding: "26px" }} key={d.code}>
              <div>
                <div className="rcode">{d.code}</div>
              </div>
              <div>
                <h4 style={{ fontSize: "1.2rem", marginTop: 0 }}>{d.name}</h4>
                <p style={{ fontStyle: "italic", color: "var(--forest)" }}>{d.q}</p>
                <p style={{ marginBottom: "12px" }}>{d.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>
                  {d.principios.map((p) => (
                    <span
                      key={p}
                      style={{ background: "var(--forest)", color: "#fff", fontSize: ".78rem", padding: "3px 10px", borderRadius: "20px", fontWeight: 500 }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
                <div className="taglist">
                  {EJEMPLOS[d.code].map((e) => (
                    <span className="tag" key={e}>
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pv-block">
          <h2 style={{ marginBottom: "14px" }}>Proceso de Validación</h2>
          <p style={{ margin: "0 0 14px", fontSize: ".97rem", lineHeight: 1.7, color: "var(--ink-soft)", maxWidth: "820px" }}>
            Proceso acompañado para fortalecer y transformar iniciativas de turismo hacia la
            regeneración. La IGTR combina <b>formación, diagnóstico, curaduría especializada y
            validación de pares</b> para asegurar una base común, reconocer el nivel de avance de cada
            proyecto y orientar su evolución.
          </p>
          <p style={{ margin: "0 0 28px", fontSize: ".97rem", lineHeight: 1.7, color: "var(--ink-soft)", maxWidth: "820px" }}>
            Más que certificar un estado final, el proceso busca entregar una <b>dirección de viaje
            clara, honesta y verificable</b>, fortaleciendo la coherencia entre propósito, prácticas,
            experiencia y territorio, y conectando a las iniciativas validadas con el ecosistema
            comercial de la <b>Iniciativa Global de Turismo Regenerativo</b>.
          </p>

          <div className="pv-card">
            <div className="pv-list">
              <div className="pv-row">
                <div className="pv-rail">
                  <div className="pv-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 5.2c2.5-1 5-1 8 .3v13.3c-3-1.3-5.5-1.3-8-.3z" />
                      <path d="M20 5.2c-2.5-1-5-1-8 .3v13.3c3-1.3 5.5-1.3 8-.3z" />
                    </svg>
                  </div>
                  <div className="pv-line" />
                </div>
                <div className="pv-content">
                  <div className="pv-num">01</div>
                  <h4>Formación certificada</h4>
                  <p>
                    Contar con formación en <b>Turismo Regenerativo</b> asegura una base compartida de
                    conceptos, competencias, principios y aprendizajes desde la cual comenzar el proceso.
                  </p>
                  <p className="pv-tag">Base común para avanzar.</p>
                </div>
              </div>

              <div className="pv-row">
                <div className="pv-rail">
                  <div className="pv-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11z" />
                      <circle cx="12" cy="10" r="2.3" />
                    </svg>
                  </div>
                  <div className="pv-line" />
                </div>
                <div className="pv-content">
                  <div className="pv-num">02</div>
                  <h4>Diagnóstico FlowMap</h4>
                  <p>
                    El proyecto se mira a sí mismo: su <b>identidad, propósito, relaciones, prácticas,
                    procesos y vínculo con el territorio</b>, reconociendo fortalezas, brechas y
                    oportunidades de evolución.
                  </p>
                  <p className="pv-tag">Comprender dónde estamos y hacia dónde podemos evolucionar.</p>
                </div>
              </div>

              <div className="pv-row">
                <div className="pv-rail">
                  <div className="pv-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 20c0-8.3 5.2-14.3 14.3-15.3C18.3 13.8 13.3 19 5 20z" />
                      <path d="M6.2 18.8c3-3.2 6-7.4 8-11.6" />
                    </svg>
                  </div>
                  <div className="pv-line" />
                </div>
                <div className="pv-content">
                  <div className="pv-num">03</div>
                  <h4>Curaduría especializada</h4>
                  <p>
                    El equipo de la IGTR acompaña la lectura del diagnóstico, profundiza los aspectos
                    relevantes y orienta mejoras que permitan fortalecer la coherencia y el potencial
                    regenerativo de la propuesta.
                  </p>
                  <p className="pv-tag">Acompañar la evolución y fortalecer la propuesta.</p>
                </div>
              </div>

              <div className="pv-row">
                <div className="pv-rail">
                  <div className="pv-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="9" cy="8.5" r="3" />
                      <path d="M3.5 20c0-3.4 2.5-6 5.5-6s5.5 2.6 5.5 6" />
                      <circle cx="17" cy="9.5" r="2.3" />
                      <path d="M15.3 14.3c2.3.5 4.2 2.6 4.2 5.7" />
                    </svg>
                  </div>
                  <div className="pv-line" />
                </div>
                <div className="pv-content">
                  <div className="pv-num">04</div>
                  <h4>Validación de pares</h4>
                  <p>
                    Otros proyectos y practicantes del ecosistema regenerativo contrastan lo declarado
                    con lo observado, aportando una mirada externa, situada y basada en la experiencia.
                  </p>
                  <p className="pv-tag">Validar desde la comunidad y el aprendizaje entre pares.</p>
                </div>
              </div>

              <div className="pv-row">
                <div className="pv-rail">
                  <div className="pv-icon terra">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="6" cy="6.5" r="2.2" />
                      <circle cx="18" cy="6.5" r="2.2" />
                      <circle cx="12" cy="18" r="2.2" />
                      <path d="M7.8 7.8 10.3 16" />
                      <path d="M16.2 7.8 13.7 16" />
                      <path d="M8.2 6.5h7.6" />
                    </svg>
                  </div>
                </div>
                <div className="pv-content" style={{ paddingBottom: "6px" }}>
                  <div className="pv-num">05</div>
                  <h4>Integración a Revolutiva.Travel</h4>
                  <p>
                    Las iniciativas que completan el proceso pasan a formar parte de <b>Revolutiva.Travel</b>,
                    plataforma B2B de la Iniciativa Global de Turismo Regenerativo que conecta propuestas
                    validadas con operadores, aliados, mercados y oportunidades de colaboración.
                  </p>
                  <p className="pv-tag">Del proceso de transformación a la conexión con el mundo.</p>
                </div>
              </div>
            </div>

            <div className="pv-chain">Formación → Diagnóstico → Curaduría → Validación de pares → Revolutiva.Travel</div>
            <div className="pv-loop">
              <span style={{ fontSize: ".9rem" }}>↳</span>
              <span className="serif-it" style={{ fontSize: ".85rem" }}>evolución continua</span>
            </div>
          </div>

          <div className="pv-foot">
            <a href="https://www.turismoregenerativo.org" target="_blank" rel="noopener" style={{ flexShrink: 0 }}>
              <Image
                src="https://turismoregenerativo.org/v4/wp-content/uploads/elementor/thumbs/Logo-TR-1000-qz56jyib1wtdhze387v6ovpgw6mkrqdo09uazlxkwe.png"
                alt="IGTR · Turismo Regenerativo"
                width={160}
                height={40}
                style={{ width: "160px", height: "auto", objectFit: "contain", display: "block" }}
              />
            </a>
            <div style={{ flex: 1, minWidth: "260px" }}>
              <RPanel R={SAMPLE_R} />
              <p style={{ fontSize: ".9rem", marginTop: "12px", padding: "12px", background: "var(--card)", border: "1px solid var(--line)", borderRadius: "10px" }}>
                <b>Nivel general:</b> En transición.
                <br />
                <NextImprovementNote R={SAMPLE_R} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
