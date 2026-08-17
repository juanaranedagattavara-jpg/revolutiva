import type { Elemento, ElementoId, EscalaSignificado, Principio, RDimension, RId, Rango } from "./types";

// ---- Sistema de niveles evolutivos (3 niveles), escala 0-7 ----
export const RANGOS: Rango[] = [
  {
    min: 0.0,
    max: 2.33,
    nivel: "En incubación",
    numero: "01",
    color: "var(--nivel1)",
    texto: "Proyectos con potencial regenerativo que aún necesitan ordenar su propuesta, relato, seguridad, evidencias o coherencia con las tres relaciones.",
    visibilidad: "no necesariamente se publican aún. Pueden acceder a mentoría IGTR.",
  },
  {
    min: 2.34,
    max: 4.66,
    nivel: "En transición",
    numero: "02",
    color: "var(--nivel2)",
    texto: "Intención clara, prácticas iniciales y disposición de mejora. Se publican con transparencia y un plan de mejora de 60 a 90 días.",
    visibilidad: "publicados con acompañamiento y plan de mejora.",
  },
  {
    min: 4.67,
    max: 7.0,
    nivel: "Enraizado",
    numero: "03",
    color: "var(--nivel3)",
    texto: "Identidad clara, prácticas consistentes, evidencias y una relación madura con su comunidad, territorio y naturaleza.",
    visibilidad: "mayor presencia y destaque dentro de la plataforma.",
  },
];

export function getNivel(score: number): Rango {
  for (const r of RANGOS) {
    if (score >= r.min && score <= r.max) return r;
  }
  if (score < 0) return RANGOS[0];
  return RANGOS[RANGOS.length - 1];
}

const NIVEL_COLOR_MAP: Record<string, string> = {
  "var(--nivel1)": "#a15c52",
  "var(--nivel2)": "#b98a4a",
  "var(--nivel3)": "#6b7d4a",
};

export function resolveColor(cssVarOrColor: string): string {
  if (cssVarOrColor?.startsWith("var(")) {
    return NIVEL_COLOR_MAP[cssVarOrColor] || "#57534a";
  }
  return cssVarOrColor;
}

// ---- Significado de la escala 0-7 ----
export const ESCALA_SIGNIFICADOS: Record<number, EscalaSignificado> = {
  0: { titulo: "No existe", texto: "La práctica, capacidad o condición no se encuentra presente." },
  1: { titulo: "Primeras señales", texto: "Existen ideas, conversaciones o acciones aisladas, sin continuidad." },
  2: { titulo: "Incipiente", texto: "Existen algunas prácticas, pero son informales, ocasionales o dependen de personas específicas." },
  3: { titulo: "Emergente", texto: "La práctica está comenzando a desarrollarse y existen algunas evidencias." },
  4: { titulo: "En desarrollo", texto: "La práctica se encuentra parcialmente incorporada y se aplica con cierta frecuencia." },
  5: { titulo: "Avanzado", texto: "La práctica está incorporada de manera habitual, aunque todavía existen brechas." },
  6: { titulo: "Consolidado", texto: "La práctica es consistente, conocida por el equipo y cuenta con evidencias." },
  7: { titulo: "Integrado", texto: "La práctica forma parte de la identidad y operación de la organización, se evalúa y evoluciona de manera consciente." },
};

