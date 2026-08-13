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
          <div className="eyebrow">Contra el greenwashing</div>
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

        <div style={{ marginTop: "56px", background: "var(--bg-2)", borderRadius: "var(--radius)", padding: "32px", display: "grid", gridTemplateColumns: "1fr 320px", gap: "40px", alignItems: "start" }}>
          <div>
            <p style={{ margin: "0 0 20px", fontSize: ".97rem", lineHeight: 1.7, color: "var(--ink-soft)" }}>
              Proceso acompañado y verificado por la IGTR mediante un diagnóstico basado en FlowMap,
              metodología regenerativa para organizaciones vivas, complementado con revisión de pares y
              curaduría especializada. Más que evaluar, invita a recorrer un proceso vivo y continuo de
              evolución hacia la regeneración.
            </p>
            <a href="https://www.turismoregenerativo.org" target="_blank" rel="noopener" className="btn btn-ghost btn-sm">
              Sitio IGTR ↗
            </a>
          </div>
          <div>
            <RPanel R={SAMPLE_R} />
            <p style={{ fontSize: ".9rem", marginTop: "12px", padding: "12px", background: "var(--card)", border: "1px solid var(--line)", borderRadius: "10px" }}>
              <b>Nivel general:</b> En transición.
              <br />
              <NextImprovementNote R={SAMPLE_R} />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
