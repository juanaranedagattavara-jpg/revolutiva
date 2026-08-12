import Image from "next/image";
import Link from "next/link";
import { CAT_META } from "@/lib/constants";
import { getListingsByCategory } from "@/lib/queries";
import type { ListingCategory } from "@/lib/types";
import ListingCard from "./ListingCard";

export default async function CategoryPage({ cat }: { cat: ListingCategory }) {
  const m = CAT_META[cat];
  const items = await getListingsByCategory(cat);

  return (
    <>
      <section className="hero" style={{ minHeight: "48vh", padding: 0 }}>
        <div className="hero-bg">
          <Image src={m.foto} alt={m.plural} fill priority sizes="100vw" style={{ objectFit: "cover" }} />
        </div>
        <div className="wrap hero-inner" style={{ paddingBottom: "48px" }}>
          <div className="eyebrow">Categoría</div>
          <h1 style={{ fontSize: "clamp(2rem,4.5vw,3.4rem)" }}>{m.plural}</h1>
          <p style={{ maxWidth: "560px" }}>{m.intro}</p>
        </div>
      </section>
      <section style={{ padding: "40px 0" }}>
        <div className="wrap">
          <div className="taglist" style={{ marginBottom: "30px" }}>
            {m.ejemplos.map((e) => (
              <span className="tag" key={e}>
                {e}
              </span>
            ))}
          </div>
          {cat === "experiencia" && (
            <div
              className="band"
              style={{
                padding: "26px 30px",
                marginBottom: "30px",
                display: "flex",
                gap: "20px",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <div style={{ fontSize: "2rem", lineHeight: 1 }}>⛰</div>
              <div style={{ flex: 1, minWidth: "240px" }}>
                <h3 style={{ color: "#fbf8f0", margin: "0 0 4px" }}>Peregrinaciones y caminos</h3>
                <p style={{ color: "#cdd3c1", margin: 0, fontSize: ".92rem" }}>
                  Rutas ancestrales y caminos con sentido: caminar como práctica de reconexión, memoria y
                  reciprocidad con el territorio.
                </p>
              </div>
              <Link href="/explorar?tipo=Peregrinaciones%20y%20caminos" className="btn btn-terra btn-sm">
                Ver peregrinaciones →
              </Link>
            </div>
          )}
          <div className="results-bar">
            <span className="count">{items.length} proyectos en la red</span>
            <Link href="/explorar" className="btn btn-ghost btn-sm">
              Filtrar todo →
            </Link>
          </div>
          <div className="grid">
            {items.map((it) => (
              <ListingCard item={it} key={it.id} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
