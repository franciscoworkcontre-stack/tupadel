import { config } from "dotenv";
config({ path: ".env.local" });

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../src/db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const tiendasData = [
  { slug: "padelnuestro-cl", nombre: "Padelnuestro CL", dominio: "padelnuestro.cl", pais: "CL", confiabilidad: 5, tiempoEnvioDias: 3 },
  { slug: "decathlon-cl", nombre: "Decathlon CL", dominio: "decathlon.cl", pais: "CL", confiabilidad: 5, tiempoEnvioDias: 2 },
  { slug: "mercadolibre-cl", nombre: "MercadoLibre CL", dominio: "mercadolibre.cl", pais: "CL", confiabilidad: 3, tiempoEnvioDias: 5 },
  { slug: "time2padel", nombre: "Time2Padel", dominio: "time2padel.com", pais: "CL", confiabilidad: 4, tiempoEnvioDias: 15 },
  { slug: "padelpoint", nombre: "PadelPoint", dominio: "padelpoint.cl", pais: "CL", confiabilidad: 4, tiempoEnvioDias: 4 },
  { slug: "yapo-cl", nombre: "Yapo CL", dominio: "yapo.cl", pais: "CL", confiabilidad: 2, tiempoEnvioDias: null },
];

const palasData = [
  { slug: "bullpadel-vertex-04", nombre: "Bullpadel Vertex 04", marca: "Bullpadel", modelo: "Vertex 04", anio: 2025, forma: "diamante", nivelMin: 2, nivelMax: 3, pesoMin: 365, pesoMax: 375, balance: "cabeza", nucleo: "MultiEva soft", cara: "Carbono 12K", perfil: 38, perfilPotencia: 9, perfilControl: 6, perfilSalida: 7, scoreEditorial: 8.4, pros: ["Potencia brutal", "Salida de pared excelente", "Acabado premium"], contras: ["Poco perdón en centro", "No apto para iniciados"] },
  { slug: "nox-at10-genius", nombre: "Nox AT10 Genius", marca: "Nox", modelo: "AT10 Genius", anio: 2025, forma: "lagrima", nivelMin: 2, nivelMax: 4, pesoMin: 360, pesoMax: 375, balance: "medio-cabeza", nucleo: "HR3 Carbon", cara: "Carbono 18K", perfil: 38, perfilPotencia: 8, perfilControl: 8, perfilSalida: 8, scoreEditorial: 9.1, pros: ["Equilibrio perfecto", "Versátil para todos los estilos", "Sensaciones premium"], contras: ["Precio elevado"] },
  { slug: "adidas-metalbone-hrd", nombre: "Adidas Metalbone HRD+", marca: "Adidas", modelo: "Metalbone HRD+", anio: 2025, forma: "redonda", nivelMin: 3, nivelMax: 5, pesoMin: 360, pesoMax: 375, balance: "medio", nucleo: "EVA Soft", cara: "Carbono 12K", perfil: 36, perfilPotencia: 6, perfilControl: 9, perfilSalida: 8, scoreEditorial: 7.9, pros: ["Gran control", "Muy confortable", "Perdona errores"], contras: ["Falta potencia vs diamantes"] },
  { slug: "head-delta-pro-2026", nombre: "Head Delta Pro 2026", marca: "Head", modelo: "Delta Pro 2026", anio: 2025, forma: "diamante", nivelMin: 1, nivelMax: 2, pesoMin: 365, pesoMax: 375, balance: "cabeza", nucleo: "EVA Comfort", cara: "Carbono", perfil: 38, perfilPotencia: 9, perfilControl: 7, perfilSalida: 7, scoreEditorial: 8.7, pros: ["Potencia de competición", "Respuesta al ataque"], contras: ["Alta curva de aprendizaje"] },
  { slug: "bullpadel-hack-04", nombre: "Bullpadel Hack 04", marca: "Bullpadel", modelo: "Hack 04", anio: 2025, forma: "redonda", nivelMin: 4, nivelMax: 6, pesoMin: 355, pesoMax: 370, balance: "mango", nucleo: "MultiEva", cara: "Fibra de vidrio", perfil: 36, perfilPotencia: 6, perfilControl: 9, perfilSalida: 7, scoreEditorial: 8.1, pros: ["Perfecto para iniciarse", "Cómodo y perdonador", "Buena relación calidad-precio"], contras: ["Sin potencia para niveles avanzados"] },
  { slug: "babolat-air-veron", nombre: "Babolat Air Veron", marca: "Babolat", modelo: "Air Veron", anio: 2025, forma: "diamante", nivelMin: 2, nivelMax: 3, pesoMin: 355, pesoMax: 375, balance: "cabeza", nucleo: "HR3", cara: "Carbono", perfil: 38, perfilPotencia: 8, perfilControl: 7, perfilSalida: 8, scoreEditorial: 8.2, pros: ["Muy ligera", "Remate potente", "Buen tacto"], contras: ["Algo menos durable que rivales"] },
  { slug: "siux-diablo-rx", nombre: "Siux Diablo RX", marca: "Siux", modelo: "Diablo RX", anio: 2025, forma: "diamante", nivelMin: 1, nivelMax: 2, pesoMin: 365, pesoMax: 380, balance: "cabeza", nucleo: "EVA Ultra Soft", cara: "Carbono 12K", perfil: 40, perfilPotencia: 9, perfilControl: 6, perfilSalida: 8, scoreEditorial: 8.5, pros: ["Máxima potencia", "Salida de cristal brutal", "Diseño premium"], contras: ["Solo para jugadores avanzados"] },
  { slug: "nox-ml10-pro-cup", nombre: "Nox ML10 Pro Cup", marca: "Nox", modelo: "ML10 Pro Cup", anio: 2025, forma: "hibrida", nivelMin: 3, nivelMax: 5, pesoMin: 355, pesoMax: 375, balance: "medio", nucleo: "Hesacore", cara: "Carbono", perfil: 38, perfilPotencia: 7, perfilControl: 8, perfilSalida: 8, scoreEditorial: 8.0, pros: ["Gran tacto con Hesacore", "Fácil de usar"], contras: ["No destaca en ningún atributo"] },
];

