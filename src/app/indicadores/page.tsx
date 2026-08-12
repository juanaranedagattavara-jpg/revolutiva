import type { Metadata } from "next";
import { R_DIMS } from "@/lib/constants";
import RPanel, { NextImprovementNote } from "@/components/RPanel";

export const metadata: Metadata = {
  title: "Indicadores R",
  description:
    "Cinco dimensiones simples para evaluar, con honestidad, cómo un proyecto cuida las tres relaciones.",
};

const EJEMPLOS: Record<string, string[]> = {
  R1: ["espacios de silencio o contemplación", "prácticas de bienestar", "interpretación profunda", "reflexión guiada", "ritmo humano", "diseño de experiencia transformadora"],
  R2: ["empleo local", "compra local", "acuerdos comunitarios", "participación de familias o comunidades", "rescate de oficios", "gobernanza local", "colaboración comunitaria"],
  R3: ["restauración ecológica", "cuidado del agua", "protección de biodiversidad", "manejo de residuos", "eficiencia energética", "agricultura regenerativa", "límites de carga"],
  R4: ["calendario regenerativo", "temporadas sensibles", "festividades locales", "ciclos agrícolas", "épocas de descanso del territorio", "experiencias estacionales"],
  R5: ["aporte directo al territorio", "contribución a proyectos locales", "plan de mejora", "escucha de viajeros y comunidad", "mentoría activa", "transparencia en impactos"],
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
                <p style={{ marginBottom: "10px" }}>{d.desc}</p>
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

        <div className="detail-grid" style={{ marginTop: "50px" }}>
          <div>
            <h3>Cómo se ve en una ficha</h3>
            <p className="muted">Ejemplo de un proyecto en transición y su próxima mejora sugerida.</p>
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
