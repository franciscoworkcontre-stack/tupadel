import {
  pgTable,
  text,
  integer,
  real,
  boolean,
  timestamp,
  jsonb,
  uuid,
  varchar,
  decimal,
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
}));
