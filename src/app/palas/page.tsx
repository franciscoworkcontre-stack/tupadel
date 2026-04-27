export const dynamic = "force-dynamic";

import Link from "next/link";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import { db } from "@/db";
import { palas, preciosPalas } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
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

export default async function PalasPage() {
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
    })
    .from(palas)
    .where(eq(palas.publicada, true))
    .orderBy(palas.scoreEditorial);

  const precios = await db
    .select({
      palaId: preciosPalas.palaId,
      minPrecio: sql<number>`min(${preciosPalas.precioClp})`,
    })
    .from(preciosPalas)
    .groupBy(preciosPalas.palaId);

  const precioMap = Object.fromEntries(precios.map(p => [p.palaId, p.minPrecio]));

  const formaLabel: Record<string, string> = {
    diamante: "Diamante", lagrima: "Lágrima", redonda: "Redonda", hibrida: "Híbrida",
  };

  return (
    <>
      <Navbar activeSection="/palas" />
      <main>
        <section className="px-6 md:px-8 py-10 md:py-12 border-b border-line bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto">
            <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-4">→ {palasDb.length} palas indexadas</div>
            <h1 className="display text-5xl md:text-6xl font-semibold" style={{ letterSpacing: "-0.03em" }}>
              Comparador de palas
            </h1>
            <p className="text-ink-muted text-xl mt-4 max-w-2xl leading-relaxed">
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

        <section className="px-6 md:px-8 py-3 border-b border-line bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto flex items-center gap-2 overflow-x-auto whitespace-nowrap">
            <span className="mono text-xs text-ink-soft uppercase">Filtrar:</span>
            {["Forma ▾", "Nivel ▾", "Precio ▾", "Marca ▾", "Año ▾"].map((f) => (
              <button key={f} className="inline-flex px-3 py-1.5 rounded-full border border-line bg-canvas text-sm hover:border-ink transition-colors">
                {f}
              </button>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-8 py-8 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {palasDb.map((p) => {
              const precio = precioMap[p.id];
              const colorFrom = colorFromByMarca[p.marca] ?? "from-[#0D1B2A]";
              return (
                <Link
                  key={p.slug}
                  href={`/palas/${p.slug}`}
                  className="border border-line rounded-xl overflow-hidden bg-canvas hover:border-ink-muted transition-colors"
                >
                  <div className="aspect-[4/5] bg-gradient-to-br from-canvas-warm to-canvas-dim flex items-center justify-center relative">
                    <div className={`w-24 md:w-32 h-36 md:h-44 bg-gradient-to-b ${colorFrom} to-ink rounded-[40%/30%] shadow-xl`} />
                    <span className="absolute top-3 left-3 inline-flex items-center px-2 py-0.5 rounded text-[10px] border border-line bg-canvas">
                      {formaLabel[p.forma] ?? p.forma}
                    </span>
                    {p.scoreEditorial && (
                      <span className="absolute top-3 right-3 mono text-xs font-semibold bg-ink text-white px-2 py-0.5 rounded">
                        {p.scoreEditorial.toFixed(1)}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="mono text-[10px] text-ink-soft uppercase">{p.marca} · {p.anio}</div>
                    <div className="display text-base md:text-lg font-semibold mt-1">{p.modelo}</div>
                    <div className="mono text-[10px] text-ink-soft mt-0.5">Cat {p.nivelMax}–{p.nivelMin}</div>
                    {precio && (
                      <div className="mt-3 flex items-baseline justify-between">
                        <span className="mono text-sm md:text-base font-semibold">{formatPrice(precio)}</span>
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
