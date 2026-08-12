import Link from "next/link";
import type { Metadata } from "next";
import LevelBadge from "@/components/LevelBadge";

export const metadata: Metadata = {
  title: "Niveles evolutivos",
  description:
    "No exigimos perfección. Acompañamos a cada proyecto en su camino hacia una relación más madura con la vida, el territorio y las personas.",
};

export default function NivelesPage() {
  return (
    <section style={{ padding: "60px 0 30px" }}>
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">Curaduría evolutiva</div>
          <h2>Sistema de niveles evolutivos</h2>
          <p className="lead">
            No exigimos perfección. Acompañamos a cada proyecto en su camino hacia una relación más
            madura con la vida, el territorio y las personas.
          </p>
        </div>
        <div className="levels">
          <div className="level-card l1">
            <div className="num">01</div>
            <LevelBadge nivel={1} />
            <h3 style={{ marginTop: "14px" }}>En incubación</h3>
            <p className="muted">
              Proyectos con potencial regenerativo que aún necesitan ordenar su propuesta, relato,
              seguridad, evidencias o coherencia con las tres relaciones.
            </p>
            <p style={{ fontSize: ".88rem" }}>
              <b>Visibilidad:</b> no necesariamente se publican aún. Pueden acceder a mentoría IGTR.
            </p>
          </div>
          <div className="level-card l2">
            <div className="num">02</div>
            <LevelBadge nivel={2} />
            <h3 style={{ marginTop: "14px" }}>En transición</h3>
            <p className="muted">
              Intención clara, prácticas iniciales y disposición de mejora. Se publican con
              transparencia y un plan de mejora de 60 a 90 días.
            </p>
            <p style={{ fontSize: ".88rem" }}>
              <b>Visibilidad:</b> publicados con acompañamiento y plan de mejora.
            </p>
          </div>
          <div className="level-card l3">
            <div className="num">03</div>
            <LevelBadge nivel={3} />
            <h3 style={{ marginTop: "14px" }}>Enraizado</h3>
            <p className="muted">
              Identidad clara, prácticas consistentes, evidencias y una relación madura con su
              comunidad, territorio y naturaleza.
            </p>
            <p style={{ fontSize: ".88rem" }}>
              <b>Visibilidad:</b> mayor presencia y destaque dentro de la plataforma.
            </p>
          </div>
        </div>
        <div className="band" style={{ padding: "46px 48px", marginTop: "46px" }}>
          <h3 style={{ color: "#fbf8f0" }}>¿En qué nivel está tu proyecto?</h3>
          <p style={{ color: "#cdd3c1", maxWidth: "620px" }}>
            Postula y recibe una lectura honesta de tu nivel actual y de los próximos pasos para
            enraizar tu propuesta.
          </p>
          <div className="hero-actions">
            <Link href="/postular" className="btn btn-terra">
              Postula tu proyecto
            </Link>
            <Link href="/mentoria" className="btn btn-ghost" style={{ color: "#f4f0e6", borderColor: "#ffffff55" }}>
              Solicitar mentoría
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
