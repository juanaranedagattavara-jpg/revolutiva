import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Principios IGTR",
  description:
    "El turismo regenerativo no busca reducir daño: busca dejar el lugar, las personas y a quien viaja mejor de lo que estaban.",
};

const HERO_IMG =
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1700&q=75";

function PCard({ color, title, text }: { color: string; title: string; text: string }) {
  return (
    <div style={{ background: "#fff", borderRadius: "var(--radius)", padding: "26px 22px", borderTop: `3px solid ${color}` }}>
      <h4 style={{ color, margin: "0 0 10px", fontSize: "1rem" }}>{title}</h4>
      <p className="muted" style={{ margin: 0, fontSize: ".95rem", lineHeight: 1.65 }}>
        {text}
      </p>
    </div>
  );
}

function KV({ k, v }: { k: string; v: string }) {
  return (
    <div className="item">
      <div className="k">{k}</div>
      <div className="v">{v}</div>
    </div>
  );
}

export default function PrincipiosPage() {
  return (
    <>
      <section className="hero" style={{ minHeight: "44vh", padding: 0 }}>
        <div className="hero-bg">
          <Image src={HERO_IMG} alt="" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
        </div>
        <div className="wrap hero-inner" style={{ paddingBottom: "50px" }}>
          <div className="eyebrow">Iniciativa Global de Turismo Regenerativo</div>
          <h1 style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)" }}>Principios IGTR</h1>
          <p style={{ maxWidth: "580px", fontSize: "1.1rem", margin: 0 }}>
            El turismo regenerativo no busca reducir daño: busca dejar el lugar, las personas y a quien
            viaja mejor de lo que estaban.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--forest)", padding: "64px 0" }}>
        <div className="wrap" style={{ maxWidth: "720px", textAlign: "center" }}>
          <div className="eyebrow" style={{ color: "#a8bfa0", marginBottom: "20px" }}>
            Una invitación
          </div>
          <h2 style={{ color: "#f1ede2", fontSize: "clamp(1.4rem,2.8vw,2rem)", lineHeight: 1.4, marginBottom: "28px" }}>
            El viaje de la regeneración es una invitación a ser parte consciente de la co-evolución del
            ser humano con la naturaleza
          </h2>
          <div style={{ width: "48px", height: "2px", background: "var(--terra)", margin: "0 auto 28px" }} />
          <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#cdd9c5", margin: "0 0 16px" }}>
            &quot;El Turismo Regenerativo busca crear experiencias de conexión profunda entre el ser
            humano consigo mismo, con los demás y con la naturaleza, generando una economía próspera que
            surge desde el lugar y para el lugar, con el objetivo de regenerar los sistemas naturales y
            culturales que sostienen la vida.&quot;
          </p>
          <p style={{ fontSize: ".88rem", color: "#8c9e84", fontStyle: "italic", margin: 0 }}>
            — IGTR · Iniciativa Global de Turismo Regenerativo
          </p>
        </div>
      </section>

      <section style={{ background: "#f7f4ef", padding: "64px 0" }}>
        <div className="wrap" style={{ maxWidth: "860px" }}>
          <div className="eyebrow" style={{ textAlign: "center", marginBottom: "10px" }}>
            Nuestra misión
          </div>
          <h2 style={{ textAlign: "center", margin: "0 auto 12px", maxWidth: "640px" }}>
            Una perspectiva regenerativa como fuente de valor e innovación
          </h2>
          <p style={{ textAlign: "center", fontSize: "1.05rem", color: "var(--ink-soft)", maxWidth: "660px", margin: "0 auto 36px", lineHeight: 1.7 }}>
            Revolutiva busca contribuir desde una perspectiva regenerativa, permitiéndonos influir en
            diversas áreas, destinos e iniciativas de turismo como una herramienta de regeneración, salud
            y prosperidad.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px" }}>
            <PCard color="var(--terra)" title="Salud Integral" text="Salud, bienestar y belleza a través de la coherencia entre la ética y la estética. El viaje como práctica de vida plena." />
            <PCard color="var(--moss)" title="Prosperidad desde el lugar" text="Una economía que surge del lugar y para el lugar, fortaleciendo a quienes habitan y cuidan el territorio." />
            <PCard color="var(--forest)" title="Transformación" text="Buscamos autenticidad, orgullo y profundidad en los viajes. Experiencias que transforman al viajero, al territorio y a quien recibe." />
          </div>
        </div>
      </section>

      <section style={{ padding: "64px 0" }}>
        <div className="wrap" style={{ maxWidth: "860px" }}>
          <div className="eyebrow" style={{ textAlign: "center", marginBottom: "10px" }}>
            El corazón de la metodología
          </div>
          <h2 style={{ textAlign: "center", margin: "0 auto 12px" }}>Las tres relaciones</h2>
          <p style={{ textAlign: "center", fontSize: "1.05rem", color: "var(--ink-soft)", maxWidth: "600px", margin: "0 auto 36px" }}>
            Toda experiencia regenerativa se diseña cuidando tres relaciones esenciales. Cuando las tres
            están vivas, el viaje regenera.
          </p>
          <div className="relations">
            <div className="rel-card rel-1">
              <div className="rel-icon">☼</div>
              <h3>Contigo</h3>
              <p className="muted" style={{ margin: 0 }}>
                Bienestar, presencia, transformación, aprendizaje y sentido. El viaje como una pausa que
                reordena.
              </p>
            </div>
            <div className="rel-card rel-2">
              <div className="rel-icon">♥</div>
              <h3>Con los demás</h3>
              <p className="muted" style={{ margin: 0 }}>
                Comunidad, cultura viva, hospitalidad, economía local y colaboración. Viajar
                fortaleciendo a quien habita el lugar.
              </p>
            </div>
            <div className="rel-card rel-3">
              <div className="rel-icon">❧</div>
              <h3>Con la naturaleza</h3>
              <p className="muted" style={{ margin: 0 }}>
                Agua, suelo, biodiversidad, paisaje, ciclos y límites ecológicos. La naturaleza como
                sujeto, no como decorado.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bg-2)", padding: "64px 0" }}>
        <div className="wrap" style={{ maxWidth: "900px" }}>
          <div className="eyebrow" style={{ textAlign: "center", marginBottom: "10px" }}>
            Metodología IGTR
          </div>
          <h2 style={{ textAlign: "center", margin: "0 auto 12px" }}>Los seis principios del turismo regenerativo</h2>
          <p style={{ textAlign: "center", fontSize: "1.05rem", color: "var(--ink-soft)", maxWidth: "580px", margin: "0 auto 36px" }}>
            Seis ejes que, cuando actúan juntos, convierten el viaje en un acto de regeneración.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "18px" }}>
            <PCard color="var(--forest)" title="La vida en el centro" text="Toda decisión se toma evaluando su impacto en los sistemas vivos: humanos, naturales y culturales." />
            <PCard color="var(--moss)" title="Coherencia ética y estética" text="Lo bello y lo bueno no se separan. La forma del viaje refleja sus valores: el cómo importa tanto como el qué." />
            <PCard color="var(--terra)" title="Sentido del lugar" text="Cada territorio tiene una identidad propia, ritmos, memorias y saberes. El viaje regenerativo la devela y la honra." />
            <PCard color="var(--forest)" title="Las tres relaciones" text="Contigo, con los demás y con la naturaleza. Cuando las tres relaciones están vivas, el viaje regenera." />
            <PCard color="var(--moss)" title="Experiencias de valor" text="El viaje regenerativo crea valor genuino para viajero, comunidad y territorio — no lo extrae ni lo simula." />
            <PCard color="var(--terra)" title="Hospitalidad profunda" text="El viaje convierte al extraño en alguien familiar. La hospitalidad nace de las personas, la cultura y la naturaleza que reciben, y se vuelve acogida, pertenencia y conexión genuina con el lugar." />
          </div>
        </div>
      </section>

      <section style={{ padding: "64px 0" }}>
        <div className="wrap" style={{ maxWidth: "720px" }}>
          <div className="eyebrow" style={{ marginBottom: "10px" }}>
            En la plataforma
          </div>
          <h2 style={{ margin: "0 0 28px" }}>Cómo se traduce en Revolutiva</h2>
          <div className="kv" style={{ gridTemplateColumns: "1fr" }}>
            <KV k="Curaduría viva" v="No publicamos todo: acompañamos a cada proyecto en su evolución regenerativa." />
            <KV k="Transparencia" v="Indicadores R y evidencias claras, en lugar de sellos vacíos." />
            <KV k="Ritmos del lugar" v="Calendarios regenerativos que alinean la visita con estaciones, festividades y ciclos ecológicos." />
            <KV k="Reciprocidad" v="Cada viaje devuelve algo concreto al territorio." />
          </div>
          <div className="quote" style={{ margin: "36px 0", textAlign: "center" }}>
            &quot;Develar la identidad del lugar y generar transformación en viajero, comunidad y
            territorio.&quot;
          </div>
          <div className="hero-actions" style={{ margin: 0 }}>
            <Link href="/indicadores" className="btn btn-primary">
              Indicadores R
            </Link>
            <Link href="/niveles" className="btn btn-ghost">
              Niveles evolutivos
            </Link>
            <a className="btn btn-ghost" href="https://turismoregenerativo.org/" target="_blank" rel="noopener">
              Sitio IGTR ↗
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
