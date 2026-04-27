CREATE TABLE "alertas_precio" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"email" varchar(300) NOT NULL,
	"pala_id" uuid NOT NULL,
	"precio_objetivo" integer NOT NULL,
	"activa" boolean DEFAULT true,
	"disparada_at" timestamp,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "articulos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(300) NOT NULL,
	"titulo" varchar(400) NOT NULL,
	"autor_id" uuid,
	"contenido_md" text NOT NULL,
	"extracto" text,
	"palabras_clave" text[] DEFAULT '{}',
	"imagen" text,
	"publicado_at" timestamp,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "articulos_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "buscar_companero" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"ciudad" varchar(100) NOT NULL,
	"comuna" varchar(100),
	"categoria" integer NOT NULL,
	"horarios_json" jsonb,
	"modalidad" varchar(20) DEFAULT 'esporadico',
	"descripcion" text,
	"nombre" varchar(200),
	"contacto" varchar(200),
	"vigente" boolean DEFAULT true,
	"vigente_hasta" timestamp,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "cancha_admins" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"club_id" uuid NOT NULL,
	"cargo" varchar(100),
	"permisos" text[] DEFAULT '{"lectura"}',
	"activo" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "cancha_horarios" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"club_id" uuid NOT NULL,
	"cancha_numero" integer DEFAULT 1 NOT NULL,
	"dia_semana" integer NOT NULL,
	"hora_inicio" varchar(5) NOT NULL,
	"hora_fin" varchar(5) NOT NULL,
	"duracion_slot_min" integer DEFAULT 90 NOT NULL,
	"precio_clp" integer NOT NULL,
	"tipo" varchar(30) DEFAULT 'regular' NOT NULL,
	"disponible" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "cancha_notificaciones" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"club_id" uuid NOT NULL,
	"user_id" uuid,
	"tipo" varchar(50) NOT NULL,
	"titulo" varchar(300) NOT NULL,
	"mensaje" text,
	"leida" boolean DEFAULT false,
	"referencia_id" uuid,
	"referencia_tabla" varchar(50),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "cancha_reservas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"club_id" uuid NOT NULL,
	"cancha_numero" integer DEFAULT 1 NOT NULL,
	"user_id" uuid,
	"nombre" varchar(200) NOT NULL,
	"email" varchar(300),
	"telefono" varchar(30),
	"fecha" timestamp NOT NULL,
	"hora_inicio" varchar(5) NOT NULL,
	"hora_fin" varchar(5) NOT NULL,
	"duracion_min" integer DEFAULT 90 NOT NULL,
	"precio_clp" integer NOT NULL,
	"estado_pago" varchar(30) DEFAULT 'pendiente' NOT NULL,
	"estado_reserva" varchar(30) DEFAULT 'confirmada' NOT NULL,
	"notas_admin" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "categorias" (
	"id" integer PRIMARY KEY NOT NULL,
	"nombre" varchar(100) NOT NULL,
	"descripcion" text,
	"porcentaje_jugadores" real,
	"tiempo_promedio_meses" varchar(20),
	"frecuencia_recomendada" varchar(50),
	"golpes_domina" jsonb,
	"golpes_para_subir" jsonb,
	"tacticas_incorporar" text[] DEFAULT '{}',
	"perfil_pala_recomendado" jsonb,
	"descripcion_md" text
);
--> statement-breakpoint
CREATE TABLE "clubes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(200) NOT NULL,
	"nombre" varchar(200) NOT NULL,
	"ciudad" varchar(100) NOT NULL,
	"comuna" varchar(100),
	"direccion" text,
	"lat" real,
	"lng" real,
	"telefono" varchar(30),
	"whatsapp" varchar(30),
	"instagram" varchar(100),
	"website" text,
	"indoor" boolean DEFAULT false,
	"outdoor" boolean DEFAULT false,
	"cantidad_canchas" integer,
	"muro" varchar(50),
	"cesped" varchar(50),
	"servicios" text[] DEFAULT '{}',
	"horario_json" jsonb,
	"imagenes" text[] DEFAULT '{}',
	"rating_promedio" real,
	"total_reviews" integer DEFAULT 0,
	"reclamado_por" uuid,
	"verificado" boolean DEFAULT false,
	"activo" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "clubes_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "coaches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(200) NOT NULL,
	"nombre" varchar(200) NOT NULL,
	"ciudad" varchar(100) NOT NULL,
	"certificaciones" text[] DEFAULT '{}',
	"niveles_que_trabaja" integer[] DEFAULT '{}',
	"modalidades" text[] DEFAULT '{}',
	"precio_hora_clp" integer,
	"contacto_json" jsonb,
	"bio_md" text,
	"imagen" text,
	"rating" real,
	"total_alumnos" integer DEFAULT 0,
	"destacado" boolean DEFAULT false,
	"reclamado_por" uuid,
	"activo" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "coaches_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "diagnosticos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"token" varchar(64) NOT NULL,
	"email" varchar(300),
	"respuestas_json" jsonb NOT NULL,
	"categoria_estimada" integer NOT NULL,
	"confianza" real,
	"areas_mejora" text[] DEFAULT '{}',
	"realizado_at" timestamp DEFAULT now(),
	CONSTRAINT "diagnosticos_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "drills" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(200) NOT NULL,
	"nombre" varchar(200) NOT NULL,
	"modalidad" varchar(20) NOT NULL,
	"categoria_min" integer DEFAULT 6 NOT NULL,
	"golpes_trabajados" text[] DEFAULT '{}',
	"duracion_min" integer,
	"descripcion_md" text,
	"video_url" text,
	"pasos" jsonb,
	CONSTRAINT "drills_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "favoritos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"tipo" varchar(20) NOT NULL,
	"referencia_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "golpes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(200) NOT NULL,
	"nombre" varchar(200) NOT NULL,
	"categoria_min" integer DEFAULT 6 NOT NULL,
	"dificultad" varchar(30),
	"descripcion_md" text,
	"video_url" text,
	"imagen" text,
	"errores_comunes_md" text,
	"orden" integer DEFAULT 0,
	CONSTRAINT "golpes_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "operadores" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"slug" varchar(200) NOT NULL,
	"nombre_empresa" varchar(200) NOT NULL,
	"rut" varchar(20),
	"descripcion_md" text,
	"logo_url" text,
	"sitio_web" text,
	"instagram" varchar(100),
	"telefono" varchar(30),
	"pais_base" varchar(10) DEFAULT 'CL',
	"estado" varchar(30) DEFAULT 'pendiente' NOT NULL,
	"verificado_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "operadores_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "palas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(200) NOT NULL,
	"nombre" varchar(200) NOT NULL,
	"marca" varchar(100) NOT NULL,
	"modelo" varchar(150) NOT NULL,
	"anio" integer NOT NULL,
	"forma" varchar(50) NOT NULL,
	"nivel_min" integer DEFAULT 1 NOT NULL,
	"nivel_max" integer DEFAULT 6 NOT NULL,
	"peso_min" integer,
	"peso_max" integer,
	"balance" varchar(50),
	"nucleo" varchar(100),
	"cara" varchar(100),
	"perfil" integer,
	"perfil_potencia" integer,
	"perfil_control" integer,
	"perfil_salida" integer,
	"score_editorial" real,
	"descripcion_md" text,
	"pros" text[] DEFAULT '{}',
	"contras" text[] DEFAULT '{}',
	"imagen_principal" text,
	"imagenes" text[] DEFAULT '{}',
	"jugadores_pro" text[] DEFAULT '{}',
	"publicada" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "palas_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "palas_usadas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pala_id" uuid,
	"fuente" varchar(50) NOT NULL,
	"precio_clp" integer NOT NULL,
	"condicion" varchar(50),
	"vendedor" varchar(200),
	"ciudad" varchar(100),
	"url" text NOT NULL,
	"publicado_at" timestamp,
	"vigente" boolean DEFAULT true,
	"scrapeado_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "partidos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"fecha" timestamp NOT NULL,
	"club_id" uuid,
	"pareja_nombre" varchar(200),
	"pareja_user_id" uuid,
	"rivales_texto" text,
	"resultado" jsonb,
	"pala_usada_id" uuid,
	"notas" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "precios_canchas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"club_id" uuid NOT NULL,
	"dia_semana" integer,
	"hora_inicio" varchar(5) NOT NULL,
	"hora_fin" varchar(5) NOT NULL,
	"precio_hora_clp" integer NOT NULL,
	"tipo" varchar(30) DEFAULT 'regular' NOT NULL,
	"actualizado_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "precios_palas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pala_id" uuid NOT NULL,
	"tienda_id" uuid NOT NULL,
	"precio_clp" integer NOT NULL,
	"precio_original_clp" integer,
	"descuento_pct" real,
	"stock" boolean DEFAULT true,
	"url" text NOT NULL,
	"scrapeado_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "retiro_coaches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"retiro_id" uuid NOT NULL,
	"coach_id" uuid,
	"nombre_externo" varchar(200),
	"rol_en_retiro" varchar(100),
	"bio_corta" text,
	"imagen_url" text
);
--> statement-breakpoint
CREATE TABLE "retiro_consultas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"edicion_id" uuid NOT NULL,
	"retiro_id" uuid NOT NULL,
	"nombre" varchar(200) NOT NULL,
	"email" varchar(300) NOT NULL,
	"telefono" varchar(30),
	"mensaje" text,
	"participantes" integer DEFAULT 1,
	"user_id" uuid,
	"estado" varchar(30) DEFAULT 'nueva' NOT NULL,
	"respondida_at" timestamp,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "retiro_ediciones" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"retiro_id" uuid NOT NULL,
	"nombre" varchar(200),
	"fecha_inicio" timestamp NOT NULL,
	"fecha_fin" timestamp NOT NULL,
	"cupo_total" integer NOT NULL,
	"cupo_disponible" integer NOT NULL,
	"precio_clp" integer NOT NULL,
	"precio_dolar" real,
	"precio_euro" real,
	"moneda" varchar(5) DEFAULT 'CLP' NOT NULL,
	"habitacion_tipo" varchar(50),
	"estado" varchar(30) DEFAULT 'abierta' NOT NULL,
	"notas" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "retiro_itinerario" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"retiro_id" uuid NOT NULL,
	"dia" integer NOT NULL,
	"hora_inicio" varchar(5),
	"hora_fin" varchar(5),
	"titulo" varchar(200) NOT NULL,
	"descripcion" text,
	"tipo" varchar(30) DEFAULT 'actividad',
	"orden" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "retiro_mensajes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"consulta_id" uuid,
	"reserva_id" uuid,
	"autor_id" uuid,
	"autor_tipo" varchar(20) NOT NULL,
	"contenido" text NOT NULL,
	"leido" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "retiro_reservas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"edicion_id" uuid NOT NULL,
	"retiro_id" uuid NOT NULL,
	"consulta_id" uuid,
	"user_id" uuid,
	"nombre" varchar(200) NOT NULL,
	"email" varchar(300) NOT NULL,
	"telefono" varchar(30),
	"participantes" integer DEFAULT 1 NOT NULL,
	"habitacion_tipo" varchar(50),
	"extras_seleccionados" jsonb,
	"total_clp" integer NOT NULL,
	"monto_senia_clp" integer,
	"estado_pago" varchar(30) DEFAULT 'pendiente' NOT NULL,
	"estado_reserva" varchar(30) DEFAULT 'confirmada' NOT NULL,
	"notas" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "retiro_reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"retiro_id" uuid NOT NULL,
	"reserva_id" uuid,
	"user_id" uuid,
	"nombre" varchar(200),
	"rating_total" integer NOT NULL,
	"rating_coaches" integer,
	"rating_alojamiento" integer,
	"rating_organizacion" integer,
	"rating_relacion_calidad_precio" integer,
	"comentario" text,
	"publicado" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "retiro_servicios_extras" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"retiro_id" uuid NOT NULL,
	"nombre" varchar(200) NOT NULL,
	"descripcion" text,
	"precio_clp" integer NOT NULL,
	"obligatorio" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "retiros" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"operador_id" uuid NOT NULL,
	"slug" varchar(300) NOT NULL,
	"titulo" varchar(300) NOT NULL,
	"subtitulo" varchar(400),
	"descripcion_md" text,
	"pais" varchar(10) DEFAULT 'CL' NOT NULL,
	"ciudad" varchar(100),
	"lugar_nombre" varchar(300),
	"lugar_direccion" text,
	"lat" real,
	"lng" real,
	"genero" varchar(20) DEFAULT 'mixto' NOT NULL,
	"nivel_min" integer DEFAULT 1 NOT NULL,
	"nivel_max" integer DEFAULT 6 NOT NULL,
	"dias_duracion" integer NOT NULL,
	"noches_duracion" integer,
	"imagen_principal" text,
	"imagenes" text[] DEFAULT '{}',
	"incluye_json" jsonb,
	"no_incluye_json" jsonb,
	"idiomas" text[] DEFAULT '{"es"}',
	"estado" varchar(30) DEFAULT 'borrador' NOT NULL,
	"destacado" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "retiros_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "reviews_canchas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"club_id" uuid NOT NULL,
	"user_id" uuid,
	"rating" integer NOT NULL,
	"comentario" text,
	"publicado_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "reviews_palas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pala_id" uuid NOT NULL,
	"autor_id" uuid,
	"score_total" real NOT NULL,
	"score_potencia" integer,
	"score_control" integer,
	"score_salida" integer,
	"veredicto_md" text,
	"testeo_horas" real,
	"testeo_superficie" varchar(50),
	"video_url" text,
	"publicado_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "tacticas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(200) NOT NULL,
	"nombre" varchar(200) NOT NULL,
	"categoria_min" integer DEFAULT 5 NOT NULL,
	"situacion" varchar(100),
	"descripcion_md" text,
	"diagrama_svg" text,
	CONSTRAINT "tacticas_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "tiendas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(100) NOT NULL,
	"nombre" varchar(100) NOT NULL,
	"dominio" varchar(200) NOT NULL,
	"logo" text,
	"pais" varchar(10) DEFAULT 'CL' NOT NULL,
	"comision_afiliado_pct" real DEFAULT 0,
	"confiabilidad" integer DEFAULT 5,
	"tiempo_envio_dias" integer,
	"link_afiliado_template" text,
	"activa" boolean DEFAULT true,
	CONSTRAINT "tiendas_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "torneos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(200) NOT NULL,
	"circuito" varchar(100) NOT NULL,
	"nombre" varchar(300) NOT NULL,
	"categoria_target" integer,
	"fecha_inicio" timestamp NOT NULL,
	"fecha_fin" timestamp,
	"ciudad" varchar(100),
	"pais" varchar(10) DEFAULT 'CL',
	"premio_clp" integer,
	"precio_inscripcion_clp" integer,
	"capacidad_parejas" integer,
	"superficie" varchar(50),
	"estado" varchar(30) DEFAULT 'abierto',
	"link_inscripcion" text,
	"descripcion_md" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "torneos_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" varchar(300) NOT NULL,
	"nombre" varchar(200),
	"ciudad" varchar(100),
	"fecha_nacimiento" timestamp,
	"mano_dominante" varchar(10),
	"lado_preferido" varchar(10),
	"pala_actual_id" uuid,
	"categoria_estimada" integer,
	"rol" varchar(30) DEFAULT 'jugador' NOT NULL,
	"avatar_url" text,
	"telefono" varchar(30),
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "alertas_precio" ADD CONSTRAINT "alertas_precio_pala_id_palas_id_fk" FOREIGN KEY ("pala_id") REFERENCES "public"."palas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "buscar_companero" ADD CONSTRAINT "buscar_companero_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cancha_admins" ADD CONSTRAINT "cancha_admins_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cancha_admins" ADD CONSTRAINT "cancha_admins_club_id_clubes_id_fk" FOREIGN KEY ("club_id") REFERENCES "public"."clubes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cancha_horarios" ADD CONSTRAINT "cancha_horarios_club_id_clubes_id_fk" FOREIGN KEY ("club_id") REFERENCES "public"."clubes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cancha_notificaciones" ADD CONSTRAINT "cancha_notificaciones_club_id_clubes_id_fk" FOREIGN KEY ("club_id") REFERENCES "public"."clubes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cancha_notificaciones" ADD CONSTRAINT "cancha_notificaciones_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cancha_reservas" ADD CONSTRAINT "cancha_reservas_club_id_clubes_id_fk" FOREIGN KEY ("club_id") REFERENCES "public"."clubes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cancha_reservas" ADD CONSTRAINT "cancha_reservas_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "diagnosticos" ADD CONSTRAINT "diagnosticos_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favoritos" ADD CONSTRAINT "favoritos_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "operadores" ADD CONSTRAINT "operadores_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "palas_usadas" ADD CONSTRAINT "palas_usadas_pala_id_palas_id_fk" FOREIGN KEY ("pala_id") REFERENCES "public"."palas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "partidos" ADD CONSTRAINT "partidos_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "partidos" ADD CONSTRAINT "partidos_club_id_clubes_id_fk" FOREIGN KEY ("club_id") REFERENCES "public"."clubes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "partidos" ADD CONSTRAINT "partidos_pala_usada_id_palas_id_fk" FOREIGN KEY ("pala_usada_id") REFERENCES "public"."palas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "precios_canchas" ADD CONSTRAINT "precios_canchas_club_id_clubes_id_fk" FOREIGN KEY ("club_id") REFERENCES "public"."clubes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "precios_palas" ADD CONSTRAINT "precios_palas_pala_id_palas_id_fk" FOREIGN KEY ("pala_id") REFERENCES "public"."palas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "precios_palas" ADD CONSTRAINT "precios_palas_tienda_id_tiendas_id_fk" FOREIGN KEY ("tienda_id") REFERENCES "public"."tiendas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "retiro_coaches" ADD CONSTRAINT "retiro_coaches_retiro_id_retiros_id_fk" FOREIGN KEY ("retiro_id") REFERENCES "public"."retiros"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "retiro_coaches" ADD CONSTRAINT "retiro_coaches_coach_id_coaches_id_fk" FOREIGN KEY ("coach_id") REFERENCES "public"."coaches"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "retiro_consultas" ADD CONSTRAINT "retiro_consultas_edicion_id_retiro_ediciones_id_fk" FOREIGN KEY ("edicion_id") REFERENCES "public"."retiro_ediciones"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "retiro_consultas" ADD CONSTRAINT "retiro_consultas_retiro_id_retiros_id_fk" FOREIGN KEY ("retiro_id") REFERENCES "public"."retiros"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "retiro_consultas" ADD CONSTRAINT "retiro_consultas_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "retiro_ediciones" ADD CONSTRAINT "retiro_ediciones_retiro_id_retiros_id_fk" FOREIGN KEY ("retiro_id") REFERENCES "public"."retiros"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "retiro_itinerario" ADD CONSTRAINT "retiro_itinerario_retiro_id_retiros_id_fk" FOREIGN KEY ("retiro_id") REFERENCES "public"."retiros"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "retiro_mensajes" ADD CONSTRAINT "retiro_mensajes_consulta_id_retiro_consultas_id_fk" FOREIGN KEY ("consulta_id") REFERENCES "public"."retiro_consultas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "retiro_mensajes" ADD CONSTRAINT "retiro_mensajes_reserva_id_retiro_reservas_id_fk" FOREIGN KEY ("reserva_id") REFERENCES "public"."retiro_reservas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "retiro_mensajes" ADD CONSTRAINT "retiro_mensajes_autor_id_users_id_fk" FOREIGN KEY ("autor_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "retiro_reservas" ADD CONSTRAINT "retiro_reservas_edicion_id_retiro_ediciones_id_fk" FOREIGN KEY ("edicion_id") REFERENCES "public"."retiro_ediciones"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "retiro_reservas" ADD CONSTRAINT "retiro_reservas_retiro_id_retiros_id_fk" FOREIGN KEY ("retiro_id") REFERENCES "public"."retiros"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "retiro_reservas" ADD CONSTRAINT "retiro_reservas_consulta_id_retiro_consultas_id_fk" FOREIGN KEY ("consulta_id") REFERENCES "public"."retiro_consultas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "retiro_reservas" ADD CONSTRAINT "retiro_reservas_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "retiro_reviews" ADD CONSTRAINT "retiro_reviews_retiro_id_retiros_id_fk" FOREIGN KEY ("retiro_id") REFERENCES "public"."retiros"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "retiro_reviews" ADD CONSTRAINT "retiro_reviews_reserva_id_retiro_reservas_id_fk" FOREIGN KEY ("reserva_id") REFERENCES "public"."retiro_reservas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "retiro_reviews" ADD CONSTRAINT "retiro_reviews_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "retiro_servicios_extras" ADD CONSTRAINT "retiro_servicios_extras_retiro_id_retiros_id_fk" FOREIGN KEY ("retiro_id") REFERENCES "public"."retiros"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "retiros" ADD CONSTRAINT "retiros_operador_id_operadores_id_fk" FOREIGN KEY ("operador_id") REFERENCES "public"."operadores"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews_canchas" ADD CONSTRAINT "reviews_canchas_club_id_clubes_id_fk" FOREIGN KEY ("club_id") REFERENCES "public"."clubes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews_palas" ADD CONSTRAINT "reviews_palas_pala_id_palas_id_fk" FOREIGN KEY ("pala_id") REFERENCES "public"."palas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_pala_actual_id_palas_id_fk" FOREIGN KEY ("pala_actual_id") REFERENCES "public"."palas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "cancha_admins_user_club_idx" ON "cancha_admins" USING btree ("user_id","club_id");--> statement-breakpoint
CREATE INDEX "cancha_admins_club_idx" ON "cancha_admins" USING btree ("club_id");--> statement-breakpoint
CREATE INDEX "cancha_horarios_club_dia_idx" ON "cancha_horarios" USING btree ("club_id","dia_semana");--> statement-breakpoint
CREATE INDEX "cancha_reservas_club_fecha_idx" ON "cancha_reservas" USING btree ("club_id","fecha");--> statement-breakpoint
CREATE INDEX "cancha_reservas_user_idx" ON "cancha_reservas" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "clubes_ciudad_idx" ON "clubes" USING btree ("ciudad");--> statement-breakpoint
CREATE INDEX "coaches_ciudad_idx" ON "coaches" USING btree ("ciudad");--> statement-breakpoint
CREATE UNIQUE INDEX "favoritos_user_tipo_ref_idx" ON "favoritos" USING btree ("user_id","tipo","referencia_id");--> statement-breakpoint
CREATE INDEX "palas_marca_idx" ON "palas" USING btree ("marca");--> statement-breakpoint
CREATE INDEX "palas_forma_idx" ON "palas" USING btree ("forma");--> statement-breakpoint
CREATE INDEX "precios_pala_tienda_idx" ON "precios_palas" USING btree ("pala_id","tienda_id");--> statement-breakpoint
CREATE INDEX "precios_scrapeado_at_idx" ON "precios_palas" USING btree ("scrapeado_at");--> statement-breakpoint
CREATE INDEX "retiro_consultas_edicion_idx" ON "retiro_consultas" USING btree ("edicion_id");--> statement-breakpoint
CREATE INDEX "retiro_ediciones_retiro_idx" ON "retiro_ediciones" USING btree ("retiro_id");--> statement-breakpoint
CREATE INDEX "retiro_ediciones_fecha_idx" ON "retiro_ediciones" USING btree ("fecha_inicio");--> statement-breakpoint
CREATE INDEX "retiro_reservas_edicion_idx" ON "retiro_reservas" USING btree ("edicion_id");--> statement-breakpoint
CREATE INDEX "retiros_operador_idx" ON "retiros" USING btree ("operador_id");--> statement-breakpoint
CREATE INDEX "retiros_pais_idx" ON "retiros" USING btree ("pais");--> statement-breakpoint
CREATE INDEX "retiros_genero_idx" ON "retiros" USING btree ("genero");--> statement-breakpoint
CREATE INDEX "torneos_fecha_idx" ON "torneos" USING btree ("fecha_inicio");--> statement-breakpoint
CREATE INDEX "torneos_ciudad_idx" ON "torneos" USING btree ("ciudad");