const clubesData = [
  { slug: "club-padel-las-condes", nombre: "Club de Pádel Las Condes", ciudad: "Santiago", comuna: "Las Condes", lat: -33.4, lng: -70.57, indoor: true, outdoor: false, cantidadCanchas: 6, verificado: true, ratingPromedio: 4.8, totalReviews: 142 },
  { slug: "padelarena-vitacura", nombre: "PadelArena Vitacura", ciudad: "Santiago", comuna: "Vitacura", lat: -33.39, lng: -70.55, indoor: true, outdoor: true, cantidadCanchas: 8, ratingPromedio: 4.6, totalReviews: 98 },
  { slug: "padel-stadium-la-reina", nombre: "Pádel Stadium La Reina", ciudad: "Santiago", comuna: "La Reina", lat: -33.45, lng: -70.56, indoor: false, outdoor: true, cantidadCanchas: 4, ratingPromedio: 4.4, totalReviews: 67 },
  { slug: "padelplay-nunoa", nombre: "Padelplay Ñuñoa", ciudad: "Santiago", comuna: "Ñuñoa", lat: -33.46, lng: -70.60, indoor: true, outdoor: false, cantidadCanchas: 5, ratingPromedio: 4.5, totalReviews: 83 },
  { slug: "padel-sport-providencia", nombre: "Pádel Sport Providencia", ciudad: "Santiago", comuna: "Providencia", lat: -33.43, lng: -70.61, indoor: true, outdoor: false, cantidadCanchas: 3, ratingPromedio: 4.3, totalReviews: 51 },
  { slug: "padel-center-maipu", nombre: "Pádel Center Maipú", ciudad: "Santiago", comuna: "Maipú", lat: -33.51, lng: -70.76, indoor: true, outdoor: false, cantidadCanchas: 4, ratingPromedio: 4.2, totalReviews: 39 },
  { slug: "top-padel-valparaiso", nombre: "Top Pádel Valparaíso", ciudad: "Valparaíso", comuna: "Valparaíso", lat: -33.04, lng: -71.62, indoor: false, outdoor: true, cantidadCanchas: 3, ratingPromedio: 4.5, totalReviews: 28 },
];

