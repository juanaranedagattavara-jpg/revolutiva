import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentoría y asesoría",
  description:
    "No solo visibilizamos: ayudamos a tu proyecto a evolucionar hacia una mayor coherencia con la vida y el territorio.",
};

const HERO_IMG =
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1700&q=75";

const MENTS = [
  { i: "❝", t: "Ficha y relato", d: "Ordena tu historia para que comunique tu vocación sin caer en clichés." },
  { i: "✺", t: "Diseño de experiencia regenerativa", d: "Diseña vivencias que cuiden las tres relaciones." },
  { i: "◷", t: "Indicadores R", d: "Identifica tus evidencias y define tu próximo paso de mejora." },
  { i: "☾", t: "Calendario regenerativo", d: "Alinea tu oferta con estaciones, festividades y ciclos del territorio." },
  { i: "✦", t: "Comercialización consciente", d: "Vende con sentido, sin perder esencia ni caer en el volumen." },
  { i: "❧", t: "Hospedaje regenerativo", d: "Mejora la gestión de agua, energía, residuos y comunidad." },
  { i: "∞", t: "Guías regenerativos", d: "Forma intérpretes vivos del territorio, seguros y profundos." },
];

export default function MentoriaPage() {
  return (
    <>
      <section className="hero" style={{ minHeight: "40vh", padding: 0 }}>
        <div className="hero-bg">
          <Image src={HERO_IMG} alt="" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
        </div>
        <div className="wrap hero-inner" style={{ paddingBottom: "42px" }}>
          <div className="eyebrow">Acompañamiento IGTR</div>
          <h1 style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)" }}>Mentoría y asesoría</h1>
          <p style={{ maxWidth: "560px" }}>
            No solo visibilizamos: ayudamos a tu proyecto a evolucionar hacia una mayor coherencia con la
            vida y el territorio.
          </p>
        </div>
      </section>
      <section>
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">Tipos de mentoría</div>
            <h2>Acompañamos cada paso de tu evolución</h2>
          </div>
          <div className="ment-grid">
            {MENTS.map((m) => (
              <div className="ment-card" key={m.t}>
                <div className="mi">{m.i}</div>
                <h3 style={{ fontSize: "1.15rem" }}>{m.t}</h3>
                <p className="muted" style={{ fontSize: ".92rem", margin: 0 }}>
                  {m.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">Modelo comercial</div>
            <h2>Cómo se sostiene la plataforma</h2>
            <p className="lead">Un modelo transparente, pensado para crecer cuidando la esencia regenerativa.</p>
          </div>
          <div className="pricing">
            <div className="price-card">
              <div className="eyebrow">01 · Membresía</div>
              <h3>Publicación</h3>
              <div className="amt">Anual / mensual</div>
              <p className="muted">Estar presente en la red curada de REVOLUTIVA.TRAVEL.</p>
              <ul>
                <li>Ficha viva con Indicadores R</li>
                <li>Presencia por territorio</li>
                <li>Visibilidad según nivel</li>
              </ul>
              <Link href="/postular" className="btn btn-ghost btn-block">
                Postular
              </Link>
            </div>
            <div className="price-card feat">
              <div className="eyebrow">02 · Entrada</div>
              <h3>Mentoría de entrada</h3>
              <div className="amt">Asesoría</div>
              <p className="muted">Ordena tu propuesta, ficha e indicadores antes de publicar.</p>
              <ul>
                <li>Lectura de nivel regenerativo</li>
                <li>Plan de mejora 60–90 días</li>
                <li>Diseño de ficha y relato</li>
              </ul>
              <Link href="/postular" className="btn btn-terra btn-block">
                Solicitar mentoría
              </Link>
            </div>
            <div className="price-card">
              <div className="eyebrow">03 · Futuro</div>
              <h3>Comisión por venta</h3>
              <div className="amt">% por reserva</div>
              <p className="muted">Comisión por venta o lead calificado, cuando haya trazabilidad comercial.</p>
              <ul>
                <li>Solo sobre ventas concretadas</li>
                <li>Lead calificado</li>
                <li>Trazabilidad transparente</li>
              </ul>
              <Link href="/explorar" className="btn btn-ghost btn-block">
                Ver la red
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
