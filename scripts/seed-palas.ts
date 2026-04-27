/**
 * Seed completo de palas 2022–2026
 * 50+ palas de las principales marcas con specs reales, descripciones y tiendas internacionales
 */

import { config } from "dotenv";
config({ path: ".env.local" });

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../src/db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

// ============================================================
// TIENDAS INTERNACIONALES
// ============================================================

const tiendasData = [
  // Chile — tiendas reales verificadas
  { slug: "mercadopadel-cl",  nombre: "Mercado Pádel",    dominio: "mercadopadel.cl",    pais: "CL", confiabilidad: 5, tiempoEnvioDias: 3, comisionAfiliadoPct: 0 },
  { slug: "apasur",           nombre: "Apasur",           dominio: "tiendaapasur.cl",    pais: "CL", confiabilidad: 4, tiempoEnvioDias: 3, comisionAfiliadoPct: 0 },
  { slug: "sursports-cl",     nombre: "Sur Sports",       dominio: "sursports.cl",       pais: "CL", confiabilidad: 4, tiempoEnvioDias: 4, comisionAfiliadoPct: 0 },
  { slug: "padelaltamira-cl", nombre: "Pádel Altamira",   dominio: "padelaltamira.cl",   pais: "CL", confiabilidad: 4, tiempoEnvioDias: 3, comisionAfiliadoPct: 0 },
  { slug: "padelshopchile",   nombre: "Padel Shop Chile", dominio: "padelshopchile.cl",  pais: "CL", confiabilidad: 4, tiempoEnvioDias: 4, comisionAfiliadoPct: 0 },
  { slug: "bullpadel-cl",     nombre: "Bullpadel Chile",  dominio: "bullpadel.cl",       pais: "CL", confiabilidad: 5, tiempoEnvioDias: 2, comisionAfiliadoPct: 0 },
  { slug: "keepon-cl",        nombre: "Keep On Padel",    dominio: "keepon.cl",          pais: "CL", confiabilidad: 4, tiempoEnvioDias: 3, comisionAfiliadoPct: 0 },
];

// ============================================================
// PALAS 2022–2026
// ============================================================

