import {
  pgTable,
  pgEnum,
  text,
  integer,
  real,
  boolean,
  timestamp,
  jsonb,
  uuid,
  varchar,
  decimal,
  time,
  date,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ============================================================
// PALAS
// ============================================================

export const palas = pgTable(
  "palas",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: varchar("slug", { length: 200 }).notNull().unique(),
    nombre: varchar("nombre", { length: 200 }).notNull(),
    marca: varchar("marca", { length: 100 }).notNull(),
    modelo: varchar("modelo", { length: 150 }).notNull(),
    anio: integer("anio").notNull(),
    forma: varchar("forma", { length: 50 }).notNull(), // diamante | lagrima | redonda | hibrida
    nivelMin: integer("nivel_min").notNull().default(1), // 1-6
    nivelMax: integer("nivel_max").notNull().default(6),
    pesoMin: integer("peso_min"), // gramos
    pesoMax: integer("peso_max"),
    balance: varchar("balance", { length: 50 }), // cabeza | medio | mango
    nucleo: varchar("nucleo", { length: 100 }),
    cara: varchar("cara", { length: 100 }),
    perfil: integer("perfil"), // mm
    perfilPotencia: integer("perfil_potencia"), // 1-10
    perfilControl: integer("perfil_control"),
    perfilSalida: integer("perfil_salida"),
    scoreEditorial: real("score_editorial"), // 1-10
    descripcionMd: text("descripcion_md"),
    pros: text("pros").array().default([]),
    contras: text("contras").array().default([]),
    imagenPrincipal: text("imagen_principal"),
    imagenes: text("imagenes").array().default([]),
    jugadoresPro: text("jugadores_pro").array().default([]),
    publicada: boolean("publicada").default(true),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (t) => [index("palas_marca_idx").on(t.marca), index("palas_forma_idx").on(t.forma)]
);

export const reviewsPalas = pgTable("reviews_palas", {
  id: uuid("id").primaryKey().defaultRandom(),
  palaId: uuid("pala_id")
    .notNull()
    .references(() => palas.id, { onDelete: "cascade" }),
  autorId: uuid("autor_id"),
  scoreTotal: real("score_total").notNull(), // 1-10
  scorePotencia: integer("score_potencia"),
  scoreControl: integer("score_control"),
  scoreSalida: integer("score_salida"),
  veredictoMd: text("veredicto_md"),
  testeoHoras: real("testeo_horas"),
  testeoSuperficie: varchar("testeo_superficie", { length: 50 }),
  videoUrl: text("video_url"),
  publicadoAt: timestamp("publicado_at").defaultNow(),
});

export const tiendas = pgTable("tiendas", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  nombre: varchar("nombre", { length: 100 }).notNull(),
  dominio: varchar("dominio", { length: 200 }).notNull(),
  logo: text("logo"),
  pais: varchar("pais", { length: 10 }).notNull().default("CL"),
  comisionAfiliadoPct: real("comision_afiliado_pct").default(0),
  confiabilidad: integer("confiabilidad").default(5), // 1-5
  tiempoEnvioDias: integer("tiempo_envio_dias"),
  linkAfiliadoTemplate: text("link_afiliado_template"),
  activa: boolean("activa").default(true),
});

export const preciosPalas = pgTable(
  "precios_palas",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    palaId: uuid("pala_id")
      .notNull()
      .references(() => palas.id, { onDelete: "cascade" }),
    tiendaId: uuid("tienda_id")
      .notNull()
      .references(() => tiendas.id),
    precioClp: integer("precio_clp").notNull(),
    precioOriginalClp: integer("precio_original_clp"),
    descuentoPct: real("descuento_pct"),
    stock: boolean("stock").default(true),
    url: text("url").notNull(),
    scrapeadoAt: timestamp("scrapeado_at").defaultNow(),
  },
  (t) => [
    index("precios_pala_tienda_idx").on(t.palaId, t.tiendaId),
    index("precios_scrapeado_at_idx").on(t.scrapeadoAt),
  ]
);

export const palasUsadas = pgTable("palas_usadas", {
  id: uuid("id").primaryKey().defaultRandom(),
  palaId: uuid("pala_id").references(() => palas.id),
  fuente: varchar("fuente", { length: 50 }).notNull(), // mercadolibre | yapo
  precioClp: integer("precio_clp").notNull(),
  condicion: varchar("condicion", { length: 50 }),
  vendedor: varchar("vendedor", { length: 200 }),
  ciudad: varchar("ciudad", { length: 100 }),
  url: text("url").notNull(),
  publicadoAt: timestamp("publicado_at"),
  vigente: boolean("vigente").default(true),
  scrapeadoAt: timestamp("scrapeado_at").defaultNow(),
});

// ============================================================
// CANCHAS
// ============================================================

export const clubes = pgTable(
  "clubes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: varchar("slug", { length: 200 }).notNull().unique(),
    nombre: varchar("nombre", { length: 200 }).notNull(),
    ciudad: varchar("ciudad", { length: 100 }).notNull(),
    comuna: varchar("comuna", { length: 100 }),
    direccion: text("direccion"),
    lat: real("lat"),
    lng: real("lng"),
    telefono: varchar("telefono", { length: 30 }),
    whatsapp: varchar("whatsapp", { length: 30 }),
    instagram: varchar("instagram", { length: 100 }),
    website: text("website"),
    indoor: boolean("indoor").default(false),
    outdoor: boolean("outdoor").default(false),
    cantidadCanchas: integer("cantidad_canchas"),
    muro: varchar("muro", { length: 50 }), // cristal | panoramica | mixto
    cesped: varchar("cesped", { length: 50 }),
    servicios: text("servicios").array().default([]),
    horarioJson: jsonb("horario_json"),
    imagenes: text("imagenes").array().default([]),
    ratingPromedio: real("rating_promedio"),
    totalReviews: integer("total_reviews").default(0),
    reclamadoPor: uuid("reclamado_por"),
    verificado: boolean("verificado").default(false),
    activo: boolean("activo").default(true),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => [index("clubes_ciudad_idx").on(t.ciudad)]
);

