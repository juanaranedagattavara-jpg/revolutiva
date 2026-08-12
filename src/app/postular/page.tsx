import type { Metadata } from "next";
import PostularForm from "@/components/PostularForm";

export const metadata: Metadata = {
  title: "Postula tu proyecto",
  description:
    "Únete a la red viva de REVOLUTIVA.TRAVEL. Esta plataforma no busca proyectos perfectos, busca proyectos honestos, enraizados y dispuestos a evolucionar.",
};

export default function PostularPage() {
  return (
    <section style={{ padding: "56px 0" }}>
      <div className="wrap form-wrap">
        <div className="sec-head center" style={{ marginBottom: "30px" }}>
          <div className="eyebrow">Postula tu proyecto</div>
          <h2>Únete a la red viva</h2>
          <p className="lead serif-it" style={{ fontSize: "1.3rem", color: "var(--forest)" }}>
            &quot;Esta plataforma no busca proyectos perfectos. Busca proyectos honestos, enraizados y
            dispuestos a evolucionar.&quot;
          </p>
        </div>
        <PostularForm />
      </div>
    </section>
  );
}