const categoriasData = [
  {
    id: 6, nombre: "Iniciación", porcentajeJugadores: 18, tiempoPromedioMeses: "6–12 meses",
    frecuenciaRecomendada: "2 sesiones/semana",
    descripcion: "El inicio del camino. Drive y revés con bote, posición de espera básica, saque sin error.",
    golpesDomina: [{ slug: "globo", descripcion: "Globo defensivo básico" }, { slug: "remate", descripcion: "Remate básico sin salida de pared" }],
    golpesParaSubir: [{ slug: "bandeja", descripcion: "Controlar la bandeja con dirección", prioridad: 1 }, { slug: "contrapared", descripcion: "Salir de la pared con control", prioridad: 2 }],
    tacticasIncorporar: ["posicion-red", "comunicacion-basica"],
    perfilPalaRecomendado: { forma: "redonda", balance: "mango", potenciaMax: 6, controlMin: 8 },
  },
  {
    id: 5, nombre: "Intermedio bajo", porcentajeJugadores: 28, tiempoPromedioMeses: "6–18 meses",
    frecuenciaRecomendada: "2–3 sesiones/semana",
    descripcion: "Bandeja con dirección, globo táctico, comunicación con la pareja.",
    golpesDomina: [{ slug: "globo", descripcion: "Globo con dirección y profundidad" }, { slug: "bandeja", descripcion: "Bandeja básica" }, { slug: "contrapared", descripcion: "Salida de pared controlada" }],
    golpesParaSubir: [{ slug: "vibora", descripcion: "Iniciarse en la víbora", prioridad: 1 }, { slug: "remate", descripcion: "Remate con aprovechamiento de paredes", prioridad: 2 }],
    tacticasIncorporar: ["globo-para-bajar", "presion-red"],
    perfilPalaRecomendado: { forma: "lagrima", balance: "medio", potenciaMax: 7, controlMin: 7 },
  },
  {
    id: 4, nombre: "Intermedio", porcentajeJugadores: 24, tiempoPromedioMeses: "8–24 meses",
    frecuenciaRecomendada: "3 sesiones/semana",
    descripcion: "Víbora con dirección, globo táctico y bajadas de tres metros.",
    golpesDomina: [{ slug: "vibora", descripcion: "Víbora básica" }, { slug: "bandeja", descripcion: "Bandeja con dirección" }, { slug: "globo", descripcion: "Globo táctico" }],
    golpesParaSubir: [{ slug: "x3", descripcion: "Por tres controlado", prioridad: 1 }, { slug: "dejada", descripcion: "Dejada tras globo rival", prioridad: 2 }],
    tacticasIncorporar: ["australiana", "triangulo-ataque"],
    perfilPalaRecomendado: { forma: "lagrima", balance: "medio-cabeza", potenciaMax: 8, controlMin: 7 },
  },
  {
    id: 3, nombre: "Intermedio alto", porcentajeJugadores: 15, tiempoPromedioMeses: "12–36 meses",
    frecuenciaRecomendada: "3–4 sesiones/semana",
    descripcion: "X3, x4, dejada tras globo, chiquitas, australiana bien ejecutada.",
    golpesDomina: [{ slug: "x3", descripcion: "Por tres con potencia" }, { slug: "vibora", descripcion: "Víbora direccionada" }, { slug: "dejada", descripcion: "Dejada controlada" }],
    golpesParaSubir: [{ slug: "x4", descripcion: "Por cuatro de full potencia", prioridad: 1 }, { slug: "chiquita", descripcion: "Chiquita bajo presión", prioridad: 2 }],
    tacticasIncorporar: ["contraataque-sistematico", "presion-diagonal"],
    perfilPalaRecomendado: { forma: "lagrima", balance: "cabeza", potenciaMax: 9, controlMin: 7 },
  },
  {
    id: 2, nombre: "Avanzado", porcentajeJugadores: 10, tiempoPromedioMeses: "12–48 meses",
    frecuenciaRecomendada: "4 sesiones/semana + competición",
    descripcion: "Remate definitivo, presión sistemática, contraataque estructurado.",
    golpesDomina: [{ slug: "x4", descripcion: "Por cuatro con máxima potencia" }, { slug: "x3", descripcion: "Por tres como recurso táctico" }, { slug: "chiquita", descripcion: "Chiquita en movimiento" }],
    golpesParaSubir: [{ slug: "vibora", descripcion: "Víbora perfecta bajo presión de competición", prioridad: 1 }],
    tacticasIncorporar: ["mental-game", "scouting-rival"],
    perfilPalaRecomendado: { forma: "diamante", balance: "cabeza", potenciaMax: 10, controlMin: 6 },
  },
  {
    id: 1, nombre: "Competitivo", porcentajeJugadores: 5, tiempoPromedioMeses: "Indefinido",
    frecuenciaRecomendada: "5+ sesiones/semana + torneos",
    descripcion: "Ejecución de todos los golpes bajo presión máxima, estrategia por rival, mental game.",
    golpesDomina: [{ slug: "x4", descripcion: "X4 de alta velocidad" }, { slug: "vibora", descripcion: "Víbora con spin máximo" }, { slug: "dejada", descripcion: "Dejada en jugada táctica" }],
    golpesParaSubir: [],
    tacticasIncorporar: ["preparacion-fisica", "psicologia-competitiva"],
    perfilPalaRecomendado: { forma: "diamante", balance: "cabeza", potenciaMax: 10, controlMin: 6 },
  },
];