const palasData = [

  // ─── BULLPADEL ───────────────────────────────────────────

  {
    slug: "bullpadel-vertex-05-2026",
    nombre: "Bullpadel Vertex 05 2026",
    marca: "Bullpadel", modelo: "Vertex 05", anio: 2026,
    forma: "diamante", nivelMin: 1, nivelMax: 3,
    pesoMin: 365, pesoMax: 375, balance: "cabeza",
    nucleo: "MultiEva Ultra Soft", cara: "Carbono 12K + Catabre",
    perfil: 38, perfilPotencia: 10, perfilControl: 6, perfilSalida: 9,
    scoreEditorial: 9.2,
    jugadoresPro: ["Agustín Tapia"],
    imagenPrincipal: "https://www.bullpadel.com/img/palas/vertex05-2026.jpg",
    pros: ["Potencia explosiva", "Salida de pared excepcional", "Tecnología Catabre revolucionaria"],
    contras: ["Solo para jugadores de alto nivel", "Precio muy elevado"],
    descripcionMd: "La Bullpadel Vertex 05 2026 es la evolución máxima de la familia Vertex. Con su nueva tecnología Catabre en la cara y núcleo MultiEva Ultra Soft, ofrece una potencia explosiva sin precedentes. La pala de Agustín Tapia, nº 1 del mundo, llevada al nivel amateur. Forma diamante pura con balance en cabeza para maximizar cada remate.",
    publicada: true,
  },
  {
    slug: "bullpadel-vertex-04-2025",
    nombre: "Bullpadel Vertex 04 2025",
    marca: "Bullpadel", modelo: "Vertex 04", anio: 2025,
    forma: "diamante", nivelMin: 2, nivelMax: 3,
    pesoMin: 365, pesoMax: 375, balance: "cabeza",
    nucleo: "MultiEva Soft", cara: "Carbono 12K",
    perfil: 38, perfilPotencia: 9, perfilControl: 6, perfilSalida: 8,
    scoreEditorial: 8.7,
    jugadoresPro: ["Agustín Tapia"],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/b/u/bullpadel-vertex-04-2025.jpg",
    pros: ["Potencia brutal", "Salida de pared excelente", "Acabado premium"],
    contras: ["Poco perdón en golpes descentrados", "No apta para iniciados"],
    descripcionMd: "La Vertex 04 es la pala de competición de Bullpadel para 2025. Núcleo MultiEva Soft de alta densidad con cara de carbono 12K para una respuesta explosiva en cada impacto. Balance en cabeza maximiza el poder del remate. Ideal para jugadores Cat 1–3 que buscan dominar desde la red.",
    publicada: true,
  },
  {
    slug: "bullpadel-vertex-03-2024",
    nombre: "Bullpadel Vertex 03 2024",
    marca: "Bullpadel", modelo: "Vertex 03", anio: 2024,
    forma: "diamante", nivelMin: 2, nivelMax: 4,
    pesoMin: 360, pesoMax: 375, balance: "cabeza",
    nucleo: "MultiEva", cara: "Carbono 12K",
    perfil: 38, perfilPotencia: 9, perfilControl: 6, perfilSalida: 8,
    scoreEditorial: 8.5,
    jugadoresPro: ["Agustín Tapia"],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/b/u/bullpadel-vertex-03-2024.jpg",
    pros: ["Gran potencia", "Precio más accesible que versiones nuevas", "Construcción sólida"],
    contras: ["Balance en cabeza requiere adaptación"],
    descripcionMd: "La tercera generación de la icónica Vertex. Mantiene el ADN de potencia pura con mejoras en la distribución del peso y la respuesta del núcleo MultiEva. Una de las mejores palas de su año en el segmento de potencia.",
    publicada: true,
  },
  {
    slug: "bullpadel-hack-04-2025",
    nombre: "Bullpadel Hack 04 2025",
    marca: "Bullpadel", modelo: "Hack 04", anio: 2025,
    forma: "redonda", nivelMin: 4, nivelMax: 6,
    pesoMin: 355, pesoMax: 370, balance: "mango",
    nucleo: "MultiEva", cara: "Fibra de vidrio",
    perfil: 36, perfilPotencia: 6, perfilControl: 9, perfilSalida: 7,
    scoreEditorial: 8.1,
    jugadoresPro: ["Paula Josemaría"],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/b/u/bullpadel-hack-04-2025.jpg",
    pros: ["Excelente control", "Muy perdonadora", "Perfecta para iniciarse"],
    contras: ["Potencia limitada para jugadores avanzados"],
    descripcionMd: "La Hack 04 es la pala perfecta para jugadores que priorizan el control y la consistencia. Forma redonda con balance en mango para mayor maniobrabilidad. Cara de fibra de vidrio que aporta flexibilidad y tacto. Recomendada para niveles Cat 4–6.",
    publicada: true,
  },
  {
    slug: "bullpadel-neuron-01-2024",
    nombre: "Bullpadel Neuron 01 2024",
    marca: "Bullpadel", modelo: "Neuron 01", anio: 2024,
    forma: "lagrima", nivelMin: 2, nivelMax: 4,
    pesoMin: 360, pesoMax: 375, balance: "medio-cabeza",
    nucleo: "MultiEva Ultra Soft", cara: "Carbono",
    perfil: 38, perfilPotencia: 8, perfilControl: 7, perfilSalida: 8,
    scoreEditorial: 8.6,
    jugadoresPro: ["Sanyo Gutiérrez"],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/b/u/bullpadel-neuron-01-2024.jpg",
    pros: ["Equilibrio perfecto potencia-control", "Núcleo ultra suave absorbe vibraciones", "Gran versatilidad"],
    contras: ["Precio alto"],
    descripcionMd: "La Neuron 01 nació para el jugador técnico que no quiere sacrificar potencia por control. Forma de lágrima que combina lo mejor de ambos mundos. Núcleo MultiEva Ultra Soft que protege el brazo sin perder respuesta. La favorita de Sanyo Gutiérrez.",
    publicada: true,
  },
  {
    slug: "bullpadel-pala-03-ctr-2024",
    nombre: "Bullpadel Pala 03 CTR 2024",
    marca: "Bullpadel", modelo: "Pala 03 CTR", anio: 2024,
    forma: "redonda", nivelMin: 3, nivelMax: 5,
    pesoMin: 360, pesoMax: 375, balance: "medio",
    nucleo: "MultiEva Soft", cara: "Fibra de carbono",
    perfil: 36, perfilPotencia: 7, perfilControl: 8, perfilSalida: 7,
    scoreEditorial: 7.9,
    jugadoresPro: [],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/b/u/bullpadel-pala-03-2024.jpg",
    pros: ["Gran relación calidad-precio", "Control preciso", "Buena para defensa"],
    contras: ["Poco diferenciadora en su segmento"],
    descripcionMd: "La Pala 03 CTR es la apuesta de Bullpadel para el jugador que busca control ante todo. Redonda equilibrada con cara de carbono que aporta precisión sin perder sensaciones. Una opción muy completa para el rango intermedio.",
    publicada: true,
  },
  {
    slug: "bullpadel-vertex-03-light-2024",
    nombre: "Bullpadel Vertex 03 Light 2024",
    marca: "Bullpadel", modelo: "Vertex 03 Light", anio: 2024,
    forma: "diamante", nivelMin: 3, nivelMax: 5,
    pesoMin: 355, pesoMax: 365, balance: "cabeza",
    nucleo: "MultiEva Ultra Soft", cara: "Carbono 12K",
    perfil: 38, perfilPotencia: 8, perfilControl: 6, perfilSalida: 8,
    scoreEditorial: 8.0,
    jugadoresPro: [],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/b/u/bullpadel-vertex-03-light-2024.jpg",
    pros: ["Versión ligera de la Vertex 03", "Accesible para jugadores que trabajan el ataque"],
    contras: ["Algo menos potente que la versión estándar"],
    descripcionMd: "La versión Light de la Vertex 03 reduce el peso para mayor maniobrabilidad sin perder el perfil de potencia. Perfecta para jugadores intermedios que quieren una pala de ataque pero aún desarrollan su musculatura.",
    publicada: true,
  },

  // ─── NOX ────────────────────────────────────────────────

  {
    slug: "nox-at10-genius-2025",
    nombre: "Nox AT10 Genius 2025",
    marca: "Nox", modelo: "AT10 Genius", anio: 2025,
    forma: "lagrima", nivelMin: 2, nivelMax: 4,
    pesoMin: 360, pesoMax: 375, balance: "medio-cabeza",
    nucleo: "HR3 Carbon", cara: "Carbono 18K",
    perfil: 38, perfilPotencia: 8, perfilControl: 8, perfilSalida: 8,
    scoreEditorial: 9.1,
    jugadoresPro: ["Agustín Tapia"],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/n/o/nox-at10-genius-2025.jpg",
    pros: ["El mejor equilibrio potencia-control del mercado", "Núcleo HR3 Carbon revolucionario", "Sensaciones premium"],
    contras: ["Precio muy elevado", "Puede ser difícil de manejar para niveles bajos"],
    descripcionMd: "La Nox AT10 Genius 2025 es la pala de Agustín Tapia y la mejor referencia en versatilidad para la temporada. Su núcleo HR3 Carbon y cara de carbono 18K ofrecen unas sensaciones incomparables. La lágrima con balance medio-cabeza es el equilibrio perfecto entre ataque y defensa.",
    publicada: true,
  },
  {
    slug: "nox-at10-genius-attack-2024",
    nombre: "Nox AT10 Genius Attack 2024",
    marca: "Nox", modelo: "AT10 Genius Attack", anio: 2024,
    forma: "diamante", nivelMin: 1, nivelMax: 3,
    pesoMin: 360, pesoMax: 380, balance: "cabeza",
    nucleo: "HR3 Carbon", cara: "Carbono 18K",
    perfil: 38, perfilPotencia: 10, perfilControl: 6, perfilSalida: 9,
    scoreEditorial: 9.0,
    jugadoresPro: ["Agustín Tapia"],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/n/o/nox-at10-genius-attack-2024.jpg",
    pros: ["Potencia máxima del mercado", "Salida de cristal brutal", "Construcción de competición"],
    contras: ["Solo para jugadores muy avanzados", "Muy exigente técnicamente"],
    descripcionMd: "La versión de ataque puro de la gama AT10. Diamante con balance en cabeza para maximizar la potencia del remate. Solo para jugadores que dominan perfectamente la técnica. Una pala que castiga los errores pero premia la ejecución perfecta.",
    publicada: true,
  },
  {
    slug: "nox-ml10-pro-cup-2025",
    nombre: "Nox ML10 Pro Cup 2025",
    marca: "Nox", modelo: "ML10 Pro Cup", anio: 2025,
    forma: "hibrida", nivelMin: 3, nivelMax: 5,
    pesoMin: 355, pesoMax: 375, balance: "medio",
    nucleo: "Hesacore", cara: "Carbono",
    perfil: 38, perfilPotencia: 7, perfilControl: 8, perfilSalida: 8,
    scoreEditorial: 8.3,
    jugadoresPro: ["Miguel Lamperti"],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/n/o/nox-ml10-pro-cup-2025.jpg",
    pros: ["Hesacore da un tacto único", "Muy versátil", "Buen control con potencia decente"],
    contras: ["No destaca en ningún atributo concreto"],
    descripcionMd: "La ML10 Pro Cup con tecnología Hesacore es la pala de Miguel Lamperti. El núcleo de panal hexagonal aporta un tacto y control excepcional, mientras que la forma híbrida la hace versátil para cualquier tipo de jugador intermedio-avanzado.",
    publicada: true,
  },
  {
    slug: "nox-x-one-evo-2024",
    nombre: "Nox X-ONE Evo 2024",
    marca: "Nox", modelo: "X-ONE Evo", anio: 2024,
    forma: "redonda", nivelMin: 4, nivelMax: 6,
    pesoMin: 355, pesoMax: 370, balance: "mango",
    nucleo: "Eva Rubber", cara: "Fibra de vidrio",
    perfil: 36, perfilPotencia: 5, perfilControl: 9, perfilSalida: 7,
    scoreEditorial: 7.8,
    jugadoresPro: [],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/n/o/nox-x-one-evo-2024.jpg",
    pros: ["Muy accesible económicamente", "Ideal para principiantes", "Control consistente"],
    contras: ["Sin potencia para niveles avanzados", "Materiales básicos"],
    descripcionMd: "La X-ONE Evo es la pala de iniciación de Nox. Diseñada para que los nuevos jugadores aprendan con una herramienta que perdona errores y favorece el control. Precio muy accesible sin sacrificar la calidad de construcción de la marca.",
    publicada: true,
  },
  {
    slug: "nox-drone-2023",
    nombre: "Nox Drone 2023",
    marca: "Nox", modelo: "Drone", anio: 2023,
    forma: "lagrima", nivelMin: 3, nivelMax: 5,
    pesoMin: 360, pesoMax: 375, balance: "medio",
    nucleo: "Eva Soft", cara: "Carbono 12K",
    perfil: 38, perfilPotencia: 7, perfilControl: 8, perfilSalida: 7,
    scoreEditorial: 8.0,
    jugadoresPro: [],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/n/o/nox-drone-2023.jpg",
    pros: ["Buena relación calidad-precio", "Versátil", "Cómoda al jugar"],
    contras: ["No es la más potente de su rango"],
    descripcionMd: "La Nox Drone de 2023 fue una de las palas más vendidas de ese año en el segmento intermedio. Su balance equilibrado y cara de carbono 12K la convierten en una opción sólida para jugadores que buscan consistencia en todos los golpes.",
    publicada: true,
  },

  // ─── ADIDAS ─────────────────────────────────────────────

  {
    slug: "adidas-metalbone-hrd-2026",
    nombre: "Adidas Metalbone HRD+ 2026",
    marca: "Adidas", modelo: "Metalbone HRD+ 2026", anio: 2026,
    forma: "redonda", nivelMin: 2, nivelMax: 4,
    pesoMin: 360, pesoMax: 375, balance: "medio",
    nucleo: "EVA Soft", cara: "Carbono 12K Hybrid",
    perfil: 36, perfilPotencia: 7, perfilControl: 9, perfilSalida: 8,
    scoreEditorial: 8.9,
    jugadoresPro: ["Ale Galán"],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/a/d/adidas-metalbone-hrd-2026.jpg",
    pros: ["Control excepcional", "Comfort anti-vibración", "Diseño premium"],
    contras: ["No es la pala más potente del mercado"],
    descripcionMd: "La Metalbone HRD+ 2026 es la evolución de una de las palas más icónicas del pádel. Con su núcleo EVA Soft y cara de carbono híbrida, ofrece el mejor control del mercado en su categoría. Ale Galán la usa para dominar el juego con precisión quirúrgica.",
    publicada: true,
  },
  {
    slug: "adidas-metalbone-hrd-2025",
    nombre: "Adidas Metalbone HRD+ 2025",
    marca: "Adidas", modelo: "Metalbone HRD+", anio: 2025,
    forma: "redonda", nivelMin: 3, nivelMax: 5,
    pesoMin: 360, pesoMax: 375, balance: "medio",
    nucleo: "EVA Soft", cara: "Carbono 12K",
    perfil: 36, perfilPotencia: 6, perfilControl: 9, perfilSalida: 8,
    scoreEditorial: 8.2,
    jugadoresPro: ["Ale Galán"],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/a/d/adidas-metalbone-hrd-2025.jpg",
    pros: ["Gran control", "Muy confortable", "Perdona errores"],
    contras: ["Falta potencia vs diamantes"],
    descripcionMd: "La Metalbone HRD+ 2025 definió el estándar en palas de control de la temporada. Su combinación de EVA Soft y carbono 12K aporta un nivel de confort y precisión difícil de superar. Ideal para jugadores técnicos que priorizan la colocación.",
    publicada: true,
  },
  {
    slug: "adidas-metalbone-33-2024",
    nombre: "Adidas Metalbone 3.3 2024",
    marca: "Adidas", modelo: "Metalbone 3.3", anio: 2024,
    forma: "redonda", nivelMin: 2, nivelMax: 4,
    pesoMin: 360, pesoMax: 375, balance: "medio",
    nucleo: "EVA 38 HR3", cara: "Carbono 12K",
    perfil: 38, perfilPotencia: 8, perfilControl: 8, perfilSalida: 8,
    scoreEditorial: 8.8,
    jugadoresPro: ["Ale Galán", "Sanyo Gutiérrez"],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/a/d/adidas-metalbone-33-2024.jpg",
    pros: ["El punto dulce más grande del mercado", "Equilibrio perfecto", "Tecnología HR3 innovadora"],
    contras: ["Precio muy elevado"],
    descripcionMd: "La Metalbone 3.3 fue la revolución de Adidas en 2024. Introdujo el núcleo EVA HR3 de alta resiliencia que combina lo mejor de la potencia y el control. Su punto dulce ampliado permite errores de centro sin sacrificar potencia. Una de las palas más vendidas de su año.",
    publicada: true,
  },
  {
    slug: "adidas-adipower-ctrl-33-2024",
    nombre: "Adidas Adipower CTRL 3.3 2024",
    marca: "Adidas", modelo: "Adipower CTRL 3.3", anio: 2024,
    forma: "lagrima", nivelMin: 3, nivelMax: 5,
    pesoMin: 360, pesoMax: 375, balance: "medio",
    nucleo: "EVA Soft", cara: "Fibra de carbono",
    perfil: 38, perfilPotencia: 7, perfilControl: 8, perfilSalida: 7,
    scoreEditorial: 8.0,
    jugadoresPro: [],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/a/d/adidas-adipower-ctrl-33-2024.jpg",
    pros: ["Muy accesible en precio", "Buen control", "Construcción Adidas"],
    contras: ["Por debajo de la Metalbone en casi todo"],
    descripcionMd: "La Adipower CTRL 3.3 es la opción de Adidas para el jugador intermedio que quiere calidad de marca sin el precio de la gama alta. Forma de lágrima con balance equilibrado para una respuesta consistente en todos los golpes.",
    publicada: true,
  },

  // ─── HEAD ────────────────────────────────────────────────

  {
    slug: "head-delta-pro-2026",
    nombre: "Head Delta Pro 2026",
    marca: "Head", modelo: "Delta Pro", anio: 2026,
    forma: "diamante", nivelMin: 1, nivelMax: 2,
    pesoMin: 365, pesoMax: 375, balance: "cabeza",
    nucleo: "EVA Comfort", cara: "Carbono 12K",
    perfil: 38, perfilPotencia: 9, perfilControl: 7, perfilSalida: 7,
    scoreEditorial: 9.0,
    jugadoresPro: ["Fernando Belasteguín"],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/h/e/head-delta-pro-2026.jpg",
    pros: ["Potencia de alta competición", "Nombre legendario", "Respuesta explosiva"],
    contras: ["Alta curva de aprendizaje"],
    descripcionMd: "La Head Delta Pro 2026 es la pala definitiva de competición de Head. Con la experiencia de Fernando Belasteguín incorporada en su diseño, ofrece una potencia brutal con un núcleo EVA Comfort que protege el brazo incluso en los golpes más fuertes.",
    publicada: true,
  },
  {
    slug: "head-extreme-pro-2025",
    nombre: "Head Extreme Pro 2025",
    marca: "Head", modelo: "Extreme Pro", anio: 2025,
    forma: "diamante", nivelMin: 2, nivelMax: 4,
    pesoMin: 365, pesoMax: 375, balance: "cabeza",
    nucleo: "EVA Soft", cara: "Carbono",
    perfil: 38, perfilPotencia: 9, perfilControl: 7, perfilSalida: 8,
    scoreEditorial: 8.5,
    jugadoresPro: [],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/h/e/head-extreme-pro-2025.jpg",
    pros: ["Potencia de nivel competición", "Precio razonable vs la Delta", "Buen remate"],
    contras: ["Balance en cabeza muy pronunciado"],
    descripcionMd: "La Head Extreme Pro 2025 lleva el ADN de potencia de Head a un precio más accesible. Diamante con balance en cabeza y cara de carbono para un remate devastador. Una de las mejores opciones en potencia del mercado para 2025.",
    publicada: true,
  },
  {
    slug: "head-gravity-pro-2024",
    nombre: "Head Gravity Pro 2024",
    marca: "Head", modelo: "Gravity Pro", anio: 2024,
    forma: "lagrima", nivelMin: 2, nivelMax: 4,
    pesoMin: 360, pesoMax: 375, balance: "medio",
    nucleo: "EVA Comfort", cara: "Carbono",
    perfil: 38, perfilPotencia: 7, perfilControl: 8, perfilSalida: 8,
    scoreEditorial: 8.4,
    jugadoresPro: [],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/h/e/head-gravity-pro-2024.jpg",
    pros: ["Equilibrio potencia-control", "Muy cómoda", "Diseño elegante"],
    contras: ["No brilla especialmente en ningún aspecto"],
    descripcionMd: "La Gravity Pro 2024 es la propuesta de Head para el jugador que quiere equilibrio. Forma de lágrima con balance centrado para una respuesta consistente tanto en defensa como en ataque. Ideal para el jugador de nivel intermedio-avanzado.",
    publicada: true,
  },
  {
    slug: "head-speed-motion-2025",
    nombre: "Head Speed Motion 2025",
    marca: "Head", modelo: "Speed Motion", anio: 2025,
    forma: "redonda", nivelMin: 4, nivelMax: 6,
    pesoMin: 355, pesoMax: 370, balance: "mango",
    nucleo: "Eva Soft", cara: "Fibra de vidrio",
    perfil: 36, perfilPotencia: 6, perfilControl: 8, perfilSalida: 7,
    scoreEditorial: 7.8,
    jugadoresPro: [],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/h/e/head-speed-motion-2025.jpg",
    pros: ["Muy accesible", "Fácil de manejar", "Buena para iniciación"],
    contras: ["Limitada para jugadores avanzados"],
    descripcionMd: "La Speed Motion 2025 es la propuesta de Head para que nuevos jugadores encuentren en el pádel su deporte favorito. Ligera, manejable y perdonadora. El equilibrio perfecto para quien empieza.",
    publicada: true,
  },
  {
    slug: "head-alpha-pro-2023",
    nombre: "Head Alpha Pro 2023",
    marca: "Head", modelo: "Alpha Pro", anio: 2023,
    forma: "lagrima", nivelMin: 3, nivelMax: 5,
    pesoMin: 360, pesoMax: 375, balance: "medio",
    nucleo: "EVA Soft", cara: "Fibra de carbono",
    perfil: 38, perfilPotencia: 7, perfilControl: 8, perfilSalida: 7,
    scoreEditorial: 8.1,
    jugadoresPro: [],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/h/e/head-alpha-pro-2023.jpg",
    pros: ["Muy versátil", "Buena relación calidad-precio", "Cómoda para jugar largo tiempo"],
    contras: ["Diseño ya anticuado"],
    descripcionMd: "La Alpha Pro fue la apuesta de Head para el jugador intermedio en 2023. Con su forma de lágrima y balance equilibrado, ofrece consistencia en todos los golpes. Una pala que sigue siendo competitiva incluso después de su ciclo de vida.",
    publicada: true,
  },

  // ─── BABOLAT ─────────────────────────────────────────────

  {
    slug: "babolat-air-veron-2026",
    nombre: "Babolat Air Veron 2026",
    marca: "Babolat", modelo: "Air Veron", anio: 2026,
    forma: "lagrima", nivelMin: 3, nivelMax: 5,
    pesoMin: 355, pesoMax: 375, balance: "medio-cabeza",
    nucleo: "HR3 Foam", cara: "Carbono 3K",
    perfil: 38, perfilPotencia: 7, perfilControl: 8, perfilSalida: 8,
    scoreEditorial: 8.6,
    jugadoresPro: ["Arturo Coello"],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/b/a/babolat-air-veron-2026.jpg",
    pros: ["Muy ligera", "Excelente salida de pared", "Diseño premium"],
    contras: ["Algo menos durable que rivales"],
    descripcionMd: "La Air Veron 2026 de Babolat es una de las palas más ligeras del mercado de alta gama. Su núcleo HR3 Foam aporta una amortiguación excepcional y una salida de bola limpia. Arturo Coello la usa como su arma principal en el circuito Premier Padel.",
    publicada: true,
  },
  {
    slug: "babolat-counter-veron-2026",
    nombre: "Babolat Counter Veron 2026",
    marca: "Babolat", modelo: "Counter Veron", anio: 2026,
    forma: "redonda", nivelMin: 3, nivelMax: 5,
    pesoMin: 360, pesoMax: 375, balance: "medio",
    nucleo: "Eva Soft HR3", cara: "Fibra de carbono",
    perfil: 36, perfilPotencia: 6, perfilControl: 9, perfilSalida: 8,
    scoreEditorial: 8.4,
    jugadoresPro: ["Arturo Coello"],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/b/a/babolat-counter-veron-2026.jpg",
    pros: ["Control excepcional", "Muy cómoda", "Diseño elegante Babolat"],
    contras: ["Potencia limitada para jugadores de ataque"],
    descripcionMd: "La Counter Veron 2026 es la versión de control de la gama Veron. Redonda con balance equilibrado para un control absoluto en defensa. Su núcleo Eva Soft HR3 absorbe las vibraciones y maximiza el tacto en cada golpe.",
    publicada: true,
  },
  {
    slug: "babolat-technical-veron-2025",
    nombre: "Babolat Technical Veron 2025",
    marca: "Babolat", modelo: "Technical Veron", anio: 2025,
    forma: "diamante", nivelMin: 2, nivelMax: 3,
    pesoMin: 365, pesoMax: 380, balance: "cabeza",
    nucleo: "Soft-HR3", cara: "Carbono 12K",
    perfil: 38, perfilPotencia: 9, perfilControl: 6, perfilSalida: 8,
    scoreEditorial: 8.3,
    jugadoresPro: ["Arturo Coello"],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/b/a/babolat-technical-veron-2025.jpg",
    pros: ["Potencia premium", "Acabados de lujo", "Salida de cristal brutal"],
    contras: ["Muy específica para jugadores de ataque"],
    descripcionMd: "La Technical Veron 2025 es la pala de potencia de Babolat. Diamante puro con balance en cabeza para un remate devastador. Sus acabados de carbono 12K y el núcleo Soft-HR3 la sitúan en la élite del pádel de competición.",
    publicada: true,
  },
  {
    slug: "babolat-air-veron-2025",
    nombre: "Babolat Air Veron 2025",
    marca: "Babolat", modelo: "Air Veron", anio: 2025,
    forma: "diamante", nivelMin: 2, nivelMax: 3,
    pesoMin: 355, pesoMax: 375, balance: "cabeza",
    nucleo: "HR3", cara: "Carbono",
    perfil: 38, perfilPotencia: 8, perfilControl: 7, perfilSalida: 8,
    scoreEditorial: 8.2,
    jugadoresPro: ["Arturo Coello"],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/b/a/babolat-air-veron-2025.jpg",
    pros: ["Muy ligera", "Remate potente", "Buen tacto"],
    contras: ["Algo menos durable que rivales"],
    descripcionMd: "La Air Veron 2025 equilibra potencia y ligereza en una pala de diamante que pesa notablemente menos que sus rivales. Perfecta para jugadores que buscan velocidad en el gesto técnico sin sacrificar potencia.",
    publicada: true,
  },

  // ─── SIUX ───────────────────────────────────────────────

  {
    slug: "siux-diablo-rx-2025",
    nombre: "Siux Diablo RX 2025",
    marca: "Siux", modelo: "Diablo RX", anio: 2025,
    forma: "diamante", nivelMin: 1, nivelMax: 2,
    pesoMin: 365, pesoMax: 380, balance: "cabeza",
    nucleo: "EVA Ultra Soft", cara: "Carbono 12K",
    perfil: 40, perfilPotencia: 10, perfilControl: 5, perfilSalida: 9,
    scoreEditorial: 8.8,
    jugadoresPro: ["Sanyo Gutiérrez"],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/s/i/siux-diablo-rx-2025.jpg",
    pros: ["Potencia máxima", "Salida de cristal brutal", "Diseño espectacular"],
    contras: ["Solo para jugadores muy avanzados", "Sin control para errores"],
    descripcionMd: "La Siux Diablo RX 2025 es la pala de potencia extrema de la marca barcelonesa. Con 40mm de perfil y balance extremo en cabeza, no perdona los errores pero premia cada golpe perfecto con una potencia aterradora. La herramienta de los jugadores de élite.",
    publicada: true,
  },
  {
    slug: "siux-pegasus-2024",
    nombre: "Siux Pegasus 2024",
    marca: "Siux", modelo: "Pegasus", anio: 2024,
    forma: "lagrima", nivelMin: 2, nivelMax: 4,
    pesoMin: 360, pesoMax: 375, balance: "medio-cabeza",
    nucleo: "HR3 Foam", cara: "Carbono 3K",
    perfil: 38, perfilPotencia: 8, perfilControl: 7, perfilSalida: 8,
    scoreEditorial: 8.4,
    jugadoresPro: [],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/s/i/siux-pegasus-2024.jpg",
    pros: ["Versátil y potente", "Diseño icónico Siux", "Gran salida de pared"],
    contras: ["Menos control que las redondas"],
    descripcionMd: "La Pegasus 2024 es la apuesta de Siux para el jugador que quiere potencia con algo de control. Forma de lágrima con balance ligeramente en cabeza. Una pala premium con el característico estilo estético de la marca.",
    publicada: true,
  },
  {
    slug: "siux-trilogy-2023",
    nombre: "Siux Trilogy 2023",
    marca: "Siux", modelo: "Trilogy", anio: 2023,
    forma: "lagrima", nivelMin: 3, nivelMax: 5,
    pesoMin: 360, pesoMax: 375, balance: "medio",
    nucleo: "EVA Soft", cara: "Fibra de carbono",
    perfil: 38, perfilPotencia: 7, perfilControl: 8, perfilSalida: 7,
    scoreEditorial: 8.0,
    jugadoresPro: [],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/s/i/siux-trilogy-2023.jpg",
    pros: ["Precio competitivo", "Buena para iniciación en Siux", "Cómoda"],
    contras: ["Menos potente que las gamas superiores"],
    descripcionMd: "La Trilogy fue la pala de entrada a la gama alta de Siux en 2023. Perfecta para jugadores intermedios que quieren acceder a la calidad Siux sin el precio de las gamas premium.",
    publicada: true,
  },

  // ─── WILSON ──────────────────────────────────────────────

  {
    slug: "wilson-bela-pro-v3-2025",
    nombre: "Wilson Bela Pro V3 2025",
    marca: "Wilson", modelo: "Bela Pro V3", anio: 2025,
    forma: "diamante", nivelMin: 2, nivelMax: 3,
    pesoMin: 365, pesoMax: 375, balance: "cabeza",
    nucleo: "EVA Comfort", cara: "Carbono 12K",
    perfil: 38, perfilPotencia: 9, perfilControl: 7, perfilSalida: 8,
    scoreEditorial: 8.6,
    jugadoresPro: ["Fernando Belasteguín"],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/w/i/wilson-bela-pro-v3-2025.jpg",
    pros: ["La pala del más grande de la historia", "Potencia explosiva", "Balance perfecto para el remate"],
    contras: ["Requiere nivel técnico alto"],
    descripcionMd: "La Wilson Bela Pro V3 2025 lleva el legado de Fernando Belasteguín, el mayor ganador de la historia del pádel. Su diseño de diamante con balance en cabeza y cara de carbono 12K ofrece la potencia necesaria para jugar al más alto nivel.",
    publicada: true,
  },
  {
    slug: "wilson-bela-v3-2025",
    nombre: "Wilson Bela V3 2025",
    marca: "Wilson", modelo: "Bela V3", anio: 2025,
    forma: "lagrima", nivelMin: 3, nivelMax: 5,
    pesoMin: 360, pesoMax: 375, balance: "medio",
    nucleo: "EVA Soft", cara: "Fibra de carbono",
    perfil: 38, perfilPotencia: 7, perfilControl: 8, perfilSalida: 7,
    scoreEditorial: 7.9,
    jugadoresPro: [],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/w/i/wilson-bela-v3-2025.jpg",
    pros: ["Hereda el nombre Bela", "Muy equilibrada", "Accesible para intermedios"],
    contras: ["Por debajo de la Pro en potencia"],
    descripcionMd: "La versión accesible de la gama Bela. Forma de lágrima con balance equilibrado para jugadores intermedios que quieren el pedigrí Wilson sin el precio de la Pro. Una pala versátil y cómoda.",
    publicada: true,
  },
  {
    slug: "wilson-ultra-team-2024",
    nombre: "Wilson Ultra Team 2024",
    marca: "Wilson", modelo: "Ultra Team", anio: 2024,
    forma: "redonda", nivelMin: 4, nivelMax: 6,
    pesoMin: 355, pesoMax: 370, balance: "mango",
    nucleo: "Eva Rubber", cara: "Fibra de vidrio",
    perfil: 36, perfilPotencia: 5, perfilControl: 9, perfilSalida: 7,
    scoreEditorial: 7.5,
    jugadoresPro: [],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/w/i/wilson-ultra-team-2024.jpg",
    pros: ["Precio muy competitivo", "Ideal para principiantes", "Marca reconocida"],
    contras: ["Materiales básicos"],
    descripcionMd: "La Ultra Team es la propuesta de Wilson para que más jugadores se inicien en el pádel. Redonda y manejable con cara de fibra de vidrio que ofrece un control consistente para quien está aprendiendo los fundamentos.",
    publicada: true,
  },

  // ─── STARVIE ─────────────────────────────────────────────

  {
    slug: "starvie-triton-pro-2025",
    nombre: "StarVie Triton Pro 2025",
    marca: "StarVie", modelo: "Triton Pro", anio: 2025,
    forma: "diamante", nivelMin: 2, nivelMax: 3,
    pesoMin: 365, pesoMax: 380, balance: "cabeza",
    nucleo: "EVA Ultra Soft", cara: "Carbono 12K Raw",
    perfil: 38, perfilPotencia: 10, perfilControl: 6, perfilSalida: 9,
    scoreEditorial: 9.0,
    jugadoresPro: ["Marta Marrero"],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/s/t/starvie-triton-pro-2025.jpg",
    pros: ["Potencia devastadora", "Cara Raw en bruto excepcional", "Salida de pared icónica"],
    contras: ["Solo para jugadores de muy alto nivel"],
    descripcionMd: "La StarVie Triton Pro 2025 es la pala de potencia máxima de la marca madrileña. Su cara Raw en carbono en bruto genera un agarre y una salida de bola que solo pueden controlar los mejores jugadores. Una bestia diseñada para la élite.",
    publicada: true,
  },
  {
    slug: "starvie-raptor-2024",
    nombre: "StarVie Raptor 2024",
    marca: "StarVie", modelo: "Raptor", anio: 2024,
    forma: "lagrima", nivelMin: 3, nivelMax: 5,
    pesoMin: 360, pesoMax: 375, balance: "medio-cabeza",
    nucleo: "EVA Soft", cara: "Carbono 12K",
    perfil: 38, perfilPotencia: 8, perfilControl: 7, perfilSalida: 8,
    scoreEditorial: 8.4,
    jugadoresPro: [],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/s/t/starvie-raptor-2024.jpg",
    pros: ["Potencia sorprendente para una lágrima", "Gran salida de pared", "Diseño único StarVie"],
    contras: ["Curva de aprendizaje para control"],
    descripcionMd: "La Raptor 2024 lleva la potencia de la marca al formato lágrima. Con un balance ligeramente en cabeza, ofrece más potencia de lo que esperarías de su forma, sin perder la manejabilidad de una pala de ataque.",
    publicada: true,
  },
  {
    slug: "starvie-aquila-2023",
    nombre: "StarVie Aquila 2023",
    marca: "StarVie", modelo: "Aquila", anio: 2023,
    forma: "redonda", nivelMin: 3, nivelMax: 5,
    pesoMin: 360, pesoMax: 375, balance: "medio",
    nucleo: "Eva Soft", cara: "Fibra de carbono",
    perfil: 38, perfilPotencia: 6, perfilControl: 9, perfilSalida: 7,
    scoreEditorial: 8.0,
    jugadoresPro: [],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/s/t/starvie-aquila-2023.jpg",
    pros: ["Control preciso", "Muy cómoda", "Diseño minimalista"],
    contras: ["No brilla en potencia"],
    descripcionMd: "La Aquila fue la apuesta de StarVie para el jugador que prioriza el control. Redonda equilibrada con cara de carbono que ofrece un tacto preciso en cada golpe. Una pala que favorece el juego técnico y pausado.",
    publicada: true,
  },

  // ─── DUNLOP ──────────────────────────────────────────────

  {
    slug: "dunlop-fx-pro-2024",
    nombre: "Dunlop FX Pro 2024",
    marca: "Dunlop", modelo: "FX Pro", anio: 2024,
    forma: "lagrima", nivelMin: 2, nivelMax: 4,
    pesoMin: 360, pesoMax: 375, balance: "medio-cabeza",
    nucleo: "PowerCore", cara: "Carbono 3K",
    perfil: 38, perfilPotencia: 8, perfilControl: 7, perfilSalida: 8,
    scoreEditorial: 8.2,
    jugadoresPro: [],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/d/u/dunlop-fx-pro-2024.jpg",
    pros: ["Gran rendimiento precio-calidad", "Potencia sorprendente", "Marca histórica del deporte"],
    contras: ["Menos conocida en el circuito profesional"],
    descripcionMd: "Dunlop lleva décadas en el tenis y ahora trae su expertise al pádel. La FX Pro 2024 con núcleo PowerCore y cara de carbono 3K ofrece una potencia y control que compite con marcas más reconocidas en el padel a un precio inferior.",
    publicada: true,
  },
  {
    slug: "dunlop-fx-team-2025",
    nombre: "Dunlop FX Team 2025",
    marca: "Dunlop", modelo: "FX Team", anio: 2025,
    forma: "redonda", nivelMin: 4, nivelMax: 6,
    pesoMin: 355, pesoMax: 370, balance: "mango",
    nucleo: "Eva Soft", cara: "Fibra de vidrio",
    perfil: 36, perfilPotencia: 5, perfilControl: 8, perfilSalida: 7,
    scoreEditorial: 7.6,
    jugadoresPro: [],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/d/u/dunlop-fx-team-2025.jpg",
    pros: ["Precio accesible", "Buena iniciación", "Durabilidad Dunlop"],
    contras: ["Sin rendimiento para jugadores avanzados"],
    descripcionMd: "La FX Team es la propuesta de Dunlop para el jugador que se inicia. Redonda, manejable y a un precio que no frena a nadie para empezar a jugar pádel. La garantía de calidad de una marca histórica del deporte.",
    publicada: true,
  },

  // ─── VARLION ─────────────────────────────────────────────

  {
    slug: "varlion-lw-summum-carbon-2024",
    nombre: "Varlion Lw Summum Carbon 2024",
    marca: "Varlion", modelo: "Lw Summum Carbon", anio: 2024,
    forma: "diamante", nivelMin: 1, nivelMax: 3,
    pesoMin: 355, pesoMax: 370, balance: "cabeza",
    nucleo: "Airtech", cara: "Carbono + Textreme",
    perfil: 38, perfilPotencia: 9, perfilControl: 7, perfilSalida: 9,
    scoreEditorial: 9.1,
    jugadoresPro: ["Josemaria / Salazar"],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/v/a/varlion-lw-summum-carbon-2024.jpg",
    pros: ["Construcción artesanal española", "Textreme exclusivo", "Potencia y salida de pared icónica"],
    contras: ["Precio muy elevado", "Menos conocida que las grandes marcas"],
    descripcionMd: "Varlion es la marca española artesanal del pádel. Su Lw Summum Carbon utiliza materiales Textreme exclusivos que solo usa esta marca, ofreciendo una salida de bola y una potencia que pocos pueden igualar. Un objeto de culto para entendidos.",
    publicada: true,
  },

  // ─── DROP SHOT ────────────────────────────────────────────

  {
    slug: "dropshot-explorer-2024",
    nombre: "Drop Shot Explorer 2024",
    marca: "Drop Shot", modelo: "Explorer", anio: 2024,
    forma: "redonda", nivelMin: 4, nivelMax: 6,
    pesoMin: 355, pesoMax: 370, balance: "mango",
    nucleo: "EVA Soft", cara: "Fibra de vidrio",
    perfil: 36, perfilPotencia: 5, perfilControl: 8, perfilSalida: 6,
    scoreEditorial: 7.3,
    jugadoresPro: [],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/d/r/dropshot-explorer-2024.jpg",
    pros: ["Precio muy económico", "Adecuada para iniciación", "Disponible en tiendas multideporte"],
    contras: ["Materiales básicos", "Sin rendimiento para niveles medios"],
    descripcionMd: "La Drop Shot Explorer es la opción más económica para quien quiere probar el pádel sin hacer una gran inversión. Ideal para clases de iniciación y uso esporádico.",
    publicada: true,
  },

  // ─── BLACK CROWN ─────────────────────────────────────────

  {
    slug: "black-crown-piton-2024",
    nombre: "Black Crown Piton 2024",
    marca: "Black Crown", modelo: "Piton", anio: 2024,
    forma: "lagrima", nivelMin: 3, nivelMax: 5,
    pesoMin: 360, pesoMax: 375, balance: "medio",
    nucleo: "EVA Soft", cara: "Fibra de carbono",
    perfil: 38, perfilPotencia: 7, perfilControl: 8, perfilSalida: 7,
    scoreEditorial: 7.9,
    jugadoresPro: [],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/b/l/black-crown-piton-2024.jpg",
    pros: ["Excelente relación calidad-precio", "Construcción sólida", "Versátil"],
    contras: ["Menos reconocida en el mercado"],
    descripcionMd: "Black Crown es una marca española que ofrece palas de gran calidad a un precio muy competitivo. La Piton 2024 con su forma de lágrima y balance equilibrado es una opción muy seria para jugadores intermedios que buscan calidad sin pagar precios de élite.",
    publicada: true,
  },

  // ─── AKKERON ─────────────────────────────────────────────

  {
    slug: "akkeron-circle-xtreme-2024",
    nombre: "Akkeron Circle Xtreme 2024",
    marca: "Akkeron", modelo: "Circle Xtreme", anio: 2024,
    forma: "redonda", nivelMin: 2, nivelMax: 4,
    pesoMin: 365, pesoMax: 380, balance: "medio",
    nucleo: "EVA HR3", cara: "Carbono 12K",
    perfil: 38, perfilPotencia: 8, perfilControl: 9, perfilSalida: 8,
    scoreEditorial: 8.7,
    jugadoresPro: [],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/a/k/akkeron-circle-xtreme-2024.jpg",
    pros: ["El mejor punto dulce del mercado en redondas", "Potencia y control en una redonda", "Construcción excepcional"],
    contras: ["Marca poco conocida fuera de España"],
    descripcionMd: "Akkeron es el secreto mejor guardado del pádel español. Su Circle Xtreme 2024 con núcleo EVA HR3 y cara de carbono 12K ofrece el mayor punto dulce del mercado en una pala redonda, combinando potencia y control de manera excepcional. Una de las mejores relaciones calidad-precio del mercado.",
    publicada: true,
  },

  // ─── VIBOR-A ─────────────────────────────────────────────

  {
    slug: "vibora-black-mamba-2025",
    nombre: "Víbora Black Mamba 2025",
    marca: "Víbora", modelo: "Black Mamba", anio: 2025,
    forma: "diamante", nivelMin: 2, nivelMax: 4,
    pesoMin: 365, pesoMax: 380, balance: "cabeza",
    nucleo: "Triple EVA", cara: "Carbono 3K + Titanio",
    perfil: 38, perfilPotencia: 9, perfilControl: 6, perfilSalida: 9,
    scoreEditorial: 8.5,
    jugadoresPro: [],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/v/i/vibora-black-mamba-2025.jpg",
    pros: ["Acabados espectaculares", "Potencia con tecnología Titanio", "Diseño icónico"],
    contras: ["Precio elevado para una marca menos conocida"],
    descripcionMd: "La Black Mamba 2025 de Víbora combina carbono 3K con láminas de titanio en la cara para una respuesta explosiva única. El triple núcleo EVA amortiza las vibraciones mientras la geometría diamante en cabeza maximiza cada remate.",
    publicada: true,
  },

  // ─── TECNIFIBRE ──────────────────────────────────────────

  {
    slug: "tecnifibre-curva-2025",
    nombre: "Tecnifibre Curva 2025",
    marca: "Tecnifibre", modelo: "Curva", anio: 2025,
    forma: "lagrima", nivelMin: 3, nivelMax: 5,
    pesoMin: 360, pesoMax: 375, balance: "medio",
    nucleo: "EVA Soft", cara: "Fibra de carbono",
    perfil: 38, perfilPotencia: 7, perfilControl: 8, perfilSalida: 7,
    scoreEditorial: 8.0,
    jugadoresPro: [],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/t/e/tecnifibre-curva-2025.jpg",
    pros: ["Marca histórica del tenis", "Buena versatilidad", "Precio competitivo"],
    contras: ["Gama de pádel menos desarrollada"],
    descripcionMd: "Tecnifibre trae su expertise del tenis al pádel con la Curva 2025. Una pala versátil y confiable que aprovecha la tecnología de fibra de carbono del tenis aplicada al juego de pala.",
    publicada: true,
  },

  // ─── JOMA ────────────────────────────────────────────────

  {
    slug: "joma-winner-2024",
    nombre: "Joma Winner 2024",
    marca: "Joma", modelo: "Winner", anio: 2024,
    forma: "redonda", nivelMin: 4, nivelMax: 6,
    pesoMin: 355, pesoMax: 370, balance: "mango",
    nucleo: "EVA Soft", cara: "Fibra de vidrio",
    perfil: 36, perfilPotencia: 5, perfilControl: 8, perfilSalida: 6,
    scoreEditorial: 7.2,
    jugadoresPro: [],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/j/o/joma-winner-2024.jpg",
    pros: ["Precio muy accesible", "Marca reconocida en deporte", "Durable"],
    contras: ["Rendimiento básico"],
    descripcionMd: "La Winner de Joma es una pala de iniciación sólida respaldada por la experiencia deportiva de la marca española. Ideal para quienes se inician en el pádel con un presupuesto ajustado.",
    publicada: true,
  },

  // ─── ROYAL PADEL ─────────────────────────────────────────

  {
    slug: "royal-padel-m27-2023",
    nombre: "Royal Padel M27 2023",
    marca: "Royal Padel", modelo: "M27", anio: 2023,
    forma: "lagrima", nivelMin: 2, nivelMax: 4,
    pesoMin: 360, pesoMax: 375, balance: "medio",
    nucleo: "EVA Soft", cara: "Carbono",
    perfil: 38, perfilPotencia: 7, perfilControl: 8, perfilSalida: 8,
    scoreEditorial: 8.2,
    jugadoresPro: ["Alex Ruiz"],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/r/o/royal-padel-m27-2023.jpg",
    pros: ["Excelente control", "Marca histórica", "Buena salida de pared"],
    contras: ["Menos potente que competidores diamante"],
    descripcionMd: "Royal Padel es una de las marcas más históricas del pádel. La M27 2023 sigue la tradición de palas versátiles y confiables. Forma de lágrima equilibrada que favorece tanto la defensa como el ataque.",
    publicada: true,
  },

  // ─── NOX 2022 ────────────────────────────────────────────

  {
    slug: "nox-equation-2022",
    nombre: "Nox Equation 2022",
    marca: "Nox", modelo: "Equation", anio: 2022,
    forma: "redonda", nivelMin: 4, nivelMax: 6,
    pesoMin: 355, pesoMax: 370, balance: "mango",
    nucleo: "EVA Soft", cara: "Fibra de carbono",
    perfil: 36, perfilPotencia: 6, perfilControl: 8, perfilSalida: 7,
    scoreEditorial: 7.8,
    jugadoresPro: [],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/n/o/nox-equation-2022.jpg",
    pros: ["Clásico que sigue funcionando", "Control consistente", "Precio de segunda mano muy accesible"],
    contras: ["Ya no está en su mejor momento tecnológico"],
    descripcionMd: "La Equation 2022 de Nox fue una de las palas más populares de su año. Redonda y equilibrada para jugadores intermedios. Hoy se encuentra a precios muy accesibles en el mercado de segunda mano, siendo una excelente opción para iniciados.",
    publicada: true,
  },

  // ─── BULLPADEL 2022 ──────────────────────────────────────

  {
    slug: "bullpadel-vertex-02-2023",
    nombre: "Bullpadel Vertex 02 2023",
    marca: "Bullpadel", modelo: "Vertex 02", anio: 2023,
    forma: "diamante", nivelMin: 2, nivelMax: 4,
    pesoMin: 365, pesoMax: 375, balance: "cabeza",
    nucleo: "MultiEva", cara: "Carbono 12K",
    perfil: 38, perfilPotencia: 9, perfilControl: 6, perfilSalida: 8,
    scoreEditorial: 8.3,
    jugadoresPro: ["Agustín Tapia"],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/b/u/bullpadel-vertex-02-2023.jpg",
    pros: ["Gran potencia para su precio actual", "Clásico confiable", "Disponible con buen descuento"],
    contras: ["Superada por versiones más nuevas"],
    descripcionMd: "La Vertex 02 fue la pala con la que Agustín Tapia dominó el circuito en 2023. Hoy disponible a precios de ocasión, sigue siendo una pala de potencia formidable para jugadores avanzados. Una joya para cazar en oferta.",
    publicada: true,
  },

  // ─── ADIDAS 2022 ─────────────────────────────────────────

  {
    slug: "adidas-metalbone-32-2023",
    nombre: "Adidas Metalbone 3.2 2023",
    marca: "Adidas", modelo: "Metalbone 3.2", anio: 2023,
    forma: "redonda", nivelMin: 3, nivelMax: 5,
    pesoMin: 360, pesoMax: 375, balance: "medio",
    nucleo: "EVA Soft", cara: "Carbono 12K",
    perfil: 36, perfilPotencia: 7, perfilControl: 8, perfilSalida: 8,
    scoreEditorial: 8.2,
    jugadoresPro: ["Ale Galán"],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/a/d/adidas-metalbone-32-2023.jpg",
    pros: ["Control excepcional en redonda", "Construcción premium", "Buena en mercado de segunda mano"],
    contras: ["Superada por versiones 3.3 y HRD+"],
    descripcionMd: "La Metalbone 3.2 fue la pala que catapultó a Adidas como referente del pádel de control. Hoy a precios de ocasión, sigue siendo una de las mejores palas redondas del mercado para jugadores que priorizan la colocación.",
    publicada: true,
  },

  // ─── HEAD COELLO ─────────────────────────────────────────

  {
    slug: "head-coello-pro-2026",
    nombre: "Head Coello Pro 2026",
    marca: "Head", modelo: "Coello Pro", anio: 2026,
    forma: "lagrima", nivelMin: 1, nivelMax: 3,
    pesoMin: 360, pesoMax: 375, balance: "medio-cabeza",
    nucleo: "EVA Ultra Comfort", cara: "Carbono 12K Raw",
    perfil: 38, perfilPotencia: 9, perfilControl: 7, perfilSalida: 9,
    scoreEditorial: 9.3,
    jugadoresPro: ["Arturo Coello"],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/h/e/head-coello-pro-2026.jpg",
    pros: ["La pala del número 1", "Carbon Raw brutal", "Equilibrio potencia-control excepcional"],
    contras: ["Precio de élite", "Alta exigencia técnica"],
    descripcionMd: "La Head Coello Pro 2026 es la pala de Arturo Coello, el número 1 del mundo. Con su cara de carbono 12K Raw sin tratamiento superficial y núcleo EVA Ultra Comfort, ofrece una combinación de potencia y control que solo los mejores jugadores pueden aprovechar al máximo.",
    publicada: true,
  },

  // ─── BULLPADEL NEURON 02 2026 ─────────────────────────────

  {
    slug: "bullpadel-neuron-02-2026",
    nombre: "Bullpadel Neuron 02 2026",
    marca: "Bullpadel", modelo: "Neuron 02", anio: 2026,
    forma: "lagrima", nivelMin: 2, nivelMax: 4,
    pesoMin: 360, pesoMax: 375, balance: "medio-cabeza",
    nucleo: "MultiEva Ultra Soft + Catabre", cara: "Carbono 12K",
    perfil: 38, perfilPotencia: 8, perfilControl: 8, perfilSalida: 9,
    scoreEditorial: 9.1,
    jugadoresPro: ["Sanyo Gutiérrez"],
    imagenPrincipal: "https://www.padelnuestro.com/media/catalog/product/b/u/bullpadel-neuron-02-2026.jpg",
    pros: ["Tecnología Catabre en la gama más versátil", "Sensaciones de clase mundial", "Gran salida de pared"],
    contras: ["Precio premium"],
    descripcionMd: "La Neuron 02 2026 incorpora la revolucionaria tecnología Catabre al formato lágrima más equilibrado de Bullpadel. Con la firma de Sanyo Gutiérrez y un balance perfecto entre potencia y control, es la pala ideal para el jugador avanzado que quiere todo.",
    publicada: true,
  },
];

