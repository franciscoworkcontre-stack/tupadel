export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import { db } from "@/db";
import { palas, preciosPalas } from "@/db/schema";
import { eq, sql, and, gte, lte, inArray } from "drizzle-orm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comparador de Palas de Pádel — Precios en Chile | Pulso Pádel",
  description:
    "Compará precios de palas de pádel en 6 tiendas de Chile. Reviews editoriales, histórico de 90 días, alertas de bajada. Las mejores palas para cada nivel.",
};

const colorFromByMarca: Record<string, string> = {
  Bullpadel: "from-[#DC2626]",
  Nox: "from-[#7DB81E]",
  Adidas: "from-[#0891B2]",
  Head: "from-[#E8590C]",
  Babolat: "from-[#DC2626]",
  Siux: "from-[#7C3AED]",
};

function formatPrice(n: number) {
  return "$" + n.toLocaleString("es-CL");
}

const formaLabel: Record<string, string> = {
  diamante: "Diamante", lagrima: "Lágrima", redonda: "Redonda", hibrida: "Híbrida",
};

const marcas = ["Bullpadel", "Nox", "Adidas", "Head", "Babolat", "Siux"];
const formas = ["diamante", "lagrima", "redonda", "hibrida"];
const niveles = [
  { val: "1-2", label: "Avanzado (Cat 1–2)" },
  { val: "3-4", label: "Intermedio (Cat 3–4)" },
  { val: "5-6", label: "Iniciación (Cat 5–6)" },
];
const precios = [
  { val: "0-100000", label: "Hasta $100.000" },
  { val: "100000-200000", label: "$100K – $200K" },
  { val: "200000-350000", label: "$200K – $350K" },
  { val: "350000-99999999", label: "Más de $350K" },
];
const anios = ["2026", "2025", "2024", "2023"];

type SP = {
  forma?: string;
  nivel?: string;
  precio?: string;
  marca?: string;
  anio?: string;
};

function buildUrl(current: SP, key: string, val: string | undefined) {
  const next: SP = { ...current, [key]: val };
  const params = new URLSearchParams();
  Object.entries(next).forEach(([k, v]) => { if (v) params.set(k, v); });
  const qs = params.toString();
  return `/palas${qs ? `?${qs}` : ""}`;
}

function FilterPill({
  active, href, label,
}: { active: boolean; href: string; label: string }) {
  return (
    <Link
      href={href}
      className={`inline-flex px-3 py-1.5 rounded-full border text-sm transition-colors whitespace-nowrap ${
        active
          ? "bg-ink text-white border-ink"
          : "border-line bg-canvas text-ink hover:border-ink"
      }`}
    >
      {label}
    </Link>
  );
}