const golpesData = [
  { slug: "bandeja", nombre: "Bandeja", categoriaMin: 5, dificultad: "intermedio", orden: 1, descripcionMd: "La bandeja es uno de los golpes más importantes del pádel. Se ejecuta sobre la cabeza, con la pala en posición plana para contrarrestar el globo rival y mantener la red.", erroresComunesMd: "1. Bajar demasiado el codo al impactar\n2. No posicionarse lateralmente al globo\n3. Impactar demasiado adelante o atrás" },
  { slug: "vibora", nombre: "Víbora", categoriaMin: 4, dificultad: "intermedio", orden: 2, descripcionMd: "La víbora es un golpe de ataque con efecto liftado y lateral que genera una salida de pared impredecible. Es el golpe diferencial del pádel moderno.", erroresComunesMd: "1. Falta de rotación de muñeca\n2. Contactar muy abajo\n3. No acompañar el movimiento" },
  { slug: "remate", nombre: "Remate", categoriaMin: 5, dificultad: "basico", orden: 3, descripcionMd: "El remate es el golpe definitivo del pádel cuando el globo rival llega bajo. Hay remate por arriba (smash) y bandeja cuando el globo es profundo.", erroresComunesMd: "1. No esperar bien el bote\n2. Golpear con el brazo rígido\n3. No direccionar hacia el fondo" },
  { slug: "globo", nombre: "Globo", categoriaMin: 6, dificultad: "basico", orden: 4, descripcionMd: "El globo es el golpe defensivo por excelencia. Permite recuperar posición cuando estás en apuros. Un buen globo llega profundo y alto, obligando al rival a rematarte desde atrás.", erroresComunesMd: "1. Globo corto (fácil de atacar)\n2. Globo sin trayectoria (lento)\n3. No aprovechar el globo para bajar a la red" },
  { slug: "x3", nombre: "X3 (por tres)", categoriaMin: 3, dificultad: "avanzado", orden: 5, descripcionMd: "El X3 es cuando pegas en el cristal trasero con suficiente potencia para que la pelota pase por el lado del rival y salga por los tres cristales. Golpe espectacular y efectivo.", erroresComunesMd: "1. Pegar sin suficiente potencia (se queda en la pared)\n2. No direccionar correctamente\n3. Ejecutarlo en posición incorrecta" },
  { slug: "x4", nombre: "X4 (por cuatro)", categoriaMin: 2, dificultad: "avanzado", orden: 6, descripcionMd: "El X4 es la versión más potente del X3: la pelota toca las cuatro paredes. Requiere una técnica perfecta y posicionamiento ideal. Es el golpe definitivo del jugador avanzado.", erroresComunesMd: "1. Falta de potencia en el impacto\n2. Posición corporal incorrecta\n3. No anticipar el rebote de las paredes" },
  { slug: "contrapared", nombre: "Contrapared", categoriaMin: 5, dificultad: "intermedio", orden: 7, descripcionMd: "La salida de pared (contrapared) es la habilidad de pegar después de que la pelota bota en el cristal trasero. Es fundamental para recuperar puntos defensivos.", erroresComunesMd: "1. No respetar el doble bote\n2. Salir demasiado rápido de la pared\n3. Impactar con poca firmeza" },
  { slug: "dejada", nombre: "Dejada", categoriaMin: 3, dificultad: "avanzado", orden: 8, descripcionMd: "La dejada es un golpe de toque sutil cerca de la red que no permite al rival llegar. Ideal después de un globo profundo del rival cuando bajas a la red.", erroresComunesMd: "1. Pegarla demasiado fuerte\n2. No bajar bien a la red antes de ejecutarla\n3. Hacerla sin ventaja táctica" },
  { slug: "chiquita", nombre: "Chiquita", categoriaMin: 3, dificultad: "avanzado", orden: 9, descripcionMd: "La chiquita es un toque bajo, cruzado o paralelo, que pasa la red rasante y baja rápido. Muy efectiva como salida de presión o llegando a la red.", erroresComunesMd: "1. Pegarla levantada (sube fácil para el rival)\n2. Sin dirección definida\n3. Usarla en posición defensiva" },
  { slug: "salida-de-pared", nombre: "Salida de pared", categoriaMin: 5, dificultad: "basico", orden: 10, descripcionMd: "La salida de pared lateral es cuando la pelota toca el cristal lateral antes de que la puedas golpear. Requiere lectura anticipada y posición correcta para aprovecharla.", erroresComunesMd: "1. No leer la trayectoria del rebote\n2. Golpear antes del bote correcto\n3. No moverse lateralmente para alinearse" },
];