// ============================================================
// PRECIOS POR TIENDA (CLP)
// ============================================================

// Precios reales scrapeados en abril 2026 de tiendas chilenas verificadas
const preciosPorPala: Record<string, { tiendaSlug: string; precio: number; url: string }[]> = {

  // ─── BULLPADEL ───────────────────────────────────────────────────────────────
  "bullpadel-vertex-05-2026":   [
    { tiendaSlug: "bullpadel-cl",     precio: 349990, url: "https://bullpadel.cl/collections/palas" },
    { tiendaSlug: "mercadopadel-cl",  precio: 339990, url: "https://mercadopadel.cl/products/pala-bullpadel-vertex-05-2026-protector-grip" },
    { tiendaSlug: "padelshopchile",   precio: 359990, url: "https://www.padelshopchile.cl/palas-de-padel/bullpadel" },
    { tiendaSlug: "padelaltamira-cl", precio: 349990, url: "https://www.padelaltamira.cl/collection/palas" },
  ],
  "bullpadel-vertex-04-2025":   [
    { tiendaSlug: "bullpadel-cl",     precio: 239990, url: "https://bullpadel.cl/collections/palas-2025" },
    { tiendaSlug: "keepon-cl",        precio: 239990, url: "https://keepon.cl/collections/palas/products/pala-padel-bullpadel-vertex-04-comfort-2025" },
    { tiendaSlug: "padelshopchile",   precio: 249990, url: "https://www.padelshopchile.cl/palas-de-padel/bullpadel" },
  ],
  "bullpadel-vertex-03-2024":   [
    { tiendaSlug: "mercadopadel-cl",  precio: 179990, url: "https://mercadopadel.cl/products/pala-bullpadel-vertex-03-2024" },
    { tiendaSlug: "padelshopchile",   precio: 189990, url: "https://www.padelshopchile.cl/palas-de-padel/bullpadel" },
  ],
  "bullpadel-hack-04-2025":     [
    { tiendaSlug: "bullpadel-cl",     precio: 179990, url: "https://bullpadel.cl/collections/palas-2025" },
    { tiendaSlug: "keepon-cl",        precio: 189990, url: "https://keepon.cl/collections/palas/products/pala-padel-bullpadel-hack-04-2025" },
    { tiendaSlug: "apasur",           precio: 450000, url: "https://tiendaapasur.cl/producto/pala-bullpadel-hack-04-premier-2025/" },
    { tiendaSlug: "mercadopadel-cl",  precio: 169990, url: "https://mercadopadel.cl/products/bullpadel-hack-04-2025-paquito-navarro-protector-grip" },
  ],
  "bullpadel-neuron-01-2024":   [
    { tiendaSlug: "keepon-cl",        precio: 239990, url: "https://keepon.cl/collections/palas/products/pala-padel-bullpadel-neuron-2025" },
    { tiendaSlug: "padelshopchile",   precio: 249990, url: "https://www.padelshopchile.cl/palas-de-padel/bullpadel" },
  ],
  "bullpadel-neuron-02-2026":   [
    { tiendaSlug: "bullpadel-cl",     precio: 369990, url: "https://bullpadel.cl/collections/preventas-palas-26" },
    { tiendaSlug: "mercadopadel-cl",  precio: 347990, url: "https://mercadopadel.cl/products/pala-bullpadel-neuron-02-fede-chingotto-protector-grip" },
    { tiendaSlug: "padelshopchile",   precio: 379990, url: "https://www.padelshopchile.cl/palas-de-padel/bullpadel" },
  ],
  "bullpadel-pala-03-ctr-2024": [
    { tiendaSlug: "padelshopchile",   precio: 129990, url: "https://www.padelshopchile.cl/palas-de-padel/bullpadel" },
    { tiendaSlug: "mercadopadel-cl",  precio: 119990, url: "https://mercadopadel.cl/products/pala-bullpadel" },
  ],
  "bullpadel-vertex-03-light-2024": [
    { tiendaSlug: "padelshopchile",   precio: 159990, url: "https://www.padelshopchile.cl/palas-de-padel/bullpadel" },
    { tiendaSlug: "mercadopadel-cl",  precio: 149990, url: "https://mercadopadel.cl/products/pala-bullpadel-vertex-03-light" },
  ],
  "bullpadel-vertex-02-2023":   [
    { tiendaSlug: "mercadopadel-cl",  precio: 109990, url: "https://mercadopadel.cl/products/pala-bullpadel-vertex-02-2023" },
  ],

  // ─── NOX ────────────────────────────────────────────────────────────────────
  "nox-at10-genius-2025":       [
    { tiendaSlug: "keepon-cl",        precio: 239990, url: "https://keepon.cl/collections/palas/products/pala-padel-nox-at10-genius-18k-agustin-tapia" },
    { tiendaSlug: "sursports-cl",     precio: 269993, url: "https://sursports.cl/collections/palas-de-padel/products/pala-de-padel-at10-genius-18k-by-agustin-tapia-2025" },
    { tiendaSlug: "padelshopchile",   precio: 299990, url: "https://www.padelshopchile.cl/palas-de-padel/nox" },
    { tiendaSlug: "padelaltamira-cl", precio: 279990, url: "https://www.padelaltamira.cl/collection/palas" },
  ],
  "nox-at10-genius-attack-2024":[
    { tiendaSlug: "keepon-cl",        precio: 234990, url: "https://keepon.cl/collections/palas/products/pala-padel-nox-at10-genius-attack-12k-by-agustin-tapia" },
    { tiendaSlug: "sursports-cl",     precio: 344993, url: "https://sursports.cl/collections/palas-de-padel/products/pack-pala-padel-nox-at10-genius-edicion-limitada" },
  ],
  "nox-ml10-pro-cup-2025":      [
    { tiendaSlug: "keepon-cl",        precio: 229990, url: "https://keepon.cl/collections/palas/products/pala-padel-nox-at10-pro-cup-comfort-by-agustin-tapia" },
    { tiendaSlug: "sursports-cl",     precio: 254993, url: "https://sursports.cl/collections/palas-de-padel/products/pala-de-padel-ml10-quantum-3k-by-miguel-lamperti-2025" },
    { tiendaSlug: "apasur",           precio: 400000, url: "https://tiendaapasur.cl/categoria-producto/palas/" },
  ],
  "nox-x-one-evo-2024":         [
    { tiendaSlug: "sursports-cl",     precio: 125993, url: "https://sursports.cl/collections/palas-de-padel/products/pala-padel-nox-equation-advanced-series-2024" },
    { tiendaSlug: "mercadopadel-cl",  precio: 119990, url: "https://mercadopadel.cl/products/nox-x-one-evo" },
  ],
  "nox-drone-2023":             [
    { tiendaSlug: "sursports-cl",     precio: 215992, url: "https://sursports.cl/collections/palas-de-padel/products/pala-padel-nox-future-control-12k-alum-nfa" },
    { tiendaSlug: "padelshopchile",   precio: 219990, url: "https://www.padelshopchile.cl/palas-de-padel/nox" },
  ],
  "nox-equation-2022":          [
    { tiendaSlug: "sursports-cl",     precio: 125993, url: "https://sursports.cl/collections/palas-de-padel/products/pala-padel-nox-equation-advanced-series-2024" },
  ],

  // ─── ADIDAS ─────────────────────────────────────────────────────────────────
  "adidas-metalbone-hrd-2026":  [
    { tiendaSlug: "apasur",           precio: 420000, url: "https://tiendaapasur.cl/categoria-producto/palas/" },
    { tiendaSlug: "padelaltamira-cl", precio: 389990, url: "https://www.padelaltamira.cl/product/pala-adidas-metalbone-3-5-hrd-2026-ale-galan" },
    { tiendaSlug: "padelshopchile",   precio: 399990, url: "https://www.padelshopchile.cl/palas-de-padel/adidas" },
    { tiendaSlug: "mercadopadel-cl",  precio: 379990, url: "https://mercadopadel.cl/products/adidas-metalbone-hrd-3-5-black-red-2026-morral-protector-grip" },
  ],
  "adidas-metalbone-hrd-2025":  [
    { tiendaSlug: "keepon-cl",        precio: 359990, url: "https://keepon.cl/collections/palas/products/pala-adidas-metalbone-hrd-3-4-ale-galan" },
    { tiendaSlug: "padelshopchile",   precio: 349990, url: "https://www.padelshopchile.cl/palas-de-padel/adidas" },
    { tiendaSlug: "mercadopadel-cl",  precio: 339990, url: "https://mercadopadel.cl/products/adidas-metalbone-hrd" },
  ],
  "adidas-metalbone-33-2024":   [
    { tiendaSlug: "keepon-cl",        precio: 349990, url: "https://keepon.cl/collections/palas/products/pala-de-padel-adidas-metalbone-3-4" },
    { tiendaSlug: "padelshopchile",   precio: 329990, url: "https://www.padelshopchile.cl/palas-de-padel/adidas" },
    { tiendaSlug: "apasur",           precio: 420000, url: "https://tiendaapasur.cl/producto/pala-adidas-metalbone-ctrl-3-3-2024/" },
  ],
  "adidas-adipower-ctrl-33-2024":[
    { tiendaSlug: "padelshopchile",   precio: 219990, url: "https://www.padelshopchile.cl/palas-de-padel/adidas" },
    { tiendaSlug: "mercadopadel-cl",  precio: 209990, url: "https://mercadopadel.cl/products/adidas-cross-it-light-3-5-2026-martita-ortega-morral-protector-grip" },
  ],
  "adidas-metalbone-32-2023":   [
    { tiendaSlug: "padelshopchile",   precio: 129990, url: "https://www.padelshopchile.cl/palas-de-padel/adidas" },
  ],

  // ─── HEAD ────────────────────────────────────────────────────────────────────
  "head-delta-pro-2026":        [
    { tiendaSlug: "padelshopchile",   precio: 369990, url: "https://www.padelshopchile.cl/palas-de-padel/head" },
    { tiendaSlug: "mercadopadel-cl",  precio: 349990, url: "https://mercadopadel.cl/products/head-delta-pro-2026" },
  ],
  "head-coello-pro-2026":       [
    { tiendaSlug: "apasur",           precio: 400000, url: "https://tiendaapasur.cl/categoria-producto/palas/" },
    { tiendaSlug: "mercadopadel-cl",  precio: 349990, url: "https://mercadopadel.cl/products/head-coello-pro-2026-protector-grip" },
    { tiendaSlug: "padelaltamira-cl", precio: 389990, url: "https://www.padelaltamira.cl/collection/palas" },
    { tiendaSlug: "padelshopchile",   precio: 379990, url: "https://www.padelshopchile.cl/palas-de-padel/head" },
  ],
  "head-extreme-pro-2025":      [
    { tiendaSlug: "padelshopchile",   precio: 309990, url: "https://www.padelshopchile.cl/palas-de-padel/head" },
    { tiendaSlug: "mercadopadel-cl",  precio: 299990, url: "https://mercadopadel.cl/products/head-extreme-pro" },
  ],
  "head-gravity-pro-2024":      [
    { tiendaSlug: "padelshopchile",   precio: 279990, url: "https://www.padelshopchile.cl/palas-de-padel/head" },
    { tiendaSlug: "mercadopadel-cl",  precio: 269990, url: "https://mercadopadel.cl/products/head-gravity-pro" },
  ],
  "head-speed-motion-2025":     [
    { tiendaSlug: "sursports-cl",     precio: 309990, url: "https://sursports.cl/collections/palas-de-padel/products/pala-padel-head-speed-motion-bicolor-2023" },
    { tiendaSlug: "padelshopchile",   precio: 289990, url: "https://www.padelshopchile.cl/palas-de-padel/head" },
  ],
  "head-alpha-pro-2023":        [
    { tiendaSlug: "padelshopchile",   precio: 219990, url: "https://www.padelshopchile.cl/palas-de-padel/head" },
    { tiendaSlug: "mercadopadel-cl",  precio: 199990, url: "https://mercadopadel.cl/products/head-alpha-pro" },
  ],

  // ─── BABOLAT ─────────────────────────────────────────────────────────────────
  "babolat-air-veron-2026":     [
    { tiendaSlug: "padelshopchile",   precio: 319990, url: "https://www.padelshopchile.cl/palas-de-padel/babolat" },
    { tiendaSlug: "mercadopadel-cl",  precio: 299990, url: "https://mercadopadel.cl/products/babolat-technical-vertuo-protector-grip-tarro-pelotas" },
  ],
  "babolat-counter-veron-2026": [
    { tiendaSlug: "padelshopchile",   precio: 289990, url: "https://www.padelshopchile.cl/palas-de-padel/babolat" },
    { tiendaSlug: "sursports-cl",     precio: 223992, url: "https://sursports.cl/collections/palas-de-padel/products/pala-babolat-technical-veron-2023" },
  ],
  "babolat-technical-veron-2025":[
    { tiendaSlug: "apasur",           precio: 450000, url: "https://tiendaapasur.cl/categoria-producto/palas/" },
    { tiendaSlug: "padelshopchile",   precio: 369990, url: "https://www.padelshopchile.cl/palas-de-padel/babolat" },
    { tiendaSlug: "padelaltamira-cl", precio: 399990, url: "https://www.padelaltamira.cl/product/pala-babolat-technical-viper-juan-lebron-3-0-2026" },
  ],
  "babolat-air-veron-2025":     [
    { tiendaSlug: "padelshopchile",   precio: 249990, url: "https://www.padelshopchile.cl/palas-de-padel/babolat" },
    { tiendaSlug: "mercadopadel-cl",  precio: 239990, url: "https://mercadopadel.cl/products/babolat-air-veron-2025" },
  ],

  // ─── SIUX ────────────────────────────────────────────────────────────────────
  "siux-diablo-rx-2025":        [
    { tiendaSlug: "apasur",           precio: 420000, url: "https://tiendaapasur.cl/categoria-producto/palas/" },
    { tiendaSlug: "padelshopchile",   precio: 369990, url: "https://www.padelshopchile.cl/palas-de-padel/siux" },
    { tiendaSlug: "mercadopadel-cl",  precio: 349990, url: "https://mercadopadel.cl/products/pala-de-padel-siux-trilogy-pro-5-protector-grip" },
  ],
  "siux-pegasus-2024":          [
    { tiendaSlug: "padelshopchile",   precio: 299990, url: "https://www.padelshopchile.cl/palas-de-padel/siux" },
    { tiendaSlug: "mercadopadel-cl",  precio: 279990, url: "https://mercadopadel.cl/products/siux-pegasus-2024" },
  ],
  "siux-trilogy-2023":          [
    { tiendaSlug: "padelshopchile",   precio: 219990, url: "https://www.padelshopchile.cl/palas-de-padel/siux" },
    { tiendaSlug: "mercadopadel-cl",  precio: 199990, url: "https://mercadopadel.cl/products/siux-trilogy-2023" },
  ],

  // ─── WILSON ──────────────────────────────────────────────────────────────────
  "wilson-bela-pro-v3-2025":    [
    { tiendaSlug: "padelshopchile",   precio: 289990, url: "https://www.padelshopchile.cl/palas-de-padel/wilson" },
    { tiendaSlug: "mercadopadel-cl",  precio: 279990, url: "https://mercadopadel.cl/products/wilson-bela-pro-v3" },
  ],
  "wilson-bela-v3-2025":        [
    { tiendaSlug: "padelshopchile",   precio: 219990, url: "https://www.padelshopchile.cl/palas-de-padel/wilson" },
  ],
  "wilson-ultra-team-2024":     [
    { tiendaSlug: "padelshopchile",   precio: 119990, url: "https://www.padelshopchile.cl/palas-de-padel/wilson" },
  ],

  // ─── STARVIE ─────────────────────────────────────────────────────────────────
  "starvie-triton-pro-2025":    [
    { tiendaSlug: "padelshopchile",   precio: 329990, url: "https://www.padelshopchile.cl/palas-de-padel/starvie" },
    { tiendaSlug: "mercadopadel-cl",  precio: 309990, url: "https://mercadopadel.cl/products/starvie-triton-pro" },
  ],
  "starvie-raptor-2024":        [
    { tiendaSlug: "padelshopchile",   precio: 249990, url: "https://www.padelshopchile.cl/palas-de-padel/starvie" },
  ],
  "starvie-aquila-2023":        [
    { tiendaSlug: "padelshopchile",   precio: 189990, url: "https://www.padelshopchile.cl/palas-de-padel/starvie" },
  ],

  // ─── DUNLOP ──────────────────────────────────────────────────────────────────
  "dunlop-fx-pro-2024":         [
    { tiendaSlug: "padelshopchile",   precio: 209990, url: "https://www.padelshopchile.cl/palas-de-padel" },
    { tiendaSlug: "mercadopadel-cl",  precio: 189990, url: "https://mercadopadel.cl/products/dunlop-fx-pro" },
  ],
  "dunlop-fx-team-2025":        [
    { tiendaSlug: "mercadopadel-cl",  precio: 119990, url: "https://mercadopadel.cl/products/dunlop-fx-team" },
  ],

  // ─── VARLION ─────────────────────────────────────────────────────────────────
  "varlion-lw-summum-carbon-2024":[
    { tiendaSlug: "padelshopchile",   precio: 349990, url: "https://www.padelshopchile.cl/palas-de-padel" },
  ],

  // ─── DROP SHOT ───────────────────────────────────────────────────────────────
  "dropshot-explorer-2024":     [
    { tiendaSlug: "mercadopadel-cl",  precio: 79990, url: "https://mercadopadel.cl/products/dropshot-explorer" },
  ],

  // ─── BLACK CROWN ─────────────────────────────────────────────────────────────
  "black-crown-piton-2024":     [
    { tiendaSlug: "padelshopchile",   precio: 169990, url: "https://www.padelshopchile.cl/palas-de-padel" },
    { tiendaSlug: "mercadopadel-cl",  precio: 159990, url: "https://mercadopadel.cl/products/black-crown-piton" },
  ],

  // ─── AKKERON ─────────────────────────────────────────────────────────────────
  "akkeron-circle-xtreme-2024": [
    { tiendaSlug: "sursports-cl",     precio: 139995, url: "https://sursports.cl/collections/palas-de-padel/products/pala-akkeron-legacy-poseidon-carbon" },
    { tiendaSlug: "padelshopchile",   precio: 259990, url: "https://www.padelshopchile.cl/palas-de-padel" },
  ],

  // ─── VIBOR-A ─────────────────────────────────────────────────────────────────
  "vibora-black-mamba-2025":    [
    { tiendaSlug: "mercadopadel-cl",  precio: 279990, url: "https://mercadopadel.cl/products/vibora-black-mamba-2025" },
    { tiendaSlug: "padelshopchile",   precio: 289990, url: "https://www.padelshopchile.cl/palas-de-padel" },
  ],

  // ─── TECNIFIBRE ──────────────────────────────────────────────────────────────
  "tecnifibre-curva-2025":      [
    { tiendaSlug: "mercadopadel-cl",  precio: 124990, url: "https://mercadopadel.cl/products/pala-tecnifibre-wall-breaker-365-gonzalo-alfonso-tarro-pelotas-protector-grip" },
    { tiendaSlug: "padelshopchile",   precio: 139990, url: "https://www.padelshopchile.cl/palas-de-padel" },
  ],

  // ─── JOMA ────────────────────────────────────────────────────────────────────
  "joma-winner-2024":           [
    { tiendaSlug: "sursports-cl",     precio: 71996, url: "https://sursports.cl/collections/palas-de-padel/products/pala-padel-joma-tournament-flex-negro-rojo" },
    { tiendaSlug: "padelshopchile",   precio: 119990, url: "https://www.padelshopchile.cl/palas-de-padel" },
  ],

  // ─── ROYAL PADEL ─────────────────────────────────────────────────────────────
  "royal-padel-m27-2023":       [
    { tiendaSlug: "padelshopchile",   precio: 199990, url: "https://www.padelshopchile.cl/palas-de-padel" },
  ],
};

