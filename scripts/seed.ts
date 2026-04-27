/**
 * Seed script: datos iniciales
 *
 * Uso: DATABASE_URL=... npx tsx scripts/seed.ts
 */

import { config } from "dotenv";
config({ path: ".env.local" });

// Datos de seed (sin DB en esta iteración — los insertamos cuando DATABASE_URL esté configurado)

const tiendas = [
  { slug: "padelnuestro-cl", nombre: "Padelnuestro CL", dominio: "padelnuestro.cl", pais: "CL", confiabilidad: 5, tiempoEnvioDias: 3 },
  { slug: "decathlon-cl", nombre: "Decathlon CL", dominio: "decathlon.cl", pais: "CL", confiabilidad: 5, tiempoEnvioDias: 2 },
  { slug: "mercadolibre-cl", nombre: "MercadoLibre CL", dominio: "mercadolibre.cl", pais: "CL", confiabilidad: 3, tiempoEnvioDias: 5 },
  { slug: "time2padel", nombre: "Time2Padel", dominio: "time2padel.com", pais: "CL", confiabilidad: 4, tiempoEnvioDias: 15 },
  { slug: "padelpoint", nombre: "PadelPoint", dominio: "padelpoint.cl", pais: "CL", confiabilidad: 4, tiempoEnvioDias: 4 },
  { slug: "yapo-cl", nombre: "Yapo CL", dominio: "yapo.cl", pais: "CL", confiabilidad: 2, tiempoEnvioDias: null },
];

const palas = [
  { slug: "bullpadel-vertex-04", nombre: "Bullpadel Vertex 04", marca: "Bullpadel", modelo: "Vertex 04", anio: 2025, forma: "diamante", nivelMin: 2, nivelMax: 3, pesoMin: 365, pesoMax: 375, balance: "cabeza", nucleo: "MultiEva soft", cara: "Carbono 12K", perfil: 38, perfilPotencia: 9, perfilControl: 6, perfilSalida: 7, scoreEditorial: 8.4 },
  { slug: "nox-at10-genius", nombre: "Nox AT10 Genius", marca: "Nox", modelo: "AT10 Genius", anio: 2025, forma: "lagrima", nivelMin: 2, nivelMax: 4, pesoMin: 360, pesoMax: 375, balance: "medio-cabeza", nucleo: "HR3 Carbon", cara: "Carbono 18K", perfil: 38, perfilPotencia: 8, perfilControl: 8, perfilSalida: 8, scoreEditorial: 9.1 },
  { slug: "adidas-metalbone-hrd", nombre: "Adidas Metalbone HRD+", marca: "Adidas", modelo: "Metalbone HRD+", anio: 2025, forma: "redonda", nivelMin: 3, nivelMax: 5, pesoMin: 360, pesoMax: 375, balance: "medio", nucleo: "EVA Soft", cara: "Carbono 12K", perfil: 36, perfilPotencia: 6, perfilControl: 9, perfilSalida: 8, scoreEditorial: 7.9 },
  { slug: "head-delta-pro-2026", nombre: "Head Delta Pro 2026", marca: "Head", modelo: "Delta Pro 2026", anio: 2025, forma: "diamante", nivelMin: 1, nivelMax: 2, pesoMin: 365, pesoMax: 375, balance: "cabeza", nucleo: "EVA Comfort", cara: "Carbono", perfil: 38, perfilPotencia: 9, perfilControl: 7, perfilSalida: 7, scoreEditorial: 8.7 },
  { slug: "bullpadel-hack-04", nombre: "Bullpadel Hack 04", marca: "Bullpadel", modelo: "Hack 04", anio: 2025, forma: "redonda", nivelMin: 4, nivelMax: 6, pesoMin: 355, pesoMax: 370, balance: "mango", nucleo: "MultiEva", cara: "Fibra de vidrio", perfil: 36, perfilPotencia: 6, perfilControl: 9, perfilSalida: 7, scoreEditorial: 8.1 },
  { slug: "babolat-air-veron", nombre: "Babolat Air Veron", marca: "Babolat", modelo: "Air Veron", anio: 2025, forma: "diamante", nivelMin: 2, nivelMax: 3, pesoMin: 355, pesoMax: 375, balance: "cabeza", nucleo: "HR3", cara: "Carbono", perfil: 38, perfilPotencia: 8, perfilControl: 7, perfilSalida: 8, scoreEditorial: 8.2 },
  { slug: "siux-diablo-rx", nombre: "Siux Diablo RX", marca: "Siux", modelo: "Diablo RX", anio: 2025, forma: "diamante", nivelMin: 1, nivelMax: 2, pesoMin: 365, pesoMax: 380, balance: "cabeza", nucleo: "EVA Ultra Soft", cara: "Carbono 12K", perfil: 40, perfilPotencia: 9, perfilControl: 6, perfilSalida: 8, scoreEditorial: 8.5 },
  { slug: "nox-ml10-pro-cup", nombre: "Nox ML10 Pro Cup", marca: "Nox", modelo: "ML10 Pro Cup", anio: 2025, forma: "hibrida", nivelMin: 3, nivelMax: 5, pesoMin: 355, pesoMax: 375, balance: "medio", nucleo: "Hesacore", cara: "Carbono", perfil: 38, perfilPotencia: 7, perfilControl: 8, perfilSalida: 8, scoreEditorial: 8.0 },
];

