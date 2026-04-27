/**
 * Scraper: Padelnuestro CL
 *
 * Uso: npx tsx scripts/scraper-padelnuestro.ts
 * Cron: cada 24h via Vercel Cron + Inngest
 *
 * Estrategia: fetch → parse HTML → normalizar → guardar en precios_palas
 */

import { config } from "dotenv";
config({ path: ".env.local" });

const TIENDA_SLUG = "padelnuestro-cl";
const BASE_URL = "https://www.padelnuestro.cl";
const USER_AGENT = "tupadel-bot/1.0 (+https://tupadel.com/bot)";
const CRAWL_DELAY_MS = 2000;

type ProductoRaw = {
  nombre: string;
  precio: number;
  precioOriginal?: number;
  url: string;
  imagen?: string;
  stock: boolean;
};

async function fetchPage(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "text/html,application/xhtml+xml",
      "Accept-Language": "es-CL,es;q=0.9",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} en ${url}`);
  return res.text();
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function normalizarNombre(raw: string): { marca: string; modelo: string; anio?: number } {
  const nombre = raw.trim().replace(/\s+/g, " ");
  const marcas = ["Bullpadel", "Nox", "Adidas", "Head", "Babolat", "Siux", "Wilson", "Prince"];
  let marca = "Desconocida";
  for (const m of marcas) {
    if (nombre.toLowerCase().includes(m.toLowerCase())) {
      marca = m;
      break;
    }
  }
  const anioMatch = nombre.match(/20\d{2}/);
  const anio = anioMatch ? parseInt(anioMatch[0]) : undefined;
  const modelo = nombre.replace(marca, "").replace(/20\d{2}/, "").trim();
  return { marca, modelo, anio };
}

async function scrapearPagina(pagina: number): Promise<ProductoRaw[]> {
  const url = `${BASE_URL}/palas-padel?p=${pagina}`;
  console.log(`[padelnuestro] Scrapeando página ${pagina}: ${url}`);

  const html = await fetchPage(url);

  // Extraer productos con regex básico (sin dependencia de cheerio en este template)
  const productos: ProductoRaw[] = [];

  // Patrón para precios en formato CLP
  const precioRegex = /\$[\s]*([\d\.,]+)/g;
  const nombreRegex = /<[hH]2[^>]*class="[^"]*product[^"]*"[^>]*>([\s\S]*?)<\/[hH]2>/gi;

  // Extraer nombres de producto
  let match;
  const nombres: string[] = [];
  while ((match = nombreRegex.exec(html)) !== null) {
    const texto = match[1].replace(/<[^>]*>/g, "").trim();
    if (texto.length > 5) nombres.push(texto);
  }

  const precios: number[] = [];
  while ((match = precioRegex.exec(html)) !== null) {
    const precio = parseInt(match[1].replace(/[\.,\s]/g, ""));
    if (precio > 10000 && precio < 2000000) precios.push(precio);
  }

  for (let i = 0; i < Math.min(nombres.length, precios.length); i++) {
    productos.push({
      nombre: nombres[i],
      precio: precios[i * 2] || precios[i], // precio con descuento vs original
      precioOriginal: precios[i * 2 + 1] > precios[i] ? precios[i * 2 + 1] : undefined,
      url: `${BASE_URL}/palas-padel`,
      stock: true,
    });
  }

  return productos;
}

async function guardarPrecios(productos: ProductoRaw[]) {
  // TODO: conectar con DB
  // const tienda = await db.query.tiendas.findFirst({ where: eq(tiendas.slug, TIENDA_SLUG) });
  // for (const p of productos) { await db.insert(preciosPalas).values({ ... }) }
  console.log(`[padelnuestro] ${productos.length} productos procesados (guardado pendiente de DB)`);
}

async function main() {
  console.log("[padelnuestro] Iniciando scraper...");
  const todosLosProductos: ProductoRaw[] = [];

  for (let pagina = 1; pagina <= 5; pagina++) {
    try {
      const productos = await scrapearPagina(pagina);
      todosLosProductos.push(...productos);
      if (pagina < 5) await sleep(CRAWL_DELAY_MS);
    } catch (err) {
      console.error(`[padelnuestro] Error en página ${pagina}:`, err);
    }
  }

  await guardarPrecios(todosLosProductos);
  console.log(`[padelnuestro] Completado. Total: ${todosLosProductos.length} productos.`);
}

main().catch(console.error);