// ---- Elementos ----
export const ELEMENTOS: Record<ElementoId, Elemento> = {
  fuego: {
    id: "fuego", nombre: "Fuego", ambito: "Identidad", icon: "🔥", claseColor: "fuego",
    descripcion: "El fuego representa la identidad, el propósito, los valores, la ética, la autoconciencia y la dirección profunda de la Organización Viva.",
    entendimiento: "La intención, la chispa, la luz, el calor y la conciencia.", facultad: "Pensar", reino: "Humano",
    preguntasCentrales: ["¿Quiénes somos?", "¿Cuál es nuestra razón de ser?", "¿Qué valores orientan nuestras decisiones?", "¿Existe coherencia entre lo que declaramos y lo que hacemos?"],
    transicion: "Entramos en el ámbito del Fuego. Este momento invita a observar la identidad profunda de la organización: aquello que la moviliza, los valores que orientan sus decisiones y la coherencia entre su propósito y sus prácticas.",
    principios: ["identidad-proposito", "coherencia", "conexion-naturaleza", "percepcion-sistemica"],
  },
  aire: {
    id: "aire", nombre: "Aire", ambito: "Relaciones", icon: "💨", claseColor: "aire",
    descripcion: "El aire representa las relaciones, la colaboración, la cultura organizacional, el sentir del lugar, el ritmo y la profundidad de las experiencias.",
    entendimiento: "Los conceptos, la comunicación, la palabra.", facultad: "Sentir", reino: "Animal",
    preguntasCentrales: ["¿Cómo nos relacionamos?", "¿Con quiénes co-creamos?", "¿Cómo integramos a la comunidad?", "¿Qué tipo de experiencia generamos en las personas?"],
    transicion: "Entramos en el ámbito del Aire. Este momento invita a observar la calidad de las relaciones, la colaboración, la cultura interna y la conexión sensible con el lugar.",
    principios: ["colaboracion-cocreacion", "sentir-lugar", "ritmo", "experiencias-profundas"],
  },
  agua: {
    id: "agua", nombre: "Agua", ambito: "Procesos", icon: "💧", claseColor: "agua",
    descripcion: "El agua representa los procesos vitales, el movimiento, los flujos, la nutrición, el crecimiento, la energía y la capacidad de adaptación.",
    entendimiento: "El movimiento y flujo en los procesos que involucran cambio y/o desarrollo.", facultad: "Hacer", reino: "Vegetal",
    preguntasCentrales: ["¿Cómo fluye nuestra organización?", "¿Cómo funcionan nuestros procesos?", "¿Cómo circulan la energía, los recursos y los beneficios?", "¿Nuestro crecimiento es saludable y equilibrado?"],
    transicion: "Entramos en el ámbito del Agua. Este momento invita a observar cómo fluyen los procesos, la energía, los recursos, los beneficios y el crecimiento de la organización.",
    principios: ["flow-movimiento-redes", "abundancia-nutricion", "energia-huella", "metabolismo-crecimiento"],
  },
  tierra: {
    id: "tierra", nombre: "Tierra", ambito: "Recursos", icon: "🌱", claseColor: "tierra",
    descripcion: "La tierra representa la dimensión física y material: el territorio, el agua, los suelos, la infraestructura, los ecosistemas y los recursos que sostienen la organización.",
    entendimiento: "Lo que damos cabida en el mundo, lo exterior, el cuerpo físico y lo material.", facultad: "Incorporar", reino: "Mineral",
    preguntasCentrales: ["¿Cómo utilizamos nuestros recursos?", "¿Cómo cuidamos los sistemas vivos del territorio?", "¿Qué impacto produce nuestra infraestructura?", "¿Qué condiciones materiales sostienen nuestro propósito?"],
    transicion: "Entramos en el ámbito de la Tierra. Este momento invita a observar cómo el propósito se materializa en los recursos, los ecosistemas, la infraestructura y el cuidado concreto del territorio.",
    principios: ["aguas-vivas", "suelos-sanos", "infraestructura-estetica", "bienestar-ecologico"],
  },
};
export const ORDEN_ELEMENTOS: ElementoId[] = ["fuego", "aire", "agua", "tierra"];

// ---- Cinco R ----
export const RS: Record<RId, RDimension> = {
  r1: {
    id: "r1", nombre: "R1 — Reconexión", color: "var(--r1)", claseColor: "r1",
    descripcion: "La relación de la organización consigo misma, con su identidad y con su propósito.",
    principios: ["identidad-proposito", "coherencia", "percepcion-sistemica", "experiencias-profundas"],
  },
  r2: {
    id: "r2", nombre: "R2 — Relaciones", color: "var(--r2)", claseColor: "r2",
    descripcion: "La relación de la organización con otras personas, comunidades, colaboradores, proveedores, instituciones y actores del territorio.",
    principios: ["colaboracion-cocreacion", "sentir-lugar", "flow-movimiento-redes", "abundancia-nutricion"],
  },
  r3: {
    id: "r3", nombre: "R3 — Revitalización", color: "var(--r3)", claseColor: "r3",
    descripcion: "La relación de la organización con la naturaleza y su contribución a la vitalidad ecológica del territorio.",
    principios: ["conexion-naturaleza", "aguas-vivas", "suelos-sanos", "bienestar-ecologico", "infraestructura-estetica"],
  },
  r4: {
    id: "r4", nombre: "R4 — Ritmos", color: "var(--r4)", claseColor: "r4",
    descripcion: "La relación con los flujos, ciclos, movimientos y tiempos naturales, culturales y bioculturales del lugar.",
    principios: ["ritmo", "flow-movimiento-redes"],
  },
  r5: {
    id: "r5", nombre: "R5 — Reciprocidad", color: "var(--r5)", claseColor: "r5",
    descripcion: "La capacidad de devolver valor al territorio, distribuir beneficios, aprender, evolucionar y generar impactos positivos más allá de la propia organización.",
    principios: ["abundancia-nutricion", "metabolismo-crecimiento", "energia-huella"],
  },
};
export const ORDEN_RS: RId[] = ["r1", "r2", "r3", "r4", "r5"];

