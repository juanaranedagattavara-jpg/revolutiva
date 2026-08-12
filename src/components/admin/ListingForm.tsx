"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Listing } from "@/lib/types";

type FormState = {
  slug: string;
  legacy_id: string;
  category: string;
  published: boolean;
  nombre: string;
  pais: string;
  territorio: string;
  region: string;
  anfitrion: string;
  descripcion: string;
  historia: string;
  vocacion: string;
  tipos: string;
  relacion: string;
  nivel: string;
  r1: string;
  r2: string;
  r3: string;
  r4: string;
  r5: string;
  r_destacados: string;
  duracion: string;
  esfuerzo: string;
  grupo: string;
  precio: string;
  modalidad_precio: string;
  idiomas: string;
  capacidad: string;
  temporadas: string;
  calendario: string;
  viajero: string;
  vivira: string;
  aprendera: string;
  r_conmigo: string;
  r_comunidad: string;
  r_naturaleza: string;
  ritmo: string;
  saber_antes: string;
  reciprocidad: string;
  evidencias: string;
  category_data: string;
  foto: string;
  galeria: string;
  sort_order: string;
};

function toForm(l?: Listing | null): FormState {
  return {
    slug: l?.slug ?? "",
    legacy_id: l?.legacy_id ?? "",
    category: l?.category ?? "experiencia",
    published: l?.published ?? false,
    nombre: l?.nombre ?? "",
    pais: l?.pais ?? "",
    territorio: l?.territorio ?? "",
    region: l?.region ?? "",
    anfitrion: l?.anfitrion ?? "",
    descripcion: l?.descripcion ?? "",
    historia: l?.historia ?? "",
    vocacion: l?.vocacion ?? "",
    tipos: (l?.tipos ?? []).join(", "),
    relacion: l?.relacion ?? "integral",
    nivel: String(l?.nivel ?? 1),
    r1: l?.r1 ?? "inicial",
    r2: l?.r2 ?? "inicial",
    r3: l?.r3 ?? "inicial",
    r4: l?.r4 ?? "inicial",
    r5: l?.r5 ?? "inicial",
    r_destacados: (l?.r_destacados ?? []).join(", "),
    duracion: l?.duracion ?? "",
    esfuerzo: l?.esfuerzo ?? "",
    grupo: l?.grupo ?? "",
    precio: l?.precio != null ? String(l.precio) : "",
    modalidad_precio: l?.modalidad_precio ?? "",
    idiomas: (l?.idiomas ?? []).join(", "),
    capacidad: l?.capacidad ?? "",
    temporadas: (l?.temporadas ?? []).join(", "),
    calendario: l?.calendario ?? "",
    viajero: l?.viajero ?? "",
    vivira: l?.vivira ?? "",
    aprendera: l?.aprendera ?? "",
    r_conmigo: l?.r_conmigo ?? "",
    r_comunidad: l?.r_comunidad ?? "",
    r_naturaleza: l?.r_naturaleza ?? "",
    ritmo: l?.ritmo ?? "",
    saber_antes: l?.saber_antes ?? "",
    reciprocidad: l?.reciprocidad ?? "",
    evidencias: (l?.evidencias ?? []).join("\n"),
    category_data: JSON.stringify(l?.category_data ?? {}, null, 2),
    foto: l?.foto ?? "",
    galeria: (l?.galeria ?? []).join("\n"),
    sort_order: String(l?.sort_order ?? 0),
  };
}

const arr = (s: string) =>
  s
    .split(/[,\n]/)
    .map((x) => x.trim())
    .filter(Boolean);

