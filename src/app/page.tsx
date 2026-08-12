import Image from "next/image";
import Link from "next/link";
import { CAT_META, R_DIMS } from "@/lib/constants";
import { getFeaturedListings } from "@/lib/queries";
import ListingCard from "@/components/ListingCard";
import RevealOnScroll from "@/components/RevealOnScroll";

export const revalidate = 3600;

const HERO_IMG =
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1900&q=75";

export default async function HomePage() {
  const featured = await getFeaturedListings(3);

  return (
    <>
      <section className="hero" style={{ padding: 0 }}>
        <div className="hero-bg">
          <Image src={HERO_IMG} alt="" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
        </div>
        <div className="wrap hero-inner">
          <div className="eyebrow">Una iniciativa de la IGTR</div>
          <h1>
            Viajes que regeneran
            <br />
            relaciones.
          </h1>
          <p>
            Conecta con experiencias, hospedajes y guiados que cuidan la relación contigo, con las
            comunidades y con la naturaleza.
          </p>
          <div className="hero-actions">
            <Link href="/explorar" className="btn btn-terra">
              Explorar el territorio vivo
            </Link>
            <Link href="/postular" className="btn btn-ghost" style={{ color: "#f4f0e6", borderColor: "#ffffff66" }}>
              Postula tu proyecto
            </Link>
          </div>
        </div>
        <div className="hero-scroll">Desliza ↓</div>
      </section>

      <section>
        <div className="wrap">
          <div className="sec-head center reveal">
            <div className="eyebrow">No es un marketplace de tours</div>
            <h2>Una red viva de lugares, anfitriones y experiencias con sentido</h2>
            <p className="lead">
              Cada proyecto aquí cuida tres relaciones esenciales. No buscamos volumen ni descuentos:
              buscamos viajes que transforman al viajero, al territorio y a quien recibe.
            </p>
          </div>
          <div className="relations">
            <div className="rel-card rel-1 reveal">
              <div className="rel-icon">☼</div>
              <h3>Relación contigo</h3>
              <p className="muted">
                Bienestar, presencia, transformación, aprendizaje y sentido. El viaje como una pausa que
                reordena.
              </p>
            </div>
            <div className="rel-card rel-2 reveal">
              <div className="rel-icon">♥</div>
              <h3>Relación con los demás</h3>
              <p className="muted">
                Comunidad, cultura viva, hospitalidad, economía local y colaboración. Viajar
                fortaleciendo a quien habita el lugar.
              </p>
            </div>
            <div className="rel-card rel-3 reveal">
              <div className="rel-icon">❧</div>
              <h3>Relación con la naturaleza</h3>
              <p className="muted">
                Agua, suelo, biodiversidad, paisaje, ciclos y límites ecológicos. La naturaleza como
                sujeto, no como decorado.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="eyebrow">Tres formas de viajar con sentido</div>
            <h2>Explora por categoría</h2>
          </div>
          <div className="cats">
            {Object.entries(CAT_META).map(([k, m]) => (
              <Link href={`/${m.slug}`} className="cat-card reveal" key={k}>
                <span className="cat-tag">{m.tag}</span>
                <Image src={m.foto} alt={m.plural} fill sizes="(max-width: 1000px) 50vw, 33vw" style={{ objectFit: "cover" }} />
                <div className="cat-body">
                  <h3>{m.plural}</h3>
                  <p>{m.intro}</p>
                  <span className="btn btn-ghost btn-sm" style={{ color: "#fff", borderColor: "#ffffff55" }}>
                    Explorar →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="results-bar">
              <div className="sec-head" style={{ marginBottom: 0 }}>
                <div className="eyebrow">Selección curada</div>
                <h2>Proyectos enraizados</h2>
              </div>
              <Link href="/explorar" className="btn btn-ghost btn-sm">
                Ver todos →
              </Link>
            </div>
            <div className="grid">
              {featured.map((it) => (
                <ListingCard item={it} key={it.id} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section>
        <div className="wrap band" style={{ padding: "64px 56px" }}>
          <div style={{ maxWidth: "720px" }}>
            <div className="eyebrow">Indicadores R · contra el greenwashing</div>
            <h2>Cinco dimensiones para viajar con confianza</h2>
            <p className="lead" style={{ color: "#dde2d3" }}>
              Cada proyecto se evalúa con transparencia en cinco indicadores que miden cómo cuida las
              tres relaciones. Nada de sellos vacíos: evidencias simples, claras y honestas.
            </p>
          </div>
          <div className="rdims" style={{ marginTop: "36px" }}>
            {R_DIMS.map((d) => (
              <div className="rdim" style={{ background: "#36493a", borderColor: "#46583f" }} key={d.code}>
                <div className="rcode" style={{ color: "#d59276" }}>
                  {d.code}
                </div>
                <h4 style={{ color: "#f1ede2" }}>{d.name}</h4>
                <p style={{ color: "#c7cebb" }}>{d.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "30px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/indicadores" className="btn btn-terra">
              Conocer los Indicadores R
            </Link>
            <Link href="/niveles" className="btn btn-ghost" style={{ color: "#f4f0e6", borderColor: "#ffffff55" }}>
              Niveles evolutivos
            </Link>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap center" style={{ maxWidth: "820px" }}>
          <span className="pill-note reveal">Para proyectos y territorios</span>
          <div className="quote center reveal" style={{ margin: "22px auto 26px" }}>
            &quot;Esta plataforma no busca proyectos perfectos. Busca proyectos honestos, enraizados y
            dispuestos a evolucionar.&quot;
          </div>
          <div className="hero-actions" style={{ justifyContent: "center" }}>
            <Link href="/postular" className="btn btn-primary">
              Postula tu proyecto
            </Link>
            <Link href="/mentoria" className="btn btn-ghost">
              Solicitar mentoría IGTR
            </Link>
          </div>
        </div>
      </section>
      <RevealOnScroll />
    </>
  );
}