// ---- 16 Principios = 16 evaluaciones del cuestionario ----
export const PRINCIPIOS: Record<string, Principio> = {
  "identidad-proposito": {
    id: "identidad-proposito", numero: 1, elemento: "fuego", nombre: "Identidad y propósito",
    direccion: "Develar el propósito profundo para dar a luz aquello que hace única a la Organización Viva y, al mismo tiempo, reconocer su relación con una totalidad mayor.",
    rPrincipal: "r1", codigoR: "1.1", rSecundaria: null,
    preguntas: ["¿Cuál es el propósito profundo de la Organización Viva?", "¿Cuál es la razón de ser de tu empresa más allá de generar ingresos, y cuántos de tus colaboradores la conocen y la sienten propia?"],
  },
  coherencia: {
    id: "coherencia", numero: 2, elemento: "fuego", nombre: "Coherencia",
    direccion: "Reconocer la ética, el bienestar y la belleza de forma que exista un reflejo coherente entre el mundo interior y el mundo exterior de la Organización Viva.",
    rPrincipal: "r1", codigoR: "1.2", rSecundaria: null,
    preguntas: ["¿Los valores que comunicas externamente —en la página web, redes sociales, presentaciones o materiales promocionales— se reflejan en las decisiones del día a día con proveedores, colaboradores y huéspedes?", "¿Cuáles de tus prácticas cotidianas personales y organizacionales reflejan tu identidad, valores y propósito?"],
  },
  "conexion-naturaleza": {
    id: "conexion-naturaleza", numero: 3, elemento: "fuego", nombre: "Conexión con la naturaleza",
    direccion: "Reconocer a la naturaleza y sus formas de vida como un sujeto con el cual relacionarnos y del cual sentirnos parte.",
    rPrincipal: "r3", codigoR: "3.1", rSecundaria: null,
    preguntas: ["¿De qué manera el diseño de tu servicio, espacio y experiencia refleja la historia, los ciclos y el carácter único del lugar donde operas?", "¿Qué actividades o momentos concretos del servicio conectan a tus colaboradores y huéspedes con la naturaleza, la cultura y los ritmos del destino?"],
  },
  "percepcion-sistemica": {
    id: "percepcion-sistemica", numero: 4, elemento: "fuego", nombre: "Percepción sistémica y autoconsciencia",
    direccion: "Trascender el paradigma mecanicista y fragmentado de la realidad, ampliando la percepción para desarrollar una mayor autoconsciencia organizacional.",
    rPrincipal: "r1", codigoR: "1.3", rSecundaria: null,
    preguntas: ["¿Con qué frecuencia tu equipo se detiene a evaluar el impacto real de la operación —ambiental, social y cultural— y qué herramientas utiliza para hacerlo?", "¿Qué haces para cuidar el bienestar físico, emocional y profesional de tus colaboradores? ¿Lo mides de alguna forma?"],
  },
  "colaboracion-cocreacion": {
    id: "colaboracion-cocreacion", numero: 5, elemento: "aire", nombre: "Colaboración y co-creación",
    direccion: "Co-diseñar con la comunidad y con el lugar los servicios y entendimientos de la Organización Viva, promoviendo la co-creación de experiencias y la colaboración ecosocial.",
    rPrincipal: "r2", codigoR: "2.1", rSecundaria: null,
    preguntas: ["¿Cómo involucras activamente a productores locales, comunidades y otros actores del destino en el diseño y la operación de tus servicios?", "¿Cómo se viven los valores de tu empresa en la manera de trabajar internamente: en las reuniones, en la toma de decisiones y en la relación con el equipo?"],
  },
  "sentir-lugar": {
    id: "sentir-lugar", numero: 6, elemento: "aire", nombre: "Sentir del lugar",
    direccion: "Desarrollar la capacidad de sentir y diseñar para la co-evolución del potencial de la cultura y la naturaleza del lugar.",
    rPrincipal: "r2", codigoR: "2.2", rSecundaria: null,
    preguntas: ["¿Qué elementos auténticos del lugar —gastronomía, saberes, paisaje, historia o artesanía— integras en tu experiencia sin folklorizarlos ni comercializarlos superficialmente?", "¿Cómo preparas a tus guías y colaboradores para transmitir el sentido profundo del lugar, más allá de los datos o de la información turística estándar?"],
  },
  ritmo: {
    id: "ritmo", numero: 7, elemento: "aire", nombre: "Ritmo",
    direccion: "Ralentizar y dar un nuevo ritmo de expansión y contracción a las actividades del viajero y de la organización, para generar una conexión profunda.",
    rPrincipal: "r4", codigoR: "4.1 y 4.2", rSecundaria: null,
    preguntas: ["¿Tu itinerario o servicio tiene momentos explícitos de pausa, contemplación o conexión profunda con el entorno, o está diseñado principalmente para maximizar actividades?", "¿Cómo conectan tu empresa y los viajeros con los ritmos naturales y culturales del lugar o destino, especialmente en relación con sus calendarios bioculturales?"],
  },
  "experiencias-profundas": {
    id: "experiencias-profundas", numero: 8, elemento: "aire", nombre: "Experiencias profundas o trascendentes",
    direccion: "Posibilitar vivencias y momentos de conexión de los viajeros consigo mismos, con otras personas y con la naturaleza, ayudándolos a trascender paradigmas degenerativos.",
    rPrincipal: "r1", codigoR: "1.4", rSecundaria: null,
    preguntas: ["¿En qué momento específico de tu servicio el viajero tiene la oportunidad de reflexionar, conectarse profundamente o vivir algo que lo transforma?", "¿Cómo sabes que tus experiencias están generando un impacto real en la conciencia o en los hábitos del viajero? ¿Qué evidencias tienes de ello?"],
  },
  "flow-movimiento-redes": {
    id: "flow-movimiento-redes", numero: 9, elemento: "agua", nombre: "Flow, movimiento y redes",
    direccion: "Hacer sentir al viajero el flow regenerativo a partir de la cadena de valor de los destinos y del territorio que visita.",
    rPrincipal: "r4", codigoR: "4.3", rSecundaria: "r2",
    preguntas: ["¿La experiencia de tu cliente es fluida y coherente de principio a fin —reserva, llegada, estadía, salida y postventa—? ¿En qué puntos existen fricciones?", "¿Qué opciones de transporte o movilidad sostenible —como transporte compartido, bicicleta, senderismo o transporte local— integras o recomiendas activamente en tu oferta?"],
  },
  "abundancia-nutricion": {
    id: "abundancia-nutricion", numero: 10, elemento: "agua", nombre: "Abundancia, nutrición y reproducción",
    direccion: "Expandir los beneficios de los proyectos hacia poblaciones desfavorecidas o marginadas, contribuyendo a territorios saludables, prósperos y equilibrados.",
    rPrincipal: "r5", codigoR: "5.1", rSecundaria: "r2",
    preguntas: ["¿Qué porcentaje de tus compras —alimentos, artesanías y servicios— proviene de productores o proveedores locales? ¿Tienes una meta en ese sentido?", "¿Tu operación genera o apoya emprendimientos regenerativos en el entorno? ¿Cómo planificas la continuidad de ese impacto más allá de tu propio negocio?"],
  },
  "energia-huella": {
    id: "energia-huella", numero: 11, elemento: "agua", nombre: "Energía y huella",
    direccion: "Inspirar a la Organización Viva a comprender y transformar la relación entre las personas, la energía, el consumo y el territorio.",
    rPrincipal: "r5", codigoR: "5.3", rSecundaria: null,
    preguntas: ["¿Qué soluciones innovadoras están emergiendo en tu comunidad en relación con el uso regenerativo de la energía? ¿Cómo pueden las huellas de carbono, agua y ecológica de la Organización Viva convertirse en oportunidades para la regeneración del destino?"],
  },
  "metabolismo-crecimiento": {
    id: "metabolismo-crecimiento", numero: 12, elemento: "agua", nombre: "Metabolismo, crecimiento y desarrollo",
    direccion: "Buscar el equilibrio mediante la comprensión de los procesos vitales de entrada y salida que permiten a la organización crecer y desarrollarse de forma saludable y vigorosa.",
    rPrincipal: "r5", codigoR: "5.2", rSecundaria: null,
    preguntas: ["¿Conoces el metabolismo de tu Organización Viva, es decir, sus flujos de entrada y salida de alimentos, energía, residuos, agua y otros recursos? ¿Cómo podrían volverse más circulares y generar un impacto positivo?", "¿Qué te indica que tu empresa está creciendo de forma equilibrada, saludable y vigorosa? ¿Cómo te darías cuenta de que ha sobrepasado su límite de crecimiento?"],
  },
  "aguas-vivas": {
    id: "aguas-vivas", numero: 13, elemento: "tierra", nombre: "Aguas vivas",
    direccion: "Generar consciencia sobre el uso, manejo y continuidad de las fuentes hídricas que rodean al destino turístico y delimitan el territorio.",
    rPrincipal: "r3", codigoR: "3.2", rSecundaria: null,
    preguntas: ["¿Cómo honras el agua y concientizas a tu Organización Viva sobre su importancia como elemento que sostiene y genera vida?", "¿Cómo se beneficia el ciclo del agua de tu cuenca con la existencia de tu Organización Viva?"],
  },
  "suelos-sanos": {
    id: "suelos-sanos", numero: 14, elemento: "tierra", nombre: "Suelos sanos y carbono",
    direccion: "Generar capacidades que permitan comprender y fortalecer el equilibrio del suelo mediante las relaciones simbióticas entre animales, plantas, hongos y minerales.",
    rPrincipal: "r3", codigoR: "3.3", rSecundaria: null,
    preguntas: ["¿Qué porcentaje de los alimentos que ofreces proviene de producción local, agroecológica o regenerativa? ¿Tienes proveedores identificados con estos criterios?", "¿Tu empresa gestiona los residuos orgánicos mediante compostaje u otras prácticas que devuelvan nutrientes al suelo? ¿Cómo integras esto en la experiencia del huésped?"],
  },
  "infraestructura-estetica": {
    id: "infraestructura-estetica", numero: 15, elemento: "tierra", nombre: "Infraestructura y estética",
    direccion: "Diseñar senderos, construcciones e infraestructuras que se integren con el lugar y permitan realzar su potencial natural y cultural.",
    rPrincipal: "r3", codigoR: "3.5", rSecundaria: null,
    preguntas: ["¿Los espacios físicos de tu empresa —alojamiento, senderos y áreas comunes— integran materiales, formas o patrones propios del paisaje y de la cultura local?", "¿La estética general de tu operación invita al huésped a sentirse parte del lugar y a apreciarlo, o podría encontrarse en cualquier otro destino del mundo?"],
  },
  "bienestar-ecologico": {
    id: "bienestar-ecologico", numero: 16, elemento: "tierra", nombre: "Bienestar ecológico",
    direccion: "Conservar y vitalizar los servicios ecosistémicos que sostienen la vida del territorio.",
    rPrincipal: "r3", codigoR: "3.4", rSecundaria: null,
    preguntas: ["¿Qué acciones concretas y verificables lleva a cabo tu empresa para conservar, restaurar o fortalecer los ecosistemas locales donde opera?", "¿Con qué otras empresas, organizaciones no gubernamentales o entidades del destino colaboras para proteger la salud ecológica del territorio a largo plazo?"],
  },
};

// EVALUACIONES: una por principio, 16 en total, ordenadas 1..16
export const EVALUACIONES: Principio[] = Object.values(PRINCIPIOS);

export const TIPOS_ORGANIZACION = [
  "Alojamiento", "Ecolodge", "Operador turístico", "Agencia de viajes", "Guía o empresa de guiado",
  "Organización comunitaria", "Fundación u ONG", "Destino turístico", "Organismo público", "Otro",
];

export const MODALIDADES = ["Diagnóstico individual", "Diagnóstico de equipo", "Taller colectivo"];

export const R_COLOR_HEX: Record<RId, string> = {
  r1: "#a8824a", r2: "#5c7488", r3: "#6b7d4a", r4: "#5f8a7e", r5: "#a3654b",
};

export const ELEMENTO_COLOR_HEX: Record<ElementoId, string> = {
  fuego: "#a3654b", aire: "#5c7488", agua: "#5f8a7e", tierra: "#6b7d4a",
};
