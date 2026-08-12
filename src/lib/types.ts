export type ListingCategory = "experiencia" | "hospedaje" | "guiado";
export type RelationType = "conmigo" | "comunidad" | "naturaleza" | "integral";
export type RState = "inicial" | "desarrollo" | "enraizado";
export type LeadStatus = "nuevo" | "contactado" | "en_proceso" | "cerrado" | "descartado";
export type PostulationStatus =
  | "recibida"
  | "en_revision"
  | "aprobada"
  | "rechazada"
  | "en_mentoria";

export interface RDims {
  R1: RState;
  R2: RState;
  R3: RState;
  R4: RState;
  R5: RState;
}

/** Category-specific extra fields, stored in listings.category_data (JSONB). */
export interface HospedajeData {
  tipoAloj?: string;
  habitaciones?: string;
  alimentacion?: string;
  proveedores?: string;
  agua?: string;
  energia?: string;
  residuos?: string;
  comunidad?: string;
  conservacion?: string;
  filosofia?: string;
  experienciasAsoc?: string[];
}

export interface GuiadoData {
  especialidad?: string;
  historiaPersonal?: string;
  relTerritorio?: string;
  tiposGuiado?: string[];
  saberes?: string;
  cuidaRitmo?: string;
  interpreta?: string;
  seguridad?: string;
  acuerdos?: string;
  limites?: string;
  tarifa?: number;
}

export interface Listing {
  id: string;
  slug: string;
  legacy_id: string | null;
  category: ListingCategory;
  published: boolean;
  nombre: string;
  pais: string;
  territorio: string;
  region: string | null;
  anfitrion: string;
  descripcion: string;
  historia: string | null;
  vocacion: string | null;
  tipos: string[];
  relacion: RelationType;
  nivel: 1 | 2 | 3;
  r1: RState;
  r2: RState;
  r3: RState;
  r4: RState;
  r5: RState;
  r_destacados: string[];
  duracion: string | null;
  esfuerzo: string | null;
  grupo: string | null;
  precio: number | null;
  modalidad_precio: string | null;
  idiomas: string[];
  capacidad: string | null;
  temporadas: string[];
  calendario: string | null;
  viajero: string | null;
  vivira: string | null;
  aprendera: string | null;
  r_conmigo: string | null;
  r_comunidad: string | null;
  r_naturaleza: string | null;
  ritmo: string | null;
  saber_antes: string | null;
  reciprocidad: string | null;
  evidencias: string[];
  category_data: HospedajeData | GuiadoData | Record<string, never>;
  foto: string | null;
  galeria: string[];
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export function listingR(listing: Listing): RDims {
  return {
    R1: listing.r1,
    R2: listing.r2,
    R3: listing.r3,
    R4: listing.r4,
    R5: listing.r5,
  };
}

export function listingPrice(listing: Listing): number | null {
  if (listing.category === "guiado") {
    return (listing.category_data as GuiadoData)?.tarifa ?? listing.precio;
  }
  return listing.precio;
}

export interface Lead {
  id: string;
  listing_id: string | null;
  listing_name: string;
  accion: string;
  nombre: string;
  email: string;
  telefono: string | null;
  mensaje: string | null;
  status: LeadStatus;
  notas_admin: string | null;
  source_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Postulation {
  id: string;
  quien: string;
  email: string;
  donde: string;
  territorio: string | null;
  tipo_oferta: string;
  que_hace: string;
  oferta: string;
  r_viajero: string | null;
  r_comunidad: string | null;
  r_naturaleza: string | null;
  ritmos: string | null;
  evidencias: string | null;
  fortalecer: string | null;
  quiere_mentoria: boolean;
  status: PostulationStatus;
  notas_admin: string | null;
  nivel_asignado: 1 | 2 | 3 | null;
  created_at: string;
  updated_at: string;
}
