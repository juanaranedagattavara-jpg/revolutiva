export type ElementoId = "fuego" | "aire" | "agua" | "tierra";
export type RId = "r1" | "r2" | "r3" | "r4" | "r5";

export interface Elemento {
  id: ElementoId;
  nombre: string;
  ambito: string;
  icon: string;
  claseColor: ElementoId;
  descripcion: string;
  entendimiento: string;
  facultad: string;
  reino: string;
  preguntasCentrales: string[];
  transicion: string;
  principios: string[];
}

export interface RDimension {
  id: RId;
  nombre: string;
  color: string;
  claseColor: RId;
  descripcion: string;
  principios: string[];
}

export interface Principio {
  id: string;
  numero: number;
  elemento: ElementoId;
  nombre: string;
  direccion: string;
  rPrincipal: RId;
  codigoR: string;
  rSecundaria: RId | null;
  preguntas: string[];
}

export interface Rango {
  min: number;
  max: number;
  nivel: string;
  numero: string;
  color: string;
  texto: string;
  visibilidad: string;
}

export interface EscalaSignificado {
  titulo: string;
  texto: string;
}

export interface Respuesta {
  escala: number | null;
  texto: string;
}

export type Respuestas = Record<string, Respuesta>;

export interface DatosIniciales {
  organizacion: string;
  tipo: string;
  persona: string;
  cargo: string;
  email: string;
  whatsapp: string;
  territorio: string;
  fecha: string;
  modalidad: string;
}

export interface ResultadosCompletos {
  principios: Record<string, number | null>;
  elementos: Record<ElementoId, number | null>;
  rs: Record<RId, number | null>;
}

export interface EstadoFlowMap {
  datosIniciales: DatosIniciales;
  respuestas: Respuestas;
  indiceActual: "datos" | "review" | number;
  vistaActual: "intro" | "cuestionario" | "resultados";
  iniciado: boolean;
}
