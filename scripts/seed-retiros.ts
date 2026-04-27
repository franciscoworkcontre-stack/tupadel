import { db } from "../src/db";
import { users, operadores, retiros, retiroEdiciones, retiroItinerario, retiroCoaches, retiroServiciosExtras, clubes, canchaAdmins } from "../src/db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

async function main() {
  console.log("Seeding retiros & cancha admins...");

  // ─── OPERADORES ───────────────────────────────────────────────────
  const op1Id = crypto.randomUUID();
  const op2Id = crypto.randomUUID();
  const op3Id = crypto.randomUUID();
  const pw = await bcrypt.hash("password123", 12);

  const [userOp1] = await db.insert(users).values({
    id: op1Id,
    email: "hola@padretiros.cl",
    nombre: "Valentina Rojas",
    rol: "operador",
    passwordHash: pw,
    ciudad: "Santiago",
  }).onConflictDoUpdate({ target: users.email, set: { nombre: "Valentina Rojas" } }).returning();

  const [userOp2] = await db.insert(users).values({
    id: op2Id,
    email: "info@padelnortechile.cl",
    nombre: "Matías Herrera",
    rol: "operador",
    passwordHash: pw,
    ciudad: "La Serena",
  }).onConflictDoUpdate({ target: users.email, set: { nombre: "Matías Herrera" } }).returning();

  const [userOp3] = await db.insert(users).values({
    id: op3Id,
    email: "team@camppadelsur.cl",
    nombre: "Camila Soto",
    rol: "operador",
    passwordHash: pw,
    ciudad: "Concepción",
  }).onConflictDoUpdate({ target: users.email, set: { nombre: "Camila Soto" } }).returning();

  const [operador1] = await db.insert(operadores).values({
    userId: userOp1.id,
    slug: "padretiros",
    nombreEmpresa: "Pádel Retiros",
    descripcionMd: "Organizamos retiros de pádel en los mejores destinos de Chile y LATAM. Foco en aprendizaje, comunidad y experiencias únicas.",
    instagram: "padretiros",
    telefono: "+56912345678",
    paisBase: "CL",
    estado: "verificado",
  }).onConflictDoUpdate({ target: operadores.slug, set: { estado: "verificado" } }).returning();

  const [operador2] = await db.insert(operadores).values({
    userId: userOp2.id,
    slug: "padel-norte",
    nombreEmpresa: "Pádel Norte Chile",
    descripcionMd: "Retiros de pádel en el norte chileno. Desierto, playa y mucho pádel.",
    instagram: "padelnorte",
    telefono: "+56987654321",
    paisBase: "CL",
    estado: "verificado",
  }).onConflictDoUpdate({ target: operadores.slug, set: { estado: "verificado" } }).returning();

  const [operador3] = await db.insert(operadores).values({
    userId: userOp3.id,
    slug: "camp-padel-sur",
    nombreEmpresa: "Camp Pádel Sur",
    descripcionMd: "Campamentos de pádel en la Patagonia. Naturaleza, deporte y conexión.",
    instagram: "camppadelsur",
    paisBase: "CL",
    estado: "verificado",
  }).onConflictDoUpdate({ target: operadores.slug, set: { estado: "verificado" } }).returning();

  // ─── RETIROS ──────────────────────────────────────────────────────
  const [retiro1] = await db.insert(retiros).values({
    operadorId: operador1.id,
    slug: "retiro-viña-del-mar-septiembre-2026",
    titulo: "Retiro de Pádel Viña del Mar",
    subtitulo: "4 días junto al mar con clases, partidos y buena gente",
    descripcionMd: `## Retiro de Pádel en Viña del Mar

4 días intensivos de pádel en la joya del litoral chileno. Entrenamientos por la mañana con nuestros coaches certificados, tarde libre para explorar la ciudad y noches de pádel social.

**¿Para quién es?** Jugadores Cat 3–5 que quieren mejorar técnica y conocer gente de su nivel.

**El lugar:** Club de Pádel Costa Azul, a 200 metros del mar, con 8 canchas de cristal cubiertas.`,
    pais: "CL",
    ciudad: "Viña del Mar",
    lugarNombre: "Club de Pádel Costa Azul",
    lugarDireccion: "Av. San Martín 567, Viña del Mar",
    lat: -33.0245,
    lng: -71.5518,
    genero: "mixto",
    nivelMin: 3,
    nivelMax: 5,
    diasDuracion: 4,
    nochesDuracion: 3,
    imagenPrincipal: null,
    incluyeJson: [
      { icono: "🏨", texto: "3 noches en hotel 4★" },
      { icono: "🍳", texto: "Desayuno y almuerzo incluidos" },
      { icono: "🎾", texto: "12 horas de entrenamiento" },
      { icono: "📊", texto: "Video análisis técnico" },
      { icono: "🏆", texto: "Torneo interno el último día" },
    ],
    noIncluyeJson: [
      { icono: "✈️", texto: "Traslados desde tu ciudad" },
      { icono: "🍷", texto: "Bebidas alcohólicas" },
      { icono: "🎾", texto: "Palas (disponibles en renta)" },
    ],
    estado: "publicado",
    destacado: true,
  }).onConflictDoUpdate({ target: retiros.slug, set: { titulo: "Retiro de Pádel Viña del Mar" } }).returning();

  const [retiro2] = await db.insert(retiros).values({
    operadorId: operador1.id,
    slug: "retiro-femenino-bariloche-octubre-2026",
    titulo: "Retiro Femenino Bariloche",
    subtitulo: "Pádel, montaña y comunidad — solo para mujeres",
    descripcionMd: `## Retiro Femenino de Pádel en Bariloche

Un espacio creado por y para mujeres que aman el pádel. 5 días rodeadas de lagos, montañas y buenas compañeras de juego.

**Coaches:** Sole Martínez (ex Cat 1 APTA) y Caro Díaz (Federación Argentina).

**Alojamiento:** Cabaña frente al lago, con vista espectacular.`,
    pais: "AR",
    ciudad: "Bariloche",
    lugarNombre: "Patagonia Pádel Club",
    lugarDireccion: "Av. Bustillo Km 12, Bariloche",
    lat: -41.1335,
    lng: -71.3103,
    genero: "mujeres",
    nivelMin: 4,
    nivelMax: 6,
    diasDuracion: 5,
    nochesDuracion: 4,
    imagenPrincipal: null,
    incluyeJson: [
      { icono: "🏠", texto: "4 noches en cabaña junto al lago" },
      { icono: "🍽️", texto: "Pensión completa" },
      { icono: "🎾", texto: "16 horas de entrenamiento" },
      { icono: "🧘", texto: "Sesión de yoga matutina" },
      { icono: "📸", texto: "Sesión fotográfica deportiva" },
    ],
    noIncluyeJson: [
      { icono: "✈️", texto: "Vuelo a Bariloche" },
    ],
    estado: "publicado",
    destacado: true,
  }).onConflictDoUpdate({ target: retiros.slug, set: { titulo: "Retiro Femenino Bariloche" } }).returning();

  const [retiro3] = await db.insert(retiros).values({
    operadorId: operador2.id,
    slug: "retiro-atacama-hombres-noviembre-2026",
    titulo: "Retiro Masculino Atacama",
    subtitulo: "Pádel en el desierto más árido del mundo",
    descripcionMd: `## Retiro Masculino en el Desierto de Atacama

Una experiencia única: pádel al atardecer en el Atacama, con el cielo más estrellado del mundo de fondo.

**Nivel:** Cat 3–5. Grupos reducidos de 12 jugadores.`,
    pais: "CL",
    ciudad: "San Pedro de Atacama",
    lugarNombre: "Desert Pádel Center",
    genero: "hombres",
    nivelMin: 3,
    nivelMax: 5,
    diasDuracion: 4,
    nochesDuracion: 3,
    imagenPrincipal: null,
    incluyeJson: [
      { icono: "🏨", texto: "3 noches en lodge boutique" },
      { icono: "🍳", texto: "Desayuno y cena" },
      { icono: "🎾", texto: "10 horas de pádel" },
      { icono: "🌌", texto: "Tour astronómico nocturno" },
    ],
    noIncluyeJson: [
      { icono: "✈️", texto: "Vuelo a Calama" },
    ],
    estado: "publicado",
    destacado: false,
  }).onConflictDoUpdate({ target: retiros.slug, set: { titulo: "Retiro Masculino Atacama" } }).returning();

  const [retiro4] = await db.insert(retiros).values({
    operadorId: operador3.id,
    slug: "camp-infantil-padel-sur-enero-2027",
    titulo: "Camp Infantil Pádel Sur",
    subtitulo: "El primer camp de pádel para niños en la Patagonia",
    descripcionMd: `## Camp Infantil de Pádel

Para niños y niñas de 8 a 15 años. Una semana de pádel, naturaleza y amigos.`,
    pais: "CL",
    ciudad: "Puerto Montt",
    lugarNombre: "Club Deportivo Patagonia",
    genero: "mixto",
    nivelMin: 4,
    nivelMax: 6,
    diasDuracion: 7,
    nochesDuracion: 6,
    imagenPrincipal: null,
    incluyeJson: [
      { icono: "🏕️", texto: "6 noches en residencia deportiva" },
      { icono: "🍽️", texto: "Pensión completa" },
      { icono: "🎾", texto: "20 horas de entrenamiento" },
      { icono: "🏊", texto: "Piscina temperada" },
    ],
    noIncluyeJson: [
      { icono: "✈️", texto: "Traslados" },
      { icono: "👟", texto: "Implementación deportiva" },
    ],
    estado: "publicado",
    destacado: false,
  }).onConflictDoUpdate({ target: retiros.slug, set: { titulo: "Camp Infantil Pádel Sur" } }).returning();

  const [retiro5] = await db.insert(retiros).values({
    operadorId: operador1.id,
    slug: "retiro-mixto-cartagena-colombia-2026",
    titulo: "Retiro Mixto Cartagena",
    subtitulo: "Pádel en el Caribe colombiano — la experiencia definitiva",
    descripcionMd: `## Retiro Mixto en Cartagena de Indias

5 días en el corazón del Caribe. Pádel por la mañana, playa por la tarde, gastronomía caribeña por la noche.`,
    pais: "CO",
    ciudad: "Cartagena de Indias",
    lugarNombre: "Caribe Pádel Club",
    genero: "mixto",
    nivelMin: 3,
    nivelMax: 6,
    diasDuracion: 5,
    nochesDuracion: 4,
    imagenPrincipal: null,
    incluyeJson: [
      { icono: "🏨", texto: "4 noches en hotel boutique" },
      { icono: "🍳", texto: "Desayuno incluido" },
      { icono: "🎾", texto: "14 horas de entrenamiento" },
      { icono: "🚤", texto: "Excursión en velero" },
    ],
    noIncluyeJson: [
      { icono: "✈️", texto: "Vuelo a Cartagena" },
      { icono: "🍽️", texto: "Almuerzos y cenas" },
    ],
    estado: "publicado",
    destacado: true,
  }).onConflictDoUpdate({ target: retiros.slug, set: { titulo: "Retiro Mixto Cartagena" } }).returning();

  // ─── EDICIONES ────────────────────────────────────────────────────
  const now = new Date();

  await db.insert(retiroEdiciones).values([
    {
      retiroId: retiro1.id,
      nombre: "Edición Septiembre 2026",
      fechaInicio: new Date("2026-09-11"),
      fechaFin: new Date("2026-09-14"),
      cupoTotal: 16,
      cupoDisponible: 9,
      precioClp: 890000,
      moneda: "CLP",
      habitacionTipo: "doble",
      estado: "abierta",
    },
    {
      retiroId: retiro1.id,
      nombre: "Edición Noviembre 2026",
      fechaInicio: new Date("2026-11-06"),
      fechaFin: new Date("2026-11-09"),
      cupoTotal: 16,
      cupoDisponible: 16,
      precioClp: 950000,
      moneda: "CLP",
      habitacionTipo: "doble",
      estado: "abierta",
    },
    {
      retiroId: retiro2.id,
      nombre: "Octubre 2026",
      fechaInicio: new Date("2026-10-08"),
      fechaFin: new Date("2026-10-12"),
      cupoTotal: 12,
      cupoDisponible: 4,
      precioClp: 1290000,
      moneda: "CLP",
      habitacionTipo: "compartida",
      estado: "abierta",
    },
    {
      retiroId: retiro3.id,
      nombre: "Noviembre 2026",
      fechaInicio: new Date("2026-11-20"),
      fechaFin: new Date("2026-11-23"),
      cupoTotal: 12,
      cupoDisponible: 12,
      precioClp: 1050000,
      moneda: "CLP",
      estado: "abierta",
    },
    {
      retiroId: retiro4.id,
      nombre: "Enero 2027",
      fechaInicio: new Date("2027-01-10"),
      fechaFin: new Date("2027-01-16"),
      cupoTotal: 20,
      cupoDisponible: 15,
      precioClp: 780000,
      moneda: "CLP",
      estado: "abierta",
    },
    {
      retiroId: retiro5.id,
      nombre: "Octubre 2026",
      fechaInicio: new Date("2026-10-22"),
      fechaFin: new Date("2026-10-26"),
      cupoTotal: 20,
      cupoDisponible: 11,
      precioClp: 1490000,
      moneda: "CLP",
      habitacionTipo: "doble",
      estado: "abierta",
    },
  ]);

  // ─── ITINERARIO retiro1 ───────────────────────────────────────────
  await db.insert(retiroItinerario).values([
    { retiroId: retiro1.id, dia: 1, horaInicio: "15:00", horaFin: "16:00", titulo: "Check-in y bienvenida", tipo: "actividad", orden: 1 },
    { retiroId: retiro1.id, dia: 1, horaInicio: "16:30", horaFin: "18:30", titulo: "Sesión inaugural: diagnóstico grupal", tipo: "actividad", orden: 2 },
    { retiroId: retiro1.id, dia: 1, horaInicio: "20:00", horaFin: "22:00", titulo: "Cena de bienvenida", tipo: "comida", orden: 3 },
    { retiroId: retiro1.id, dia: 2, horaInicio: "08:00", horaFin: "09:00", titulo: "Desayuno", tipo: "comida", orden: 1 },
    { retiroId: retiro1.id, dia: 2, horaInicio: "09:30", horaFin: "12:00", titulo: "Entrenamiento técnico AM", tipo: "actividad", orden: 2 },
    { retiroId: retiro1.id, dia: 2, horaInicio: "12:00", horaFin: "13:30", titulo: "Almuerzo", tipo: "comida", orden: 3 },
    { retiroId: retiro1.id, dia: 2, horaInicio: "16:00", horaFin: "18:00", titulo: "Entrenamiento táctico PM", tipo: "actividad", orden: 4 },
    { retiroId: retiro1.id, dia: 4, horaInicio: "09:00", horaFin: "13:00", titulo: "Torneo de clausura", tipo: "actividad", orden: 1 },
    { retiroId: retiro1.id, dia: 4, horaInicio: "13:30", horaFin: "15:00", titulo: "Almuerzo de cierre y premiación", tipo: "comida", orden: 2 },
  ]);

  // ─── EXTRAS retiro1 ───────────────────────────────────────────────
  await db.insert(retiroServiciosExtras).values([
    { retiroId: retiro1.id, nombre: "Habitación individual", descripcion: "Upgrade a habitación individual (cupo limitado)", precioClp: 120000, obligatorio: false },
    { retiroId: retiro1.id, nombre: "Camiseta oficial del retiro", descripcion: "Camiseta técnica personalizada", precioClp: 18000, obligatorio: false },
    { retiroId: retiro1.id, nombre: "Video análisis extra", descripcion: "Sesión adicional de 45 min con coach y video", precioClp: 35000, obligatorio: false },
  ]);

  // ─── ADMIN CANCHAS ────────────────────────────────────────────────
  // Get first club
  const [primerClub] = await db.select({ id: clubes.id }).from(clubes).limit(1);
  if (primerClub) {
    const adminId = crypto.randomUUID();
    const [adminUser] = await db.insert(users).values({
      id: adminId,
      email: "admin@clubpadel.cl",
      nombre: "Roberto Fuentes",
      rol: "admin_cancha",
      passwordHash: pw,
      ciudad: "Santiago",
    }).onConflictDoUpdate({ target: users.email, set: { nombre: "Roberto Fuentes" } }).returning();

    await db.insert(canchaAdmins).values({
      userId: adminUser.id,
      clubId: primerClub.id,
      cargo: "Administrador General",
      permisos: ["lectura", "edicion", "reservas", "precios", "admin"],
      activo: true,
    }).onConflictDoNothing();

    console.log(`✓ Admin cancha: ${adminUser.email} → club ${primerClub.id}`);
  } else {
    console.log("⚠ No clubs found — skipping cancha admin seed");
  }

  console.log("✅ Seed retiros completado");
  console.log(`  Operadores: padretiros, padel-norte, camp-padel-sur`);
  console.log(`  Retiros: 5 publicados`);
  console.log(`  Ediciones: 6`);
  console.log(`  Credenciales: password123`);
}

main().catch(e => { console.error(e); process.exit(1); });