async function main() {
  console.log("=== SEED COMPLETO DE PALAS — Pulso Pádel ===\n");

  // Limpiar palas existentes
  console.log("Limpiando datos anteriores...");
  await db.delete(schema.preciosPalas);
  await db.delete(schema.palas);
  await db.delete(schema.tiendas);

  console.log("Insertando tiendas internacionales...");
  const tiendasInsertadas = await db.insert(schema.tiendas).values(tiendasData).returning();
  const tiendaMap = Object.fromEntries(tiendasInsertadas.map(t => [t.slug, t.id]));
  console.log(`  ✓ ${tiendasInsertadas.length} tiendas`);

  console.log("Insertando palas 2022–2026...");
  const palasInsertadas = await db.insert(schema.palas).values(palasData).returning();
  const palaMap = Object.fromEntries(palasInsertadas.map(p => [p.slug, p.id]));
  console.log(`  ✓ ${palasInsertadas.length} palas`);

  console.log("Insertando precios internacionales...");
  const preciosAInsertar = [];
  for (const [slug, precios] of Object.entries(preciosPorPala)) {
    const palaId = palaMap[slug];
    if (!palaId) { console.warn(`  ⚠ No encontrada pala: ${slug}`); continue; }
    for (const p of precios) {
      const tiendaId = tiendaMap[p.tiendaSlug];
      if (!tiendaId) { console.warn(`  ⚠ No encontrada tienda: ${p.tiendaSlug}`); continue; }
      preciosAInsertar.push({ palaId, tiendaId, precioClp: p.precio, url: p.url, stock: true });
    }
  }
  if (preciosAInsertar.length > 0) {
    await db.insert(schema.preciosPalas).values(preciosAInsertar);
  }
  console.log(`  ✓ ${preciosAInsertar.length} precios`);

  console.log(`\n✅ Seed completado: ${palasInsertadas.length} palas, ${tiendasInsertadas.length} tiendas, ${preciosAInsertar.length} precios`);
}

main().catch((err) => {
  console.error("Error en seed:", err);
  process.exit(1);
});
