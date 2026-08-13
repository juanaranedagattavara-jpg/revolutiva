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
  principios: string[];
}

export const R_DIMS: RDimMeta[] = [
  {
    code: "R1",
    name: "Reconexión",
    q: "¿Cuál es la relación del proyecto con su identidad y propósito profundo?",
    desc: "La relación de la organización consigo misma: identidad, propósito, coherencia ética y estética, consciencia sistémica y capacidad de generar experiencias que transforman al viajero.",
    principios: ["Identidad y propósito", "Coherencia ética y estética", "Percepción sistémica", "Experiencias profundas y trascendentes"],
  },
  {
    code: "R2",
    name: "Relaciones",
    q: "¿Cómo se relaciona el proyecto con comunidades, colaboradores y actores del territorio?",
    desc: "La relación con personas, comunidades, colaboradores, proveedores e instituciones. Colaboración, co-creación, sentir del lugar y redes de valor territorial.",
    principios: ["Colaboración y co-creación", "Sentir del lugar", "Flow, movimiento y redes", "Abundancia, nutrición y reproducción"],
  },
  {
    code: "R3",
    name: "Revitalización",
    q: "¿Cómo contribuye el proyecto a la vitalidad ecológica del territorio?",
    desc: "La relación con la naturaleza y su contribución a los sistemas vivos. Cuidado del agua, los suelos, los ecosistemas, la infraestructura y el bienestar ecológico del territorio.",
    principios: ["Conexión con la naturaleza", "Aguas vivas", "Suelos sanos y carbono", "Bienestar ecológico", "Infraestructura y estética"],
  },
  {
    code: "R4",
    name: "Ritmos",
    q: "¿Cómo se alinea el proyecto con los flujos y ciclos del lugar?",
    desc: "La relación con los ritmos naturales, culturales y bioculturales del lugar: temporadas, calendarios, tiempos del territorio y flujos de movimiento regenerativo.",
    principios: ["Ritmo", "Flow, movimiento y redes"],
  },
  {
    code: "R5",
    name: "Reciprocidad",
    q: "¿Qué devuelve el proyecto al territorio y cómo evoluciona?",
    desc: "La capacidad de devolver valor al territorio, distribuir beneficios más allá de la organización, gestionar la huella energética y crecer de forma saludable y equilibrada.",
    principios: ["Abundancia, nutrición y reproducción", "Metabolismo, crecimiento y desarrollo", "Energía y huella"],
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