export default async function PalasPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const { forma, nivel, precio, marca, anio } = sp;

  // Build where conditions
  const conditions = [eq(palas.publicada, true)];

  if (forma) conditions.push(eq(palas.forma, forma));
  if (marca) conditions.push(eq(palas.marca, marca));
  if (anio) conditions.push(eq(palas.anio, parseInt(anio)));

  if (nivel) {
    const [minN, maxN] = nivel.split("-").map(Number);
    // nivelMin <= maxN AND nivelMax >= minN (overlapping range)
    conditions.push(lte(palas.nivelMin, maxN));
    conditions.push(gte(palas.nivelMax, minN));
  }

  const palasDb = await db
    .select({
      id: palas.id,
      slug: palas.slug,
      marca: palas.marca,
      modelo: palas.modelo,
      anio: palas.anio,
      forma: palas.forma,
      nivelMin: palas.nivelMin,
      nivelMax: palas.nivelMax,
      perfilPotencia: palas.perfilPotencia,
      perfilControl: palas.perfilControl,
      perfilSalida: palas.perfilSalida,
      scoreEditorial: palas.scoreEditorial,
      imagenPrincipal: palas.imagenPrincipal,
    })
    .from(palas)
    .where(and(...conditions))
    .orderBy(palas.scoreEditorial);

  // Get prices for all results
  const precios2 = await db
    .select({
      palaId: preciosPalas.palaId,
      minPrecio: sql<number>`min(${preciosPalas.precioClp})`,
    })
    .from(preciosPalas)
    .groupBy(preciosPalas.palaId);

  const precioMap = Object.fromEntries(precios2.map(p => [p.palaId, p.minPrecio]));

  // Filter by price after join (can't easily do in SQL without subquery)
  const palasFiltered = precio
    ? palasDb.filter(p => {
        const [minP, maxP] = precio.split("-").map(Number);
        const pr = precioMap[p.id];
        return pr !== undefined && pr >= minP && pr <= maxP;
      })
    : palasDb;

  const hasFilters = !!(forma || nivel || precio || marca || anio);

  return (
    <>
      <Navbar activeSection="/palas" />
      <main>
        <section className="px-6 md:px-8 py-10 md:py-12 border-b border-line bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto">
            <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-4">→ {palasFiltered.length} palas{hasFilters ? " encontradas" : " indexadas"}</div>
            <h1 className="display text-5xl md:text-6xl font-semibold" style={{ letterSpacing: "-0.03em" }}>
              Comparador de palas
            </h1>
            <p className="text-ink-soft text-xl mt-4 max-w-2xl leading-relaxed">
              Precios actualizados diariamente en 6 tiendas. Histórico de 90 días. Reviews editoriales honestas.
            </p>
            <div className="flex items-center gap-3 mt-7 flex-wrap">
              <Link href="/palas/recomendador" className="bg-[#A8E63A] text-[#0D1B2A] px-6 py-3 rounded-lg font-semibold hover:bg-[#7DB81E] transition-colors">
                ¿Qué pala me conviene? →
              </Link>
              <Link href="/palas/comparar" className="border border-line px-5 py-3 rounded-lg font-medium text-sm hover:border-ink transition-colors">
                Comparar hasta 3 palas
              </Link>
            </div>
          </div>
        </section>

        {/* Filtros */}
        <section className="px-6 md:px-8 py-3 border-b border-line bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto space-y-2">
            {/* Row 1: Forma + Marca */}
            <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap py-1">
              <span className="mono text-xs text-ink-soft uppercase flex-shrink-0">Forma:</span>
              {formas.map(f => (
                <FilterPill key={f} active={forma === f} href={buildUrl(sp, "forma", forma === f ? undefined : f)} label={formaLabel[f]} />
              ))}
              <span className="mono text-xs text-ink-soft uppercase flex-shrink-0 ml-3">Marca:</span>
              {marcas.map(m => (
                <FilterPill key={m} active={marca === m} href={buildUrl(sp, "marca", marca === m ? undefined : m)} label={m} />
              ))}
            </div>
            {/* Row 2: Nivel + Precio + Año */}
            <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap py-1">
              <span className="mono text-xs text-ink-soft uppercase flex-shrink-0">Nivel:</span>
              {niveles.map(n => (
                <FilterPill key={n.val} active={nivel === n.val} href={buildUrl(sp, "nivel", nivel === n.val ? undefined : n.val)} label={n.label} />
              ))}
              <span className="mono text-xs text-ink-soft uppercase flex-shrink-0 ml-3">Precio:</span>
              {precios.map(p => (
                <FilterPill key={p.val} active={precio === p.val} href={buildUrl(sp, "precio", precio === p.val ? undefined : p.val)} label={p.label} />
              ))}
              <span className="mono text-xs text-ink-soft uppercase flex-shrink-0 ml-3">Año:</span>
              {anios.map(a => (
                <FilterPill key={a} active={anio === a} href={buildUrl(sp, "anio", anio === a ? undefined : a)} label={a} />
              ))}
              {hasFilters && (
                <Link href="/palas" className="ml-2 mono text-xs text-[#E8590C] hover:underline flex-shrink-0">
                  × Limpiar filtros
                </Link>
              )}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-8 py-8 max-w-[1400px] mx-auto">
          {palasFiltered.length === 0 ? (
            <div className="text-center py-20 text-ink-muted">
              <div className="text-4xl mb-4">🎾</div>
              <div className="font-semibold mb-1">Sin resultados</div>
              <p className="text-sm mb-4">Probá con otros filtros.</p>
              <Link href="/palas" className="text-sm text-[#A8E63A] font-semibold hover:underline">Limpiar filtros →</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
              {palasFiltered.map((p) => {
                const precio2 = precioMap[p.id];
                const colorFrom = colorFromByMarca[p.marca] ?? "from-[#0D1B2A]";
                return (
                  <Link
                    key={p.slug}
                    href={`/palas/${p.slug}`}
                    className="border border-line rounded-xl overflow-hidden bg-canvas hover:border-ink-muted transition-colors"
                  >
                    <div className="aspect-[4/5] bg-gradient-to-br from-canvas-warm to-canvas-dim flex items-center justify-center relative overflow-hidden">
                      {p.imagenPrincipal ? (
                        <Image
                          src={p.imagenPrincipal}
                          alt={`${p.marca} ${p.modelo}`}
                          fill
                          className="object-contain p-4"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      ) : (
                        <div className={`w-24 md:w-32 h-36 md:h-44 bg-gradient-to-b ${colorFrom} to-ink rounded-[40%/30%] shadow-xl`} />
                      )}
                      <span className="absolute top-3 left-3 inline-flex items-center px-2 py-0.5 rounded text-[10px] border border-line bg-canvas z-10">
                        {formaLabel[p.forma] ?? p.forma}
                      </span>
                      {p.scoreEditorial && (
                        <span className="absolute top-3 right-3 mono text-xs font-semibold bg-ink text-white px-2 py-0.5 rounded z-10">
                          {p.scoreEditorial.toFixed(1)}
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="mono text-[10px] text-ink-soft uppercase">{p.marca} · {p.anio}</div>
                      <div className="display text-base md:text-lg font-semibold mt-1">{p.modelo}</div>
                      <div className="mono text-[10px] text-ink-soft mt-0.5">Cat {p.nivelMax}–{p.nivelMin}</div>
                      {precio2 && (
                        <div className="mt-3 flex items-baseline justify-between">
                          <span className="mono text-sm md:text-base font-semibold">{formatPrice(precio2)}</span>
                        </div>
                      )}
                      <div className="mt-3 grid grid-cols-3 gap-1 text-[10px]">
                        <div className="text-center"><div className="text-ink-soft">POT</div><div className="font-semibold mono">{p.perfilPotencia ?? "—"}</div></div>
                        <div className="text-center"><div className="text-ink-soft">CTRL</div><div className="font-semibold mono">{p.perfilControl ?? "—"}</div></div>
                        <div className="text-center"><div className="text-ink-soft">SAL</div><div className="font-semibold mono">{p.perfilSalida ?? "—"}</div></div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        <section className="border-t border-line px-6 md:px-8 py-10 md:py-12 bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto">
            <div className="mono text-xs text-ink-soft uppercase tracking-wider mb-4">→ Por nivel de juego</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { href: "/palas/por-nivel/iniciacion", label: "Iniciación", desc: "Cat 5–6", color: "#7C3AED" },
                { href: "/palas/por-nivel/intermedio", label: "Intermedio", desc: "Cat 3–4", color: "#65A30D" },
                { href: "/palas/por-nivel/avanzado", label: "Avanzado", desc: "Cat 2", color: "#EA580C" },
                { href: "/palas/por-nivel/competicion", label: "Competición", desc: "Cat 1", color: "#DC2626" },
              ].map((n) => (
                <Link key={n.href} href={n.href} className="border border-line rounded-xl p-5 bg-canvas hover:border-ink-muted transition-colors">
                  <div className="w-2 h-2 rounded-full mb-3" style={{ backgroundColor: n.color }} />
                  <div className="display text-lg font-semibold">{n.label}</div>
                  <div className="mono text-xs text-ink-soft mt-1">{n.desc}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
