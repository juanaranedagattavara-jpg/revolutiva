// Generates supabase/seed.sql from the legacy DATA[] array (originally hardcoded
// in revolutiva-travel.html). Run with `node scripts/seed-data.mjs`, then apply
// the resulting SQL through the Supabase MCP / CLI.
import { writeFileSync } from "node:fs";

// Local images are optimized to WebP by scripts/optimize-images.mjs — swap
// the extension so generated paths match what's actually on disk.
const img = (id, w = 1600) =>
  id.includes("/")
    ? "/" + id.replace(/^\.\//, "").replace(/\.(jpe?g|avif|png|JPG)$/i, ".webp")
    : `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

const DATA = [
  {
    id: "e1", cat: "experiencia", nombre: "Once · Viaje de mujeres por Oaxaca",
    pais: "México", territorio: "Oaxaca y costa oaxaqueña", anfitrion: "Once Journeys",
    desc: "Un círculo de viajeras que recorre la costa y los valles de Oaxaca tejiendo, cocinando y compartiendo con mujeres artesanas y emprendedoras.",
    historia: "Once nació de siete fundadoras que querían viajar distinto: en comunidad, con conciencia y honrando la sabiduría de las mujeres que reciben.",
    vocacion: "Diseñar viajes auténticos, responsables y transformadores que sostienen cooperativas lideradas por mujeres.",
    tipos: ["Cultura viva","Pueblos originarios","Aprendizaje y formación","Gastronomía local","Bienestar y reconexión"],
    rel: "comunidad", duracion: "6 días / 5 noches", esfuerzo: "Bajo", grupo: "8–12 mujeres",
    precio: 1450, modalidadPrecio: "Por persona · viaje de 6 días (ref. USD)",
    idiomas: ["Español","Inglés"], capacidad: "Hasta 12",
    temporadas: ["Otoño","Día de Muertos (nov)","Primavera"],
    calendario: "El Día de Muertos (nov) es el corazón del calendario; se respetan los tiempos rituales de cada comunidad.",
    viajero: "Mujeres viajeras, buscadoras de comunidad y aprendizaje", nivel: 3,
    R: { R1: "enraizado", R2: "enraizado", R3: "desarrollo", R4: "desarrollo", R5: "enraizado" },
    vivira: "Talleres de telar de cintura, cocina con maestras, baños de temazcal y conversación entre mujeres.",
    aprendera: "Técnicas textiles ancestrales y el rol de las mujeres en la economía y cultura oaxaqueña.",
    r_conmigo: "Círculos de mujeres, ritual, pausa y pertenencia.",
    r_comunidad: "Ingresos directos a cooperativas lideradas por mujeres y artesanas.",
    r_naturaleza: "Tintes naturales y compra de fibras locales de bajo impacto.",
    ritmo: "El de los telares y las cocinas de humo.",
    saberAntes: "Viaje solo para mujeres; se comparte alojamiento comunitario.",
    reciprocidad: "Parte del valor sostiene fondos de las cooperativas anfitrionas.",
    evidencias: ["Siete fundadoras y red de cooperativas de mujeres","Reparto directo de ingresos a artesanas","Estancias en comunidades, no en cadenas hoteleras"],
    rDestacados: ["R2","R1","R5"], foto: "./Once head.jpg",
    galeria: ["./Viaje Muertos ONCE (alta)-75.jpg","./2873EA0B-45F1-4B2C-B9C1-CE2D0A894B7F.JPG","./foto Alma Studio.jpg"]
  },
  {
    id: "e2", cat: "experiencia", nombre: "La Tierra de los Yachaqs · Valle Sagrado",
    pais: "Perú", territorio: "Valle Sagrado, Cusco", anfitrion: "Asociación La Tierra de los Yachaqs",
    desc: "Ocho comunidades quechua abren sus casas para compartir telar, agricultura andina y la vida cotidiana a más de 3.000 metros.",
    historia: "'Yachaq' significa el que sabe, el que enseña. La asociación autogestionada reúne a ocho comunidades del Valle Sagrado que decidieron mostrar su mundo sin intermediarios.",
    vocacion: "Turismo rural comunitario que preserva tradiciones andinas y reparte ingresos con justicia.",
    tipos: ["Turismo comunitario","Cultura viva","Pueblos originarios","Agroecología","Aprendizaje y formación"],
    rel: "comunidad", duracion: "1 a 3 días", esfuerzo: "Medio", grupo: "2–10 personas",
    precio: 75, modalidadPrecio: "Por persona · día de inmersión (ref. USD)",
    idiomas: ["Español","Quechua","Inglés básico"], capacidad: "Hasta 10 por comunidad",
    temporadas: ["Otoño","Invierno seco","Primavera"],
    calendario: "Sigue el ciclo agrícola andino: siembra, aporque y cosecha marcan qué se vive cada mes.",
    viajero: "Viajeros culturales, familias, estudiantes", nivel: 3,
    R: { R1: "desarrollo", R2: "enraizado", R3: "desarrollo", R4: "enraizado", R5: "desarrollo" },
    vivira: "Teñido y telar, trabajo en chacra, caminatas a sitios ancestrales y comidas en casa de familias.",
    aprendera: "Cosmovisión andina, agrobiodiversidad de papas y maíces, y técnicas textiles.",
    r_conmigo: "Ritmo de altura, hospitalidad sencilla, presencia.",
    r_comunidad: "Autogestión de ocho comunidades y reparto directo de ingresos.",
    r_naturaleza: "Agricultura andina sin agroquímicos y conservación de semillas nativas.",
    ritmo: "El del ciclo agrícola y la altura.",
    saberAntes: "Aclimatación a la altura; lleva abrigo y efectivo en soles.",
    reciprocidad: "El ingreso sostiene proyectos comunitarios definidos por cada pueblo.",
    evidencias: ["Asociación autogestionada de 8 comunidades","Reparto comunitario de ingresos","Conservación de variedades nativas de papa y maíz"],
    rDestacados: ["R2","R4"], foto: "Yachaqs/portada.jpeg",
    galeria: ["Yachaqs/foto tejedoras.jpeg","Yachaqs/hombres Yachaqs.jpeg","Yachaqs/yachaqs foto.jpeg"]
  },
  {
    id: "e3", cat: "experiencia", nombre: "Llama Trek Olleros–Chavín · Camino al templo",
    pais: "Perú", territorio: "Olleros, Áncash · Cordillera Blanca", anfitrion: "Comunidad de Olleros · Andean Raju",
    desc: "Una peregrinación de tres días por una ruta preinca, con llamas como compañeras de camino, hasta el templo sagrado de Chavín de Huántar.",
    historia: "El camino de Olleros a Chavín unió por siglos las regiones de Huaylas y Conchucos. Era una ruta de peregrinación hacia uno de los centros ceremoniales más antiguos de los Andes.",
    vocacion: "Mantener viva una ruta ancestral con caravanas de llamas y guías de la propia comunidad.",
    tipos: ["Peregrinaciones y caminos","Rutas sagradas y bioculturales","Caminatas y senderismo","Pueblos originarios","Patrimonio"],
    rel: "integral", duracion: "3 días / 2 noches", esfuerzo: "Alto", grupo: "4–10 personas",
    precio: 320, modalidadPrecio: "Por persona · 3 días, todo incluido (ref. USD)",
    idiomas: ["Español","Quechua","Inglés"], capacidad: "Hasta 10",
    temporadas: ["Otoño","Invierno seco (may–sep)"],
    calendario: "La temporada seca (mayo–septiembre) es la ventana segura; en lluvias el paso se cierra para descanso del camino.",
    viajero: "Caminantes, peregrinos, amantes de la montaña y la historia", nivel: 2,
    R: { R1: "enraizado", R2: "enraizado", R3: "desarrollo", R4: "enraizado", R5: "desarrollo" },
    vivira: "Caminarás junto a arrieros y llamas por pasos de altura, acamparás bajo nevados y llegarás al templo de Chavín.",
    aprendera: "La cultura Chavín, el arte del arrieraje y la lectura de la cordillera.",
    r_conmigo: "El caminar como práctica de presencia y umbral; silencio de altura.",
    r_comunidad: "Guías, arrieros y servicios de la comunidad de Olleros.",
    r_naturaleza: "Tránsito de bajo impacto con llamas, sin acémilas que erosionan el suelo.",
    ritmo: "El paso lento de las llamas y la respiración de la altura.",
    saberAntes: "Exige buena condición física y aclimatación; cruza pasos sobre 4.700 m.",
    reciprocidad: "El arrieraje da ingreso directo a familias y mantiene viva la ruta.",
    evidencias: ["Operado por la comunidad de Olleros","Caravanas de llamas en lugar de mulas","Ruta preinca documentada hacia Chavín de Huántar"],
    rDestacados: ["R1","R4","R2"], foto: "./LLama 1.jpg",
    galeria: ["./Llama 2.jpg","./REDNATI-224 (2).jpg","./REDNATI-225 (2).jpg"]
  },
  {
    id: "e4", cat: "experiencia", nombre: "Malinali · Viaje biocultural por México",
    pais: "México", territorio: "Territorios bioculturales de México", anfitrion: "Malinali Travel · Murielle Coppin",
    desc: "Un viaje regenerativo que camina con respeto entre milpas, selvas y comunidades, regenerando el patrimonio biocultural de México.",
    historia: "Malinali nace del diálogo entre seres humanos, naturaleza y cultura, para honrar las culturas vivas y caminar con conciencia.",
    vocacion: "Regenerar el patrimonio biocultural a través del viaje y la educación.",
    tipos: ["Peregrinaciones y caminos","Rutas sagradas y bioculturales","Cultura viva","Pueblos originarios","Aprendizaje y formación"],
    rel: "integral", duracion: "7 días / 6 noches", esfuerzo: "Medio", grupo: "6–12 personas",
    precio: 1980, modalidadPrecio: "Por persona · viaje biocultural (ref. USD)",
    idiomas: ["Español","Francés","Inglés"], capacidad: "Hasta 12",
    temporadas: ["Otoño","Invierno","Primavera"],
    calendario: "Diseñado en torno a fiestas y ciclos agrícolas; cada ruta sigue el calendario ritual del territorio.",
    viajero: "Viajeros conscientes, buscadores de sentido, grupos de aprendizaje", nivel: 3,
    R: { R1: "enraizado", R2: "enraizado", R3: "desarrollo", R4: "enraizado", R5: "enraizado" },
    vivira: "Caminarás territorios sagrados, compartirás con guardianes de semillas y participarás en ceremonias de la mano de las comunidades.",
    aprendera: "El valor del patrimonio biocultural y la relación entre maíz, cultura y territorio.",
    r_conmigo: "El viaje como camino interior; reverencia y escucha.",
    r_comunidad: "Vínculos directos con comunidades y guardianes del patrimonio.",
    r_naturaleza: "Defensa de la agrobiodiversidad y los territorios bioculturales.",
    ritmo: "El de las fiestas y los ciclos del maíz.",
    saberAntes: "Se viaja con protocolos de respeto a sitios y ceremonias.",
    reciprocidad: "Aporte directo a proyectos de regeneración biocultural.",
    evidencias: ["Acompañamiento de comunidades anfitrionas","Enfoque biocultural y educativo","Protocolos de respeto a sitios ceremoniales"],
    rDestacados: ["R1","R2","R5"], foto: "./home-scaled.jpg",
    galeria: ["./Malinali-Viajes-oaxaca-mexico-5.jpg","./Malinali-Viajes-CHIAPAS-mexico-5-1.jpg","./Dia-de-almas-Chiapas-Foto-Cuadrado.jpg"]
  },
  {
    id: "h1", cat: "hospedaje", nombre: "Estancia Cerro Guido",
    pais: "Chile", territorio: "Torres del Paine, Magallanes", region: "Patagonia",
    anfitrion: "Estancia Cerro Guido · Conservación", tipoAloj: "Estancia patrimonial / reserva privada",
    desc: "Una estancia ovina histórica frente a las Torres del Paine que cambió el rifle por la cámara y hoy protege a los pumas que antes perseguía.",
    historia: "Por generaciones la estancia vivió en conflicto con el puma. Hoy lidera un programa de coexistencia entre ganadería y vida silvestre en la estepa patagónica.",
    vocacion: "Demostrar que la ganadería y la conservación del puma pueden convivir.",
    filosofia: "Habitar la estepa cuidando su fauna, su gente y su paisaje inmenso.",
    tipos: ["Naturaleza y conservación","Observación de fauna","Experiencias rurales","Patrimonio"],
    rel: "naturaleza", habitaciones: "Casco patrimonial · habitaciones para ~20 huéspedes",
    alimentacion: "Cordero de la estancia y huerta propia", proveedores: "Producción propia y pequeños productores de Magallanes",
    agua: "Manejo de cuenca y vertientes", energia: "Híbrida con eficiencia energética", residuos: "Compostaje y gestión integral",
    comunidad: "Empleo estable de gauchos y guardafaunas locales", conservacion: "Programa de coexistencia y monitoreo de pumas; restauración de pastizales",
    precio: 320, modalidadPrecio: "Por noche · base doble (ref. USD)", idiomas: ["Español","Inglés"],
    temporadas: ["Primavera","Verano","Otoño"], calendario: "Avistaje de pumas todo el año; máximo respeto a la temporada de cría.",
    viajero: "Amantes de la fauna, fotógrafos, parejas", nivel: 3, ritmo: "El de la estepa: vientos, luz larga y silencio.",
    experienciasAsoc: ["Tracking de pumas","Avistaje de aves","Vida de estancia"],
    R: { R1: "desarrollo", R2: "desarrollo", R3: "enraizado", R4: "enraizado", R5: "desarrollo" },
    evidencias: ["Programa de coexistencia puma-ganadería","Guardafaunas locales formados","Monitoreo científico de pumas"],
    rDestacados: ["R3","R4"], foto: "./pumas portada.avif",
    galeria: ["./aguila.avif","./caballo.avif","./persona.avif"]
  },
  {
    id: "h2", cat: "hospedaje", nombre: "Selva Bananito Lodge",
    pais: "Costa Rica", territorio: "Talamanca · vertiente Caribe", region: "Caribe",
    anfitrion: "Familia Stein · Reserva Selva Bananito", tipoAloj: "Eco-lodge en reserva privada",
    desc: "Once cabinas de madera fuera de la red eléctrica, dentro de una reserva privada que protege selva primaria y el agua de toda una región.",
    historia: "Operando desde 1995 como zona de amortiguamiento del Parque Internacional La Amistad, la familia decidió conservar el bosque en vez de talarlo.",
    vocacion: "Proteger selva primaria y el agua de unas 100.000 personas como modelo pionero de ecoturismo.",
    filosofia: "Lujo rústico que vive al ritmo del bosque tropical.",
    tipos: ["Naturaleza y conservación","Aventura suave","Observación de fauna","Voluntariado consciente"],
    rel: "naturaleza", habitaciones: "11 habitaciones (7 cabinas + 4 superiores)",
    alimentacion: "Cocina costarricense con productos locales", proveedores: "Productores de la zona de Talamanca",
    agua: "Protección de las fuentes de agua de la cuenca", energia: "Solar; cabinas sin conexión a la red",
    residuos: "Manejo responsable y de bajo impacto", comunidad: "Apoyo a la Escuela San Cecilio y a conservación local",
    conservacion: "Reserva privada de selva primaria y reforestación", precio: 180, modalidadPrecio: "Por noche · base doble (ref. USD)",
    idiomas: ["Español","Inglés","Alemán"], temporadas: ["Estación seca","Estación verde"],
    calendario: "La estación verde trae lluvias y vida; ciertas zonas de la reserva descansan según la fauna.",
    viajero: "Amantes de la selva, familias, aventureros suaves", nivel: 3, ritmo: "El del bosque tropical y sus lluvias.",
    experienciasAsoc: ["Canopy y rappel","Caminatas de selva primaria","Reforestación"],
    R: { R1: "desarrollo", R2: "desarrollo", R3: "enraizado", R4: "enraizado", R5: "desarrollo" },
    evidencias: ["Reserva de selva primaria desde 1995","Protege agua de ~100.000 habitantes","Apoyo continuo a la Escuela San Cecilio"],
    rDestacados: ["R3","R5"], foto: "Selva Bananito/costa-rica_selva-bananito-lodge_02_superior-cabana-e1568055960500.jpg",
    galeria: ["Selva Bananito/Rio Selva Bananito.jpeg","Selva Bananito/Heli_5.jpg","Selva Bananito/images.jpg"]
  },
  {
    id: "h3", cat: "hospedaje", nombre: "La Baita Conguillío",
    pais: "Chile", territorio: "Melipeuco · Parque Nacional Conguillío", region: "Araucanía",
    anfitrion: "La Baita Conguillío", tipoAloj: "Lodge y cabañas ecológicas",
    desc: "Un refugio de 33 hectáreas junto al Parque Conguillío, entre araucarias milenarias, lagos y el volcán Llaima, con bungalows solares.",
    historia: "La Baita nació para habitar con respeto la Araucanía andina y mostrar la magia de sus cuatro estaciones.",
    vocacion: "Ecoturismo y conservación en el corazón de la Araucanía andina.",
    filosofia: "Hospitalidad cálida al ritmo del bosque de araucarias.",
    tipos: ["Naturaleza y conservación","Caminatas y senderismo","Experiencias rurales","Aventura suave"],
    rel: "integral", habitaciones: "Habitaciones y cabañas para grupos de 3 a 8",
    alimentacion: "Restaurante con cocina local; viandas para excursiones", proveedores: "Productores de Melipeuco y la Araucanía",
    agua: "Manejo cuidado en predio de 33 ha", energia: "Bungalows ecológicos solo con energía solar",
    residuos: "Gestión de bajo impacto", comunidad: "Empleo local y guías certificados de la zona",
    conservacion: "Predio privado de bosque nativo junto al parque", precio: 95000, modalidadPrecio: "Por noche · base doble",
    idiomas: ["Español","Inglés","Italiano"], temporadas: ["Primavera","Verano","Otoño","Invierno (nieve)"],
    calendario: "Las cuatro estaciones cambian el paisaje; ascensos de alta montaña solo en ventana segura.",
    viajero: "Senderistas, familias, amantes de la araucaria", nivel: 2, ritmo: "El de las cuatro estaciones de Conguillío.",
    experienciasAsoc: ["Ascenso al Llaima","Sierra Nevada","Kayak en los lagos"],
    R: { R1: "desarrollo", R2: "desarrollo", R3: "enraizado", R4: "enraizado", R5: "inicial" },
    evidencias: ["33 ha de bosque nativo junto al parque","Bungalows 100% solares","Guías certificados de alta montaña"],
    rDestacados: ["R3","R4"], foto: "./070A8085-2-Edit-Edit.jpg",
    galeria: ["./trekking_conguillio.jpg","./HABITACION.jpg","./IMG_4203.jpg"]
  },
  {
    id: "h4", cat: "hospedaje", nombre: "Lodge Kodkod",
    pais: "Chile", territorio: "Pucón · camino a Huife, Araucanía", region: "Araucanía",
    anfitrion: "Lodge Kodkod", tipoAloj: "Eco-lodge y centro de estudios",
    desc: "Un observatorio vivo del bosque andino que desde 2006 hospeda viajeros y científicos, con el nombre de la kodkod, el gato más pequeño de América.",
    historia: "Concebido como base de estudios del bosque templado, ha alojado más de treinta investigaciones científicas sobre su fauna.",
    vocacion: "Aprender y cuidar el bosque andino como un observatorio vivo.",
    filosofia: "Vida sencilla, comida sana y trato cercano al ritmo del bosque.",
    tipos: ["Naturaleza y conservación","Aprendizaje y formación","Observación de fauna","Retiros"],
    rel: "naturaleza", habitaciones: "Lodge con aula equipada para cursos y retiros",
    alimentacion: "Comida sana de inspiración local", proveedores: "Pequeños productores de la zona de Pucón",
    agua: "Manejo cuidado en el bosque templado", energia: "Vida sostenible de bajo impacto",
    residuos: "Gestión responsable", comunidad: "Vínculo con universidades y estudiantes",
    conservacion: "Base de más de 30 estudios científicos del bosque andino", precio: 110000, modalidadPrecio: "Por noche · base doble",
    idiomas: ["Español","Inglés"], temporadas: ["Primavera","Verano","Otoño"],
    calendario: "Cursos y retiros siguen el ciclo del bosque; observación de fauna según temporada.",
    viajero: "Estudiantes, naturalistas, grupos de retiro", nivel: 2, ritmo: "El del bosque templado y sus criaturas.",
    experienciasAsoc: ["Cursos de naturaleza","Cabalgatas","Caminatas a santuarios"],
    R: { R1: "desarrollo", R2: "inicial", R3: "enraizado", R4: "desarrollo", R5: "desarrollo" },
    evidencias: ["Más de 30 estudios científicos alojados desde 2006","Aula-laboratorio del bosque","Observatorio vivo de fauna nativa"],
    rDestacados: ["R3","R1"], foto: "KodKod/f0dd73_c5af17dede79498ca603ee795b9d2e57~mv2.avif",
    galeria: ["KodKod/f0dd73_64d026519c7742ceb89bc2c49021ad27~mv2.avif","KodKod/IMG_5080.avif","KodKod/IMG_9068.avif"]
  },
  {
    id: "h5", cat: "hospedaje", nombre: "Amalurra · Ecohotel y centro de retiro",
    pais: "España", territorio: "Artzentales, Bizkaia · País Vasco", region: "País Vasco",
    anfitrion: "Comunidad Amalurra", tipoAloj: "Ecohotel y centro de retiro",
    desc: "Diez hectáreas de huertas, jardines y bosque en el País Vasco, donde una comunidad recibe desde el principio 'soy nosotros'.",
    historia: "Amalurra significa 'Madre Tierra' en euskera. El lugar nació para reconectar al ser humano con su naturaleza interior y la del entorno.",
    vocacion: "Sanación y crecimiento personal desde la conciencia de unidad.",
    filosofia: "Hospitalidad consciente: pertenecer a algo más grande, 'soy nosotros'.",
    tipos: ["Bienestar y reconexión","Retiros","Aprendizaje y formación","Agroecología"],
    rel: "conmigo", habitaciones: "Habitaciones diseñadas para el descanso",
    alimentacion: "Cocina consciente y vegetal de la propia tierra", proveedores: "Huertas y jardines propios; productores locales",
    agua: "Gestión cuidada en 10 ha", energia: "Diseño ecológico del resort", residuos: "Manejo responsable",
    comunidad: "Comunidad residente de hospitalidad consciente", conservacion: "Huertas, jardines y bosque regenerados",
    precio: 140, modalidadPrecio: "Por noche · base doble (ref. EUR)", idiomas: ["Español","Euskera","Inglés"],
    temporadas: ["Primavera","Verano","Otoño","Invierno"], calendario: "Los retiros siguen el ritmo de la tierra y las estaciones del valle.",
    viajero: "Buscadores de pausa, grupos de retiro, empresas conscientes", nivel: 2, ritmo: "El de la tierra y la vida en comunidad.",
    experienciasAsoc: ["Retiros y talleres","Centro hidrotermal","Huerta y jardines"],
    R: { R1: "enraizado", R2: "desarrollo", R3: "desarrollo", R4: "desarrollo", R5: "desarrollo" },
    evidencias: ["10 ha de huertas, jardines y bosque","Cocina consciente y vegetal propia","Comunidad de hospitalidad consciente"],
    rDestacados: ["R1","R2"], foto: "./compartir-hero-amalurra.jpg",
    galeria: ["./DSC04014-2048x1365.jpg","./DSC04131-min-1024x683.jpg","./DSC05544-min-1024x683.jpg"]
  },
  {
    id: "g1", cat: "guiado", nombre: "Arrieros y guías comunitarios de Olleros",
    pais: "Perú", territorio: "Olleros, Áncash · Cordillera Blanca", region: "Áncash",
    especialidad: "Arrieraje de llamas y guiado de alta montaña",
    desc: "El colectivo de arrieros y guías de Olleros que mantiene viva la ruta de peregrinación a Chavín, caminando con caravanas de llamas.",
    historiaPersonal: "Familias arrieras que heredaron el oficio de cruzar la cordillera con llamas por los pasos que llevan a Chavín.",
    relTerritorio: "Viven en Olleros y conocen cada quebrada del camino a Conchucos.",
    tiposGuiado: ["Guías comunitarios","Caminatas y senderismo","Recorridos patrimoniales","Interpretación de naturaleza"],
    rel: "comunidad", idiomas: ["Español","Quechua","Inglés básico"],
    saberes: "Arrieraje, cultura Chavín, lectura de la cordillera y manejo de llamas.",
    cuidaRitmo: "Caminan al paso de las llamas y del integrante más lento, con pausas de aclimatación.",
    interpreta: "Une la geología de la Cordillera Blanca con la historia de la ruta sagrada.",
    seguridad: "Conocimiento del mal de altura y rutas de evacuación.",
    acuerdos: "Operan bajo gestión comunitaria y reparten el trabajo entre familias.",
    limites: "Cierran la ruta en temporada de lluvias para descanso del camino.",
    tarifa: 90, modalidadPrecio: "Por jornada · grupo (ref. USD)", temporadas: ["Invierno seco (may–sep)"],
    calendario: "Solo guían en temporada seca; respetan el descanso del camino en lluvias.",
    viajero: "Caminantes, peregrinos, grupos de montaña", nivel: 2,
    R: { R1: "desarrollo", R2: "enraizado", R3: "desarrollo", R4: "enraizado", R5: "desarrollo" },
    evidencias: ["Gestión comunitaria del arrieraje","Caravanas de llamas de bajo impacto","Trabajo repartido entre familias de Olleros"],
    rDestacados: ["R2","R4"], foto: "1454496522488-7a8e488e8606",
    galeria: ["1551632811-561732d1e306","1426604966848-d7adac402bff","1483728642387-6c3bdd6c93e5"]
  },
  {
    id: "g2", cat: "guiado", nombre: "Tejedoras-guía de Patabamba · Red Yachaqs",
    pais: "Perú", territorio: "Patabamba, Calca · Valle Sagrado", region: "Cusco",
    especialidad: "Anfitrionas textiles e intérpretes culturales",
    desc: "Mujeres tejedoras de Patabamba, parte de la red Yachaqs, que reciben y guían compartiendo el telar y la vida de la comunidad a 3.700 m.",
    historiaPersonal: "Heredaron de sus madres el telar de cintura y los secretos del teñido natural de los Andes.",
    relTerritorio: "Viven en Patabamba y sostienen la organización comunitaria del turismo rural.",
    tiposGuiado: ["Anfitrionas locales","Facilitadoras de experiencias","Interpretación biocultural"],
    rel: "comunidad", idiomas: ["Español","Quechua"],
    saberes: "Telar de cintura, tintes naturales, agricultura de altura y cosmovisión andina.",
    cuidaRitmo: "Reciben sin apuro, con tiempo de mate y conversación.",
    interpreta: "Conectan los diseños del textil con la geografía y los ciclos del valle.",
    seguridad: "Acompañan la aclimatación y las caminatas suaves del entorno.",
    acuerdos: "Trabajan dentro de la asociación Yachaqs y reparten ingresos.",
    limites: "Cupos pequeños para cuidar la intimidad de la comunidad.",
    tarifa: 60, modalidadPrecio: "Por jornada · grupo (ref. USD)", temporadas: ["Otoño","Invierno seco","Primavera"],
    calendario: "El telar y la chacra marcan el ritmo; la cosecha es época viva.",
    viajero: "Viajeros culturales, familias, grupos de aprendizaje", nivel: 3,
    R: { R1: "desarrollo", R2: "enraizado", R3: "desarrollo", R4: "enraizado", R5: "enraizado" },
    evidencias: ["Parte de la asociación Yachaqs","Tintes naturales y telar ancestral","Ingresos compartidos en la comunidad"],
    rDestacados: ["R2","R5"], foto: "1466637574441-749b8f19452f",
    galeria: ["1454496522488-7a8e488e8606","1540420773420-3366772f4999","1469474968028-56623f02e42e"]
  },
];

const SLUGS = {
  e1: "once-viaje-mujeres-oaxaca",
  e2: "tierra-yachaqs-valle-sagrado",
  e3: "llama-trek-olleros-chavin",
  e4: "malinali-viaje-biocultural-mexico",
  h1: "estancia-cerro-guido",
  h2: "selva-bananito-lodge",
  h3: "la-baita-conguillio",
  h4: "lodge-kodkod",
  h5: "amalurra-ecohotel-centro-retiro",
  g1: "arrieros-guias-comunitarios-olleros",
  g2: "tejedoras-guia-patabamba-red-yachaqs",
};

function sqlStr(v) {
  if (v == null) return "NULL";
  return "'" + String(v).replace(/'/g, "''") + "'";
}
function sqlArr(arr) {
  if (!arr || !arr.length) return "'{}'";
  return "ARRAY[" + arr.map(sqlStr).join(",") + "]::text[]";
}
function sqlNum(n) {
  return n == null ? "NULL" : String(n);
}
function sqlJsonb(obj) {
  return "'" + JSON.stringify(obj).replace(/'/g, "''") + "'::jsonb";
}

function categoryData(it) {
  if (it.cat === "hospedaje") {
    return {
      tipoAloj: it.tipoAloj, habitaciones: it.habitaciones, alimentacion: it.alimentacion,
      proveedores: it.proveedores, agua: it.agua, energia: it.energia, residuos: it.residuos,
      comunidad: it.comunidad, conservacion: it.conservacion, filosofia: it.filosofia,
      experienciasAsoc: it.experienciasAsoc || [],
    };
  }
  if (it.cat === "guiado") {
    return {
      especialidad: it.especialidad, historiaPersonal: it.historiaPersonal, relTerritorio: it.relTerritorio,
      tiposGuiado: it.tiposGuiado || [], saberes: it.saberes, cuidaRitmo: it.cuidaRitmo,
      interpreta: it.interpreta, seguridad: it.seguridad, acuerdos: it.acuerdos, limites: it.limites,
      tarifa: it.tarifa,
    };
  }
  return {};
}

const rows = DATA.map((it, i) => {
  const tipos = it.tipos || it.tiposGuiado || [];
  const price = it.cat === "guiado" ? null : it.precio;
  return `(
    ${sqlStr(SLUGS[it.id])}, ${sqlStr(it.id)}, ${sqlStr(it.cat)}::listing_category, true,
    ${sqlStr(it.nombre)}, ${sqlStr(it.pais)}, ${sqlStr(it.territorio)}, ${sqlStr(it.region)}, ${sqlStr(it.anfitrion || it.nombre)},
    ${sqlStr(it.desc)}, ${sqlStr(it.historia)}, ${sqlStr(it.vocacion)},
    ${sqlArr(tipos)}, ${sqlStr(it.rel)}::relation_type, ${it.nivel},
    ${sqlStr(it.R.R1)}::r_state, ${sqlStr(it.R.R2)}::r_state, ${sqlStr(it.R.R3)}::r_state, ${sqlStr(it.R.R4)}::r_state, ${sqlStr(it.R.R5)}::r_state,
    ${sqlArr(it.rDestacados)},
    ${sqlStr(it.duracion)}, ${sqlStr(it.esfuerzo)}, ${sqlStr(it.grupo)}, ${sqlNum(price)}, ${sqlStr(it.modalidadPrecio)},
    ${sqlArr(it.idiomas)}, ${sqlStr(it.capacidad)}, ${sqlArr(it.temporadas)}, ${sqlStr(it.calendario)}, ${sqlStr(it.viajero)},
    ${sqlStr(it.vivira)}, ${sqlStr(it.aprendera)}, ${sqlStr(it.r_conmigo)}, ${sqlStr(it.r_comunidad)}, ${sqlStr(it.r_naturaleza)},
    ${sqlStr(it.ritmo)}, ${sqlStr(it.saberAntes)}, ${sqlStr(it.reciprocidad)},
    ${sqlArr(it.evidencias)}, ${sqlJsonb(categoryData(it))},
    ${sqlStr(img(it.foto))}, ${sqlArr(it.galeria.map((g) => img(g)))}, ${i}
  )`;
}).join(",\n");

const sql = `-- Seed data generated from legacy DATA[] (revolutiva-travel.html)
insert into public.listings (
  slug, legacy_id, category, published,
  nombre, pais, territorio, region, anfitrion,
  descripcion, historia, vocacion,
  tipos, relacion, nivel,
  r1, r2, r3, r4, r5,
  r_destacados,
  duracion, esfuerzo, grupo, precio, modalidad_precio,
  idiomas, capacidad, temporadas, calendario, viajero,
  vivira, aprendera, r_conmigo, r_comunidad, r_naturaleza,
  ritmo, saber_antes, reciprocidad,
  evidencias, category_data,
  foto, galeria, sort_order
) values
${rows}
on conflict (slug) do update set
  published = excluded.published,
  category_data = excluded.category_data,
  updated_at = now();

insert into public.tipos_experiencia (nombre) values
${["Naturaleza y conservación","Cultura viva","Bienestar y reconexión","Turismo comunitario","Agroecología","Gastronomía local","Caminatas y senderismo","Observación de fauna","Aventura suave","Retiros","Peregrinaciones y caminos","Rutas sagradas y bioculturales","Aprendizaje y formación","Patrimonio","Pueblos originarios","Experiencias rurales","Voluntariado consciente"].map((t) => `(${sqlStr(t)})`).join(",\n")}
on conflict (nombre) do nothing;
`;

writeFileSync(new URL("../supabase/seed.sql", import.meta.url), sql);
console.log("Wrote supabase/seed.sql —", DATA.length, "listings");
