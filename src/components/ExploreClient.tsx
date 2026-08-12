"use client";

import { useMemo, useState } from "react";
import { CAT_META, RELACIONES, R_DIMS, TIPOS_EXP } from "@/lib/constants";
import { listingPrice, type Listing } from "@/lib/types";
import ListingCard from "./ListingCard";

interface Filters {
  q: string;
  cat: string[];
  rel: string[];
  tipo: string[];
  nivel: string[];
  r: string[];
  region: string[];
  sort: "curado" | "nivel" | "precio-asc" | "precio-desc";
}

const EMPTY: Filters = { q: "", cat: [], rel: [], tipo: [], nivel: [], r: [], region: [], sort: "curado" };

export default function ExploreClient({ items, initialTipo }: { items: Listing[]; initialTipo?: string }) {
  const [filters, setFilters] = useState<Filters>({
    ...EMPTY,
    tipo: initialTipo ? [initialTipo] : [],
  });

  const regions = useMemo(() => [...new Set(items.map((d) => d.pais))], [items]);

  function toggle(key: "cat" | "rel" | "tipo" | "nivel" | "r" | "region", v: string) {
    setFilters((f) => {
      const arr = f[key];
      const next = arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
      return { ...f, [key]: next };
    });
  }

  function clear() {
    setFilters({ ...EMPTY, sort: filters.sort });
  }

  const results = useMemo(() => {
    let res = items.filter((it) => {
      if (filters.cat.length && !filters.cat.includes(it.category)) return false;
      if (filters.rel.length && !filters.rel.includes(it.relacion)) return false;
      if (filters.nivel.length && !filters.nivel.includes(String(it.nivel))) return false;
      if (filters.region.length && !filters.region.includes(it.pais)) return false;
      if (filters.r.length && !filters.r.every((code) => it.r_destacados.includes(code))) return false;
      if (filters.tipo.length && !filters.tipo.some((t) => it.tipos.includes(t))) return false;
      if (filters.q) {
        const hay = `${it.nombre} ${it.territorio} ${it.descripcion} ${it.anfitrion} ${it.pais}`.toLowerCase();
        if (!hay.includes(filters.q.toLowerCase())) return false;
      }
      return true;
    });
    const price = (it: Listing) => listingPrice(it) ?? 0;
    if (filters.sort === "nivel") res = [...res].sort((a, b) => b.nivel - a.nivel);
    if (filters.sort === "precio-asc") res = [...res].sort((a, b) => price(a) - price(b));
    if (filters.sort === "precio-desc") res = [...res].sort((a, b) => price(b) - price(a));
    return res;
  }, [items, filters]);

  return (
    <section style={{ padding: "54px 0 40px" }}>
      <div className="wrap">
        <div className="eyebrow">Explorar</div>
        <h2 style={{ marginBottom: ".2em" }}>Encuentra tu viaje regenerativo</h2>
        <p className="lead" style={{ maxWidth: "640px" }}>
          Filtra por territorio, categoría, relación dominante, nivel de madurez e indicadores R. Cada
          resultado cuida la vida del lugar.
        </p>
        <div className="explore" style={{ marginTop: "36px" }}>
          <aside className="filters">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <h4 style={{ margin: 0, color: "var(--ink)", fontFamily: "var(--font-serif)", fontSize: "1.1rem", textTransform: "none", letterSpacing: 0 }}>
                Filtros
              </h4>
              <button className="fchip" style={{ border: "none" }} onClick={clear}>
                Limpiar
              </button>
            </div>
            <FGroup title="Categoría" active={filters.cat} onToggle={(v) => toggle("cat", v)} options={Object.entries(CAT_META).map(([v, m]) => ({ v, l: m.plural }))} />
            <FGroup title="Relación dominante" active={filters.rel} onToggle={(v) => toggle("rel", v)} options={Object.entries(RELACIONES).map(([v, l]) => ({ v, l }))} />
            <FGroup title="Nivel de madurez" active={filters.nivel} onToggle={(v) => toggle("nivel", v)} options={[{ v: "1", l: "Incubación" }, { v: "2", l: "Transición" }, { v: "3", l: "Enraizado" }]} />
            <FGroup title="Indicadores R fuertes" active={filters.r} onToggle={(v) => toggle("r", v)} options={R_DIMS.map((d) => ({ v: d.code, l: `${d.code} ${d.name.split(" ")[0]}` }))} />
            <FGroup title="País" active={filters.region} onToggle={(v) => toggle("region", v)} options={regions.map((r) => ({ v: r, l: r }))} />
            <FGroup title="Tipo de experiencia" active={filters.tipo} onToggle={(v) => toggle("tipo", v)} options={TIPOS_EXP.map((t) => ({ v: t, l: t }))} />
          </aside>
          <div>
            <div className="results-bar">
              <div className="searchbox">
                <span>⌕</span>
                <input
                  placeholder="Buscar lugar, anfitrión, territorio…"
                  value={filters.q}
                  onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
                />
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <span className="count">
                  {results.length} {results.length === 1 ? "proyecto" : "proyectos"}
                </span>
                <select
                  className="select"
                  value={filters.sort}
                  onChange={(e) => setFilters((f) => ({ ...f, sort: e.target.value as Filters["sort"] }))}
                >
                  <option value="curado">Orden curado</option>
                  <option value="nivel">Mayor madurez</option>
                  <option value="precio-asc">Precio: menor</option>
                  <option value="precio-desc">Precio: mayor</option>
                </select>
              </div>
            </div>
            <div className="grid">
              {results.map((it) => (
                <ListingCard item={it} key={it.id} />
              ))}
            </div>
            {results.length === 0 && (
              <div style={{ display: "block", textAlign: "center", padding: "60px 0", color: "var(--muted)" }}>
                <p style={{ fontSize: "1.1rem" }}>No hay proyectos con estos filtros todavía.</p>
                <button className="btn btn-ghost btn-sm" onClick={clear}>
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FGroup({
  title,
  active,
  onToggle,
  options,
}: {
  title: string;
  active: string[];
  onToggle: (v: string) => void;
  options: { v: string; l: string }[];
}) {
  return (
    <div className="fgroup">
      <h4>{title}</h4>
      <div className="chiprow">
        {options.map((o) => (
          <button key={o.v} className={`fchip${active.includes(o.v) ? " on" : ""}`} onClick={() => onToggle(o.v)}>
            {o.l}
          </button>
        ))}
      </div>
    </div>
  );
}