export const preciosCanchas = pgTable("precios_canchas", {
  id: uuid("id").primaryKey().defaultRandom(),
  clubId: uuid("club_id")
    .notNull()
    .references(() => clubes.id, { onDelete: "cascade" }),
  diaSemana: integer("dia_semana"), // 0=dom...6=sab, null=todos
  horaInicio: varchar("hora_inicio", { length: 5 }).notNull(), // "08:00"
  horaFin: varchar("hora_fin", { length: 5 }).notNull(),
  precioHoraClp: integer("precio_hora_clp").notNull(),
  tipo: varchar("tipo", { length: 30 }).notNull().default("regular"), // regular | prime | nocturno
  actualizadoAt: timestamp("actualizado_at").defaultNow(),
});

export const reviewsCanchas = pgTable("reviews_canchas", {
  id: uuid("id").primaryKey().defaultRandom(),
  clubId: uuid("club_id")
    .notNull()
    .references(() => clubes.id, { onDelete: "cascade" }),
  userId: uuid("user_id"),
  rating: integer("rating").notNull(), // 1-5
  comentario: text("comentario"),
  publicadoAt: timestamp("publicado_at").defaultNow(),
});

// ============================================================
// USUARIOS Y NIVEL
// ============================================================

export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  email: varchar("email", { length: 300 }).notNull().unique(),
  nombre: varchar("nombre", { length: 200 }),
  ciudad: varchar("ciudad", { length: 100 }),
  fechaNacimiento: timestamp("fecha_nacimiento"),
  manoDominante: varchar("mano_dominante", { length: 10 }), // diestro | zurdo
  ladoPreferido: varchar("lado_preferido", { length: 10 }), // drive | reves
  palaActualId: uuid("pala_actual_id").references(() => palas.id),
  categoriaEstimada: integer("categoria_estimada"), // 1-6
  rol: varchar("rol", { length: 30 }).notNull().default("jugador"), // jugador | operador | admin_cancha | admin
  avatarUrl: text("avatar_url"),
  telefono: varchar("telefono", { length: 30 }),
  passwordHash: text("password_hash"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const diagnosticos = pgTable("diagnosticos", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),
  token: varchar("token", { length: 64 }).notNull().unique(),
  email: varchar("email", { length: 300 }),
  respuestasJson: jsonb("respuestas_json").notNull(),
  categoriaEstimada: integer("categoria_estimada").notNull(), // 1-6
  confianza: real("confianza"), // 0-1
  areasMejora: text("areas_mejora").array().default([]),
  realizadoAt: timestamp("realizado_at").defaultNow(),
});

