export const dynamic = "force-dynamic";

import Link from "next/link";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import { db } from "@/db";
import { retiros, retiroEdiciones } from "@/db/schema";
import { eq, sql, and, gte, lte, inArray } from "drizzle-orm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buscar Retiros de Pádel | Pulso Pádel",
  description: "Buscá y filtrá retiros de pádel por género, país, nivel y precio.",
};

function formatPrice(n: number) { return "$" + n.toLocaleString("es-CL"); }

const paisLabel: Record<string, string> = { CL: "Chile 🇨🇱", AR: "Argentina 🇦🇷", CO: "Colombia 🇨🇴", PE: "Perú 🇵🇪", UY: "Uruguay 🇺🇾", MX: "México 🇲🇽" };
const paisFlag: Record<string, string> = { CL: "🇨🇱", AR: "🇦🇷", CO: "🇨🇴", PE: "🇵🇪", UY: "🇺🇾", MX: "🇲🇽" };

export default async function RetirosSearchPage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const sp = await searchParams;
  const generoFilter = sp.genero; // mixto | hombres | mujeres
  const paisFilter = sp.pais?.toUpperCase();
  const nivelFilter = sp.nivel ? parseInt(sp.nivel) : undefined;

  const conditions = [eq(retiros.estado, "publicado")];
  if (generoFilter) conditions.push(eq(retiros.genero, generoFilter));
  if (paisFilter) conditions.push(eq(retiros.pais, paisFilter));
  if (nivelFilter) conditions.push(lte(retiros.nivelMin, nivelFilter));

  const results = await db
    .select({
      id: retiros.id, slug: retiros.slug, titulo: retiros.titulo, subtitulo: retiros.subtitulo,
      pais: retiros.pais, ciudad: retiros.ciudad, genero: retiros.genero,
      nivelMin: retiros.nivelMin, nivelMax: retiros.nivelMax, diasDuracion: retiros.diasDuracion,
    })
    .from(retiros)
    .where(and(...conditions))
    .orderBy(sql`${retiros.destacado} desc`);

  const ediciones = await db
    .select({ retiroId: retiroEdiciones.retiroId, minPrecio: sql<number>`min(${retiroEdiciones.precioClp})` })
    .from(retiroEdiciones)
    .where(eq(retiroEdiciones.estado, "abierta"))
    .groupBy(retiroEdiciones.retiroId);
  const edMap = Object.fromEntries(ediciones.map(e => [e.retiroId, e.minPrecio]));

  const generoLabel: Record<string, { label: string; color: string }> = {
    mixto: { label: "Mixto", color: "bg-[#0891B2]/10 text-[#0891B2]" },
    mujeres: { label: "Femenino", color: "bg-[#7C3AED]/10 text-[#7C3AED]" },
    hombres: { label: "Masculino", color: "bg-[#EA580C]/10 text-[#EA580C]" },
  };

  function buildUrl(params: Record<string, string | undefined>) {
    const base = new URLSearchParams();
    const merged = { genero: generoFilter, pais: paisFilter?.toLowerCase(), nivel: sp.nivel, ...params };
    Object.entries(merged).forEach(([k, v]) => { if (v) base.set(k, v); });
    return `/retiros/buscar?${base.toString()}`;
  }

  return (
    <>
      <Navbar activeSection="/retiros" />
      <main>
        <section className="px-6 md:px-8 py-8 border-b border-line bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto">
            <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-3">← <Link href="/retiros" className="hover:underline">Retiros</Link> · Búsqueda</div>
            <h1 className="display text-3xl font-semibold mb-5">Buscar retiros</h1>

            {/* Filtros */}
            <div className="flex flex-wrap gap-3">
              {/* Género */}
              <div className="flex items-center gap-1 border border-line rounded-lg overflow-hidden bg-canvas">
                {[{ val: undefined, label: "Todos" }, { val: "mixto", label: "Mixto" }, { val: "mujeres", label: "Mujeres" }, { val: "hombres", label: "Hombres" }].map(g => (
                  <Link key={g.label} href={buildUrl({ genero: g.val })}
                    className={`px-3 py-2 text-xs font-medium transition-colors ${generoFilter === g.val || (!generoFilter && !g.val) ? "bg-ink text-white" : "text-ink-muted hover:text-ink"}`}>
                    {g.label}
                  </Link>
                ))}
              </div>

              {/* País */}
              <div className="flex items-center gap-1 border border-line rounded-lg overflow-hidden bg-canvas">
                {[{ val: undefined, label: "Todos" }, ...Object.entries(paisLabel).map(([val, label]) => ({ val: val.toLowerCase(), label }))].map(p => (
                  <Link key={p.label} href={buildUrl({ pais: p.val })}
                    className={`px-3 py-2 text-xs font-medium transition-colors ${(paisFilter?.toLowerCase() === p.val) || (!paisFilter && !p.val) ? "bg-ink text-white" : "text-ink-muted hover:text-ink"}`}>
                    {p.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-8 py-8 max-w-[1400px] mx-auto">
          <div className="mono text-xs text-ink-soft mb-5">{results.length} resultado{results.length !== 1 ? "s" : ""}</div>

          {results.length === 0 ? (
            <div className="text-center py-16 text-ink-muted">
              <div className="text-3xl mb-3">🔍</div>
              <div className="font-semibold mb-1">Sin resultados</div>
              <p className="text-sm">Probá con otros filtros. <Link href="/retiros" className="text-[#A8E63A] hover:underline">Ver todos los retiros →</Link></p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {results.map(r => {
                const g = generoLabel[r.genero] ?? generoLabel.mixto;
                return (
                  <Link key={r.slug} href={`/retiros/${r.slug}`} className="border border-line rounded-xl overflow-hidden bg-canvas hover:border-ink-muted transition-colors">
                    <div className="aspect-[16/9] bg-gradient-to-br from-canvas-warm to-canvas-dim flex items-center justify-center relative text-4xl">
                      {paisFlag[r.pais] ?? "🌎"}
                      <span className={`absolute top-3 left-3 text-xs px-2 py-0.5 rounded-full font-medium ${g.color}`}>{g.label}</span>
                    </div>
                    <div className="p-5">
                      <div className="mono text-xs text-ink-soft mb-1">{r.ciudad}, {r.pais} · {r.diasDuracion} días · Cat {r.nivelMax}–{r.nivelMin}</div>
                      <h3 className="display text-lg font-semibold mb-1">{r.titulo}</h3>
                      {r.subtitulo && <p className="text-sm text-ink-muted line-clamp-2">{r.subtitulo}</p>}
                      {edMap[r.id] && <div className="mono text-base font-semibold mt-3">{formatPrice(edMap[r.id])}<span className="text-xs text-ink-soft font-normal"> / persona</span></div>}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
