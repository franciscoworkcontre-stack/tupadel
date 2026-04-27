import Link from "next/link";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comparador de Palas de Pádel — Precios en Chile | tupadel",
  description:
    "Compará precios de palas de pádel en 6 tiendas de Chile. Reviews editoriales, histórico de 90 días, alertas de bajada. Las mejores palas para cada nivel.",
};

const palas = [
  { slug: "bullpadel-vertex-04", marca: "Bullpadel", modelo: "Vertex 04", anio: 2025, forma: "Diamante", nivel: "Cat 1–3", score: 8.4, precio: 219990, colorFrom: "from-[#DC2626]", pot: 9, ctrl: 6, sal: 7 },
  { slug: "nox-at10-genius", marca: "Nox", modelo: "AT10 Genius", anio: 2025, forma: "Lágrima", nivel: "Cat 2–4", score: 9.1, precio: 254990, variacion: -12, colorFrom: "from-[#008F47]", pot: 8, ctrl: 8, sal: 8 },
  { slug: "adidas-metalbone-hrd", marca: "Adidas", modelo: "Metalbone HRD+", anio: 2025, forma: "Redonda", nivel: "Cat 3–5", score: 7.9, precio: 184990, colorFrom: "from-[#0891B2]", pot: 6, ctrl: 9, sal: 8 },
  { slug: "head-delta-pro-2026", marca: "Head", modelo: "Delta Pro 2026", anio: 2025, forma: "Diamante", nivel: "Cat 1–2", score: 8.7, precio: 239990, colorFrom: "from-[#E8590C]", pot: 9, ctrl: 7, sal: 7 },
  { slug: "bullpadel-hack-04", marca: "Bullpadel", modelo: "Hack 04", anio: 2025, forma: "Redonda", nivel: "Cat 4–6", score: 8.1, precio: 149990, colorFrom: "from-[#D97706]", pot: 6, ctrl: 9, sal: 7 },
  { slug: "babolat-air-veron", marca: "Babolat", modelo: "Air Veron", anio: 2025, forma: "Diamante", nivel: "Cat 2–3", score: 8.2, precio: 209990, colorFrom: "from-[#DC2626]", pot: 8, ctrl: 7, sal: 8 },
  { slug: "siux-diablo-rx", marca: "Siux", modelo: "Diablo RX", anio: 2025, forma: "Diamante", nivel: "Cat 1–2", score: 8.5, precio: 289990, colorFrom: "from-[#7C3AED]", pot: 9, ctrl: 6, sal: 8 },
  { slug: "nox-ml10-pro-cup", marca: "Nox", modelo: "ML10 Pro Cup", anio: 2025, forma: "Híbrida", nivel: "Cat 3–5", score: 8.0, precio: 199990, colorFrom: "from-[#0891B2]", pot: 7, ctrl: 8, sal: 8 },
];

function formatPrice(n: number) {
  return "$" + n.toLocaleString("es-CL");
}

export default function PalasPage() {
  return (
    <>
      <Navbar activeSection="/palas" />
      <main>
        <section className="px-6 md:px-8 py-10 md:py-12 border-b border-line bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto">
            <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-4">→ 847 palas indexadas</div>
            <h1 className="display text-5xl md:text-6xl font-semibold" style={{ letterSpacing: "-0.03em" }}>
              Comparador de palas
            </h1>
            <p className="text-ink-muted text-xl mt-4 max-w-2xl leading-relaxed">
              Precios actualizados diariamente en 6 tiendas. Histórico de 90 días. Reviews editoriales honestas.
            </p>
            <div className="flex items-center gap-3 mt-7 flex-wrap">
              <Link href="/palas/recomendador" className="bg-[#00B85C] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#008F47] transition-colors">
                ¿Qué pala me conviene? →
              </Link>
              <Link href="/palas/comparar" className="border border-line px-5 py-3 rounded-lg font-medium text-sm hover:border-ink transition-colors">
                Comparar hasta 3 palas
              </Link>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="px-6 md:px-8 py-3 border-b border-line bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto flex items-center gap-2 overflow-x-auto whitespace-nowrap">
            <span className="mono text-xs text-ink-soft uppercase">Filtrar:</span>
            {["Forma ▾", "Nivel ▾", "Precio ▾", "Marca ▾", "Año ▾"].map((f) => (
              <button key={f} className="inline-flex px-3 py-1.5 rounded-full border border-line bg-canvas text-sm hover:border-ink transition-colors">
                {f}
              </button>
            ))}
            <div className="flex-1" />
            <span className="mono text-xs text-ink-soft">Ordenar por precio ascendente</span>
          </div>
        </section>

        {/* Grid */}
        <section className="px-6 md:px-8 py-8 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {palas.map((p) => (
              <Link
                key={p.slug}
                href={`/palas/${p.slug}`}
                className="border border-line rounded-xl overflow-hidden bg-canvas hover:border-ink-muted transition-colors"
              >
                <div className="aspect-[4/5] bg-gradient-to-br from-canvas-warm to-canvas-dim flex items-center justify-center relative">
                  <div className={`w-24 md:w-32 h-36 md:h-44 bg-gradient-to-b ${p.colorFrom} to-ink rounded-[40%/30%] shadow-xl`} />
                  <span className="absolute top-3 left-3 inline-flex items-center px-2 py-0.5 rounded text-[10px] border border-line bg-canvas">{p.forma}</span>
                  <span className="absolute top-3 right-3 mono text-xs font-semibold bg-ink text-white px-2 py-0.5 rounded">{p.score.toFixed(1)}</span>
                </div>
                <div className="p-4">
                  <div className="mono text-[10px] text-ink-soft uppercase">{p.marca} · {p.anio}</div>
                  <div className="display text-base md:text-lg font-semibold mt-1">{p.modelo}</div>
                  <div className="mono text-[10px] text-ink-soft mt-0.5">{p.nivel}</div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="mono text-sm md:text-base font-semibold">{formatPrice(p.precio)}</span>
                    {p.variacion !== undefined ? (
                      <span className="mono text-xs text-[#E8590C]">↓ {Math.abs(p.variacion)}%</span>
                    ) : null}
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-1 text-[10px]">
                    <div className="text-center"><div className="text-ink-soft">POT</div><div className="font-semibold mono">{p.pot}</div></div>
                    <div className="text-center"><div className="text-ink-soft">CTRL</div><div className="font-semibold mono">{p.ctrl}</div></div>
                    <div className="text-center"><div className="text-ink-soft">SAL</div><div className="font-semibold mono">{p.sal}</div></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Por nivel */}
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
