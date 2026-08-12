import type { ListingCategory, RState } from "./types";

export const TIPOS_EXP = [
  "Naturaleza y conservación",
  "Cultura viva",
  "Bienestar y reconexión",
  "Turismo comunitario",
  "Agroecología",
  "Gastronomía local",
  "Caminatas y senderismo",
  "Observación de fauna",
  "Aventura suave",
  "Retiros",
  "Peregrinaciones y caminos",
  "Rutas sagradas y bioculturales",
  "Aprendizaje y formación",
  "Patrimonio",
  "Pueblos originarios",
  "Experiencias rurales",
  "Voluntariado consciente",
];

export const RELACIONES: Record<string, string> = {
  conmigo: "Conmigo",
  comunidad: "Comunidad",
  naturaleza: "Naturaleza",
  integral: "Integral 3R",
};

export interface RDimMeta {
  code: "R1" | "R2" | "R3" | "R4" | "R5";
  name: string;
  q: string;
  desc: string;
}

export const R_DIMS: RDimMeta[] = [
  {
    code: "R1",
    name: "Reconexión personal",
    q: "¿Qué cambia o se despierta en el viajero?",
    desc: "Bienestar, presencia, aprendizaje, transformación y sentido.",
  },
  {
    code: "R2",
    name: "Relaciones comunitarias",
    q: "¿A quién fortalece esta experiencia en el territorio?",
    desc: "Cultura viva, economía local, acuerdos y colaboración.",
  },
  {
    code: "R3",
    name: "Regeneración de naturaleza",
    q: "¿Qué sistema natural cuida o mejora?",
    desc: "Agua, suelo, biodiversidad, residuos, energía, restauración.",
  },
  {
    code: "R4",
    name: "Ritmos del lugar",
    q: "¿Cuándo y cómo es sano visitar este lugar?",
    desc: "Calendario regenerativo, temporadas sensibles, ciclos culturales.",
  },
  {
    code: "R5",
    name: "Reciprocidad y evolución",
    q: "¿Qué devuelve el proyecto y cómo evoluciona?",
    desc: "Devolución, mejora continua, mentoría y aprendizaje.",
  },
];

export const NIVELES: Record<number, { name: string; cls: string }> = {
  1: { name: "En incubación", cls: "lvl-1" },
  2: { name: "En transición", cls: "lvl-2" },
  3: { name: "Enraizado", cls: "lvl-3" },
};

export const ST: Record<RState, string> = {
  inicial: "Inicial",
  desarrollo: "En desarrollo",
  enraizado: "Enraizado",
};

export interface CatMeta {
  slug: string;
  plural: string;
  singular: string;
  tag: string;
  intro: string;
  foto: string;
  ejemplos: string[];
}

export const CAT_META: Record<ListingCategory, CatMeta> = {
  experiencia: {
    slug: "experiencias",
    plural: "Peregrinación / Naturaleza",
    singular: "Viaje",
    tag: "Viaje",
    intro:
      "Viajes, peregrinaciones y rutas de naturaleza diseñadas para reconectar con el territorio, su cultura y sus ciclos.",
    foto: "/Llama Trek/LLama 1.webp",
    ejemplos: [
      "cultura viva",
      "peregrinaciones y caminos",
      "rutas sagradas",
      "caminos ancestrales",
      "caminatas interpretativas",
      "gastronomía local",
      "agroecología",
      "conservación",
      "bienestar y naturaleza",
      "turismo comunitario",
      "retiros",
      "voluntariados conscientes",
      "rutas bioculturales",
      "experiencias indígenas o campesinas",
    ],
  },
  hospedaje: {
    slug: "hospedajes",
    plural: "Hospedaje",
    singular: "Hospedaje",
    tag: "Hospedaje",
    intro: "Alojamientos que no solo reciben huéspedes, sino que cuidan el lugar donde existen.",
    foto: "/La Baita/portada.webp",
    ejemplos: [
      "lodges",
      "hoteles boutique",
      "alojamientos rurales",
      "reservas privadas",
      "eco-lodges",
      "refugios",
      "glampings",
      "casas patrimoniales",
      "estancias",
      "centros de retiro",
    ],
  },
  guiado: {
    slug: "operadores",
    plural: "Operadores",
    singular: "Operador",
    tag: "Operador",
    intro:
      "Operadores, colectivos y anfitriones que articulan y guían viajes regenerativos con una mirada profunda y relacional.",
    foto: "/Malinali/Dia-de-almas-Chiapas-Foto-Cuadrado.webp",
    ejemplos: [
      "guías de naturaleza",
      "guías culturales",
      "facilitadores de experiencias",
      "guías comunitarios",
      "intérpretes bioculturales",
      "anfitriones locales",
      "facilitadores de bienestar",
      "caminatas conscientes",
      "recorridos patrimoniales",
    ],
  },
};

export const CAT_BY_SLUG: Record<string, ListingCategory> = {
  experiencias: "experiencia",
  hospedajes: "hospedaje",
  operadores: "guiado",
};

export function clp(n: number | null | undefined): string {
  if (n == null) return "—";
  return "$" + n.toLocaleString("es-CL");
}

export function priceUnit(cat: ListingCategory): string {
  if (cat === "hospedaje") return "/ noche";
  if (cat === "guiado") return "/ jornada";
  return "/ persona";
}
