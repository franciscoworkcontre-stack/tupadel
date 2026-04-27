/**
 * Scraper: MercadoLibre CL — Palas de Pádel
 *
 * Usa la API pública de MercadoLibre (no scraping HTML).
 * Endpoint: https://api.mercadolibre.com/sites/MLC/search?category=MLC3627&q=pala+padel
 *
 * Uso: npx tsx scripts/scraper-mercadolibre.ts
 */

import { config } from "dotenv";
config({ path: ".env.local" });

const ML_SITE = "MLC"; // Chile
const ML_API = "https://api.mercadolibre.com";
const CRAWL_DELAY_MS = 1500;

type MLItem = {
  id: string;
  title: string;
  price: number;
  original_price?: number;
  condition: "new" | "used";
  permalink: string;
  thumbnail: string;
  available_quantity: number;
  seller: { id: number; nickname: string };
  shipping: { free_shipping: boolean };
};

type MLSearchResult = {
  results: MLItem[];
  paging: { total: number; offset: number; limit: number };
};

async function buscarPalas(offset = 0): Promise<MLSearchResult> {
  const params = new URLSearchParams({
    q: "pala padel",
    category: "MLC3627",
    condition: "new",
    limit: "50",
    offset: String(offset),
  });
  const url = `${ML_API}/sites/${ML_SITE}/search?${params}`;
  console.log(`[mercadolibre] Buscando: offset=${offset}`);
  const res = await fetch(url, { headers: { "User-Agent": "tupadel-bot/1.0" } });
  if (!res.ok) throw new Error(`ML API error ${res.status}`);
  return res.json();
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function esPalaValida(item: MLItem): boolean {
  const titulo = item.title.toLowerCase();
  return (
    (titulo.includes("pala") || titulo.includes("raqueta")) &&
    titulo.includes("padel") &&
    item.price >= 30000 &&
    item.price <= 1500000 &&
    item.available_quantity > 0
  );
}

function normalizarDescuento(item: MLItem): number | undefined {
  if (!item.original_price || item.original_price <= item.price) return undefined;
  return Math.round(((item.original_price - item.price) / item.original_price) * 100);
}

async function main() {
  console.log("[mercadolibre] Iniciando scraper...");
  const itemsValidos: MLItem[] = [];
  let offset = 0;
  let total = Infinity;

  while (offset < total && offset < 300) {
    try {
      const result = await buscarPalas(offset);
      total = result.paging.total;
      const validos = result.results.filter(esPalaValida);
      itemsValidos.push(...validos);
      console.log(`[mercadolibre] ${validos.length}/${result.results.length} válidos en offset=${offset}`);
      offset += 50;
      if (offset < total) await sleep(CRAWL_DELAY_MS);
    } catch (err) {
      console.error(`[mercadolibre] Error en offset=${offset}:`, err);
      break;
    }
  }

  const registros = itemsValidos.map((item) => ({
    fuente: "mercadolibre" as const,
    titulo: item.title,
    precio: item.price,
    precioOriginal: item.original_price,
    descuento: normalizarDescuento(item),
    url: item.permalink,
    imagen: item.thumbnail,
    vendedor: item.seller.nickname,
    envioGratis: item.shipping.free_shipping,
  }));

  // TODO: hacer matching con palas en DB (fuzzy match marca + modelo)
  // TODO: guardar en precios_palas o palas_usadas según condición

  console.log(`[mercadolibre] Completado. ${registros.length} palas nuevas encontradas.`);
  console.log("[mercadolibre] Muestra:", registros.slice(0, 3));
}

main().catch(console.error);