export default function ListingForm({ listing }: { listing?: Listing | null }) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(toForm(listing));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    let categoryData: unknown;
    try {
      categoryData = JSON.parse(form.category_data || "{}");
    } catch {
      setSaving(false);
      setError("category_data no es JSON válido.");
      return;
    }

    const payload = {
      slug: form.slug,
      legacy_id: form.legacy_id || null,
      category: form.category,
      published: form.published,
      nombre: form.nombre,
      pais: form.pais,
      territorio: form.territorio,
      region: form.region || null,
      anfitrion: form.anfitrion,
      descripcion: form.descripcion,
      historia: form.historia || null,
      vocacion: form.vocacion || null,
      tipos: arr(form.tipos),
      relacion: form.relacion,
      nivel: Number(form.nivel),
      r1: form.r1,
      r2: form.r2,
      r3: form.r3,
      r4: form.r4,
      r5: form.r5,
      r_destacados: arr(form.r_destacados),
      duracion: form.duracion || null,
      esfuerzo: form.esfuerzo || null,
      grupo: form.grupo || null,
      precio: form.precio ? Number(form.precio) : null,
      modalidad_precio: form.modalidad_precio || null,
      idiomas: arr(form.idiomas),
      capacidad: form.capacidad || null,
      temporadas: arr(form.temporadas),
      calendario: form.calendario || null,
      viajero: form.viajero || null,
      vivira: form.vivira || null,
      aprendera: form.aprendera || null,
      r_conmigo: form.r_conmigo || null,
      r_comunidad: form.r_comunidad || null,
      r_naturaleza: form.r_naturaleza || null,
      ritmo: form.ritmo || null,
      saber_antes: form.saber_antes || null,
      reciprocidad: form.reciprocidad || null,
      evidencias: arr(form.evidencias),
      category_data: categoryData,
      foto: form.foto || null,
      galeria: arr(form.galeria),
      sort_order: Number(form.sort_order || 0),
    };

    const supabase = createClient();
    if (listing) {
      const { error: updateError } = await supabase.from("listings").update(payload).eq("id", listing.id);
      setSaving(false);
      if (updateError) {
        setError(updateError.message);
        return;
      }
    } else {
      const { data, error: insertError } = await supabase.from("listings").insert(payload).select("id").single();
      setSaving(false);
      if (insertError) {
        setError(insertError.message);
        return;
      }
      router.push(`/admin/listings/${data.id}`);
      router.refresh();
      return;
    }
    router.refresh();
  }

  async function handleDelete() {
    if (!listing) return;
    if (!confirm(`¿Eliminar "${listing.nombre}"? Esta acción no se puede deshacer.`)) return;
    const supabase = createClient();
    const { error: deleteError } = await supabase.from("listings").delete().eq("id", listing.id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    router.push("/admin/listings");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="formstep" style={{ display: "grid", gap: "18px" }}>
      <div className="field-row">
        <div className="field">
          <label>Nombre</label>
          <input required value={form.nombre} onChange={(e) => set("nombre", e.target.value)} />
        </div>
        <div className="field">
          <label>Slug</label>
          <input required value={form.slug} onChange={(e) => set("slug", e.target.value)} />
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label>Categoría</label>
          <select value={form.category} onChange={(e) => set("category", e.target.value)}>
            <option value="experiencia">Experiencia</option>
            <option value="hospedaje">Hospedaje</option>
            <option value="guiado">Guiado</option>
          </select>
        </div>
        <div className="field">
          <label>Relación dominante</label>
          <select value={form.relacion} onChange={(e) => set("relacion", e.target.value)}>
            <option value="conmigo">Conmigo</option>
            <option value="comunidad">Comunidad</option>
            <option value="naturaleza">Naturaleza</option>
            <option value="integral">Integral 3R</option>
          </select>
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label>País</label>
          <input required value={form.pais} onChange={(e) => set("pais", e.target.value)} />
        </div>
        <div className="field">
          <label>Territorio</label>
          <input required value={form.territorio} onChange={(e) => set("territorio", e.target.value)} />
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label>Región (opcional)</label>
          <input value={form.region} onChange={(e) => set("region", e.target.value)} />
        </div>
        <div className="field">
          <label>Anfitrión</label>
          <input required value={form.anfitrion} onChange={(e) => set("anfitrion", e.target.value)} />
        </div>
      </div>

      <div className="field">
        <label>Descripción</label>
        <textarea required value={form.descripcion} onChange={(e) => set("descripcion", e.target.value)} />
      </div>
      <div className="field">
        <label>Historia</label>
        <textarea value={form.historia} onChange={(e) => set("historia", e.target.value)} />
      </div>
      <div className="field">
        <label>Vocación</label>
        <textarea value={form.vocacion} onChange={(e) => set("vocacion", e.target.value)} />
      </div>

      <div className="field-row">
        <div className="field">
          <label>Nivel evolutivo</label>
          <select value={form.nivel} onChange={(e) => set("nivel", e.target.value)}>
            <option value="1">1 · En incubación</option>
            <option value="2">2 · En transición</option>
            <option value="3">3 · Enraizado</option>
          </select>
        </div>
        <div className="field">
          <label>Orden (sort_order)</label>
          <input type="number" value={form.sort_order} onChange={(e) => set("sort_order", e.target.value)} />
        </div>
      </div>

      <div>
        <label style={{ display: "block", fontSize: ".88rem", fontWeight: 600, marginBottom: "10px" }}>
          Indicadores R
        </label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "10px" }}>
          {(["r1", "r2", "r3", "r4", "r5"] as const).map((k, i) => (
            <div className="field" key={k} style={{ margin: 0 }}>
              <label>R{i + 1}</label>
              <select value={form[k]} onChange={(e) => set(k, e.target.value)}>
                <option value="inicial">Inicial</option>
                <option value="desarrollo">Desarrollo</option>
                <option value="enraizado">Enraizado</option>
              </select>
            </div>
          ))}
        </div>
      </div>

      <div className="field">
        <label>R destacados (códigos, separados por coma: R1, R2…)</label>
        <input value={form.r_destacados} onChange={(e) => set("r_destacados", e.target.value)} />
      </div>

      <div className="field-row">
        <div className="field">
          <label>Duración</label>
          <input value={form.duracion} onChange={(e) => set("duracion", e.target.value)} />
        </div>
        <div className="field">
          <label>Esfuerzo</label>
          <input value={form.esfuerzo} onChange={(e) => set("esfuerzo", e.target.value)} />
        </div>
      </div>
      <div className="field-row">
        <div className="field">
          <label>Grupo</label>
          <input value={form.grupo} onChange={(e) => set("grupo", e.target.value)} />
        </div>
        <div className="field">
          <label>Capacidad</label>
          <input value={form.capacidad} onChange={(e) => set("capacidad", e.target.value)} />
        </div>
      </div>
      <div className="field-row">
        <div className="field">
          <label>Precio {form.category === "guiado" && "(usar tarifa en category_data para guiados)"}</label>
          <input type="number" value={form.precio} onChange={(e) => set("precio", e.target.value)} />
        </div>
        <div className="field">
          <label>Modalidad de precio</label>
          <input value={form.modalidad_precio} onChange={(e) => set("modalidad_precio", e.target.value)} />
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label>Idiomas (separados por coma)</label>
          <input value={form.idiomas} onChange={(e) => set("idiomas", e.target.value)} />
        </div>
        <div className="field">
          <label>Temporadas (separadas por coma)</label>
          <input value={form.temporadas} onChange={(e) => set("temporadas", e.target.value)} />
        </div>
      </div>
      <div className="field">
        <label>Tipos (separados por coma)</label>
        <input value={form.tipos} onChange={(e) => set("tipos", e.target.value)} />
      </div>
      <div className="field">
        <label>Calendario regenerativo</label>
        <textarea value={form.calendario} onChange={(e) => set("calendario", e.target.value)} />
      </div>
      <div className="field">
        <label>Viajero ideal</label>
        <input value={form.viajero} onChange={(e) => set("viajero", e.target.value)} />
      </div>

      {form.category === "experiencia" && (
        <>
          <div className="field">
            <label>Qué vivirá</label>
            <textarea value={form.vivira} onChange={(e) => set("vivira", e.target.value)} />
          </div>
          <div className="field">
            <label>Qué aprenderá</label>
            <textarea value={form.aprendera} onChange={(e) => set("aprendera", e.target.value)} />
          </div>
          <div className="field-row">
            <div className="field">
              <label>Relación contigo</label>
              <textarea value={form.r_conmigo} onChange={(e) => set("r_conmigo", e.target.value)} />
            </div>
            <div className="field">
              <label>Relación con la comunidad</label>
              <textarea value={form.r_comunidad} onChange={(e) => set("r_comunidad", e.target.value)} />
            </div>
          </div>
          <div className="field-row">
            <div className="field">
              <label>Relación con la naturaleza</label>
              <textarea value={form.r_naturaleza} onChange={(e) => set("r_naturaleza", e.target.value)} />
            </div>
            <div className="field">
              <label>Ritmo</label>
              <textarea value={form.ritmo} onChange={(e) => set("ritmo", e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label>Qué debe saber antes</label>
            <textarea value={form.saber_antes} onChange={(e) => set("saber_antes", e.target.value)} />
          </div>
          <div className="field">
            <label>Reciprocidad</label>
            <textarea value={form.reciprocidad} onChange={(e) => set("reciprocidad", e.target.value)} />
          </div>
        </>
      )}

      {form.category === "hospedaje" && (
        <div className="field">
          <label>Ritmo</label>
          <textarea value={form.ritmo} onChange={(e) => set("ritmo", e.target.value)} />
        </div>
      )}

      <div className="field">
        <label>Evidencias (una por línea)</label>
        <textarea value={form.evidencias} onChange={(e) => set("evidencias", e.target.value)} />
      </div>

      <div className="field">
        <label>
          Datos específicos de categoría (JSON) —{" "}
          {form.category === "hospedaje"
            ? "tipoAloj, habitaciones, alimentacion, proveedores, agua, energia, residuos, comunidad, conservacion, filosofia, experienciasAsoc[]"
            : form.category === "guiado"
              ? "especialidad, historiaPersonal, relTerritorio, tiposGuiado[], saberes, cuidaRitmo, interpreta, seguridad, acuerdos, limites, tarifa"
              : "sin campos adicionales para experiencias"}
        </label>
        <textarea
          style={{ fontFamily: "monospace", fontSize: ".85rem", minHeight: "160px" }}
          value={form.category_data}
          onChange={(e) => set("category_data", e.target.value)}
        />
      </div>

      <div className="field-row">
        <div className="field">
          <label>Foto de portada (ruta)</label>
          <input required value={form.foto} onChange={(e) => set("foto", e.target.value)} placeholder="/Carpeta/imagen.jpg" />
        </div>
        <div className="field">
          <label>ID legado (opcional)</label>
          <input value={form.legacy_id} onChange={(e) => set("legacy_id", e.target.value)} />
        </div>
      </div>
      <div className="field">
        <label>Galería (una ruta por línea)</label>
        <textarea value={form.galeria} onChange={(e) => set("galeria", e.target.value)} />
      </div>

      <div className="checkrow">
        <input type="checkbox" id="published" checked={form.published} onChange={(e) => set("published", e.target.checked)} />
        <label htmlFor="published" style={{ margin: 0 }}>
          Publicado (visible en el sitio)
        </label>
      </div>

      {error && <p style={{ color: "var(--red)" }}>{error}</p>}

      <div style={{ display: "flex", gap: "12px", justifyContent: "space-between" }}>
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? "Guardando…" : listing ? "Guardar cambios" : "Crear listing"}
        </button>
        {listing && (
          <button type="button" className="btn btn-ghost" style={{ color: "var(--red)" }} onClick={handleDelete}>
            Eliminar listing
          </button>
        )}
      </div>
    </form>
  );
}