const torneosData = [
  { slug: "open-las-condes-cat4-may2026", circuito: "chile-amateur", nombre: "Open Las Condes Cat 4", categoriaTarget: 4, fechaInicio: new Date("2026-05-10"), ciudad: "Las Condes", pais: "CL", precioInscripcionClp: 30000, capacidadParejas: 16, estado: "abierto" },
  { slug: "copa-otono-la-reina-cat45-may2026", circuito: "chile-amateur", nombre: "Copa Otoño La Reina Cat 4–5", categoriaTarget: 4, fechaInicio: new Date("2026-05-17"), ciudad: "La Reina", pais: "CL", precioInscripcionClp: 45000, capacidadParejas: 24, estado: "abierto" },
  { slug: "copa-vitacura-cat3-jun2026", circuito: "chile-amateur", nombre: "Copa Vitacura Cat 3", categoriaTarget: 3, fechaInicio: new Date("2026-06-06"), ciudad: "Vitacura", pais: "CL", precioInscripcionClp: 55000, capacidadParejas: 32, estado: "abierto" },
  { slug: "fpch-categorico-stgo-cat3-jun2026", circuito: "fpch", nombre: "FPCH Categórico Santiago Cat 3", categoriaTarget: 3, fechaInicio: new Date("2026-06-14"), ciudad: "Santiago", pais: "CL", precioInscripcionClp: 60000, capacidadParejas: 48, estado: "abierto" },
  { slug: "open-providencia-cat5-jul2026", circuito: "chile-amateur", nombre: "Open Providencia Cat 5", categoriaTarget: 5, fechaInicio: new Date("2026-07-05"), ciudad: "Providencia", pais: "CL", precioInscripcionClp: 25000, capacidadParejas: 16, estado: "abierto" },
  { slug: "copa-nunoa-cat4-jul2026", circuito: "chile-amateur", nombre: "Copa Ñuñoa Cat 4", categoriaTarget: 4, fechaInicio: new Date("2026-07-19"), ciudad: "Ñuñoa", pais: "CL", precioInscripcionClp: 35000, capacidadParejas: 24, estado: "abierto" },
];