const clubes = [
  { slug: "club-padel-las-condes", nombre: "Club de Pádel Las Condes", ciudad: "Santiago", comuna: "Las Condes", lat: -33.4, lng: -70.57, indoor: true, outdoor: false, canchas: 6, verificado: true },
  { slug: "padelarena-vitacura", nombre: "PadelArena Vitacura", ciudad: "Santiago", comuna: "Vitacura", lat: -33.39, lng: -70.55, indoor: true, outdoor: true, canchas: 8 },
  { slug: "padel-stadium-la-reina", nombre: "Pádel Stadium La Reina", ciudad: "Santiago", comuna: "La Reina", lat: -33.45, lng: -70.56, indoor: false, outdoor: true, canchas: 4 },
  { slug: "padelplay-nunoa", nombre: "Padelplay Ñuñoa", ciudad: "Santiago", comuna: "Ñuñoa", lat: -33.46, lng: -70.60, indoor: true, outdoor: false, canchas: 5 },
  { slug: "padel-sport-providencia", nombre: "Pádel Sport Providencia", ciudad: "Santiago", comuna: "Providencia", lat: -33.43, lng: -70.61, indoor: true, outdoor: false, canchas: 3 },
];

const categorias = [
  { id: 6, nombre: "Iniciación", pct: 18, tiempo: "Primeros 6–12 meses" },
  { id: 5, nombre: "Intermedio bajo", pct: 28, tiempo: "6–12 meses" },
  { id: 4, nombre: "Intermedio", pct: 24, tiempo: "8–18 meses" },
  { id: 3, nombre: "Intermedio alto", pct: 15, tiempo: "12–24 meses" },
  { id: 2, nombre: "Avanzado", pct: 10, tiempo: "12–36 meses" },
  { id: 1, nombre: "Competitivo", pct: 5, tiempo: "Indefinido" },
];

const golpes = [
  { slug: "bandeja", nombre: "Bandeja", categoriaMin: 5, dificultad: "intermedio" },
  { slug: "vibora", nombre: "Víbora", categoriaMin: 4, dificultad: "intermedio" },
  { slug: "remate", nombre: "Remate", categoriaMin: 5, dificultad: "basico" },
  { slug: "globo", nombre: "Globo", categoriaMin: 6, dificultad: "basico" },
  { slug: "x3", nombre: "X3 (por tres)", categoriaMin: 3, dificultad: "avanzado" },
  { slug: "x4", nombre: "X4 (por cuatro)", categoriaMin: 2, dificultad: "avanzado" },
  { slug: "contrapared", nombre: "Contrapared", categoriaMin: 5, dificultad: "intermedio" },
  { slug: "dejada", nombre: "Dejada", categoriaMin: 3, dificultad: "avanzado" },
  { slug: "chiquita", nombre: "Chiquita", categoriaMin: 3, dificultad: "avanzado" },
  { slug: "salida-de-pared", nombre: "Salida de pared", categoriaMin: 5, dificultad: "basico" },
];

async function main() {
  console.log("=== SEED tupadel ===");
  console.log(`Tiendas: ${tiendas.length}`);
  console.log(`Palas: ${palas.length}`);
  console.log(`Clubes: ${clubes.length}`);
  console.log(`Categorías: ${categorias.length}`);
  console.log(`Golpes: ${golpes.length}`);
  console.log("");
  console.log("Para ejecutar el seed completo, configurá DATABASE_URL en .env.local y ejecutá:");
  console.log("  npx drizzle-kit push");
  console.log("  DATABASE_URL=... npx tsx scripts/seed.ts");
  console.log("");
  console.log("Los datos de seed están listos en este archivo para ser insertados con Drizzle.");

  if (!process.env.DATABASE_URL) {
    console.log("⚠️  DATABASE_URL no configurado. Seed no ejecutado.");
    return;
  }

  // Con DB conectada:
  // const { db } = await import("../src/db");
  // await db.insert(tiendas).values(tiendas).onConflictDoNothing();
  // await db.insert(palas).values(palas).onConflictDoNothing();
  // ...
}

main().catch(console.error);