export const alertasPrecio = pgTable("alertas_precio", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id"),
  email: varchar("email", { length: 300 }).notNull(),
  palaId: uuid("pala_id")
    .notNull()
    .references(() => palas.id, { onDelete: "cascade" }),
  precioObjetivo: integer("precio_objetivo").notNull(),
  activa: boolean("activa").default(true),
  disparadaAt: timestamp("disparada_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============================================================
// COMUNIDAD
// ============================================================

export const buscarCompanero = pgTable("buscar_companero", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),
  ciudad: varchar("ciudad", { length: 100 }).notNull(),
  comuna: varchar("comuna", { length: 100 }),
  categoria: integer("categoria").notNull(), // 1-6
  horariosJson: jsonb("horarios_json"),
  modalidad: varchar("modalidad", { length: 20 }).default("esporadico"), // fijo | esporadico
  descripcion: text("descripcion"),
  nombre: varchar("nombre", { length: 200 }),
  contacto: varchar("contacto", { length: 200 }),
  vigente: boolean("vigente").default(true),
  vigentaHasta: timestamp("vigente_hasta"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const coaches = pgTable(
  "coaches",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: varchar("slug", { length: 200 }).notNull().unique(),
    nombre: varchar("nombre", { length: 200 }).notNull(),
    ciudad: varchar("ciudad", { length: 100 }).notNull(),
    certificaciones: text("certificaciones").array().default([]),
    nivelesQueTrabaja: integer("niveles_que_trabaja").array().default([]),
    modalidades: text("modalidades").array().default([]),
    precioHoraClp: integer("precio_hora_clp"),
    contactoJson: jsonb("contacto_json"),
    bioMd: text("bio_md"),
    imagen: text("imagen"),
    rating: real("rating"),
    totalAlumnos: integer("total_alumnos").default(0),
    destacado: boolean("destacado").default(false),
    reclamadoPor: uuid("reclamado_por"),
    activo: boolean("activo").default(true),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => [index("coaches_ciudad_idx").on(t.ciudad)]
);

// ============================================================
// BITÁCORA
// ============================================================

export const partidos = pgTable("partidos", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  fecha: timestamp("fecha").notNull(),
  clubId: uuid("club_id").references(() => clubes.id),
  parejaNombre: varchar("pareja_nombre", { length: 200 }),
  parejaUserId: uuid("pareja_user_id"),
  rivalesTexto: text("rivales_texto"),
  resultado: jsonb("resultado"), // [{sets: "6-3", ganado: true}, ...]
  palaUsadaId: uuid("pala_usada_id").references(() => palas.id),
  notas: text("notas"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const favoritos = pgTable(
  "favoritos",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    tipo: varchar("tipo", { length: 20 }).notNull(), // pala | club
    referenciaId: uuid("referencia_id").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => [uniqueIndex("favoritos_user_tipo_ref_idx").on(t.userId, t.tipo, t.referenciaId)]
);

// ============================================================
// CONTENIDO
// ============================================================

export const golpes = pgTable("golpes", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  nombre: varchar("nombre", { length: 200 }).notNull(),
  categoriaMin: integer("categoria_min").notNull().default(6), // nivel mínimo
  dificultad: varchar("dificultad", { length: 30 }), // basico | intermedio | avanzado
  descripcionMd: text("descripcion_md"),
  videoUrl: text("video_url"),
  imagen: text("imagen"),
  erroresComunesMd: text("errores_comunes_md"),
  orden: integer("orden").default(0),
});

export const tacticas = pgTable("tacticas", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  nombre: varchar("nombre", { length: 200 }).notNull(),
  categoriaMin: integer("categoria_min").notNull().default(5),
  situacion: varchar("situacion", { length: 100 }),
  descripcionMd: text("descripcion_md"),
  diagramaSvg: text("diagrama_svg"),
});

export const drills = pgTable("drills", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  nombre: varchar("nombre", { length: 200 }).notNull(),
  modalidad: varchar("modalidad", { length: 20 }).notNull(), // solo | pareja | cuadro
  categoriaMin: integer("categoria_min").notNull().default(6),
  golpesTrabajados: text("golpes_trabajados").array().default([]),
  duracionMin: integer("duracion_min"),
  descripcionMd: text("descripcion_md"),
  videoUrl: text("video_url"),
  pasos: jsonb("pasos"), // [{numero, duracion, descripcion}]
});

export const categorias = pgTable("categorias", {
  id: integer("id").primaryKey(), // 1-6
  nombre: varchar("nombre", { length: 100 }).notNull(),
  descripcion: text("descripcion"),
  porcentajeJugadores: real("porcentaje_jugadores"),
  tiempoPromedioMeses: varchar("tiempo_promedio_meses", { length: 20 }),
  frecuenciaRecomendada: varchar("frecuencia_recomendada", { length: 50 }),
  golpesDomina: jsonb("golpes_domina"), // [{slug, descripcion}]
  golpesParaSubir: jsonb("golpes_para_subir"), // [{slug, descripcion, prioridad}]
  tacticasIncorporar: text("tacticas_incorporar").array().default([]),
  perfilPalaRecomendado: jsonb("perfil_pala_recomendado"),
  descripcionMd: text("descripcion_md"),
});

export const torneos = pgTable(
  "torneos",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: varchar("slug", { length: 200 }).notNull().unique(),
    circuito: varchar("circuito", { length: 100 }).notNull(), // premier-padel | a1-padel | fpch | chile-amateur
    nombre: varchar("nombre", { length: 300 }).notNull(),
    categoriaTarget: integer("categoria_target"),
    fechaInicio: timestamp("fecha_inicio").notNull(),
    fechaFin: timestamp("fecha_fin"),
    ciudad: varchar("ciudad", { length: 100 }),
    pais: varchar("pais", { length: 10 }).default("CL"),
    premioClp: integer("premio_clp"),
    precioInscripcionClp: integer("precio_inscripcion_clp"),
    capacidadParejas: integer("capacidad_parejas"),
    superficie: varchar("superficie", { length: 50 }),
    estado: varchar("estado", { length: 30 }).default("abierto"), // abierto | cerrado | finalizado
    linkInscripcion: text("link_inscripcion"),
    descripcionMd: text("descripcion_md"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => [index("torneos_fecha_idx").on(t.fechaInicio), index("torneos_ciudad_idx").on(t.ciudad)]
);

export const articulos = pgTable("articulos", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: varchar("slug", { length: 300 }).notNull().unique(),
  titulo: varchar("titulo", { length: 400 }).notNull(),
  autorId: uuid("autor_id"),
  contenidoMd: text("contenido_md").notNull(),
  extracto: text("extracto"),
  palabrasClave: text("palabras_clave").array().default([]),
  imagen: text("imagen"),
  publicadoAt: timestamp("publicado_at"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ============================================================
// RELATIONS
// ============================================================

// ============================================================
// RETIROS & CAMPS
// ============================================================

export const operadores = pgTable("operadores", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  nombreEmpresa: varchar("nombre_empresa", { length: 200 }).notNull(),
  rut: varchar("rut", { length: 20 }),
  descripcionMd: text("descripcion_md"),
  logoUrl: text("logo_url"),
  sitioWeb: text("sitio_web"),
  instagram: varchar("instagram", { length: 100 }),
  telefono: varchar("telefono", { length: 30 }),
  paisBase: varchar("pais_base", { length: 10 }).default("CL"),
  estado: varchar("estado", { length: 30 }).notNull().default("pendiente"), // pendiente | verificado | suspendido
  verificadoAt: timestamp("verificado_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const retiros = pgTable(
  "retiros",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    operadorId: uuid("operador_id").notNull().references(() => operadores.id, { onDelete: "cascade" }),
    slug: varchar("slug", { length: 300 }).notNull().unique(),
    titulo: varchar("titulo", { length: 300 }).notNull(),
    subtitulo: varchar("subtitulo", { length: 400 }),
    descripcionMd: text("descripcion_md"),
    pais: varchar("pais", { length: 10 }).notNull().default("CL"),
    ciudad: varchar("ciudad", { length: 100 }),
    lugarNombre: varchar("lugar_nombre", { length: 300 }),
    lugarDireccion: text("lugar_direccion"),
    lat: real("lat"),
    lng: real("lng"),
    genero: varchar("genero", { length: 20 }).notNull().default("mixto"), // mixto | hombres | mujeres
    nivelMin: integer("nivel_min").notNull().default(1),
    nivelMax: integer("nivel_max").notNull().default(6),
    diasDuracion: integer("dias_duracion").notNull(),
    nochesDuracion: integer("noches_duracion"),
    imagenPrincipal: text("imagen_principal"),
    imagenes: text("imagenes").array().default([]),
    incluyeJson: jsonb("incluye_json"), // [{icono, texto}]
    noIncluyeJson: jsonb("no_incluye_json"),
    idiomas: text("idiomas").array().default(["es"]),
    estado: varchar("estado", { length: 30 }).notNull().default("borrador"), // borrador | en_revision | publicado | pausado | archivado
    destacado: boolean("destacado").default(false),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (t) => [
    index("retiros_operador_idx").on(t.operadorId),
    index("retiros_pais_idx").on(t.pais),
    index("retiros_genero_idx").on(t.genero),
  ]
);

export const retiroEdiciones = pgTable(
  "retiro_ediciones",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    retiroId: uuid("retiro_id").notNull().references(() => retiros.id, { onDelete: "cascade" }),
    nombre: varchar("nombre", { length: 200 }),
    fechaInicio: timestamp("fecha_inicio").notNull(),
    fechaFin: timestamp("fecha_fin").notNull(),
    cupoTotal: integer("cupo_total").notNull(),
    cupoDisponible: integer("cupo_disponible").notNull(),
    precioClp: integer("precio_clp").notNull(),
    precioDolar: real("precio_dolar"),
    precioEuro: real("precio_euro"),
    moneda: varchar("moneda", { length: 5 }).notNull().default("CLP"),
    habitacionTipo: varchar("habitacion_tipo", { length: 50 }), // individual | doble | compartida
    estado: varchar("estado", { length: 30 }).notNull().default("abierta"), // abierta | cerrada | agotada | cancelada
    notas: text("notas"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => [index("retiro_ediciones_retiro_idx").on(t.retiroId), index("retiro_ediciones_fecha_idx").on(t.fechaInicio)]
);

export const retiroItinerario = pgTable("retiro_itinerario", {
  id: uuid("id").primaryKey().defaultRandom(),
  retiroId: uuid("retiro_id").notNull().references(() => retiros.id, { onDelete: "cascade" }),
  dia: integer("dia").notNull(), // 1, 2, 3...
  horaInicio: varchar("hora_inicio", { length: 5 }),
  horaFin: varchar("hora_fin", { length: 5 }),
  titulo: varchar("titulo", { length: 200 }).notNull(),
  descripcion: text("descripcion"),
  tipo: varchar("tipo", { length: 30 }).default("actividad"), // actividad | comida | descanso | traslado
  orden: integer("orden").default(0),
});

export const retiroCoaches = pgTable("retiro_coaches", {
  id: uuid("id").primaryKey().defaultRandom(),
  retiroId: uuid("retiro_id").notNull().references(() => retiros.id, { onDelete: "cascade" }),
  coachId: uuid("coach_id").references(() => coaches.id),
  nombreExterno: varchar("nombre_externo", { length: 200 }),
  rolEnRetiro: varchar("rol_en_retiro", { length: 100 }),
  bioCorta: text("bio_corta"),
  imagenUrl: text("imagen_url"),
});

export const retiroServiciosExtras = pgTable("retiro_servicios_extras", {
  id: uuid("id").primaryKey().defaultRandom(),
  retiroId: uuid("retiro_id").notNull().references(() => retiros.id, { onDelete: "cascade" }),
  nombre: varchar("nombre", { length: 200 }).notNull(),
  descripcion: text("descripcion"),
  precioClp: integer("precio_clp").notNull(),
  obligatorio: boolean("obligatorio").default(false),
});

export const retiroConsultas = pgTable(
  "retiro_consultas",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    edicionId: uuid("edicion_id").notNull().references(() => retiroEdiciones.id),
    retiroId: uuid("retiro_id").notNull().references(() => retiros.id),
    nombre: varchar("nombre", { length: 200 }).notNull(),
    email: varchar("email", { length: 300 }).notNull(),
    telefono: varchar("telefono", { length: 30 }),
    mensaje: text("mensaje"),
    participantes: integer("participantes").default(1),
    userId: uuid("user_id").references(() => users.id),
    estado: varchar("estado", { length: 30 }).notNull().default("nueva"), // nueva | respondida | convertida | descartada
    respondidaAt: timestamp("respondida_at"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => [index("retiro_consultas_edicion_idx").on(t.edicionId)]
);

export const retiroReservas = pgTable(
  "retiro_reservas",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    edicionId: uuid("edicion_id").notNull().references(() => retiroEdiciones.id),
    retiroId: uuid("retiro_id").notNull().references(() => retiros.id),
    consultaId: uuid("consulta_id").references(() => retiroConsultas.id),
    userId: uuid("user_id").references(() => users.id),
    nombre: varchar("nombre", { length: 200 }).notNull(),
    email: varchar("email", { length: 300 }).notNull(),
    telefono: varchar("telefono", { length: 30 }),
    participantes: integer("participantes").notNull().default(1),
    habitacionTipo: varchar("habitacion_tipo", { length: 50 }),
    extrasSeleccionados: jsonb("extras_seleccionados"),
    totalClp: integer("total_clp").notNull(),
    montoSeniaClp: integer("monto_senia_clp"),
    estadoPago: varchar("estado_pago", { length: 30 }).notNull().default("pendiente"), // pendiente | senia_pagada | pagado | reembolsado
    estadoReserva: varchar("estado_reserva", { length: 30 }).notNull().default("confirmada"), // confirmada | cancelada | lista_espera
    notas: text("notas"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => [index("retiro_reservas_edicion_idx").on(t.edicionId)]
);

export const retiroMensajes = pgTable("retiro_mensajes", {
  id: uuid("id").primaryKey().defaultRandom(),
  consultaId: uuid("consulta_id").references(() => retiroConsultas.id),
  reservaId: uuid("reserva_id").references(() => retiroReservas.id),
  autorId: uuid("autor_id").references(() => users.id),
  autorTipo: varchar("autor_tipo", { length: 20 }).notNull(), // operador | cliente
  contenido: text("contenido").notNull(),
  leido: boolean("leido").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const retiroReviews = pgTable("retiro_reviews", {
  id: uuid("id").primaryKey().defaultRandom(),
  retiroId: uuid("retiro_id").notNull().references(() => retiros.id, { onDelete: "cascade" }),
  reservaId: uuid("reserva_id").references(() => retiroReservas.id),
  userId: uuid("user_id").references(() => users.id),
  nombre: varchar("nombre", { length: 200 }),
  ratingTotal: integer("rating_total").notNull(), // 1-5
  ratingCoaches: integer("rating_coaches"),
  ratingAlojamiento: integer("rating_alojamiento"),
  ratingOrganizacion: integer("rating_organizacion"),
  ratingRelacionCalidadPrecio: integer("rating_relacion_calidad_precio"),
  comentario: text("comentario"),
  publicado: boolean("publicado").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============================================================
// ADMINISTRADORES DE CANCHAS
// ============================================================

export const canchaAdmins = pgTable(
  "cancha_admins",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    clubId: uuid("club_id").notNull().references(() => clubes.id, { onDelete: "cascade" }),
    cargo: varchar("cargo", { length: 100 }),
    permisos: text("permisos").array().default(["lectura"]), // lectura | edicion | reservas | precios | admin
    activo: boolean("activo").default(true),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => [
    uniqueIndex("cancha_admins_user_club_idx").on(t.userId, t.clubId),
    index("cancha_admins_club_idx").on(t.clubId),
  ]
);

export const canchaHorarios = pgTable(
  "cancha_horarios",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    clubId: uuid("club_id").notNull().references(() => clubes.id, { onDelete: "cascade" }),
    canchaNumero: integer("cancha_numero").notNull().default(1),
    diaSemana: integer("dia_semana").notNull(), // 0=dom...6=sab
    horaInicio: varchar("hora_inicio", { length: 5 }).notNull(),
    horaFin: varchar("hora_fin", { length: 5 }).notNull(),
    duracionSlotMin: integer("duracion_slot_min").notNull().default(90),
    precioClp: integer("precio_clp").notNull(),
    tipo: varchar("tipo", { length: 30 }).notNull().default("regular"), // regular | prime | nocturno
    disponible: boolean("disponible").default(true),
  },
  (t) => [index("cancha_horarios_club_dia_idx").on(t.clubId, t.diaSemana)]
);

export const canchaReservas = pgTable(
  "cancha_reservas",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    clubId: uuid("club_id").notNull().references(() => clubes.id, { onDelete: "cascade" }),
    canchaNumero: integer("cancha_numero").notNull().default(1),
    userId: uuid("user_id").references(() => users.id),
    nombre: varchar("nombre", { length: 200 }).notNull(),
    email: varchar("email", { length: 300 }),
    telefono: varchar("telefono", { length: 30 }),
    fecha: timestamp("fecha").notNull(),
    horaInicio: varchar("hora_inicio", { length: 5 }).notNull(),
    horaFin: varchar("hora_fin", { length: 5 }).notNull(),
    duracionMin: integer("duracion_min").notNull().default(90),
    precioClp: integer("precio_clp").notNull(),
    estadoPago: varchar("estado_pago", { length: 30 }).notNull().default("pendiente"), // pendiente | pagado | reembolsado
    estadoReserva: varchar("estado_reserva", { length: 30 }).notNull().default("confirmada"), // confirmada | cancelada | no_presentado
    notasAdmin: text("notas_admin"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => [
    index("cancha_reservas_club_fecha_idx").on(t.clubId, t.fecha),
    index("cancha_reservas_user_idx").on(t.userId),
  ]
);

export const canchaNotificaciones = pgTable("cancha_notificaciones", {
  id: uuid("id").primaryKey().defaultRandom(),
  clubId: uuid("club_id").notNull().references(() => clubes.id, { onDelete: "cascade" }),
  userId: uuid("user_id").references(() => users.id),
  tipo: varchar("tipo", { length: 50 }).notNull(), // nueva_reserva | cancelacion | review | recordatorio
  titulo: varchar("titulo", { length: 300 }).notNull(),
  mensaje: text("mensaje"),
  leida: boolean("leida").default(false),
  referenciaId: uuid("referencia_id"),
  referenciaTabla: varchar("referencia_tabla", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============================================================
// RELATIONS
// ============================================================

export const palasRelations = relations(palas, ({ many }) => ({
  precios: many(preciosPalas),
  reviews: many(reviewsPalas),
  alertas: many(alertasPrecio),
}));

export const preciosPalasRelations = relations(preciosPalas, ({ one }) => ({
  pala: one(palas, { fields: [preciosPalas.palaId], references: [palas.id] }),
  tienda: one(tiendas, { fields: [preciosPalas.tiendaId], references: [tiendas.id] }),
}));

export const clubesRelations = relations(clubes, ({ many }) => ({
  precios: many(preciosCanchas),
  reviews: many(reviewsCanchas),
  admins: many(canchaAdmins),
  horarios: many(canchaHorarios),
  reservas: many(canchaReservas),
}));

export const operadoresRelations = relations(operadores, ({ one, many }) => ({
  user: one(users, { fields: [operadores.userId], references: [users.id] }),
  retiros: many(retiros),
}));

export const retirosRelations = relations(retiros, ({ one, many }) => ({
  operador: one(operadores, { fields: [retiros.operadorId], references: [operadores.id] }),
  ediciones: many(retiroEdiciones),
  itinerario: many(retiroItinerario),
  coaches: many(retiroCoaches),
  extras: many(retiroServiciosExtras),
  reviews: many(retiroReviews),
}));

export const retiroEdicionesRelations = relations(retiroEdiciones, ({ one, many }) => ({
  retiro: one(retiros, { fields: [retiroEdiciones.retiroId], references: [retiros.id] }),
  consultas: many(retiroConsultas),
  reservas: many(retiroReservas),
}));

// ============================================================
// PROFES
// ============================================================

export const profeGeneroEnum = pgEnum("profe_genero", ["hombre", "mujer", "no_binario", "no_declarado"]);
export const profeEstadoEnum = pgEnum("profe_estado", ["borrador", "pendiente_verificacion", "activo", "pausado", "suspendido"]);
export const profePlanDestacadoEnum = pgEnum("profe_plan_destacado", ["basico", "pro", "elite"]);
export const profeCancelacionEnum = pgEnum("profe_cancelacion", ["flexible_24h", "moderada_48h", "estricta_72h"]);
export const profeDisponibilidadTipoEnum = pgEnum("profe_disponibilidad_tipo", ["regular", "excepcion"]);
export const profeContactoViaEnum = pgEnum("profe_contacto_via", ["whatsapp", "email", "plataforma"]);
export const profeReservaEstadoEnum = pgEnum("profe_reserva_estado", [
  "consulta", "confirmada", "pagada", "completada",
  "cancelada_alumno", "cancelada_profe", "no_show",
]);

export const profes = pgTable(
  "profes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: varchar("slug", { length: 200 }).notNull().unique(),
    userId: uuid("user_id").references(() => users.id),

    // IDENTIDAD
    nombre: varchar("nombre", { length: 200 }).notNull(),
    apellido: varchar("apellido", { length: 200 }).notNull(),
    genero: profeGeneroEnum("genero").notNull().default("no_declarado"),
    fotoPrincipal: text("foto_principal"),
    fotos: text("fotos").array().default([]),
    videoPresentacionUrl: text("video_presentacion_url"),

    // UBICACIÓN
    ciudad: varchar("ciudad", { length: 100 }).notNull(),
    comuna: varchar("comuna", { length: 100 }),
    pais: varchar("pais", { length: 10 }).notNull().default("CL"),
    lat: real("lat"),
    lng: real("lng"),
    radioDesplazamientoKm: integer("radio_desplazamiento_km").default(15),
    clubesDondeDaClase: uuid("clubes_donde_da_clase").array().default([]),
    atiendeOnline: boolean("atiende_online").default(false),

    // PROFESIONAL
    bioCorta: varchar("bio_corta", { length: 300 }),
    bioMd: text("bio_md"),
    anosExperiencia: integer("anos_experiencia").default(0),
    exJugadorPro: boolean("ex_jugador_pro").default(false),
    exJugadorProCircuito: varchar("ex_jugador_pro_circuito", { length: 100 }),
    certificaciones: text("certificaciones").array().default([]),
    idiomas: text("idiomas").array().default(["es"]),

    // COMPETENCIA
    categoriasQueEnsena: integer("categorias_que_ensena").array().default([]),
    especialidades: text("especialidades").array().default([]),
    modalidades: text("modalidades").array().default([]),

    // PRECIOS (CLP)
    precioIndividual60min: integer("precio_individual_60min"),
    precioIndividual90min: integer("precio_individual_90min"),
    precioPareja60min: integer("precio_pareja_60min"),
    precioGrupo60min: integer("precio_grupo_60min"),
    precioClinica60min: integer("precio_clinica_60min"),
    precioVideoAnalisis: integer("precio_video_analisis"),
    monedaBase: varchar("moneda_base", { length: 5 }).default("CLP"),
    permitePaquetes: boolean("permite_paquetes").default(false),
    descuentoPaquete10Pct: integer("descuento_paquete_10_pct"),

    // PERFIL EDITORIAL
    sobreMiMd: text("sobre_mi_md"),
    metodologiaMd: text("metodologia_md"),

    // CONTACTO
    whatsapp: varchar("whatsapp", { length: 30 }),
    email: varchar("email", { length: 300 }),
    instagram: varchar("instagram", { length: 100 }),
    telefonoVisible: boolean("telefono_visible").default(false),

    // BOOKING
    aceptaBookingIntegrado: boolean("acepta_booking_integrado").default(false),
    comisionPct: integer("comision_pct").default(10),
    stripeAccountId: varchar("stripe_account_id", { length: 200 }),
    anticipacionMinimaHoras: integer("anticipacion_minima_horas").default(24),
    cancelacionPolitica: profeCancelacionEnum("cancelacion_politica").default("moderada_48h"),

    // VERIFICACIÓN
    verificado: boolean("verificado").default(false),
    verificadoAt: timestamp("verificado_at"),
    verificadoByAdminId: uuid("verificado_by_admin_id"),
    documentoVerificacionUrl: text("documento_verificacion_url"),
    certificacionVerificada: boolean("certificacion_verificada").default(false),

    // FLAGS COMERCIALES
    destacado: boolean("destacado").default(false),
    destacadoHasta: date("destacado_hasta"),
    planDestacado: profePlanDestacadoEnum("plan_destacado"),
    nuevo: boolean("nuevo").default(true),

    // ESTADO
    estado: profeEstadoEnum("estado").notNull().default("borrador"),

    // STATS
    ratingPromedio: real("rating_promedio"),
    reviewsCount: integer("reviews_count").default(0),
    clasesDadasCount: integer("clases_dadas_count").default(0),
    alumnosRecurrentesCount: integer("alumnos_recurrentes_count").default(0),
    respuestaPromedioHoras: real("respuesta_promedio_horas"),

    // SEO
    metaTitulo: varchar("meta_titulo", { length: 200 }),
    metaDescripcion: varchar("meta_descripcion", { length: 300 }),

    createdAt: timestamp("created_at").defaultNow(),
    publishedAt: timestamp("published_at"),
    lastActiveAt: timestamp("last_active_at"),
  },
  (t) => [
    index("profes_ciudad_idx").on(t.ciudad),
    index("profes_estado_idx").on(t.estado),
    index("profes_destacado_idx").on(t.destacado),
  ]
);

export const profeDisponibilidad = pgTable(
  "profe_disponibilidad",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    profeId: uuid("profe_id").notNull().references(() => profes.id, { onDelete: "cascade" }),
    diaSemana: integer("dia_semana").notNull(), // 0=dom...6=sab
    horaInicio: time("hora_inicio").notNull(),
    horaFin: time("hora_fin").notNull(),
    vigentaDesde: date("vigente_desde"),
    vigentaHasta: date("vigente_hasta"),
    tipo: profeDisponibilidadTipoEnum("tipo").notNull().default("regular"),
    activo: boolean("activo").default(true),
  },
  (t) => [index("profe_disp_profe_idx").on(t.profeId)]
);

export const profeBloqueos = pgTable(
  "profe_bloqueos",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    profeId: uuid("profe_id").notNull().references(() => profes.id, { onDelete: "cascade" }),
    fechaInicio: timestamp("fecha_inicio").notNull(),
    fechaFin: timestamp("fecha_fin").notNull(),
    motivo: varchar("motivo", { length: 200 }),
  },
  (t) => [index("profe_bloqueos_profe_idx").on(t.profeId)]
);

export const profeConsultas = pgTable(
  "profe_consultas",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    profeId: uuid("profe_id").notNull().references(() => profes.id, { onDelete: "cascade" }),
    userId: uuid("user_id").references(() => users.id),
    email: varchar("email", { length: 300 }).notNull(),
    nombre: varchar("nombre", { length: 200 }).notNull(),
    telefono: varchar("telefono", { length: 30 }),
    categoriaAlumno: integer("categoria_alumno"),
    modalidadSolicitada: varchar("modalidad_solicitada", { length: 50 }),
    mensaje: text("mensaje").notNull(),
    respondida: boolean("respondida").default(false),
    respondidaAt: timestamp("respondida_at"),
    contactoVia: profeContactoViaEnum("contacto_via").default("plataforma"),
    reviewSolicitadaAt: timestamp("review_solicitada_at"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => [
    index("profe_consultas_profe_idx").on(t.profeId),
    index("profe_consultas_user_idx").on(t.userId),
  ]
);

export const profeReservas = pgTable(
  "profe_reservas",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    profeId: uuid("profe_id").notNull().references(() => profes.id, { onDelete: "cascade" }),
    userId: uuid("user_id").references(() => users.id),
    consultaId: uuid("consulta_id").references(() => profeConsultas.id),
    fechaClase: timestamp("fecha_clase").notNull(),
    duracionMin: integer("duracion_min").notNull().default(60),
    modalidad: varchar("modalidad", { length: 50 }),
    lugar: varchar("lugar", { length: 300 }),
    clubId: uuid("club_id").references(() => clubes.id),
    cantidadAlumnos: integer("cantidad_alumnos").default(1),
    attendeesJson: jsonb("attendees_json"),
    montoSubtotal: integer("monto_subtotal"),
    montoComision: integer("monto_comision"),
    montoTotal: integer("monto_total"),
    moneda: varchar("moneda", { length: 5 }).default("CLP"),
    stripePaymentIntentId: varchar("stripe_payment_intent_id", { length: 200 }),
    estado: profeReservaEstadoEnum("estado").notNull().default("consulta"),
    canceladaAt: timestamp("cancelada_at"),
    motivoCancelacion: text("motivo_cancelacion"),
    notasAlumno: text("notas_alumno"),
    notasProfePostClase: text("notas_profe_post_clase"),
    createdAt: timestamp("created_at").defaultNow(),
    completadaAt: timestamp("completada_at"),
  },
  (t) => [
    index("profe_reservas_profe_idx").on(t.profeId),
    index("profe_reservas_user_idx").on(t.userId),
    index("profe_reservas_fecha_idx").on(t.fechaClase),
  ]
);

export const profeMensajes = pgTable(
  "profe_mensajes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    reservaId: uuid("reserva_id").notNull().references(() => profeReservas.id, { onDelete: "cascade" }),
    autorUserId: uuid("autor_user_id").references(() => users.id),
    contenido: text("contenido").notNull(),
    leidoAt: timestamp("leido_at"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => [index("profe_mensajes_reserva_idx").on(t.reservaId)]
);

export const profeAlumnoRelacion = pgTable(
  "profe_alumno_relacion",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    profeId: uuid("profe_id").notNull().references(() => profes.id, { onDelete: "cascade" }),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    categoriaInicial: integer("categoria_inicial"),
    categoriaActual: integer("categoria_actual"),
    primeraClaseFecha: timestamp("primera_clase_fecha"),
    ultimaClaseFecha: timestamp("ultima_clase_fecha"),
    totalClases: integer("total_clases").default(0),
    objetivoActualMd: text("objetivo_actual_md"),
    notasMd: text("notas_md"),
    activo: boolean("activo").default(true),
  },
  (t) => [
    uniqueIndex("profe_alumno_unique_idx").on(t.profeId, t.userId),
    index("profe_alumno_profe_idx").on(t.profeId),
  ]
);

export const profeReviews = pgTable(
  "profe_reviews",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    profeId: uuid("profe_id").notNull().references(() => profes.id, { onDelete: "cascade" }),
    userId: uuid("user_id").notNull().references(() => users.id),
    reservaId: uuid("reserva_id").references(() => profeReservas.id),
    rating: integer("rating").notNull(), // 1-5
    ratingTecnica: integer("rating_tecnica"),
    ratingComunicacion: integer("rating_comunicacion"),
    ratingPuntualidad: integer("rating_puntualidad"),
    ratingRelacionCalidadPrecio: integer("rating_relacion_calidad_precio"),
    titulo: varchar("titulo", { length: 200 }),
    comentario: text("comentario"),
    clasesTomadas: integer("clases_tomadas").default(1),
    respondidaPorProfeMd: text("respondida_por_profe_md"),
    aprobada: boolean("aprobada").default(false),
    publicadoAt: timestamp("publicado_at"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => [
    index("profe_reviews_profe_idx").on(t.profeId),
    uniqueIndex("profe_reviews_user_reserva_idx").on(t.userId, t.reservaId),
  ]
);

export const certificacionesCatalogo = pgTable("certificaciones_catalogo", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  nombre: varchar("nombre", { length: 200 }).notNull(),
  organismo: varchar("organismo", { length: 200 }),
  pais: varchar("pais", { length: 10 }),
  pesoCredibilidad: integer("peso_credibilidad").default(50), // 0-100
});

export const profeGuardados = pgTable(
  "profe_guardados",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    profeId: uuid("profe_id").notNull().references(() => profes.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => [uniqueIndex("profe_guardados_unique_idx").on(t.userId, t.profeId)]
);

// Relations profes
export const profesRelations = relations(profes, ({ one, many }) => ({
  user: one(users, { fields: [profes.userId], references: [users.id] }),
  disponibilidad: many(profeDisponibilidad),
  bloqueos: many(profeBloqueos),
  consultas: many(profeConsultas),
  reservas: many(profeReservas),
  alumnos: many(profeAlumnoRelacion),
  reviews: many(profeReviews),
  guardados: many(profeGuardados),
}));

export const profeReservasRelations = relations(profeReservas, ({ one, many }) => ({
  profe: one(profes, { fields: [profeReservas.profeId], references: [profes.id] }),
  user: one(users, { fields: [profeReservas.userId], references: [users.id] }),
  mensajes: many(profeMensajes),
}));

export const profeConsultasRelations = relations(profeConsultas, ({ one }) => ({
  profe: one(profes, { fields: [profeConsultas.profeId], references: [profes.id] }),
  user: one(users, { fields: [profeConsultas.userId], references: [users.id] }),
}));

export const profeAlumnoRelacionRelations = relations(profeAlumnoRelacion, ({ one }) => ({
  profe: one(profes, { fields: [profeAlumnoRelacion.profeId], references: [profes.id] }),
  user: one(users, { fields: [profeAlumnoRelacion.userId], references: [users.id] }),
}));

// ============================================================
// ADMIN LOGS — audit trail de cambios sensibles
// ============================================================

export const adminLogs = pgTable("admin_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  adminId: uuid("admin_id").notNull().references(() => users.id),
  targetUserId: uuid("target_user_id").notNull().references(() => users.id),
  accion: varchar("accion", { length: 100 }).notNull(), // "cambio_rol"
  valorAnterior: varchar("valor_anterior", { length: 100 }),
  valorNuevo: varchar("valor_nuevo", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
},
(t) => [index("admin_logs_admin_idx").on(t.adminId), index("admin_logs_target_idx").on(t.targetUserId)]
);