async function main() {
  console.log("=== SEED Pulso Pádel ===\n");

  console.log("Insertando tiendas...");
  await db.insert(schema.tiendas).values(tiendasData).onConflictDoNothing();
  console.log(`  ✓ ${tiendasData.length} tiendas`);

  console.log("Insertando palas...");
  await db.insert(schema.palas).values(palasData).onConflictDoNothing();
  console.log(`  ✓ ${palasData.length} palas`);

  console.log("Insertando clubes...");
  await db.insert(schema.clubes).values(clubesData).onConflictDoNothing();
  console.log(`  ✓ ${clubesData.length} clubes`);

  console.log("Insertando categorías...");
  await db.insert(schema.categorias).values(categoriasData).onConflictDoNothing();
  console.log(`  ✓ ${categoriasData.length} categorías`);

  console.log("Insertando golpes...");
  await db.insert(schema.golpes).values(golpesData).onConflictDoNothing();
  console.log(`  ✓ ${golpesData.length} golpes`);

  console.log("Insertando torneos...");
  await db.insert(schema.torneos).values(torneosData).onConflictDoNothing();
  console.log(`  ✓ ${torneosData.length} torneos`);

  // Precios de palas (seed básico: precio más barato en padelnuestro)
  const palasDb = await db.select({ id: schema.palas.id, slug: schema.palas.slug }).from(schema.palas);
  const tiendasDb = await db.select({ id: schema.tiendas.id, slug: schema.tiendas.slug }).from(schema.tiendas);
  const padelnuestro = tiendasDb.find(t => t.slug === "padelnuestro-cl")!;

  const preciosPorSlug: Record<string, number> = {
    "bullpadel-vertex-04": 219990,
    "nox-at10-genius": 254990,
    "adidas-metalbone-hrd": 184990,
    "head-delta-pro-2026": 239990,
    "bullpadel-hack-04": 149990,
    "babolat-air-veron": 209990,
    "siux-diablo-rx": 289990,
    "nox-ml10-pro-cup": 199990,
  };

  const preciosData = palasDb.map(p => ({
    palaId: p.id,
    tiendaId: padelnuestro.id,
    precioClp: preciosPorSlug[p.slug] ?? 199990,
    stock: true,
    url: `https://padelnuestro.cl/palas/${p.slug}`,
  }));

  console.log("Insertando precios...");
  await db.insert(schema.preciosPalas).values(preciosData).onConflictDoNothing();
  console.log(`  ✓ ${preciosData.length} precios`);

  // Precios de canchas
  const clubesDb = await db.select({ id: schema.clubes.id, slug: schema.clubes.slug }).from(schema.clubes);
  const preciosCancha = clubesDb.flatMap(c => [
    { clubId: c.id, horaInicio: "08:00", horaFin: "20:00", precioHoraClp: 14000, tipo: "regular" },
    { clubId: c.id, horaInicio: "20:00", horaFin: "23:00", precioHoraClp: 18000, tipo: "prime" },
  ]);

  console.log("Insertando precios de canchas...");
  await db.insert(schema.preciosCanchas).values(preciosCancha).onConflictDoNothing();
  console.log(`  ✓ ${preciosCancha.length} precios de canchas`);

  console.log("\n✅ Seed completado exitosamente.");
}

main().catch((err) => {
  console.error("Error en seed:", err);
  process.exit(1);
});
